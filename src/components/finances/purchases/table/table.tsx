"use client";
import React, { useEffect, useState } from 'react'
import FinancesPurchasesTableBottombar from './bottombar'

import FinancesPurchasesTableHeader from './header'

import FinancesPurchasesTableItem from './item'
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
import { useSearchParams } from 'next/navigation';


//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())


const FinancesPurchasesTable = () => {

  const appState = useAppSelector((state) => state.app);
  const [purchases,setPurchases]=useState<any[]>([]);
  const currentUrl=useSearchParams();
  
const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/getAll?branchId=${appState.currentBranchId}`,fetcher)
useEffect(()=>{
  if(data&&!error&&!isLoading){
    const filteredData=data?.filter((purchase:any)=>{
      if(currentUrl.get('type')==='all'){
        return true;
      }else {
        return purchase.type===currentUrl.get('type');
      }
    })
    setPurchases(filteredData);
  }
},[data,setPurchases])

  const [invoiceCount, setInvoiceCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [returnCount, setReturnCount] = useState(0);

  const handleCountsChange = (counts:any) => {
    setInvoiceCount(counts.invoiceCount);
    setOrderCount(counts.orderCount);
    setReturnCount(counts.returnCount);
  };
  console.log(invoiceCount,orderCount,returnCount)
  return (
   
        <div className='flex flex-col w-full box-border border border-solid border-borderGrey rounded-lg mt-6 mb-6'>
          <FinancesPurchasesTableHeader invoiceCount={invoiceCount} orderCount={orderCount} returnCount={returnCount} purchases={purchases} />
              <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-textGrey2'>
                <div className=' flex  text-base font-medium  w-[6rem] '>Date</div>
                <div className=' flex  text-base font-medium  w-[6rem] '>Time</div>
                <div className=' flex  text-base font-medium  w-[10rem] '>Type</div>
                <div className=' flex  text-base font-medium  w-[12rem] '>Distributor</div>
                <div className=' flex  text-base font-medium  w-[10rem] '>Ref. No.</div>
                <div className=' flex  text-base font-medium  w-[8rem] '>Total cost</div>
                <div className=' flex  text-base font-medium  w-[8rem] '>Total qty</div>
                <div className=' flex  text-base font-medium  w-[8rem] '>Due date</div>
                <div className=' flex  text-base font-medium  w-[8rem]'>Status</div>
                <div className=' flex  text-base font-medium  w-[3rem]'></div>
            </div>
          <FinancesPurchasesTableItem onCountsChange={handleCountsChange} purchases={purchases} data={data} isLoading={isLoading}/>
          <FinancesPurchasesTableBottombar/>
        </div>
   
  )
}

export default FinancesPurchasesTable