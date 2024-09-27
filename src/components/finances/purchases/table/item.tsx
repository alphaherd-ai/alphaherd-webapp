"use client";
import React, { useEffect, useState } from 'react';
import { Tooltip, Button } from "@nextui-org/react";
import Menu from '@/assets/icons/finance/Menu.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { FinanceCreationType } from '@prisma/client';
import { useAppSelector } from '@/lib/hooks';
import formatDateAndTime from '@/utils/formateDateTime';
import useSWR from 'swr';
import { usePathname,useSearchParams } from 'next/navigation';
import Loading from '@/app/loading';


// Define the type for Purchase data
interface Purchase {
  id: number;
  date: string;
  type: string;
  distributor: string;
  invoiceNo: string;
  totalCost: number;
  totalQty: number;
  dueDate: string;
  status: string;
  [key: string]: any; // For additional properties
}

// Update fetcher function type definition
const fetcher = (...args: [RequestInfo, RequestInit?]) => {
  console.log(`[${new Date().toISOString()}] Database call initiated`);
  return fetch(...args).then(res => {
    console.log(`[${new Date().toISOString()}] Database response received`);
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
    return res.json();
  });
};

const FinancesPurchasesTableItem = () => {
  const appState = useAppSelector((state) => state.app);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const currentUrl = useSearchParams();
  const [orderCount, setorderCount] = useState(0);
  const [estimateCount, setEstimateCount] = useState(0);
  const [returnCount, setReturnCount] = useState(0);

  // Handle errors properly using useSWR
  const { data, error, isLoading } = useSWR<Purchase[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/getAll?branchId=${appState.currentBranchId}`,
    fetcher,
    {
      onError: (err) => {
        console.error(`[${new Date().toISOString()}] Error fetching purchases: ${err.message}`);
      }
    }
  );

  useEffect(() => {
    //console.log(`[${new Date().toISOString()}] Request received`);
    if (data && !error && !isLoading) {
      console.log(`[${new Date().toISOString()}] Final response sent to client`);
      console.log(data, appState.currentBranchId);
      setPurchases(data);
    }
  }, [data, error, isLoading]);
  

  if (isLoading) return <Loading />;
  if (error) return <div className="error">Error loading purchases: {error.message}</div>;

  return (
    <div>
      {purchases?.map((purchase, index) => (
        <div key={index + 1} className='flex w-full box-border h-16 py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 hover:bg-gray-200 hover:text-gray-500 transition'>
          <div className='w-1/12 flex items-center px-6 text-neutral-400 text-base font-medium'>
            {formatDateAndTime(purchase.date).formattedDate}
          </div>
          <div className='w-1/12 flex items-center px-6 text-neutral-400 text-base font-medium'>
            {formatDateAndTime(purchase.date).formattedTime}
          </div>
          <div className='w-2/12 flex items-center px-6 text-neutral-400 text-base font-medium'>{purchase.type}</div>
          <div className='w-2/12 flex items-center px-6 text-neutral-400 text-base font-medium'>{purchase.distributor}</div>
          <div className='w-1/12 flex items-center px-6 text-neutral-400 text-base font-medium'>{purchase.invoiceNo}</div>
          <div className='w-1/12 flex items-center px-6 text-neutral-400 text-base font-medium'>{purchase.totalCost}</div>
          <div className='w-1/12 flex items-center px-6 text-neutral-400 text-base font-medium'>{purchase.totalQty} items</div>
          <div className='w-1/12 flex items-center px-6 text-neutral-400 text-base font-medium'>{formatDateAndTime(purchase.dueDate).formattedDate}</div>
          <div className='w-2/12 flex items-center px-6 text-neutral-400 text-base font-medium text-green-500'>
            <span className='bg-green-100 px-1'>
              <Tooltip content="message" className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
                <Button className='bg-transparent border-none'>{purchase.status}</Button>
              </Tooltip>
            </span>
          </div>
          <div className='absolute right-16'>
            <Popover placement="left" showArrow offset={10}>
              <PopoverTrigger>
                <Button variant="solid" className="capitalize flex border-none text-gray rounded-lg">
                  <div className='flex items-center'>
                    <Image src={Menu} alt='Menu' className='w-5 h-5' />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-5 text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 mt-2.5">
                <div className="flex flex-col">
                  <Link className='no-underline flex item-center' href='/finance/overview'>
                    <div className='text-gray-500 text-sm p-3 font-medium flex '>gtr</div>
                  </Link>
                  <Link className='no-underline flex item-center' href='/finance/overview'>
                    <div className='text-gray-500 text-sm p-3 font-medium flex '>grtt</div>
                  </Link>
                  <Link className='no-underline flex item-center' href='/finance/overview'>
                    <div className='text-gray-500 text-sm p-3 font-medium flex '>gtrt</div>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinancesPurchasesTableItem;
{
  /*
 
const FinancesSalesTableItem = ({onCountsChange, data, sales, isLoading}:any) => {
    

  const [invoiceCount, setInvoiceCount] = useState(0);
  const [estimateCount, setEstimateCount] = useState(0);
  const [returnCount, setReturnCount] = useState(0);
  useEffect(() => {
    if (data) {
      setInvoiceCount(data.filter((sale:any) => sale.type === FinanceCreationType.Sales_Invoice).length);
      setEstimateCount(data.filter((sale:any) => sale.type === FinanceCreationType.Sales_Estimate).length);
      setReturnCount(data.filter((sale:any) => sale.type === FinanceCreationType.Sales_Return).length);
    }
    console.log("data is :",data);
  }, [data]);
 

  const handleCounts = () => {
   
    if (onCountsChange) {
      onCountsChange({
        invoiceCount,
        estimateCount,
        returnCount,
      });
    }
  };
  useEffect(() => {
    handleCounts(); 
  }, [sales]);
  console.log("invoice count is :", invoiceCount);
  console.log("estimate count is :", estimateCount);
  console.log("return count is :", returnCount);
 
if(isLoading&&!data)return (<Loading/>)


  return (
     <div>
      {sales?.map((sale:any)=>(
        

    <div key={sale.id} className='flex  w-full  box-border h-16 justify-evenly items-center bg-white   border-0 border-b border-solid border-borderGrey  hover:bg-gray-200 text-textGrey1  hover:text-textGrey2  transition'>
    <div className='w-1/12 flex items-center    text-base font-medium'>{formatDateAndTime(sale.date).formattedDate}</div>
    <div className='w-1/12 flex  items-center   text-base font-medium'>{formatDateAndTime(sale.date).formattedTime}</div>
    <Link
  href={{
    pathname: sale.type === FinanceCreationType.Sales_Estimate ? 'existingsalesestimate' : 
              sale.type === FinanceCreationType.Sales_Invoice ? 'existingsales' : 
              sale.type===FinanceCreationType.Sales_Return?'existingsalesreturn':"",
    query: { id: sale.id}
  }}
><div className='flex w-[4rem]  items-center  text-base font-medium'>{sale.type==FinanceCreationType.Sales_Estimate?("Estimate"):(sale.type==FinanceCreationType.Sales_Invoice)?("Invoice"):("Return")}</div></Link> 
    <div className='w-2/12 flex  items-center  px-4 text-base font-medium'>{sale.customer}</div>
    <div className='w-1/12 flex  items-center  text-base font-medium'>{sale.invoiceNo}</div>
    <div className='w-1/12 flex  items-center  text-base font-medium'>₹ {(sale.totalCost).toFixed(2)}</div>
  
    <div className='w-1/12 flex  items-center  text-base font-medium'>{formatDateAndTime(sale.dueDate).formattedDate}</div>
    <div className='w-1/12 flex  items-center  text-base font-medium'>
    <Tooltip content={sale.status} className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
      <div className='bg-[#E7F5EE] rounded-md px-2 py-2' >
          <span className="text-[#0F9D58]  text-sm font-medium ">{sale.status}</span>
      </div>
    </Tooltip>

 </div>
 <div className=' right-16'>
      
      <Popover placement="left" showArrow offset={10}>
          <PopoverTrigger>
              <Button 
              // color="gray-400"
                  variant="solid"
                  className="capitalize flex border-none  text-gray rounded-lg ">  
                  <div className='flex items-center '><Image src={Menu} alt='Menu' className='w-5  h-5' /></div></Button>
          </PopoverTrigger>
          <PopoverContent className="p-5 text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">
    
              <div className="flex flex-col ">
                 
                  <div className='flex flex-col'>
                  
                  <Link className='no-underline flex item-center' href='/finance/overview'>
                  <div className='text-gray-500 text-sm p-3 font-medium flex '>
                  gtr</div>
                  </Link>
                  <Link className='no-underline flex item-center' href='/finance/overview'>
                  <div className='text-gray-500 text-sm p-3 font-medium flex '>
                 grtt</div>
                  </Link>
                  <Link className='no-underline flex item-center' href='/finance/overview'>
                  <div className='text-gray-500 text-sm p-3 font-medium flex '>
                  gtrt</div>
                  </Link>
                
                  </div>
              </div>
            

          </PopoverContent>
      </Popover>



  </div>
</div>
))}

   
</div> )
}

export default FinancesSalesTableItem
  */
}