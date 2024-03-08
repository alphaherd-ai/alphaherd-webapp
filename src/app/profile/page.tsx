import React from 'react'

import Navbar from '@/components/navbar/navbar';
import UserProfile from '@/components/profile/userprofile';
import AdminProfile from '@/components/profile/adminprofile';



const Profile = () => {
  return (
    <>
    <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
{/* <UserProfile/> */}
<AdminProfile/>     
    </div>
    </>
  )
}

export default Profile
