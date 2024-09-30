"use client"


import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"
import drafticon from "../../../../../assets/icons/finance/draft.svg"
import checkicon from "../../../../../assets/icons/finance/check.svg"
import React, { useState, useEffect } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@mui/material"
import { generatePdfForInvoice } from "@/utils/salesPdf"
import { useAppSelector } from "@/lib/hooks"


const ExistingsalesReturnBottomBar = ({existingSalesData}:any) => {
    const appState = useAppSelector((state: { app: any }) => state.app);
    const downloadPdf = async () => {
    // const allData = existingSalesData;
        const data = existingSalesData;
    generatePdfForInvoice(data, appState, existingSalesData.items);
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
            // console.log('Email sent successfully:', response);
        } catch (error) {
            console.error('Error while saving data:', error);
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
                                    <div onClick={sendEmail}>Share via Email</div>
                                </Button>
                                <Button className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                                    <Image src={shareicon} alt="share"></Image>
                                    <div onClick={sendWhatsapp}>Share via WhatsApp</div>
                                </Button>
                            </div>
                          
                        </div>
    
          
        </>

    )
}

export default ExistingsalesReturnBottomBar;
