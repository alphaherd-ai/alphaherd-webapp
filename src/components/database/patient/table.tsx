'use client'
import React, { useEffect, useState } from 'react'
import DatabasePatientBottombar from './bottombar'
import DatabasePatientHeader from './header'
import DatabasePatientTableItem from './items'
import { useAppSelector } from '@/lib/hooks'
import useSWR from 'swr';
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
function useClientFetch (id: number | null) {
  const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/getAll?branchId=${id}`,fetcher, { revalidateOnFocus : true});
 return {
  fetchedClients:data,
  isClientLoading:isLoading,
  isClientError:error
 }
}
function usePatientFetch (id: number | null) {
  const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/patients/getAll?branchId=${id}`,fetcher, { revalidateOnFocus :true});
 return {
  fetchedPatients:data,
  isPatientLoading:isLoading,
  isPatientError:error
 }
}
const DatabasePatientTable = () => {

  const [patients, setPatients] = useState<Patients[]>([]);
    const [clients, setClients] = useState<{ [key: string]: string }>({});
    const appState = useAppSelector((state) => state.app)
    const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/patients/getAll?branchId=${appState.currentBranchId}`,fetcher, { revalidateOnFocus :true});
    console.log("data is :", data);
    const {fetchedClients,isClientError,isClientLoading}= useClientFetch(appState.currentBranchId);
    const {fetchedPatients,isPatientError,isPatientLoading}= usePatientFetch(appState.currentBranchId);
    useEffect(() => {
        const handleWindowFocus = () => {
          console.log('Window focused');
        };
        window.addEventListener('focus', handleWindowFocus);
        return () => window.removeEventListener('focus', handleWindowFocus);
      }, []);
    
    
    useEffect(() => {
        if(!isPatientError&&!isPatientLoading&&fetchedPatients){
            setPatients(fetchedPatients);
        }

        if(!isClientLoading&&fetchedClients&&!isClientError){
            const clientNames = fetchedClients.reduce((acc: { [key: string]: string }, client: Clients) => {
                acc[client.id] = client.clientName;
                return acc;
            }, {});
            setClients(clientNames);
        }
                
            
    }, [fetchedClients,fetchedPatients,isClientError,isClientLoading,isPatientError,isPatientLoading]);
    const [sortOrder, setSortOrder] = useState("asc"); // Default sort order
    const [sortKey, setSortKey] = useState<keyof Patients | null>(null); // Sort key
    const [distributors,setDistributor]=useState<Patients[]>([]);
    const handleSortChange = (key: keyof Patients, order: 'asc' | 'desc') => {
      setSortKey(key);
      setSortOrder(order);
  
      const sortedData = [...patients].sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];
  
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
  
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return order === 'asc' ? valueA - valueB : valueB - valueA;
        }
  
        return 0;
      });
  
      
      setDistributor(sortedData);
      console.log(`Sorting by ${key} in ${order} order`, sortedData);
    }

  return (
    <div className='flex flex-col w-full box-border border border-solid border-borderGrey rounded-lg mt-6 mb-6'>
            <DatabasePatientHeader patients={patients} clients={clients} />
            <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-textGrey2'>
            <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Patient</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Client</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Species and Breed</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Age</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6  '>Sex</div>
            
            </div>
            
<DatabasePatientTableItem patients={patients} clients={clients} isPatientLoading={isPatientLoading}  />
<DatabasePatientBottombar/>
     
        </div>
   
  )
}

export default DatabasePatientTable