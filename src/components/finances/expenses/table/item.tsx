'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { Spinner, Tooltip } from '@nextui-org/react'
import formatDateAndTime from '@/utils/formateDateTime'
import { useAppSelector } from '@/lib/hooks';
import Loading from '@/app/loading';
import { FinanceCreationType } from '@prisma/client';
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())

const FinancesExpensesTableItem = ({onCountsChange}:any) => {
const [expenses,setExpenses]=useState<any[]>([]);
const appState = useAppSelector((state) => state.app);
  const
  {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/expenses/getAll?branchId=${appState.currentBranchId}`,fetcher,{revalidateOnFocus:true});
  useEffect(()=>{
  if(!isLoading&&data&&!error){
  setExpenses(data);
  }
  },[data,error,isLoading]);
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
    <div key={index+1} className='flex  w-full  box-border h-16 justify-evenly items-center bg-white   border-0 border-b border-solid border-borderGrey  hover:bg-gray-200 text-textGrey1  hover:text-textGrey2  transition'>
      <div className='w-[6rem] flex   text-base font-medium'>{formatDateAndTime(expense.date).formattedDate}</div>
      <div className='w-[6rem] flex   text-base font-medium'>{formatDateAndTime(expense.date).formattedTime}</div>
      <Link
  href={{
    pathname: expense.type === FinanceCreationType.Expense_NonRecurring ? 'exsistingnonrecurring' : 
              expense.type === FinanceCreationType.Expense_Recurring ? 'exsistingrecurring':"",
    query: { id: expense.id}
  }}
>
      <div className='w-[10rem] flex text-base font-medium'>{expense.type}</div>
      </Link>
      <div className='w-2/12 flex   text-base font-medium '>{expense.party}</div>
      <div className='w-[9rem] flex   text-base font-medium'>{expense.invoiceNo}</div>
      <div className='w-1/12 flex   text-base font-medium'>$ {(expense.totalCost).toFixed(2)}</div>
      <div className='w-[9rem] flex   text-base font-medium'>{expense.totalQty} items</div>
      <div className='w-[6rem] flex   text-base font-medium'>{formatDateAndTime(expense.dueDate).formattedDate}</div>
      <div className='w-[12rem] flex  items-center  text-base font-medium'>
      <Tooltip content={expense.status} className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
      <div className='bg-[#E7F5EE] rounded-md px-2 py-2' >
          <span className="text-[#0F9D58]  text-sm font-medium ">{expense.status}</span>
      </div>
      </Tooltip>

 </div>

    </div>
    )}
  </div>
  )
  }

  export default FinancesExpensesTableItem