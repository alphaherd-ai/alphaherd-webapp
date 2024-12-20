
'use client';
import DownArrow from '../../../../../assets/icons/finance/downArrow.svg';
import subicon from "../../../../../assets/icons/finance/1. Icons-26.svg"
import delicon from "../../../../../assets/icons/finance/1. Icons-27.svg"
import Subtract from "../../../../../assets/icons/finance/Subtract.svg"
import Add from "../../../../../assets/icons/finance/add (2).svg"
import Popup from '../../../../finances/expenses/newexpenses/table/newPartyPopup';
import addicon from "../../../../../assets/icons/finance/add.svg"
import add1icon from "../../../../../assets/icons/finance/add1.svg"
import sellicon from "../../../../../assets/icons/finance/sell.svg"
import Invoice from '../../../../../assets/icons/finance/invoice.svg';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import Select from 'react-select';
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import NewExpensesHeader from "./header"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import NewExpensesBottomBar from './bottombar';
import NewExpensesTotalAmout from './totalamount';
import axios from 'axios';
import { DataContext } from './DataContext';
import { useAppSelector } from "@/lib/hooks";
import { Tax } from '@prisma/client';
import formatDateAndTime from '@/utils/formateDateTime';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import capitalizeFirst from '@/utils/capitiliseFirst';

interface expenseList {
    id: string,
    name: string | string[],
}
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
function DataFromExpense(id: number | null, branchId: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/expenses/${id}/?branchId=${branchId}`, fetcher);
    return {
        data,
        isLoading,
        error
    }
}
const NewExpensesTable = () => {
    const { tableData, setTableData } = useContext(DataContext);
    const [otherData, setOtherData] = useState({});
    const appState = useAppSelector((state) => state.app)
    const url = useSearchParams();
    const id = url.get('id');
    const { tableData: items, setTableData: setItems } = useContext(DataContext);

    let expenseData: any = null, isExpenseDataLoading = false, isExpenseDataError = false;
    if (id) {
        const { data, isLoading, error } = DataFromExpense(Number(id), appState.currentBranchId);
        expenseData = data;
        isExpenseDataError = error;
        isExpenseDataLoading = isLoading;
    }

    useEffect(() => {
        if (!isExpenseDataLoading && expenseData && !isExpenseDataError) {
            const { items, ...otherData } = expenseData;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            setOtherData(otherData)
            const shallowDataCopy = [...items];
            const itemData = shallowDataCopy.map((item: any) => ({
                id: item.id,
                itemName: item.name,
                sellingPrice: item.sellingPrice,
                gst: item.taxAmount,
                category: item.category
            }));
            setItems((prev: any[]) => [...itemData, ...prev,]);
            console.log("item data is : ",itemData);
            
        }
    }, [expenseData]);



    const taxOptions = [
        { value: 'Tax excl.', label: 'Tax excl.' },
        { value: 'Tax incl.', label: 'Tax incl.' }
    ];

    const gstOptions = [
        { value: 0.18, label: Tax.GST_18 },
        { value: 0.09, label: Tax.GST_9 }
    ];

    // const category = [
    //     {value: "Utilities", label: "Utilities"},
    //     {value: "Rent", label: "Rent"},
    //     {value: "Medical Supplies", label: "Medical Supplies"},
    //     {value: "Repair and Maintainance", label: "Repair and Maintainance"},
    //     {value: "Payroll", label: "Payroll"},
    //     {value: "Inventory", label: "Inventory"},
    //     {value: "Other", label: "Other"},
    // ]
    const [expense1, setexpense] = useState<any[]>([]);
    useEffect(() => {
        const fetchexpense = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/expenseCategory/getAll?branchId=${appState.currentBranchId}`);
                const expenseList: any[] = response.data.reduce((acc: any[], expenseEntry: expenseList) => {
                    if (Array.isArray(expenseEntry.name)) {
                        expenseEntry.name.forEach((name: string) => {
                            acc.push({ value: expenseEntry.id, label: name });
                        });
                    } else {
                        acc.push({ value: expenseEntry.id, label: expenseEntry.name });
                    }
                    return acc;
                }, []);
                setexpense(expenseList);
                console.log("expense category is : ",expenseList);
            } catch (error) {
                console.log("Error fetching expense", error);
            }
        };
        fetchexpense();
    }, [appState.currentBranchId]);

    // const handleexpenseSelect = (selectedexpense: { value: number; label: string }, index: number) => {
    //     const updatedItems = [...items];
    //     updatedItems[index] = {
    //         ...updatedItems[index],
    //         expense: selectedexpense.label // Update the expense
    //     };
    //     console.log("updated items is :",updatedItems);
    //     setItems(updatedItems);
    //     setTableData(updatedItems); 
    //     console.log("table data is :",tableData);
    //     // Ensure the table data context is updated
    // };
  

    const handleexpenseSelect=(selectedCategory:{ value: number; label: string }, index: number)=>{
        const updatedItems=[...tableData];
        updatedItems[index]={
            ...updatedItems[index],
            category:selectedCategory.label
        }
        console.log("category data is :",selectedCategory.label);
        setTableData(updatedItems);
        console.log("table data is :",tableData);
    }
    
    const [disableButton, setDisableButton] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);

    const handleDeleteRow = useCallback((index: number) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
        setTableData(updatedItems);
    }, [items]);

