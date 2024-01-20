import React from 'react'

import Navbar from '@/components/navbar/navbar';
import FinancesNavbar from '@/components/finances/navbar/navbar';
import FinancesOverviewTable from '@/components/finances/overview/table/table';


const Overview = () => {
  return (
    <>
      <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
        <FinancesNavbar/>
     <FinancesOverviewTable/>
    </div>
    </>
  )
}

export default Overview