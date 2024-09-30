"use client";
import React, { useEffect, useMemo, useState } from 'react'
import FinancesPurchasesTableBottombar from './bottombar'

import FinancesPurchasesTableHeader from './header'

import FinancesPurchasesTableItem from './item'
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
import { useSearchParams } from 'next/navigation';


//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())


const FinancesPurchasesTable = () => {
  //Pagination
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [startInd, setStartInd] = useState(0);
  const [endInd, setEndInd] = useState(0);
  const [totalLen, setTotalLen] = useState(0);
  const [tableData,setTableData]=useState<any[]>([]);
  const TOTAL_VALUES_PER_PAGE = 50;
  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };
  const goOnNextPage = () => {
    if (currentPageNumber === data.length / TOTAL_VALUES_PER_PAGE) return;
    setCurrentPageNumber((prev) => prev + 1);
  };
  useEffect(()=>{
    const start=(currentPageNumber-1)*TOTAL_VALUES_PER_PAGE;
    const end=currentPageNumber*TOTAL_VALUES_PER_PAGE;
    setStartInd(start)
    setEndInd(end);
    setPurchases(tableData.slice(start, end));
  },[currentPageNumber])

  const appState = useAppSelector((state) => state.app);
  const [purchases,setPurchases]=useState<any[]>([]);
  const currentUrl=useSearchParams();
  const urlSearchParams = useSearchParams();
  const startDate = useMemo(() => urlSearchParams.get('startDate') ? new Date(urlSearchParams.get('startDate')!) : null, [urlSearchParams]);
  const endDate = useMemo(() => urlSearchParams.get('endDate') ? new Date(urlSearchParams.get('endDate')!) : null, [urlSearchParams]);
  const selectedParties = useMemo(() => urlSearchParams.getAll('selectedParties'), [urlSearchParams]);
  
const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/getAll?branchId=${appState.currentBranchId}`,fetcher)
useEffect(()=>{
  if(data&&!error&&!isLoading){
    let filteredData=data?.filter((purchase:any)=>{
      if(currentUrl.get('type')==='all'){
        return true;
      }else {
        return purchase.type===currentUrl.get('type');
      }
    })
    if (startDate || endDate) {
      filteredData = filteredData.filter((item: any) => {
        const itemDate = new Date(item.date);
        console.log(itemDate)
        if (startDate && itemDate < startDate) return false;
        if (endDate && itemDate > endDate) return false;
        return true;
      });
    }

 
    if (selectedParties.length > 0) {
      filteredData = filteredData.filter((item: any) =>
        selectedParties.includes(item.distributor)
      );
    }
    setTotalLen(filteredData.length);
    setTableData(filteredData)
    setPurchases(filteredData?.reverse().slice(0,TOTAL_VALUES_PER_PAGE));
  }
},[data,error,isLoading,setPurchases,startDate, endDate, selectedParties])

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
          <FinancesPurchasesTableBottombar
          goOnPrevPage={goOnPrevPage}
          goOnNextPage={goOnNextPage}
          startInd={startInd}
          endInd={endInd}
          totalLen={totalLen}/>
        </div>
   
  )
}

export default FinancesPurchasesTable