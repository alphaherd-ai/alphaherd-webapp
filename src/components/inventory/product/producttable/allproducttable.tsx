import React from 'react'
import ProductAllItem from './allitem'
import InventoryProductTableBottombar from './bottombar'
import InventoryProductTableHeader from './header'

const InventoryProductAllTable = () => {
  


  return (
        <div className='flex flex-col w-full box-border mb-10  cursor-default'>
            <InventoryProductTableHeader/>
    <div className='flex  w-full  box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Date</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Time</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12 '>Item Name</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Quantity</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '></div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Batch No.</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12 '>Party</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Source</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>Serial No</div>
            </div>

<ProductAllItem/>
<ProductAllItem/>
<ProductAllItem/>
<InventoryProductTableBottombar/>
     
        </div>
  )
}

export default InventoryProductAllTable