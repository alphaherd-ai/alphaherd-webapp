import React from 'react'

import Navbar from '@/components/navbar/navbar';
import Existingsale from '@/components/finances/sales/existingsalesestimate/sales';
import ExistingsaleEstimateTable from "@/components/finances/sales/existingsalesestimate/table/table"
import ExistingsaleEstimateNavbar from "@/components/finances/sales/existingsalesestimate/navbar/navbar"


const ExistingsaleEstimate = () => {
  return (
    <>
      <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
    <ExistingsaleEstimateNavbar/>
               
               <ExistingsaleEstimateTable/>
    </div>
    </>
  )
}

export default ExistingsaleEstimate