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
import { useRouter, useSearchParams } from "next/navigation"
import { FinanceCreationType } from "@prisma/client"
import axios from "axios"
import { mutate } from "swr"

const NewPurchaseReturnBottomBar = ({invoiceData}:any) => {
    const { headerData, tableData, totalAmountData } = useContext(DataContext);
    console.log("invoice data is :",invoiceData);
    const appState = useAppSelector((state) => state.app);
    const url = useSearchParams();
    const id = url.get('id');
    const router=useRouter();
    const [isSaving,setSaving]=useState(false);

    
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
            sellingPrice:Number(data.maxRetailPrice),
            taxAmount:data.tax,
            name:data.itemName,
            discount:data.discount,
            productBatchId:data.id
    }));
        const data={
            distributor: (id === null) ?allData.headerData.distributor.value:invoiceData.distributor,
            distributorId: (id === null) ? allData.headerData.distributor.distributorId : invoiceData.distributorId,
            email:(id=== null)?allData.headerData.distributor.email:"",
            notes: (id === null) ?allData.headerData.notes:invoiceData.notes,
            invoiceNo: (id === null) ?allData.headerData.invoiceNo:invoiceData.invoiceNo,
            dueDate: (id === null) ?allData.headerData.dueDate:invoiceData.dueDate,
            shipping: totalAmountData.shipping,
            adjustment: totalAmountData.adjustment,
            totalCost: totalAmountData.totalCost,
            overallDiscount: totalAmountData.overAllDiscount,
            totalQty:totalQty,
            status:totalAmountData.totalCost >= 1 ? `You’re owed: ₹${parseFloat(totalAmountData.totalCost).toFixed(2)}` : totalAmountData.totalCost <= -1 ? `You owe: ₹${parseFloat((-1 * totalAmountData.totalCost).toFixed(2))}` : 'Closed',
            type: FinanceCreationType.Purchase_Return,
            items:{
                create:items
            }
            
        }
        console.log("bottom bar data is : ",data);
        
        console.log(JSON.stringify(data))
        try {
            setSaving(true);
            const responsePromise =  axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/create/${FinanceCreationType.Purchase_Return}?branchId=${appState.currentBranchId}`,data)
            // setTimeout(()=>{
            //     router.back();
            // },2000);
            const response= await responsePromise;
            if (!response.data) {
                throw new Error('Network response was not ok');
            }
            mutate(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/getAll?branchId=${appState.currentBranchId}`,(currState:any = [])=>[...currState,response?.data?.purchases],false);
            router.back();
    
        } catch (error) {
            console.error('Error:', error);
        }
        finally{
            setSaving(false);
        }
    };
  return (
    <>


<div className="flex justify-between items-center w-full  box-border  bg-white  border-t border-l-0 border-r-0 border-b-0 border-solid border-borderGrey text-gray-400 py-4 rounded-b-lg">
<div className="flex justify-between items-center gap-4 pl-4">
                                {/* <div className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">
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
                                </div> */}
                            </div>
                            <div className="flex justify-between items-center gap-4 pr-4">
                    {/* <Button className="px-4 py-2.5 text-white text-base bg-zinc-900 rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer">
                        <Image src={drafticon} alt="draft"></Image>
                        <div>Save as Draft</div>
                    </Button> */}
                    <Button className="px-4 py-2.5 text-white text-base bg-zinc-900 rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer" onClick={handleSubmit} disabled={isSaving}>
                        <Image src={checkicon} alt="check"></Image>
                        <div>{isSaving?"Saving...":"Save"}</div>
                    </Button>
                </div>
                            
                        </div>
    
          
        </>
  )
}

export default NewPurchaseReturnBottomBar