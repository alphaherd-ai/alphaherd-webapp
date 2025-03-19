"use client";
import React from 'react';
import Link from 'next/link';
import {usePathname } from 'next/navigation';

const InventoryServicesTableHeader = ({ onSortChange }: { onSortChange?: (key: string, sortOrder: string) => void }) => {
    const currentRoute = usePathname();

    return (
        <>
            <div className='flex w-full bg-white h-20 p-4 px-6 justify-between border-0 border-b border-solid border-borderGrey rounded-tl-lg rounded-tr-lg'>
                <div className='flex text-gray-500 items-center w-5/12'>
                    <Link className='no-underline flex item-center' href='/inventory/services/timeline'>
                        <div className={currentRoute.startsWith("/inventory/services/timeline")
                            ? "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white rounded-tl-md rounded-bl-md"
                            : "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500 rounded-tl-md rounded-bl-md"}>Timeline</div>
                    </Link>
                    <Link className='no-underline flex item-center' href='/inventory/services/all'>
                        <div className={currentRoute.startsWith("/inventory/services/all")
                            ? "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white rounded-tr-md rounded-br-md"
                            : "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500 rounded-tr-md rounded-br-md"}>All</div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default InventoryServicesTableHeader;
