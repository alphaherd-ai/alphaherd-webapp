'use client'
import React,{useState} from 'react'
import ServicesAllItem from './allitem'
import InventoryServicesTableBottombar from './bottombar'

import InventoryServicesTableHeader from './header'

const InventoryServicesAllTable = () => {

  const [sortOrder, setSortOrder] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('');

  const handleSortChange = (key: string, sortOrder: string) => {
    console.log(key, sortOrder);
    setSortKey(key);
    setSortOrder(sortOrder);
  }
  
  return (
    <div className='flex flex-col  w-full box-border mb-6 mt-6 border border-solid border-borderGrey rounded-lg  cursor-default'>
      <InventoryServicesTableHeader onSortChange={handleSortChange}/>
      <div className='flex px-8  w-full  box-border bg-gray-100  h-12  items-center border-0 border-b border-solid border-borderGrey text-gray-500'>
        <div className=' flex text-gray-500 text-base font-medium  w-3/12'>Service Name</div>
        
        <div className=' flex text-gray-500 text-base font-medium  w-2/12'>Selling Price</div>
        
        <div className=' flex text-gray-500 text-base font-medium  w-2/12'>Categories</div>
        <div className=' flex text-gray-500 text-base font-medium  w-5/12'>Linked Products</div>

      </div>
      <ServicesAllItem sortOrder={sortOrder} sortKey={sortKey}/>

      {/* <InventoryServicesTableBottombar /> */}

    </div>

  )
}

export default InventoryServicesAllTable