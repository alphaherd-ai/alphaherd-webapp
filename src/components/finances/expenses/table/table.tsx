
'use client';
import React, { useState, useEffect } from 'react'
import { useMemo } from 'react';
import FinancesExpensesTableBottombar from './bottombar'
import FinancesExpensesTableHeader from './header'
import { useAppSelector } from '@/lib/hooks';
import FinancesExpensesTableItem from './item'
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())


const FinancesExpensesTable = () => {

  const [nonrecurringCount, setNonRecurringCount] = useState(0);
  const [recurringCount, setRecurringCount] = useState(0);

  const appState = useAppSelector((state) => state.app);
  const [expenses, setExpenses] = useState<any[]>([]);
  const currentUrl = useSearchParams();
  const urlSearchParams = useSearchParams();
  const startDate = useMemo(() => urlSearchParams.get('startDate') ? new Date(urlSearchParams.get('startDate')!) : null, [urlSearchParams]);
  const endDate = useMemo(() => urlSearchParams.get('endDate') ? new Date(urlSearchParams.get('endDate')!) : null, [urlSearchParams]);
  const selectedParties = useMemo(() => urlSearchParams.getAll('selectedParties'), [urlSearchParams]);
  const selectedStatus = useMemo(() => urlSearchParams.getAll('selectedStatus'), [urlSearchParams]);
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/expenses/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true })


  const handleCountsChange = (counts: any) => {
    setRecurringCount(counts.nonrecurringCount);
    setNonRecurringCount(counts.recurringCount);
  };
  //PAGINATION

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [startInd, setStartInd] = useState(0);
  const [endInd, setEndInd] = useState(0);
  const [totalLen, setTotalLen] = useState(0);
  const [tableData, setTableData] = useState<any[]>([]);
  const TOTAL_VALUES_PER_PAGE = 50;
  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };
  const goOnNextPage = () => {
    //console.log(currentPageNumber,data.length/TOTAL_VALUES_PER_PAGE);
    if (currentPageNumber === Math.ceil((totalLen) / TOTAL_VALUES_PER_PAGE)) return;
    setCurrentPageNumber((prev) => prev + 1);
  };
  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setStartInd(start)
    setEndInd(end);
    setExpenses(tableData.slice(start, end));
  }, [currentPageNumber])

  useEffect(() => {

    
    if (data && !error && !isLoading) {
      let filteredData = data?.filter((expense: any) => {
        if (currentUrl.get('type') === 'all') {
          return true;
        } else {
          return expense.type === currentUrl.get('type');
        }
      })
      if (startDate || endDate) {
        filteredData = filteredData.filter((item: any) => {
          const itemDate = new Date(item.date);
          // console.log(itemDate)
          if (startDate && itemDate < startDate) return false;
          if (endDate && itemDate > endDate) return false;
          return true;
        });
      }


      if (selectedParties.length > 0) {
        filteredData = filteredData.filter((item: any) =>
          selectedParties.includes(item.customer)
        );
      }

      if (selectedStatus.length > 0) {
        filteredData = filteredData.filter((item: any) =>
          selectedStatus.some((status) => item.status.startsWith(status)))
      }
      //console.log(filteredData.length);
      setTotalLen(filteredData.length);
      setTableData(filteredData)
      setExpenses(filteredData?.slice(0, TOTAL_VALUES_PER_PAGE));
    }
  }, [data, error, isLoading, setExpenses, startDate, endDate, selectedParties, selectedStatus])

  //console.log(tableData,expenses);



  return (

    <div className='flex flex-col w-full box-border border border-solid border-borderGrey rounded-lg mt-6 mb-6'>
      <FinancesExpensesTableHeader recurringCount={recurringCount} nonrecurringCount={nonrecurringCount} expenses={expenses}/>
      <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-textGrey2'>
        <div className='flex text-gray-500 text-base font-medium  w-[6rem] '>Date</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[6rem] '>Time</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[10rem] '>Type</div>
        <div className=' flex text-gray-500 text-base font-medium  w-2/12 '>Party</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[9rem] '>Ref. No.</div>
        <div className=' flex text-gray-500 text-base font-medium  w-1/12 '>Total cost</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[6rem] '>Due date</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[12rem] '>Status</div>
      </div>

      <FinancesExpensesTableItem 
        onCountsChange={handleCountsChange}  
        expenses={expenses} 
        data={data} 
        isLoading={isLoading}
    />
      <FinancesExpensesTableBottombar
        goOnPrevPage={goOnPrevPage}
        goOnNextPage={goOnNextPage}
        startInd={startInd}
        endInd={endInd}
        totalLen={totalLen} />

    </div>

  )
}

export default FinancesExpensesTable