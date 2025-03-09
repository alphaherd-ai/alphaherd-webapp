"use client";
import React, { useEffect, useState } from 'react'

import Add from '../../../assets/icons/inventory/add.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import PatientIcon from './icons/patientIcon';
import DistIcon from './icons/distributoricon';
import ClientIcon from './icons/clientIcon';
import { useAppSelector } from '@/lib/hooks';
import useSWR from 'swr';
import Select from 'react-select';
import ClientPopup from '../client/newclientpopoup';
import Popup from '../patient/newpatientpopup';
import DistributorPopup from '../distributor/newdistributorpopup';
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json());


const DatabaseNavbar = async () => {
    const appState = useAppSelector((state: { app: any; }) => state.app);
    const [searchData, setSearchData] = useState<any[]>([]);
    const [searchOptions, setSearchOptions] = useState<any[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');
    const router=useRouter();
    const [showPopup1, setShowPopup1] = React.useState(false);
    const [showPopup2, setShowPopup2] = React.useState(false);
    const [showPopup3, setShowPopup3] = React.useState(false);
    const {data, isLoading, error} = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/getAll?branchId=${appState.currentBranchId}`, fetcher);
    
   
    useEffect(() => {
        const searchfunction = async () => {
            const hasData = data && !isLoading && !error;
    
            if (hasData) {
                const { clients, distributors,patients } = data;
            
                const clientOptions = await clients.flatMap((item: any) => ({
                        label: `${item?.clientName || ''} - (${item?.contact || ''})`,
                        value: item,
                    })
                    );
                    console.log("clients",clients);
                const distributorOptions =await distributors.map((item: any) => ({
                    label: `${item?.distributorName || ''} - ${item?.contact || ''}`,
                    value: item,
                }));
                const patientOptions =await patients.map((item:any)=>({
                    label:`${item?.patientName||''} - ${item?.clients?.clientName||''}`,
                    value:item,
                }))
                const combinedOptions = [...clientOptions, ...distributorOptions,...patientOptions];
                
                setSearchData(data);
                console.log("combinedOptions",combinedOptions);
                setSearchOptions(combinedOptions);
            }
        }
        searchfunction();
      }, [data, isLoading, error]);
      


    const handleSearch = (selectedOption: any) => {
        const item = selectedOption?.value;
        console.log("selected item",item);
        let path = '';
        if (item?.patientId) {
            path = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/database/clients/overview?id=${item.id}`;
        } else if (item?.clientId) {
            path = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/database/clients/overview?id=${item.id}`;
        } else if (item?.distributorName) {
            path = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/database/distributor/overview?id=${item.id}`;
        } else {
            // Handle the case where item is not found
            console.error('Invalid selection');
            return;
        }
        window.location.href = path; // Navigate to the selected route
    };
    const currentRoute = usePathname();

    const customStyles = {
        control: (provided:any, state:any) => ({
          ...provided,
          height: '2.8rem', 
          minHeight: '2.8rem' ,
          width: '22rem',
          maxWidth: '22rem', 
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
          }
        ),
    };

      const togglePopup1 = () => {
        setShowPopup1(!showPopup1);
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
                            <div className='flex mr-2'><DistIcon fill={currentRoute.startsWith("/database/distributor")
                                ? "#38F8E6"
                                : "#A2A3A3"} /></div>
                           Distributors
                        </div>
                    </Link>
                    <div className='flex items-center space-x-2'> 
                        <div className='mr-1' /> 
                        {currentRoute.startsWith("/database/clients") && (
                            <div className='flex items-center text-base p-4 bg-black text-white rounded-lg cursor-pointer py-2 w-[148px] h-[44px]' onClick={togglePopup1}>
                                <div className='flex pr-2'>
                                    <Image src={Add} alt='Add' className='w-5 h-5' />
                                </div>
                                <button className='bg-transparent border-0 text-white text-base cursor-pointer'>
                                    Add Client
                                </button>
                            </div>
                        )}
                        {currentRoute.startsWith("/database/patient") && (
                             <div className='flex items-center justify-center capitalize border-none bg-black text-white rounded-lg cursor-pointer py-2 w-[157px] h-[44px]' onClick={togglePopup2}>
                             <div className='flex items-center'>
                                 <Image src={Add} alt='Update' className='w-5 h-5 mr-2' />
                                 <button className='bg-transparent border-0 text-white text-base'>
                                     Add Patient
                                 </button>
                             </div>
                         </div>
                        )}   
                        {currentRoute.startsWith("/database/distributor") && (
                            <div className='flex items-center text-base p-4 bg-black text-white rounded-lg cursor-pointer py-2 w-[168px] h-[44px]' onClick={togglePopup3}>
                                <div className='flex pr-2'>
                                    <Image src={Add} alt='Add' className='w-5 h-5' />
                                </div>
                                <button className='bg-transparent border-0 text-white text-base cursor-pointer'>
                                    Add Distributor
                                </button>
                            </div>
                        )}                        
                    </div>
             
                </div>
                <div className='flex h-full items-center'>
                <div className="relative h-full w-full items-center z-[1]">
                <Select
                            className="text-gray-500 text-base font-medium  w-[100%]  border-0 boxShadow-0"
                            classNamePrefix="select"
                            isClearable={true}
                            isSearchable={true}
                            options={searchOptions}
                            onChange={(selectedProduct: any) => handleSearch(selectedProduct)}
                            placeholder="Search via name or phone no."
                            styles={customStyles}
                        />
                        {/* <div className="absolute inset-y-0 right-3 pl-2 flex items-center pointer-events-none">
                            <div className='flex items-center '>
                                <Image src={Search} alt='Search' className='w-5  h-5' />
                            </div>
                        </div> */}
                    </div>

                  
                    {/* <Link className='no-underline h-full  ml-4' href='/finance/overview'>
                        <div className='flex items-center border border-solid border-gray-300 bg-white rounded-lg px-3 h-[2.8rem]'>
                            <Image src={Settings} alt='Setting' className='w-5  h-5' /></div>
                    </Link> */}
                </div>
            </div >
            {showPopup1 && <ClientPopup onClose={togglePopup1} />}
            {showPopup2 && <Popup onClose={togglePopup2} clientData={undefined}/>}
            {showPopup3 && <DistributorPopup onClose={togglePopup3} />}

        </>
    )
}

export default DatabaseNavbar;