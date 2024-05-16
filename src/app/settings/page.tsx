"use client"

import GeneralSettings from '@/components/settings/general/general';
import { MyOrganisationSettings } from '@/components/settings/organisation/myorganisation/myorganisation';
import OrganisationSettings from '@/components/settings/organisation/organisation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SettingsPage() {

    const currentRoute = usePathname();

    const tabs = ["Organisation","General"]

    const [selectedTab, setSelectedTab] = useState(0)

    const tabComponents = [<OrganisationSettings/>,<GeneralSettings/>]

    return <>
        <div className='flex h-12  w-full box-border justify-between rounded-tl-lg rounded-tr-lg'>
            <div className='flex w-8/12 h-full '>
                {
                    tabs.map((tab,index) => <div style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} className={selectedTab==index
                        ? " flex items-center text-white px-4 py-2.5 bg-black   border-r-0 text-base rounded-tl-lg rounded-bl-lg "
                        : " flex items-center text-gray-400 bg-white px-4 py-2.5   border-r-0 text-base rounded-tl-lg rounded-bl-lg"}
                        onClick={() => setSelectedTab(index)} >
                        {tab}
                    </div>)
                }
            </div>
        </div >
        {
            tabComponents[selectedTab]
        }
    </>
}