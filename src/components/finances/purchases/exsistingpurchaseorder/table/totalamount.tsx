import React, { useState, useEffect } from 'react'

import Image from "next/image"

import ExsistingRecordTransactionPopup from './recordExsistingPurchaseOrder';
import Cash from "../../../../../assets/icons/finance/Cash.svg"


import 'react-datepicker/dist/react-datepicker.css';
import formatDateAndTime from '@/utils/formateDateTime';
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import Loading2 from '@/app/loading2';
import { Tooltip, Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import Menu from '../../../../../assets/icons/finance/menu.svg'
import EditRecordTransactionPopup from '@/components/finances/editTransaction/editTransaction';
import CancellationPopup from '@/components/finances/cancelTransaaction/cancelTransaction';


const ExsistingPurchasesTotalAmount = ({ otherData, isLoading }: any) => {

    const totalPaidAmount = otherData?.recordTransaction?.reduce((acc: any, transaction: any) => {
        if (transaction?.moneyChange === 'In' || transaction?.isAdvancePayment) {
            return acc + transaction?.amountPaid;
        }
        return acc;
    }, 0);

    const totalAmountPay = otherData?.recordTransaction?.reduce((acc: any, transaction: any) => {
        if (transaction?.moneyChange === 'Out') {
            return acc + transaction?.amountPaid;
        }
        return acc;
    }, 0);

    const balanceDue = otherData.totalCost + totalPaidAmount - totalAmountPay
    const [count, setCount] = useState(0);
    const [initialInvoiceNo, setInitialInvoiceNo] = useState('');

    const [popup, setPopup] = useState(false);

    const onClose = () => {
        setPopup((prev: any) => !prev);
    }

    const [showConfirmation, setShowConfirmation] = useState(false);

    const [transaction, setTransaction] = useState<any>();

    const handleSelectedTransaction = (transaction: any) => {
        const updatedTransaction = {
            partyName: otherData.distributor,
            invoiceLink: otherData.invoiceNo,
            ...transaction
        }
        setTransaction(updatedTransaction);
    }



    console.log(otherData);

    useEffect(() => {

        const newInvoiceNo = generateInvoiceNumber(count);
        setInitialInvoiceNo(newInvoiceNo);

    }, [count]);

    return (
        <>


            <div className="flex gap-4 pt-[20px] pb-[20px]">
                <div className="w-1/2 mr-4 flex flex-col rounded-[20px]">
                    <ExsistingRecordTransactionPopup headerdata={otherData} initialInvoiceNo={initialInvoiceNo} setCount={setCount} balanceDue={balanceDue} />
                </div>
                <div className='w-1/2'>
                    <div className="w-full  bg-white rounded-md">
                        <div className="w-full flex  border border-solid  border-borderGrey justify-between items-center   rounded-t-md  ">
                            <div className="text-gray-500 px-4 py-4 text-base font-bold ">Subtotal</div>
                            <div className="text-right  text-gray-500 text-base font-bold mr-4">₹{((otherData.totalCost - otherData.shipping - otherData.adjustment) / (1 - otherData.overallDiscount))?.toFixed(2) || 0}</div>
                        </div>
                        <div className="w-full flex px-4 py-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                            <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
                            <div className="flex items-center">
                                <div className="text-right text-textGrey1 text-base  ">{(otherData.overallDiscount * 100).toFixed(2) || 0}%</div>

                            </div>
                        </div>
                        <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5   ">
                            <div className="text-gray-500 text-base font-bold ">Shipping</div>
                            <div className="text-right text-textGrey1 text-base ">₹{otherData.shipping || 0}</div>
                        </div>
                        <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5  ">
                            <div className="text-gray-500 text-base font-bold ">Adjustment</div>
                            <div className="text-right text-textGrey1 text-base ">₹{otherData.adjustment || 0}</div>
                        </div>
                        <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                            <div className="text-textGreen text-base font-bold">Grand total</div>
                            <div className="text-right text-textGreen text-base font-bold ">₹{(otherData.totalCost)?.toFixed(2) || 0}</div>
                        </div>
                    </div>
                    <div className="w-full mt-4 mr-4 flex flex-col gap-4">



                        <div className="w-full h-full  flex flex-col border border-solid  border-borderGrey rounded-md">

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
                                    {isLoading && <Loading2 />}
                                    {otherData && otherData.recordTransaction && otherData.recordTransaction.map((transaction: any, index: any) => (
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
                                {otherData && otherData.recordTransaction && otherData.recordTransaction.map((transaction: any, index: any) => (
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
                                </div>

                            </div>
                            <div className="w-full  px-6 bg-white rounded-bl-md rounded-br-md justify-between items-center flex border border-t-0 border-solid border-borderGrey">
                                <div className="text-gray-500 text-base font-bold  w-1/3 py-4">Balance Due</div>
                                <div className="text-gray-500 text-lg font-medium  w-1/3 py-4 flex  items-center"></div>
                                <div className="text-gray-500 text-base font-bold  w-1/3 py-4 ">₹{balanceDue < 0 ? (-1 * balanceDue)?.toFixed(2) : (balanceDue || 0)?.toFixed(2)}
                                    {balanceDue < 0 ? <span className="text-[#0F9D58] text-sm font-medium  px-2 py-1.5 rounded-[5px] justify-center bg-[#E7F5EE] items-center gap-2 ml-[5px]">
                                        You’re owed
                                    </span> : balanceDue === 0 ? "" : <span className="text-[#FC6E20] text-sm font-medium  px-2 py-1.5 bg-[#FFF0E9]   rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                                        You owe
                                    </span>}
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
                {popup && <EditRecordTransactionPopup onClose={onClose} editTransaction={transaction} type={"exsistingInvoice"} balanceDue={balanceDue} />}
                {showConfirmation && <CancellationPopup setShowConfirmation={setShowConfirmation} editTransaction={transaction} type={"exsistingInvoice"} balanceDue={balanceDue} />}
            </div>


        </>
    )
}

export default ExsistingPurchasesTotalAmount