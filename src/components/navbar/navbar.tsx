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
   
        <div className='h-10p   w-full box-border flex items-center justify-between text-textGrey1 bg-navBar  '>
          <div className='flex flex-row '>
            <Link className='no-underline p-4 border-0 border-r-2 border-solid border-gray-600   ' href='/'>
          <div  className={currentRoute === "/" 
       ? " text-white  text-lg  flex items-center justify-center " 
       : " text-gray-400  text-lg  flex items-center justify-center"}>
            <HomeIcon fill={currentRoute === "/" 
       ? "#38F8E6" 
       : "#A2A3A3"} />
            <div className="ml-1">Home</div>
          </div>
            </Link>
            <Link className='no-underline p-4 border-0 border-r-2 border-solid border-gray-600  '   href='/finance/overview'>
          <div className={currentRoute.startsWith("/finance")
       ? " text-white  text-lg  flex items-center justify-center " 
       : " text-gray-400  text-lg  flex items-center justify-center"}>
           
            <FinancesIcon fill={currentRoute.startsWith("/finance") 
       ? "#38F8E6" 
       : "#A2A3A3"} />
            <div className="ml-1">Finances</div>
          </div>
          </Link>
            <Link className='no-underline p-4 border-0 border-r-2 border-solid border-gray-600 '   href='/inventory'>
          <div className={currentRoute.startsWith("/inventory") 
       ? " text-white  text-lg  flex items-center justify-center " 
       : " text-gray-400  text-lg  flex items-center justify-center"}>
          <InventoryIcon fill={currentRoute.startsWith("/inventory")  
       ? "#38F8E6" 
       : "#A2A3A3"} />
            <div className="ml-1">Inventory</div>
          </div>
          </Link>
            <Link className='no-underline p-4 border-0 border-r-2 border-solid border-gray-600 ' href='/clients'>
          <div className={currentRoute.startsWith("/clients")  
       ? " text-white  text-lg  flex items-center justify-center " 
       : " text-gray-400  text-lg  flex items-center justify-center"}>
            <PatientlistIcon fill={currentRoute.startsWith("/clients") 
       ? "#38F8E6" 
       : "#A2A3A3"} />
            <div className="ml-1">Clients and Patients</div>
          </div>
          </Link>
            
          </div>
          <div className='flex flex-row items-center'>
          <Link className='no-underline p-1 flex items-center justify-center' href='#'>
          <div className=' flex items-center justify-center'>
            <Image src={notification} alt='notification' className='w-5 h-5'/>
          </div> 
          </Link>
          <Link className='no-underline p-1 h-full flex items-center justify-center  border-0 border-r-2 border-solid border-gray-600' href='#'>
          <div className='text-sm flex items-center justify-center rounded-full overflow-hidden border-2 border-solid border-gray-400'>
          <Image src={notification} alt='patient' className='w-4 h-4 '/>
          </div>
          </Link>
          <Link className='no-underline p-2 flex items-center justify-center' href='/'>
         
         <div className='text-sm flex items-center justify-center rounded-full overflow-hidden border-2 border-solid border-gray-400'>
         <Image src={alphaherd} alt='alphaherd' className='w-7 h-7 '/>
         </div>
         </Link>
          </div>

        </div>
   
  )
}

export default Navbar