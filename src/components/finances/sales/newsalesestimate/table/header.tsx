import React, { useContext, useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { DataContext } from './DataContext';
import editicon from "../../../../../assets/icons/finance/1. Icons-25.svg";
import calicon from "../../../../../assets/icons/finance/calendar_today.svg";
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import Loading2 from '@/app/loading2';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

const NewsaleEstimateHeader = ({ isNewClientClicked, newClient }: any) => {

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
    const initialInvoiceNo = generateInvoiceNumber(Number(count));
    const { headerData, setHeaderData } = useContext(DataContext);
    const [startDate, setStartDate] = useState(new Date());
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [disableButton, setDisableButton] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [customers, setCustomers] = useState<any[]>([]);
    const appState = useAppSelector((state) => state.app)
    const [dueDate, setDueDate] = useState(new Date());
    const [isCustomerValid, setIsCustomerValid] = useState(true);

    const handleCustomerChange = (selectedOption: any) => {
        setHeaderData((prevData) => ({ ...prevData, customer: selectedOption }));
        setIsCustomerValid(!!selectedOption);
    };

    useEffect(() => {
        setIsCustomerValid(!!headerData.customer);
    }, [headerData.customer]);

    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });
    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);
    const [invoiceNo] = useState(`SE-${initialInvoiceNo}`);
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
    useEffect(() => {
        setHeaderData((prevData) => ({ ...prevData, invoiceNo: invoiceNo,dueDate:dueDate }))

    }, [])


    useEffect(() => {
        if (isNewClientClicked) {
            const newlyCreatedClient = {
                value: {
                    clientName: newClient.clientName,
                    contact: newClient.contact,
                    clientId: newClient.id,
                    email: newClient.email
                },
                label: `${newClient.clientName}\u00A0\u00A0\u00A0\u00A0\u00A0${newClient.contact}`
            }
            setHeaderData((prevData) => ({ ...prevData, customer: newlyCreatedClient }))
        }
    }, [isNewClientClicked])


    useEffect(() => {
        if (!isLoading && !error && data) {
            const clients = data.map((client: any) => ({
                value: {
                    clientName: client.clientName,
                    contact: client.contact,
                    clientId: client.id,
                    email: client.email
                },
                label: `${client.clientName}\u00A0\u00A0\u00A0\u00A0\u00A0${client.contact}`
            }))
            setCustomers(clients);

        }
    }, [data])

    return (
        <>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold ">Client:</div>
                        {
                            isLoading ? <div className='text-textGrey2 text-base font-medium'><Loading2 /></div> : (
                                <Select
                                    className="text-gray-500 text-base font-medium  w-full border-0 boxShadow-0"
                                    classNamePrefix="select"
                                    isClearable={isClearable}
                                    isSearchable={isSearchable}
                                    value={headerData.customer}
                                    name="color"
                                    options={customers}
                                    styles={customStyles}
                                    onChange={(selectedOption) => setHeaderData((prevData) => ({ ...prevData, customer: selectedOption }))}
                                />
                            )}
                    </div>
                    {!isCustomerValid && <div className="text-red-500 text-sm mt-1">Customer is required</div>}
                </div>
                <div className="px-6 py-1 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                    <div className="flex w-full">
                        <div className="text-gray-500 text-base font-bold w-[12rem] py-3">Invoice Number:</div>
                        <div className="flex items-center justify-between w-full">
                            <input
                                ref={inputRef}
                                className={`w-[90%] h-9 text-textGrey2 text-base font-medium  px-2 focus:outline-none border-0 rounded-[5px] focus:border focus:border-solid focus:border-[#35BEB1] bg-inherit`}
                                value={invoiceNo}
                                disabled={disableButton}
                                autoFocus={!disableButton}
                            />
                            {/* <button onClick={handleEditButtonClick} className="border-0 mr-5">
                                <Image src={editicon} alt="edit" />
                            </button> */}
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
                        <div className='customDatePickerWidth'>
                            <DatePicker
                                className="w-full"
                                selected={startDate}
                                onChange={handleDateChange}
                                calendarClassName="react-datepicker-custom"
                                customInput={
                                    <div className='relative'>
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
                        <div className='customDatePickerWidth'>
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
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-1 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold py-3">Notes:</div>
                        <input
                            type="text"
                            className=" w-full h-9 text-textGrey2 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                            placeholder="..."
                            value={headerData.notes}
                            onChange={(e) => setHeaderData((prevData) => ({ ...prevData, notes: e.target.value }))}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewsaleEstimateHeader;
