'use client'
import React, { useState } from 'react'
import leftIcon from '../../../assets/icons/finance/left_icon.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@nextui-org/react"
import printicon from "../../../assets/icons/finance/print.svg"
import shareicon from "../../../assets/icons/finance/share.svg"
import drafticon from "../../../assets/icons/finance/draft.svg"
import checkicon from "../../../assets/icons/finance/check.svg"
import downloadicon from "../../../assets/icons/finance/download.svg"
const InventoryTransfer = () => {
    const router = useRouter();
    return (
        <div className='w-full h-[100vh] bg-gray-100 py-10 px-6'>
            <div className='flex items-center'>
                <div className="w-11 h-11  bg-gray-100 rounded-[5px] border border-solid border-neutral-400 flex justify-center items-center mr-4">
                    <Image className="w-6 h-6 relative rounded-[5px]  cursor-pointer" src={leftIcon} alt="Back" onClick={() => router.back()}></Image>

                </div>

                <div className="text-gray-500 text-[28px] font-bold">
                    New Inventory Transfer
                </div>
            </div>

            <div className='w-full h-screen overflow-y-scroll bg-gray-100 mt-10 rounded-t-md border border-solid border-neutral-400'>
                <div className='w-full h-16  rounded-t-md rounded-b-none mb-8 border-t-0 border-r-0 border-l-0 border-b-[1px]  border-solid border-neutral-400   bg-white'></div>
                <div className="flex justify-between w-full px-6 pb-[16px]">
                    <div className="px-6 bg-white rounded-[10px] h-14 justify-between items-center gap-4 flex w-full mr-[16px]">
                        <div className="flex gap-[16px] items-center w-full">
                            <div className="text-gray-500 text-base font-bold">Branch:</div>


                        </div>
                    </div>
                    <div className="px-6 py-1 bg-white h-14 rounded-[10px] justify-between items-center gap-4 flex w-full">
                        <div className="flex w-full">
                            <div className="text-gray-500 text-base font-bold w-[12rem] py-3">Reference Number:</div>
                            <div className="flex items-center justify-between w-full ">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex px-6  justify-between w-full pb-[16px]">
                    <div className="px-6 h-14  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                        <div className="flex gap-[0.8rem] items-center w-full">
                            <div className="text-gray-500 text-base font-bold  w-1/8">Date:</div>

                        </div>
                    </div>
                    <div className="px-6  h-14 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                        <div className="flex gap-[0.2rem] items-center w-full">
                            <div className="text-gray-500 text-base font-bold w-[6rem]">Status:</div>

                        </div>
                    </div>

                </div>
                <div className="flex h-14 px-6 justify-between w-full mt-1 pb-[16px]">
                    <div className="px-6 py-1 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                        <div className="flex gap-[16px] items-center w-full">
                            <div className="text-gray-500 text-base font-bold py-3">Notes:</div>

                        </div>
                    </div>
                </div>

                <div className='w-full h-fit  bg-gray-100 px-6 rounded-md '>
                    <div className='w-full h-14 bg-white flex rounded-t-md rounded-b-0 border border-solid border-neutral-400 items-center text-gray-500 text-md font-bold px-6'>Items</div>
                    <div className='flex px-4  w-full  box-border bg-gray-100  h-12 justify-evenly  items-center border-0 border-b border-l border-r  border-solid border-neutral-400 text-textGrey2'>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>No</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Name</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Batch No</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Bar Code</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Expiry Date</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Quantity</div>
                    </div>
                    <div className='flex px-4 w-full box-border bg-white h-12 justify-evenly items-center border-0 border-b border-l border-r border-solid border-neutral-400'>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>1</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Dollo</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>123456</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>123456</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>22/12/24</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>50 Strips</div>
                    </div>

                    <div className='flex px-4 w-full box-border bg-white h-12 justify-evenly items-center border-0 border-b border-l border-r border-solid border-neutral-400'>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>1</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Dollo</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>123456</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>123456</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>22/12/24</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>50 Strips</div>
                    </div>

                    <div className='flex px-4 w-full box-border bg-white h-12 justify-evenly items-center border-0 border-b border-l border-r border-solid border-neutral-400'>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>1</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Dollo</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>123456</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>123456</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>22/12/24</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>50 Strips</div>
                    </div>

                    <div className='flex px-4 w-full box-border bg-white h-12 justify-evenly items-center border-0 border-b border-l border-r border-solid border-neutral-400'>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>1</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Dollo</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>123456</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>123456</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>22/12/24</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>50 Strips</div>
                    </div>
                    <div className='flex px-4 rounded-b-md w-full  box-border bg-gray-100  h-12 justify-evenly  items-center border-0 border-b border-l border-r  border-solid border-neutral-400 text-textGrey2'>
                        <div className=' flex text-gray-500 text-base font-bold   w-2/12 '></div>
                        <div className=' flex text-gray-500 text-base font-bold   w-2/12 '>Total</div>
                        <div className=' flex text-gray-500 text-base font-bold   w-2/12 '></div>
                        <div className=' flex text-gray-500 text-base font-bold   w-2/12 '></div>
                        <div className=' flex text-gray-500 text-base font-bold   w-2/12 '></div>
                        <div className=' flex text-gray-500 text-base font-bold   w-2/12 '>220 Items</div>
                    </div>
                </div>

                <div className='w-full px-6 mt-4  h-12 mb-10  rounded-md'>
                    <div className='px-2 w-full flex text-gray-500 text-base font-bold items-center h-full bg-white rounded-md'>Delievery Due Date:</div>

                </div>


            </div>

            <div className="flex justify-between items-center h-14 w-full  box-border  bg-white  border border-t-0 border-solid border-neutral-400 text-gray-400 py- rounded-b-lg">
                <div className="flex justify-between items-center gap-4 pl-4">
                    <Button className="p-2 bg-white rounded-md border border-solid  border-borderGrey  justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={printicon} alt="print"></Image>
                        <div className="text-textGrey1 text-sm hover:text-textGrey2 transition-all">Print</div>
                    </Button>
                    <Button className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">

                        <Image src={downloadicon} alt="download" />
                        <div className="text-textGrey1 text-sm hover:text-textGrey2 transition-all">Download</div>

                    </Button>

                </div>
                <div className="flex justify-between items-center gap-4 pr-4">
                  
                    <Button className={`px-4 py-2.5 text-white text-base rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer `}
                    >
                        <Image src={checkicon} alt="check"></Image>
                        <div>{"Save"}</div>
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default InventoryTransfer;