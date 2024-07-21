'use client';
import React, { useEffect, useMemo, useState } from 'react'
import FinancesSalesTableBottombar from './bottombar'
import FinacesOverviewTableBottombar from './bottombar'
import FinancesSalesTableHeader from './header'
import FinacesOverviewTableHeader from './header'
import { FinanceCreationType } from '@prisma/client';
import FinancesSalesTableItem from './item'
import FinacesOverviewTableItem from './item'
import { useAppSelector } from '@/lib/hooks';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
interface Sales {
  id:number;
  date:string;
  type:FinanceCreationType;
  customer:string;
  invoiceNo:number;
  totalCost:number;
  totalQty:number;
  dueDate:string;
  status:string;
}



const FinancesSalesTable = () => {

    const appState = useAppSelector((state) => state.app);
    const [sales,setSales]=useState<Sales[]>([]);
    const currentUrl=useSearchParams();
    const urlSearchParams = useSearchParams();
  const startDate = useMemo(() => urlSearchParams.get('startDate') ? new Date(urlSearchParams.get('startDate')!) : null, [urlSearchParams]);
  const endDate = useMemo(() => urlSearchParams.get('endDate') ? new Date(urlSearchParams.get('endDate')!) : null, [urlSearchParams]);
  const selectedParties = useMemo(() => urlSearchParams.getAll('selectedParties'), [urlSearchParams]);
  const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/getAll?branchId=${appState.currentBranchId}`,fetcher)
  useEffect(()=>{
    if(data&&!error&&!isLoading){
      let filteredData=data?.filter((sale:any)=>{
        if(currentUrl.get('type')==='all'){
          return true;
        }else {
          return sale.type===currentUrl.get('type');
        }
      })
      if (startDate || endDate) {
        filteredData = filteredData.filter((item: any) => {
          const itemDate = new Date(item.date);
          console.log(itemDate)
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

     
     
      setSales(filteredData);
    }
  },[data,error,isLoading,setSales,startDate, endDate, selectedParties])


      const [invoiceCount, setInvoiceCount] = useState(0);
      const [estimateCount, setEstimateCount] = useState(0);
      const [returnCount, setReturnCount] = useState(0);
    
      const handleCountsChange = (counts:any) => {
        setInvoiceCount(counts.invoiceCount);
        setEstimateCount(counts.estimateCount);
        setReturnCount(counts.returnCount);
      };
      console.log(invoiceCount,estimateCount,returnCount)
  return (
        <div className='flex flex-col w-full box-border mb-10  '>
              <FinancesSalesTableHeader invoiceCount={invoiceCount} estimateCount={estimateCount} returnCount={returnCount} sales={sales} />
    <div className='flex justify-around  w-full  border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Date</div>
                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Time</div>
                <div className=' flex text-gray-500 text-base font-medium   w-[4rem] '>Type</div>
                <div className=' flex text-gray-500 text-base font-medium px-4  w-2/12 '>Customer</div>
                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Serial no.</div>
                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Total Cost</div>
                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Total Qty.</div>
                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Due date</div>
           
                <div className=' flex text-gray-500 text-base font-medium  w-1/12'>Status</div>
                <div className='w-[3.5rem] '>
                  
                </div>
            </div>

<FinancesSalesTableItem onCountsChange={handleCountsChange} sales={sales} data={data} isLoading={isLoading} />
<FinancesSalesTableBottombar/>
     
        </div>
   
  )
}

export default FinancesSalesTable