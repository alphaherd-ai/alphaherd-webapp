"use client";
import React, { useState } from 'react'
import FinancesPurchasesTableBottombar from './bottombar'

import FinancesPurchasesTableHeader from './header'

import FinancesPurchasesTableItem from './item'




const FinancesPurchasesTable = () => {
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
   
        <div className='flex flex-col w-full box-border mb-10  '>
          <FinancesPurchasesTableHeader invoiceCount={invoiceCount} orderCount={orderCount} returnCount={returnCount}/>
               <div className='flex  w-full  box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
               <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Date</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Time</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12 '>Type</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12 '>Distributor</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Serial NO.</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Total cost</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Total qty</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Due date</div>
           
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>Status</div>
            </div>

<FinancesPurchasesTableItem onCountsChange={handleCountsChange}/>
<FinancesPurchasesTableBottombar/>
     
        </div>
   
  )
}

export default FinancesPurchasesTable