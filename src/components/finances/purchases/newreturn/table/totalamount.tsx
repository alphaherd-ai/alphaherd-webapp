'use client';
import React, { useContext, useEffect, useState } from 'react'
import Rupee from "../../../../../assets/icons/finance/rupee.svg"
import Image from "next/image"
import { Button } from "@nextui-org/react";
import calicon from "../../../../../assets/icons/finance/calendar_today.svg"
import Select from 'react-select';
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { DataContext } from './DataContext';
import { Tax } from '@prisma/client';
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import formatDateAndTime from '@/utils/formateDateTime';
import Popup from "./recordPurchaseRetrunTransaction"

const NewPurchaseReturnNewTotalAmount = () => {
    const { tableData, headerData } = useContext(DataContext);
    // console.log("Here is the tableData",tableData)
    let totalAmount = 0;
    tableData.forEach(data => {

        totalAmount += (data.quantity * Number(data.sellingPrice) + data.quantity * data.gst * Number(data.sellingPrice) - (data.quantity * data.discount * Number(data.sellingPrice) || 0)) || 0;
    });

    const { totalAmountData, setTotalAmountData } = useContext(DataContext);
    const { transactionsData, setTransactionsData } = useContext(DataContext);
    const [grandAmt, setGrandAmt] = useState(totalAmount);

    const gstOptions = [
        { value: 'percent', label: '₹ in Percent' },
        { value: 'amount', label: '₹ in Amount' }
    ];


    const [startDate, setDate] = useState(new Date());
    const [shipping, setShipping] = useState<string>('');
    const [adjustment, setAdjustment] = useState<string>('');
    const [overAllDiscount, setDiscount] = useState(0);


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


    const [discountMethod, setDiscountMethod] = useState('amount');
    const handleSelectChange = (selectedOption: any) => {
        setDiscountMethod(selectedOption.value);
    };
    const [discountInput, setDiscountInput] = useState(0);
    const handleDiscountChange = (discount: number) => {
        if (discountMethod === 'amount') {
            setDiscountInput(discount);
            let discountedAmount = grandAmt - discount;
            let discountPercent = Number(discount / totalAmount).toFixed(10)
            setDiscount(Number(discountPercent))
            setGrandAmt(discountedAmount);
            setTotalAmountData((prevData) => ({ ...prevData, overallDiscount: Number(discountPercent) }))
        }
        else if (discountMethod === 'percent') {
            setDiscountInput(discount);
            let discountedAmount = grandAmt - grandAmt * (discount / 100);
            setDiscount(Number(discount / 100));
            setGrandAmt(discountedAmount);
            setTotalAmountData((prevData) => ({ ...prevData, overallDiscount: Number(discount / 100) }))
        }
    }
    const handleDateChange = (date: any) => {
        setDate(date);
        setTotalAmountData((prevData) => ({
            ...prevData,
            lastDateOfReturn: date
        }))
    }
    const updateGrandTotal = () => {
        const discountedAmount = (totalAmount - totalAmount * overAllDiscount) || 0;
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
            overAllDiscount: overAllDiscount
        }));
    };

    useEffect(() => {
        updateGrandTotal();
    }, [totalAmount, overAllDiscount, shipping, adjustment]);


    const [showPopup, setShowPopup] = React.useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }


    const totalPaidAmount = transactionsData?.filter(item => item.moneyChange === 'In' || item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);

    const totalAmountToPay = transactionsData?.filter(item => item.moneyChange === 'Out').map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);


    const balanceDue = grandAmt - totalPaidAmount + totalAmountToPay;


    const [count, setCount] = useState(0);
    const [initialInvoiceNo, setInitialInvoiceNo] = useState('');

    useEffect(() => {
        if (showPopup) {
            setCount((prevCount) => prevCount + 1);
        }
    }, [showPopup]);

    useEffect(() => {
        if (showPopup) {
            const newInvoiceNo = generateInvoiceNumber(count);
            setInitialInvoiceNo(newInvoiceNo);
        }
    }, [count, showPopup]);


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


