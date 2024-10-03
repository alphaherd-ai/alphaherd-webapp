"use client"


import 'react-datepicker/dist/react-datepicker.css';

import { Popover, PopoverTrigger, PopoverContent, Button, Spinner, select } from "@nextui-org/react";
import addicon from "../../../../../assets/icons/finance/add.svg"
import Subtract from "../../../../../assets/icons/finance/Subtract.svg"
import Add from "../../../../../assets/icons/finance/add (2).svg"
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import Image from "next/image"
import NewPurchaseReturnBottomBar from "./bottombar"
import NewPurchaseReturnTotalAmount from "./totalamount"
import NewPurchaseReturnHeader from "./header"
import delicon from "../../../../../assets/icons/finance/1. Icons-27.svg"
import sellicon from "../../../../../assets/icons/finance/sell.svg"
import { useAppSelector } from "@/lib/hooks";
import formatDateAndTime from '@/utils/formateDateTime';
import { Tax } from '@prisma/client';
import useSWR from 'swr';
import ClientPopup from '@/components/database/client/newclientpopoup';
import { DataContext } from "./DataContext"
import { useSearchParams } from "next/navigation"
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
function useProductBatchfetch(id:number|null){
    const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/getAll/?branchId=${id}`,fetcher,{revalidateOnFocus:true});
    return {
        fetchedBathces:data,
        isBatchLoading:isLoading,
        batchError:error
    }
}
function DataFromGRN(id:number|null,branchId:number|null){
    const {data,error,isLoading} =useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/${id}/?branchId=${branchId}`,fetcher);
    return {
       data,
       isLoading,
       error
    }
}
// interface CheckedItems {
//     [key: number]: boolean;
// }

