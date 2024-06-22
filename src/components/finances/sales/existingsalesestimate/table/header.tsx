"use client"


import editicon from "../../../../../assets/icons/finance/1. Icons-25.svg"


import React, { useState, useEffect } from 'react';
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import formatDateAndTime from "@/utils/formateDateTime";


const ExistingsaleEstimateHeader = ({otherData}: any) => {
console.log(otherData)

 
 
    const [disableButton, setDisableButton] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);




    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);





    return (
        <>


            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold ">Customer:</div>
                        <div
                                className={`text-gray-500 text-base font-medium  border-0 bg-inherit`}
                                > {otherData.customer} </div>

                    </div>
                </div>
                <div className="px-6 py-4  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex w-full">
                        <div className="text-gray-500 text-base font-bold  pr-[16px] w-3/12">Invoice Number:</div>
                        <div className="flex items-center justify-between w-9/12">
                            <div
                                className={`text-gray-500 text-base font-medium  border-0 bg-inherit`}
                                > {otherData.invoiceNo} </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-4 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-1/8">Date:</div>
                        <div
                            className={"text-gray-500 text-base font-medium  w-full"}>
                            {formatDateAndTime(otherData.date).formattedDate}
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-2/12">Due Date:</div>
                        <div
                            className={"text-gray-500 text-base font-medium  w-full"}>
                             {formatDateAndTime(otherData.dueDate).formattedDate}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-4  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold ">Notes:</div>
                        <input type="text" className="w-full h-9 text-textGrey1 text-base font-medium px-2 rounded border-0 outline-none" defaultValue={otherData.notes} disabled/>
                    </div>
                </div>
            </div>



        </>

    )
}

export default ExistingsaleEstimateHeader;
