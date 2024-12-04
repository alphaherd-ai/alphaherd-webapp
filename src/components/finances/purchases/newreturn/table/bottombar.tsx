"use client"

import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"
import drafticon from "../../../../../assets/icons/finance/draft.svg"
import checkicon from "../../../../../assets/icons/finance/check.svg"
import React, { useState, useEffect, useContext } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"
import Loading2 from '@/app/loading2';
import Link from "next/link"
import Image from "next/image"
import { Button } from '@nextui-org/react'
import { DataContext } from "./DataContext"
import { useAppSelector } from "@/lib/hooks"
import { useRouter, useSearchParams } from "next/navigation"
import { FinanceCreationType } from "@prisma/client"
import axios from "axios"
const NewPurchaseReturnNewBottomBar = ({ invoiceData }: any) => {
    const { headerData, tableData, totalAmountData, transactionsData } = useContext(DataContext);
    const appState = useAppSelector((state) => state.app);
    const url = useSearchParams();
    const id = url.get('id');
    const router = useRouter();
    const [isSaving, setSaving] = useState(false);

    const totalPaidAmount = transactionsData?.filter(item => item.moneyChange === 'In' || item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);

    const totalAmountToPay = transactionsData?.filter(item => item.moneyChange === 'Out').map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);


    const balanceDue = totalAmountData.totalCost - totalPaidAmount + totalAmountToPay;


    const handleSubmit = async () => {
        tableData.pop();
        const allData = { headerData, tableData, totalAmountData, transactionsData };
        console.log(allData)
        let totalQty = 0;
        tableData.forEach(data => {
            totalQty += (data.quantity) || 0;
        });
        const items = tableData.map(data => ({
            productId: data.productId,
            quantity: data.quantity,
            sellingPrice: Number(data.sellingPrice),
            taxAmount: data.gst,
            name: data.itemName,
            discount: data.discount,
            productBatchId: data.id
        }));
        const data = {
            distributor: (id === null) ? allData.headerData.distributor.value : invoiceData.distributor,
            distributorId:(id===null) ? allData.headerData.distributor.distributorId : null,    
            notes: (id === null) ? allData.headerData.notes : invoiceData.notes,
            invoiceNo: (id === null) ? allData.headerData.invoiceNo : invoiceData.invoiceNo,
            dueDate: (id === null) ? allData.headerData.dueDate : invoiceData.dueDate,
            shipping: (id === null) ? allData.totalAmountData.shipping : invoiceData.shipping,
            adjustment: (id === null) ? allData.totalAmountData.adjustment : invoiceData.adjustment,
            totalCost: (id === null) ? allData.totalAmountData.totalCost : invoiceData.totalCost,
            totalQty: (id === null) ? totalQty : invoiceData.totalQty,
            overallDiscount: (id === null) ? allData.totalAmountData.overallDiscount : invoiceData.overallDiscount,
            recordTransaction: {
                create: allData.transactionsData
            },
            status:allData.totalAmountData.totalCost === balanceDue ? `Debited:₹${parseFloat(balanceDue).toFixed(2)}` :balanceDue >= 1 ? `You’re owed: ₹${parseFloat(balanceDue).toFixed(2)}` : balanceDue <= -1 ? `You owe: ₹${parseFloat((-1 * balanceDue).toFixed(2))}` : 'Closed',
            type: FinanceCreationType.Purchase_Return,
            items: {
                create: items
            }

        }
        // console.log("email is (inside) :",data.email);
        // console.log("header data in bottom bar is : ",headerData);
        // console.log(JSON.stringify(data))
        try {
            setSaving(true);
            const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/create/${FinanceCreationType.Purchase_Return}?branchId=${appState.currentBranchId}`, data)
            setTimeout(() => {
                router.back();
            }, 2000);
            const response = await responsePromise;
            if (!response.data) {
                throw new Error('Network response was not ok');
            }


        } catch (error) {
            console.error('Error:', error);
        }
        finally {
            setSaving(false);
        }
    };
    const isDisabled = !headerData.distributor || tableData.length === 1
    return (
        <>


            <div className="flex justify-end items-center w-full  box-border  bg-white  border-t border-l-0 border-r-0 border-b-0 border-solid border-borderGrey text-gray-400 py-4 rounded-b-lg">
                {/* <div className="flex justify-between items-center gap-4 pl-4">
                    <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={printicon} alt="print"></Image>
                        <div>Print</div>
                    </div>
                    <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={downloadicon} alt="download"></Image>
                        <div>Export</div>
                    </div>
                    <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={shareicon} alt="share"></Image>
                        <div>Share editable sheet</div>
                    </div>
                </div> */}
                <div className="flex justify-between items-center gap-4 pr-4">
                    <Button className="px-4 py-2.5 text-white text-base bg-zinc-900 rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer">
                        <Image src={drafticon} alt="draft"></Image>
                        <div>Save as Draft</div>
                    </Button>
                    <Button className={`px-4 py-2.5 text-white text-base rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer ${isDisabled ? 'bg-gray-400' : 'bg-zinc-900'
                        }`}
                        onClick={handleSubmit} disabled={isDisabled || isSaving}>
                        <Image src={checkicon} alt="check"></Image>
                        <div>{isSaving ? <Loading2></Loading2> : "Save"}</div>
                    </Button>
                </div>

            </div>


        </>
    )
}

export default NewPurchaseReturnNewBottomBar