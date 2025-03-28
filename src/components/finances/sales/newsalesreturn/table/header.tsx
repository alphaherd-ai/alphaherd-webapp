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
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import Loading2 from '@/app/loading2';
import { useRouter } from 'next/navigation';
import SalesInvoice from '@/app/finance/sales/invoice/page';
import { setOptions } from 'react-chartjs-2/dist/utils';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

const NewsalesReturnHeader = ({ existingHeaderData }: any) => {



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


    const url = useSearchParams();
    const id = url.get('id');
    const count = url.get('count');
    const router = useRouter();
    //console.log(existingHeaderData)
    const initialInvoiceNo = generateInvoiceNumber(Number(count));
    const { headerData, setHeaderData } = useContext(DataContext);
    const [startDate, setStartDate] = useState(new Date());
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [disableButton, setDisableButton] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [customers, setCustomers] = useState<any[]>([]);
    const appState = useAppSelector((state) => state.app)
    //const [invoiceOptions, setInvoiceOptions] = useState<any[]>([]);
    const [dueDate, setDueDate] = useState(new Date());
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });
    const [searchOptions, setSearchOptions] = useState<any[]>([]);
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
    const { data: salesData, isLoading: salesLoading, error: salesError } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/getAll?branchId=${appState.currentBranchId}`, fetcher);

    useEffect(() => {
        if (!salesError && !salesLoading && salesData) {
            const filteredOptions = salesData.filter((item: any) => (
                item.type.includes('Sales_Invoice')
            ))

            const options = filteredOptions.map((item: any) => (
                {
                    label: item.invoiceNo,
                    value: item
                }
            ))
            setSearchOptions(options)
            console.log(options);
        }
    }, [salesData, salesLoading, salesError])

    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);
    const [invoiceNo] = useState(`SR-${initialInvoiceNo}`);
    const handleEditButtonClick = () => {
        setDisableButton(!disableButton);
    };

    const handleDateChange = (date: any) => {
        setStartDate(date);
        setHeaderData((prevData) => ({ ...prevData, date }));
    };
    const handleDueDateChange = (date: any) => {
        setDueDate(date);
        setHeaderData((prevData) => ({ ...prevData, dueDate: date }))
    }

    const handleSearch = (selectedInvoice: any) => {
        console.log(selectedInvoice);
        setSelectedInvoice(selectedInvoice);
        router.push(`invoicereturn?id=${selectedInvoice.value.id}`)
    }


    useEffect(() => {
        if (id) {
            setHeaderData(existingHeaderData)
        }
        else {

            setHeaderData((prevData) => ({ ...prevData, invoiceNo: invoiceNo, dueDate: dueDate }))
        }
    }, [])

    useEffect(() => {
        if (!isLoading && !error && data) {

            const clients = data.map((client: any) => ({
                value: {
                    clientName: client.clientName,
                    contact: client.contact,
                    invoiceNo: client.invoiceNo,
                    clientId: client.id,
                    email: client.email
                },
                label: `${client.clientName}\u00A0\u00A0\u00A0\u00A0\u00A0${client.contact}`
            }))
            // console.log(clients)
            setCustomers(clients);

        }
        if (headerData.customer) {
            const invoices = salesData.filter((item: { type: string; clientId: number }) => 
                item.type === 'Sales_Invoice' && item.clientId === headerData.customer.value.clientId
            );
            console.log(invoices);
            const options = invoices.map((item: any) => (
                {
                    label: item.invoiceNo,
                    value: item
                }
            ))
            setSearchOptions(options)

        }

    }, [data, headerData])


    return (
        <>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold ">Client:</div>

                        {id === null ? (
                            isLoading ? <div className='text-textGrey2 text-base font-medium'><Loading2 /></div> : (
                                <Select
                                    className="text-gray-500 text-base font-medium  w-full border-0 boxShadow-0"
                                    classNamePrefix="select"
                                    isClearable={isClearable}
                                    isSearchable={isSearchable}
                                    name="color"
                                    value={headerData.customer}
                                    options={customers}
                                    styles={customStyles}
                                    onChange={(selectedOption) => setHeaderData((prevData) => ({ ...prevData, customer: selectedOption }))}
                                />
                            )) : (
                            existingHeaderData.customer
                        )}

                    </div>
                </div>
                <div className="px-6 py-1 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                    <div className="flex w-full">
                        <div className="text-gray-500 text-base font-bold w-[12rem] py-3">Invoice Number:</div>
                        <div className="flex items-center justify-between w-full ">
                            {id === null ? (
                                <Select
                                    className="text-gray-500 text-base font-medium w-[100%] border-0 boxShadow-0"
                                    classNamePrefix="select"
                                    isClearable={isClearable}
                                    isSearchable={isSearchable}
                                    //isDisabled={!headerData.customer}
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
                            {/* <button onClick={handleEditButtonClick} className="border-0 mr-5">
                            <Image src={editicon} alt="edit" />
                        </button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-2 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[0.8rem] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-1/8">Date:</div>
                        {id === null ? (
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
                        ) : (
                            formatDateAndTime(existingHeaderData.date).formattedDate
                        )}
                    </div>
                </div>
                <div className="px-6 py-2 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                    <div className="flex gap-[0.2rem] items-center w-full">
                        <div className="text-gray-500 text-base font-bold w-[6rem]">Due Date:</div>
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
                                                value={headerData?.dueDate?.toLocaleDateString('en-GB') || dueDate.toLocaleDateString('en-GB')}
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
                        ) : (
                            formatDateAndTime(existingHeaderData.dueDate).formattedDate
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-1 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold py-3">Notes:</div>
                        {id === null ? (
                            <textarea
                                rows={4}
                                cols={100}
                                className=" w-full h-9 text-textGrey2 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                placeholder="..."
                                value={headerData.notes}
                                onChange={(e) => setHeaderData((prevData) => ({ ...prevData, notes: e.target.value }))}
                            />
                        ) : (
                            existingHeaderData.notes
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewsalesReturnHeader;