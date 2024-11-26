import React from 'react'

import InventoryNavbar from '@/components/inventory/navbar/navbar';
import InventoryServicesTimelineTable from '@/components/inventory/services/table/timelinetable';


const InventoryTimelineTable = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-[#EDEDED] p-8 px-10'>
  <InventoryNavbar/>
<InventoryServicesTimelineTable/>
     
    </div>
    </>
  )
}

export default InventoryTimelineTable