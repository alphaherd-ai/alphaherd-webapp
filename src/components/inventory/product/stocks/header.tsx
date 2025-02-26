import React, { useState } from 'react';
import Download from '../../../../assets/icons/finance/download.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface InventoryProductStockTableHeaderProps {
    activeTabValue: string;
    setActiveTabValue: (tab: string) => void;
}
const InventoryProductStockTableHeader:React.FC<InventoryProductStockTableHeaderProps> = ({ activeTabValue, setActiveTabValue }) => {
    const currentRoute = usePathname();
    const [activeTab, setActiveTab] = useState(activeTabValue);

    const handleTabClick = (tab:string) => {
        setActiveTab(tab);
        setActiveTabValue(tab); 
    };

    return (
        <>
            <div className='flex w-full bg-white h-20  p-4 px-6  justify-between border-0 border-b border-solid border-borderGrey rounded-tl-lg rounded-tr-lg'>
            <div className='flex text-gray-500 items-center w-6/12'>
                    <div
                        className={activeTab === 'Low Stock' ? " cursor-pointer flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white rounded-tl-md rounded-bl-md" : " cursor-pointer flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500 rounded-tl-md rounded-bl-md"}
                        onClick={() => handleTabClick('Low Stock')}
                    >
                        Low Stock
                    </div>
                    <div
                        className={activeTab === 'Expired' ? "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white cursor-pointer" : " cursor-pointer flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"}
                        onClick={() => handleTabClick('Expired')}
                    >
                        Expired
                    </div>
                    <div
                        className={activeTab === 'Expiring' ? "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white cursor-pointer" : "cursor-pointer flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"}
                        onClick={() => handleTabClick('Expiring')}
                    >
                        Expiring
                    </div>
                    <div
                        className={activeTab === 'Excess' ? "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white rounded-tr-md rounded-br-md cursor-pointer" : " cursor-pointer flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500 rounded-tr-md rounded-br-md"}
                        onClick={() => handleTabClick('Excess')}
                    >
                        Excess
                    </div>
                </div>
                <div className='flex items-center'>
                    <Link className='no-underline flex item-center mr-4' href='/finance/overview'>
                        
                    </Link>
                </div>
            </div>
        </>
    );
};

export default InventoryProductStockTableHeader;
