import DatabaseClientTable from '@/components/database/client/table'
import DatabaseNavbar from '@/components/database/navbar/navbar'
import Navbar from '@/components/navbar/navbar'
import React from 'react'

const Clients = () => {
  return (
   <>
   <Navbar/>
   <div className='w-full bg-gray-200 p-8 px-10'>
    <DatabaseNavbar/>
   <DatabaseClientTable/> 
   </div>
   </>
  )
}

export default Clients