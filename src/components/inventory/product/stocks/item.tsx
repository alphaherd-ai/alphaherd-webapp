import React, { useEffect, useState } from 'react';
import { Tooltip, Button } from "@nextui-org/react";

interface AllProducts {
  id: string;
  date: string;
  time: string;
  quantity: number;
  batchNumber: string;
  party: string;
  expiry: string;
  distributors: string;
  costPrice: number;
  sellingPrice: number;
  itemName: string;
  hsnCode: string;
  category: string;
  minStock:number;
  maxStock:number;
}


const ServicesStockItem = ({ activeTabValue }: { activeTabValue: string }) => {
  const [products, setProducts] = useState<AllProducts[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_API_BASE_PATH}/api/inventory/product/getAll`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const filteredProducts = products.filter(product => {
    if (activeTabValue === "Low Stock") {
      return product?.quantity <= product?.minStock;
    } else if (activeTabValue === "Excess") {
      return product?.quantity >= product?.maxStock;
    }else if (activeTabValue === "Expired") { 
      const currentDate = new Date();
      const expiryDate = new Date(product?.expiry);
      return expiryDate <= currentDate;
    }
 
    return true;
  });

  return (
    <>
      {filteredProducts.map(product => (
        <div key={product.id} className='flex  w-full  box-border h-16 py-3 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  hover:bg-gray-200 hover:text-gray-500 transition'>
          <div className='w-2/6 flex items-center  px-6  text-neutral-400 text-base font-medium'>{product.itemName}</div>
          <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{product.batchNumber}</div>
          <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{product.party}</div>
          <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{product.minStock}</div>
          <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{product.quantity}</div>
        </div>
      ))}
    </>
  );
};

export default ServicesStockItem;