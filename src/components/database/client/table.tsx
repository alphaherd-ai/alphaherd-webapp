"use client";
import React, { useEffect, useState } from 'react'

import DatabaseClientBottombar from './bottombar'
import DatabaseClientHeader from './header'
import DatabaseClientTableItem from './items'
import { useAppSelector } from '@/lib/hooks'
import useSWR from 'swr'
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())

interface Clients {
  id: number;
  clientName: string;
  email: string;
  contact: string;
  address: string;
  city: string;
  pinCode: string;
  patients:Patients[]|undefined;
}

interface Patients{
  id:string;
  patientName:string;
  species:string;
  breed:string;
}
const DatabaseClientTable = () => {

  const [clients, setClients] = useState<Clients[]>([]);
    const appState = useAppSelector((state) => state.app)
    const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/getAll?branchId=${appState.currentBranchId}`,fetcher, { revalidateOnFocus : true});
    useEffect(() => {
        const handleWindowFocus = () => {
          console.log('Window focused');
        };
        window.addEventListener('focus', handleWindowFocus);
        return () => window.removeEventListener('focus', handleWindowFocus);
      }, []);
    useEffect(()=>{
        if(!isLoading&&data&&!error){
            setClients(data);
        }
    },[data,error,isLoading]);
   

    console.log(clients)

  return (
  <div className='flex flex-col w-full box-border mb-6 mt-6 border border-solid border-borderGrey rounded-lg cursor-default'>
      <DatabaseClientHeader clients={clients} />
      
      <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-textGrey2'>
            <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Client</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Pet(s)</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Phone no.</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Email</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Last Visit</div>
            
            </div>
      <DatabaseClientTableItem clients={clients} data={data} isLoading={isLoading} />
      <DatabaseClientBottombar/>
            
        </div>
   
  )
}

export default DatabaseClientTable