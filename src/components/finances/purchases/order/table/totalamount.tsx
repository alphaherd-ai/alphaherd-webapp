"use client";
import React, { useContext,useEffect,useState } from 'react'
import Rupee from "../../../../../assets/icons/finance/rupee.svg"
import Image from "next/image"
import { Button } from "@nextui-org/react";
import { DataContext } from './DataContext';
import { Tax } from '@prisma/client';
import Select from 'react-select';
import { custom } from 'zod';

const NewPurchasesTotalAmount = () => {


    const { tableData } = useContext(DataContext);
    let totalAmount = 0;
    tableData.forEach(data => {
      
            totalAmount += (data.quantity * Number(data.unitPrice) + data.quantity * data.gst*Number(data.unitPrice)-(data.quantity*data.discountPercent/100*Number(data.unitPrice)||0))||0;    
    });

    const { totalAmountData, setTotalAmountData } = useContext(DataContext);
    const [grandAmt, setGrandAmt] = useState(totalAmount);

    const gstOptions = [
        { value: 'percent', label: '₹ in Percent' },
        { value: 'amount', label: '₹ in Amount' }
    ];


    
    const [overAllDiscount,setDiscount]=useState<string>(""); 

    const [shipping, setShipping] = useState<string>('');
    const [adjustment, setAdjustment] = useState<string>('');

    useEffect(()=>{
        if(totalAmountData.subTotal==0) {
            setShipping('');
            setAdjustment('');
        }
      },[totalAmountData])

    const handleShippingChange = (event: any) => {
        //console.log(typeof event.target.value)
        const value = event.target.value
        if (/^\d*\.?\d*$/.test(value)) {
            setShipping(value);
            updateGrandTotal();
        }
    };

    const handleAdjustmentChange = (event: any) => {
        const value = event.target.value
        if (/^\d*\.?\d*$/.test(value)) {
            setAdjustment(value);
            updateGrandTotal();
        }
    };
    const [discountMethod,setDiscountMethod]=useState("amount");
    const handleSelectChange = (selectedOption: any) => {
        setDiscountMethod(selectedOption.value);
    };
    const [discountInput,setDiscountInput]=useState<string>("");
    const handleDiscountChange = (value: string) => {
        if (/^\d*\.?\d*$/.test(value)) {
          setDiscountInput(value);
    
          const discount = parseFloat(value) || 0;
    
          if (discountMethod === "amount") {
            const discountedAmount = grandAmt - discount;
            const discountPercent = Number(discount / totalAmount).toFixed(10);
            setDiscount(discountPercent);
            setGrandAmt(discountedAmount);
            setTotalAmountData((prevData) => ({
              ...prevData,
              overallDiscount: discountPercent,
            }));
          } else if (discountMethod === "percent") {
            const discountedAmount = grandAmt - grandAmt * (discount / 100);
            setDiscount((discount / 100).toString());
            setGrandAmt(discountedAmount);
            setTotalAmountData((prevData) => ({
              ...prevData,
              overallDiscount: discount / 100,
            }));
          }
        }
      };
    

    const updateGrandTotal = () => {
        const discountedAmount = (totalAmount - totalAmount * parseFloat(overAllDiscount || "0") || 0);
        const shippingValue = parseFloat(shipping) || 0;
        const adjustmentValue = parseFloat(adjustment) || 0;
        const newGrandTotal = discountedAmount + shippingValue + adjustmentValue;
        
        setGrandAmt(newGrandTotal);
        setTotalAmountData((prevData) => ({
            ...prevData,
            subTotal:totalAmount,
            totalCost: newGrandTotal, 
            shipping:shippingValue,
            adjustment:adjustmentValue,
            overAllDiscount:overAllDiscount
        }));
    };

    useEffect(() => {
        updateGrandTotal(); 
    }, [totalAmount, overAllDiscount, shipping, adjustment]);

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


            <div className="flex w-full box-border bg-gray-100 pt-[20px] pb-[20px]">
            <div className="w-1/2 mr-4 flex flex-col">

{/* <div className="w-full  p-6 bg-white rounded-tl-md rounded-tr-md border border-solid  border-borderGrey justify-between items-center gap-6 flex">
    <div className="text-gray-500 text-xl font-medium ">Payments</div>
    {/* <div className='flex items-center h-9 py-2.5 bg-black justify-between rounded-lg '> */}

        {/* <Popover placement="bottom-end" showArrow offset={10}>
            <PopoverTrigger> */}
                {/* <Button 
                    variant="solid"
                    className="capitalize flex h-9 py-2.5 border-none text-base bg-black text-white rounded-lg cursor-pointer">
                    <div className='flex'><Image src={Rupee} alt='Rupee' className='w-6 h-6 ' /></div>
                    Recorded Transaction
                     </Button> */}
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
{/* </div>
<div className="w-full  p-6 bg-white rounded-bl-md rounded-br-md  justify-between items-center gap-6 flex border border-t-0 border-solid border-borderGrey">
    <div className="text-gray-500 text-xl font-medium ">Balance Due</div>
    <div className='flex items-center h-9 px-4 py-2.5 justify-between rounded-lg '>

        <div className="text-gray-500 text-base font-bold flex gap-2 items-center">
            7,89,000
            <span className="text-[#FC6E20] text-sm font-medium  px-2 py-1.5 bg-[#FFF0E9] rounded-[5px] justify-center items-center gap-2">
                You owe
            </span>
        </div>



    </div>
</div> */} 
</div>
                <div className="w-1/2 h-full  bg-white rounded-[10px]">
                <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                        <div className="text-gray-500 text-base font-bold  ">Subtotal</div>
                        <div className="text-right text-gray-500 text-base font-bold ">{totalAmount.toFixed(2)}</div>
                    </div>
                    <div className="w-full flex px-4 py-2 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
            <div className="text-gray-500 text-base font-bold ">
              Overall Discount
            </div>
            <div className="flex items-center">
              <div className="text-right text-textGrey1 text-base  ">
                <input
                  className="text-right text-textGrey1 text-base   border-none outline-none"
                  placeholder="0"
                  value={discountInput}
                  onChange={(e) => handleDiscountChange(e.target.value)}
                />
              </div>
              <div className=" flex text-gray-500 text-base font-medium pl-6">
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
                    <div className="w-full flex px-4 py-2 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                        <div className="text-gray-500 text-base font-bold ">Shipping</div>
                        <div className="flex items-center">
                            <div className="text-right text-textGrey1 text-base  "><input
                                            className="text-right text-textGrey1 text-base   border-none outline-none"
                                            placeholder='0'
                                            value={shipping} 
                                            onChange={handleShippingChange} 
                                        /></div>
                            
                        </div>
                    </div>
                    <div className="w-full flex px-4 py-2 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                        <div className="text-gray-500 text-base font-bold ">Adjustment</div>
                        <div className="flex items-center">
                            <div className="text-right text-textGrey1 text-base  "><input
                                            className="text-right text-textGrey1 text-base   border-none outline-none"
                                            placeholder='0'
                                            value={adjustment} 
                                            onChange={handleAdjustmentChange} 
                                        /></div>
                            
                        </div>
                    </div>
                    
                    <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                    <div className="text-textGreen text-base font-bold ">Grand total</div>
                        <div className="text-right text-textGreen text-base font-bold "> { grandAmt.toFixed(2)}</div>
                    </div>
                </div>
            </div>


        </>
  )
}

export default NewPurchasesTotalAmount