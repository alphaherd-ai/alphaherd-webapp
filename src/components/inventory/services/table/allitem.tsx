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
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())


interface Services {
  id: string;
  name: string;
  providers: string[];
  category: string;
  serviceCost: number;
  serviceCharge: number;
  linkProducts:any;
}



const ServicesAllItem = ({sortOrder,sortKey}:any) => {
  const [services, setServices] = useState<Services[]>([]);
  const appState = useAppSelector((state) => state.app)


  //   useEffect(() => {
  //     fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/getAll?branchId=${appState.currentBranchId}`)
  //     .then(response => response.json())
  //     .then(data => setServices(data))
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true })

  useEffect(() => {
    if (data) {
      
      if (sortOrder && sortKey) {
        console.log(sortOrder, sortKey);
        const sortedData = [...data].sort((a, b) => {
          if (sortKey === 'date') {
            const valueA = new Date(a.createdAt)
            const valueB = new Date(b.createdAt)
            //console.log(valueA,valueB);
            if (valueA instanceof Date && valueB instanceof Date) {
              console.log('in');
              return sortOrder === 'asc' ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime();
            }
          }
          
          return 0;
        });
        //console.log(sortedData);
        setServices(sortedData);
        return ;
      }
      setServices(data);
    }
  }, [data,sortKey,sortOrder]);

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
        <div key={service.id} className='flex  w-full  box-border h-16 py-4 px-8   bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  hover:bg-gray-200 hover:text-gray-500 transition'>
          <div className='w-3/12 flex  items-center   text-neutral-400 text-base font-medium'>
            <Link href={{ pathname: 'overview', query: { id: `${service.id}` } }} className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400 ' >
              {service.name}
            </Link>
          </div>

          <div className='w-2/12 flex  items-center    text-base font-medium'>{service.serviceCharge}</div>

          <div className='w-2/12 flex  items-center  text-base font-medium'>
            <Tooltip content={service.category} className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
              <div className='bg-[#E7F5EE] rounded-md px-2 py-2' >
                <span className="text-[#0F9D58]  text-sm font-medium ">{service.category}</span>
              </div>
            </Tooltip>

          </div>
          <div className='w-5/12 flex items-center'>
            {(service.linkProducts?.length===0 || !service.linkProducts)?<span className='bg-[#EDEDED] w-[10rem] ml-4 text-[#6B7E7D] px-2 py-1.5 rounded-md'>No Linked Products</span>:service.linkProducts?.map((product: any) => (
              <span key={product?.id} className='bg-[#EDEDED]  ml-4 text-[#6B7E7D] px-2 py-1.5 rounded-md'>{product.label.length > 10 ? product.label.slice(0,10) + "..." : product.label}</span>
            ))}
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