'use client';
import React, { useEffect, useState } from 'react';
import formatDateAndTime from '@/utils/formateDateTime';
import { useAppSelector } from '@/lib/hooks';
import { Spinner} from '@nextui-org/react';
import useSWR from 'swr';
import Loading from '@/app/loading';
import Link from 'next/link';

// interface Clients {
//     id: number;
//     clientName: string;
//     email: string;
//     contact: string;
//     address: string;
//     city: string;
//     pinCode: string;
//     patients:Patients[]|undefined;
// }

// interface Patients{
//     id:string;
//     patientName:string;
//     species:string;
//     breed:string;
// }

const DatabaseClientTableItem = ({clients, data, isLoading}:any) => {
    if(isLoading)return (<Loading/>)
    return (
        <>
            
            {clients.map((client: any) => (
                <div
                    key={client.id}
                    className="flex w-full box-border h-16 justify-evenly items-center bg-white border-0 border-b border-solid border-borderGrey hover:bg-gray-200 text-textGrey1 hover:text-textGrey2 transition"
                >
                    <div className="w-1/6 flex items-center px-6 text-base font-medium">
                        <Link
                            className="transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400"
                            href={{ pathname: 'clients/overview', query: { id: `${client?.id}` } }}
                        >
                            {client.clientName}
                        </Link>
                    </div>
                    <div className="w-1/6 flex items-center px-6 text-base font-medium">
                        {client.patients?.map((patient: { id: React.Key | null | undefined; patientName: React.ReactNode }, index: number) => (
                            <span key={patient.id}>
                                {patient.patientName}
                                {index < (client.patients?.length ?? 0) - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </div>
                    <div className="w-1/6 flex items-center px-6 text-base font-medium">
                        {client.contact}
                    </div>
                    <div className="w-1/6 flex items-center px-6 text-base font-medium">
                        {client.email}
                    </div>
                    <div className="w-1/6 flex items-center px-6 text-base font-medium">
                        {client.city}
                    </div>
                </div>
            ))}

        </>
    );
};

export default DatabaseClientTableItem;
