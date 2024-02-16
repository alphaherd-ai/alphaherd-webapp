import React from 'react'
import RightArrow from '../../../../assets/icons/finance/rightArrow.svg';

import LeftArrow from '../../../../assets/icons/finance/leftArrow.svg';

import Image from 'next/image';
import Link from 'next/link';



const InventoryProductTableBottombar = () => {
  return (
    <>
      <div className='flex w-full  justify-between border border-solid border-gray-300 border-t-0.5 h-12 px-6 py-3 bg-white rounded-bl-lg rounded-br-lg bg-white'>


        <div className='flex h-full'>

          <div className='flex items-center '>
            <div className='flex  pl-2'><Link href="#"><Image src={LeftArrow} alt='LeftArrow' className='w-6 h-6 ' /></Link></div>
            <div className='flex  pl-2'><Link href="#"><Image src={RightArrow} alt='RightArrow' className='w-6 h-6 ' /></Link></div>
            <div className='text-sm   text-gray-500'>1 50 of 2189</div>
          </div>
        </div>
      </div >

    </>
   
  )
}

export default InventoryProductTableBottombar;