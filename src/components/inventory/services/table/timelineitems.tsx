'use client';
import React, { useState, useEffect } from 'react';
import { Tooltip, Button } from "@nextui-org/react";
import Link from 'next/link';
import formatDateAndTime from '@/utils/formateDateTime';
import { Inventory } from '@prisma/client';
import { useAppSelector } from '@/lib/hooks';
import useSWR from 'swr';
import Loading from '@/app/loading';
import InventoryServicesTableBottombar from './bottombar';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

interface AllServices {
    id: number;
    name: string;
    providers: string[];
    category: string;
    serviceCost: number;
    serviceCharge: number;
}

interface InventoryTimeline {
    id: number;
    stockChange: string;
    invoiceType: string;
    quantityChange: number;
    party: string;
    service: AllServices;
    createdAt: string;
}

const ServicesTimelineItem = () => {

    const [services, setServices] = useState<InventoryTimeline[]>([]);
    const appState = useAppSelector((state) => state.app)
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(50);
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/getAll?branchId=${appState.currentBranchId}`,
        fetcher, { revalidateOnFocus: true }
    );

    useEffect(() => {
        if (data) {
            setServices(data.filter((inventory: any) => inventory.inventoryType === Inventory.Service));
        }
    }, [data]);

    console.log(services)

    // if (error) return <div>Error fetching services: {error.message}</div>;
    // if (isLoading) return (<Loading />);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentServices = services.slice(indexOfFirstProduct, indexOfLastProduct);


    return (
        <>
        <div>
            {currentServices.map(inventory => (
                <div className='flex w-full box-border h-16 justify-evenly items-center bg-white border-0 border-b border-solid border-borderGrey hover:bg-gray-200 hover:text-gray-500 transition' key={inventory.id}>
                    <div className='w-[8rem] flex items-center  text-neutral-400 text-base font-medium'>{formatDateAndTime(inventory.createdAt).formattedDate}</div>
                    <div className='w-[8rem] flex items-center  text-neutral-400 text-base font-medium'>{formatDateAndTime(inventory.createdAt).formattedTime}</div>
                    <div className='w-[12rem] flex items-center    text-neutral-400 text-base font-medium'>
                        <Link className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400 ' href={{ pathname: 'overview', query: { id: inventory.service?.id } }}>
                            {inventory.service?.name}
                        </Link>
                    </div>
                    <div className='w-[8rem] flex  items-center   text-neutral-400 text-base font-medium text-red-500'>{inventory.quantityChange}</div>
                    <div className='w-[12rem] flex  items-center   text-neutral-400 text-base font-medium'>{inventory.party}</div>
                    <div className='w-[8rem] flex  items-center   text-neutral-400 text-base font-medium'>{inventory.service?.serviceCost}</div>

                    <div className='w-[8rem] flex  items-center   text-neutral-400 text-base font-medium text-gray-500'><span className='bg-gray-200 px-1'> <Tooltip content="message" className='bg-black text-white p-1 px-3 text-xs rounded-lg'>

                        <Button className='bg-transparent border-none'>{inventory.invoiceType}</Button>
                    </Tooltip></span>


                    </div>
                    <div className='w-[5rem] flex items-center    text-neutral-400 text-base font-medium'><Link className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400 ' href='#'>SI-23141</Link>  </div>
                </div>

            ))}

            {services.length > 0 && (
                <InventoryServicesTableBottombar
                    productsPerPage={productsPerPage}
                    totalProducts={services.length}
                    paginate={paginate}
                />
            )}
            </div>
        </>
    )
}

export default ServicesTimelineItem;