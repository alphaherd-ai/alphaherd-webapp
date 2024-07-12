'use client';
import React, { useEffect, useState } from 'react';
import formatDateAndTime from '@/utils/formateDateTime';
import { useAppSelector } from '@/lib/hooks';
import { Spinner} from '@nextui-org/react';
import useSWR from 'swr';
import Loading from '@/app/loading';
import Link from 'next/link';

interface Clients {
    id: number;
    clientName: string;
    email: string;
    contact: string;
    address: string;
    city: string;
    pinCode: string;
    patients:Patients[]|undefined;
}

interface Patients{
    id:string;
    patientName:string;
    species:string;
    breed:string;
}

const DatabaseClientTableItem = ({clients, data, isLoading}:any) => {
    if(isLoading)return (<Loading/>)
    return (
        <>
            {clients?.map((client:any) => (
                
                <div key={client.id} className='flex justify-evenly items-center w-full box-border h-16 bg-white text-gray-400 border-0 border-b border-solid border-borderGrey'>
                   <div className='w-[12rem] flex items-center  text-neutral-400 text-base font-medium'>{client.clientName}</div>
                    <div className='w-[12rem] flex items-center  text-neutral-400 text-base font-medium'>
                    {client.patients?.map((patient:any, index:number) => (
                        <span key={patient.id}>
                            {patient.patientName}{index < (client.patients?.length ?? 0) - 1 ? ', ' : ''}
                        </span>
                    ))}
                    </div>

                    <div className='w-[12rem] flex items-center  text-neutral-400 text-base font-medium'>{client.contact}</div>
                    <div className='w-[12rem] flex items-center  text-neutral-400 text-base font-medium'>{client.email}</div>
                    <div className='w-[12rem] flex items-center  text-neutral-400 text-base font-medium'>{client.city}</div>
                </div>
            ))}
        </>
    );
};

export default DatabaseClientTableItem;
