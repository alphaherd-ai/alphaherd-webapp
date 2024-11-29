import React, { useEffect, useState } from 'react';
import { Tooltip, Button, Spinner } from "@nextui-org/react";
import { useAppSelector } from '@/lib/hooks';
import useSWR from 'swr';
import { Notif_Source } from "@prisma/client";
import formatDateAndTime from '@/utils/formateDateTime';
import Loading from '@/app/loading';
import InventoryProductStockTableBottombar from './bottombar';
import Link from 'next/link';
import axios from 'axios';
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json());
interface Products{
  id: number;
  itemName: string;
  category: string;
  minStock:number;
  lastOutOfStockNotif?: string;
  lastExpiryNotif?: string;      // Last expired notification sent
  lastExpiringNotif?: string;     // Last expiring soon notification sent
  excessNotif?: string;
  maxStock:number;
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
  lastOutOfStockNotif?: string;   // Add this field for low stock notification date
  lastExpiryNotif?: string;     // Add this field for expiry notification date
  lastExpiringNotif?: string;   // Add this field for expiring soon notification date
  product:Products
  productId: number;
 
}


const ServicesStockItem = ({ activeTabValue }: { activeTabValue: string }) => {
  const [products, setProducts] = useState<ProductBatch[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const appState = useAppSelector((state) => state.app)
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/getAll?branchId=${appState.currentBranchId}`, fetcher)
  useEffect(() => {
   if(!isLoading&&!error&&data){
    setProducts(data);
   }
  }, [data,error,isLoading]);


  const sendlowNotification = async (notifData: any, productID: number) => {
    //console.log("send notif triggered",notifData);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData);

      await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/lastOutOfStockNotif`, {
        id: productID,
        lastOutOfStockNotif: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };
  const sendexpiringNotification = async (notifData: any, productID: number) => {
    //console.log("send notif triggered",notifData);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData);

      await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/lastExpiringNotif`, {
        id: productID,
        lastExpiringNotif: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };
  const sendexpiredNotification = async (notifData: any, productID: number) => {
  //  console.log("send notif triggered",notifData);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData);

      await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/lastExpiryNotif`, {
        id: productID,
        lastExpiryNotif: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };
  const sendexcessNotification = async (notifData: any, productID: number) => {
    //console.log("send notif triggered",notifData);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData);

      await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/excessNotif`, {
        id: productID,
        excessNotif: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };
  const isOlderThanOneWeek = (dateString: string | undefined) => {

    if (!dateString) return true;
    const lastNotifDate = new Date(dateString);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7 );
    return lastNotifDate < oneWeekAgo;
  };

  const filteredProducts = products?.filter(product => {
    const currentDate = new Date();
    const expiryDate = new Date(product?.expiry);
    if (activeTabValue === "Low Stock") {
      const productID = product.product?.id;

      if(product?.quantity <= product?.product?.minStock){
         if (isOlderThanOneWeek(product.product?.lastOutOfStockNotif))
           {

      const notifData = {
        source: Notif_Source.Inventory_Product_Remain,
        orgId: appState.currentOrgId,
            totalItems : product.quantity,
            productName : product.product?.itemName,
            url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/inventory/products/all`,
          };
          sendlowNotification(notifData,productID);
       }
      }
      return product?.quantity <= product?.product?.minStock;

    } 
    else if (activeTabValue === "Excess") {
      const productID = product.product?.id;

      if(product?.quantity >= product?.product?.maxStock)
      {
        if (isOlderThanOneWeek(product.product?.excessNotif))
        {
        const notifData = {
          source: Notif_Source.Inventory_Product_MaxStock,
              orgId: appState.currentOrgId,
             
              productName : product.product?.itemName,
              url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/inventory/products/all`,
            };
            sendexcessNotification(notifData,productID);
      }
    }

      return product?.quantity >= product?.product?.maxStock;
    }
    else if (activeTabValue === "Expired") { 
      const currentDate = new Date();
      const expiryDate = new Date(product?.expiry);
      const productID = product.product?.id;
      if(expiryDate <= currentDate)
      {
        if (isOlderThanOneWeek(product.product?.lastExpiryNotif))
        {
        const notifData = {
          source: Notif_Source.Inventory_ProductBatch,
              orgId: appState.currentOrgId,
              batchNumber : product.batchNumber,
              productName : product.product?.itemName,
              url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/inventory/products/all`,
            }
            sendexpiredNotification(notifData,productID);
      }
    }
      return expiryDate <= currentDate;
    }
    else if(activeTabValue==="Expiring"){
      const currentDate =new Date();
      const expiryDate=new Date(product?.expiry);
      const productID = product.product?.id;
      if(expiryDate>currentDate&&(expiryDate.getTime()-currentDate.getTime())<=Number(30 * 24 * 60 * 60 * 1000))
        if (isOlderThanOneWeek(product.product?.lastExpiringNotif))
        {
        {
          const notifData = {
            source: Notif_Source.Inventory_Product_Expiry,
                orgId: appState.currentOrgId,
                totalItems : product.quantity,
                expiry : product.expiry,
                productName : product.product?.itemName,
                url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/inventory/products/all`,
              }
             sendexpiringNotification(notifData,productID);
           
        }
      }
      return expiryDate>currentDate&&(expiryDate.getTime()-currentDate.getTime())<=Number(30 * 24 * 60 * 60 * 1000)
    }


    return true;
  });
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  console.log(currentProducts);
  if (isLoading) return (<Loading />)
  function paginate(pageNumber: number): void {
    throw new Error('Function not implemented.');
  }

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