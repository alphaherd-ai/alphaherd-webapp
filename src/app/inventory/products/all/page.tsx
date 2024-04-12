import React from 'react'
import InventoryNavbar from '@/components/inventory/navbar/navbar';
import InventoryProductStockTable from '@/components/inventory/product/stocks/table';
import InventoryProductTimelineTable from '@/components/inventory/product/producttable/timelinetable';


const InventoryAllProductsTable = () => {
  return (
    <>
      <div className='w-full bg-gray-200 p-8 px-10'>
        <InventoryNavbar />

        <InventoryProductStockTable />

        <InventoryProductTimelineTable />

      </div>
    </>
  )
}

export default InventoryAllProductsTable
