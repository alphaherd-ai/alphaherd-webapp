import React from 'react'

import { Tooltip, Button } from "@nextui-org/react";
const ServicesStockItem = () => {
  return (

    <div className='flex  w-full  box-border h-16 py-3 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  hover:bg-gray-200 hover:text-gray-500 transition'>
      
      <div className='w-2/6 flex items-center  px-6  text-neutral-400 text-base font-medium'>  Chicos Eye drops 40 ML</div>
      <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>036521036</div>
      <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>WeCare</div>
      <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>Min. Stock: 45 </div>
      
      <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium text-red-500'><span className='bg-red-200 px-1'>
30 Strips</span>

      </div>
    </div>

  )
}

export default ServicesStockItem;