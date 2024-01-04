"use client";
import React from 'react'
import Download from '../../../assets/icons/inventory/Download.svg';
import Graph from '../../../assets/icons/inventory/Graph.svg';
import Category from '../../../assets/icons/inventory/Category.svg';
import LeftArrow from '../../../assets/icons/inventory/LeftArrow.svg';
import Sort from '../../../assets/icons/inventory/Sort.svg';
import DownArrow from '../../../assets/icons/inventory/DownArrow.svg';

import Image from 'next/image';

import Link from 'next/link';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import ProductItem from './productitem';
import ProductDay from './productdate';
import ProductBottombar from './historybottombar';


const ProductHistory = () => {
    const [selectedStatus, setselectedStatus] = React.useState(new Set(["Status: text"]));

    const selectedStatusValue = React.useMemo(
        () => Array.from(selectedStatus).join(", ").replaceAll("_", " "),
        [selectedStatus]
    );

    return (

        <>
            <div className=' px-10   w-full'>
                <div className='flex   mt-10 bg-white py-5  box-border justify-between border border-solid border-gray-300 border-t-0.5 rounded-tl-lg rounded-tr-lg'>

                    <div className='flex text-2xl  pl-5 text-gray-500 items-center'>
                    <Link href="/finance/sales"> <div className='flex items-center  bg-gray-200 rounded-md'><Image src={LeftArrow} alt='Download' className='w-6 h-6' /></div></Link>
                        <div className='ml-2'>Usage History</div>
                        <div className='flex  ml-2'><Image src={Download} alt='Download' className='w-6 h-6 ' /></div>
                    </div>
                    <div className='flex  pr-5'>
                        <div className='flex  pl-2 items-center border border-solid border-gray-300 rounded-lg'><Image src={DownArrow} alt='DownArrow' className='w-6 h-6 pr-1' />

                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        //   variant="bordered" 
                                        color="gray-400"
                                        variant="solid"
                                        className="capitalize border-none p-2  rounded-lg"
                                    >
                                        {selectedStatusValue}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Single selection example"
                                    color="gray-300"
                                    className=" p-2 bg-gray-200 rounded-lg"
                                    variant="solid"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedStatus}
                                    onSelectionChange={setselectedStatus}
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
                    </div>
                </div >
               <ProductDay/>
               <ProductItem/>
               <ProductItem/>
               <ProductItem/>
               <ProductItem/>
               <ProductItem/>
               <ProductItem/>
               <ProductDay/>
               <ProductItem/>
               <ProductItem/>
               <ProductItem/>
               <ProductItem/>
               <ProductItem/>
               <ProductItem/>
               <ProductBottombar/>
            </div>
        </>
    )
}

export default ProductHistory