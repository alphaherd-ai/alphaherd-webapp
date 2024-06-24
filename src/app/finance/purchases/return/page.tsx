import React from 'react'
import FinancesNavbar from '@/components/finances/navbar/navbar';
import FinancesPurchasesTable from '@/components/finances/purchases/table/table';
import NewPurchaseReturnNavbar from '@/components/finances/purchases/return/navbar/navbar';
import NewPurchaseReturnTable from '@/components/finances/purchases/return/table/table';



const PurchasesReturn = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-gray-200 p-8 px-10'>
      <NewPurchaseReturnNavbar />
      <NewPurchaseReturnTable />
    </div>
    </>
  )
}

export default PurchasesReturn