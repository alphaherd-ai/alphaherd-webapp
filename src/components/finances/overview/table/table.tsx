
import React from 'react'
import FinacesOverviewTableBottombar from './bottombar'
import FinacesOverviewHeader from './header'
import FinacesOverviewTableItem from './item'




const FinancesOverviewTable = () => {
  return (
   <>
<FinacesOverviewHeader/>
        <div className='flex flex-col w-full box-border mb-10  overflow-x-scroll'>
        <div className='flex  w-full  box-border bg-gray-200 py-1 border border-solid border-gray-300 border-t-0.5 text-gray-500'>
                <div className=' flex py-2 px-4 items-center  text-base'>Date</div>
                <div className=' flex py-2 px-3 items-center  text-base'>Time</div>
                <div className=' flex py-2 px-3 items-center  text-base'>Type</div>
                <div className=' flex py-2 px-3 items-center  text-base'>Party</div>
                <div className=' flex py-2 px-3 items-center  text-base'>Serial Name</div>
                <div className=' flex py-2 px-3 items-center  text-base'>Total cost</div>
                <div className=' flex py-2 px-3 items-center  text-base'>Total quantity</div>
                <div className=' flex py-2 px-3 items-center  text-base'>Due date</div>
                <div className=' flex py-2 px-3 items-center  text-base'>Quantity</div>
                <div className=' flex py-2 px-4 items-center  text-base'>Status</div>
            </div>
<FinacesOverviewTableItem/>
<FinacesOverviewTableItem/>
<FinacesOverviewTableItem/>
<FinacesOverviewTableItem/>
<FinacesOverviewTableItem/>
<FinacesOverviewTableItem/>
<FinacesOverviewTableItem/>
<FinacesOverviewTableItem/>
   <FinacesOverviewTableBottombar/>
     
        </div>
        </>
  )
}

export default FinancesOverviewTable;