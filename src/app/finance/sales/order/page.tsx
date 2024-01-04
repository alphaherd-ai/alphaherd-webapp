import React from 'react'

import Navbar from '@/components/navbar/navbar';
import FinancesNavbar from '@/components/finances/navbar/navbar';
import FinancesSalesTable from '@/components/finances/sales/table/table';


const SalesOrder = () => {
  return (
    <>
      <Navbar/>
    <div className='w-full bg-gray-300  bg-gray-300 p-5 px-10 '>
    <FinancesNavbar/>
<FinancesSalesTable/>
    </div>
    </>
  )
}

export default SalesOrder