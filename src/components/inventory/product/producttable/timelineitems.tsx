'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { Tooltip, Button } from "@nextui-org/react";

interface Product{
  id:string;
  itemName:string;
  hsnCode:string;
  category :string;
  
}

interface Products {
  id: string;
  date: string;
  time: string;
  quantity: number;
  batchNumber:string;
  party:string;
  expiry:string;
  product:Product;
  distributors:string;
  costPrice:number;
  sellingPrice :number;
}

const ProductAllItem = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000//api/inventory/product/getAll`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []); 

  return (
    <>
      {products.map(product => (
                <div className='flex  w-full  box-border h-16 py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  hover:bg-gray-200 hover:text-gray-500 transition'>
                <div className='w-1/6 flex items-center  px-6  text-neutral-400 text-base font-medium'><Link className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400 ' href='#'>{product.product?.itemName}</Link>  </div>
                <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium text-red-500'>{product.quantity}</div>
                <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{product.distributors}</div>
                <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{product.costPrice}</div>
                <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{product.sellingPrice}</div>
                <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium text-green-500'><span className='bg-green-100 px-1'> <Tooltip content="message" className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
    
                    <Button className='bg-transparent border-none'>{product.product.category}</Button>
                </Tooltip></span>
    
                </div>
           
            </div>
    
      ))}
    </>
  );
}

export default ProductAllItem;


