import React from 'react'

const TransactionsBlanceSheetItem = () => {
  return (
   
<div className='w-full h-auto px-4 py-2 my-2 bg-white rounded-[5px] flex justify-between items-center gap-2 inline-flex'>
    <div className='flex justify-start items-center gap-[212px]'>
        <div className='w-[75px] px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex'>
            <div className="text-green-600 text-sm font-medium ">Money In</div>
        </div>
    </div>
    <div className="text-right text-gray-500 text-sm font-bold ">₹32,499</div>
</div>


   
  )
}

export default TransactionsBlanceSheetItem