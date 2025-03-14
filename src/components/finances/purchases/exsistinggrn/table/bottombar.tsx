"use client"

import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"
import drafticon from "../../../../../assets/icons/finance/draft.svg"

import React, { useState } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"
import axios from "axios"
import { useAppSelector } from "@/lib/hooks"
import Link from "next/link"
import Image from "next/image"
import { Button } from '@nextui-org/react'

const ExsistingGrnBottomBar = ({ existingPurchaseData }: any) => {

  const appState = useAppSelector((state) => state.app);

  const [email, setEmail] = useState("");

  const data = existingPurchaseData;
  const shareInvoiceViaEmail = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/email`, {
        email: existingPurchaseData.email,
        invoiceData: existingPurchaseData,
      });
      if (response.status === 200) {
        alert("Invoice sent successfully");


      }
    } catch (error) {
      console.error("Error sending invoice:", error);
      alert("Failed to send invoice");
    }
  };
  return (
    <>

      {!(existingPurchaseData?.status === 'Cancelled') &&
        <div className="flex justify-between items-center w-full  box-border  bg-white  border-t border-l-0 border-r-0 border-b-0 border-solid border-borderGrey text-gray-400 py-4 rounded-b-lg">
          <div className="flex justify-between items-center gap-4 pl-4">
            <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
              <Image src={printicon} alt="print"></Image>
              <div>Print</div>
            </div>
            <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
              <Image src={downloadicon} alt="download"></Image>
              <div>Export</div>
            </div>
            <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer" onClick={shareInvoiceViaEmail}>
              <Image src={shareicon} alt="share"></Image>
              <div>Share</div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4 pr-4">

            <Link href={{ pathname: 'return', query: { id: existingPurchaseData?.id } }} style={{ textDecoration: 'none', color: 'white' }}>
              <Button className="px-4 py-2.5 text-white text-base bg-zinc-900 rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer">
                <Image src={drafticon} alt="draft"></Image>
                <div>Convert to Purchase Return</div>
              </Button>
            </Link>

          </div>

        </div>
      }


    </>
  )
}

export default ExsistingGrnBottomBar