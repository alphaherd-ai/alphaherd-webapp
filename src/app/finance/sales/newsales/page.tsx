import React from 'react'

import Navbar from '@/components/navbar/navbar';
import NewsalesTable from "@/components/finances/sales/newsales/table/table"
import NewsalesNavbar from "@/components/finances/sales/newsales/navbar/navbar"


const Newsales = () => {
  return (
    <>
      <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
    <NewsalesNavbar/>
     <NewsalesTable/>
    </div>
    </>
  )
}

export default Newsales