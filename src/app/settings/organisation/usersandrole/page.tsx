import React from 'react'

import Navbar from '@/components/navbar/navbar';
import UsersSetting from '@/components/settings/organisation/usersandrole/usersandrole';



const UsersSettingsPage = () => {
  return (
    <>
    <div className='w-full bg-gray-200 p-8 px-10'>
  <UsersSetting/>
    </div>
    </>
  )
}

export default UsersSettingsPage
