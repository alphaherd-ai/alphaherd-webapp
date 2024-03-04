'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { Tooltip, Button } from "@nextui-org/react";
import Inventory from '@/app/inventory/services/page';



interface AllProducts {
  id: string;
  date: string;
  time: string;
  quantity: number;
  batchNumber:string;
  party:string;
  expiry:string;
  distributors:string;
  costPrice:number;
  sellingPrice :number;
  itemName:string;
  hsnCode:string;
  category :string;

}
interface Inventory{
  id:string;
  stockChange:string;
  invoiceType:string;
  quantityChange:number;
  party:string;
  allProducts:AllProducts;
  createdAt:string;

}

const ProductAllItem = () => {
  const [products, setProducts] = useState<Inventory[]>([]);

  useEffect(() => {
    fetch(`/api/inventory/getAll`)
      .then(response => response.json())
      .then(data => setProducts(data.filter((inventory: { allProductsId: any; }) => inventory.allProductsId)))
      .catch(error => console.error('Error fetching products:', error));
  }, []); 

  const formatDateAndTime = (dateTime: string) => {
    const dateObject = new Date(dateTime);
    const formattedDate = dateObject.toLocaleDateString(); 
    const formattedTime = dateObject.toLocaleTimeString(); 
    return { formattedDate, formattedTime };
};

  return (
    <>
      {products.map(inventory => (
        <div key={inventory.id} className='flex w-full box-border h-16 py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 hover:bg-gray-200 hover:text-gray-500 transition'>
          <div className='w-1/12 flex items-center px-6 text-neutral-400 text-base font-medium'>{formatDateAndTime(inventory.createdAt).formattedDate}</div>
          <div className='w-1/12 flex items-center px-6 text-neutral-400 text-base font-medium'>{formatDateAndTime(inventory.createdAt).formattedTime}</div>
          <div className='w-2/12 flex items-center px-6 text-neutral-400 text-base font-medium'>
            <Link href='#' className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400'>
              {inventory.allProducts?.itemName}
            </Link>
          </div>
          
          <div className='w-1/12 flex items-center px-6 text-neutral-400 text-base font-medium'>{inventory.quantityChange}</div>
          <div className='w-1/12 flex items-center px-6 text-neutral-400 text-base font-medium text-green-500'>
            <span className='bg-green-100 px-1'>
              <Tooltip content="message" className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
                <Button className='bg-transparent border-none'>{inventory.stockChange}</Button>
              </Tooltip>
            </span>
          </div>
          <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium flex-col'><div className='text-gray-500 text-xs'>{inventory.allProducts?.batchNumber}</div>
    <div className='text-neutral-400 text-[10px] font-medium'>{formatDateAndTime(inventory.allProducts?.expiry).formattedDate}</div></div>
    <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{inventory.allProducts?.party}</div>
    <div className='w-1/12 flex  items-center justify-center text-gray-500 text-sm font-medium px-2 py-1.5 bg-gray-200 rounded-md'>{inventory.invoiceType}</div>
    <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{inventory.allProducts?.hsnCode}</div>
        </div>
      ))}
    </>
  );
}

export default ProductAllItem;


