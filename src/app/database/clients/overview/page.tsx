import ClientDetails from '@/components/database/client/clientoverview/clientoverview'
import React from 'react'


const ClientOverview = () => {
  return (
    <>
        <div className='w-full bg-gray-200 p-8 px-10'> 
            <ClientDetails/>
        </div>
    </>
  )
}

export default ClientOverview