'use client'
import React, { useState, useEffect } from 'react';
import closeIcon from '../../../assets/icons/finance/closeIcon.svg';
import checkMark from '../../../assets/icons/finance/check.svg';
import Image from 'next/image';
import axios from 'axios';
import { useAppSelector } from '@/lib/hooks';
import { useSearchParams } from 'next/navigation';
import Loading2 from '@/app/loading2';
interface CancellationPopupProps {
    editTransaction: any;
    setShowConfirmation: any;
    transactionsData?: any;
    balanceDue?: any;
    type: string;
    setIsPaymentEdited?:any;
}

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())

const CancellationPopup: React.FC<CancellationPopupProps> = ({ editTransaction, setShowConfirmation, transactionsData, type, balanceDue,setIsPaymentEdited }) => {

    const appState = useAppSelector((state) => state.app);

    const url = useSearchParams();
    const id = url.get('id');

    const [loading, setLoading] = useState(false);




    const handleCancel = async () => {
        setLoading(true);
        if (type === 'invoice') {
            try {

                const response = await axios.put(
                    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/editTransaction/${editTransaction?.invoiceLink}?branchId=${appState.currentBranchId}`,
                    {
                        receiptNo: editTransaction?.receiptNo,
                        moneyChange: 'Cancelled',

                    },
                    {

                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log(response);
                if (response.status === 201) {

                    setShowConfirmation(false);
                    //window.dispatchEvent(new FocusEvent('focus'))
                } else {
                    console.error('Failed to save data')
                }

                if (transactionsData) {
                    transactionsData.forEach((transaction: any) => {
                        if (transaction?.receiptNo === editTransaction.receiptNo) {
                            transaction.moneyChange = 'Cancelled';
                        }
                    });
                }

            }
            catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        }
        else if (type === 'exsistingInvoice' || type === 'exsistingrecurring'|| type === 'exsistingnonrecurring') {
            try {
                const newTransaction = {

                    receiptNo: editTransaction?.receiptNo,
                    moneyChange: 'Cancelled',
                };


                const [transactionResponse, recordResponse] = await Promise.all([
                    axios.put(
                        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/editTransaction/${editTransaction?.invoiceLink}?branchId=${appState.currentBranchId}`,
                        {
                            receiptNo: editTransaction?.receiptNo,
                            moneyChange: 'Cancelled',

                        },
                        {

                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    ),
                    axios.put(
                        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/editRecordTransaction/${editTransaction?.invoiceLink}?branchId=${appState.currentBranchId}`,
                        {
                            recordTransaction: [newTransaction],

                        },
                        {

                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    )
                ])
                if (transactionResponse.status === 201 && recordResponse.status === 201) {
                    if (!(editTransaction?.invoiceLink.includes('SE'))) {
                        if (id) {
                            const balanceStatus = balanceDue && (editTransaction?.invoiceLink.includes('SI') || editTransaction?.invoiceLink.includes('PR')) ?  (balanceDue + (editTransaction?.moneyChange === 'In' ? Number(editTransaction?.amountPaid) : -Number(editTransaction?.amountPaid))) : (balanceDue + (editTransaction?.moneyChange === 'In' ? -Number(editTransaction?.amountPaid) :Number(editTransaction?.amountPaid)));
                            const baseURL=`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/${(editTransaction?.invoiceLink.includes('SI') || (editTransaction?.invoiceLink.includes('SR'))) ? 'sales' : 'purchases'}/status/${id}/?branchId=${appState.currentBranchId}`
                            const putResponse = await fetch(baseURL, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    status: (editTransaction?.invoiceLink.includes('SI') || editTransaction?.invoiceLink.includes('PR')) ? balanceStatus && (balanceStatus >= 1 ? `You’re owed: ₹${parseFloat((balanceStatus).toFixed(2))}` : balanceStatus <= -1 ? `You owe: ₹${parseFloat((-1 * balanceStatus).toFixed(2))}` : 'Closed'): balanceStatus <= -1 ? `You’re owed: ₹${parseFloat((-1 * balanceStatus).toString()).toFixed(2)}` : balanceStatus >= 1 ? `You owe: ₹${parseFloat((balanceStatus).toString()).toFixed(2)}` : 'Closed',
                                })

                            })
                            if (putResponse.ok) {
                                if(setIsPaymentEdited) setIsPaymentEdited((prev:any)=>prev+1);
                                setShowConfirmation(false);
                                window.dispatchEvent(new FocusEvent('focus'))
                            } else {
                                console.error('Failed to save data')
                            }
                        }

                    }
                    else if((editTransaction?.invoiceLink.includes('SE'))){
                        setShowConfirmation(false);
                        if(setIsPaymentEdited) setIsPaymentEdited((prev:any)=>prev+1);
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
                
            }
        }
        
    }

    return (
        <div className='w-full h-full flex justify-center items-center  fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50'>
            <div className='rounded-md w-1/2 h-fit px-4 py-10 bg-gray-100 shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] relative'>
                <Image
                    className='absolute right-4 top-4 cursor-pointer'
                    src={closeIcon}
                    alt=""
                    onClick={() => setShowConfirmation(false)}
                />
                <p className='text-xl  text-[#6B7E7D]'>
                    Are you sure you want to cancel this transaction?
                </p>

                <div className='flex justify-end gap-4 mt-8'>

                    <button
                        className='outline-none rounded-md cursor-pointer justify-between border-none w-fit flex items-center h-[2rem] px-4 py-1 bg-zinc-900 text-white'
                        onClick={() => { handleCancel() }}
                    >
                        {loading ? <Loading2 /> :
                            <>
                                <Image src={checkMark} alt="" />
                                Cancel Transaction
                            </>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CancellationPopup;
