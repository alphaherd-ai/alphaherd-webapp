import React from 'react'

import Navbar from '@/components/navbar/navbar';
import SettingsTabBar from '@/components/settings/tabBar/navbar';
import UsersSetting from '@/components/settings/organisation/usersandrole/usersandrole';



const UsersSettingsPage = () => {
  return (
    <>
    <div className='w-full bg-gray-200 p-8 px-10'>
  <SettingsTabBar/>
  <UsersSetting/>
    </div>
    </>
  )
}

export default UsersSettingsPage
