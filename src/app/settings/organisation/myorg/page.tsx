import React from 'react'

import { MyOrganisationSettings } from '@/components/settings/organisation/myorganisation/myorganisation';
import SettingsNavbar from '@/components/settings/navbar/navbar';



const MyOrganisationSettingsPage = () => {
  return (
    <>
      <div className='w-full min-h-screen bg-[#EDEDED] p-8 px-10'>
   <SettingsNavbar/>
 <MyOrganisationSettings/>
    </div>
    </>
  )
}

export default MyOrganisationSettingsPage
