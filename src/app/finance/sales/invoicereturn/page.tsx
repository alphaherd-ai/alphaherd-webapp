"use client";
import React from 'react'
import InvoiceReturnTable from "@/components/finances/sales/invoicereturn/table/table"
import InvoiceReturnNavbar from "@/components/finances/sales/invoicereturn/navbar/navbar"
import { DataProvider } from '@/components/finances/sales/invoicereturn/table/DataContext'


const InvoiceReturn = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-[#EDEDED] p-8 px-10'>
    <DataProvider>

    <InvoiceReturnNavbar/>
               
               <InvoiceReturnTable/>
      </DataProvider>

    </div>
    </>
  )
}

export default InvoiceReturn