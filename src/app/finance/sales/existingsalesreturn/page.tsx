import React from 'react'

import Navbar from '@/components/navbar/navbar';
import ExistingsaleReturnTable from "@/components/finances/sales/existingsalesreturn/table/table"
import ExistingsaleReturnNavbar from "@/components/finances/sales/existingsalesreturn/navbar/navbar"


const ExistingsaleReturn = () => {
  return (
    <>
      <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
    <ExistingsaleReturnNavbar/>
               
               <ExistingsaleReturnTable/>
    </div>
    </>
  )
}

export default ExistingsaleReturn