import React from 'react'
import ServicesAllItem from './allitem'
import InventoryServicesTableBottombar from './bottombar'

import InventoryServicesTableHeader from './header'

const InventoryServicesAllTable = () => {
  return (
        <div className='flex flex-col w-full box-border mb-10  cursor-default'>
            <InventoryServicesTableHeader/>
    <div className='flex  w-full  box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6'>Name</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6'>Service Cost</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6'>Service Charge</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/6'>Providers</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6'>Categories</div>
                
            </div>
<ServicesAllItem/>
<ServicesAllItem/>
<ServicesAllItem/>
<InventoryServicesTableBottombar/>
     
        </div>
   
  )
}

export default InventoryServicesAllTable