import React from 'react'
import { Tooltip, Button } from "@nextui-org/react";
import Link from 'next/link';
const ServicesTimelineItem = () => {
    return (

        <div className='flex  w-full  box-border h-16 py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  hover:bg-gray-200 hover:text-gray-500 transition'>
            <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>11/12/2023</div>
            <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>11:00</div>
            <div className='w-2/12 flex items-center  px-6  text-neutral-400 text-base font-medium'><Link className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400 ' href='#'>3ml syringes</Link>  </div>
            <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium text-red-500'>110 bottles</div>
            <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>Agriplast</div>
            <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>₹4</div>
    
            <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium text-gray-500'><span className='bg-gray-200 px-1'> <Tooltip content="message" className='bg-black text-white p-1 px-3 text-xs rounded-lg'>

                <Button className='bg-transparent border-none'>Pharmaceutical</Button>
            </Tooltip></span>
            
        
            </div>
            <div className='w-1/12 flex items-center  px-6  text-neutral-400 text-base font-medium'><Link className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400 ' href='#'>SI-23141</Link>  </div>
        </div>

    )
}

export default ServicesTimelineItem;