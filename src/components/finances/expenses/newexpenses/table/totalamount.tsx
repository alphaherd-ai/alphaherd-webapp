"use client"


import React, { useState, useEffect, useContext } from 'react';
import DownArrow from '../../../../../assets/icons/finance/downArrow.svg';
import Invoice from '../../../../../assets/icons/finance/invoice.svg';
import Link from "next/link"
import Rupee from "../../../../../assets/icons/finance/rupee.svg"
import Image from "next/image"
import Select from 'react-select';
import Popup from "../table/recordexpensetransaction"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { DataContext } from './DataContext';
import { Tax } from '@prisma/client';
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import formatDateAndTime from '@/utils/formateDateTime';


const NewExpensesTotalAmout = () => {
    const { tableData, headerData } = useContext(DataContext);
    // console.log("this is tableData",tableData)
    const [selectedDiscount, setDiscount] = useState(0);
    let totalAmount = 0;
    tableData.forEach(data => {
        totalAmount += (data.sellingPrice + data.sellingPrice * data.gst) || 0;
    });

    const { totalAmountData, setTotalAmountData } = useContext(DataContext);
    const { transactionsData, setTransactionsData } = useContext(DataContext);
    

    const [grandAmt, setGrandAmt] = useState(totalAmount);

    const gstOptions = [
        { value: 0.18, label: Tax.GST_18 },
        { value: 0.09, label: Tax.GST_9 }
    ];

    const handleSelectChange = (selectedOption: any) => {
        let discountedAmount = totalAmount - totalAmount * selectedOption.value;
        setDiscount(selectedOption.value);
        setGrandAmt(discountedAmount);
        setTotalAmountData((prevData) => ({ ...prevData, gst: selectedOption }));
    };

    const [shipping, setShipping] = useState<string>('');
    const [adjustment, setAdjustment] = useState<string>('');

    const handleShippingChange = (event: any) => {
        //console.log(typeof event.target.value)
        const value = event.target.value
        if (/^\d*\.?\d*$/.test(value)) {
            setShipping(value);
            updateGrandTotal();
        }
    };

    const handleAdjustmentChange = (event: any) => {
        const value = event.target.value
        if (/^\d*\.?\d*$/.test(value)) {
            setAdjustment(value);
            updateGrandTotal();
        }
    };
    useEffect(() => {
        if (totalAmountData.subTotal == 0) {
            setShipping('');
            setAdjustment('');
        }
    }, [totalAmountData])

    const updateGrandTotal = () => {
        const discountedAmount = (totalAmount - totalAmount * selectedDiscount) || 0;
        const shippingValue = parseFloat(shipping) || 0;
        const adjustmentValue = parseFloat(adjustment) || 0;
        const newGrandTotal = discountedAmount + shippingValue + adjustmentValue;
        setGrandAmt(newGrandTotal);
        setTotalAmountData((prevData) => ({
            ...prevData,
            subTotal: totalAmount,
            totalCost: newGrandTotal,
            shipping: shippingValue,
            adjustment: adjustmentValue,
        }));
    };

    useEffect(() => {
        updateGrandTotal();
    }, [totalAmount, selectedDiscount, shipping, adjustment]);





   


    const totalPaidAmount = transactionsData?.filter(item => item.moneyChange === 'In' || item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);

    const totalAmountToPay = transactionsData?.filter(item => item.moneyChange === 'Out').map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);


    const balanceDue = grandAmt - totalPaidAmount + totalAmountToPay;


    const [count, setCount] = useState(0);
    const [initialInvoiceNo, setInitialInvoiceNo] = useState('');

    

    useEffect(() => {
       
        const newInvoiceNo = generateInvoiceNumber(count);
        setInitialInvoiceNo(newInvoiceNo);
        
    }, [count]);


    // console.log(headerData)


    return (
        <>


            <div className="flex gap-4 mt-10  pt-[20px] pb-[20px]">

                <Popup headerdata={headerData}  setCount={setCount} transactionsData={transactionsData} setTransactionsData={setTransactionsData} initialInvoiceNo={initialInvoiceNo} totalAmount={totalAmountData} balanceDue={balanceDue} />
                <div className="w-1/2 rounded-md">
                    <div className='w-full bg-white'>
                        <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                            <div className="text-gray-500 text-base font-bold ">Subtotal</div>
                            <div className="text-right text-gray-500 text-base font-bold ">{totalAmount.toFixed(2)}</div>
                        </div>
                        <div className="w-full flex px-4 py-2 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                            <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
                            <div className="flex items-center">
                                <div className="text-right text-textGrey1 text-base  ">{selectedDiscount * 100}%</div>
                                <div className=' flex text-gray-500 text-base font-medium pl-6'>
                                    <Select
                                        className="text-neutral-400 text-base font-medium"
                                        defaultValue={gstOptions[0]}
                                        isClearable={false}
                                        isSearchable={true}
                                        options={gstOptions}
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                border: state.isFocused ? 'none' : 'none',
                                            }),
                                        }}
                                        onChange={handleSelectChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5   ">
                            <div className="text-gray-500 text-base font-bold ">Shipping</div>
                            <input
                                className="text-right text-textGrey1 text-base border-none outline-none"
                                placeholder='0'
                                value={shipping}
                                onChange={handleShippingChange}
                            />
                        </div>
                        <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5  ">
                            <div className="text-gray-500 text-base font-bold ">Adjustment</div>
                            <input
                                className="text-right text-textGrey1 text-base  border-none outline-none"
                                placeholder='0'
                                value={adjustment}
                                onChange={handleAdjustmentChange}
                            />
                        </div>
                    </div>

                    <div className="w-full flex p-4 border border-solid bg-white  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                        <div className="text-textGreen text-base font-bold ">Grand total</div>
                        <div className="text-right text-textGreen text-base font-bold ">{(grandAmt).toFixed(2)}</div>
                    </div>

                    <div className="w-full mr-4 flex flex-col mt-8">
                    <div className="w-full  p-6 bg-white rounded-tl-md rounded-tr-md border border-solid  border-borderGrey justify-between items-center gap-6 flex">
                        <div className="text-gray-500 text-xl font-medium ">Payments</div>
                    </div>
                    {transactionsData && transactionsData.map((transaction, index) => (
                        transaction.isAdvancePayment &&
                        (<div key={index} className="w-full  px-6 py-4 bg-white justify-between items-center gap-6 flex border border-t-0 border-solid border-borderGrey">
                            <div className="text-gray-500 text-lg font-medium ">Advance Paid</div>
                            <div className='flex items-center h-9 px-4 py-2.5 justify-between rounded-lg '>
                                <div className="text-gray-500 text-base font-bold flex gap-2 items-center">
                                    ₹ {transaction.amountPaid > 0 ? transaction.amountPaid : -1*transaction.amountPaid > 0}
                                </div>
                            </div>
                        </div>)
                    ))
                    }

                    {transactionsData && transactionsData.map((transaction, index) => (
                        !transaction.isAdvancePayment &&
                        (<div key={index} className="w-full  px-6 py-4 bg-white justify-between items-center gap-6 flex border border-t-0 border-solid border-borderGrey">
                            <div className="text-gray-500 text-lg font-medium ">{formatDateAndTime(transaction.date).formattedDate}</div>
                            <div className='flex items-center h-9 px-4 py-2.5 justify-between rounded-lg '>
                                <div className="text-gray-500 text-base font-bold flex gap-2 items-center">
                                    ₹ {transaction.amountPaid > 0 ? transaction.amountPaid : -1*transaction.amountPaid > 0}
                                </div>
                            </div>
                        </div>)
                    ))
                    }

                    <div className="w-full  px-6 bg-white rounded-bl-md rounded-br-md justify-between items-center flex  border border-t-0 border-solid border-borderGrey">
                        <div className="text-gray-500 text-base font-bold  w-1/3 py-4">Balance Due</div>
                        <div className="text-gray-500 text-lg font-medium  w-1/3 py-4 flex  items-center"></div>
                        <div className="text-gray-500 text-base font-bold  w-1/3 py-4 ">₹{balanceDue < 0 ? -1 * (balanceDue)?.toFixed(2) : (balanceDue)?.toFixed(2)}
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

export default NewExpensesTotalAmout;
