import React from 'react'

import Navbar from '@/components/navbar/navbar';
import Newsale from '@/components/finances/sales/newsalesestimate/sales';
import NewsaleEstimateTable from "@/components/finances/sales/newsalesestimate//table/table"
import NewsaleEstimateNavbar from "@/components/finances/sales/newsalesestimate//navbar/navbar"


const NewsaleEstimate = () => {
  return (
    <>
      <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
    <NewsaleEstimateNavbar/>
               
               <NewsaleEstimateTable/>
    </div>
    </>
  )
}

export default NewsaleEstimate