<div className="flex gap-4 pt-[20px] pb-[20px]">
                
                <div className="w-1/2 mr-4 flex flex-col gap-4">
                    <div className="px-6 py-2 bg-white rounded-[5px] justify-between items-center gap-4 flex w-full border border-solid border-borderGrey">
                        <div className="flex gap-[0.2rem] items-center w-full">
                            <div className="text-gray-500 text-base font-bold  w-[20rem]">Last Date Of Item Returns:</div>

                            <div className="customDatePickerWidth">
                                <DatePicker
                                    className="w-full"
                                    selected={startDate}
                                    onChange={handleDateChange}
                                    calendarClassName="react-datepicker-custom"
                                    customInput={
                                        <div className='relative'>
                                            <input
                                                className="w-full h-9 text-textGrey1 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                                value={startDate.toLocaleDateString()}
                                                readOnly
                                            />
                                            <Image
                                                src={calicon}
                                                alt="Calendar Icon"
                                                className="absolute right-2 top-2 cursor-pointer"
                                                width={50}
                                                height={20}
                                            />
                                        </div>
                                    }
                                />
                            </div>
                        </div>

                    </div>


                    <div className="w-full mr-4 flex flex-col mt-8">
                        <Popup headerdata={headerData} onClose={togglePopup} transactionsData={transactionsData} setTransactionsData={setTransactionsData} initialInvoiceNo={initialInvoiceNo} totalAmount={totalAmountData} balanceDue={balanceDue} />

                    </div>

                </div>

                <div className="w-1/2 rounded-md">
                    <div className='w-full bg-white'>
                        <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                            <div className="text-gray-500 text-base font-bold  ">Subtotal</div>
                            <div className="text-right text-gray-500 text-base font-bold ">{totalAmount.toFixed(2)}</div>
                        </div>
                        <div className="w-full flex px-4 py-2 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                            <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
                            <div className="flex items-center">
                                <div className="text-right text-borderText text-base  ">
                                    <input
                                        type='number'
                                        className="text-right  text-base  w-[50%] border-none outline-none"
                                        value={totalAmountData.subTotal ? discountInput : 0}
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
                        <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                            <div className="text-gray-500 text-base font-bold ">Shipping</div>
                            <div className="flex items-center">
                                <div className="text-right text-textGrey1 text-base  "><input
                                    className="text-right text-textGrey1 text-base   border-none outline-none"
                                    placeholder='0'
                                    value={shipping}
                                    onChange={handleShippingChange}
                                /></div>

                            </div>
                        </div>
                        <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                            <div className="text-gray-500 text-base font-bold ">Adjustment</div>
                            <div className="flex items-center">
                                <div className="text-right text-textGrey1 text-base  "><input
                                    className="text-right text-textGrey1 text-base   border-none outline-none"
                                    placeholder='0'
                                    value={adjustment}
                                    onChange={handleAdjustmentChange}
                                /></div>

                            </div>
                        </div>

                        <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                            <div className="text-textGreen text-base font-bold ">Grand total</div>
                            <div className="text-right text-textGreen text-base font-bold "> {grandAmt.toFixed(2)}</div>
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
                                        ₹ {transaction.amountPaid}
                                    </div>
                                </div>
                            </div>)
                        ))
                        }

                        {transactionsData && transactionsData.map((transaction, index) => (
                            !transaction.isAdvancePayment &&
                            (<div key={index} className="w-full  px-6 py-2 bg-white justify-between items-center gap-6 flex border border-t-0 border-solid border-borderGrey">
                                <div className="text-gray-500 text-md font-medium ">Paid on {formatDateAndTime(transaction.date).formattedDate}</div>
                                <div className='flex items-center h-9 px-4  justify-between rounded-lg '>
                                    <div className="text-gray-500 text-base font-bold flex gap-2 items-center">
                                        ₹ {transaction.amountPaid}
                                    </div>
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

export default NewPurchaseReturnNewTotalAmount