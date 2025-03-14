"use client"


import 'react-datepicker/dist/react-datepicker.css';


import Subtract from "../../../../../assets/icons/finance/Subtract.svg"
import Add from "../../../../../assets/icons/finance/add (2).svg"
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import Image from "next/image"
import InvoiceReturnBottomBar from "./bottombar"
import InvoiceReturnTotalAmount from "./totalamount"
import InvoiceReturnHeader from "./header"
import { useAppSelector } from "@/lib/hooks";
import formatDateAndTime from '@/utils/formateDateTime';

import useSWR from 'swr';
import { DataContext } from "./DataContext"
import { useSearchParams } from "next/navigation"
//@ts-ignore

const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

interface Products {
    id: string,
    itemName: string,
    productBatch: ProductBatch[],
    hsnCode: string,
    quantity: number,
    tax: number
}
interface ProductBatch {
    id: number;
    date: string;
    time: string;
    quantity: number;
    batchNumber: string;
    expiry: string;
    costPrice: number;
    sellingPrice: number;
    hsnCode: string;
    category: string;
    distributors: string[];
    productId: number;
    product: Products;
    maxRetialPrice:number;
}

function useProductfetch(id: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${id}`, fetcher, { revalidateOnFocus: true });
    return {
        fetchedProducts: data,
        isLoading,
        error
    }
}
function DataFromInvoice(id: number | null, branchId: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/${id}/?branchId=${branchId}`, fetcher);
    return {
        data,
        isLoading,
        error
    }
}
interface CheckedItems {
    [key: number]: boolean;
}

