"use client"

import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"

import checkicon from "../../../../../assets/icons/finance/check.svg"
import React, { useState,  useContext } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"
import Loading2 from '@/app/loading2';
import { mutate } from "swr";
import Image from "next/image"
import { Button } from '@nextui-org/react'
import { DataContext } from "./DataContext"
import { useAppSelector } from "@/lib/hooks"
import { useRouter, useSearchParams } from "next/navigation"
import { FinanceCreationType } from "@prisma/client"
import axios from "axios"


const NewPurchasesBottomBar = ({ orderData }: any) => {
    const { headerData, tableData, totalAmountData, transactionsData } = useContext(DataContext);
    const appState = useAppSelector((state) => state.app);
    const router = useRouter();
    const url = useSearchParams();
    const id = url.get('id');
    const [isSaving, setSaving] = useState(false);
    var userEmail = "";
    const handleSubmit = async () => {
        const totalPaidAmount = transactionsData?.filter(item => item.moneyChange === 'In').map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);
        const totalAmountToPay = transactionsData?.filter(item => item.moneyChange === 'Out'  || item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);
        const balanceDue = totalAmountData.totalCost + totalPaidAmount - totalAmountToPay;
        tableData.pop();
        const allData = { headerData, tableData, totalAmountData,transactionsData };
        console.log(allData)
        let totalQty = 0;
        tableData.forEach(data => {
            totalQty += (data.quantity) || 0;
        });
        const items = tableData.map(data => ({
            productId: data.productId,
            quantity: data.quantity,
            sellingPrice: Number(data.unitPrice),
            taxAmount: data.gst,
            name: data.itemName,
            discount: Number(data.discountPercent) / 100
        }));
        const data = {
            distributor: (id === null) ? allData.headerData.distributor.value : orderData.distributor,
            distributorId: (id === null) ? allData.headerData.distributor.distributorId : orderData.distributorId,
            email: (id === null) ? allData.headerData.distributor.email : "",
            notes: (id === null) ? allData.headerData.notes : orderData.notes,
            invoiceNo: allData.headerData.invoiceNo,
            dueDate: (id === null) ? allData.headerData.dueDate : orderData.dueDate,
            shipping: allData.totalAmountData.shipping,
            adjustment: allData.totalAmountData.adjustment,
            totalCost: allData.totalAmountData.totalCost,
            totalQty: totalQty,
            overallDiscount: allData.totalAmountData.overallDiscount,
            status: balanceDue <= -1 ? `You’re owed: ₹${parseFloat((-1 * balanceDue).toString()).toFixed(2)}` : balanceDue >= 1 ? `You owe: ₹${parseFloat((balanceDue).toString()).toFixed(2)}` : 'Closed',
            type: FinanceCreationType.Purchase_Order,
            items: {
                create: items
            },
            recordTransaction: {
                create: allData.transactionsData,
            },


        }

        try {
            setSaving(true);
            const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/create/${FinanceCreationType.Purchase_Order}?branchId=${appState.currentBranchId}`, data)
            //mutate(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/getAll?branchId=${appState.currentBranchId}`);
            setTimeout(() => {
                router.back();
            }, 2000)
            const response = await responsePromise;
            if (!response.data) {
                throw new Error('Network response was not ok');
            }
            //mutate(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/getAll?branchId=${appState.currentBranchId}`,(currState:any = [])=>[...currState,response?.data?.purchases],false);
            //router.back();

        } catch (error) {
            console.error('Error:', error);
        }
        finally {
            setSaving(false);
        }
    };

    console.log("email is :", userEmail);

    const sendEmail = () => {
        try {
            const response = fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/email`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,

                })
            });
            console.log('Email sent successfully:', response);
        } catch (error) {
            console.error('Error while saving data:', error);
        }
    };

    const isDisabled = (!headerData.distributor && !orderData?.distributor) || tableData.length === 1;

    return (
        <>


            <div className="flex justify-between items-center w-full  box-border  bg-white  border-t border-l-0 border-r-0 border-b-0 border-solid border-borderGrey text-gray-400 py-4 rounded-b-lg">
                <div ></div>
                <div className="flex justify-between items-center gap-4 pr-4">
                    <Button className={`px-4 py-2.5 text-white text-base rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer ${isDisabled ? 'bg-gray-400' : 'bg-zinc-900'
                        }`}
                        onClick={handleSubmit} disabled={isDisabled}>
                        <Image src={checkicon} alt="check"></Image>
                        <div>{isSaving ? <Loading2></Loading2> : "Save"}</div>
                    </Button>
                </div>

            </div>


        </>
    )
}

export default NewPurchasesBottomBar