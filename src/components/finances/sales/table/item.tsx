import React from 'react'
import {Tooltip,Button} from "@nextui-org/react";

const FinancesSalesTableItem = () => {
  return (
   
        <div className='flex  w-full  box-border py-2 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 hover:bg-gray-200 hover:text-gray-500 transition'>
          <div className='w-1/12 flex py-2 px-4 items-center text-base'>12/12/12</div>
                <div className='w-1/12 flex py-2 px-3 items-center  text-base'>11.00 pm</div>
                <div className='w-2/12 flex py-2 px-3 items-center  text-base'>Purschase order</div>
                <div className='w-1/12 flex py-2 px-3 items-center  text-base'>wecare</div>
                <div className='w-2/12 flex py-2 px-3 items-center  text-base'>DE9F9EF9</div>
                <div className='w-1/12 flex py-2 px-3 items-center  text-base'>$ 2</div>
                <div className='w-1/12 flex py-2 px-3 items-center  text-base'>10 items</div>
                <div className='w-1/12 flex py-2 px-3 items-center  text-base'>12/11/12</div>
                <div className='w-1/12 flex py-2 px-3 items-center  text-base'>32</div>
                <div className='w-3/12 flex py-2 px-4 items-center text-base text-green-500'><span className='bg-green-100 px-1'> <Tooltip content="message" className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
      <Button className='bg-transparent border-none'>gdrdtghrd</Button>
    </Tooltip></span> </div>

        </div>
   
  )
}

export default FinancesSalesTableItem