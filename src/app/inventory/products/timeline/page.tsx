'use client'
import React from 'react'


import InventoryNavbar from '@/components/inventory/navbar/navbar';
import InventoryProductStockTable from '@/components/inventory/product/stocks/table';
import InventoryProductAllTable from '@/components/inventory/product/producttable/allproducttable';
import { DataProvider } from '@/components/inventory/product/producttable/DataContext';


const InventoryTimelineProductsTable = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-[#EDEDED] p-8 px-10'>
    <DataProvider>
    <InventoryNavbar/>
    <InventoryProductStockTable/>
    <InventoryProductAllTable/>
    </DataProvider>
    </div>
    </>
  )
}

export default InventoryTimelineProductsTable
