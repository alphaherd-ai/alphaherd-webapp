import React from 'react'

import Navbar from '@/components/navbar/navbar';
import SettingsNavbar from '@/components/settings/navbar/navbar';
import GeneralSettings from '@/components/settings/general/general';



const GeneralSettingsPage = () => {
  return (
    <>
    <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
   <SettingsNavbar/>
   <GeneralSettings/>
    </div>
    </>
  )
}

export default GeneralSettingsPage


