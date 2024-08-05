'use client';
import DownArrow from '../../../../../assets/icons/finance/downArrow.svg';
import subicon from "../../../../../assets/icons/finance/1. Icons-26.svg"
import delicon from "../../../../../assets/icons/finance/1. Icons-27.svg"
import Subtract from "../../../../../assets/icons/finance/Subtract.svg"
import Add from "../../../../../assets/icons/finance/add (2).svg"
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
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())

interface Products{
    id :string,
    itemName:string,
    productBatch:ProductBatch[],
    hsnCode:string,
    quantity:number,
    tax:number
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
    productId:number;
    product:Products;
}
function useProductfetch (id: number | null) {
    const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${id}`,fetcher,{revalidateOnFocus:true});
   return {
    fetchedProducts:data,
    isLoading,
    error
   }
}
function useProductBatchfetch(id:number|null){
    const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/getAll/?branchId=${id}`,fetcher,{revalidateOnFocus:true});
    return {
        fetchedBathces:data,
        isBatchLoading:isLoading,
        batchError:error
    }
}
function DataFromInvoice(id:number|null,branchId:number|null){
    const {data,error,isLoading} =useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/${id}/?branchId=${branchId}`,fetcher);
    return {
       data,
       isLoading,
       error
    }
}
const NewsalesReturnTable = () => {
    const { tableData, setTableData } = useContext(DataContext);
    const [selectedProductDetails,setSelectedProduct]= useState<Products>()
    const [products, setProducts] = useState<any[]>([]);
    const [batches,setBatches] = useState<any[]>([]);
    const [filteredBatches,setFilteredBatches]=useState<any[]>([]);
    const [otherData, setOtherData] = useState({});
    const appState = useAppSelector((state) => state.app)
    const url= useSearchParams();
    const id=url.get('id');
    let invoiceData:any=null,isInvoiceDataLoading=false,isInvoiceDataError=false;
    const { tableData: items, setTableData: setItems } = useContext(DataContext);   
    if(id){
        const {data,isLoading,error}=DataFromInvoice(Number(id),appState.currentBranchId);
        invoiceData=data;
        isInvoiceDataError=error;
        isInvoiceDataLoading=isLoading;        
    }

    useEffect(()=>{
            if (!isInvoiceDataLoading && invoiceData && !isInvoiceDataError) {
                const {items,...otherData}=invoiceData;
                setOtherData(otherData)
              const shallowDataCopy = [...items]; 
              const itemData = shallowDataCopy.map((item: any) => ({
                productId: item.productBatch.productId,
                itemName:item.name,
                quantity:item.quantity,
                sellingPrice:item.sellingPrice,
                expiry:item.productBatch.expiry,
                batchNumber:item.productBatch.batchNumber,
                gst:item.productBatch.product.tax,
                id:item.productBatch.id
              }));
              setItems(itemData);
              
            }
          }, [invoiceData]); 
    
    const taxOptions = [
        { value: 'Tax excl.', label: 'Tax excl.' },
        { value: 'Tax incl.', label: 'Tax incl.' }
    ];

    const gstOptions = [
        { value: 0.18, label: Tax.GST_18 },
        { value: 0.09, label: Tax.GST_9 }
    ];

    
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
    const {fetchedProducts,isLoading,error}=useProductfetch(appState.currentBranchId);
    const {fetchedBathces,isBatchLoading,batchError}=useProductBatchfetch(appState.currentBranchId);
    useEffect(()=>{
     if(!isLoading&&products&&!error){
         const formattedProducts = fetchedProducts.map((product: Products) => ({
             value:{
                id: product.id,
                quantity:product.quantity,
                itemName:product.itemName,
                tax:product.tax
            },
             label: product.itemName,
         }));
         console.log(formattedProducts)
         setProducts(formattedProducts);
     }
     if(!batchError&&!isBatchLoading&&fetchedBathces){
        const formattedProductBatches=fetchedBathces.map((product:ProductBatch)=>({
            value:{
                id:product.id,
                productId:product.productId,
                quantity:1 ,
                batchNumber: product.batchNumber,
                expiry:  product.expiry,
                sellingPrice:  product.sellingPrice,
            },
            label:product.batchNumber
        }));
        console.log(formattedProductBatches)
        setBatches(formattedProductBatches)
    }
    },[fetchedProducts,fetchedBathces])
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

const handleInputChange = useCallback((index: number, value: any,field: string) => {   
    const updatedItems = [...items];
        updatedItems[index][field] =Number(value);
    setItems(updatedItems);
},[items]);

const handleProductSelect = useCallback(async (selectedProduct: any, index: number) => {
    console.log(selectedProduct);
    if (selectedProduct.value) {
      try {
        const data = products.find((product) => product.value.id === selectedProduct.value.id);
        setSelectedProduct(data);
        const updatedItems = [...items];
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: data.value.quantity,
          productId: selectedProduct.value.id,
          itemName: data.value.itemName,
          gst:data.value.tax
        };
        setItems(updatedItems);

      
        const productBatches = batches?.filter((batch) => batch.value.productId === selectedProduct.value.id).sort((a, b) => a.value.id - b.value.id);
        setFilteredBatches(productBatches);
        const defaultBatch = productBatches?.[0];
        setItems((prevItems) =>
          prevItems.map((item, itemIndex) =>
            itemIndex === index ? { ...item, id: defaultBatch?.value?.id,
                quantity: defaultBatch?.value?.quantity ,
                batchNumber: defaultBatch?.value?.batchNumber,
                expiry:  defaultBatch?.value?.expiry,
                sellingPrice:  defaultBatch?.value?.sellingPrice,
                productId:defaultBatch?.value?.productId } : item
          )
        );
      } catch (error) {
        console.error("Error fetching product details from API:", error);
      }
    }
  }, [items, products]);
const handleBatchSelect = useCallback(async (selectedProduct: any, index: number) => {
    if (selectedProduct.value) {
        try {
            
            const data = filteredBatches.find((batch)=>batch.value.id==selectedProduct.value.id);
            console.log(data)
            const updatedItems = [...items];
            updatedItems[index] = {
                ...updatedItems[index],
                id: data.value.id,
                quantity: data.value.quantity ,
                batchNumber: data.value.batchNumber,
                expiry:  data.value.expiry,
                sellingPrice:  data.value.sellingPrice,
                productId:data.value.productId
            };
            console.log("these are updated",updatedItems)
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
    if (id == null) {
        setItems(items);
        setTableData(items);  
    }
}, [id, items]);

   

    return (
        <>
            <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100 rounded-lg border border-solid border-borderGrey">
            <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-t-0 border-r-0 border-l-0 border-solid border-borderGrey justify-between items-center gap-6 flex">
                    <div>
                    {/* <div className='bg-[#FFF0E9] rounded-md px-2 py-2' >
                        <span className="text-[#FC6E20]  text-sm font-medium ">You’re owed: ₹</span>
                        <span className="text-[#FC6E20] text-sm font-bold ">2,124</span>
                    </div> */}
                    </div>
                    {/* <div className='flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-lg '> */}
                        {/* <Popover placement="bottom-end" showArrow offset={10}>
                            <PopoverTrigger> */}
                                <Button
                                    variant="solid"
                                    className="capitalize h-9 flex border-none bg-black px-4 py-2.5 text-white rounded-md cursor-pointer">
                                    <div className='flex pr-2'><Image src={addicon} alt='addicon' className='w-6 h-6 ' /></div>New Client</Button>
                            {/* </PopoverTrigger>
                            <PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">
                                <div className="flex flex-col ">
                                    <div className='flex flex-col'>
                                        <Link className='no-underline flex item-center' href='/finance/overview'>
                                            <div className='text-base p-4   text-white flex '>
                                                <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Sales Invoice</div>
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
                        </Popover> */}
                    {/* </div> */}
                </div>
                <div className="flex-col w-full pr-[16px] pl-[16px] pt-[20px]">
                    <NewsalesReturnHeader existingHeaderData={otherData}/>
                    <div className="w-full rounded-md border border-solid border-borderGrey">
                    <div className="w-full h-[84px] p-6 bg-white rounded-t-md  justify-between items-center gap-6 flex border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey">
                            <div className="text-gray-500 text-xl font-medium ">Items & Services</div>
                            <div className="flex items-center justify-center ">
                                {/* <div className="flex items-center justify-center mr-2">
                                    <div className="pr-[4px]">
                                        <input value="test" type="checkbox" className="border-0" onChange={handleCheckBoxChange} />
                                    </div>
                                    <div className="text-neutral-400 text-base font-bold ">Price Range</div>
                                </div> */}
                                <Button onClick={handleAddItem} className='cursor-pointer text-white flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-md border-0 outline-none'>
                                    <div className='w-4 h-4 mb-3 mr-2'>
                                        <Image src={addicon} alt='addicon' />
                                    </div>
                                   
                                        Add Item
                                    
                                </Button>
                            </div>
                        </div>
                        <div>
                        <div className='flex w-full justify-evenly items-center box-border bg-gray-100 h-12  text-gray-500 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey'>
                                <div className='flex text-gray-500 text-base font-medium w-[3rem]'>No.</div>
                                <div className='flex text-gray-500 text-base font-medium w-[15rem]'>Name</div>
                                <div className='flex text-gray-500 text-base font-medium w-[10rem]'>Batch No.</div>
                                <div className='flex text-gray-500 text-base font-medium w-[10rem]'>Selling Price</div>
                                
                                <div className='flex text-gray-500 text-base font-medium w-[10rem]'>Quantity</div>
                                
                                
                                <div className='flex text-gray-500 text-base font-medium w-[10rem]'>Tax %</div>
                                <div className='flex text-gray-500 text-base font-medium  w-[10rem]'>Tax Amt.</div>
                                <div className='flex text-gray-500 text-base font-medium w-1/12'>Total</div>
                                <div className='flex text-gray-500 text-base font-medium w-1/12 '></div>
                            </div>
                            {items.map((item:any,index:number) => (
                                <div key={index+1} className='flex justify-evenly items-center w-full box-border bg-white border border-solid border-gray-200 text-gray-400 py-2'>
                                    <div className='w-[3rem] flex items-center text-neutral-400 text-base font-medium '>{index+1}.</div>
                                    <div className='w-[15rem] flex items-center text-neutral-400 text-base font-medium'>
                                    {id === null ? (
                                    <Select
                                        className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0"
                                        classNamePrefix="select"
                                        value={products.find((prod) => prod.value.id === item.productId)}
                                        isClearable={false}
                                        isSearchable={true}
                                        name="itemName"
                                        options={products}
                                        onChange={(selectedProduct: any) => handleProductSelect(selectedProduct, index)}
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                border: state.isFocused ? 'none' : 'none',
                                            }),
                                        }}
                                    />):(
                                          item.itemName
                                    )}
                                    </div>
                                    <div className='w-[10rem] flex-col items-center text-neutral-400 text-base font-medium'>
                                    {id === null ? ( 
                                        <Select
                                        className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0"
                                        classNamePrefix="select"
                                        value={batches.find((prod) => prod.value.id === item.id)}
                                        isClearable={false}
                                        isSearchable={true}
                                        name={`batchNumber=${index}`}
                                        options={filteredBatches}
                                        onChange={(selectedProduct: any) => handleBatchSelect(selectedProduct, index)}
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                border: state.isFocused ? 'none' : 'none',
                                            }),
                                        }}
                                        />
                                    ) : (
                                        item.batchNumber
                                            )}
                                    <div className="text-neutral-400 text-[13px] font-medium  px-2">{formatDateAndTime(item.expiry).formattedDate}</div>
                                </div>
                                <div className='w-[10rem] flex items-center text-neutral-400 text-base font-medium'>
                                    {item.sellingPrice}
                                    <Select
                                        className="text-textGrey1 text-sm font-medium "
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
                                
                                <div className='w-[10rem] flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                <div className='flex items-center text-textGrey2 text-base font-medium gap-1 bg-white'>
                                    <button className="border-0 rounded-md cursor-pointer" onClick={() => handleQuantityDecClick(item.id)}>
                                        <Image className='rounded-md w-6 h-4' src={Subtract} alt="-"></Image>
                                    </button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleInputChange(index, e.target.value,'quantity')}
                                        className="w-[3rem] text-center border border-solid border-borderGrey h-8  rounded-md text-textGrey2 font-medium text-base"
                                        name={`quantity-${index+1}`}
                                    />
                                    
                                    {/* {item.quantity} */}
                                    <button className="border-0 rounded-md cursor-pointer" onClick={() => handleQuantityIncClick(item.id)}>
                                        <Image className="rounded-md w-6 h-4" src={Add} alt="+"></Image>
                                    </button>
                                </div>
                                </div>
                                
                                <div className='w-[10rem] flex items-center text-neutral-400 text-base font-medium'>
                                        {/* { id==null?(
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
                                        />):( */}
                                           { item.gst}
                                        {/* )} */}
                                    </div>
                                <div className='w-[10rem] flex items-center text-neutral-400 text-base font-medium'>{`₹${((item?.sellingPrice*item?.quantity * item?.gst)||0).toFixed(2)}`}</div>
                                    <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium'>{`₹${((item?.quantity * item?.sellingPrice +item?.sellingPrice*item.quantity*item.gst)||0).toFixed(2)}`}</div>
                                    <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                        <button className="border-0">
                                            <Image src={sellicon} alt="sell" ></Image>
                                        </button>
                    
                                        <button className="border-0" onClick={() => handleDeleteRow(index)}>
                                            <Image src={delicon} alt="delete" ></Image>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className='flex w-full justify-evenly items-center box-border bg-gray-100 h-12 border-b border-neutral-400 text-gray-500 rounded-b-md'>
                                <div className='flex text-gray-500 text-base font-medium w-[3rem]'></div>
                                <div className='flex text-gray-500 text-base font-medium w-[15rem]'>Total</div>
                                <div className='flex text-gray-500 text-base font-medium w-[10rem]'></div>
                                <div className='flex text-gray-500 text-base font-medium w-[10rem]'></div>
                                <div className='flex text-gray-500 text-base font-medium w-[10rem]'>{(items.reduce((acc:any, item:any) => acc + item.quantity, 0))||0} Items</div>
                                
                                <div className='flex text-gray-500 text-base font-medium w-[10rem]'>
                                    {/* <Select
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
                                    /> */}
                                </div>
                                <div className='flex text-gray-500 text-base font-medium w-[10rem]'>{`₹${(items.reduce((acc:any, item:any) => acc + item.quantity * item.gst*item.sellingPrice , 0)||0).toFixed(2)}`}</div>
                                <div className='flex text-gray-500 text-base font-medium w-1/12' >{`₹${(items.reduce((acc:any, item:any) => acc + item.quantity * item.sellingPrice +item.quantity*item.gst*item.sellingPrice, 0)||0).toFixed(2)}`}</div>
                                <div className='flex text-gray-500 text-base font-medium w-1/12'></div>
                            </div>
                        </div>
                    </div>
                        <NewsalesReturnTotalAmout />
                </div>
                <NewsalesReturnBottomBar invoiceData={otherData}/>
            </div>



        </>

    )
}

export default NewsalesReturnTable;
