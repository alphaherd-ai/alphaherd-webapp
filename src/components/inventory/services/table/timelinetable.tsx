
import React from 'react'
import InventoryServicesTableBottombar from './bottombar'
import InventoryProductTableBottombar from './bottombar'

import InventoryProductTableHeader from './header'
import ServicesTimelineItem from './timelineitems'
import ProductTimelineItem from './timelineitems'





const InventoryServicesTimelineTable = () => {
  return (
        <div className='flex flex-col w-full box-border mb-6 mt-6 border border-solid border-borderGrey rounded-lg cursor-default'>
            
            <InventoryProductTableHeader/>
              <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Date</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Time</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[12rem] '>Item Name</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Qty. (units)</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[12rem] '>Party</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Total Cost </div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Source</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[5rem] '></div>
              </div>
           <ServicesTimelineItem/>

        </div>
   
  )
}

export default InventoryServicesTimelineTable