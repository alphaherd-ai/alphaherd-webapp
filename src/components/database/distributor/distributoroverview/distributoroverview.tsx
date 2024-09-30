"use client"
import Image from "next/image"
import Link from "next/link"
import lefticon from "../../../../assets/icons/inventory/left_icon.svg"
import righticon from "../../../../assets/icons/finance/right_icon.svg"
import icn_icon from "../../../../assets/icons/finance/inc_icon.svg"
import optionicon from "../../../../assets/icons/inventory/more_vert.svg"
import downloadicon from "../../../../assets/icons/inventory/1. Icons-24.svg"
import baricon from "../../../../assets/icons/inventory/bar_chart.svg"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import formatDateAndTime from "@/utils/formateDateTime";
import selecttab from "../../../../assets/icons/finance/SelectedTab.svg"
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation"
import { response } from "express"
import { useAppSelector } from "@/lib/hooks"
import useSWR from "swr"
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())

  const DistributorDetails = () => {
    const [distributor, setDistributor] = useState<any | null>(null);
    const [clickedIndex, setClickedIndex] = useState(0);
    const url = useSearchParams();
    const id = url.get('id');
    const appState = useAppSelector((state) => state.app)
    const{fetchedDistributor,isLoading,error}=useDistributorfetch(id,appState.currentBranchId);

    function useDistributorfetch (id: string | null,branchId:number|null) {
        const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/${id}?branchId=${branchId}`,fetcher,{revalidateOnFocus:true});
        return {
        fetchedDistributor:data,
        isLoading,
        error
       }
    }

    // console.log(distributor);

    const tabs = [
        { label: 'Day', clicked: clickedIndex === 0 },
        { label: 'Week', clicked: clickedIndex === 1 },
        { label: 'Month', clicked: clickedIndex === 2 },
        { label: 'Quarter', clicked: clickedIndex === 3 },
        { label: 'Year', clicked: clickedIndex === 4 },
        { label: 'All Time', clicked: clickedIndex === 5 }
    ];

    const handleTabClick = (index:any) => {
        setClickedIndex(index);
    };

    useEffect(() => {
        if(!error&&!isLoading&&fetchedDistributor){
          setDistributor(fetchedDistributor);
        }
      },[fetchedDistributor,error,isLoading]
    );
     

    return <>
        <div className="w-full h-full relative rounded-[20px] pr-[16px] pl-[16px] z-1">
            <div className="flex items-center justify-between">
                <div className="flex gap-8">
                    <div className="w-11 h-11  rounded-[5px] border border-borderGrey flex justify-center items-center ">
                        <Link className='no-underline h-full  ml-4' href='/database/distributor'>
                            <div className='flex items-center border border-solid border-borderGrey bg-white rounded-lg p-3  '>   <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back"></Image></div>
                        </Link>
                    </div>
                    <div className="text-textGrey2 text-[28px] font-bold p-2">
                        {distributor?.distributorName}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                        <Popover placement="left" showArrow offset={10}>
                            <PopoverTrigger>
                                <Button
                                    variant="solid"
                                    className="capitalize flex border-none  text-gray rounded-lg ">
                                    <div className='w-12 h-12 px-[11px] py-2.5 bg-white rounded-[5px] border border-solid border-borderGrey justify-center items-center gap-2 flex'>   <Image src={optionicon} alt="option"></Image></div></Button>
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

            <div className="w-full mt-[24px] bg-white rounded-[10px] border border-solid border-borderGrey flex-col justify-start items-start flex">
                <div className="flex w-full px-[24px] rounded-[10px] py-[16px] h-14 bg-white justify-between items-center">
                    <div className="h-6 justify-start items-center gap-4 inline-flex">
                        <div className="flex">
                            <Image className="w-6 h-6 " src={lefticon} alt="left_icon" />
                            <Image className="w-6 h-6 " src={righticon} alt="right_icon" />
                        </div>
                        <div className="text-textGrey2 text-sm font-medium ">
                            July 17th - 23rd, 2023
                        </div>
                    </div>
                    <div className="flex h-[19px] justify-start items-start gap-6">
                        {tabs.map((tab, index) => (
                            <button className="border-none bg-transparent" onClick={() => handleTabClick(index)} key={index}>
                                <div className={`${tab.clicked ? "text-center text-teal-400 font-bold" : "text-textGrey1"} text-textGrey1 text-sm font-medium `}>
                                    {tab.label}
                                </div>
                                {tab.clicked && <Image src={selecttab} alt="icon" />}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-full justify-start items-start flex rounded-[10px]">
                    <div className="w-4/12 p-6 bg-white border-t border-solid border-0  border-r border-borderGrey flex-col justify-center items-start rounded-b-xl gap-4 flex ">
                        <div className="text-textGrey2 text-[28px] font-bold ">₹1,200</div>
                        <div className="text-textGrey2 text-base font-medium ">Total Balance Due</div>
                        <div className="w-[80px] h-7 px-2 py-1.5 bg-orange-50 rounded-[5px] justify-center items-center inline-flex ">   
                            <div className="text-orange-500 text-sm font-medium ">You owe</div>
                            <div className="text-orange-500 text-sm font-medium "></div>
                        </div>
                    </div>
                    <div className="w-4/12 p-6 bg-white border-t border-solid border-0 border-r border-borderGrey flex-col justify-center items-start gap-4 flex">
                        <div className="text-textGrey2 text-[28px] font-bold ">₹32,499</div>
                        <div className="text-textGrey2 text-base font-medium ">Money In</div>
                        <div className="w-[150px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex ">
                                    <Image className="w-4 h-4 " src={icn_icon} alt="inc"></Image>
                                    <div className="text-green-600 text-sm font-medium ">12.4%</div>
                                    <div className="text-green-600 text-sm font-medium ">this week</div>
                        </div>
                    </div>
                    <div className="w-4/12 p-6 bg-white border-t border-solid border-0 border-borderGrey flex-col justify-center items-start gap-4 flex rounded-b-xl">
                        <div className="text-textGrey2 text-[28px] font-bold ">₹12,320</div>
                        <div className="text-textGrey2 text-base font-medium ">Money Out</div>
                        <div className="w-[150px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex ">
                                    <Image className="w-4 h-4 " src={icn_icon} alt="inc"></Image>
                                    <div className="text-green-600 text-sm font-medium ">12.4%</div>
                                    <div className="text-green-600 text-sm font-medium ">this week</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex gap-6">
                <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border  border-solid border-borderGrey flex-col justify-center items-start flex">
                    <div className="w-full border-b border-solid border-0 border-borderGrey">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-textGrey1 text-base font-medium ">Address: </div>
                            <div className="text-textGrey2 text-base font-medium ">{distributor?.address}</div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-borderGrey flex  gap-8">
                        <div className="w-6/12 p-6 border-r border-solid border-0 border-borderGrey flex-col items-center justify-between">
                            <div className="text-textGrey1 text-base font-medium ">GSTIN: </div>
                            <div className="text-textGrey2 text-base font-medium ">{distributor?.gstinNo}</div>
                        </div>
                        <div className="w-6/12 p-6 flex-col items-center justify-between">
                            <div className="text-textGrey1 text-base font-medium ">PAN Number: </div>
                            <div className="text-textGrey2 text-base font-medium ">{distributor?.panNo}</div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-borderGrey">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-textGrey1 text-base font-medium ">Email: </div>
                            <div className="text-textGrey2 text-base font-medium ">{distributor?.email}</div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-textGrey1 text-base font-medium ">Phone Number: </div>
                            <div className="text-textGrey2 text-base font-medium ">{distributor?.contact}</div>
                        </div>
                    </div>
                </div>
                <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border  border-solid border-borderGrey flex-col flex">
                    <div className="w-full border-b border-solid border-0 border-borderGrey flex items-start justify-between">
                        <div className="p-6 flex items-start justify-between w-full">
                            <div className="text-textGrey2 text-xl font-medium ">
                                Ledger
                            </div>
                            <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid  border-borderGrey justify-start items-center gap-2 flex">
                                <Image src={downloadicon} alt="download" className="w-5 h-5"/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                            {/* Code for invoice details */}
                    </div>
                </div>
                </div>
            <div className="rounded-md">
                <div className="w-full mt-[25px] rounded-[10px] border-borderGrey border border-solid  border-neutral-40  ">
                <div className="w-full flex p-6 bg-white items-start justify-between w-full border-0 border-b border-solid border-borderGrey rounded-md">
                        <div className="text-textGrey2 text-xl font-medium ">
                            Timeline
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-evenly  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-borderGrey text-textGrey2'>
                            
                            <div className='flex text-textGrey2 text-base font-medium px-6 w-1/8'>Date</div>
                            <div className='flex text-textGrey2 text-base font-medium px-6 w-1/8'>Type</div>
                            <div className='flex text-textGrey2 text-base font-medium px-6 w-1/8'>Invoice No.</div>
                            <div className='flex text-textGrey2 text-base font-medium px-6 w-1/8'>Total Cost</div>
                            <div className='flex text-textGrey2 text-base font-medium px-6 w-1/8'>Total Qty.</div>
                            <div className='flex text-textGrey2 text-base font-medium px-6 w-1/8'>Due Date</div>
                            <div className='flex text-textGrey2 text-base font-medium px-6 w-1/8'>Status</div>
                            <div className='flex text-textGrey2 text-base font-medium px-6 w-1/8'></div>
                        </div>
                    
                        
                        {/* <div key={item.id} className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-borderGrey text-gray-400 border-t-0.5  '>
                            <div className='w-1/12 px-6 flex items-center text-textGrey1 text-base font-medium'>{item.name} Strips</div>
                            <div className='w-1/12 px-6 flex items-center text-textGrey1 text-base font-medium'>quantity</div>
                            <div className='w-1/12 px-6 flex items-center text-textGrey1 text-base font-medium'>{item.batchNumber}</div>
                            <div className='w-1/12 px-6 flex items-center text-textGrey1 text-base font-medium'>{formatDateAndTime(item.expiry).formattedDate}</div>
                            <div className='w-1/12 px-6 flex items-center text-textGrey1 text-base font-medium'>{item.hsnCode}</div>
                            <div className='w-1/12 px-6 flex items-center text-textGrey1 text-base font-medium'>{item.costPrice}</div>
                            <div className='w-1/12 px-6 flex items-center text-textGrey1 text-base font-medium'>₹399</div>                            
                        </div> */}
                        
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default DistributorDetails;


