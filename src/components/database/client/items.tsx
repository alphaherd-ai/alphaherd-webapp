'use client';
import React, { useEffect, useState } from 'react';
import formatDateAndTime from '@/utils/formateDateTime';
interface Clients {
    id: string;
    clientName: string;
    email: string;
    contact: string;
    address: string;
    city: string;
    pinCode: string;
}

const DatabaseClientTableItem = () => {
    const [clients, setClients] = useState<Clients[]>([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/database/clients/getAll`)
            .then(response => response.json())
            .then(data => setClients(data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    

    return (
        <>
            {clients.map(client => (
                <div key={client.id} className='flex justify-evenly w-full box-border h-16 py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5'>
                    <div className='w-1/6 flex items-center px-6 text-neutral-400 text-base font-medium'>{client.clientName}</div>
                    <div className='w-1/6 flex items-center px-6 text-neutral-400 text-base font-medium'>{client.email}</div>
                    <div className='w-1/6 flex items-center px-6 text-neutral-400 text-base font-medium'>{client.contact}</div>
                    <div className='w-1/6 flex items-center px-6 text-neutral-400 text-base font-medium'>{client.address}</div>
                    <div className='w-1/6 flex items-center px-6 text-neutral-400 text-base font-medium'>{client.city}</div>
                </div>
            ))}
        </>
    );
};

export default DatabaseClientTableItem;
