"use client"


import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"

import React, { useState, useEffect } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"
import PopupEmailInput from "./emailPopup";

import Image from "next/image"
import { Button } from "@mui/material"
import { generatePdfForInvoice, DownloadPdf, PrintPdf } from "@/utils/salesPdf"
import { useAppSelector } from "@/lib/hooks"
import axios from "axios"

const ExistingsalesReturnBottomBar = ({ existingSalesData }: any) => {
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
  console.log("email is : ", email);
  const shareInvoiceViaEmail = async () => {
    if (!email || email.trim() === "") {
      setIsPopupOpen(true); // Open the popup if email is missing
      return;
    }

    try {
      // Show loading state (if you have one)


      const data = existingSalesData;
      const doc = await generatePdfForInvoice(data, appState, existingSalesData.items);

      if (!doc) {
        throw new Error("Failed to generate PDF");
      }

      // Convert PDF to base64 string - this part depends on what your generatePdfForInvoice returns
      let pdfBase64;

      // If using PDFKit
      if (typeof doc.output === 'function') {
        pdfBase64 = doc.output('datauristring').split(',')[1]; // Extract base64 content
      }
      // If using jsPDF
      else if (typeof doc.output === 'function') {
        pdfBase64 = doc.output('datauristring').split(',')[1]; // Extract base64 content
      }
      // If it's a Buffer
      else if (Buffer.isBuffer(doc)) {
        pdfBase64 = doc.toString('base64');
      }
      // If it's already a base64 string
      else if (typeof doc === 'string') {
        // Check if it's already base64 encoded
        if (typeof doc === 'string' && !(doc as string).match(/^[A-Za-z0-9+/=]+$/)) {
          pdfBase64 = Buffer.from(doc).toString('base64');
        } else {
          pdfBase64 = doc;
        }
      } else {
        // Last resort for other formats
        pdfBase64 = Buffer.from(JSON.stringify(doc)).toString('base64');
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/email`,
        {
          email: existingSalesData.email,
          doc: pdfBase64,
        }
      );

      if (response.status === 200) {
        console.log("Invoice sent successfully");
        // Show success message to user

      }
    } catch (error) {
      console.error("Error sending invoice:", error);
      console.log("Failed to send invoice");
      // Show error message to user

    } finally {
      // Hide loading state (if you have one)

    }
  };

  const handleSave = (email: string) => {
    console.log("Email saved:", email);
    // Update the email state if needed
    setEmail(email);
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

      const data = existingSalesData;
      const doc = await generatePdfForInvoice(data, appState, existingSalesData.items);

      if (!doc) {
        throw new Error("Failed to generate PDF");
      }

      // Convert PDF to base64 string - this part depends on what your generatePdfForInvoice returns
      let pdfBase64;

      // If using PDFKit
      if (typeof doc.output === 'function') {
        pdfBase64 = doc.output('datauristring').split(',')[1]; // Extract base64 content
      }
      // If using jsPDF
      else if (typeof doc.output === 'function') {
        pdfBase64 = doc.output('datauristring').split(',')[1]; // Extract base64 content
      }
      // If it's a Buffer
      else if (Buffer.isBuffer(doc)) {
        pdfBase64 = doc.toString('base64');
      }
      // If it's already a base64 string
      else if (typeof doc === 'string') {
        // Check if it's already base64 encoded
        if (typeof doc === 'string' && !(doc as string).match(/^[A-Za-z0-9+/=]+$/)) {
          pdfBase64 = Buffer.from(doc).toString('base64');
        } else {
          pdfBase64 = doc;
        }
      } else {
        // Last resort for other formats
        pdfBase64 = Buffer.from(JSON.stringify(doc)).toString('base64');
      }


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
            doc: pdfBase64,
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
      {!(existingSalesData?.status === 'Cancelled') &&
        <div className="w-full">
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
              <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer " onClick={shareInvoiceViaEmail}>
                <Image src={shareicon} alt="share"></Image>
                <div>Share</div>
              </div>
            </div>

          </div>
        </div>
      }


    </>

  )
}

export default ExistingsalesReturnBottomBar;
