import React from 'react'
import Link from 'next/link';
const DatabasePatientTableItem = () => {
    return (

        <div className='flex justify-evenly w-full  box-border h-16 py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
           <div className='w-1/6 flex items-center  px-6  text-neutral-400 text-base font-medium'><Link className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400 ' href='#'>Rhea Peas</Link></div>
            <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>Pink, Stephen Jr.</div>
            <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>3895472914</div>
            <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>abdd@gmail.com</div>
            <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>05/1/2023</div>

        </div>

    )
}

export default DatabasePatientTableItem