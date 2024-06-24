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
     

             
              
        
            <div className='flex w-full bg-white h-20  p-4 px-6 mt-6 justify-between border border-solid border-gray-300 border-t-0.5 rounded-tl-lg rounded-tr-lg'>

            <div className='flex  text-gray-500 items-center w-5/12'>
                    <Link className='no-underline flex item-center' href='/finance/purchases/all'>

                        <div className={currentRoute.startsWith("/finance/purchases/all")
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white  rounded-tl-md rounded-bl-md"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500  rounded-tl-md rounded-bl-md"}>All</div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/finance/purchases/order'>

                        <div className={currentRoute.startsWith("/finance/purchases/order")
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"}>Purchase Order</div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/finance/purchases/invoice'>

                        <div className={currentRoute.startsWith("/finance/purchases/invoice")
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"}>Purchase Invoices</div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/finance/purchases/return'>

                        <div className={currentRoute.startsWith("/finance/purchases/return")
                            ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white  rounded-tr-md rounded-br-md"
                            : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500  rounded-tr-md rounded-br-md"}>Purchase Return</div>
                    </Link>
                </div>
<div className='flex items-center'>
    <Link className='no-underline flex item-center mr-4' href='/finance/overview'>

        <div className='flex items-center justify-center border w-7 h-7 border-solid border-gray-300 border-0.5 rounded-md p-1'><Image src={Download} alt='Download' className='w-4  h-4' /></div>
    </Link>
    <Link className='no-underline flex item-center mr-4' href='/finance/overview'>

        <div  className='flex items-center justify-center w-7 h-7 border border-solid border-gray-300 border-0.5 rounded-md  p-1'><Image src={Chart} alt='Chart' className='w-4  h-4' /></div>
    </Link>
    <div className='flex items-center justify-center h-7   mr-4 border border-solid border-gray-300 border-0.5 rounded-lg p-2'>
        <div className='flex '><Image src={Sort} alt='Sort' className='w-3 h-3 mr-2' /></div>

        <Dropdown>
            <DropdownTrigger>
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

    {/* <div className='flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-lg '> */}
      
        <Popover placement="bottom-end" showArrow offset={5}>
            <PopoverTrigger>
                <Button 
                // color="gray-400"
                    variant="solid"
                    className="cursor-pointer capitalize px-4 py-2.5 flex border-none bg-black text-white rounded-lg ">  Create
                    <div className='flex pl-2'><Image src={DownArrow} alt='DownArrow' className='w-4 h-4 ' /></div></Button>
            </PopoverTrigger>
            <PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">
      
                <div className="flex flex-col ">
                   
                    <div className='flex flex-col'>
                    
                    <Link className='no-underline flex item-center' href='/finance/purchases/order'>
                    <div className='text-base p-4   text-white flex '>
                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Purchase Order</div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/finance/purchases/creategrn'>
                    <div className='text-base p-4  text-white flex '>
                    <div className='flex pr-2'><Image src={Return} alt='Return' className='w-5 h-5 ' /></div>Create GRN</div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/finance/purchases/return'>
                    <div className='text-base p-4  text-white flex '>
                    <div className='flex pr-2'><Image src={Return} alt='Return' className='w-5 h-5 ' /></div>Purchase Return</div>
                    </Link>
                  
                    </div>
                </div>
              

            </PopoverContent>
        </Popover>



    {/* </div> */}
</div>
</div >


        </>
    )
}

export default FinancesPurchasesTableHeader;