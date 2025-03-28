'use client';

import Subtract from "../../../../../assets/icons/finance/Subtract.svg"
import ClientPopup from '@/components/database/client/newclientpopoup';
import Add from "../../../../../assets/icons/finance/add (2).svg"
import addicon from "../../../../../assets/icons/finance/add.svg"
import delicon from "../../../../../assets/icons/finance/1. Icons-27.svg"
import React, { useState, useEffect, useContext, useCallback } from 'react';
import Select from 'react-select';
import { useRef } from "react"
import Image from "next/image"

import NewPurchaseReturnNewHeader from "./header"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import NewPurchaseReturnNewBottomBar from './bottombar';
import NewPurchaseReturnNewTotalAmount from './totalamount';

import { DataContext } from './DataContext';
import { useAppSelector } from "@/lib/hooks";
import { Tax } from '@prisma/client';
import formatDateAndTime from '@/utils/formateDateTime';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import StockConfirmationPopup from '@/utils/stockConfirmationpopup';
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())

interface Products{
    id :string,
    itemName:string,
    productBatch:ProductBatch[],
    hsnCode:string,
    quantity:number,
    tax:number,
    defaultUnit:string,
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
    maxRetailPrice:number;
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
const NewPurchaseReturnNewTable = () => {
    const { tableData, setTableData } = useContext(DataContext);
    const [selectedProductDetails,setSelectedProduct]= useState<Products>()
    const [products, setProducts] = useState<any[]>([]);
    const [batches,setBatches] = useState<any[]>([]);
    const [filteredBatches,setFilteredBatches]=useState<any[]>([]);
    const [otherData, setOtherData] = useState({});
    const appState = useAppSelector((state) => state.app)
    const url= useSearchParams();
    const id=url.get('id');

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmAction, setAction] = useState<string>('idle');
    const [selectedBatchQuantity, setSelectedBatchQuantity] = useState<number>(0);
    const [selectedBatch, setSelectedBatch] = useState<any>();
    const [currIndex, setCurrIndex] = useState<number>(0);


    let invoiceData:any=null,isInvoiceDataLoading=false,isInvoiceDataError=false;
    const { tableData: items, setTableData: setItems } = useContext(DataContext);   
    if(id){
        const {data,isLoading,error}=DataFromInvoice(Number(id),appState.currentBranchId);
        invoiceData=data;
        isInvoiceDataError=error;
        isInvoiceDataLoading=isLoading;        
    }

    useEffect(() => {
            if (confirmAction === 'idle' || confirmAction === 'Save') {
                return;
            }
            else {
                const nextBatches = batches.filter((batch) => batch.value.productId === selectedBatch.value.productId).sort((a, b) => a.value.id - b.value.id);
    
                const nextBatch = nextBatches.find(
                    (batch, index) =>
                        batch.value.id > selectedBatch.value.id &&
                        (index === 0 || nextBatches[index - 1].value.id === selectedBatch.value.id)
                );
    
                const defaultBatch = (nextBatch || nextBatches[nextBatches.length - 1]);
                setSelectedBatch(defaultBatch);
                setSelectedBatchQuantity(defaultBatch?.value?.originalQuantity || 0);
                
                setItems((prevItems) =>
                    prevItems.map((item, itemIndex) =>
                        itemIndex === currIndex ? {
                            ...item,
                            id: defaultBatch.value.id,
                            quantity: defaultBatch.value.quantity,
                            batchNumber: defaultBatch.value.batchNumber,
                            expiry: defaultBatch.value.expiry,
                            sellingPrice: defaultBatch.value.sellingPrice,
                            productId: defaultBatch.value.productId
                        } :
                            item,
                    )
                );
                if(defaultBatch?.value?.originalQuantity <= 0){
                    setShowConfirmation(true);    
                }
                setAction('idle');
                
    
            }
    
    
        }, [confirmAction])

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
                gst:item.taxAmount,
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
                tax:product.tax,
                defaultUnit:product.defaultUnit,
            },
             label: product.itemName,
         }));
        //  console.log(formattedProducts)
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
                sellingPrice:  product.maxRetailPrice,
                originalQuantity:product.quantity
            },
            label:product.batchNumber
        }));
        // console.log(formattedProductBatches)
        setBatches(formattedProductBatches)
    }
    },[fetchedProducts,fetchedBathces])
  const handleDeleteRow = useCallback((index: number) => {
    // Keep the last empty row and remove the selected row
    const updatedItems = items.filter((item, i) => {
        if (i === items.length - 1) {
            // Return the last row with reset values
            return {
                productId: null,
                itemName: "",
                quantity: 0,
                sellingPrice: 0,
                gst: 0,
                batchNumber: "",
                expiry: "",
                id: null
            };
        }
        return i !== index;
    });
    setItems(updatedItems);
    setTableData(updatedItems);
}, [items, setTableData]);

