import React from 'react'

import Navbar from '@/components/navbar/navbar';
import FinancesNavbar from '@/components/finances/navbar/navbar';
import FinancesSalesTable from '@/components/finances/sales/table/table';


const SalesAll = () => {
  return (
    <>
      <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
    <FinancesNavbar/>
<FinancesSalesTable/>
    </div>
    </>
  )
}

export default SalesAll