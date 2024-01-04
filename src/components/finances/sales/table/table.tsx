
import React from 'react'
import FinancesSalesTableBottombar from './bottombar'
import FinacesOverviewTableBottombar from './bottombar'
import FinancesSalesTableHeader from './header'
import FinacesOverviewTableHeader from './header'
import FinancesSalesTableItem from './item'
import FinacesOverviewTableItem from './item'




const FinancesSalesTable = () => {
  return (
   
        <div className='flex flex-col w-full box-border mb-10  overflow-x-hidden'>

<FinancesSalesTableHeader/>
<FinancesSalesTableItem/>
<FinancesSalesTableBottombar/>
     
        </div>
   
  )
}

export default FinancesSalesTable