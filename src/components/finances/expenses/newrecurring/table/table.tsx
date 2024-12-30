"use client"

import delicon from "../../../../../assets/icons/finance/1. Icons-27.svg"
import addicon from "../../../../../assets/icons/finance/add.svg"
import sellicon from "../../../../../assets/icons/finance/sell.svg"

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import Image from "next/image"

import NewRecurringBottomBar from "./bottombar";
import NewRecurringTotalAmount from "./totalamount";
import NewRecurringHeader from "./header";
import { Button } from "@nextui-org/react";


const NewRecurringTable = () => {

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
    const customStyles = {
        control: (provided: any, state: any) => ({
          ...provided,
          width: '100%',
          maxWidth: '100%',
          border: state.isFocused ? '1px solid #35BEB1' : 'none',
          '&:hover': {
            borderColor: state.isFocused ? '1px solid #35BEB1' : '#C4C4C4', 
            },
          boxShadow: state.isFocused ? 'none' : 'none',
        }),
        valueContainer: (provided: any) => ({
          ...provided,
          width: '100%',
          maxWidth: '100%',
        }),
        singleValue: (provided: any, state: any) => ({
          ...provided,
          width: '100%',
          maxWidth: '100%',
          color: state.isSelected ? '#6B7E7D' : '#6B7E7D',
        }),
        menu: (provided: any) => ({
          ...provided,
          backgroundColor: 'white',
          width: '100%',
          maxWidth: '100%',
        }),
        option: (provided: any, state: any) => ({
          ...provided,
          backgroundColor: state.isFocused ? '#35BEB1' : 'white',
          color: state.isFocused ? 'white' : '#6B7E7D',
          '&:hover': {
            backgroundColor: '#35BEB1',
            color: 'white',
          },
        }),
      };

    return (
        <>
            <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100 rounded-lg border border-solid border-borderGrey">
            <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-t-0 border-r-0 border-l-0 border-solid border-borderGrey justify-between items-center gap-6 flex">
                    <div></div>
                    {/* <div className='bg-[#FFF0E9] rounded-md px-2 py-1' >
                        <span className="text-[#FC6E20]  text-sm font-medium ">You owe: ₹</span>
                        <span className="text-[#FC6E20] text-sm font-bold ">2,124</span>
                    </div> */}
                    {/* <div className='flex items-center h-9 py-2.5 bg-black justify-between rounded-lg '>

                        <Popover placement="bottom-end" showArrow offset={10}>
                            <PopoverTrigger> */}
                                {/* <Button
                                onClick={togglePopup}
                                    variant="solid"
                                    className="capitalize flex h-9 py-2.5 border-none bg-black text-white rounded-lg ">
                                    <div className='flex pr-2'><Image src={addicon} alt='addicon' className='w-6 h-6 ' /></div>
                                        Add Party
                                </Button> */}
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
                        </Popover>



                    </div> */}
                </div>
                <div className="flex-col w-full pr-[16px] pl-[16px] pt-[20px]">
                    <NewRecurringHeader />

                    <div className="w-full rounded-md border border-solid border-borderGrey">
                    <div className="w-full h-[84px] p-6 bg-white rounded-t-md  justify-between items-center gap-6 flex border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey">
                            <div className="text-gray-500 text-xl font-medium ">
                                Items
                            </div>
                            {/* <div className="flex items-center justify-center ">

                                <div className='flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-lg '>

                                    <Popover placement="bottom-end" showArrow offset={10}>
                                        <PopoverTrigger>
                                            <Button
                                                variant="solid"
                                                className="capitalize flex border-none bg-black text-white rounded-lg ">  Add Item
                                                <div className='flex pl-2'><Image src={DownArrow} alt='DownArrow' className='w-4 h-4 ' /></div></Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">

                                            <div className="flex flex-col ">

                                                <div className='flex flex-col'>

                                                    <div className='text-base p-4  text-white flex '>
                                                        <div className='flex pr-2'><Image src={Update} alt='Update' className='w-5 h-5 ' /></div>
                                                        <button className='bg-transparent border-0 text-white text-base' onClick={togglePopup}>Add Item</button>
                                                    </div>

                                                </div>

                                            </div>
                                       


                                    </PopoverContent>
                                </Popover>



                            </div>
                        </div> */}

                            <div className="flex items-center justify-center ">
                                {/* <div className="flex items-center justify-center mr-2">
                                    <div className="pr-[4px]">
                                        <input value="test" type="checkbox" className="border-0" onChange={handleCheckBoxChange} />
                                    </div>
                                    <div className="text-neutral-400 text-base font-bold ">Price Range</div>
                                </div> */}
                                <Button onClick={handleAddItem} className='cursor-pointer text-white flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-md border-0 outline-none'>
                                    <div className='w-4 h-4 mb-3 mr-2'>
                                        <Image src={addicon} alt='addicon' />
                                    </div>
                                   
                                        Add Item
                                    
                                </Button>
                            </div>

                    </div>
                    <div>
                        <div className='flex w-full justify-evenly items-center box-border bg-gray-100 h-12  text-gray-500 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey'>
                            <div className=' flex text-gray-500 text-base font-medium w-[3rem]'>No.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[15rem]'>Name</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Price</div>



                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>Tax %</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>Tax Amt.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>Total</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>Category</div>
                            <div className=' flex text-gray-500 text-base font-medium w-1/12'></div>
                        </div>
                        
                        {items.map((item:any,index:number) => (
                            <div key={item.id} className='flex justify-evenly items-center w-full box-border bg-white border border-solid border-gray-200 text-gray-400 py-2'>
                                <div className='w-[3rem] flex items-center text-neutral-400 text-base font-medium'>{item.id}</div>
                                <div className='w-[15rem] flex items-center text-neutral-400 text-base font-medium'>{`Item ${item.id}`}</div>
                                <div className='w-[12rem] flex items-center text-neutral-400 text-base font-medium gap-5'>
                                    <div className="w-1/12 flex items-center text-neutral-400 text-base font-medium">₹400</div>
                                    <Select
                                        className="text-neutral-400 text-sm font-medium "
                                        defaultValue={taxOptions[0]}
                                        isClearable={false}
                                        isSearchable={true}
                                        options={taxOptions}
                                        styles={customStyles}
                                    />
                                </div>
                                <div className='w-[10rem] flex-col items-center text-neutral-400 text-base font-medium'>
                                    <Select
                                        className='w-[80%]'
                                        defaultValue={gstOptions}
                                        isClearable={false}
                                        isSearchable={true}
                                        options={gstOptions}
                                        styles={customStyles}
                                    />
                                </div>

                                <div className='w-[10rem] flex items-center text-neutral-400 text-base font-medium gap-[12px]'>

                                    <div>{item.quantity}</div>

                                </div>

                                <div className='w-[10rem] flex items-center text-neutral-400 text-base font-medium'>{`₹${item.quantity * 400}`}</div>

                                <div className='w-[10rem] flex-col items-center text-neutral-400 text-base font-medium'>
                                    <Select
                                        defaultValue={category}
                                        isClearable={false}
                                        isSearchable={true}
                                        options={category}
                                        styles={customStyles}
                                    />
                                </div>
                                <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                    <button className="border-0">
                                        <Image src={sellicon} alt="sell" ></Image>
                                    </button>
                                    <button className="border-0" onClick={() => handleDeleteRow(index)}>
                                        <Image src={delicon} alt="delete" ></Image>
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        <div className='flex  w-full justify-evenly items-center box-border bg-gray-100 h-12 border border-solid border-gray-200 py-5  text-textGrey2'>
                            <div className=' flex text-textGrey2 text-base font-medium w-[3rem]'> </div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[15rem]'>Total</div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[12rem]'> </div>


                            <div className=' flex text-textGrey2 text-base font-medium w-[10rem]'>
                                <Select
                                    defaultValue={gstOptions}
                                    isClearable={false}
                                    isSearchable={true}
                                    options={gstOptions}
                                    styles={customStyles}
                                />
                            </div>

                            <div className=' flex text-textGrey2 text-base font-bold w-[10rem]'>{`₹${items.reduce((acc, item) => acc + item.quantity * 400 * 0.18, 0)}`}</div>
                            <div className=' flex text-textGreen text-base font-bold w-[10rem]'>{`₹${items.reduce((acc, item) => acc + item.quantity * 400 * 1.18, 0)}`}</div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[10rem]'></div>
                            <div className=' flex text-textGrey2 text-base font-medium w-1/12'></div>
                        </div>
                    </div>

                </div>
                    <NewRecurringTotalAmount />
            </div>
            <NewRecurringBottomBar />
        </div>
       
        </>
    )

}

export default NewRecurringTable;