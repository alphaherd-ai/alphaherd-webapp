import ExsistingPurcaseReturnNavbar from '@/components/finances/purchases/exsistingpurchasereturn/navbar/navbar'
import ExsistingPurcaseReturnTable from '@/components/finances/purchases/exsistingpurchasereturn/table/table'
import React from 'react'


const ExsistingPurchasesReturn = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-gray-200 p-8 px-10'>
      <ExsistingPurcaseReturnNavbar />
      <ExsistingPurcaseReturnTable />

    </div>
    </>
  )
}

export default ExsistingPurchasesReturn