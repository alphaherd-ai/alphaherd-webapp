import React from 'react'

import Navbar from '@/components/navbar/navbar';
import Login2 from '@/components/loginsignup/login2';
import Login3 from '@/components/loginsignup/login3';




const Profile = () => {
  return (
    <>
    <div className='flex h-screen flex-col'>

    
    <Navbar/>
    <div className='w-full h-full flex-1 bg-gray-200 p-8 px-10'>
 
<Login3/>
    </div>
    </div>
    </>
  )
}

export default Profile
