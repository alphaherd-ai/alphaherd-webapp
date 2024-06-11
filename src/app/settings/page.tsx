"use client"

import GeneralSettings from '@/components/settings/general/general';
import { MyOrganisationSettings } from '@/components/settings/organisation/myorganisation/myorganisation';
import OrganisationSettings from '@/components/settings/organisation/organisation';
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SettingsPage() {

    const tabs = ["Organisation","General"]

    const [selectedTab, setSelectedTab] = useState(0)

    // eslint-disable-next-line react/jsx-key
    const tabComponents = [<OrganisationSettings/>,<GeneralSettings/>]

    const appState = useAppSelector((state) => state.app);

    return <>
        <div className='flex h-12  w-full box-border justify-between rounded-tl-lg rounded-tr-lg'>
            <div className='flex w-8/12 h-full '>
                {
                    tabs.map((tab,index) => 
                    <div key={index} 
                    style={{ border: '0.5px solid rgba(209, 213, 219, 1)', borderRight: '0' }} 
                    className={selectedTab==index
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
        {
            selectedTab === 0 && appState.isCurrentOrgAdmin ? <Link href={`/auth/admin/orgEdit`}><button className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Edit
            </button></Link> : null
        }
    </>
}