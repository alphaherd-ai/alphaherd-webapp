import React from 'react'


const Item = () => {
  return (
   
        <div className='flex  w-full  box-border bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 '>
         <div className='w-1/6 flex p-3 items-center  text-2xl'>Time</div>
         <div className='w-1/6 flex p-3 items-center text-2xl'>Date</div>
         <div className='w-1/6 flex p-3 items-center text-2xl'>Itme type</div>
         <div className='w-1/6 flex p-3 items-center text-2xl'>Item Name</div>
         <div className='w-1/6 flex p-3 items-center text-2xl'>Quantity</div>
         <div className='w-1/6 flex p-3 items-center  text-2xl text-green-500'><span className='bg-green-100 px-1'>Quantity</span> </div>

        </div>
   
  )
}

export default Item