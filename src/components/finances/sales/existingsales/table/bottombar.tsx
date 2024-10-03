"use client"

// import SelectDropdown from 'react-native-select-dropdown'
import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"
import drafticon from "../../../../../assets/icons/finance/draft.svg"
import checkicon from "../../../../../assets/icons/finance/check.svg"
import ReturnIcon    from "../../../../../assets/icons/finance/replay.svg"
import React, { useState, useEffect } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"

import Link from "next/link"
import Image from "next/image"
import { FinanceCreationType, Notif_Source } from "@prisma/client"
import {useRouter} from "next/navigation"
import { useAppSelector } from "@/lib/hooks"
import axios from "axios"
import { generatePdfForInvoice } from "@/utils/salesPdf"


const ExistingsalesBottomBar = ({existingSalesData}:any) => {
    const appState = useAppSelector((state) => state.app);
    console.log("app state is in existingsales :" , appState);
    const [email, setEmail] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const downloadPdf = async () => {
    // const allData = existingSalesData;
        const data = existingSalesData;

    generatePdfForInvoice(data, appState, existingSalesData.items);
    };
    const shareInvoiceViaEmail = async () => {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/email`, {
            email: email,
            invoiceData: existingSalesData,
          });
          if (response.status === 200) {
            alert("Invoice sent successfully");
            
           
            setIsModalOpen(false); // Close the modal after successful send
            setEmail(""); // Clear email after successful send
          }
        } catch (error) {
          console.error("Error sending invoice:", error);
          alert("Failed to send invoice");
        }
      };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setEmail(""); // Optional: Clear the email input on cancel
      };

    return (
        <>
        {/* Share Email Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg mb-4">Share Invoice via Email</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter recipient's email"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={shareInvoiceViaEmail}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}


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
                                <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer "  onClick={openModal}>
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
