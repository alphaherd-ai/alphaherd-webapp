import ExsistingRecurringNavbar from '@/components/finances/expenses/exsistingrecurring/navbar/navbar'
import ExsistingRecurringTable from '@/components/finances/expenses/exsistingrecurring/table/table'
import React from 'react'

const Exsistingrecurring = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-[#EDEDED] p-8 px-10' >
        <ExsistingRecurringNavbar />
        <ExsistingRecurringTable />
    </div>
    </>
  )
}

export default Exsistingrecurring