"use client"


import editicon from "../../../../../assets/icons/finance/1. Icons-25.svg"


import React, { useState, useEffect } from 'react';
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"

const ExistingsalesHeader = () => {




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
                        <div className="text-gray-500 text-base font-bold font-['Satoshi']">Customer:</div>
                        <div
                            className={`text-gray-500 text-base font-medium font-['Satoshi'] border-0 bg-inherit`}
                        > geet </div>

                    </div>
                </div>
                <div className="px-6 py-4  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi'] pr-[16px] w-3/12">Invoice Number:</div>
                        <div className="flex items-center justify-between w-9/12">
                            <div
                                className={`text-gray-500 text-base font-medium font-['Satoshi'] border-0 bg-inherit`}
                            > dejwfbc </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-4 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi'] w-1/8">Date:</div>
                        <div
                            className={"text-gray-500 text-base font-medium font-['Satoshi'] w-full"}>
                            12/02/2003
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px] ">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi'] w-2/12">Due Date:</div>
                        <div
                            className={"text-gray-500 text-base font-medium font-['Satoshi'] w-full"}>
                            12/02/2003
                        </div>
                    </div>

                </div>
                <div className="px-6 py-4 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi'] w-2/12">Due Date:</div>
                        <div
                            className={"text-gray-500 text-base font-medium font-['Satoshi'] w-full"}>
                            12/02/2003
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-4  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi']">Notes:</div>
                        <div  className={"text-gray-500 text-base font-medium font-['Satoshi'] w-full"}>dewef</div>
                    </div>
                </div>
            </div>



        </>

    )
}

export default ExistingsalesHeader;