const InvoiceReturnTable = () => {
    const { tableData, setTableData } = useContext(DataContext);
    const [selectedProductDetails, setSelectedProduct] = useState<Products>()
    const [products, setProducts] = useState<any[]>([]);
    const [otherData, setOtherData] = useState({});
    const appState = useAppSelector((state) => state.app)
    // const { tableData: items, setTableData: setItems } = useContext(DataContext);
    const [items, setItems] = useState<any[]>([]);
    const [discountStates, setDiscountStates] = useState(new Array(items.length).fill(false));
    const url = useSearchParams();
    const id = url.get('id');
    let invoiceData: any = null, isinvoiceDataLoading = false, isinvoiceDataError = false;
    if (id) {
        const { data, isLoading, error } = DataFromInvoice(Number(id), appState.currentBranchId);
        invoiceData = data;
        isinvoiceDataError = error;
        isinvoiceDataLoading = isLoading;
    }

    useEffect(() => {
        if (!isinvoiceDataLoading && invoiceData && !isinvoiceDataError) {
            //console.log(invoiceData);
            const { items, ...otherData } = invoiceData;
            setOtherData(otherData)
            const shallowDataCopy = [...items];
            const itemData = shallowDataCopy.map((item: any) => ({
                id: item.itemType === 'product' ? item.productBatchId : item.serviceId,
                productId: item.itemType === 'product' ? item.productId : null,
                serviceId: item.itemType === 'service' ? item.serviceId : null,
                itemType: item.itemType,
                itemName: item.name,
                quantity: item.quantity,
                defaultUnit:item.itemType==='product'?item.products.defaultUnit : "",
                unitPrice: item.itemType === 'product' ? item.productBatch?.costPrice : item.sellingPrice,
                tax: item.taxAmount,
                discount: item.discount,
                expiry: item.itemType === 'product' ? item.productBatch.expiry : "",
                batchNumber: item.itemType === 'product' ? item.productBatch.batchNumber : "",
                serviceProvider:item.itemType==='service'?item.serviceProvider:null,
                freeQuantity: item.freeQuantity,
                maxRetailPrice: item.itemType === 'product' ? item.productBatch.sellingPrice : item.sellingPrice
            }));
            setItems(itemData);

            //console.log("These are the items", items)

        }
    }, [invoiceData]);
    const taxOptions = [
        { value: 'Tax excl.', label: 'Tax excl.' },
        { value: 'Tax incl.', label: 'Tax incl.' }
    ];

    const gstOptions = [
        { value: 0.05, label: "GST@5%" },
        { value: 0.08, label: "GST@8%" },
        { value: 0.18, label: "GST@18%" },
        { value: 0.20, label: "GST@20%" },
    ]

    const category = [
        { value: "Utilities", label: "Utilities" },
        { value: "Rent", label: "Rent" },
        { value: "Medical Supplies", label: "Medical Supplies" },
        { value: "Repair and Maintainance", label: "Repair and Maintainance" },
        { value: "Payroll", label: "Payroll" },
        { value: "Inventory", label: "Inventory" },
        { value: "Other", label: "Other" },
    ]

    const [disableButton, setDisableButton] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);


    const handleQuantityDecClick = (itemId: any) => {
        setItems((prevItems: any) =>
            prevItems.map((item: any) => {
                if (item.id === itemId && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
        );
        setCheckedItemList((prevItems: any) =>
            prevItems.map((item: any) => {
                if (item.id === itemId && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
        );
    };

    const handleQuantityIncClick = (itemId: any) => {
        setItems((prevItems: any) =>
            prevItems.map((item: any) => {
                if (item.id === itemId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        );
        setCheckedItemList((prevItems: any) =>
            prevItems.map((item: any) => {
                if (item.id === itemId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        );
    };



    const handleInputChange = (itemId: number, value: string) => {
        const quantity = parseInt(value, 10);
        if (!isNaN(quantity) && quantity >= 0) {
            setItems((prevItems: any) =>
                prevItems.map((item: any) => {
                    if (item.id === itemId) {
                        return { ...item, quantity };
                    }
                    return item;
                })
            );
            
        }
    };

    const handleItemsDataChange = useCallback((index: number, field: string, value: string | number) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
        // console.log(items)
    }, [items]);

    const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
    const [checkedItemList, setCheckedItemList] = useState<any[]>([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (id !== null) {
                setItems(items);
                if (checkedItemList.length > 0) setTableData(checkedItemList);
            }
        }, 50);
    
        return () => clearTimeout(timeout);
    }, [id, checkedItems, items]);
    // useEffect(() => {
    //     if (id !== null) {
    //         setItems(items);
    //         if(items.length==0){
    //             console.log("no items found");
    //         }
    //         else{
    //             console.log(items);
    //         }
    //         console.log(id);
    //         if (checkedItemList.length > 0) setTableData(checkedItemList);
    //     }
    // }, [id, checkedItems, items]);
    





    const handleCheckboxChange = useCallback((id: number) => {
        setCheckedItems(prevState => {
            const newCheckedItems = {
                ...prevState,
                [id]: !prevState[id]
            };

            const filteredItems = items.filter(item => newCheckedItems[item.id] === true);
            setTableData(filteredItems);
            setCheckedItemList(filteredItems);
            console.log(filteredItems);
            return newCheckedItems;
        });
    }, [items]);




    return (
        <>
            <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100 rounded-lg border border-solid border-borderGrey">
                <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-t-0 border-r-0 border-l-0 border-solid border-borderGrey justify-end items-center gap-6 flex">

                    {/* <Button
                        variant="solid"
                        className="capitalize h-9 flex border-none bg-black px-4 py-2.5 text-white rounded-md cursor-pointer">
                        <div className='flex'><Image src={addicon} alt='addicon' className='w-6 h-6 ' /></div>New Product 
                    </Button> */}

                </div>
                <div className="flex-col w-full pr-[16px] pl-[16px] pt-[20px] overflow-auto max-h-[40rem]">
                    <InvoiceReturnHeader existingHeaderData={otherData} invoiceData={invoiceData}/>
                    <div>
                        <div className="w-full rounded-md border border-solid border-borderGrey">
                            <div className="w-full h-[84px] p-6 bg-white rounded-t-md  justify-between items-center gap-6 flex border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey">
                                <div className="text-gray-500 text-lg font-medium ">
                                    Select the items that you want to return along with their return quantity and unit price.
                                </div>


                                <div className="flex items-center justify-center ">

                                    {/* <Button onClick={handleAddItem} className='cursor-pointer text-white flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-md border-0 outline-none'>
                                    <div className='w-4 h-4 mb-3 mr-2'>
                                        <Image src={addicon} alt='addicon' />
                                    </div>
                                   
                                        Add Item
                                    
                                </Button> */}
                                </div>

                            </div>
                            <div className="flex">
                                <div className="w-full overflow-x-auto overflow-y-hidden">
                                    <div className='flex w-[180%] justify-evenly items-center box-border bg-gray-100 h-12  text-gray-500 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey'>
                                        <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[5rem]'></div>
                                        <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[5rem]'>No.</div>
                                        <div className=' flex text-gray-500 text-base font-medium w-[18rem]'>Name</div>
                                        <div className=' flex text-textGreen text-base font-bold w-[20rem]'>Return Quantity</div>
                                        <div className=' flex text-textGreen text-base font-bold w-[12rem]'>Unit Price</div>
                                        <div className=' flex text-gray-500 text-base font-medium w-[15rem]'>Batch No./Providers</div>
                                        <div className=' flex text-gray-500 text-base font-medium w-[15rem]'>Bar Code</div>
                                       
                                        <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Subtotal</div>
                                      
                                        <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Tax %</div>
                                        <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Tax Amt.</div>
                                        <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Discount %</div>
                                        <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Discount Amt.</div>
                                        <div className=' flex text-gray-500 text-base font-medium w-1/12'></div>

                                    </div>

                                    {items.map((item, index) => (
                                        <div
                                            key={index + 1}
                                            className={`flex justify-evenly items-center w-[180%] box-border bg-white border-t-0 border-r-0 border-l-0 border-b border-solid border-gray-200 h-12 ${checkedItems[item.id] ? 'text-textGrey2 font-bold' : 'text-textGrey2 font-medium'}`}
                                        >
                                            <div className='flex text-base  px-[10px] w-[5rem] items-center justify-center'>
                                                <input
                                                    type="checkbox"
                                                    className="accent-teal-500 w-4 h-4"
                                                    checked={checkedItems[item.id] || false}
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                />
                                            </div>
                                            <div className=' flex text-textGrey2 text-base  px-[10px] w-[5rem]'>{index + 1}.</div>
                                            <div className=' flex text-textGrey2 text-base  w-[18rem] '>
                                                {item.itemName}
                                            </div>

                                            <div className=' flex text-textGrey2 text-base  w-[20rem] items-center gap-2'>
                                                <div className='flex items-center text-textGrey2 text-base  gap-1 bg-white'>
                                                    <button className="border-0 rounded-md cursor-pointer" onClick={() => handleQuantityDecClick(item.id)}>
                                                        <Image className='rounded-md w-6 h-4' src={Subtract} alt="-"></Image>
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                                                        className={`w-[3rem] text-center border border-solid border-borderGrey h-8  rounded-md text-textGrey2  text-base ${checkedItems[item.id] ? 'text-textGrey2 font-bold' : 'text-textGrey2 font-medium'}`}
                                                        ref={index === items.length - 1 ? inputRef : null}
                                                    />

                                                    {/* {item.quantity} */}
                                                    <button className="border-0 rounded-md cursor-pointer" onClick={() => handleQuantityIncClick(item.id)}>
                                                        <Image className="rounded-md w-6 h-4" src={Add} alt="+"></Image>
                                                    </button>
                                                </div>
                                                <span className="text-textGrey2  text-base">{item?.defaultUnit}</span>
                                            </div>

                                            <div className=' flex text-gray-500 text-base  w-[12rem]'>
                                                ₹ {item.unitPrice}
                                                {/* <input
                                            type="number"
                                            className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2  text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                        /> */}
                                            </div>

                                            <div className=' flex text-gray-500 text-base  w-[15rem]'>
                                                {item.itemType==='product' ? item.batchNumber : item.serviceProvider}
                                                {/* <input
                                            type="number"
                                            className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2  text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                        /> */}
                                            </div>





                                           
                                            <div className=' flex text-gray-500 text-base  w-[15rem]'>
                                                <div className="customDatePickerWidth1">
                                                    {item.itemType === 'product' ? formatDateAndTime(item.expiry).formattedDate : ""}
                                                </div>
                                            </div>
                                            <div className=' flex text-textGrey2 text-base  w-[12rem] items-center gap-1'>
                                                ₹ {item.quantity * item.unitPrice}
                                                {/* <input
                                        type="number"
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2  text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    /> */}
                                            </div>
                                           
                                            <div className='flex text-textGrey2 text-base  w-[12rem] items-center gap-1'>
                                                {item.tax * 100}%
                                            </div>
                                            <div className=' flex text-textGrey2 text-base  w-[12rem] items-center gap-1'>
                                                ₹ {(item.tax * item.quantity * item.unitPrice).toFixed(2)}
                                                {/* <input
                                        type="number"
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2  text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    /> */}
                                            </div>
                                            <div className=' flex text-textGrey2 text-base  w-[12rem] items-center gap-1'>
                                                {item.discount ? item.discount : 0}
                                                {/* <input
                                        type="number"
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2  text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    /> */}
                                                %
                                            </div>

                                            <div className=' flex text-textGrey2 text-base  w-[12rem] items-center gap-1'>
                                                ₹ {(item.discount / 100) * item.unitPrice * item.quantity}
                                                {/* <input
                                        type="number"
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2  text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    /> */}
                                            </div>
                                            <div className='w-1/12 flex items-center text-neutral-400 text-base  gap-[12px]'>

                                            </div>
                                        </div>
                                    ))}

                                    <div className='flex  w-[180%] justify-evenly items-center box-border bg-gray-100 h-12 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey py-5  text-textGrey2 '>
                                        <div className=' flex text-gray-500 text-base font-bold px-[10px] w-[5rem]'></div>
                                        <div className=' flex text-gray-500 text-base font-bold px-[10px] w-[5rem]'></div>
                                        <div className=' flex text-gray-500 text-base font-bold w-[18rem]'>Total</div>

                                        <div className=' flex text-gray-500 text-base font-bold w-[20rem]'>{items.reduce((acc, item) => checkedItems[item.id] ? acc + item.quantity : acc, 0) ||
                                            0} Items</div>
                                        <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                                        <div className=' flex text-gray-500 text-base font-bold w-[15rem]'></div>
                                        <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                                        <div className=' flex text-gray-500 text-base font-bold w-[15rem] px-2'></div>
                                        <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹{items.reduce((acc, item) => checkedItems[item.id] ? acc + (item.quantity * Number(item.unitPrice)) : acc, 0).toFixed(2) ||
                                            0}</div>
                                        <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹{items.reduce((acc, item) => checkedItems[item.id] ? acc + Number(item.maxRetailPrice) : acc, 0).toFixed(2) ||
                                            0}</div>
                                        <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                                        <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹{items.reduce((acc, item) => checkedItems[item.id] ? acc + (item.tax) * (item.quantity * Number(item.unitPrice)) : acc, 0).toFixed(2) ||
                                            0}</div>
                                        <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                                        <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹{items.reduce((acc, item) => checkedItems[item.id] ? acc + (item.discount / 100) * (item.quantity * Number(item.unitPrice)) : acc, 0).toFixed(2) ||
                                            0}</div>
                                        <div className=' flex text-gray-500 text-base font-bold w-1/12'></div>
                                    </div>
                                </div>
                                <div className="flex-col shadow-left">
                                    <div className="flex items-center justify-center  w-[15rem] h-12 text-gray-500 border-t-0 border-r-0 border-l border-b border-solid border-borderGrey">
                                        <div className=' flex text-gray-500 text-base font-medium '>Total</div>
                                    </div>
                                    {items.map((item: any, index: number) => (
                                        <div key={item.id} className="flex items-center justify-center  w-[10rem] box-border bg-white text-gray-500 border-t-0 border-r-0 border-l border-b border-solid border-gray-200 h-12">
                                            <div className=' flex text-gray-500 text-base font-medium'>{checkedItems[item.id] ? ((item.tax - (item.discount / 100) + 1) * (item.quantity * Number(item.unitPrice))).toFixed(2) : 0 ||
                                                0}</div>
                                        </div>
                                    ))}
                                    <div className=' flex text-textGreen text-base font-bold w-[10rem] h-12 items-center justify-center'>₹{items.reduce((acc, item) => checkedItems[item.id] ? acc + (item.tax - (item.discount / 100) + 1) * (item.quantity * Number(item.unitPrice)) : acc, 0).toFixed(2) ||
                                        0}</div>
                                </div>
                            </div>


                        </div>
                    </div>

                    <InvoiceReturnTotalAmount otherData={otherData} />
                </div>
                <InvoiceReturnBottomBar invoiceData={invoiceData}/>
            </div>

        </>
    )

}

export default InvoiceReturnTable;