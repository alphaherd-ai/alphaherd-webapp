"use client";
import React,{useState,useEffect} from 'react'

import Download from '../../../../assets/icons/finance/download.svg';

import Expense from "../../../../assets/icons/finance/request_quote.svg"

import Image from 'next/image';
import Link from 'next/link';
import { usePathname,useSearchParams } from 'next/navigation';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import FilterDropdownCard from './FilterDropDownCard';
import { useRouter } from 'next/navigation';


const FinancesExpensesTableHeader = ({ recurringCount, nonrecurringCount }: any) => {
    const currentRoute = usePathname();
    const router=useRouter();
    const searchParams=useSearchParams();
    const [selectedCategory, setSelectedCategory] = React.useState(new Set(["Category: text"]));
    const [selectedSort, setselectedSort] = React.useState(new Set(["Category: text"]));
    const [showPopup, setShowPopup] = React.useState(false);


    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    const selectedCategoryValue = React.useMemo(
        () => Array.from(selectedCategory).join(", ").replaceAll("_", " "),
        [selectedCategory]
    );
    const selectedSortValue = React.useMemo(
        () => Array.from(selectedSort).join(", ").replaceAll("_", " "),
        [selectedSort]
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
                router.push("/finance/expenses/all?type=all");
              }
    return (

        <>

            <div className='flex w-full bg-white h-20  p-4 px-6  justify-between border-0 border-b border-solid border-borderGrey rounded-tl-lg rounded-tr-lg'>

                <div className='flex  text-gray-500 items-center w-6/12'>
                    <Link className='no-underline flex item-center' href='/finance/expenses/all'>

                        <div className={currentRoute.startsWith("/finance/expenses/all")
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white  rounded-tl-md rounded-bl-md"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500  rounded-tl-md rounded-bl-md"}>All</div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/finance/expenses/nonrecurring'>

                        <div className={currentRoute.startsWith("/finance/expenses/nonrecurring")
                            ? "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white"
                            : "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"}> Non Recurring Expenses</div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/finance/expenses/recurring'>

                        <div className={currentRoute.startsWith("/finance/expenses/recurring")
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"}>Recurring Expenses</div>
                    </Link>

                    <Link className='ml-6 no-underline flex item-center' href={{ pathname: '/finance/expenses/newexpenses', query: { count: nonrecurringCount } }}>
                        <Button
                            variant="solid"
                            className="capitalize flex h-9 py-2.5 cursor-pointer border-none bg-black text-white rounded-lg ">
                            <div className='flex pl-2'><Image src={Expense} alt='Expense' className='w-5 h-5 ' /></div>New Expense
                        </Button>
                    </Link>

                </div>
                <div className='flex items-center'>
                    <Link className='no-underline flex item-center mr-4' href='/finance/overview'>

                        <div className='flex items-center justify-center border w-7 h-7 border-solid border-gray-300 border-0.5 rounded-md p-1'><Image src={Download} alt='Download' className='w-4  h-4' /></div>
                    </Link>
                    {/* <Link className='no-underline flex item-center mr-4' href='/finance/overview'>

                        <div className='flex items-center justify-center w-7 h-7 border border-solid border-gray-300 border-0.5 rounded-md  p-1'><Image src={Chart} alt='Chart' className='w-4  h-4' /></div>
                    </Link> */}
                    <div className={`flex items-center  h-7  p-2 mr-4 border border-solid border-gray-300 border-0.5 rounded-lg ${isFilterActive ? 'bg-[#35BEB1]' : 'bg-[#FFFFFF]'}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"  className='cursor-pointer'>
<mask id="mask0_1198_18016" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
<rect width="16" height="16" fill="white"/>
</mask>
<g mask="url(#mask0_1198_18016)">
<path d="M7.32918 14.0011V10.0011H8.66252V11.3344H13.9958V12.6678H8.66252V14.0011H7.32918ZM1.99585 12.6678V11.3344H5.99585V12.6678H1.99585ZM4.66252 10.0011V8.66777H1.99585V7.33443H4.66252V6.0011H5.99585V10.0011H4.66252ZM7.32918 8.66777V7.33443H13.9958V8.66777H7.32918ZM9.99585 6.0011V2.0011H11.3292V3.33443H13.9958V4.66777H11.3292V6.0011H9.99585ZM1.99585 4.66777V3.33443H8.66252V4.66777H1.99585Z" fill={isFilterActive ? "#FFFFFF" : "#A2A3A3"}/>
</g>
</svg>


<Popover>
                            <PopoverTrigger>
                                <Button
                                    variant="solid"
                                    className="capitalize border-none bg-transparent rounded-lg text-white"
                                >
                                    <span style={{ fontFamily: 'Satoshi', fontWeight: 500, fontSize: '14px', lineHeight: '18.9px', color: isFilterActive ? '#FFFFFF' : '#A2A3A3' }}>Filter</span>
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

                    {/* <div className='flex items-center h-9 py-2.5 bg-black justify-between rounded-lg '> */}

                    {/* <Popover placement="bottom-end" showArrow offset={10}>
            <PopoverTrigger> */}
                    {/* </PopoverTrigger>
            <PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">
      
                <div className="flex flex-col ">
                   
                    <div className='flex flex-col'>
                    
                    <Link className='no-underline flex item-center' href='/finance/overview'>
                    <div className='text-base p-4   text-white flex '>
                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div> Order</div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/finance/overview'>
                    <div className='text-base p-4  text-white flex '>
                    <div className='flex pr-2'><Image src={Return} alt='Return' className='w-5 h-5 ' /></div> Invoice</div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/finance/overview'>
                    <div className='text-base p-4  text-white flex '>
                    <div className='flex pr-2'><Image src={Return} alt='Return' className='w-5 h-5 ' /></div>    Return</div>
                    </Link>
                  
                    </div>
                </div>
              

            </PopoverContent>
        </Popover> */}



                    {/* </div> */}
                </div>
            </div >


        </>
    )
}

export default FinancesExpensesTableHeader;