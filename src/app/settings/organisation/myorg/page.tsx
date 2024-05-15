import React from 'react'

import Navbar from '@/components/navbar/navbar';
import SettingsNavbar from '@/components/settings/navbar/navbar';
import MyOrganisation from '@/components/settings/organisation/myorganisation/myorganisation';



const MyOrganisationSettingsPage = () => {
  return (
    <>
    {/* <Navbar/> */}
    <div className='w-full bg-gray-200 p-8 px-10'>
    <SettingsNavbar/>
    <MyOrganisation/>
    </div>
    </>
  )
}

export default MyOrganisationSettingsPage
