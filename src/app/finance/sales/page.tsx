import React from 'react'
import AddSale from './AddSale'
import Home from '../../../assets/icons/Home.svg';
import Finances from '../../../assets/icons/Finances.svg';
import Inventory from '../../../assets/icons/Inventory.svg';
import Notification from '../../../assets/icons/Notification.svg';
import PatientList from '../../../assets/icons/PatientList.svg';
import Image from 'next/image';


const Sales = () => {
  return (
    <div className='w-screen h-screen'>
        <div className='h-7p flex items-center text-textGrey1 bg-navBar shadow-navBar'>
          <div className='w-20p text-sm flex items-center justify-center'>
            <Image src={Home} alt='Home' className='w-5 h-5'/>
            <div className="ml-2">Home</div>
          </div>
          <div className='w-0.5 h-full bg-verticalBar'></div>
          <div className='w-20p text-sm flex items-center justify-center'>
            <Image src={Finances} alt='Finances' className='w-5 h-5'/>
            <div className="ml-2">Finances</div>
          </div>
          <div className='w-0.5 h-full bg-verticalBar'></div>
          <div className='w-20p text-sm flex items-center justify-center'>
            <Image src={Inventory} alt='Inventory' className='w-5 h-5'/>
            <div className="ml-2">Inventory</div>
          </div>
          <div className='w-0.5 h-full bg-verticalBar'></div>
          <div className='w-30p text-sm flex items-center justify-center'>
            <Image src={PatientList} alt='PatientList' className='w-5 h-5'/>
            <div className="ml-2">Clients and Patients</div>
          </div>
          <div className='w-0.5 h-full bg-verticalBar'></div>
          <div className='w-full flex justify-end p-2'>
            <Image src={Notification} alt='Notification' className='w-6 h-6'/>
          </div>
          <div className='w-0.5 h-full bg-verticalBar'></div>
          <div className='w-8p text-sm flex items-center justify-center'>
            Icon
          </div>
        </div>
        <AddSale/>
    </div>
  )
}

export default Sales