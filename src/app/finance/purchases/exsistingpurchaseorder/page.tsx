import ExsistingPurchaseOrderNavbar from '@/components/finances/purchases/exsistingpurchaseorder/navbar/navbar'
import ExsistingPurchasesTable from '@/components/finances/purchases/exsistingpurchaseorder/table/table'
import React from 'react'


const ExistingPurchaseOrder = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-[#EDEDED] p-8 px-10'>
    <ExsistingPurchaseOrderNavbar />
    <ExsistingPurchasesTable />
    </div>
    </>
  )
}

export default ExistingPurchaseOrder