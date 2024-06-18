"use client";
import React from 'react'
import NewExpensesTable from '@/components/finances/expenses/newexpenses/table/table';
import NewExpensesNavbar from '@/components/finances/expenses/newexpenses/navbar/navbar';
import { DataProvider } from '@/components/finances/expenses/newexpenses/table/DataContext';
const NewExpenses = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-gray-200 p-8 px-10' >
      <DataProvider>
      <NewExpensesNavbar/>
     <NewExpensesTable/>
      </DataProvider>
    
    </div>
    </>
  )
}

export default NewExpenses



