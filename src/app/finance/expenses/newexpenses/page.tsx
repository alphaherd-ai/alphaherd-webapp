import React from 'react'
import NewExpensesTable from '@/components/finances/expenses/newexpenses/table/table';
import NewExpensesNavbar from '@/components/finances/expenses/newexpenses/navbar/navbar';





const NewExpenses = () => {
  return (
    <>
    <div className='w-full bg-gray-200 p-8 px-10' >
     <NewExpensesNavbar/>
     <NewExpensesTable/>
    </div>
    </>
  )
}

export default NewExpenses



