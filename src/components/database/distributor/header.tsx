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
                   
                    <div className='flex items-center justify-center h-7   mr-4 border border-solid border-gray-300 border-0.5 rounded-lg p-2 bg-[#35BEB1]'>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5276 11.3892L11.0052 14.9022L7.47543 11.3725L8.40153 10.437L10.345 12.3805L10.345 1.75511L11.6747 1.75511L11.6747 12.3805L13.6015 10.4536L14.5276 11.3892ZM8.54357 4.61091L7.61747 5.53701L5.69067 3.61021L5.69067 14.2356L4.36093 14.2356L4.36093 3.61021L2.40803 5.55367L1.48193 4.62757L5.02108 1.08844L8.54357 4.61091Z" fill="white" />
                        </svg>

                        <Dropdown>
                            <DropdownTrigger className='z-0'>
                                <Button
                                    variant="solid"
                                    className="capitalize border-none bg-transparent rounded-lg text-white"
                                >
                                    <span style={{ fontFamily: 'Satoshi', fontWeight: 500, fontSize: '14px', lineHeight: '18.9px', color: '#FFFFFF' }}>Sort By</span>
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
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.77561 12L4 11.2244L7.22439 8L4 4.77561L4.77561 4L8 7.22439L11.2244 4L12 4.77561L8.77561 8L12 11.2244L11.2244 12L8 8.77561L4.77561 12Z" fill="white" />
                        </svg>
                    </div>

                    
                </div>
            </div >

            {showPopup1 && <DownloadPopup onClose={togglePopup1} distributors={distributors} />}


        </>
    )
}

export default DatabaseDistributorHeader;