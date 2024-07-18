import React from 'react'
import UserProfile from '@/components/profile/userprofile';
import AdminProfile from '@/components/profile/adminprofile';



const Profile = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-[#EDEDED] p-8 px-10'>
{/* <UserProfile/> */}
<AdminProfile/>     
    </div>
    </>
  )
}

export default Profile
