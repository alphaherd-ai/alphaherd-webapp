"use client"
import Image from "next/image"
import Link from "next/link"
import lefticon from "../../../../assets/icons/inventory/left_icon.svg"
import aiicon from "../../../../assets/icons/inventory/Group 2749.svg"
import infoicon from "../../../../assets/icons/inventory/Icons16.svg"
import addicon from "../../../../assets/icons/inventory/bar_chart.svg"
import optionicon from "../../../../assets/icons/inventory/more_vert.svg"
import downloadicon from "../../../../assets/icons/inventory/1. Icons-24.svg"
import baricon from "../../../../assets/icons/inventory/bar_chart.svg"
import expandicon from "../../../../assets/icons/inventory/expand_content.svg"
import tuneicon from "../../../../assets/icons/inventory/bar_chart.svg"
import downarrow from "../../../../assets/icons/inventory/Icons16.svg"
import optionarrow from "../../../../assets/icons/inventory/more_vert.svg"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import formatDateAndTime from "@/utils/formateDateTime";
import Slider from '@mui/material/Slider';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation"
import { response } from "express"
import { useAppSelector } from "@/lib/hooks"
import Popup2 from '../../product/producttable/updateinventorypopup';
import useSWR from "swr"
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

function useProductfetch(id: string | null, branchId: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/${id}?branchId=${branchId}`, fetcher, { revalidateOnFocus: true });
    return {
        fetchedProduct: data,
        isLoading,
        error
    }
}

function useProductbatches(id: string | null, branchId: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/timeline/${id}?branchId=${branchId}`, fetcher, { revalidateOnFocus: true });
    return {
        fetchedProductBatches: data,
    }
}


