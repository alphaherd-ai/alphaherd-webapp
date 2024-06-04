"use client";
import React from 'react'



import Settings from '../../../assets/icons/finance/Settings.svg';
import Search from '../../../assets/icons/finance/Search.svg';


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
            <div className='flex h-12  w-full box-border justify-between rounded-tl-lg rounded-tr-lg'>
                <div className='flex w-8/12 h-full '>
                    <Link className='no-underline ' href='/finance/overview'>
                        <div  style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={currentRoute === "/finance/overview"
                            ? " flex items-center text-white px-4 py-2.5 bg-black   border-r-0 text-base rounded-tl-lg rounded-bl-lg "
                            : " flex items-center text-gray-400 bg-white px-4 py-2.5   border-r-0 text-base rounded-tl-lg rounded-bl-lg"}>

                            <div className='flex mr-2'><OverviewIcon fill={currentRoute === "/finance/overview"
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                            Overview
                        </div>
                    </Link>
                    <Link className='no-underline ' href={{pathname:'/finance/sales/all',query:{type:'all'}}}>
                        <div  style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={currentRoute.startsWith("/finance/sales") ? " flex items-center text-white  text-base bg-black px-4 py-2.5   border-r-0 " : " flex items-center text-gray-400 bg-white px-4 py-2.5 text-base   border-r-0"}>
                            <div className='flex mr-2'><SalesIcon fill={currentRoute.startsWith("/finance/sales")
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                            Saless
                        </div>
                    </Link>
                    <Link  className='no-underline ' href='/finance/purchases/all'>
                        <div style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={currentRoute.startsWith("/finance/purchases") ? " flex items-center text-white  text-base bg-black px-4 py-2.5    border-r-0 " : " flex items-center text-gray-400 bg-white px-4 py-2.5 text-base   border-r-0"}>
                            <div className='flex mr-2'><PurchaseIcon fill={currentRoute.startsWith("/finance/purchases")
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                            Purchases
                        </div>
                    </Link>
                    <Link  className='no-underline ' href='/finance/expenses/all'>
                        <div  style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={currentRoute.startsWith("/finance/expenses") ? " flex items-center text-white  text-base bg-black px-4 py-2.5   border-r-0 " : " flex items-center text-gray-400 bg-white px-4 py-2.5 text-base   border-r-0"}>
                            <div className='flex mr-2'><ExpensesIcon fill={currentRoute.startsWith("/finance/expenses")
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                            Expenses
                        </div>
                    </Link>
                    <Link   className='no-underline ' href='/finance/transactions/all'>
                        <div style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={currentRoute.startsWith("/finance/transactions")
                            ? " flex items-center text-white  bg-black px-4 py-2.5   border-r-0  text-base rounded-tr-lg rounded-br-lg "
                            : " flex items-center text-gray-400 bg-white px-4 py-2.5   border-r-0  text-base rounded-tr-lg rounded-br-lg"}>

                            <div className='flex mr-2'><TransactionIcon fill={currentRoute.startsWith("/finance/transactions")
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                            Transactions
                        </div>
                    </Link>
                </div>
                <div className='flex h-full items-center  w-3/12'>
                    <div className="relative h-full w-10/12 items-center z-[1]">
                        <input
                            name="Search"
                            type="text"
                            className='rounded-lg px-3 py-2 h-full box-border text-base border border-solid border-gray-400 w-full text-gray-400' style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }}
                            placeholder="Search"

                        />
                        <div className="absolute inset-y-0 right-3 pl-2 flex items-center pointer-events-none">
                      
                        <div className='flex items-center '><Image src={Search} alt='Search' className='w-5  h-5' /></div>
                 
                        </div>
                    </div>

                  
                    <Link className='no-underline h-full  ml-4' href='/settings/general'>
                        <div className='flex items-center border border-solid border-gray-300 bg-white rounded-lg p-3  '><Image src={Settings} alt='Setting' className='w-5  h-5' /></div>
                    </Link>
                </div>
            </div >
        </>
    )
}

export default FinancesNavbar;