const handleGstSelect = (selectedGst: any, index: number) => {
    const updatedItems = [...tableData];
    updatedItems[index] = {
        ...updatedItems[index],
        gst: selectedGst.value
    };
    setTableData(updatedItems);
};

const handleItemName=(event:any,index:any)=>{
    if(index === items.length - 1){
        items.push({
            itemName:""
        })
        setItems(items);
    }

        const updatedItems = [...tableData];
        updatedItems[index] = {
            ...updatedItems[index],
            itemName: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
        };
        setItems(updatedItems);
        setTableData(updatedItems);
    }
    const handleSellingPrice = (event: any, index: any) => {
        const updatedItems = [...tableData];
        updatedItems[index] = {
            ...updatedItems[index],
            sellingPrice: parseFloat(event.target.value)
        };
        setItems(updatedItems);

        setTableData(updatedItems);
    }

    // const handleAddItem= useCallback(() => {
    //     setItems([...items, {}]);
    // }, [items]);






    useEffect(() => {
        items.push({
            itemName: ""
        })
        setItems(items);
        setTableData(items);
    }, [])


    const [showPopup, setShowPopup] = React.useState(false);


    const togglePopup = () => {
        setShowPopup(!showPopup);
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
    };

    return (
        <>
            <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100 rounded-lg border border-solid border-borderGrey">
                <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-t-0 border-r-0 border-l-0 border-solid border-borderGrey justify-between items-center gap-6 flex">
                    <div></div>
                    {/* <div className='bg-orange-200 rounded-md px-2' ><span className="text-orange-600  text-sm font-medium ">You’re owed: ₹</span><span className="text-orange-600 text-sm font-bold ">2,124</span></div> */}
                    {/* <div className='flex items-center h-9 py-2.5 bg-black justify-between rounded-lg '>

                        <Popover placement="bottom-end" showArrow offset={10}>
                            <PopoverTrigger> */}
                    <Button
                        onClick={togglePopup}
                        variant="solid"
                        className="capitalize flex h-9 py-2.5 border-none bg-black text-white rounded-lg ">
                        <div className='flex pr-2'><Image src={addicon} alt='addicon' className='w-6 h-6 ' /></div>
                        Add Party
                    </Button>
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
                                                <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Expense</div>
                                        </Link>

                                    </div>
                                </div>


                            </PopoverContent>
                        </Popover>



                    </div> */}
                </div>
                <div className="flex-col w-full pr-[16px] pl-[16px] pt-[20px]">
                    <NewExpensesHeader existingHeaderData={otherData} />

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

                            <div className="flex items-center justify-center ">
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
                            </div>

                        </div>
                        <div>
                            <div className='flex w-full justify-evenly items-center box-border bg-gray-100 h-12  text-textGrey2 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey'>
                                <div className=' flex text-textGrey2 text-base font-medium w-[3rem]'>No.</div>
                                <div className=' flex text-textGrey2 text-base font-medium w-[15rem]'>Name</div>
                                <div className=' flex text-textGrey2 text-base font-medium w-[12rem]'>Price</div>



                                <div className=' flex text-textGrey2 text-base font-medium w-[10rem]'>Tax %</div>
                                <div className=' flex text-textGrey2 text-base font-medium w-[10rem]'>Tax Amt.</div>
                                <div className=' flex text-textGrey2 text-base font-medium w-[10rem]'>Total</div>
                                <div className=' flex text-textGrey2 text-base font-medium w-[10rem]'>Category</div>

                            </div>
                            {items.map((item: any, index: number) => (
                                <div key={index + 1} className='flex justify-evenly items-center w-full box-border bg-white border border-solid border-gray-200 text-gray-400 py-2'>
                                    <div className='w-[3rem] flex items-center text-textGrey2 text-base font-medium'>{index + 1}</div>
                                    <input className='w-[15rem]  border border-solid border-borderGrey outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2'
                                        value={item.itemName}
                                        placeholder='Enter Item Name'
                                        onChange={(event) => {
                                            const value = event.target.value;
                                            event.target.value = value.charAt(0).toUpperCase() + value.slice(1);
                                            handleItemName(event, index)
                                        }}
                                    />
                                    <div className='w-[12rem] flex items-center text-textGrey2 text-base font-medium gap-1'>
                                        ₹<input className="w-[70%] border border-solid border-borderGrey outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                            value={item.sellingPrice}
                                            onChange={(event) => handleSellingPrice(event, index)} />
                                        {/* <Select
                                        className="text-textGrey2 text-sm font-medium "
                                        defaultValue={taxOptions[0]}
                                        isClearable={false}
                                        isSearchable={true}
                                        options={taxOptions}
                                        styles={customStyles}
                                    /> */}
                                    </div>
                                    <div className='w-[10rem] flex items-center text-textGrey2 text-base font-medium'>
                                        {id == null ? (
                                            <Select
                                                className="text-textGrey2 text-base font-medium"
                                                defaultValue={[]}
                                                isClearable={false}
                                                isSearchable={true}
                                                options={gstOptions}
                                                styles={customStyles}
                                                onChange={(selectedOption: any) => handleGstSelect(selectedOption, index)}
                                            />) : (
                                            isNaN(item.gst) ? 0 : ` ${item.gst * 100}%`
                                        )}
                                    </div>

                                    <div className='w-[10rem] flex items-center text-textGrey2 text-base font-medium gap-[12px]'>

                                        <div>{isNaN(item.sellingPrice) || isNaN(item.gst) ? 0 : (item.sellingPrice * item.gst).toFixed(2)}</div>

                                    </div>

                                    <div className='w-[10rem] flex items-center text-textGrey2 text-base font-medium'>{`₹${isNaN(item.sellingPrice) || isNaN(item.gst) ? 0 : (item.sellingPrice * item.gst + item.sellingPrice).toFixed(2)}`}</div>

                                <div className='w-[10rem] flex-col items-center text-textGrey2 text-base font-medium'>
                                <Select

                                    className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0 absolute"

                                    classNamePrefix="select"

                                    isClearable={false}
                                    isSearchable={true}
                                    name="expense"
                                    options={expense1}
                                    onChange={(selectedOption) => handleexpenseSelect(selectedOption, index)}
                                    //value={ expense1.find(expense => expense.label === item.expense)}
                                    menuPortalTarget={document.body}

                                    styles={customStyles}

                                        />
                                    </div>
                                    {id===null && index !== items.length - 1 ?
                                        <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium gap-[20px] justify-end'>
                                            {/* <button className="border-0 bg-transparent cursor-pointer">
                                                <Image className='w-5 h-5' src={sellicon} alt="sell" ></Image>
                                            </button> */}

                                            <button className="border-0 bg-transparent cursor-pointer" onClick={() => handleDeleteRow(index)}>
                                                <Image className='w-5 h-5' src={delicon} alt="delete" ></Image>
                                            </button>
                                        </div> : <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium gap-[20px] justify-end'></div>}
                                </div>
                            ))}
                            <div className='flex  w-full justify-evenly items-center box-border bg-gray-100 h-12 border border-solid border-gray-200 py-5  text-textGrey2'>
                                <div className=' flex text-textGrey2 text-base font-medium w-[3rem]'> </div>
                                <div className=' flex text-textGrey2 text-base font-medium w-[15rem]'>Total</div>
                                <div className=' flex text-textGrey2 text-base font-medium w-[12rem]'> </div>


                                <div className=' flex text-textGrey2 text-base font-medium w-[10rem]'>
                                    {/* <Select
                                    defaultValue={gstOptions}
                                    isClearable={false}
                                    isSearchable={true}
                                    options={gstOptions}
                                    styles={customStyles}
                                /> */}
                                </div>

                                <div className=' flex text-textGrey2 text-base font-bold w-[10rem]'>₹{isNaN(items.reduce((acc, item) => (!item.itemName || isNaN(item.sellingPrice) || isNaN(item.gst)) ? acc : acc + item.sellingPrice * item.gst, 0)) ? '0.00' : items.reduce((acc, item) => (!item.itemName || isNaN(item.sellingPrice) || isNaN(item.gst)) ? acc : acc + item.sellingPrice * item.gst, 0).toFixed(2)}

                                </div>
                                <div className=' flex text-textGreen text-base font-bold w-[10rem]'>₹{isNaN(items.reduce((acc, item) => (!item.itemName || isNaN(item.sellingPrice) || isNaN(item.gst)) ? acc : acc + (item.sellingPrice * item.gst + item.sellingPrice), 0)) ? '0.00' : items.reduce((acc, item) => (!item.itemName || isNaN(item.sellingPrice) || isNaN(item.gst)) ? acc : acc + (item.sellingPrice * item.gst + item.sellingPrice), 0).toFixed(2)}
                                </div>
                                <div className=' flex text-textGrey2 text-base font-medium w-[10rem]'></div>

                            </div>
                        </div>

                    </div>
                    <NewExpensesTotalAmout expenseData={expenseData}/>
                </div>
                <NewExpensesBottomBar expenseData={expenseData} />
            </div>
            {showPopup && <Popup onClose={togglePopup} />}


        </>

    )
}

export default NewExpensesTable;
