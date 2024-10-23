import React from 'react'
import ServicesAllItem from './allitem'
import InventoryServicesTableBottombar from './bottombar'

import InventoryServicesTableHeader from './header'

const InventoryServicesAllTable = () => {
  return (
    <div className='flex flex-col w-full box-border mb-6 mt-6 border border-solid border-borderGrey rounded-lg  cursor-default'>
      <InventoryServicesTableHeader />
      <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-gray-500'>
        <div className=' flex text-gray-500 text-base font-medium  w-[10rem]'>Name</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[8rem]'>Service Cost</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[8rem]'>Selling Price</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[12rem]'>Providers</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[15rem]'>Categories</div>

      </div>
      <ServicesAllItem />

      {/* <InventoryServicesTableBottombar /> */}

    </div>

  )
}

export default InventoryServicesAllTable