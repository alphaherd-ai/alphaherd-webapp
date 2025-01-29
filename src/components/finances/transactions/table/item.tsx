'use client';
import React, { useEffect, useState } from 'react'
import { Tooltip, Button } from "@nextui-org/react";
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import Menu from '../../../../assets/icons/finance/menu.svg';
import Cash from "../../../../assets/icons/finance/Cash.svg";
import UPI from "../../../../assets/icons/finance/image 559.svg";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import Loading from '@/app/loading';
import EditRecordTransactionPopup from './editTransactionPopup';

import { useAppSelector } from '@/lib/hooks';

import CancellationPopup from './cancellationPopup';



const FinancesTransactionsTableItem = ({ transactions, isLoading }: any) => {

  const [popup, setPopup] = useState(false);
  const [transaction, setTransaction] = useState<any>();
  
  const [showConfirmation, setShowConfirmation] = useState(false);

  

  const handleSelectedTransaction = (transaction: any) => {
    setTransaction(transaction);
  }

  const onClose = () => {
    setPopup((prev: any) => !prev);
  }

  

  if (isLoading) return <Loading />



  return (
    <>
      {transactions?.map((transaction: any, index: number) => (
        <div key={index} className='flex px-2 w-full h-16 items-center justify-evenly bg-white text-gray-400 border border-b border-solid border-borderGrey hover:bg-[#F4F5F7] hover:text-gray-500 transition'>
          <div className='w-[6rem] flex items-center text-base font-medium'>
            {transaction.date ? format(parseISO(transaction.date), 'dd/MM/yyyy') : ""}
          </div>
          <div className='w-[6rem] flex items-center text-base font-medium'>
            {transaction.date ? format(parseISO(transaction.date), 'hh:mm a') : ""}
          </div>
          <div className='w-[12rem] flex items-center text-base font-medium'>{transaction?.partyName?.replace(/\d+/g, "").trim() || ""}</div>
          <div className='w-[9rem] flex items-center text-base font-medium'>{transaction.receiptNo}</div>
          <div className='w-[10rem] flex items-center text-base font-medium'>{transaction.subject}</div>
          <div className='w-[9rem] flex items-center text-base font-medium'>{transaction.invoiceLink}</div>
          <div className='w-1/12 flex items-center text-base font-medium'>₹ {transaction.amountPaid}</div>
          <div className={`w-[6rem] flex items-center text-sm font-medium`}>
            <span className={`${(transaction.moneyChange === "Out" || transaction.moneyChange === "Cancelled") ? "text-[#FF3030] bg-[#FFEAEA]" : "text-[#0F9D58] bg-[#E7F5EE] px-2"} px-1 py-1 rounded-[5px]`}>
              {transaction.moneyChange}
            </span>
          </div>
          <div className='w-[12rem] flex items-center text-base font-medium px-2'>
            <div>
              <Image className='w-4 h-4 mt-1 mr-2' src={transaction.mode === "Cash" ? Cash : transaction.mode === "UPI" ? UPI : ""} alt='' />
            </div>

              <div>{transaction.mode}</div>
          </div>
          <div className='absolute right-16'>
            {(!(transaction.moneyChange === "Cancelled") &&
              <Popover placement="bottom" showArrow offset={10}>
                <PopoverTrigger>
                  <Button variant="solid" className="capitalize flex border-none text-gray rounded-lg">
                    <div className='flex items-center'>
                      <Image src={Menu} alt='Menu' className='w-5 h-5' />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 mt-2.5">
                  <div className="flex flex-col">
                    <div className='flex flex-col'>
                      <div className='text-gray-500 text-sm p-3 font-medium flex hover:cursor-pointer' onClick={() => { setPopup((prev: any) => !prev); handleSelectedTransaction(transaction) }} >
                        Edit
                      </div>
                      <div className='text-gray-500 text-sm p-3 font-medium flex hover:cursor-pointer' onClick={() => {setShowConfirmation((prev: boolean) => !prev) ; handleSelectedTransaction(transaction)}}>
                        Cancel
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

        </div>

      ))}

      {popup && <EditRecordTransactionPopup editTransaction={transaction} onClose={onClose} />}
      {showConfirmation && <CancellationPopup setShowConfirmation={setShowConfirmation} transaction={transaction}/>}

    </>
  );
};

export default FinancesTransactionsTableItem;
