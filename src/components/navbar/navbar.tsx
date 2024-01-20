"use client";
import React, { useState } from 'react'




import FinancesIcon from './icons/financesIcon';
import notification from '../../assets/icons/navbar/notification.svg';
import alphaherd from '../../assets/icons/navbar/alphaherdLogo.svg';
import PatientlistIcon from './icons/patientlistIcon';
import InventoryIcon from './icons/inventoryIcon';
import HomeIcon from './icons/homeIcon';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';



const Navbar = () => {

  
const currentRoute = usePathname();
  return (
   
        <div className='h-16 shadow-md  w-full box-border flex items-center justify-between text-textGrey1 bg-navBar  '>
          <div className='flex flex-row '>
            <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800   ' href='/'>
          <div  className={currentRoute === "/" 
       ? " text-white  text-base font-medium leading-6  flex items-center justify-center " 
       : " text-gray-400  text-base font-medium leading-6  flex items-center justify-center"}>
            <HomeIcon fill={currentRoute === "/" 
       ? "#38F8E6" 
       : "#A2A3A3"} />
            <div className="ml-1">Home</div>
          </div>
            </Link>
            <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800  '   href='/finance/overview'>
          <div className={currentRoute.startsWith("/finance")
       ? " text-white  text-base font-medium leading-6  flex items-center justify-center " 
       : " text-gray-400  text-base font-medium leading-6  flex items-center justify-center"}>
           
            <FinancesIcon fill={currentRoute.startsWith("/finance") 
       ? "#38F8E6" 
       : "#A2A3A3"} />
            <div className="ml-1">Finances</div>
          </div>
          </Link>
            <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800 '   href='/inventory'>
          <div className={currentRoute.startsWith("/inventory") 
       ? " text-white  text-base font-medium leading-6  flex items-center justify-center " 
       : " text-gray-400  text-base font-medium leading-6  flex items-center justify-center"}>
          <InventoryIcon fill={currentRoute.startsWith("/inventory")  
       ? "#38F8E6" 
       : "#A2A3A3"} />
            <div className="ml-1">Inventory</div>
          </div>
          </Link>
            <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800 ' href='/clients'>
          <div className={currentRoute.startsWith("/clients")  
       ? " text-white  text-base font-medium leading-6  flex items-center justify-center " 
       : " text-gray-400  text-base font-medium leading-6  flex items-center justify-center"}>
            <PatientlistIcon fill={currentRoute.startsWith("/clients") 
       ? "#38F8E6" 
       : "#A2A3A3"} />
            <div className="ml-1">Database</div>
          </div>
          </Link>
            
          </div>
          <div className='flex flex-row h-full'>
            <div className="h-full flex items-center pr-8 border-0 border-r-2 border-solid border-gray-800">
          <Link className='no-underline flex ' href='#'>
          <div className=' flex items-center justify-center'>
            <Image src={notification} alt='notification' />
          </div> 
          </Link>
          <Link className='no-underline flex pl-6' href='#'>
          <div className='text-sm flex items-center justify-center rounded-full overflow-hidden border border-solid border-gray-300'>
          <Image src={notification} alt='patient' />
          </div>
          </Link>
          </div>
          <Link className='no-underline p-4 flex items-center justify-center h-full' href='/'>
         
         <div className='text-sm flex items-center  justify-center rounded-full '>
         <Image src={alphaherd} alt='alphaherd' className='w-7 h-7 '/>
         </div>
         </Link>
          </div>

        </div>
   
  )
}

export default Navbar