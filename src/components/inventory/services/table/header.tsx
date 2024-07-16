"use client";
import React from 'react'

import Sort from '../../../../assets/icons/finance/sort.svg';
import Filter from '../../../../assets/icons/finance/filter.svg';
import Chart from '../../../../assets/icons/finance/chart.svg';
import Download from '../../../../assets/icons/finance/download.svg';
import DownArrow from '../../../../assets/icons/finance/downArrow.svg';

import Update from '../../../../assets/icons/inventory/update.svg';
import Add from '../../../../assets/icons/inventory/add.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import Popup from './newservicepopup';
import Popup2 from '../../product/producttable/updateinventorypopup';



const InventoryServicesTableHeader = () => {
    const currentRoute = usePathname();
    const [showPopup, setShowPopup] = React.useState(false);
    const [showPopup2, setShowPopup2] = React.useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }
    const togglePopup2 = () => {
        setShowPopup2(!showPopup2);
    }

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
            <div className='flex w-full bg-white h-20  p-4 px-6 justify-between border-0 border-b border-solid border-borderGrey rounded-tl-lg rounded-tr-lg'>

                <div className='flex  text-gray-500 items-center w-5/12'>
                    <Link className='no-underline flex item-center' href='/inventory/services/timeline'>

                        <div className={currentRoute.startsWith("/inventory/services/timeline")
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white  rounded-tl-md rounded-bl-md"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500  rounded-tl-md rounded-bl-md"}>Timeline</div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/inventory/services/all'>

                        <div className={currentRoute.startsWith("/inventory/services/all")
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white  rounded-tr-md rounded-br-md"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500  rounded-tr-md rounded-br-md"}>All</div>
                    </Link>
                </div>
                <div className='flex items-center'>
                    <Link className='no-underline flex item-center mr-4' href='/finance/overview'>

                        <div className='flex items-center justify-center border w-7 h-7 border-solid border-gray-300 border-0.5 rounded-md p-1'><Image src={Download} alt='Download' className='w-4  h-4' /></div>
                    </Link>
                    <Link className='no-underline flex item-center mr-4' href='/finance/overview'>

                        <div className='flex items-center justify-center w-7 h-7 border border-solid border-gray-300 border-0.5 rounded-md  p-1'><Image src={Chart} alt='Chart' className='w-4  h-4' /></div>
                    </Link>
                    <div className='flex items-center justify-center h-7   mr-4 border border-solid border-gray-300 border-0.5 rounded-lg p-2'>
                        <div className='flex '><Image src={Sort} alt='Sort' className='w-3 h-3 mr-2' /></div>

                        <Dropdown>
                            <DropdownTrigger className='z-0'>
                                <Button

                                    // color="gray-400"
                                    variant="solid"
                                    className="capitalize border-none  bg-transparent rounded-lg"
                                >
                                    {selectedSortValue}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Single selection example"
                                // color="gray-500"
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
                                    // color="gray-400"
                                    variant="solid"
                                    className="capitalize border-none bg-transparent rounded-lg"
                                >
                                    {selectedCategoryValue}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Single selection example"
                                // color="gray-500"
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

                    <div className='flex items-center  justify-between rounded-lg '>

                        <Dropdown>
                            <DropdownTrigger className='z-0'>
                                <Button
                                    // color="gray-400"
                                    variant="solid"
                                    className="capitalize flex border-none bg-black text-white rounded-lg py-2 cursor-pointer">  New Service
                                    <div className='flex pl-2'><Image src={DownArrow} alt='DownArrow' className='w-4 h-4 ' /></div></Button>
                            </DropdownTrigger>
                            <DropdownMenu className="bg-black text-white flex flex-row items-start rounded-lg border-2 ">
                                
                                     <DropdownItem>
                                        <div className='text-base p-4  text-white flex ' onClick={togglePopup}>
                                            <div className='flex pr-2 cursor-pointer'><Image src={Add} alt='Add' className='w-5 h-5 ' /></div>
                                            <button className='bg-transparent border-0 text-white text-base cursor-pointer' >New Service</button>
                                        </div>
                                    </DropdownItem>




                            </DropdownMenu>
                        </Dropdown>



                    </div>
                </div>
            </div >
            {showPopup && <Popup onClose={togglePopup} />}
            {showPopup2 && <Popup2 onClose={togglePopup2} />}
        </>
    )
}

export default InventoryServicesTableHeader;
