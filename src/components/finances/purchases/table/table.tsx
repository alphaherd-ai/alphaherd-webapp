
import React from 'react'
import FinancesPurchasesTableBottombar from './bottombar'

import FinancesPurchasesTableHeader from './header'

import FinancesPurchasesTableItem from './item'




const FinancesPurchasesTable = () => {
  return (
   
        <div className='flex flex-col w-full box-border mb-10  overflow-x-scroll'>
<FinancesPurchasesTableHeader/>
<FinancesPurchasesTableItem/>
<FinancesPurchasesTableItem/>
<FinancesPurchasesTableItem/>
<FinancesPurchasesTableBottombar/>
     
        </div>
   
  )
}

export default FinancesPurchasesTable