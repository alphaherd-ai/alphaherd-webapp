"use client"



import React, { useEffect, useState } from 'react';

import ExsistingRecurringHeader from "./header";
import ExsistingNonRecurringTotalAmount from "./totalamount";
import ExsistingNonRecurringBottomBar from "./bottombar";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import useSWR from "swr";

import Loading2 from "@/app/loading2";
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())

const ExsistingRecurringTable = () => {
    const url = useSearchParams();
    const id = url.get('id');
    const appState = useAppSelector((state) => state.app);
    const [otherData, setOtherData] = useState({});
      
    
        const initialItems: any[] | (() => any[])=[];
        const [items, setItems] = useState(initialItems);
    
        const {data,error,isLoading} =useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/expenses/${id}/?branchId=${appState.currentBranchId}`,fetcher)
        
        
        useEffect(() => {
            if (!isLoading && data && !error) {
                const {items,...otherData}=data;
                setOtherData(otherData)
                // console.log("this is all of the data",data)
              const shallowDataCopy = [...items]; 
              const itemData = shallowDataCopy.map((item: any) => ({
                id: item.id,
                itemName:item.name,
                cost:item.sellingPrice,
                transactionId:item.transactionId,
                invoiceNo:item.invoiceNo,
                category:item.category
              }));
              setItems(itemData);
            }
          }, [data,error,isLoading]); 
          
    // console.log(items)

    return (
        <>
            <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100 rounded-lg border border-solid border-borderGrey">
            <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-t-0 border-r-0 border-l-0 border-solid border-borderGrey justify-between items-center gap-6 flex">
                    <div></div>
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
                    <ExsistingRecurringHeader otherData={otherData} />

                    <div className="w-full rounded-md border border-solid border-borderGrey">
                    <div className="w-full h-[84px] p-6 bg-white rounded-t-md  justify-between items-center gap-6 flex border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey">
                            <div className="text-textGrey2 text-xl font-medium ">
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

                            {/* <div className="flex items-center justify-center "> */}
                                {/* <div className="flex items-center justify-center mr-2">
                                    <div className="pr-[4px]">
                                        <input value="test" type="checkbox" className="border-0" onChange={handleCheckBoxChange} />
                                    </div>
                                    <div className="text-textGrey2 text-base font-bold ">Price Range</div>
                                </div> */}
                                {/* <Button onClick={handleAddItem} className='cursor-pointer text-white flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-md border-0 outline-none'>
                                    <div className='w-4 h-4 mb-3 mr-2'>
                                        <Image src={addicon} alt='addicon' />
                                    </div>
                                   
                                        Add Item
                                    
                                </Button> */}
                            {/* </div> */}

                    </div>
                    <div>
                        <div className='flex w-full justify-evenly items-center box-border bg-gray-100 h-12  text-textGrey2 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey'>
                            <div className=' flex text-textGrey2 text-base font-medium w-[3rem]'>No.</div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[15rem]'>Name</div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[12rem]'>Cost</div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[10rem]'>Transaction ID</div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[10rem]'>Invoice No.</div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[10rem]'>Category</div>
                            {/* <div className=' flex text-textGrey2 text-base font-medium w-1/12'></div> */}
                        </div>
                        {!isLoading ?  items.map((item:any,index:number)=>
                         (<div key={index+1} className='flex justify-evenly items-center w-full box-border bg-white border border-solid border-gray-200 text-gray-400 py-2'>
                         <div className='w-[3rem] flex items-center text-textGrey2 text-base font-medium'>{index+1}.</div>
                         <div className='w-[15rem] flex items-center text-textGrey2 text-base font-medium'>{item.itemName}</div>
                         <div className='w-[12rem] flex items-center text-textGrey2 text-base font-medium gap-6'>
                             <div className="w-1/12 flex items-center text-textGrey2 text-base font-medium">₹{item.cost}</div>
                             {/* <div className="text-textGrey2 text-[12px]  font-medium  "> Tax inc</div> */}
                         </div>
                         <div className='w-[10rem] flex-col items-center text-textGrey2 text-base font-medium'>
                         <div className="text-[#6B7E7D] text-base  font-medium  ">{item.transactionId}</div>
                         </div>

                         <div className='w-[10rem] flex items-center text-textGrey2 text-base font-medium'>
                            {item.invoiceNo}
                         </div>

                         <div className='w-[10rem] flex-col items-center text-textGrey2 text-base font-medium'>
                             <div>{item.category}</div>
                         </div>
                         
                     </div>
                     )) : (
                        <div className='h-[10rem] w-full'><Loading2 /></div>
                    
                    )}
                           
                        
                        <div className='flex  w-full justify-evenly items-center box-border bg-gray-100 h-12 border border-solid border-gray-200 py-5  text-textGrey2'>
                        <div className=' flex text-textGrey2 text-base font-medium  w-[3rem]'></div>
                                
                        </div>
                    </div>

                </div>
                    <ExsistingNonRecurringTotalAmount otherData={otherData} isLoading={isLoading} />
            </div>
            <ExsistingNonRecurringBottomBar />
        </div>
       
        </>
    )

}

export default ExsistingRecurringTable;