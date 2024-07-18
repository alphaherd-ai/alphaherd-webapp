"use client";
import CreateGrnNavbar from '@/components/finances/purchases/creategrn/navbar/navbar'
import CreateGrnTable from '@/components/finances/purchases/creategrn/table/table'
import React from 'react'
import { DataProvider } from '@/components/finances/purchases/creategrn/table/DataContext'


const PurchasesGrn = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-[#EDEDED] p-8 px-10'>
      <DataProvider>
      <CreateGrnNavbar />
        <CreateGrnTable />
      </DataProvider>
        
    </div>
    </>
  )
}

export default PurchasesGrn