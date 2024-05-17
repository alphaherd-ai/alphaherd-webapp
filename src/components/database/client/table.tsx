import React from 'react'

import DatabaseClientBottombar from './bottombar'
import DatabaseClientHeader from './header'
import DatabaseClientTableItem from './items'
const DatabaseClientTable = () => {
  return (
        <div className='flex flex-col w-full box-border mb-10  cursor-default'>
            <DatabaseClientHeader/>
    <div className='flex  w-full justify-evenly   box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Client</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Pet</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Phone No.</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Email</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Last Visit</div>
            
            </div>
<DatabaseClientTableItem/>
<DatabaseClientBottombar/>
     
        </div>
   
  )
}

export default DatabaseClientTable