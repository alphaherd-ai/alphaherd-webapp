"use client"




import calicon from "../../../../../assets/icons/finance/calendar_today.svg"

import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { useRef } from "react"

import Image from "next/image"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';

import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
import { DataContext } from "./DataContext";
import { useSearchParams } from "next/navigation";
import formatDateAndTime from "@/utils/formateDateTime";
import { generateInvoiceNumber } from "@/utils/generateInvoiceNo";

import Loading2 from "@/app/loading2";
import { useRouter } from 'next/navigation';

//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
const NewPurchaseReturnNewHeader = ({existingHeaderData}:any) => {
    const url=useSearchParams();
    const id=url.get('id');
    const count=url.get('count');
    const initialInvoiceNo =generateInvoiceNumber(Number(count));
    const { headerData, setHeaderData } = useContext(DataContext);
    const [startDate, setStartDate] = useState(new Date());
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [disableButton, setDisableButton] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [distributor,setDistributors]=useState<any[]>([]);
    const appState = useAppSelector((state) => state.app)
    const [dueDate, setDueDate] = useState(new Date());
    const [invoiceOptions, setInvoiceOptions] = useState<any[]>([]);
    const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/getAll?branchId=${appState.currentBranchId}`,fetcher,{revalidateOnFocus:true});
    console.log("data in new purchase return header is :", data);
    const [searchOptions, setSearchOptions] = useState<any[]>([]);
    const [selectedInvoice,setSelectedInvoice]=useState<any>(null);
    const { data: purchaseData, isLoading: purchaseLoading, error: purchaseError } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/getAll?branchId=${appState.currentBranchId}`, fetcher);
    const router=useRouter();
    console.log("purchase data 123456 is ",purchaseData);
   
    useEffect(() => {
        if (!purchaseError && !purchaseLoading && purchaseData) {
            const filteredOptions = purchaseData.filter((item: any) => (
                item.type.includes('Purchase_Invoice')
            ))

            const options = filteredOptions.map((item: any) => (
                {
                    label: item.invoiceNo,
                    value: item
                }
            ))
            setSearchOptions(options)
            //console.log(purchaseData);
        }
    }, [purchaseData, purchaseLoading, purchaseError])
    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);
    const [invoiceNo] = useState(`PR-${initialInvoiceNo}`);


    const handleDateChange = (date:any) => {
        setStartDate(date);
        setHeaderData((prevData) => ({ ...prevData, date }));
    };
    const handleDueDateChange= (date:any)=>{
        setDueDate(date);
        setHeaderData((prevData)=>({...prevData,dueDate:date}))
    }
    const handleSearch=(selectedInvoice:any)=>{
        console.log(selectedInvoice);
        setSelectedInvoice(selectedInvoice);
        router.push(`return?id=${selectedInvoice.value.id}`)
      
    }
    useEffect(()=>{
        if(id){
            setHeaderData(existingHeaderData)
            // console.log("this is header data",headerData)
        }
     else{
        setHeaderData((prevData)=>({...prevData,invoiceNo:invoiceNo,dueDate:dueDate}))}
    },[])
    useEffect(()=>{
        if(!isLoading&&!error&&data){
              const distributors=data?.map((distributor:any)=>({
                value:distributor.distributorName,
                distributorId:distributor.id,
                email:distributor.email,
                label:`${distributor.distributorName}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${distributor.contact}` 
            }))
            setDistributors(distributors);

        }
        if (headerData.distributor) {
            const invoices = purchaseData?.filter((item: { type: string; distributorId: number }) => 
                item.type === 'Purchase_Invoice' && item.distributorId === headerData.distributor.distributorId
            );
            console.log(invoices);
            const options = invoices?.map((item: any) => (
                {
                    label: item.invoiceNo,
                    value: item
                }
            ))
            setSearchOptions(options)
        }

    }, [data, headerData])



    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);

    const handleEditButtonClick = () => {
        setDisableButton(!disableButton);
    };


    const customStyles = {
        control: (provided: any, state: any) => ({
          ...provided,
          width: '100%',
          maxWidth: '100%',
          border: state.isFocused ? '1px solid #35BEB1' : 'none',
          '&:hover': {
            borderColor: state.isFocused ? '1px solid #35BEB1' : '#C4C4C4', 
            },
          boxShadow: state.isFocused ? 'none' : 'none',
        }),
        valueContainer: (provided: any) => ({
          ...provided,
          width: '100%',
          maxWidth: '100%',
        }),
        singleValue: (provided: any, state: any) => ({
          ...provided,
          width: '100%',
          maxWidth: '100%',
          color: state.isSelected ? '#6B7E7D' : '#6B7E7D',
        }),
        menu: (provided: any) => ({
          ...provided,
          backgroundColor: 'white',
          width: '100%',
          maxWidth: '100%',
        }),
        option: (provided: any, state: any) => ({
          ...provided,
          backgroundColor: state.isFocused ? '#35BEB1' : 'white',
          color: state.isFocused ? 'white' : '#6B7E7D',
          '&:hover': {
            backgroundColor: '#35BEB1',
            color: 'white',
          },
        }),
      };

  return (
    <>


<div className="flex justify-between w-full pb-[16px]">
                <div className="px-6  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold ">Distributor:</div>
                        { id===null?(
                            isLoading?<Loading2/>:(
                        <Select
                            className="text-gray-500 text-base font-medium  w-full border-0 boxShadow-0"
                            classNamePrefix="select"
                            defaultValue={distributor[0]}
                            isClearable={isClearable}
                            isSearchable={isSearchable}
                            name="color"
                            options={distributor}
                            value={headerData.distributor}
                            styles={customStyles}
                            onChange={(selectedOption) => setHeaderData((prevData) => ({ ...prevData, distributor: selectedOption }))}
                        /> )):(
                            existingHeaderData.distributor
                        )}

                    </div>
                </div>
                <div className="px-6 py-1  bg-white rounded-[10px] justify-start items-center flex w-full ">
                    <div className="flex w-full justify-start">
                        <div className="text-gray-500 text-base font-bold  pr-[8px] w-3/12 py-3">Reference Number:</div>
                        <div className="flex items-center justify-between w-[29.4rem]">
                        {id===null?   (
                                <Select
                                    className="text-gray-500 text-base font-medium w-[100%] border-0 boxShadow-0"
                                    classNamePrefix="select"
                                    isClearable={isClearable}
                                    isSearchable={isSearchable}
                                    value={selectedInvoice}
                                    options={searchOptions}
                                    onChange={(selectedInvocice: any) => handleSearch(selectedInvocice)}
                                    //placeholder="Search via invoice no."
                                    menuPortalTarget={document.body}
                                    styles={customStyles}
                                    placeholder={invoiceNo}
                                />
                            ) : (
                                existingHeaderData.invoiceNo
                            )}
                            {/* <button
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
                        <div className="text-gray-500 text-base font-bold  w-1/8">Purchase Date:</div>
                        {id===null?(
                        // <DatePicker
                        //     className={"text-gray-500 text-base font-medium  w-full"}
                        //     value={startDate}
                        //     onChange={handleDateChange}
                        //     clearIcon={() => null}
                        //     calendarIcon={() => (
                        //         <Image src={calicon} alt="Calendar Icon" width={20} height={20} />
                        //     )}
                        // />
                        // <div className='w-full relative'>
                        
                        <div className="customDatePickerWidth">
                        <DatePicker
                                        className="w-full"
                                        selected={startDate}
                                        onChange={handleDateChange}
                                        calendarClassName="react-datepicker-custom"
                                        customInput={
                                            <div className='relative '>
                                                <input
                                                    className="w-full h-9 text-textGrey2 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                                    value={startDate.toLocaleDateString('en-GB')}
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
                                    
                                    // </div>
                    ):(
                            formatDateAndTime(existingHeaderData.date).formattedDate
                        )}
                    </div>
                </div>
                <div className="px-6 py-2 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[0.2rem] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-[12rem]">Return Date:</div>
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
                        {id === null ? (
                        <div className="customDatePickerWidth">
                        <DatePicker
                                        className="w-full"
                                        selected={dueDate}
                                        onChange={handleDueDateChange}
                                        calendarClassName="react-datepicker-custom"
                                        customInput={
                                            <div className='relative'>
                                                <input
                                                    className="w-full h-9 text-textGrey2 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                                    value={headerData?.dueDate?.toLocaleDateString('en-GB')}
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
                                    {!headerData?.dueDate && (
                                     <div className="text-red-500 text-sm mt-1">Please select a due date.</div>
                                    )}
                                    </div>
                                    ) : (
                                        formatDateAndTime(existingHeaderData.dueDate).formattedDate
                                        )}


                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-1  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold py-3">Notes:</div>
                        {id===null?(
                        <input
                            type="text"
                            className=" w-full h-9 text-textGrey2 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                            placeholder="..."
                            value={headerData.notes}
                            onChange={(e) => setHeaderData((prevData) => ({ ...prevData, notes: e.target.value }))}
                        />    ):(
                            existingHeaderData.notes
                        )}             
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
                            <input type="text" className="w-[20rem] py-3  text-textGrey2 text-base font-medium px-2 rounded border border-solid border-borderGrey" defaultValue="Ends never"  disabled />
                        </div>
                    </div>
                    

                </div>
            </div> */}


        </>
  )
}

export default NewPurchaseReturnNewHeader