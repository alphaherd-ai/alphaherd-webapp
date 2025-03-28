"use client"


import React, { useState, useEffect, useContext } from 'react';

import Image from "next/image"
import Select from 'react-select';
import { DataContext } from './DataContext';

import Cash from "../../../../../assets/icons/finance/Cash.svg"
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import RecordTransactionPopup from './recordTransactionPopup';
import formatDateAndTime from '@/utils/formateDateTime';
import { Tooltip, Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import Menu from '../../../../../assets/icons/finance/menu.svg';
import EditRecordTransactionPopup from '@/components/finances/editTransaction/editTransaction';
import CancellationPopup from '@/components/finances/cancelTransaaction/cancelTransaction';

interface Transactions {
    id: number;
    partyName: string;
    subject: string;
    invoiceLink: string;
    receiptNo: string;
    date: string;
    amountPaid: number;
    mode: string;
    moneyChange: string;
    invoiceSource: string;
}


const NewsaleEstimateTotalAmout = ({ isChecked }: { isChecked: boolean }) => {
    const { tableData } = useContext(DataContext);
    let totalAmount = 0, totalAmountLow = 0, totalAmountHigh = 0, lowGrandTotal = 0, highGrandTotal = 0;
    tableData.forEach(data => {
        //console.log(data)
        if (!isChecked) {

            totalAmount += (data.quantity * data.sellingPrice + data.quantity * data.gst * data.sellingPrice - (data.quantity * data.sellingPrice * (data.discountPer / 100) || 0)) || 0;
        }
        else if (isChecked) {

            totalAmountLow += (data.lowQty * data.sellingPrice + data.lowQty * data.gst * data.sellingPrice - data.lowQty * data.sellingPrice * (data?.discountPer / 100 || 0)) || 0;
            totalAmountHigh += (data.highQty * data.sellingPrice + data.highQty * data.gst * data.sellingPrice - data.highQty * data.sellingPrice * (data?.discountPer / 100 || 0)) || 0;
            //console.log(totalAmountLow, totalAmountHigh)
        }

    });

    const { totalAmountData, setTotalAmountData, headerData } = useContext(DataContext);
    const { transactionsData, setTransactionsData } = useContext(DataContext);
    const [grandAmt, setGrandAmt] = useState(totalAmount);
    const [lowGrand, setLowGrand] = useState(totalAmountLow);
    const [highGrand, setHighGrand] = useState(totalAmountHigh);

    const [popup, setPopup] = useState(false);

    const onClose = () => {
        setPopup((prev: any) => !prev);
    }

    const [showConfirmation, setShowConfirmation] = useState(false);

    const [transaction, setTransaction] = useState<any>();

    const handleSelectedTransaction = (transaction: any) => {
        const updatedTransaction = {
            partyName: headerData?.customer?.label,
            invoiceLink: headerData.invoiceNo,
            ...transaction
        }
        setTransaction(updatedTransaction);
    }

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
            //let discountedAmount = (!isChecked ? totalAmount : totalAmountLow) - discount;
            const discountPercent = !isChecked
                ? (discount / totalAmount || 0).toFixed(4)
                : (discount / totalAmountLow || 0).toFixed(4);
            setDiscountPer(Number(discountPercent))
            //console.log(discount / totalAmount , discountPercent);
            //setGrandAmt(discountedAmount);
            setTotalAmountData((prevData) => ({ ...prevData, gst: Number(discountPercent) }))
        }
        else if (discountMethod === 'percent') {
            //setDiscountInput(discount);
            //let discountedAmount = (!isChecked ? totalAmount : totalAmountLow) - (!isChecked ? totalAmount : totalAmountLow) * (discount / 100);
            const discountPercent = Number(discount / 100).toFixed(4)
            setDiscountPer(Number(discountPercent));
            const discountedValue = !isChecked ? Number(discountPercent) * totalAmount : Number(discountPercent) * totalAmountLow;
            setDiscountInput(discountedValue);
            //console.log(discountedValue)
            //setGrandAmt(discountedAmount);
            setTotalAmountData((prevData) => ({ ...prevData, gst: Number(discountPercent) }))
        }
    }

    const [shipping, setShipping] = useState<string>('');
    const [adjustment, setAdjustment] = useState<string>('');

    useEffect(() => {
        if (totalAmountData.subTotal == 0) {
            setShipping('');
            setAdjustment('');
        }
    }, [totalAmountData])

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

    const [isFirstAdvancePaymentPaid, setFirstAdvancePaymentPaid] = useState(false);

    const updateGrandTotal = () => {
        
        //console.log(discountInput,selectedDiscount);
        const discountedAmount = (totalAmount - (discountMethod === 'amount' ? discountInput : totalAmount - discountInput)) || 0;
        const lowDiscount = (totalAmountLow - (discountMethod === 'amount' ? discountInput : totalAmount * selectedDiscountPer)) || 0;
        const highDiscount = (totalAmountHigh - (discountMethod === 'amount' ? discountInput : totalAmount * selectedDiscountPer)) || 0;
        const shippingValue = parseFloat(shipping) || 0;
        const adjustmentValue = parseFloat(adjustment) || 0;
        const newGrandTotal = discountedAmount + shippingValue + adjustmentValue;
        lowGrandTotal = lowDiscount + shippingValue + adjustmentValue;
        highGrandTotal = highDiscount + shippingValue + adjustmentValue;
        setLowGrand(lowGrandTotal);
        setHighGrand(highGrandTotal);
        setGrandAmt(newGrandTotal);
        setTotalAmountData((prevData) => ({
            ...prevData,
            subTotal: !isChecked ? totalAmount : totalAmountLow,
            totalCost: !isChecked ? newGrandTotal : lowGrandTotal,
            shipping: shippingValue,
            adjustment: adjustmentValue,
        }));
    };

    useEffect(() => {
        updateGrandTotal();
    }, [totalAmount, selectedDiscountPer, discountInput, shipping, adjustment, totalAmountLow, totalAmountHigh, tableData, discountMethod]);

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
        menuPortal: (base: any) => ({ ...base, zIndex: 9999 })
    };


    const totalPaidAmount = transactionsData?.filter(item => item.moneyChange === 'In' || item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);

    const totalAmountToPay = transactionsData?.filter(item => item.moneyChange === 'Out' && !item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);


    const balanceDue = (isChecked ? lowGrand : grandAmt) - totalPaidAmount + totalAmountToPay;
    //console.log(totalAmount);

    const [count, setCount] = useState(0);
    const [initialInvoiceNo, setInitialInvoiceNo] = useState('');



    useEffect(() => {

        const newInvoiceNo = generateInvoiceNumber(count);
        setInitialInvoiceNo(newInvoiceNo);

    }, [count]);
    console.log(totalAmountData);
    //console.log(balanceDue);

    return (
        <>


            <div className="flex gap-4  pt-[20px] pb-[20px]">
                <RecordTransactionPopup setFirstAdvancePaymentPaid={setFirstAdvancePaymentPaid} isFirstAdvancePaymentPaid={isFirstAdvancePaymentPaid} headerdata={headerData} setCount={setCount} transactionsData={transactionsData} setTransactionsData={setTransactionsData} initialInvoiceNo={initialInvoiceNo} totalAmount={totalAmountData} balanceDue={balanceDue} />
                <div className="w-1/2 rounded-md">
                    <div className="w-full bg-white">
                        <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                            <div className="text-gray-500 text-base font-bold ">Subtotal</div>
                            <div className="text-right text-gray-500 text-base font-bold ">
                                {!isChecked ? (
                                    (totalAmount ?? 0).toFixed(2)
                                ) : (
                                    <>
                                        ₹{(totalAmountLow ?? 0).toFixed(2)} - ₹{(totalAmountHigh ?? 0).toFixed(2)}
                                    </>
                                )}
                            </div>

                        </div>
                        <div className="w-full flex px-4 py-2 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                            <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
                            <div className="flex items-center">
                                <div className="text-right text-textGrey2 text-base">
                                    <input
                                        type='number'
                                        className="text-right text-gray-500 text-base  w-[50%] border-none outline-none"
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
                                className="text-right text-textGrey1 text-base   border-none outline-none"
                                placeholder='0'
                                value={shipping}
                                onChange={handleShippingChange}
                            />
                        </div>
                        <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5  ">
                            <div className="text-gray-500 text-base font-bold ">Adjustment</div>
                            <input
                                className="text-right text-textGrey1 text-base   border-none outline-none"
                                placeholder='0'
                                value={adjustment}
                                onChange={handleAdjustmentChange}
                            />
                        </div>
                        <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                            <div className="text-textGreen text-base font-bold ">Grand total</div>
                            <div className="text-right text-textGreen text-base font-bold"> {!isChecked ?
                                `₹ ${grandAmt ? (grandAmt.toFixed(2)) : 0}`
                                : (
                                    <>
                                        ₹{lowGrand.toFixed(2)} - ₹{highGrand.toFixed(2)}
                                    </>
                                )}</div>
                        </div>
                    </div>

                    <div className="w-full mr-4 flex flex-col mt-8">
                        <div className="w-full  p-4 bg-white rounded-tl-md rounded-tr-md border border-solid  border-borderGrey justify-between items-center gap-6 flex">
                            <div className="text-gray-500 text-xl font-medium ">Payments</div>
                        </div>
                        {transactionsData && transactionsData.map((transaction, index) => (
                            transaction.isAdvancePayment &&
                            (<div key={index} className="w-full   px-6 py-2 bg-white justify-between items-center gap-6 flex  border border-t-0 border-solid border-borderGrey">
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
                            (<div key={index} className="w-full  px-6 py-2 bg-white flex justify-between items-center gap-6  border border-t-0 border-solid border-borderGrey">
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
                            <div className="text-gray-500 text-base font-bold  w-1/3 py-4 ">₹{(balanceDue < 0 ? -1 * (balanceDue)?.toFixed(2) : (balanceDue)?.toFixed(2))}
                                {balanceDue < 0 ? <span className="text-[#FC6E20] text-sm font-medium  px-2 py-1.5 bg-[#FFF0E9] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                                    You owe
                                </span> : balanceDue === 0 ? "" : <span className="text-[#0F9D58] text-sm font-medium  px-2 py-1.5 bg-[#E7F5EE] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                                    You’re owed
                                </span>}
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

export default NewsaleEstimateTotalAmout;
