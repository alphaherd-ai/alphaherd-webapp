"use client";
import Image from "next/image";


import lefticon from "../../../../assets/icons/finance/left_icon.svg";
import righticon from "../../../../assets/icons/finance/right_icon.svg";

import cash from "../../../../assets/icons/finance/Cash.svg"

import { useEffect, useState } from "react";


import { useSelector } from 'react-redux'

import TransactionsBlanceSheetCashItem from "./item";

import TransactionsBlanceSheetItemSales from "./itemSales";
import TransactionsBlanceSheetItemExpenses from "./itemExpenses";
import TransactionsBlanceSheetItemPurchases from "./itemPurchase";

import useSWR from "swr";
import { useAppSelector } from "@/lib/hooks";
import Loading from "@/app/loading1";
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())



const FinancesTransactionSheet = () => {

    const [paymentMethod, setPaymentMethod] = useState([]);
    const appState = useAppSelector((state) => state.app)
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/paymentMethod/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });
    useEffect(() => {
        if (!isLoading && !error && data) {
            setPaymentMethod(data)
        }
    }, [data, error, isLoading]);


    const transactionAmount = useSelector((state: any) => state.transactionAmount)



    const [activeTab, setActiveTab] = useState('All transactions');
    const [clickedIndex, setClickedIndex] = useState(0);

    const handleClick = (index: any) => {
        setClickedIndex(index);
    };
    //daily toogle functionality
    const currentDate=new Date();
    const [date, setDate] = useState<Date>(new Date());
    const handlePrev=()=>{
        //not mutating the object directly
        setDate((date)=>{
            const prev=new Date(date);
            prev.setDate(prev.getDate()-1);
            return prev;
        })
    }
    const handleNext=()=>{
        setDate((date:any)=>{
            const next=new Date(date);
            next.setDate(next.getDate()+1);
            return next;
        })
    }
    const getCurrentDate=()=>{
        console.log('clicked')
        setDate(currentDate);
    }
    
    return (
        <>
            <div className="flex flex-col mt-6 border-0 border-b border-solid border-borderGrey">
                <div className="flex flex-col">
                    <div className="flex w-full h-14 p-4 bg-white border border-solid border-borderGrey justify-between items-center">
                        <div className="w-[751px] h-[27px] justify-start items-center gap-4 inline-flex">
                            <div className="justify-end items-start flex border border-solid border-borderGrey rounded-[5px] cursor-pointer">
                                <div
                                    className={`px-2 py-1 ${activeTab === 'All transactions' ? 'bg-zinc-900 border-zinc-900' : 'bg-gray-100 border-neutral-400'} rounded-tl-[5px] rounded-bl-[5px] border justify-start items-center gap-1 flex`}
                                    onClick={() => setActiveTab('All transactions')}
                                >
                                    <div className={`text-sm font-medium ${activeTab === 'All transactions' ? 'text-gray-100' : 'text-textGrey2'}`}>
                                        All transactions
                                    </div>
                                </div>
                                <div
                                    className={`px-2 py-1 border-t-0 border-b-0 border-l border-r border-solid border-borderGrey ${activeTab === 'Sales' ? 'bg-zinc-900 border-zinc-900' : 'bg-gray-100 border-neutral-400'} border justify-start items-center gap-1 flex`}
                                    onClick={() => setActiveTab('Sales')}
                                >
                                    <div className={`text-sm font-medium  ${activeTab === 'Sales' ? 'text-gray-100' : 'text-textGrey2'}`}>
                                        Sales
                                    </div>
                                </div>
                                <div
                                    className={`px-2 py-1 border-t-0 border-b-0 border-l border-r border-solid border-borderGrey ${activeTab === 'Expenses' ? 'bg-zinc-900 border-zinc-900' : 'bg-gray-100 border-neutral-400'}  border justify-start items-center gap-1 flex`}
                                    onClick={() => setActiveTab('Expenses')}
                                >
                                    <div className={`text-sm font-medium ${activeTab === 'Expenses' ? 'text-gray-100' : 'text-textGrey2'}`}>
                                        Expenses
                                    </div>
                                </div>
                                <div
                                    className={`px-2 py-1 border-t-0 border-b-0 border-l border-r border-solid border-borderGrey ${activeTab === 'Purchases' ? 'bg-zinc-900 border-zinc-900' : 'bg-gray-100 border-neutral-400'} rounded-tr-[5px] rounded-br-[5px] border justify-start items-center gap-1 flex`}
                                    onClick={() => setActiveTab('Purchases')}
                                >
                                    <div className={`text-sm font-medium ${activeTab === 'Purchases' ? 'text-gray-100' : 'text-textGrey2'}`}>
                                    Purchases
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                        <div className="flex h-[19px] justify-start items-start gap-6 ">
                            <div className="h-6 justify-start items-center gap-4 inline-flex">
                                <div className="flex">
                                    <Image className="w-6 h-6 relative" src={lefticon} alt="left_icon" onClick={handlePrev}/>
                                    <Image className="w-6 h-6 relative" src={righticon} alt="right_icon" onClick={handleNext}/>
                                </div>
                                <div className="text-gray-500 text-sm font-medium ">
                                    {new Date().toLocaleDateString('en-US', {year:'numeric',month:'short',day:'numeric'})!==date.toLocaleDateString('en-US', {year:'numeric',month:'short',day:'numeric'})?date.toLocaleDateString('en-US', {year:'numeric',month:'short',day:'numeric'}):"Today"}
                                </div>
                            </div>
                            {/* {['Today'].map((label, index) => (
                                <button className="border-none bg-transparent" onClick={() => handleClick(index)} key={index}>
                                    <div className={`${index === clickedIndex ? "text-center text-teal-400 font-bold" : "text-neutral-400"} text-neutral-400 text-sm font-medium `} onClick={getCurrentDate}>
                                        {label}
                                    </div>
                                    {index === clickedIndex && <Image src={selecttab} alt="icon" />}
                                </button>
                            ))}  */}
                        </div>
                    </div>
                </div>


                {activeTab === 'All transactions' &&
                    <div className="flex overflow-x-auto">

                        {isLoading ? <Loading /> : paymentMethod.map((item: any) => {
                            return (
                                <div key={item.id}>
                                    <TransactionsBlanceSheetCashItem mode={item.name} filterdate={date}/>
                                </div>
                            );
                        })}

                    </div>}


                {activeTab === 'Sales' &&
                    <div className="flex">

                        {isLoading ? <Loading /> : paymentMethod.map((item: any) => {
                            return (
                                <div key={item.id} className="w-1/4 border-0 border-r border-l border-solid border-borderGrey bg-gray-100 pb-2">
                                    <div className="items-center justify-center flex text-gray-500 text-xl font-bold  py-4 border-borderGrey bg-white mb-2">
                                        <span className="mr-2">
                                            <Image src={cash} alt='cash' className='w-6 h-6 mt-1' />
                                        </span>
                                        {item.name}
                                    </div>
                                    <TransactionsBlanceSheetItemSales mode={item.name} filterdate={date}/>
                                </div>
                            );
                        })}

                    </div>}

                    {activeTab === 'Expenses' &&
                    <div className="flex">

                        {isLoading ? <Loading /> : paymentMethod.map((item: any) => {
                            return (
                                <div key={item.id} className="w-1/4 border-0 border-r border-l border-solid border-borderGrey bg-gray-100 pb-2">
                                    <div className="items-center justify-center flex text-gray-500 text-xl font-bold  py-4 border-borderGrey bg-white mb-2">
                                        <span className="mr-2">
                                            <Image src={cash} alt='cash' className='w-6 h-6 mt-1' />
                                        </span>
                                        {item.name}
                                    </div>
                                    <TransactionsBlanceSheetItemExpenses mode={item.name} filterdate={date}/>
                                </div>
                            );
                        })}

                        

                    </div>}

                    {activeTab === 'Purchases' &&
                    <div className="flex">

                        {isLoading ? <Loading /> : paymentMethod.map((item: any) => {
                            return (
                                <div key={item.id} className="w-1/4 border-0 border-r border-l border-solid border-borderGrey bg-gray-100 pb-2">
                                    <div className="items-center justify-center flex text-gray-500 text-xl font-bold  py-4 border-borderGrey bg-white mb-2">
                                        <span className="mr-2">
                                            <Image src={cash} alt='cash' className='w-6 h-6 mt-1' />
                                        </span>
                                        {item.name}
                                    </div>
                                    <TransactionsBlanceSheetItemPurchases mode={item.name} filterdate={date}/>
                                </div>
                            );
                        })}

                        

                    </div>}

                    


                

            </div>
        </>
    );
};

export default FinancesTransactionSheet;
