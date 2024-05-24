import DatabaseClientTable from '@/components/database/client/table'
import DatabaseNavbar from '@/components/database/navbar/navbar'
import React from 'react'

const Clients = () => {
  return (
   <>
   <div className='w-full min-h-screen bg-gray-200 p-8 px-10'>
    <DatabaseNavbar/>
   <DatabaseClientTable/> 
   </div>
   </>
  )
}

export default Clients