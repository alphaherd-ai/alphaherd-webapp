'use client';
import DownArrow from '../../../../../assets/icons/finance/downArrow.svg';
import subicon from "../../../../../assets/icons/finance/1. Icons-26.svg"
import delicon from "../../../../../assets/icons/finance/1. Icons-27.svg"
import addicon from "../../../../../assets/icons/finance/add.svg"
import add1icon from "../../../../../assets/icons/finance/add1.svg"
import sellicon from "../../../../../assets/icons/finance/sell.svg"

import Invoice from '../../../../../assets/icons/finance/invoice.svg';

import React, { useState, useEffect, useContext, useCallback } from 'react';
import Select from 'react-select';
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import NewsalesReturnHeader from "./header"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import NewsalesReturnBottomBar from './bottombar';
import NewsalesReturnTotalAmout from './totalamount';
import axios from 'axios';
import { DataContext } from './DataContext';
import { useAppSelector } from "@/lib/hooks";
import { Tax } from '@prisma/client';
import formatDateAndTime from '@/utils/formateDateTime';


interface Products{
    id :string,
    itemName:string,
    productBatch:ProductBatch[]
    hsnCode:string
}
interface ProductBatch {
    id: number;
    date: string;
    time: string;
    quantity: number;
    batchNumber:string;
    expiry:string;
    costPrice:number;
    sellingPrice :number;
    hsnCode:string;
    category :string;
    distributors:string[];
}
const NewsalesReturnTable = () => {
    const { tableData, setTableData } = useContext(DataContext);
    const [selectedProductDetails,setSelectedProduct]= useState<Products>()
    const [products, setProducts] = useState<{ value: number; label: string }[]>([]);
    const [batches,setBatches] = useState<{value:number;label:string}[]>([])
    const [inventory, setInventory] = useState<any[]>([]);
    const appState = useAppSelector((state) => state.app)

    const taxOptions = [
        { value: 'Tax excl.', label: 'Tax excl.' },
        { value: 'Tax incl.', label: 'Tax incl.' }
    ];

    const gstOptions = [
        { value: 0.18, label: Tax.GST_18 },
        { value: 0.09, label: Tax.GST_9 }
    ];

    useEffect(() => {
        fetchProducts();
        console.log(products)
    }, []);
    const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
        <label style={{ marginRight: '1em' }}>
            <input type="checkbox" {...props} />
            {children}
        </label>
    );
    const [disableButton, setDisableButton] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isChecked, setChecked] = useState(false);
    const { tableData: items, setTableData: setItems } = useContext(DataContext);
    
    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${appState.currentBranchId}`);
            const formattedProducts = response.data.map((product: Products) => ({
                value: product.id,
                label: product.itemName,
            }));
            setProducts(formattedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
  const fetchProductBatch= async (selectedProduct:any) =>{
    try{
        console.log(selectedProduct)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/getAll/${selectedProduct.value}?branchId=${appState.currentBranchId}`);
        const formattedProductBatches=response.data.map((product:ProductBatch)=>({
            value:product.id,
            label:product.batchNumber
        }));
        console.log(formattedProductBatches)
        setBatches(formattedProductBatches)
    }catch(error){
        console.error("Error fetching Batches:",error);
    }
  }
  const handleDeleteRow = useCallback((index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
}, [items]);

const handleGstSelect = (selectedGst: any, index: number) => {
    const updatedItems = [...tableData];
    console.log(selectedGst)
    updatedItems[index] = {
        ...updatedItems[index],
        gst: selectedGst.value
    };
    setTableData(updatedItems);
};

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

const handleAddItem= useCallback(() => {
    setItems([...items, {}]);
}, [items]);

const handleProductSelect = useCallback(async (selectedProduct: any, index: number) => {
    console.log(selectedProduct)
    if (selectedProduct.value) {
        try {
            setBatches([]);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/${selectedProduct.value}?branchId=${appState.currentBranchId}`);
            const data = response.data;
            setSelectedProduct(data);
            await fetchProductBatch(selectedProduct);   
            const updatedItems = [...items];
            updatedItems[index] = {
                ...updatedItems[index],
                quantity: data.quantity,
                productId:selectedProduct.value
            };
            setItems(updatedItems);   
        } catch (error) {
            console.error("Error fetching product details from API:", error);
        }
    }
}, [items, products,setBatches]);
const handleBatchSelect = useCallback(async (selectedProduct: any, index: number) => {
    if (selectedProduct.value) {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/${selectedProduct.value}?branchId=${appState.currentBranchId}`);
            const data = response.data;
            const updatedItems = [...items];
            updatedItems[index] = {
                ...updatedItems[index],
                id: data.id,
                quantity: data.quantity ,
                batchNumber: data.batchNumber,
                expiry:  data.expiry,
                sellingPrice:  data.sellingPrice,
                productId:selectedProductDetails?.id
            };
            setItems(updatedItems);
            setTableData(updatedItems);
                // const updatedProducts = products.filter((product) => product.value !== selectedProduct.value);
                // setProducts(updatedProducts);
    
        } catch (error) {
            console.error("Error fetching product details from API:", error);
        }
    }
}, [items, products]);



