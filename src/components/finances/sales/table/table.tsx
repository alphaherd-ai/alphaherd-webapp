
import React from 'react'
import FinancesSalesTableBottombar from './bottombar'
import FinacesOverviewTableBottombar from './bottombar'
import FinancesSalesTableHeader from './header'
import FinacesOverviewTableHeader from './header'
import FinancesSalesTableItem from './item'
import FinacesOverviewTableItem from './item'




const FinancesSalesTable = () => {
  return (
        <div className='flex flex-col w-full box-border mb-10  '>
              <FinancesSalesTableHeader/>
    <div className='flex justify-around  w-full  border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Date</div>
                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Time</div>
                <div className=' flex text-gray-500 text-base font-medium   w-[4rem] '>Type</div>
                <div className=' flex text-gray-500 text-base font-medium px-4  w-2/12 '>Customer</div>
                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Serial no.</div>
                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Total cost</div>
                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Total qty</div>
                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>Due date</div>
           
                <div className=' flex text-gray-500 text-base font-medium  w-1/12'>Status</div>
                <div className='w-[3.5rem] '>
                  
                </div>
            </div>

<FinancesSalesTableItem/>
<FinancesSalesTableBottombar/>
     
        </div>
   
  )
}

export default FinancesSalesTable