"use client";
import React, { useContext, useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import DatePicker from 'react-date-picker';
import Image from 'next/image';
import { DataContext } from './DataContext';
import editicon from "../../../../../assets/icons/finance/1. Icons-25.svg";
import calicon from "../../../../../assets/icons/finance/calendar_today.svg";
import formatDateAndTime from '@/utils/formateDateTime';
import { useSearchParams } from 'next/navigation';


const NewsalesHeader = ({existingHeaderData}) => {
    const url=useSearchParams();
    const id=url.get('id');
    const { headerData, setHeaderData } = useContext(DataContext);
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

    const handleDateChange = (date:any) => {
        setStartDate(date);
        console.log(date);
        setHeaderData((prevData) => ({ ...prevData, date }));
    };
    useEffect(()=>{
        if(id){
            setHeaderData(existingHeaderData)
        }
    })
    const colourOptions = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

    return (
        <>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi']">Customer:</div>
                        {id===null?(
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
                                onChange={(selectedOption) => setHeaderData((prevData) => ({ ...prevData, customer: selectedOption }))}
                                />
                        ):(
                            existingHeaderData.customer
                        )}
                       
                    </div>
                </div>
                <div className="px-6 py-4 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                    <div className="flex w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi'] pr-[16px] w-3/12">Invoice Number:</div>
                        <div className="flex items-center justify-between w-9/12">
                         {id===null?   (<input
                                ref={inputRef}
                                className={`text-gray-500 text-base font-medium font-['Satoshi'] border-0 bg-inherit`}
                                value={"Hehe"}
                                disabled={disableButton}
                                autoFocus={!disableButton}
                            />):(
                                existingHeaderData.invoiceNo
                            )}
                            <button onClick={handleEditButtonClick} className="border-0">
                                <Image src={editicon} alt="edit" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-2 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi'] w-1/8">Date:</div>
                        {id===null?(<DatePicker
                            className={"text-gray-500 text-base font-medium font-['Satoshi'] w-full"}
                            value={startDate}
                            onChange={handleDateChange}
                            clearIcon={() => null}
                            calendarIcon={() => (
                                <Image src={calicon} alt="Calendar Icon" width={20} height={20} />
                            )}
                        />):(
                            formatDateAndTime(existingHeaderData.date).formattedDate
                        )}
                    </div>
                </div>
                <div className="px-6 py-2 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi'] w-2/12">Due Date:</div>
                        {id===null?(<DatePicker
                            className={"text-gray-500 text-base font-medium font-['Satoshi'] w-full"}
                            value={startDate}
                            onChange={handleDateChange}
                            clearIcon={() => null}
                            calendarIcon={() => (
                                <Image src={calicon} alt="Calendar Icon" width={20} height={20} />
                            )}
                        />):(
                            formatDateAndTime(existingHeaderData.date).formattedDate
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-4 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold font-['Satoshi']">Notes:</div>
                        {id===null?(<input
                            type="text"
                            className="border-0"
                            defaultValue={"..."}
                            onChange={(e) => setHeaderData((prevData) => ({ ...prevData, notes: e.target.value }))}
                        />):(
                            existingHeaderData.notes
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewsalesHeader;
