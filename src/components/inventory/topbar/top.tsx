"use client";
import React from 'react'

import Graph from '../../../assets/icons/inventory/Graph.svg';
import Input from "next/input";

import PurchaseOrder from '../../../assets/icons/inventory/PurchaseOrder.svg';
import Services from '../../../assets/icons/inventory/Services.svg';
import Buy from '../../../assets/icons/inventory/Buy.svg';
import Settings from '../../../assets/icons/inventory/Settings.svg';
import Product from '../../../assets/icons/inventory/Product.png';
import Combination from '../../../assets/icons/inventory/Combination.svg';

import Image from 'next/image';




const Topbar = () => {

   
  
    return (

        <>
            <div className='flex  w-full px-10 py-5 box-border justify-between border border-solid border-gray-300 border-t-0.5 rounded-tl-lg rounded-tr-lg'>
<div className='flex'>
            <div className='flex items-center text-gray-400 bg-white  p-2 border border-solid border-gray-300 border-0.5 rounded-tl-lg rounded-bl-lg'>
<div className='flex  pl-2'><Image src={Product} alt='Sort' className='w-4 h-4 pr-1'/></div>
Product
</div>
<div className='flex items-center text-gray-400 bg-white  p-2 border border-solid border-gray-300 border-0.5'>
<div className='flex  pl-2'><Image src={Services} alt='Sort' className='w-4 h-4 pr-1'/></div>
Services
</div>
<div className='flex items-center text-gray-400 bg-white  p-2 border border-solid border-gray-300 border-0.5 '>
<div className='flex  pl-2'><Image src={Combination} alt='Sort' className='w-4 h-4 pr-1'/></div>
Combination
</div>
<div className='flex items-center text-gray-400 bg-white  p-2 border border-solid border-gray-300 border-0.5 rounded-tr-lg rounded-br-lg'>
<div className='flex  pl-2'><Image src={PurchaseOrder} alt='Sort' className='w-4 h-4 pr-1'/></div>
Purchase order
</div> 
</div>   
       <div className='flex  border border-solid border-gray-300 border-0.5 rounded-lg'>
                    <div > 
                    <input
        name="Search"
        type="text"
        className='rounded-lg px-3 py-1 boc-border text-xl border border-solid border-gray-300 text-gray-400'
        placeholder="Search"
       
      />
                    </div>

                    <div className='flex items-center border border-solid border-gray-300 bg-white rounded-lg ml-2'><Image src={Buy} alt='Graph' className='w-7  h-5' /></div>
                    <div className='flex items-center border border-solid border-gray-300 bg-white rounded-lg ml-2'><Image src={Settings} alt='Graph' className='w-7  h-5' /></div>
              
                </div>
            </div >
        </>
    )
}

export default Topbar