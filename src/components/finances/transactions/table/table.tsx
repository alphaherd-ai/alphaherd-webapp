'use client'
import React, { useEffect, useState } from 'react'
import FinancesTransactionsTableBottombar from './bottombar'
import FinancesTransactionsTableHeader from './header'
import FinancesTransactionsTableItem from './item'
import { useAppSelector } from '@/lib/hooks'
import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
interface Transactions {
  id: number;
  partyName: string;
  subject: string;
  invoiceLink: string;
  receiptNo: string;
  date: string;
  amountPaid: number;
  mode: string;
  moneyChange: string;
  invoiceSource: string;
}



const FinancesTransactionsTable = () => {

  //Pagination
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [startInd, setStartInd] = useState(0);
  const [endInd, setEndInd] = useState(0);
  const [totalLen, setTotalLen] = useState(0);
  const [tableData, setTableData] = useState<any[]>([]);
  const TOTAL_VALUES_PER_PAGE = 50;
  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };
  const goOnNextPage = () => {
    if (currentPageNumber === Math.ceil(totalLen / TOTAL_VALUES_PER_PAGE)) return;
    setCurrentPageNumber((prev) => prev + 1);
  };
  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setStartInd(start)
    setEndInd(end);
    setTransactions(tableData.slice(start, end));
  }, [currentPageNumber])

  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const appState = useAppSelector((state) => state.app)
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });
  const currentUrl = useSearchParams();
  useEffect(() => {
    const handleWindowFocus = () => {
      // console.log('Window focused');
    };
    window.addEventListener('focus', handleWindowFocus);
    return () => window.removeEventListener('focus', handleWindowFocus);
  }, []);


  useEffect(() => {
    if (!isLoading && data && !error) {
      const filteredData = data?.filter((transaction: any) => {
        if (currentUrl.get('type') === 'all') {
          return true;
        } else {
          return transaction.mode === currentUrl.get('type');
        }
      })
      setTotalLen(filteredData.length);
      setTableData(filteredData);
      setTransactions(filteredData.slice(0, TOTAL_VALUES_PER_PAGE));
    }
  }, [data, error, isLoading, setTransactions]);


  return (
    <div className='flex flex-col w-full box-border  border border-solid border-borderGrey rounded-[5px] mt-6'>
      <FinancesTransactionsTableHeader transactions={transactions} />
      <div className='flex px-2 w-full  box-border bg-gray-100  h-12 items-center justify-evenly border-0 border-t border-b border-solid border-borderGrey text-textGrey2'>
        <div className=' flex text-textGrey2 text-base font-medium  w-[6rem] '>Date</div>
        <div className=' flex text-textGrey2 text-base font-medium  w-[6rem] '>Time</div>
        <div className=' flex text-textGrey2 text-base font-medium  w-[12rem]'>Client/Distributor</div>
        <div className=' flex text-textGrey2 text-base font-medium  w-[9rem] '>Receipt No.</div>
        <div className=' flex text-textGrey2 text-base font-medium  w-[10rem] '>Subject</div>
        <div className=' flex text-textGrey2 text-base font-medium  w-[9rem] '>Link Invoice</div>
        <div className=' flex text-textGrey2 text-base font-medium  w-1/12 '> Amount</div>
        <div className=' flex text-textGrey2 text-base font-medium  w-[6rem] '></div>
        <div className=' flex text-textGrey2 text-base font-medium  w-[12rem]'>Mode of Payment</div>
      </div>

      <FinancesTransactionsTableItem transactions={transactions} isLoading={isLoading} />
      <FinancesTransactionsTableBottombar
        goOnPrevPage={goOnPrevPage}
        goOnNextPage={goOnNextPage}
        startInd={startInd}
        endInd={endInd}
        totalLen={totalLen} />
    </div>

  )
}

export default FinancesTransactionsTable