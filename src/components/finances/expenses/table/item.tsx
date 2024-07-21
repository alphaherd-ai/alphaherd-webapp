'use client';
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { Spinner } from '@nextui-org/react'
import formatDateAndTime from '@/utils/formateDateTime'
import { useAppSelector } from '@/lib/hooks';
import Loading from '@/app/loading';
import { FinanceCreationType } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())

const FinancesExpensesTableItem = ({onCountsChange}:any) => {
const [expenses,setExpenses]=useState<any[]>([]);
const appState = useAppSelector((state) => state.app);
const urlSearchParams = useSearchParams();
  const startDate = useMemo(() => urlSearchParams.get('startDate') ? new Date(urlSearchParams.get('startDate')!) : null, [urlSearchParams]);
  const endDate = useMemo(() => urlSearchParams.get('endDate') ? new Date(urlSearchParams.get('endDate')!) : null, [urlSearchParams]);
  const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/expenses/getAll?branchId=${appState.currentBranchId}`,fetcher,{revalidateOnFocus:true});
  const selectedParties = useMemo(() => urlSearchParams.getAll('selectedParties'), [urlSearchParams]);
  useEffect(()=>{
  if(!isLoading&&data&&!error){
    let filteredData=data;
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
        selectedParties.includes(item.party)
      );
    }
  setExpenses(filteredData);
  }
  },[data,error,isLoading,setExpenses,startDate, endDate, selectedParties]);
  const [nonrecurringCount, setNonRecurringCount] = useState(0);
  const [recurringCount, setRecurringCount] = useState(0);
  useEffect(() => {
    if (data) {
      setRecurringCount(data.filter((expense:any) => expense.type === FinanceCreationType.Expense_Recurring).length);
      setNonRecurringCount(data.filter((expense:any) => expense.type === FinanceCreationType.Expense_NonRecurring).length);
    }
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
  if(isLoading)return (<Loading/>)
  return (
  <div>
    {expenses?.map((expense,index)=>
    <div key={index+1}
      className='flex  w-full justify-evenly items-center  box-border h-16 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
      <div className='w-[6rem] flex    text-neutral-400 text-base font-medium'>{formatDateAndTime(expense.date).formattedDate}</div>
      <div className='w-[6rem] flex    text-neutral-400 text-base font-medium'>{formatDateAndTime(expense.date).formattedTime}</div>
      <Link
  href={{
    pathname: expense.type === FinanceCreationType.Expense_NonRecurring ? 'exsistingnonrecurring' : 
              expense.type === FinanceCreationType.Expense_Recurring ? 'exsistingrecurring':"",
    query: { id: expense.id}
  }}
>
      <div className='w-[10rem] flex  text-neutral-400 text-base font-medium'>{expense.type}</div>
      </Link>
      <div className='w-2/12 flex    text-neutral-400 text-base font-medium '>{expense.party}</div>
      <div className='w-[9rem] flex    text-neutral-400 text-base font-medium'>{expense.invoiceNo}</div>
      <div className='w-1/12 flex    text-neutral-400 text-base font-medium'>$ {(expense.totalCost).toFixed(2)}</div>
      <div className='w-[9rem] flex    text-neutral-400 text-base font-medium'>{expense.totalQty} items</div>
      <div className='w-[6rem] flex    text-neutral-400 text-base font-medium'>{formatDateAndTime(expense.dueDate).formattedDate}</div>
      <div className='w-[12rem] flex  text-base font-medium text-green-500'><span
          className='bg-green-100 px-1'>{expense.status}</span> </div>

    </div>
    )}
  </div>
  )
  }

  export default FinancesExpensesTableItem