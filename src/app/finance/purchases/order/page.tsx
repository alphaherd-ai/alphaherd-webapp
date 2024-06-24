import React from 'react'
import FinancesNavbar from '@/components/finances/navbar/navbar';
import FinancesPurchasesTable from '@/components/finances/purchases/table/table';
import NewPurchaseOrderNavbar from '@/components/finances/purchases/order/navbar/navbar';
import NewPurchasesTable from '@/components/finances/purchases/order/table/table';



const PurchasesOrder = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-gray-200 p-8 px-10'>
        <NewPurchaseOrderNavbar />
        <NewPurchasesTable />
    </div>
    </>
  )
}

export default PurchasesOrder