useEffect(() => {
    setItems(items);
    setTableData(items)
}, [items]);

    return (
        <>
                <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100  rounded-lg">
                <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 justify-between items-center gap-6 flex">
                    <div className='bg-orange-200 rounded-md px-2' ><span className="text-orange-600  text-sm font-medium font-['Satoshi']">You’re owed: ₹</span><span className="text-orange-600 text-sm font-bold font-['Satoshi']">2,124</span></div>
                    <div className='flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-lg '>
                        <Popover placement="bottom-end" showArrow offset={10}>
                            <PopoverTrigger>
                                <Button
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
                    <NewsalesReturnHeader />
                    <div className="w-full">
                        <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 justify-between items-center gap-6 flex">
                            <div className="text-gray-500 text-xl font-medium font-['Satoshi']">Items</div>
                            <div className="flex items-center justify-center ">
                                <div className="flex items-center justify-center mr-2">
                                    <div className="pr-[4px]">
                                        <input value="test" type="checkbox" className="border-0" onChange={handleCheckBoxChange} />
                                    </div>
                                    <div className="text-neutral-400 text-base font-bold font-['Satoshi']">Price Range</div>
                                </div>
                                <div className='flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-lg '>
                                    <Button color="gray-400" variant="solid" className="capitalize flex border-none bg-black text-white rounded-lg " onClick={handleAddItem}>
                                        Add Item
                                        <div className='flex pl-2'></div>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex w-full justify-evenly items-center box-border bg-gray-100 h-12 border-b border-neutral-400 text-gray-500'>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>No.</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>Name</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'>Batch No.</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'>Selling Price</div>
                                {!isChecked && (
                                    <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>Quantity</div>
                                )}
                                {isChecked && (
                                    <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>Low Quantity</div>
                                )}
                                {isChecked && (
                                    <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>High Quantity</div>
                                )}
                                <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'>Tax %</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>Tax Amt.</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>Total</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'></div>
                            </div>
                            {items.map((item:any,index:number) => (
                                <div key={item.id} className='flex justify-evenly items-center w-full box-border bg-white border border-solid border-gray-200 text-gray-400'>
                                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{index+1}</div>
                                                                  <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'><Select
                                        className="text-gray-500 text-base font-medium font-['Satoshi'] w-full border-0 boxShadow-0"
                                        classNamePrefix="select"
                                        value={products.find((prod) => prod.value === item.productId)}
                                        isClearable={false}
                                        isSearchable={true}
                                        name="itemName"
                                        options={products}
                                        onChange={(selectedProduct: any) => handleProductSelect(selectedProduct, index)}
                                    />
                                    </div>
                                    <div className='w-2/12 px-6 flex-col items-center text-neutral-400 text-base font-medium'>
                                    <Select
                                      className="text-gray-500 text-base font-medium font-['Satoshi'] w-full border-0 boxShadow-0"
                                      classNamePrefix="select"
                                      value={batches.find((prod) => prod.value === item.id)}
                                      isClearable={false}
                                      isSearchable={true}
                                      name={`batchNumber=${index}`}
                                      options={batches}
                                      onChange={(selectedProduct: any) => handleBatchSelect(selectedProduct, index)}
                                  />  
                                        <div className="text-neutral-400 text-[10px] font-medium font-['Satoshi'] px-2">{formatDateAndTime(item.expiry).formattedDate}</div>
                                    </div>
                                    <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-5'>
                                        <div className="w-1/12 flex items-center text-neutral-400 text-base font-medium">{item.sellingPrice}</div>
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
                                    {!isChecked && (
                                        <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                            <button className="border-0" onClick={() => handleQuantityDecClick(item.id)}>
                                                <Image src={subicon} alt="-"></Image>
                                            </button>
                                            <div>{item.quantity}</div>
                                            <button className="border-0" onClick={() => handleQuantityIncClick(item.id)}>
                                                <Image className="bg-white rounded-[5px] border-2 border-gray-100" src={add1icon} alt="+"></Image>
                                            </button>
                                        </div>
                                    )}
                                    {isChecked && (
                                        <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                            <button className="border-0" onClick={() => handleQuantityDecClick1(item.id)}>
                                                <Image src={subicon} alt="-" ></Image>
                                            </button>
                                            <div>{item.quantity2}</div>
                                            <button className="border-0" onClick={() => handleQuantityIncClick1(item.id)}>
                                                <Image className="bg-white rounded-[5px] border-2 border-gray-100" src={add1icon} alt="+"></Image>
                                            </button>
                                        </div>
                                    )}
                                    <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium'>
                                        <Select
                                            className="text-neutral-400 text-base font-medium"
                                            defaultValue={[]}
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
                                            onChange={(selectedOption:any)=>handleGstSelect(selectedOption,index)}
                                        />
                                    </div>
                                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{`₹${(item.quantity * item.gst).toFixed(2)}`}</div>
                                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{`₹${(item.quantity * item.sellingPrice +item.quantity*item.gst).toFixed(2)}`}</div>
                                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                        <button className="border-0">
                                            <Image src={sellicon} alt="sell" ></Image>
                                        </button>
                    
                                        <button className="border-0" onClick={() => handleDeleteRow(index)}>
                                            <Image src={delicon} alt="delete" ></Image>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className='flex w-full justify-evenly items-center box-border bg-gray-100 h-12 border-b border-neutral-400 text-gray-500'>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>Total</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'></div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'></div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'></div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>{items.reduce((acc:any, item:any) => acc + item.quantity, 0)} Items</div>
                                {isChecked && (
                                    <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>{items.reduce((acc:any, item:any) => acc + item.quantity2, 0)} Items</div>
                                )}
                                <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'>
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
                                    />
                                </div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>{`₹${items.reduce((acc:any, item:any) => acc + item.quantity * item.gst , 0).toFixed(2)}`}</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/12' >{`₹${items.reduce((acc:any, item:any) => acc + item.quantity * item.sellingPrice +item.quantity*item.gst, 0).toFixed(2)}`}</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'></div>
                            </div>
                        </div>
                        <NewsalesReturnTotalAmout />

                    </div>
                </div>
                <NewsalesReturnBottomBar />
            </div>



        </>

    )
}

export default NewsalesReturnTable;
