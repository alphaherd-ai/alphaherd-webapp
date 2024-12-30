


import React, { useState } from 'react';
import Link from 'next/link';
import Loading from '@/app/loading';
import DatabaseDistribuBottombar from './bottombar';

interface Distributors{
    id:string,
    distributorName:string,
    contact:string,
    gstinNo:string,
    email:string,

}
interface DatabaseClientTableItemProps {
    distributors: Distributors[]; // Array of clients
    isLoading: boolean; // Loading state
    data:any;
  }

const DatabaseDistributorTableItem:React.FC<DatabaseClientTableItemProps> = ({ distributors,data, isLoading }) => {
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [productsPerPage] = useState<any>(50);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentDistributors = distributors.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                currentDistributors.sort((a:any,b:any)=>{
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                }).map((distributor) => (
                    <div
                        key={distributor.id}
                        className="flex justify-evenly w-full box-border h-16 py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5"
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

                        {/* Status */}
                        <div className="w-1/6 flex items-center px-6 text-neutral-400 text-base font-medium text-green-500">
                            <span className="bg-green-100 px-1">rfer</span>
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
