"use client"

import React from 'react'
import { Triangle } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
        <Triangle
  visible={true}
  height="50"
  width="50"
  color="#35BEB1"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  )
}

export default Loading