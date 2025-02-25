"use client";
import React,{useState,useEffect} from 'react'

import Sort from '../../../../assets/icons/finance/sort.svg';
import Filter from '../../../../assets/icons/finance/filter.svg';
import Chart from '../../../../assets/icons/finance/chart.svg';
import Download from '../../../../assets/icons/finance/download.svg';
import DownArrow from '../../../../assets/icons/finance/downArrow.svg';
import Invoice from '../../../../assets/icons/finance/invoice.svg';
import Estimate from "../../../../assets/icons/finance/list_alt.svg"
import Return from '../../../../assets/icons/finance/return.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FinanceCreationType } from '@prisma/client';
import DownloadPopup from './downloadSalesPopup';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import FilterDropdownCard from './FilterDropDownCard';
import { useRouter } from 'next/navigation';



const FinancesSalesTableHeader = ({ invoiceCount, estimateCount, returnCount, sales }: any) => {

    const currentUrl = useSearchParams();
    const type = currentUrl.get("type")
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPopup1, setShowPopup1] = React.useState(false);
    const togglePopup1 = () => {
        setShowPopup1(!showPopup1);
    }


    const currentRoute = usePathname();
    const [selectedCategory, setSelectedCategory] = React.useState(new Set(["Category: text"]));
    const [selectedSort, setSelectedSort] = useState<string|null>(null);

  const handleSortChange = (key:string) => {
    setSelectedSort(key);
  };

  const clearSort = () => {
    setSelectedSort(null);
  };


    const selectedCategoryValue = React.useMemo(
        () => Array.from(selectedCategory).join(", ").replaceAll("_", " "),
        [selectedCategory]
    );

    const useFilterState = () => {
        const [isActive, setIsActive] = useState(false)
      
        useEffect(() => {
          const checkFilterState = () => {
            const startDate = searchParams.get("startDate")
            const endDate = searchParams.get("endDate")
            const party = searchParams.get("selectedParties")
            const status = searchParams.get("selectedStatus")
            setIsActive(Boolean(startDate || endDate || party || status))
          }
      
          checkFilterState()
        }, [searchParams])
      
        return isActive
      }
    const isFilterActive = useFilterState();

    const handleClearFilters = () => {
        // // Get the base path without query parameters
        // const pathWithoutQuery = window.location.pathname
        
        // // Get the 'type' parameter as we want to preserve it
        // const type = searchParams.get("type") || "all"
    
        // // Navigate to the base URL with only the type parameter
        // router.push(`${pathWithoutQuery}?type=${type}`)
        router.push("/finance/sales/all?type=all");
      }
    return (

        <>
          
          <div className='flex w-full bg-white h-20  p-4 px-6  justify-between border-0 border-b border-solid border-borderGrey rounded-tl-lg rounded-tr-lg'>

<div className='flex  text-gray-500 items-center w-7/12'>
<Link className='no-underline flex item-center' href={{pathname:'/finance/sales/all',query:{type:'all'}}}>

<div className={currentRoute.startsWith("/finance/sales/all")
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white  rounded-tl-md rounded-bl-md"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500  rounded-tl-md rounded-bl-md"}>All</div>
</Link>
<Link className='no-underline flex item-center' href={{pathname:'/finance/sales/order',query:{type:FinanceCreationType.Sales_Estimate}}}>

<div className={currentRoute.startsWith(`/finance/sales/order`)
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"}>Sales Estimate</div>
</Link>
<Link className='no-underline flex item-center' href={{pathname:'/finance/sales/invoice',query:{type:FinanceCreationType.Sales_Invoice}}}>

<div className={currentRoute.startsWith(`/finance/sales/invoice`)
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"}>Sales Invoices</div>
</Link>
<Link className='no-underline flex item-center' href={{pathname:'/finance/sales/return',query:{type:FinanceCreationType.Sales_Return}}}>

<div className={currentRoute.startsWith(`/finance/sales/return`)
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white  rounded-tr-md rounded-br-md"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500  rounded-tr-md rounded-br-md"}>Sales Return</div>
</Link>
<div className='ml-6'>
<Popover placement="bottom-end" showArrow offset={8}>
<PopoverTrigger className='z-0'>
    <Button 
    // color="gray-400"
        variant="solid"
        className="capitalize px-4 py-2.5 flex border-none bg-black text-white rounded-lg cursor-pointer">  Create
        <div className='flex pl-2'><Image src={DownArrow} alt='DownArrow' className='w-4 h-4 ' /></div>
    </Button>
</PopoverTrigger>
<PopoverContent className="py-4 px-3 bg-black text-white flex flex-row items-start rounded-lg">

    <div className="flex flex-col ">
        
        <Link className='no-underline flex item-center' href={{pathname:'/finance/sales/newsales',query:{count:invoiceCount}}}>
            <div className='text-base p-4  text-white flex '>
            <div className='flex pr-2'><Image src={Invoice} alt='Return' className='w-5 h-5 ' /></div>Sales Invoice</div>
        </Link>
        <Link className='no-underline flex item-center' href={{pathname:"/finance/sales/newsalesestimate",query:{count:estimateCount}}}>
            <div className='text-base p-4   text-white flex '>
            <div className='flex pr-2'><Image src={Estimate} alt='Invoice' className='w-5 h-5 ' /></div>Sales Estimate</div>
        </Link>
        <Link className='no-underline flex item-center' href={{pathname:'/finance/sales/newsalesreturn',query:{count:returnCount}}}>
            <div className='text-base p-4  text-white flex '>
            <div className='flex pr-2'><Image src={Return} alt='Return' className='w-5 h-5 ' /></div>Sales Return</div>
        </Link>
      
        
    </div>
  

</PopoverContent>
</Popover>
    </div>
    </div>
<div className='flex items-center'>
<div onClick={togglePopup1} className='cursor-pointer mr-4 flex items-center justify-center border w-7 h-7 border-solid border-gray-300 border-0.5 rounded-md p-1'>
            <Image src={Download} alt='Download' className='w-4  h-4' />
        </div>
<Link className='no-underline flex item-center mr-4' href='/finance/overview'>

<div  className='flex items-center justify-center w-7 h-7 border border-solid border-gray-300 border-0.5 rounded-md  p-1'><Image src={Chart} alt='Chart' className='w-4  h-4' /></div>
</Link>
<div className={`flex items-center justify-center h-7  p-2 mr-4 border border-solid border-gray-300 border-0.5 rounded-lg  ${selectedSort ? 'bg-[#35BEB1]' : 'bg-[#FFFFFF'}`}>
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5276 11.3892L11.0052 14.9022L7.47543 11.3725L8.40153 10.437L10.345 12.3805L10.345 1.75511L11.6747 1.75511L11.6747 12.3805L13.6015 10.4536L14.5276 11.3892ZM8.54357 4.61091L7.61747 5.53701L5.69067 3.61021L5.69067 14.2356L4.36093 14.2356L4.36093 3.61021L2.40803 5.55367L1.48193 4.62757L5.02108 1.08844L8.54357 4.61091Z" fill={selectedSort ? "#FFFFFF" : "#A2A3A3"}/>
</svg>
{/* <div className='flex '><Image src={Sort} alt='Sort' className='w-3 h-3 mr-2' /></div> */}
<Dropdown >
<DropdownTrigger className='z-0'>
    <Button
        //   variant="bordered" 
        // color="gray-400"
        variant="solid"
        className="capitalize border-none  bg-transparent rounded-lg text-white"
    >
<span style={{ fontFamily: 'Satoshi', fontWeight: 500, fontSize: '14px', lineHeight: '18.9px', color: selectedSort ? '#FFFFFF' : '#A2A3A3' }}>{selectedSort ? `Sort: ${selectedSort}` : "Sort"}</span>
      {/* Cross Icon */}

    </Button>
</DropdownTrigger>
<DropdownMenu
    aria-label="Single selection example"
    // color="gray-500"
    className=" text-base  text-gray-500 bg-gray-200 rounded-lg"
    variant="solid"
    disallowEmptySelection
    selectionMode="single"
    // onSelectionChange={setselectedSort}
>
    <DropdownItem
        className=" p-2 text-base" onClick={()=>handleSortChange("Recently Used")}>Sort:Recently Used</DropdownItem>
    <DropdownItem
        className=" p-2 text-base" onClick={()=>handleSortChange("Recently Used")}>Sort:Recently Used</DropdownItem>
    <DropdownItem
        className=" p-2 text-base" onClick={()=>handleSortChange("Date")}>Sort:Date</DropdownItem>
</DropdownMenu>
</Dropdown>
{selectedSort && (
        <svg
          width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="hover:fill-gray-800 cursor-pointer"
          onClick={clearSort}
        >
          <path d="M4.77561 12L4 11.2244L7.22439 8L4 4.77561L4.77561 4L8 7.22439L11.2244 4L12 4.77561L8.77561 8L12 11.2244L11.2244 12L8 8.77561L4.77561 12Z" fill="white"/>
        </svg>
      )}
</div>



<div className={`flex items-center  h-7  p-2 mr-4 border border-solid border-gray-300 border-0.5 rounded-lg ${isFilterActive ? 'bg-[#35BEB1]' : 'bg-[#FFFFFF]'}`}>
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"  className='cursor-pointer'>
<mask id="mask0_1198_18016" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
<rect width="16" height="16" fill="white"/>
</mask>
<g mask="url(#mask0_1198_18016)">
<path d="M7.32918 14.0011V10.0011H8.66252V11.3344H13.9958V12.6678H8.66252V14.0011H7.32918ZM1.99585 12.6678V11.3344H5.99585V12.6678H1.99585ZM4.66252 10.0011V8.66777H1.99585V7.33443H4.66252V6.0011H5.99585V10.0011H4.66252ZM7.32918 8.66777V7.33443H13.9958V8.66777H7.32918ZM9.99585 6.0011V2.0011H11.3292V3.33443H13.9958V4.66777H11.3292V6.0011H9.99585ZM1.99585 4.66777V3.33443H8.66252V4.66777H1.99585Z" fill={isFilterActive ? "#FFFFFF" : "#A2A3A3"}/>
</g>
</svg>


                        <Popover >
                            <PopoverTrigger>
                                <Button
                                    variant="solid"
                                    className="capitalize border-none bg-transparent rounded-lg text-white"
                                >
                                    <span style={{ fontFamily: 'Satoshi', fontWeight: 500, fontSize: '14px', lineHeight: '18.9px',  color: isFilterActive ? '#FFFFFF' : '#A2A3A3' }}>Filter</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <FilterDropdownCard />
                            </PopoverContent>
                        </Popover>
                        {isFilterActive && (
                <svg
                    width="20" height="20" viewBox="0 0 16 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className='cursor-pointer'
                    onClick={handleClearFilters}
                >
                    <path d="M4.77561 12L4 11.2244L7.22439 8L4 4.77561L4.77561 4L8 7.22439L11.2244 4L12 4.77561L8.77561 8L12 11.2244L11.2244 12L8 8.77561L4.77561 12Z" fill="white"/>
                </svg>
            )}
                    </div>


                    {/* <div className='flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-lg '> */}

                    {showPopup1 && <DownloadPopup onClose={togglePopup1} sales={sales} type={type} />}

                    {/* </div> */}
                </div>
            </div >


        </>
    )
}

export default FinancesSalesTableHeader;