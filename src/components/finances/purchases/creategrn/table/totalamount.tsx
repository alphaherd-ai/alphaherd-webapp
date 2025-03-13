import React, { useContext, useEffect, useState } from 'react'

import Image from "next/image"

import calicon from "../../../../../assets/icons/finance/calendar_today.svg"
import Select from 'react-select';
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { DataContext } from './DataContext';

import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import formatDateAndTime from '@/utils/formateDateTime';
import Popup from "./recordCreateGrnTransaction"
import Cash from '../../../../../assets/icons/finance/Cash.svg'
import { Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import Menu from '../../../../../assets/icons/finance/menu.svg'
import EditRecordTransactionPopup from '@/components/finances/editTransaction/editTransaction';
import CancellationPopup from '@/components/finances/cancelTransaaction/cancelTransaction';

const CreateGrnTotalAmount = ({ orderData }: any) => {
    const { tableData, headerData } = useContext(DataContext);
    let totalAmount = 0;
    tableData.forEach(data => {

        totalAmount += (data.quantity * Number(data.unitPrice) + data.quantity * data.gst * Number(data.unitPrice) - (data.quantity * data.discountPercent / 100 * Number(data.unitPrice) || 0)) || 0;
    });

    const { totalAmountData, setTotalAmountData } = useContext(DataContext);
    const { transactionsData, setTransactionsData } = useContext(DataContext);

    const [popup, setPopup] = useState(false);

    const onClose = () => {
        setPopup((prev: any) => !prev);
    }

    const [showConfirmation, setShowConfirmation] = useState(false);

    const [transaction, setTransaction] = useState<any>();

    const handleSelectedTransaction = (transaction: any) => {
        const updatedTransaction = {
            partyName: headerData?.distributor.value,
            invoiceLink: headerData.invoiceNo,
            ...transaction
        }
        setTransaction(updatedTransaction);
    }


    const [grandAmt, setGrandAmt] = useState(totalAmount);

    const gstOptions = [
        { value: 'percent', label: '% in Percent' },
        { value: 'amount', label: '₹ in Amount' }
    ];
    const [startDate, setDate] = useState(new Date());
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


    const [discountMethod, setDiscountMethod] = useState("amount");
    const handleSelectChange = (selectedOption: any) => {
        setDiscountMethod(selectedOption.value);
    };
    useEffect(() => {
            if (orderData.recordTransaction) {
                for (let i = 0; i < orderData.recordTransaction.length; i++) {
                    const formData = orderData.recordTransaction[i];
                    const newTransaction = {
                        amountPaid: parseInt(formData.amountPaid > 0 ? formData.amountPaid : -1 * formData.amountPaid, 10) || (balanceDue),
                        date: formData.date || new Date(),
                        isAdvancePayment: formData.isAdvancePayment,
                        mode: formData.mode,
                        moneyChange: formData.moneyChange,
                        receiptNo: formData?.receiptNo,
                    };
                    setTransactionsData((prevTransactions: any) => [...prevTransactions, newTransaction]);
                };
            }
        }, [orderData.recordTransaction]);
    const [discountInput, setDiscountInput] = useState(0);
    const [selectedDiscountPer, setDiscountPer] = useState(0);
    const handleDiscountChange = (value: number) => {





        if (discountMethod === "amount") {
            //const discountedAmount = grandAmt - value;
            //const discountPercent = Number(value / totalAmount).toFixed(10);
            setDiscountInput(value)
            const discountPercent = Number(value / totalAmount).toFixed(4)
            setDiscountPer(Number(discountPercent))

            setTotalAmountData((prevData) => ({
                ...prevData,
                overallDiscount: Number(discountPercent),
            }));
        } else if (discountMethod === "percent") {

            setDiscountInput(value);
            const discountPercent = Number(value / 100).toFixed(4)
            setDiscountPer(Number(discountPercent));
            setDiscountInput(Number(discountPercent) * totalAmount)

            setTotalAmountData((prevData) => ({
                ...prevData,
                overallDiscount: value / 100,
            }));
        }

    };

    const updateGrandTotal = () => {
        const discountedAmount = (totalAmount - (discountMethod === 'amount' ? (discountInput || 0) : totalAmount * (selectedDiscountPer || 0))) || 0;
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
    const handleDateChange = (date: any) => {
        setDate(date);
        setTotalAmountData((prevData) => ({
            ...prevData,
            returnLastDate: date
        }))
    }
    useEffect(() => {
        // by default last date should be todays date
        setTotalAmountData((prevData) => ({
            ...prevData,
            returnLastDate: new Date()
        }));
    }, [])
    // const updateGrandTotal = () => {
    //     const discountedAmount = (totalAmount - totalAmount * overAllDiscount)||0;
    //     const shippingValue = parseFloat(shipping) || 0;
    //     const adjustmentValue = parseFloat(adjustment) || 0;
    //     const newGrandTotal = discountedAmount + shippingValue + adjustmentValue;

    //     setGrandAmt(newGrandTotal);
    //     setTotalAmountData((prevData) => ({
    //         ...prevData,
    //         subTotal:totalAmount,
    //         totalCost: newGrandTotal, 
    //         shipping:shippingValue,
    //         adjustment:adjustmentValue,
    //         overAllDiscount:overAllDiscount
    //     }));
    // };

    useEffect(() => {
        updateGrandTotal();
    }, [totalAmount, selectedDiscountPer, discountInput, discountMethod, shipping, adjustment]);





    const totalPaidAmount = transactionsData?.filter(item => item.moneyChange === 'In').map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);
    const totalAmountToPay = transactionsData?.filter(item => item.moneyChange === 'Out' || item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);


    const balanceDue = grandAmt >= headerData.distributor?.creditedToken ? grandAmt + totalPaidAmount - totalAmountToPay - headerData.distributor?.creditedToken : grandAmt + totalPaidAmount - totalAmountToPay;


    const [count, setCount] = useState(0);
    const [initialInvoiceNo, setInitialInvoiceNo] = useState('');



    useEffect(() => {

        const newInvoiceNo = generateInvoiceNumber(count);
        setInitialInvoiceNo(newInvoiceNo);

    }, [count]);


    console.log(headerData)

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
                                                value={startDate.toLocaleDateString('en-GB')}
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
                        <Popup headerdata={headerData} orderData={orderData} setCount={setCount} transactionsData={transactionsData} setTransactionsData={setTransactionsData} initialInvoiceNo={initialInvoiceNo} totalAmount={totalAmountData} balanceDue={balanceDue} />
                    </div>

                </div>
                <div className='w-1/2 rounded-md'>
                    <div className="w-full bg-white">
                        <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                            <div className="text-gray-500 text-base font-bold  ">Subtotal</div>
                            <div className="text-right text-gray-500 text-base font-bold ">{totalAmount.toFixed(2)}</div>
                        </div>
                        <div className="w-full flex px-4 py-2 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                            <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
                            <div className="flex items-center">
                                <div className="text-right text-borderText text-base  ">
                                    <input
                                        placeholder='0'
                                        className="text-right  text-base  w-[50%] border-none outline-none"
                                        value={discountMethod === 'amount' ? discountInput : (selectedDiscountPer || 0) * 100}
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
                        <div className="w-full flex px-4 py-2 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
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
                        <div className="w-full flex px-4 py-2 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
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
                            <div className="text-gray-500 text-base font-bold  w-1/3 py-4 ">₹{totalAmountData.subTotal ? (balanceDue < 0 ? (-1 * balanceDue)?.toFixed(2) : (balanceDue)?.toFixed(2)) : 0}
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

export default CreateGrnTotalAmount