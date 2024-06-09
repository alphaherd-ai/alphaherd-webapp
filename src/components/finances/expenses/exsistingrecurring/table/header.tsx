"use client"


import { Button } from '@nextui-org/react'
import React from 'react'

const ExsistingRecurringHeader = () => {
  return (
    <>


<div className="flex justify-between w-full pb-[16px]">
                <div className="px-6  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold ">Customer:</div>
                        <div
                                className={`text-gray-500 text-base font-medium  border-0 bg-inherit`}
                                > Ajitesh Sharma </div>

                    </div>
                </div>
                <div className="px-6 py-4  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex w-full">
                        <div className="text-gray-500 text-base font-bold  pr-[16px] w-3/12">Invoice Number:</div>
                        <div className="flex items-center justify-between w-9/12">
                            <div
                                className={`text-gray-500 text-base font-medium  border-0 bg-inherit`}
                                > 789456 </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-4 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-1/8">Date:</div>
                        <div
                            className={"text-gray-500 text-base font-medium  w-full"}>
                            7/8/24
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-2/12">Due Date:</div>
                        <div className={"text-gray-500 text-base font-medium  w-full"}>
                             7/8/24                        
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-1  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full ">
                    <div className="flex gap-[16px] items-center w-full">
                        <div className="text-gray-500 text-base font-bold py-3">Notes:</div>
                        <input type="text" className="w-full h-9 text-textGrey1 text-base font-medium px-2 rounded border-0 outline-none" defaultValue="...." disabled/>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full pb-[16px]">
                <div className="px-6 py-4  bg-white rounded-[10px] justify-between items-center gap-4 flex flex-col w-full ">
                    <div className="flex flex-col gap-[16px] w-full">
                        <div className="text-gray-500 text-base font-bold ">Recurring Expense</div>
                        <div className='w-full flex gap-8'>
                            <input type="text" className="w-[20rem] py-3  text-textGrey2 text-base font-medium px-2 rounded border border-solid border-borderGrey" defaultValue="Every Month" disabled   />
                            <input type="text" className="w-[20rem] py-3  text-textGrey2 text-base font-medium px-2 rounded border border-solid border-borderGrey" defaultValue="Started on 7/8/24"  disabled />
                            <input type="text" className="w-[20rem] py-3  text-textGrey1 text-base font-medium px-2 rounded border border-solid border-borderGrey" defaultValue="Ends never"  disabled />
                        </div>
                    </div>
                    <div className='w-full'>
                        <Button className='bg-textGreen text-white text-base font-bold py-3 border-0 outline-none rounded-[5px] cursor-pointer'>
                            Stop recurring expense
                        </Button>
                    </div>

                </div>
            </div>


        </>
  )
}

export default ExsistingRecurringHeader