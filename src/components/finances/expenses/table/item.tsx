import React from 'react'
import Link from 'next/link'

const FinancesExpensesTableItem = () => {
  return (
   
    <div className='flex  w-full justify-evenly items-center  box-border h-16 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
    <div className='w-[6rem] flex    text-neutral-400 text-base font-medium'>12/12/12</div>
    <div className='w-[6rem] flex    text-neutral-400 text-base font-medium'>11.00 pm</div>
    <Link href="/finance/expenses/exsistingrecurring">
      <div className='w-[10rem] flex  text-neutral-400 text-base font-medium'>Recurring</div></Link>
    <div className='w-2/12 flex    text-neutral-400 text-base font-medium '>wecare</div>
    <div className='w-[9rem] flex    text-neutral-400 text-base font-medium'>DE9F9EF9</div>
    <div className='w-1/12 flex    text-neutral-400 text-base font-medium'>$ 2</div>
    <div className='w-[9rem] flex    text-neutral-400 text-base font-medium'>10 items</div>
    <div className='w-[6rem] flex    text-neutral-400 text-base font-medium'>32</div>
    <div className='w-[12rem] flex  text-base font-medium text-green-500'><span className='bg-green-100 px-1'>rfer</span> </div>

</div>

  )
}

export default FinancesExpensesTableItem