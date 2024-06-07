
import React from 'react'
import FinancesExpensesTableBottombar from './bottombar'
import FinancesExpensesTableHeader from './header'

import FinancesExpensesTableItem from './item'
import Link from 'next/link'





const FinancesExpensesTable = () => {
  return (
   
        <div className='flex flex-col w-full box-border mb-10  '>
         <FinancesExpensesTableHeader/>
              <div className='flex  w-full  box-border bg-gray-100  h-12 items-center justify-evenly border-b border-neutral-400 text-gray-500'>
               <div className='flex text-gray-500 text-base font-medium  w-[6rem] '>Date</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[6rem] '>Time</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[10rem] '>Type</div>
                <div className=' flex text-gray-500 text-base font-medium  w-2/12 '>Party</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[9rem] '>Serial NO.</div>
                <div className=' flex text-gray-500 text-base font-medium  w-1/12 '>Total cost</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[9rem] '>Total qty</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[6rem] '>Due date</div>
           
                <div className=' flex text-gray-500 text-base font-medium  w-[12rem] '>Status</div>
            </div>

<FinancesExpensesTableItem/>
<div className='flex  w-full justify-evenly items-center  box-border h-16 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
    <div className='w-[6rem] flex    text-neutral-400 text-base font-medium'>12/12/12</div>
    <div className='w-[6rem] flex    text-neutral-400 text-base font-medium'>11.00 pm</div>
    <Link href="/finance/expenses/exsistingnonrecurring">
      <div className='w-[10rem] flex  text-neutral-400 text-base font-medium'>Non-Recurring</div>
    </Link>
    <Link href='/finance/expenses/newrecurring'>
    <div className='w-2/12 flex    text-neutral-400 text-base font-medium '>wecare</div>
    </Link>
    <div className='w-[9rem] flex    text-neutral-400 text-base font-medium'>DE9F9EF9</div>
    <div className='w-1/12 flex    text-neutral-400 text-base font-medium'>$ 2</div>
    <div className='w-[9rem] flex    text-neutral-400 text-base font-medium'>10 items</div>
    <div className='w-[6rem] flex    text-neutral-400 text-base font-medium'>32</div>
    <div className='w-[12rem] flex  text-base font-medium text-green-500'><span className='bg-green-100 px-1'>rfer</span> </div>

</div>
<FinancesExpensesTableBottombar/>
     
        </div>
   
  )
}

export default FinancesExpensesTable