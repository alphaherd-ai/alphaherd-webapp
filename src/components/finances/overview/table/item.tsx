'use client';
import Loading from '@/app/loading';
import { useAppSelector } from '@/lib/hooks';
import formatDateAndTime from '@/utils/formateDateTime';
import { Spinner, spinner, Tooltip } from '@nextui-org/react';
import { FinanceCreationType } from '@prisma/client';
import { formatDate } from 'date-fns';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
const FinacesOverviewTableItem = () => {
  const appState = useAppSelector((state) => state.app);
  const [timeline, setTimeline] = useState<any[]>([]);
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });

  const urlSearchParams = useSearchParams();
  const startDate = useMemo(() => urlSearchParams.get('startDate') ? new Date(urlSearchParams.get('startDate')!) : null, [urlSearchParams]);
  const endDate = useMemo(() => urlSearchParams.get('endDate') ? new Date(urlSearchParams.get('endDate')!) : null, [urlSearchParams]);
  const selectedParties = useMemo(() => urlSearchParams.getAll('selectedParties'), [urlSearchParams]);
  const selectedInvoiceTypes = useMemo(() => urlSearchParams.getAll('selectedInvoiceTypes'), [urlSearchParams]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      let filteredData = data;

      if (startDate || endDate) {
        filteredData = filteredData.filter((item: any) => {
          const itemDate = new Date(item.sale?.date||item.purchases?.date||item.expenses?.date);
          console.log(itemDate)
          if (startDate && itemDate < startDate) return false;
          if (endDate && itemDate > endDate) return false;
          return true;
        });
      }

   
      if (selectedParties.length > 0) {
        filteredData = filteredData.filter((item: any) =>
          selectedParties.includes(item.sale?.customer || item.expenses?.party || item.purchases?.distributor)
        );
      }

      // Apply invoice type filter
      if (selectedInvoiceTypes.length > 0) {
        filteredData = filteredData.filter((item: any) =>
          selectedInvoiceTypes.includes(item.type || item.expenses?.type)
        );
      }

      setTimeline(filteredData);
    }
  }, [data, isLoading, error, startDate, endDate, selectedParties, selectedInvoiceTypes]);

  if(isLoading)return (<Loading/>)
  return (
   <>
   {timeline?.map((data,index)=>
        <div key={index+1} className='flex  w-full  box-border h-16 justify-evenly items-center bg-white border-0 border-b border-solid border-borderGrey hover:bg-gray-100 text-textGrey1 hover:text-textGrey2 transition '>    <div className='w-[8rem] flex items-center    text-neutral-400 text-base font-medium'>{formatDateAndTime(data.createdAt).formattedDate}</div>
                <div className='w-[8rem] flex  items-center    text-base font-medium'>{formatDateAndTime(data.createdAt).formattedTime}</div>
                <Link className='no-underline text-textGrey2' href={{
    pathname: data.type === FinanceCreationType.Sales_Estimate ? 'sales/existingsalesestimate' : 
              data.type === FinanceCreationType.Sales_Invoice ? 'sales/existingsales' : 
              data.type===FinanceCreationType.Sales_Return?'sales/existingsalesreturn':"",
    query: { id: data.id}
  }}> <div className='w-[10rem] flex  items-center    text-base font-medium'>{data.type||data.expense?.type||"unknown"}</div></Link>
                <div className='w-[12rem] flex  items-center    text-base font-medium'>{data.sale?.customer||data.purchases?.distributor||data.expenses?.party||"unknown"}</div>
                <div className='w-[12rem] flex  items-center    text-base font-medium'>{data.sale?.invoiceNo||data.purchases?.invoiceNo||data.expenses?.invoiceNo}</div>
                <div className='w-[8rem] flex  items-center    text-base font-medium'>{(data.sale?.totalCost||data.purchases?.totalCost||data.expenses?.totalCost)?.toFixed(2)}</div>
                <div className='w-[8rem] flex  items-center    text-base font-medium'>{data.sale?.totalQty||data.purchases?.totalQty||data.expenses?.totalQty}</div>
                <div className='w-[8rem] flex  items-center    text-base font-medium'>{formatDateAndTime(data.sale?.dueDate||data.purchases?.dueDate||data.expenses?.dueDate).formattedDate}</div>
                
                <div className='w-[10rem] flex  items-center  text-base font-medium'>
                  <Tooltip content={data.sale?.status||data.purchases?.status||data.expenses?.status} className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
                    <div className='bg-[#E7F5EE] rounded-md px-2 py-2' >
                        <span className="text-[#0F9D58]  text-sm font-medium ">{data.sale?.status||data.purchases?.status||data.expenses?.status}</span>
                    </div>
                  </Tooltip>
                </div>

        </div>
        )}
        </>
  )
}

export default FinacesOverviewTableItem