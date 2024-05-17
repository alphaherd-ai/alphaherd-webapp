'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tooltip, Button } from "@nextui-org/react";
import InventoryProductTableBottombar from './bottombar'; 

interface Products {
  id: number;
  totalQuantity: number;
  itemName: string;
  category: string;
  providers: string[];
}

const ProductAllItem = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll`)
      .then(response => response.json())
      .then(data => setProducts(data.reverse()))
      .catch(error => console.error('Error fetching data:', error));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {currentProducts.map(product => (
        <div
          key={product.id}
          className='flex w-full box-border h-16 py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 hover:bg-gray-200 hover:text-gray-500 transition'
        >
          <div className='w-1/4 flex items-center px-6 text-neutral-400 text-base font-medium'>
            <Link href={{ pathname: 'overview', query: { id: product?.id } }} className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400'>
              {product?.itemName}
            </Link>
          </div>
          <div className='w-1/4 flex items-center px-6 text-neutral-400 text-base font-medium text-red-500'>{product.totalQuantity}</div>
          <div className='w-1/4 flex items-center px-6 text-neutral-400 text-base font-medium'>{product.providers}</div>
          <div className='w-1/4 flex items-center px-6 text-neutral-400 text-base font-medium text-green-500'>
            <span className='bg-green-100 px-1'>
              <Tooltip content="message" className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
                <Button className='bg-transparent border-none'>{product.category}</Button>
              </Tooltip>
            </span>
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


