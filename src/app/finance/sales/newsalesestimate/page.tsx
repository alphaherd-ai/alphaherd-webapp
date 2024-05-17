import React from 'react'
import NewsaleEstimateTable from "@/components/finances/sales/newsalesestimate//table/table"
import NewsaleEstimateNavbar from "@/components/finances/sales/newsalesestimate//navbar/navbar"


const NewsaleEstimate = () => {
  return (
    <>
    <div className='w-full bg-gray-200 p-8 px-10'>
    <NewsaleEstimateNavbar/>
               
               <NewsaleEstimateTable/>
    </div>
    </>
  )
}

export default NewsaleEstimate