"use client"

import delicon from "../../../../../assets/icons/finance/1. Icons-27.svg"
import addicon from "../../../../../assets/icons/finance/add.svg"
import sellicon from "../../../../../assets/icons/finance/sell.svg"
import addicon1 from "../../../../../assets/icons/finance/add (3).svg"
import calicon from "../../../../../assets/icons/finance/calendar_today.svg"

import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';


import Subtract from "../../../../../assets/icons/finance/Subtract.svg"
import Add from "../../../../../assets/icons/finance/add (2).svg"
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import Image from "next/image"
import { Button } from "@nextui-org/react";
import CreateGrnBottomBar from "./bottombar"
import CreateGrnTotalAmount from "./totalamount"
import CreateGrnHeader from "./header"
import ExsistingGrnTotalAmount from "./totalamount"
import ExsistingGrnBottomBar from "./bottombar"
import ExsistingGrnHeader from "./header"


const ExsistingGrnTable = () => {

    const [startDate, setStartDate] = useState(new Date());


    
    const handleDateChange = (date:any) => {
        setStartDate(date);
        // setHeaderData((prevData) => ({ ...prevData, date }));
    };


    const taxOptions = [
        { value: 'Tax excl.', label: 'Tax excl.' },
        { value: 'Tax incl.', label: 'Tax incl.' }
    ]; 
    
    const gstOptions = [
        {value: "GST@5%", label: "GST@5%"},
        {value: "GST@*%", label: "GST@8%"},
        {value: "GST@18%", label: "GST@18%"},
        {value: "GST@20%", label: "GST@20%"},
    ]

    const category = [
        {value: "Utilities", label: "Utilities"},
        {value: "Rent", label: "Rent"},
        {value: "Medical Supplies", label: "Medical Supplies"},
        {value: "Repair and Maintainance", label: "Repair and Maintainance"},
        {value: "Payroll", label: "Payroll"},
        {value: "Inventory", label: "Inventory"},
        {value: "Other", label: "Other"},
    ]

    const initialItems = [
        { id: 1, quantity: 4, quantity2: 5 },
        { id: 2, quantity: 3, quantity2: 6 },
        // Add more items as needed
    ];

    const [items, setItems] = useState(initialItems);
    const [disableButton, setDisableButton] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);


    const handleAddItem= useCallback(() => {
        setItems([...items, {
            id: 0,
            quantity: 0,
            quantity2: 0
        }]);
    }, [items]);


    const handleDeleteRow = useCallback((index: number) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    }, [items]);

    const handleQuantityDecClick = (itemId: any) => {
        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === itemId && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
        );
    };
    
    const handleQuantityIncClick = (itemId: any) => {
        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === itemId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        );
    };

    const handleInputChange = (itemId: number, value: string) => {
        const quantity = parseInt(value, 10);
        if (!isNaN(quantity) && quantity >= 0) {
            setItems((prevItems) =>
                prevItems.map((item) => {
                    if (item.id === itemId) {
                        return { ...item, quantity };
                    }
                    return item;
                })
            );
        }
    };


    return (
        <>
            <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100 rounded-lg border border-solid border-borderGrey">
            <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-t-0 border-r-0 border-l-0 border-solid border-borderGrey justify-end items-center gap-6 flex">
                    
                    
                    

                    
                    
                </div>
                <div className="flex-col w-full pr-[16px] pl-[16px] pt-[20px] overflow-auto max-h-[40rem] container">
                    <ExsistingGrnHeader />
                <div>
                <div className="w-full rounded-md border border-solid border-borderGrey">
                    <div className="w-full h-[84px] p-6 bg-white rounded-t-md  justify-between items-center gap-6 flex border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey">
                        <div className="text-gray-500 text-xl font-medium ">
                            Items
                        </div>
                            

                            <div className="flex items-center justify-center ">
                               
                               
                            </div>

                    </div>
                    <div className="flex">
                    <div className="w-full overflow-x-auto overflow-y-hidden container">
                        <div className='flex w-[180%] justify-evenly items-center box-border bg-gray-100 h-12  text-gray-500 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey'>
                            <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[5rem]'>No.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[18rem]'>Name</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[15rem]'>Batch No.</div>

                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Bar Code</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[15rem] px-2'>Exipry Date</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[20rem]'>Quantity</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[20rem]'>Free Quantity</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Unit Price</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Subtotal</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>MRP</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Tax %</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Tax Amt.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Discount %</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Discount Amt.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-1/12'></div>
                        
                        </div>
                        
                        {items.map((item:any,index:number) => (
                            <div key={item.id} className='flex justify-evenly items-center w-[180%] box-border bg-white border-t-0 border-r-0 border-l-0 border-b border-solid border-gray-200 text-gray-400 h-12'>
                                <div className=' flex text-textGrey2 text-base font-medium px-[10px] w-[5rem]'>{index+1}.</div>
                                    <div className=' flex text-textGrey2 text-base font-medium w-[18rem] '>
                                    {/* <Select
                                                className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0 absolute"
                                                classNamePrefix="select"
                                                // value={products.find((prod) => prod.value.id === item.productId)}
                                                isClearable={false}
                                                isSearchable={true}
                                                name="itemName"
                                                options={taxOptions}
                                                menuPortalTarget={document.body}
                                                styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        border: state.isFocused ? 'none' : 'none',
                                                    }),
                                                    menuPortal: base => ({ ...base, zIndex: 9999 })
                                                }}
                                            /> */}

                                            HEllo
                                    </div>

                                    <div className=' flex text-gray-500 text-base font-medium w-[15rem]'>
                                        987{/* <input
                                            type="number"
                                            className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                        /> */}
                                    </div>
                                    <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>
                                        564{/* <input
                                            type="number"
                                            className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                        /> */}
                                    </div>
                                    <div className=' flex text-gray-500 text-base font-medium w-[15rem]'>
                                    date{/* <div className="customDatePickerWidth1">
                                    <DatePicker
                                        className="w-full"
                                        selected={startDate}
                                        onChange={handleDateChange}
                                        calendarClassName="react-datepicker-custom"
                                        customInput={
                                            <div className='relative'>
                                                <input
                                                    className="w-full h-9 text-textGrey1 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                                    value={startDate.toLocaleDateString()}
                                                    readOnly
                                                />
                                                <Image
                                                    src={calicon}
                                                    alt="Calendar Icon"
                                                    className="absolute right-0 top-2 cursor-pointer"
                                                    width={50}
                                                    height={20}
                                                />
                                            </div>
                                        }
                                    />
                                    </div> */}
                                    </div>

                            <div className=' flex text-textGrey2 text-base font-medium w-[20rem] items-center gap-2'>
                                789{/* <div className='flex items-center text-textGrey2 text-base font-medium gap-1 bg-white'>
                                    <button className="border-0 rounded-md cursor-pointer" onClick={() => handleQuantityDecClick(item.id)}>
                                        <Image className='rounded-md w-6 h-4' src={Subtract} alt="-"></Image>
                                    </button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                                        className="w-[3rem] text-center border border-solid border-borderGrey h-8  rounded-md text-textGrey2 font-medium text-base"
                                        ref={index === items.length - 1 ? inputRef : null}
                                    />
                                    
                                    {/* {item.quantity} */}
                                    {/* <button className="border-0 rounded-md cursor-pointer" onClick={() => handleQuantityIncClick(item.id)}>
                                        <Image className="rounded-md w-6 h-4" src={Add} alt="+"></Image>
                                    </button>
                                </div>  */}
                                <span className="text-textGrey2 font-medium text-base">Strips</span>
                            </div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[20rem] items-center gap-2'>
                               897 {/* <div className='flex items-center text-textGrey2 text-base font-medium gap-1 bg-white'>
                                    <button className="border-0 rounded-md cursor-pointer" onClick={() => handleQuantityDecClick(item.id)}>
                                        <Image className='rounded-md w-6 h-4' src={Subtract} alt="-"></Image>
                                    </button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                                        className="w-[3rem] text-center border border-solid border-borderGrey h-8  rounded-md text-textGrey2 font-medium text-base"
                                        ref={index === items.length - 1 ? inputRef : null}
                                    />
                                    
                                    {/* {item.quantity} */}
                                    {/* <button className="border-0 rounded-md cursor-pointer" onClick={() => handleQuantityIncClick(item.id)}>
                                        <Image className="rounded-md w-6 h-4" src={Add} alt="+"></Image>
                                    </button>
                                </div>  */}
                                <span className="text-textGrey2 font-medium text-base">Strips</span>
                            </div>

                            <div className=' flex text-textGrey2 text-base font-medium w-[12rem]'>
                            ₹ 545
                                {/* <input
                                        type="number"
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    /> */}
                            </div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[12rem] items-center gap-1'>
                            ₹ 787
                                {/* <input
                                        type="number"
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    /> */}
                            </div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[12rem] items-center gap-1'>
                            ₹ 424
                                {/* <input
                                        type="number"
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    /> */}
                            </div>
                            <div className='flex text-textGrey2 text-base font-medium w-[12rem] items-center gap-1'>
                                {/* <Select
                                            className="text-textGrey2 text-sm font-medium absolute "
                                            defaultValue={taxOptions[0]}
                                            isClearable={false}
                                            isSearchable={true}
                                            options={taxOptions}
                                            menuPortalTarget={document.body}
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    border: state.isFocused ? 'none' : 'none',
                                                }),
                                                menuPortal: base => ({ ...base, zIndex: 9999 })
                                            }}
                                            
                                        /> */}

                                        656
                            </div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[12rem] items-center gap-1'>
                            ₹ 645
                                {/* <input
                                        type="number"
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    /> */}
                            </div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[12rem] items-center gap-1'>
                            5
                                {/* <input
                                        type="number"
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    /> */}
                            %
                            </div>
                            
                            <div className=' flex text-textGrey2 text-base font-medium w-[12rem] items-center gap-1'>
                            ₹ 5456
                                {/* <input
                                        type="number"
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    /> */}
                            </div>
                                <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                    
                                </div>
                            </div>
                        ))}
                        
                        <div className='flex  w-[180%] justify-evenly items-center box-border bg-gray-100 h-12 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey py-5  text-textGrey2 '>
                        <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[5rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[18rem]'>Name</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[15rem]'></div>

                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[15rem] px-2'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[20rem]'>15000</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[20rem]'>15000</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹15000</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹15000</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹15000</div>
                            <div className=' flex text-gray-500 text-base font-bold w-1/12'></div>
                        </div>
                    </div>
                    <div className="flex-col shadow-left">
                    <div className="flex items-center justify-center  w-[10rem] h-12 text-gray-500 border-t-0 border-r-0 border-l border-b border-solid border-borderGrey">
                        <div className=' flex text-gray-500 text-base font-medium '>Total</div>
                    </div>
                    {items.map((item:any,index:number) => (
                    <div key={item.id} className="flex items-center justify-center  w-[10rem] box-border bg-white text-gray-500 border-t-0 border-r-0 border-l border-b border-solid border-gray-200 h-12">
                        <div className=' flex text-gray-500 text-base font-medium'>{index+1}</div>
                    </div>
                    ))}
                    <div className=' flex text-textGreen text-base font-bold w-[10rem] h-12 items-center justify-center'>₹2321</div>
                    </div>
                    </div>
                    

                </div>
                </div>

                <ExsistingGrnTotalAmount />
            </div>
            <ExsistingGrnBottomBar />
        </div>
       
        </>
    )

}

export default ExsistingGrnTable;