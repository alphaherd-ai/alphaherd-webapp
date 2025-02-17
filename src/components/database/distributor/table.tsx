'use client'
import React, { useEffect, useState } from 'react'

import DatabaseDistributorHeader from './header'
import DatabaseDistributorTableItem from './items'
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

interface Distributors {
  id: number,
  distributorName: string,
  contact: string,
  gstinNo: string,
  email: string,
}
const DatabaseDistributorTable = () => {

  const [distributors, setDistributor] = useState<Distributors[]>([]);
  const appState = useAppSelector((state) => state.app)
  const [sortedDistributor, setSortedDistributor] = useState<Distributors[]>([]); 
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order
  const [sortKey, setSortKey] = useState<keyof Distributors | null>(null); // Sort key
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });
  console.log("distributor data is:", data);


  useEffect(() => {
    const handleWindowFocus = () => {

    };
    window.addEventListener('focus', handleWindowFocus);
    return () => window.removeEventListener('focus', handleWindowFocus);
  }, []);


  useEffect(() => {
    if (!isLoading && !error && data) {
      const sortedData = data.sort((a: Distributors, b: Distributors) => b.id - a.id);
      setDistributor(sortedData);
      setSortedDistributor(sortedData);
    }
  }, [data, error, isLoading]);


  const handleSortChange = (key: keyof Distributors, order: 'asc' | 'desc') => {
    setSortKey(key);
    setSortOrder(order);

    const sortedData = [...distributors].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        const comparisonA = valueA.toLowerCase().trim();
                const comparisonB = valueB.toLowerCase().trim();
                return order === 'asc' ? comparisonA.localeCompare(comparisonB) : comparisonB.localeCompare(comparisonA);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      }
      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return order === 'asc' ? -1 : 1;
      if (valueB == null) return order === 'asc' ? 1 : -1;

      return 0;
    });

    setSortedDistributor(sortedData);
    //console.log(`Sorting by ${key} in ${order} order`, sortedData);
  }

  //console.log(sortedDistributor);

  return (
    <div className='flex flex-col w-full box-border border border-solid border-borderGrey rounded-lg mt-6 mb-6'>

      <DatabaseDistributorHeader distributors={distributors} onSortChange={handleSortChange} />

      <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-textGrey2'>
        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Name</div>
        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Phone No</div>
        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>GSTIN</div>
        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Email</div>
        

      </div>
      <DatabaseDistributorTableItem distributors={sortedDistributor} isLoading={isLoading} />



    </div>

  )
}

export default DatabaseDistributorTable