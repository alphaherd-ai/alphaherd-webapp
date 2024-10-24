'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Doctor from '../../../../assets/icons/inventory/doctor.svg';
import Image from 'next/image';
import { Tooltip, Button } from "@nextui-org/react";
import { useAppSelector } from '@/lib/hooks';
import useSWR from 'swr';
import Loading from '@/app/loading';
import InventoryServicesTableBottombar from './bottombar'


//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())


interface Services{
  id:string;
  name:string;
  providers:string[];
  category:string;
  serviceCost:number;
  serviceCharge:number;
}



const ServicesAllItem = () => {
  const [services, setServices] = useState<Services[]>([]);
  const appState = useAppSelector((state) => state.app)


//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/getAll?branchId=${appState.currentBranchId}`)
//     .then(response => response.json())
//     .then(data => setServices(data))
//     .catch(error => console.error('Error fetching data:', error));
// }, []);

  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/getAll?branchId=${appState.currentBranchId}`, fetcher, {revalidateOnFocus:true})

  useEffect(() => {
    if (data) {
      setServices(data);
    }
  }, [data]);

  // if (error) return <div>Error fetching services: {error.message}</div>;
  // if (isLoading) return (<Loading />);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(50); 
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentServices = services.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
    {currentServices.map(service => (
    <div key={service.id} className='flex  w-full  box-border h-16 py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  hover:bg-gray-200 hover:text-gray-500 transition'>
      <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>
          <Link href={{pathname:'overview',query:{id:`${service.id}`}}}className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400 ' >
            {service.name}
          </Link>
        </div>
      <div className='w-[8rem] flex items-center     text-base font-medium'>  {service?.serviceCost}</div>
      <div className='w-[8rem] flex  items-center    text-base font-medium'>{service.serviceCharge}</div>
      <div className='w-[12rem] flex items-center   text-base font-medium '>
      <div className="relative mr-4">
        <Image src={Doctor} alt='Doctor' className='relative left-0 top-0 w-5 h-5 z-10' />
        <Image src={Doctor} alt='Doctor' className='absolute left-3 top-3 w-5 h-5 z-20' />
      </div>
      <div>
        <div>{service.providers}</div>
      </div>
    </div>
    <div className='w-[15rem] flex  items-center  text-base font-medium'>
    <Tooltip content={service.category} className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
      <div className='bg-[#E7F5EE] rounded-md px-2 py-2' >
          <span className="text-[#0F9D58]  text-sm font-medium ">{service.category}</span>
      </div>
    </Tooltip>

 </div>
    </div>

  ))}
   <InventoryServicesTableBottombar
        productsPerPage={productsPerPage}
        totalProducts={services.length}
        paginate={paginate}
      />
  </>
  );
}

export default ServicesAllItem;