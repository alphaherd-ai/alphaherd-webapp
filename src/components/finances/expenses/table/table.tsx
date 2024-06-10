
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
<FinancesExpensesTableBottombar/>
     
        </div>
   
  )
}

export default FinancesExpensesTable