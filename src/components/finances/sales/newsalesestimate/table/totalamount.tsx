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
        totalAmount += (data.quantity * data.sellingPrice + data.quantity * data.gst*data.sellingPrice)||0;
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


<div className="flex  pt-[20px] pb-[20px]">
                            <div className="w-1/2"></div>
                            <div className="w-1/2 bg-white rounded-md ">
                                <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                                    <div className="text-gray-500 text-base font-bold ">Subtotal</div>
                                    <div className="text-right text-gray-500 text-base font-bold ">{totalAmount.toFixed(2)}</div>
                                </div>
                                <div className="w-full flex px-4 py-2 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                                    <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
                                    <div className="flex items-center">
                                        <div className="text-right text-borderText text-base  ">{selectedDiscount*100}%</div>
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
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5   ">
                                        <div className="text-gray-500 text-base font-bold ">Shipping</div>
                                        <input
                                            className="text-right text-textGrey1 text-base   border-none outline-none"
                                            placeholder='₹______'
                                            value={shipping} 
                                            onChange={handleShippingChange} 
                                        />
                                    </div>
                                    <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5  ">
                                        <div className="text-gray-500 text-base font-bold ">Adjustment</div>
                                        <input
                                            className="text-right text-textGrey1 text-base   border-none outline-none"
                                            placeholder='₹______'
                                            value={adjustment} 
                                            onChange={handleAdjustmentChange} 
                                        />
                                    </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                                    <div className="text-textGreen text-base font-bold ">Grand total</div>
                                    <div className="text-right text-textGreen text-base font-bold">{(grandAmt).toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
    
    
          
        </>

    )
}

export default NewsaleEstimateTotalAmout;
