"use client";
import React from 'react'



import Settings from '../../../assets/icons/finance/Settings.svg';
import Search from '../../../assets/icons/finance/Search.svg';


import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PatientIcon from './icons/patientIcon';
import ClientIcon from './icons/clientIcon';



const DatabaseNavbar = () => {

    const currentRoute = usePathname();

    return (

        <>
            <div className='flex h-12  w-full box-border justify-between rounded-tl-lg rounded-tr-lg'>
                <div className='flex w-8/12 h-full '>
                    <Link className='no-underline ' href='/database/clients'>
                        <div  style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={currentRoute.startsWith("/database/clients")
                            ? " flex items-center text-white px-4 py-2.5 bg-black   border-r-0 text-base rounded-tl-lg rounded-bl-lg "
                            : " flex items-center text-gray-400 bg-white px-4 py-2.5   border-r-0 text-base rounded-tl-lg rounded-bl-lg"}>

                            <div className='flex mr-2'><ClientIcon fill={currentRoute.startsWith("/database/clients") 
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                            Clients
                        </div>
                    </Link>
                    <Link className='no-underline' href='/database/patient'>
                        <div  style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={currentRoute.startsWith("/database/patient") ? " flex items-center text-white  text-base bg-black px-4 py-2.5 border-r-0  " : "  flex items-center text-gray-400 bg-white px-4 py-2.5 text-base   border-r-0"}>
                            <div className='flex mr-2'><PatientIcon fill={currentRoute.startsWith("/database/patient")
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                           Patients
                        </div>
                    </Link>
                    <Link className='no-underline ' href='/database/distributor'>
                        <div  style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={currentRoute.startsWith("/database/distributor") ? " flex items-center text-white  text-base bg-black px-4 py-2.5 border-r-0 rounded-tr-lg rounded-br-lg " : "rounded-tr-lg rounded-br-lg  flex items-center text-gray-400 bg-white px-4 py-2.5 text-base   border-r-0"}>
                            <div className='flex mr-2'><PatientIcon fill={currentRoute.startsWith("/database/distributor")
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                           Distributors
                        </div>
                    </Link>
             
                </div>
                <div className='flex h-full items-center  w-3/12'>
                    <div className="relative h-full w-10/12 items-center">
                        <input
                            name="Search"
                            type="text"
                            className='rounded-lg px-3 py-2 h-full box-border text-base border border-solid border-gray-400 w-full text-gray-400 ' style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }}
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

export default DatabaseNavbar;