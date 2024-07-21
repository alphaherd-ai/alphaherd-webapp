'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useAppSelector } from '@/lib/hooks';
import { Spinner} from '@nextui-org/react';
import useSWR from 'swr';
import Loading from '@/app/loading';
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
    
if(isPatientLoading)return (<Loading/>)

    console.log(patients)

    return (
        <>
            {patients?.map((patient:any) => (
                <div key={patient.id} className='flex  w-full  box-border h-16 justify-evenly items-center bg-white   border-0 border-b border-solid border-borderGrey  hover:bg-gray-200 text-textGrey1  hover:text-textGrey2  transition'>
                    <div className='w-1/6 flex items-center  px-6   text-base font-medium'>
                        <Link className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400 ' href='#'>
                            {patient.patientName}
                        </Link>
                    </div>
                    <div className='w-1/6 flex  items-center  px-6  text-base font-medium'>
                        {clients[patient.clientId] || "Loading..."}
                    </div>
                    <div className='w-1/6 flex  items-center  px-6  text-base font-medium'>
                        {patient.species} & {patient.breed}
                    </div>
                    <div className='w-1/6 flex  items-center  px-6  text-base font-medium'>
                        {patient.age}
                    </div>
                    <div className='w-1/6 flex  items-center  px-6  text-base font-medium'>
                        {patient.gender}
                    </div>
                </div>
            ))}
        </>
    );
}

export default DatabasePatientTableItem;
