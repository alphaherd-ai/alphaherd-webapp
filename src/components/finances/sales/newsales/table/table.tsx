'use client';
import DownArrow from '../../../../../assets/icons/finance/downArrow.svg';
import subicon from "../../../../../assets/icons/finance/1. Icons-26.svg"
import delicon from "../../../../../assets/icons/finance/1. Icons-27.svg"
import addicon from "../../../../../assets/icons/finance/add.svg"
import add1icon from "../../../../../assets/icons/finance/add1.svg"
import sellicon from "../../../../../assets/icons/finance/sell.svg"

import Invoice from '../../../../../assets/icons/finance/invoice.svg';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import NewsalesHeader from "./header"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import NewsalesBottomBar from './bottombar';
import NewsalesTotalAmout from './totalamount';
import axios from 'axios';

interface AllProducts {
    id: string;
    date: string;
    time: string;
    quantity: number;
    batchNumber: string;
    expiry: string;
    costPrice: number;
    sellingPrice: number;
    itemName: string;
    hsnCode: string;
    category: string;
    providers: string[];
}

const NewsalesTable = () => {
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

    const initialItems = [
        { id: 1, quantity: 4, quantity2: 5 },
        { id: 2, quantity: 3, quantity2: 6 },
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
    const [inventory, setInventory] = useState<any[]>([]);
    const [items, setItems] = useState(initialItems);
    const [products, setProducts] = useState<{ value: string; label: string }[]>([]);

    const handleProductSelect = (selectedProduct: any, index: number) => {
        console.log('Selected product:', selectedProduct);
        if (selectedProduct.value) {
            fetch(`${process.env.NEXT_API_BASE_PATH}/api/inventory/product/${selectedProduct.value}`)
                .then((response) => response.json())
                .then((data) => {
                    const expiry = data.expiry;
                    const updatedInventory = [...inventory];
                    updatedInventory[index] = {
                        ...updatedInventory[index],
                        id: data.id,
                        date: data.date,
                        time: data.time,
                        quantity: data.quantity,
                        batchNumber: data.batchNumber,
                        expiry: expiry,
                        costPrice: data.costPrice,
                        sellingPrice: data.sellingPrice,
                        itemName: data.itemName,
                        hsnCode: data.hsnCode,
                        category: data.category,
                        providers: data.providers,
                    };
                    setInventory(updatedInventory);
                })
                .catch((error) =>
                    console.error("Error fetching product details from API:", error)
                );
        }
    };

    const handleUpdateInventory = async () => {
        try {
            for (const item of inventory) {
                const { id, date, time, quantity, batchNumber, expiry, costPrice, sellingPrice, itemName, hsnCode, category, providers } = item;
                const invoiceType = "Manual";
                const body = {
                    invoiceType,
                    date,
                    quantity,
                    batchNumber,
                    expiry,
                    costPrice,
                    sellingPrice,
                    itemName,
                    hsnCode,
                    category,
                    providers,
                };
                const response = await axios.put(`${process.env.NEXT_API_BASE_PATH}/api/inventory/product/${id}`, body);
                console.log('Updated inventory item:', response.data);
            }
            alert('Inventory updated successfully');
        } catch (error) {
            console.error("Error updating inventory:", error);
            alert('Error updating inventory. Please try again.');
        }
    };

    useEffect(() => {
        fetch("${process.env.NEXT_API_BASE_PATH}/api/inventory/product/getAll")
            .then((response) => response.json())
            .then((data) => {
                const formattedProducts = data.map((product: AllProducts) => ({
                    value: product.id,
                    label: product.itemName,
                }));
                setProducts(formattedProducts);
            })
            .catch((error) =>
                console.error("Error fetching data from API:", error)
            );
    }, []);

    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);

    const handleEditButtonClick = () => {
        setDisableButton(!disableButton);
    };

    const handleCheckBoxChange = () => {
        setChecked(!isChecked);
        setItems((prevItems) =>
            prevItems.map((item) => ({
                ...item,
                quantity: isChecked ? item.quantity * 2 : item.quantity,
            }))
        );
    };

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

    const handleQuantityDecClick1 = (itemId: any) => {
        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === itemId && item.quantity2 > 1) {
                    return { ...item, quantity2: item.quantity2 - 1 };
                }
                return item;
            })
        );
    };

    const handleQuantityIncClick1 = (itemId: any) => {
        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === itemId) {
                    return { ...item, quantity2: item.quantity2 + 1 };
                }
                return item;
            })
        );
    };

    const handleAddItem = () => {
        const newItem = {
            id: items.length + 1,
            quantity: 1,
            quantity2: 1,
        };
        setItems([...items, newItem]);
    };

    return (
        <>
            <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100  rounded-lg">
                <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 justify-between items-center gap-6 flex">
                    <div className='bg-green-200 rounded-md px-2' ><span className="text-green-600  text-sm font-medium font-['Satoshi']">You’re owed: ₹</span><span className="text-green-600 text-sm font-bold font-['Satoshi']">2,124</span></div>
                    <div className='flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-lg '>
                        <Popover placement="bottom-end" showArrow offset={10}>
                            <PopoverTrigger>
                                <Button color="gray-400"
                                    variant="solid"
                                    className="capitalize flex border-none bg-black text-white rounded-lg ">
                                    <div className='flex pr-2'><Image src={DownArrow} alt='DownArrow' className='w-4 h-4 ' /></div>Add Customer </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">
                                <div className="flex flex-col ">
                                    <div className='flex flex-col'>
                                        <Link className='no-underline flex item-center' href='/finance/overview'>
                                            <div className='text-base p-4   text-white flex '>
                                                <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Sales Estimate</div>
                                        </Link>
                                        <Link className='no-underline flex item-center' href='/finance/overview'>
                                            <div className='text-base p-4  text-white flex '>
                                                <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Sales Invoice</div>
                                        </Link>
                                        <Link className='no-underline flex item-center' href='/finance/overview'>
                                            <div className='text-base p-4  text-white flex '>
                                                <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Sales Return</div>
                                        </Link>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="flex-col w-full pr-[16px] pl-[16px] pt-[20px]">
                    <NewsalesHeader />
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
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>Selling Price</div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>Batch No.</div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>Quantity</div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>Tax %</div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>Tax Amt.</div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>Total</div>
                                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'></div>
                            </div>
                            {items.map((item, index) => (
                                <div key={item.id}>
                                    <div className='flex justify-evenly items-center w-full  box-border  bg-white  bg-white border border-solid border-gray-200 text-gray-400   '>
                                        <div className='w-1/36 px-6 flex items-center text-neutral-400 text-base font-medium'>{index + 1}</div>
                                        <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium'>
                                            <Select
                                                className="text-gray-500 text-base font-medium font-['Satoshi'] w-full border-0 boxShadow-0"
                                                classNamePrefix="select"
                                                value={products.find((prod) => prod.value === item.id)}
                                                isClearable={false}
                                                isSearchable={true}
                                                name="itemName"
                                                options={products}
                                                onChange={(selectedProduct: any) => handleProductSelect(selectedProduct, index)}
                                            />
                                        </div>
                                        <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-5'>
                                            <div className="w-1/12 flex items-center text-neutral-400 text-base font-medium">₹400</div>
                                            <Select
                                                className="text-neutral-400 text-sm font-medium font-['Satoshi']"
                                                defaultValue={taxOptions[0]}
                                                isClearable={false}
                                                isSearchable={true}
                                                options={taxOptions}
                                                styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        border: state.isFocused ? 'none' : 'none',
                                                    }),

                                                }}
                                            />
                                        </div>
                                        <div className='w-2/12 px-6 flex-col items-center text-neutral-400 text-base font-medium'>
                                            <Select
                                                defaultValue={batchOptions[0]}
                                                isClearable={false}
                                                isSearchable={true}
                                                options={batchOptions}
                                                styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        border: state.isFocused ? 'none' : 'none',
                                                        padding: '0',
                                                        height: '2rem'
                                                    }),

                                                }}
                                            />
                                            <div className="text-neutral-400 text-[10px] font-medium font-['Satoshi'] px-2">Exp. 09/04/24</div>
                                        </div>
                                        <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                            <button className="border-0" onClick={() => handleQuantityDecClick(item.id)}>
                                                <Image src={subicon} alt="-"></Image>
                                            </button>
                                            <div>{item.quantity}</div>
                                            <button className="border-0" onClick={() => handleQuantityIncClick(item.id)}>
                                                <Image className="bg-white rounded-[5px] border-2 border-gray-100" src={add1icon} alt="+"></Image>
                                            </button>
                                        </div>
                                        <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium'>
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
                                                        padding: '0',
                                                    }),

                                                }}
                                            />
                                        </div>
                                        <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{`₹${item.quantity * 400}`}</div>
                                        <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{`₹${item.quantity * 400 * 1.18}`}</div>
                                        <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                            <button className="border-0">
                                                <Image src={sellicon} alt="sell" ></Image>
                                            </button>
                                            <button className="border-0">
                                                <Image src={delicon} alt="delete" ></Image>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex  w-full justify-evenly items-center box-border bg-white  h-12  border-b border-neutral-400 text-gray-500'>
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'></div>
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>
                                            <div className="w-full h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 inline-flex">
                                                <div className="text-indigo-600 text-sm font-medium font-['Satoshi']">Item Discount</div>
                                            </div>
                                        </div>
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>

                                        </div>
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'><Select
                                            className="text-neutral-400 text-sm font-medium font-['Satoshi']"
                                            defaultValue={taxOptions[0]}
                                            isClearable={false}
                                            isSearchable={true}
                                            options={taxOptions}
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    border: state.isFocused ? 'none' : 'none',
                                                }),

                                            }}
                                        /></div>
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'></div>
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'></div>
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'></div>
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'></div>
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'></div>
                                    </div>
                                    <div className='flex  w-full justify-evenly items-center box-border bg-white  h-12  border-b border-neutral-400 text-gray-500'>
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'></div>
                                        
                                        <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>

                                        </div>
                                       
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-center pt-5 gap-[5px]'>
                            <button className='flex items-center justify-center w-20 h-8 rounded-3xl border border-solid border-gray-300 font-medium text-gray-400' onClick={handleAddItem}>
                                <Image src={addicon} alt='AddIcon'></Image> Add Item
                            </button>
                            
                        </div>
                        <NewsalesTotalAmout />
                    </div>
                </div>
            </div>
            <NewsalesBottomBar />
        </>
    );
};

export default NewsalesTable;
