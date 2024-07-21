'use client';
import React, { useEffect, useState } from 'react'
import FinacesOverviewTableBottombar from './bottombar'
import FinacesOverviewHeader from './header'
import FinacesOverviewTableItem from './item'
import useSWR from 'swr'
import { useAppSelector } from '@/lib/hooks'

//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())



const FinancesOverviewTable = () => {


  const appState = useAppSelector((state) => state.app);
  const [timeline,setTimeline]=useState<any[]>([]);
  const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/getAll?branchId=${appState.currentBranchId}`,fetcher,{revalidateOnFocus:true});
  useEffect(()=>{
    if(!isLoading&&!error&&data){
      setTimeline(data);
    }
  },[data,isLoading,error])


  return (
  
    <div className='flex flex-col w-full box-border mb-6 mt-6 border border-solid border-borderGrey rounded-lg  cursor-default'>
<FinacesOverviewHeader timeline={timeline} />
<div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Date</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Time</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[10rem] '>Type</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[12rem] '>Party</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[12rem] '>Serial Name</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Total cost</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Total qty</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Due date</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[10rem]'>Status</div>
            </div>
<FinacesOverviewTableItem timeline={timeline} isLoading={isLoading} />
   <FinacesOverviewTableBottombar/>
     
        </div>
        
  )
}

export default FinancesOverviewTable;