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

function useServicefetch (id: string | null,branchId:number|null) {
    const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/${id}?branchId=${branchId}`,fetcher,{revalidateOnFocus:true});
   return {
    fetchedProduct:data,
    isLoading,
    error
   }
}

  const ServiceDetails = () => {
    const [service, setService] = useState<any | null>(null);
    const url = useSearchParams();
    const id = url.get('id');
    const appState = useAppSelector((state) => state.app)
    const{fetchedProduct,isLoading,error}=useServicefetch(id,appState.currentBranchId);
    const [value, setValue] = useState(30);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    useEffect(() => {
        if(!error&&!isLoading&&fetchedProduct){
          setService(fetchedProduct);
        }
      },[fetchedProduct,error,isLoading]
    );

    return <>
        <div className="w-full h-full relative  rounded-[20px] pr-[16px] pl-[16px] z-1">
            <div className="w-full flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-11 h-11  rounded-[5px] border border-neutral-400 flex justify-center items-center ">
                        <Link className='no-underline h-full  ml-4' href='inventory/services/timeline'>
                            <div className='flex items-center border border-solid border-gray-300 bg-white rounded-lg p-3  '>   <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back"></Image></div>
                        </Link>
                    {/* </div> */}
                    <div className="text-textGrey2 text-[28px] font-bold p-2">
                        {service?.name}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    

                        <Popover placement="bottom" showArrow offset={10}>
                            <PopoverTrigger>
                                <Button
                                    variant="solid"
                                    className="capitalize flex w-12 h-12 py-2.5  rounded-[5px] text-textGrey2 border border-solid border-borderGrey">
                                    {/* <div className='w-12 h-12 py-2.5  rounded-[5px] border border-solid border-borderGrey justify-center items-center gap-2 flex'>    */}
                                        <Image src={optionicon} alt="option"></Image>
                                        {/* </div> */}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-5 text-textGrey2 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">

                                <div className="flex flex-col ">
                                    <div className='flex flex-col'>
                                        <Link className='no-underline flex item-center' href='/finance/overview'>
                                            <div className='text-textGrey2 text-sm p-3 font-medium flex '>
                                                Edit</div>
                                        </Link>
                                        <Link className='no-underline flex item-center' href='/finance/overview'>
                                            <div className='text-textGrey2 text-sm p-3 font-medium flex '>
                                                Delete</div>
                                        </Link>                                        
                                    </div>
                                </div>

                            </PopoverContent>
                        </Popover>
                    
                </div>
            </div>

            <div className="w-full mt-[25px] pt-8 bg-white rounded-[10px] border border-solid border-borderGrey flex-col justify-start items-start gap-8 flex">
                <div className="w-full px-6 justify-start items-center gap-8 flex">
                    <div className="w-40 text-textGrey2 text-[20px] font-bold ">
                        Description
                    </div>                   
                </div>
                <div className="w-full px-6 justify-start items-center gap-8 flex">
                    <div className="w-full rounded-[10px] flex items-center text-textGrey2">
                        {service?.description}
                    </div>            
                </div>
                <div className="w-full justify-start items-start flex rounded-[10px]">
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0  border-r border-borderGrey flex-col justify-center items-start rounded-b-xl gap-4 flex ">
                        <div className="text-textGrey2 text-[28px] font-bold ">₹899</div>
                        <div className="text-textGrey2 text-base font-medium ">Service Charge</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-r border-borderGrey flex-col justify-center items-start gap-4 flex">
                        <div className="text-textGrey2 text-[28px] font-bold ">₹32,499</div>
                        <div className="text-textGrey2 text-base font-medium ">Total Sales</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-r border-borderGrey flex-col justify-center items-start gap-4 flex">
                        <div className="text-textGrey2 text-[28px] font-bold ">₹499</div>
                        <div className="text-textGrey2 text-base font-medium ">Avg. Cost of products used</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-borderGrey flex-col justify-center items-start gap-4 flex rounded-b-xl">
                        <div className="text-textGrey2 text-[28px] font-bold ">19%</div>
                        <div className="text-textGrey2 text-base font-medium ">Average Profit Margin</div>
                    </div>
                </div>
            </div>
            <div className="w-full flex gap-6">
                <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border  border-solid border-borderGrey flex-col justify-center items-start flex">
                    <div className="w-full border-b border-solid border-0 border-borderGrey">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-textGrey2 text-base font-medium ">SAC Code: </div>
                            <div className="text-textGrey2 text-base font-medium ">{service?.sacCode}</div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-borderGrey flex  gap-8">
                        <div className="w-6/12 p-6 border-r border-solid border-0 border-borderGrey flex-col items-center justify-between">
                            <div className="text-textGrey2 text-base font-medium ">Categories</div>
                            <div className="w-[114px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-green-600 text-sm font-medium ">{service?.category}</div>
                            </div>
                        </div>
                        <div className="w-6/12 p-6 flex-col items-center justify-between">
                            <div className="text-textGrey2 text-base font-medium ">Dispensing Fee</div>
                            <div className="w-[66px] h-7 px-2 py-1.5 bg-orange-50 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-orange-500 text-sm font-medium ">{service?.sellingPrice}</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-borderGrey">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-textGrey2 text-base font-medium ">Tax Rate:</div>
                            <div className="px-2 py-1.5 bg-gray-100 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-textGrey2 text-base font-medium ">{service?.tax} %</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-textGrey2 text-base font-medium ">Providers:</div>
                            <div className="px-2 py-1.5 bg-gray-100 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-textGrey2 text-base font-medium ">{service?.providers}</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border border-solid border-borderGrey flex  flex-col">
                    <div className="w-full flex p-6 items-start justify-between border-0 border-b  border-solid border-borderGrey">                        
                            <div className="text-textGrey2 text-xl font-medium ">
                                Service History
                            </div>
                            <div className="flex gap-2">
                                <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid  border-borderGrey justify-start items-center gap-2 flex">
                                    <Image src={downloadicon} alt="download" className="w-5 h-5"/>
                                </div>
                                <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid border-borderGrey justify-start items-center gap-2 flex">
                                    <Image src={baricon} alt="baricon" className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </div>
                        {/* <div className="w-full max-h-[400px] overflow-y-auto">
                            Code for service history items
                        </div> */}
                    </div>
                </div>
            <div className="rounded-md">
                <div className="w-full mt-[25px] rounded-[10px] border-borderGrey border border-solid  border-neutral-40  ">
                <div className="w-full flex p-6 bg-white items-start justify-between w-full border-0 border-b border-solid border-borderGrey rounded-md">
                        <div className="text-textGrey2 text-xl font-medium ">
                            Product List
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-evenly  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-borderGrey text-textGrey2'>
                            <div className='flex text-textGrey2 text-base font-medium px-6 w-1/7'>Product</div>
                            <div className='flex text-textGrey2 text-base font-medium px-6 w-1/7'>Item Quantity</div>
                            <div className='flex text-textGrey2 text-base font-medium px-6 w-1/7'>Batch Number</div>
                            <div className='flex text-textGrey2 text-base font-medium px-6 w-1/7'>Expiry Date</div>
                            <div className='flex text-textGrey2 text-base font-medium px-6 w-1/7'>Cost Price</div>
                            <div className='flex text-textGrey2 text-base font-medium px-6 w-1/7'>Selling Price</div>
                            <div className='flex text-textGrey2 text-base font-medium px-6 w-1/7'>Stock Level</div>
                        </div>
                    
                        
                        {/* <div key={item.id} className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                            <div className='w-1/12 px-6 flex items-center text-textGrey2 text-base font-medium'>{item.name} Strips</div>
                            <div className='w-1/12 px-6 flex items-center text-textGrey2 text-base font-medium'>quantity</div>
                            <div className='w-1/12 px-6 flex items-center text-textGrey2 text-base font-medium'>{item.batchNumber}</div>
                            <div className='w-1/12 px-6 flex items-center text-textGrey2 text-base font-medium'>{formatDateAndTime(item.expiry).formattedDate}</div>
                            <div className='w-1/12 px-6 flex items-center text-textGrey2 text-base font-medium'>{item.hsnCode}</div>
                            <div className='w-1/12 px-6 flex items-center text-textGrey2 text-base font-medium'>{item.costPrice}</div>
                            <div className='w-1/12 px-6 flex items-center text-textGrey2 text-base font-medium'>₹399</div>                            
                        </div> */}
                        
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ServiceDetails;


