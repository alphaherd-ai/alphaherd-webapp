import React from 'react'
import RightArrow from '../../../assets/icons/inventory/RightArrow.svg';

import LeftArrow from '../../../assets/icons/inventory/LeftArrow.svg';

import Image from 'next/image';
import Link from 'next/link';



const ProductBottombar = () => {
  return (
   
        <>
        <div className='flex w-full p-3  justify-between border border-solid border-gray-300 border-t-0.5 rounded-bl-lg rounded-br-lg bg-white'>


<div className='flex'>

<div className='flex items-center   '>
<div className='flex  pl-2'><Link href="#"><Image src={LeftArrow} alt='LeftArrow' className='w-8 h-8 '/></Link></div>
<div className='flex  pl-2'><Link href="#"><Image src={RightArrow} alt='RightArrow' className='w-8 h-8 '/></Link></div>
<div className='text-xl text-gray-500'>1 50 of 2189</div>
</div> 
</div>
    </div >
  
        </>
   
  )
}

export default ProductBottombar;