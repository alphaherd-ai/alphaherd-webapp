'use client';
import React, { useState, useEffect, useMemo, useContext } from 'react';
import Link from 'next/link';
import { Tooltip, Button, Spinner } from "@nextui-org/react";
import InventoryProductTableBottombar from './bottombar';
import useSWR from 'swr';
import 'ldrs/helix';
import { useAppSelector } from '@/lib/hooks';
import Loading from '@/app/loading';
import { useSearchParams } from 'next/navigation';
import { DataContext } from './DataContext';

//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

interface Products {
  id: number;
  totalQuantity: number;
  itemName: string;
  category: string;
  providers: string[];
}

const ProductAllItem = () => {

  const { allData, setAllData } = useContext(DataContext)

  const [products, setProducts] = useState<Products[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(50);
  const appState = useAppSelector((state) => state.app)
  const urlSearchParams = useSearchParams();
  const selectedParties = useMemo(() => urlSearchParams.getAll('selectedParties'), [urlSearchParams]);
  const selectedCategories = useMemo(() => urlSearchParams.getAll('selectedCategories'), [urlSearchParams]);
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${appState.currentBranchId}`, fetcher)
  useEffect(() => {
    if (!isLoading && data && !error) {
      let filteredData = data;
      if (selectedParties.length > 0) {
        filteredData = filteredData.filter((item: any) =>
          selectedParties.includes(item.providers[0])
        );
      }
      if (selectedCategories.length > 0) {
        filteredData = filteredData.filter((item: any) =>
          selectedCategories.includes(item.category)
        );
      }
      setProducts(filteredData?.reverse())
    }
  }, [data, isLoading, error, selectedCategories, selectedParties]);

  
  // console.log("xcxcxcxcxc")
  // console.log("products", products);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  if (isLoading) return (<Loading />)
  return (
    <div>
      {currentProducts
        ?.sort((a, b) => {
          const nameA = a?.itemName?.toLowerCase() || '';
          const nameB = b?.itemName?.toLowerCase() || '';

          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        })
        .map(product => (
          <div
            key={product.id}
            className='flex  w-full  box-border h-16 justify-evenly items-center bg-white   border-0 border-b border-solid border-borderGrey  hover:bg-gray-200 text-textGrey1  hover:text-textGrey2  transition'
          >
            <div className='w-1/4 flex items-center px-6 text-base font-medium'>
              <Link href={{ pathname: 'overview', query: { id: product?.id } }} className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400'>
                {product?.itemName}
              </Link>
            </div>
            <div className='w-1/4 flex items-center px-6 text-base font-medium text-red-500'>{product.totalQuantity}</div>
            <div className='w-1/4 flex items-center px-6 text-base font-medium'>{product.providers}</div>
            <div className='w-1/4 flex  items-center  text-base font-medium px-6'>
              <Tooltip content={product.category} className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
                <div className='bg-[#E7F5EE] rounded-md  px-2 py-2' >
                  <span className="text-[#0F9D58]  text-sm font-medium ">{product.category}</span>
                </div>
              </Tooltip>

            </div>
          </div>
        ))}

      {/* Pagination controls */}
      {products.length > 0 && (
        <InventoryProductTableBottombar
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={paginate}
        />
      )}
    </div>
  );
};

export default ProductAllItem;


