"use client";
import React, { useState } from 'react'

import Sort from '../../../../assets/icons/finance/sort.svg';
import Filter from '../../../../assets/icons/finance/filter.svg';
import Chart from '../../../../assets/icons/finance/chart.svg';
import Download from '../../../../assets/icons/finance/download.svg';
import DownArrow from '../../../../assets/icons/finance/downArrow.svg';
import Invoice from '../../../../assets/icons/finance/invoice.svg';
import Return from '../../../../assets/icons/finance/Return.svg';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
import Loading from '@/app/loading';
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import FilterDropdwonCard from './FilterDropdowmCard';
import DownloadPopup from './downloadTimeline';



const FinacesOverviewTableHeader = ({timeline}:any) => {
    const appState=useAppSelector((state)=>state.app);
    const {data, isLoading, error} = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/getAll?branchId=${appState.currentBranchId}`, fetcher,{revalidateOnFocus:true});

    

    const [showPopup1, setShowPopup1] = React.useState(false);
    const togglePopup1 = () => {
        setShowPopup1(!showPopup1);
    }

    return (

        <>
            <div className='flex w-full bg-white h-20  p-4 px-6  justify-between border-0 border-b border-solid border-borderGrey rounded-tl-lg rounded-tr-lg'>

                <div className='flex  text-gray-500  items-center'>
                    <div className=' text-base'>Finance Timeline</div>
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

                        {/* <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    //   variant="bordered" 
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
                        </Dropdown> */}
                    </div>
                    <div className='flex items-center  h-7  p-2 mr-4 border border-solid border-gray-300 border-0.5 rounded-lg '>
                        <div className='flex '><Image src={Filter} alt='Filter' className='w-3 h-3 mr-2' /></div>

                        <Popover>
                            <PopoverTrigger>
                                <Button
                                    variant="solid"
                                    className="capitalize border-none bg-transparent rounded-lg"
                                >
                                    Filter
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                 <FilterDropdwonCard />
                            </PopoverContent>
                        </Popover>
                    </div>

                      
                        <Popover placement="bottom-end" showArrow offset={10}>
                            <PopoverTrigger>
                                <Button 
                                    variant="solid"
                                    className="capitalize flex border-none bg-black text-white rounded-lg px-4 py-3">  Add
                                    <div className='flex pl-2'><Image src={DownArrow} alt='DownArrow' className='w-4 h-4 ' /></div></Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">
                                <div className="flex flex-col">
                                    <div className='text-xl '>Sales</div>
                                    <div className='flex flex-col'>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>

                                    <div className='text-base p-4  pl-0 text-white flex '>
                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Inverse</div>
                                    </Link>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-base p-4 pl-0  text-white flex '>
                                    <div className='flex pr-2'><Image src={Return} alt='Return' className='w-5 h-5 ' /></div>Return</div>
                                    </Link>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-base p-4  pl-0 text-white flex '>
                                    <div className='flex pr-2'><Image src={Return} alt='Return' className='w-5 h-5 ' /></div>Estimate</div>
                                    </Link>
                                
                                    </div>
                                </div>
                                <div className="flex flex-col ">
                                    <div className='text-xl pl-4'>Return</div>
                                    <div className='flex flex-col'>
                                    
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-base p-4   text-white flex '>
                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Purchase Order</div>
                                    </Link>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-base p-4  text-white flex '>
                                    <div className='flex pr-2'><Image src={Return} alt='Return' className='w-5 h-5 ' /></div>Purchase Invoices (GRN)</div>
                                    </Link>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-base p-4  text-white flex '>
                                    <div className='flex pr-2'><Image src={Return} alt='Return' className='w-5 h-5 ' /></div>Purchase Return</div>
                                    </Link>
                                  
                                    </div>
                                </div>
                                <div className="flex flex-col h-full justify-between">
                                    <div className="flex flex-col" > 
                                    <div className='text-xl pl-4'>Expense</div>
                                    <div className='flex flex-col'>
                                  
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-base p-4   text-white flex '>
                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Record Expense</div>
                                    </Link>
                                    </div>
                                    </div>
                                    <div className="flex flex-col"> 
                                    <div className='text-xl pl-4'>Transcations</div>
                                    <div className='flex flex-col'>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>

                                    <div className='text-base p-4   text-white flex '>
                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Record Transcations</div>
                                    </Link></div>
                                   
                                    </div>
                                </div>

                            </PopoverContent>
                        </Popover>



                </div>
            </div >
          
            {showPopup1 && <DownloadPopup onClose={togglePopup1} timeline={timeline}  />}
        </>
    )
}

export default FinacesOverviewTableHeader;