const handleGstSelect = (selectedGst: any, index: number) => {
    const updatedItems = [...tableData];
    // console.log(selectedGst)
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

const handleQuantityDecClick = (itemId: any, index: number) => {
    setItems((prevItems) =>
        prevItems.map((item, i) => {
            if (i === index && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        })
    );
};

const handleQuantityIncClick = (itemId: any, index: number) => {
    setItems((prevItems) =>
        prevItems.map((item, i) => {
            if (i === index) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        })
    );
};

const handleQuantityDecClick1 = (itemId: any, index: number) => {
    setItems((prevItems) =>
        prevItems.map((item, i) => {
            if (i === index && item.quantity2 > 1) {
                return { ...item, quantity2: item.quantity2 - 1 };
            }
            return item;
        })
    );
};

const handleQuantityIncClick1 = (itemId: any, index: number) => {
    setItems((prevItems) =>
        prevItems.map((item, i) => {
            if (i === index) {
                return { ...item, quantity2: item.quantity2 + 1 };
            }
            return item;
        })
    );
};

const handleAddItem= useCallback(() => {
    setItems([...items, {}]);
}, [items]);

const handleProductSelect = useCallback(async (selectedProduct: any, index: number) => {
    // console.log(selectedProduct);
    if (selectedProduct.value) {
        if (index === items.length - 1) {
            items.push({
                productId: null,
                serviceId: null,
                itemName: "",
            });
            setItems(items);
        }
      try {
        const data = products.find((product) => product.value.id === selectedProduct.value.id);
        setSelectedProduct(data);
        const updatedItems = [...items];
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: data.value.quantity,
          defaultUnit:selectedProduct.value.defaultUnit,
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
        setSelectedBatch(defaultBatch);
        setSelectedBatchQuantity(defaultBatch?.value?.originalQuantity || 0);
        setCurrIndex(index);
        if (defaultBatch?.value?.originalQuantity <= 0) {
            setShowConfirmation(true);
        }

      } catch (error) {
        console.error("Error fetching product details from API:", error);
      }
    }
  }, [items, products]);


const handleBatchSelect = useCallback(async (selectedProduct: any, index: number) => {
    if (selectedProduct.value) {
        try {
            
            const data = filteredBatches.find((batch)=>batch.value.id==selectedProduct.value.id);
            // console.log(data)
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
            // console.log("these are updated",updatedItems)
            setItems(updatedItems);
            setTableData(updatedItems);
            setSelectedBatch(data);
            setSelectedBatchQuantity(data?.value?.originalQuantity || 0);
            setCurrIndex(index);
            if (data?.value?.originalQuantity <= 0) {
                setShowConfirmation(true);
            }
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

useEffect(() => {
    items.push({
        productId: null,
        itemName: "",
    });
    setItems(items);
}, [])

useEffect(() => {
    if (tableData.length === 0) {
        setSelectedProduct(undefined);
    }
}, [tableData])


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


  const [showPopup, setShowPopup] = React.useState(false);

  const togglePopup = () => {
      setShowPopup(!showPopup);
  }

    return (
        <>
            <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100 rounded-lg border border-solid border-borderGrey">
            {showConfirmation && <StockConfirmationPopup quantity={selectedBatchQuantity} setAction={setAction} setShowConfirmation={setShowConfirmation} />}
            <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-t-0 border-r-0 border-l-0 border-solid border-borderGrey justify-between items-center gap-6 flex">
                    <div className='rounded-md px-2 py-2' >
                        
                    </div>
                    {/* <div className='flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-lg '> */}
                        {/* <Popover placement="bottom-end" showArrow offset={10}>
                            <PopoverTrigger> */}
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
                    <NewPurchaseReturnNewHeader existingHeaderData={otherData}/>
                    <div className="w-full rounded-md border border-solid border-borderGrey">
                    <div className="w-full h-[84px] p-6 bg-white rounded-t-md  justify-between items-center gap-6 flex border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey">
                            <div className="text-gray-500 text-xl font-medium ">Items</div>
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
                        <div className='flex w-full justify-evenly items-center box-border bg-gray-100 h-12  text-gray-500 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey'>
                                <div className='flex text-gray-500 text-base font-medium w-[3rem]'>No.</div>
                                <div className='flex text-gray-500 text-base font-medium w-[15rem]'>Name</div>
                                <div className='flex text-gray-500 text-base font-medium w-[10rem]'>Batch No.</div>
                                <div className='flex text-gray-500 text-base font-medium w-[10rem]'>Selling Price</div>
                                
                                <div className='flex text-gray-500 text-base font-medium w-[10rem]'>Quantity</div>
                                
                                
                                <div className='flex text-gray-500 text-base font-medium w-[10rem]'>Tax %</div>
                                <div className='flex text-gray-500 text-base font-medium  w-[10rem]'>Tax Amt.</div>
                                <div className='flex text-gray-500 text-base font-medium w-1/12'>Total</div>
                                <div className='flex text-gray-500 text-base font-medium w-[3rem]'></div>
                            </div>
                            {items.map((item:any,index:number) => (
                                <div key={`${item.id || 'new'}-${item.productId || 'empty'}-${index}`} className='flex justify-evenly items-center w-full box-border bg-white border border-solid border-gray-200 text-gray-400 py-2'>
                                    <div className='w-[3rem] flex items-center text-textGrey2 text-base font-medium '>{index+1}.</div>
                                    <div className='w-[15rem] flex items-center text-textGrey2 text-base font-medium'>
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
                                    <div className='w-[10rem] flex-col items-center text-textGrey2 text-base font-medium'>
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
                                <div className='w-[10rem] flex items-center text-textGrey2 text-base font-medium'>
                                    {item.sellingPrice}
                                    <Select
                                        className="text-textGrey2 text-sm font-medium "
                                        defaultValue={taxOptions[0]}
                                        isClearable={false}
                                        isSearchable={true}
                                        options={taxOptions}
                                        styles={customStyles}
                                        
                                    />
                                </div>
                                
                                <div className='w-[10rem] flex items-center text-textGrey2 text-base font-medium gap-[12px]'>
                                <div className='flex items-center text-textGrey2 text-base font-medium gap-1 bg-white'>
                                    <button className="border-0 rounded-md cursor-pointer" onClick={() => handleQuantityDecClick(item.id, index)}>
                                        <Image className='rounded-md w-6 h-4' src={Subtract} alt="-"></Image>
                                    </button>
                                    <div className="w-[3rem] text-center border border-solid border-borderGrey h-7  rounded-md text-textGrey2 font-medium text-base">{item.quantity}</div>
                                    <button className="border-0 rounded-md cursor-pointer" onClick={() => handleQuantityIncClick(item.id, index)}>
                                        <Image className="rounded-md w-6 h-4" src={Add} alt="+"></Image>
                                    </button>
                                    {item?.defaultUnit}
                                </div>
                                </div>
                                
                                <div className='w-[10rem] flex items-center text-textGrey2 text-base font-medium'>
                                        {/* { id==null?(
                                        <Select
                                            className="text-textGrey2 text-base font-medium"
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
                                           { item.gst?(item.gst*100).toFixed(2):0}%
                                        {/* )} */}
                                    </div>
                                <div className='w-[10rem] flex items-center text-textGrey2 text-base font-medium'>{`₹${((item?.sellingPrice*item?.quantity * item?.gst)||0).toFixed(2)}`}</div>
                                    <div className='w-1/12 flex items-center text-textGrey2 text-base font-medium'>{`₹${((item?.quantity * item?.sellingPrice +item?.sellingPrice*item.quantity*item.gst)||0).toFixed(2)}`}</div>
                                    {index !== items.length - 1 && (
                                        <div className='w-[3rem] flex items-center justify-center'>
                                            <button className="border-0 bg-transparent cursor-pointer" onClick={() => handleDeleteRow(index)}>
                                                <Image className='w-5 h-5' src={delicon} alt="delete" />
                                            </button>
                                        </div>
                                    )}
                                    {index === items.length - 1 && <div className='w-[3rem]'></div>}
                                </div>
                            ))}
                            <div className='flex w-full justify-evenly items-center box-border bg-gray-100 h-12 border-b border-textGrey2 text-gray-500 rounded-b-md'>
                                <div className='flex text-gray-500 text-base font-medium w-[3rem]'></div>
                                <div className='flex text-gray-500 text-base font-bold w-[15rem]'>Total</div>
                                <div className='flex text-gray-500 text-base font-bold w-[10rem]'></div>
                                <div className='flex text-gray-500 text-base font-bold w-[10rem]'></div>
                                <div className='flex text-gray-500 text-base font-bold w-[10rem]'>{(items.reduce((acc:any, item:any) => {if(!item.itemName) return acc ; return acc + item.quantity}, 0))||0} Items</div>
                                
                                <div className='flex text-gray-500 text-base font-bold w-[10rem]'>
                                        {/* <Select
                                            className="text-textGrey2 text-base font-bold"
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
                                <div className='flex text-gray-500 text-base font-bold w-[10rem]'>{`₹${(items.reduce((acc:any, item:any) => {if(!item.itemName) return acc;return acc + item.quantity * item.gst*item.sellingPrice} , 0)||0).toFixed(2)}`}</div>
                                <div className='flex text-gray-500 text-base font-bold w-1/12' >{`₹${(items.reduce((acc:any, item:any) => {if(!item.itemName) return acc;return acc + item.quantity * item.sellingPrice +item.quantity*item.gst*item.sellingPrice}, 0)||0).toFixed(2)}`}</div>
                                <div className='w-[3rem]'></div>
                            </div>
                        </div>
                    </div>
                        <NewPurchaseReturnNewTotalAmount />
                </div>
                <NewPurchaseReturnNewBottomBar invoiceData={otherData}/>
            </div>



        </>

    )
}

export default NewPurchaseReturnNewTable;
