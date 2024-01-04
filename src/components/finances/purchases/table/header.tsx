"use client";
import React from 'react'

import Sort from '../../../../assets/icons/finance/sort.svg';
import Filter from '../../../../assets/icons/finance/filter.svg';
import Chart from '../../../../assets/icons/finance/chart.svg';
import Download from '../../../../assets/icons/finance/download.svg';
import DownArrow from '../../../../assets/icons/finance/downArrow.svg';
import Invoice from '../../../../assets/icons/finance/invoice.svg';
import Return from '../../../../assets/icons/finance/Return.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";




const FinancesPurchasesTableHeader = () => {
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
            <div className='flex w-full bg-white  p-5 mt-5 justify-between border border-solid border-gray-300 border-t-0.5 '>

                <div className='flex  text-gray-500 items-center w-5/12'>
                    <Link className='no-underline flex item-center' href='/finance/purchases/all'>

                        <div className={currentRoute.startsWith("/finance/purchases/all")
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 sm:text-sm md:text-xs text-lg 2xl:text-xl bg-black text-white  rounded-tl-md rounded-bl-md"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 sm:text-sm md:text-xs text-lg 2xl:text-xl bg-gray-200 text-gray-500  rounded-tl-md rounded-bl-md"}>All</div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/finance/purchases/order'>

                        <div className={currentRoute.startsWith("/finance/purchases/order")
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 sm:text-sm md:text-xs text-lg 2xl:text-xl bg-black text-white"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 sm:text-sm md:text-xs text-lg 2xl:text-xl bg-gray-200 text-gray-500"}>Purchase Order</div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/finance/purchases/invoice'>

                        <div className={currentRoute.startsWith("/finance/purchases/invoice")
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 sm:text-sm md:text-xs text-lg 2xl:text-xl bg-black text-white"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 sm:text-sm md:text-xs text-lg 2xl:text-xl bg-gray-200 text-gray-500"}>Purchase Invoices</div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/finance/purchases/return'>

                        <div className={currentRoute.startsWith("/finance/purchases/return")
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 sm:text-sm md:text-xs text-lg 2xl:text-xl bg-black text-white  rounded-tr-md rounded-br-md"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 sm:text-sm md:text-xs text-lg 2xl:text-xl bg-gray-200 text-gray-500  rounded-tr-md rounded-br-md"}>Purchase Return</div>
                    </Link>
                </div>
                <div className='flex w-7/12 justify-end items-center'>
                    <Link className='no-underline flex item-center' href='/finance/overview'>

                        <div className='flex items-center border border-solid border-gray-300 border-0.5 rounded-md  p-2'><Image src={Download} alt='Download' className='w-4  h-4' /></div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/finance/overview'>

                        <div className='flex items-center border border-solid border-gray-300 border-0.5 rounded-md  p-2 ml-1'><Image src={Chart} alt='Chart' className='w-4  h-4' /></div>
                    </Link>
                    <div className='flex items-center justify-center  ml-1 border border-solid border-gray-300 border-0.5 rounded-lg p-2'>
                        <div className='flex '><Image src={Sort} alt='Sort' className='w-4 h-4 ' /></div>

                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    //   variant="bordered" 
                                    color="gray-400"
                                    variant="solid"
                                    className="capitalize border-none sm:text-sm md:text-xs text-lg 2xl:text-xl  bg-transparent rounded-lg"
                                >
                                    {selectedSortValue}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Single selection example"
                                color="black"
                                className=" p-2 bg-gray-200 rounded-lg sm:text-sm md:text-xs text-lg 2xl:text-xl"
                                variant="solid"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedSort}
                                onSelectionChange={setselectedSort}
                            >
                                <DropdownItem
                                    className=" p-2 " key="Category:text">Sort:Recently Used</DropdownItem>
                                <DropdownItem
                                    className=" p-2 " key="Category:number">Sort:Recently Used</DropdownItem>
                                <DropdownItem
                                    className=" p-2 " key="Category:date">Date</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='flex items-center  ml-1 p-2 border border-solid border-gray-300 border-0.5 rounded-lg'>
                        <div className='flex '><Image src={Filter} alt='Filter' className='w-4 h-4 ' /></div>

                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    //   variant="bordered" 
                                    // color="gray-400"
                                    variant="solid"
                                    className="capitalize sm:text-sm md:text-xs text-lg 2xl:text-xl border-none bg-transparent rounded-lg"
                                >
                                    {selectedCategoryValue}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Single selection example"
                                color="black"
                                className=" p-2 bg-gray-200 sm:text-sm md:text-xs text-lg 2xl:text-xl rounded-lg"
                                variant="solid"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedCategory}
                                onSelectionChange={setSelectedCategory}
                            >
                                <DropdownItem
                                    className=" p-2" key="text">Text</DropdownItem>
                                <DropdownItem
                                    className=" p-2" key="number"> Number</DropdownItem>
                                <DropdownItem
                                    className=" p-2" key="date">Date</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <div className='flex items-center ml-2 py-2 pl-3 pr-3 bg-black justify-between rounded-lg'>
                        <Popover placement="bottom-end" showArrow offset={10}>
                            <PopoverTrigger>
                                <Button color="gray-400"
                                    variant="solid"
                                    className="capitalize flex border-none bg-black text-white sm:text-sm md:text-xs text-base 2xl:text-xl rounded-lg">  Create
                                    <div className='flex'><Image src={DownArrow} alt='DownArrow' className='w-5 h-5 ' /></div></Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 mt-3">


                                <div className="flex flex-col">

                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                        <div className='sm:text-sm md:text-xs text-lg 2xl:text-xl  p-4   text-white flex '>
                                            <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-6 h-6 ' /></div>Purchase Order</div>
                                    </Link>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                        <div className='sm:text-sm md:text-xs text-lg 2xl:text-xl  p-4  text-white flex '>
                                            <div className='flex pr-2'><Image src={Return} alt='Return' className='w-6 h-6 ' /></div>Purchase Invoice</div>
                                    </Link>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                        <div className='sm:text-sm md:text-xs text-lg 2xl:text-xl  p-4  text-white flex '>
                                            <div className='flex pr-2'><Image src={Return} alt='Return' className='w-6 h-6 ' /></div>Purchase Return</div>
                                    </Link>

                                </div>
                            </PopoverContent>
                        </Popover>



                    </div>
                </div>
            </div >
            <div className='flex  w-full  box-border bg-gray-200 py-1 border border-solid border-gray-300 border-t-0.5 text-gray-500'>
                <div className='w-1/12 flex py-2 px-4 items-center  text-base'>Date</div>
                <div className='w-1/12 flex py-2 px-3 items-center  text-base'>Time</div>
                <div className='w-2/12 flex py-2 px-3 items-center  text-base'>Type</div>
                <div className='w-1/12 flex py-2 px-3 items-center  text-base'>Party</div>
                <div className='w-2/12 flex py-2 px-3 items-center  text-base'>Serial Name</div>
                <div className='w-1/12 flex py-2 px-3 items-center  text-base'>Total cost</div>
                <div className='w-1/12 flex py-2 px-3 items-center  text-base'>Total quantity</div>
                <div className='w-1/12 flex py-2 px-3 items-center  text-base'>Due date</div>
                <div className='w-1/12 flex py-2 px-3 items-center  text-base'>Quantity</div>
                <div className='w-3/12 flex py-2 px-4 items-center  text-base'>Status</div>
            </div>

        </>
    )
}

export default FinancesPurchasesTableHeader;