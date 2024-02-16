import React from 'react'

import Navbar from '@/components/navbar/navbar';

import InventoryNavbar from '@/components/inventory/navbar/navbar';
import InventoryServicesTimelineTable from '@/components/inventory/services/table/timelinetable';


const InventoryTimelineTable = () => {
  return (
    <>
    <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
  <InventoryNavbar/>
<InventoryServicesTimelineTable/>
     
    </div>
    </>
  )
}

export default InventoryTimelineTable