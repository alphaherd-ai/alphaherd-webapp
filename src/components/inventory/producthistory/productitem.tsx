import React from 'react'

import NewService from '../../../assets/icons/inventory/Newservice.svg';

import Image from 'next/image';
const ProductItem = () => {
  return (
   
        <div className='flex  w-full  box-border bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 '>
         <div className='w-1/6 flex p-3 items-center  text-xl'>Time</div>
         <div className='w-1/6 flex p-3 items-center text-xl'>Date</div>
         <div className='w-1/6 flex p-3 items-center text-xl'><span className='bg-green-100 px-1 mr-2 flex items-center p-1'> <Image src={NewService} alt='NewService' className='w-5 h-5 ' /></span> Itme type</div>
         <div className='w-1/6 flex p-3 items-center text-xl'>Item Name</div>
         <div className='w-1/6 flex p-3 items-center text-xl'>Quantity</div>
         <div className='w-1/6 flex p-3 items-center  text-xl text-green-500'><span className='bg-green-100 px-1'>Quantity</span> </div>

        </div>
   
  )
}

export default ProductItem