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
import { getSession } from 'next-auth/react';
import { useAppSelector, useAppStore } from '@/lib/hooks';
import NotificationList from '../home/NotificationCard/NotificationList';



const Navbar = () => {

  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);

const handleClick = () => {
  setIsCardOpen(!isCardOpen);
};


  // const store = useAppStore();
  const user = useAppSelector((state) => state.user);
  const currentRoute = usePathname();
  if (user.name === "" || currentRoute.startsWith("/auth")) return null;

  return (

    <div className='h-16 shadow-md  w-full box-border flex items-center justify-between text-textGrey1 bg-navBar  '>
      <div className='flex flex-row '>
        <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800   ' href='/'>
          <div className={currentRoute === "/"
            ? " text-white  text-base font-medium leading-6  flex items-center justify-center "
            : " text-gray-400  text-base font-medium leading-6  flex items-center justify-center"}>
            <HomeIcon fill={currentRoute === "/"
              ? "#38F8E6"
              : "#A2A3A3"} />
            <div className="ml-1">Home</div>
          </div>
        </Link>
        <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800  ' href='/finance/overview'>
          <div className={currentRoute.startsWith("/finance")
            ? " text-white  text-base font-medium leading-6  flex items-center justify-center "
            : " text-gray-400  text-base font-medium leading-6  flex items-center justify-center"}>

            <FinancesIcon fill={currentRoute.startsWith("/finance")
              ? "#38F8E6"
              : "#A2A3A3"} />
            <div className="ml-1">Finances</div>
          </div>
        </Link>
        <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800 ' href='/inventory/products/all'>
          <div className={currentRoute.startsWith("/inventory")
            ? " text-white  text-base font-medium leading-6  flex items-center justify-center "
            : " text-gray-400  text-base font-medium leading-6  flex items-center justify-center"}>
            <InventoryIcon fill={currentRoute.startsWith("/inventory")
              ? "#38F8E6"
              : "#A2A3A3"} />
            <div className="ml-1">Inventory</div>
          </div>
        </Link>
        <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800 ' href='/database/clients'>
          <div className={currentRoute.startsWith("/database")
            ? " text-white  text-base font-medium leading-6  flex items-center justify-center "
            : " text-gray-400  text-base font-medium leading-6  flex items-center justify-center"}>
            <PatientlistIcon fill={currentRoute.startsWith("/database")
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
            <div className='text-sm flex items-center justify-center rounded-full overflow-hidden border border-solid border-gray-300' onClick={handleClick}>
              <Image src={notification} alt='patient' />
            </div>
          </Link>
        </div>
        <Link className='no-underline p-4 flex items-center justify-center h-full' href='/settings'>

          <div className='text-sm flex items-center  justify-center rounded-full '>
            <Image src={alphaherd} alt='alphaherd' className='w-7 h-7 ' />
          </div>
        </Link>
        {isCardOpen && (
        <div className="absolute top-[4rem] flex flex-col right-[5rem] w-[443px] max-h-[50rem] pt-6 pb-5 bg-zinc-800 shadow justify-center items-start gap-[5px] rounded-[20px]">
          <div className="text-gray-100 text-xl font-medium font-['Roboto'] px-6">
            Notifications
          </div>
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
        </div>
      )}
      </div>

    </div>

  )
}

export default Navbar