import React from 'react'
import FinancesNavbar from '@/components/finances/navbar/navbar';
import FinancesOverviewTable from '@/components/finances/overview/table/table';
import FinancesOverviewSheet from '@/components/finances/overview/balancesheet/balancesheet';


const Overview = () => {
  return (
    <>
    <div className='w-full bg-gray-200 p-8 px-10'>
        <FinancesNavbar/>
        <FinancesOverviewSheet/>
     <FinancesOverviewTable/>
    </div>
    </>
  )
}

export default Overview