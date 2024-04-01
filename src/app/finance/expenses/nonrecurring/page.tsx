import React from 'react'
import FinancesNavbar from '@/components/finances/navbar/navbar';
import FinancesExpensesTable from '@/components/finances/expenses/table/table';




const ExpensesNRecurrrring = () => {
  return (
    <>
    <div className='w-full bg-gray-200 p-8 px-10' >
    <FinancesNavbar/>
    <FinancesExpensesTable/>
    </div>
    </>
  )
}

export default ExpensesNRecurrrring



