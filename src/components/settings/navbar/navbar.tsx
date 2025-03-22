"use client";
import React from 'react'



import Search from '../../../assets/icons/finance/Search.svg';


import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import SettingsIcon from './icons/settingsIcon';
import OrganisationIcon from './icons/organisationIcon';
import lefticon from "../../../assets/icons/settings/left_icon.svg"



const SettingsNavbar = () => {
    const currentRoute = usePathname();
    const router= useRouter();

    return (

        <>
            <div className='flex h-12  w-full box-border justify-between rounded-tl-lg rounded-tr-lg'>
                <div className='flex w-8/12 h-full '>
                {/* <div className="flex items-center justify-center w-11 h-11 bg-gray-100 rounded-[5px] border border-neutral-400">
                    <Image src={lefticon} alt="left" />
                </div> */}
                    <Link className='no-underline ml-3' href='/settings/organisation/myorg'>
                        <div style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} 
                            className={currentRoute.startsWith("/settings/organisation")
                                ? "flex items-center text-white px-4 py-2.5 bg-black border-r-0 text-base rounded-tl-lg rounded-bl-lg"
                                : "flex items-center text-gray-400 bg-white px-4 py-2.5 border-r-0 text-base rounded-tl-lg rounded-bl-lg transition-all duration-150 hover:bg-[#2a2a2a] hover:text-white"}>
                            <div className='flex mr-2 rounded-md border-neutral-400'>
                                <OrganisationIcon fill={currentRoute.startsWith("/settings/organisation") ? "#38F8E6" : "#A2A3A3"} />
                            </div>
                            Organisation
                        </div>
                    </Link>
                    <Link className='no-underline' href='/settings/general'>
                        <div style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} 
                            className={currentRoute.startsWith("/settings/general") 
                                ? "flex items-center text-white text-base bg-black px-4 py-2.5 border-r-0 rounded-tr-lg rounded-br-lg"
                                : "rounded-tr-lg rounded-br-lg flex items-center text-gray-400 bg-white px-4 py-2.5 text-base border-r-0 transition-all duration-150 hover:bg-[#2a2a2a] hover:text-white"}>
                            <div className='flex mr-2'>
                                <SettingsIcon fill={currentRoute.startsWith("/settings/general") ? "#38F8E6" : "#A2A3A3"} />
                            </div>
                            General
                        </div>
                    </Link>

                </div>

            </div >
        </>
    )
}

export default SettingsNavbar;