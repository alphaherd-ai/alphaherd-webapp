"use client";
import React, { useContext, useEffect, useRef, useState } from 'react'
import Settings from '../../../assets/icons/finance/Settings.svg';
import Search from '../../../assets/icons/finance/Search.svg';
import Update from '../../../assets/icons/inventory/update.svg';
import Add from '../../../assets/icons/inventory/add.svg';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ServicesIcon from './icons/servicesIcon';
import ProductsIcon from './icons/productsIcon';
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
import Select from 'react-select';
import { FinanceCreationType } from '@prisma/client';
import Popup from '../product/producttable/newproductpopup';
import Popup2 from '../product/producttable/updateinventorypopup';
import Popup3 from '../services/table/newservicepopup';




//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json());


const InventoryNavbar = () => {
    const appState = useAppSelector((state) => state.app);
    const [searchData, setSearchData] = useState<any[]>([]);
    const [searchOptions, setSearchOptions] = useState<any[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');
    const router=useRouter();
    const {data, isLoading, error} = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/getAll?branchId=${appState.currentBranchId}`, fetcher);
    const [showPopup, setShowPopup] = React.useState(false);
    const [showPopup2, setShowPopup2] = React.useState(false);
    const [showPopup1, setShowPopup1] = React.useState(false);
    const [showPopup3, setShowPopup3] = React.useState(false);
    const togglePopup1 = () => {
        setShowPopup1(!showPopup1);
    }
   
    useEffect(() => {
        if (!error && !isLoading && data) {
            const options = data?.map((item: any) => ({
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

    
    const customStyles = {
        control: (provided:any, state:any) => ({
          ...provided,
          height: '2.8rem', 
          minHeight: '2.8rem' ,
          width: '30rem',
          maxWidth: '25rem', 
          borderColor: state.isFocused ? '#35BEB1' : '#C4C4C4', 
            '&:hover': {
            borderColor: state.isFocused ? '#35BEB1' : '#C4C4C4', 
            },
            boxShadow: state.isFocused ? 'none' : 'none',
        }),
        valueContainer: (provided:any) => ({
          ...provided,
          height: '2.8rem', 
          width: '22rem',
          maxWidth: '22rem', 
        }),
        singleValue: (provided:any) => ({
          ...provided,
          width: '22rem',
          maxWidth: '22rem', 
        }),
        menu: (provided:any) => ({
            ...provided,
            backgroundColor: 'white',
            width: '22rem',
            maxWidth: '22rem', 
          }),
          option: (provided:any, state:any) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#35BEB1' : 'white', 
            color: state.isFocused ? 'white' : '#6B7E7D',
            '&:hover': {
              backgroundColor: '#35BEB1', 
            }
          }),
          
      };
    const togglePopup = () => {
        setShowPopup(!showPopup);
    }
    const togglePopup2 = () => {
        setShowPopup2(!showPopup2);
    }
    const togglePopup3 = () => {
        setShowPopup3(!showPopup3);
    }

    return (

        <>
            <div className='flex h-12  w-full box-border justify-between rounded-tl-lg rounded-tr-lg'>
                <div className='flex w-8/12 h-full'>
                    <Link className='no-underline' href='/inventory/products/timeline'>
                        <div 
                            style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} 
                            className={currentRoute.startsWith("/inventory/products")
                                ? "flex items-center text-white px-4 py-2.5 bg-black border-r-0 text-base rounded-tl-lg rounded-bl-lg"
                                : "flex items-center text-gray-400 bg-white px-4 py-2.5 border-r-0 text-base rounded-tl-lg rounded-bl-lg"}>
                            <div className='flex mr-2'>
                                <ProductsIcon fill={currentRoute.startsWith("/inventory/products") ? "#38F8E6" : "#A2A3A3"} />
                            </div>
                            Products
                        </div>
                    </Link>
                    <Link className='no-underline' href='/inventory/services/timeline'>
                        <div 
                            style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} 
                            className={currentRoute.startsWith("/inventory/services") 
                                ? "flex items-center text-white text-base bg-black px-4 py-2.5 border-r-0 rounded-tr-lg rounded-br-lg" 
                                : "rounded-tr-lg rounded-br-lg flex items-center text-gray-400 bg-white px-4 py-2.5 text-base border-r-0"}>
                            <div className='flex mr-2'>
                                <ServicesIcon fill={currentRoute.startsWith("/inventory/services") ? "#38F8E6" : "#A2A3A3"} />
                            </div>
                            Services
                        </div>
                    </Link>

                    <div className='flex items-center space-x-2'> 
                        <div className='mr-1' /> 
                        {currentRoute.startsWith("/inventory/products") && (
                            <>
                                <div className='flex items-center text-base p-4 bg-black text-white rounded-lg cursor-pointer py-2 w-[156px] h-[44px]' onClick={togglePopup}>
                                    <div className='flex pr-2'>
                                        <Image src={Add} alt='Add' className='w-5 h-5' />
                                    </div>
                                    <button className='bg-transparent border-0 text-white text-base cursor-pointer'>
                                        New Product
                                    </button>
                                </div>

                                <div className='flex items-center justify-center capitalize border-none bg-black text-white rounded-lg cursor-pointer py-2 w-[168px] h-[44px]' onClick={togglePopup2}>
                                    <div className='flex items-center'>
                                        <Image src={Update} alt='Update' className='w-5 h-5 mr-2' />
                                        <button className='bg-transparent border-0 text-white text-base'>
                                            Update Inventory
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                        {currentRoute.startsWith("/inventory/services") && (
                            <div className='flex items-center text-base p-4 bg-black text-white rounded-lg cursor-pointer py-2 w-[156px] h-[44px]' onClick={togglePopup3}>
                                <div className='flex pr-2'>
                                    <Image src={Add} alt='Add' className='w-5 h-5' />
                                </div>
                                <button className='bg-transparent border-0 text-white text-base cursor-pointer'>
                                    New Service
                                </button>
                            </div>
                        )}                        
                    </div>
                </div>

            

                <div className='flex h-full items-center'>
                    <div className="relative h-full w-full items-center z-[1]">
                        <Select
                            className="text-gray-500 text-base font-medium border-0 boxShadow-0"
                            classNamePrefix="select"
                            isClearable={true}
                            isSearchable={true}
                            options={searchOptions}
                            onChange={(selectedProduct: any) => handleSearch(selectedProduct)}
                            placeholder="Search via Item/Service name and Batch no."
                            styles={customStyles}
                        />
                        
                    </div>

                  
                    {/* <Link className='no-underline h-full  ml-4' href='/finance/overview'>
                        <div className='flex items-center border border-solid border-gray-300 bg-white rounded-lg px-3 h-[2.8rem]  '>
                            <Image src={Settings} alt='Setting' className='w-5  h-5' /></div>
                    </Link> */}
                </div>
            </div >
            {showPopup && <Popup onClose={togglePopup} />}
            {showPopup2 && <Popup2 onClose={togglePopup2} />}
            {showPopup3 && <Popup3 onClose={togglePopup3} />}

           
        </>
    )
}

export default InventoryNavbar;