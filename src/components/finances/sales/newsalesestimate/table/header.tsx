import React, { useContext, useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { DataContext } from './DataContext';
import editicon from "../../../../../assets/icons/finance/1. Icons-25.svg";
import calicon from "../../../../../assets/icons/finance/calendar_today.svg";
import { useSearchParams } from 'next/navigation';

const NewsaleEstimateHeader = () => {
    const url=useSearchParams();
    const id=url.get('id');
    const count=url.get('count');
    const { headerData, setHeaderData } = useContext(DataContext);
    const [startDate, setStartDate] = useState(new Date());
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [disableButton, setDisableButton] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [dueDate, setDueDate] = useState(new Date());
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
        setHeaderData((prevData) => ({ ...prevData, date }));
    };
    const handleDueDateChange= (date:any)=>{
        setDueDate(date);
        setHeaderData((prevData)=>({...prevData,dueDate:date}))
    }
    useEffect(()=>{
        setHeaderData((prevData)=>({...prevData,invoiceNo:"SE-"+count}))
       
    },[])
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
                        <div className="text-gray-500 text-base font-bold ">Customer:</div>
                        <Select
                            className="text-gray-500 text-base font-medium  w-full border-0 boxShadow-0"
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
                    </div>
                </div>
                <div className="px-6 py-1 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                    <div className="flex w-full">
                        <div className="text-gray-500 text-base font-bold  pr-[16px] w-3/12 py-3">Invoice Number:</div>
                        <div className="flex items-center justify-between w-[29.4rem]">
                            <input
                                ref={inputRef}
                                className={`w-[25rem] h-9 text-neutral-400 text-base font-medium  px-2 focus:outline-none border-0 rounded-[5px] focus:border focus:border-solid focus:border-[#35BEB1] bg-inherit`}
                                value={"SE-"+count}
                                disabled={disableButton}
                                autoFocus={!disableButton}
                            />
                            <button onClick={handleEditButtonClick} className="border-0">
                                <Image src={editicon} alt="edit" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-2 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[0.8rem] items-center w-full ">
                        <div className="text-gray-500 text-base font-bold  w-1/8">Date:</div>
                        {/* <DatePicker
                            className={"text-gray-500 text-base font-medium  w-full"}
                            value={startDate}
                            onChange={handleDateChange}
                            clearIcon={() => null}
                            calendarIcon={() => (
                                <Image src={calicon} alt="Calendar Icon" width={20} height={20} />
                            )}
                        /> */}
                        <div className='w-full relative'>
                        <DatePicker
                                        className="w-[37rem]"
                                        selected={startDate}
                                        onChange={handleDateChange}
                                        calendarClassName="react-datepicker-custom"
                                        customInput={
                                            <div className='relative'>
                                                <input
                                                    className="w-[37rem] h-9 text-borderGrey text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                                    value={startDate.toLocaleDateString()}
                                                    readOnly
                                                />
                                                <Image
                                                    src={calicon}
                                                    alt="Calendar Icon"
                                                    className="absolute right-2 top-2 cursor-pointer"
                                                    width={50}
                                                    height={20}
                                                />
                                            </div>
                                        }
                                    />
                                    </div>
                    </div>
                </div>
                <div className="px-6 py-2 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                    <div className="flex gap-[0.2rem] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-[6rem]">Due Date:</div>
                        {/* <DatePicker
                            className={"text-gray-500 text-base font-medium  w-10/12 border-0 boxShadow-0"}
                            value={startDate}
                            onChange={handleDateChange}
                            clearIcon={() => null}
                            calendarIcon={() => (
                                <Image src={calicon} alt="Calendar Icon" width={20} height={20} />
                            )}
                        /> */}
                        <div className='w-full relative'>
                        <DatePicker
                                        className="w-[34.5rem]"
                                        selected={startDate}
                                        onChange={handleDateChange}
                                        calendarClassName="react-datepicker-custom"
                                        customInput={
                                            <div className='relative'>
                                                <input
                                                    className="w-[34.5rem] h-9 text-borderGrey text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                                    value={startDate.toLocaleDateString()}
                                                    readOnly
                                                />
                                                <Image
                                                    src={calicon}
                                                    alt="Calendar Icon"
                                                    className="absolute right-0 top-2 cursor-pointer"
                                                    width={50}
                                                    height={20}
                                                />
                                            </div>
                                        }
                                    />
                                    </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-1 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold py-3">Notes:</div>
                        <input
                            type="text"
                            className=" w-full h-9 text-textGrey1 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                            defaultValue={"..."}
                            onChange={(e) => setHeaderData((prevData) => ({ ...prevData, notes: e.target.value }))}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewsaleEstimateHeader;
