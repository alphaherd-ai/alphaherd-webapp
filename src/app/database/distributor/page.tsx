import DatabaseDistributorTable from '@/components/database/distributor/table'
import DatabaseNavbar from '@/components/database/navbar/navbar'
import React from 'react'

const Distributors = () => {
  return (
   <>
   <div className='w-full min-h-screen bg-gray-200 p-8 px-10'>
<DatabaseNavbar/>
<DatabaseDistributorTable/>
   </div>
   </> 
  )
}

export default Distributors