"use client"
import Image from "next/image"
import Link from "next/link"

import downicon from "../../../../assets/icons/settings/downicon.svg"
import opticon from "../../../../assets/icons/settings/opticon.svg"
import React, { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { usePathname } from 'next/navigation';

const OrganisationNavbar = () => {
    const currentRoute = usePathname();


    return (

        <>

            <div className="w-full p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 justify-between items-center gap-6 flex">
                <div className="flex">
                <Link className='no-underline ' href='/settings/organisation/myorg'>
                    <div className={currentRoute.startsWith("/settings/organisation/myorg")
                            ? "px-2 py-1 bg-zinc-900 rounded-tl-[5px] rounded-bl-[5px] border border-white justify-start items-center gap-1 flex text-white text-sm font-bold font-['Roboto']"
                            : " px-2 py-1 bg-gray-100 rounded-tl-[5px] rounded-bl-[5px] border border-neutral-400 justify-start items-center gap-1 flex text-neutral-400 text-sm font-bold font-['Roboto']"} >
                        Clinic details
                    </div>
                    </Link>
                    <Link className='no-underline ' href='/settings/organisation/usersandrole'>
                   <div className={currentRoute.startsWith("/settings/organisation/usersandrole")
                            ? "px-2 py-1 bg-zinc-900 rounded-tr-[5px] rounded-br-[5px] border border-white justify-start items-center gap-1 flex text-white text-sm font-bold font-['Roboto']"
                            : " px-2 py-1 bg-gray-100 rounded-tl-[5px] rounded-bl-[5px] border border-neutral-400 justify-start items-center gap-1 flex text-neutral-400 text-sm font-bold font-['Roboto']"}>
                        Users and Roles
                    </div>
                    </Link>

                </div>
                <div className='flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-lg '>

                    <Popover placement="bottom-end" showArrow offset={10}>
                        <PopoverTrigger>
                            <Button color="gray-400"
                                variant="solid"
                                className="capitalize flex border-none bg-black text-white rounded-lg "> Add User
                                <div className='flex pl-2'><Image src={downicon} alt='DownArrow' className='w-4 h-4 ' /></div></Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">

                            <div className="flex flex-col ">

                                <div className='flex flex-col'>


                                    <div className='text-base p-4 text-white flex '>
                                        <div className='flex pr-2'></div>Update Inventory</div>

                                    <div className='text-base p-4  text-white flex '>
                                        <div className='flex pr-2'></div>New Product</div>
                                </div>
                            </div>


                        </PopoverContent>
                    </Popover>



                </div>
            </div >



        </>
    )
}

export default OrganisationNavbar 
