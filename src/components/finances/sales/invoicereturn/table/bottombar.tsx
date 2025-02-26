"use client"
import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"
import drafticon from "../../../../../assets/icons/finance/draft.svg"
import checkicon from "../../../../../assets/icons/finance/check.svg"
import React, { useState, useContext } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"

import Image from "next/image"
import { DataContext } from './DataContext'
import { FinanceCreationType } from '@prisma/client'
import axios from "axios"
import { useAppSelector } from '@/lib/hooks';
import { useSearchParams } from "next/navigation"
import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import Loading2 from "@/app/loading2"


const InvoiceReturnBottomBar = ({ invoiceData }: any) => {
    //console.log(invoiceData);
    const { headerData, tableData, totalAmountData, transactionsData } = useContext(DataContext);
    const appState = useAppSelector((state) => state.app);
    const url = useSearchParams();
    const id = url.get('id');
    const router = useRouter();
    const [isSaving, setSaving] = useState(false);
    //console.log(headerData);



    const handleSubmit = async () => {
        const totalPaidAmount = transactionsData?.filter(item => item.moneyChange === 'In' ).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);

        const totalAmountToPay = transactionsData?.filter(item => item.moneyChange === 'Out' || item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);


        const balanceDue = totalAmountData.totalCost + totalPaidAmount - totalAmountToPay;
        setSaving(true);
        const allData = { headerData, tableData, totalAmountData, transactionsData };
        console.log("this is all data", allData)
        let totalQty = 0;
        tableData.forEach(data => {
            totalQty += (data.quantity) || 0;
        });
        const items = tableData.map(data => ({
            productId: data?.productId,
            serviceId: data?.serviceId,
            productBatchId: data.productId ? data.id : null,
            quantity: data.quantity,
            sellingPrice: data.unitPrice,
            taxAmount: data.tax,
            name: data.itemName,
            itemType: data.itemType,
            serviceProvider: data?.serviceProvider
        }));
        const data = {
            customer: (id === null) ? allData.headerData.customer.value : invoiceData.customer,
            clientId: (id == null) ? allData.headerData.customer.value.clientId : invoiceData.clientId,
            email: (id === null) ? allData.headerData.customer.value.email : "",
            notes: (id === null) ? allData.headerData.notes : invoiceData.notes,
            subTotal: allData.totalAmountData.subTotal,
            invoiceNo:  allData.headerData.invoiceNo,
            dueDate: (id === null) ? allData.headerData.dueDate : invoiceData.dueDate,
            shipping: allData.totalAmountData.shipping,
            adjustment: allData.totalAmountData.adjustment,
            totalCost: allData.totalAmountData.totalCost,
            overallDiscount: allData.totalAmountData.gst,
            totalQty: totalQty,
            recordTransaction: {
                create: allData.transactionsData
            },
            date:(id===null) ? allData.headerData.date : invoiceData.date,
            status: balanceDue <= -1 ? `You’re owed: ₹${parseFloat((-1*balanceDue).toFixed(2))}` : balanceDue >= 1 ? `You owe: ₹${parseFloat((balanceDue).toFixed(2))}` : 'Closed',
            type: FinanceCreationType.Sales_Return,
            items: {
                create: items
            }

        }
        console.log(items);
        //console.log(JSON.stringify(data))
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/create/${FinanceCreationType.Sales_Return}?branchId=${appState.currentBranchId}`, data)

            if (!response.data) {
                throw new Error('Network response was not ok');
            }
            // mutate(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/getAll?branchId=${appState.currentBranchId}`,(currData:any = [])=>[...currData,response.data?.sales],false)
            router.back();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSaving(false);
        }

        try {

            const putResponse: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/status/${id}/?branchId=${appState.currentBranchId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: `Returned ${totalQty} | ${invoiceData?.status}`
                })
            });
            if (putResponse.ok) {
                // console.log('Data saved Sucessfully2')
                //router.push(`newsales?id=${existingSalesData?.id}`)

            } else {
                console.error('Failed to save data')
            }
        } catch (error) {
            // console.log("Error while put request",error)
        }
    };

    return (
        <>


            <div className="flex justify-between items-center w-full  box-border  bg-white  border-t border-l-0 border-r-0 border-b-0 border-solid border-borderGrey text-gray-400 py-4 rounded-b-lg">
                <div className="flex justify-between items-center gap-4 pl-4">
                    <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={printicon} alt="print"></Image>
                        <div>Print</div>
                    </div>
                    <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={downloadicon} alt="download"></Image>
                        <div>Download</div>
                    </div>
                    <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={shareicon} alt="share"></Image>
                        <div>Share</div>
                    </div>
                </div>
                <div className="flex justify-between items-center gap-4 pr-4">
                    <Button className="px-4 py-2.5 text-white text-base bg-zinc-900 rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer">
                        <Image src={drafticon} alt="draft"></Image>
                        <div>Save as Draft</div>
                    </Button>
                    <Button   className={`px-4 py-2.5 text-white text-base ${tableData.length <= 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-zinc-900'} rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer`} onClick={handleSubmit} disabled={isSaving || tableData.length <= 0 }>
                        <Image src={checkicon} alt="check"></Image>
                        <div>{isSaving ? <Loading2></Loading2> : "Save"}</div>
                    </Button>
                </div>
            </div>


        </>

    )
};


export default InvoiceReturnBottomBar;
