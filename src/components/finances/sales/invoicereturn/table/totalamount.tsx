"use client"


import React, { useState, useEffect, useContext } from 'react';
import DownArrow from '../../../../../assets/icons/finance/downArrow.svg';
import Invoice from '../../../../../assets/icons/finance/invoice.svg';
import Link from "next/link"
import Rupee from "../../../../../assets/icons/finance/rupee.svg"
import Image from "next/image"
import Select from 'react-select';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { DataContext } from './DataContext';
import { Tax } from '@prisma/client';
import RecordTransactionPopup from './recordTransactionPopup';
import formatDateAndTime from '@/utils/formateDateTime';
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import Cash from "../../../../../assets/icons/finance/Cash.svg"
const InvoiceReturnTotalAmount = ({otherData}:{otherData:any}) => {
    const { tableData,headerData } = useContext(DataContext);
    const { transactionsData, setTransactionsData } = useContext(DataContext);
    const [selectedDiscount, setDiscount] = useState(0);
    let totalAmount = 0;
    tableData.forEach(data => {
        totalAmount += (data.quantity * data.unitPrice * Number(-data.discount / 100 + data.tax + 1)) || 0;
    });

    const { totalAmountData, setTotalAmountData } = useContext(DataContext);
    const [grandAmt, setGrandAmt] = useState(totalAmount);

    const gstOptions = [
        { value: 'percent', label: '% in Percent' },
        { value: 'amount', label: '₹ in Amount' }
    ];

    const [discountMethod, setDiscountMethod] = useState('amount');
    const handleSelectChange = (selectedOption: any) => {
        setDiscountMethod(selectedOption.value);
    };
    const [discountInput, setDiscountInput] = useState(0);
    const [selectedDiscountPer, setDiscountPer] = useState(0);
    const handleDiscountChange = (discount: number) => {
        if (discountMethod === 'amount') {
            setDiscountInput(discount);
            //let discountedAmount = grandAmt - discount;
            const discountPercent = Number(discount / totalAmount).toFixed(4)
            setDiscountPer(Number(discountPercent))
            //setGrandAmt(discountedAmount);
            setTotalAmountData((prevData) => ({ ...prevData, gst: Number(discountPercent) }))
        }
        else if (discountMethod === 'percent') {
            setDiscountInput(discount);
            const discountPercent = Number(discount / 100).toFixed(4)
            setDiscountPer(Number(discountPercent));
            //setGrandAmt(discountedAmount);
            setDiscountInput(Number(discountPercent) * totalAmount)
            setTotalAmountData((prevData) => ({ ...prevData, gst: Number(discount / 100) }))
        }
    }

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
    console.log(totalAmount,tableData);
    const updateGrandTotal = () => {
        const discountedAmount = (totalAmount - (discountMethod === 'amount' ? discountInput : totalAmount * selectedDiscountPer)) || 0;
        const shippingValue = parseFloat(shipping) || 0;
        const adjustmentValue = parseFloat(adjustment) || 0;
        const newGrandTotal = discountedAmount + shippingValue + adjustmentValue;
        setGrandAmt(newGrandTotal);
       // console.log(newGrandTotal,shippingValue,discountedAmount);
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
    }, [totalAmount, selectedDiscountPer, discountInput, discountMethod, shipping, adjustment]);

    const totalPaidAmount = transactionsData?.filter(item => item.moneyChange === 'In' || item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);

    const totalAmountToPay = transactionsData?.filter(item => item.moneyChange === 'Out' && !item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);


    const balanceDue = grandAmt - totalPaidAmount + totalAmountToPay;


    const [count, setCount] = useState(0);
    const [initialInvoiceNo, setInitialInvoiceNo] = useState('');



    useEffect(() => {

        const newInvoiceNo = generateInvoiceNumber(count);
        setInitialInvoiceNo(newInvoiceNo);

    }, [count]);

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

    return (
        <>


            <div className="flex gap-4  pt-[20px] pb-[20px]">
                <RecordTransactionPopup headerdata={headerData} setCount={setCount} transactionsData={transactionsData} setTransactionsData={setTransactionsData} initialInvoiceNo={initialInvoiceNo} totalAmount={totalAmountData} balanceDue={balanceDue} otherData={otherData}/>
                <div className='w-1/2 rounded-md'>

                    <div className="w-full bg-white ">
                        <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                            <div className="text-gray-500 text-base font-bold ">Subtotal</div>
                            <div className="text-right text-gray-500 text-base font-bold ">{totalAmount.toFixed(2)}</div>
                        </div>
                        <div className="w-full flex px-4 py-2 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                            <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
                            <div className="flex items-center">
                                <div className="text-right text-borderText text-base  ">
                                    <input
                                        type='number'
                                        className="text-right  text-base  w-[50%] border-none outline-none"
                                        value={discountMethod === "amount" ? discountInput : selectedDiscountPer * 100}
                                        onChange={(e) => handleDiscountChange(Number(e.target.value))}
                                    /></div>
                                <div className=' flex text-gray-500 text-base font-medium pl-6'>
                                    <Select
                                        className="text-neutral-400 text-base font-medium"
                                        defaultValue={gstOptions[1]}
                                        isClearable={false}
                                        isSearchable={true}
                                        options={gstOptions}
                                        styles={customStyles}
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
                        <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                            <div className="text-textGreen text-base font-bold ">Grand total</div>
                            <div className="text-right text-textGreen text-base font-bold ">{(grandAmt)}</div>
                        </div>
                    </div>
                    <div className="w-full mr-4 flex flex-col mt-8">
                        <div className="w-full  p-4 bg-white rounded-tl-md rounded-tr-md border border-solid  border-borderGrey justify-between items-center gap-6 flex">
                            <div className="text-gray-500 text-xl font-medium ">Payments</div>
                        </div>
                        {transactionsData && transactionsData.map((transaction, index) => (
                            transaction.isAdvancePayment &&
                            (<div key={index} className="w-full  px-6 py-2 bg-white justify-between items-center gap-6 flex border border-t-0 border-solid border-borderGrey">
                                <div className="text-gray-500 text-md font-medium ">Advance Paid on  {formatDateAndTime(transaction.date).formattedDate}</div>
                                <div className='flex items-center h-9 px-4  justify-between rounded-lg '>
                                    <div className="text-gray-500 text-base font-bold flex gap-2 items-center">
                                        ₹ {transaction.amountPaid > 0 ? transaction.amountPaid : -1 * transaction.amountPaid}
                                    </div>
                                </div>
                            </div>)
                        ))
                        }

                        {transactionsData && transactionsData.map((transaction, index) => (
                            !transaction.isAdvancePayment &&
                            (<div key={index} className="w-full  px-6 py-2 bg-white justify-between items-center gap-6 flex border border-t-0 border-solid border-borderGrey">
                                <div className="text-gray-500 text-md font-medium ">Paid on {formatDateAndTime(transaction.date).formattedDate}</div>
                                <div className="text-textGrey2 text-base font-medium  w-1/3 py-4 flex  items-center">
                                    <div className='flex pr-2'>
                                        <Image src={Cash} alt='Cash' className='w-4 h-4 ' />
                                    </div>
                                    {transaction.mode}
                                </div>
                                <div className="text-textGrey2 text-base font-medium  w-1/3 py-4 ">₹ {(transaction.amountPaid > 0 ? transaction.amountPaid : -1 * transaction.amountPaid)?.toFixed(2)}
                                    {transaction.moneyChange === 'Out' && <span className="px-2 py-1 rounded-md bg-[#FFEAEA] text-[#FF3030] text-sm font-medium ml-[5px]">Out</span>}
                                    {transaction.moneyChange === 'In' && <span className="px-2 py-1 rounded-md bg-[#E7F5EE] text-[#0F9D58] text-sm font-medium ml-[5px]">In</span>}
                                </div>
                            </div>)
                        ))
                        }

                        <div className="w-full  px-6 bg-white rounded-bl-md rounded-br-md justify-between items-center flex border border-t-0 border-solid border-borderGrey">
                            <div className="text-gray-500 text-base font-bold  w-1/3 py-4">Balance Due</div>
                            <div className="text-gray-500 text-lg font-medium  w-1/3 py-4 flex  items-center"></div>
                            <div className="text-gray-500 text-base font-bold  w-1/3 py-4 ">₹{totalAmountData.subTotal ? (balanceDue < 0 ? -1 * (balanceDue)?.toFixed(2) : (balanceDue)?.toFixed(2)) : 0}
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

export default InvoiceReturnTotalAmount;
