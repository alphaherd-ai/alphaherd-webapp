import React from 'react'
import ExistingsaleReturnTable from "@/components/finances/sales/existingsalesreturn/table/table"
import ExistingsaleReturnNavbar from "@/components/finances/sales/existingsalesreturn/navbar/navbar"


const ExistingsaleReturn = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-[#EDEDED] p-8 px-10'>
    <ExistingsaleReturnNavbar/>
               
               <ExistingsaleReturnTable/>
    </div>
    </>
  )
}

export default ExistingsaleReturn