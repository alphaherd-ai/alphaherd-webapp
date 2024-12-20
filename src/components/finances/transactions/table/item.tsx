'use client';
import React, { useEffect, useState } from 'react'
import { Tooltip, Button } from "@nextui-org/react";
import Menu from '@/assets/icons/finance/menu.svg';
import Image from 'next/image';
import Cash from "../../../../assets/icons/finance/Cash.svg"
import UPI from "../../../../assets/icons/finance/image 559.svg"
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { useAppSelector } from '@/lib/hooks';
import useSWR from 'swr';
import { usePathname, useSearchParams } from 'next/navigation';
import Loading from '@/app/loading';
import RightArrow from '../../../../assets/icons/finance/rightArrow.svg';

import LeftArrow from '../../../../assets/icons/finance/leftArrow.svg';

import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import FinancesTransactionsTableBottombar from './bottombar';





const FinancesTransactionsTableItem = ({ transactions, isLoading }: any) => {


  const appState = useAppSelector((state) => state.app)




  if (isLoading) return (<Loading />)

  return (
    <>

      {transactions?.map((transaction: any, index: number) => (
        <div key={index} className='flex  w-full  box-border h-16 items-center justify-evenly  bg-white  text-gray-400 border-0 border-b border-solid border-borderGrey  hover:bg-[#F4F5F7] hover:text-gray-500 transition'>
          <div className='w-[6rem] flex items-center  text-base font-medium'>{transaction.date ? format(parseISO(transaction.date), 'dd/MM/yyyy') : ""}</div>
          <div className='w-[6rem] flex  items-center text-base font-medium'>{transaction.date ? format(parseISO(transaction.date), 'hh:mm a') : ""}</div>
          <div className='w-[12rem] flex  items-center text-base font-medium'>{transaction.partyName}</div>
          <div className='w-[9rem] flex  items-center text-base font-medium'>{transaction.receiptNo}</div>
          <div className='w-[10rem] flex  items-center text-base font-medium'>{transaction.subject}</div>
          <div className='w-[9rem] flex  items-center text-base font-medium'>{transaction.invoiceLink}</div>
          <div className='w-1/12 flex  items-center text-base font-medium'>₹ {transaction.amountPaid}</div>
          <div className={`w-[6rem] flex  items-center text-sm font-medium `}>
            <span className={`${transaction.moneyChange === "Out" ? "text-[#FF3030] bg-[#FFEAEA]" : "text-[#0F9D58] bg-[#E7F5EE] px-2"} px-1 py-1 rounded-[5px]`}>
              {transaction.moneyChange}
            </span>
          </div>
          <div className='w-[12rem] flex  items-center text-base font-medium px-2'>
            <div>
              <Image className='w-4 h-4 mt-1 mr-2' src={transaction.mode == "Cash" ? Cash : transaction.mode == "UPI" ? UPI : ""} alt='' />

            </div>
            <Tooltip content={transaction.mode} className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
              <div className=''>{transaction.mode}</div>
            </Tooltip>
          </div>
          <div className='absolute right-16 '>
            {
              appState.isCurrentOrgAdmin ?
                (<Popover placement="bottom" showArrow offset={10}>
                  <PopoverTrigger>
                    <Button
                      variant="solid"
                      className="capitalize flex border-none  text-gray rounded-lg ">
                      <div className='flex items-center '>
                        <Image src={Menu} alt='Menu' className='w-5  h-5' />
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className=" text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">

                    <div className="flex flex-col ">

                      <div className='flex flex-col'>

                        <Link className='no-underline flex item-center' href='/finance/overview'>
                          <div className='text-gray-500 text-sm p-3 font-medium flex '>
                            Edit
                          </div>
                        </Link>
                        <Link className='no-underline flex item-center' href='/finance/overview'>
                          <div className='text-gray-500 text-sm p-3 font-medium flex '>
                            Delete
                          </div>
                        </Link>
                      </div>
                    </div>


                  </PopoverContent>
                </Popover>) : null
            }


          </div>
        </div>
      ))}

    </>

  )
}

export default FinancesTransactionsTableItem



