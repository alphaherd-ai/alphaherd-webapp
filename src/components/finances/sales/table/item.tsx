"use client";
import React, { useEffect, useState } from 'react'
import { Tooltip, Button, Spinner } from "@nextui-org/react";
import Menu from '@/assets/icons/finance/Menu.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import { productSchema } from '@/schemas/inventory/productValidation';
import { FinanceCreationType } from '@prisma/client';
import { useAppSelector } from '@/lib/hooks';
import formatDateAndTime from '@/utils/formateDateTime';
import useSWR from 'swr';
import { usePathname, useSearchParams } from 'next/navigation';
import Loading from '@/app/loading';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
interface Sales {
  id: number;
  date: string;
  type: FinanceCreationType;
  customer: string;
  invoiceNo: number;
  totalCost: number;
  totalQty: number;
  dueDate: string;
  status: string;
}
const FinancesSalesTableItem = ({ onCountsChange, data, sales, isLoading }: any) => {


  const [invoiceCount, setInvoiceCount] = useState(0);
  const [estimateCount, setEstimateCount] = useState(0);
  const [returnCount, setReturnCount] = useState(0);
  useEffect(() => {
    if (data) {

      setInvoiceCount(data.filter((sale: any) => sale.type === FinanceCreationType.Sales_Invoice).length);
      setEstimateCount(data.filter((sale: any) => sale.type === FinanceCreationType.Sales_Estimate).length);
      setReturnCount(data.filter((sale: any) => sale.type === FinanceCreationType.Sales_Return).length);
    }
    console.log("data is :", data);
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

  if (isLoading && !data) return (<Loading />)


  return (
    <div>
      {sales?.map((sale: any) => (


        <div key={sale.id} className='flex  w-full  box-border h-16 justify-evenly items-center bg-white   border-0 border-b border-solid border-borderGrey  hover:bg-gray-200 text-textGrey1  hover:text-textGrey2  transition'>
          <div className='w-1/12 flex items-center    text-base font-medium'>{formatDateAndTime(sale.date).formattedDate}</div>
          <div className='w-1/12 flex  items-center   text-base font-medium'>{formatDateAndTime(sale.date).formattedTime}</div>
          <Link
            href={{
              pathname: sale.type === FinanceCreationType.Sales_Estimate ? 'existingsalesestimate' :
                sale.type === FinanceCreationType.Sales_Invoice ? 'existingsales' :
                  sale.type === FinanceCreationType.Sales_Return ? 'existingsalesreturn' : "",
              query: { id: sale.id }
            }}
          ><div className='flex w-[4rem]  items-center  text-base font-medium'>{sale.type == FinanceCreationType.Sales_Estimate ? ("Estimate") : (sale.type == FinanceCreationType.Sales_Invoice) ? ("Invoice") : ("Return")}</div></Link>
          <div className='w-2/12 flex  items-center  px-4 text-base font-medium'>{sale.customer}</div>
          <div className='w-1/12 flex  items-center  text-base font-medium'>{sale.invoiceNo}</div>
          <div className='w-1/12 flex  items-center  text-base font-medium'>₹ {(sale.totalCost).toFixed(2)}</div>
          {/* <div className='w-1/12 flex  items-center text-base font-medium'>{sale.totalQty}</div> */}
          <div className='w-1/12 flex  items-center  text-base font-medium'>{formatDateAndTime(sale.dueDate).formattedDate}</div>
          <div className='w-2/12 flex  items-center  text-base font-medium'>
            <Tooltip content={sale.status} className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
              <div>
                {
                  sale.status?.includes("You’re owed") ? (
                    <span className="text-[#0F9D58] px-2 py-1.5 text-sm font-medium bg-[#E7F5EE] rounded-[5px]">
                      {sale.status}
                    </span>
                  ) : sale.status?.includes("You owe") ? (
                    <span className="text-[#FC6E20] px-2 py-1.5 text-sm font-medium bg-[#FFF0E9] rounded-[5px]">
                      {sale.status}
                    </span>
                  ) : sale.status?.includes("Returned") ? (
                    <span className="text-[#FF3030] text-sm font-medium px-2 py-1.5 bg-[#FFEAEA] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                      {sale.status}
                    </span>
                  ) : sale.status?.includes("Pending") ? (
                    <span className="text-[#FC6E20] px-2 py-1.5 text-sm font-medium bg-[#FFF0E9] rounded-[5px]">
                      {sale.status}
                    </span>
                  ) : sale.status?.includes("Accepted") ? (
                    <span className="text-[#0F9D58] px-2 py-1.5 text-sm font-medium bg-[#E7F5EE] rounded-[5px]">
                      {sale.status}
                    </span>
                  ) : (
                    <span className="text-[#6B7E7D] text-sm font-medium px-2 py-1.5 bg-[#EDEDED] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                      {sale.status}
                    </span>
                  )
                }
              </div >
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
              <PopoverContent className="p-5 text-gray-500 bg-white text-sm  font-medium flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">

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


    </div>)
}

export default FinancesSalesTableItem