'use client';
import Loading from '@/app/loading';
import { useAppSelector } from '@/lib/hooks';
import formatDateAndTime from '@/utils/formateDateTime';
import { Spinner, spinner } from '@nextui-org/react';
import { formatDate } from 'date-fns';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
const FinacesOverviewTableItem = () => {
  const appState = useAppSelector((state) => state.app);
  const [timeline,setTimeline]=useState<any[]>([]);
  const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/getAll?branchId=${appState.currentBranchId}`,fetcher,{revalidateOnFocus:true});
  useEffect(()=>{
    if(!isLoading&&!error&&data){
      setTimeline(data);
    }
  })
  if(isLoading)return (<Loading/>)
  return (
   <>
   {timeline?.map((data)=>
        <div className='flex  w-full  box-border h-16 py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                <div className='w-1/12 flex items-center  px-6  text-neutral-400 text-base font-medium'>{formatDateAndTime(data.createdAt).formattedDate}</div>
                <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{formatDateAndTime(data.createdAt).formattedTime}</div>
                <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{data.type}</div>
                <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{data.sale?.customer}</div>
                <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{data.sale?.invoiceNo}</div>
                <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{(data.sale?.totalCost)?.toFixed(2)}</div>
                <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{data.sale?.totalQty}</div>
                <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{formatDateAndTime(data.sale?.dueDate).formattedDate}</div>
                <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium text-green-500'><span className='bg-green-100 px-1'>{data.sale?.status}</span> </div>

        </div>
        )}
        </>
  )
}

export default FinacesOverviewTableItem