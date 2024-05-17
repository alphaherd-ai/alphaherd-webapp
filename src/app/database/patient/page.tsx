import DatabaseNavbar from '@/components/database/navbar/navbar'
import DatabasePatientTable from '@/components/database/patient/table'
import React from 'react'

const Patients = () => {
  return (
   <>
   <div className='w-full bg-gray-200 p-8 px-10'>
  <DatabaseNavbar/>
  <DatabasePatientTable/>
   </div>
   </> 
  )
}

export default Patients