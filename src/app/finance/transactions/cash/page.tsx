import React from 'react'

import Navbar from '@/components/navbar/navbar';
import FinancesNavbar from '@/components/finances/navbar/navbar';
import FinancesTransactionsTable from '@/components/finances/transactions/table/table';
import FinancesTransactionSheet from '@/components/finances/transactions/balancesheet/balancesheet';



const TransactionsCash = () => {
  return (
    <>
      <Navbar/>
      <div className='w-full bg-gray-200 p-8 px-10' >
        <FinancesNavbar/>
        <FinancesTransactionSheet/>
     <FinancesTransactionsTable/>
    </div>
    </>
  )
}

export default TransactionsCash