import React from 'react'
import {useSelector} from 'react-redux'
const TransactionsBlanceSheetItemExpenses = ({mode,filterdate}:any) => {

  const transactionAmount = useSelector((state:any) => state.transactionAmount)
  console.log(transactionAmount)
  const isodate = new Date(filterdate);
  
  const filteredTransactionAmount = transactionAmount.filter((item: { date: any })=>{
    const date=new Date(item.date);
    return date.getFullYear() === isodate.getFullYear() && date.getMonth() === isodate.getMonth() && date.getDate() === isodate.getDate()
  })

  console.log(filteredTransactionAmount);
  
  const totalMoneyIn = filteredTransactionAmount
    .filter((transaction:any) => transaction.mode === mode && transaction.invoiceLink?.startsWith('E'))
    .reduce((a:any, b:any) => (b.moneyChange === "In" ? a + b.amountPaid : a), 0);
  const totalMoneyOut = filteredTransactionAmount
    .filter((transaction:any) => transaction.mode === mode && transaction.invoiceLink?.startsWith('E'))
    .reduce((a:any, b:any) => (b.moneyChange === "Out" ? a + b.amountPaid : a), 0);

    
  return (
    
  <div className='w-full h-auto    flex flex-col gap-2 px-2'>
    <div className='flex justify-between bg-white px-4 py-2  rounded-[5px] items-center w-full h-full'>
      <div className='flex justify-start items-center gap-[212px]'>
          <div className= {`px-2 py-1.5 bg-[#E7F5EE] rounded-[5px] justify-center items-center gap-2 flex`}>
              <div className={`text-sm font-medium text-[#0F9D58]`}>Money In</div>
          </div>
      </div>
      <div className="text-right text-gray-500 text-sm font-bold ">₹ {totalMoneyIn}</div>
    </div>
    <div className='flex justify-between bg-white px-4 py-2  rounded-[5px] items-center w-full h-full'>
      <div className='flex justify-start items-center gap-[212px]'>
          <div className= {`px-2 py-1.5 bg-[#FFEAEA] rounded-[5px] justify-center items-center gap-2 flex`}>
              <div className={`text-sm font-medium text-[#FF3030]`}>Money Out</div>
          </div>
      </div>
      <div className="text-right text-gray-500 text-sm font-bold ">₹ {totalMoneyOut}</div>
    </div>
    <div className='flex justify-between bg-white px-4 py-2  rounded-[5px] items-center w-full h-full'>
      <div className='flex justify-start items-center gap-[212px]'>
          <div className= {`px-2 py-1.5 bg-[#EDEDED] rounded-[5px] justify-center items-center gap-2 flex`}>
              <div className={`text-sm font-medium text-[#6B7E7D]`}>Net</div>
          </div>
      </div>
      <div className="text-right text-gray-500 text-sm font-bold ">₹ {totalMoneyIn - totalMoneyOut}</div>
    </div>

  </div>


   
  )
}

export default TransactionsBlanceSheetItemExpenses