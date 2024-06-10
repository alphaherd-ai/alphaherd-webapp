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
            <div className='flex w-full bg-white h-20 p-4 px-6 mt-6 justify-between border border-solid border-gray-300 border-t-0.5 rounded-tl-lg rounded-tr-lg'>
                <div className='flex text-gray-500 items-center w-6/12'>
                    <div
                        className={activeTab === 'Low Stock' ? "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white rounded-tl-md rounded-bl-md" : "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500 rounded-tl-md rounded-bl-md"}
                        onClick={() => handleTabClick('Low Stock')}
                    >
                        Low Stock
                    </div>
                    <div
                        className={activeTab === 'Expired' ? "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white" : "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"}
                        onClick={() => handleTabClick('Expired')}
                    >
                        Expired
                    </div>
                    <div
                        className={activeTab === 'Expiring' ? "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white" : "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"}
                        onClick={() => handleTabClick('Expiring')}
                    >
                        Expiring
                    </div>
                    <div
                        className={activeTab === 'Excess' ? "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white rounded-tr-md rounded-br-md" : "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500 rounded-tr-md rounded-br-md"}
                        onClick={() => handleTabClick('Excess')}
                    >
                        Excess
                    </div>
                </div>
                <div className='flex items-center'>
                    <Link className='no-underline flex item-center mr-4' href='/finance/overview'>
                        <div className='flex items-center justify-center border w-7 h-7 border-solid border-gray-300 border-0.5 rounded-md p-1'><Image src={Download} alt='Download' className='w-4 h-4' /></div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default InventoryProductStockTableHeader;
