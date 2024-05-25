"use client";
import React from 'react'
import NewsalesReturnTable from "@/components/finances/sales/newsalesreturn/table/table"
import NewsalesReturnNavbar from "@/components/finances/sales/newsalesreturn/navbar/navbar"
import { DataProvider } from '@/components/finances/sales/newsalesreturn/table/DataContext'


const NewsalesReturn = () => {
  return (
    <>
    <div className='w-full bg-gray-200 p-8 px-10'>
    <DataProvider>

    <NewsalesReturnNavbar/>
               
               <NewsalesReturnTable/>
      </DataProvider>

    </div>
    </>
  )
}

export default NewsalesReturn