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
import closeicon from "../../../../../assets/icons/inventory/closeIcon.svg";
import Select from 'react-select';
import { Button } from '@nextui-org/react';
import { useAppSelector } from '@/lib/hooks';

type PopupProps = {
    onClose: () => void;
    headerdata: any;
    transactionsData: any;
    setTransactionsData: any;
    initialInvoiceNo: any;
    totalAmount: any;
}


const RecordTransactionPopup: React.FC<PopupProps> = ({onClose, headerdata, transactionsData, setTransactionsData, initialInvoiceNo, totalAmount}) => {

    const dispatch = useDispatch();


    const [formData, setFormData] = useState<any>({
        amountPaid: "",
    });
    const appState = useAppSelector((state) => state.app)
    const [isAdvancePayment, setIsAdvancePayment] = useState(false);

    const Mode = [
        {value: "Cash", label: "Cash"},
        {value: "UPI", label: "UPI"},
        {value: "Card", label: "Card"},
        {value: "Net Banking", label: "Net Banking"},
    ]

    
    

    const Party =[
        {value: "WeCare", label: "WeCare"},
        {value: "Pawzeeble", label: "Pawzeeble"},
        {value: "Betaturd", label: "Betaturd"},
        {value: "Smegmalord", label: "Smegmalord"},
    ]

    const [startDate, setStartDate] = useState(new Date());
    const [transactionType, setTransactionType] = useState<string | null>("Money In");


    const handleDateChange = (date:any) => {
        setStartDate(date);
        setFormData({ ...formData, date});
    };

    const handleToggleRadioButton = (type: string) => {
        setTransactionType(type);
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/create?branchId=${appState.currentBranchId}`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json', 
                },
                body: JSON.stringify({
                    partyName: headerdata?.distributor?.value,
                    invoiceLink: headerdata.invoiceNo,
                    receiptNo: initialInvoiceNo,
                    date: formData.date || new Date(),
                    amountPaid: parseInt(formData.amountPaid, 10) || totalAmount?.totalCost,
                    mode: formData.mode?.value,
                    moneyChange: transactionType === 'Money In' ? 'In' : 'Out',
                })
            });
            if (response.ok) {
                //console.log('Data saved Sucessfully')
                onClose();
                window.dispatchEvent(new FocusEvent('focus'))
            } else {
                console.error('Failed to save data')
            }
        } catch (error) {
            console.error('Error while saving data:', error)
        } finally {

        }

        const newTransaction = {
            amountPaid: parseInt(formData.amountPaid, 10) || totalAmount?.totalCost,
            date: formData.date || new Date(),
            isAdvancePayment: isAdvancePayment,
            mode: formData.mode?.value,
            receiptNo: initialInvoiceNo,
            moneyChange: transactionType === 'Money In' ? 'In' : 'Out',
        };

        dispatch(addAmount({amountPaid: parseInt(formData.amountPaid || totalAmount?.totalCost), mode: formData.mode?.value, invoiceLink: headerdata.invoiceNo, moneyChange: transactionType === 'Money In' ? 'In' : 'Out'}))

        // setTransactionsData([{amountPaid:parseInt(formData.amountPaid, 10), date:formData.date, isAdvancePayment:isAdvancePayment}]);

        setTransactionsData((prevTransactions:any) => [...prevTransactions, newTransaction]);
    };

    useEffect(() => {
        if (totalAmount?.totalCost !== undefined) {
            setFormData((prevData:any) => ({
                ...prevData,
                amountPaid: totalAmount.totalCost,
            }));
        }
    }, [totalAmount]);

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    }



  return (
    <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
        <div className="w-[640px] py-2 pb-8  px-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
            <div className="self-end items-start gap-6 flex mt-[0.6rem] cursor-pointer" onClick={onClose}>
                <Image src={closeicon} alt="close"></Image>
            </div>
            <div className='w-full flex flex-col gap-1'>

                <div className="text-gray-500 text-xl font-medium ">Record Payment</div>
                <div className="text-neutral-400 text-base font-medium ">Note down the details of the transaction</div>
            </div>
            <div className='w-full flex gap-36'>
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
                    <div><span className='text-gray-500 text-base font-medium '>Party Name</span></div>
                    <div><div className="w-[440px] h-9 rounded-[5px] text-textGrey2 bg-white text-base font-medium p-2  outline-none border border-solid border-gray-300 ">{headerdata?.distributor?.value}</div></div>
              
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
                    <div><div className="w-[10rem] h-9 rounded-[5px] bg-white text-gray-400 text-base font-medium p-2  border border-solid border-gray-300">#{initialInvoiceNo}</div></div>

                        <div><span className='text-gray-500 text-base font-medium '>Date</span></div>
                        <div className='relative'>
                        <DatePicker
                            className="w-[10rem] "
                            selected={startDate  || new Date()}
                            onChange={handleDateChange}
                            calendarClassName="react-datepicker-custom"
                            customInput={
                                <div className='relative'>
                                    <input
                                        className="w-[10rem] border border-solid border-borderGrey h-9 text-textGrey1 text-base font-medium px-2 rounded   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                        value={startDate.toLocaleDateString('en-GB') || new Date().toLocaleDateString('en-GB')}
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
                        <Select
                            className="text-neutral-400 text-base font-medium w-full"
                            placeholder="Mode"
                            isClearable={false}
                            isSearchable={true}
                            options={Mode}
                            isMulti={false}
                            name="mode"
                            onChange={(value) => handleChange("mode", value)}
                        />
                    </div>

            </div>
            <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center gap-1'>
                        <input type="checkbox" name="advancePayment" id="advancePayment" checked={isAdvancePayment} onChange={(e) => {setIsAdvancePayment(e.target.checked); setTransactionType('Money In')}}/>
                        <span className='text-textGrey2 text-base font-medium'>Mark as advance payment</span>
                    </div>
                    <Button className="px-2 py-2.5 bg-navBar rounded-[5px] justify-start items-center gap-2 flex outline-none border-none cursor-pointer"  onClick={handleSaveClick}>
                        <Image src={check} alt='check' /> 
                        <span className='text-white text-base font-medium pr-2'>Save Transaction</span>
                    </Button>
            </div>
            
        </div>
    </div>
  )

}

export default RecordTransactionPopup