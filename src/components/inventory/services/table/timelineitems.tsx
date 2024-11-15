'use client';
import React, { useState, useEffect,useMemo } from 'react';
import { Tooltip, Button } from "@nextui-org/react";
import Link from 'next/link';
import formatDateAndTime from '@/utils/formateDateTime';
import { Inventory } from '@prisma/client';
import { useAppSelector } from '@/lib/hooks';
import useSWR from 'swr';
import Loading from '@/app/loading';
import InventoryServicesTableBottombar from './bottombar';
import { useSearchParams } from 'next/navigation';
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

const ServicesTimelineItem = ({sortOrder,sortKey}:any) => {
    const urlSearchParams = useSearchParams();
    const [services, setServices] = useState<InventoryTimeline[]>([]);
    const appState = useAppSelector((state) => state.app)
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(50);
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
   
   const selectedCategory = useMemo(() => urlSearchParams.getAll('selectedCategory'), [urlSearchParams]);
//    useEffect(()=>{
//         console.log(selectedCategory);
//    },[selectedCategory])

    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/getAll?branchId=${appState.currentBranchId}`,
        fetcher, { revalidateOnFocus: true }
    );

    useEffect(() => {
        if (data) {
            
            const services=(data.filter((inventory: any) => inventory.inventoryType === Inventory.Service));
            setServices(services);
            console.log(services);
            if(selectedCategory.length > 0){
                const filteredServices=services.filter((item:any)=>selectedCategory.includes(item.service.category));
                console.log(filteredServices);
                setServices(filteredServices);
            }
            if(sortOrder && sortKey ){
                console.log(sortOrder,sortKey);
                const sortedData = [...services].sort((a, b) => {
                    const valueA = a.service?.[sortKey];
                    const valueB = b.service?.[sortKey];
                    if (typeof valueA === 'string' && typeof valueB === 'string') {
                        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
                    }
                     if (typeof valueA === 'number' && typeof valueB === 'number') {
                         return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
                     }
                    return 0;
                });
                setServices(sortedData);
            }
        }
    }, [data,selectedCategory,sortOrder,sortKey]);

    //   console.log(services)
    
      if (error) return <div>Error fetching services: {error.message}</div>;
      if (isLoading) return (<Loading />);

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
                    <div className='w-[8rem] flex  items-center   text-neutral-400 text-base font-medium '>{inventory.quantityChange}</div>
                    <div className='w-[12rem] flex  items-center   text-neutral-400 text-base font-medium'>{inventory.party}</div>
                    <div className='w-[8rem] flex  items-center   text-neutral-400 text-base font-medium'>{inventory.service?.serviceCharge}</div>

                    <div className='w-[8rem] flex  items-center   text-neutral-400 text-base font-medium '><span className='bg-gray-200 px-1'> <Tooltip content="message" className='bg-black text-white p-1 px-3 text-xs rounded-lg'>

                        <Button className='bg-transparent border-none'>{inventory.invoiceType ? inventory.invoiceType : "Manual"}</Button>
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