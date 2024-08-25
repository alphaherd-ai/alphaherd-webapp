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
    const downloadPdf = async () => {
    // const allData = existingSalesData;
        const data = existingSalesData;

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
    generatePdfForInvoice(data, appState, existingSalesData.items);
    };

//  console.log("This is existing",existingSalesData)
//  const appState = useAppSelector((state) => state.app);
//  const router=useRouter();
//  const handleRepeatOrder= async () => {
//     const items = existingSalesData.items.map((data:any )=> ({
//         productId: data.productId,
//         productBatchId: data.productBatchId,
//         quantity: data.quantity,
//         sellingPrice: data.sellingPrice,
//         taxAmount: data.gst,
//         name: data.itemName,
//         discount:data.discount
//     }));
//     const data = {
//         customer:  existingSalesData.customer,
//         notes: existingSalesData.notes,
//         subTotal: existingSalesData.subTotal,
//         invoiceNo: existingSalesData.invoiceNo,
//         dueDate: existingSalesData.dueDate,
//         shipping: existingSalesData.shipping,
//         adjustment: existingSalesData.adjustment,
//         totalCost: existingSalesData.totalCost,
//         overallDiscount: existingSalesData.gst,
//         totalQty: existingSalesData.totalQty,
//         status: "Pending",
//         type: FinanceCreationType.Sales_Invoice,
//         items: {
//             create: items
//         }

//     }
//     const notifData = {
//         source: Notif_Source.Sales_Invoice,
//         totalCost: data.totalCost,
//         dueDate: data.dueDate,
//         orgId: appState.currentOrgId,
//         orgBranch: appState.currentOrg.orgName
//     }
//     console.log(JSON.stringify(data))
//     console.log("this is notif data", notifData)
//     try {
//         const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/create/${FinanceCreationType.Sales_Invoice}?branchId=${appState.currentBranchId}`, data)
//         if (!response.data) {
//             throw new Error('Network response was not ok');
//         }
//         router.back();
//         const notif = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData)
//     } catch (error) {
//         console.error('Error:', error);
//     }
//  }

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
                                <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
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
    
          
        </>

    )
}

export default ExistingsalesBottomBar;
