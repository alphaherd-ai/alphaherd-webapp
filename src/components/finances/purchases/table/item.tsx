"use client";
import React, { useEffect, useState } from 'react'
import { Tooltip, Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import Link from 'next/link';
import Image from 'next/image';
import formatDateAndTime from '@/utils/formateDateTime';
import CancellationPopup from './cancellationPopup';
import Loading from '@/app/loading';
import { FinanceCreationType } from '@prisma/client';
import { getStatusStyles } from '@/utils/getStatusStyles';
import Menu from '../../../../assets/icons/finance/menu.svg';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

const FinancesPurchasesTableItem = ({ onCountsChange, purchases, data, isLoading }: any) => {



  const [showConfirmation, setShowConfirmation] = useState(false);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [returnCount, setReturnCount] = useState(0);
  const [purchaseId, setPurchaseId] = useState<number>(0);
  useEffect(() => {
    if (data) {
      setInvoiceCount(data.filter((purchase: any) => purchase.type === FinanceCreationType.Purchase_Invoice).length);
      setOrderCount(data.filter((purchase: any) => purchase.type === FinanceCreationType.Purchase_Order).length);
      setReturnCount(data.filter((purchase: any) => purchase.type === FinanceCreationType.Purchase_Return).length);
    }
  }, [data]);
  console.log(purchases);

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

  if (isLoading) return (<Loading />)
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
              <div>
                {
                  (() => {
                    const status = purchase?.status || "";
                    console.log(status);
                    const statusParts = status.trim() ? status.split('|').map((part: string) => part.trim()) : ["Closed"];
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
                        <span key={index} className={`${styles?.textColor} ${styles?.bgColor} px-2 mr-2 py-1.5 text-sm font-medium rounded-[5px]`}>
                          {status}
                        </span>
                      )
                    })
                  })
                    ()}
              </div >


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
              <PopoverContent className="p-2 text-gray-500 bg-white text-sm  font-medium flex flex-row items-start rounded-lg border-2">

                <div className='text-gray-500 cursor-pointer no-underline  item-center text-sm  font-medium flex ' onClick={() => {setShowConfirmation(true); setPurchaseId(purchase?.id)}}>
                  Cancel</div>


              </PopoverContent>
            </Popover>



          </div>

        </div>
      )}
                  {showConfirmation && purchaseId !== null && <CancellationPopup setShowConfirmation={setShowConfirmation} purchaseId={purchaseId} />}
    </div>
  )
}

export default FinancesPurchasesTableItem