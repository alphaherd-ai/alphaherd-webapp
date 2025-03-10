"use client"

import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"

import checkicon from "../../../../../assets/icons/finance/check.svg"
import React, { useState,  useContext } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"
import Loading2 from '@/app/loading2';

import Image from "next/image"
import { Button } from '@nextui-org/react'
import { DataContext } from "./DataContext"
import { useAppSelector } from "@/lib/hooks"
import { useRouter, useSearchParams } from "next/navigation"
import { FinanceCreationType } from "@prisma/client"
import axios from "axios"

import AmountnotMatchedPopup from "./totalTransactionPopup"
import { mutate } from "swr";
const CreateGrnBottomBar = ({ orderData }: any) => {
    const [isSaving, setSaving] = useState(false);
    const { headerData, tableData, totalAmountData, transactionsData } = useContext(DataContext);
    console.log(orderData);
    const appState = useAppSelector((state) => state.app);
    const url = useSearchParams();
    const [showPopup,setShowPopup] = useState(false);
    const id = url.get('id');
    const router = useRouter();
    const togglePopup = () =>{
        setShowPopup(!showPopup);
    }
    const totalPaidAmount = transactionsData?.filter(item => item.moneyChange === 'In').map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);
    
    const totalAmountToPay = transactionsData?.filter(item => item.moneyChange === 'Out' ||  item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);
   

    const balanceDue = totalAmountData?.totalCost >= headerData.distributor?.creditedToken ? (totalAmountData?.totalCost + totalPaidAmount - totalAmountToPay - headerData.distributor?.creditedToken) : totalAmountData?.totalCost + totalPaidAmount - totalAmountToPay;
    const newCreditedToken =totalAmountData.totalCost >= headerData.distributor?.creditedToken ? 0 : headerData.distributor?.creditedToken;
    
    const handleSubmit = async () => {
        const totalPaidAmount = transactionsData?.filter(item => item.moneyChange === 'In' || item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);
        const totalAmountToPay = transactionsData?.filter(item => item.moneyChange === 'Out').map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);
        const balanceDue = totalAmountData?.totalCost >= headerData.distributor?.creditedToken ? (totalAmountData?.totalCost + totalPaidAmount - totalAmountToPay - headerData.distributor?.creditedToken) : totalAmountData?.totalCost + totalPaidAmount - totalAmountToPay;
        const newCreditedToken =totalAmountData.totalCost >= headerData.distributor?.creditedToken ? 0 : headerData.distributor?.creditedToken;
        const totalGrnAmountInput = document.querySelector('.totalgnr') as HTMLInputElement;
        const errorMessage = document.getElementById('errormess');
        const totalgnrinput = document.getElementById('totalgnrinput');
        const totalgnrhead = document.getElementById('totalgnrhead');
        console.log(totalGrnAmountInput.value);
        const value = totalGrnAmountInput.value.replace(/,/g, '');
        const isValidNumber = !isNaN(parseFloat(value)) && isFinite(Number(value));
        console.log(value);
        console.log('hi');
        if(totalgnrinput && totalgnrhead){
            if (!totalGrnAmountInput.value || !isValidNumber) {
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    totalgnrinput.style.borderColor = 'red';
                    totalgnrhead.style.color = 'red';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                return;
            } else {
                if (errorMessage) {
                    errorMessage.style.display = 'none';
                    totalgnrinput.style.borderColor = '#6B7E7D';
                    totalgnrhead.style.color = '#6B7E7D';
                }
                console.log('here error');
            }
        }
        const totalCost = parseFloat(totalAmountData.totalCost);
        if (parseFloat(value) !== totalCost && !showPopup) {
            togglePopup();
            return;
        }

        tableData.pop();
        const allData = { headerData, tableData, totalAmountData, transactionsData };
        let totalQty = 0;
        tableData.forEach(data => {
            totalQty += (data.quantity) || 0;
        });
        const items = tableData.map(data => ({
            productId: data.productId,
            quantity: data.quantity,
            sellingPrice: Number(data.maxRetailPrice),
            maxRetailPrice:Number(data.maxRetailPrice),
            taxAmount: data.gst,
            name: data.itemName,
            discount: Number(data.discountPercent) / 100,
            expiry: data.expiry,
            batchNumber: data.batchNumber,
            hsnCode: data.barCode,
            location:data.location,
            isApproved: true,
            costPrice: Number(data.unitPrice)
        }));
        console.log("item is :", items);
        const data = {
            distributor: (id === null) ? allData.headerData.distributor.value : orderData.distributor,
            distributorId: (id === null) ? allData.headerData.distributor.distributorId : orderData.distributorId,
            newCreditedToken: (id === null) ? newCreditedToken : -1,
            notes:  allData.headerData.notes ,
            invoiceNo: allData.headerData.invoiceNo ,
            dueDate: (id === null) ? allData.headerData.dueDate : orderData.dueDate,
            shipping: allData.totalAmountData.shipping,
            adjustment: allData.totalAmountData.adjustment,
            totalCost: allData.totalAmountData.totalCost,
            overallDiscount: (id === null) ? allData.totalAmountData.overallDiscount : orderData.overallDiscount,
            totalQty: totalQty,
            recordTransaction: {
                create: allData.transactionsData,
            },
            status: balanceDue <= -1 ? `You’re owed: ₹${parseFloat((-1 * balanceDue).toString()).toFixed(2)}` : balanceDue >= 1 ? `You owe: ₹${parseFloat((balanceDue).toString()).toFixed(2)}` : 'Closed',
            type: FinanceCreationType.Purchase_Order,
            items: {
                create: items
            }
        }

        try {
            setSaving(true);
            const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/create/${FinanceCreationType.Purchase_Invoice}?branchId=${appState.currentBranchId}`, data)
            //mutate(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/getAll?branchId=${appState.currentBranchId}`);
            setTimeout(() => {
                router.back();
            }, 2000)
            const response = await responsePromise;
            console.log("resposnse is :",response);
            if (!response.data) {
                throw new Error('Network response was not ok');
            }
            //mutate(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/getAll?branchId=${appState.currentBranchId}`,(currState:any = [])=>[...currState,response?.data?.purchases],false);
            //router.back();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSaving(false);
        }
    };


   //const isDisabled = !headerData.distributor || tableData.length === 0 
   const isDisabled = headerData?.customer ? (!headerData?.customer) : (!orderData?.distributor) || id === null ? tableData.length === 1 : tableData.length === 0

    return (
        <>
            <div className="flex justify-between items-center w-full  box-border  bg-white  border-t border-l-0 border-r-0 border-b-0 border-solid border-borderGrey text-gray-400 py-4 rounded-b-lg">
                <div className="flex justify-between items-center gap-4 pr-4">
                    <Button className={`px-4 py-2.5 text-white text-base rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer ${isDisabled ? 'bg-gray-400' : 'bg-zinc-900'
                        }`}
                        onClick={handleSubmit} disabled={isDisabled}>
                        <Image src={checkicon} alt="check"></Image>
                        <div>{isSaving ? <Loading2 /> : "Save"}</div>
                    </Button>
                </div>
                {showPopup && <AmountnotMatchedPopup onClose={togglePopup} handleSubmit={handleSubmit} isSaving={isSaving}/>}
            </div>
        </>
    )
}

export default CreateGrnBottomBar;