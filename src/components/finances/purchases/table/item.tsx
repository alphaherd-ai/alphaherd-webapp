"use client";
import React, { useEffect, useState } from 'react'
import { Tooltip } from "@nextui-org/react";

import Link from 'next/link';

import formatDateAndTime from '@/utils/formateDateTime';

import Loading from '@/app/loading';
import { FinanceCreationType } from '@prisma/client';
import { getStatusStyles } from '@/utils/getStatusStyles';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

const FinancesPurchasesTableItem = ({ onCountsChange, purchases, data, isLoading }: any) => {




  const [invoiceCount, setInvoiceCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [returnCount, setReturnCount] = useState(0);
  useEffect(() => {
    if (data) {
      setInvoiceCount(data.filter((purchase: any) => purchase.type === FinanceCreationType.Purchase_Invoice).length);
      setOrderCount(data.filter((purchase: any) => purchase.type === FinanceCreationType.Purchase_Order).length);
      setReturnCount(data.filter((purchase: any) => purchase.type === FinanceCreationType.Purchase_Return).length);
    }
  }, [data]);


  const handleCounts = () => {

    if (onCountsChange) {
      onCountsChange({
        invoiceCount,
        orderCount,
        returnCount,
      });
    }
  };
  useEffect(() => {
    handleCounts();
  }, [purchases]);

  if (isLoading && !data) return (<Loading />)
  return (
    <div>
      {purchases?.map((purchase: any, index: number) =>
        <div key={index + 1} className='flex  w-full  box-border h-16 justify-evenly items-center bg-white   border-0 border-b border-solid border-borderGrey  hover:bg-gray-200 text-textGrey1  hover:text-textGrey2  transition'>
          <div className='w-[6rem] flex items-center   text-base font-medium'>{formatDateAndTime(purchase.date).formattedDate}</div>
          <div className='w-[6rem] flex  items-center text-base font-medium'>{formatDateAndTime(purchase.date).formattedTime}</div>
          <Link
            href={{
              pathname: purchase.type === FinanceCreationType.Purchase_Order ? 'exsistingpurchaseorder' :
                purchase.type === FinanceCreationType.Purchase_Invoice ? 'exsistinggrn' :
                  purchase.type === FinanceCreationType.Purchase_Return ? 'exsistingpurchasereturn' : "",
              query: { id: purchase.id }
            }}>
            <div className='w-[10rem] flex  items-center  text-base font-medium'>{purchase.type}</div></Link>
          <div className='w-[12rem] flex  items-center  text-base font-medium'>{purchase.distributor}</div>
          <div className='w-[10rem] flex  items-center  text-base font-medium'>{purchase.invoiceNo}</div>
          <div className='w-[8rem] flex  items-center  text-base font-medium'>{(purchase.totalCost).toFixed(2)}</div>
          <div className='w-[8rem] flex  items-center  text-base font-medium'>{purchase.totalQty} items</div>
          <div className='w-[8rem] flex  items-center  text-base font-medium'>{formatDateAndTime(purchase.dueDate).formattedDate}</div>
          <div className='w-[13rem] flex  items-center  text-base font-medium'>
            <Tooltip content={purchase.status} className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
            <div>
                {
                  (() => {
                    const statusParts = purchase.status.split('|').map((part: string) => part.trim());
                    //console.log(statusParts);
                     if (!statusParts.length) {
                       return (
                         <span className="text-[#6B7E7D] bg-[#EDEDED] px-2 py-1.5 text-sm font-medium rounded-[5px]">
                           No Status
                         </span>
                       );
                     }
                    return statusParts.map((status: any, index: any) => {
                      const styles = getStatusStyles(status);
                      return (
                        <span  key={index} className={`${styles?.textColor} ${styles?.bgColor} px-2 mr-2 py-1.5 text-sm font-medium rounded-[5px]`}>
                          {status}
                        </span>
                      )
                    })
                  })
                    ()}
              </div >
            </Tooltip>

          </div>
          {/* <div className='w-[3rem] flex items-center'>
            <div className='absolute right-16 '>

              <Popover placement="left" showArrow offset={10}>
                <PopoverTrigger>
                  <Button
                    variant="solid"
                    className="capitalize flex border-none rounded-lg ">
                    <div className='flex items-center '><Image src={Menu} alt='Menu' className='w-5  h-5' /></div></Button>
                </PopoverTrigger>
                <PopoverContent className=" text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">

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
          </div> */}
        </div>
      )}
    </div>
  )
}

export default FinancesPurchasesTableItem