'use client';
import Image from "next/image";
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import closeicon from "../../../../assets/icons/inventory/closeIcon.svg";
import addicon from "../../../../assets/icons/inventory/add.svg";
import deleteicon from "../../../../assets/icons/loginsignup/delete.svg";
import add1icon from "../../../../assets/icons/inventory/add (1).svg";
import RadioButton from './RadioButton';
import subicon from "../../../../assets/icons/inventory/1. Icons-24 (6) (2).svg";
import checkicon from "../../../../assets/icons/inventory/check (1).svg";
import Select from 'react-select';
import calicon from "../../../../assets/icons/finance/calendar_today.svg"
import Distributors from "@/app/database/distributor/page";
import formatDateAndTime from "@/utils/formateDateTime";
import { Stock } from "@prisma/client";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Notif_Source } from "@prisma/client";
import { useAppSelector } from "@/lib/hooks";
import useSWR from 'swr';
import { ConversationContextImpl } from "twilio/lib/rest/conversations/v1/conversation";


//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
type PopupProps = {
    onClose: () => void;
    individualSelectedProduct?: Products
}
interface Distributors {
    id: string,
    distributorName: string
}
interface Products {
    id: string,
    itemName: string,
    productBatch: ProductBatch[],
    hsnCode: string,
    quantity: number
}

