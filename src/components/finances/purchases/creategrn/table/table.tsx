"use client"

import delicon from "../../../../../assets/icons/finance/1. Icons-27.svg"
import addicon from "../../../../../assets/icons/finance/add.svg"
import sellicon from "../../../../../assets/icons/finance/sell.svg"
import addicon1 from "../../../../../assets/icons/finance/add (3).svg"
import calicon from "../../../../../assets/icons/finance/calendar_today.svg"

import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';


import Subtract from "../../../../../assets/icons/finance/Subtract.svg"
import Add from "../../../../../assets/icons/finance/add (2).svg"
import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import Select from 'react-select';
import Image from "next/image"
import { Button } from "@nextui-org/react";
import CreateGrnBottomBar from "./bottombar"
import CreateGrnTotalAmount from "./totalamount"
import CreateGrnHeader from "./header"
import { useAppSelector } from "@/lib/hooks";
import formatDateAndTime from '@/utils/formateDateTime';
import { Tax } from '@prisma/client';
import useSWR from 'swr';
import { DataContext } from "./DataContext"
import { useSearchParams } from "next/navigation"
import Popup from '../../../../inventory/product/producttable/newproductpopup';

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
}

function useProductfetch (id: number | null) {
    const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${id}`,fetcher,{revalidateOnFocus:true});
   return {
    fetchedProducts:data,
    isLoading,
    error
   }
}
function DataFromOrder(id:number|null,branchId:number|null){
    const {data,error,isLoading} =useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/${id}/?branchId=${branchId}`,fetcher);
    return {
       data,
       isLoading,
       error
    }
}
const CreateGrnTable = () => {

    const { tableData, setTableData } = useContext(DataContext);
    const [selectedProductDetails,setSelectedProduct]= useState<Products>()
    const [products, setProducts] = useState<any[]>([]);
    const [otherData, setOtherData] = useState({});
    const appState = useAppSelector((state) => state.app)
    const { tableData: items, setTableData: setItems } = useContext(DataContext);   
    const [discountStates, setDiscountStates] = useState(new Array(items.length).fill(false));
    const url= useSearchParams();
    const id=url.get('id');
    let orderData:any=null,isorderDataLoading=false,isorderDataError=false; 
    const [showPopup, setShowPopup] = React.useState(false);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    }
    if(id){
        const {data,isLoading,error}=DataFromOrder(Number(id),appState.currentBranchId);
        orderData=data;
        isorderDataError=error;
        isorderDataLoading=isLoading;        
    }

    useEffect(()=>{
            if (!isorderDataLoading && orderData && !isorderDataError) {
                const {items,...otherData}=orderData;
                setOtherData(otherData)
              const shallowDataCopy = [...items]; 
              const itemData = shallowDataCopy.map((item: any) => ({
                id: item.productId,
                productId:item.productId,
                itemName:item.name,
                quantity:item.quantity,
                unitPrice:item.sellingPrice,
                gst:item.taxAmount,
                discountPercent:item.discount
              }));
              setItems(itemData);
              
            }
          }, [orderData]); 
    const taxOptions = [
        { value: 'Tax excl.', label: 'Tax excl.' },
        { value: 'Tax incl.', label: 'Tax incl.' }
    ]; 
    
    const gstOptions = [
        {value: 0.05, label: "GST@5%"},
        {value: 0.08, label: "GST@8%"},
        {value: 0.18, label: "GST@18%"},
        {value: 0.20, label: "GST@20%"},
    ]

    const category = [
        {value: "Utilities", label: "Utilities"},
        {value: "Rent", label: "Rent"},
        {value: "Medical Supplies", label: "Medical Supplies"},
        {value: "Repair and Maintainance", label: "Repair and Maintainance"},
        {value: "Payroll", label: "Payroll"},
        {value: "Inventory", label: "Inventory"},
        {value: "Other", label: "Other"},
    ]

    const [disableButton, setDisableButton] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);


    const {fetchedProducts,isLoading,error}=useProductfetch(appState.currentBranchId);
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
         setProducts(formattedProducts);
     }
    
    },[fetchedProducts])
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
const handleAddItem= useCallback(() => {
    setItems([...items, {}]);
}, [items]);

    const handleQuantityDecClick = (itemId: any) => {
        setItems((prevItems:any) =>
            prevItems.map((item:any) => {
                if (item.id === itemId && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
        );
    };
    
    const handleQuantityIncClick = (itemId: any) => {
        setItems((prevItems:any) =>
            prevItems.map((item:any) => {
                if (item.id === itemId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        );
    };
    const handleFreeQuantityDecClick = (itemId: any) => {
        setItems((prevItems:any) =>
            prevItems.map((item:any) => {
                if (item.id === itemId && item.freeQuantity > 1) {
                    return { ...item, freeQuantity: item.freeQuantity - 1 };
                }
                return item;
            })
        );
    };
    
    const handleFreeQuantityIncClick = (itemId: any) => {
        setItems((prevItems:any) =>
            prevItems.map((item:any) => {
                if (item.id === itemId) {
                    return { ...item, freeQuantity: item.freeQuantity + 1 };
                }
                return item;
            })
        );
    };
    const handleDiscountSelect= (selectedDiscount:number,index:number)=>{
        const updatedItems=[...tableData];
        console.log(selectedDiscount);
        updatedItems[index]={
            ...updatedItems[index],
            discountPercent:selectedDiscount,
            discountAmount:Number(selectedDiscount/100)*updatedItems[index]['unitPrice']*updatedItems[index]['quantity']
        };
        setTableData(updatedItems);
    }
    const handleDiscountChange= (discount:number,index:number)=>{
        const updatedItems=[...tableData];
        updatedItems[index]={
            ...updatedItems[index],
            discountAmount:discount,
            discountPercent:Number((discount/Number(updatedItems[index]['unitPrice']*updatedItems[index]['quantity'])).toFixed(4))*100
        };
        setTableData(updatedItems);
    }
    const handleInputChange = useCallback((index: number, value: any,field: string) => {   
        const updatedItems = [...items];
            updatedItems[index][field] =Number(value);
        setItems(updatedItems);
    },[items]);
    const handleFreeInputChange = (itemId: number, value: string) => {
        const quantity = parseInt(value, 10);
        if (!isNaN(quantity) && quantity >= 0) {
            setItems((prevItems:any) =>
                prevItems.map((item:any) => {
                    if (item.id === itemId) {
                        return { ...item, freeQuantity:quantity };
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
        console.log(items)
    }, [items]);

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
    
           console.log("this is the item",items)
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


    
    console.log("otherdatatattatata", otherData)

    return (
        <>
            <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100 rounded-lg border border-solid border-borderGrey">
            <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-t-0 border-r-0 border-l-0 border-solid border-borderGrey justify-end items-center gap-6 flex">
                    
                    
                    

                    <Button
                        variant="solid"
                        className="capitalize h-9 flex border-none bg-black px-4 py-2.5 text-white rounded-md cursor-pointer" onClick={togglePopup}>
                        <div className='flex'><Image src={addicon} alt='addicon' className='w-6 h-6 ' /></div>New Product 
                    </Button>
                    
                </div>
                <div className="flex-col w-full pr-[16px] pl-[16px] pt-[20px] overflow-auto max-h-[40rem] container">
                    <CreateGrnHeader existingHeaderData={otherData} />
                <div>
                <div className="w-full rounded-md border border-solid border-borderGrey">
                    <div className="w-full h-[84px] p-6 bg-white rounded-t-md  justify-between items-center gap-6 flex border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey">
                        <div className="text-gray-500 text-xl font-medium ">
                            Items
                        </div>
                            

                            <div className="flex items-center justify-center ">
                               
                                <Button  className='cursor-pointer text-white flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-md border-0 outline-none' onClick={handleAddItem}>
                                    <div className='w-4 h-4 mb-3 mr-2'>
                                        <Image src={addicon} alt='addicon' />
                                    </div>
                                   
                                        Add Item
                                    
                                </Button>
                            </div>

                    </div>
                    <div className="flex">
                    <div className="w-full overflow-x-auto overflow-y-hidden container">
                        <div className='flex w-[180%] justify-evenly items-center box-border bg-gray-100 h-12  text-gray-500 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey'>
                            <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[5rem]'>No.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[18rem]'>Name</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[15rem]'>Batch No.</div>

                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Bar Code</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[15rem] px-2'>Exipry Date</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[20rem]'>Quantity</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[20rem]'>Free Quantity</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Unit Price</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Subtotal</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>MRP</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Tax %</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Tax Amt.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Discount %</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Discount Amt.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-1/12'></div>
                        
                        </div>
                        
                        {items.map((item:any,index:number) => (
                            <div key={index+1} className='flex justify-evenly items-center w-[180%] box-border bg-white border-t-0 border-r-0 border-l-0 border-b border-solid border-gray-200 text-gray-400 h-12'>
                                <div className=' flex text-textGrey2 text-base font-medium px-[10px] w-[5rem]'>{index+1}.</div>
                                    <div className=' flex text-textGrey2 text-base font-medium w-[18rem] '>
                                    {id === null ? (
                                    <Select
                                        className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0 absolute"
                                        classNamePrefix="select"
                                        // value={products.find((prod) => prod.value.id === item.productId)}
                                        isClearable={false}
                                        isSearchable={true}
                                        name="itemName"
                                        options={products}
                                        onChange={(selectedProduct: any) => handleProductSelect(selectedProduct, index)}
                                        menuPortalTarget={document.body}
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                border: state.isFocused ? 'none' : 'none',
                                            }),
                                            menuPortal: base => ({ ...base, zIndex: 9999 })
                                        }}
                                    />):(
                                        item.itemName
                                  )}
                                    </div>

                                    <div className=' flex text-gray-500 text-base font-medium w-[15rem]'>
                                    <input
                                        type="text"
                                        value={item.batchNumber}
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                       onChange={(e) => handleItemsDataChange(index,'batchNumber', e.target.value)}
                                       name={`batchNumber-${index+1}`}

                                    />
                                    </div>
                                    <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>
                                    <input
                                        type="text"
                                        value={item.barCode}
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                       onChange={(e) => handleItemsDataChange(index,'barCode', e.target.value)}
                                       name={`barCode-${index+1}`}

                                    />
                                    </div>
                                    <div className=' flex text-gray-500 text-base font-medium w-[15rem]'>
                                    <div className="customDatePickerWidth1">
                                    <DatePicker
                                        className="w-full"
                                        selected={item.expiry}
                                        onChange={(date:any) =>{ 
                                            handleItemsDataChange(index,"expiry",date)}}
                                        name={`expiry-${index}`}
                                        calendarClassName="react-datepicker-custom"
                                        customInput={
                                            <div className='relative'>
                                                <input
                                                    className="w-full h-9 text-textGrey1 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                                    value={(item.expiry)?.toLocaleDateString()}
                                                    readOnly
                                                />
                                                <Image
                                                    src={calicon}
                                                    alt="Calendar Icon"
                                                    className="absolute right-0 top-2 cursor-pointer"
                                                    width={50}
                                                    height={20}
                                                />
                                            </div>
                                        }
                                    />
                                    </div>
                                    </div>

                            <div className=' flex text-textGrey2 text-base font-medium w-[20rem] items-center gap-2'>
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
                                <span className="text-textGrey2 font-medium text-base">Strips</span>
                            </div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[20rem] items-center gap-2'>
                                <div className='flex items-center text-textGrey2 text-base font-medium gap-1 bg-white'>
                                    <button className="border-0 rounded-md cursor-pointer" onClick={() => handleFreeQuantityDecClick(item.id)}>
                                        <Image className='rounded-md w-6 h-4' src={Subtract} alt="-"></Image>
                                    </button>
                                    <input
                                        type="number"
                                        value={item.freeQuantity}
                                        onChange={(e) => handleFreeInputChange(item.id, e.target.value)}
                                        className="w-[3rem] text-center border border-solid border-borderGrey h-8  rounded-md text-textGrey2 font-medium text-base"
                                        ref={index === items.length - 1 ? inputRef : null}
                                    />
                                    
                                    {/* {item.quantity} */}
                                    <button className="border-0 rounded-md cursor-pointer" onClick={() => handleFreeQuantityIncClick(item.id)}>
                                        <Image className="rounded-md w-6 h-4" src={Add} alt="+"></Image>
                                    </button>
                                </div>
                                <span className="text-textGrey2 font-medium text-base">Strips</span>
                            </div>

                            <div className=' flex text-textGrey2 text-base font-medium w-[12rem]'>
                            ₹
                            <input
                                        type="number"
                                        value={item.unitPrice}
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                       onChange={(e) => handleItemsDataChange(index,'unitPrice', e.target.value)}
                                       name={`unitPrice-${index+1}`}

                                    />
                            </div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[12rem] items-center gap-1'>
                            ₹
                            <input
                                        type="number"
                                        value={item.quantity*Number(item.unitPrice)}
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                       onChange={(e) => handleItemsDataChange(index,'subTotal', e.target.value)}
                                       name={`subTotal-${index+1}`}

                                    />
                            </div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[12rem] items-center gap-1'>
                            ₹
                                <input
                                        type="number"
                                        value={item.maxRetailPrice}
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                       onChange={(e) => handleItemsDataChange(index,'maxRetailPrice', e.target.value)}
                                       name={`maxRetailPrice-${index+1}`}

                                    />
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
                                           { item.gst*100}%
                                        {/* )} */}
                                    </div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[12rem] items-center gap-1'>
                            ₹
                            <input
                                        type="number"
                                        value={(item.quantity*item.gst*Number(item.unitPrice)).toFixed(2)||0}
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                        onChange={(e) => handleItemsDataChange(index,'taxAmount', e.target.value)}
                                       name={`taxAmount-${index+1}`}
                                    />
                            </div>
                            <div className=' flex text-textGrey2 text-base font-medium w-[12rem] items-center gap-1'>
                            
                            <input
                                        type="number"
                                        value={item.discountPercent}
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                        onChange={(e) => handleDiscountSelect( Number(e.target.value),index)}
                                       name={`discountPercent-${index+1}`}
                                    />
                            %
                            </div>
                            
                            <div className=' flex text-textGrey2 text-base font-medium w-[12rem] items-center gap-1'>
                            ₹
                            <input
                                        type="number"
                                        value={item.discountAmount}
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                        onChange={(e) => handleDiscountChange(Number( e.target.value),index)}
                                       name={`discountAmount-${index+1}`}
                                    />
                            </div>
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
                        
                        <div className='flex  w-[125%] justify-evenly items-center box-border bg-gray-100 h-12 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey py-5  text-textGrey2 '>
                        <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[5rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[18rem]'>Total</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[15rem]'>{items.reduce((acc, item) => acc + item.quantity, 0) ||
                                                0} Items</div>

                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'>₹{items.reduce((acc, item) => acc + (item.quantity*Number(item.unitPrice)) , 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'>₹{items.reduce((acc, item) => acc + (item.gst)*(item.quantity*Number(item.unitPrice)) , 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'>₹{items.reduce((acc, item) => acc + (item.discountPercent/100)*(item.quantity*Number(item.unitPrice)) , 0).toFixed(2) ||
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
                        <div className=' flex text-gray-500 text-base font-medium'>{((item.gst-item.discountPercent/100+1)*(item.quantity*Number(item.unitPrice))).toFixed(2)||
                                                0}</div>
                    </div>
                    ))}
                    <div className=' flex text-textGreen text-base font-bold w-[10rem] h-12 items-center justify-center'>₹{items.reduce((acc, item) => acc + (item.gst-item.discountPercent/100+1)*(item.quantity*Number(item.unitPrice)) , 0).toFixed(2) ||
                                                0}</div>
                    </div>
                    </div>
                    

                </div>
                </div>

                <CreateGrnTotalAmount />
            </div>
            <CreateGrnBottomBar orderData={orderData}/>
        </div>
        {showPopup && <Popup onClose={togglePopup} />}
       
        </>
    )

}

export default CreateGrnTable;