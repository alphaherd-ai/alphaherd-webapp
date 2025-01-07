'use client';

import Subtract from "../../../../../assets/icons/finance/Subtract.svg"
import Add from "../../../../../assets/icons/finance/add (2).svg"
import delicon from "../../../../../assets/icons/finance/1. Icons-27.svg"
import addicon from "../../../../../assets/icons/finance/add.svg"

import sellicon from "../../../../../assets/icons/finance/sell.svg"
import { Tax } from '@prisma/client';

import formatDateAndTime from '@/utils/formateDateTime';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import Select from 'react-select';
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import NewsalesHeader from "./header"
import { Button} from "@nextui-org/react";
import NewsalesBottomBar from './bottombar';
import NewsalesTotalAmout from './totalamount';

import ClientPopup from '@/components/database/client/newclientpopoup';
import { DataContext } from './DataContext';
import { useAppSelector } from "@/lib/hooks";
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import StockConfirmationPopup from '@/utils/stockConfirmationpopup';

import { table } from 'console';
import { original } from '@reduxjs/toolkit';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

interface Products {
    id: string,
    itemName: string,
    productBatch: ProductBatch[],
    hsnCode: string,
    quantity: number
    tax: number,
    defaultUnit: number,
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
}
function useProductfetch(id: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${id}`, fetcher, { revalidateOnFocus: true });
    return {
        fetchedProducts: data,
        isLoading,
        error
    }
}
function useProductBatchfetch(id: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/getAll/?branchId=${id}`, fetcher, { revalidateOnFocus: true });
    return {
        fetchedBathces: data,
        isBatchLoading: isLoading,
        batchError: error
    }
}

