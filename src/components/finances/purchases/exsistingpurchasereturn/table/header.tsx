"use client"


import editicon from "../../../../../assets/icons/finance/1. Icons-25.svg"

import calicon from "../../../../../assets/icons/finance/calendar_today.svg"

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from "@nextui-org/react";
import formatDateAndTime from "@/utils/formateDateTime";
import Loading2 from "@/app/loading2";
const ExsistingPurcaseReturnHeader = ({otherData, isLoading}:any) => {

    const [startDate, setStartDate] = useState(new Date());
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [disableButton, setDisableButton] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
   
    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);


    const handleDateChange = (date:any) => {
        setStartDate(date);
        // setHeaderData((prevData) => ({ ...prevData, date }));
    };



    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);

    const handleEditButtonClick = () => {
        setDisableButton(!disableButton);
    };



  return (
    <>


<div className="flex justify-between w-full pb-[16px]">
                <div className="px-6  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold ">Distributor:</div>
                       <span className="text-textGrey2 text-base font-medium">{!isLoading ? otherData.distributor : <Loading2 />} </span>
                    </div>
                </div>
                <div className="px-6 py-1  bg-white rounded-[10px] justify-start items-center flex w-full ">
                    <div className="flex w-full justify-start">
                        <div className="text-gray-500 text-base font-bold  pr-[8px] w-3/12 py-3">Reference Number:</div>
                        <div className="flex items-center justify-between w-[29.4rem]">
                            <span className="text-textGrey2 text-base font-medium">{!isLoading ? otherData.invoiceNo : <Loading2 />}</span>
                            {/* <input
                                ref={inputRef}
                                className={`w-[25rem] h-9 text-neutral-400 text-base font-medium  px-2 focus:outline-none border-0 rounded-[5px] focus:border focus:border-solid focus:border-[#35BEB1] bg-inherit`}
                                value={otherData.invoiceNo}
                                disabled={disableButton}
                                autoFocus={!disableButton}
                            />
                            <button
                                onClick={handleEditButtonClick} className="border-0"
                            >
                                <Image src={editicon} alt="edit" ></Image>
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-2 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[0.8rem] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-1/8">Date:</div>
                       

                        <div
                            className={"text-gray-500 text-base font-medium  w-full"}>
                            {!isLoading ? formatDateAndTime(otherData.date).formattedDate : <Loading2 />}
                        </div>


                    </div>
                </div>
                <div className="px-6 py-2 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[0.2rem] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-[12rem]">Delivery Due Date:</div>
                        
                        <div
                            className={"text-gray-500 text-base font-medium  w-full"}>
                             {!isLoading ? formatDateAndTime(otherData.dueDate).formattedDate : <Loading2 />}
                        </div>



                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-1  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold py-3">Notes:</div>
                        <div className='w-full h-9 text-textGrey1 text-base font-medium px-2 rounded border-0 outline-none'>{!isLoading ? otherData.notes : <Loading2 />}</div>
                        </div>
                </div>
            </div>
            


        </>
  )
}

export default ExsistingPurcaseReturnHeader