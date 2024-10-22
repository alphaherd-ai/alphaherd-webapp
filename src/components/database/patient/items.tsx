'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useAppSelector } from '@/lib/hooks';
import { Spinner} from '@nextui-org/react';
import useSWR from 'swr';
import Loading from '@/app/loading';
import Loading2 from '@/app/loading2';
import DatabasePatientBottombar from './bottombar';
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
interface Clients {
    id: number;
    clientName: string;
}

interface Patients {
    id: number;
    patientName: string;
    clientId: number;
    species: string;
    breed: string;
    age: number;
    gender: string;
}

const DatabasePatientTableItem = ({ patients, clients, isPatientLoading }:any) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(50);
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentPatients = patients.slice(indexOfFirstProduct, indexOfLastProduct);

    const formatSpeciesAndBreed = (species: string | null, breed: string | null): string => {
        if (!species && !breed) {
          return ''; // Both are null
        }
        if (species && breed) {
          return `${species} & ${breed}`; // Both are present
        }
        return species || breed || ''; // Only one is present or both are null
      };
      
if(isPatientLoading)return (<Loading/>)

    console.log(patients)

    return (
        <>
            {currentPatients?.map((patient:any) => (
                <div key={patient.id} className='flex  w-full  box-border h-16 justify-evenly items-center bg-white   border-0 border-b border-solid border-borderGrey  hover:bg-gray-200 text-textGrey1  hover:text-textGrey2  transition'>
                    <div className='w-1/6 flex items-center  px-6   text-base font-medium'>
                        <Link className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400 ' href='#'>
                            {patient.patientName}
                        </Link>
                    </div>
                    <div className='w-1/6 flex  items-center  px-6  text-base font-medium'>
                        {clients[patient.clientId] || <Loading2 />}
                    </div>
                    <div className='w-1/6 flex  items-center  px-6  text-base font-medium'>
                    {formatSpeciesAndBreed(patient.species, patient.breed)}
                    </div>
                    <div className='w-1/6 flex  items-center  px-6  text-base font-medium'>
                        {patient.age}
                    </div>
                    <div className='w-1/6 flex  items-center  px-6  text-base font-medium'>
                        {patient.gender}
                    </div>
                </div>
            ))}
                        {patients.length > 0 && (
                <DatabasePatientBottombar
                    productsPerPage={productsPerPage}
                    totalProducts={patients.length}
                    paginate={paginate}
                />
            )}
        </>
    );
}

export default DatabasePatientTableItem;
