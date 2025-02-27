"use client"

import React, { useState, useEffect, useContext } from 'react';

import Select from 'react-select';
import Popup from "../table/recordexpensetransaction"

import { DataContext } from './DataContext';
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import formatDateAndTime from '@/utils/formateDateTime';

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

    const totalPaidAmount = transactionsData?.filter(item => item.moneyChange === 'In' || item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);

    const totalAmountToPay = transactionsData?.filter(item => item.moneyChange === 'Out').map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);

    const balanceDue = grandAmt - totalPaidAmount + totalAmountToPay;

    const [count, setCount] = useState(0);
    const [initialInvoiceNo, setInitialInvoiceNo] = useState('');

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
                        <div className="w-full p-6 bg-white rounded-tl-md rounded-tr-md border border-solid border-borderGrey justify-between items-center gap-6 flex">
                            <div className="text-gray-500 text-xl font-medium">Payments</div>
                        </div>
                        {transactionsData && transactionsData.map((transaction, index) => (
                            transaction.isAdvancePayment &&
                            (<div key={index} className="w-full px-6 py-4 bg-white justify-between items-center gap-6 flex border border-t-0 border-solid border-borderGrey">
                                <div className="text-gray-500 text-lg font-medium">Advance Paid</div>
                                <div className='flex items-center h-9 px-4 py-2.5 justify-between rounded-lg'>
                                    <div className="text-gray-500 text-base font-bold flex gap-2 items-center">
                                        ₹ {transaction.amountPaid > 0 ? transaction.amountPaid : -1 * transaction.amountPaid > 0}
                                    </div>
                                </div>
                            </div>)
                        ))}
                        {transactionsData && transactionsData.map((transaction, index) => (
                            !transaction.isAdvancePayment &&
                            (<div key={index} className="w-full px-6 py-4 bg-white justify-between items-center gap-6 flex border border-t-0 border-solid border-borderGrey">
                                <div className="text-gray-500 text-lg font-medium">{formatDateAndTime(transaction.date).formattedDate}</div>
                                <div className='flex items-center h-9 px-4 py-2.5 justify-between rounded-lg'>
                                    <div className="text-gray-500 text-base font-bold flex gap-2 items-center">
                                        ₹ {transaction.amountPaid > 0 ? transaction.amountPaid : -1 * transaction.amountPaid > 0}
                                    </div>
                                </div>
                            </div>)
                        ))}
                        <div className="w-full px-6 bg-white rounded-bl-md rounded-br-md justify-between items-center flex border border-t-0 border-solid border-borderGrey">
                            <div className="text-gray-500 text-base font-bold w-1/3 py-4">Balance Due</div>
                            <div className="text-gray-500 text-lg font-medium w-1/3 py-4 flex items-center"></div>
                            <div className="text-gray-500 text-base font-bold w-1/3 py-4">₹{balanceDue < 0 ? -1 * (balanceDue)?.toFixed(2) : (balanceDue)?.toFixed(2)}
                                {balanceDue < 0 ? <span className="text-[#FC6E20] text-sm font-medium px-2 py-1.5 bg-[#FFF0E9] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                                    You owe
                                </span> : balanceDue === 0 ? "" : <span className="text-[#0F9D58] text-sm font-medium px-2 py-1.5 bg-[#E7F5EE] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                                    You’re owe
                                </span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewExpensesTotalAmout;