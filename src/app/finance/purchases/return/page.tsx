"use client";
import React from 'react'
import NewPurchaseReturnNavbar from '@/components/finances/purchases/return/navbar/navbar';
import NewPurchaseReturnTable from '@/components/finances/purchases/return/table/table';
import { DataProvider } from '@/components/finances/purchases/return/table/DataContext';


const PurchasesReturn = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-[#EDEDED] p-8 px-10'>
      <DataProvider>
      <NewPurchaseReturnNavbar />
      <NewPurchaseReturnTable />
      </DataProvider>
      
    </div>
    </>
  )
}

export default PurchasesReturn