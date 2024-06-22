import ExsistingPurchaseOrderNavbar from '@/components/finances/purchases/exsistingpurchaseorder/navbar/navbar'
import ExsistingPurchasesTable from '@/components/finances/purchases/exsistingpurchaseorder/table/table'
import React from 'react'


const ExistingsaleEstimate = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-gray-200 p-8 px-10'>
    <ExsistingPurchaseOrderNavbar />
    <ExsistingPurchasesTable />
    </div>
    </>
  )
}

export default ExistingsaleEstimate