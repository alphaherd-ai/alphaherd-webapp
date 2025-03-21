import ExsistingGrnNavbar from '@/components/finances/purchases/exsistinggrn/navbar/navbar'
import ExsistingGrnTable from '@/components/finances/purchases/exsistinggrn/table/table'
import React from 'react'



const ExsistingGrn = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-[#EDEDED] p-8 px-10'>
       <ExsistingGrnNavbar />
       <ExsistingGrnTable />
    </div>
    </>
  )
}

export default ExsistingGrn