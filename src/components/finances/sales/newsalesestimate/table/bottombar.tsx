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
import { FinanceCreationType } from '@prisma/client'
import axios from "axios"
import { useAppSelector } from '@/lib/hooks';
import { Button } from "@nextui-org/react"
import { useRouter, useSearchParams } from "next/navigation"
import { generatePdfForInvoice } from "@/utils/salesPdf"
import { AppState } from "@/lib/features/appSlice"
import { generatePdfForInvoiceAndUpload } from "@/utils/uploadPdf"
import Loading2 from "@/app/loading2"
import { mutate } from "swr"


const NewsaleEstimateBottomBar = () => {

    const { headerData, tableData, totalAmountData,transactionsData } = useContext(DataContext);
    const appState = useAppSelector((state) => state.app);
    const router = useRouter();
    const [isSaving,setSaving]=useState<any>(false);
    
    //console.log(totalAmountData);
    const handleSubmit = async () => {
        if (!headerData.customer || tableData.length === 0) {
            alert('Customer is required');
            return;
        }
        //Removing last item from table data as it is null
        tableData.pop();
        const allData = { headerData, tableData, totalAmountData,transactionsData };

        
        let totalQty = 0;
        tableData.forEach(data => {
            totalQty += (data.quantity) || 0;
        });
        const items = tableData.map(data => ({
            productId: data.productId,
            serviceId:data.serviceId,
            productBatchId:data.id, 
            quantity: data.quantity,  
            sellingPrice:data.sellingPrice,
            taxAmount:data.gst,
            name:data.itemName,
            lowQty:data.lowQty,
            highQty:data.highQty,
            discount:data.discountPer,
            itemType:data.itemType,
            serviceProvider:data.provider
    }));
        const data={
            customer: allData.headerData.customer.value.clientName ,
            clientId:allData.headerData.customer.value.clientId,
            email:allData.headerData.customer.value.email,
            notes: allData.headerData.notes,
            subTotal: allData.totalAmountData.subTotal,
            invoiceNo: allData.headerData.invoiceNo,
            dueDate: allData.headerData.dueDate,
            shipping: allData.totalAmountData.shipping,
            adjustment: allData.totalAmountData.adjustment,
            totalCost: allData.totalAmountData.totalCost,
            overallDiscount: allData.totalAmountData.gst,
            recordTransaction: {
                create: allData.transactionsData
            },
            totalQty: totalQty,
            status: "Pending",
            type: FinanceCreationType.Sales_Estimate,
            items: {
                create: items
            }

        }
        console.log(data)
        try {
            setSaving(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/create/${FinanceCreationType.Sales_Estimate}?branchId=${appState.currentBranchId}`, data)
            if (!response.data) {
                throw new Error('Network response was not ok');
            }
           // mutate(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/getAll?branchId=${appState.currentBranchId}`,(currData:any = [])=>[...currData,response.data?.sales],false)
            //router.back();

        } catch (error) {
            console.error('Error:', error);
        }
        finally{
            setSaving(false);
        }
    };
    const downloadPdf = async () => {
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
            customer: allData.headerData.customer.value.clientName,
            
            notes: allData.headerData.notes,
            subTotal: allData.totalAmountData.subTotal,
            invoiceNo: allData.headerData.invoiceNo,
            dueDate: allData.headerData.dueDate,
            shipping: allData.totalAmountData.shipping,
            adjustment: allData.totalAmountData.adjustment,
            totalCost: allData.totalAmountData.totalCost,
            contact: allData.headerData.customer.value.contact,
            overallDiscount: `${allData.totalAmountData.gst * 100}%`,
            totalQty: totalQty,
            status: "Pending",
            type: FinanceCreationType.Sales_Estimate,
            items: {
                create: items
            }

        }

        generatePdfForInvoice(data, appState, items);

    }

    const [communicationMode, setCommunicationMode] = useState<string | null>(null);

    useEffect(() => {
        const selectedMode = localStorage.getItem('selectedCommunicationMode');
        setCommunicationMode(selectedMode);
    }, []);

    const handleShareClick = () => {
        const savedModes = localStorage.getItem('selectedCommunicationModes');

        if (savedModes) {
            const communicationModes: string[] = JSON.parse(savedModes);

            if (communicationModes.includes('SMS')) {
                sendSMS();
            }
            if (communicationModes.includes('Email')) {
                sendEmail();
            }
            if (communicationModes.includes('WhatsApp')) {
                sendWhatsapp();
            }
        } else {
            alert('No communication modes selected. Please select a mode in the settings.');
        }
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
            // console.log('SMS sent successfully', response);
        } catch (error) {
            console.error('Error while sending message', error);
        }
    };

    // const sendWhatsapp = async (phoneNumber: any, headerData: { [key: string]: any }, tableData: { [key: string]: any }[], totalAmountData: { [key: string]: any }, type: string, appState: AppState) => {
    //     try {   
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/whatsapp`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 phone:  `+91${phoneNumber}`,
    //                 message: 'Hello from the team',
    //                 headerData: headerData,
    //                 tableData: tableData,
    //                 totalAmountData: totalAmountData,
    //                 type: type, // Send the FinanceCreationType to the backend
    //             }),
    //         });
    //         console.log('WhatsApp message sent successfully:', response);
    //     } catch (error) {
    //         console.error('Error while sending message', error);
    //     } 
    // };
    const sendWhatsapp = async () => {
        const allData = { headerData, tableData, totalAmountData };
        // console.log("this is all data", allData)
        const phoneNumber = allData.headerData.customer.value.contact;
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
            customer: allData.headerData.customer.value.clientName,
            notes: allData.headerData.notes,
            subTotal: allData.totalAmountData.subTotal,
            invoiceNo: allData.headerData.invoiceNo,
            dueDate: allData.headerData.dueDate,
            shipping: allData.totalAmountData.shipping,
            adjustment: allData.totalAmountData.adjustment,
            totalCost: allData.totalAmountData.totalCost,
            contact: allData.headerData.customer.value.contact,
            overallDiscount: `${allData.totalAmountData.gst * 100}%`,
            totalQty: totalQty,
            status: "Pending",
            type: FinanceCreationType.Sales_Estimate,
            items: {
                create: items
            }
        }
        try {
            // Generate PDF and get the URL
            const pdfUrl = await generatePdfForInvoiceAndUpload(data, appState, items);
            // console.log('PDF URL:', pdfUrl);
            const message = `Hello from the team. Here is your invoice: ${pdfUrl}`;
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/whatsapp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: `+91${phoneNumber}`,
                    message: "Hi",
                }),
            });

            if (response.ok) {
                // console.log('WhatsApp message sent successfully:', response);
            } else {
                console.error('Failed to send WhatsApp message:', response.statusText);
            }
        } catch (error) {
            console.error('Error while sending WhatsApp message:', error);
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

                    email:headerData.customer.value.email,

                })
            });
            // console.log('Email sent successfully:', response);
        } catch (error) {
            console.error('Error while saving data:', error);
        }
    };
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (headerData && headerData.customer && headerData.customer.value) {
            setPhone(headerData.customer.value.contact);
        }
    }, [headerData]);

    const isDisabled = !headerData.customer || tableData.length === 1 ;
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
                        <div className="text-textGrey1 text-sm hover:text-textGrey2 transition-all" onClick={sendSMS}>Share via SMS</div>
                    </Button>
                    <Button className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={shareicon} alt="share"></Image>
                        <div className="text-textGrey1 text-sm hover:text-textGrey2 transition-all" onClick={sendWhatsapp}>Share via Whatsapp</div>
                    </Button>
                    <Button className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={shareicon} alt="share"></Image>
                        <div className="text-textGrey1 text-sm hover:text-textGrey2 transition-all" onClick={sendEmail}>Share via Email</div>
                    </Button>
                    <Button className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={shareicon} alt="share"></Image>
                        <div className="text-textGrey1 text-sm hover:text-textGrey2 transition-all" onClick={handleShareClick}>Share</div>
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
                    <div>{isSaving ? <Loading2/> : "Save"}</div>
                </Button>
                </div>
            </div>


        </>

    )
};

export default NewsaleEstimateBottomBar;
