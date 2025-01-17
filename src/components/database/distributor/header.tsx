"use client";
import React from 'react'

import Sort from '../../../assets/icons/finance/sort.svg';
import Filter from '../../../assets/icons/finance/filter.svg';
import Chart from '../../../assets/icons/finance/chart.svg';
import Download from '../../../assets/icons/finance/download.svg';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

import DownloadPopup from './downloadDistributorPopup';


const DatabaseDistributorHeader = ({ distributors, onSortChange }: any) => {
    const currentRoute = usePathname();

    const [showPopup1, setShowPopup1] = React.useState(false);
    const togglePopup1 = () => {
        setShowPopup1(!showPopup1);
    }

    const [selectedCategory, setSelectedCategory] = React.useState(new Set(["Category: text"]));
   // const [selectedSort, setselectedSort] = React.useState(new Set(["Category: text"]));
    const [selectedSort, setSelectedSort] = React.useState("distributorName");
    const [sortOrder, setSortOrder] = React.useState("asc");


    const selectedCategoryValue = React.useMemo(
        () => Array.from(selectedCategory).join(", ").replaceAll("_", " "),
        [selectedCategory]
    );
    // const selectedSortValue = React.useMemo(
    //     () => Array.from(selectedSort).join(", ").replaceAll("_", " "),
    //     [selectedSort]
    // );
    const handleSortChange = (key: string) => {
        if (key === selectedSort) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSelectedSort(key);
            setSortOrder("asc");
        }

        onSortChange(key, sortOrder);
    };

    return (

        <>





<div className='flex w-full bg-white h-20  p-4 px-6  justify-between border-0 border-b border-solid border-borderGrey rounded-tl-lg rounded-tr-lg'>

                <div className='flex  text-gray-500  items-center'>
                    <div className=' text-base'>Distributors</div>
                </div>
                <div className='flex items-center'>
                    <div onClick={togglePopup1} className='cursor-pointer mr-4 flex items-center justify-center border w-7 h-7 border-solid border-gray-300 border-0.5 rounded-md p-1'>
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
                               <DropdownItem
                                    className="p-2 text-base"
                                    key="name"
                                    onClick={() => handleSortChange("distributorName")}
                                >
                                    Distributor Name
                                </DropdownItem>
                                
                                <DropdownItem
                                    className="p-2 text-base"
                                    key="date"
                                    onClick={() => handleSortChange("date")}
                                >
                                    Date
                                </DropdownItem>
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
                </div>
            </div >
            
            {showPopup1 && <DownloadPopup onClose={togglePopup1}  distributors={distributors} />}


        </>
    )
}

export default DatabaseDistributorHeader;