"use client"


import addicon from "../../../../../assets/icons/finance/add.svg"

import addicon1 from "../../../../../assets/icons/finance/add (3).svg"

import Subtract from "../../../../../assets/icons/finance/Subtract.svg"
import Add from "../../../../../assets/icons/finance/add (2).svg"
import React, { Dispatch, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import Image from "next/image"
import { Button } from "@nextui-org/react";
import NewPurchasesHeader from "./header";
import NewPurchasesBottomBar from "./bottombar";
import NewPurchasesTotalAmount from "./totalamount";
import { useAppSelector } from "@/lib/hooks";

import useSWR from 'swr';
import { DataContext } from "./DataContext"
import Popup from '../../../../inventory/product/producttable/newproductpopup';
import Popup1 from '../../../../database/distributor/newdistributorpopup'
import { useSearchParams } from "next/navigation"
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

interface Products {
    id: string,
    itemName: string,
    productBatch: ProductBatch[],
    hsnCode: string,
    quantity: number,
    tax: number,
    defaultUnit:string,
}


interface Popup1Props {
    onClose: () => void;
    setNewDistributor?: Dispatch<any>; // Add this if it's optional
    setIsNewDistributorClicked: Dispatch<any>;
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
}

function useProductfetch(id: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${id}`, fetcher, { revalidateOnFocus: true });
    return {
        fetchedProducts: data,
        isLoading,
        error
    }
}
function DataFromOrder(id: number | null, branchId: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/${id}/?branchId=${branchId}`, fetcher);
    return {
        data,
        isLoading,
        error
    }
}

