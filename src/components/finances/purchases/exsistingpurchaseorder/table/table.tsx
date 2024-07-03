"use client"

import delicon from "../../../../../assets/icons/finance/1. Icons-27.svg"
import addicon from "../../../../../assets/icons/finance/add.svg"
import sellicon from "../../../../../assets/icons/finance/sell.svg"
import addicon1 from "../../../../../assets/icons/finance/add (3).svg"

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import Image from "next/image"
import { Button } from "@nextui-org/react";
import NewPurchasesHeader from "./header";
import NewPurchasesBottomBar from "./bottombar";
import NewPurchasesTotalAmount from "./totalamount";
import ExsistingPurchasesBottomBar from "./bottombar"
import ExsistingPurchasesTotalAmount from "./totalamount"
import ExsistingPurchasesHeader from "./header"
import { useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import formatDateAndTime from '@/utils/formateDateTime';
import useSWR from 'swr';
import Loading from '@/app/loading';
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())

const ExsistingPurchasesTable = () => {
    const url = useSearchParams();
    const id = url.get('id');
    const appState = useAppSelector((state) => state.app);
    const [otherData, setOtherData] = useState({});
      
    
        const initialItems: any[] | (() => any[])=[];
        const [items, setItems] = useState(initialItems);
    
        const {data,error,isLoading} =useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/${id}/?branchId=${appState.currentBranchId}`,fetcher)
        
        
        useEffect(() => {
            if (!isLoading && data && !error) {
                const {items,...otherData}=data;
                setOtherData(otherData)
              const shallowDataCopy = [...items]; 
              const itemData = shallowDataCopy.map((item: any) => ({
                id: item.productId,
                itemName:item.name,
                quantity:item.quantity,
                sellingPrice:item.sellingPrice,
                tax:item.taxAmount,
                discount:item.discount
              }));
              setItems(itemData);
            }
          }, [data,error,isLoading]); 
          
    console.log(items)


    const [disableButton, setDisableButton] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);


    // const handleAddItem= useCallback(() => {
    //     setItems([...items, {}]);
    // }, [items]);


    // const handleDeleteRow = useCallback((index: number) => {
    //     const updatedItems = [...items];
    //     updatedItems.splice(index, 1);
    //     setItems(updatedItems);
    // }, [items]);
    if(isLoading) return (<Loading/>)

    return (
        <>
            <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100 rounded-lg border border-solid border-borderGrey">
            <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-t-0 border-r-0 border-l-0 border-solid border-borderGrey justify-end items-center gap-6 flex">
                    
                    
                    {/* <Button className='bg-textGreen text-white capitalize h-9 flex border-none px-4 py-2.5  rounded-md cursor-pointer'>
                    <div className='flex pr-2'><Image src={addicon1} alt='addicon1' className='w-6 h-6 ' /></div>
                            New Distributor
                    </Button>

                    <Button
                                    variant="solid"
                                    className="capitalize h-9 flex border-none bg-black px-4 py-2.5 text-white rounded-md cursor-pointer">
                                    <div className='flex pr-2'><Image src={addicon} alt='addicon' className='w-6 h-6 ' /></div>Add Customer 
                    </Button> */}
                    
                </div>
                <div className="flex-col w-full pr-[16px] pl-[16px] pt-[20px] overflow-auto max-h-[40rem] container">
                    <ExsistingPurchasesHeader otherData={otherData}/>
                <div>
                <div className="w-full rounded-md border border-solid border-borderGrey">
                    <div className="w-full h-[84px] p-6 bg-white rounded-t-md  justify-between items-center gap-6 flex border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey">
                        <div className="text-gray-500 text-xl font-medium ">
                            Items
                        </div>
                            

                            {/* <div className="flex items-center justify-center ">
                               
                                <Button onClick={handleAddItem} className='cursor-pointer text-white flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-md border-0 outline-none'>
                                    <div className='w-4 h-4 mb-3 mr-2'>
                                        <Image src={addicon} alt='addicon' />
                                    </div>
                                   
                                        Add Item
                                    
                                </Button>
                            </div> */}

                    </div>
                    <div className="flex">
                    <div className="w-full overflow-x-auto container">
                        <div className='flex w-[125%] justify-evenly items-center box-border bg-gray-100 h-12  text-gray-500 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey'>
                            <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[5rem]'>No.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[13rem]'>Name</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[8rem]'>Quantity</div>



                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>Free Quantity</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>Unit Price</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>Subtotal</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>Tax%</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>Tax Amt.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>Discount%</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>Discount Amt.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-1/12'></div>
                        
                        </div>
                        
                        {items.map((item:any,index:number) => (
                            <div key={item.id} className='flex justify-evenly items-center w-[125%] box-border bg-white border-t-0 border-r-0 border-l-0 border-b border-solid border-gray-200 text-gray-400 h-12'>
                                <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[5rem]'>{index+1}</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[13rem]'>{item.itemName}</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[8rem]'>{item.quantity}</div>



                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>{item.freeQuantity}</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>{item.sellingPrice}</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>{item.quantity*item.sellingPrice}</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>{item.tax*100}%</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>{(item.tax*item.quantity*item.sellingPrice).toFixed(2)}</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>{item.discount*100}%</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>{(item.discount*item.quantity*item.sellingPrice).toFixed(2)}</div>
                                <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                    {/* <button className="border-0">
                                        <Image src={sellicon} alt="sell" ></Image>
                                    </button>
                                    <button className="border-0" onClick={() => handleDeleteRow(index)}>
                                        <Image src={delicon} alt="delete" ></Image>
                                    </button> */}
                                </div>
                            </div>
                        ))}
                        
                        <div className='flex  w-[125%] justify-evenly items-center box-border bg-gray-100 h-12 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey py-5  text-textGrey2 '>
                        <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[5rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[18rem]'>Total</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[15rem]'>{items.reduce((acc, item) => acc + item.quantity, 0) ||
                                                0} Items</div>

                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'>₹{items.reduce((acc, item) => acc + (item.quantity*Number(item.sellingPrice)) , 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'>₹{items.reduce((acc, item) => acc + (item.tax)*(item.quantity*Number(item.sellingPrice)) , 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'>₹{items.reduce((acc, item) => acc + (item.discount)*(item.quantity*Number(item.sellingPrice)) , 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-1/12'></div>
                        </div>
                    </div>
                    <div className="flex-col shadow-left">
                    <div className="flex items-center justify-center  w-[10rem] h-12 text-gray-500 border-t-0 border-r-0 border-l border-b border-solid border-borderGrey">
                        <div className=' flex text-gray-500 text-base font-medium '>Total</div>
                    </div>
                    {items.map((item:any,index:number) => (
                    <div key={item.id} className="flex items-center justify-center  w-[10rem] box-border bg-white text-gray-500 border-t-0 border-r-0 border-l border-b border-solid border-gray-200 h-12">
                        <div className=' flex text-gray-500 text-base font-medium'>{((item.tax-item.discount+1)*(item.quantity*Number(item.sellingPrice))).toFixed(2)||
                                                0}</div>
                    </div>
                    ))}
                    <div className=' flex text-textGreen text-base font-bold w-[10rem] h-12 items-center justify-center'>₹{items.reduce((acc, item) => acc + (item.tax-item.discount+1)*(item.quantity*Number(item.sellingPrice)) , 0).toFixed(2) ||
                                                0}</div>
                    </div>
                    </div>
                    

                </div>
                </div>

                <ExsistingPurchasesTotalAmount otherData={otherData} />
            </div>
            <ExsistingPurchasesBottomBar existingPurchaseData={data}/>
        </div>
       
        </>
    )

}

export default ExsistingPurchasesTable;