'use client'
import React, {  useEffect, useState } from 'react'

import Image from "next/image"

import Cash from "../../../../../assets/icons/finance/Cash.svg"

import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import formatDateAndTime from '@/utils/formateDateTime';
import Loading2 from '@/app/loading2';
import Popup from "./recordNonRecurringTransaction"

const ExsistingNonRecurringTotalAmount = ({ otherData, isLoading }: any) => {







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
    // const totalPaidAmount = otherData?.recordTransaction?.reduce((a: any, b: any) => a + b.amountPaid, 0);

    const balanceDue = otherData.totalCost - totalPaidAmount + totalAmountPay
    console.log(otherData.totalCost,totalPaidAmount,totalAmountPay);

    const [count, setCount] = useState(0);
    const [initialInvoiceNo, setInitialInvoiceNo] = useState('');

    

    useEffect(() => {
        
        const newInvoiceNo = generateInvoiceNumber(count);
        setInitialInvoiceNo(newInvoiceNo);
        
    }, [count]);

    // console.log("otherData", otherData)

    return (
        <>


            <div className="flex  gap-4 pt-[20px] pb-[20px]">
            <Popup headerdata={otherData} setCount={setCount} initialInvoiceNo={initialInvoiceNo} balanceDue={balanceDue} />
                <div className='w-1/2 gap-4 '>

                    <div className="w-full bg-white rounded-md ">
                        <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                            <div className="text-gray-500 text-base font-bold ">Subtotal</div>
                            <div className="text-right text-gray-500 text-base font-bold ">₹ {(otherData.subTotal)?.toFixed(2)}</div>
                        </div>
                        <div className="w-full flex px-4 py-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                            <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
                            <div className="flex items-center">
                                <div className="text-right text-textGrey1 text-base  ">{otherData.overallDiscount * 100}%</div>

                            </div>
                        </div>
                        <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5   ">
                            <div className="text-gray-500 text-base font-bold ">Shipping</div>
                            <div className="text-right text-textGrey1 text-base ">₹ {otherData.shipping}</div>
                        </div>
                        <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5  ">
                            <div className="text-gray-500 text-base font-bold ">Adjustment</div>
                            <div className="text-right text-textGrey1 text-base ">₹{otherData.adjustment}</div>
                        </div>
                        <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                            <div className="text-textGreen text-base font-bold">Grand total</div>
                            <div className="text-right text-textGreen text-base font-bold ">{(otherData.totalCost)?.toFixed(2)}</div>
                        </div>
                    </div>
                    <div className="w-full mt-4  mr-4 flex flex-col border border-solid  border-borderGrey rounded-md">

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
                                {otherData && otherData.recordTransaction && otherData.recordTransaction.map((transaction: any, index: any) => (
                                    transaction.isAdvancePayment &&
                                    (<div key={index} className='w-full px-6 flex border-0 border-b border-solid border-borderGrey'>
                                        <div className="text-textGrey2  text-base font-bold  w-1/3 py-4">Advance Paid</div>
                                        <div className="text-textGrey2 text-base font-medium  w-1/3 py-4 flex  items-center">
                                            <div className='flex pr-2'>
                                                <Image src={Cash} alt='Cash' className='w-4 h-4 ' />
                                            </div>
                                            {transaction.mode}
                                        </div>
                                        <div className="text-textGrey2 text-base font-medium  w-1/3 py-4 ">₹ {(transaction.amountPaid > 0 ?transaction.amountPaid:-1*transaction.amountPaid)?.toFixed(2)}</div>
                                    </div>)
                                ))}
                                {otherData && otherData.recordTransaction && otherData.recordTransaction.map((transaction: any, index: any) => (
                                    !transaction.isAdvancePayment &&
                                    (<div key={index} className='w-full px-6 flex border-0 border-b border-solid border-borderGrey'>
                                        <div className="text-textGrey2 text-base font-medium  w-1/3 py-4">{formatDateAndTime(transaction.date).formattedDate}</div>
                                        <div className="text-textGrey2 text-base font-medium  w-1/3 py-4 flex  items-center">
                                            <div className='flex pr-2'>
                                                <Image src={Cash} alt='Cash' className='w-4 h-4 ' />
                                            </div>
                                            {transaction.mode}
                                        </div>
                                        <div className="text-textGrey2 text-base font-medium  w-1/3 py-4 ">₹ {(transaction.amountPaid > 0 ?transaction.amountPaid:-1*transaction.amountPaid)?.toFixed(2)}
                                            {transaction.moneyChange === 'Out' && <span className="px-2 py-1 rounded-md bg-[#FFEAEA] text-[#FF3030] text-sm font-medium ml-[5px]">Out</span>}
                                            {transaction.moneyChange === 'In' && <span className="px-2 py-1 rounded-md bg-[#E7F5EE] text-[#0F9D58] text-sm font-medium ml-[5px]">In</span>}
                                        </div>
                                    </div>)
                                ))}
                            </div>

                        </div>
                        <div className="w-full  px-6 bg-white rounded-bl-md rounded-br-md justify-between items-center flex border border-t-0 border-solid border-borderGrey">
                            <div className="text-gray-500 text-base font-bold  w-1/3 py-4">Balance Due</div>
                            <div className="text-gray-500 text-lg font-medium  w-1/3 py-4 flex  items-center"></div>
                            <div className="text-gray-500 text-base font-bold  w-1/3 py-4 ">₹{balanceDue < 0 ? -1 * (balanceDue)?.toFixed(2) : (balanceDue || 0)?.toFixed(2)}
                                {balanceDue < 0 ? <span className="text-[#FC6E20] text-sm font-medium  px-2 py-1.5 bg-[#FFF0E9] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                                    You owe
                                </span> : balanceDue === 0 ? "" : <span className="text-[#0F9D58] text-sm font-medium  px-2 py-1.5 bg-[#E7F5EE] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                                    You’re owed
                                </span>}
                            </div>

                        </div>

                    </div>

                </div>
            </div>
            


        </>
    )
}

export default ExsistingNonRecurringTotalAmount