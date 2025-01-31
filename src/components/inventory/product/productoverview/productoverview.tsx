"use client"
import Image from "next/image"
import lefticon from "../../../../assets/icons/inventory/left_icon.svg"
import closeIcon from '../../../../assets/icons/finance/closeIcon.svg';
import addicon from "../../../../assets/icons/inventory/bar_chart.svg"
import optionicon from "../../../../assets/icons/inventory/more_vert.svg"
import downloadicon from "../../../../assets/icons/inventory/1. Icons-24.svg"
import baricon from "../../../../assets/icons/inventory/bar_chart.svg"
import expandicon from "../../../../assets/icons/inventory/expand_content.svg"
import tuneicon from "../../../../assets/icons/inventory/bar_chart.svg"
import downarrow from "../../../../assets/icons/inventory/Icons16.svg"
import Menu from "../../../../assets/icons/finance/menu.svg"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import formatDateAndTime from "@/utils/formateDateTime";
import axios from "axios";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation"
import CreatableSelect from 'react-select/creatable';
import { useAppSelector } from "@/lib/hooks"
import Popup2 from '../../product/producttable/updateinventorypopup';
import useSWR from "swr"
import EditBatchPopup from "./editBatch"
import ConfirmationPopup from "./deleteBatch"
import Select from 'react-select';
import Loading2 from "@/app/loading2";

//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

function useProductfetch(id: string | null, branchId: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/${id}?branchId=${branchId}`, fetcher, { revalidateOnFocus: true });
    return {
        fetchedProduct: data,
        isLoading,
        error
    }
}

function useProductbatches(id: string | null, branchId: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/timeline/product/${id}?branchId=${branchId}`, fetcher, { revalidateOnFocus: true });
    return {
        fetchedProductBatches: data,
    }
}

interface ItemCategory {
    id: string,
    name: string | string[],
}

interface TaxType {
    id: number;
    name: number[];
}

