'use client';
import React, { useEffect, useMemo, useState } from 'react'
import FinancesSalesTableBottombar from './bottombar'

import FinancesSalesTableHeader from './header'

import { FinanceCreationType } from '@prisma/client';
import FinancesSalesTableItem from './item'
import axios from 'axios';
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
import { Notif_Source } from '@prisma/client';
import { useSearchParams } from 'next/navigation';


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




const FinancesSalesTable = () => {
  
  const appState = useAppSelector((state) => state.app);
  const [sales, setSales] = useState<Sales[]>([]);
  const currentUrl = useSearchParams();
  const urlSearchParams = useSearchParams();
  const startDate = useMemo(() => urlSearchParams.get('startDate') ? new Date(urlSearchParams.get('startDate')!) : null, [urlSearchParams]);
  const endDate = useMemo(() => urlSearchParams.get('endDate') ? new Date(urlSearchParams.get('endDate')!) : null, [urlSearchParams]);
  const selectedParties = useMemo(() => urlSearchParams.getAll('selectedParties'), [urlSearchParams]);
  const selectedStatus = useMemo(() => urlSearchParams.getAll('selectedStatus'), [urlSearchParams]);
  //const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/getAll?branchId=${appState.currentBranchId}`, fetcher, {revalidateOnFocus: true})
  //Paginaton
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [startInd, setStartInd] = useState(0);
  const [endInd, setEndInd] = useState(0);
  const [totalLen, setTotalLen] = useState(0);
  const [tableData, setTableData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const TOTAL_VALUES_PER_PAGE = 50;
  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };
  const goOnNextPage = () => {
    if (currentPageNumber === Math.ceil((totalLen) / TOTAL_VALUES_PER_PAGE)) return;
    setCurrentPageNumber((prev) => prev + 1);
  };
  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setStartInd(start)
    setEndInd(end);
    setSales(tableData.slice(start, end));
  }, [currentPageNumber])


  useEffect(() => {


    const getAllFinanceSales = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/getAll?branchId=${appState.currentBranchId}`);
        if (res.data) {
          setData(res.data);
          let filteredData = res.data?.filter((sale: any) => {
            if (currentUrl.get('type') === 'all') {
              return true;
            } else {
              return sale.type === currentUrl.get('type');
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
            filteredData = filteredData.filter((item: any) =>
              selectedStatus.some((status) => item.status.startsWith(status)))
          }
          //console.log(filteredData.length);
          setTotalLen(filteredData.length);
          setTableData(filteredData)
          setSales(filteredData?.slice(0, TOTAL_VALUES_PER_PAGE));
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }
    getAllFinanceSales();
  }, [startDate, endDate, selectedParties, selectedStatus, currentUrl.toString()])


  const [invoiceCount, setInvoiceCount] = useState(0);
  const [estimateCount, setEstimateCount] = useState(0);
  const [returnCount, setReturnCount] = useState(0);

  const handleCountsChange = (counts: any) => {
    setInvoiceCount(counts.invoiceCount);
    setEstimateCount(counts.estimateCount);
    setReturnCount(counts.returnCount);
  };
  // console.log(invoiceCount, estimateCount, returnCount)

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
  
      await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/lastDueDateNotif`, {
        id: invoiceID,
        lastReminderSent: new Date().toISOString(),
      });
  
      console.log(`Payment reminder notification sent for Invoice ID: ${invoiceID}`);
    } catch (error) {
      console.error("Failed to send payment reminder notification:", error);
    }
  };


  useEffect(()=>{
    function sendPaymentReminders(invoices: any[], currentDate: Date) {
          if (!invoices || !Array.isArray(invoices)) {
            console.log("no data");
            return [];
          }
          console.log("data for invoices", invoices);
          return invoices.map(invoice => {
            const dueDate = new Date(invoice.dueDate);
            const daysLeftForDue = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000));
            const words= invoice.status.trim().split(' ');
            var bool=false;
            if(words.length>1){
              if(words[1].toLowerCase()==='owed:'){
                bool =true;
              }
            }
            if(invoice.type !==FinanceCreationType.Sales_Return &&  dueDate.toDateString() === currentDate.toDateString() && isOlderThanOneWeek(invoice.lastDueNotif) && bool){
              const notifData = {
                orgId: appState.currentOrgId,
                url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/finance/invoices/${invoice.id}`,
                message: `Payment of ₹${invoice.totalCost} due today  for invoice ${invoice.invoiceNo}`,
                data: {
                  invoiceId: invoice.id,
                  dueInDays: daysLeftForDue,
                  party: invoice.distributor,
                  amountDue: invoice.totalCost,
                  status: invoice.status,
                },
                source: Notif_Source.Sales_Invoice
              };
              console.log("notif data", notifData);
              sendDueNotification(notifData, invoice.id);
              return { ...invoice, notificationSent: true };
            }
            else if (daysLeftForDue <= 7 && daysLeftForDue >= 0 && isOlderThanOneWeek(invoice.lastDueNotif) && bool) {
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
                source: Notif_Source.Sales_Invoice
              };
              console.log("notif data", notifData);
              sendDueNotification(notifData, invoice.id);
              return { ...invoice, notificationSent: true };
            } else if (daysLeftForDue < 0) {
              return invoice;
            } else {
              return invoice;
            }
          });
        }
          const currentDate = new Date();
          const updated = sendPaymentReminders(data,currentDate);
          console.log("updated invoices",updated);
        
  },[data]);

  return (
    <div className='flex flex-col w-full box-border border border-solid border-borderGrey rounded-lg mt-6 mb-6'>
      <FinancesSalesTableHeader invoiceCount={invoiceCount} estimateCount={estimateCount} returnCount={returnCount} sales={sales} />
      <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-textGrey2'>
        <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Date</div>
        <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Time</div>
        <div className=' flex text-gray-500 text-base font-medium   w-[4rem] '>Type</div>
        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Client</div>
        <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Ref. No.</div>
        <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Total Cost</div>
        {/* <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Total Qty.</div> */}
        <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Due date</div>

        <div className=' flex text-gray-500 text-base font-medium  w-2/12'>Status</div>
        <div className='w-[3.5rem] '>

        </div>
      </div>

      <FinancesSalesTableItem
        onCountsChange={handleCountsChange} sales={sales} data={data} isLoading={isLoading}
      />
      <FinancesSalesTableBottombar
        goOnPrevPage={goOnPrevPage}
        goOnNextPage={goOnNextPage}
        startInd={startInd}
        endInd={endInd}
        totalLen={totalLen} />

    </div>

  )
}

export default FinancesSalesTable