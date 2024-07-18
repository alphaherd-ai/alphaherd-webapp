"use client";
import React from 'react'
import NewsaleEstimateTable from "@/components/finances/sales/newsalesestimate//table/table"
import NewsaleEstimateNavbar from "@/components/finances/sales/newsalesestimate//navbar/navbar"
import { DataProvider } from '@/components/finances/sales/newsalesestimate/table/DataContext'


const NewsaleEstimate = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-[#EDEDED] p-8 px-10'>
    <DataProvider>
    <NewsaleEstimateNavbar/>
               
               <NewsaleEstimateTable/>
       </DataProvider>
    </div>
    </>
  )
}

export default NewsaleEstimate