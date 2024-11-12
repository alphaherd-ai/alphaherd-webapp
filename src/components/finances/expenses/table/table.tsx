
'use client';
import React, { useState } from 'react'
import FinancesExpensesTableBottombar from './bottombar'
import FinancesExpensesTableHeader from './header'

import FinancesExpensesTableItem from './item'
import Link from 'next/link'





const FinancesExpensesTable = () => {
  const [nonrecurringCount, setNonRecurringCount] = useState(0);
  const [recurringCount, setRecurringCount] = useState(0);


  const handleCountsChange = (counts: any) => {
    setRecurringCount(counts.nonrecurringCount);
    setNonRecurringCount(counts.recurringCount);
  };
  //PAGINATION
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [startInd, setStartInd] = useState(0);
  const [endInd, setEndInd] = useState(0);
  const [totalLen, setTotalLen] = useState(0);
  const TOTAL_VALUES_PER_PAGE = 50;
  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };
  const goOnNextPage = () => {
    if (currentPageNumber === Math.round(totalLen / TOTAL_VALUES_PER_PAGE)) return;
    setCurrentPageNumber((prev) => prev + 1);
  };

  return (

    <div className='flex flex-col w-full box-border border border-solid border-borderGrey rounded-lg mt-6 mb-6'>
      <FinancesExpensesTableHeader recurringCount={recurringCount} nonrecurringCount={nonrecurringCount} />
      <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-textGrey2'>
        <div className='flex text-gray-500 text-base font-medium  w-[6rem] '>Date</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[6rem] '>Time</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[10rem] '>Type</div>
        <div className=' flex text-gray-500 text-base font-medium  w-2/12 '>Party</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[9rem] '>Ref. No.</div>
        <div className=' flex text-gray-500 text-base font-medium  w-1/12 '>Total cost</div>
        {/* <div className=' flex text-gray-500 text-base font-medium  w-[9rem] '>Total qty</div> */}
        <div className=' flex text-gray-500 text-base font-medium  w-[6rem] '>Due date</div>

        <div className=' flex text-gray-500 text-base font-medium  w-[12rem] '>Status</div>
      </div>

      <FinancesExpensesTableItem onCountsChange={handleCountsChange}
        currentPageNumber={currentPageNumber}
        setCurrentPageNumber={setCurrentPageNumber}
        setStartInd={setStartInd}
        setEndInd={setEndInd}
        setTotalLen={setTotalLen}
        pagevalue={TOTAL_VALUES_PER_PAGE} />
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