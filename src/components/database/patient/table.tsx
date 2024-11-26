'use client'
import React, { useEffect, useState } from 'react'
import DatabasePatientBottombar from './bottombar'
import DatabasePatientHeader from './header'
import DatabasePatientTableItem from './items'
import { useAppSelector } from '@/lib/hooks'
import useSWR from 'swr';

const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());

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
  age: string; // Updated to string as per your example
  gender: string;
  date: string; // Date to sort by
  dateOfBirth: string; // Included as per your example
  isInpatient: boolean | null; // Assuming this can be true, false, or null
}

function useClientFetch(id: number | null) {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/getAll?branchId=${id}`, fetcher, { revalidateOnFocus: true });
  return {
    fetchedClients: data,
    isClientLoading: isLoading,
    isClientError: error
  }
}

function usePatientFetch(id: number | null) {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/patients/getAll?branchId=${id}`, fetcher, { revalidateOnFocus: true });
  return {
    fetchedPatients: data,
    isPatientLoading: isLoading,
    isPatientError: error
  }
}

const DatabasePatientTable = () => {
  const [patients, setPatients] = useState<Patients[]>([]);
  const [clients, setClients] = useState<{ [key: string]: string }>({});
  const [maxId, setMaxId] = useState<number>(0);
  const appState = useAppSelector((state) => state.app);
  const { fetchedClients, isClientError, isClientLoading } = useClientFetch(appState.currentBranchId);
  const { fetchedPatients, isPatientError, isPatientLoading } = usePatientFetch(appState.currentBranchId);

  useEffect(() => {
    if (!isPatientError && !isPatientLoading && fetchedPatients) {
      const sortedPatients = [...fetchedPatients].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPatients(sortedPatients);
      const highestId = Math.max(0, ...fetchedPatients.map(patient => patient.id));
      setMaxId(highestId);
    }

    if (!isClientLoading && fetchedClients && !isClientError) {
      const clientNames = fetchedClients.reduce((acc: { [key: string]: string }, client: Clients) => {
        acc[client.id] = client.clientName;
        return acc;
      }, {});
      setClients(clientNames);
    }
  }, [fetchedClients, fetchedPatients, isClientError, isClientLoading, isPatientError, isPatientLoading]);

  const addPatient = (newPatientData: Omit<Patients, 'id'>) => {
    const newPatient = { ...newPatientData, id: maxId + 1 };
    const updatedPatients = [newPatient, ...patients]; // Add the new patient at the top
    const sortedPatients = updatedPatients.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date
    setPatients(sortedPatients);
    setMaxId((prev) => prev + 1);
  };

  return (
    <div className='flex flex-col w-full box-border border border-solid border-borderGrey rounded-lg mt-6 mb-6'>
      <DatabasePatientHeader patients={patients} clients={clients} onAddPatient={addPatient} />
      <div className='flex w-full box-border bg-gray-100 h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-textGrey2'>
        <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'>Patient</div>
        <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'>Client</div>
        <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'>Species and Breed</div>
        <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'>Age</div>
        <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'>Gender</div>
      </div>
      <DatabasePatientTableItem patients={patients} clients={clients} isPatientLoading={isPatientLoading} />
    </div>
  );
}

export default DatabasePatientTable;
