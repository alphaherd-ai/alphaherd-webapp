"use client"


import React, { useState, useEffect, useContext } from 'react';
import Link from "next/link"
import Image from "next/image"
import Select from 'react-select';
import { DataContext } from './DataContext';
import { Tax } from '@prisma/client';


const NewsaleEstimateTotalAmout = () => {
    const { tableData } = useContext(DataContext);
    const [selectedDiscount, setDiscount] = useState(0);
    let totalAmount = 0;
    tableData.forEach(data => {
        totalAmount += (data.quantity * data.sellingPrice + data.quantity * data.gst)||0;
    });

    const { totalAmountData, setTotalAmountData } = useContext(DataContext);
    const [grandAmt, setGrandAmt] = useState(totalAmount);

    const gstOptions = [
        { value: 0.18, label: Tax.GST_18 },
        { value: 0.09, label: Tax.GST_9 }
    ];

    const handleSelectChange = (selectedOption: any) => {
        let discountedAmount = totalAmount - totalAmount * selectedOption.value;
        setDiscount(selectedOption.value);
        setGrandAmt(discountedAmount);
        setTotalAmountData((prevData) => ({ ...prevData, gst: selectedOption }));
    };

    const [shipping, setShipping] = useState(0);
    const [adjustment, setAdjustment] = useState(0); 

    const handleShippingChange = (event:any) => {
        const value = parseFloat(event.target.value) || 0; 
        setShipping(value);
        updateGrandTotal(); 
    };

    const handleAdjustmentChange = (event:any) => {
        const value = parseFloat(event.target.value) || 0; 
        setAdjustment(value);
        updateGrandTotal(); 
    };

    const updateGrandTotal = () => {
        const discountedAmount = (totalAmount - totalAmount * selectedDiscount)||0;
        const newGrandTotal = discountedAmount + shipping + adjustment;
        setGrandAmt(newGrandTotal);
        setTotalAmountData((prevData) => ({
            ...prevData,
            subTotal:totalAmount,
            totalCost: newGrandTotal, 
            shipping:shipping,
            adjustment:adjustment,
        }));
    };

    useEffect(() => {
        updateGrandTotal(); 
    }, [totalAmount, selectedDiscount, shipping, adjustment]);

    return (
        <>


<div className="flex w-full box-border bg-gray-100 pt-[20px] pb-[20px]">
                            <div className="w-1/2"></div>
                            <div className="w-1/2 bg-white rounded-[10px]">
                                <div className="w-full flex p-4 border-b border-stone-300 justify-between items-center gap-2.5 inline-flex border border-solid border-stone-300">
                                    <div className="text-gray-500 text-base font-bold font-['Satoshi']">Subtotal</div>
                                    <div className="text-right text-gray-500 text-base font-bold font-['Satoshi']">{totalAmount.toFixed(2)}</div>
                                </div>
                                <div className="w-full flex p-4 border-b border-stone-300 justify-between items-center gap-2.5 inline-flex border border-solid border-stone-300">
                                    <div className="text-gray-500 text-base font-bold font-['Satoshi']">Overall Discount</div>
                                    <div className="flex items-center">
                                        <div className="text-right text-gray-500 text-base font-bold font-['Satoshi']">{selectedDiscount*100}%</div>
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
                                        <input
                                            className="text-right text-gray-500 text-base font-bold font-['Satoshi'] border-none outline-none"
                                            placeholder='₹______'
                                            value={shipping} 
                                            onChange={handleShippingChange} 
                                        />
                                    </div>
                                    <div className="w-full flex p-4 border-b border-stone-300 justify-between items-center gap-2.5 inline-flex border border-solid border-stone-300">
                                        <div className="text-gray-500 text-base font-bold font-['Satoshi']">Adjustment</div>
                                        <input
                                            className="text-right text-gray-500 text-base font-bold font-['Satoshi'] border-none outline-none"
                                            placeholder='₹______'
                                            value={adjustment} 
                                            onChange={handleAdjustmentChange} 
                                        />
                                    </div>
                                <div className="w-full flex p-4 border-b border-stone-300 justify-between items-center gap-2.5 inline-flex border border-solid border-stone-300">
                                    <div className="text-teal-400 text-base font-bold font-['Satoshi']">Grand total</div>
                                    <div className="text-right text-gray-500 text-base font-bold font-['Satoshi']">{(grandAmt).toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
    
    
          
        </>

    )
}

export default NewsaleEstimateTotalAmout;
