'use client';
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import {  Tooltip,Button } from '@nextui-org/react'
import Image from 'next/image';
import formatDateAndTime from '@/utils/formateDateTime'
import Menu from '../../../../assets/icons/finance/menu.svg';
import { useAppSelector } from '@/lib/hooks';
import Loading from '@/app/loading';
import { FinanceCreationType } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { getStatusStyles } from '@/utils/getStatusStyles';
import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import CancellationPopup from './cancellationPopup';
// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

const FinancesExpensesTableItem = ({ onCountsChange,data,expenses,isLoading}:any) => {
  const [recurringCount, setRecurringCount] = useState(0);
  const [nonrecurringCount, setNonrecurringCount] = useState(0);
 
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [expensesId, selectedExpensesId] = useState<number | null>(null);
  useEffect(() => {
    if (data) {

      setRecurringCount(data.filter((expense: any) => expense.type === FinanceCreationType.Expense_Recurring).length);
      setNonrecurringCount(data.filter((expense: any) => expense.type === FinanceCreationType.Expense_NonRecurring).length);
      
    }
    console.log("data is :", data);
  }, [data]);





  const handleCounts = () => {

    if (onCountsChange) {
      onCountsChange({
        recurringCount,
        nonrecurringCount
      });
    }
  };

  useEffect(() => {
    handleCounts();
  }, [expenses]);
  

  if (isLoading) return (<Loading />)

  return (
    <div>
      {expenses?.map((expense:any, index:number) =>
        <div key={index + 1} className='flex  w-full  box-border h-16 justify-evenly items-center bg-white   border-0 border-b border-solid border-borderGrey  hover:bg-gray-200 text-textGrey1  hover:text-textGrey2  transition'>
          <div className='w-[6rem] flex   text-base font-medium'>{formatDateAndTime(expense.date).formattedDate}</div>
          <div className='w-[6rem] flex   text-base font-medium'>{formatDateAndTime(expense.date).formattedTime}</div>
          <Link
            href={{
              pathname: expense.type === FinanceCreationType.Expense_NonRecurring ? 'exsistingnonrecurring' :
                expense.type === FinanceCreationType.Expense_Recurring ? 'exsistingrecurring' : "",
              query: { id: expense.id }
            }}
          >
            <div className='w-[10rem] flex text-[0.9rem] font-medium'>{expense.type}</div>
          </Link>
          <div className='w-2/12 flex   text-base font-medium '>{expense.party}</div>
          <div className='w-[9rem] flex   text-base font-medium'>{expense.invoiceNo}</div>
          <div className='w-1/12 flex   text-base font-medium'>₹ {(expense.totalCost).toFixed(2)}</div>
          {/* <div className='w-[9rem] flex   text-base font-medium'>{expense.totalQty} items</div> */}
          <div className='w-[6rem] flex   text-base font-medium'>{formatDateAndTime(expense.dueDate).formattedDate}</div>
          <div className='w-[12rem] flex  items-center  text-base font-medium'>
            <Tooltip content={expense.status} className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
             <div>
                {
                  (() => {
                    const status = expense?.status || "";
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
                        <span  key={index} className={`${styles?.textColor} ${styles?.bgColor} px-2 mr-2 py-1.5 text-sm font-medium rounded-[5px]`}>
                          {status}
                        </span>
                      )
                    })
                  })
                    ()}
              </div >
            </Tooltip>
            <Popover placement="left" showArrow offset={10}>
              <PopoverTrigger>
                <Button
                  // color="gray-400"
                  variant="solid"
                  className="capitalize flex border-none  text-gray rounded-lg ">
                  <div className='flex items-center '><Image src={Menu} alt='Menu' className='w-5  h-5' /></div></Button>
              </PopoverTrigger>
              <PopoverContent className="p-2 text-gray-500 bg-white text-sm  font-medium flex flex-row items-start rounded-lg border-2">

                <div className='text-gray-500 cursor-pointer no-underline  item-center text-sm  font-medium flex ' onClick={() => setShowConfirmation(true)}>
                  Cancel</div>


              </PopoverContent>
            </Popover>



          {showConfirmation && <CancellationPopup setShowConfirmation={setShowConfirmation} expenseId={expense?.id}/>}
          </div>

        </div>
      )}
    </div>
  )
}

const getRepeatInterval = (repeatType: string) => {
  switch (repeatType) {
    case 'everyDay': return 1;
    case 'everyWeek': return 7;
    case 'everyMonth': return 30;
    case 'everyYear': return 365;
    default: return 1;
  }
}

const calculateFrequency = (startDate: Date, endDate: Date, interval: number) => {
  // console.log("this is start date", startDate,endDate)
  endDate = new Date(endDate)
  startDate = new Date(startDate)
  if (!startDate || !endDate) return 0;
  const currentDate = new Date();
  let diffTime;
  if (currentDate.getTime() < endDate.getTime()) {
    diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  }
  else {
    diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  }
  // console.log("this is diff time",diffTime)
  return Math.floor(diffTime / (interval * 24 * 60 * 60 * 1000));
}

export default FinancesExpensesTableItem
