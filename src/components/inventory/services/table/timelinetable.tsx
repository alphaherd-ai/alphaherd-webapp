
import React from 'react'
import InventoryServicesTableBottombar from './bottombar'
import InventoryProductTableBottombar from './bottombar'

import InventoryProductTableHeader from './header'
import ServicesTimelineItem from './timelineitems'
import ProductTimelineItem from './timelineitems'





const InventoryServicesTimelineTable = () => {
  return (
        <div className='flex flex-col w-full box-border mb-10  cursor-default'>
            
            <InventoryProductTableHeader/>
    <div className='flex  w-full  box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Date</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Time</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12 '>Item Name</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Qty. (units)</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12 '>Party</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12 '>Total Cost </div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12 '>Source</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '></div>
            </div>
           <ServicesTimelineItem/>
<InventoryServicesTableBottombar/>
        </div>
   
  )
}

export default InventoryServicesTimelineTable