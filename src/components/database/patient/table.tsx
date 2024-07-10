import React from 'react'

import DatabasePatientBottombar from './bottombar'
import DatabasePatientHeader from './header'
import DatabasePatientTableItem from './items'
const DatabasePatientTable = () => {
  return (
        <div className='flex flex-col w-full box-border mb-10  cursor-default'>
            <DatabasePatientHeader/>
    <div className='flex  w-full justify-evenly  box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Patient</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Client</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Species and Breed</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Age</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Sex</div>
            
            </div>
<DatabasePatientTableItem/>
<DatabasePatientBottombar/>
     
        </div>
   
  )
}

export default DatabasePatientTable