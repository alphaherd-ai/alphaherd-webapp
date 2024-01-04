"use client";
import React from 'react'
import Download from '../../../assets/icons/inventory/Download.svg';
import Graph from '../../../assets/icons/inventory/Graph.svg';
import Category from '../../../assets/icons/inventory/Category.svg';

import Sort from '../../../assets/icons/inventory/Sort.svg';
import Upload from '../../../assets/icons/inventory/ImageUpload.svg';
import Newservice from '../../../assets/icons/inventory/Newservice.svg';
import Reconcile from '../../../assets/icons/inventory/Reconcile.png';
import Image from 'next/image';
import {Popover, PopoverTrigger, PopoverContent,Input} from "@nextui-org/react";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";





const TableTopbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const content = (
      <PopoverContent className=" w-full h-screen flex  backdrop-filter backdrop-blur-sm">
        
            <div className='w-1/2 h-1/2 bg-white rounded-lg p-2'>
          <div className="flex flex-col w-full">
          <div className='flex justify-end items-end '></div>
          <div className='flex flex-col py-2 px-3 text-xs w-full '><div className='text-lg mb-1'>Add Product</div><div>Stockpile Your Veterinary Essentials!</div> </div>
            {/* <div className="flex  py-2 px-3 text-xs w-full">
          <div><Image src={Upload} alt='Upload' className='w-24 h-24' /></div>
          <div> rjfveht</div>
        
            </div> */}
          </div>
          </div>
        
      </PopoverContent>
    )
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
            <div className='flex w-full bg-white  p-5 justify-between border border-solid border-gray-300 border-t-0.5 rounded-tl-lg rounded-tr-lg'>

                <div className='flex text-2xl text-gray-500'>
                    <div>Products</div>
                    <div className='flex items-center pl-2'><Image src={Download} alt='Download' className='w-5 h-5' /></div>
                </div>
                <div className='flex'>
                    <div className='flex items-center border border-solid border-gray-300 border-0.5 rounded-lg'><Image src={Graph} alt='Graph' className='w-7  h-5' /></div>
                    <div className='flex items-center  ml-2 p-1 border border-solid border-gray-300 border-0.5 rounded-lg'>
                        <div className='flex  pl-2'><Image src={Sort} alt='Sort' className='w-4 h-4 pr-1' /></div>

                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    //   variant="bordered" 
                                    color="gray-400"
                                    variant="solid"
                                    className="capitalize border-none p-2  rounded-lg"
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
                    <div className='flex items-center  ml-2 p-1 border border-solid border-gray-300 border-0.5 rounded-lg'>
                        <div className='flex  pl-2'><Image src={Category} alt='Category' className='w-4 h-4 pr-1' /></div>

                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    //   variant="bordered" 
                                    color="gray-400"
                                    variant="solid"
                                    className="capitalize border-none p-2  rounded-lg"
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
                    <div className='flex items-center ml-2 p-2 pl-3 pr-3 bg-black justify-between rounded-lg'>
                        
                        <div className="flex flex-wrap gap-4">
      
        <Popover
          key="blur"
          showArrow
          offset={0}
          placement="top-start"
          backdrop="blur" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <PopoverTrigger>
            <Button color="warning" variant="flat" className="capitalize bg-black border-none">
            <div className='flex items-center'><div><Image src={Newservice} alt='Newservice' className='w-5 h-5 pr-1' /></div>
                        <div className='text-white'>New Product</div>
                        </div>
            </Button>
          </PopoverTrigger>
          <div className='w-full'>
          {content}
          </div>
        </Popover>
      
    </div>
    </div>      
                    <div className='flex items-center ml-2 p-2 pl-3 pr-3 bg-black justify-between rounded-lg'>
                        <div className='flex'><Image src={Reconcile} alt='Reconcile' className='w-5 h-5 pr-1' /></div>
                        <div className='text-white  '> Reconcile</div>
                    </div>
                </div>
            </div >
            <div className='flex  w-full  box-border bg-gray-200 border border-solid border-gray-300 border-t-0.5 text-gray-500'>
                <div className='w-1/6 flex py-2 px-3 items-center  text-2xl'>Date</div>
                <div className='w-1/6 flex py-2 px-3 items-center  text-2xl'>Itme type</div>
                <div className='w-1/6 flex py-2 px-3 items-center  text-2xl'>Time</div>
                <div className='w-1/6 flex py-2 px-3 items-center  text-2xl'>Item Name</div>
                <div className='w-1/6 flex py-2 px-3 items-center  text-2xl'>Quantity</div>
                <div className='w-1/6 flex py-2 px-3 items-center  text-2xl'>Quantity</div>
            </div>

        </>
    )
}

export default TableTopbar