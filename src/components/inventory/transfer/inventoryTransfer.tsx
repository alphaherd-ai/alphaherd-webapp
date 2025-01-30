'use client'
import React, { useState, useEffect, useCallback } from 'react'
import leftIcon from '../../../assets/icons/finance/left_icon.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@nextui-org/react"
import printicon from "../../../assets/icons/finance/print.svg"
import shareicon from "../../../assets/icons/finance/share.svg"
import drafticon from "../../../assets/icons/finance/draft.svg"
import checkicon from "../../../assets/icons/finance/check.svg"
import downloadicon from "../../../assets/icons/finance/download.svg"
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo'
import delicon from "../../../assets/icons/finance/1. Icons-27.svg"

import { useAppSelector } from '@/lib/hooks'
import axios from 'axios';
import Select from 'react-select';
import useSWR from 'swr'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calicon from "../../../assets/icons/finance/calendar_today.svg";
import Loading2 from '@/app/loading2'
import Subtract from "@/assets/icons/finance/Subtract.svg"
import Add from "@/assets/icons/finance/add (2).svg"
const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())





const InventoryTransfer = () => {
    const router = useRouter();
    const [invoiceNumber, setInvoiceNumber] = useState<string>('');
    const [status, setStatus] = useState<string>('Delivery Pending');
    const [transferStatus, setTransferStatus] = useState<string>('Transfer To');
    const appState = useAppSelector((state) => state.app);
    const [startDate, setStartDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(new Date());
    const [orgBranches, setOrgBranches] = useState<any>([]);
    const [saving,isSaving]=useState<boolean>(false);
    const [selectedBranch, setSelectedBranch] = useState<any>(null);
    const [items, setItems] = useState<any>([]);
    const [products, setProducts] = useState<any>([]);
    const [batches, setBatches] = useState<any>([]);
    const [notes, setNotes] = useState<string>('');
    const [selectedBatch, setSelectedBatch] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const defaultBranchName = appState?.currentBranch?.branchName;
    const [transferBranchName, setTransferBranchName] = useState<string>('');
    const [transferInventoryId, setTransferInventoryId] = useState<any>();
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/getOrgBranch/${appState?.currentOrgId}`, fetcher);
    //console.log(appState?.currentOrgId);


    useEffect(() => {
        setInvoiceNumber(`IT-${generateInvoiceNumber(2)}`);
        if (data && !error && !isLoading) {

            const defaultBranches = data?.orgBranches?.filter((branch: any) => (
                branch?.id !== appState.currentBranchId
            ));
            if (defaultBranches) {
                const branches = defaultBranches?.map((branch: any) => ({
                    value: {
                        orgId: branch?.orgId,
                        name: branch?.branchName,
                        id: branch?.id
                    },
                    label: branch?.branchName
                }));

                setOrgBranches(branches);
            }
        }

    }, [data, error, isLoading])

    const handleProductSelect = (index: number, product: any) => {
        //console.log(index);
        if (!transferInventoryId) {
            setTransferInventoryId(product?.value?.inventorySectionId);
        }
        if (index === items.length - 1) {
            items.push({
                product: null,
                batch: null,
                quantity:null,
            })
            setItems(items);
        }
        const productData = products.find((e: any) => e?.value?.id === product?.value?.id)?.value;
        if (productData) {
            const batchesData = batches?.filter((batch: any) => batch?.value?.productId === productData?.id);
            const sortedbatchesdata = batchesData.sort((a: any, b: any) => new Date(a?.value?.expiry).getTime() - new Date(b?.value?.expiry).getTime());
            const newItems = [...items];
            newItems[index].batch = sortedbatchesdata[0]?.value;
            setSelectedBatch(sortedbatchesdata);
        }
        const newItems = [...items];
        newItems[index].product = product?.value;
        setItems(newItems);
    }

    const handleBatchSelect = (index: number, batch: any) => {

        const newItems = [...items];
        newItems[index].batch = batch?.value;
        setItems(newItems);
    }

    useEffect(() => {
        if (items.length === 0) {
            const item = {
                product: null,
                batch: null,
                quantity:null,
            }
            setItems([item]);
        }

        console.log(items);
    }, [items])



    useEffect(() => {
        if (transferStatus === 'Transfer To') {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const [res1, res2] = await Promise.all([
                        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${appState.currentBranchId}`),
                        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/getAll?branchId=${appState.currentBranchId}`)
                    ])
                    console.log(res1, res2);
                    if (res1.status === 201 && res2.status === 201) {
                        const formattedProducts = res1.data?.map(
                            ({ productBatches, items, InventorySection, ...product }: any) => ({
                                value: product,
                                label: product.itemName
                            })
                        );
                        setProducts(formattedProducts)
                        const formattedBatches = res2.data?.map(
                            ({ product, items, inventoryTimeline, InventorySection, ...batch }: any) => ({
                                value: batch,
                                label: batch.batchNumber
                            })
                        );
                        setBatches(formattedBatches)
                        setLoading(false);
                    }
                }
                catch (err) {
                    console.log(err);
                    setLoading(false);
                }
            }
            fetchData();

        }

        else if (transferStatus === 'Transfer From') {
            if (selectedBranch) {
                const fetchData = async () => {
                    try {
                        setLoading(true);
                        const [res1, res2] = await Promise.all([
                            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${selectedBranch?.value?.id}`),
                            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/getAll?branchId=${selectedBranch?.value?.id}`)
                        ])
                        console.log(res1, res2);
                        if (res1.status === 201 && res2.status === 201) {
                            const formattedProducts = res1.data?.map(
                                ({ productBatches, items, InventorySection, ...product }: any) => ({
                                    value: product,
                                    label: product.itemName
                                })
                            );
                            setProducts(formattedProducts)
                            const formattedBatches = res2.data?.map(
                                ({ product, items, inventoryTimeline, InventorySection, ...batch }: any) => ({
                                    value: batch,
                                    label: batch.batchNumber
                                })
                            );
                            setBatches(formattedBatches)
                            setLoading(false);
                        }
                    }
                    catch (err) {
                        console.log(err);
                        setLoading(false);
                    }

                }
                fetchData();
            }

        }
    }, [transferStatus, selectedBranch])

    const handleDeleteRow = useCallback((id: number) => {
        setItems((prev: any) => {
            const updatedItems = prev.filter((item: any, index: number) => index !== id);
            console.log(updatedItems);
            return updatedItems;
        })
    }, [items]);


    const handleDateChange = (date: any) => {
        setStartDate(date);
    };

    const handleDueDateChange = (date: any) => {
        setDueDate(date);
    }




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
        menuPortal: (base: any) => ({ ...base, zIndex: 9999 })
    };

    const handleTransfer = async () => {
        items.pop();
        try {
            isSaving(true);
            const jsonItems = JSON.stringify(items);
            const transferringBranch = transferStatus === 'Transfer To' ? defaultBranchName : transferBranchName;
            const receivingBranch = transferStatus === 'Transfer To' ? transferBranchName : defaultBranchName;
            const body = {
                items,
                status,
                transferStatus,
                notes,
                dueDate,
                startDate,
                invoiceNumber,
                defaultBranchName,
                transferBranchName,
                transferInventoryId
            }

            const transferInvoiceBody = {
                items: jsonItems,
                status,
                transferStatus,
                notes,
                dueDate,
                startDate,
                invoiceNumber,
                transferringBranch,
                receivingBranch,

            }

            //console.log(body);

            if (transferStatus === 'Transfer To') {
                const [res1, res2] = await Promise.all([
                    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/transfer?branchId=${selectedBranch?.value?.id}`, body),
                    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/transfer/invoice/create`, { invoiceData: transferInvoiceBody })

                ])
                if (res1.status === 201 && res2.status === 201) {
                    router.back();
                }

            }
            else {
                const [res1, res2] = await Promise.all([
                    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/transfer?branchId=${appState.currentBranchId}`, body),
                    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/transfer/invoice/create`, { invoiceData: transferInvoiceBody })
                ])
                if (res1.status === 201 && res2.status === 201) {
                    router.back();
                }
            }
        }
        catch (err) {
            console.log(err);
        }
        finally{
            isSaving(false);
        }
    }

    const handleIncClick=(index:number)=>{
        setItems((prev: any) => {
            const updatedItems = prev.map((item: any, i: number) => {
                if (i === index) {
                    return { ...item, quantity: item.quantity+1 }
                }
                return item;
            });
            return updatedItems;
        })
    }

    const handleDecClick=(index:number)=>{
        setItems((prev: any) => {
            const updatedItems = prev.map((item: any, i: number) => {
                if (i === index) {
                    return { ...item, quantity: item?.quantity!==0 ? item.quantity-1: 0 }
                }
                return item;
            });
            return updatedItems;
        })
    }

    const handleQuantityChange = (quantity: any, index: number) => {
        //console.log(quantity,index);
        setItems((prev: any) => {
            const updatedItems = prev.map((item: any, i: number) => {
                if (i === index) {
                    return { ...item, quantity: Number(quantity) }
                }
                return item;
            });
            return updatedItems;
        })
    }


    return (
        <div className='w-full min-h-screen bg-gray-100 py-10 px-6'>
            <div className='flex items-center'>
                <div className="w-11 h-11  bg-gray-100 rounded-[5px] border border-solid border-neutral-400 flex justify-center items-center mr-4">
                    <Image className="w-6 h-6 relative rounded-[5px]  cursor-pointer" src={leftIcon} alt="Back" onClick={() => router.back()}></Image>

                </div>

                <div className="text-gray-500 text-[28px] font-bold">
                    New Inventory Transfer
                </div>
            </div>

            <div className='w-full  bg-gray-100 mt-10 rounded-t-md border border-solid border-neutral-400'>
            <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-t-0 border-r-0 border-l-0 border-solid border-borderGrey justify-end items-center gap-6 flex">
                    {/* <div className='flex items-center justify-center border w-7 h-7 border-solid border-gray-300 border-0.5 rounded-md p-1'><Image src={Download} alt='Download' className='w-4  h-4' /></div> */}
                </div>
                <div className="flex justify-between w-full pr-[16px] pl-[16px] pt-[20px]">
                    <div className="px-6 bg-white rounded-[10px] h-14 justify-between items-center gap-4 flex w-full mr-[16px]">
                        <div className="flex gap-[16px] items-center w-full">
                            <div className="text-gray-500 text-base font-bold">Branch:</div>
                            {isLoading ? <Loading2 /> : <Select
                                className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0"
                                classNamePrefix="select"
                                name="branch"
                                isClearable={false}
                                isSearchable={true}
                                value={selectedBranch?.name}
                                options={orgBranches}
                                onChange={(selectedOption: any) => { setSelectedBranch(selectedOption); setTransferBranchName(selectedOption?.value?.name) }}
                                styles={customStyles}


                            />
                            }
                            <button className={`ml-4 px-2 py-1 rounded-[5px] ${transferStatus === 'Transfer To' ? 'bg-[#35BEB1] border-none text-white' : 'bg-white text-[#A2A3A3]'} border border-solid border-neutral-400`}
                                onClick={() => setTransferStatus('Transfer To')}>Transfer To</button>
                            <button className={`ml-4 px-2 py-1 rounded-[5px] ${transferStatus === 'Transfer From' ? 'bg-[#35BEB1] border-none text-white' : 'bg-white text-[#A2A3A3]'} border border-solid border-neutral-400`}
                                onClick={() => setTransferStatus('Transfer From')}>Transfer From</button>

                        </div>
                    </div>
                    <div className="px-6 py-1 bg-white h-14 rounded-[10px] justify-between items-center gap-4 flex w-full">
                        <div className="flex w-full">
                            <div className="text-gray-500 text-base w-full flex py-3">
                                <p className=' font-bold '>Reference Number:</p>
                                <p className='ml-2 text-gray-500'>{invoiceNumber ? invoiceNumber : ""}</p>
                            </div>
                            <div className="flex items-center justify-between w-full ">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex px-[16px]  justify-between w-full pt-[16px] pb-[16px]">
                    <div className="px-6 h-14  bg-white rounded-[10px] justify-between items-center gap-4 flex w-full mr-[16px]">
                        <div className="flex gap-[0.8rem] items-center w-full">
                            <div className="text-gray-500 text-base font-bold  w-1/8">Date:</div>
                            <div className="customDatePickerWidth">
                                <DatePicker
                                    className="w-full"
                                    selected={startDate}
                                    onChange={handleDateChange}
                                    calendarClassName="react-datepicker-custom"
                                    customInput={
                                        <div className='relative '>
                                            <input
                                                className="w-full h-9 text-textGrey2 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                                value={startDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', })}
                                                readOnly
                                            />
                                            <Image
                                                src={calicon}
                                                alt="Calendar Icon"
                                                className="absolute right-2 top-2 cursor-pointer"
                                                width={50}
                                                height={20}
                                            />
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="px-6  h-14 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                        <div className="flex gap-[0.2rem] items-center w-full">
                            <div className="text-gray-500 w-full flex text-base">
                                <p className=' font-bold '>Status:</p>
                                <button className={`ml-4 px-2 py-1 rounded-[5px] ${status === 'Delivery Pending' ? 'bg-[#35BEB1] border-none text-white' : 'bg-white text-[#A2A3A3]'} border border-solid border-neutral-400`}
                                    onClick={() => setStatus('Delivery Pending')}>Delivery Pending</button>
                                <button className={`ml-4 px-2 py-1 rounded-[5px] ${status === 'Delivered' ? 'bg-[#35BEB1] border-none text-white' : 'bg-white text-[#A2A3A3]'} border border-solid border-neutral-400`}
                                    onClick={() => setStatus('Delivered')}>Delivered</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex h-14 px-[16px] justify-between w-full mt-1 pb-[16px]">
                    <div className="px-6 py-1 bg-white rounded-[10px] justify-between items-center gap-4 flex w-full">
                        <div className="flex gap-[16px] items-center w-full">
                            <div className="text-gray-500 text-base font-bold py-3">Notes:</div>
                            <textarea
                                rows={4}
                                cols={100}
                                className="w-full h-10 text-textGrey2 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                placeholder="..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />

                        </div>
                    </div>
                </div>

                <div className='w-full h-fit  bg-gray-100 px-[16px] rounded-md '>
                    <div className='w-full h-14 bg-white flex rounded-t-md rounded-b-0 border border-solid border-neutral-400 items-center text-gray-500 text-md font-bold px-6'>Items</div>
                    <div className='flex px-4  w-full  box-border bg-gray-100  h-12 justify-evenly  items-center border-0 border-b border-l border-r  border-solid border-neutral-400 text-textGrey2'>
                        <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>No</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Name</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Batch No</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Bar Code</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Expiry Date</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Quantity</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-1/12 '></div>
                    </div>
                    {items.map((item: any, index: number) => (
                        <div key={index} className='flex px-4  w-full  box-border bg-white  h-12 justify-evenly  items-center border-0 border-b border-l border-r  border-solid border-neutral-400 text-textGrey2'>
                            <div className=' flex text-gray-500 text-base font-medium   w-1/12 '>{index + 1}</div>
                            <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>
                                {loading ? <Loading2 /> : <Select
                                    className='text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0'
                                    classNamePrefix='select'
                                    isClearable={false}
                                    isSearchable={true}
                                    name="itemName"
                                    options={products}
                                    styles={customStyles}
                                    value={
                                        products.find((product: any) => product?.value?.id === items[index]?.product?.id) || null
                                    }
                                    onChange={(selectedOption: any) => handleProductSelect(index, selectedOption)}
                                />
                                }
                            </div>

                            <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>
                                {loading ? <Loading2 /> :
                                    <Select
                                        className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0"
                                        classNamePrefix="select"
                                        isClearable={false}
                                        isSearchable={true}
                                        value={batches.find((e: any) => e?.value?.id === items[index]?.batch?.id) || null}
                                        name="batchNumber"
                                        options={items[index]?.product?.id && selectedBatch}
                                        onChange={(selectedOption: any) => handleBatchSelect(index, selectedOption)}
                                        styles={customStyles}
                                    />
                                }
                            </div>
                            <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>{item?.product?.hsnCode}</div>
                            <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>{item?.batch?.expiry ? new Date(item?.batch?.expiry).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', }) : ""}</div>
                            <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>
                                <div className='flex items-center text-textGrey2 text-base font-medium gap-1 bg-white'>
                                    <button className="border-0 rounded-md cursor-pointer" onClick={()=>handleDecClick(index)}>
                                        <Image className='rounded-md w-6 h-4' src={Subtract} alt="-"></Image>
                                    </button>
                                    <input
                                        type="number"
                                        value={item?.quantity}
                                      onChange={(e)=>handleQuantityChange(e.target.value,index)}
                                        className="w-[3rem] text-center border border-solid border-borderGrey h-8  rounded-md text-textGrey2 font-medium text-base"
                                        name={`quantity-${index + 1}`}
                                    />

                                    {/* {item.quantity} */}
                                    <button className="border-0 rounded-md cursor-pointer" onClick={()=>handleIncClick(index)} >
                                        <Image className="rounded-md w-6 h-4" src={Add} alt="+"></Image>
                                    </button>
                                </div>
                            </div>
                            {index !== items.length - 1 ?
                                <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium gap-[20px] justify-end'>

                                    <button className="border-0 bg-transparent cursor-pointer" onClick={() => handleDeleteRow(index)}>
                                        <Image className='w-5 h-5' src={delicon} alt="delete" ></Image>
                                    </button>
                                </div> : <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium gap-[20px] justify-end'></div>}
                        </div>
                    ))}
                    <div className='flex px-4  w-full  box-border bg-gray-100  h-12 justify-evenly  items-center border-0 border-b border-l border-r rounded-b-md  border-solid border-neutral-400 text-textGrey2'>
                        <div className=' flex text-gray-500 text-base font-medium   w-1/12 '></div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>Total</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '></div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '></div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '></div>
                        <div className=' flex text-gray-500 text-base font-medium   w-2/12 '>{items.reduce((acc: any, item: any) => { if (!item.product && !item.batch) return acc; return acc + (item?.quantity || 0) }, 0)} Items</div>
                        <div className=' flex text-gray-500 text-base font-medium   w-1/12 '></div>
                    </div>



                </div>

                <div className='w-full px-[16px] mt-4  h-12 mb-10  rounded-md'>
                    <div className='px-2 w-full flex text-gray-500 text-base font-bold items-center h-full bg-white rounded-md'>
                        <p className='w-2/12'>Delivery Due Date:</p>
                        <div className="customDatePickerWidth">
                            <DatePicker
                                className="w-full"
                                selected={dueDate}
                                onChange={handleDueDateChange}
                                calendarClassName="react-datepicker-custom"
                                customInput={
                                    <div className='relative '>
                                        <input
                                            className="w-full h-9 text-textGrey2 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                            value={dueDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', })}
                                            readOnly
                                        />
                                        <Image
                                            src={calicon}
                                            alt="Calendar Icon"
                                            className="absolute right-2 top-2 cursor-pointer"
                                            width={50}
                                            height={20}
                                        />
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>


            </div>

            <div className="flex justify-between items-center h-14 w-full  box-border  bg-white  border border-t-0 border-solid border-neutral-400 text-gray-400 py- rounded-b-lg">
                <div className="flex justify-between items-center gap-4 pl-4">
                    <Button className="p-2 bg-white rounded-md border border-solid  border-borderGrey  justify-start items-center gap-2 flex cursor-pointer">
                        <Image src={printicon} alt="print"></Image>
                        <div className="text-textGrey1 text-sm hover:text-textGrey2 transition-all">Print</div>
                    </Button>
                    <Button className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">

                        <Image src={downloadicon} alt="download" />
                        <div className="text-textGrey1 text-sm hover:text-textGrey2 transition-all">Download</div>

                    </Button>
                    <Button className="p-2 bg-white rounded-md border border-solid border-borderGrey justify-start items-center gap-2 flex cursor-pointer">

                        <Image src={shareicon} alt="download" />
                        <div className="text-textGrey1 text-sm hover:text-textGrey2 transition-all">Share editable sheet</div>

                    </Button>

                </div>
                <div className="flex justify-between items-center gap-4 pr-4">

                    <Button className={`px-4 py-2.5 text-white text-base rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer bg-zinc-900`}
                        onClick={handleTransfer}>
                        <Image src={checkicon} alt="check"></Image>
                        <div>{saving ? <Loading2/> : "Save"}</div>
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default InventoryTransfer;