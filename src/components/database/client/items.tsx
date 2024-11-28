import React, { useState } from 'react';
import Link from 'next/link';
import DatabaseClientBottombar from './bottombar';
import Loading from '@/app/loading';

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
  
  // Define the props interface for DatabaseClientTableItem component
  interface DatabaseClientTableItemProps {
    clients: Clients[]; // Array of clients
    isLoading: boolean; // Loading state
  }
  
  // Functional component with typed props
  const DatabaseClientTableItem: React.FC<DatabaseClientTableItemProps> = ({ clients, isLoading }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(50);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentClients = clients.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                currentClients.map((client: any) => (
                    <div
                        key={client.id}
                        className="flex w-full box-border h-16 justify-evenly items-center bg-white border-0 border-b border-solid border-borderGrey hover:bg-gray-200 text-textGrey1 hover:text-textGrey2 transition"
                    >
                        {/* Client Name Link */}
                       
                        <div className="w-1/6 flex items-center px-6 text-base font-medium">
                            <Link
                                className="transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400"
                                href={{ pathname: 'clients/overview', query: { id: `${client?.id}` } }}
                            >
                                {client.clientName}
                            </Link>
                        </div>

                        {/* Patients List */}
                        <div className="w-1/6 flex items-center px-6 text-base font-medium">
                            {client.patients?.map((patient: { id: React.Key | null | undefined; patientName: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: number) => (
                                <span key={patient.id}>
                                    {patient.patientName}
                                    {index < (client.patients?.length ?? 0) - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </div>

                        {/* Phone Number Link with no underline by default */}
                        <div className="w-1/6 flex items-center px-6 text-base font-medium">
                            <Link
                                className="cursor-pointer text-gray-400 no-underline hover:underline hover:text-teal-400"
                                href={{ pathname: 'clients/overview', query: { id: `${client?.id}` } }}
                            >
                                {client.contact}
                            </Link>
                        </div>

                        {/* Email and City */}
                        <div className="w-1/6 flex items-center px-6 text-base font-medium">
                            {client.email}
                        </div>
                        <div className="w-1/6 flex items-center px-6 text-base font-medium">
                            {client.city}
                        </div>
                    </div>
                ))
            )}

            {/* Pagination */}
            {clients.length > 0 && (
                <DatabaseClientBottombar
                    productsPerPage={productsPerPage}
                    totalProducts={clients.length}
                    paginate={paginate}
                />
            )}
        </>
    );
};

export default DatabaseClientTableItem;
