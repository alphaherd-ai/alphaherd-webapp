import CreateGrnNavbar from '@/components/finances/purchases/creategrn/navbar/navbar'
import CreateGrnTable from '@/components/finances/purchases/creategrn/table/table'
import React from 'react'



const PurchasesInvoice = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-gray-200 p-8 px-10'>
        <CreateGrnNavbar />
        <CreateGrnTable />
    </div>
    </>
  )
}

export default PurchasesInvoice