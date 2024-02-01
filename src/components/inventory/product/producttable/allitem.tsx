import React from 'react'
import Link from 'next/link';
import {Tooltip,Button} from "@nextui-org/react";
const ProductAllItem = () => {
  return (
   
    <div className='flex  w-full  box-border h-16 py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  hover:bg-gray-200 hover:text-gray-500 transition'>
    <div className='w-1/12 flex items-center  px-6  text-neutral-400 text-base font-medium'>12/12/12</div>
    <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>11.00 pm</div>
    <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'><Link className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400 ' href='#'>Metaclopramide</Link></div>
    <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>1 unit</div>
    <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium text-green-500'><span className='bg-green-100 px-1'> <Tooltip content="message" className='bg-black text-white p-1 px-3 text-xs rounded-lg'>

 <Button className='bg-transparent border-none'>gdrdtghrd</Button>
</Tooltip></span>

 </div>
    <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium flex-col'><div className='text-gray-500 text-xs'>gtr</div>
    <div className='text-neutral-400 text-[10px] font-medium'>dfvd</div></div>
    <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>Mr Anjan Pandey</div>
    <div className='w-1/12 flex  items-center justify-center text-gray-500 text-sm font-medium px-2 py-1.5 bg-gray-200 rounded-md'>sales invoice</div>
    <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>DE9F9EF9</div>
</div>
   
  )
}

export default ProductAllItem;