const NewPurchaseReturnTable = () => {
    const { tableData, setTableData } = useContext(DataContext);
    const [selectedProductDetails,setSelectedProduct]= useState<Products>()
    const [products, setProducts] = useState<any[]>([]);
    const [otherData, setOtherData] = useState({});
    const appState = useAppSelector((state) => state.app)
    // const { tableData: items, setTableData: setItems } = useContext(DataContext);
    //const [items,setItems]=useState<any[]>([]);   
    const [batches,setBatches] = useState<any[]>([]);
    const [filteredBatches,setFilteredBatches]=useState<any[]>([]);
    const { tableData: items, setTableData: setItems } = useContext(DataContext);   
   // const [discountStates, setDiscountStates] = useState(new Array(items.length).fill(false));
    const url= useSearchParams();
    const id=url.get('id');
    
    //const { tableData: items, setTableData: setItems } = useContext(DataContext);   
    let grnData:any=null,isgrnDataLoading=false,isgrnDataError=false; 
    if(id){
        const {data,isLoading,error}=DataFromGRN(Number(id),appState.currentBranchId);
        grnData=data;
        isgrnDataError=error;
        isgrnDataLoading=isLoading;        
    }
    

    useEffect(()=>{
            if (!isgrnDataLoading && grnData && !isgrnDataError) {
                const {items,...otherData}=grnData;
                setOtherData(otherData)
              const shallowDataCopy = [...items]; 
              const itemData = shallowDataCopy.map((item: any) => ({
                id: item.productBatchId,
                productId:item.productId,
                itemName:item.name,
                quantity:item.quantity,
                unitPrice:item.productBatch.costPrice,
                tax:item.taxAmount,
                discount:item.discount,
                expiry:item.productBatch.expiry,
                batchNumber:item.productBatch.batchNumber,
                freeQuantity:item.freeQuantity,
                maxRetailPrice:item.productBatch.sellingPrice
              }));
              setItems(itemData);

              console.log("These are the items",items)
              
            }
          }, [grnData]); 

          const [discountStates, setDiscountStates] = useState(new Array(items.length).fill(false));
          const discountOptions= [
              {value:0.05,label:"5% off"},
              {value:0.08,label:"8% off"},
              {value:0.10, label:"10% off"},
              {value:0.12,label:"12% off"},
              {value:0.15,label:"15% off"},
          ]
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
                   quantity: 1 ,
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


       const handleDiscountSelect= (selectedDiscount:any,index:number)=>{
        const updatedItems=[...tableData];
        console.log(selectedDiscount);
        updatedItems[index]={
            ...updatedItems[index],
            discount:selectedDiscount.value,
            discountAmount:selectedDiscount.value*updatedItems[index]['sellingPrice']*updatedItems[index]['quantity']
        };
        setTableData(updatedItems);
    }
    const handleDiscountChange= (discount:number,index:number)=>{
        const updatedItems=[...tableData];
        console.log((discount/(updatedItems[index]['sellingPrice']*updatedItems[index]['quantity'])).toFixed(10))
        updatedItems[index]={
            ...updatedItems[index],
            discountAmount:discount,
            discount:Number((discount/Number(updatedItems[index]['sellingPrice']*updatedItems[index]['quantity'])).toFixed(10))
        };
        setTableData(updatedItems);
    }

    const handleAddDiscount = (index:number) => {
        const newDiscountStates = [...discountStates]; 
        newDiscountStates[index] = !newDiscountStates[index]; 
        setDiscountStates(newDiscountStates);
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

    const handleAddItem= useCallback(() => {
        setItems([...items, {}]);
    }, [items]);
    
    
    const handleInputChange = useCallback((index: number, value: any,field: string) => {   
        const updatedItems = [...items];
            updatedItems[index][field] =Number(value);
        setItems(updatedItems);
    },[items]);
    

    

    // const handleInputChange = (itemId: number, value: string) => {
    //     const quantity = parseInt(value, 10);
    //     if (!isNaN(quantity) && quantity >= 0) {
    //         setItems((prevItems:any) =>
    //             prevItems.map((item:any) => {
    //                 if (item.id === itemId) {
    //                     return { ...item, quantity };
    //                 }
    //                 return item;
    //             })
    //         );
    //     }
    // };
    
 
    const handleItemsDataChange = useCallback((index: number, field: string, value: string | number) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
        console.log(items)
    }, [items]);

    
      useEffect(() => {
        if (id == null) {
            setItems(items);
            setTableData(items);  
        }
    }, [id, items]);



    // const [checkedItems, setCheckedItems] = useState({});

    // const handleCheckboxChange = useCallback((id: number) => {
    //     setCheckedItems(prevState => {
    //         const newCheckedItems = {
    //             ...prevState,
    //             [id]: !prevState[id]
    //         };
    
    //         const filteredItems = items.filter(item => newCheckedItems[item.id] === true);
    //         setTableData(filteredItems);
    
    //         return newCheckedItems;
    //     });
    // }, [items]);
    const handleDeleteRow = useCallback((index: number) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
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
                    menuPortal: (base:any) => ({ ...base, zIndex: 9999 })
                  };

    return (
        <>
            <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100 rounded-lg border border-solid border-borderGrey">
            <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-t-0 border-r-0 border-l-0 border-solid border-borderGrey justify-end items-center gap-6 flex">
                    
                    
                    

                    {/* <Button
                        variant="solid"
                        className="capitalize h-9 flex border-none bg-black px-4 py-2.5 text-white rounded-md cursor-pointer">
                        <div className='flex'><Image src={addicon} alt='addicon' className='w-6 h-6 ' /></div>New Product 
                    </Button> */}
                    <Button
                        onClick={togglePopup}
                        variant="solid"
                        className="capitalize h-9 flex border-none bg-black px-4 py-2.5 text-white rounded-md cursor-pointer">
                        <div className='flex pr-2'>
                            <Image src={addicon} alt='addicon' className='w-6 h-6 ' />
                        </div>
                        New Client
                    </Button>
                    {showPopup && <ClientPopup onClose={togglePopup} />}
                    
                </div>
                <div className="flex-col w-full pr-[16px] pl-[16px] pt-[20px] overflow-auto max-h-[40rem]">
                    <NewPurchaseReturnHeader existingHeaderData={otherData}/>
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
                    <div className="w-full rounded-md border border-solid border-borderGrey">
                    <div className="w-full h-[84px] p-6 bg-white rounded-t-md  justify-between items-center gap-6 flex border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey">
                            <div className="text-gray-500 text-xl font-medium ">Items & Services</div>
                            <div className="flex items-center justify-center ">
                                
                                <Button onClick={handleAddItem} className='cursor-pointer text-white flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-md border-0 outline-none'>
                                    <div className='w-4 h-4 mb-3 mr-2'>
                                        <Image src={addicon} alt='addicon' />
                                    </div>
                                   
                                        Add Item
                                    
                                </Button>
                            </div>
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
                            <div className=' flex text-gray-500 text-base font-medium w-[15rem]'>Batch No.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[15rem]'>Bar Code</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[15rem] px-2'>Exipry Date</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Subtotal</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>MRP</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Tax %</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Tax Amt.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Discount %</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Discount Amt.</div>
                            <div className='flex text-gray-500 text-base font-medium w-1/12'>Total</div>
                            <div className=' flex text-gray-500 text-base font-medium w-1/12'></div>
                        
                        </div>
                        
                        {items.map((item, index) => (
                <div
                    key={index+1}
                    className='flex justify-evenly items-center w-full box-border bg-white border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey text-gray-400 py-2'
                >
                    {/* <div className='flex text-base  px-[10px] w-[5rem] items-center justify-center'>
                        <input
                            type="checkbox"
                            className="accent-teal-500 w-4 h-4"
                            checked={checkedItems[item.id] || false}
                            onChange={() => handleCheckboxChange(item.id)}
                        />
                    </div> */}
                    <div className=' flex text-textGrey2 text-base  px-[10px] w-[5rem]'>{index+1}.</div>
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
                                        styles={customStyles}
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
                                        styles={customStyles}
                                        />
                                    ) : (
                                        item.batchNumber
                                            )}
                                            {item.expiry && formatDateAndTime(item.expiry).formattedDate && (
                                        <div className="text-textGrey2 text-[13px] font-medium  px-2">{formatDateAndTime(item.expiry).formattedDate}</div>
                                    )}
                                      
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

                                    <div className=' flex text-gray-500 text-base  w-[12rem]'>
                                    ₹ {item.unitPrice}
                                        {/* <input
                                            type="number"
                                            className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2  text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                        /> */}
                                    </div>
                                    
                                    <div className=' flex text-gray-500 text-base  w-[15rem]'>
                                    {item.batchNumber}
                                        {/* <input
                                            type="number"
                                            className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2  text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                        /> */}
                                    </div>
                                    

                            
                            

                            <div className=' flex text-textGrey2 text-base  w-[15rem]'>
                            {item.batchNumber}
                                {/* <input
                                        type="number"
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2  text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    /> */}
                            </div>
                            <div className=' flex text-gray-500 text-base  w-[15rem]'>
                                    <div className="customDatePickerWidth1">
                                   {formatDateAndTime(item.expiry).formattedDate}
                                    </div>
                                    </div>
                            <div className=' flex text-textGrey2 text-base  w-[12rem] items-center gap-1'>
                            ₹ {item.quantity*item.unitPrice}
                                {/* <input
                                        type="number"
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2  text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    /> */}
                            </div>
                            <div className=' flex text-textGrey2 text-base  w-[12rem] items-center gap-1'>
                            ₹ {item.maxRetailPrice}
                                {/* <input
                                        type="number"
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2  text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    /> */}
                            </div>
                            <div className='flex text-textGrey2 text-base  w-[12rem] items-center gap-1'>
                                {item.tax*100}%
                            </div>
                            <div className=' flex text-textGrey2 text-base  w-[12rem] items-center gap-1'>
                            ₹ {(item.tax*item.quantity*item.unitPrice).toFixed(2)}
                                {/* <input
                                        type="number"
                                        className="w-[80%] border-0 outline-none h-8  rounded-md text-textGrey2  text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    /> */}
                            </div>
                            <div className=' flex text-textGrey2 text-base  w-[12rem] items-center gap-1'>
                            <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium gap-[20px] justify-end'>
                                        <button className="border-0 bg-transparent cursor-pointer">
                                            <Image className='w-5 h-5' src={sellicon} alt="sell"  onClick={() => handleAddDiscount(index)} ></Image>
                                        </button>
                    
                                        <button className="border-0 bg-transparent cursor-pointer" onClick={() => handleDeleteRow(index)}>
                                            <Image className='w-5 h-5' src={delicon} alt="delete" ></Image>
                                        </button>
                                    </div>
                                </div>
                                {discountStates[index]  && (
                        <div className='flex w-full justify-evenly items-center box-border bg-white h-12 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey text-gray-500'>
                            <div className='flex text-gray-500 text-base font-medium w-[3rem]'></div>
                            <div className='flex text-gray-500 text-base font-medium w-[15rem]'>
                                <div className="h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 inline-flex">
                                    <div className="text-indigo-600 text-sm font-medium">Item Discount</div>
                                </div>
                            </div>
                            <div className='flex text-gray-500 text-base font-medium w-[10rem]'>
                                    <Select
                                    className="text-neutral-400 text-base font-medium"
                                    defaultValue={[]}
                                    isClearable={false}
                                    isSearchable={true}
                                    options={discountOptions}
                                    styles={customStyles}
                                onChange={(selectedOption: any) => handleDiscountSelect(selectedOption, index)}
                                    />
                                    </div>
                                        <div className='flex text-gray-500 text-base font-medium w-1/12'></div>
                                        <div className='flex text-gray-500 text-base font-medium w-[10rem]'></div>
                                        <div className='flex text-gray-500 text-base font-medium w-1/12'></div>
                                        <div className='flex text-gray-500 text-base font-medium w-[10rem]'></div>
                                        <div className="text-red-500 text-base font-bold w-1/12">-₹
                                        <input 
                                        type="number"
                                        className="text-right text-red-500 text-base  w-[50%] border-none outline-none"
                                        value={item.discountAmount}
                                        onChange={(e)=>handleDiscountChange(Number(e.target.value),index)}
                                        />
                                        </div>
                                    </div>
                                )}
                </div>
            ))}
                    
                        <div className='flex  w-[180%] justify-evenly items-center box-border bg-gray-100 h-12 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey py-5  text-textGrey2 '>
                        <div className=' flex text-gray-500 text-base font-bold px-[10px] w-[5rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold px-[10px] w-[5rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[18rem]'>Total</div>

                            <div className=' flex text-gray-500 text-base font-bold w-[20rem]'>{items.reduce((acc:any, item:any) =>  acc + item.quantity  , 0) ||
                                                0} Items</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[15rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[15rem] px-2'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹{items.reduce((acc:any, item:any) =>  acc + (item.quantity*Number(item.unitPrice)) , 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹{items.reduce((acc:any, item:any) =>  acc + Number(item.maxRetailPrice)  , 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹{items.reduce((acc:any, item:any) =>  acc + (item.tax)*(item.quantity*Number(item.unitPrice))  , 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹{items.reduce((acc:any, item:any) =>  acc + (item.discount)*(item.quantity*Number(item.unitPrice))  , 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-1/12'></div>
                        </div>
                    </div>
                    <div className="flex-col shadow-left">
                    <div className="flex items-center justify-center  w-[15rem] h-12 text-gray-500 border-t-0 border-r-0 border-l border-b border-solid border-borderGrey">
                        <div className=' flex text-gray-500 text-base font-medium '>Total</div>
                    </div>
                    {items.map((item:any,index:number) => (
                    <div key={item.id} className="flex items-center justify-center  w-[10rem] box-border bg-white text-gray-500 border-t-0 border-r-0 border-l border-b border-solid border-gray-200 h-12">
                        <div className=' flex text-gray-500 text-base font-medium'>{ ((item.tax-item.discount+1)*(item.quantity*Number(item.unitPrice))).toFixed(2)||
                                                0}</div>
                    </div>
                    ))}
                    <div className=' flex text-textGreen text-base font-bold w-[10rem] h-12 items-center justify-center'>₹{items.reduce((acc:any, item:any) =>  acc + (item.tax-item.discount+1)*(item.quantity*Number(item.unitPrice)) , 0).toFixed(2) ||
                                                0}</div>
                    </div>
                    </div>
                    

                </div>
                </div>

                <NewPurchaseReturnTotalAmount />
            </div>
            <NewPurchaseReturnBottomBar invoiceData={grnData}/>
        </div>
       
        </>
    )

}

export default NewPurchaseReturnTable;