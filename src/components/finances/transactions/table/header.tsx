"use client";
import React, { useCallback, useEffect, useState } from 'react';
import Sort from '../../../../assets/icons/finance/sort.svg';
import Filter from '../../../../assets/icons/finance/filter.svg';
import Chart from '../../../../assets/icons/finance/chart.svg';
import Download from '../../../../assets/icons/finance/download.svg';
import DownArrow from '../../../../assets/icons/finance/downArrow.svg';
import rupee from "../../../../assets/icons/finance/rupee.svg"
import Invoice from '../../../../assets/icons/finance/invoice.svg';
import Return from '../../../../assets/icons/finance/return.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Popup from "../table/recordTransactionPopup"
import DownloadPopup from "../table/downloadPopup"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import { useAppSelector } from '@/lib/hooks';



const FinancesTransactionsTableHeader = ({transactions}:any) => {
    const appState = useAppSelector((state) => state.app);
    const currentUrl=useSearchParams();
    const type = currentUrl.get("type")

    

    const [showPopup, setShowPopup] = React.useState(false);
    const [showPopup1, setShowPopup1] = React.useState(false);
    
    const togglePopup = () => {
        setShowPopup(!showPopup);
    }
   
    const togglePopup1 = () => {
        setShowPopup1(!showPopup1);
    }

    const [count, setCount] = useState(0);
    const [initialInvoiceNo, setInitialInvoiceNo] = useState('');
  
    useEffect(() => {
      if (showPopup) {
        setCount((prevCount) => prevCount + 1);
      }
    }, [showPopup]);
  
    useEffect(() => {
      if (showPopup) {
        const newInvoiceNo = generateInvoiceNumber(count);
        setInitialInvoiceNo(newInvoiceNo);
      }
    }, [count, showPopup]);
    const [existingPaymentMethods, setExistingPaymentMethods] = useState<string[]>([]);
    const fetchExistingPaymentMethods = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/paymentMethod/getAll?branchId=${appState.currentBranchId}`);
            const data: { name: string }[] = await response.json();
            const paymentMethodNames = Array.from(new Set(data.map((item: { name: string }) => item.name)));
            setExistingPaymentMethods(paymentMethodNames);
            console.log('Existing Payment Methods fetched:', paymentMethodNames); 
        } catch (error) {
            console.error('Error fetching existing payment methods:', error);
        }
    },[existingPaymentMethods])

    useEffect(() => {
            const fetchExistingPaymentMethods = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/paymentMethod/getAll?branchId=${appState.currentBranchId}`);
                    const data: { name: string }[] = await response.json();
                    const paymentMethodNames = Array.from(new Set(data.map((item: { name: string }) => item.name)));
                    setExistingPaymentMethods(paymentMethodNames);
                    console.log('Existing Payment Methods fetched:', paymentMethodNames); 
                } catch (error) {
                    console.error('Error fetching existing payment methods:', error);
                }
            };
            
            fetchExistingPaymentMethods();
        }, []);
        
    const currentRoute = usePathname();
    const [selectedCategory, setSelectedCategory] = React.useState(new Set(["Category: text"]));
    const [selectedSort, setselectedSort] = React.useState(new Set(["Category: text"]));


    const selectedCategoryValue = React.useMemo(
        () => Array.from(selectedCategory).join(", ").replaceAll("_", " "),
        [selectedCategory]
    );
    const selectedSortValue = React.useMemo(
        () => Array.from(selectedSort).join(", ").replaceAll("_", " "),
        [selectedSort]
    );

    return (

        <>
          
<div className='flex w-full bg-white h-20  p-4 px-6  justify-between  border-t-0.5 rounded-tl-[5px] rounded-tr-[5px]'>

<div className='flex  text-gray-500 items-center max-w-5/12 rounded-md overflow-hidden border border-solid border-gray-300 h-fit my-auto border-[0.5]'>

    <Link className='no-underline flex item-center' href={{pathname:'/finance/transactions/all',query:{type:'all'}}}>

    <div className={currentRoute.startsWith("/finance/transactions/all")
        ? " flex items-center p-1 px-2 text-sm bg-black text-white  rounded-tl-md rounded-bl-md"
        : " flex items-center p-1 px-2 text-sm bg-gray-200 text-gray-500  rounded-tl-md rounded-bl-md"}>All Payments</div>
    </Link>
    {existingPaymentMethods.map((method, index) => (
        <Link key={index} className='no-underline flex item-center' href={{ pathname: `/finance/transactions/${method.toLowerCase()}`, query: { type: method } }}>
            <div className={currentRoute.startsWith(`/finance/transactions/${method.toLowerCase()}`)
                ? "flex items-center border-l border-solid border-gray-300 border-t-0 border-b-0 border-r-0 p-1 px-2 text-sm bg-black text-white"
                : "flex items-center border-l border-solid border-gray-300 border-t-0 border-b-0 border-r-0 p-1 px-2 text-sm bg-gray-200 text-gray-500"}>
                {method}
            </div>
        </Link>
    ))}
{/* <Link className='no-underline flex item-center' href={{pathname: '/finance/transactions/cash', query: { type: 'Cash' }}}>

<div className={currentRoute.startsWith("/finance/transactions/cash")
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"}>Cash</div>
</Link>
<Link className='no-underline flex item-center' href={{pathname: '/finance/transactions/upi', query: { type: 'UPI' }}}>

<div className={currentRoute.startsWith("/finance/transactions/upi")
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"}> UPI</div>
</Link>
<Link className='no-underline flex item-center' href={{pathname: '/finance/transactions/card', query: { type: 'Card' }}}>

<div className={currentRoute.startsWith("/finance/transactions/card")
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white "
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500 "}>Card</div>
</Link>
<Link className='no-underline flex item-center' href={{pathname: '/finance/transactions/netbanking', query: { type: 'Net Banking' }}}>

<div className={currentRoute.startsWith("/finance/transactions/netbanking")
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"}>Net Banking</div>
</Link> */}
</div>
<div className='flex items-center'>
        

        <div onClick={togglePopup1} className='cursor-pointer mr-4 flex items-center justify-center border w-7 h-7 border-solid border-gray-300 border-0.5 rounded-md p-1'>
            <Image src={Download} alt='Download' className='w-4  h-4' />
        </div>
        
    
{/* <Link className='no-underline flex item-center mr-4' href='/finance/overview'>

<div  className='flex items-center justify-center w-7 h-7 border border-solid border-gray-300 border-0.5 rounded-md  p-1'><Image src={Chart} alt='Chart' className='w-4  h-4' /></div>
</Link> */}
<div className='flex items-center justify-center h-7   mr-4 border border-solid border-gray-300 border-0.5 rounded-lg p-2'>
<div className='flex '><Image src={Sort} alt='Sort' className='w-3 h-3 mr-2' /></div>

<Dropdown>
<DropdownTrigger className='z-0'>
    <Button
        //   variant="bordered" 
        // color="gray-400"
        variant="solid"
        className="capitalize border-none  bg-transparent rounded-lg"
    >
        {selectedSortValue}
    </Button>
</DropdownTrigger>
<DropdownMenu
    aria-label="Single selection example"
    className=" text-base  text-gray-500 bg-gray-200 rounded-lg"
    variant="solid"
    disallowEmptySelection
    selectionMode="single"
    selectedKeys={selectedSort}
    // onSelectionChange={setselectedSort}
>
    <DropdownItem
        className=" p-2 text-base" key="Category:text">Sort:Recently Used</DropdownItem>
    <DropdownItem
        className=" p-2 text-base" key="Category:number">Sort:Recently Used</DropdownItem>
    <DropdownItem
        className=" p-2 text-base" key="Category:date">Date</DropdownItem>
</DropdownMenu>
</Dropdown>
</div>
<div className='flex items-center  h-7  p-2 mr-4 border border-solid border-gray-300 border-0.5 rounded-lg '>
<div className='flex '><Image src={Filter} alt='Filter' className='w-3 h-3 mr-2' /></div>

<Dropdown>
<DropdownTrigger className='z-0'>
    <Button
        //   variant="bordered" 
        variant="solid"
        className="capitalize border-none bg-transparent rounded-lg"
    >
        {selectedCategoryValue}
    </Button>
</DropdownTrigger>
<DropdownMenu
    aria-label="Single selection example"
    className=" text-base bg-gray-200 rounded-lg"
    variant="solid"
    disallowEmptySelection
    selectionMode="single"
    selectedKeys={selectedCategory}
    // onSelectionChange={setSelectedCategory}
>
    <DropdownItem
        className=" p-2" key="Category:text">Category: Text</DropdownItem>
    <DropdownItem
        className=" p-2" key="Category:number">Category: Number</DropdownItem>
    <DropdownItem
        className=" p-2" key="Category:date">Date</DropdownItem>
</DropdownMenu>
</Dropdown>
</div>

{/* <div className='flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-lg '> */}

{/* <Popover placement="bottom-end" showArrow offset={10}>
<PopoverTrigger> */}
    <Button
    onClick={togglePopup}
        variant="solid"
        className="capitalize flex border-none py-2.5 bg-black text-white rounded-lg cursor-pointer">
        <div className='flex'><Image src={rupee} alt='rupee' className='w-4 h-4 ' /></div>Record Payment
    </Button>
{/* </PopoverTrigger>
<PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">

    <div className="flex flex-col ">
       
        <div className='flex flex-col'>
        
        <Link className='no-underline flex item-center' href='/finance/overview'>
        <div className='text-base p-4   text-white flex '>
        <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Inverse</div>
        </Link>
        <Link className='no-underline flex item-center' href='/finance/overview'>
        <div className='text-base p-4  text-white flex '>
        <div className='flex pr-2'><Image src={Return} alt='Return' className='w-5 h-5 ' /></div>Return</div>
        </Link>
        <Link className='no-underline flex item-center' href='/finance/overview'>
        <div className='text-base p-4  text-white flex '>
        <div className='flex pr-2'><Image src={Return} alt='Return' className='w-5 h-5 ' /></div>Estimate</div>
        </Link>
      
        </div>
    </div>
  

</PopoverContent>
</Popover> */}
{showPopup && <Popup onClose={togglePopup} initialInvoiceNo={initialInvoiceNo} />}
{showPopup1 && <DownloadPopup onClose={togglePopup1} transactions={transactions} type={type}  />}


{/* </div> */}
</div>
</div >


        </>
    )
}

export default FinancesTransactionsTableHeader;