const ProductDetails = () => {
    const [showPopup2, setShowPopup2] = React.useState(false);
    const togglePopup2 = () => {
        setShowPopup2(!showPopup2);
    }


    const router = useRouter();

    const [product, setProduct] = useState<any | null>(null);
    const [editProduct, setEditProduct] = useState<any | null>(null);
    const [inventoryTimeline, setInventoryTimeline] = useState<any | null>(null);
    const url = useSearchParams();
    const id = url.get('id');
    const appState = useAppSelector((state) => state.app)
    const { fetchedProduct, isLoading, error } = useProductfetch(id, appState.currentBranchId);
    const { fetchedProductBatches } = useProductbatches(id, appState.currentBranchId);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingBatch, setIsEditingBatch] = useState<any | null>(null);
    const [productEditingLoading, setProductEditingLoading] = useState<boolean>(false);
    const [productDeletingLoading, setProductDeletingLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!error && !isLoading && fetchedProduct) {
            setProduct(fetchedProduct);
            setEditProduct(fetchedProduct);
        }
        if (!error && !isLoading && fetchedProductBatches) {
            console.log(fetchedProductBatches[0]);
            const timelines = fetchedProductBatches[0].productBatches.map((batch: { inventoryTimeline: any }) => batch.inventoryTimeline);
            const combinedTimeline = [].concat(...timelines);
            console.log(combinedTimeline);
            setInventoryTimeline(combinedTimeline)
        }

    }, [fetchedProduct, fetchedProductBatches, error, isLoading]);




    const [value, setValue] = useState(30);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };


    function valuetext(value: number) {
        return `${value}°C`;
    }


    console.log(fetchedProduct);
    // console.log("product name is: ",product);

    const oldestBatch = product?.productBatches?.reduce((oldest: { expiry: string | number | Date }, current: { expiry: string | number | Date }) => {
        const currentExpiry = new Date(current.expiry);
        const oldestExpiry = new Date(oldest.expiry);
        return currentExpiry < oldestExpiry ? current : oldest;
    }, product.productBatches[0]);

    const totalMRP = oldestBatch?.maxRetailPrice || 0;

    const [categories, setCategories] = useState<any[]>([]);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/itemCategory/getAll?branchId=${appState.currentBranchId}`);
                const itemCategoryList: any[] = response.data.reduce((acc: any[], categoryEntry: ItemCategory) => {
                    if (Array.isArray(categoryEntry.name)) {
                        categoryEntry.name.forEach((name: string) => {
                            acc.push({ value: categoryEntry.id, label: name });
                        });
                    } else {
                        acc.push({ value: categoryEntry.id, label: categoryEntry.name });

                    }
                    return acc;
                }, []);
                console.log(itemCategoryList);
                setCategories(itemCategoryList);
            } catch (error) {
                console.log("Error fetching species", error);
            }
        }
        fetchCategory();
    }, [appState.currentBranchId]);

    const [taxType, settaxType] = useState<any[]>([]);
    useEffect(() => {
        const fetchTax = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/taxType/getAll?branchId=${appState.currentBranchId}`);
                const taxTypeList: any[] = response.data.reduce((acc: any[], taxTypeEntry: TaxType) => {
                    if (Array.isArray(taxTypeEntry.name)) {
                        taxTypeEntry.name.forEach((taxValue: number) => {
                            acc.push({
                                value: taxValue * 0.01,
                                label: `${taxValue}% GST`
                            });
                        });
                    }
                    return acc;
                }, []);
                console.log(taxTypeList);
                settaxType(taxTypeList);
            } catch (error) {
                console.log("Error fetching species", error);
            }
        }
        fetchTax();
    }, [appState.currentBranchId]);




    const handleEditSave = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clean the payload
        const cleanedProduct = {
            ...(editProduct.itemName && { itemName: editProduct.itemName }),
            ...(editProduct.category && { category: editProduct.category }),
            ...(editProduct.tax && { tax: editProduct.tax }),
            ...(editProduct.description && { description: editProduct.description }),
            ...(editProduct.minStock && { minStock: editProduct.minStock }),
            ...(editProduct.maxStock && { maxStock: editProduct.maxStock }),
            ...(editProduct.hsnCode && { hsnCode: editProduct.hsnCode }),
        };

        //console.log("Cleaned Payload being sent:", JSON.stringify(cleanedProduct));

        try {
            setProductEditingLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/${id}?branchId=${appState.currentBranchId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cleanedProduct),
                }
            );

            //console.log("The response created is:", response);

            if (!response.ok) {
                let errorMessage = "An unknown error occurred";
                try {
                    const errorResponse = await response.json();
                    console.error("Error response body: ", errorResponse);
                    errorMessage = errorResponse.message || errorMessage;
                } catch {
                    const errorText = await response.text();
                    console.error("Error response text: ", errorText);
                    errorMessage = errorText;
                }
                alert(`Failed to update product! Error: ${errorMessage}`);
                return;
            }

            alert("Product updated successfully!");
            setShowEditPopup(false);
            //router.push('/inventory/products/all');
        } catch (err) {
            console.error("Unexpected error occurred:", err);
            alert("An error occurred while updating!");
        }
        finally {
            setProductEditingLoading(false);
        }
    };




    const handleDelete = async () => {
        //setIsDeleting(true);
        //console.log("product name is : ", product);


        try {
            setProductDeletingLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/${id}?branchId=${appState.currentBranchId}`,
                {
                    method: "DELETE",
                }
            );
            //console.log("the response is : ", response);

            if (!response.ok) {
                const errorText = await response.text(); // Get the server error response
                //console.error("Error deleting product:", errorText);
                alert(`Failed to delete product! Error: ${response.statusText || errorText}`);
            }


            if (response.ok) {
                alert("Product deleted successfully!");
                setShowDeletePopup(false);
                router.push('/inventory/products/all'); // Adjust the path as needed
            } else {
                alert("Failed to delete product!");
            }
        } catch (err) {
            //console.error(err);
            alert("An error occurred!");
        } finally {
            setProductDeletingLoading(false);
        }
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
    };



    return <>
        <div className="w-full h-full relative  rounded-[20px] pr-[16px] pl-[16px] z-1">
            <div className="w-full flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <div className="w-11 h-11  rounded-[5px] border border-borderGrey flex justify-center items-center">
                        <div className='no-underline h-full cursor-pointer' onClick={() => router.back()}>
                            <div className='flex items-center border border-solid border-gray-300 bg-white rounded-lg p-3  '>
                                <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back"></Image>
                            </div>
                        </div>

                    </div>
                    <div className="text-gray-500 text-[28px] font-bold ">
                        {product?.itemName}
                    </div>
                </div>
                <div className="flex items-center gap-4">

                    <div className="h-12 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-center items-center gap-2 flex">
                        <div>
                            <Image src={addicon} alt="add"></Image>
                        </div>

                        <div className="cursor-pointer no-underline text-white text-base font-bold " onClick={togglePopup2}>
                            Update Stock Level
                        </div>

                    </div>

                    <div className="relative">
                        <Popover placement="bottom-end" showArrow={false} offset={0}>
                            <PopoverTrigger>
                                <Button
                                    variant="solid"
                                    className="capitalize flex border-none text-gray">
                                    <div className="w-12 h-12 px-[11px] py-2.5 bg-white rounded-[5px] border border-solid border-gray-300 flex items-center justify-center">
                                        <Image src={optionicon} alt="option" />
                                    </div>
                                </Button>
                            </PopoverTrigger>

                            {/* Dropdown Menu */}
                            <PopoverContent className="relative right-0 top-full mt-1 w-40 bg-white border border-gray-300 shadow-md z-10 p-0 rounded-lg" style={{ marginLeft: '-10px' }}>
                                {!(showEditPopup || showDeletePopup) ? <><button
                                    onClick={() => {
                                        setShowEditPopup(true);
                                    }}
                                    className="w-full px-4 py-3 text-sm text-gray-800 hover:bg-gray-200 text-left bg-white border-none rounded-md"
                                >
                                    Edit
                                </button>
                                    <button
                                        onClick={() => {
                                            setShowDeletePopup(true);
                                        }}
                                        className="w-full px-4 py-3 text-sm text-gray-800 hover:bg-gray-200 text-left bg-white border-none rounded-md"
                                    >
                                        Delete
                                    </button>
                                </> : ""

                                }

                                {/* Delete Popup */}
                                {showDeletePopup && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                        <div className="bg-white p-6 w-[600px] h-[200px] shadow-lg flex flex-col justify-between rounded-md ">
                                            <h2 className="text-xl text-gray-600 font-semibold">
                                                Deleting Product
                                            </h2>
                                            <p className="text-sm text-gray-600">
                                                Are you sure you want to permanently delete{" "}
                                                <span className="font-medium text-gray-600">
                                                    {product?.itemName || "this product"}
                                                </span>
                                                ?
                                            </p>
                                            <div className="flex justify-end gap-4 mt-4">
                                                <button
                                                    className="px-4 py-2 bg-gray-500 text-white text-sm hover:bg-gray-400 rounded-md border-none"
                                                    onClick={() => setShowDeletePopup(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className={`px-4 py-2 text-white text-sm rounded-md border-none ${isDeleting
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-teal-400 hover:bg-teal-400 cursor-pointer"
                                                        }`}
                                                    onClick={handleDelete}
                                                    disabled={isDeleting}
                                                >
                                                    {productDeletingLoading ? <Loading2 /> : "Delete"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                )}

                                {showEditPopup && (
                                    <div className="fixed inset-0  z-50 flex items-center justify-center  bg-opacity-50">
                                        <div className="absolute top-10 right-10 bg-white rounded-lg shadow-lg p-8 w-[600px] max-w-[90vw] flex flex-col">
                                            {/* Close Button */}
                                            <button
                                                onClick={() => setShowEditPopup(false)}
                                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                                            >
                                                <Image src={closeIcon} alt="" />
                                            </button>

                                            {/* Popup Heading */}
                                            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                                                Edit Product
                                            </h2>

                                            {/* Form */}
                                            <form className="space-y-4" onSubmit={handleEditSave}>
                                                {/* Item Name */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Item Name</label>
                                                    <input
                                                        type="text"
                                                        className="w-full text-gray-500 outline-none border border-solid border-borderGrey rounded-lg px-4 py-2 mt-1"
                                                        value={editProduct?.itemName || ''}
                                                        //placeholder={product?.itemName || ""}
                                                        onChange={(e) => setEditProduct((prev: any) => ({ ...prev, itemName: e.target.value }))}
                                                    />
                                                </div>

                                                {/* Category */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Category</label>
                                                    <CreatableSelect
                                                        className="text-neutral-400  outline-none border border-solid mt-2 border-borderGrey  rounded-md text-base font-medium w-full"
                                                        placeholder="Select Category"
                                                        isClearable={false}
                                                        isSearchable={true}
                                                        options={categories}
                                                        isMulti={false}
                                                        styles={customStyles}
                                                        name="category"
                                                        onChange={(e: any) => setEditProduct((prev: any) => ({ ...prev, category: e?.label }))}
                                                        value={categories.find((option) => option.label === (editProduct?.category || product?.category))}
                                                    />
                                                </div>

                                                {/* HSN Code */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">HSN Code</label>
                                                    <input
                                                        type="text"
                                                        className="w-full text-gray-500 outline-none border border-solid border-borderGrey rounded-lg px-4 py-2 mt-1"
                                                        value={editProduct?.hsnCode || ''}
                                                        //placeholder={product?.hsnCode}
                                                        onChange={(e) => setEditProduct((prev: any) => ({ ...prev, hsnCode: e.target.value }))}
                                                    />
                                                </div>



                                                {/* Tax */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Tax (%)</label>
                                                    <Select
                                                        className="rounded-[5px] text-gray-400 border border-solid border-borderGrey mt-2 text-base font-medium outline-none w-full"
                                                        placeholder="Select Tax"
                                                        isClearable={false}
                                                        isSearchable={true}
                                                        options={taxType}
                                                        isMulti={false}
                                                        name="tax"
                                                        onChange={(e: any) => setEditProduct((prev: any) => ({ ...prev, tax: e?.value }))}
                                                        styles={customStyles}
                                                        value={taxType.find((option) => option.value === (editProduct?.tax || product?.tax))}
                                                    />
                                                </div>

                                                {/* Description */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Description</label>
                                                    <input
                                                        type="text"
                                                        className="w-full text-gray-500 outline-none border border-solid border-borderGrey rounded-lg px-4 py-2 mt-1"
                                                        value={editProduct?.description || ''}
                                                        //placeholder={product?.description}
                                                        onChange={(e) => setEditProduct((prev: any) => ({ ...prev, description: e.target.value }))}
                                                    />
                                                </div>

                                                {/* Min Stock */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Min Stock</label>
                                                    <input
                                                        type="number"
                                                        className="w-full text-gray-500 outline-none border border-solid border-borderGrey rounded-lg px-4 py-2 mt-1"
                                                        value={editProduct?.minStock || 1}
                                                        //placeholder={product?.minStock || ""}
                                                        onChange={(e) => setEditProduct((prev: any) => ({ ...prev, minStock: parseInt(e.target.value) }))}
                                                    />
                                                </div>

                                                {/* Max Stock */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Max Stock</label>
                                                    <input
                                                        type="number"
                                                        className="w-full text-gray-500 outline-none border border-solid border-borderGrey rounded-lg px-4 py-2 mt-1"
                                                        value={editProduct?.maxStock || ''}
                                                        //placeholder={product?.maxStock || ""}
                                                        onChange={(e) => setEditProduct((prev: any) => ({ ...prev, maxStock: parseInt(e.target.value) }))}
                                                    />
                                                </div>

                                                {/* Save and Cancel Buttons */}
                                                <div className="flex justify-end space-x-4 mt-6">
                                                    <button
                                                        type="button"
                                                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none border-none"
                                                        onClick={() => setShowEditPopup(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none border-none"
                                                        onClick={handleEditSave}
                                                    >
                                                        {productEditingLoading ? <Loading2 /> : "Save"}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}



                            </PopoverContent>
                        </Popover>
                    </div>




                </div>
            </div>

            <div className="w-full mt-[25px] pt-8 bg-white rounded-[10px] border border-solid border-borderGrey flex-col justify-start items-start gap-8 flex">
                <div className="w-full px-6 justify-start items-center gap-8 flex">
                    <div className="w-40 text-gray-500 text-[28px] font-bold ">
                        {product?.quantity} Strips
                    </div>
                    <div className="w-full rounded-[10px] flex items-center">
                        <ThemeProvider theme={theme}>
                            {/* <Slider
                                aria-label="Temperature"
                                defaultValue={product?.quantity}
                                getAriaValueText={valuetext}
                                color="secondary"
                                value={typeof value === 'number' ? value : 0}
                                onChange={handleSliderChange}
                                min={product?.minStock}
                                max={product?.maxStock}
                            /> */}
                        </ThemeProvider>
                    </div>
                </div>

                <div className="w-full justify-start items-start flex rounded-[10px]">

                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0  border-r border-borderGrey flex-col justify-center items-start rounded-b-xl gap-4 flex ">
                        <div className="text-gray-500 text-[28px] font-bold ">{product?.totalQuantity}</div>
                        <div className="text-gray-500 text-base font-medium ">Current Stock</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-r border-borderGrey flex-col justify-center items-start gap-4 flex">
                        <div className="text-gray-500 text-[28px] font-bold ">{totalMRP}</div>
                        <div className="text-gray-500 text-base font-medium ">MRP</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-r border-borderGrey flex-col justify-center items-start gap-4 flex">
                        <div className="text-gray-500 text-[28px] font-bold ">{product?.minStock}</div>
                        <div className="text-gray-500 text-base font-medium ">Min Stock</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-borderGrey flex-col justify-center items-start gap-4 flex rounded-b-xl">
                        <div className="text-gray-500 text-[28px] font-bold ">{product?.maxStock}</div>
                        <div className="text-gray-500 text-base font-medium ">Max Stock</div>
                    </div>
                </div>
            </div>
            <div className="w-full flex gap-6">
                <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border  border-solid border-borderGrey flex-col justify-center items-start flex">
                    <div className="w-full border-b border-solid border-0 border-borderGrey">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-borderGrey text-base font-medium ">Description:</div>
                            <div className="text-gray-500 text-base font-medium ">{product?.description}</div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-borderGrey flex  gap-8">
                        <div className="w-6/12 p-6 border-r border-solid border-0 border-borderGrey flex-col items-center justify-between">
                            <div className="text-borderGrey text-base font-medium ">Category</div>
                            <div className="w-[114px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-green-600 text-sm font-medium ">{product?.category}</div>
                            </div>
                        </div>
                        <div className="w-6/12 p-6 flex-col items-center justify-between">
                            <div className="text-borderGrey text-base font-medium ">Location</div>
                            <div className="w-[66px] h-7 px-2 py-1.5 bg-orange-50 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-orange-500 text-sm font-medium ">{product?.location}</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-borderGrey">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-borderGrey text-base font-medium ">HSN Code:</div>
                            <div className="text-gray-500 text-base font-medium ">{product?.hsnCode}</div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-borderGrey">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-borderGrey text-base font-medium ">Tax Rate:</div>
                            <div className="px-2 py-1.5 bg-gray-100 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-gray-500 text-base font-medium ">{product?.tax * 100}%</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full ">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-borderGrey text-base font-medium ">Vendors:</div>
                            <div className="px-2 py-1.5 bg-gray-100 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-gray-500 text-base font-medium ">{product?.providers}</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border border-solid border-borderGrey flex  flex-col">
                    <div className="w-full flex p-6 items-start justify-between border-0 border-b  border-solid border-borderGrey">
                        <div className="text-gray-500 text-xl font-medium ">
                            Stock History
                        </div>
                        <div className="flex gap-2">
                            <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid  border-borderGrey justify-start items-center gap-2 flex">
                                <Image src={downloadicon} alt="download" className="w-5 h-5" />
                            </div>
                            <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid border-borderGrey justify-start items-center gap-2 flex">
                                <Image src={baricon} alt="baricon" className="w-5 h-5" />
                            </div>
                            <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid  border-borderGrey justify-start items-center gap-2 flex">
                                <Image src={expandicon} alt="expandicon" className="w-5 h-5" />
                            </div>
                            <div className=" h-7 p-2 bg-white rounded-[5px] border border-solid  border-borderGrey justify-start items-center gap-2 flex">
                                <Image src={tuneicon} alt="tuneicon" className="w-5 h-5" />
                                <div className="text-borderGrey text-sm font-medium ">
                                    Filter by
                                </div>
                            </div>
                            <div className=" h-7 p-2 bg-white rounded-[5px] border border-solid border-borderGrey justify-start items-center gap-2 flex">
                                <Image src={downarrow} alt="downarrow" className="w-5 h-5" />
                                <div className="text-borderGrey text-sm font-medium ">
                                    Status: All
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">

                    </div>
                    <div className="w-full max-h-[400px] overflow-y-auto">

                        {inventoryTimeline?.map((item: any) => (
                            <div key={item.id} className="w-full border-b border-solid border-0 border-borderGrey flex items-start justify-between">
                                <div className="w-full flex p-2">
                                    <div className="w-full flex items-center justify-between">
                                        <div className="text-borderGrey text-base font-medium w-fit mr-4">
                                            {formatDateAndTime(item.createdAt).formattedDate}
                                        </div>
                                        <div className=" text-borderGrey text-base font-medium w-[5rem]">
                                            {formatDateAndTime(item.createdAt).formattedTime}
                                        </div>
                                        <div className="text-gray-500 text-base font-medium w-2/12 flex ">
                                            {item.quantityChange} Strips
                                        </div>
                                        <div className="h-7  py-1.5    items-center gap-2 flex w-1/12 ">
                                            {item.stockChange === "StockOUT" ?
                                                <div className="text-[#FF3030] bg-[#FFEAEA] rounded-[5px] px-1 text-sm font-medium ">
                                                    Out
                                                </div> :
                                                <div className="text-[#0F9D58] bg-[#E7F5EE] rounded-[5px] px-1  text-sm font-medium ">
                                                    In
                                                </div>
                                            }

                                        </div>
                                        <div className="text-borderGrey text-base font-medium w-1/12 overflow-hidden text-ellipsis whitespace-nowrap">
                                            {item.productBatch.batchNumber}
                                        </div>
                                        <div className="text-borderGrey text-base font-medium w-2/12 overflow-hidden text-ellipsis whitespace-nowrap">
                                            {item.party}
                                        </div>
                                        <div className="text-teal-400 text-sm font-medium  w-2/12">
                                            {item.invoiceNo ? item.invoiceNo : "Manual"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="rounded-md">
                <div className="w-full mt-[25px] rounded-[10px] border-borderGrey border border-solid  ">
                    <div className="w-full flex p-6 bg-white items-start justify-between border-0 border-b border-solid border-borderGrey rounded-md">
                        <div className="text-gray-500 text-xl font-medium ">
                            Current Batches
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-evenly w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-borderGrey text-textGrey2'>
                            <div className='px-2 flex text-textGrey2 text-base font-medium w-1/12'>Quantity</div>
                            <div className='flex text-textGrey2 text-base font-medium w-2/12'>Distributor</div>
                            <div className='flex text-textGrey2 text-base font-medium w-1/12'>Batch Number</div>
                            <div className='flex text-textGrey2 text-base font-medium w-1/12'>Expiry Date</div>

                            <div className='flex text-textGrey2 text-base font-medium w-1/12 '>Cost per item</div>
                            <div className='flex text-textGrey2 text-base font-medium w-1/12 pl-4'>MRP</div>
                            <div className='flex text-textGrey2 text-base font-medium w-1/12'>Selling Price</div>
                            <div className='flex justify-center text-textGrey2 text-base font-medium w-1/12'>Margin</div>
                            <div className='flex justify-center text-textGrey2 text-base font-medium w-2/12'>Location</div>
                            <div className='flex text-textGrey2 text-base font-medium w-1/12'></div>
                        </div>

                        {product?.productBatches?.filter((item: any) => !item.isDeleted).map((item: any) => (
                            <div key={item.id} className='flex  items-center w-full  box-border py-4 bg-white  border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                <div className='px-2 w-1/12  flex items-center text-borderGrey text-base font-medium'>{item.quantity} Strips</div>
                                <div className='w-2/12  flex items-center text-borderGrey text-base font-medium'>{item.distributors[0]}</div>
                                <div className='w-1/12  flex items-center text-borderGrey text-base font-medium'>{item.batchNumber}</div>
                                <div className='w-1/12  flex items-center text-borderGrey text-base font-medium'>{formatDateAndTime(item.expiry).formattedDate}</div>

                                <div className='w-1/12  flex items-center text-borderGrey text-base font-medium'>{item.costPrice}</div>
                                <div className='w-1/12  flex items-center text-borderGrey text-base font-medium pl-4'>₹399</div>
                                <div className='w-1/12  flex items-center text-borderGrey text-base font-medium'>{item.sellingPrice}</div>
                                <div className='w-1/12 justify-center  flex items-center text-borderGrey text-base font-medium'>{(item.quantity / item.maxStock) * 100}%</div>
                                <div className="w-2/12 justify-center  flex items-center gap-2">
                                    <div className="w-fit flex items-center text-orange-500 text-[0.8rem] font-medium px-2 py-1.5 bg-orange-50 rounded-[5px] justify-center ">{item?.location}</div>
                                </div>

                                {!isEditing &&
                                    <Popover placement="bottom" showArrow offset={10}>
                                        <PopoverTrigger>
                                            <Button variant="solid" className="capitalize flex border-none text-gray rounded-lg">
                                                <div className='flex items-center'>
                                                    <Image src={Menu} alt='Menu' className='w-5 h-5' />
                                                </div>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 mt-2.5">
                                            <div className="flex flex-col">
                                                <div className='flex flex-col'>
                                                    <div className='text-gray-500 text-sm p-3 font-medium flex hover:cursor-pointer' onClick={() => { setIsEditing(true); setIsEditingBatch(item) }}>
                                                        Edit
                                                    </div>
                                                    <div className='text-gray-500 text-sm p-3 font-medium flex hover:cursor-pointer' onClick={() => { setIsDeleting(true); setIsEditingBatch(item) }}>
                                                        Delete
                                                    </div>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                }
                            </div>

                        ))}
                    </div>
                </div>
            </div>

        </div>
        {showPopup2 && <Popup2 onClose={togglePopup2} individualSelectedProduct={product} />}
        {isEditing && <EditBatchPopup setisEditing={setIsEditing} editBatch={isEditingBatch} />}
        {isDeleting && <ConfirmationPopup setisDeleting={setIsDeleting} deleteBatch={isEditingBatch} />}
    </>
}

export default ProductDetails;


