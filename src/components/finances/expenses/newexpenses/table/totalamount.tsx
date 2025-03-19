"use client"

import React, { useState, useEffect, useContext } from 'react';

import Select from 'react-select';
import Popup from "../table/recordexpensetransaction"
import Image from "next/image"
import { DataContext } from './DataContext';
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import formatDateAndTime from '@/utils/formateDateTime';
import Cash from '../../../../../assets/icons/finance/Cash.svg'
import { Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import Menu from '../../../../../assets/icons/finance/menu.svg'
import EditRecordTransactionPopup from '@/components/finances/editTransaction/editTransaction';
import CancellationPopup from '@/components/finances/cancelTransaaction/cancelTransaction';
const NewExpensesTotalAmout = ({ expenseData }: any) => {
    const { tableData, headerData } = useContext(DataContext);
    const [grandAmt, setGrandAmt] = useState(0);

    let totalAmount = 0;
    tableData.forEach(data => {
        totalAmount += (data.cost) || 0;
    });

    const { totalAmountData, setTotalAmountData } = useContext(DataContext);
    const { transactionsData, setTransactionsData } = useContext(DataContext);

    useEffect(() => {
        setGrandAmt(totalAmount);
        setTotalAmountData((prevData) => ({
            ...prevData,
            totalCost: totalAmount,
        }));
    }, [totalAmount]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const totalPaidAmount = transactionsData?.filter(item => item.moneyChange === 'In' || item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);

    const totalAmountToPay = transactionsData?.filter(item => item.moneyChange === 'Out').map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);

    const balanceDue = grandAmt +totalPaidAmount- totalAmountToPay;

    const [count, setCount] = useState(0);
    const [initialInvoiceNo, setInitialInvoiceNo] = useState('');
     const [popup, setPopup] = useState(false);
    
        const onClose = () => {
            setPopup((prev: any) => !prev);
        }
    const [transaction, setTransaction] = useState<any>();
    console.log("HeaderData",headerData)
    const handleSelectedTransaction = (transaction: any) => {
        const updatedTransaction = {
            partyName: headerData?.title.value,
            invoiceLink: headerData.invoiceNo,
            ...transaction
        }
        setTransaction(updatedTransaction);
    }
        
    useEffect(() => {
        const newInvoiceNo = generateInvoiceNumber(count);
        setInitialInvoiceNo(newInvoiceNo);
    }, [count]);

    return (
        <>
            <div className="flex gap-4 mt-10  pt-[20px] pb-[20px]">
                <Popup headerdata={headerData} expenseData={expenseData} setCount={setCount} transactionsData={transactionsData} setTransactionsData={setTransactionsData} initialInvoiceNo={initialInvoiceNo} totalAmount={totalAmountData} balanceDue={balanceDue} />
                <div className="w-1/2 rounded-md">
                    <div className="w-full flex p-4 border border-solid bg-white border-borderGrey rounded-md justify-between items-center gap-2.5">
                        <div className="text-textGreen text-base font-bold">Grand total</div>
                        <div className="text-right text-textGreen text-base font-bold">{totalAmount.toFixed(2)}</div>
                    </div>

                    <div className="w-full mr-4 flex flex-col mt-8">
                        <div className="w-full  p-4 bg-white rounded-tl-md rounded-tr-md border border-solid  border-borderGrey justify-between items-center gap-6 flex">
                            <div className="text-gray-500 text-xl font-medium ">Payments</div>
                        </div>
                        {headerData.distributor?.creditedToken > 0 &&
                            <div className='w-full  py-4 px-6 h-fit  bg-white text-textGrey1 font-medium text-base justify-between items-center flex border  border-solid border-borderGrey'>
                                <div className='w-full flex items-center justify-between'>
                                    <p>
                                        {`${String(new Date(Date.now()).getDate()).padStart(2, '0')}/${String(new Date(Date.now()).getMonth() + 1).padStart(2, '0')}/${String(new Date(Date.now()).getFullYear()).slice(-2)}`}
                                    </p>
                                    <p>Debit Note</p>
                                    <p className='flex items-center'><Image src={Cash} alt="Cash"></Image>Cash</p>
                                    <p>₹{(headerData.distributor?.creditedToken).toFixed(2)}<span className='ml-2 px-1 py-1 rounded-md bg-[#E7F5EE] text-[#0F9D58] text-md font-medium'>Out</span></p>
                                </div>

                            </div>}
                        {transactionsData && transactionsData.map((transaction, index) => (
                            transaction.isAdvancePayment &&
                            (<div key={index} className="w-full  px-6 py-2 bg-white justify-between items-center gap-6 flex border border-t-0 border-solid border-borderGrey">
                                <div className="text-gray-500 text-md font-medium ">Advance Paid on  {formatDateAndTime(transaction.date).formattedDate}</div>
                                <div className='text-gray-500 text-md font-medium'>#{transaction?.receiptNo}</div>
                                <div className='flex items-center h-9 px-4  justify-between rounded-lg '>
                                    <div className="text-gray-500 text-base font-bold flex gap-2 items-center">
                                        ₹ {transaction.amountPaid > 0 ? transaction.amountPaid : -1 * transaction.amountPaid}
                                    </div>
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
                        ))
                        }

                        {transactionsData && transactionsData.map((transaction, index) => (
                            !transaction.isAdvancePayment &&
                            (<div key={index} className="w-full  px-6 py-2 bg-white justify-between items-center gap-6 flex border border-t-0 border-solid border-borderGrey">
                                <div className="text-gray-500 text-md font-medium ">Paid on {formatDateAndTime(transaction.date).formattedDate}</div>
                                <div className='text-gray-500 text-md font-medium'>#{transaction?.receiptNo}</div>
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
                        ))
                        }

                        <div className="w-full  px-6 bg-white rounded-bl-md rounded-br-md justify-between items-center flex border border-t-0 border-solid border-borderGrey">
                            <div className="text-gray-500 text-base font-bold  w-1/3 py-4">Balance Due</div>
                            <div className="text-gray-500 text-lg font-medium  w-1/3 py-4 flex  items-center"></div>
                            <div className="text-gray-500 text-base font-bold  w-1/3 py-4 ">₹{totalAmount ? (balanceDue < 0 ? (-1 * balanceDue)?.toFixed(2) : (balanceDue)?.toFixed(2)) : 0}
                                {
                                    balanceDue < 0 ? <span className="text-[#0F9D58] text-sm font-medium  px-2 py-1.5 rounded-[5px] bg-[#E7F5EE] justify-center items-center gap-2 ml-[5px]">
                                        You’re owed
                                    </span> : balanceDue === 0 ? "" : <span className="text-[#FC6E20] text-sm font-medium  px-2 py-1.5 bg-[#FFF0E9]   rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                                        You owe
                                    </span>


                                }
                            </div>

                        </div>
                    </div>
                </div>
                {popup && <EditRecordTransactionPopup onClose={onClose} editTransaction={transaction} transactionsData={transactionsData} type={"invoice"} />}
                {showConfirmation && <CancellationPopup setShowConfirmation={setShowConfirmation} editTransaction={transaction} transactionsData={transactionsData} type={"invoice"} />}
            </div>
        </>
    )
}

export default NewExpensesTotalAmout;