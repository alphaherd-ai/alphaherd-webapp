"use client"
import React, { useState, useEffect } from 'react';

import { useRef } from "react"

import ExistingsaleEstimateHeader from "./header"

import ExistingsaleEstimateBottomBar from './bottombar';
import ExistingsaleEstimateTotalAmout from './totalamount';
import { useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import formatDateAndTime from '@/utils/formateDateTime';
import useSWR from 'swr';

import Loading2 from '@/app/loading2';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

const ExistingsaleEstimateTable = () => {
    const url = useSearchParams();
    const id = url.get('id');
    const appState = useAppSelector((state) => state.app);
    const [otherData, setOtherData] = useState({});


    const initialItems: any[] | (() => any[]) = [];
    const [items, setItems] = useState(initialItems);

    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/${id}/?branchId=${appState.currentBranchId}`, fetcher)


    useEffect(() => {
        if (!isLoading && data && !error) {
            console.log(data);
            const { items, ...otherData } = data;
            setOtherData(otherData)
        
            const shallowDataCopy = [...items];
            const itemData = shallowDataCopy.map((item: any) => ({
                id: item.itemType === 'product' ? item.productBatch.productId : item.serviceId,
                itemName: item.name,
                itemType:item.itemType,
                quantity: item.quantity,
                sellingPrice: item.sellingPrice,
                defaultUnit:item.itemType==='product'?item.products.defaultUnit : "",
                expiry: item.itemType === 'product' ? item.productBatch.expiry : "",
                batchNumber: item.itemType === 'product' ? item.productBatch.batchNumber : "",
                tax: item.taxAmount,
                lowQty: item.lowQty,
                highQty: item.highQty,
                discount: item.discount,
                provider: item.itemType === 'product' ? "" : item.serviceProvider
            }));
            setItems(itemData);
            console.log(itemData);
        }
    }, [data, error, isLoading]);

 console.log(items)



    const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
        <label style={{ marginRight: '1em' }}>
            <input type="checkbox" {...props} />
            {children}
        </label>
    );


    const [disableButton, setDisableButton] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isChecked, setChecked] = useState(false);






    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);


    return (
        <>
            <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100  rounded-lg border border-solid border-borderGrey">
                <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-t-0 border-r-0 border-l-0 border-solid border-borderGrey justify-start items-center gap-6 flex">

                </div>
                <div className="flex-col w-full pr-[16px] pl-[16px] pt-[20px]">
                    <ExistingsaleEstimateHeader otherData={otherData} isLoading={isLoading} />

                    <div className="w-full rounded-md border border-solid border-borderGrey">
                        <div className="w-full h-[84px] p-6 bg-white rounded-t-md  justify-between items-center gap-6 flex border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey">
                            <div className="text-gray-500 text-xl font-medium ">
                                Items & Services
                            </div>

                        </div>
                        <div>
                            <div className='flex w-full justify-evenly items-center box-border bg-gray-100 h-12  text-gray-500 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey'>
                                <div className=' flex text-gray-500 text-base font-medium  w-[3rem] '>No.</div>
                                <div className=' flex text-gray-500 text-base font-medium  w-[15rem] '>Name</div>
                                <div className=' flex text-gray-500 text-base font-medium  w-[10rem]'>Batch No./Providers</div>
                                <div className=' flex text-gray-500 text-base font-medium  w-[10rem] '>Selling Price</div>

                                <div className='flex text-gray-500 text-base font-medium  w-1/12 '>
                                    Low Quantity
                                </div>


                                <div className='flex text-gray-500 text-base font-medium  w-1/12 '>
                                    High Quantity
                                </div>

                                <div className=' flex text-gray-500 text-base font-medium  w-1/12 '>Tax %</div>
                                <div className=' flex text-gray-500 text-base font-medium  w-1/12 '>Tax Amt.</div>
                                <div className=' flex text-gray-500 text-base font-medium  w-1/12 mr-4'>Discount %</div>
                                <div className=' flex text-gray-500 text-base font-medium  w-1/12 '>Discount</div>
                                <div className=' flex text-gray-500 text-base font-medium w-1/12 '>Total</div>
                            </div>
                            {!isLoading ? items.map((item, index) => (
                                <div key={item.id} className="flex flex-col">
                                    <div className='flex py-2 justify-evenly items-center w-full  box-border  bg-white  border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey text-gray-400   '>
                                        <div className='w-[3rem] flex items-center text-textGrey2 text-base font-medium '>{index + 1}</div>
                                        <div className='w-[15rem] flex items-center text-textGrey2  text-base font-medium'>{item.itemName}</div>
                                        <div className='w-[10rem] flex-col items-center text-textGrey2  text-base font-medium '>
                                            <div className="text-textGrey2 text-base  font-medium  "> {item.itemType === 'product' ? item.batchNumber : item.provider}</div>

                                            <div className="text-neutral-400 text-[13px] font-medium ">{item.itempType==='product' ? formatDateAndTime(item.expiry).formattedDate:""}</div>
                                        </div>
                                        <div className='w-[10rem] flex items-center  text-base font-medium gap-1 '>
                                            <div className="flex items-center text-textGrey2  text-base font-medium">₹ {item.sellingPrice}</div>


                                        </div>
                                        <div className='w-1/12  flex items-center text-textGrey2 text-base font-medium gap-[12px] '>
                                            {item.lowQty === 0 && item.highQty === 0 ?
                                                (<div>{item.quantity}</div>) :
                                                (<div>{item.lowQty} {item?.defaultUnit}</div>)
                                            }


                                        </div>

                                        <div className='w-1/12 flex items-center text-textGrey2 text-base font-medium gap-[12px] '>

                                            <div>{item.highQty} {item?.defaultUnit}</div>

                                        </div>

                                        <div className='w-1/12 flex items-center text-textGrey2 text-base font-medium '>
                                            <div className="text-textGrey2 text-base  font-medium  "> {item.tax * 100}%</div>

                                        </div>
                                        <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium mr-4'>{item.lowQty != 0 && item.highQty != 0 ? (
                                            '₹' +
                                            ((item?.sellingPrice * item?.lowQty * item?.tax).toFixed(2) +
                                                '-' +
                                                (item?.sellingPrice * item?.highQty * item?.tax).toFixed(2) ||
                                                0)

                                        ) : (
                                            '₹' +
                                            ((item?.sellingPrice * item?.quantity * item?.tax) || 0)
                                                .toFixed(2)
                                        )}</div>
                                        <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium'>{`${(item.discount? item.discount:0).toFixed(2)}`}</div>
                                        <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium'>{`₹${(item.lowQty==0 && item.highQty==0) ? (item.quantity*item.sellingPrice*item.discount/100).toFixed(2):((item.lowQty*item.sellingPrice*item.discount/100)).toFixed(2) + '-' + ((item.highQty*item.sellingPrice*item.discount/100)).toFixed(2)}`}</div>
                                        <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium'>
                                            {item.lowQty != 0 && item.highQty != 0 ? (
                                                <>
                                                    {item?.lowQty && (
                                                        <>
                                                            ₹{(item?.sellingPrice * item?.lowQty * (1 + item?.tax)-item.lowQty*item.sellingPrice*item?.discount/100).toFixed(2) || 0}
                                                            -{' '}
                                                        </>
                                                    )}
                                                    {item?.highQty && (
                                                        <>₹{(item?.sellingPrice * item?.highQty * (1 + item?.tax)-item.highQty*item.sellingPrice*item?.discount/100).toFixed(2) || 0}
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    ₹{(item?.quantity * item?.sellingPrice * (1 + item?.tax)-item.quantity*item.sellingPrice*item?.discount/100).toFixed(2) || 0}

                                                </>
                                            )}
                                        </div>
                                        


                                    </div>

                                    {/* <div>
                                        <div className='flex  w-full justify-evenly items-center box-border bg-white  h-12  border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey text-gray-500'>
                                            <div className=' flex text-gray-500 text-base font-medium w-[3rem]'></div>
                                            <div className=' flex text-gray-500 text-base font-medium w-[15rem]'>
                                                <div className=" h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 inline-flex">
                                                    <div className="text-indigo-600 text-sm font-medium ">Item Discount</div>
                                                </div>
                                            </div>
                                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>{(item.discount).toFixed(2)}% off</div>
                                            <div className=' flex text-gray-500 text-base font-medium w-1/12'>

                                            </div>

                                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'></div>

                                            <div className=' flex text-gray-500 text-base font-medium w-1/12'> </div>
                                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'></div>
                                            <div className="text-red-500 text-base font-bold w-1/12 ">-₹{(item.lowQty===0 && item.highQty===0) ? ((item.discount/100)*item.quantity*item.sellingPrice).toFixed(2) :((item.discount/100)*item.lowQty*item.sellingPrice).toFixed(2) }</div>

                                        </div>

                                    </div> */}
                                </div>
                            )) :
                                <div className='h-[10rem] w-full'><Loading2 /></div>
                            }
                            <div className='flex  w-full justify-evenly items-center box-border bg-gray-100  h-12  border-b border-neutral-400 text-gray-500 rounded-b-md'>
                                <div className=' flex text-gray-500 text-base font-medium  w-[3rem]'> </div>
                                <div className=' flex text-gray-500 text-base font-medium  w-[15rem]'>Total</div>
                                <div className=' flex text-gray-500 text-base font-medium  w-[10rem]'></div>
                                <div className=' flex text-gray-500 text-base font-medium  w-[10rem]'> </div>
                                <div className=' flex text-gray-500 text-base font-medium  w-1/12'>{items.reduce((acc, item) => acc + (item.lowQty === 0 && item.highQty === 0 ? item.quantity : item.lowQty), 0)} Items</div>

                                <div className=' flex text-gray-500 text-base font-medium  w-1/12'>{items.reduce((acc, item) => acc + (item.lowQty === 0 && item.highQty === 0 ? 0 : item.highQty), 0)} Items</div>

                                <div className=' flex text-gray-500 text-base font-medium  w-1/12'>
                                    {/* <div className="text-neutral-400 text-base  font-medium   "> Tax inc</div> */}
                                </div>
                                <div className=' flex text-gray-500 text-base font-medium  w-1/12 mr-4'>
                                    <>
                                        {items?.some((item) => item?.lowQty) && (
                                            <>
                                                ₹{
                                                    items.reduce(
                                                        (acc, item) => { if (!item.itemName) return acc; return acc + (item?.lowQty || 0) * item?.tax * item?.sellingPrice },
                                                        0
                                                    ).toFixed(2) ||
                                                    0
                                                }
                                                -{' '}
                                            </>
                                        )}


                                        {items?.some((item) => item?.highQty) && (
                                            <>
                                                ₹{
                                                    items.reduce(
                                                        (acc, item) => { if (!item.itemName) return acc; return acc + (item?.highQty || 0) * item?.tax * item?.sellingPrice },
                                                        0
                                                    ).toFixed(2) ||
                                                    0
                                                }

                                            </>
                                        )}

                                        
                                        {items?.some((item) => !item?.highQty) && (
                                            <>
                                                ₹{
                                                    items.reduce(
                                                        (acc, item) => { if (!item.itemName) return acc; return acc + (item?.quantity) * item?.tax * item?.sellingPrice  },
                                                        0
                                                    ).toFixed(2) ||
                                                    0
                                                }
                                            </>
                                        )}
                                        
                                    </>
                                </div>
                                <div className=' flex text-gray-500 text-base font-medium  w-1/12'>
                                    
                                </div>
                                <div className=' flex text-gray-500 text-base font-medium  w-1/12'>
                                <>
                                        {items?.some((item) => item?.lowQty) && (
                                            <>
                                                ₹{
                                                    items.reduce(
                                                        (acc, item) => { if (!item.itemName) return acc; return acc + (item?.lowQty || 0) * item?.discount/100 * item?.sellingPrice },
                                                        0
                                                    ).toFixed(2) ||
                                                    0
                                                }
                                                -{' '}
                                            </>
                                        )}
                                        {items?.some((item) => item?.highQty) && (
                                            <>
                                                ₹{
                                                    items.reduce(
                                                        (acc, item) => { if (!item.itemName) return acc; return acc + (item?.highQty || 0) * item?.discount/100 * item?.sellingPrice },
                                                        0
                                                    ).toFixed(2) ||
                                                    0
                                                }

                                            </>
                                        )}

                                        
                                        {items?.some((item) => !(item?.highQty)) && (
                                            <>
                                                ₹{
                                                    items.reduce(
                                                        (acc, item) => { if (!item.itemName) return acc; return acc + (item?.quantity || 0) * item?.discount/100 * item?.sellingPrice  },
                                                        0
                                                    ).toFixed(2) ||
                                                    0
                                                }
                                            </>
                                        )}
                                        
                                    </>
                                </div>
                                <div className=' flex text-gray-500 text-base font-medium  w-1/12'>
                                    <>
                                        {items?.some((item) => item?.lowQty) && (
                                            <>
                                                ₹{
                                                    items.reduce(
                                                        (acc, item) => { if (!item.itemName) return acc; return acc + (item?.lowQty || 0) * item?.tax * item?.sellingPrice + item?.lowQty*item?.sellingPrice - (item?.lowQty*item?.sellingPrice*item?.discount/100) },
                                                        0
                                                    ).toFixed(2) ||
                                                    0
                                                }
                                                -{' '}
                                            </>
                                        )}
                                        {items?.some((item) => item?.highQty) && (
                                            <>
                                                ₹{
                                                    items.reduce(
                                                        (acc, item) => { if (!item.itemName) return acc; return acc + (item?.highQty || 0) * item?.tax * item?.sellingPrice + item?.highQty*item?.sellingPrice-(item?.highQty*item?.sellingPrice*item?.discount/100)},
                                                        0
                                                    ).toFixed(2) ||
                                                    0
                                                }

                                            </>
                                        )}

                                        
                                            {items?.some((item) => !item?.highQty) && (
                                                <>
                                                    ₹{
                                                        items.reduce(
                                                            (acc, item) => { if (!item.itemName) return acc; return acc + (item?.quantity || 0) * item?.tax * item?.sellingPrice + item?.quantity*item?.sellingPrice - (item?.quantity*item?.sellingPrice*item?.discount/100)  },
                                                            0
                                                        ).toFixed(2) ||
                                                        0
                                                    }

                                                </>
                                            )}
                                        
                                    </>

                                </div>
                            </div>
                        </div>

                    </div>
                    <ExistingsaleEstimateTotalAmout otherData={otherData} items={items} isLoading={isLoading}/>
                </div>
                <ExistingsaleEstimateBottomBar existingSalesData={data} />
            </div>



        </>

    )
}

export default ExistingsaleEstimateTable;
