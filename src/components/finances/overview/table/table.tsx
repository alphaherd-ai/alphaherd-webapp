
import React from 'react'
import FinacesOverviewTableBottombar from './bottombar'
import FinacesOverviewHeader from './header'
import FinacesOverviewTableItem from './item'




const FinancesOverviewTable = () => {
  return (
   <>
<FinacesOverviewHeader/>
        <div className='flex flex-col w-full box-border mb-10  '>
        <div className='flex  w-full  box-border bg-gray-100  h-12 py-1 border-b border-neutral-400 text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Date</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Time</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12 '>Type</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12 '>Party</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Serial Name</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Total cost</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Total qty</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Due date</div>
           
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>Status</div>
            </div>
<FinacesOverviewTableItem/>
   <FinacesOverviewTableBottombar/>
     
        </div>
        </>
  )
}

export default FinancesOverviewTable;