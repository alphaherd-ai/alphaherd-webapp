"use client";
import React from 'react'
import NewsalesTable from "@/components/finances/sales/newsales/table/table"
import NewsalesNavbar from "@/components/finances/sales/newsales/navbar/navbar"
import { DataProvider } from '@/components/finances/sales/newsales/table/DataContext'


const Newsales = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-gray-200 p-8 px-10'>

        <DataProvider>
      <NewsalesNavbar/>
     <NewsalesTable/>
      </DataProvider>

    </div>
    </>
  )
}

export default Newsales