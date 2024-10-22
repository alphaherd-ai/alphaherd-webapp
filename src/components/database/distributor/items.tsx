import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Distributors from '@/app/database/distributor/page';
import { useAppSelector } from '@/lib/hooks';
import { Spinner } from '@nextui-org/react';
import Loading from '@/app/loading';
import DatabaseDistribuBottombar from './bottombar'

const DatabaseDistributorTableItem = ({ distributors, isLoading, data }: any) => {


  if (isLoading) return (<Loading />)
  if (isLoading) return (<Loading />)
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(50);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentDistributors = distributors.slice(indexOfFirstProduct, indexOfLastProduct);


  return (
    <>
      {
        currentDistributors.map((distributor: { id: React.Key | null | undefined; distributorName: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; contact: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; gstinNo: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; email: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
          <div key={distributor.id} className='flex justify-evenly w-full  box-border h-16 py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
            <div className='w-1/6 flex items-center  px-6  text-neutral-400 text-base font-medium'>
              <Link className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400 '
                href={{ pathname: 'distributor/overview', query: { id: `${distributor?.id}` } }}>
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

      {distributors.length > 0 && (
        <DatabaseDistribuBottombar
          productsPerPage={productsPerPage}
          totalProducts={distributors.length}
          paginate={paginate}
        />
      )}


    </>
  )
}

export default DatabaseDistributorTableItem