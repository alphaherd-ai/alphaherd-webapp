"use client"
import Image from "next/image"
import Link from "next/link"
import lefticon from "../../../../assets/icons/inventory/left_icon.svg"
import aiicon from "../../../../assets/icons/inventory/Group 2749.svg"
import infoicon from "../../../../assets/icons/inventory/Icons16.svg"
import addicon from "../../../../assets/icons/inventory/bar_chart.svg"
import optionicon from "../../../../assets/icons/inventory/more_vert.svg"
import downloadicon from "../../../../assets/icons/inventory/1. Icons-24.svg"
import baricon from "../../../../assets/icons/inventory/bar_chart.svg"
import expandicon from "../../../../assets/icons/inventory/expand_content.svg"
import tuneicon from "../../../../assets/icons/inventory/bar_chart.svg"
import downarrow from "../../../../assets/icons/inventory/Icons16.svg"
import optionarrow from "../../../../assets/icons/inventory/more_vert.svg"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import formatDateAndTime from "@/utils/formateDateTime";
import Slider from '@mui/material/Slider';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation"
import { response } from "express"
import { useAppSelector } from "@/lib/hooks"
import useSWR from "swr"
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())

function useClientfetch (id: string | null,branchId:number|null) {
    const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/client/${id}?branchId=${branchId}`,fetcher,{revalidateOnFocus:true});
   return {
    fetchedProduct:data,
    isLoading,
    error
   }
}

  const ClientDetails = () => {
    const [client, setClient] = useState<any | null>(null);
    const [batches, setBatches] = useState<any[]>([]);
    const [inventory, setInventory] = useState<any[]>([]);
    const url = useSearchParams();
    const id = url.get('id');
    const appState = useAppSelector((state) => state.app)
    
    return <>
        <div className="w-full h-full relative bg-gray-200 rounded-[20px] pr-[16px] pl-[16px] z-1">
            <div className="flex items-center justify-between">
                <div className="flex">
                    <div className="w-11 h-11  rounded-[5px] border border-neutral-400 flex justify-center items-center mr-16">
                        <Link className='no-underline h-full  ml-4' href='/database/clients'>
                            <div className='flex items-center border border-solid border-gray-300 bg-white rounded-lg p-3  '>   <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back"></Image></div>
                        </Link>

                    </div>
                    <div className="text-gray-500 text-[28px] font-bold ">
                        Suzi
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-12 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-center items-center gap-2 flex">
                        <div>
                            <Image src={addicon} alt="add"></Image>
                        </div>
                        <div className="text-white text-base font-bold ">
                            Update Stock Level
                        </div>
                    </div>
                    <div className=' '>
                        <Popover placement="left" showArrow offset={10}>
                            <PopoverTrigger>
                                <Button
                                    variant="solid"
                                    className="capitalize flex border-none  text-gray rounded-lg ">
                                    <div className='w-12 h-12 px-[11px] py-2.5 bg-white rounded-[5px] border border-solid border-stone-300 justify-center items-center gap-2 flex'>   <Image src={optionicon} alt="option"></Image></div></Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-5 text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">

                                <div className="flex flex-col ">
                                    <div className='flex flex-col'>
                                        <Link className='no-underline flex item-center' href='/finance/overview'>
                                            <div className='text-gray-500 text-sm p-3 font-medium flex '>
                                                Edit</div>
                                        </Link>
                                        <Link className='no-underline flex item-center' href='/finance/overview'>
                                            <div className='text-gray-500 text-sm p-3 font-medium flex '>
                                                Delete</div>
                                        </Link>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>

            <div className="w-full mt-[25px] pt-8 bg-white rounded-[10px] border border-solid border-neutral-400 flex-col justify-start items-start gap-8 flex">
                <div className="w-full px-6 justify-start items-center gap-8 flex">
                    <div className="w-40 text-gray-500 text-[28px] font-bold ">
                        abc
                    </div>
                    
                </div>
                <div className="w-full justify-start items-start flex rounded-[10px]">
                    <div className="w-4/12 p-6 bg-white border-t border-solid border-0 border-r border-stone-300 flex-col justify-center items-start rounded-b-xl gap-4 flex ">
                        <div className="text-gray-500 text-[28px] font-bold ">₹124</div>
                        <div className="text-gray-500 text-base font-medium ">Avg. Selling price</div>
                    </div>
                    <div className="w-4/12 p-6 bg-white border-t border-solid border-0 border-r border-stone-300 flex-col justify-center items-start gap-4 flex">
                        <div className="text-gray-500 text-[28px] font-bold ">₹124</div>
                        <div className="text-gray-500 text-base font-medium ">Avg. Selling price</div>
                    </div>
                    <div className="w-4/12 p-6 bg-white border-t border-solid border-0 border-stone-300 flex-col justify-center items-start gap-4 flex rounded-b-xl">
                        <div className="text-gray-500 text-[28px] font-bold ">₹124</div>
                        <div className="text-gray-500 text-base font-medium ">Avg. Selling price</div>
                    </div>
                </div>
            </div>
            <div className="w-full flex gap-6">
                <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border  border-solid border-neutral-400 flex-col justify-center items-start flex">
                    <div className="w-full border-b border-solid border-0 border-stone-300">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-neutral-400 text-base font-medium ">Address:</div>
                            <div className="text-gray-500 text-base font-medium ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus iste recusandae excepturi ipsam reprehenderit ipsa. </div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-stone-300">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-neutral-400 text-base font-medium ">Email:</div>
                            <div className="text-gray-500 text-base font-medium ">abc@gmail.com</div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-stone-300">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-neutral-400 text-base font-medium ">Phone Number:</div>
                            <div className="text-gray-500 text-base font-medium ">987654321</div>
                        </div>
                    </div>
                </div>
                <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border border-solid border-0 border-neutral-400 flex-col justify-center flex">
                    <div className="w-full border-b border-solid border-0 border-stone-300 flex items-start justify-between">
                        <div className="p-6 flex items-start justify-between w-full">
                            <div className="text-gray-500 text-xl font-medium ">
                                Ledger
                            </div>
                            <div className="flex gap-2">
                                <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid  border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={downloadicon} alt="download" className="w-5 h-5"/>
                                </div>
                                <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={baricon} alt="baricon" className="w-5 h-5" />
                                </div>
                                <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid  border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={expandicon} alt="expandicon" className="w-5 h-5" />
                                </div>
                                <div className=" h-7 p-2 bg-white rounded-[5px] border border-solid  border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={tuneicon} alt="tuneicon" className="w-5 h-5" />
                                    <div className="text-neutral-400 text-sm font-medium ">
                                        Filter by
                                    </div>
                                </div>
                                <div className=" h-7 p-2 bg-white rounded-[5px] border border-solid border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={downarrow} alt="downarrow" className="w-5 h-5" />
                                    <div className="text-neutral-400 text-sm font-medium ">
                                        Status: All
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-h-[400px] overflow-y-auto">
                            {inventory?.map(item => (
                                <div key={item.id} className="w-full border-b border-solid border-0 border-stone-300 flex items-start justify-between">
                                    <div className="w-full flex p-6">
                                        <div className="w-full flex items-center justify-between">
                                            <div className="text-neutral-400 text-base font-medium w-1/12 mr-10">
                                                {formatDateAndTime(item.createdAt).formattedDate}
                                            </div>
                                            <div className="w-[69px] text-neutral-400 text-base font-medium w-1/12">
                                                {formatDateAndTime(item.createdAt).formattedTime}
                                            </div>
                                            <div className="text-gray-500 text-base font-medium w-1/12 ml-10">
                                                {item.quantityChange} Strips
                                            </div>
                                            <div className="w-15 h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex w-2/12 ml-10">
                                                <div className="text-green-600 text-sm font-medium ">
                                                    {item.stockChange}
                                                </div>
                                            </div>
                                            <div className="text-neutral-400 text-base font-medium w-1/12 ml-10">
                                                {item.batchNumber}
                                            </div>
                                            <div className="text-neutral-400 text-base font-medium w-1/12">
                                                {item.party}
                                            </div>
                                            <div className="text-teal-400 text-base font-medium  underline w-2/12">
                                                {item.invoiceType}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            </div>
            <div className="rounded-md">
                <div className="w-full mt-[25px] rounded-md border-neutral-400 border border-solid  border-neutral-40  ">
                    <div className="w-full h-[72px] px-6 py-4 bg-white border-b border-solid border-0 border-neutral-400 justify-start items-center gap-4 flex">
                        <div className="text-gray-500 text-xl font-medium ">
                            Patients
                        </div>
                    </div>
                    <div>
                        <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'>Name</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'>Species</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'>Breed</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'>Age</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'>Sex</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'></div>
                        </div>
                    
                        {/* {batches.map(item=>(
                        <div key={item.id} className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                            <div className='w-1/6 px-6 flex items-center text-neutral-400 text-base font-medium'>{item.quantity} Strips</div>
                            <div className='w-1/6 px-6 flex items-center text-neutral-400 text-base font-medium'>providers</div>
                            <div className='w-1/6 px-6 flex items-center text-neutral-400 text-base font-medium'>{item.batchNumber}</div>
                            <div className='w-1/6 px-6 flex items-center text-neutral-400 text-base font-medium'>{formatDateAndTime(item.expiry).formattedDate}</div>
                            <div className='w-1/6 px-6 flex items-center text-neutral-400 text-base font-medium'>{item.hsnCode}</div>
                            <div className='w-1/6 px-6 flex items-center text-neutral-400 text-base font-medium'>{item.costPrice}</div>
                        </div>
                        ))} */}
                    </div>
                </div>
            </div>
            <div className="rounded-md">
                <div className="w-full mt-[25px] rounded-md border-neutral-400 border border-solid  border-neutral-40  ">
                    <div className="w-full h-[72px] px-6 py-4 bg-white border-b border-solid border-0 border-neutral-400 justify-start items-center gap-4 flex">
                        <div className="text-gray-500 text-xl font-medium ">
                            Timeline
                        </div>
                    </div>
                    <div>
                        <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/8'>Quantity</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/8'>Distributor</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/8'>Batch Number</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/8'>Expiry Date</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/8'>Code</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/8'>Cost per item</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/8'>MRP</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-2/8'>Selling Price</div>
                        </div>
                    
                        {/* {batches.map(item=>(
                        <div key={item.id} className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                            <div className='w-1/8 px-6 flex items-center text-neutral-400 text-base font-medium'>{item.quantity} Strips</div>
                            <div className='w-1/8 px-6 flex items-center text-neutral-400 text-base font-medium'>providers</div>
                            <div className='w-1/8 px-6 flex items-center text-neutral-400 text-base font-medium'>{item.batchNumber}</div>
                            <div className='w-1/8 px-6 flex items-center text-neutral-400 text-base font-medium'>{formatDateAndTime(item.expiry).formattedDate}</div>
                            <div className='w-1/8 px-6 flex items-center text-neutral-400 text-base font-medium'>{item.hsnCode}</div>
                            <div className='w-1/8 px-6 flex items-center text-neutral-400 text-base font-medium'>{item.costPrice}</div>
                            <div className='w-1/8 px-6 flex items-center text-neutral-400 text-base font-medium'>₹399</div>
                        </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ClientDetails;


