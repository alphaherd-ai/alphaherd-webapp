"use client"


import React, { useState, useEffect } from 'react';

import Link from "next/link"
import Image from "next/image"
import Select from 'react-select';


const ExistingsaleEstimateTotalAmout = ({otherData}) => {
  

    const [grandAmt, setGrandAmt] = useState('₹2124');

 


    return (
        <>


<div className="flex w-full box-border bg-gray-100 pt-[20px] pb-[20px]">
                            <div className="w-1/2"></div>
                            <div className="w-1/2  bg-white rounded-[10px]">
                                <div className="w-full flex p-4 border-b border-stone-300 justify-between items-center gap-2.5 inline-flex border border-solid border-stone-300">
                                    <div className="text-gray-500 text-base font-bold font-['Satoshi']">Subtotal</div>
                                    <div className="text-right text-gray-500 text-base font-bold font-['Satoshi']">₹2,124</div>
                                </div>
                                <div className="w-full flex p-4 border-b border-stone-300 justify-between items-center gap-2.5 inline-flex border border-solid border-stone-300">
                                    <div className="text-gray-500 text-base font-bold font-['Satoshi']">Overall Discount</div>
                                    <div className="flex items-center">
                                        <div className="text-right text-gray-500 text-base font-bold font-['Satoshi']">0%</div>
                                     
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

export default ExistingsaleEstimateTotalAmout;
