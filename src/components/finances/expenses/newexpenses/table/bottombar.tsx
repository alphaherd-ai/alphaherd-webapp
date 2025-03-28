"use client"

// import SelectDropdown from 'react-native-select-dropdown'
import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"
import drafticon from "../../../../../assets/icons/finance/draft.svg"
import checkicon from "../../../../../assets/icons/finance/check.svg"
import React, { useState,  useContext } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"
import Popup from "./convertToRecurringPopup"

import Image from "next/image"
import { DataContext } from './DataContext'
import { FinanceCreationType, Notif_Source } from '@prisma/client'
import axios from "axios"
import { useAppSelector } from '@/lib/hooks';
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@nextui-org/react"
import Loading2 from '@/app/loading2';
import { mutate } from "swr"

const NewExpensesBottomBar = ({ expenseData,setValidate }: any) => {
    const { headerData, tableData, totalAmountData, recurringData, transactionsData } = useContext(DataContext);
    const router = useRouter();
    const url = useSearchParams();
    const id = url.get('id');
    const appState = useAppSelector((state) => state.app);
    const [isSaving, setSaving] = useState(false);

    const totalPaidAmount = transactionsData?.filter(item => item.moneyChange === 'In' || item.isAdvancePayment).map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);

    const totalAmountToPay = transactionsData?.filter(item => item.moneyChange === 'Out').map(item => item.amountPaid).reduce((a: any, b: any) => a + b, 0);


    const balanceDue = totalAmountData.totalCost - totalPaidAmount + totalAmountToPay;

    const [disableSave, setdisableSave] = useState(false);
    const handleSubmit = async () => {
        const updatedTableData = tableData.slice(0, -1); // Create a new array without modifying the original
    
        try {
            const hasInvalidData = updatedTableData.some(data => !data.itemName || !data.cost);
            if (hasInvalidData) {
                setValidate(true);
                throw new Error('Invalid data');
            }
        } catch (error) {
            console.error('Error:', error);
            return;
        }
    
        const filteredTableData = updatedTableData.filter(data => data.itemName);
        const allData = { headerData, filteredTableData, totalAmountData, recurringData, transactionsData };
    
        let totalQty = filteredTableData.length;
    
        const items = filteredTableData.map(data => ({
            sellingPrice: data.cost,
            invoiceNo: data.invoiceNo,
            transactionId: data.transactionId,
            name: data.itemName,
            category: data.category
        }));
    
        const data = {
            party: (id === null) ? allData.headerData.title.value : expenseData.party,
            notes: (id === null) ? allData.headerData.notes : expenseData.notes,
            subTotal: allData.totalAmountData.subTotal,
            invoiceNo: (id === null) ? allData.headerData.invoiceNo : expenseData.invoiceNo,
            dueDate: (id === null) ? (allData.headerData.dueDate) || new Date(Date.now()) : expenseData.dueDate,
            totalCost: allData.totalAmountData.totalCost,
            overallDiscount: allData.totalAmountData.gst?.value,
            totalQty,
            recordTransaction: {
                create: allData.transactionsData
            },
            recurringStartedOn: allData.recurringData.startDate,
            recurringRepeatType: allData.recurringData?.repeatType?.value,
            recurringEndson: allData.recurringData.endDate,
            type: allData.recurringData.startDate ? FinanceCreationType.Expense_Recurring : FinanceCreationType.Expense_NonRecurring,
            status:balanceDue >= 1 ? `You owe: ₹${parseFloat(balanceDue).toFixed(2)}` : balanceDue <= -1 ? `You owe: ₹${parseFloat((-1 * balanceDue).toFixed(2))}` : 'Closed',
            items: {
                create: items
            }
        };
    
        console.log("here is the data", JSON.stringify(data));
    
        const notifData = {
            source: Notif_Source.Expense_Invoice,
            totalCost: data.totalCost,
            dueDate: data.dueDate,
            orgId: appState.currentOrgId,
            orgBranch: appState.currentOrg.orgName
        };
    
        try {
            setSaving(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/expenses/create/${data.type}?branchId=${appState.currentBranchId}`, data);
            const notif = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData);
    
            if (!response.data) {
                throw new Error('Network response was not ok');
            }
            //console.log(response.data);
            //mutate(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/expenses/getAll?branchId=${appState.currentBranchId}`,(currData:any)=>[...currData,response?.data?.expense],false)
            router.back()
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSaving(false);
        }
    };
    const [showPopup, setShowPopup] = React.useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }


    const isDisabled = !(headerData.title || expenseData?.party) || (id===null) ? tableData.length===1 : tableData.length===0;
    console.log(isDisabled);
    return (
        <>


            <div className="flex justify-between items-center w-full  box-border  bg-white  border-t border-l-0 border-r-0 border-b-0 border-solid border-borderGrey text-gray-400 py-4 rounded-b-lg">
                <div className="flex justify-between items-center gap-4 pl-4">
                    
                </div>
                <div className="flex justify-between items-center gap-4 pr-4">
                    {/* <Button className="px-4 py-2.5 text-white text-base bg-zinc-900 rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer">
                        <Image src={drafticon} alt="draft"></Image>
                        <div>Save as Draft</div>
                    </Button> */}
                    <Button className="px-4 py-2.5 text-white text-base bg-zinc-900 rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer" onClick={togglePopup}>
                        <Image src={drafticon} alt="draft"></Image>
                        <div>Convert to Recurring Expense</div>
                    </Button>
                    <Button className={`px-4 py-2.5 text-white text-base rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer ${isDisabled ? 'bg-gray-400' : 'bg-zinc-900'
                        }`}
                        onClick={handleSubmit} disabled={isDisabled || isSaving || disableSave}>
                        <Image src={checkicon} alt="check"></Image>
                        <div>{isSaving ? <Loading2></Loading2> : "Save"}</div>
                    </Button>
                </div>
            </div>


            {showPopup && <Popup onClose={togglePopup} />}
        </>

    )
}

export default NewExpensesBottomBar;