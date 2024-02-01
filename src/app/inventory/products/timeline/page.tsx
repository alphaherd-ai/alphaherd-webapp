import React from 'react'

import Navbar from '@/components/navbar/navbar';


import InventoryNavbar from '@/components/inventory/navbar/navbar';
import InventoryProductTimelineTable from '@/components/inventory/product/producttable/timelinetable';
import InventoryProductStockTable from '@/components/inventory/product/stocks/table';


const InventoryTimelineProductsTable = () => {
  return (
    <>
    <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
  <InventoryNavbar/>
 <InventoryProductStockTable/>
     <InventoryProductTimelineTable/>
    </div>
    </>
  )
}

export default InventoryTimelineProductsTable