function useServiceFetch(id: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/getAll?branchId=${id}`, fetcher, { revalidateOnFocus: true });
    return {
        fetchedService: data,
        serviceLoading: isLoading,
        serviceError: error,
    }
}


function DataFromEstimate(id: number | null, branchId: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/${id}/?branchId=${branchId}`, fetcher);
    return {
        data,
        isLoading,
        error
    }
}
const NewsalesTable = () => {
    const { tableData, setTableData, headerData, setHeaderData } = useContext(DataContext);
    const [selectedProductDetails, setSelectedProduct] = useState<Products>()
    const [discountPercent, setDiscountPercent] = useState<any>();
    const [discountAmt, setDiscountAmt] = useState<any>();
    const [products, setProducts] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [batches, setBatches] = useState<any[]>([]);
    const [filteredBatches, setFilteredBatches] = useState<any[]>([]);
    const [filteredProviders, setFilteredProviders] = useState<any[]>([]);
    const [otherData, setOtherData] = useState({});
    const [isNewClientClicked, setIsNewClientClicked] = useState<any>(false);
    const [newClient, setNewClient] = useState<any>();
    const appState = useAppSelector((state) => state.app)
    const url = useSearchParams();
    const id = url.get('id');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmAction, setAction] = useState<string>('idle');
    const [selectedBatchQuantity, setSelectedBatchQuantity] = useState<number>(0);
    const [selectedBatch, setSelectedBatch] = useState<any>();
    const [currIndex, setCurrIndex] = useState<number>(0);





    let estimateData: any = null, isEstimateDataLoading = false, isEstimateDataError = false;
    const { tableData: items, setTableData: setItems } = useContext(DataContext);
    if (id) {
        const { data, isLoading, error } = DataFromEstimate(Number(id), appState.currentBranchId);
        estimateData = data;
        isEstimateDataError = error;
        isEstimateDataLoading = isLoading;
    }

    useEffect(() => {
        if (!isEstimateDataLoading && estimateData && !isEstimateDataError) {
            const { items, ...otherData } = estimateData;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            setOtherData(otherData)
            console.log(estimateData);
            const shallowDataCopy = [...items];
            const itemData = shallowDataCopy.map((item: any) => ({
                itemType: item.itemType,
                productId: item.itemType === "product" ? item?.productBatch?.productId : null,
                serviceId: item.itemType === "product" ? null : item.serviceId,
                itemName: item.name,
                quantity: item.quantity,
                defaultUnit: item.itemType === 'product' ? item.products.defaultUnit : "",
                sellingPrice: item.sellingPrice,
                expiry: item.itemType === 'product' ? item.productBatch.expiry : "",
                batchNumber: item.itemType === 'product' ? item.productBatch.batchNumber : "",
                gst: item.taxAmount,
                id: item.itemType === 'product' ? item.productBatch.id : item.serviceId,
                provider: item.itemType === 'product' ? "" : item.serviceProvider
            }));
            console.log(itemData);
            setItems((prev: any[]) => [...itemData, ...prev,]);

        }
    }, [estimateData, id,isEstimateDataLoading,isEstimateDataError]);

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



    const [discountStates, setDiscountStates] = useState(new Array(items.length).fill(false));
    const discountOptions = [
        { value: 0.05, label: "5% off" },
        { value: 0.08, label: "8% off" },
        { value: 0.10, label: "10% off" },
        { value: 0.12, label: "12% off" },
        { value: 0.15, label: "15% off" },
    ]
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
    const { fetchedProducts, isLoading, error } = useProductfetch(appState.currentBranchId);
    const { fetchedBathces, isBatchLoading, batchError } = useProductBatchfetch(appState.currentBranchId);
    const { fetchedService, serviceLoading, serviceError } = useServiceFetch(appState.currentBranchId);


    useEffect(() => {
        if (!isLoading && products && !error) {
            //console.log(products);
            const formattedProducts = fetchedProducts.map((product: Products) => ({
                value: {
                    id: product.id,
                    quantity: product.quantity,
                    itemName: product.itemName,
                    tax: product.tax,
                    defaultUnit: product.defaultUnit,
                },
                label: product.itemName,
            }));
            //console.log(formattedProducts)
            setProducts(formattedProducts);
        }
        if (!batchError && !isBatchLoading && fetchedBathces) {
            console.log(fetchedBathces);
            const formattedProductBatches = fetchedBathces.map((product: ProductBatch) => ({
                value: {
                    id: product.id,
                    productId: product.productId,
                    quantity: 1,
                    batchNumber: product.batchNumber,
                    expiry: product.expiry,
                    sellingPrice: product.sellingPrice,
                    originalQuantity: product.quantity
                },
                label: product.batchNumber
            }));
            // console.log(formattedProductBatches)
            setBatches(formattedProductBatches)
        }
        if (!serviceError && !serviceLoading && fetchedService) {
            //console.log(fetchedService);
            const formattedServices = fetchedService.map((service: any) => ({
                value: {
                    id: service.id,
                    name: service.name,
                    providers: service.providers,
                    serviceCharge: service.serviceCharge,
                    tax: service.tax
                },
                label: service.name
            }))
            setServices(formattedServices)
        }


    }, [fetchedProducts, fetchedBathces, fetchedService])

    const handleDeleteRow = useCallback((index: number) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
        setTableData(updatedItems);
    }, [items]);

    // const handleGstSelect = (selectedGst: any, index: number) => {
    //     const updatedItems = [...tableData];
    //     console.log(selectedGst)
    //     updatedItems[index] = {
    //         ...updatedItems[index],
    //         gst: selectedGst.value
    //     };
    //     setTableData(updatedItems);
    // };



    // const handleEditButtonClick = () => {
    //     setDisableButton(!disableButton);
    // };

    // const handleCheckBoxChange = () => {
    //     setChecked(!isChecked);
    //     setItems((prevItems) =>
    //         prevItems.map((item) => ({
    //             ...item,
    //             quantity: isChecked ? item.quantity * 2 : item.quantity,
    //         }))
    //     );
    // };

    const handleDiscountPercentChange = (index: number, value: any) => {
        const updatedItems = [...tableData];
        updatedItems[index].discountPercent = parseFloat(value) || 0;
        updatedItems[index].discountAmt = (((updatedItems[index].sellingPrice * updatedItems[index].quantity) * updatedItems[index].discountPercent) / 100);
        setDiscountAmt(updatedItems[index].discountAmt);
        setDiscountPercent(value);
        handleInputChange(index, updatedItems[index].discountAmt, 'discountAmt');
        handleInputChange(index, updatedItems[index].discountPercent, 'discountPer')
        setTableData(updatedItems);
    };

    const handleDiscountAmtChange = (index: number, value: any) => {
        const updatedItems = [...tableData];
        updatedItems[index].discountAmt = parseFloat(value) || 0;
        updatedItems[index].discountPercent = ((updatedItems[index].discountAmt / (updatedItems[index].sellingPrice * updatedItems[index].quantity)) * 100).toFixed(2);
        setDiscountAmt(value);
        setDiscountPercent(updatedItems[index].discountPercent)
        handleInputChange(index, updatedItems[index].discountAmt, 'discountAmt');
        handleInputChange(index, updatedItems[index].discountPercent, 'discountPer')
        setTableData(updatedItems);
    };

    const handleQuantityDecClick = (itemId: any) => {
        console.log(itemId);
        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === itemId && item.quantity > 1) {
                    const newQuantity = item.quantity - 1;
                    const updatedDiscountAmt = (item.sellingPrice * newQuantity * item.discountPercent) / 100 || 0;
                    return { ...item, quantity: newQuantity, discountAmt: updatedDiscountAmt };
                }

                return item;
            })
        );

    };

    const handleQuantityIncClick = (itemId: any) => {
        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === itemId) {
                    const newQuantity = item.quantity + 1;
                    const updatedDiscountAmt = (item.sellingPrice * newQuantity * item.discountPercent) / 100 || 0;
                    return { ...item, quantity: newQuantity, discountAmt: updatedDiscountAmt };
                }
                return item;
            })
        );
    };


    // const handleQuantityDecClick1 = (itemId: any) => {
    //     setItems((prevItems) =>
    //         prevItems.map((item) => {
    //             if (item.id === itemId && item.quantity2 > 1) {
    //                 return { ...item, quantity2: item.quantity2 - 1 };
    //             }
    //             return item;
    //         })
    //     );
    // };

    // const handleQuantityIncClick1 = (itemId: any) => {
    //     setItems((prevItems) =>
    //         prevItems.map((item) => {
    //             if (item.id === itemId) {
    //                 return { ...item, quantity2: item.quantity2 + 1 };
    //             }
    //             return item;
    //         })
    //     );
    // };





    useEffect(() => {

        items.push({
            productId: null,
            serviceId: null,
            itemName: "",
        });
        setItems(items);

    }, [])

    useEffect(() => {
        if (tableData.length === 0) {
            setSelectedProduct(undefined);
        }
    }, [tableData])

    // useEffect(()=>{
    //     handleAddItem();
    // },[])




    const handleInputChange = useCallback((index: number, value: any, field: string) => {
        const updatedItems = [...items];
        updatedItems[index][field] = Number(value);
        setItems(updatedItems);
    }, [items]);


    const handleProductSelect = useCallback(async (selectedProduct: any, index: number) => {
        //console.log(selectedProduct);
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
                const productdata = products.find((product) => product.value.id === selectedProduct.value.id);
                const servicedata = services.find((service) => service.value.id === selectedProduct.value.id);

                if (servicedata) {
                    const formattedProviders = servicedata.value.providers.map((provider: any) => ({
                        value: provider,
                        label: provider,
                    }));
                    //console.log(formattedProviders);
                    setFilteredProviders(formattedProviders);
                }
                //console.log(productdata);
                setSelectedProduct(productdata ? productdata : servicedata);
                const updatedItems = [...items];
                updatedItems[index] = {
                    ...updatedItems[index],
                    quantity: 1,
                    defaultUnit: productdata ? selectedProduct?.value?.defaultUnit : "",
                    itemType: productdata ? "product" : "service",
                    productId: productdata ? selectedProduct.value.id : null,
                    serviceId: servicedata ? selectedProduct.value.id : null,
                    itemName: productdata ? productdata.value.itemName : servicedata.value.name,
                    gst: productdata ? productdata.value.tax : servicedata.value.tax / 100
                };
                setItems(updatedItems);
                console.log(items);

                if (productdata) {
                    console.log('updation here product', index)
                    const productBatches = batches?.filter((batch) => batch.value.productId === selectedProduct.value.id).sort((a, b) => a.value.id - b.value.id);
                    setFilteredBatches(productBatches);
                    const defaultBatch = productBatches?.[0];
                    console.log(defaultBatch)
                    setItems((prevItems) =>
                        prevItems.map((item, itemIndex) =>
                            itemIndex === index ? {
                                ...item, id: defaultBatch?.value?.id,
                                quantity: defaultBatch?.value?.quantity || 1,
                                //batchNumber: defaultBatch?.value?.batchNumber,
                                expiry: defaultBatch?.value?.expiry,
                                sellingPrice: defaultBatch?.value?.sellingPrice,
                                productId: defaultBatch?.value?.productId
                            } : item
                        )
                    );
                    setSelectedBatch(defaultBatch);
                    setSelectedBatchQuantity(defaultBatch?.value?.originalQuantity || 0);
                    setCurrIndex(index);
                    if (defaultBatch?.value?.originalQuantity <= 0) {
                        setShowConfirmation(true);
                    }
                    console.log(items);
                }
                else if (servicedata) {
                    console.log('updation here service', index)
                    setItems((prevItems) =>
                        prevItems.map((item, itemIndex) =>
                            itemIndex === index ? {
                                ...item,
                                id: servicedata?.value?.id,
                                sellingPrice: servicedata?.value?.serviceCharge,
                                quantity: 1,
                            } : item
                        )
                    )
                }

                //console.log(updatedItems);


            } catch (error) {
                console.error("Error fetching product details from API:", error);
            }
        }
    }, [items, products, services]);

    const handleBatchSelect = useCallback(async (selectedProduct: any, index: number) => {
        if (selectedProduct.value) {
            try {

                const data = filteredBatches.find((batch) => batch.value.id == selectedProduct.value.id);
                // console.log(data)
                const updatedItems = [...items];
                updatedItems[index] = {
                    ...updatedItems[index],
                    id: data.value.id,
                    quantity: data.value.quantity,
                    batchNumber: data.value.batchNumber,
                    expiry: data.value.expiry,
                    sellingPrice: data.value.sellingPrice,
                    productId: data.value.productId
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


    const handleProviderSelect = useCallback((selectedProvider: any, index: number) => {
        const updatedItems = [...tableData];
        updatedItems[index] = {
            ...updatedItems[index],
            provider: selectedProvider.value,
        };
        setTableData(updatedItems);
    }, [tableData]);



    useEffect(() => {
        if (id == null) {
            setItems(items);
            setTableData(items);
        }
        console.log(items);
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
        menuPortal: (base: any) => ({ ...base, zIndex: 9999 })
    };

    return (
        <>
            <div className="w-full h-full flex-col justify-start items-start flex mt-2 bg-gray-100 rounded-lg border border-solid border-borderGrey">
                {showConfirmation && <StockConfirmationPopup quantity={selectedBatchQuantity} setAction={setAction} setShowConfirmation={setShowConfirmation} />}
                <div className="w-full h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-b border-t-0 border-r-0 border-l-0 border-solid border-borderGrey justify-between items-center gap-6 flex">
                    <div>

                    </div>
                    {/* <div className='bg-[#E7F5EE] rounded-md px-2 py-2' >
                        <span className="text-[#0F9D58]  text-sm font-medium ">You’re owed: </span>
                        <span className="text-[#0F9D58] text-sm font-bold "> ₹ 2,124</span>
                    </div> */}

                    <Button
                        onClick={togglePopup}
                        variant="solid"
                        className="capitalize h-9 flex border-none bg-black px-4 py-2.5 text-white rounded-md cursor-pointer">
                        <div className='flex pr-2'>
                            <Image src={addicon} alt='addicon' className='w-6 h-6 ' />
                        </div>
                        New Client
                    </Button>
                    {showPopup && <ClientPopup onClose={togglePopup} setNewClient={setNewClient} setIsNewClientClicked={setIsNewClientClicked} />}

                </div>
                <div className="flex-col w-full pr-[16px] pl-[16px] pt-[20px]">
                    <NewsalesHeader existingHeaderData={otherData} isNewClientClicked={isNewClientClicked} newClient={newClient} />
                    <div className="w-full rounded-md border border-solid border-borderGrey">
                        <div className="w-full h-[84px] p-6 bg-white rounded-t-md  justify-between items-center gap-6 flex border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey">
                            <div className="text-gray-500 text-xl font-medium ">Items & Services</div>
                            <div className="flex items-center justify-center ">

                                {/* <Button onClick={handleAddItem}  className='cursor-pointer text-white flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-md border-0 outline-none'>
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
                                <div className='flex text-gray-500 text-base font-medium w-[12rem]'>Name</div>
                                <div className='flex text-gray-500 text-base font-medium w-[8rem]'>Batch No./Provider</div>
                                <div className='flex text-gray-500 text-base font-medium w-[7rem]'>Selling Price</div>
                                <div className='flex text-gray-500 justify-center text-base font-medium w-[8rem]'>Quantity</div>
                                <div className='flex justify-center text-gray-500 text-base font-medium w-[6rem]'>Tax %</div>
                                <div className='flex text-gray-500 justify-center text-base font-medium  w-[10rem]'>Tax Amt.</div>
                                <div className='flex text-gray-500 text-base font-medium w-[6rem] mr-4'>Discount %</div>
                                <div className='flex text-gray-500 text-base font-medium  w-[8rem]'>Discount Amt.</div>
                                <div className='flex text-gray-500 text-base font-medium w-1/12'>Total</div>
                                <div className='flex text-gray-500 text-base font-medium w-1/12 '></div>
                            </div>
                            {items.map((item: any, index: number) => (
                                <div key={index + 1} className='flex justify-evenly items-center w-full box-border bg-white border border-solid border-gray-200 text-gray-400 py-2'>
                                    <div className='w-[3rem] flex items-center text-neutral-400 text-base font-medium '>{index + 1}.

                                    </div>
                                    <div className='w-[12rem] flex items-center text-neutral-400 text-base font-medium'>
                                        {id === null ? (
                                            <Select
                                                className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0"
                                                classNamePrefix="select"
                                                value={
                                                    tableData.length === 0
                                                        ? null // When tableData is empty, set value to null
                                                        : products.concat(services).find(
                                                            (prodOrServ) =>
                                                                prodOrServ.value.id === item.productId ||
                                                                prodOrServ.value.id === item.serviceId
                                                        ) || null
                                                }
                                                isClearable={false}
                                                isSearchable={true}
                                                name="itemName"
                                                options={[...products, ...services]}
                                                onChange={(selectedProduct: any) => handleProductSelect(selectedProduct, index)}
                                                styles={customStyles}
                                            />) : (
                                            item.itemName ? item.itemName : <Select
                                                className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0"
                                                classNamePrefix="select"
                                                value={
                                                    tableData.length === 0
                                                        ? null // When tableData is empty, set value to null
                                                        : products.concat(services).find(
                                                            (prodOrServ) =>
                                                                prodOrServ.value.id === item.productId ||
                                                                prodOrServ.value.id === item.serviceId
                                                        ) || null
                                                }
                                                isClearable={false}
                                                isSearchable={true}
                                                name="itemName"
                                                options={[...products, ...services]}
                                                onChange={(selectedProduct: any) => handleProductSelect(selectedProduct, index)}
                                                styles={customStyles}
                                            />

                                        )}
                                    </div>
                                    <div className='w-[8rem] flex-col items-center text-neutral-400 text-base font-medium'>
                                        {item.itemType === 'product' && (
                                            id === null ? (

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
                                                item.batchNumber ? item.batchNumber : <Select
                                                    className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0"
                                                    classNamePrefix="select"
                                                    value={filteredBatches.find((prod) => prod.value.id === item.id)}
                                                    isClearable={false}
                                                    isSearchable={true}
                                                    name={`batchNumber=${index}`}
                                                    options={filteredBatches}
                                                    onChange={(selectedProduct: any) => handleBatchSelect(selectedProduct, index)}
                                                    styles={customStyles}
                                                />
                                            )
                                        )}

                                        {item.itemType === 'service' && (
                                            id === null ? (

                                                <Select
                                                    className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0"
                                                    classNamePrefix="select"
                                                    value={filteredProviders.find((prod) => prod.value.id === item.id)}
                                                    isClearable={false}
                                                    isSearchable={true}
                                                    name={`providerNumber=${index}`}
                                                    options={filteredProviders}
                                                    onChange={(selectedProduct: any) => handleProviderSelect(selectedProduct, index)}
                                                    styles={customStyles}
                                                />
                                            ) : (
                                                item.provider ? item.provider :
                                                    <Select
                                                        className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0"
                                                        classNamePrefix="select"
                                                        value={filteredProviders.find((prod) => prod.value.id === item.id)}
                                                        isClearable={false}
                                                        isSearchable={true}
                                                        name={`providerNumber=${index}`}
                                                        options={filteredProviders}
                                                        onChange={(selectedProduct: any) => handleProviderSelect(selectedProduct, index)}
                                                        styles={customStyles}
                                                    />
                                            )
                                        )}




                                        {item.expiry && formatDateAndTime(item.expiry).formattedDate && (
                                            <div className="text-textGrey2 text-[13px] font-medium  px-2">{formatDateAndTime(item.expiry).formattedDate}</div>
                                        )}                                </div>
                                    <div className='w-[7rem] flex items-center text-neutral-400 text-base font-medium'>
                                        ₹{item.sellingPrice || 0}
                                        {/* <Select
                                    className="text-neutral-400 text-sm font-medium"
                                    defaultValue={taxOptions[0]}
                                    isClearable={false}
                                    isSearchable={true}
                                    options={taxOptions}
                                    styles={customStyles}
                                /> */}
                                    </div>

                                    <div className='w-[8rem] justify-center flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                        <div className='flex items-center text-textGrey2 text-base font-medium gap-1 bg-white'>
                                            <button className="border-0 rounded-md cursor-pointer" onClick={() => handleQuantityDecClick(item.id)}>
                                                <Image className='rounded-md w-6 h-4' src={Subtract} alt="-"></Image>
                                            </button>
                                            <input
                                                type="number"
                                                value={item.quantity ? item.quantity : 0}
                                                onChange={(e) => handleInputChange(index, e.target.value, 'quantity')}
                                                className="w-[3rem] text-center border border-solid border-borderGrey h-8  rounded-md text-textGrey2 font-medium text-base"
                                                name={`quantity-${index + 1}`}
                                            />

                                            {/* {item.quantity} */}
                                            <button className="border-0 rounded-md cursor-pointer" onClick={() => handleQuantityIncClick(item.id)}>
                                                <Image className="rounded-md w-6 h-4" src={Add} alt="+"></Image>
                                            </button>
                                        </div> {item?.defaultUnit}
                                    </div>

                                    <div className='w-[6rem] justify-center flex items-center text-neutral-400 text-base font-medium'>
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
                                        {item.gst * 100 || 0}%
                                        {/* )} */}
                                    </div>

                                    <div className='w-[10rem] justify-center flex items-center text-neutral-400 text-base font-medium'>{`₹${((item?.sellingPrice * item?.quantity * item?.gst) || 0).toFixed(2)}`}</div>
                                    <div className='w-[6rem] flex mr-4 items-center text-neutral-400 text-base font-medium'>
                                        <input className='w-[3rem] outline-none border border-solid border-borderGrey text-neutral-400 px-2 py-1 rounded-md mr-1' placeholder='0' type='number' value={item.discountPer ? item.discountPer : 0} onChange={(e) => handleDiscountPercentChange(index, e.target.value)}></input> %
                                    </div>
                                    <div className='w-[8rem] flex items-center text-neutral-400 text-base font-medium'>
                                        ₹<input className='w-[5rem] text-neutral-400 border border-solid border-borderGrey px-2 py-1  outline-none rounded-md ml-1' placeholder='0' type='number' value={item.discountAmt ? item.discountAmt : 0} onChange={(e) => handleDiscountAmtChange(index, e.target.value)}></input>
                                    </div>
                                    <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium'>{`₹${(
                                        (item.quantity || 0) * (item.sellingPrice || 0) +
                                        (item.quantity || 0) * (item.sellingPrice || 0) * (item.gst || 0) -
                                        ((item.quantity || 0) * (item.sellingPrice || 0) * (item.discountPer || 0) / 100)
                                    ).toFixed(2)}`}</div>
                                    {index !== items.length - 1 ?
                                        <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium gap-[20px] justify-end'>
                                            <button className="border-0 bg-transparent cursor-pointer">
                                                <Image className='w-5 h-5' src={sellicon} alt="sell" ></Image>
                                            </button>

                                            <button className="border-0 bg-transparent cursor-pointer" onClick={() => handleDeleteRow(index)}>
                                                <Image className='w-5 h-5' src={delicon} alt="delete" ></Image>
                                            </button>
                                        </div> : <div className='w-1/12 flex items-center text-neutral-400 text-base font-medium gap-[20px] justify-end'></div>}
                                </div>
                            ))}
                            <div className='flex w-full justify-evenly items-center box-border bg-gray-100 h-12  text-gray-500 border-t-0 border-r-0 border-l-0 border-b border-solid border-borderGrey'>
                                <div className='flex text-gray-500 text-base font-medium w-[3rem]'></div>
                                <div className='flex text-gray-500 text-base font-medium w-[12rem]'>Total</div>
                                <div className='flex text-gray-500 text-base font-medium w-[8rem]'></div>
                                <div className='flex text-gray-500 text-base font-medium w-[7rem]'></div>
                                <div className='flex justify-center text-gray-500 text-base font-medium w-[8rem]'>{(items.reduce((acc: any, item: any) => { if (!item.itemName) return acc; return acc + item.quantity }, 0)) || 0} Items</div>
                                <div className='flex text-gray-500 text-base font-medium w-[6rem]'></div>
                                <div className='flex justify-center text-gray-500 text-base font-bold  w-[10rem]'>{`₹${(items.reduce((acc: any, item: any) => {
                                    if (!item.itemName) return acc;
                                    return acc + item.quantity * item.gst * item.sellingPrice
                                }, 0) || 0).toFixed(2)}`}</div>
                                <div className='flex text-gray-500 text-base font-medium w-[6rem]'></div>

                                <div className='flex text-gray-500 text-base font-bold w-[8rem] ml-4'>{`₹${(items.reduce((acc: any, item: any) => { if (!item.itemName) return acc; return acc + (item?.discountAmt || 0) }, 0) || 0).toFixed(2)}`}</div>
                                <div className='flex text-gray-500 text-base font-bold w-1/12' >{`₹${(items.reduce((acc: any, item: any) => { if (!item.itemName) return acc; return acc + item.quantity * item.sellingPrice + item.quantity * item.gst * item.sellingPrice - (item?.discountAmt || 0) }, 0)).toFixed(2)}`}</div>

                                <div className='flex text-gray-500 text-base font-medium w-1/12'></div>
                            </div>
                        </div>
                    </div>
                    <NewsalesTotalAmout otherData={otherData} />
                </div>
                <NewsalesBottomBar estimateData={otherData} />
            </div>
        </>
    );
};

export default NewsalesTable;
