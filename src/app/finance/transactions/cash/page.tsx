import React from 'react'

import Navbar from '@/components/navbar/navbar';
import FinancesNavbar from '@/components/finances/navbar/navbar';
import FinancesTransactionsTable from '@/components/finances/transactions/table/table';



const TransactionsCash = () => {
  return (
    <>
      <Navbar/>
      <div className='w-full bg-gray-200 p-8 px-10' >
        <FinancesNavbar/>
     <FinancesTransactionsTable/>
    </div>
    </>
  )
}

export default TransactionsCash