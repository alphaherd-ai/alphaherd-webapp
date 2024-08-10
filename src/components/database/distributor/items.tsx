import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Distributors from '@/app/database/distributor/page';
import { useAppSelector } from '@/lib/hooks';
import { Spinner} from '@nextui-org/react';
import Loading from '@/app/loading';


const DatabaseDistributorTableItem = ({ distributors, isLoading, data }:any) => {
    

    if(isLoading)return (<Loading/>)



    return (
      <>
      { 
        distributors.map(distributor=>(
          <div key={distributor.id} className='flex justify-evenly w-full  box-border h-16 py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
          <div className='w-1/6 flex items-center  px-6  text-neutral-400 text-base font-medium'>
            <Link className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400 ' 
            href={{pathname:'distributor/overview',query:{id:`${distributor?.id}`}}}>
            {distributor.distributorName}
            </Link>
          </div>
          <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{distributor.contact}</div>
          <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{distributor.gstinNo}</div>
          <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{distributor.email}</div>
          <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium text-green-500'><span className='bg-green-100 px-1'>rfer</span> </div>
      </div>
      ))
          
      }
        

      </>  
  )
}

export default DatabaseDistributorTableItem