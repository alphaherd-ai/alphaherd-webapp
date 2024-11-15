import React, { useEffect, useState } from 'react';
import { Tooltip, Button, Spinner } from "@nextui-org/react";
import { useAppSelector } from '@/lib/hooks';
import useSWR from 'swr';
import formatDateAndTime from '@/utils/formateDateTime';
import Loading from '@/app/loading';
import InventoryProductStockTableBottombar from './bottombar';
import Link from 'next/link';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
interface Products {
  id: number;
  itemName: string;
  category: string;
  minStock: number;
  maxStock: number;
  productId:number;
}

interface ProductBatch {
  id: number;
  date: string;
  quantity: number;
  batchNumber: string;
  party: string;
  expiry: string;
  distributors: string;
  costPrice: number;
  sellingPrice: number;
  productId: number;
  product: Products
}


const ServicesStockItem = ({ activeTabValue }: { activeTabValue: string }) => {
  const [products, setProducts] = useState<ProductBatch[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const appState = useAppSelector((state) => state.app)
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/getAll?branchId=${appState.currentBranchId}`, fetcher)
  useEffect(() => {
    if (!isLoading && !error && data) {
      setProducts(data);
    }
  }, [data, error, isLoading]);



  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  // console.log(products);
  const filteredProducts = products?.filter(product => {
    // console.log(product)
    if (activeTabValue === "Low Stock") {
      return product?.quantity <= product?.product?.minStock;
    } else if (activeTabValue === "Excess") {
      return product?.quantity >= product?.product?.maxStock;
    } else if (activeTabValue === "Expired") {
      const currentDate = new Date();
      const expiryDate = new Date(product?.expiry);
      return expiryDate <= currentDate;
    } else if (activeTabValue === "Expiring") {
      const currentDate = new Date();
      const expiryDate = new Date(product?.expiry);
      return expiryDate > currentDate && (expiryDate.getTime() - currentDate.getTime()) <= Number(30 * 24 * 60 * 60 * 1000)
    }


    return true;
  });
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  console.log(currentProducts);
  if (isLoading) return (<Loading />)
  return (
    <>
      {currentProducts.map(product => (
        <div key={product.id} className='flex relative  w-full  box-border h-16 justify-evenly items-center bg-white   border-0 border-b border-solid border-borderGrey  hover:bg-gray-200 text-textGrey1  hover:text-textGrey2  transition'>

          <div className='w-2/6 flex items-center cursor-pointer transition-colors duration-300 no-underline hover:underline hover:text-teal-400  px-6  text-neutral-400 text-base font-medium'>
            <Tooltip content={product.product?.itemName} className='bg-black w-fit  text-white px-4 text-sm rounded-lg'>
              <Link href={{ pathname: 'overview', query: { id:product.productId } }} className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400'>
                <p> {product.product?.itemName} </p>
              </Link>
            </Tooltip>
          </div>
          <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{product.batchNumber}</div>
          {activeTabValue === 'Excess' ? (<div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{product.product.maxStock}</div>)
            : (activeTabValue === 'Expiring' || activeTabValue === 'Expired' ? (<div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{formatDateAndTime(product.expiry).formattedDate}</div>) : (
              <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{product.product.minStock}</div>
            ))}

          <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{product.quantity}</div>
        </div>
      ))}
      <InventoryProductStockTableBottombar
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
      />
    </>
  );
};

export default ServicesStockItem;