const ProductDetails = () => {
    const [showPopup2, setShowPopup2] = React.useState(false);
    const togglePopup2 = () => {
        setShowPopup2(!showPopup2);
    }


    const router = useRouter();

    const [product, setProduct] = useState<any | null>(null);
    const [inventoryTimeline, setInventoryTimeline] = useState<any | null>(null);
    const url = useSearchParams();
    const id = url.get('id');
    const appState = useAppSelector((state) => state.app)
    const { fetchedProduct, isLoading, error } = useProductfetch(id, appState.currentBranchId);
    const { fetchedProductBatches } = useProductbatches(id, appState.currentBranchId);
    useEffect(() => {
        if (!error && !isLoading && fetchedProduct) {
            setProduct(fetchedProduct);
        }
        if (!error && !isLoading && fetchedProductBatches) {
           // console.log(fetchedProductBatches[0].productBatches);
            const timelines = fetchedProductBatches[0].productBatches.map((batch: { inventoryTimeline: any }) => batch.inventoryTimeline);
            const combinedTimeline = [].concat(...timelines);
            console.log(combinedTimeline);
            setInventoryTimeline(combinedTimeline)
        }

    }, [fetchedProduct, fetchedProductBatches, error, isLoading]);




    const [value, setValue] = useState(30);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };


    function valuetext(value: number) {
        return `${value}°C`;
    }

    return <>
        <div className="w-full h-full relative  rounded-[20px] pr-[16px] pl-[16px] z-1">
            <div className="w-full flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <div className="w-11 h-11  rounded-[5px] border border-borderGrey flex justify-center items-center">
                        <div className='no-underline h-full cursor-pointer' onClick={() => router.back()}>
                            <div className='flex items-center border border-solid border-gray-300 bg-white rounded-lg p-3  '>
                                <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back"></Image>
                            </div>
                        </div>

                    </div>
                    <div className="text-gray-500 text-[28px] font-bold ">
                        {product?.itemName}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {/* <div className="h-11 px-2.5 py-[5px] bg-white rounded-[5px] justify-start items-center gap-1.5 flex">
                            <div>
                                <Image src={aiicon} alt="AI"></Image>
                            </div>
                            <div>Expected restocking in 28 days</div>
                            <div>
                                <Image src={infoicon} alt="info"></Image>
                            </div>
                        </div> */}
                    <div className="h-12 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-center items-center gap-2 flex">
                        <div>
                            <Image src={addicon} alt="add"></Image>
                        </div>

                        <div className="cursor-pointer no-underline text-white text-base font-bold " onClick={togglePopup2}>
                            Update Stock Level
                        </div>

                    </div>
                    <div className=' '>

                        <Popover placement="left" showArrow offset={10}>
                            <PopoverTrigger>
                                <Button
                                    variant="solid"
                                    className="capitalize flex border-none  text-gray rounded-lg ">
                                    <div className='w-12 h-12 px-[11px] py-2.5 bg-white rounded-[5px] border border-solid border-borderGrey justify-center items-center gap-2 flex'>   <Image src={optionicon} alt="option"></Image></div></Button>
                            </PopoverTrigger>
                            <PopoverContent className=" text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border ,t-3 mt-2.5">

                                <div className="flex flex-col ">

                                    <div className='flex flex-col'>

                                        <Link className='no-underline flex item-center' href='/finance/overview'>
                                            <div className='text-gray-500 text-sm p-3 font-medium flex '>
                                                gtr</div>
                                        </Link>
                                        <Link className='no-underline flex item-center' href='/finance/overview'>
                                            <div className='text-gray-500 text-sm p-3 font-medium flex '>
                                                grtt</div>
                                        </Link>
                                        <Link className='no-underline flex item-center' href='/finance/overview'>
                                            <div className='text-gray-500 text-sm p-3 font-medium flex '>
                                                gtrt</div>
                                        </Link>

                                    </div>
                                </div>


                            </PopoverContent>
                        </Popover>



                    </div>

                </div>
            </div>

            <div className="w-full mt-[25px] pt-8 bg-white rounded-[10px] border border-solid border-borderGrey flex-col justify-start items-start gap-8 flex">
                <div className="w-full px-6 justify-start items-center gap-8 flex">
                    <div className="w-40 text-gray-500 text-[28px] font-bold ">
                        {product?.quantity} Strips
                    </div>
                    <div className="w-full rounded-[10px] flex items-center">
                        <ThemeProvider theme={theme}>
                            <Slider
                                aria-label="Temperature"
                                defaultValue={product?.quantity}
                                getAriaValueText={valuetext}
                                color="secondary"
                                value={typeof value === 'number' ? value : 0}
                                onChange={handleSliderChange}
                                min={product?.minStock}
                                max={product?.maxStock}
                            />
                        </ThemeProvider>
                    </div>
                </div>
                <div className="w-full justify-start items-start flex rounded-[10px]">
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0  border-r border-borderGrey flex-col justify-center items-start rounded-b-xl gap-4 flex ">
                        <div className="text-gray-500 text-[28px] font-bold ">₹124</div>
                        <div className="text-gray-500 text-base font-medium ">Avg. Selling price</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-r border-borderGrey flex-col justify-center items-start gap-4 flex">
                        <div className="text-gray-500 text-[28px] font-bold ">₹124</div>
                        <div className="text-gray-500 text-base font-medium ">Avg. Selling price</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-r border-borderGrey flex-col justify-center items-start gap-4 flex">
                        <div className="text-gray-500 text-[28px] font-bold ">₹124</div>
                        <div className="text-gray-500 text-base font-medium ">Avg. Selling price</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-borderGrey flex-col justify-center items-start gap-4 flex rounded-b-xl">
                        <div className="text-gray-500 text-[28px] font-bold ">₹124</div>
                        <div className="text-gray-500 text-base font-medium ">Avg. Selling price</div>
                    </div>
                </div>
            </div>
            <div className="w-full flex gap-6">
                <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border  border-solid border-borderGrey flex-col justify-center items-start flex">
                    <div className="w-full border-b border-solid border-0 border-borderGrey">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-borderGrey text-base font-medium ">Description:</div>
                            <div className="text-gray-500 text-base font-medium ">{product?.description}</div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-borderGrey flex  gap-8">
                        <div className="w-6/12 p-6 border-r border-solid border-0 border-borderGrey flex-col items-center justify-between">
                            <div className="text-borderGrey text-base font-medium ">Category</div>
                            <div className="w-[114px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-green-600 text-sm font-medium ">{product?.category}</div>
                            </div>
                        </div>
                        <div className="w-6/12 p-6 flex-col items-center justify-between">
                            <div className="text-borderGrey text-base font-medium ">Location</div>
                            <div className="w-[66px] h-7 px-2 py-1.5 bg-orange-50 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-orange-500 text-sm font-medium ">{product?.location}</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-borderGrey">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-borderGrey text-base font-medium ">HSN Code:</div>
                            <div className="text-gray-500 text-base font-medium ">{product?.hsnCode}</div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-borderGrey">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-borderGrey text-base font-medium ">Tax Rate:</div>
                            <div className="px-2 py-1.5 bg-gray-100 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-gray-500 text-base font-medium ">{product?.tax * 100}%</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full ">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-borderGrey text-base font-medium ">Vendors:</div>
                            <div className="px-2 py-1.5 bg-gray-100 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-gray-500 text-base font-medium ">{product?.providers}</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border border-solid border-borderGrey flex  flex-col">
                    <div className="w-full flex p-6 items-start justify-between border-0 border-b  border-solid border-borderGrey">
                        <div className="text-gray-500 text-xl font-medium ">
                            Stock History
                        </div>
                        <div className="flex gap-2">
                            <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid  border-borderGrey justify-start items-center gap-2 flex">
                                <Image src={downloadicon} alt="download" className="w-5 h-5" />
                            </div>
                            <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid border-borderGrey justify-start items-center gap-2 flex">
                                <Image src={baricon} alt="baricon" className="w-5 h-5" />
                            </div>
                            <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid  border-borderGrey justify-start items-center gap-2 flex">
                                <Image src={expandicon} alt="expandicon" className="w-5 h-5" />
                            </div>
                            <div className=" h-7 p-2 bg-white rounded-[5px] border border-solid  border-borderGrey justify-start items-center gap-2 flex">
                                <Image src={tuneicon} alt="tuneicon" className="w-5 h-5" />
                                <div className="text-borderGrey text-sm font-medium ">
                                    Filter by
                                </div>
                            </div>
                            <div className=" h-7 p-2 bg-white rounded-[5px] border border-solid border-borderGrey justify-start items-center gap-2 flex">
                                <Image src={downarrow} alt="downarrow" className="w-5 h-5" />
                                <div className="text-borderGrey text-sm font-medium ">
                                    Status: All
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">

                    </div>
                    <div className="w-full max-h-[400px] overflow-y-auto">
                   
                        {inventoryTimeline?.map((item: { id: React.Key | null | undefined; createdAt: string; quantityChange: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; stockChange: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; batchNumber: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; party: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; invoiceType: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }) => (
                            <div key={item.id} className="w-full border-b border-solid border-0 border-borderGrey flex items-start justify-between">
                                <div className="w-full flex p-2">
                                    <div className="w-full flex items-center">
                                        <div className="text-borderGrey text-base font-medium w-1/12 mr-10">
                                            {formatDateAndTime(item.createdAt).formattedDate}
                                        </div>
                                        <div className=" text-borderGrey text-base font-medium w-[5rem]">
                                            {formatDateAndTime(item.createdAt).formattedTime}
                                        </div>
                                        <div className="text-gray-500 text-base font-medium w-2/12 flex justify-center">
                                            {item.quantityChange} Strips
                                        </div>
                                        <div className="h-7 px-2 py-1.5    items-center gap-2 flex w-2/12 ">
                                            {item.stockChange === "StockOUT" ? 
                                            <div className="text-[#FF3030] bg-[#FFEAEA] rounded-[5px] px-4 text-sm font-medium "> 
                                                 Out
                                            </div> :
                                                <div className="text-[#0F9D58] bg-[#E7F5EE] rounded-[5px] px-4  text-sm font-medium ">
                                                    In
                                                </div>
                                            }

                                        </div>
                                        <div className="text-borderGrey text-base font-medium w-1/12 ml-10">
                                            {item.batchNumber}
                                        </div>
                                        <div className="text-borderGrey text-base font-medium w-1/12">
                                            {item.party}
                                        </div>
                                        <div className="text-teal-400 text-base font-medium  underline w-2/12">
                                            {item.invoiceType}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="rounded-md">
                <div className="w-full mt-[25px] rounded-[10px] border-borderGrey border border-solid  ">
                    <div className="w-full flex p-6 bg-white items-start justify-between border-0 border-b border-solid border-borderGrey rounded-md">
                        <div className="text-gray-500 text-xl font-medium ">
                            Current Batches
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-evenly w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-borderGrey text-textGrey2'>
                            <div className='px-2 flex text-textGrey2 text-base font-medium w-1/12'>Quantity</div>
                            <div className='flex text-textGrey2 text-base font-medium w-1/12'>Distributor</div>
                            <div className='flex text-textGrey2 text-base font-medium w-1/12'>Batch Number</div>
                            <div className='flex text-textGrey2 text-base font-medium w-1/12'>Expiry Date</div>
                            <div className='flex justify-center text-textGrey2 text-base font-medium w-1/12'>Code</div>
                            <div className='flex text-textGrey2 text-base font-medium w-1/12 '>Cost per item</div>
                            <div className='flex text-textGrey2 text-base font-medium w-1/12 pl-4'>MRP</div>
                            <div className='flex text-textGrey2 text-base font-medium w-1/12'>Selling Price</div>
                            <div className='flex justify-center text-textGrey2 text-base font-medium w-1/12'>Margin</div>
                            <div className='flex justify-center text-textGrey2 text-base font-medium w-2/12'>Location</div>
                            <div className='flex text-textGrey2 text-base font-medium w-1/12'></div>
                        </div>

                        {product?.productBatches?.map((item: any) => (
                            <div key={item.id} className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                <div className='px-2 w-1/12  flex items-center text-borderGrey text-base font-medium'>{item.quantity} Strips</div>
                                <div className='w-1/12  flex items-center text-borderGrey text-base font-medium'>providers</div>
                                <div className='w-1/12  flex items-center text-borderGrey text-base font-medium'>{item.batchNumber}</div>
                                <div className='w-1/12  flex items-center text-borderGrey text-base font-medium'>{formatDateAndTime(item.expiry).formattedDate}</div>
                                <div className='w-1/12 justify-center flex items-center text-borderGrey text-base font-medium'>{item.hsnCode}</div>
                                <div className='w-1/12  flex items-center text-borderGrey text-base font-medium'>{item.costPrice}</div>
                                <div className='w-1/12  flex items-center text-borderGrey text-base font-medium pl-4'>₹399</div>
                                <div className='w-1/12  flex items-center text-borderGrey text-base font-medium'>{item.sellingPrice}</div>
                                <div className='w-1/12 justify-center  flex items-center text-borderGrey text-base font-medium'>{(item.quantity / item.maxStock) * 100}%</div>
                                <div className="w-2/12 justify-center  flex items-center gap-2">
                                    <div className="w-fit flex items-center text-orange-500 text-[0.8rem] font-medium px-2 py-1.5 bg-orange-50 rounded-[5px] justify-center ">{item.location}</div>
                                    <div className="w-fit flex items-center text-orange-500 text-[0.8rem] font-medium px-2 py-1.5 bg-orange-50 rounded-[5px] justify-center ">Shelf A2</div>
                                </div>
                                <div className="w-1/12 px-6 flex items-center gap-2">
                                    <div className='w-6 h-6 p-1 bg-gray-100 rounded-[5px] justify-start items-center flex '>

                                        <Popover placement="left" showArrow offset={10}>
                                            <PopoverTrigger>
                                                <Button
                                                    variant="solid"
                                                    className="capitalize flex border-none  text-gray rounded-lg ">
                                                    <div className='w-4 h-4 px-[11px] py-2.5 bg-white rounded-[5px] border border-solid border-borderGrey justify-center items-center gap-2 flex'>   <Image src={optionicon} alt="option"></Image></div></Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-5 text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">

                                                <div className="flex flex-col ">

                                                    <div className='flex flex-col'>

                                                        <Link className='no-underline flex item-center' href='/finance/overview'>
                                                            <div className='text-gray-500 text-sm p-3 font-medium flex '>
                                                                gtr</div>
                                                        </Link>
                                                        <Link className='no-underline flex item-center' href='/finance/overview'>
                                                            <div className='text-gray-500 text-sm p-3 font-medium flex '>
                                                                grtt</div>
                                                        </Link>
                                                        <Link className='no-underline flex item-center' href='/finance/overview'>
                                                            <div className='text-gray-500 text-sm p-3 font-medium flex '>
                                                                gtrt</div>
                                                        </Link>

                                                    </div>
                                                </div>


                                            </PopoverContent>
                                        </Popover>



                                    </div>

                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
        {showPopup2 && <Popup2 onClose={togglePopup2} individualSelectedProduct={product} />}
    </>
}

export default ProductDetails;


