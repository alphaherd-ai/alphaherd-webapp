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

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";




const FinacesOverviewHeader = () => {
   

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
            <div className='flex w-full bg-white  p-5 mt-5 justify-between border border-solid border-gray-300 border-t-0.5 rounded-tl-lg rounded-tr-lg'>

                <div className='flex  sm:text-lg md:text-xl  xl:text-2xl text-gray-500  items-center'>
                    <div>OverView</div>
                </div>
                <div className='flex'>
                    <Link className='no-underline flex item-center' href='/finance/overview'>

                        <div className='flex items-center border border-solid border-gray-300 border-0.5 rounded-md  px-2'><Image src={Download} alt='Download' className='w-4  h-4' /></div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/finance/overview'>

                        <div className='flex items-center border border-solid border-gray-300 border-0.5 rounded-md  px-2 ml-1'><Image src={Chart} alt='Chart' className='w-4  h-4' /></div>
                    </Link>
                    <div className='flex items-center justify-center  ml-1 border border-solid border-gray-300 border-0.5 rounded-lg p-2'>
                        <div className='flex '><Image src={Sort} alt='Sort' className='w-5 h-5 ' /></div>

                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    //   variant="bordered" 
                                    color="gray-400"
                                    variant="solid"
                                    className="capitalize border-none  bg-transparent rounded-lg"
                                >
                                    {selectedSortValue}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Single selection example"
                                color="black"
                                className=" p-2 bg-gray-200 rounded-lg"
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
                        <div className='flex '><Image src={Filter} alt='Filter' className='w-5 h-5 ' /></div>

                        <Dropdown>
                            <DropdownTrigger>
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
                                color="black"
                                className=" p-2 bg-gray-200 rounded-lg"
                                variant="solid"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedCategory}
                                onSelectionChange={setSelectedCategory}
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

                    <div className='flex items-center ml-2 py-1 px-3 bg-black justify-between rounded-lg '>
                        <Popover placement="bottom-end" showArrow offset={10}>
                            <PopoverTrigger>
                                <Button color="gray-400"
                                    variant="solid"
                                    className="capitalize flex border-none bg-black text-white rounded-lg">  Add
                                    <div className='flex'><Image src={DownArrow} alt='DownArrow' className='w-6 h-6 ' /></div></Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 ,t-3">
                                <div className="flex flex-col">
                                    <div className='text-xl '>Sales</div>
                                    <div className='flex flex-col'>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>

                                    <div className='text-lg p-4  pl-0 text-white flex '>
                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-6 h-6 ' /></div>Inverse</div>
                                    </Link>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-lg p-4 pl-0  text-white flex '>
                                    <div className='flex pr-2'><Image src={Return} alt='Return' className='w-6 h-6 ' /></div>Return</div>
                                    </Link>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-lg p-4  pl-0 text-white flex '>
                                    <div className='flex pr-2'><Image src={Return} alt='Return' className='w-6 h-6 ' /></div>Estimate</div>
                                    </Link>
                                
                                    </div>
                                </div>
                                <div className="flex flex-col ">
                                    <div className='text-xl pl-4'>Return</div>
                                    <div className='flex flex-col'>
                                    
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-lg p-4   text-white flex '>
                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-6 h-6 ' /></div>Purchase Order</div>
                                    </Link>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-lg p-4  text-white flex '>
                                    <div className='flex pr-2'><Image src={Return} alt='Return' className='w-6 h-6 ' /></div>Purchase Invoice</div>
                                    </Link>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-lg p-4  text-white flex '>
                                    <div className='flex pr-2'><Image src={Return} alt='Return' className='w-6 h-6 ' /></div>Purchase Return</div>
                                    </Link>
                                  
                                    </div>
                                </div>
                                <div className="flex flex-col h-full justify-between">
                                    <div className="flex flex-col" > 
                                    <div className='text-xl pl-4'>Expense</div>
                                    <div className='flex flex-col'>
                                  
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-lg p-4   text-white flex '>
                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-6 h-6 ' /></div>Record Expense</div>
                                    </Link>
                                    </div>
                                    </div>
                                    <div className="flex flex-col"> 
                                    <div className='text-xl pl-4'>Transcations</div>
                                    <div className='flex flex-col'>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>

                                    <div className='text-lg p-4   text-white flex '>
                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-6 h-6 ' /></div>Record Transcations</div>
                                    </Link></div>
                                   
                                    </div>
                                </div>

                            </PopoverContent>
                        </Popover>



                    </div>
                </div>
            </div >
          

        </>
    )
}

export default FinacesOverviewHeader;