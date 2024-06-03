"use client"


import React, { useState, useEffect } from 'react';
import DownArrow from '../../../../../assets/icons/finance/downArrow.svg';
import Invoice from '../../../../../assets/icons/finance/invoice.svg';
import SelectDropdown from 'react-native-select-dropdown'
import Link from "next/link"
import Image from "next/image"
import Select from 'react-select';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";


const ExistingsalesTotalAmout = ({otherData}) => {


    return (
        <>


<div className="flex  pt-[20px] pb-[20px]">
                <div className="w-1/2 mr-4 flex flex-col">

                    <div className="w-full  p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 justify-between items-center gap-6 flex border border-solid border-stone-300">
                        <div className="text-gray-500 text-xl font-medium font-['Satoshi']">Payments</div>
                        <div className='flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-lg '>

                            <Popover placement="bottom-end" showArrow offset={10}>
                                <PopoverTrigger>
                                    <Button color="gray-400"
                                        variant="solid"
                                        className="capitalize flex border-none bg-black text-white rounded-lg ">
                                        <div className='flex pr-2'><Image src={DownArrow} alt='DownArrow' className='w-4 h-4 ' /></div>Recored Transaction </Button>
                                </PopoverTrigger>
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
                            </Popover>



                        </div>
                    </div>
                    <div className="w-full bg-white rounded-bl-[10px] rounded-br-[10px] flex border border-solid border-stone-300">
                        <div className="text-gray-500 text-xl font-medium font-['Satoshi'] w-1/3 p-4">22/06/24</div>
                        <div className="text-gray-500 text-xl font-medium font-['Satoshi'] w-1/3 p-4 flex  items-center">  <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-4 h-4 ' /></div>Cash</div>
                        <div className="text-gray-500 text-xl font-medium font-['Satoshi'] w-1/3 p-4 ">₹68,972  <span className="bg-rose-100 text-red-500 text-sm font-medium font-['Satoshi']">Out</span></div>
                       
                    </div>
                </div>
                <div className="w-1/2 bg-white rounded-md ">
                            <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                                    <div className="text-gray-500 text-base font-bold ">Subtotal</div>
                                    <div className="text-right text-gray-500 text-base font-bold ">₹ {otherData.subTotal}</div>
                                </div>
                                <div className="w-full flex px-4 py-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                                    <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
                                    <div className="flex items-center">
                                        <div className="text-right text-textGrey1 text-base  ">{otherData.overallDiscount*100}%</div>
                                     
                                    </div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5   ">
                                    <div className="text-gray-500 text-base font-bold ">Shipping</div>
                                    <div className="text-right text-textGrey1 text-base ">₹ {otherData.shipping}</div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5  ">
                                    <div className="text-gray-500 text-base font-bold ">Adjustment</div>
                                    <div className="text-right text-textGrey1 text-base ">₹{otherData.adjustment}</div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                                    <div className="text-textGreen text-base font-bold">Grand total</div>
                                    <div className="text-right text-textGreen text-base font-bold ">{otherData.totalCost}</div>
                                </div>
                            </div>
            </div>


        </>

    )
}

export default ExistingsalesTotalAmout;
