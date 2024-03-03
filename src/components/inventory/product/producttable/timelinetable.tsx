
import React from 'react'
import InventoryProductTableBottombar from './bottombar'

import InventoryProductTableHeader from './header'
import ProductTimelineItem from './timelineitems'





const InventoryProductTimelineTable = () => {
  return (
        <div className='flex flex-col w-full box-border mb-10  cursor-default'>
            <InventoryProductTableHeader/>
    <div className='flex  w-full  box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/4 '>Name</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/4 '>Quantity</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/4 '>Distributors</div>
                {/* <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6 '>Cost Price</div> */}
                {/* <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6 '>Selling Price</div> */}
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/4 '>Categories</div>
            </div>
            <ProductTimelineItem/>
<InventoryProductTableBottombar/>
        </div>
   
  )
}

export default InventoryProductTimelineTable