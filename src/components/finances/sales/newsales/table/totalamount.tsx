"use client"


import React, { useState, useEffect, useContext } from 'react';
import DownArrow from '../../../../../assets/icons/finance/downArrow.svg';
import Invoice from '../../../../../assets/icons/finance/invoice.svg';
import Link from "next/link"
import Image from "next/image"
import Select from 'react-select';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { DataContext } from './DataContext';



const NewsalesTotalAmout = () => {


    const { totalAmountData, setTotalAmountData } = useContext(DataContext);
    const [grandAmt, setGrandAmt] = useState('₹2124');

    const gstOptions = [
        { value: 'GST@18%.', label: 'GST@18%.' },
        { value: 'GST@9%.', label: 'GST@9%.' }
    ];

    const handleSelectChange = (selectedOption:any) => {
        setTotalAmountData((prevData) => ({ ...prevData, gst: selectedOption }));
    };


    return (
        <>


            <div className="flex w-full box-border bg-gray-100 pt-[20px] pb-[20px]">
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
                    <div className="w-full  p-6 bg-white rounded-bl-[10px] rounded-br-[10px] border border-neutral-400 justify-between items-center gap-6 flex border border-solid border-stone-300">
                        <div className="text-gray-500 text-xl font-medium font-['Satoshi']">Payments</div>
                        <div className='flex items-center h-9 px-4 py-2.5 justify-between rounded-lg '>

                            <div className="text-gray-500 text-base font-bold font-['Satoshi']">₹2,124
                                <span className="text-green-600 text-sm font-medium font-['Satoshi'] px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2">
                                    You’re owed
                                </span>
                            </div>



                        </div>
                    </div>
                </div>
                <div className="w-1/2 bg-white rounded-[10px]">
                                <div className="w-full flex p-4 border-b border-stone-300 justify-between items-center gap-2.5 inline-flex border border-solid border-stone-300">
                                    <div className="text-gray-500 text-base font-bold font-['Satoshi']">Subtotal</div>
                                    <div className="text-right text-gray-500 text-base font-bold font-['Satoshi']">₹2,124</div>
                                </div>
                                <div className="w-full flex p-4 border-b border-stone-300 justify-between items-center gap-2.5 inline-flex border border-solid border-stone-300">
                                    <div className="text-gray-500 text-base font-bold font-['Satoshi']">Overall Discount</div>
                                    <div className="flex items-center">
                                        <div className="text-right text-gray-500 text-base font-bold font-['Satoshi']">0%</div>
                                        <div className=' flex text-gray-500 text-base font-medium pl-6'>
                                            <Select
                                                className="text-neutral-400 text-base font-medium"
                                                defaultValue={gstOptions[0]}
                                                isClearable={false}
                                                isSearchable={true}
                                                options={gstOptions}
                                                styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        border: state.isFocused ? 'none' : 'none',
                                                    }),
                                                }}
                                                onChange={handleSelectChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex p-4 border-b border-stone-300 justify-between items-center gap-2.5 inline-flex border border-solid border-stone-300">
                                    <div className="text-gray-500 text-base font-bold font-['Satoshi']">Shipping</div>
                                    <div className="text-right text-gray-500 text-base font-bold font-['Satoshi']">₹0</div>
                                </div>
                                <div className="w-full flex p-4 border-b border-stone-300 justify-between items-center gap-2.5 inline-flex border border-solid border-stone-300">
                                    <div className="text-gray-500 text-base font-bold font-['Satoshi']">Adjustment</div>
                                    <div className="text-right text-gray-500 text-base font-bold font-['Satoshi']">₹0</div>
                                </div>
                                <div className="w-full flex p-4 border-b border-stone-300 justify-between items-center gap-2.5 inline-flex border border-solid border-stone-300">
                                    <div className="text-teal-400 text-base font-bold font-['Satoshi']">Grand total</div>
                                    <div className="text-right text-gray-500 text-base font-bold font-['Satoshi']">{grandAmt}</div>
                                </div>
                            </div>
                        </div>
    
          
        </>

    )
}

export default NewsalesTotalAmout;
