import React, { useEffect, useState } from 'react';
import { Tooltip } from "@nextui-org/react";
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
  totalQuantity: number;
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
interface MergedProduct extends Products {
  quantity: number;
  batchNumber: string;
}

const ServicesStockItem = ({ activeTabValue }: { activeTabValue: string }) => {
  const [products, setProducts] = useState<ProductBatch[]>([]);
  const [allProducts, setAllProducts] = useState<Products[]>([]);
  const [currentPage] = useState(1);
  const [fetchdata, setFetchData] = useState();
  const [productsPerPage] = useState(10);
  const appState = useAppSelector((state) => state.app)
  const { data: batchData, error: batchError, isLoading: batchLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/getAll?branchId=${appState.currentBranchId}`, fetcher)
  const { data: productData, error: productError, isLoading: productLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${appState.currentBranchId}`, fetcher)
  
  useEffect(() => {
   if(!batchLoading && !batchError && batchData){
    setProducts(batchData);
   }
  }, [batchData, batchError, batchLoading]);

  useEffect(() => {
   if(!productLoading && !productError && productData){
    setAllProducts(productData);
   }
  }, [productData, productError, productLoading]);

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
      console.log(`Expiry notification sent for productId ${productID}`);
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
  console.log("productss:",products);
  const filteredProducts = () => {
    if (activeTabValue === "Low Stock" || activeTabValue === "Excess") {
      const productMap = new Map<string, { product: Products; totalQuantity: number }>();
      
      // First add all products with their totalQuantity (which may be 0)
      allProducts.forEach(product => {
        productMap.set(product.itemName, { 
          product: product, 
          totalQuantity: product.totalQuantity || 0 
        });
      });

      // Then update quantities from batches
      products.forEach(product => {
        const productName = product.product?.itemName;
        if (productMap.has(productName)) {
          const existing = productMap.get(productName)!;
          existing.totalQuantity += product.quantity;
        }
      });

      const mergedProducts = Array.from(productMap.values()).map(({ product, totalQuantity }) => ({
        ...product,
        quantity: totalQuantity,
        batchNumber: '', // Remove batch number as they might be different
      }));

      if (activeTabValue === "Low Stock") {
        mergedProducts.forEach(product => {
          if (product.quantity <= product.minStock) {
            if (isOlderThanOneWeek(product.lastOutOfStockNotif)) {
              const notifData = {
                source: Notif_Source.Inventory_Product_Remain,
                orgId: appState.currentOrgId,
                data:{
                  totalItems:product.quantity,
                  productName:product.itemName,
                },
                url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/inventory/products/all`,
                message:`Only ${product.quantity} of ${product.itemName} remaining. Replenish items soon for seamless operations.`
              };
              sendlowNotification(notifData, product.id);
            }
          }
        });
        return mergedProducts.filter(product => product.quantity <= product.minStock);
      } else if (activeTabValue === "Excess") {
        mergedProducts.forEach(product => {
          if (product.maxStock !== undefined && product.quantity >= product.maxStock) {
            if (isOlderThanOneWeek(product.excessNotif)) {
              const notifData = {
                source: Notif_Source.Inventory_Product_MaxStock,
                orgId: appState.currentOrgId,
                data:{
                  productName: product.itemName,
                },
                url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/inventory/products/all`,
                message:`${product.itemName} has reached maximum stock level. Evaluate your current inventory needs and consider adjusting levels accordingly.`
              };
              sendexcessNotification(notifData, product.id);
            }
          }
        });
        return mergedProducts.filter(product => product.quantity >= product.maxStock);
      }
    } else {
      return products?.filter(product => {
        const currentDate = new Date();
        const expiryDate = new Date(product?.expiry);
        if (activeTabValue === "Expired") {
          if (expiryDate <= currentDate) {
            if (isOlderThanOneWeek(product.lastExpiryNotif)) {
              const notifData = {
                source: Notif_Source.Inventory_ProductBatch,
                orgId: appState.currentOrgId,
                data:{
                  batchNumber: product.batchNumber,
                  productName: product.product?.itemName,
                },
                url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/inventory/products/all`,
                message:`Batch ${product.batchNumber} under ${product.product?.itemName} has reached expiry. Evaluate your current inventory needs and consider adjusting levels accordingly.`
              };
              sendexpiredNotification(notifData, product.id);
            }
          }
          return expiryDate <= currentDate;
        } else if (activeTabValue === "Expiring") { 
          if (expiryDate > currentDate && (expiryDate.getTime() - currentDate.getTime()) <= Number(30 * 24 * 60 * 60 * 1000)) {
            if (isOlderThanOneWeek(product.lastExpiringNotif)) {
              const daysLeftForExpiry = Math.ceil((expiryDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000));
              const notifData = {
                source: Notif_Source.Inventory_Product_Expiry,
                orgId: appState.currentOrgId,
                data:{
                  totalItems: product.quantity,
                  expiry :daysLeftForExpiry,
                  productName: product.product?.itemName,
                },
                url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/inventory/products/all`,
                message:`${product.quantity} Units of ${product.product?.itemName} are ${daysLeftForExpiry} days away from exipration. Evaluate your current inventory needs and consider adjusting levels accordingly.`
              };
              sendexpiringNotification(notifData, product.id);
            }
          }
          return expiryDate > currentDate && (expiryDate.getTime() - currentDate.getTime()) <= Number(30 * 24 * 60 * 60 * 1000);
        }
        return true;
      });
    }
    console.log("filtered products",products);
    return products;
  };
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts()?.slice(indexOfFirstProduct, indexOfLastProduct);

  console.log("productsPerPage : ",productsPerPage);
  console.log("filteredProducts length: ",filteredProducts()?.length);
  console.log("currentProducts : ",currentProducts);
  if (batchLoading || productLoading) return (<Loading />)
  function paginate(pageNumber: number): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      {currentProducts?.map((product: ProductBatch | Products | MergedProduct) => (
        <div key={product.id} className='flex relative  w-full  box-border h-16 justify-evenly items-center bg-white   border-0 border-b border-solid border-borderGrey  hover:bg-gray-200 text-textGrey1  hover:text-textGrey2  transition'>

          <div className='w-2/6 flex items-center cursor-pointer transition-colors duration-300 no-underline hover:underline hover:text-teal-400  px-6  text-neutral-400 text-base font-medium'>
            <Tooltip content={(activeTabValue === 'Expired' || activeTabValue === 'Expiring') ? (product as ProductBatch).product.itemName : (product as Products).itemName} className='bg-black w-fit  text-white px-4 text-sm rounded-lg'>
              <Link href={{ pathname: 'overview', query: { id: (product as ProductBatch).id } }} className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400'>
                <p> {(activeTabValue === 'Expired' || activeTabValue === 'Expiring') ? (product as ProductBatch).product.itemName : (product as Products).itemName} </p>
              </Link>
            </Tooltip>
          </div>
            {(activeTabValue === 'Expired' || activeTabValue === 'Expiring') && (
            <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{(product as ProductBatch).batchNumber}</div>
            )}
          {activeTabValue === 'Excess' ? (<div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{(product as Products).maxStock}</div>)
            : (activeTabValue === 'Expiring' || activeTabValue === 'Expired' ? (<div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{formatDateAndTime((product as ProductBatch).expiry).formattedDate}</div>) : (
              <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{(product as Products).minStock}</div>
            ))}

          <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{(activeTabValue === 'Expiring' || activeTabValue === 'Expired' )? (product as ProductBatch).quantity:(product as MergedProduct).quantity}</div>
        </div>
      ))}
      <InventoryProductStockTableBottombar
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts()?.length}
        paginate={paginate}
      />
    </>
  );
};

export default ServicesStockItem;