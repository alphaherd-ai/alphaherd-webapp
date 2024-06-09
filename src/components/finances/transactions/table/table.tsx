
import React from 'react'
import FinancesTransactionsTableBottombar from './bottombar'
import FinancesSalesTableBottombar from './bottombar'

import FinancesTransactionsTableHeader from './header'
import FinancesTransactionsTableItem from './item'





const FinancesTransactionsTable = () => {
  return (
        <div className='flex flex-col w-full box-border mb-10  '>
             <FinancesTransactionsTableHeader/>
    <div className='flex  w-full  box-border bg-gray-100  h-12 items-center justify-evenly border-b border-neutral-400 text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium  w-[6rem] '>Date</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[6rem] '>Time</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[12rem]'>Party</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[9rem] '>Receipt NO.</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[10rem] '>Subject</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[9rem] '>Source Invoice</div>
                <div className=' flex text-gray-500 text-base font-medium  w-1/12 '> Amount</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[6rem] '></div>
                <div className=' flex text-gray-500 text-base font-medium  w-[12rem]'>Mode of Payment</div>
            </div>

<FinancesTransactionsTableItem/>
<FinancesTransactionsTableItem/>
<FinancesTransactionsTableItem/>
<FinancesTransactionsTableItem/>
<FinancesTransactionsTableBottombar/>
     
 </div>
   
  )
}

export default FinancesTransactionsTable