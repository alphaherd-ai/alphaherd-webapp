"use client"


import React, { useState, useEffect } from 'react';
import DownArrow from '../../../../../assets/icons/finance/downArrow.svg';
import Invoice from '../../../../../assets/icons/finance/invoice.svg';
import Rupee from "../../../../../assets/icons/finance/rupee.svg"
import Cash from "../../../../../assets/icons/finance/Cash.svg"
import Link from "next/link";
import Image from "next/image"
import Select from 'react-select';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";


const ExistingsalesReturnTotalAmout = ({otherData}:any) => {



    return (
        <>


<div className="flex  pt-[20px] pb-[20px]">
                <div className="w-1/2 mr-4 flex flex-col">

                <div className="w-full  p-6 bg-white rounded-tl-md rounded-tr-md border border-solid  border-borderGrey justify-between items-center gap-6 flex">
                        <div className="text-gray-500 text-xl font-medium ">Payments</div>
                        {/* <div className='flex items-center h-9 py-2.5 bg-black justify-between rounded-lg '> */}

                            {/* <Popover placement="bottom-end" showArrow offset={10}>
                                <PopoverTrigger> */}
                                    <Button 
                                        variant="solid"
                                        className="capitalize flex h-9 py-2.5 border-none text-base bg-black text-white rounded-lg cursor-pointer">
                                        <div className='flex'><Image src={Rupee} alt='Rupee' className='w-6 h-6 ' /></div>
                                        Recorded Transaction
                                         </Button>
                                {/* </PopoverTrigger>
                                <PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">

                                    <div className="flex flex-col ">

                                        <div className='flex flex-col'>

                                            <Link className='no-underline flex item-center' href='/finance/overview'>
                                                <div className='text-base p-4   text-white flex '>
                                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Inverse</div>
                                            </Link>
                                            <Link className='no-underline flex item-center' href='/finance/overview'>
                                                <div className='text-base p-4  text-white flex '>
                                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Return</div>
                                            </Link>
                                            <Link className='no-underline flex item-center' href='/finance/overview'>
                                                <div className='text-base p-4  text-white flex '>
                                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Estimate</div>
                                            </Link>

                                        </div>
                                    </div>


                                </PopoverContent>
                            </Popover> */}



                        {/* </div> */}
                    </div>
                    <div className="w-full px-6  bg-white  justify-between items-center  flex border border-t-0 border-solid border-borderGrey">
                        <div className="text-textGrey1 text-base font-medium  w-1/3 py-4">22/06/24</div>
                        <div className="text-textGrey1 text-base font-medium  w-1/3 py-4 flex  items-center">  <div className='flex pr-2'><Image src={Cash} alt='Cash' className='w-4 h-4 ' /></div>Cash</div>
                        <div className="text-textGrey1 text-base font-medium  w-1/3 py-4 ">₹68,972  <span className="px-2 py-1 rounded-md bg-[#FFEAEA] text-[#FF3030] text-sm font-medium ml-[5px]">Out</span></div>
                       
                    </div>
                    <div className="w-full  px-6 bg-white rounded-bl-md rounded-br-md justify-between items-center flex border border-t-0 border-solid border-borderGrey">
                    <div className="text-gray-500 text-base font-bold  w-1/3 py-4">Balance Due</div>
                        <div className="text-gray-500 text-lg font-medium  w-1/3 py-4 flex  items-center"></div>
                        <div className="text-gray-500 text-base font-bold  w-1/3 py-4 ">₹68,972 
                         <span className="text-[#0F9D58] text-sm font-medium  px-2 py-1.5 bg-[#E7F5EE] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                                    You’re owed
                                </span></div>
                       
                    </div>
                </div>
                <div className="w-1/2  bg-white rounded-[10px]">
                <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                                    <div className="text-gray-500 text-base font-bold ">Subtotal</div>
                                    <div className="text-right text-gray-500 text-base font-bold ">₹{otherData.subTotal}</div>
                                </div>
                                <div className="w-full flex px-4 py-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                                    <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
                                    <div className="flex items-center">
                                        <div className="text-right text-textGrey1 text-base  ">{otherData.overallDiscount*100}%</div>
                                     
                                    </div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5   ">
                                    <div className="text-gray-500 text-base font-bold ">Shipping</div>
                                    <div className="text-right text-textGrey1 text-base  ">₹{otherData.shipping}</div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5  ">
                                    <div className="text-gray-500 text-base font-bold ">Adjustment</div>
                                    <div className="text-right text-textGrey1 text-base  ">₹{otherData.adjustment}</div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                                    <div className="text-textGreen text-base font-bold ">Grand total</div>
                                    <div className="text-right text-textGreen text-base font-bold ">₹{otherData.totalCost}</div>
                                </div>
                            </div>
                        </div>
            


        </>

    )
}

export default ExistingsalesReturnTotalAmout;
