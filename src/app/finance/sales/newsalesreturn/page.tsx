import React from 'react'

import Navbar from '@/components/navbar/navbar';
import Newsale from '@/components/finances/sales/newsalesreturn/sales';
import NewsalesReturnTable from "@/components/finances/sales/newsalesreturn/table/table"
import NewsalesReturnNavbar from "@/components/finances/sales/newsalesreturn/navbar/navbar"


const NewsalesReturn = () => {
  return (
    <>
      <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
    <NewsalesReturnNavbar/>
               
               <NewsalesReturnTable/>
    </div>
    </>
  )
}

export default NewsalesReturn