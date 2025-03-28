
'use client';
import React, { useState, useEffect } from 'react'
import { useMemo } from 'react';
import FinancesExpensesTableBottombar from './bottombar'
import FinancesExpensesTableHeader from './header'
import { useAppSelector } from '@/lib/hooks';
import FinancesExpensesTableItem from './item'
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import axios from 'axios';

import { Notif_Source } from '@prisma/client';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())


const FinancesExpensesTable = () => {

  const [nonrecurringCount, setNonRecurringCount] = useState(0);
  const [recurringCount, setRecurringCount] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const appState = useAppSelector((state) => state.app);
  const [expenses, setExpenses] = useState<any[]>([]);
  const currentUrl = useSearchParams();
  const urlSearchParams = useSearchParams();
  const startDate = useMemo(() => urlSearchParams.get('startDate') ? new Date(urlSearchParams.get('startDate')!) : null, [urlSearchParams]);
  const endDate = useMemo(() => urlSearchParams.get('endDate') ? new Date(urlSearchParams.get('endDate')!) : null, [urlSearchParams]);
  const selectedParties = useMemo(() => urlSearchParams.getAll('selectedParties'), [urlSearchParams]);
  const selectedStatus = useMemo(() => urlSearchParams.getAll('selectedStatus'), [urlSearchParams]);
  //const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/expenses/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true })


  const handleCountsChange = (counts: any) => {
    setRecurringCount(counts.nonrecurringCount);
    setNonRecurringCount(counts.recurringCount);
  };
  //PAGINATION

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
    //console.log(currentPageNumber,data.length/TOTAL_VALUES_PER_PAGE);
    if (currentPageNumber === Math.ceil((totalLen) / TOTAL_VALUES_PER_PAGE)) return;
    setCurrentPageNumber((prev) => prev + 1);
  };
  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setStartInd(start)
    setEndInd(end);
    setExpenses(tableData.slice(start, end));
  }, [currentPageNumber])

  useEffect(() => {

    const getAllFinanceExpense = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/expenses/getAll?branchId=${appState.currentBranchId}`);
        if (res.data) {
          setData(res.data);
          let filteredData = res.data?.filter((expense: any) => {
            if (currentUrl.get('type') === 'all') {
              return true;
            } else {
              return expense.type === currentUrl.get('type');
            }
          })
          if (startDate || endDate) {
            filteredData = filteredData.filter((item: any) => {
              const itemDate = new Date(item.date);
              // console.log(itemDate)
              if (startDate && itemDate < startDate) return false;
              if (endDate && itemDate > endDate) return false;
              return true;
            });
          }


          if (selectedParties.length > 0) {
            filteredData = filteredData.filter((item: any) =>
              selectedParties.includes(item.customer)
            );
          }
          if (selectedStatus.length > 0) {
            console.log(selectedStatus);
            filteredData = filteredData.filter((item: any) =>
              selectedStatus.some((status) => (item.status?.startsWith(status)))
            )
            console.log("filteredData", filteredData);
          }
          //console.log(filteredData.length);
          setTotalLen(filteredData.length);
          setTableData(filteredData)
          setExpenses(filteredData?.slice(0, TOTAL_VALUES_PER_PAGE));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getAllFinanceExpense();



  }, [startDate, endDate, selectedParties, selectedStatus, currentUrl.toString()])

  const isOlderThanOneWeek = (dateString: string | undefined) => {

    if (!dateString) return true;
    const lastNotifDate = new Date(dateString);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7 );
    return lastNotifDate < oneWeekAgo;
  };
  
  const sendDueNotification = async (notifData: any, invoiceID: number) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData);
  
      await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/expenses/lastDueDateNotif`, {
        id: invoiceID,
        lastReminderSent: new Date().toISOString(),
      });
  
      console.log(`Payment reminder notification sent for Invoice ID: ${invoiceID}`);
    } catch (error) {
      console.error("Failed to send payment reminder notification:", error);
    }
  };
  
  useEffect(() => {
    function sendPaymentReminders(invoices: any[], currentDate: Date) {
      if (!invoices || !Array.isArray(invoices)) {
        return [];
      }
      console.log("data for invoices", invoices);
      return invoices.map(invoice => {
        const dueDate = new Date(invoice.dueDate);
        const daysLeftForDue = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000));
        if (daysLeftForDue <= 7 && daysLeftForDue >= 0 && isOlderThanOneWeek(invoice.lastDueNotification) && invoice.status.startsWith("You're owed")) {
          const notifData = {
            orgId: appState.currentOrgId,
            url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/finance/invoices/${invoice.id}`,
            message: `Payment of ₹${invoice.totalCost} due in ${daysLeftForDue} days for invoice ${invoice.invoiceNo}`,
            data: {
              invoiceId: invoice.id,
              dueInDays: daysLeftForDue,
              party: invoice.distributor,
              amountDue: invoice.totalCost,
              status: invoice.status,
            },
            source: Notif_Source.Expense_Payment_Reminder
          };
          console.log("notif data", notifData);
          sendDueNotification(notifData, invoice.id);
          return { ...invoice, notificationSent: true };
        } else if (daysLeftForDue < 0) {
          return { ...invoice, status: 'Overdue' };
        } else {
          return invoice;
        }
      });
    }

    const currentDate = new Date();
    const updated = sendPaymentReminders(data, currentDate);
    console.log("test console", updated);
  }, [data]);



  return (

    <div className='flex flex-col w-full box-border border border-solid border-borderGrey rounded-lg mt-6 mb-6'>
      <FinancesExpensesTableHeader recurringCount={recurringCount} nonrecurringCount={nonrecurringCount} expenses={expenses} />
      <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-textGrey2'>
        <div className='flex text-gray-500 text-base font-medium  w-[6rem] '>Date</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[6rem] '>Time</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[10rem] '>Type</div>
        <div className=' flex text-gray-500 text-base font-medium  w-2/12 '>Title</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[9rem] '>Ref. No.</div>
        <div className=' flex text-gray-500 text-base font-medium  w-1/12 '>Total cost</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[6rem] '>Due date</div>
        <div className=' flex text-gray-500 text-base font-medium  w-[12rem] '>Status</div>
      </div>

      <FinancesExpensesTableItem
        onCountsChange={handleCountsChange}
        expenses={expenses}
        data={data}
        isLoading={isLoading}
      />
      <FinancesExpensesTableBottombar
        goOnPrevPage={goOnPrevPage}
        goOnNextPage={goOnNextPage}
        startInd={startInd}
        endInd={endInd}
        totalLen={totalLen} />

    </div>

  )
}

export default FinancesExpensesTable