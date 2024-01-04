import React from 'react'

import Navbar from '@/components/navbar/navbar';
import FinancesNavbar from '@/components/finances/navbar/navbar';
import FinancesPurchasesTable from '@/components/finances/purchases/table/table';



const PurchasesInvoice = () => {
  return (
    <>
      <Navbar/>
    <div className='w-full bg-gray-300 p-5 px-10'>
        <FinancesNavbar/>
        <FinancesPurchasesTable/>
    </div>
    </>
  )
}

export default PurchasesInvoice