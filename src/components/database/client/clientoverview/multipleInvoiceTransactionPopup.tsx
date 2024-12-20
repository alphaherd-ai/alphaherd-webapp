"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import RadioButton from "../../../../assets/icons/finance/radio_button.svg"
import RadioButtonSelec from "../../../../assets/icons/finance/radio_button (1).svg"
import DatePicker from 'react-datepicker';

import check from "../../../../assets/icons/finance/check.svg"
import { useDispatch } from 'react-redux';
import { addAmount } from '@/lib/features/transactionAmount/transactionAmountSlice';
import { useSearchParams } from 'next/navigation';
import 'react-datepicker/dist/react-datepicker.css';

import calicon from "../../../../assets/icons/finance/calendar_today.svg";
import useSWR from 'swr';
import closeicon from '../../../../assets/icons/finance/closeIcon.svg';
import Select from 'react-select';
import { Button } from '@nextui-org/react';
import { useAppSelector } from '@/lib/hooks';
import Loading2 from '@/app/loading2';
import { useRouter } from 'next/navigation';
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())





const RecordTransactionPopup= ({setOpen,clientName,togglePopup,formData,setFormData}:any) => {

    const dispatch = useDispatch();
    const router=useRouter();
    const [isSaving, setSaving] = useState(false);
    
    const receiptNo=useState(generateInvoiceNumber(1));
    const appState = useAppSelector((state) => state.app)
    const [isAdvancePayment, setIsAdvancePayment] = useState(false);
    const url = useSearchParams();
    const id = url.get('id');

    const Mode = [
        { value: "Cash", label: "Cash" },
        { value: "UPI", label: "UPI" },
        { value: "Card", label: "Card" },
        { value: "Net Banking", label: "Net Banking" },
    ]

    const [selectedMode, setSelectedMode] = useState('');
    const [modeOptions, setModeOptions] = useState<any>([]);

    const { data: modes, error: modesError, isLoading: modesLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });
    

    useEffect(() => {
        if (modes && !modesError && !modesLoading) {
            const options3 = modes.map((mode: any) => ({
                value: mode?.id,
                label: mode?.name,
            }))
            setModeOptions(options3)
        }
    }, [modes, modesError, modesLoading])

    const handleModeSelect = (selectedOptions: any) => {
        setFormData({ ...formData, mode: selectedOptions?.label });
        setSelectedMode(selectedOptions?.label);
    }


    

    const [startDate, setStartDate] = useState(new Date());
    const [transactionType, setTransactionType] = useState<string | null>("Money In");


    const handleDateChange = (date: any) => {
        setStartDate(date);
        setFormData({ ...formData, date });
    };

    const handleToggleRadioButton = (type: string) => {
        setFormData({ ...formData, moneyChange:type === 'Money In' ? 'In' : 'Out' });
        setTransactionType(type);
    };



    const handleSaveClick = async () => {
        setFormData({ ...formData, receiptNo: receiptNo });
        togglePopup((prev:any)=>!prev);
       setOpen((prev:any)=>!prev);
    };

    useEffect(()=>{
        setFormData({...formData,partyName:clientName})
    },[clientName])

    

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    }

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            width: '100%',
            maxWidth: '100%',
            border: state.isFocused ? '1px solid #35BEB1' : '#C4C4C4',
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
        menuPortal: (base: any) => ({ ...base, zIndex: 9999 })
    };

   
    const isDisabled = !formData?.mode || formData?.amountPaid === '0' || formData?.amountPaid===""
   

    

    return (
        <div className="w-1/2 mx-auto h-full flex  items-center   ">
            <div className="w-[640px] py-4 pb-8  px-8  bg-white rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                <div className='w-full flex flex-col gap-1'>
                    <div className="text-gray-500 flex items-center justify-between text-xl font-medium ">
                        Record 
                        <Image className='cursor-pointer' src={closeicon}  alt="" onClick={()=>togglePopup((prev:any)=>!prev)}/> 
                    </div>
                    <div className='mt-2 text-[#A2A3A3] text-md font-medium'>
                        Note down the details of transaction
                    </div>
                    
                </div>
                <div className='w-full flex gap-8'>
                    <div className='flex gap-1'>
                        <div onClick={() => handleToggleRadioButton('Money In')}>
                            {transactionType !== 'Money In' ? (
                                <Image src={RadioButton} alt='RadioButton' />
                            ) : (
                                <Image src={RadioButtonSelec} alt='RadioButtonSelec' />
                            )}
                        </div>
                        <div>
                            <span className='text-base text-textGrey2 font-medium'>
                                Money In
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <div onClick={() => handleToggleRadioButton('Money Out')}>
                            {transactionType !== 'Money Out' ? (
                                <Image src={RadioButton} alt='RadioButton' />
                            ) : (
                                <Image src={RadioButtonSelec} alt='RadioButtonSelec' />
                            )}
                        </div>
                        <div>
                            <span className='text-base text-textGrey2 font-medium'>
                                Money Out
                            </span>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <div>
                        <span className='text-gray-500 text-base font-medium '>Party Name</span>
                        
                    </div>

                    <div>
                        <div className="w-[440px] flex items-center h-9 rounded-[5px] text-textGrey2 bg-white text-base font-medium px-2 py-6  outline-none border border-solid border-gray-300 ">
                            {clientName}
                            {/* <div >
                                {balanceDue < 0 ? <span className="text-[#FC6E20] text-sm font-medium  px-2 py-1.5 bg-[#FFF0E9] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                                    You owe ₹{totalAmount.subTotal ? (balanceDue < 0 ? -1 * (balanceDue)?.toFixed(2) : (balanceDue)?.toFixed(2)) : 0}
                                </span> : balanceDue === 0 ? "" : <span className="text-[#0F9D58] text-sm font-medium  px-2 py-1.5 bg-[#E7F5EE] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                                    You’re owed ₹{totalAmount.subTotal ? (balanceDue < 0 ? -1 * (balanceDue)?.toFixed(2) : (balanceDue)?.toFixed(2)) : 0}
                                </span>}
                            </div> */}
                        </div>

                    </div>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Amount</span></div>
                    <div>
                        <input
                            className="w-[440px] h-9 rounded-[5px] text-textGrey2 text-base font-medium p-2 outline-none border border-solid border-gray-300 focus:border-teal-500"
                            type="number"
                            name="amountPaid"
                            value={formData.amountPaid}
                            onChange={(e) => handleChange("amountPaid", e.target.value)}
                        />
                    </div>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Receipt No.</span></div>
                    <div className='w-[440px] flex justify-between items-center'>
                        <div><div className="w-[10rem] h-9 rounded-[5px] bg-white text-textGrey2 text-base font-medium p-2  border border-solid border-gray-300">#{receiptNo[0]}</div></div>
                        <div><span className='text-gray-500 text-base font-medium '>Date</span></div>
                        <div className='relative'>
                            <DatePicker
                                className="w-[10rem] "
                                selected={startDate || new Date()}
                                onChange={handleDateChange}
                                calendarClassName="react-datepicker-custom"
                                customInput={
                                    <div className='relative'>
                                        <input
                                            className="w-[10rem] border border-solid border-borderGrey h-9 text-textGrey1 text-base font-medium px-2 rounded   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                            value={startDate?.toLocaleDateString() || new Date().toLocaleDateString()}
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
                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Mode</span></div>
                    <div className='w-[440px] flex justify-between items-center'>
                        {/* <Select
                        className="text-neutral-400 text-base font-medium w-full"
                        placeholder="Mode"
                        isClearable={false}
                        isSearchable={true}
                        options={Mode}
                        isMulti={false}
                        name="mode"
                        onChange={(value) => handleChange("mode", value)}
                    /> */}
                        {!modesLoading && modeOptions ? (
                            <Select
                                className="text-neutral-400 text-base font-medium w-full border border-solid border-borderGrey rounded-[5px]"
                                placeholder=""
                                isClearable={true}
                                isSearchable={true}
                                options={modeOptions}
                                isMulti={false}
                                name="mode"
                                onChange={(value) => handleModeSelect(value)}
                                styles={customStyles}
                            />
                        ) : (
                            <Loading2 />
                        )}
                    </div>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center gap-1'>
                        <input
                            type="checkbox"
                            name="advancePayment"
                            id="advancePayment"
                            checked={isAdvancePayment}
                            onChange={(e) => setIsAdvancePayment(e.target.checked)}
                        />
                        <span className='text-textGrey2 text-base font-medium'>Mark as advance payment</span>
                    </div>
                    <Button className={`px-4 py-2.5 bg-zinc-900 text-white text-base rounded-md justify-start items-center gap-2 flex border-0 outline-none  
                       
                    ${isDisabled?'bg-grey-400 cursor-not-allowed':'bg-zinc-900 cursor-pointer'}`} onClick={handleSaveClick} disabled={isDisabled}>
                        
                        <Image src={check} alt='check' />
                        <span className='text-white text-base font-medium pr-2'>Save</span>
                    </Button>
                </div>
            </div>
        </div>
    )

}

export default RecordTransactionPopup