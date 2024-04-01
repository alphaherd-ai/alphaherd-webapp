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
import { useSearchParams } from "next/navigation"
import { response } from "express"


interface AllProducts {
    id: string;
    date: string;
    time: string;
    quantity: number;
    batchNumber:string;
    party:string;
    expiry:string;
    distributors:string;
    costPrice:number;
    sellingPrice :number;
    itemName:string;
    hsnCode:string;
    category :string;
    description:string;
    tax:string;
    providers:string[];
    minStock:number;
    maxStock:number;
    location:string;
  
  }
  interface Inventory{
    id:string;
    allProductsId:string;
    stockChange:string;
    invoiceType:string;
    quantityChange:number;
    party:string;
    allProducts:AllProducts;
    createdAt:string;
  
  }

  const ProductDetails = () => {
    const [product, setProduct] = useState<AllProducts | null>(null);
    const [products, setProducts] = useState<AllProducts[]>([]);
    const [inventory, setInventory] = useState<Inventory[]>([]);
    const url = useSearchParams();
    const id = url.get('id');
  
    useEffect(() => {
      fetch(`${process.env.NEXT_API_BASE_PATH}/api/inventory/product/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(error => console.error('Error fetching product:', error));
    }, [id]);
  
    useEffect(() => {
      fetch(`${process.env.NEXT_API_BASE_PATH}/api/inventory/product/getAll`)
        .then(response => response.json())
        .then(data => {
          const filteredProducts = data.filter((item: AllProducts) => item.itemName === product?.itemName)
          .reverse()
          .slice(0,5);
          setProducts(filteredProducts);
        })
        .catch(error => console.error('Error fetching products:', error));
    }, [product]);
  
    useEffect(() => {
      if (product && products.length > 0) {
        fetch(`${process.env.NEXT_API_BASE_PATH}/api/inventory/getAll`)
          .then(response => response.json())
          .then(data => {
            const filteredInventory = data.filter((item: Inventory) =>
              products.some((p: AllProducts) => item.allProductsId === p.id)   
            )
            .reverse()
            .slice(0,5);
            setInventory(filteredInventory);
          })
          .catch(error => console.error('Error fetching inventory:', error));
      }
    }, [product, products]);
  




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
        <div className="w-full h-full relative bg-gray-200 rounded-[20px] pr-[16px] pl-[16px] z-1">
            <div className="flex items-center justify-between">
                <div className="flex">
                    <div className="w-11 h-11  rounded-[5px] border border-neutral-400 flex justify-center items-center mr-16">
                        <Link className='no-underline h-full  ml-4' href='/finance/overview'>
                            <div className='flex items-center border border-solid border-gray-300 bg-white rounded-lg p-3  '>   <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back"></Image></div>
                        </Link>

                    </div>
                    <div className="text-gray-500 text-[28px] font-bold font-['Satoshi']">
                        {product?.itemName}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-11 px-2.5 py-[5px] bg-white rounded-[5px] justify-start items-center gap-1.5 flex">
                        <div>
                            <Image src={aiicon} alt="AI"></Image>
                        </div>
                        <div>Expected restocking in 28 days</div>
                        <div>
                            <Image src={infoicon} alt="info"></Image>
                        </div>
                    </div>
                    <div className="h-12 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-center items-center gap-2 flex">
                        <div>
                            <Image src={addicon} alt="add"></Image>
                        </div>
                        <div className="text-white text-base font-bold font-['Satoshi']">
                            Update Stock Level
                        </div>
                    </div>
                    <div className=' '>

                        <Popover placement="left" showArrow offset={10}>
                            <PopoverTrigger>
                                <Button color="gray-400"
                                    variant="solid"
                                    className="capitalize flex border-none  text-gray rounded-lg ">
                                    <div className='w-12 h-12 px-[11px] py-2.5 bg-white rounded-[5px] border border-solid border-stone-300 justify-center items-center gap-2 flex'>   <Image src={optionicon} alt="option"></Image></div></Button>
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

            <div className="w-full mt-[25px] pt-8 bg-white rounded-[10px] border border-solid border-neutral-400 flex-col justify-start items-start gap-8 flex">
                <div className="w-full px-6 justify-start items-center gap-8 flex">
                    <div className="w-40 text-gray-500 text-[28px] font-bold font-['Satoshi']">
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
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0  border-r border-stone-300 flex-col justify-center items-start rounded-b-xl gap-4 flex ">
                        <div className="text-gray-500 text-[28px] font-bold font-['Satoshi']">₹124</div>
                        <div className="text-gray-500 text-base font-medium font-['Satoshi']">Avg. Selling price</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-r border-stone-300 flex-col justify-center items-start gap-4 flex">
                        <div className="text-gray-500 text-[28px] font-bold font-['Satoshi']">₹124</div>
                        <div className="text-gray-500 text-base font-medium font-['Satoshi']">Avg. Selling price</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-r border-stone-300 flex-col justify-center items-start gap-4 flex">
                        <div className="text-gray-500 text-[28px] font-bold font-['Satoshi']">₹124</div>
                        <div className="text-gray-500 text-base font-medium font-['Satoshi']">Avg. Selling price</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-stone-300 flex-col justify-center items-start gap-4 flex rounded-b-xl">
                        <div className="text-gray-500 text-[28px] font-bold font-['Satoshi']">₹124</div>
                        <div className="text-gray-500 text-base font-medium font-['Satoshi']">Avg. Selling price</div>
                    </div>
                </div>
            </div>
            <div className="w-full flex gap-6">
                <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border  border-solid border-neutral-400 flex-col justify-center items-start flex">
                    <div className="w-full border-b border-solid border-0 border-stone-300">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Description:</div>
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">{product?.description}</div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-stone-300 flex  gap-8">
                        <div className="w-6/12 p-6 border-r border-solid border-0 border-stone-300 flex-col items-center justify-between">
                            <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Category</div>
                            <div className="w-[114px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-green-600 text-sm font-medium font-['Satoshi']">{product?.category}</div>
                            </div>
                        </div>
                        <div className="w-6/12 p-6 flex-col items-center justify-between">
                            <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Location</div>
                            <div className="w-[66px] h-7 px-2 py-1.5 bg-orange-50 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-orange-500 text-sm font-medium font-['Satoshi']">{product?.location}</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-stone-300">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-neutral-400 text-base font-medium font-['Satoshi']">HSN Code:</div>
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">{product?.hsnCode}</div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-stone-300">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Tax Rate:</div>
                            <div className="px-2 py-1.5 bg-gray-100 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-gray-500 text-base font-medium font-['Satoshi']">{product?.tax}</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-stone-300">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Vendors:</div>
                            <div className="px-2 py-1.5 bg-gray-100 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-gray-500 text-base font-medium font-['Satoshi']">{product?.providers}</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border border-solid border-0 border-neutral-400 flex-col justify-center flex">
                    <div className="w-full border-b border-solid border-0 border-stone-300 flex items-start justify-between">
                        <div className="p-6 flex items-start justify-between w-full">
                            <div className="text-gray-500 text-xl font-medium font-['Satoshi']">
                                Stock History
                            </div>
                            <div className="flex gap-2">
                                <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid  border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={downloadicon} alt="download" className="w-5 h-5"/>
                                </div>
                                <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={baricon} alt="baricon" className="w-5 h-5" />
                                </div>
                                <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid  border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={expandicon} alt="expandicon" className="w-5 h-5" />
                                </div>
                                <div className=" h-7 p-2 bg-white rounded-[5px] border border-solid  border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={tuneicon} alt="tuneicon" className="w-5 h-5" />
                                    <div className="text-neutral-400 text-sm font-medium font-['Satoshi']">
                                        Filter by
                                    </div>
                                </div>
                                <div className=" h-7 p-2 bg-white rounded-[5px] border border-solid border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={downarrow} alt="downarrow" className="w-5 h-5" />
                                    <div className="text-neutral-400 text-sm font-medium font-['Satoshi']">
                                        Status: All
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    {inventory.map(item=>(
                    <div className="w-full border-b border-solid border-0 border-stone-300 flex items-start justify-between">
                        <div className="w-full flex p-6">
                            <div className="w-full flex items-center justify-between">
                                <div className="text-neutral-400 text-base font-medium font-['Satoshi']">
                                    {formatDateAndTime(item.createdAt).formattedDate}
                                </div>
                                <div className="w-[69px] text-neutral-400 text-base font-medium font-['Satoshi']">
                                {formatDateAndTime(item.createdAt).formattedTime}
                                </div>
                                <div className="text-gray-500 text-base font-medium font-['Satoshi']">
                                   {item.quantityChange} Strips
                                </div>
                                <div className="w-15 h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex">
                                    <div className="text-green-600 text-sm font-medium font-['Satoshi']">
                                        {item.stockChange}
                                    </div>
                                </div>
                                <div className="text-neutral-400 text-base font-medium font-['Satoshi']">
                                    {item.allProducts.batchNumber}
                                </div>
                                <div className="text-neutral-400 text-base font-medium font-['Satoshi']">
                                    {item.party}
                                </div>
                                <div className="text-teal-400 text-base font-medium font-['Satoshi'] underline">
                                    {item.invoiceType}
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                   
                    
                    
                </div>
            </div>
            <div className="rounded-md">
                <div className="w-full mt-[25px] rounded-md border-neutral-400 border border-solid  border-neutral-40  ">
                    <div className="w-full h-[72px] px-6 py-4 bg-white border-b border-solid border-0 border-neutral-400 justify-start items-center gap-4 flex">
                        <div className="text-gray-500 text-xl font-medium font-['Satoshi']">
                            Current Batches
                        </div>
                    </div>
                    <div>
                        <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>Quantity</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>Distributor</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>Batch Number</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>Expiry Date</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>Code</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>Cost per item</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>MRP</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>Selling Price</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'>Margin</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'>Location</div>
                            <div className='flex text-gray-500 text-base font-medium px-6 w-1/12'></div>
                        </div>
                    
                        {products.map(item=>(
                        <div className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                            <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{item.quantity} Strips</div>
                            <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>providers</div>
                            <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{item.batchNumber}</div>
                            <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{formatDateAndTime(item.expiry).formattedDate}</div>
                            <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{item.hsnCode}</div>
                            <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{item.costPrice}</div>
                            <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>₹399</div>
                            <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{item.sellingPrice}</div>
                            <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>{(item.quantity/item.maxStock)*100}%</div>
                            <div className="w-2/12 px-6 flex items-center gap-2">
                                <div className="w-[80px] flex items-center text-orange-500 text-sm font-medium px-2 py-1.5 bg-orange-50 rounded-[5px] justify-center font-['Satoshi']">{item.location}</div>
                                <div className="w-[80px] flex items-center text-orange-500 text-sm font-medium px-2 py-1.5 bg-orange-50 rounded-[5px] justify-center font-['Satoshi']">Shelf A2</div>
                            </div>
                            <div className="w-1/12 px-6 flex items-center gap-2">
                                <div className='w-6 h-6 p-1 bg-gray-100 rounded-[5px] justify-start items-center flex '>

                                    <Popover placement="left" showArrow offset={10}>
                                        <PopoverTrigger>
                                            <Button color="gray-400"
                                                variant="solid"
                                                className="capitalize flex border-none  text-gray rounded-lg ">
                                                <div className='w-4 h-4 px-[11px] py-2.5 bg-white rounded-[5px] border border-solid border-stone-300 justify-center items-center gap-2 flex'>   <Image src={optionicon} alt="option"></Image></div></Button>
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
    </>
}

export default ProductDetails;


