import React from 'react'

import Navbar from '@/components/navbar/navbar';

import InventoryNavbar from '@/components/inventory/navbar/navbar';


const Inventory = () => {
  return (
    <>
    <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
  <InventoryNavbar/>

     
    </div>
    </>
  )
}

export default Inventory