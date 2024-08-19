"use client"


import React, { useState, useEffect, useContext } from 'react';
import Link from "next/link"
import Image from "next/image"
import Select from 'react-select';
import { DataContext } from './DataContext';
import { Tax } from '@prisma/client';


const NewsaleEstimateTotalAmout = () => {
    const { tableData } = useContext(DataContext);
    const [selectedDiscount, setDiscount] = useState(0);
    let totalAmount = 0,totalAmountLow=0,totalAmountHigh=0,lowGrandTotal=0,highGrandTotal=0;
    tableData.forEach(data => {
        if(data.lowQty==0&&data.highQty==0){
            totalAmount += (data.quantity * data.sellingPrice + data.quantity * data.gst*data.sellingPrice-(data.quantity*data.discount*data.sellingPrice||0))||0;
        }
        else {
             totalAmountLow+=(data.lowQty*data.sellingPrice+data.lowQty*data.gst*data.sellingPrice)||0;
             totalAmountHigh+=(data.highQty*data.sellingPrice+data.highQty*data.gst*data.sellingPrice)||0;
        }
        
    });

    const { totalAmountData, setTotalAmountData } = useContext(DataContext);
    const [grandAmt, setGrandAmt] = useState(totalAmount);
    const [lowGrand,setLowGrand]=useState(totalAmountLow);
    const [highGrand,setHighGrand]=useState(totalAmountHigh);

    const gstOptions = [
        { value: 'percent', label: '₹ in Percent' },
        { value: 'amount', label: '₹ in Amount' }
    ];
    const [discountMethod,setDiscountMethod]=useState('amount');
    const handleSelectChange = (selectedOption: any) => {
        setDiscountMethod(selectedOption.value);
    };
    const [discountInput,setDiscountInput]=useState(0);
    const handleDiscountChange =(discount:number)=>{
        if(discountMethod==='amount'){
            setDiscountInput(discount);
            let discountedAmount=grandAmt-discount;
            let discountPercent=Number(discount/totalAmount).toFixed(4)
            setDiscount(Number(discountPercent))
            setGrandAmt(discountedAmount);
            setTotalAmountData((prevData)=>({...prevData,gst:Number(discountPercent)}))
        }
        else if(discountMethod==='percent'){
            setDiscountInput(discount);
            let discountedAmount=grandAmt-grandAmt*(discount/100);
            setDiscount(Number(discount/100));
            setGrandAmt(discountedAmount);
            setTotalAmountData((prevData)=>({...prevData,gst:Number(discount/100)}))
        }
    }

    const [shipping, setShipping] = useState(0);
    const [adjustment, setAdjustment] = useState(0); 

    const handleShippingChange = (event:any) => {
        const value = parseFloat(event.target.value) || 0; 
        setShipping(value);
        updateGrandTotal(); 
    };

    const handleAdjustmentChange = (event:any) => {
        const value = parseFloat(event.target.value) || 0; 
        setAdjustment(value);
        updateGrandTotal(); 
    };

    const updateGrandTotal = () => {
        const discountedAmount = (totalAmount - totalAmount * selectedDiscount)||0;
        const lowDiscount=(totalAmountLow - totalAmountLow * selectedDiscount)||0;
        const highDiscount=(totalAmountHigh - totalAmountHigh * selectedDiscount)||0;
        const newGrandTotal = discountedAmount + shipping + adjustment;
         lowGrandTotal= lowDiscount+shipping+adjustment;
         highGrandTotal= highDiscount+shipping+adjustment;
         setLowGrand(lowGrandTotal);
         setHighGrand(highGrandTotal);
        setGrandAmt(newGrandTotal);
        setTotalAmountData((prevData) => ({
            ...prevData,
            subTotal:totalAmount,
            totalCost: newGrandTotal, 
            shipping:shipping,
            adjustment:adjustment,
        }));
    };

    useEffect(() => {
        updateGrandTotal(); 
    }, [totalAmount, selectedDiscount, shipping, adjustment]);

    const customStyles = {
        control: (provided: any, state: any) => ({
          ...provided,
          width: '100%',
          maxWidth: '100%',
          border: state.isFocused ? '1px solid #35BEB1' : 'none',
          '&:hover': {
            borderColor: state.isFocused ? '1px solid #35BEB1' : '#C4C4C4', 
            },
          boxShadow: state.isFocused ? 'none' : 'none',
        }),
        valueContainer: (provided: any) => ({
          ...provided,
          width: '100%',
          maxWidth: '100%',
        }),
        singleValue: (provided: any, state: any) => ({
          ...provided,
          width: '100%',
          maxWidth: '100%',
          color: state.isSelected ? '#6B7E7D' : '#6B7E7D',
        }),
        menu: (provided: any) => ({
          ...provided,
          backgroundColor: 'white',
          width: '100%',
          maxWidth: '100%',
        }),
        option: (provided: any, state: any) => ({
          ...provided,
          backgroundColor: state.isFocused ? '#35BEB1' : 'white',
          color: state.isFocused ? 'white' : '#6B7E7D',
          '&:hover': {
            backgroundColor: '#35BEB1',
            color: 'white',
          },
        }),
        menuPortal: (base:any) => ({ ...base, zIndex: 9999 })
      };

    return (
        <>


<div className="flex  pt-[20px] pb-[20px]">
                            <div className="w-1/2"></div>
                            <div className="w-1/2 bg-white rounded-md ">
                                <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                                    <div className="text-gray-500 text-base font-bold ">Subtotal</div>
                                    <div className="text-right text-gray-500 text-base font-bold ">
                                            {totalAmountLow === 0 && totalAmountHigh === 0 ? (
                                                totalAmount.toFixed(2)
                                            ) : (
                                                <>
                                                ₹{totalAmountLow.toFixed(2)} - ₹{totalAmountHigh.toFixed(2)}
                                                </>
                                            )}
                                            </div>

                                </div>
                                <div className="w-full flex px-4 py-2 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                                    <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
                                    <div className="flex items-center">
                                        <div className="text-right text-borderText text-base  ">
                                        <input
                                        type='number'
                                        className="text-right  text-base  w-[50%] border-none outline-none"
                                        value={discountInput}
                                        onChange={(e)=>handleDiscountChange(Number(e.target.value))}
                                        /></div>
                                        <div className=' flex text-gray-500 text-base font-medium pl-6'>
                                            <Select
                                                className="text-neutral-400 text-base font-medium"
                                                defaultValue={gstOptions[1]}
                                                isClearable={false}
                                                isSearchable={true}
                                                options={gstOptions}
                                                styles={customStyles}
                                                onChange={handleSelectChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5   ">
                                        <div className="text-gray-500 text-base font-bold ">Shipping</div>
                                        <input
                                            className="text-right text-textGrey1 text-base   border-none outline-none"
                                            placeholder='₹______'
                                            value={shipping} 
                                            onChange={handleShippingChange} 
                                        />
                                    </div>
                                    <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5  ">
                                        <div className="text-gray-500 text-base font-bold ">Adjustment</div>
                                        <input
                                            className="text-right text-textGrey1 text-base   border-none outline-none"
                                            placeholder='₹______'
                                            value={adjustment} 
                                            onChange={handleAdjustmentChange} 
                                        />
                                    </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                                    <div className="text-textGreen text-base font-bold ">Grand total</div>
                                    <div className="text-right text-textGreen text-base font-bold"> {totalAmountLow === 0 && totalAmountHigh === 0 ? (
                                                grandAmt.toFixed(2)
                                            ) : (
                                                <>
                                                ₹{lowGrand.toFixed(2)} - ₹{highGrand.toFixed(2)}
                                                </>
                                            )}</div>
                                </div>
                            </div>
                        </div>
    
    
          
        </>

    )
}

export default NewsaleEstimateTotalAmout;
