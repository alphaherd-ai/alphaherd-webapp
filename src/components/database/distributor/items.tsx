'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Loading from '@/app/loading';
import DatabaseDistribuBottombar from './bottombar';

interface Distributors{
    id:number,
    distributorName:string,
    contact:string,
    gstinNo:string,
    email:string,

}
interface DatabaseClientTableItemProps {
    distributors: Distributors[]; // Array of clients
    isLoading: boolean; // Loading state
    
  }

const DatabaseDistributorTableItem:React.FC<DatabaseClientTableItemProps> = ({ distributors, isLoading }) => {
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [productsPerPage] = useState<any>(50);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentDistributors = distributors.slice(indexOfFirstProduct, indexOfLastProduct);
    //console.log(currentDistributors);
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                currentDistributors.map((distributor) => (
                    <div
                        key={distributor.id}
                        className="flex justify-evenly w-full box-border border-0 border-b h-16 py-4 bg-white  border-solid border-gray-300 text-gray-400 border-t-0.5"
                    >
                        {/* Distributor Name Link */}
                        <div className="w-1/6 flex items-center px-6 text-neutral-400 text-base font-medium">
                            <Link
                                className="transition-colors duration-300 text-gray-400 no-underline hover:underline hover:text-teal-400"
                                href={{ pathname: 'distributor/overview', query: { id: `${distributor?.id}` } }}
                            >
                                {distributor.distributorName}
                            </Link>
                        </div>

                        {/* Phone Number Link */}
                        <div className="w-1/6 flex items-center px-6 text-neutral-400 text-base font-medium">
                            <Link
                                className="cursor-pointer text-gray-400 no-underline hover:underline hover:text-teal-400"
                                href={{ pathname: 'distributor/overview', query: { id: `${distributor?.id}` } }}
                            >
                                {distributor.contact}
                            </Link>
                        </div>

                        {/* GSTIN Link */}
                        <div className="w-1/6 flex items-center px-6 text-neutral-400 text-base font-medium">
                            <Link
                                className="cursor-pointer text-gray-400 no-underline hover:underline hover:text-teal-400"
                                href={{ pathname: 'distributor/overview', query: { id: `${distributor?.id}` } }}
                            >
                                {distributor.gstinNo}
                            </Link>
                        </div>

                        {/* Email */}
                        <div className="w-1/6 flex items-center px-6 text-neutral-400 text-base font-medium">
                            {distributor.email}
                        </div>

                        
                    </div>
                ))
            )}

            {/* Pagination */}
            {distributors.length > 0 && (
                <DatabaseDistribuBottombar
                    productsPerPage={productsPerPage}
                    totalProducts={distributors.length}
                    paginate={paginate}
                />
            )}
        </>
    );
};

export default DatabaseDistributorTableItem;
