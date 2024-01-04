import React from 'react'

import Navbar from '@/components/navbar/navbar';
import FinancesNavbar from '@/components/finances/navbar/navbar';



const Transactions = () => {
  return (
    <>
      <Navbar/>
    <div className='w-full bg-gray-300 bg-gray-300 p-5 px-10'>
        <FinancesNavbar/>
     
    </div>
    </>
  )
}

export default Transactions