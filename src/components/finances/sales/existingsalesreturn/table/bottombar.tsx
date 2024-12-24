"use client"


import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"
import drafticon from "../../../../../assets/icons/finance/draft.svg"
import checkicon from "../../../../../assets/icons/finance/check.svg"
import React, { useState, useEffect } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"
import PopupEmailInput from "./emailPopup";
import Link from "next/link"
import Image from "next/image"
import { Button } from "@mui/material"
import { generatePdfForInvoice,DownloadPdf,PrintPdf } from "@/utils/salesPdf"
import { useAppSelector } from "@/lib/hooks"
import axios from "axios"

const ExistingsalesReturnBottomBar = ({existingSalesData}:any) => {
    const appState = useAppSelector((state: { app: any }) => state.app);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
         console.log("data in bottom bar is :", existingSalesData);
        const [email, setEmail] = useState(existingSalesData?.email || "");
            
          
        useEffect(() => {
              // Update email state when existingSalesData changes
              if (existingSalesData?.email) {
                setEmail(existingSalesData.email);
              }
        }, [existingSalesData]);
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log("email is : ",email);
    const shareInvoiceViaEmail = async () => {
    
      
      if (!email || email.trim() === "") {
        setIsPopupOpen(true); // Open the popup if email is missing
        return;
      }
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/email`, {
            email:existingSalesData.email,
            invoiceData: existingSalesData,
          });
          if (response.status === 200) {
            console.log("Invoice sent successfully");
            
           
           
          }
        } catch (error) {
          console.error("Error sending invoice:", error);
          console.log("Failed to send invoice");
        }
      };
      const handleSave = (email: string) => {
        console.log("Email saved:", email);
        saveEmailAndShare();
        setIsPopupOpen(false);
      };
  
      const saveEmailAndShare = async () => {
        console.log("Email value before validation:", email);
        if (!email || email.trim() === "") {
          console.log("Email is required to send the invoice.");
          return;
        }
    
        try {
          // Save the email in the database
          const saveEmailResponse = await axios.put(
            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/updateEmail/?branchId=${appState.currentBranchId}`,
            {
              id: existingSalesData.id,
              email: email,
            }
          );
    
          if (saveEmailResponse.status === 200) {
            setEmail(email);
            // After saving the email, share the invoice
            const shareResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/email`,
              {
                email: email,
                invoiceData: existingSalesData,
              }
            );
            if (shareResponse.status === 200) {
              console.log("Invoice sent successfully");
              setIsPopupOpen(false); // Close the popup
            }
          }
        } catch (error) {
          console.error("Error saving email or sending invoice:", error);
          console.log("Failed to save email or send invoice");
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

   

  

 



    return (
        <>
  <PopupEmailInput
        isOpen={isPopupOpen}
        email={email}
        setEmail={setEmail}
        onSave={handleSave}
        onClose={() => setIsPopupOpen(false)}
      />

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
                                    <div onClick={shareInvoiceViaEmail}>Share via Email</div>
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
