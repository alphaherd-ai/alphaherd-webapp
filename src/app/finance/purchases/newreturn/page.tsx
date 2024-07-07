"use client";
import React from 'react'
import FinancesNavbar from '@/components/finances/navbar/navbar';
import FinancesPurchasesTable from '@/components/finances/purchases/table/table';
import NewPurchaseReturnNewNavbar from '@/components/finances/purchases/newreturn/navbar/navbar';
import NewPurchaseReturnNewTable from '@/components/finances/purchases/newreturn/table/table';
import { DataProvider } from '@/components/finances/purchases/newreturn/table/DataContext';


const PurchasesReturn = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-gray-200 p-8 px-10'>
      <DataProvider>
      <NewPurchaseReturnNewNavbar />
      <NewPurchaseReturnNewTable />
      </DataProvider>
      
    </div>
    </>
  )
}

export default PurchasesReturn