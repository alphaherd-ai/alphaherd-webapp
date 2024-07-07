"use client"

import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"
import drafticon from "../../../../../assets/icons/finance/draft.svg"
import checkicon from "../../../../../assets/icons/finance/check.svg"
import React, { useState, useEffect, useContext } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"

import Link from "next/link"
import Image from "next/image"
import { Button } from '@nextui-org/react'
import { DataContext } from "./DataContext"
import { useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { FinanceCreationType } from "@prisma/client"
import axios from "axios"

const NewPurchasesBottomBar = () => {
    const { headerData, tableData, totalAmountData } = useContext(DataContext);
    const appState = useAppSelector((state) => state.app);
    const router=useRouter();
    const handleSubmit = async () => {
        const allData = {headerData, tableData, totalAmountData};
        console.log(allData)
        let totalQty=0;
        tableData.forEach(data => {
            totalQty+=(data.quantity)||0;
        });
        const items = tableData.map(data => ({
            productId: data.productId,
            quantity: data.quantity,  
            sellingPrice:Number(data.unitPrice),
            taxAmount:data.gst,
            name:data.itemName,
            discount:Number(data.discountPercent)/100
    }));
        const data={
            distributor: allData.headerData.distributor.value,
            notes: allData.headerData.notes,
            invoiceNo: allData.headerData.invoiceNo,
            dueDate: allData.headerData.dueDate,
            shipping: allData.totalAmountData.shipping,
            adjustment: allData.totalAmountData.adjustment,
            totalCost: allData.totalAmountData.totalCost,
            totalQty: totalQty,
            overallDiscount:allData.totalAmountData.overallDiscount,
            status: "Pending",
            type: FinanceCreationType.Purchase_Order,
            items:{
                create:items
            }
            
        }
        console.log(JSON.stringify(data))
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/create/${FinanceCreationType.Purchase_Order}?branchId=${appState.currentBranchId}`,data)
            if (!response.data) {
                throw new Error('Network response was not ok');
            }
            router.back();
    
        } catch (error) {
            console.error('Error:', error);
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
                                <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                                    <Image src={downloadicon} alt="download"></Image>
                                    <div>Export</div>
                                </div>
                                <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
                                    <Image src={shareicon} alt="share"></Image>
                                    <div>Share editable sheet</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-4 pr-4">
                    <Button className="px-4 py-2.5 text-white text-base bg-zinc-900 rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer">
                        <Image src={drafticon} alt="draft"></Image>
                        <div>Save as Draft</div>
                    </Button>
                    <Button className="px-4 py-2.5 text-white text-base bg-zinc-900 rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer" onClick={handleSubmit} >
                        <Image src={checkicon} alt="check"></Image>
                        <div>Save</div>
                    </Button>
                </div>
                            
                        </div>
    
          
        </>
  )
}

export default NewPurchasesBottomBar