"use client"

import checkicon from "../../../../../assets/icons/finance/check.svg"
import React, { useState, useContext } from 'react';

import Image from "next/image"
import { DataContext } from './DataContext'
import { FinanceCreationType, Notif_Source } from '@prisma/client'
import axios from "axios"
import { useAppSelector } from '@/lib/hooks';
import { useSearchParams } from "next/navigation"

import { Button } from "@nextui-org/react"
import { mutate } from "swr";
import { generatePdfForInvoice } from "@/utils/salesPdf"

import { useRouter } from "next/navigation"

import Loading2 from "@/app/loading2"
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())


const NewsalesBottomBar = ({ estimateData }: any) => {
    const { headerData, tableData, totalAmountData, transactionsData } = useContext(DataContext);
    const appState = useAppSelector((state) => state.app);
    const url = useSearchParams();
    const id = url.get('id');
    const router = useRouter();
    const [isSaving, setSaving] = useState(false);
    console.log(totalAmountData);



    //console.log(balanceDue);
    const handleSubmit = async () => {

        const totalPaidAmount = transactionsData?.filter(item => item.moneyChange === 'In' || item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);
        const totalAmountToPay = transactionsData?.filter(item => item.moneyChange === 'Out').map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);
        const balanceDue = totalAmountData?.totalCost >= headerData?.customer?.value?.creditedToken ? (totalAmountData?.totalCost - totalPaidAmount + totalAmountToPay - headerData?.customer?.value?.creditedToken) : totalAmountData?.totalCost - totalPaidAmount + totalAmountToPay;
        const newCreditedToken = totalAmountData.totalCost >= headerData?.customer?.value?.creditedToken ? 0 : headerData?.customer?.value?.creditedToken;


        console.log(newCreditedToken);
        if (!headerData.customer && !estimateData.customer) {
            alert('Customer is required');
            return;
        }
        // Remove the last item from the item table as it will not create inventory timeline due to null constraints in prisma
        tableData.pop();
        //console.log(tableData);
        const allData = { headerData, tableData, totalAmountData, transactionsData };
        //console.log("this is all data", allData, balanceDue)
        //console.log(tableData);
        let totalQty = 0;
        tableData.forEach(data => {
            totalQty += (data.quantity) || 0;
        });
        const items = tableData.map(data => ({
            productId: data.productId,
            serviceId: data.serviceId,
            productBatchId: data.productId ? data.id : null,
            quantity: data.quantity,
            sellingPrice: data.sellingPrice,
            taxAmount: data.gst,
            name: data.itemName,
            itemType: data.itemType,
            discount: data.discountPer,
            serviceProvider: data.provider,
        }));
        const data = {
            customer: (id === null) ? allData.headerData.customer.value.clientName : estimateData.customer,
            clientId: (id === null) ? allData.headerData.customer.value.clientId : estimateData.clientId,
            email: (id === null) ? allData.headerData.customer.value.email : estimateData.email,
            newCreditedToken: (id === null) ? newCreditedToken : -1,
            notes: (id === null) ? allData.headerData.notes : estimateData.notes,
            subTotal: allData.totalAmountData.subTotal,
            invoiceNo: allData.headerData.invoiceNo,
            dueDate:  allData.headerData.dueDate || new Date(),
            date: allData.headerData.date,
            shipping: allData.totalAmountData.shipping,
            adjustment: allData.totalAmountData.adjustment,
            totalCost: allData.totalAmountData.totalCost,
            overallDiscount: allData.totalAmountData.gst,
            totalQty: totalQty,
            recordTransaction: {
                create: allData.transactionsData
            },
            status: (id === null) ? headerData.customer?.value?.creditedToken >= balanceDue ? balanceDue >= 1 ? `You’re owed: ₹${parseFloat(balanceDue).toFixed(2)}` : balanceDue <= -1 ? `You owe: ₹${parseFloat((-1 * balanceDue).toFixed(2))}` : 'Closed' : balanceDue - headerData?.customer?.value?.creditedToken >= 1 ? `You’re owed: ₹${parseFloat((balanceDue - headerData?.customer?.value?.creditedToken).toFixed(2))}` : balanceDue - headerData?.customer?.value?.creditedToken <= -1 ? `You owe: ₹${parseFloat((-1 * balanceDue - headerData?.customer?.value?.creditedToken).toFixed(2))}` : 'Closed' : balanceDue >= 1 ? `You’re owed: ₹${parseFloat((balanceDue).toString()).toFixed(2)}` : balanceDue <= -1 ? `You owe: ₹${parseFloat((-1 * balanceDue).toString()).toFixed(2)}` : 'Closed',
            type: FinanceCreationType.Sales_Invoice,
            items: {
                create: items
            }

        }
        console.log(data);    
        //console.log(data,balanceDue,headerData.customer?.value?.creditedToken);
        // console.log(appState.currentBranch)
        const notifData = {
            source: Notif_Source.Sales_Invoice,
            totalCost: data.totalCost,
            dueDate: data.dueDate,
            orgId: appState.currentOrgId,
            orgBranch: appState.currentOrg.orgName
        }
        //console.log(JSON.stringify(data))
        //console.log("this is notif data", notifData)
        try {
            setSaving(true);
            const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/create/${FinanceCreationType.Sales_Invoice}?branchId=${appState.currentBranchId}`, data)
            const notifPromise = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData)

           

            const [response, notif] = await Promise.all([responsePromise, notifPromise])

            if (!response.data || !notif.data) {
                throw new Error('Network response was not ok');
            }
            //console.log(response.status);

            setTimeout(async () => {
                //mutate(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/getAll?branchId=${appState.currentBranchId}`);
                router.back();
              }, 2000);
            

        } catch (error) {
            console.error('Error:', error);
        }
        finally {
            setSaving(false)
        }
    };

    const downloadPdf = async () => {
        const totalPaidAmount = transactionsData?.filter(item => item.moneyChange === 'In' || item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);
        const totalAmountToPay = transactionsData?.filter(item => item.moneyChange === 'Out').map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);
        const balanceDue = totalAmountData?.totalCost >= headerData?.customer?.value?.creditedToken ? (totalAmountData?.totalCost - totalPaidAmount + totalAmountToPay - headerData?.customer?.value?.creditedToken) : totalAmountData?.totalCost - totalPaidAmount + totalAmountToPay;
       

        const allData = { headerData, tableData, totalAmountData };
        // console.log("this is all data", allData)
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
            discount: data.discount
        }));
        const data = {
            customer: (id === null) ? allData.headerData.customer.value.clientName : estimateData.customer,
            notes: (id === null) ? allData.headerData.notes : estimateData.notes,
            subTotal: allData.totalAmountData.subTotal,
            invoiceNo: (id === null) ? allData.headerData.invoiceNo : estimateData.invoiceNo,
            dueDate: (id === null) ? allData.headerData.dueDate : estimateData.dueDate,
            shipping: allData.totalAmountData.shipping,
            adjustment: allData.totalAmountData.adjustment,
            totalCost: allData.totalAmountData.totalCost,
            contact: allData.headerData.customer.value.contact,
            overallDiscount: `${allData.totalAmountData.gst * 100}%`,
            totalQty: totalQty,
            status: (balanceDue >= 1 ? `You’re owed: ₹${parseFloat(balanceDue).toFixed(2)}` : balanceDue <= -1 ? `You owe: ₹${parseFloat((-1 * balanceDue).toFixed(2))}` : 'Closed'),
            type: FinanceCreationType.Sales_Invoice,
            items: {
                create: items
            }

        }

        //   const pdfUrl=await generatePdfForInvoiceAndUpload(data, appState, items);
        //   console.log("this is pdfUrl",pdfUrl)
        //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/sms`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         phone: "+919336402936",
        //         url:pdfUrl

        //     }),
        // });
        // console.log('SMS sent successfully:', response);
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
            // console.log('SMS sent successfully:', response);
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
            
        } catch (error) {
            console.error('Error while sending message', error);
        }
    };

    const sendEmail = () => {
        try {
            const response = fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/email`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    email: headerData.customer.value.email,

                })
            });
            // console.log('Email sent successfully:', response);
        } catch (error) {
            console.error('Error while saving data:', error);
        }
    };
    const isDisabled = headerData?.customer ? (!headerData?.customer) : (!estimateData?.customer) || id === null ? tableData.length === 1 : tableData.length === 0

    return (
        <>


            <div className="flex justify-end items-center w-full  box-border  bg-white  border-t border-l-0 border-r-0 border-b-0 border-solid border-borderGrey text-gray-400 py-4 rounded-b-lg">
                {/* <div className="flex justify-between items-center gap-4 pl-4">
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
                </div> */}
                <div className="flex justify-between items-center gap-4 pr-4">
                    {/* <Button className="px-4 py-2.5 text-white text-base bg-zinc-900 rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer">
                        <Image src={drafticon} alt="draft"></Image>
                        <div>Save as Draft</div>
                    </Button> */}
                    <Button className={`px-4 py-2.5 text-white text-base rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer ${isDisabled ? 'bg-gray-400' : 'bg-zinc-900'
                        }`}
                        onClick={handleSubmit} disabled={isDisabled || isSaving}>
                        <Image src={checkicon} alt="check"></Image>
                        <div>{isSaving ? <Loading2 /> : "Save"}</div>
                    </Button>
                </div>
            </div>
        </>
    )
};


export default NewsalesBottomBar;
