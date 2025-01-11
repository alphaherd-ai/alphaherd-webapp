"use client"

// import SelectDropdown from 'react-native-select-dropdown'
import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"

import checkicon from "../../../../../assets/icons/finance/check.svg"
import ReturnIcon    from "../../../../../assets/icons/finance/replay.svg"
import React, { useState, useEffect } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"
import PopupEmailInput from "./emailPopup";
import Link from "next/link"
import Image from "next/image"

import { useAppSelector } from "@/lib/hooks"
import axios from "axios"
import { generatePdfForInvoice,DownloadPdf,PrintPdf } from "@/utils/salesPdf"


const ExistingsalesBottomBar = ({existingSalesData}:any) => {
    const appState = useAppSelector((state) => state.app);
    console.log("app state is in existingsales bottom :" , appState);
   
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

    console.log("email is : ",email);
    const shareInvoiceViaEmail = async () => {
    
      
      if (!email || email.trim() === "") {
        setIsPopupOpen(true); // Open the popup if email is missing
        return;
      }
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

            alert("Invoice sent successfully");

            setIsPopupOpen(false); // Close the popup
          }
        }
      } catch (error) {
        console.error("Error saving email or sending invoice:", error);
        console.log("Failed to save email or send invoice");
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
                            <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer" onClick={printPdf}>
                                    <Image src={printicon} alt="print"></Image>
                                    <div>Print</div>
                                </div>
                                <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer" onClick={downloadPdf}>
                                    <Image src={downloadicon} alt="download"></Image>
                                    <div>Download</div>
                                </div>
                                <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer "  onClick={shareInvoiceViaEmail}>
                                    <Image src={shareicon} alt="share"></Image>
                                    <div>Share</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-4 pr-4">
                                <Link href={{pathname:'newsales',query:{id:existingSalesData?.id}}} style={{textDecoration:'none',color:'white'}}>
                                <div className="px-4 py-[0.78rem] bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                    <Image src={ReturnIcon} alt="check"></Image>
                                    <div>Repeat Order</div>
                                </div>
                                </Link>
                                <Link href={{pathname:'invoicereturn',query:{id:existingSalesData?.id}}} style={{textDecoration:'none',color:'white'}}>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                    <Image src={checkicon} alt="check"></Image>
                                    <div>Convert to Sales Return</div>
                                </div>
                                </Link>
                            </div>
                        </div>
                         {/* Add an input field for the email */}
           
          
        </>

    )
}

export default ExistingsalesBottomBar;