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
    { distributors.map((distributor:any)=>(
    <div key={distributor.id} className='flex  w-full  box-border h-16 justify-evenly items-center bg-white   border-0 border-b border-solid border-borderGrey  hover:bg-gray-200 text-textGrey1  hover:text-textGrey2  transition'>
      <div className='w-1/6 flex items-center  px-6   text-base font-medium'><Link className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400 ' href='#'>{distributor.distributorName}</Link></div>
      <div className='w-1/6 flex  items-center  px-6  text-base font-medium'>{distributor.contact}</div>
      <div className='w-1/6 flex  items-center  px-6  text-base font-medium'>{distributor.gstinNo}</div>
      <div className='w-1/6 flex  items-center  px-6  text-base font-medium'>{distributor.email}</div>
      <div className='w-1/6 flex  items-center  px-6  text-base font-medium text-green-500'><span className='bg-green-100 px-1'>rfer</span> </div>

    </div>
      ))
          
      }
        

      </>  
  )
}

export default DatabaseDistributorTableItem