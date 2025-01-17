"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import RadioButton from "../../../../../assets/icons/finance/radio_button.svg"
import RadioButtonSelec from "../../../../../assets/icons/finance/radio_button (1).svg"
import DatePicker from 'react-datepicker';
import check from "../../../../../assets/icons/finance/check.svg"
import { useDispatch } from 'react-redux';
import { addAmount } from '@/lib/features/transactionAmount/transactionAmountSlice';

import 'react-datepicker/dist/react-datepicker.css';

import calicon from "../../../../../assets/icons/finance/calendar_today.svg";


import Select from 'react-select';
import { Button } from '@nextui-org/react';
import { useAppSelector } from '@/lib/hooks';
import { useSearchParams } from 'next/navigation';
import Loading2 from '@/app/loading2';
import useSWR from 'swr';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())


type PopupProps = {
    setCount: any,
    headerdata: any;
    initialInvoiceNo: any;
    balanceDue: any;
}


const RecordTransactionPopup: React.FC<PopupProps> = ({ setCount, headerdata, initialInvoiceNo, balanceDue }) => {
    const url = useSearchParams();
    const id = url.get('id');
    const dispatch = useDispatch();

    const [isSaving, setSaving] = useState(false);
    const [formData, setFormData] = useState<any>({
        amountPaid: "",
    });
    const appState = useAppSelector((state) => state.app)
    const [isAdvancePayment, setIsAdvancePayment] = useState(false);


    const Mode = [
        { value: "Cash", label: "Cash" },
        { value: "UPI", label: "UPI" },
        { value: "Card", label: "Card" },
        { value: "Net Banking", label: "Net Banking" },
    ]

    const [selectedMode, setSelectedMode] = useState('');
    const [modeOptions, setModeOptions] = useState<any>([]);

    const { data: modes, error: modesError, isLoading: modesLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/paymentMethod/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });


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
        setSelectedMode(selectedOptions?.label);
    }



    const Party = [
        { value: "WeCare", label: "WeCare" },
        { value: "Pawzeeble", label: "Pawzeeble" },
        { value: "Betaturd", label: "Betaturd" },
        { value: "Smegmalord", label: "Smegmalord" },
    ]

    const [startDate, setStartDate] = useState(new Date());
    const [transactionType, setTransactionType] = useState<string | null>("Money In");


    const handleDateChange = (date: any) => {
        setStartDate(date);
        setFormData({ ...formData, date });
    };

    const handleToggleRadioButton = (type: string) => {
        setTransactionType(type);
    };

    const handleSaveClick = async () => {
        setSaving(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/create?branchId=${appState.currentBranchId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    partyName: headerdata?.customer,
                    invoiceLink: headerdata?.invoiceNo,
                    receiptNo: initialInvoiceNo,
                    date: formData.date || new Date(),
                    amountPaid: parseInt(formData.amountPaid > 0 ? formData.amountPaid : -1 * formData.amountPaid, 10) || (balanceDue),
                    mode: selectedMode,
                    moneyChange: transactionType === 'Money In' ? 'In' : 'Out',
                })
            });
            if (response.ok) {
                // console.log('Data saved Sucessfully')

                window.dispatchEvent(new FocusEvent('focus'))
            } else {
                console.error('Failed to save data')
            }
        } catch (error) {
            console.error('Error while saving data:', error)
        } finally {

        }

        // dispatch(addAmount({amountPaid: parseInt(formData.amountPaid, 10) || balanceDue, mode: selectedMode, invoiceLink: headerdata.invoiceNo, moneyChange: transactionType === 'Money In' ? 'In' : 'Out'}))


        const newTransaction = {
            amountPaid: parseInt(formData.amountPaid > 0 ? formData.amountPaid : -1 * formData.amountPaid, 10) || (balanceDue),
            date: formData.date || new Date(),
            isAdvancePayment: isAdvancePayment,
            mode: selectedMode,
            moneyChange: transactionType === 'Money In' ? 'In' : 'Out',
            receiptNo: initialInvoiceNo
        };

        dispatch(addAmount({ amountPaid: parseInt(formData.amountPaid > 0 ? formData.amountPaid : -1 * formData.amountPaid, 10) || (balanceDue), mode: selectedMode, invoiceLink: headerdata.invoiceNo, moneyChange: transactionType === 'Money In' ? 'In' : 'Out', date: formData.date || new Date() }))
        const balanceStatus = balanceDue + (newTransaction?.moneyChange === "In" ? -1 * newTransaction.amountPaid : newTransaction.amountPaid)

        if (newTransaction) {
            try {
                const putResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/${id}/?branchId=${appState.currentBranchId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        recordTransaction: [newTransaction],
                        status: balanceStatus >= 1 ? `You’re owed: ₹${parseFloat(balanceStatus).toFixed(2)}` : balanceStatus <= -1 ? `You owe: ₹${parseFloat((-1 * balanceStatus).toFixed(2))}` : 'Closed',
                    })

                })
                if (putResponse.ok) {
                    // console.log('Data saved Sucessfully2')
                    setCount((prev: any) => prev + 1);
                    window.dispatchEvent(new FocusEvent('focus'))
                } else {
                    console.error('Failed to save data')
                }
            } catch (error) {
                // console.log("Error while put request",error)
            } finally {
                setSaving(false);
            }
        }


    };

    useEffect(() => {
        if (balanceDue !== undefined) {
            setFormData((prevData: any) => ({
                ...prevData,
                amountPaid: balanceDue,
            }));
        }
    }, [balanceDue]);

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

    const isDisabled = !selectedMode || !(formData.amountPaid);



    return (
        <div className="w-1/2 h-full flex justify-center rounded-[20px] items-center backdrop-blur-sm bg-white bg-opacity-50 z-50">
            <div className="w-[640px] py-2 pb-8  px-8 bg-white rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                {/* <div className="self-end items-start gap-6 flex mt-[0.6rem] cursor-pointer" onClick={onClose}>
                <Image src={closeicon} alt="close"></Image>
            </div> */}
                <div className='w-full flex flex-col gap-1'>

                    <div className="text-gray-500 text-xl font-medium ">Record Payment</div>
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
                        <div className="w-[440px] flex items-center h-9 rounded-[5px] text-textGrey2 bg-white text-base font-medium px-2 py-6  outline-none border border-solid border-gray-300 ">{headerdata ? headerdata?.customer : ""}
                            <div >
                                {balanceDue < 0 ? <span className="text-[#FC6E20] text-sm font-medium  px-2 py-1.5 bg-[#FFF0E9] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                                    You owe ₹{formData.amountPaid ? (balanceDue < 0 ? -1 * (balanceDue)?.toFixed(2) : (balanceDue)?.toFixed(2)) : 0}
                                </span> : balanceDue === 0 ? "" : <span className="text-[#0F9D58] text-sm font-medium  px-2 py-1.5 bg-[#E7F5EE] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                                    You’re owed ₹{formData.amountPaid ? (balanceDue < 0 ? -1 * (balanceDue)?.toFixed(2) : (balanceDue)?.toFixed(2)) : 0}
                                </span>}
                            </div>
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
                            value={formData.amountPaid > 0 ? formData.amountPaid : -1 * formData.amountPaid}
                            onChange={(e) => handleChange("amountPaid", e.target.value)}
                        />
                    </div>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Receipt No.</span></div>
                    <div className='w-[440px] flex justify-between items-center'>
                        <div><div className="w-[10rem] h-9 rounded-[5px] bg-white text-gray-400 text-base font-medium p-2  border border-solid border-gray-300">#{initialInvoiceNo}</div></div>

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
                                            value={startDate.toLocaleDateString() || new Date().toLocaleDateString()}
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
                        {/* {modesLoading && <Loading2 />} */}
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
                        <input type="checkbox" name="" id="" />
                        <span className='text-textGrey2 text-base font-medium'>Mark as advance payment</span>
                    </div>
                    <Button className={`px-4 py-2.5 text-white text-base rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer ${isDisabled ? 'bg-gray-400' : 'bg-zinc-900'
                        }`} onClick={handleSaveClick} disabled={isDisabled || isSaving}>
                        <Image src={check} alt='check' />
                        <span className='text-white text-base font-medium pr-2'>{isSaving ? <Loading2 /> : "Save Payment"}</span>
                    </Button>
                </div>

            </div>
        </div>
    )

}

export default RecordTransactionPopup