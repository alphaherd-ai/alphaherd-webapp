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
import { getStatusStyles } from '@/utils/getStatusStyles';

//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
const FinacesOverviewTableItem = ({currentPageNumber,setCurrentPageNumber,setStartInd,setEndInd,setTotalLen,pagevalue}:{currentPageNumber:number,setCurrentPageNumber:React.Dispatch<React.SetStateAction<number>>,setStartInd:React.Dispatch<React.SetStateAction<number>>,setEndInd:React.Dispatch<React.SetStateAction<number>>,setTotalLen:React.Dispatch<React.SetStateAction<number>>,pagevalue:number}) => {
  const appState = useAppSelector((state) => state.app);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [tableData,setTableData]=useState<any[]>([]);
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });

  const urlSearchParams = useSearchParams();
  const startDate = useMemo(() => urlSearchParams.get('startDate') ? new Date(urlSearchParams.get('startDate')!) : null, [urlSearchParams]);
  const endDate = useMemo(() => urlSearchParams.get('endDate') ? new Date(urlSearchParams.get('endDate')!) : null, [urlSearchParams]);
  const selectedParties = useMemo(() => urlSearchParams.getAll('selectedParties'), [urlSearchParams]);
  const selectedInvoiceTypes = useMemo(() => urlSearchParams.getAll('selectedInvoiceTypes'), [urlSearchParams]);
  const selectedStatus = useMemo(() => urlSearchParams.getAll('selectedStatus'), [urlSearchParams]);
  //Pagination in the table
  useEffect(()=>{
    const start=(currentPageNumber-1)*pagevalue;
    const end=currentPageNumber*pagevalue;
    setStartInd(start);
    setEndInd(end);
    setTimeline(tableData.slice(start, end));
  },[currentPageNumber])

  useEffect(() => {
    if (!isLoading && !error && data) {
      let filteredData = data;
      console.log(filteredData);
      if (startDate || endDate) {
        filteredData = filteredData.filter((item: any) => {
          const itemDate = new Date(item.sale?.date||item.purchases?.date||item.expenses?.date);
          // console.log(itemDate)
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

      if(selectedStatus.length>0){
        console.log(selectedStatus);
        filteredData=filteredData.filter((item:any)=>
        selectedStatus.some((status)=>(item.sale?.status?.startsWith(status)) || (item.purchases?.status?.startsWith(status)) || (item.expenses?.status?.startsWith(status)))
        )
      }
      setTotalLen(filteredData.length);
      setTableData(filteredData);
      setTimeline(filteredData.slice(0,pagevalue));
    }
  }, [data, isLoading, error, startDate, endDate, selectedParties, selectedInvoiceTypes,selectedStatus]);

  if (isLoading) return (<Loading />)



  return (
    <>
      {timeline?.map((data: any, index: any) =>
        <div key={index + 1} className='flex  w-full  box-border h-16 justify-evenly items-center bg-white border-0 border-b border-solid border-borderGrey hover:bg-gray-100 text-textGrey1 hover:text-textGrey2 transition '>    <div className='w-[8rem] flex items-center    text-neutral-400 text-base font-medium'>{formatDateAndTime(data.createdAt).formattedDate}</div>
          <div className='w-[8rem] flex  items-center    text-base font-medium'>{formatDateAndTime(data.createdAt).formattedTime}</div>
          <Link className='no-underline text-textGrey2' href={{
            pathname: data.type === FinanceCreationType.Sales_Estimate ? 'sales/existingsalesestimate' :
              data.type === FinanceCreationType.Sales_Invoice ? 'sales/existingsales' :
                data.type === FinanceCreationType.Sales_Return ? 'sales/existingsalesreturn' : "",
            query: { id: data.salesId }
          }}> <div className='w-[10rem] flex  items-center    text-base font-medium'>{data.type || data.expense?.type || "unknown"}</div></Link>
          <div className='w-[12rem] flex  items-center    text-base font-medium'>{data.sale?.customer || data.purchases?.distributor || data.expenses?.party || "unknown"}</div>
          <div className='w-[12rem] flex  items-center    text-base font-medium'>{data.sale?.invoiceNo || data.purchases?.invoiceNo || data.expenses?.invoiceNo}</div>
          <div className='w-[8rem] flex  items-center    text-base font-medium'>{(data.sale?.totalCost || data.purchases?.totalCost || data.expenses?.totalCost)?.toFixed(2)}</div>
          <div className='w-[8rem] flex  items-center    text-base font-medium'>{data.sale?.totalQty || data.purchases?.totalQty || data.expenses?.totalQty}</div>
          <div className='w-[8rem] flex  items-center    text-base font-medium'>{formatDateAndTime(data.sale?.dueDate || data.purchases?.dueDate || data.expenses?.dueDate).formattedDate}</div>

          <div className='w-[10rem] flex  items-center  text-base font-medium'>
          <Tooltip content={data.sale?.status || data.expenses?.status || data.purchases?.status} className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
          <div>
                {
                  (() => {
                    const statusParts = (data.sale?.status || data.expenses?.status || data.purchases?.status).split('|').map((part: string) => part.trim());
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

        </div>
      )}
    </>
  )
}

export default FinacesOverviewTableItem