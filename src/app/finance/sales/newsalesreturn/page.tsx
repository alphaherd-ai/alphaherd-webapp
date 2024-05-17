import React from 'react'
import NewsalesReturnTable from "@/components/finances/sales/newsalesreturn/table/table"
import NewsalesReturnNavbar from "@/components/finances/sales/newsalesreturn/navbar/navbar"


const NewsalesReturn = () => {
  return (
    <>
    <div className='w-full bg-gray-200 p-8 px-10'>
    <NewsalesReturnNavbar/>
               
               <NewsalesReturnTable/>
    </div>
    </>
  )
}

export default NewsalesReturn