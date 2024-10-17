'use client';
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { Spinner, Tooltip } from '@nextui-org/react'
import formatDateAndTime from '@/utils/formateDateTime'
import { useAppSelector } from '@/lib/hooks';
import Loading from '@/app/loading';
import { FinanceCreationType } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

const FinancesExpensesTableItem = ({ onCountsChange,currentPageNumber,setCurrentPageNumber,setStartInd,setEndInd,setTotalLen,pagevalue }: {onCountsChange:any,currentPageNumber:number,setCurrentPageNumber:React.Dispatch<React.SetStateAction<number>>,setStartInd:React.Dispatch<React.SetStateAction<number>>,setEndInd:React.Dispatch<React.SetStateAction<number>>,setTotalLen:React.Dispatch<React.SetStateAction<number>>,pagevalue:number}) => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [tableData,setTableData]=useState<any[]>([]);
  const appState = useAppSelector((state) => state.app);
  const urlSearchParams = useSearchParams();
  const startDate = useMemo(() => urlSearchParams.get('startDate') ? new Date(urlSearchParams.get('startDate')!) : null, [urlSearchParams]);
  const endDate = useMemo(() => urlSearchParams.get('endDate') ? new Date(urlSearchParams.get('endDate')!) : null, [urlSearchParams]);
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/expenses/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });
  const selectedParties = useMemo(() => urlSearchParams.getAll('selectedParties'), [urlSearchParams]);
  //Pagination in the table
  useEffect(()=>{
    const start=(currentPageNumber-1)*pagevalue;
    const end=currentPageNumber*pagevalue;
    setStartInd(start);
    setEndInd(end);
    setExpenses(tableData.slice(start, end));
  },[currentPageNumber])

  useEffect(() => {
    if (!isLoading && data && !error) {
      let filteredData = data;
      if (startDate || endDate) {
        filteredData = filteredData.filter((item: any) => {
          const itemDate = new Date(item.date);
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

      
      const recurringExpenses = filteredData.filter((item: any) => item.type === FinanceCreationType.Expense_Recurring);
      const allExpenses = [...filteredData];

      recurringExpenses.forEach((expense: any) => {
        const repeatInterval = getRepeatInterval(expense.recurringRepeatType);
        // console.log("THIs is repeat type ", repeatInterval)
        const frequency = calculateFrequency(expense.recurringStartedOn, expense.recurringEndson, repeatInterval);
        // console.log("this is frequency",frequency)
        for (let i = 0; i <= frequency; i++) {
          const recurrenceDate = new Date(expense.recurringStartedOn);
          recurrenceDate.setDate(recurrenceDate.getDate() + i * repeatInterval);
          // console.log("this is recurrence date", recurrenceDate)
          
          if ((!startDate || recurrenceDate >= startDate) && (!endDate || recurrenceDate <= endDate)) {
            allExpenses.push({ ...expense, date: recurrenceDate });
          }
        }
      });
      setTotalLen(allExpenses.length);
      setTableData(allExpenses);
      setExpenses(allExpenses.slice(0,pagevalue));
    }
  }, [data, error, isLoading, setExpenses, startDate, endDate, selectedParties]);

  const [nonrecurringCount, setNonRecurringCount] = useState(0);
  const [recurringCount, setRecurringCount] = useState(0);

  useEffect(() => {
    if (data) {
      setRecurringCount(data.filter((expense: any) => expense.type === FinanceCreationType.Expense_Recurring).length);
      setNonRecurringCount(data.filter((expense: any) => expense.type === FinanceCreationType.Expense_NonRecurring).length);
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

  if (isLoading) return (<Loading />)

  return (
    <div>
      {expenses?.map((expense, index) =>
        <div key={index + 1} className='flex  w-full  box-border h-16 justify-evenly items-center bg-white   border-0 border-b border-solid border-borderGrey  hover:bg-gray-200 text-textGrey1  hover:text-textGrey2  transition'>
          <div className='w-[6rem] flex   text-base font-medium'>{formatDateAndTime(expense.date).formattedDate}</div>
          <div className='w-[6rem] flex   text-base font-medium'>{formatDateAndTime(expense.date).formattedTime}</div>
          <Link
            href={{
              pathname: expense.type === FinanceCreationType.Expense_NonRecurring ? 'exsistingnonrecurring' :
                expense.type === FinanceCreationType.Expense_Recurring ? 'exsistingrecurring' : "",
              query: { id: expense.id }
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

const getRepeatInterval = (repeatType: string) => {
  switch (repeatType) {
    case 'everyDay': return 1;
    case 'everyWeek': return 7;
    case 'everyMonth': return 30;
    case 'everyYear': return 365;
    default: return 1;
  }
}

const calculateFrequency = (startDate: Date, endDate: Date, interval: number) => {
  // console.log("this is start date", startDate,endDate)
  endDate= new Date(endDate)
  startDate=new Date(startDate)
  if (!startDate || !endDate) return 0;
  const currentDate= new Date();
  let diffTime;
  if(currentDate.getTime()<endDate.getTime()){
  diffTime= Math.abs(currentDate.getTime()-startDate.getTime());  
  }
  else {
    diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  }
  // console.log("this is diff time",diffTime)
  return Math.floor(diffTime / (interval * 24 * 60 * 60 * 1000));
}

export default FinancesExpensesTableItem
