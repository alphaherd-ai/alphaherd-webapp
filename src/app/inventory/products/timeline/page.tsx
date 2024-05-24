import React from 'react'


import InventoryNavbar from '@/components/inventory/navbar/navbar';
import InventoryProductStockTable from '@/components/inventory/product/stocks/table';
import InventoryProductAllTable from '@/components/inventory/product/producttable/allproducttable';


const InventoryTimelineProductsTable = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-gray-200 p-8 px-10'>
  <InventoryNavbar/>
 <InventoryProductStockTable/>
 <InventoryProductAllTable/>
     
    </div>
    </>
  )
}

export default InventoryTimelineProductsTable
