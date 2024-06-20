"use client"
import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"
import drafticon from "../../../../../assets/icons/finance/draft.svg"
import checkicon from "../../../../../assets/icons/finance/check.svg"
import React, { useState, useEffect, useContext } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"
import Link from "next/link"
import Image from "next/image"
import { DataContext } from './DataContext'
import { FinanceCreationType, Notif_Source } from '@prisma/client'
import axios from "axios"
import { useAppSelector } from '@/lib/hooks';
import { redirect, useSearchParams } from "next/navigation"
import { getTime } from "date-fns"
import { Button } from "@nextui-org/react"
import formatDateAndTime from "@/utils/formateDateTime"
import { generatePdfForInvoice } from "@/utils/salesPdf"
import { useRouter } from "next/navigation"

const NewsalesBottomBar = () => {
    const { headerData, tableData, totalAmountData } = useContext(DataContext);
    const appState = useAppSelector((state) => state.app);
    const url = useSearchParams();
    const id = url.get('id');
    const router = useRouter();
    const handleSubmit = async () => {
        const allData = { headerData, tableData, totalAmountData };
        console.log("this is all data", allData)
        let totalQty = 0;
        tableData.forEach(data => {
            totalQty += (data.quantity) || 0;
        });
        const items = tableData.map(data => ({
            productId: data.productId,
            productBatchId: data.id,
            quantity: data.quantity,
            sellingPrice: data.sellingPrice,
            taxAmount: data.gst,
            name: data.itemName,
            discount:data.discount
        }));
        const data = {
            customer: (id === null) ? allData.headerData.customer.value : allData.headerData.customer,
            notes: allData.headerData.notes,
            subTotal: allData.totalAmountData.subTotal,
            invoiceNo: allData.headerData.invoiceNo,
            dueDate: allData.headerData.dueDate,
            shipping: allData.totalAmountData.shipping,
            adjustment: allData.totalAmountData.adjustment,
            totalCost: allData.totalAmountData.totalCost,
            overallDiscount: allData.totalAmountData.gst.value,
            totalQty: totalQty,
            status: "Pending",
            type: FinanceCreationType.Sales_Invoice,
            items: {
                create: items
            }

        }
        console.log(appState.currentBranch)
        const notifData = {
            source: Notif_Source.Sales_Invoice,
            totalCost: data.totalCost,
            dueDate: data.dueDate,
            orgId: appState.currentBranch.org.id,
            orgBranch: appState.currentBranch.org.orgName
        }
        console.log(JSON.stringify(data))
        console.log("this is notif data", notifData)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/create/${FinanceCreationType.Sales_Invoice}?branchId=${appState.currentBranchId}`, data)
            if (!response.data) {
                throw new Error('Network response was not ok');
            }
            router.back();
            const notif = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const downloadPdf = async () => {
        const allData = { headerData, tableData, totalAmountData };
        console.log("this is all data", allData)
        let totalQty = 0;
        tableData.forEach(data => {
            totalQty += (data.quantity) || 0;
        });
        const items = tableData.map(data => ({
            productId: data.productId,
            productBatchId: data.id,
            quantity: data.quantity,
            sellingPrice: data.sellingPrice,
            taxAmount: data.gst,
            name: data.itemName
        }));
        const data = {
            customer: (id === null) ? allData.headerData.customer.value : allData.headerData.customer,
            notes: allData.headerData.notes,
            subTotal: allData.totalAmountData.subTotal,
            invoiceNo: 234234,
            dueDate: allData.headerData.date,
            shipping: allData.totalAmountData.shipping,
            adjustment: allData.totalAmountData.adjustment,
            totalCost: allData.totalAmountData.totalCost,
            overallDiscount: allData.totalAmountData.gst.value,
            totalQty: totalQty,
            status: "Pending",
            type: FinanceCreationType.Sales_Invoice,
            items: {
                create: items
            }
        }

        generatePdfForInvoice(data, appState, items);

    };

    const sendSMS = async () => {
        try {   
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/sms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: "+917637834918",

                }),
            });
            console.log('SMS sent successfully:', response);
        } catch (error) {
            console.error('Error while sending message', error);
        } 
    };

    const sendWhatsapp = async () => {
        try {   
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/whatsapp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: "+917637834918",

                }),
            });
            console.log('Whatsapp Message sent successfully:', response);
        } catch (error) {
            console.error('Error while sending message', error);
        } 
    };

    const sendEmail = ()=>{
        try {   
            const response = fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/email`, {
                method: 'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body: JSON.stringify({
                    email:'hembramshristi07@gmail.com'
                })
            });
            console.log('Email sent successfully:', response);
        } catch (error) {
            console.error('Error while saving data:', error);
        } 
    };
    return (
        <>


            <div className="flex justify-between items-center w-full  box-border  bg-white  border-t border-l-0 border-r-0 border-b-0 border-solid border-borderGrey text-gray-400 py-4 rounded-b-lg">
                <div className="flex justify-between items-center gap-4 pl-4">
                    <Button className="p-2 bg-white rounded-md border border-solid  border-borderGrey  justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={printicon} alt="print"></Image>
                        <div className="text-textGrey1 text-sm hover:text-textGrey2 transition-all">Print</div>
                    </Button>
                    <Button className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer" onClick={downloadPdf}>
                        
                            <Image src={downloadicon} alt="download" />
                            <div className="text-textGrey1 text-sm hover:text-textGrey2 transition-all">Download</div>
                        
                    </Button>
                    <Button className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={shareicon} alt="share"></Image>
                        <div onClick={sendSMS} className="text-textGrey1 text-sm hover:text-textGrey2 transition-all">Share via SMS</div>
                    </Button>
                    <Button className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={shareicon} alt="share"></Image>
                        <div onClick={sendWhatsapp} className="text-textGrey1 text-sm hover:text-textGrey2 transition-all">Share via Whatsapp</div>
                    </Button>
                    <Button className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={shareicon} alt="share"></Image>
                        <div onClick={sendEmail} className="text-textGrey1 text-sm hover:text-textGrey2 transition-all">Share via Email</div>
                    </Button>
                </div>
                <div className="flex justify-between items-center gap-4 pr-4">
                    <Button className="px-4 py-2.5 text-white text-base bg-zinc-900 rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer">
                        <Image src={drafticon} alt="draft"></Image>
                        <div>Save as Draft</div>
                    </Button>
                    <Button className="px-4 py-2.5 text-white text-base bg-zinc-900 rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer" onClick={handleSubmit}>
                        <Image src={checkicon} alt="check"></Image>
                        <div>Save</div>
                    </Button>
                </div>
            </div>


        </>

    )
};


export default NewsalesBottomBar;
