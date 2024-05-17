import React from 'react'
import FinancesNavbar from '@/components/finances/navbar/navbar';
import FinancesSalesTable from '@/components/finances/sales/table/table';


const SalesInvoice = () => {
  return (
    <>
    <div className='w-full bg-gray-200 p-8 px-10'>
    <FinancesNavbar/>
<FinancesSalesTable/>
    </div>
    </>
  )
}

export default SalesInvoice