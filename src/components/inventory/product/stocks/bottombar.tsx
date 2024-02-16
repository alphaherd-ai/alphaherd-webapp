import React from 'react'
import RightArrow from '../../../../assets/icons/finance/rightArrow.svg';

import LeftArrow from '../../../../assets/icons/finance/leftArrow.svg';

import Image from 'next/image';
import Link from 'next/link';



const InventoryProductStockTableBottombar = () => {
  return (
    <>
      <div className='flex w-full  justify-between border border-solid border-gray-300 border-t-0.5 h-12 px-6 py-3 bg-white rounded-bl-lg rounded-br-lg bg-white'>


        <div className='flex h-full'>

          <div className='flex items-center '>
            <div className='flex  '><Link href="#" className="no-underline">
            <div className='text-teal-400 text-sm font-bold '>View 30 more</div>
            </Link></div>
          </div>
        </div>
      </div >

    </>
   
  )
}

export default InventoryProductStockTableBottombar;