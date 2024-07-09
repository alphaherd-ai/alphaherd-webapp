"use client";
import React, { useEffect, useState } from 'react'
import Settings from '../../../assets/icons/finance/Settings.svg';
import Search from '../../../assets/icons/finance/Search.svg';


import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ServicesIcon from './icons/servicesIcon';
import ProductsIcon from './icons/productsIcon';
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
import Select from 'react-select';
import { FinanceCreationType } from '@prisma/client';

//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json());


const InventoryNavbar = () => {
    const appState = useAppSelector((state) => state.app);
    const [searchData, setSearchData] = useState<any[]>([]);
    const [searchOptions, setSearchOptions] = useState<any[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');
    const router=useRouter();
    const {data, isLoading, error} = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/getAll?branchId=${appState.currentBranchId}`, fetcher);
    
   
    useEffect(() => {
        if (!error && !isLoading && data) {
            const options = data.map((item: any) => ({
                label: item.productBatch?(`${item.productBatch?.product?.itemName}------${item.productBatch?.batchNumber}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Product`):item.service?(`${item.service?.name}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Service`):"",
                value: item
            }));
            setSearchData(data);
            setSearchOptions(options);
        }
    }, [data, isLoading, error]);

    const currentRoute = usePathname();

    const handleSearch = (selectedOption: any) => {
        const item = selectedOption?.value;
        let path = '';
        if (item.productBatch) {
            path = `/inventory/products/overview?id=${item.productBatch.product.id}`;
        } else if (item.service) {
            path = `/inventory/services/overview?id=${item.service.id}`;
        } 
        router.push(path); // Navigate to the selected route
    };

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
                    <div className="relative h-full w-10/12 items-center z-[1]">
                        <Select
                            className="text-gray-500 text-base font-medium  w-[100%]  border-0 boxShadow-0"
                            classNamePrefix="select"
                            isClearable={true}
                            isSearchable={true}
                            options={searchOptions}
                            onChange={(selectedProduct: any) => handleSearch(selectedProduct)}
                            placeholder="Search via Item Name or Batch no."
                        />
                        {/* <div className="absolute inset-y-0 right-3 pl-2 flex items-center pointer-events-none">
                            <div className='flex items-center '>
                                <Image src={Search} alt='Search' className='w-5  h-5' />
                            </div>
                        </div> */}
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