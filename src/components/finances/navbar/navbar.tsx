"use client";
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ExpensesIcon from './icons/expensesIcon';
import SalesIcon from './icons/salesIcon';
import PurchaseIcon from './icons/purchaseIcon';
import TransactionIcon from './icons/transactionIcon';
import OverviewIcon from './icons/overviewIcon';
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
import Select from 'react-select';
import { FinanceCreationType } from '@prisma/client';
import Image from 'next/image';
import Search from '../../../assets/icons/home/search.png'


//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());

const FinancesNavbar = () => {
    const appState = useAppSelector((state) => state.app);
    const [searchData, setSearchData] = useState<any[]>([]);
    const [searchOptions, setSearchOptions] = useState<any[]>([]);
    const [receiptOptions, setReceiptOptions] = useState<any[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');
    const router = useRouter();
    const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/getAll?branchId=${appState.currentBranchId}`, fetcher);
    const { data: receiptData, isLoading: receiptIsLoading, error: receiptError } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/getAll?branchId=${appState.currentBranchId}`, fetcher);

    useEffect(() => {
        if (!error && !isLoading && data) {
            const options = data.map((item: any) => ({
                label: item.sale ? (`${item.sale?.invoiceNo}-${item.sale?.customer}`) : item.purchases ? (`${item.purchases?.invoiceNo}-${item.purchases?.distributor}`) : item.expenses ? (`${item.expenses?.invoiceNo}-${item.expenses?.party}`) : "",
                value: item
            }));
            setSearchData(data);
            setSearchOptions(options);
        }
    }, [data, isLoading, error]);

    useEffect(() => {
        if (!receiptError && !receiptIsLoading && receiptData) {
            const options = receiptData
                .filter((item: any) => item.receiptNo !== null)
                .map((item: any) => ({
                    label: `Receipt no. ${item.receiptNo}`,
                    value: item
                }));
            setReceiptOptions(options)
        }

    }, [receiptData, receiptIsLoading, receiptError])

    const currentRoute = usePathname();

    const handleSearch = async(selectedOption: any) => {
        if (currentRoute.startsWith("/finance/transactions")) {
            const item = selectedOption?.value;
            let path = '';
            if(item?.invoiceLink?.startsWith('SI') || item?.invoiceLink?.startsWith('SE') || item?.invoiceLink?.startsWith('SR')){
                const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/getfromInvoice?branchId=${appState.currentBranchId}`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        financeType:'sales',
                        invoice:item.invoiceLink
                    })
                })

                const data=await res.json();
                if(data){
                    if(item.invoiceLink.startsWith('SI')){
                        path = `/finance/sales/existingsales?id=${data.id}`;
                    }else if(item.invoiceLink.startsWith('SE')){
                        path = `/finance/sales/existingsalesestimate?id=${data.id}`;
                    }else if(item.invoiceLink.startsWith('SR')){
                        path = `/finance/sales/existingsalesreturn?id=${data.id}`;
                    }
                    router.push(path); // Navigate to the selected route
                }
            }


            else if(item?.invoiceLink?.startsWith('PI') || item?.invoiceLink?.startsWith('PO') || item?.invoiceLink?.startsWith('PR')){
                const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/getfromInvoice?branchId=${appState.currentBranchId}`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        financeType:'purchase',
                        invoice:item.invoiceLink
                    })
                })

                const data=await res.json();
                if(data){
                    if(item.invoiceLink.startsWith('PI')){
                        path = `/finance/purchases/exsistinggrn?id=${data.id}`;
                    }else if(item.invoiceLink.startsWith('PO')){
                        path = `/finance/purchases/exsistingpurchaseorder?id=${data.id}`;
                    }else if(item.invoiceLink.startsWith('PR')){
                        path = `/finance/purchases/exsistingpurchasereturn?id=${data.id}`;
                    }
                    router.push(path); // Navigate to the selected route
                }
            }
            else if(item?.invoiceLink?.startsWith('EXP')){
                const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/getfromInvoice?branchId=${appState.currentBranchId}`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        financeType:'expense',
                        invoice:item.invoiceLink
                    })
                })

                const data=await res.json();
                if(data){
                    path = `/finance/expenses/exsistingnonrecurring?id=${data.id}`;
                    router.push(path); // Navigate to the selected route
                }
            }
        }
        else {
            const item = selectedOption?.value;
            let path = '';
            if (item?.type === FinanceCreationType.Sales_Estimate) {
                path = `/finance/sales/existingsalesestimate?id=${item.sale.id}`;
            } else if (item.type === FinanceCreationType.Sales_Invoice) {
                path = `/finance/sales/existingsales?id=${item.sale.id}`;
            } else if (item.type === FinanceCreationType.Sales_Return) {
                path = `/finance/sales/existingsalesreturn?id=${item.sale.id}`;
            }
            else if (item.type === FinanceCreationType.Purchase_Invoice) {
                path = `/finance/purchases/exsistinggrn?id=${item.purchases.id}`;
            }
            else if (item.type === FinanceCreationType.Purchase_Order) {
                path = `/finance/purchases/exsistingpurchaseorder?id=${item.purchases.id}`;
            }
            else if (item.type === FinanceCreationType.Purchase_Return) {
                path = `/finance/purchases/exsistingpurchasereturn?id=${item.purchases.id}`;
            }
            else if (item.type === FinanceCreationType.Expense_NonRecurring) {
                path = `/finance/expenses/exsistingnonrecurring?id=${item.expenses.id}`;
            }
            router.push(path); // Navigate to the selected route
        }
    };

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            height: '2.8rem',
            minHeight: '2.8rem',
            width: '22rem',
            maxWidth: '22rem',
            borderColor: state.isFocused ? '#35BEB1' : '#C4C4C4',
            '&:hover': {
                borderColor: state.isFocused ? '#35BEB1' : '#C4C4C4',
            },
            boxShadow: state.isFocused ? 'none' : 'none',
        }),
        valueContainer: (provided: any) => ({
            ...provided,
            height: '2.8rem',
            width: '22rem',
            maxWidth: '22rem',
        }),
        singleValue: (provided: any) => ({
            ...provided,
            width: '22rem',
            maxWidth: '22rem',
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: 'white',
            width: '22rem',
            maxWidth: '22rem',
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#35BEB1' : 'white',
            color: state.isFocused ? 'white' : '#6B7E7D',
            '&:hover': {
                backgroundColor: '#35BEB1',
            }
        }),
        menuPortal: (base: any) => ({ ...base, zIndex: 9999 })

    };

    return (
        <>
            <div className='flex h-12  w-full box-border justify-between rounded-tl-lg rounded-tr-lg'>
                <div className='flex w-8/12 h-full '>
                    <Link className='no-underline ' href='/finance/overview'>
                        <div style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={currentRoute === "/finance/overview"
                            ? " flex items-center text-white px-4 py-2.5 bg-black border-r-0 text-base rounded-tl-lg rounded-bl-lg transition-all duration-200 hover:bg-[#1a1a1a] active:bg-[#2a2a2a]"
                            : " flex items-center text-gray-400 bg-white px-4 py-2.5 border-r-0 text-base rounded-tl-lg rounded-bl-lg transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#35BEB1] active:bg-[#e5e5e5]"}>

                            <div className='flex mr-2'><OverviewIcon fill={currentRoute === "/finance/overview"
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                            Overview
                        </div>
                    </Link>
                    <Link className='no-underline ' href={{ pathname: '/finance/sales/all', query: { type: 'all' } }}>
                        <div style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={currentRoute.startsWith("/finance/sales") 
                            ? " flex items-center text-white text-base bg-black px-4 py-2.5 border-r-0 transition-all duration-200 hover:bg-[#1a1a1a] active:bg-[#2a2a2a]" 
                            : " flex items-center text-gray-400 bg-white px-4 py-2.5 text-base border-r-0 transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#35BEB1] active:bg-[#e5e5e5]"}>
                            <div className='flex mr-2'><SalesIcon fill={currentRoute.startsWith("/finance/sales")
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                            Sales
                        </div>
                    </Link>
                    <Link className='no-underline ' href={{ pathname: '/finance/purchases/all', query: { type: 'all' } }}>
                        <div style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={currentRoute.startsWith("/finance/purchases") 
                            ? " flex items-center text-white text-base bg-black px-4 py-2.5 border-r-0 transition-all duration-200 hover:bg-[#1a1a1a] active:bg-[#2a2a2a]" 
                            : " flex items-center text-gray-400 bg-white px-4 py-2.5 text-base border-r-0 transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#35BEB1] active:bg-[#e5e5e5]"}>
                            <div className='flex mr-2'><PurchaseIcon fill={currentRoute.startsWith("/finance/purchases")
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                            Purchases
                        </div>
                    </Link>
                    <Link className='no-underline ' href={{ pathname: '/finance/expenses/all', query: { type: 'all' } }} >
                        <div style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={currentRoute.startsWith("/finance/expenses") 
                            ? " flex items-center text-white text-base bg-black px-4 py-2.5 border-r-0 transition-all duration-200 hover:bg-[#1a1a1a] active:bg-[#2a2a2a]" 
                            : " flex items-center text-gray-400 bg-white px-4 py-2.5 text-base border-r-0 transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#35BEB1] active:bg-[#e5e5e5]"}>
                            <div className='flex mr-2'><ExpensesIcon fill={currentRoute.startsWith("/finance/expenses")
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                            Expenses
                        </div>
                    </Link>
                    <Link className='no-underline' href={{ pathname: '/finance/transactions/all', query: { type: 'all' } }}>
                        <div style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={currentRoute.startsWith("/finance/transactions")
                            ? " flex items-center text-white bg-black px-4 py-2.5 border-r-0 text-base rounded-tr-lg rounded-br-lg transition-all duration-200 hover:bg-[#1a1a1a] active:bg-[#2a2a2a]"
                            : " flex items-center text-gray-400 bg-white px-4 py-2.5 border-r-0 text-base rounded-tr-lg rounded-br-lg transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#35BEB1] active:bg-[#e5e5e5]"}>

                            <div className='flex mr-2'><TransactionIcon fill={currentRoute.startsWith("/finance/transactions")
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                            Payments
                        </div>
                    </Link>
                </div>
                <div className='flex h-full items-center'>
                    <div className=" h-full w-full items-center">
                        {currentRoute.startsWith("/finance/transactions") ?

                            <Select
                                className="text-gray-500 text-base font-medium w-[100%] border-0 boxShadow-0"
                                classNamePrefix="select"
                                isClearable={true}
                                isSearchable={true}
                                options={receiptOptions}
                                onChange={(selectedProduct: any) => handleSearch(selectedProduct)}
                                placeholder="Reciept no."
                                menuPortalTarget={document.body}
                                styles={{
                                    ...customStyles,
                                    dropdownIndicator: (base) => ({
                                        ...base,
                                        display: "none", // Hides the dropdown arrow
                                    }),
                                    indicatorsContainer: (base) => ({
                                        ...base,
                                        position: "absolute",
                                        right: "10px",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                    }),
                                }}
                                components={{
                                    DropdownIndicator: (props) => (
                                        <div className="flex items-center pl-3 pr-3">
                                            <Image src={Search} alt="Search" className="w-5 h-5 transition duration-200 hover:scale-110 hover:text-gray-200" />
                                        </div>
                                    ),
                                }}
                            />
                            :
                            <Select
                                className="text-gray-500 text-base font-medium w-[100%] border-0 boxShadow-0"
                                classNamePrefix="select"
                                isClearable={true}
                                isSearchable={true}
                                options={searchOptions}
                                onChange={(selectedProduct: any) => handleSearch(selectedProduct)}
                                placeholder="Invoice no. or client/distributor name"
                                menuPortalTarget={document.body}
                                styles={{
                                    ...customStyles,
                                    dropdownIndicator: (base) => ({
                                        ...base,
                                        display: "none", // Hides the dropdown arrow
                                    }),
                                    indicatorsContainer: (base) => ({
                                        ...base,
                                        position: "absolute",
                                        right: "10px",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                    }),
                                }}
                                components={{
                                    DropdownIndicator: (props) => (
                                        <div className="flex items-center pl-3 pr-3">
                                            <Image src={Search} alt="Search" className="w-5 h-5 transition duration-200 hover:scale-110 hover:text-gray-200" />
                                        </div>
                                    ),
                                }}
                            />
                        }
                        {/* <div className="absolute inset-y-0 right-3 pl-2 flex items-center pointer-events-none">
                            <div className='flex items-center '>
                                <Image src={Search} alt='Search' className='w-5  h-5' />
                            </div>
                        </div> */}
                    </div>
                    {/* <Link className='no-underline h-full  ml-4' href='/settings/organisation/myorg'>
                        <div className='flex items-center border border-solid border-gray-300 bg-white rounded-lg px-3 h-[2.8rem] '>
                            <Image src={Settings} alt='Setting' className='w-5  h-5' />
                        </div>
                    </Link> */}
                </div>
            </div>
        </>
    )
}

export default FinancesNavbar;
