"use client"


import React, { useState, useEffect, useContext } from 'react';
import DownArrow from '../../../../../assets/icons/finance/downArrow.svg';
import Invoice from '../../../../../assets/icons/finance/invoice.svg';
import Link from "next/link"
import Rupee from "../../../../../assets/icons/finance/rupee.svg"
import Image from "next/image"
import Select from 'react-select';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { DataContext } from './DataContext';
import { Tax } from '@prisma/client';


const InvoiceReturnTotalAmount = () => {
    const { tableData } = useContext(DataContext);
    const [selectedDiscount, setDiscount] = useState(0);
    let totalAmount = 0;
    tableData.forEach(data => {
        totalAmount += (data.quantity * data.unitPrice*Number(-data.discount+data.tax+1))||0;
    });

    const { totalAmountData, setTotalAmountData } = useContext(DataContext);
    const [grandAmt, setGrandAmt] = useState(totalAmount);

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
        const newGrandTotal = discountedAmount + shipping + adjustment;
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

    return (
        <>


<div className="flex  pt-[20px] pb-[20px]">
                <div className="w-1/2 mr-4 flex flex-col">

                <div className="w-full  p-6 bg-white rounded-tl-md rounded-tr-md border border-solid  border-borderGrey justify-between items-center gap-6 flex">
                        <div className="text-gray-500 text-xl font-medium ">Payments</div>
                        {/* <div className='flex items-center h-9 py-2.5 bg-black justify-between rounded-lg cursor-pointer'> */}

                            {/* <Popover placement="bottom-end" showArrow offset={10}>
                                <PopoverTrigger> */}
                                    <Button 
                                        variant="solid"
                                        className="capitalize flex h-9 py-2.5 border-none text-base bg-black text-white rounded-lg cursor-pointer">
                                        <div className='flex'><Image src={Rupee} alt='Rupee' className='w-6 h-6 ' /></div>
                                        Recorded Transaction
                                         </Button>
                                {/* </PopoverTrigger>
                                <PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">

                                    <div className="flex flex-col ">

                                        <div className='flex flex-col'>

                                            <Link className='no-underline flex item-center' href='/finance/overview'>
                                                <div className='text-base p-4   text-white flex '>
                                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Inverse</div>
                                            </Link>
                                            <Link className='no-underline flex item-center' href='/finance/overview'>
                                                <div className='text-base p-4  text-white flex '>
                                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Return</div>
                                            </Link>
                                            <Link className='no-underline flex item-center' href='/finance/overview'>
                                                <div className='text-base p-4  text-white flex '>
                                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Estimate</div>
                                            </Link>

                                        </div>
                                    </div>


                                </PopoverContent>
                            </Popover> */}



                        {/* </div> */}
                    </div>
                    <div className="w-full  p-6 bg-white rounded-bl-md rounded-br-md  justify-between items-center gap-6 flex border border-t-0 border-solid border-borderGrey">
                        <div className="text-gray-500 text-xl font-medium">22/06/24</div>
                        <div className='flex items-center h-9 px-4 py-2.5 justify-between rounded-lg '>

<div className="text-gray-500 text-base font-bold flex gap-2 items-center">
    {totalAmount.toFixed(2)}
    <span className="px-2 py-1 rounded-md bg-[#FFEAEA] text-[#FF3030] text-sm font-medium ml-[5px]">Out</span>
    
    {/* USE THE LABELS AS PER REQ. ----------------------*/}

    {/* <span className="px-2 py-1 rounded-md bg-[#E7F5EE] text-[#0F9D58] text-sm font-medium ml-[5px]">In</span>
    <span className="px-2 py-1 rounded-md bg-[#FFF0E9] text-[#FC6E20] text-sm font-medium ml-[5px]">You Owe</span> */}
</div>



</div>                       
                    </div>
                </div>
                <div className="w-1/2 bg-white rounded-[10px]">
                <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                                    <div className="text-gray-500 text-base font-bold ">Subtotal</div>
                                    <div className="text-right text-gray-500 text-base font-bold ">{totalAmount.toFixed(2)}</div>
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
                                                styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        border: state.isFocused ? 'none' : 'none',
                                                    }),
                                                }}
                                                onChange={handleSelectChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5   ">
                                        <div className="text-gray-500 text-base font-bold ">Shipping</div>
                                        <input
                                            className="text-right text-textGrey1 text-base border-none outline-none"
                                            placeholder='₹______'
                                            value={shipping} 
                                            onChange={handleShippingChange} 
                                        />
                                    </div>
                                    <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5  ">
                                        <div className="text-gray-500 text-base font-bold ">Adjustment</div>
                                        <input
                                            className="text-right text-textGrey1 text-base  border-none outline-none"
                                            placeholder='₹______'
                                            value={adjustment} 
                                            onChange={handleAdjustmentChange} 
                                        />
                                    </div>
                                    <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                                    <div className="text-textGreen text-base font-bold ">Grand total</div>
                                    <div className="text-right text-textGreen text-base font-bold ">{(grandAmt).toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
    
          
        </>

    )
}

export default InvoiceReturnTotalAmount;
