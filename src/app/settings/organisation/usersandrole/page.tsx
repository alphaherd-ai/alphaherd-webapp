import React from 'react'

import Navbar from '@/components/navbar/navbar';
import SettingsNavbar from '@/components/settings/navbar/navbar';
import UsersSetting from '@/components/settings/organisation/usersandrole/usersandrole';



const UsersSettingsPage = () => {
  return (
    <>
    <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
  <SettingsNavbar/>
  <UsersSetting/>
    </div>
    </>
  )
}

export default UsersSettingsPage
