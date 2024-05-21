'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useAppSelector } from '@/lib/hooks';

interface Clients {
    id: number;
    clientName: string;
}

interface Patients {
    id: number;
    patientName: string;
    clientid: number;
    species: string;
    breed: string;
    age: number;
    gender: string;
}

const DatabasePatientTableItem = () => {
    const [patients, setPatients] = useState<Patients[]>([]);
    const [clients, setClients] = useState<{ [key: string]: string }>({});
    const appState = useAppSelector((state) => state.app)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/patients/getAll?branchId=${appState.currentBranchId}`)
            .then(response => response.json())
            .then(data => setPatients(data))
            .catch(error => console.error('Error fetching patients from API:', error));

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/getAll?branchId=${appState.currentBranchId}`)
            .then(response => response.json())
            .then(data => {
                const clientNames = data.reduce((acc: { [key: string]: string }, client: Clients) => {
                    acc[client.id] = client.clientName;
                    return acc;
                }, {});
                setClients(clientNames);
            })
            .catch(error => console.error('Error fetching clients from API:', error));
    }, []);

    return (
        <>
            {patients.map(patient => (
                <div key={patient.id} className='flex justify-evenly w-full  box-border h-16 py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                    <div className='w-1/6 flex items-center  px-6  text-neutral-400 text-base font-medium'>
                        <Link className='transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400 ' href='#'>
                            {patient.patientName}
                        </Link>
                    </div>
                    <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>
                        {clients[patient.clientid] || "Loading..."}
                    </div>
                    <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>
                        {patient.species} & {patient.breed}
                    </div>
                    <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>
                        {patient.age}
                    </div>
                    <div className='w-1/6 flex  items-center  px-6 text-neutral-400 text-base font-medium'>
                        {patient.gender}
                    </div>
                </div>
            ))}
        </>
    );
}

export default DatabasePatientTableItem;
