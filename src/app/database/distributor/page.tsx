import DatabaseDistributorTable from '@/components/database/distributor/table'
import DatabaseNavbar from '@/components/database/navbar/navbar'
import Navbar from '@/components/navbar/navbar'
import React from 'react'

const Distributors = () => {
  return (
   <>
   <Navbar/>
   <div className='w-full bg-gray-200 p-8 px-10'>
<DatabaseNavbar/>
<DatabaseDistributorTable/>
   </div>
   </> 
  )
}

export default Distributors