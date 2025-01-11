'use client'
import React, { useState, useEffect, useCallback } from 'react'
import leftIcon from '../../../assets/icons/finance/left_icon.svg'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@nextui-org/react"
import printicon from "../../../assets/icons/finance/print.svg"
import shareicon from "../../../assets/icons/finance/share.svg"

import downloadicon from "../../../assets/icons/finance/download.svg"


import Loading from '@/app/loading'

import useSWR from 'swr'
import 'react-datepicker/dist/react-datepicker.css';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())





const InventoryTransfer = () => {
    const router = useRouter();
    const params = useSearchParams();
    const id = params.get('id');
    console.log(id);
    const [formData, setFormData] = useState<any>();
    const [items, setItems] = useState<any>([]);
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/transfer/invoice/${id}`, fetcher);
    useEffect(() => {
        if (data && !isLoading && !error) {
            console.log(data);
            const { items, ...otherData } = data;
            setFormData(otherData);
            setItems(JSON.parse(items));
        }
    }, [data, isLoading, error])

    //console.log(items);



    return (
        <>
            {isLoading ? <Loading /> :
                <div className='w-full min-h-screen bg-gray-100 py-10 px-6'>
                    <div className='flex items-center'>
                        <div className="w-11 h-11  bg-gray-100 rounded-[5px] border border-solid border-neutral-400 flex justify-center items-center mr-4">
                            <Image className="w-6 h-6 relative rounded-[5px]  cursor-pointer" src={leftIcon} alt="Back" onClick={() => router.back()}></Image>

                        </div>

                        <div className="text-gray-500 text-[28px] font-bold">
                            Exsisitng Inventory Transfer
                        </div>
                    </div>

                    <div className='w-full  bg-gray-100 mt-10 rounded-t-md border border-solid border-neutral-400'>
                        <div className='w-full h-16  rounded-t-md rounded-b-none mb-8 border-t-0 border-r-0 border-l-0 border-b-[1px]  border-solid border-neutral-400   bg-white'></div>
                        <div className="flex justify-between w-full px-6 pb-[16px]">
                            <div className="px-6 bg-white rounded-[10px] h-14 justify-between items-center gap-4 flex w-full mr-[16px]">
                                <div className="flex gap-[16px] items-center w-full">
                                    <div className="text-gray-500 text-base font-bold">Branch:</div>
                                    <p className='text-gray-500'>{formData?.transferStatus === 'Transfer To' ? formData?.receivingBranch : formData?.transferringBranch}  </p>
                                    <p className=' ml-4 px-2 py-1 rounded-[5px] bg-[#35BEB1] border-none text-white'>{formData?.transferStatus}</p>


                                </div>
                            </div>
                            <div className="px-6 py-1 bg-white h-14 rounded-[10px] justify-between items-center gap-4 flex w-full">
                                <div className="flex w-full">
                                    <div className="text-gray-500 text-base w-full flex py-3">
                                        <p className=' font-bold mr-2'>Reference Number:</p>
                                        <p>{formData?.invoiceNumber}</p>
                                    </div>
                                    <div className="flex items-center justify-between w-full ">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex px-6  justify-between w-full pb-[16px]">
                            <div className="px-6 h-14  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                                <div className="flex gap-[0.8rem] items-center w-full">
                                    <div className="text-gray-500 text-base font-bold  w-1/8">Date:</div>
                                    <p className='text-gray-500'>{new Date(formData?.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', })}</p>
                                </div>
                            </div>
                            <div className="px-6  h-14 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                                <div className="flex gap-[0.2rem] items-center w-full">
                                    <div className="text-gray-500 w-full flex text-base">
                                        <p className=' font-bold mr-2'>Status:</p>
                                        <p>{formData?.status}</p>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex h-14 px-6 justify-between w-full mt-1 pb-[16px]">
                            <div className="px-6 py-1 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                                <div className="flex gap-[16px] items-center w-full">
                                    <div className="text-gray-500 text-base font-bold py-3">Notes:</div>
                                    <p className='text-gray-500'>{formData?.notes}</p>

                                </div>
                            </div>
                        </div>

                        <div className='w-full h-fit  bg-gray-100 px-6 rounded-md '>
                            <div className='w-full h-14 bg-white flex rounded-t-md rounded-b-0 border border-solid border-neutral-400 items-center text-gray-500 text-md font-bold px-6'>Items</div>
                            <div className='flex px-4  w-full  box-border bg-gray-100  h-12 justify-evenly  items-center border-0 border-b border-l border-r  border-solid border-neutral-400 text-textGrey2'>
                                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>No</div>
                                <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Name</div>
                                <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Batch No</div>
                                <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Bar Code</div>
                                <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Expiry Date</div>
                                <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Quantity</div>
                                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '></div>
                            </div>
                            {items.map((item: any, index: number) => (
                                <div key={index} className='flex px-4  w-full  box-border bg-white  h-12 justify-evenly  items-center border-0 border-b border-l border-r  border-solid border-neutral-400 text-textGrey2'>
                                    <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>{index + 1}</div>
                                    <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>{item?.product?.itemName}</div>
                                    <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>{item?.batch?.batchNumber}</div>
                                    <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>{item?.product?.hsnCode}</div>
                                    <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>{new Date(item?.batch?.expiry).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', })}</div>
                                    <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>{item?.quantity}</div>
                                    <div className=' flex text-gray-500 text-base font-medium   w-1/12 '></div>
                                </div>
                            ))}
                            <div className='flex px-4  w-full  box-border bg-gray-100  h-12 justify-evenly  items-center border-0 border-b border-l border-r rounded-b-md  border-solid border-neutral-400 text-textGrey2'>
                                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '></div>
                                <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Total</div>
                                <div className=' flex text-gray-500 text-base font-medium   w-2/12 '></div>
                                <div className=' flex text-gray-500 text-base font-medium   w-2/12 '></div>
                                <div className=' flex text-gray-500 text-base font-medium   w-2/12 '></div>
                                <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>{items.reduce((acc: any, item: any) => { if (!item.product && !item.batch) return acc; return acc + (item?.quantity || 0) }, 0)} Items</div>
                                <div className=' flex text-gray-500 text-base font-medium   w-1/12 '></div>
                            </div>



                        </div>

                        <div className='w-full px-6 mt-4  h-12 mb-10  rounded-md'>
                            <div className='px-2 w-full flex text-gray-500 text-base font-bold items-center h-full bg-white rounded-md'>
                                <p className='w-2/12'>Delivery Due Date:</p>
                                <p>{new Date(formData?.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', })}</p>
                            </div>
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
                            <Button className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">

                                <Image src={shareicon} alt="download" />
                                <div className="text-textGrey1 text-sm hover:text-textGrey2 transition-all">Share editable sheet</div>

                            </Button>

                        </div>
                        {/* <div className="flex justify-between items-center gap-4 pr-4">

                            <Button className={`px-4 py-2.5 text-white text-base rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer bg-zinc-900`}
                            >
                                <Image src={checkicon} alt="check"></Image>
                                <div>{"Save"}</div>
                            </Button>
                        </div> */}
                    </div>
                </div>
            }
        </>

    )
}

export default InventoryTransfer;