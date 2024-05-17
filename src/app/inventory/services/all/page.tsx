import React from 'react'
import InventoryNavbar from '@/components/inventory/navbar/navbar';
import InventoryServicesAllTable from '@/components/inventory/services/table/allproducttable';


const InventoryAllServicesTable = () => {
  return (
    <>
    <div className='w-full bg-gray-200 p-8 px-10'>
  <InventoryNavbar/>
<InventoryServicesAllTable/>
     
    </div>
    </>
  )
}

export default InventoryAllServicesTable