import NewRecurringNavbar from '@/components/finances/expenses/newrecurring/navbar/navbar'
import NewRecurringTable from '@/components/finances/expenses/newrecurring/table/table'
import React from 'react'

const NewRecurring = () => {
  return (
    <div className='w-full min-h-screen bg-[#EDEDED] p-8 px-10' >
     <NewRecurringNavbar />
     <NewRecurringTable />
    </div>
  )
}

export default NewRecurring