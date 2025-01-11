"use client"





import React, { useState, useEffect } from 'react';
import { useRef } from "react"

import formatDateAndTime from "@/utils/formateDateTime";
import Loading2 from "@/app/loading2";


const ExistingsaleEstimateHeader = ({otherData, isLoading}: any) => {
// console.log(otherData)

 
 
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
                        <div className="text-gray-500 text-base font-bold ">Client:</div>
                        <div
                                className={`text-gray-500 text-base font-medium  border-0 bg-inherit`}
                                > {!isLoading ? otherData.customer : <Loading2 />} </div>

                    </div>
                </div>
                <div className="px-6 py-4  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex w-full">
                        <div className="text-gray-500 text-base font-bold  pr-[16px] w-3/12">Invoice Number:</div>
                        <div className="flex items-center justify-between w-9/12">
                            <div
                                className={`text-gray-500 text-base font-medium  border-0 bg-inherit`}
                                > {!isLoading ? otherData.invoiceNo : <Loading2 />} </div>
                            
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
                            {!isLoading ? formatDateAndTime(otherData.date).formattedDate : <Loading2 />}
                            </div>
                    </div>
                </div>
                <div className="px-6 py-4 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-2/12">Due Date:</div>
                        <div
                            className={"text-gray-500 text-base font-medium  w-full"}>
                             {!isLoading ? formatDateAndTime(otherData.dueDate).formattedDate : <Loading2 />}
                             </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-4  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold ">Notes:</div>
                        <div className='w-full h-9 text-textGrey1 text-base font-medium px-2 rounded border-0 outline-none'>{!isLoading ? otherData.notes : <Loading2 />}</div>
                    </div>
                </div>
            </div>



        </>

    )
}

export default ExistingsaleEstimateHeader;
