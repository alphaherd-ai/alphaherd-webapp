"use client";
import React from 'react'



import Settings from '../../../assets/icons/finance/Settings.svg';
import Search from '../../../assets/icons/finance/Search.svg';


import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ServicesIcon from './icons/servicesIcon';
import ProductsIcon from './icons/productsIcon';



const InventoryNavbar = () => {

    const currentRoute = usePathname();

    return (

        <>
            <div className='flex h-12  w-full box-border justify-between rounded-tl-lg rounded-tr-lg'>
                <div className='flex w-8/12 h-full '>
                    <Link className='no-underline ' href='/inventory/products/timeline'>
                        <div  style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={currentRoute.startsWith("/inventory/products")
                            ? " flex items-center text-white px-4 py-2.5 bg-black   border-r-0 text-base rounded-tl-lg rounded-bl-lg "
                            : " flex items-center text-gray-400 bg-white px-4 py-2.5   border-r-0 text-base rounded-tl-lg rounded-bl-lg"}>

                            <div className='flex mr-2'><ProductsIcon fill={currentRoute.startsWith("/inventory/products") 
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                            Products
                        </div>
                    </Link>
                    <Link className='no-underline ' href='/inventory/services/timeline'>
                        <div  style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={currentRoute.startsWith("/inventory/services") ? " flex items-center text-white  text-base bg-black px-4 py-2.5 border-r-0 rounded-tr-lg rounded-br-lg " : "rounded-tr-lg rounded-br-lg  flex items-center text-gray-400 bg-white px-4 py-2.5 text-base   border-r-0"}>
                            <div className='flex mr-2'><ServicesIcon fill={currentRoute.startsWith("/inventory/services")
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                           Services
                        </div>
                    </Link>
             
                </div>
                <div className='flex h-full items-center  w-3/12'>
                    <div className="relative h-full w-10/12 items-center">
                        <input
                            name="Search"
                            type="text"
                            className='rounded-lg px-3 py-2 h-full box-border text-base border border-solid border-gray-400 w-full text-gray-400' style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }}
                            placeholder="Search"

                        />
                        <div className="absolute inset-y-0 right-3 pl-2 flex items-center pointer-events-none">
                      
                        <div className='flex items-center '><Image src={Search} alt='Search' className='w-5  h-5' /></div>
                 
                        </div>
                    </div>

                  
                    <Link className='no-underline h-full  ml-4' href='/finance/overview'>
                        <div className='flex items-center border border-solid border-gray-300 bg-white rounded-lg p-3  '><Image src={Settings} alt='Setting' className='w-5  h-5' /></div>
                    </Link>
                </div>
            </div >
        </>
    )
}

export default InventoryNavbar;