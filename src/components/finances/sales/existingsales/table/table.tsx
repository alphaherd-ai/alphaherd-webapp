"use client"


import SelectDropdown from 'react-native-select-dropdown'

import Download from '../../../../../assets/icons/finance/download.svg';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useRef } from "react"
import Image from "next/image"
import Link from "next/Link"
import ExistingsalesHeader from "./header"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import ExistingsalesBottomBar from './bottombar';
import ExistingsalesTotalAmout from './totalamount';
const ExistingsalesTable = () => {

    const batchOptions = [
        { value: 'one', label: 'one' },
        { value: 'two', label: 'two' },
        { value: 'three', label: 'three' }
    ];

    const taxOptions = [
        { value: 'Tax excl.', label: 'Tax excl.' },
        { value: 'Tax incl.', label: 'Tax incl.' }
    ];

    const gstOptions = [
        { value: 'GST@18%.', label: 'GST@18%.' },
        { value: 'GST@9%.', label: 'GST@9%.' }
    ];

    const colourOptions = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const initialItems = [
        { id: 1, quantity: 4, quantity2: 5 },
        { id: 2, quantity: 3, quantity2: 6 },
        // Add more items as needed
    ];


    const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
        <label style={{ marginRight: '1em' }}>
            <input type="checkbox" {...props} />
            {children}
        </label>
    );


    const [disableButton, setDisableButton] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isChecked, setChecked] = useState(false);


    const [items, setItems] = useState(initialItems);




    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);

 
   

    return (
        <>
            <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100  rounded-lg">
                <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 justify-between items-center gap-6 flex">
                <div className='bg-green-200 rounded-md px-2' ><span className="text-green-600  text-sm font-medium font-['Satoshi']">You’re owed: ₹</span><span className="text-green-600 text-sm font-bold font-['Satoshi']">2,124</span></div>
                <div className='flex items-center justify-center border w-7 h-7 border-solid border-gray-300 border-0.5 rounded-md p-1'><Image src={Download} alt='Download' className='w-4  h-4' /></div>
                </div>
                <div className="flex-col w-full pr-[16px] pl-[16px] pt-[20px]">
                    <ExistingsalesHeader />

                    <div className="w-full">
                        <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 justify-between items-center gap-6 flex">
                            <div className="text-gray-500 text-xl font-medium font-['Satoshi']">
                                Items
                            </div>

                        </div>
                        <div>
                            <div className='flex  w-full justify-evenly items-center box-border bg-gray-100  h-12  border-b border-neutral-400 text-gray-500'>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>No.</div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>Name</div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>Batch No.</div>

                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>
                                     Quantity
                                </div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>Selling Price</div>


                                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>Tax %</div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>Tax Amt.</div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>Total</div>
                            </div>
                            {items.map((item) => (
                                <div key={item.id} className="flex flex-col">
                                     <div  className='flex justify-evenly items-center w-full  box-border  bg-white  bg-white border border-solid border-gray-200 text-gray-400   '>
                                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{item.id}</div>
                                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{`Item ${item.id}`}</div>
                                    <div className='w-2/12 px-6 flex-col items-center text-neutral-400 text-base font-medium'>
                                    <div className="text-neutral-400 text-base  font-medium font-['Satoshi'] "> gdre</div>

                                        <div className="text-neutral-400 text-[10px] font-medium font-['Satoshi']">Exp. 09/04/24</div>
                                    </div>
                                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                      
                                      <div>{item.quantity}</div>
                                    
                                  </div>
              
                                    <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-5'>
                                        <div className="w-1/12 flex items-center text-neutral-400 text-base font-medium">₹400</div>
                                        <div className="text-neutral-400 text-base  font-medium font-['Satoshi'] "> Tax inc</div>

                                    </div>
                                   
                                 
                                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>
                                    <div className="text-neutral-400 text-base  font-medium font-['Satoshi'] "> Tax inc</div>

                                    </div>
                                    <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{`₹${item.quantity * 400}`} - {`₹${item.quantity * 500}`}</div>
                                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{`₹${item.quantity * 400 * 1.18}`}- {`₹${item.quantity * 500}`}</div>
                                   
                                </div>
                                    <div>
                                    <div className='flex  w-full justify-evenly items-center box-border bg-white  h-12  border-b border-neutral-400 text-gray-500'>
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'></div>
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>
                                            <div className="w-full h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 inline-flex">
                                                <div className="text-indigo-600 text-sm font-medium font-['Satoshi']">Item Discount</div>
                                            </div>
                                        </div>
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'> fgernjjg</div>
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>

                                        </div>

                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'></div>

                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'> </div>
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'></div>
                                        <div className="text-red-500 text-base font-bold px-6 w-1/12 font-['Satoshi']">-₹236</div>
                                     
                                    </div>

                                    </div>
                                </div>
                                
                               
                            ))}
                            <div className='flex  w-full justify-evenly items-center box-border bg-gray-100  h-12  border-b border-neutral-400 text-gray-500'>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>Total</div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'> </div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'></div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>{items.reduce((acc, item) => acc + item.quantity, 0)} Items</div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'> </div>
                              
                                
                            
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>
                                <div className="text-neutral-400 text-base  font-medium  font-['Satoshi'] "> Tax inc</div>
                                </div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>{`₹${items.reduce((acc, item) => acc + item.quantity * 400 * 0.18, 0)}`}</div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>{`₹${items.reduce((acc, item) => acc + item.quantity * 400 * 1.18, 0)}`}</div>
                            </div>
                        </div>
                        <ExistingsalesTotalAmout />

                    </div>
                </div>
                <ExistingsalesBottomBar />
            </div>



        </>

    )
}

export default ExistingsalesTable;
