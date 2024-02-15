import React from 'react'

import Navbar from '@/components/navbar/navbar';
import ExistingsalesTable from "@/components/finances/sales/existingsales/table/table"
import ExistingsalesNavbar from "@/components/finances/sales/existingsales/navbar/navbar"


const Existingsales = () => {
  return (
    <>
      <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
    <ExistingsalesNavbar/>
     <ExistingsalesTable/>
    </div>
    </>
  )
}

export default Existingsales