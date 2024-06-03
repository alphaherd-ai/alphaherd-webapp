"use client"


import React, { useState, useEffect } from 'react';

import Link from "next/link"
import Image from "next/image"
import Select from 'react-select';


const ExistingsaleEstimateTotalAmout = ({otherData}: any) => {

    

 


    return (
        <>


<div className="flex  pt-[20px] pb-[20px]">
                            <div className="w-1/2"></div>
                            <div className="w-1/2 bg-white rounded-md ">
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
                                    <div className="text-right text-textGrey1 text-base ">₹{otherData.shipping}</div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5  ">
                                    <div className="text-gray-500 text-base font-bold ">Adjustment</div>
                                    <div className="text-right text-textGrey1 text-base ">₹{otherData.adjustment}</div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                                    <div className="text-textGreen text-base font-bold">Grand total</div>
                                    <div className="text-right text-textGreen text-base font-bold ">₹{otherData.totalCost}</div>
                                </div>
                            </div>
                        </div>
    
          
        </>

    )
}

export default ExistingsaleEstimateTotalAmout;
