"use client";
import React, { useContext ,useState,useEffect} from 'react'

import { DataContext } from './DataContext';

import Link from 'next/link';
import { usePathname } from 'next/navigation';


import { Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import FilterDropdwonCard from './FilterDropDownCard';
import FilterDropdownProductsCard from './FilterDropDownProductsCard';
import DownloadPopup from './downloadProductPopup';
import { useRouter,useSearchParams } from 'next/navigation';




const InventoryProductTableHeader = ({ onSortChange }: any) => {



    const currentRoute = usePathname();
    const [selectedCategory, setSelectedCategory] = React.useState(new Set(["Category: text"]));
    const router = useRouter();
    const searchParams = useSearchParams();
    //const [selectedSort, setselectedSort] = React.useState(new Set(["Category: text"]));
    // const [selectedSort, setSelectedSort] = React.useState("distributorName");
    // const [sortOrder, setSortOrder] = React.useState("asc");

    // const handleSortChange = (key: string) => {
    //     if (key === selectedSort) {
    //         const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    //         setSortOrder(newSortOrder);
    //         onSortChange(key, newSortOrder);
    //     } else {
    //         setSelectedSort(key);
    //         setSortOrder("asc");
    //         onSortChange(key, "asc");
    //     }
    // };
    const useFilterState = () => {
            const [isActive, setIsActive] = useState(false)
          
            useEffect(() => {
              const checkFilterState = () => {
                const party = searchParams.get("selectedParties")
                const category = searchParams.get("selectedCategories")
                const moneyType = searchParams.get("selectedMoneyTypes")
                setIsActive(Boolean(party || category || moneyType))
              }
          
              checkFilterState()
            }, [searchParams])
          
            return isActive
          }
        const isFilterActive = useFilterState();
    
        const handleClearFilters = () => {
            router.push("/inventory/products/all");
          }
    const [showPopup1, setShowPopup1] = React.useState(false);
    const togglePopup1 = () => {
        setShowPopup1(!showPopup1);
    }
    const { allData } = useContext(DataContext);


    return (

        <>





            <div className='flex w-full bg-white h-20  p-4 px-6  justify-between border-0 border-b border-solid border-borderGrey rounded-tl-lg rounded-tr-lg'>

                <div className='flex  text-gray-500 items-center w-5/12'>
                    <Link className='no-underline flex item-center' href='/inventory/products/timeline'>
                        <div className={currentRoute.startsWith("/inventory/products/timeline")
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white rounded-tl-md rounded-bl-md"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500 rounded-tl-md rounded-bl-md transition-all duration-150 hover:bg-[#2a2a2a] hover:text-white"}>Timeline</div>
                    </Link>

                    <Link className='no-underline flex item-center' href='/inventory/products/all'>
                        <div className={currentRoute.startsWith("/inventory/products/all")
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white rounded-tr-md rounded-br-md"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500 rounded-tr-md rounded-br-md transition-all duration-150 hover:bg-[#2a2a2a] hover:text-white"}>All</div>
                    </Link>
                </div>
                <div className='flex items-center'>
                    {/* <div onClick={togglePopup1} className='cursor-pointer mr-4 flex items-center justify-center border w-7 h-7 border-solid border-gray-300 border-0.5 rounded-md p-1'>
                        <Image src={Download} alt='Download' className='w-4  h-4' />
                    </div>
                    {/* <Link className='no-underline flex item-center mr-4' href='/finance/overview'>

                        <div className='flex items-center justify-center w-7 h-7 border border-solid border-gray-300 border-0.5 rounded-md  p-1'><Image src={Chart} alt='Chart' className='w-4  h-4' /></div>
                    </Link> */}
                    {/* <div className='flex items-center justify-center h-7   mr-4 border border-solid border-gray-300 border-0.5 rounded-lg p-2'>
                        <div className='flex '><Image src={Sort} alt='Sort' className='w-3 h-3 mr-2' /></div>

                        <Dropdown>
                            <DropdownTrigger className='z-0'>
                                <Button variant="solid" className="capitalize border-none bg-transparent rounded-lg">
                                    <div className="flex text-gray-500 items-center">
                                        <div className="text-base">Sort By</div>
                                    </div>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Single selection example"
                                className=" text-base  text-gray-500 bg-gray-200 rounded-lg"
                                variant="solid"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={new Set([selectedSort])}
                            // onSelectionChange={setselectedSort}
                            >
                                {currentRoute.startsWith("/inventory/products/timeline") ? <DropdownItem
                                    className="p-2 text-base"
                                    key="name"
                                    onClick={() => handleSortChange("distributorName")}
                                >
                                    Distributor
                                </DropdownItem> :
                                    <DropdownItem
                                        className="p-2 text-base"
                                        key="date"
                                        onClick={() => handleSortChange("date")}
                                    >
                                        Date of Registration
                                    </DropdownItem>}

                            </DropdownMenu>
                        </Dropdown>
                    </div> */}
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
                                {currentRoute.startsWith("/inventory/products/timeline") ?
                                    (<FilterDropdwonCard />) : currentRoute.startsWith("/inventory/products/all") ? (<FilterDropdownProductsCard />) : ""}
                            </PopoverContent>
                        </Popover>
                        {isFilterActive && (
                            <Link href="/inventory/products/all">
                <svg
                    width="20" height="20" viewBox="0 0 16 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className='cursor-pointer'
                    // onClick={handleClearFilters}
                >
                    <path d="M4.77561 12L4 11.2244L7.22439 8L4 4.77561L4.77561 4L8 7.22439L11.2244 4L12 4.77561L8.77561 8L12 11.2244L11.2244 12L8 8.77561L4.77561 12Z" fill="white"/>
                </svg>
                </Link>
            )}
                    </div>

                    {/* <div className='flex items-center '>
                         <div className='text-base p-4 bg-black text-white rounded-lg cursor-pointer py-2 flex cursor-pointer w-[162px] h-[44px]' onClick={togglePopup}>
                            <div className='flex pr-2 cursor-pointer'><Image src={Add} alt='Update' className='w-5 h-5 ' /></div>
                            <button className='bg-transparent border-0 text-white text-base cursor-pointer' >New Product</button>
                        </div>
                        <div className='capitalize flex border-none bg-black text-white rounded-lg cursor-pointer py-2 w-[162px] h-[44px]' onClick={togglePopup2}>
                            <div className='flex pr-2'><Image src={Update} alt='Update' className='w-5 h-5 ' /></div>
                            <button className='bg-transparent border-0 text-white text-base cursor-pointer' >Update Inventory</button>
                        </div>
                    </div> */}


                </div>
            </div >
            {showPopup1 && <DownloadPopup onClose={togglePopup1} products={allData} />}

        </>
    )
}

export default InventoryProductTableHeader;
