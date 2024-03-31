import React from 'react'
import ExistingsaleEstimateTable from "@/components/finances/sales/existingsalesestimate/table/table"
import ExistingsaleEstimateNavbar from "@/components/finances/sales/existingsalesestimate/navbar/navbar"


const ExistingsaleEstimate = () => {
  return (
    <>
    <div className='w-full bg-gray-200 p-8 px-10'>
    <ExistingsaleEstimateNavbar/>
               
               <ExistingsaleEstimateTable/>
    </div>
    </>
  )
}

export default ExistingsaleEstimate