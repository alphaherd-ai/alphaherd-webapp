"use client"

import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

const Loading2 = () => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
        <ThreeDots
  visible={true}
  height="25"
  width="25"
  color="#35BEB1"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  )
}

export default Loading2