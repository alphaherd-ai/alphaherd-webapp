"use client"

import SelectDropdown from 'react-native-select-dropdown'

import editicon from "../../../../../assets/icons/finance/1. Icons-25.svg"

import calicon from "../../../../../assets/icons/finance/calendar_today.svg"

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css';
import ReactDropdown from "react-dropdown"

const NewsalesReturnHeader = () => {
  

    const colourOptions = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const initialItems = [
        { id: 1, quantity: 4, quantity2: 5 },
        { id: 2, quantity: 3, quantity2: 6 },
        
    ]
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

    const handleEditButtonClick = () => {
        setDisableButton(!disableButton);
    };

 



    return (
        <>


            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi']">Customer:</div>
                        <Select
                            className="text-gray-500 text-base font-medium font-['Satoshi'] w-full border-0 boxShadow-0"
                            classNamePrefix="select"
                            defaultValue={colourOptions[0]}
                            isClearable={isClearable}
                            isSearchable={isSearchable}
                            name="color"
                            options={colourOptions}
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    border: state.isFocused ? 'none' : 'none',
                                }),

                            }}
                        />

                    </div>
                </div>
                <div className="px-6 py-4  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi'] pr-[16px] w-3/12">Invoice Number:</div>
                        <div className="flex items-center justify-between w-9/12">
                            <input
                                ref={inputRef}
                                className={`text-gray-500 text-base font-medium font-['Satoshi'] border-0 bg-inherit`}
                                value={"Hehe"}
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
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi'] w-1/8">Date:</div>
                        <DatePicker
                            className={"text-gray-500 text-base font-medium font-['Satoshi'] w-full"}

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
                        />


                    </div>
                </div>
                <div className="px-6 py-2 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi'] w-1/8">Date:</div>
                        <DatePicker
                            className={"text-gray-500 text-base font-medium font-['Satoshi'] w-full"}

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
                        />


                    </div>
                </div>
                <div className="px-6 py-2 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi'] w-2/12">Due Date:</div>
                        <DatePicker
                            className={"text-gray-500 text-base font-medium font-['Satoshi'] w-10/12 border-0 boxShadow-0"}
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
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-4  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi']">Notes:</div>
                        <input type="text" className="border-0" defaultValue={"..."} />
                    </div>
                </div>
            </div>

    
          
        </>

    )
}

export default NewsalesReturnHeader;