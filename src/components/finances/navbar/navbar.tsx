"use client";
import React from 'react'



import Settings from '../../../assets/icons/finance/Settings.svg';


import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ExpensesIcon from './icons/expensesIcon';

import SalesIcon from './icons/salesIcon';
import PurchaseIcon from './icons/purchaseIcon';
import TransactionIcon from './icons/transactionIcon';
import OverviewIcon from './icons/overviewIcon';



const FinancesNavbar = () => {

    const currentRoute = usePathname();

    return (

        <>
            <div className='flex  w-full box-border justify-between border border-solid border-gray-300 border-t-0.5 rounded-tl-lg rounded-tr-lg'>
                <div className='flex w-8/12 '>
            <Link className='no-underline '  href='/finance/overview'>
                <div className={currentRoute === "/finance/overview" 
       ? " flex items-center text-white  bg-black  p-2 border border-solid border-gray-300 border-0.5 sm:text-sm md:text-xs text-lg 2xl:text-xl rounded-tl-lg rounded-bl-lg " 
       : " flex items-center text-gray-400 bg-white  p-2 border border-solid border-gray-300 border-0.5 sm:text-sm md:text-xs text-lg 2xl:text-xl rounded-tl-lg rounded-bl-lg"}>
                    
                    <div className='flex mr-1'><OverviewIcon fill={currentRoute === "/finance/overview" 
       ? "#38F8E6" 
       : "#A2A3A3"}/></div>
                    Overview
                </div>
                </Link>
                <Link className='no-underline ' href='/finance/sales/all'>
                    <div className={currentRoute.startsWith("/finance/sales")  ? " flex items-center text-white  sm:text-sm md:text-xs text-lg 2xl:text-xl bg-black  p-2 border border-solid border-gray-300 border-0.5 " : " flex items-center text-gray-400 bg-white  sm:text-sm md:text-xs text-lg 2xl:text-xl p-2 border border-solid border-gray-300 border-0.5"}>
                    <div className='flex mr-1'><SalesIcon fill={currentRoute.startsWith("/finance/sales") 
       ? "#38F8E6" 
       : "#A2A3A3"}/></div>
                    Saless
                </div>
                </Link>
                <Link className='no-underline ' href='/finance/purchases/all'>
                    <div className={currentRoute.startsWith("/finance/purchases") ? " flex items-center text-white  sm:text-sm md:text-xs text-lg 2xl:text-xl bg-black  p-2 border border-solid border-gray-300 border-0.5 " : " flex items-center text-gray-400 bg-white  sm:text-sm md:text-xs text-lg 2xl:text-xl p-2 border border-solid border-gray-300 border-0.5"}>
                    <div className='flex mr-1'><PurchaseIcon fill={currentRoute.startsWith("/finance/purchases") 
       ? "#38F8E6" 
       : "#A2A3A3"}/></div>
                    Purchases
                </div>
                </Link>
                <Link className='no-underline ' href='/finance/expenses'>
                    <div className={currentRoute.startsWith("/finance/expenses")  ? " flex items-center text-white  sm:text-sm md:text-xs text-lg 2xl:text-xl bg-black  p-2 border border-solid border-gray-300 border-0.5 " : " flex items-center text-gray-400 bg-white  sm:text-sm md:text-xs text-lg 2xl:text-xl p-2 border border-solid border-gray-300 border-0.5"}>
                    <div className='flex mr-1'><ExpensesIcon fill={currentRoute.startsWith("/finance/expenses") 
       ? "#38F8E6" 
       : "#A2A3A3"}/></div>
                    Expenses
                </div>
                </Link>
                <Link className='no-underline' href='/finance/transactions'>
                <div className={currentRoute.startsWith("/finance/transactions") 
       ? " flex items-center text-white  bg-black  p-2 border border-solid border-gray-300 border-0.5  sm:text-sm md:text-xs text-lg 2xl:text-xl rounded-tr-lg rounded-br-lg " 
       : " flex items-center text-gray-400 bg-white  p-2 border border-solid border-gray-300 border-0.5  sm:text-sm md:text-xs text-lg 2xl:text-xl rounded-tr-lg rounded-br-lg"}>
            
            <div className='flex mr-1'><TransactionIcon fill={currentRoute.startsWith("/finance/transactions") 
       ? "#38F8E6" 
       : "#A2A3A3"}/></div>
                    Transactions
                </div>
                </Link>
            </div>
            <div className='flex items-center border border-solid border-gray-300 border-0.5 rounded-lg w-3/12'>
                <div className='w-10/12 items-center'>
                    <input
                        name="Search"
                        type="text"
                        className='rounded-lg px-3 py-2 boc-border sm:text-sm md:text-xs text-lg 2xl:text-xl border border-solid border-gray-300 w-full text-gray-400'
                        placeholder="Search"

                    />
                </div>
                <Link className='no-underline' href='/finance/overview'>
                <div className='flex items-center border border-solid border-gray-300 bg-white rounded-lg ml-2 p-2 '><Image src={Settings} alt='Setting' className='w-4  h-4' /></div>
                    </Link>
            </div>
        </div >
        </>
    )
}

export default FinancesNavbar;