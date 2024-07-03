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

const ExsistingPurchasesHeader = ({otherData}:any) => {



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
                       {otherData.distributor}
                    </div>
                </div>
                <div className="px-6 py-1  bg-white rounded-[10px] justify-start items-center flex w-full ">
                    <div className="flex w-full justify-start">
                        <div className="text-gray-500 text-base font-bold  pr-[8px] w-3/12 py-3">Reference Number:</div>
                        <div className="flex items-center justify-between w-[29.4rem]">
                            <input
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
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-2 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[0.8rem] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-1/8">Date:</div>
                        {/* <DatePicker
                            className={"text-gray-500 text-base font-medium  w-full"}

                            value={startDate}


                            onChange={(date) => {
                                if (date instanceof Date) {
                                    setStartDate(date);
                                } else if (Array.isArray(date) && date.length === 2 && date[0] instanceof Date) {
                                    // Assuming you want the start date of the range
                                    setStartDate(date[0]);
                                }
                            }}
                            clearIcon={() => null}
                            calendarIcon={() => (
                                <Image src={calicon} alt="Calendar Icon" width={20} height={20} />
                            )}
                        /> */}

<div className="customDatePickerWidth">
                                    {formatDateAndTime(otherData.date).formattedDate}
                                    </div>


                    </div>
                </div>
                <div className="px-6 py-2 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[0.2rem] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-[12rem]">Delivery Due Date:</div>
                        {/* <DatePicker
                            className={"text-gray-500 text-base font-medium  w-10/12 border-0 boxShadow-0"}
                            selected={startDate}
                            onChange={(date) => {
                                if (date instanceof Date) {
                                    setStartDate(date);
                                } else if (Array.isArray(date) && date.length === 2 && date[0] instanceof Date) {
                                    // Assuming you want the start date of the range
                                    setStartDate(date[0]);
                                }
                            }}
                            clearIcon={() => null}
                            calendarIcon={() => (
                                <Image src={calicon} alt="Calendar Icon" width={20} height={20} />
                            )}
                        /> */}
                        <div className="customDatePickerWidth">
                        {formatDateAndTime(otherData.dueDate).formattedDate}
                                    </div>



                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-1  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold py-3">Notes:</div>
                        {otherData.notes}              
                        </div>
                </div>
            </div>
            {/* <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-4  bg-white rounded-[10px] justify-between items-center gap-4 flex flex-col w-full ">
                    <div className="flex flex-col gap-[16px] w-full">
                        <div className="text-gray-500 text-base font-bold ">Recurring Expense</div>
                        <div className='w-full flex gap-8'>
                            <input type="text" className="w-[20rem] py-3  text-textGrey2 text-base font-medium px-2 rounded border border-solid border-borderGrey" defaultValue="Every Month" disabled   />
                            <input type="text" className="w-[20rem] py-3  text-textGrey2 text-base font-medium px-2 rounded border border-solid border-borderGrey" defaultValue="Started on 7/8/24"  disabled />
                            <input type="text" className="w-[20rem] py-3  text-textGrey1 text-base font-medium px-2 rounded border border-solid border-borderGrey" defaultValue="Ends never"  disabled />
                        </div>
                    </div>
                    

                </div>
            </div> */}


        </>
  )
}

export default ExsistingPurchasesHeader