"use client"


import React, { useState, useEffect } from 'react';
import RecordTransactionPopup from './recordTransactionpopup';
import Link from "next/link"
import Image from "next/image"
import Select from 'react-select';
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import formatDateAndTime from '@/utils/formateDateTime';
import Cash from "../../../../../assets/icons/finance/Cash.svg"
import Loading2 from '@/app/loading2';
import { Button } from '@nextui-org/react';
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Menu } from 'react-feather';
import { useAppSelector } from '@/lib/hooks';

const ExistingsaleEstimateTotalAmout = ({ otherData, items, isLoading }: any) => {

    const appState = useAppSelector((state) => state.app);

    const [isEditPopupVisible, setEditPopupVisible] = useState(false);
    const [selectedRecordTransaction, setSelectedRecordTransaction] = useState<any>(null);
    const [editRecordTransaction, setEditRecordTransaction] = useState<any>({});


    console.log("otherdata is ", otherData);
    const subTotalAmountLow = items?.some((item: { lowQty: any; }) => item?.lowQty)
        ? items.reduce((acc: number, item: { itemName: any; lowQty: number; tax: number; sellingPrice: number; discount: any; }) => {
            if (!item.itemName) return acc;
            return (
                acc +
                (item?.lowQty || 0) * item?.tax * item?.sellingPrice +
                item?.lowQty * item?.sellingPrice -
                (item?.lowQty * item?.sellingPrice * item?.discount / 100 || 0)
            );
        }, 0).toFixed(2)
        : 0;
    const subTotalAmountHigh = items?.some((item: { highQty: any; }) => item?.highQty)
        ? items.reduce((acc: number, item: { itemName: any; highQty: number; tax: number; sellingPrice: number; discount: any; }) => {
            if (!item.itemName) return acc;
            return (
                acc +
                (item?.highQty || 0) * item?.tax * item?.sellingPrice +
                item?.highQty * item?.sellingPrice -
                (item?.highQty * item?.sellingPrice * item?.discount / 100 || 0)
            );
        }, 0).toFixed(2)
        : 0;
    const subTotalAmount = items?.some((item: { highQty: any; }) => !item?.highQty)
        ? items.reduce((acc: number, item: { itemName: any; quantity: number; tax: number; sellingPrice: number; discount: any; }) => {
            if (!item.itemName) return acc;
            return (
                acc +
                (item?.quantity || 0) * item?.tax * item?.sellingPrice +
                item?.quantity * item?.sellingPrice -
                (item?.quantity * item?.sellingPrice * item?.discount / 100 || 0)
            );
        }, 0).toFixed(2)
        : 0;
    const totalAmountLow = items?.some((item: { lowQty: any; }) => item?.lowQty)
        ? (
            parseFloat(subTotalAmountLow) +
            otherData?.shipping +
            otherData?.adjustment -
            (otherData?.overallDiscount || 0) * parseFloat(subTotalAmountLow)
        ).toFixed(2)
        : 0;

    const totalAmountHigh = items?.some((item: { highQty: any; }) => item?.highQty)
        ? (
            parseFloat(subTotalAmountHigh) +
            otherData?.shipping +
            otherData?.adjustment -
            (otherData?.overallDiscount || 0) * parseFloat(subTotalAmountHigh)
        ).toFixed(2)
        : 0;
    const totalAmount = items?.some((item: { highQty: any; }) => !item?.highQty)
        ? (
            parseFloat(subTotalAmount) +
            otherData?.shipping +
            otherData?.adjustment -
            (otherData?.overallDiscount || 0) * parseFloat(subTotalAmount)
        ).toFixed(2)
        : 0;

    //console.log(subTotalAmountLow,subTotalAmountHigh,subTotalAmount,totalAmountLow,totalAmountHigh,totalAmount)

    const totalPaidAmount = otherData?.recordTransaction?.reduce((acc: any, transaction: any) => {
        if (transaction?.moneyChange === 'In' || transaction?.isAdvancePayment) {
            return acc + transaction?.amountPaid;
        }
        return acc;
    }, 0);

    const totalAmountPay = otherData?.recordTransaction?.reduce((acc: any, transaction: any) => {
        if (transaction?.moneyChange === 'Out' && !transaction?.isAdvancePayment) {
            return acc + transaction?.amountPaid;
        }
        return acc;
    }, 0);

    // const totalPaidAmount = otherData?.recordTransaction?.reduce((a: any, b: any) => a + b.amountPaid, 0);


    const balanceDue = (otherData.totalCost) - totalPaidAmount + totalAmountPay


    const [count, setCount] = useState(0);
    const [initialInvoiceNo, setInitialInvoiceNo] = useState('');



    useEffect(() => {

        const newInvoiceNo = generateInvoiceNumber(count);
        setInitialInvoiceNo(newInvoiceNo);

    }, [count]);

    const handleEditClick = (recordTransaction: any) => {
        setEditRecordTransaction({
            ...recordTransaction,
            id: recordTransaction.id, // Pass ID for backend use
        });
        setEditPopupVisible(true);
    };

    const handleCancel = () => {
        setEditRecordTransaction({});
        setEditPopupVisible(false);
    };

    const handleSave = async () => {
        try {
            // Format the date field to ensure it's in ISO-8601 format
            const formattedTransaction = {
                ...editRecordTransaction,
                date: new Date(editRecordTransaction.date).toISOString(), // Ensure ISO-8601 format
            };

            console.log("Saving updated transaction: ", formattedTransaction);

            // Call the API with the formatted transaction
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/paymentTransaction/${formattedTransaction.id}?branchId=${appState.currentBranchId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formattedTransaction),
                }
            );

            // Handle API response
            if (!response.ok) {
                throw new Error("Failed to save transaction");
            }

            const result = await response.json();
            console.log("Transaction successfully updated:", result);

            // Success feedback
            alert("Transaction saved successfully");
            setEditPopupVisible(false); // Close the popup on success
        } catch (error) {
            console.error("Failed to save transaction:", error);
            alert("Failed to save transaction");
        }
    };




    console.log("shdvh", otherData.recordTransaction);

    return (
        <>


            <div className="flex gap-4 pt-[20px] pb-[20px]">
                <RecordTransactionPopup headerdata={otherData} setCount={setCount} initialInvoiceNo={initialInvoiceNo} balanceDue={balanceDue} />
                <div className="w-full rounded-md">
                    <div className="w-full bg-white rounded-md ">
                        <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                            <div className="text-gray-500 text-base font-bold ">Subtotal</div>
                            <div className="text-right text-gray-500 text-base font-bold ">
                                {subTotalAmountHigh ? `${subTotalAmountLow}-${subTotalAmountHigh}` : ` ${subTotalAmount}`}
                            </div>
                        </div>
                        <div className="w-full flex px-4 py-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                            <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
                            <div className="flex items-center">
                                <div className="text-right text-textGrey1 text-base  ">{(otherData.overallDiscount * 100 || 0).toFixed(2)}%</div>

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
                            <div className="text-right text-textGreen text-base font-bold ">
                                {totalAmountHigh ? `₹${totalAmountLow}-₹${totalAmountHigh}` : `₹${totalAmount}`}
                            </div>
                        </div>
                    </div>

                    <div className="w-full  mt-4 mr-4 flex flex-col border border-solid  border-borderGrey rounded-md">

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
                                    (<><div key={index} className='w-full px-2  justify-between items-center flex border-0 border-b border-solid border-borderGrey'>
                                        <div className="text-textGrey2  text-base font-bold  w-1/3 py-4">Advance Paid</div>
                                        <div className="text-textGrey1 text-base font-medium  w-1/3 py-4">{formatDateAndTime(transaction.date).formattedDate}</div>
                                        <div className='text-gray-500 text-md font-medium mr-4'>#{transaction?.receiptNo}</div>
                                        
                                        <div className="text-textGrey1 text-base font-medium  w-1/3 py-4 flex  items-center">
                                            <div className='flex pr-2'>
                                                <Image src={Cash} alt='Cash' className='w-4 h-4 ' />
                                            </div>
                                            {transaction.mode}
                                        </div>
                                        <div className="text-textGrey1 text-base font-medium  w-1/3 py-4 ">₹ {(transaction.amountPaid > 0 ? transaction.amountPaid : -1 * transaction.amountPaid)?.toFixed(2)}</div>
                                        <div className='relative right-16'>

                                            <Popover placement="bottom" showArrow offset={10}>
                                                <PopoverTrigger>
                                                    {/* Fix: Use a valid MUI variant */}
                                                    <Button variant="solid" className="flex items-center justify-center rounded-lg border-none cursor-pointer" style={{ transform: 'translate(1px, 4px)' }}  >
                                                        <span className="text-gray-500 text-lg">⋮</span>
                                                    </Button>

                                                </PopoverTrigger>
                                                <PopoverContent className="text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 mt-2.5">
                                                    <div className="flex flex-col">
                                                        <div className="text-gray-500 text-sm p-3 font-medium flex hover:cursor-pointer" onClick={() => handleEditClick(transaction)}>
                                                            Edit
                                                        </div>
                                                        <div className="text-gray-500 text-sm p-3 font-medium flex hover:cursor-pointer" onClick={() => handleCancel()}>
                                                            Cancel
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                    </>
                                    )
                                ))}
                                {otherData && otherData.recordTransaction && otherData.recordTransaction.map((transaction: any, index: any) => (
                                    !transaction.isAdvancePayment &&
                                    (
                                        <div key={index} className='w-full px-6 flex items-center justify-between border-0 border-b border-solid border-borderGrey'>
                                            <div className="text-textGrey2  text-base font-bold  w-1/3 py-4">Paid on</div>
                                            <div className="text-textGrey1 text-base font-medium  w-1/3 py-4">{formatDateAndTime(transaction.date).formattedDate}</div>
                                            <div className='text-gray-500 text-md font-medium mr-4'>#{transaction?.receiptNo}</div>

                                            <div className="text-textGrey1 text-base font-medium  w-1/3 py-4 flex  items-center">
                                                <div className='flex pr-2'>
                                                    <Image src={Cash} alt='Cash' className='w-4 h-4 ' />
                                                </div>
                                                {transaction.mode}
                                            </div>
                                            <div className="text-textGrey1 text-base font-medium  w-1/3 py-4 ">₹ {(transaction.amountPaid > 0 ? transaction.amountPaid : -1 * transaction.amountPaid)?.toFixed(2)}
                                                {transaction.moneyChange === 'Out' && <span className="px-2 py-1 rounded-md bg-[#FFEAEA] text-[#FF3030] text-sm font-medium ml-[5px]">Out</span>}
                                                {transaction.moneyChange === 'In' && <span className="px-2 py-1 rounded-md bg-[#E7F5EE] text-[#0F9D58] text-sm font-medium ml-[5px]">In</span>}
                                            </div>
                                            <div className='relative right-16'>

                                                <Popover placement="bottom" showArrow offset={10}>
                                                    <PopoverTrigger>
                                                        {/* Fix: Use a valid MUI variant */}
                                                        <Button variant="solid" className="flex items-center justify-center rounded-lg border-none cursor-pointer" style={{ transform: 'translate(1px, 4px)' }}  >
                                                            <span className="text-gray-500 text-lg">⋮</span>
                                                        </Button>

                                                    </PopoverTrigger>
                                                    <PopoverContent className="text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 mt-2.5">
                                                        <div className="flex flex-col">
                                                            <div className="text-gray-500 text-sm p-3 font-medium flex hover:cursor-pointer" onClick={() => handleEditClick(transaction)} >
                                                                Edit
                                                            </div>
                                                            <div className="text-gray-500 text-sm p-3 font-medium flex hover:cursor-pointer" onClick={() => handleCancel()}>
                                                                Cancel
                                                            </div>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>

                                    )
                                ))}
                                {/* Edit Popup */}
                                {isEditPopupVisible && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="absolute top-10 right-10 bg-white rounded-lg shadow-lg p-8 w-[600px] max-w-[90vw] flex flex-col">
                                            {/* Close Button */}
                                            <button
                                                onClick={handleCancel}
                                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 hover: cursor-pointer"
                                            >
                                                &#x2715;
                                            </button>

                                            {/* Popup Heading */}
                                            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Payment</h2>

                                            {/* Form */}
                                            <form className="space-y-4">
                                                {/* Amount Paid Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Amount Paid</label>
                                                    <input
                                                        type="number"
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                                                        value={editRecordTransaction?.amountPaid || ""}
                                                        onChange={(e) =>
                                                            setEditRecordTransaction({
                                                                ...editRecordTransaction,
                                                                amountPaid: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>

                                                {/* Date Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Date</label>
                                                    <input
                                                        type="date"
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 hover:cursor-pointer"
                                                        value={editRecordTransaction?.date || ""}
                                                        onChange={(e) =>
                                                            setEditRecordTransaction({
                                                                ...editRecordTransaction,
                                                                date: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>

                                                {/* Is Advance Payment Field */}
                                                <div className="flex items-center">
                                                    <label className="block text-gray-700 font-medium">Is Advance Payment</label>
                                                    <input
                                                        type="checkbox"
                                                        className="mt-0 ml-2"
                                                        checked={editRecordTransaction?.isAdvancePayment || false}
                                                        onChange={(e) =>
                                                            setEditRecordTransaction({
                                                                ...editRecordTransaction,
                                                                isAdvancePayment: e.target.checked,
                                                            })
                                                        }
                                                    />
                                                </div>

                                                {/* Mode of Payment Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Mode of Payment</label>
                                                    <select
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                                                        value={editRecordTransaction?.mode || ""}
                                                        onChange={(e) =>
                                                            setEditRecordTransaction({
                                                                ...editRecordTransaction,
                                                                mode: e.target.value,
                                                            })
                                                        }
                                                    >
                                                        <option value="Cash">Cash</option>
                                                        <option value="UPI">UPI</option>
                                                        <option value="Card">Card</option>
                                                    </select>
                                                </div>

                                                {/* Money Change Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Money Change</label>
                                                    <select
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                                                        value={editRecordTransaction?.moneyChange || ""}
                                                        onChange={(e) =>
                                                            setEditRecordTransaction({
                                                                ...editRecordTransaction,
                                                                moneyChange: e.target.value,
                                                            })
                                                        }
                                                    >
                                                        <option value="In">In</option>
                                                        <option value="Out">Out</option>
                                                    </select>
                                                </div>

                                                {/* Non-Editable Fields */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Sales ID</label>
                                                    <input
                                                        type="text"
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-gray-100"
                                                        value={editRecordTransaction?.salesId || ""}
                                                        readOnly
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Purchases ID</label>
                                                    <input
                                                        type="text"
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-gray-100"
                                                        value={editRecordTransaction?.purchasesId || ""}
                                                        readOnly
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Expenses ID</label>
                                                    <input
                                                        type="text"
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-gray-100"
                                                        value={editRecordTransaction?.expensesId || ""}
                                                        readOnly
                                                    />
                                                </div>

                                                {/* Save and Cancel Buttons */}
                                                <div className="flex justify-end space-x-4 mt-6">
                                                    <button
                                                        type="button"
                                                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none border-none"
                                                        onClick={handleCancel}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none border-none"
                                                        onClick={handleSave}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}


                            </div>

                        </div>
                        <div className="w-full  px-6 bg-white rounded-bl-md rounded-br-md justify-between items-center flex  border border-t-0 border-solid border-borderGrey">
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

export default ExistingsaleEstimateTotalAmout;