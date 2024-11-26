"use client";
import React from 'react'

import Sort from '../../../assets/icons/finance/sort.svg';
import Filter from '../../../assets/icons/finance/filter.svg';
import Chart from '../../../assets/icons/finance/chart.svg';
import Download from '../../../assets/icons/finance/download.svg';
import DownArrow from '../../../assets/icons/finance/downArrow.svg';

import Update from '../../../assets/icons/inventory/update.svg';
import Add from '../../../assets/icons/inventory/add.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ClientPopup from './newclientpopoup';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import DownloadPopup from './downloadClientPopup';



const DatabaseClientHeader = ({ clients, onSortChange }: any) => {
    const [showPopup1, setShowPopup1] = React.useState(false);
    const [selectedSort, setSelectedSort] = React.useState("name");
    const [sortOrder, setSortOrder] = React.useState("asc");

    const togglePopup1 = () => setShowPopup1(!showPopup1);

    const handleSortChange = (key: string) => {
        if (key === selectedSort) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSelectedSort(key);
            setSortOrder("asc");
        }

        onSortChange(key, sortOrder);
    };

    const selectedSortValue = React.useMemo(() => `${selectedSort}: ${sortOrder}`, [selectedSort, sortOrder]);

    return (
        <>
            <div className="flex w-full bg-white h-20 p-4 px-6 border-0 border-b border-solid border-borderGrey justify-between rounded-tl-lg rounded-tr-lg">
                <div className="flex text-gray-500 items-center">
                    <div className="text-base">Clients</div>
                </div>
                <div className="flex items-center">
                    <div
                        onClick={togglePopup1}
                        className="cursor-pointer mr-4 flex items-center justify-center border w-7 h-7 border-solid border-gray-300 rounded-md p-1"
                    >
                        <Image src={Download} alt="Download" className="w-4 h-4" />
                    </div>
                    <Link className="no-underline flex items-center mr-4" href="/finance/overview">
                        <div className="flex items-center justify-center w-7 h-7 border border-solid border-gray-300 rounded-md p-1">
                            <Image src={Chart} alt="Chart" className="w-4 h-4" />
                        </div>
                    </Link>

                    <div className="flex items-center justify-center h-7 mr-4 border border-solid border-gray-300 rounded-lg p-2">
                        <div className="flex">
                            <Image src={Sort} alt="Sort" className="w-3 h-3 mr-2" />
                        </div>
                        <Dropdown>
                            <DropdownTrigger className="z-0">
                                <Button variant="solid" className="capitalize border-none bg-transparent rounded-lg">
                                    <div className="flex text-gray-500 items-center">
                                        <div className="text-base">Sort By: {selectedSort}</div>
                                    </div>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Sort options"
                                className="text-base text-gray-500 bg-gray-200 rounded-lg"
                                variant="solid"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={new Set([selectedSort])}
                            >
                                <DropdownItem
                                    className="p-2 text-base"
                                    key="name"
                                    onClick={() => handleSortChange("clientName")}
                                >
                                    Client Name
                                </DropdownItem>
                                
                                <DropdownItem
                                    className="p-2 text-base"
                                    key="city"
                                    onClick={() => handleSortChange("city")}
                                >
                                    City
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    
                </div>
            </div>
            {showPopup1 && <DownloadPopup onClose={togglePopup1} clients={clients} />}
        </>
    );
};

export default DatabaseClientHeader;