'use client'
import React,{useState} from 'react'
import InventoryServicesTableBottombar from './bottombar'
import InventoryProductTableBottombar from './bottombar'

import InventoryProductTableHeader from './header'
import ServicesTimelineItem from './timelineitems'
import ProductTimelineItem from './timelineitems'






const InventoryServicesTimelineTable = () => {

  const [sortOrder, setSortOrder] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('');

  const handleSortChange = (key: string, sortOrder: string) => {
    console.log(key, sortOrder);
    setSortKey(key);
    setSortOrder(sortOrder);
  }


  return (
        <div className='flex flex-col w-full box-border mb-6 mt-6 border border-solid border-borderGrey rounded-lg cursor-default'>
            
            <InventoryProductTableHeader onSortChange={handleSortChange}/>
              <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Date</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Time</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Service Name</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Qty. (units)</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Client</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Selling Price </div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Source</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[10rem] '>Ref</div>
              </div>
           <ServicesTimelineItem sortOrder={sortOrder} sortKey={sortKey}/>

        </div>
   
  )
}

export default InventoryServicesTimelineTable