import React from 'react'
import InventoryProductStockTableBottombar from './bottombar'

import InventoryProductStockTableHeader from './header'
import ServicesStockItem from './item'


const InventoryProductStockTable = () => {
  return (
        <div className='flex flex-col w-full box-border mb-10  cursor-default'>
        <InventoryProductStockTableHeader/>
    <div className='flex  w-full  box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/6'>Item</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6'>Batch No.</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6'>Vendor</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6'>Min. Stock</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6'>Quantity</div>
                
            </div>
<ServicesStockItem/>
<ServicesStockItem/>
<ServicesStockItem/>
<InventoryProductStockTableBottombar/>
     
        </div>
   
  )
}

export default InventoryProductStockTable