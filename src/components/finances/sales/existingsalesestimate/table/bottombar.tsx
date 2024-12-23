"use client"

import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"
import drafticon from "../../../../../assets/icons/finance/draft.svg"
import checkicon from "../../../../../assets/icons/finance/check.svg"
import React, { useState, useEffect, useContext } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"
import Newsales from '@/app/finance/sales/newsales/page'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@mui/material"
import { generatePdfForInvoice,PrintPdf,DownloadPdf } from "@/utils/salesPdf"
import { useAppSelector } from "@/lib/hooks"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import Loading2 from "@/app/loading2"
const ExistingsaleEstimateBottomBar = ({ existingSalesData }: any) => {
    const url = useSearchParams();
    const id = url.get('id')
    const router = useRouter();
    const appState = useAppSelector((state) => state.app);
    const [saving, setSaving] = useState<any>(false);
    console.log("app state is :", appState);
    const downloadPdf = async () => {
                // const allData = existingSalesData;
                const data = existingSalesData;
                const doc = await generatePdfForInvoice(data, appState, existingSalesData.items);
                // printPdf(doc);
                DownloadPdf(doc, `Invoice_${data.id}.pdf`);
            };
    const printPdf = async () => {
        const data = existingSalesData;
        const doc = await generatePdfForInvoice(data, appState, existingSalesData.items);
        PrintPdf(doc);
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
            // console.log('Whatsapp Message sent successfully:', response);
        } catch (error) {
            console.error('Error while sending message', error);
        }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const shareInvoiceViaEmail = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/email`, {
                email: existingSalesData.email,
                invoiceData: existingSalesData,
            });
            if (response.status === 200) {
                alert("Invoice sent successfully");



            }
        } catch (error) {
            console.error("Error sending invoice:", error);
            alert("Failed to send invoice");
        }
    };

    const handleStatusUpdate = async () => {
        console.log("Clicked");
        try {
            setSaving(true);
            const putResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/status/${id}/?branchId=${appState.currentBranchId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: "Accepted"
                })

            })
            if (putResponse.ok) {
                // console.log('Data saved Sucessfully2')
                router.push(`newsales?id=${existingSalesData?.id}`)

            } else {
                console.error('Failed to save data')
            }
        } catch (error) {
            // console.log("Error while put request",error)
        } finally {
            setSaving(false);
        }

    }


    return (
        <>


            <div className="flex justify-between items-center w-full  box-border  bg-white  border-t border-l-0 border-r-0 border-b-0 border-solid border-borderGrey text-gray-400 py-4 rounded-b-lg">
                <div className="flex justify-between items-center gap-4 pl-4">
                    <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer" onClick={printPdf}> 
                        <Image src={printicon} alt="print"></Image>
                        <div>Print</div>
                    </div>
                    <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer" onClick={downloadPdf}>
                        <Image src={downloadicon} alt="download"></Image>
                        <div>Download</div>
                    </div>
                    <Button className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={shareicon} alt="share"></Image>
                        <div onClick={sendSMS}>Share via SMS</div>
                    </Button>
                    <Button className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={shareicon} alt="share"></Image>
                        <div onClick={shareInvoiceViaEmail}>Share via Email</div>
                    </Button>
                    <Button className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={shareicon} alt="share"></Image>
                        <div onClick={sendWhatsapp}>Share via WhatsApp</div>
                    </Button>
                </div>
                <div className="flex justify-between items-center gap-4 pr-4">

                    <div className="px-4 py-2.5 cursor-pointer text-white bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex " onClick={handleStatusUpdate}>
                        <Image src={checkicon} alt="check"></Image>
                        <div>{saving ? <Loading2 /> : 'Convert to Sales Invoice'}</div>
                    </div>


                </div>
            </div>


        </>

    )
}

export default ExistingsaleEstimateBottomBar;
