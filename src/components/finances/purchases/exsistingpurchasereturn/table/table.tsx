"use client"


import 'react-datepicker/dist/react-datepicker.css';



import React, {  useEffect, useRef, useState } from 'react';

import ExsistingPurcaseReturnBottomBar from "./bottombar"
import ExsistingPurcaseReturnTotalAmount from "./totalamount"
import ExsistingPurcaseReturnHeader from "./header"
import { useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import formatDateAndTime from '@/utils/formateDateTime';
import useSWR from 'swr';

import Loading2 from "@/app/loading2"
interface CheckedItems {
    [key: number]: boolean;
}

//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

const ExsistingPurcaseReturnTable = () => {
  const url = useSearchParams();
  const id = url.get("id");
  const appState = useAppSelector((state) => state.app);
  const [otherData, setOtherData] = useState({});

  const initialItems: any[] | (() => any[]) = [];
  const [items, setItems] = useState(initialItems);

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/${id}/?branchId=${appState.currentBranchId}`,
    fetcher
  );
  console.log("data in purchase return is :",data);
  console.log("isloading in purchase return is :",isLoading);

  useEffect(() => {
    if (!isLoading && data && !error) {
      const { items, ...otherData } = data;
      setOtherData(otherData);
      console.log(items);
      const shallowDataCopy = [...items];
      const itemData = shallowDataCopy.map((item: any) => ({
        id: item.productBatchId,
        productId: item.productId,
        itemName: item.name,
        quantity: item.quantity,
        defaultUnit:item.products?.defaultUnit,
        unitPrice: item.productBatch?.costPrice,
        tax: item.taxAmount,
        discount: item.discount,
        expiry: item.productBatch?.expiry,
        batchNumber: item.productBatch?.batchNumber,
        freeQuantity: item.freeQuantity,
        maxRetailPrice: item.productBatch?.sellingPrice,
      }));
      setItems(itemData);
    }
  }, [data, error, isLoading]);

  const [disableButton, setDisableButton] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!disableButton && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disableButton]);


    return (
        <>
            <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100 rounded-lg border border-solid border-borderGrey">
            <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-t-0 border-r-0 border-l-0 border-solid border-borderGrey justify-end items-center gap-6 flex">
                    
                    

                    
                </div>
                <div className="flex-col w-full pr-[16px] pl-[16px] pt-[20px]">
                    <ExsistingPurcaseReturnHeader otherData={data} isLoading={isLoading} />
                <div>
                <div className="w-full rounded-md border border-solid border-borderGrey">
                    <div className="w-full h-[84px] p-6 bg-white rounded-t-md  justify-between items-center gap-6 flex border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey">
                        <div className="text-gray-500 text-lg font-medium ">
                        Returned Items
                        </div>
                            

                            <div className="flex items-center justify-center ">
                            
                            </div>

                    </div>
                    <div className="flex">
                    <div className="w-full overflow-x-auto overflow-y-hidden">
                        <div className='flex w-[180%] justify-evenly items-center box-border bg-gray-100 h-12  text-gray-500 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey'>
                            <div className=' flex text-gray-500 text-base font-medium w-[5rem]'></div>
                            <div className=' flex text-gray-500 text-base font-medium w-[5rem]'>No.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[18rem]'>Name</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[20rem]'>Return Quantity</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>Unit Price</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[15rem]'>Batch No.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[15rem]'>Bar Code</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[15rem]'>Expiry Date</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Subtotal</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>MRP</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Tax %</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Tax Amt.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Discount %</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Discount Amt.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-1/12'></div>
                        
                        </div>
                        
                        {!isLoading ? (
                    items.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex justify-evenly items-center w-[180%] box-border bg-white border-t-0 border-r-0 border-l-0 border-b border-solid border-gray-200 h-12 text-textGrey2 font-medium"
                      >
                        <div className="flex text-base  w-[5rem] items-center justify-center"></div>
                        <div className=" flex text-textGrey2 text-base  w-[5rem]">
                          {index + 1}.
                        </div>
                        <div className=" flex text-textGrey2 text-base  w-[18rem] ">
                          {item.itemName}
                        </div>

                        <div className=" flex text-textGrey2 text-base  w-[20rem] items-center gap-2">
                          {item.quantity}
                          <span className="text-textGrey2  text-base">{item?.defaultUnit}</span>
                        </div>

                        <div className=" flex text-gray-500 text-base  w-[12rem]">
                          ₹ {item.unitPrice}
                        </div>

                        <div className=" flex text-gray-500 text-base  w-[15rem]">
                          {item.batchNumber}
                        </div>

                        <div className=" flex text-gray-500 text-base  w-[15rem]">
                          {item.batchNumber}
                        </div>
                        <div className=" flex text-gray-500 text-base  w-[15rem]">
                          {formatDateAndTime(item.expiry).formattedDate}
                        </div>
                        <div className=" flex text-textGrey2 text-base  w-[12rem] items-center gap-1">
                          ₹ {item.unitPrice * item.quantity}
                        </div>
                        <div className=" flex text-textGrey2 text-base  w-[12rem] items-center gap-1">
                          ₹ {item.maxRetailPrice}
                        </div>
                        <div className="flex text-textGrey2 text-base  w-[12rem] items-center gap-1">
                          {(item.tax * 100).toFixed(2)}%
                        </div>
                        <div className=" flex text-textGrey2 text-base  w-[12rem] items-center gap-1">
                          ₹ {(item.tax * item.quantity * item.unitPrice).toFixed(2)}
                        </div>
                        <div className=" flex text-textGrey2 text-base  w-[12rem] items-center gap-1">
                          {(item.discount * 100).toFixed(2)}%
                        </div>

                        <div className=" flex text-textGrey2 text-base  w-[12rem] items-center gap-1">
                          ₹ {(item.discount * item.unitPrice * item.quantity).toFixed(2)}
                        </div>
                        <div className="w-1/12 flex items-center text-neutral-400 text-base  gap-[12px]"></div>
                      </div>
                    ))
                  ) : (
                    <div className="h-[10rem] w-full">
                      <Loading2 />
                    </div>
                  )}

                        
                    
                        <div className='flex  w-[180%] justify-evenly items-center box-border bg-gray-100 h-12 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey py-5  text-textGrey2 '>
                            <div className=' flex text-gray-500 text-base font-bold w-[5rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[5rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[18rem]'>Total</div>

                            <div className=' flex text-gray-500 text-base font-bold w-[20rem]'>{items.reduce((acc, item) => acc + item.quantity, 0) || 0} Items</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[15rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[15rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[15rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹{items.reduce((acc, item) => acc + (item.quantity*Number(item.unitPrice)) , 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹ {items.reduce((acc, item) => acc + item.maxRetailPrice , 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹{items.reduce((acc, item) => acc + (item.tax)*(item.quantity*Number(item.unitPrice)) , 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹ {items.reduce((acc, item) => acc + (item.discount)*(item.quantity*Number(item.unitPrice)) , 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-1/12'></div>
                        </div>
                    </div>
                    <div className="flex-col shadow-left">
                    <div className="flex items-center justify-center  w-[15rem] h-12 text-gray-500 border-t-0 border-r-0 border-l border-b border-solid border-borderGrey">
                        <div className=' flex text-gray-500 text-base font-medium '>Total</div>
                    </div>
                    {items.map((item:any,index:number) => (
                    <div key={item.id} className={`flex items-center justify-center  w-[15rem] box-border bg-white border-t-0 border-r-0 border-l border-b border-solid border-gray-200 h-12 text-textGrey2 font-bold' : 'text-textGrey2 font-medium`}>
                        <div className=' flex text-base'>{((item.quantity ?? 0) * ((item.unitPrice ?? 0) * (1 + (item.tax ?? 0)))).toFixed(2)}</div>
                    </div>
                    ))}
                    <div className=' flex text-textGreen text-base font-bold w-[15rem] h-12 items-center justify-center'> ₹{((data?.totalCost-data?.shipping-data?.adjustment)/(1- data?.overallDiscount))?.toFixed(2) || 0}</div>
                    </div>
                    </div>
                    

                </div>
                </div>

                <ExsistingPurcaseReturnTotalAmount otherData={data} isLoading={isLoading} />
            </div>
            <ExsistingPurcaseReturnBottomBar existingPurchaseData={data}  />
        </div>
       
        </>
    )

}

export default ExsistingPurcaseReturnTable;
