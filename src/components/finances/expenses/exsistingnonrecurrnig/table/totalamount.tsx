'use client'
import React, {  useEffect, useState } from 'react'

import Image from "next/image"

import Cash from "../../../../../assets/icons/finance/Cash.svg"

import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import formatDateAndTime from '@/utils/formateDateTime';
import Loading2 from '@/app/loading2';
import Popup from "./recordNonRecurringTransaction"
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Menu from "@/assets/icons/finance/menu.svg";
import EditRecordTransactionPopup from '@/components/finances/editTransaction/editTransaction';
import CancellationPopup from '@/components/finances/cancelTransaaction/cancelTransaction';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
const ExsistingNonRecurringTotalAmount = ({ otherData, isLoading }: any) => {


    const [isPaymentEdited, setIsPaymentEdited] = useState(0);
        const [isPaymentMade, setIsPaymentMade] = useState(0);
        const url = useSearchParams();
        const id = url.get('id');
        const [recordTransaction, setRecordTransaction] = useState<any>([]);
    
        useEffect(() => {
            const getAllPayments = async () => {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/expenses/recordTransactions/${id}`);
                if (res.status === 200) {
                    setRecordTransaction(res.data);
                }
            }
            getAllPayments();
    
        }, [isPaymentEdited, isPaymentMade])

        console.log(isPaymentEdited, isPaymentMade);




    const  totalAmountPay = recordTransaction?.reduce((acc: any, transaction: any) => {
        if (transaction?.moneyChange === 'In' || transaction?.isAdvancePayment) {
            return acc + transaction?.amountPaid;
        }
        return acc;
    }, 0);

    const totalPaidAmount = recordTransaction?.reduce((acc: any, transaction: any) => {
        if (transaction?.moneyChange === 'Out') {
            return acc + transaction?.amountPaid;
        }
        return acc;
    }, 0);
    // const totalPaidAmount = otherData?.recordTransaction?.reduce((a: any, b: any) => a + b.amountPaid, 0);

    const balanceDue = otherData.totalCost - totalPaidAmount + totalAmountPay
    console.log(otherData.totalCost,totalPaidAmount,totalAmountPay);

    const [count, setCount] = useState(0);
    const [initialInvoiceNo, setInitialInvoiceNo] = useState('');

    

    useEffect(() => {
        
        const newInvoiceNo = generateInvoiceNumber(count);
        setInitialInvoiceNo(newInvoiceNo);
        
    }, [count]);
    const [popup, setPopup] = useState(false);

    const onClose = () => {
        setPopup((prev: any) => !prev);
    }
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [transaction, setTransaction] = useState<any>();
    const handleSelectedTransaction = (transaction: any) => {
        const updatedTransaction = {
            partyName: otherData.party,
            invoiceLink: otherData.invoiceNo,
            ...transaction
        }
        setTransaction(updatedTransaction);
    }
    // console.log("otherData", otherData)

    return (
        <>


            <div className="flex  gap-4 pt-[20px] pb-[20px]">
            <Popup headerdata={otherData} setCount={setCount} initialInvoiceNo={initialInvoiceNo} balanceDue={balanceDue} setIsPaymentMade={setIsPaymentMade}/>
                <div className='w-1/2 gap-4 '>

                    <div className="w-full bg-white rounded-md ">
                        
                        <div className="w-full flex p-4 border border-solid  border-borderGrey  rounded-b-md justify-between items-center gap-2.5    ">
                            <div className="text-textGreen text-base font-bold">Grand total</div>
                            <div className="text-right text-textGreen text-base font-bold ">{(otherData.totalCost)?.toFixed(2)}</div>
                        </div>
                    </div>
                    <div className="w-full mt-4 mr-4 flex flex-col border border-solid  border-borderGrey rounded-md">

<div className="w-full  px-6 py-4 bg-white rounded-tl-md rounded-tr-md justify-between items-center gap-6 flex border-0 border-b border-solid border-borderGrey">
    <div className="text-gray-500 text-xl font-medium ">Payments</div>

    {/* <Button
    onClick={togglePopup}
    variant="solid"
    className="capitalize flex h-9 py-2.5 border-none text-base bg-black text-white rounded-lg cursor-pointer">
    <div className='flex'><Image src={Rupee} alt='Rupee' className='w-6 h-6 ' /></div>
    Record Payment
</Button> */}

</div>
<div className="w-full  bg-white  justify-between items-center  flex">
    <div className='w-full h-[9.6rem] flex flex-col overflow-auto container'>
        {(isLoading) && <Loading2 />}
        {recordTransaction && recordTransaction.map((transaction: any, index: any) => (
            transaction.isAdvancePayment &&
            (<div key={index} className='w-full px-2 items-center justify-between flex border-0 border-b border-solid border-borderGrey'>
                <div className="text-textGrey2  text-base font-bold  w-1/3 py-4">Advance Paid</div>
                <div className='text-gray-500 text-md font-medium'>#{transaction?.receiptNo}</div>
                <div className="text-textGrey2 text-base font-medium  w-1/3 py-4 flex  items-center">
                    <div className='flex pr-2'>
                        <Image src={Cash} alt='Cash' className='w-4 h-4 ' />
                    </div>
                    {transaction.mode}
                </div>
                <div className="text-textGrey2 text-base font-medium  w-1/3 py-4 ">₹ {(transaction.amountPaid)?.toFixed(2)}</div>
                {(!(transaction.moneyChange === "Cancelled") &&
                    <Popover placement="bottom" showArrow offset={10}>
                        <PopoverTrigger>
                            <Button variant="solid" className="capitalize flex border-none text-gray rounded-lg">
                                <div className='flex items-center'>
                                    <Image src={Menu} alt='Menu' className='w-5 h-5' />
                                </div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 mt-2.5">
                            <div className="flex flex-col">
                                <div className='flex flex-col'>
                                    <div className='text-gray-500 text-sm p-3 font-medium flex hover:cursor-pointer' onClick={() => { setPopup((prev: any) => !prev); handleSelectedTransaction(transaction) }} >
                                        Edit
                                    </div>
                                    <div className='text-gray-500 text-sm p-3 font-medium flex hover:cursor-pointer' onClick={() => { setShowConfirmation((prev: boolean) => !prev); handleSelectedTransaction(transaction) }}>
                                        Cancel
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            </div>)
        ))}
        {recordTransaction && recordTransaction.map((transaction: any, index: any) => (
            !transaction.isAdvancePayment &&
            (<div key={index} className='w-full px-2 flex justify-between items-center border-0 border-b border-solid border-borderGrey'>
                <div className="text-textGrey2 text-base font-medium  w-1/3 py-4">{formatDateAndTime(transaction.date).formattedDate}</div>
                <div className='text-gray-500 text-md font-medium mr-4'>#{transaction?.receiptNo}</div>
                <div className="text-textGrey2 text-base font-medium  w-1/3 py-4 flex  items-center">
                    <div className='flex pr-2'>
                        <Image src={Cash} alt='Cash' className='w-4 h-4 ' />
                    </div>
                    {transaction.mode}
                </div>

                <div className="text-textGrey2 text-base font-medium  w-1/3 py-4 ">₹ {(transaction.amountPaid > 0 ? transaction.amountPaid : -1 * transaction.amountPaid)?.toFixed(2)}
                    {(transaction.moneyChange === 'Out' || transaction.moneyChange === 'Cancelled') && <span className="px-2 py-1 rounded-md bg-[#FFEAEA] text-[#FF3030] text-sm font-medium ml-[5px]">{transaction.moneyChange}</span>}
                    {transaction.moneyChange === 'In' && <span className="px-2 py-1 rounded-md bg-[#E7F5EE] text-[#0F9D58] text-sm font-medium ml-[5px]">In</span>}
                </div>
                {(!(transaction.moneyChange === "Cancelled") &&
                    <Popover placement="bottom" showArrow offset={10}>
                        <PopoverTrigger>
                            <Button variant="solid" className="capitalize flex border-none text-gray rounded-lg">
                                <div className='flex items-center'>
                                    <Image src={Menu} alt='Menu' className='w-5 h-5' />
                                </div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 mt-2.5">
                            <div className="flex flex-col">
                                <div className='flex flex-col'>
                                    <div className='text-gray-500 text-sm p-3 font-medium flex hover:cursor-pointer' onClick={() => { setPopup((prev: any) => !prev); handleSelectedTransaction(transaction); document.body.click(); }} >
                                        Edit
                                    </div>
                                    <div className='text-gray-500 text-sm p-3 font-medium flex hover:cursor-pointer' onClick={() => { setShowConfirmation((prev: boolean) => !prev); handleSelectedTransaction(transaction) }}>
                                        Cancel
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            </div>)
        ))}
    </div>

</div>
<div className="w-full  px-6 bg-white rounded-bl-md rounded-br-md justify-between items-center flex border border-t-0 border-solid border-borderGrey">
    <div className="text-gray-500 text-base font-bold  w-1/3 py-4">Balance Due</div>
    <div className="text-gray-500 text-lg font-medium  w-1/3 py-4 flex  items-center"></div>
    <div className="text-gray-500 text-base font-bold  w-1/3 py-4 ">₹{balanceDue < 0 ? -1 * (balanceDue)?.toFixed(2) : (balanceDue || 0)?.toFixed(2)}
        {balanceDue < 0 ? <span className="text-[#0F9D58] text-sm font-medium  px-2 py-1.5 bg-[#FFF0E9] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
            You&apos;re owed
        </span> : balanceDue === 0 ? "" : <span className=" text-[#FC6E20] text-sm font-medium  px-2 py-1.5 bg-[#E7F5EE] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
            You owe
        </span>}
    </div>

</div>

</div>

    </div>
    {!(otherData?.status === 'Cancelled') &&
        <>
            {popup && <EditRecordTransactionPopup onClose={onClose} editTransaction={transaction} type={"exsistingnonrecurring"} balanceDue={balanceDue} setIsPaymentEdited={setIsPaymentEdited} />}
            {showConfirmation && <CancellationPopup setShowConfirmation={setShowConfirmation} editTransaction={transaction} type={"exsistingnonrecurring"} balanceDue={balanceDue} setIsPaymentEdited={setIsPaymentEdited}/>}
        </>
    }
        </div>  


        </>
    )
}

export default ExsistingNonRecurringTotalAmount