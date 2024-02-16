
import React from 'react'
import FinancesTransactionsTableBottombar from './bottombar'
import FinancesSalesTableBottombar from './bottombar'

import FinancesTransactionsTableHeader from './header'
import FinancesTransactionsTableItem from './item'





const FinancesTransactionsTable = () => {
  return (
        <div className='flex flex-col w-full box-border mb-10  '>
             <FinancesTransactionsTableHeader/>
    <div className='flex  w-full  box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Date</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Time</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12 '>Party</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Receipt NO.</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12 '>Subject</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Source Invoice</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '> Amount</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '></div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>Mode of Payment</div>
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