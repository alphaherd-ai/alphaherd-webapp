'use client'
import React, { useEffect, useState } from 'react'
import DatabaseDistributorBottombar from './bottombar'
import RightArrow from '../../../assets/icons/finance/rightArrow.svg';
import IncrementIcon from '../../../assets/icons/finance/increment_icon.svg';

import Image from 'next/image';
import Link from 'next/link';
import DatabaseDistributorHeader from './header'
import DatabaseDistributorTableItem from './items'
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
interface Distributors{
    id:string,
    distributorName:string,
    contact:string,
    gstinNo:string,
    email:string,

}
const DatabaseDistributorTable = () => {

  const [distributors,setDistributor]=useState<Distributors[]>([]);
    const appState = useAppSelector((state) => state.app)
    const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/getAll?branchId=${appState.currentBranchId}`,fetcher,{ revalidateOnFocus : true});
    useEffect(() => {
        const handleWindowFocus = () => {
          console.log('Window focused');
        };
        window.addEventListener('focus', handleWindowFocus);
        return () => window.removeEventListener('focus', handleWindowFocus);
      }, []);
    useEffect(()=>{
     if(!isLoading&&!error&&data){
        setDistributor(data);
     }
    },[data,error,isLoading]);

  return (
    <div className='flex flex-col w-full box-border border border-solid border-borderGrey rounded-lg mt-6 mb-6'>
      {/* <div className="  flex bg-white justify-center mt-10 h-[152px] rounded-lg border border-stone-300 border-solid">
        <div className="w-1/4 p-6 border border-stone-300 flex-col justify-start items-start border-0 border-r-2 border-stone-300 border-solid">
            
              <div className="text-gray-500 text-[28px] font-bold ">₹10,22,499</div>
              <div className="text-gray-500 text-base font-medium ">Purchases</div>
           
            <div className=" rounded-lg flex items-center    mt-4 w-full">
            <div className='flex badge bg-emerald-50   py-2 pl-2 rounded-l-lg'><Image src={IncrementIcon} alt='IncrementIcon' className='w-5 h-5 ' /></div>
              <div className="text-green-600 badge bg-emerald-50 text-sm font-medium  pr-2 py-2 rounded-r-lg ">12.4% this week</div>
          </div>
        </div>
        <div className="w-1/4 p-6 bg-white border border-stone-300 flex-col justify-start items-start border-0 border-r-2 border-stone-300 border-solid">
            
              <div className="text-gray-500 text-[28px] font-bold ">₹12,400</div>
              <div className="text-gray-500 text-base font-medium ">You Owe</div>
        
            <div className="  flex items-center w-full  mt-4">
              <div className="text-orange-500 badge bg-orange-50 text-sm font-medium  py-2 pl-2 rounded-l-lg ">12 invoices</div>
              <div className='flex  mr-2 badge bg-orange-50 pr-2 py-2 rounded-r-lg '><Image src={RightArrow} alt='RightArrow' className='w-5 h-5 ' /></div>
            </div>
        </div>
        <div className="w-1/4 p-6 border border-stone-300 flex-col justify-start items-start border-0 border-r-2 border-stone-300 border-solid">
            
              <div className="text-gray-500 text-[28px] font-bold ">₹32,499</div>
              <div className="text-gray-500 text-base font-medium ">You’re Owed</div>
        
            <div className=" rounded-lg flex items-center  w-full mt-4 ">
              <div className="text-green-600 badge bg-emerald-50 text-sm font-medium  py-2 pl-2 rounded-l-lg">4 invoices</div>
              <div className='flex badge bg-emerald-50 pr-2 py-2 rounded-r-lg'><Image src={RightArrow} alt='RightArrow' className='w-5 h-5 ' /></div>
            </div>
        </div>
        <div className="w-1/4 p-6 border border-stone-300 flex-col justify-start items-start border-0 border-r-2 border-stone-300 ">
            
              <div className="text-gray-500 text-[28px] font-bold ">21</div>
              <div className="text-gray-500 text-base font-medium ">Distributor Relationships</div>
        
          </div>
      </div> */}
      <DatabaseDistributorHeader distributors={distributors} />
      <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-textGrey2'>
      <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Name</div>
        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Phone No</div>
        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>GSTIN</div>
        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Email</div>
        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Balance</div>

      </div>
      <DatabaseDistributorTableItem distributors={distributors} data={data} isLoading={isLoading} />
      <DatabaseDistributorBottombar />

    </div>

  )
}

export default DatabaseDistributorTable