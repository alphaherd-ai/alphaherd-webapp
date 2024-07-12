import React from 'react'

import Navbar from '@/components/navbar/navbar';
import UsersSetting from '@/components/settings/organisation/usersandrole/usersandrole';
import SettingsNavbar from '@/components/settings/navbar/navbar';



const UsersSettingsPage = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-[#EDEDED] p-8 px-10'>
  <SettingsNavbar/>
  <UsersSetting/>
    </div>
    </>
  )
}

export default UsersSettingsPage
