import React from 'react'

import Navbar from '@/components/navbar/navbar';


import InventoryNavbar from '@/components/inventory/navbar/navbar';
import InventoryProductTimelineTable from '@/components/inventory/product/producttable/timelinetable';


const InventoryTimelineProductsTable = () => {
  return (
    <>
    <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
  <InventoryNavbar/>
 
     <InventoryProductTimelineTable/>
    </div>
    </>
  )
}

export default InventoryTimelineProductsTable