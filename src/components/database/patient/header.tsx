"use client";
import React from 'react'

import Sort from '../../../assets/icons/finance/sort.svg';
import Filter from '../../../assets/icons/finance/filter.svg';
import Chart from '../../../assets/icons/finance/chart.svg';
import Download from '../../../assets/icons/finance/download.svg';
import DownArrow from '../../../assets/icons/finance/downArrow.svg';

import Update from '../../../assets/icons/inventory/update.svg';
import Add from '../../../assets/icons/inventory/add.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import Popup from './newpatientpopup';
import DownloadPopup from './downloadPatientPopup';


const DatabasePatientHeader = ({ patients, clients }:any) => {
    const currentRoute = usePathname();
    const [showPopup, setShowPopup] = React.useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    const [showPopup1, setShowPopup1] = React.useState(false);
    const togglePopup1 = () => {
        setShowPopup1(!showPopup1);
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
     

             
              
        
     <div className='flex w-full bg-white h-20  p-4 px-6  justify-between border-0 border-b border-solid border-borderGrey rounded-tl-lg rounded-tr-lg'>

            <div className='flex  text-gray-500  items-center'>
                    <div className=' text-base'> Patients</div>
                </div>
<div className='flex items-center'>
<div onClick={togglePopup1} className='cursor-pointer mr-4 flex items-center justify-center border w-7 h-7 border-solid border-gray-300 border-0.5 rounded-md p-1'>
            <Image src={Download} alt='Download' className='w-4  h-4' />
        </div>
    <Link className='no-underline flex item-center mr-4' href='/finance/overview'>

        <div  className='flex items-center justify-center w-7 h-7 border border-solid border-gray-300 border-0.5 rounded-md  p-1'><Image src={Chart} alt='Chart' className='w-4  h-4' /></div>
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
                    className="capitalize border-none bg-transparent rounded-lg z-0"
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
      
        
                    <Button
                    variant="solid"
                    className="capitalize px-4 py-2.5 flex border-none bg-black text-white rounded-lg "  onClick={togglePopup}>
                        <div className='flex'>
                            <Image src={Add} alt='Add' className='w-3 h-3 ' />
                        </div>
                        
                        Add Patients
                    </Button>
            



    {/* </div> */}
</div>
</div >

{showPopup && <Popup onClose={togglePopup} clientData={undefined} />}
{showPopup1 && <DownloadPopup onClose={togglePopup1}  clients={clients} patients={patients} />}

        </>
    )
}

export default  DatabasePatientHeader;