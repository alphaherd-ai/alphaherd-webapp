import React from 'react'

import Navbar from '@/components/navbar/navbar';
import GeneralSettings from '@/components/settings/general/general';
import SettingsNavbar from '@/components/settings/navbar/navbar';



const GeneralSettingsPage = () => {
  return <>
    <div className='w-full min-h-screen bg-gray-200 p-8 px-10'>
    <SettingsNavbar/>
   <GeneralSettings/>
    </div>
  </>

}

export default GeneralSettingsPage


