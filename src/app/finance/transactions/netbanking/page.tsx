import React from 'react'
import FinancesNavbar from '@/components/finances/navbar/navbar';
import FinancesTransactionsTable from '@/components/finances/transactions/table/table';
import FinancesTransactionSheet from '@/components/finances/transactions/balancesheet/balancesheet';



const TransactionsNet = () => {
  return (
    <>
      <div className='w-full min-h-screen bg-[#EDEDED] p-8 px-10' >
        <FinancesNavbar/>
        <FinancesTransactionSheet/>
     <FinancesTransactionsTable/>
    </div>
    </>
  )
}

export default TransactionsNet