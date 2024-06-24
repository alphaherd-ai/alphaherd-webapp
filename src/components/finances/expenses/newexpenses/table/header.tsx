"use client";
import React, { useContext, useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { DataContext } from './DataContext';
import editicon from "../../../../../assets/icons/finance/1. Icons-25.svg";
import calicon from "../../../../../assets/icons/finance/calendar_today.svg";
import formatDateAndTime from '@/utils/formateDateTime';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
const NewExpensesHeader = () => {
  
    const { headerData, setHeaderData } = useContext(DataContext);
    const [startDate, setStartDate] = useState(new Date());
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [disableButton, setDisableButton] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [customers,setCustomers]=useState<any[]>([]);
    const appState = useAppSelector((state) => state.app)
    const [dueDate, setDueDate] = useState(new Date());
    const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/getAll?branchId=${appState.currentBranchId}`,fetcher,{revalidateOnFocus:true});
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
    const handleDueDateChange= (date:any)=>{
        setDueDate(date);
        setHeaderData((prevData)=>({...prevData,dueDate:date}))
    }
    

    useEffect(()=>{
        if(!isLoading&&!error&&data){
              const  clients=data.map((client:any)=>({
                value:client.clientName,
                label:client.clientName
            }))
            setCustomers(clients);

        }
    },[data])
 



    return (
        <>

<div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold ">Customer:</div>
                        
                                <Select
                                className="text-gray-500 text-base font-medium  w-full border-0 boxShadow-0"
                                classNamePrefix="select"
                               
                                isClearable={isClearable}
                                isSearchable={isSearchable}
                                name="color"
                                options={customers}
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
                                value={"789"}
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
                    <div className="flex gap-[0.8rem] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-1/8">Date:</div>
                        
                        
                        <div className='w-full relative'>
                        <DatePicker
                                        className="w-[37rem]"
                                        selected={startDate}
                                        onChange={handleDateChange}
                                        calendarClassName="react-datepicker-custom"
                                        customInput={
                                            <div className='relative'>
                                                <input
                                                    className="w-[37rem] h-9 text-textGrey1 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
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
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-2/12">Due Date:</div>
                        
                       
                        <div className='w-full relative'>
                        <DatePicker
                                        className="w-[34.5rem]"
                                        selected={dueDate}
                                        onChange={handleDueDateChange}
                                        calendarClassName="react-datepicker-custom"
                                        customInput={
                                            <div className='relative'>
                                                <input
                                                    className="w-[34.5rem] h-9 text-textGrey1 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                                    value={dueDate.toLocaleDateString()}
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
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-1 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold py-3">Notes:</div>
                        <input
                            type="text"
                            className=" w-full h-9 text-borderGrey text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                            defaultValue={"..."}
                            onChange={(e) => setHeaderData((prevData) => ({ ...prevData, notes: e.target.value }))}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewExpensesHeader;
