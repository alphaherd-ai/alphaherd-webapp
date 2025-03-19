'use client'
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import lefticon from "../../../assets/icons/inventory/left_icon.svg"
import Image from 'next/image';

import check from '../../../assets/icons/finance/check.svg'

import { useAppSelector } from '@/lib/hooks';

import Loading2 from '@/app/loading2';

const ClearInvoices = ({ invoiceList, setOpen, formData }: any) => {

    console.log(formData);
    const [isSaving,setSaving]=useState(false);
    const appState = useAppSelector((state) => state.app)
    const router = useRouter();
    const [checkedInvoiceList, setCheckedInvoiceList] = useState<any[]>([]);
    const [totalSum, setTotalSum] = useState(0);
    console.log(checkedInvoiceList);
    


    useEffect(() => {
        if (invoiceList?.length > 0) {
            let selectedInvoices:any[]=[];
            let cummulative:number=0;
            let calculatedTotalSum: number = 0;
            invoiceList.forEach((invoice: any) => {
               
                if (invoice.status.includes("You owe")) {
                    const match = invoice.status.match(/₹\s*([\d.]+)/);
                    if (match && match[1]) {
                        invoice.toBePaid = parseFloat(match[1]); // Extracted amount
                        calculatedTotalSum += invoice.toBePaid;
                
                        if (cummulative  <= Number(formData?.amountPaid)) {
                            cummulative += invoice.toBePaid;
                            console.log(cummulative, Number(formData?.amountPaid));
                            selectedInvoices.push(invoice);
                        }
                    } else {
                        invoice.toBePaid = 0; // Default to 0 if no match
                    }
                } else {
                    invoice.toBePaid = 0;
                }
                //console.log(selectedInvoices,cummulative,calculatedTotalSum);
                //setToPay(toPay);

            });
            setCheckedInvoiceList(selectedInvoices);
            setTotalSum(calculatedTotalSum);
        }
    }, [invoiceList])

   
    


    const handleCheckboxChange = (invoiceId: number, invoice: any) => {
        setCheckedInvoiceList((prevState) => {
            if (prevState.some((item) => item.id === invoiceId)) {

                return prevState.filter((item) => item.id !== invoiceId);
            } else {

                return [...prevState, invoice];
            }
        });
    };

    //console.log(checkedInvoiceList, formData);

    const handleRedirect = () => {
        setOpen((prev: any) => !prev);
        //
    }

    const handleTransaction = async () => {
    let totalAmountToBePaid = Number(formData?.amountPaid);
        setSaving(true);
    // Process each invoice one by one
    for (const invoice of checkedInvoiceList) {
        if (totalAmountToBePaid >= invoice?.toBePaid && totalAmountToBePaid > 0) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/create?branchId=${appState.currentBranchId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        partyName: formData?.partyName,
                        invoiceLink: invoice?.invoiceNo,
                        receiptNo: formData?.receiptNo[0],
                        date: formData?.date || new Date(),
                        amountPaid: Number(invoice?.toBePaid),
                        mode: formData?.mode,
                        moneyChange: 'Out',
                    }),
                });

                if (response.ok) {
                    totalAmountToBePaid -= invoice?.toBePaid;
                    window.dispatchEvent(new FocusEvent('focus'));
                } else {
                    console.error('Failed to save data');
                    setSaving(false);
                    return;
                }
            } catch (error) {
                console.error('Error while saving data:', error);
                setSaving(false);
                return;
            }

            const newTransaction = {
                amountPaid: Number(invoice?.toBePaid),
                date: formData?.date || new Date(),
                mode: formData?.mode,
                moneyChange: 'Out',
                receiptNo: formData?.receiptNo[0],
            };

            try {
                const putResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/${invoice?.id}/?branchId=${appState.currentBranchId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        recordTransaction: [newTransaction],
                        status: 'Closed',
                    }),
                });

                if (!putResponse.ok) {
                    console.error('Failed to save data');
                    setSaving(false);
                }
            } catch (error) {
                console.error('Error while saving data:', error);
                setSaving(false);
                return;
            }
        } else if (totalAmountToBePaid > 0 && totalAmountToBePaid < invoice?.toBePaid) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/create?branchId=${appState.currentBranchId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        partyName: formData?.partyName,
                        invoiceLink: invoice?.invoiceNo,
                        receiptNo: formData?.receiptNo[0],
                        date: formData?.date || new Date(),
                        amountPaid: Number(totalAmountToBePaid),
                        mode: formData?.mode,
                        moneyChange: 'Out',
                    }),
                });

                if (response.ok) {
                    window.dispatchEvent(new FocusEvent('focus'));
                } else {
                    console.error('Failed to save data');
                    setSaving(false);
                    return;
                }
            } catch (error) {
                console.error('Error while saving data:', error);
                setSaving(false);
                return;
            }

            const newTransaction = {
                amountPaid: Number(totalAmountToBePaid),
                date: formData?.date || new Date(),
                mode: formData?.mode,
                moneyChange:'Out',
                receiptNo: formData?.receiptNo[0],
            };

            try {
                const putResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/${invoice?.id}/?branchId=${appState.currentBranchId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        recordTransaction: [newTransaction],
                        status: (invoice?.toBePaid - totalAmountToBePaid) < 1  ? 'Closed' : `You owe ₹${(invoice?.toBePaid - totalAmountToBePaid).toFixed(2)}`,
                    }),
                });

                if (putResponse.ok) {
                    totalAmountToBePaid = 0;
                } else {
                    console.error('Failed to save data');
                    setSaving(false);
                    return;
                }
            } catch (error) {
                console.error('Error while saving data:', error);
                setSaving(false);
                return;
            }
        }
    }
    window.location.href = window.location.href;
    setSaving(false);
};

    


    return (
        <div className='w-full h-[100vh] rounded-[20px] pr-[16px] pl-[16px] z-1'>
            <div className="flex gap-8">
                <div className="w-11 h-11  rounded-[5px] border border-borderGrey flex justify-center items-center ">
                    <div className='no-underline h-full  ml-4' onClick={() => handleRedirect()}>
                        <div className='flex items-center border border-solid border-borderGrey bg-white rounded-lg p-3  '>
                            <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back"></Image>
                        </div>
                    </div>
                </div>
                <div className="text-gray-500 text-[28px] font-bold p-2">
                    Record Payment : Clear Multiple Invoices
                </div>
            </div>
            <div className='mt-8 w-full overflow-y-scroll flex flex-col h-[90vh]  rounded-[20px] bg-white border mx-0  border-solid border-borderGrey'>
                <div className='flex'>
                    <div className='bg-[#E7F5EE] text-[#0F9D58] px-2 py-2 text-xl rounded-md ml-4 mt-4 '>₹{Number(formData?.amountPaid).toFixed(2) || 0} Paying</div>
                    <div className='bg-[#FFF0E9] text-[#FC6E20] px-2 py-2 text-xl rounded-md ml-4 mt-4'>₹{Number(totalSum-formData?.amountPaid).toFixed(2)} to pay</div>
                </div>
                <div className='mt-4   box-border flex  w-full  items-center  bg-gray-100  h-12 py-4 border-b border-solid border-t border-borderGrey text-gray-500'>
                    <div className='w-[40px]'></div>
                    <div className='flex text-gray-500 text-base font-medium ml-4  w-2/12'>Date</div>
                    <div className='flex text-gray-500 text-base font-medium px-2  w-2/12'>Type</div>
                    <div className='flex text-gray-500 text-base font-medium px-2  w-2/12'>Invoice No. </div>
                    <div className='flex text-gray-500 text-base font-medium px-2  w-1/12'>Total Cost</div>
                    <div className='flex text-gray-500 text-base font-medium px-2  w-1/12'>Total Qty.</div>
                    <div className='flex text-gray-500 text-base font-medium px-2  w-2/12'>Due Date</div>
                    <div className='flex text-gray-500 text-base font-medium px-2  w-2/12'>Status</div>
                </div>
                {invoiceList?.length > 0 && invoiceList.sort((a:any,b:any)=>new Date(b.date).getSeconds()-new Date(a.date).getSeconds()).filter((invoice: any) => invoice.status.includes('You owe')).map((invoice: any) => (
                    <div key={invoice?.id} className='box-border flex justify-between  w-full  items-center border-0 border-b border-solid border-borderGrey   h-12 py-8  text-gray-500'>
                        <input
                            className='w-[40px]'
                            type='checkbox'
                            checked={checkedInvoiceList.some((checkedInvoice) => checkedInvoice.id === invoice.id)}
                            onChange={() => handleCheckboxChange(invoice.id, invoice)}
                        />
                        <div className='flex text-[#A2A3A3] text-base font-medium ml-4  w-2/12'>{new Date(invoice?.date).toLocaleDateString('en-GB')}</div>
                        <div className='flex text-[#A2A3A3] text-base font-medium px-2  w-2/12'>{invoice?.type}</div>
                        <div className='flex text-[#A2A3A3] text-base font-medium px-2  w-2/12'>{invoice?.invoiceNo} </div>
                        <div className='flex text-[#A2A3A3] text-base font-medium px-2  w-1/12'>₹{invoice?.totalCost}</div>
                        <div className='flex text-[#A2A3A3] text-base font-medium px-2  w-1/12'>{invoice?.totalQty}</div>
                        <div className='flex text-[#A2A3A3] text-base font-medium px-2  w-2/12'>{new Date(invoice?.dueDate).toLocaleDateString('en-GB')}</div>
                        <div className='flex  w-2/12 '><p className=" px-2 py-1 bg-[#FFF0E9] rounded-md text-sm font-medium text-[#FC6E20]">{invoice?.status?.replace("You owe", "to be paid")}</p></div>
                    </div>
                ))}
                <div className="flex justify-end items-end flex-1 p-4">
                    <button className={`px-4 py-2.5  text-white text-base rounded-md justify-start items-center gap-2 flex border-0 outline-none ${checkedInvoiceList?.length > 0 ?'cursor-pointer bg-zinc-900':'cursor-not-allowed bg-gray-400'}`}
                        onClick={handleTransaction} disabled={checkedInvoiceList?.length ===0 }>
                        <Image src={check} alt='check' />
                        <span className='text-white text-base font-medium pr-2'>{isSaving ? <Loading2/>:'Save'}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ClearInvoices;