interface Reason {
    id: string,
    name: string | string[],
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
    location: Location;
    totalCost: number;
    maxRetailPrice: number;
}
function useProductfetch(id: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${id}`, fetcher);
    return {
        fetchedProducts: data,
        isLoading,
        error
    }
}
function useProductBatchfetch(id: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/getAll/?branchId=${id}`, fetcher);
    return {
        fetchedBathces: data,
        isBatchLoading: isLoading,
        batchError: error
    }
}
const Popup2: React.FC<PopupProps> = ({ onClose, individualSelectedProduct }: any) => {
    const [selectedOption, setSelectedOption] = useState<string>(Stock.StockIN);
    const [selectedProductDetails, setSelectedProduct] = useState<Products>()
    const [isChecked, setChecked] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [batches, setBatches] = useState<any[]>([]);
    const [filteredBatches, setFilteredBatches] = useState<any[]>([]);
    const [inventory, setInventory] = useState<any[]>([]);
    const [formData, setFormData] = useState<any>({});
    const appState = useAppSelector((state) => state.app)
    const [distributor, setDistributor] = useState<any[]>([]);

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
        placeholder: (provided: any) => ({
            ...provided,
            color: '#A2A3A3',
        }),
    };

    const { fetchedProducts, isLoading, error } = useProductfetch(appState.currentBranchId);
    const { fetchedBathces, isBatchLoading, batchError } = useProductBatchfetch(appState.currentBranchId);
    useEffect(() => {
        if (individualSelectedProduct && products.length > 0) {
            console.log(individualSelectedProduct)
            const fillItemName = () => {
                // console.log(inventory);
                console.log(fetchedProducts, products)
                const object = {
                    label: individualSelectedProduct.itemName,
                    value: {
                        id: individualSelectedProduct.id
                    }
                };
                setInventory((prevInventory) => {
                    const updatedInventory = [...prevInventory, { itemName: individualSelectedProduct.itemName }];
                    handleProductSelect(object, updatedInventory.length - 1);
                    return updatedInventory;
                });

            }
            fillItemName()
        }
    }, [individualSelectedProduct, products])
    useEffect(() => {
        if (!isLoading && products && !error) {
            const formattedProducts = fetchedProducts.map((product: Products) => ({
                value: {
                    id: product.id,
                    quantity: product.quantity,
                    itemName: product.itemName,
                    hsnCode: product.hsnCode
                },
                label: product.itemName,
            }));
            // console.log(formattedProducts)
            setProducts(formattedProducts);
        }
        if (!batchError && !isBatchLoading && fetchedBathces) {
            const formattedProductBatches = fetchedBathces.map((product: ProductBatch) => ({
                value: {
                    id: product.id,
                    productId: product.productId,
                    quantity: product.quantity,
                    batchNumber: product.batchNumber,
                    expiry: product.expiry,
                    sellingPrice: product.sellingPrice,
                    costPrice: product.costPrice,
                    location: product.location,
                    distributors: product.distributors,
                    totalCost: product.totalCost,
                    maxQuantity: product.quantity,
                    maxRetailPrice: product.maxRetailPrice
                },
                label: product.batchNumber
            }));
            // console.log("lajsdlfjlkj", formattedProductBatches)
            setBatches(formattedProductBatches)
        }
    }, [fetchedProducts, fetchedBathces, batchError, error, isBatchLoading, isLoading])

    useEffect(() => {
        inventory.push({});
        setInventory(inventory);
    }, [])

    //Handlers
    const handleRadioChange = useCallback((value: string) => {
        setSelectedOption(value);
        const updatedInventory = inventory.map((item) => ({
            ...item,
            quantity: value === Stock.StockIN ? 0 : item.quantity,
            expiry: value === Stock.StockIN ? "" : item.expiry,
            batchNumber: value === Stock.StockIN ? "" : item.batchNumber,
            totalCost: value === Stock.StockIN ? 0 : item.totalCost,
            costPrice: value === Stock.StockIN ? 0 : item.costPrice,
            sellingPrice: value === Stock.StockIN ? 0 : item.sellingPrice,
        }));
        setInventory(updatedInventory);
    }, [inventory]);

    const handleChange = (field: string, value: any) => {

        setFormData({ ...formData, [field]: value });
    };

    const handleDeleteRow = useCallback((index: number) => {
        const updatedInventory = [...inventory];
        updatedInventory.splice(index, 1);
        setInventory(updatedInventory);
    }, [inventory]);

    const handleQuantityDecClick = useCallback((index: number) => {
        const updatedInventory = [...inventory];
        updatedInventory[index].quantity = Math.max(updatedInventory[index].quantity - 1, 0);
        setInventory(updatedInventory);
    }, [inventory]);

    const handleQuantityIncClick = useCallback((index: number) => {
        const updatedInventory = [...inventory];
        if (selectedOption === Stock.StockOUT) {
            if (updatedInventory[index].quantity < updatedInventory[index].maxQuantity) {
                updatedInventory[index].quantity += 1;
            }
        } else {
            updatedInventory[index].quantity += 1;
        }

        setInventory(updatedInventory);
    }, [inventory]);

    const handleInputChange = useCallback((index: number, field: string, value: string | number) => {

        const updatedInventory = [...inventory];
        updatedInventory[index][field] = value;
        setInventory(updatedInventory);
    }, [inventory]);


    const handleCheckBoxChange = useCallback(() => {
        setChecked(!isChecked);
    }, [inventory]);

    const handleAddItemClick = useCallback(() => {
        setInventory([...inventory, {}]);
    }, [inventory]);

    const handleProductSelect = useCallback(async (selectedProduct: any, index: number) => {
        console.log(selectedProduct)
        if (index === inventory.length - 1) {
            inventory.push({});
            setInventory(inventory);
        }
        if (selectedProduct.value) {
            try {
                const data = products.find((product) => product.value.id === selectedProduct.value.id);
                // console.log(data);
                setSelectedProduct(data);
                const updatedInventory = [...inventory];
                updatedInventory[index] = {
                    ...updatedInventory[index],
                    quantity: selectedOption === Stock.StockIN ? 0 : data.value.quantity,
                    productId: data.value.id,
                    hsnCode: data.value.hsnCode
                };
                setInventory(updatedInventory);
                const productBatches = batches?.filter((batch) => batch.value.productId === selectedProduct.value.id).sort((a, b) => a.value.id - b.value.id);
                setFilteredBatches(productBatches);
                if (selectedOption === Stock.StockOUT) {
                    const defaultBatch = productBatches?.[0];
                    setInventory((prevItems) =>
                        prevItems.map((item, itemIndex) =>
                            itemIndex === index ? {
                                ...item, id: defaultBatch?.value?.id,
                                quantity: defaultBatch?.value?.quantity,
                                batchNumber: defaultBatch?.value?.batchNumber,
                                expiry: defaultBatch?.value?.expiry,
                                sellingPrice: defaultBatch?.value?.sellingPrice,
                                costPrice: defaultBatch?.value?.costPrice,
                                location: defaultBatch?.value?.location,
                                distributors: defaultBatch?.value?.distributors,
                                totalCost: defaultBatch?.value?.totalCost,
                                maxQuantity: defaultBatch?.value?.quantity,
                                maxRetailPrice: defaultBatch?.value?.maxRetailPrice,
                                productId: defaultBatch?.value?.productId
                            } :
                                item,
                        )
                    );

                }

            } catch (error) {
                console.error("Error fetching product details from API:", error);
            }
        }
    }, [inventory, products, selectedOption]);
    const handleBatchSelect = useCallback(async (selectedProduct: any, index: number) => {
        // console.log(selectedProduct);
        if (selectedProduct.value) {
            try {
                const data = filteredBatches.find((batch) => batch.value.id == selectedProduct.value.id);
                // console.log(data)
                const updatedInventory = [...inventory];
                updatedInventory[index] = {
                    ...updatedInventory[index],
                    id: data?.value?.id,
                    date: data?.value?.date,
                    time: data?.value?.time,
                    quantity: selectedOption === Stock.StockIN ? 0 : data?.value?.quantity,
                    maxQuantity: Math.max(data?.value?.quantity, data?.value?.maxQuantity),
                    batchNumber: selectedOption === Stock.StockIN ? "" : data?.value?.batchNumber,
                    expiry: selectedOption === Stock.StockIN ? "" : data?.value?.expiry,
                    costPrice: selectedOption === Stock.StockIN ? "" : data?.value?.costPrice,
                    sellingPrice: selectedOption === Stock.StockIN ? "" : data?.value?.sellingPrice,
                    totalCost: selectedOption === Stock.StockIN ? "" : data?.value?.totalCost,
                    hsnCode: selectedProductDetails?.hsnCode,
                    location: selectedOption === Stock.StockIN ? "" : data?.value?.location,
                    distributors: data?.value?.category,
                    providers: data?.value?.distributors,
                    maxRetailPrice: data?.value?.maxRetailPrice,
                    productId: data?.value?.productId,
                };
                setInventory(updatedInventory);
                // if (selectedOption === Stock.StockOUT) {
                //     const updatedProducts = products.filter((product) => product.value !== selectedProduct.value);
                //     setProducts(updatedProducts);
                // }
            } catch (error) {
                console.error("Error fetching product details from API:", error);
            }
        }
    }, [inventory, products, selectedOption]);
    const handleUpdateInventory = useCallback(async () => {
        try {
            inventory.pop();
            for (const item of inventory) {
                const { id, date, quantity, batchNumber, distributors, productId, maxRetailPrice, isApproved } = item;
                const invoiceType = "Manual";
                let { expiry, costPrice, sellingPrice } = item;
                // // console.log("here is the product", productId)
                expiry = expiry || null;
                costPrice = costPrice || null;
                sellingPrice = sellingPrice || null;
                if (expiry) {
                    let datetime = new Date(expiry);
                    let isoString = datetime.toISOString();
                    expiry = isoString.substring(0, 23) + "+00:00";
                }

                const stockStatus = selectedOption;
                const body = {
                    invoiceType,
                    stockStatus,
                    date,
                    quantity,
                    batchNumber,
                    expiry,
                    costPrice,
                    maxRetailPrice,
                    sellingPrice,
                    distributors,
                    productId,
                    isApproved: appState.isCurrentOrgAdmin ? true : false
                };

                if (selectedOption === Stock.StockOUT) {
                    if (appState.isCurrentOrgAdmin) {
                        const responsePromise = axios.put(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/${id}?branchId=${appState.currentBranchId}`, body);
                        const notifData = {
                            totalItems: body.quantity,
                            source: Notif_Source.Inventory_Timeline_Removed,
                            url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/inventory/products/timeline`,
                            orgId: appState.currentOrgId
                        }
                        const notifPromise = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData)
                        setTimeout(() => {
                            onClose();
                        }, 2000)
                        const [response, notif] = await Promise.all([responsePromise, notifPromise]);

                        // console.log('Updated inventory item:', response.data);
                    }
                    else {
                        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/create?branchId=${appState.currentBranchId}`, body);
                        // console.log("here's the response", response);
                        const notifData = {
                            source: Notif_Source.Inventory_Update_Approval_Request,
                            orgId: appState.currentOrgId,
                            data: {
                                newBatchId: response.data.productBatch.id,
                                oldBatchId: id,
                                productId: response.data.productBatch.productId,
                                inventoryId: response.data.inventory.id,
                                branchId: appState.currentBranchId
                            }
                        }
                        const notif = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData)

                        // console.log('Updated inventory item:', response.data);
                    }

                } else if (selectedOption === Stock.StockIN) {
                    // console.log("saving new batch")
                    const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/create?branchId=${appState.currentBranchId}`, body);
                    setTimeout(() => {
                        onClose();
                    }, 2000);
                    const response = await responsePromise;
                    const notifData = {
                        totalItems: body.quantity,
                        source: Notif_Source.Inventory_Timeline_Added,
                        url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/inventory/products/timeline`,
                        orgId: appState.currentOrgId
                    }
                    const notif = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData)
                    // console.log('Created New Batch Item:', response.data);
                }

            }

        } catch (error) {
            console.error("Error updating inventory:", error);
            alert('Error updating inventory. Please try again.');
        }
    }, [inventory]);

    //Distributors
    useEffect(() => {

        const fetchDistributors = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/getAll?branchId=${appState.currentBranchId}`);
                const distributors = response.data.map((distributor: Distributors) => ({
                    value: distributor.id,
                    label: distributor.distributorName
                }));
                // console.log(distributors);
                setDistributor(distributors);
            } catch (error) {
                // console.log("Error fetching distributors", error);
            }
        }
        fetchDistributors();
    }, []);

    const [reason, setReason] = useState<any[]>([]);
    useEffect(() => {
        const fetchReason = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/reason/getAll?branchId=${appState.currentBranchId}`);
                const reasonList: any[] = response.data.reduce((acc: any[], reasonEntry: Reason) => {
                    if (Array.isArray(reasonEntry.name)) {
                        reasonEntry.name.forEach((name: string) => {
                            acc.push({ value: reasonEntry.id, label: name });
                        });
                    } else {
                        acc.push({ value: reasonEntry.id, label: reasonEntry.name });
                    }
                    return acc;
                }, []);
                console.log(reasonList);
                setReason(reasonList);
            } catch (error) {
                console.log("Error fetching species", error);
            }
        }
        fetchReason();
    }, [appState.currentBranchId]);



    return (
        <>
            <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-[#F4F5F7] bg-opacity-50 z-50">
                <div className="w-[98%] min-h-[481px] flex-col p-8 bg-[#F4F5F7] gap-6 rounded-[20px]">
                    {/* <div className="flex justify-end p-8 gap-4">
                        
                        <button className="border-0 outline-0 cursor-pointer" onClick={onClose}><Image src={closeicon} alt="minimize" /></button>
                    </div> */}
                    <div className="flex justify-end gap-4">
                        <div className="flex-grow"></div> {/* Added flex-grow to push the close icon to the right */}
                        <button className="w-[24px] h-[24px] border-0 outline-0 cursor-pointer" onClick={onClose}>
                            <Image src={closeicon} alt="close" />
                        </button>
                    </div>
                    <div className="text-gray-500 text-xl font-medium ">Update Inventory</div>
                    <div className="text-neutral-400 text-base font-medium ">Add or subtract quantity from inventory</div>
                    <div className="w-full h-[72px] px-6 py-4 bg-white border border-neutral-400 justify-between items-center gap-4 flex">
                        <div className="flex gap-4">
                            <RadioButton
                                label="Stock In"
                                value={Stock.StockIN}
                                checked={selectedOption === Stock.StockIN}
                                onChange={handleRadioChange}
                            />
                            <RadioButton
                                label="Stock Out"
                                value={Stock.StockOUT}
                                checked={selectedOption === Stock.StockOUT}
                                onChange={handleRadioChange}
                            />
                        </div>
                        {/* <div className="relative">
                            <button className="cursor-pointer h-11 px-4 py-2.5 bg-zinc-900 rounded-[5px] border-0 justify-start items-center gap-2 flex" onClick={handleAddItemClick}>
                                <Image src={addicon} alt="add" />
                                <div className="text-white text-base font-bold  bg-transparent border-0" >
                                    Add Item
                                </div>
                            </button>
                        </div> */}
                    </div>
                    <div className="pb-6">
                        <div className='flex w-full justify-between items-center box-border bg-gray-100 h-12 border-b border-neutral-400 text-gray-500'>
                            <div className='flex text-gray-500 text-base font-medium w-[5rem]'>No.</div>
                            <div className='flex text-gray-500 text-base font-medium w-[15rem]'>Product</div>
                            <div className='flex text-gray-500 text-base font-medium w-[8rem]'>Quantity</div>
                            {selectedOption === Stock.StockOUT && (
                                <div className='flex text-gray-500 text-base font-medium w-[10rem]'>Reason</div>
                            )}
                            <div className='flex text-gray-500 text-base font-medium w-[8rem]'>Batch No.</div>
                            <div className='flex text-gray-500 text-base font-medium w-[10rem]'>Expiry</div>
                            <div className='flex text-gray-500 text-base font-medium w-[6rem]'>Barcode</div>
                            <div className='flex text-gray-500 text-base font-medium w-[8rem]'>Location</div>
                            <div className='flex text-gray-500 text-base font-medium w-[10rem]'>Distributor</div>
                            <div className='flex text-gray-500 text-base font-medium w-[8rem]'>Unit Price</div>
                            <div className='flex text-gray-500 text-base font-medium w-[8rem]'>MRP</div>
                            <div className='flex text-gray-500 text-base font-medium w-[8rem]'>Subtotal</div>
                            
                        </div>

                        {inventory.map((item, index) => (
                            <div key={index + 1} className='flex justify-evenly items-center w-full  py-2  bg-white text-gray-400  '>
                                <div className='w-[3rem] flex items-center text-neutral-400 text-base font-medium'>{index + 1}</div>
                                <div className='w-[12rem] flex items-center text-neutral-400 text-base font-medium'>
                                    <Select
                                        className="text-gray-500 text-base font-medium w-[90%] "
                                        classNamePrefix="select"
                                        value={products.find((prod) => prod.value.id === item.productId)}
                                        isClearable={false}
                                        isSearchable={true}
                                        name="itemName"
                                        options={products}
                                        onChange={(selectedProduct: any) => handleProductSelect(selectedProduct, index)}
                                        styles={customStyles}
                                    />
                                </div>
                                <div className='w-[6rem] flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                    <button className="bg-white rounded-[5px] border-2 border-solid border-white" onClick={() => handleQuantityDecClick(index)}>
                                        <Image className="w-4 h-2" src={subicon} alt="-" />
                                    </button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleInputChange(index, 'quantity', parseInt(e.target.value, 10))}
                                        className="w-[40px] border border-solid border-white focus:border-textGreen outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded"

                                    />
                                    <button className="bg-white rounded-[5px] border-2 border-solid border-white" onClick={() => handleQuantityIncClick(index)}>
                                        <Image className="w-4 h-2" src={add1icon} alt="+" />
                                    </button>
                                </div>
                                {selectedOption === Stock.StockOUT && (
                                    <div className='w-[6rem] flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                        <Select
                                            className="text-gray-500 text-base font-medium  w-full border-0 boxShadow-0"
                                            placeholder="Reason"
                                            isClearable={false}
                                            isSearchable={true}
                                            options={reason}
                                            isMulti={true}
                                            name="Reasons"
                                            onChange={(value) => handleChange("reasons", value)}
                                            styles={customStyles}
                                        />
                                    </div>
                                )}

                                <div className='w-[6rem] flex items-center text-neutral-400 text-base font-medium'>
                                    {selectedOption === Stock.StockIN ? (
                                        <input
                                            type="text"
                                            value={item.batchNumber}
                                            placeholder="00000000"
                                            onChange={(e) => handleInputChange(index, 'batchNumber', e.target.value)}
                                            className="w-full border border-solid border-white focus:border-textGreen outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded placeholder:text-[#A2A3A3]"
                                            name={`batchNumber-${index}`}
                                        />
                                    ) :
                                        (
                                            <Select
                                                className="text-gray-500 text-base font-medium  w-full border-0 boxShadow-0"
                                                classNamePrefix="select"
                                                value={batches.find((prod) => prod.value.id === item.id)}
                                                isClearable={false}
                                                isSearchable={true}
                                                name={`batchNumber=${index}`}
                                                options={filteredBatches}
                                                onChange={(selectedProduct: any) => handleBatchSelect(selectedProduct, index)}
                                                styles={customStyles}
                                            />
                                        )}

                                </div>
                                <div className='w-[8rem] flex items-center text-neutral-400 text-base font-medium'>
                                    <DatePicker
                                        // showIcon
                                        className="w-full rounded-[5px] border border-solid border-borderGrey outline-none  focus:border focus:border-textGreen px-1 py-2"
                                        selected={item.expiry}
                                        placeholderText="MM/DD/YYYY"
                                        onChange={(date: any) => {
                                            handleInputChange(index, "expiry", date)
                                        }}
                                        calendarClassName="react-datepicker-custom"
                                    // value={startDate.toLocaleDateString()}
                                    // customInput={
                                    //     // <div className="relative">
                                    //     //     <input
                                    //     //         className="w-full h-9 text-textGrey1 text-base font-medium px-2 rounded border border-solid border-borderText focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                    //     //         value={startDate.toLocaleDateString()}

                                    //     //     />

                                    //     // </div>
                                    // }
                                    />
                                    {item.expiry && selectedOption !== Stock.StockIN && (
                                        <div>{formatDateAndTime(item.expiry).formattedDate}</div>
                                    )}
                                </div>

                                <div className='w-[5rem] flex items-center text-neutral-400 text-base font-medium'>
                                    <input
                                        type="text"
                                        value={item.hsnCode}
                                        onChange={(e) => handleInputChange(index, 'hsnCode', e.target.value)}
                                        placeholder="000000"
                                        className="w-full border border-solid border-white focus:border-textGreen outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded placeholder:text-[#A2A3A3]"
                                        name={`hsnCode-${index}`}
                                    />
                                </div>
                                <div className='w-[6rem] flex items-center text-neutral-400 text-base font-medium'>
                                    <input
                                        type="text"
                                        value={item.category}
                                        onChange={(e) => handleInputChange(index, 'category', e.target.value)}
                                        className="w-full border border-solid border-white focus:border-textGreen outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded"
                                        name={`category-${index}`}
                                    />
                                </div>
                                <div className='w-[8rem] flex items-center text-neutral-400 text-base font-medium '>
                                    <Select
                                        className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0"
                                        placeholder="Select"
                                        isClearable={false}
                                        isSearchable={true}
                                        options={distributor}
                                        isMulti={false}
                                        name={`providers-${index}`}
                                        onChange={(e) => handleInputChange(index, 'providers', e?.label)}
                                        styles={customStyles}
                                    />

                                </div>
                                <div className='w-[6rem] flex items-center text-neutral-400 text-base font-medium'>₹
                                    <input
                                        type="number"
                                        value={item.costPrice}
                                        onChange={(e) => handleInputChange(index, 'costPrice', parseFloat(e.target.value))}
                                        className="w-full border border-solid border-white focus:border-textGreen outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded"
                                        name={`costPrice-${index}`}
                                    />
                                </div>
                                <div className='w-[6rem] rounded-[5px] flex items-center text-neutral-400 text-base font-medium'>₹
                                    <input
                                        type="number"
                                        value={item.maxRetailPrice}
                                        onChange={(e) => handleInputChange(index, 'maxRetailPrice', parseFloat(e.target.value))}
                                        className="w-full border border-solid border-white focus:border-textGreen outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded"
                                        name={`maxRetailPrice-${index}`}
                                    />
                                </div>

                                <div className='w-[6rem] flex items-center text-neutral-400 text-base font-medium'>₹
                                    <input
                                        type="number"
                                        value={item.quantity * item.costPrice}
                                        onChange={(e) => handleInputChange(index, 'sellingPrice', parseFloat(e.target.value))}
                                        className="w-full border border-solid border-white focus:border-textGreen outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded"
                                        name={`sellingPrice-${index}`}
                                    />
                                </div>
                                {/* <div className="w-[2rem]">
                                    <button onClick={() => handleDeleteRow(index)} className=" border-0 flex-col justify-start items-end gap-2.5 flex">
                                        <div className="h-6 px-2 py-1 bg-gray-100 rounded-[5px] justify-start items-center gap-1 flex">
                                            <Image className="w-4 h-4 relative" src={deleteicon} alt="delete" />
                                        </div>
                                    </button>
                                </div> */}
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="flex items-center">
                            <div className="flex-grow"></div>
                            <div className="bg-black px-4 py-2.5 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer">
                                <Image src={checkicon} alt="add" />
                                <button className="text-white text-base font-bold bg-transparent border-0 cursor-pointer" onClick={handleUpdateInventory}>
                                    Update Inventory
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Popup2;
