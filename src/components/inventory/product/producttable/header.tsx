"use client";
import React, { useContext } from 'react'

import Sort from '../../../../assets/icons/finance/sort.svg';
import Filter from '../../../../assets/icons/finance/filter.svg';




import { DataContext } from './DataContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import FilterDropdwonCard from './FilterDropDownCard';
import FilterDropdownProductsCard from './FilterDropDownProductsCard';
import DownloadPopup from './downloadProductPopup';





const InventoryProductTableHeader = ({ onSortChange }: any) => {



    const currentRoute = usePathname();
    const [selectedCategory, setSelectedCategory] = React.useState(new Set(["Category: text"]));

    //const [selectedSort, setselectedSort] = React.useState(new Set(["Category: text"]));
    const [selectedSort, setSelectedSort] = React.useState("distributorName");
    const [sortOrder, setSortOrder] = React.useState("asc");

    const handleSortChange = (key: string) => {
        if (key === selectedSort) {
            const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            setSortOrder(newSortOrder);
            onSortChange(key, newSortOrder);
        } else {
            setSelectedSort(key);
            setSortOrder("asc");
            onSortChange(key, "asc");
        }
    };

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
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white  rounded-tl-md rounded-bl-md"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500  rounded-tl-md rounded-bl-md"}>Timeline</div>
                    </Link>

                    <Link className='no-underline flex item-center' href='/inventory/products/all'>

                        <div className={currentRoute.startsWith("/inventory/products/all")
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white  rounded-tr-md rounded-br-md"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500  rounded-tr-md rounded-br-md"}>All</div>
                    </Link>
                </div>
                <div className='flex items-center'>
                    {/* <div onClick={togglePopup1} className='cursor-pointer mr-4 flex items-center justify-center border w-7 h-7 border-solid border-gray-300 border-0.5 rounded-md p-1'>
                        <Image src={Download} alt='Download' className='w-4  h-4' />
                    </div>
                    {/* <Link className='no-underline flex item-center mr-4' href='/finance/overview'>

                        <div className='flex items-center justify-center w-7 h-7 border border-solid border-gray-300 border-0.5 rounded-md  p-1'><Image src={Chart} alt='Chart' className='w-4  h-4' /></div>
                    </Link> */}
                    <div className='flex items-center justify-center h-7   mr-4 border border-solid border-gray-300 border-0.5 rounded-lg p-2'>
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
                    </div>
                    <div className='flex items-center  h-7  p-2 mr-4 border border-solid border-gray-300 border-0.5 rounded-lg '>
                        <div className='flex '><Image src={Filter} alt='Filter' className='w-3 h-3 mr-2' /></div>

                        <Popover>
                            <PopoverTrigger>
                                <Button
                                    variant="solid"
                                    className="capitalize border-none bg-transparent rounded-lg "
                                >
                                    <span className='text-textGrey2 text-sm font-medium'> Filter By</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                {currentRoute.startsWith("/inventory/products/timeline") ?
                                    (<FilterDropdwonCard />) : currentRoute.startsWith("/inventory/products/all") ? (<FilterDropdownProductsCard />) : ""}
                            </PopoverContent>
                        </Popover>
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
