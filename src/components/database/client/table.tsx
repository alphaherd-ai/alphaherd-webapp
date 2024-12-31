"use client";
import React, { useEffect, useState } from 'react';


import DatabaseClientHeader from './header';
import DatabaseClientTableItem from './items';
import { useAppSelector } from '@/lib/hooks';
import useSWR from 'swr';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());

interface Clients {
    id: number;
    clientName: string;
    email: string;
    contact: string;
    address: string;
    city: string;
    pinCode: string;
    age?: number; // Ensure this is present if you're sorting by age
    patients: Patients[] | undefined;
}

interface Patients {
    id: string;
    patientName: string;
    species: string;
    breed: string;
}

const DatabaseClientTable = () => {
    const [clients, setClients] = useState<Clients[]>([]);
    const [sortedClients, setSortedClients] = useState<Clients[]>([]); // Sorted state
    const [sortOrder, setSortOrder] = useState("asc"); // Default sort order
    const [sortKey, setSortKey] = useState<keyof Clients | null>(null); // Sort key
    const appState = useAppSelector((state) => state.app);
    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true }
    );

    // Initialize state when data is fetched
    useEffect(() => {
        if (!isLoading && data && !error) {
            // Sort by ID (most recent first) before setting the clients
            const sortedData = data.sort((a: Clients, b: Clients) => b.id - a.id);
            setClients(sortedData);
            setSortedClients(sortedData); // Initialize sorted clients
        }
    }, [data, error, isLoading]);

    console.log("sort order si :", sortOrder);
    // Function to handle sorting
    const handleSortChange = (key: keyof Clients, order: 'asc' | 'desc') => {
        setSortKey(key);
        setSortOrder(order);

        const sortedData = [...clients].sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];

            // Handle string comparison (for client names)
            if (typeof valueA === 'string' && typeof valueB === 'string') {
                // Convert to lowercase and trim for comparison
                const comparisonA = valueA.toLowerCase().trim();
                const comparisonB = valueB.toLowerCase().trim();
                return order === 'asc' ? comparisonA.localeCompare(comparisonB) : comparisonB.localeCompare(comparisonA);
            }

            // Handle number comparison
            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return order === 'asc' ? valueA - valueB : valueB - valueA;
            }

            // If one of the values is null or undefined, treat it as smaller
            if (valueA == null && valueB == null) return 0;
            if (valueA == null) return order === 'asc' ? -1 : 1;
            if (valueB == null) return order === 'asc' ? 1 : -1;

            return 0; // Default case, if types don't match
        });

        setSortedClients(sortedData);
        console.log(`Sorting by ${key} in ${order} order`, sortedData);
    };

    console.log(sortedClients); // Check the sorted clients array here

    return (
        <div className="flex flex-col w-full box-border mb-6 mt-6 border border-solid border-borderGrey rounded-lg cursor-default">
            <DatabaseClientHeader clients={clients} onSortChange={handleSortChange} />
            
            <div className="flex w-full box-border bg-gray-100 h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-textGrey2">
                <div className="flex text-gray-500 text-base font-medium px-6 w-1/6">Client</div>
                <div className="flex text-gray-500 text-base font-medium px-6 w-1/6">Pet(s)</div>
                <div className="flex text-gray-500 text-base font-medium px-6 w-1/6">Phone no.</div>
                <div className="flex text-gray-500 text-base font-medium px-6 w-1/6">Email</div>
                <div className="flex text-gray-500 text-base font-medium px-6 w-1/6">City</div>
            </div>

            {/* Pass the sortedClients to the DatabaseClientTableItem component */}
            <DatabaseClientTableItem clients={sortedClients} isLoading={isLoading} />
        </div>
    );
};

export default DatabaseClientTable;




