"use client"


import 'react-datepicker/dist/react-datepicker.css';


import Subtract from "../../../../../assets/icons/finance/Subtract.svg"
import Add from "../../../../../assets/icons/finance/add (2).svg"
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import Image from "next/image"
import NewPurchaseReturnBottomBar from "./bottombar"
import NewPurchaseReturnTotalAmount from "./totalamount"
import NewPurchaseReturnHeader from "./header"
import { useAppSelector } from "@/lib/hooks";
import formatDateAndTime from '@/utils/formateDateTime';

import useSWR from 'swr';
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
    originalQuantity :number,
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
function DataFromGRN(id:number|null,branchId:number|null){
    const {data,error,isLoading} =useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/${id}/?branchId=${branchId}`,fetcher);
    return {
       data,
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

interface CheckedItems {
    [key: number]: boolean;
}

const NewPurchaseReturnTable = () => {
    const { tableData, setTableData } = useContext(DataContext);
    const [selectedProductDetails,setSelectedProduct]= useState<Products>()
    const [products, setProducts] = useState<any[]>([]);
    const [otherData, setOtherData] = useState({});
    const appState = useAppSelector((state) => state.app)
    // const { tableData: items, setTableData: setItems } = useContext(DataContext);
    const [items,setItems]=useState<any[]>([]);   
    const [batches,setBatches] = useState<any[]>([]);
    const [filteredBatches,setFilteredBatches]=useState<any[]>([]);
    const [discountStates, setDiscountStates] = useState(new Array(items.length).fill(false));
    const url= useSearchParams();
    const id=url.get('id');
    let grnData:any=null,isgrnDataLoading=false,isgrnDataError=false; 
    if(id){
        const {data,isLoading,error}=DataFromGRN(Number(id),appState.currentBranchId);
        grnData=data;
        isgrnDataError=error;
        isgrnDataLoading=isLoading;        
    }
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
                   sellingPrice:  product.sellingPrice,
               },
               label:product.batchNumber
           }));
           // console.log(formattedProductBatches)
           setBatches(formattedProductBatches)
       }
       },[fetchedProducts,fetchedBathces])

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
                defaultUnit:item.products.defaultUnit,
                originalQuantity : item.quantity,
                unitPrice:item.productBatch.costPrice,
                tax:item.taxAmount,
                discount:item.discount*100,
                expiry:item.productBatch.expiry,
                batchNumber:item.productBatch.batchNumber,
                freeQuantity:item.freeQuantity,
                maxRetailPrice:item.productBatch.sellingPrice
              }));
              setItems(itemData);
              setItems((prevItems: any) => [
                ...prevItems,
                {
                    productId: null,
                    serviceId: null,
                    itemName: "",
                },
            ]);
            console.log('all the data is stored',itemData);

            //   console.log("These are the items",items)
　　 　 　 　
            }
          }, [grnData]); 
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
        const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

    useEffect(() => {
        if (!disableButton && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disableButton]);
    

    const handleQuantityDecClick = (itemId: any) => {
        setItems((prevItems : any) => {
            const updatedItems = prevItems.map((item: any) => {
                if (item.id === itemId && item.quantity > 0) {
                    const newQuantity = item.quantity - 1;
                    const updatedDiscountAmt = (item.unitPrice * newQuantity * item.discount) / 100 || 0;
                    return { ...item, quantity: newQuantity, discountAmount: updatedDiscountAmt };
                    //return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            const filteredItems = updatedItems.filter((item: any) => item.quantity > 0);
            setTableData(filteredItems);
            console.log("hvuyvyu",updatedItems);
            return updatedItems;
    });
    };
    
    const handleQuantityIncClick = (itemId: any) => {
        setItems((prevItems: any) => {
            const updatedItems = prevItems.map((item: any) => {
                if (item.id === itemId) {
                    // Ensure quantity does not exceed purchased or original quantity
                    if ( item.quantity < item.originalQuantity) {
                        const newQuantity = item.quantity + 1;
                        const updatedDiscountAmt = (item.unitPrice * newQuantity * item.discount) / 100 || 0;
                        return { ...item, quantity: newQuantity, discountAmount: updatedDiscountAmt };
                        //return { ...item, quantity: item.quantity + 1 };
                    }
                }
                return item;
            });
    
            const filteredItems = updatedItems.filter((item: any) => item.quantity > 0);
            setTableData(filteredItems);
            console.log("hvuyvyu",updatedItems);
            return updatedItems;
        });
    };
    

    

    const handleInputChange = (itemId: number, value: string) => {
        const quantity = parseInt(value, 10);
        if (!isNaN(quantity) && quantity >= 0) {
            setItems((prevItems:any) => {
                const updatedItems = prevItems.map((item:any) => {
                    if (item.id === itemId) {
                        const newQuantity = quantity;
                        const updatedDiscountAmt = (item.unitPrice * newQuantity * item.discount) / 100 || 0;
                        return { ...item, quantity: newQuantity, discountAmount: updatedDiscountAmt };
                        //return { ...item, quantity };
                    }
                    return item;
                })
                const filteredItems = updatedItems.filter((item: any) => item.quantity > 0);
                setTableData(filteredItems);
                console.log("hvuyvyu",updatedItems);
                return updatedItems;
        });
        }
    };
 
    const handleItemsDataChange = useCallback((index: number, field: string, value: string | number) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
        // console.log(items)
    }, [items]);

    
      useEffect(() => {
        if (id == null) {
            setItems(items);
            setTableData(items);  
        }
    }, [id, items]);


    // const handleDiscountSelect= (selectedDiscount:number,index:number)=>{
    //     const updatedItems=[...tableData];
         
    //     updatedItems[index]={
    //         ...updatedItems[index],
    //         discount: selectedDiscount,
    //         discountAmount: Number(selectedDiscount / 100) * updatedItems[index].unitPrice * updatedItems[index].quantity
    //     };
    //     console.log("hvuyvyu",updatedItems);
    //     setTableData(updatedItems);
    //     return updatedItems;
    // }
    const handleDiscountChange = (itemId: number, value: number) => {
        setItems((prevItems: any) => {
            const updatedItems = prevItems.map((item: any) => {
                if (item.id === itemId) {
                    const discountAmount = (value / 100) * item.unitPrice * item.quantity;
                    return {
                        ...item,
                        discount: value, // Update discount
                        discountAmount: parseFloat(discountAmount.toFixed(2)), // Calculate discount amount
                    };
                }
                return item;
            });
    
            // Filter items with quantity > 0 and update table data
            const filteredItems = updatedItems.filter((item: any) => item.quantity > 0);
            setTableData(filteredItems);
    
            console.log("Updated Items:", updatedItems);
            return updatedItems; // Update state with new items
        });
    };
    

    const handleDiscountAmountChange = (itemId: number, value: number) => {
        setItems((prevItems: any) => {
            const updatedItems = prevItems.map((item: any) => {
                if (item.id === itemId) {
                    const discountPercent = (value / (item.unitPrice * item.quantity)) * 100;
                    return { ...item, discountAmount: value, discount: parseFloat(discountPercent.toFixed(2)) };
                }
                return item;
            });
            const filteredItems = updatedItems.filter((item: any) => item.quantity > 0);
            setTableData(filteredItems);
            console.log("hvuyvyu",updatedItems);
            return updatedItems;
            
            
        });
    };

    const handleUnitPriceChange = (itemId: number, value: number) => {
        setItems((prevItems: any) => {
            const updatedItems = prevItems.map((item: any) => {
                if (item.id === itemId) {
                        const newPrice = value;
                        const updatedDiscountAmt = (item.quantity * newPrice * item.discount) / 100 || 0;
                        return { ...item, unitPrice: value, discountAmount: updatedDiscountAmt };
                    //return { ...item, unitPrice: value };
                }
                return item;
            });
            const filteredItems = updatedItems.filter((item: any) => item.quantity > 0);
            setTableData(filteredItems);
            console.log("hvuyvyu",updatedItems);
            return updatedItems;
            
        });
    };

    const handleAmountChange = (itemId: number, value: number) => {
        setItems((prevItems: any) => {
            const updatedItems = prevItems.map((item: any) => {
                if (item.id === itemId) {
                    const newQuantity = value / item.unitPrice;
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            return updatedItems;
        });
    };

    const handleCheckboxChange = useCallback((id: number) => {
        setCheckedItems(prevState => {
            const newCheckedItems = {
                ...prevState,
                [id]: !prevState[id]
            };
    
            const filteredItems = items.filter(item => newCheckedItems[item.id] === true);
            setTableData(filteredItems);
    
            return newCheckedItems;
        });
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
            <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-t-0 border-r-0 border-l-0 border-solid border-borderGrey justify-end items-center gap-6 flex">
                    
                    
            
                    
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
                            <div className=' flex text-gray-500 text-base font-medium w-[15rem] px-2'>Expiry Date</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Subtotal</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>MRP</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Tax %</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Tax Amt.</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Discount %</div>
                            <div className=' flex text-gray-500 text-base font-medium w-[12rem]'>Discount Amt.</div>
                            <div className='w-1/12 flex items-center text-neutral-400 text-base  gap-[12px]'>
                                    
                            </div>
                        
                        </div>
                        
                        {items.map((item, index) => (
                <div
                    key={index+1}
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
                    <div className=' flex text-textGrey2 text-base  px-[10px] w-[5rem]'>{index+1}.</div>
                                    <div className=' flex text-textGrey2 text-base  w-[18rem] '>
                                    {/* {item.itemName} */}
                                    <Select
                                                        className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0 absolute"
                                                        classNamePrefix="select"
                                                        value={products.find((prod) => prod.value.id === item.productId)}
                                                        isClearable={false}
                                                        isSearchable={true}
                                                        name="itemName"
                                                        options={products}
                                                        onChange={(selectedProduct: any) => handleProductSelect(selectedProduct, index)}
                                                        menuPortalTarget={document.body}
                                                        styles={customStyles}
                                                    />
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
                                        <input
                                            type="number"
                                            value={item.unitPrice}
                                            onChange={(e) => handleUnitPriceChange(item.id, e.target.valueAsNumber)}
                                            className="w-[80%] border border-solid border-borderGrey outline-none h-8  rounded-md text-textGrey2  text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                        />
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
                            ₹ {item.quantity*item.unitPrice?.toFixed(2)}
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
                            <div className=' flex text-gray-500 text-base  w-[12rem]'>
                            <input
                                type="number"
                                value={item.discount !== undefined ? item.discount : ""}
                                onChange={(e) => handleDiscountChange(item.id, e.target.valueAsNumber || 0)}
                                className="w-[80%] border border-solid border-borderGrey outline-none h-8 rounded-md text-textGrey2 text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                step="0.01"
                            />
                            </div>
                            <div className=' flex text-gray-500 text-base  w-[12rem]'>
                                <input
                                    type="number"
                                    value={item.discountAmount}
                                    onChange={(e) => handleDiscountAmountChange(item.id, e.target.valueAsNumber|| 0)}
                                    className="w-[80%] border border-solid border-borderGrey outline-none h-8  rounded-md text-textGrey2  text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    step="0.01"
                                />
                            </div>
                            <div className='w-1/12 flex items-center text-neutral-400 text-base  gap-[12px]'>
                                    
                            </div>
                </div>
            ))}
                    
                        <div className='flex  w-[180%] justify-evenly items-center box-border bg-gray-100 h-12 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey py-5  text-textGrey2 '>
                        <div className=' flex text-gray-500 text-base font-bold px-[10px] w-[5rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold px-[10px] w-[5rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[18rem]'>Total</div>

                            <div className=' flex text-gray-500 text-base font-bold w-[20rem]'>{items.reduce((acc, item) =>  { if (!item.itemName) return acc; return checkedItems[item.id] ? acc + item.quantity : acc }, 0) ||
                                                0} Items</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[15rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[15rem] px-2'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹{items.reduce((acc, item) => { if (!item.itemName) return acc; return checkedItems[item.id] ? acc + (item.quantity*Number(item.unitPrice)):acc } , 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹{items.reduce((acc, item) => { if (!item.itemName) return acc; return checkedItems[item.id] ? acc + Number(item.maxRetailPrice) :acc }, 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹{items.reduce((acc, item) => { if (!item.itemName) return acc; return checkedItems[item.id] ?acc + (item.tax)*(item.quantity*Number(item.unitPrice)) :acc } , 0).toFixed(2) ||
                                                0}</div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'></div>
                            <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹{items.reduce((acc, item) => { if (!item.itemName) return acc; return checkedItems[item.id] ? acc + (item.discount/100)*(item.quantity*Number(item.unitPrice)) :acc} , 0).toFixed(2) ||
                                                0}</div>
                            {/* <div className=' flex text-gray-500 text-base font-bold w-[12rem]'>₹{isNaN(items.reduce((acc, item) => acc + (item.discountPercent/100)*(item.quantity*Number(item.unitPrice)) , 0)) ? 0 : items.reduce((acc, item) => acc + (item.discountPercent/100)*(item.quantity*Number(item.unitPrice)) , 0).toFixed(2)}</div> */}
                            <div className=' flex text-gray-500 text-base font-bold w-1/12'></div>
                        
                    </div>
                    </div>
                    <div className="flex-col shadow-left">
                    <div className="flex items-center justify-center  w-[15rem] h-12 text-gray-500 border-t-0 border-r-0 border-l border-b border-solid border-borderGrey">
                        <div className=' flex text-gray-500 text-base font-medium '>Total</div>
                    </div>
                    {items.map((item:any,index:number) => (
                    <div key={item.id} className="flex items-center justify-center  w-[10rem] box-border bg-white text-gray-500 border-t-0 border-r-0 border-l border-b border-solid border-gray-200 h-12">
                        <div className=' flex text-gray-500 text-base font-medium'>{ checkedItems[item.id]?((item.tax-item.discount/100+1)*(item.quantity*Number(item.unitPrice))).toFixed(2):0||
                                                0}</div>
                    </div>
                    ))}
                    <div className=' flex text-textGreen text-base font-bold w-[10rem] h-12 items-center justify-center'>₹{items.reduce((acc, item) =>  { if (!item.itemName) return acc; return checkedItems[item.id]?acc + (item.tax-item.discount/100+1)*(item.quantity*Number(item.unitPrice)):acc }, 0).toFixed(2) ||
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