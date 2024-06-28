import React, { useState } from 'react'
import Rupee from "../../../../../assets/icons/finance/rupee.svg"
import Image from "next/image"
import { Button } from "@nextui-org/react";
import calicon from "../../../../../assets/icons/finance/calendar_today.svg"

import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import formatDateAndTime from '@/utils/formateDateTime';


const ExsistingPurcaseReturnTotalAmount = ({otherData}:any) => {

    const [startDate, setStartDate] = useState(new Date());


    
    const handleDateChange = (date:any) => {
        setStartDate(date);
        // setHeaderData((prevData) => ({ ...prevData, date }));
    };



  const gstOptions = [
    { value: 'GST@18%.', label: 'GST@18%.' },
    { value: 'GST@9%.', label: 'GST@9%.' }
];

  return (
    <>


<div className="flex w-full box-border bg-gray-100 pt-[20px] pb-[20px]">
            <div className="w-1/2 mr-4 flex flex-col gap-4">

            <div className="px-6 py-2 bg-white rounded-[5px] justify-between items-center gap-4 flex w-full border border-solid border-borderGrey">
                    <div className="flex gap-[0.2rem] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-[20rem]">Last Date Of Item Returns:</div>
                        
                        <div className="customDatePickerWidth">
                        {formatDateAndTime(otherData.returnLastDate).formattedDate}
                                    </div>
                    </div>
            </div>

            <div className='w-full mr-4 flex flex-col'>
                <div className="w-full  p-6 bg-white rounded-tl-md rounded-tr-md border border-solid  border-borderGrey justify-between items-center gap-6 flex">
                    <div className="text-gray-500 text-xl font-medium ">Payments</div>
   
                    <Button 
                        variant="solid"
                        className="capitalize flex h-9 py-2.5 border-none text-base bg-black text-white rounded-lg cursor-pointer">
                        <div className='flex'><Image src={Rupee} alt='Rupee' className='w-6 h-6 ' /></div>
                        Recorded Transaction
                     </Button>
            
</div> 
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
</div> 
</div>

            </div>
            
            <div className="w-1/2 h-full  bg-white rounded-[10px]">
                <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                <div className="text-gray-500 text-base font-bold ">Subtotal</div>
                                    <div className="text-right text-gray-500 text-base font-bold ">₹{(otherData.totalCost+otherData.shipping+otherData.adjustment+otherData.overAllDiscount*100)?.toFixed(2)}</div>
                                </div>
                                <div className="w-full flex px-4 py-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                                    <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
                                    <div className="flex items-center">
                                        <div className="text-right text-textGrey1 text-base  ">{otherData.overAllDiscount*100}%</div>
                                     
                                    </div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5   ">
                                    <div className="text-gray-500 text-base font-bold ">Shipping</div>
                                    <div className="text-right text-textGrey1 text-base ">₹{otherData.shipping}</div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5  ">
                                    <div className="text-gray-500 text-base font-bold ">Adjustment</div>
                                    <div className="text-right text-textGrey1 text-base ">₹{otherData.adjustment}</div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                                    <div className="text-textGreen text-base font-bold">Grand total</div>
                                    <div className="text-right text-textGreen text-base font-bold ">₹{(otherData.totalCost)?.toFixed(2)}</div>
                                </div>
                            </div>
            </div>



        </>
  )
}

export default ExsistingPurcaseReturnTotalAmount