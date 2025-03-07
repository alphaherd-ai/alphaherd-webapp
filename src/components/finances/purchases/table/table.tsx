"use client";
import React, { useEffect, useMemo, useState } from 'react'
import FinancesPurchasesTableBottombar from './bottombar'
import axios from 'axios';
import FinancesPurchasesTableHeader from './header'
import { Notif_Source } from "@prisma/client";
import FinancesPurchasesTableItem from './item'
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
import { useSearchParams } from 'next/navigation';


//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())


const FinancesPurchasesTable = () => {
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
    setPurchases(tableData.slice(start, end));
  }, [currentPageNumber])

  const appState = useAppSelector((state) => state.app);
  const [purchases, setPurchases] = useState<any[]>([]);
  const currentUrl = useSearchParams();
  const urlSearchParams = useSearchParams();
  const startDate = useMemo(() => urlSearchParams.get('startDate') ? new Date(urlSearchParams.get('startDate')!) : null, [urlSearchParams]);
  const endDate = useMemo(() => urlSearchParams.get('endDate') ? new Date(urlSearchParams.get('endDate')!) : null, [urlSearchParams]);
  const selectedParties = useMemo(() => urlSearchParams.getAll('selectedParties'), [urlSearchParams]);
  const selectedStatus = useMemo(() => urlSearchParams.getAll('selectedStatus'), [urlSearchParams]);
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/getAll?branchId=${appState.currentBranchId}`, fetcher)
  useEffect(() => {
    if (data && !error && !isLoading) {
      console.log("data for purchase",data);
      let filteredData = data?.filter((sale: any) => {
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
      setPurchases(filteredData?.slice(0, TOTAL_VALUES_PER_PAGE));
    }
  }, [data, error, isLoading, setPurchases, startDate, endDate, selectedParties,selectedStatus])

  const sendDueDateNotification = async (notifData: any, purchaseID: number) => {
    try {

      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData);

      await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/updateLastNotif`, {
        id: purchaseID,
        lastDueNotif: new Date().toISOString(),
      });

      console.log(`Payment reminder notification sent for Purchase Id: ${purchaseID}`);
    } catch (error) {
      console.error("Failed to send due date notification:", error);
    }
  };

  const isOlderThanOneWeek = (dateString: string | undefined) => {
    if (!dateString) return true;
    const lastNotifDate = new Date(dateString);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return lastNotifDate < oneWeekAgo;
  };

  useEffect(() => {
    const currentDate = new Date();
    const oneWeekFromNow = new Date();
    // console.log("current date :" , currentDate);
    oneWeekFromNow.setDate(currentDate.getDate() + 7);
    // console.log("one week date :" , oneWeekFromNow);

    
    const filteredPurchases = purchases?.filter((purchase) => {
      const dueDate = new Date(purchase.dueDate);
      const purchaseID = purchase.id;
      const currentDate = new Date();
    
      const daysLeftForDue = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000));
    
      let message = '';
      if (purchase.type === "Purchase_Order") {
        // Check if the purchase order is due today
        if (dueDate.toDateString() === currentDate.toDateString()) {
          message = `Your purchase order #${purchase.purchaseOrderNumber} from ${purchase.distributor} is scheduled to arrive today!`;
    
          const notifData = {
            orgId: appState.currentOrgId,
            url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/finance/purchases/all?type=all`,
            message: message,
            data: {
              purchaseId: purchase.id,
              invoiceNo: purchase.invoiceNo,
              dueDate: purchase.dueDate,
              distributor: purchase.distributor,
              totalCost: purchase.totalCost,
              status: purchase.status,
            },
            source: Notif_Source.Purchase_Order_Due,
          };
    
          sendDueDateNotification(notifData, purchaseID);
          return true; 
        } else {
          return false; 
        }
      } else {
        
        if (daysLeftForDue <= 7 && daysLeftForDue >= 0 && isOlderThanOneWeek(purchase.lastDueNotif)) {
          if (purchase.type === "Purchase_Invoice") {
            message = `You owe ₹${purchase.totalCost} to ${purchase.distributor}. This payment is due on ${new Date(purchase.dueDate).toLocaleDateString()}.`;
          } else {
            message = `Purchase Return ${purchase.invoiceNo} due on ${new Date(purchase.dueDate).toLocaleDateString()} from ${purchase.distributor}`;
          }
    
          const notifData = {
            orgId: appState.currentOrgId,
            url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/finance/purchases/all?type=all`,
            message: message,
            data: {
              purchaseId: purchase.id,
              invoiceNo: purchase.invoiceNo,
              dueDate: purchase.dueDate,
              distributor: purchase.distributor,
              totalCost: purchase.totalCost,
              status: purchase.status,
            },
            source: Notif_Source.Purchase_Order_Due,
          };
    
          sendDueDateNotification(notifData, purchaseID);
          return true; 
        } else if (daysLeftForDue < 0) {
          return false; 
        } else {
          return false; 
        }
      }
    });
    


  }, [purchases]);



  const [invoiceCount, setInvoiceCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [returnCount, setReturnCount] = useState(0);


  const handleCountsChange = (counts: any) => {
    setInvoiceCount(counts.invoiceCount);
    setOrderCount(counts.orderCount);
    setReturnCount(counts.returnCount);
  };
  console.log(invoiceCount, orderCount, returnCount)
  return (

    <div className='flex flex-col w-full box-border border border-solid border-borderGrey rounded-lg mt-6 mb-6'>
      <FinancesPurchasesTableHeader invoiceCount={invoiceCount} orderCount={orderCount} returnCount={returnCount} purchases={purchases} />
      <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-textGrey2'>
        <div className=' flex  text-base font-medium  w-[6rem] '>Date</div>
        <div className=' flex  text-base font-medium  w-[6rem] '>Time</div>
        <div className=' flex  text-base font-medium  w-[10rem] '>Type</div>
        <div className=' flex  text-base font-medium  w-[12rem] '>Distributor</div>
        <div className=' flex  text-base font-medium  w-[10rem] '>Ref. No.</div>
        <div className=' flex  text-base font-medium  w-[8rem] '>Total cost</div>
        <div className=' flex  text-base font-medium  w-[8rem] '>Total qty</div>
        <div className=' flex  text-base font-medium  w-[8rem] '>Due date</div>
        <div className=' flex  text-base font-medium  w-[10rem]'>Status</div>
        <div className=' flex  text-base font-medium  w-[3rem]'></div>
      </div>
      <FinancesPurchasesTableItem onCountsChange={handleCountsChange} purchases={purchases} data={data} isLoading={isLoading} />
      <FinancesPurchasesTableBottombar
        goOnPrevPage={goOnPrevPage}
        goOnNextPage={goOnNextPage}
        startInd={startInd}
        endInd={endInd}
        totalLen={totalLen} />
    </div>

  )
}

export default FinancesPurchasesTable