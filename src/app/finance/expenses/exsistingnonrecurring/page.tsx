import ExsistingNonRecurringNavbar from '@/components/finances/expenses/exsistingnonrecurrnig/navbar/navbar'
import ExsistingNonRecurringTable from '@/components/finances/expenses/exsistingnonrecurrnig/table/table'
import React from 'react'

const Exsistingnonrecurring = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-gray-200 p-8 px-10' >
    <ExsistingNonRecurringNavbar />
    <ExsistingNonRecurringTable />
    </div>
    </>
  )
}

export default Exsistingnonrecurring