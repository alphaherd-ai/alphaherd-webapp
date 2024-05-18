import React from 'react'

import Navbar from '@/components/navbar/navbar';
import { MyOrganisationSettings } from '@/components/settings/organisation/myorganisation/myorganisation';
import SettingsNavbar from '@/components/settings/navbar/navbar';



const MyOrganisationSettingsPage = () => {
  return (
    <>
      <div className='w-full bg-gray-200 p-8 px-10'>
   <SettingsNavbar/>
 <MyOrganisationSettings/>
    </div>
    </>
  )
}

export default MyOrganisationSettingsPage