const NewPurchasesTable = () => {
    const { tableData, setTableData } = useContext(DataContext);
    const { setDistributorData } = useContext(DataContext);
    const [selectedProductDetails,setSelectedProduct]= useState<Products>()
    const [discountPercent, setDiscountPercent] = useState<any>();
    const [discountAmt, setDiscountAmt] = useState<any>();
    const [products, setProducts] = useState<any[]>([]);
    const [otherData, setOtherData] = useState({});
    const appState = useAppSelector((state) => state.app)
    const { tableData: items, setTableData: setItems } = useContext(DataContext);
    const [discountStates, setDiscountStates] = useState(new Array(items.length).fill(false));
    const [isNewDistributorClicked, setIsNewDistributorClicked] = useState<any>(false);
    const [newDistributor, setNewDistributor] = useState<any>();
    const [isNewProductClicked, setIsNewProductClicked] = useState<any>(false);
    const [newProduct, setNewProduct] = useState<any>();
    const url= useSearchParams();
    const id=url.get('id');
    let orderData:any=null,isorderDataLoading=false,isorderDataError=false; 
    const taxOptions = [
        { value: 'Tax excl.', label: 'Tax excl.' },
        { value: 'Tax incl.', label: 'Tax incl.' }
    ];
    const [showPopup, setShowPopup] = React.useState(false);
    const [showDistributorPopup, setDistributorPopup] = React.useState(false);
    if(id){
        const {data,isLoading,error}=DataFromOrder(Number(id),appState.currentBranchId);
        orderData=data;
        isorderDataError=error;
        isorderDataLoading=isLoading;        
    }

    useEffect(() => {
        if (isNewProductClicked) {
        
            const newlyCreatedProduct = {
                value: {
                    itemName:newProduct.itemName,
                    productId: newProduct.value.id,
                    
                   
                }
              
            }
            setProducts((prevData) => ({ ...prevData, Product: newlyCreatedProduct }))
        }
    }, [isNewProductClicked])

    console.log("new product is :",setNewProduct);

    useEffect(()=>{
            if (!isorderDataLoading && orderData && !isorderDataError) {
                const {items,...otherData}=orderData;
                setOtherData(otherData)
              const shallowDataCopy = [...items]; 
              const itemData = shallowDataCopy.map((item: any) => ({
                id: item.productId,
                productId: item.productId,
                itemName: item.name,
                quantity: item.quantity,
                unitPrice: item.sellingPrice,
                gst: item.taxAmount,
                discountPercent: item.discount*100
            }));
            setItems((prev: any[]) => [...itemData, ...prev,]);

        }
    }, [orderData]);


    const togglePopup = () => {
        setShowPopup(!showPopup);
    }
    const togglePopup1 = () => {
        setDistributorPopup(!showDistributorPopup);
    }



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


    const { fetchedProducts, isLoading, error } = useProductfetch(appState.currentBranchId);
    useEffect(() => {
        if (!isLoading && fetchedProducts && !error) {
            const formattedProducts = fetchedProducts.map((product: Products) => ({
                value: {
                    id: product.id,
                    quantity: product.quantity,
                    itemName: product.itemName,
                    tax: product.tax,
                    defaultUnit:product.defaultUnit,
                },
                label: product.itemName,
            }));
            setProducts(formattedProducts);
        }
    }, [isLoading,fetchedProducts,error])

    const handleGstSelect = (selectedGst: any, index: number) => {
        const updatedItems = [...tableData];
        // console.log(selectedGst)
        updatedItems[index] = {
            ...updatedItems[index],
            gst: selectedGst.value
        };
    }
        const handleAddItem = useCallback(() => {
            setItems([...items, {}]);
        }, [items]);

        const handleQuantityDecClick = (itemId: any) => {
            console.log(items);
            setItems((prevItems: any) =>
                prevItems.map((item: any) => {
                    if (item.productId === itemId && item.quantity >= 1) {
                        const newQuantity = item.quantity - 1;
                        const updatedDiscountAmt = (item.unitPrice * newQuantity * item.discountPercent) / 100 || 0;
                        return { ...item, quantity: newQuantity, discountAmt: updatedDiscountAmt };
                    }

                    return item;
                })
            );
        };

        const handleQuantityIncClick = (itemId: any) => {
            console.log(itemId);
            setItems((prevItems: any) =>
                prevItems.map((item: any) => {
                    if (item.productId === itemId && item.quantity >= 0) {
                        const newQuantity = item.quantity + 1;
                        const updatedDiscountAmt = (item.unitPrice * newQuantity * item.discountPercent) / 100 || 0;
                        return { ...item, quantity: newQuantity, discountAmt: updatedDiscountAmt };
                    }

                    return item;
                })
            );
        };

        useEffect(() => {
            setItems((prevItems: any) =>
                prevItems.map((item: any) => {
                    if (item.quantity === undefined) {
                        return { ...item, quantity: 1 };
                    }
                    return item;
                })
            );
        }, []);
        // const handleDiscountPercentChange = (selectedDiscount: number, index: number) => {
        //     const updatedItems = [...tableData];
        //     console.log(selectedDiscount);
        //     updatedItems[index] = {
        //         ...updatedItems[index],
        //         discountPercent: selectedDiscount,
        //         discountAmount: Number(selectedDiscount / 100) * updatedItems[index]['unitPrice'] * updatedItems[index]['quantity']
        //     };
        //     setTableData(updatedItems);
        // }
        const handleDiscountPercentChange = (index: number, value: any) => {
            const updatedItems = [...tableData];
            console.log("updated item is : ",updatedItems);
            updatedItems[index].discountPercent = parseFloat(value) || 0;
            updatedItems[index].discountAmt = (((updatedItems[index].unitPrice * updatedItems[index].quantity) * updatedItems[index].discountPercent) / 100);
            setDiscountAmt(updatedItems[index].discountAmt);
            setDiscountPercent(value);
            handleInputChange(index, updatedItems[index].discountAmt, 'discountAmt');
            handleInputChange(index, updatedItems[index].discountPercent, 'discountPercent')
            setTableData(updatedItems);
        };
        // const handleDiscountAmtChange = (discount: number, index: number) => {
        //     const updatedItems = [...tableData];
        //     updatedItems[index] = {
        //         ...updatedItems[index],
        //         discountAmount: discount,
        //         discountPercent: Number((discount / Number(updatedItems[index]['unitPrice'] * updatedItems[index]['quantity'])).toFixed(4)) * 100
        //     };
        //     setTableData(updatedItems);
        // }
        const handleDiscountAmtChange = (index: number, value: any) => {
            const updatedItems = [...tableData];
            updatedItems[index].discountAmt = parseFloat(value) || 0;
            updatedItems[index].discountPercent = ((updatedItems[index].discountAmt / (updatedItems[index].unitPrice * updatedItems[index].quantity)) * 100).toFixed(2);
            setDiscountAmt(value);
            setDiscountPercent(updatedItems[index].discountPercent)
            handleInputChange(index, updatedItems[index].discountAmt, 'discountAmt');
            handleInputChange(index, updatedItems[index].discountPercent, 'discountPercent')
            setTableData(updatedItems);
        };
        const handleInputChange = useCallback((index: number, value: any, field: string) => {
            const updatedItems = [...items];
            updatedItems[index][field] = Number(value);
            setItems(updatedItems);
        }, [items]);
        const handleItemsDataChange = useCallback((index: number, field: string, value: string | number) => {
            const updatedItems = [...items];
            updatedItems[index][field] = value;
            setItems(updatedItems);
            // console.log(items)
        }, [items]);

        const handleProductSelect = useCallback(async (selectedProduct: any, index: number) => {
            console.log(selectedProduct);

            if (selectedProduct.value) {
                if (index === items.length - 1) {
                    items.push({
                        productId: null,
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
                        defaultUnit:selectedProduct.value.defaultUnit,
                        quantity: data.value.quantity || 1,
                        productId: selectedProduct.value.id,
                        itemName: data.value.itemName,
                        gst: data.value.tax
                    };
                    setItems(updatedItems);

                    console.log("this is the item", items)
                } catch (error) {
                    console.error("Error fetching product details from API:", error);
                }
            }
        }, [items, products]);




        useEffect(() => {
            setItems(items);
            //setTableData(items)
        }, [items]);

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


   

    const handleDistributorAdd = () => {
        togglePopup1; // Close the popup
        const url = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/getAll?branchId=${appState.currentBranchId}`;
        
        // Use mutate to refresh the distributor list from the API
        // mutate(url, async () => {
        //     const response = await fetch(url);
        //     const updatedDistributors = await response.json();
        //     setDistributorData(updatedDistributors); // Update distributorData in DataContext
        //     return updatedDistributors;
        // });
    };
    
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
                    
                    
                    <Button 
                    className='bg-textGreen text-white capitalize h-9 flex border-none px-4 py-2.5  rounded-md cursor-pointer' 
                    onClick={ togglePopup1}>

                    <div className='flex pr-2'><Image src={addicon1} alt='addicon1' className='w-6 h-6 ' /></div>
                            New Distributor
                    </Button>
                    {showDistributorPopup && <Popup1 onClose={ togglePopup1}/>}
                    {/* {showDistributorPopup && <Popup1 onClose={ togglePopup1} />} */}
                   

                    <Button
                                    variant="solid"
                                    className="capitalize h-9 flex border-none bg-black px-4 py-2.5 text-white rounded-md cursor-pointer" onClick={togglePopup}>
                                    <div className='flex pr-2'><Image src={addicon} alt='addicon' className='w-6 h-6 ' /></div>New Product </Button>
                                    {showPopup && <Popup onClose={togglePopup} setNewProduct ={setNewProduct} setIsNewProductClicked={setIsNewProductClicked}/>}
                    
                </div>
                <div className="flex-col w-full pr-[16px] pl-[16px] pt-[20px] overflow-auto max-h-[40rem]">
                    <NewPurchasesHeader  existingHeaderData={otherData} isNewDistributorClicked={isNewDistributorClicked} newDistributor={newDistributor} />
                   
                <div>
                <div className="w-full rounded-md border border-solid border-borderGrey">
                    <div className="w-full h-[84px] p-6 bg-white rounded-t-md  justify-between items-center gap-6 flex border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey">
                        <div className="text-gray-500 text-xl font-medium ">
                            Items
                        </div>
                            

                                    {/* <div className="flex items-center justify-center ">

                                    <Button onClick={handleAddItem} className='cursor-pointer text-white flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-md border-0 outline-none'>
                                        <div className='w-4 h-4 mb-3 mr-2'>
                                            <Image src={addicon} alt='addicon' />
                                        </div>

                                        Add Item

                                    </Button>
                                </div> */}

                                </div>
                                <div className="flex">
                                    <div className="w-full overflow-x-auto overflow-y-hidden">
                                        <div className='flex w-[125%] justify-evenly items-center box-border bg-gray-100 h-12  text-gray-500 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey'>
                                            <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[5rem]'>No.</div>
                                            <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[18rem]'>Name</div>
                                            <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[15rem]'>Quantity</div>

                                            <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[10rem]'>Unit Price</div>
                                            <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[10rem]'>Subtotal</div>
                                            <div className=' flex text-gray-500 text-base font-medium w-[10rem]'>Tax %</div>
                                            <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[10rem]'>Tax Amt.</div>
                                            <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[10rem]'>Discount %</div>
                                            <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[10rem]'>Discount Amt.</div>
                                            <div className=' flex text-gray-500 text-base font-medium px-[10px] w-1/12'></div>

                                        </div>

                                        {items.map((item: any, index: number) => (
                                            <div key={index + 1} className='flex justify-evenly items-center w-[125%] box-border bg-white border-t-0 border-r-0 border-l-0 border-b border-solid border-gray-200 text-gray-400 h-12'>
                                                <div key={index + 1} className=' flex text-textGrey2 text-base font-medium px-[10px] w-[5rem]'>{index + 1}.</div>
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
                                                            styles={customStyles}
                                                        />) : (
                                                        item.itemName
                                                    )}
                                                </div>
                                                <div className=' flex text-textGrey2 text-base font-medium w-[15rem] items-center gap-2'>
                                                    <div className='flex items-center text-textGrey2 text-base font-medium gap-1 bg-white'>
                                                        <button className="border-0 rounded-md cursor-pointer" onClick={() => handleQuantityDecClick(item.productId)}>
                                                            <Image className='rounded-md w-6 h-4' src={Subtract} alt="-"></Image>
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => handleInputChange(index, e.target.value, 'quantity')}
                                                            className="w-[3rem] text-center border border-solid border-borderGrey h-8  rounded-md text-textGrey2 font-medium text-base"
                                                            name={`quantity-${index + 1}`}
                                                        />

                                                        {/* {item.quantity} */}
                                                        <button className="border-0 rounded-md cursor-pointer" onClick={() => handleQuantityIncClick(item.productId)}>
                                                            <Image className="rounded-md w-6 h-4" src={Add} alt="+"></Image>
                                                        </button>
                                                        {item?.defaultUnit}
                                                    </div>
                                                   
                                                </div>

                                                <div className=' flex text-textGrey2 text-base font-medium w-[10rem] items-center gap-1'>
                                                    ₹
                                                    <input

                                                        type="number"
                                                        value={item.unitPrice}
                                                        className="w-[80%] border border-solid border-borderGrey outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                                        onChange={(e) => handleItemsDataChange(index, 'unitPrice', e.target.value)}
                                                        name={`unitPrice-${index + 1}`}

                                                    />
                                                </div>
                                                <div className=' flex text-textGrey2 text-base font-medium w-[10rem] items-center gap-1'>
                                                    ₹
                                                    <input
                                                        readOnly
                                                        type="number"
                                                        value={item.quantity * Number(item.unitPrice)}
                                                        className="w-[80%] border border-solid border-borderGrey outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                                        onChange={(e) => handleItemsDataChange(index, 'subTotal', e.target.value)}
                                                        name={`subTotal-${index + 1}`}

                                                    />
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
                                                    {(item.gst)?(item.gst * 100).toFixed(2) : 0}%
                                                    {/* )} */}
                                                </div>
                                                <div className=' flex text-textGrey2 text-base font-medium w-[10rem] items-center gap-1'>
                                                    
                                                    ₹{(item.quantity && item.unitPrice && item.gst ? (item.quantity * item.gst * Number(item.unitPrice)).toFixed(2) : 0)}

                                                </div>
                                                <div className=' flex text-textGrey2 text-base font-medium w-[10rem] items-center gap-1'>
                                                    <input
                                                        type="number"
                                                        value={item.discountPercent ? item.discountPercent : 0}
                                                        className="w-[80%] border border-solid border-borderGrey outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                                        onChange={(e) =>  handleDiscountPercentChange(index, e.target.value)}
                                                        name={`discountPercent-${index + 1}`}
                                                    />
                                                    %
                                                </div>

                                                <div className=' flex text-textGrey2 text-base font-medium w-[10rem] items-center gap-1'>
                                                    ₹
                                                    <input
                                                        type="number"
                                                        value={(item.discountAmt ? item.discountAmt : 0)}
                                                        className="w-[80%] border border-solid border-borderGrey outline-none h-8  rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                                        onChange={(e) => handleDiscountAmtChange(index, e.target.value)}
                                                        name={`discountAmount-${index + 1}`}
                                                    />
                                                </div>
                                                <div className='w-1/12 flex items-center text-textGrey2 text-base font-medium gap-[20px] justify-end pr-6'>
                                                    {/* <button className="border-0 bg-transparent w-4 h-4">
                                        <Image src={sellicon} alt="sell" className="w-4 h-4"></Image>
                                    </button> */}
                                                    {/* <button className="border-0 bg-transparent w-5 h-5 cursor-pointer" onClick={() => handleDeleteRow(index)}>
                                                    <Image src={delicon} alt="delete" className="w-5 h-5" ></Image>
                                                </button> */}
                                                </div>
                                            </div>
                                        ))}

                                        <div className='flex  w-[125%] justify-evenly items-center box-border bg-gray-100 h-12 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey py-5  text-textGrey2 '>
                                            <div className=' flex text-gray-500 text-base font-medium px-[10px] w-[5rem]'></div>
                                            <div className=' flex text-gray-500 text-base font-bold w-[18rem]'>Total</div>
                                            <div className=' flex text-gray-500 text-base font-bold w-[15rem]'>{items.reduce((acc, item) => { if (!item.itemName) return acc; return acc + item.quantity }, 0) ||
                                                0} Items</div>

                                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'></div>
                                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'>₹{items.reduce((acc, item) => !item.itemName || isNaN(item.quantity) || isNaN(item.unitPrice) ? acc : acc + (item.quantity * Number(item.unitPrice)), 0).toFixed(2)}</div>

                                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'></div>
                                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'>₹{items.reduce((acc, item) => !item.itemName || isNaN(item.quantity) || isNaN(item.unitPrice) || isNaN(item.gst) ? acc : acc + (item.gst * (item.quantity * Number(item.unitPrice))), 0).toFixed(2)}</div>

                                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'></div>
                                            <div className=' flex text-gray-500 text-base font-bold w-[10rem]'>₹{items.reduce((acc, item) => !item.itemName || isNaN(item.quantity) || isNaN(item.unitPrice) || isNaN(item.discountPercent) ? acc : acc + ((item.discountPercent / 100) * (item.quantity * Number(item.unitPrice))), 0).toFixed(2)}</div>

                                            <div className=' flex text-gray-500 text-base font-bold w-1/12'></div>
                                        </div>
                                    </div>
                                    <div className="flex-col shadow-left">
                                        <div className="flex items-center justify-center  w-[10rem] h-12 text-gray-500 border-t-0 border-r-0 border-l border-b border-solid border-borderGrey">
                                            <div className=' flex text-gray-500 text-base font-medium '>Total</div>
                                        </div>
                                        {items.map((item: any, index: number) => (
                                            <div key={item.productId} className="flex items-center justify-center  w-[10rem] box-border bg-white text-gray-500 border-t-0 border-r-0 border-l border-b border-solid border-gray-200 h-12">
                                                <div className='flex text-gray-500 text-base font-medium'>
                                                    ₹{isNaN(((item.gst - (item.discountPercent || 0) / 100 + 1) * (item.quantity * Number(item.unitPrice))))
                                                        ? 0
                                                        : ((item.gst - (item.discountPercent || 0) / 100 + 1) * (item.quantity * Number(item.unitPrice))).toFixed(2)}
                                                </div>


                                            </div>
                                        ))}
                                        <div className='flex text-textGreen text-base font-bold w-[10rem] h-12 items-center justify-center'>
                                            ₹{items.reduce((acc, item) => {
                                                if (!item.itemName || isNaN(item.quantity) || isNaN(item.unitPrice)) return acc;
                                                return acc + (item.gst - (item.discountPercent || 0) / 100 + 1) * (item.quantity * Number(item.unitPrice));
                                            }, 0).toFixed(2)}
                                        </div>


                                    </div>
                                </div>


                            </div>
                        </div>

                <NewPurchasesTotalAmount orderData={orderData} />
            </div>
            <NewPurchasesBottomBar orderData={orderData}/>
        </div>
        {showPopup && <Popup onClose={togglePopup} />}
     
       
        </>
    )

    }

    export default NewPurchasesTable;