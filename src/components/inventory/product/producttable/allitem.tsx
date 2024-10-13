'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

import { Tooltip, Button, Spinner } from "@nextui-org/react";
import { Inventory } from '@prisma/client';
import { reverse } from 'dns';
import formatDateAndTime from '@/utils/formateDateTime';
import InventoryProductTableBottombar from './bottombar'; 
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
import Loading from '@/app/loading';
import { useSearchParams } from 'next/navigation';
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())

interface Products{
  id:string;
  itemName:string;
  hsnCode:string;
  providers:string;
}
interface ProductBatch {
  id: number;
  date: string;
  time: string;
  quantity: number;
  batchNumber:string;
  party:string;
  expiry:string;
  distributors:string;
  costPrice:number;
  sellingPrice :number;
  category :string;
  product:Products;

}
interface InventoryTimeline{
  id:string;
  stockChange:string;
  invoiceType:string;
  invoiceNo:string;
  quantityChange:number;
  party:string;
  productBatch:ProductBatch;
  createdAt:string;

}

const ProductAllItem = () => {
  const [products, setProducts] = useState<InventoryTimeline[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); 
  const appState = useAppSelector((state) => state.app);
  const urlSearchParams = useSearchParams();
  const startDate = useMemo(() => urlSearchParams.get('startDate') ? new Date(urlSearchParams.get('startDate')!) : null, [urlSearchParams]);
  const endDate = useMemo(() => urlSearchParams.get('endDate') ? new Date(urlSearchParams.get('endDate')!) : null, [urlSearchParams]);
  const selectedParties = useMemo(() => urlSearchParams.getAll('selectedParties'), [urlSearchParams]);
  const selectedInvoiceTypes = useMemo(() => urlSearchParams.getAll('selectedInvoiceTypes'), [urlSearchParams]);
  const selectedInvoiceNo = useMemo(()=> urlSearchParams.getAll('selectedInvoiceTypes'), [urlSearchParams]);
  const selectedMoneyTypes = useMemo(() => urlSearchParams.getAll('selectedMoneyTypes'), [urlSearchParams]);
  const {data,error,isLoading}= useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/getAll?branchId=${appState.currentBranchId}`,fetcher)
  useEffect(()=>{
    if(!isLoading&&data&&!error){
      let filteredData = data.filter((inventory: { inventoryType: any; }) => inventory.inventoryType===Inventory.Product)
      if (startDate || endDate) {
        filteredData = filteredData.filter((item: any) => {
          const itemDate = new Date(item.createdAt);
          console.log(itemDate)
          if (startDate && itemDate < startDate) return false;
          if (endDate && itemDate > endDate) return false;
          return true;
        });
      }

   
      if (selectedParties.length > 0) {
        filteredData = filteredData.filter((item: any) =>
          selectedParties.includes(item.productBatch?.product.providers[0])
        );
      }

      // Apply invoice type filter
      if (selectedInvoiceTypes.length > 0) {
        filteredData = filteredData.filter((item: any) =>
          selectedInvoiceTypes.includes(item.invoiceType)
        );
      }

      if (selectedInvoiceNo.length>0) {
        filteredData = filteredData.filter((item: any) =>
          selectedInvoiceNo.includes(item.invoiceNo)
        );
      }
      console.log('invoice no: ',selectedInvoiceNo);

      if (selectedMoneyTypes.length > 0) {
        filteredData = filteredData.filter((item: any) =>
          selectedMoneyTypes.includes(item.stockChange)
        );
      }
      setProducts(filteredData);
      console.log('Products Data:', filteredData); 
    }
    
  },[data,error,isLoading,startDate,endDate,selectedInvoiceTypes,selectedInvoiceNo,selectedParties,selectedMoneyTypes])
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
 if(isLoading)return (<Loading/>)

  
  return (
    <>
    <div>
      {currentProducts?.map(inventory => (
      
        <div key={inventory.id} className='flex  w-full  box-border h-16 justify-evenly items-center bg-white   border-0 border-b border-solid border-borderGrey  hover:bg-gray-200 text-textGrey1  hover:text-textGrey2  transition'>
          <div className='w-1/12 flex items-center px-4 text-neutral-400 text-base font-medium'>{formatDateAndTime(inventory.createdAt).formattedDate}</div>
          <div className='w-1/12 flex items-center px-6 text-neutral-400 text-base font-medium'>{formatDateAndTime(inventory.createdAt).formattedTime}</div>
          <div className='w-2/12 flex items-center px-6 text-neutral-400 text-base font-medium'>
            <Link href={{pathname:'overview',query:{id:`${inventory.productBatch?.id}`}}} className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400'>
              {inventory.productBatch?.product?.itemName}
            </Link>
          </div>
          <div className='w-1/12 flex items-center px-6 text-neutral-400 text-base font-medium'>{inventory.quantityChange}</div>
          <div className='w-1/12 flex items-center justify-center px-6 text-neutral-400 text-base font-medium text-green-500'>
            {/* <span className='bg-green-100 px-1'>
              <Tooltip content="message" className='bg-black  text-white p-1 px-3 text-xs rounded-lg'>
                <Button className='bg-transparent border-none'>{inventory.stockChange}</Button>
              </Tooltip>
            </span>  */}
            <span
                className={`${
                  inventory.stockChange === 'StockIN' ? 'bg-[#E7F5EE]' : 'bg-[#FFEAEA]'
                } text-white px-1 rounded`}
              >
                <Tooltip className='bg-black text-white p-1 px-3 text-xs rounded-lg' style={{ pointerEvents: 'none' }}>
                  <Button className='bg-transparent border-none' style={{
                        color: inventory.stockChange === 'StockIN' ? '#0F9D58' : '#FF3030',
                      }}>
                    {inventory.stockChange === 'StockIN' ? 'In' : 'Out'}
                  </Button>
                </Tooltip>
              </span>
          </div>
          <div className='w-1/12 flex  items-center  px-8 text-neutral-400 text-base font-medium flex-col'>
            <div className='text-gray-500 text-xs'>{inventory.productBatch?.batchNumber}</div>
            <div className='text-neutral-400 text-[13px] font-medium'>{formatDateAndTime(inventory.productBatch?.expiry).formattedDate}</div>
          </div>
          <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{inventory.productBatch?.product.providers[0]}</div>
          <div className='w-fit px-1 flex  items-center justify-center text-gray-500 text-[0.65rem] font-medium  py-1.5 bg-gray-200 rounded-md'>{inventory.invoiceType}</div>
          <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{inventory.invoiceNo}</div>
        </div>
      ))}
       {/* Pagination controls */}
       <InventoryProductTableBottombar
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
      />
      </div>
    </>
  )
}

export default ProductAllItem;


