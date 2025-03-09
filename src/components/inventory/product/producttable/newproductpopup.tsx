"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import {  Button } from "@nextui-org/react";

import closeicon from "../../../../assets/icons/inventory/closeIcon.svg";
import Check from "../../../../assets/icons/database/check.svg"
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useAppSelector } from "@/lib/hooks";
import useSWR, { mutate } from 'swr';
import axios from "axios";
import Distributors from "@/app/database/distributor/page";

import { ItemUnit } from "@prisma/client";
import Loading2 from "@/app/loading2";


//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
type PopupProps = {
    onClose: () => void;
    setNewProduct?:any;
    setIsNewProductClicked?:any
}

interface ItemCategory {
    id: string,
    name: string | string[],
}


var stepFields = [
    ["itemName", "providers", "unit", "hsnCode", "tax", "category", "state", "description"],
    ["minStock", "maxStock"]
];

var stepFields = [
    ["itemName", "providers", "unit", "hsnCode", "tax", "category", "state", "description"],
    ["minStock", "maxStock"]
];


interface Distributors {
    id: string,
    distributorName: string
}


interface OptionType {
    value: string;
    label: string;
}

interface TaxType {
    id: number;
    name: number[];
}

function useProductfetch(id: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${id}`, fetcher, { revalidateOnFocus: true });
    return {
        fetchedProducts: data,
        isLoading,
        error
    }
}
const Popup: React.FC<PopupProps> = ({ onClose }:any) => {
    
    const [lastStep, setLastStep] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [showPopup2, setShowPopup2] = React.useState(false);
    const [productData, setProductData] = useState<any>(null);
    //const [buttonDisabled, setButtonDisabled] = useState(false);
    const [distributor, setDistributor] = useState<any[]>([]);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true)
    const [activeTab, setActiveTab] = useState(0);
    const [errors, setErrors] = useState<any>({});
    const appState = useAppSelector((state) => state.app);
    const [loading,setLoading]=useState(false);
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

    const { fetchedProducts, isLoading, error } = useProductfetch(appState.currentBranchId);
    console.log("fetchproducts",fetchedProducts)
    useEffect(() => {
        // Handle successful product fetch (all conditions met)
        if (!isLoading && !error && fetchedProducts) {
            // Extract unique categories from fetchedProducts
            const fetchedCategories = fetchedProducts.map((product: { category: string }) => product.category);
            const uniqueFetchedCategories = Array.from(new Set(fetchedCategories));
            console.log(fetchedProducts);
            // Combine with existing categories and remove duplicates
            const allCategories = [...categories.map(cat => cat.value), ...uniqueFetchedCategories];
            const uniqueCategories = Array.from(new Set(allCategories)).map(category => ({ value: category, label: category }));

            // Update the state with unique categories
            setCategories(uniqueCategories);
        }
    }, [isLoading, error, fetchedProducts, categories]);

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
                // console.log("Error fetching distributors",error);
            }
        }
        fetchDistributors();
    }, [appState.currentBranchId]);

    function handleContinue() {
        setLastStep(true);
        setActiveTab(prev => prev + 1);
    }

    // Assuming you're using Zod for validation

    const handleSaveClick = async () => {
        // console.log("Submit button");
        try {
            setLoading(true);
            let selectedProviders = [formData.providers];

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/create?branchId=${appState.currentBranchId}`, {
               method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemName: formData.itemName,
                    providers: selectedProviders,
                    defaultUnit: formData.unit ? formData.unit : undefined,
                    hsnCode: formData.hsnCode,
                    tax: formData.tax ? formData.tax : undefined,
                    category: formData.category ? formData.category : undefined,
                    description: formData.description,
                    minStock: parseInt(formData.minStock),
                    maxStock: parseInt(formData.maxStock),
                    isApproved: appState.isCurrentOrgAdmin ? true : false
                }),
            });

            

            if (response.ok) {
               
                setProductData({
                    itemName: formData.itemName,
                    providers: selectedProviders,
                });
                
                // Trigger revalidation of the products data
                mutate(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${appState.currentBranchId}`);
                
                onClose();
                // No need for window.location.reload() as SWR will refresh the data
                
            } else {
                console.error('Failed to save data:', response.statusText);
            }
        } catch (error) {
            console.error('Error while saving data:', error);
        }
        finally{
            setLoading(false);
        }
    };


    // const handleChange = (field: string, value: any) => {
    //     setFormData({ ...formData, [field]: value });

    // };
    const handleChange = (field: string, value: any) => {
        // console.log("this is providers", value, field);

        setFormData((prevFormData: any) => {
            const updatedFormData = { ...prevFormData, [field]: value };
            const isProductNameValid = updatedFormData.itemName !== '' ;
            const isTaxValid = updatedFormData.tax !== undefined;
            const isProductExist = fetchedProducts?.some((item: any) => item.itemName?.toLowerCase() === updatedFormData.itemName?.toLowerCase()) || false;
            // Update the errors state directly
            const updatedErrors = { ...errors };
            if (!isProductNameValid) {
                updatedErrors.itemName = 'Product name is required';
            }
            else if(isProductExist){
                updatedErrors.itemName = `The product name  you are trying to add already exists`;
            }
             else {
                delete updatedErrors.itemName;
            }

            if (!isTaxValid) {
                updatedErrors.tax = 'Tax is required';
            } else {
                delete updatedErrors.tax;
            }

            setErrors(updatedErrors);
            setIsSaveDisabled(!isProductNameValid || !isTaxValid || !updatedFormData.providers || isProductExist);

            return updatedFormData;
        });
    };


    // const gstOptions = [
    //     { value: 0, label: 'GST@0%' },
    //     { value: 0.05, label: 'GST@5%' },
    //     { value: 0.12, label: 'GST@12%' },
    //     { value: 0.18, label: 'GST@18%' },
    //     { value: 0.28, label: 'GST@28%' },
    // ];

    // const unitOptions : OptionType[] =[
    //     { value: 'Boxes', label: 'Boxes' },
    //     { value: 'Pieces', label: 'Pieces' },
    //     { value: 'Units', label: 'Units' },
    //     { value: 'Vials', label: 'Vials' },
    //     { value: 'Strips', label: 'Strips' },
    // ];
    const [unitOptions, setUnitOptions] = useState<any[]>([]);
    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/itemUnit/getAll?branchId=${appState.currentBranchId}`);
                const unitOptionsList: any[] = response.data.reduce((acc: any[], unitEntry: ItemUnit) => {
                    if (Array.isArray(unitEntry.name)) {
                        unitEntry.name.forEach((name: string) => {
                            acc.push({ value: unitEntry.id, label: name });
                        });
                    } else {
                        acc.push({ value: unitEntry.id, label: unitEntry.name });
                    }
                    return acc;
                }, []);
                console.log(unitOptionsList);
                setUnitOptions(unitOptionsList);
            } catch (error) {
                console.log("Error fetching species", error);
            }
        }
        fetchUnits();
    }, [appState.currentBranchId]);

    return (
        <>
            {!lastStep && (
                <div className="w-full h-full overflow-auto flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
                    <div className="w-[640px] h-[680px] px-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-5 flex">
                        <div className="self-end items-start pt-2 gap-6 flex mt-[0.6rem] cursor-pointer" onClick={onClose}>
                            <Image src={closeicon} alt="close"></Image>
                        </div>
                        <div className="text-gray-500 text-xl font-medium">New Product</div>
                        <div className="text-neutral-400 text-base font-medium">Add a new product to your inventory</div>
                        <div className="flex items-center gap-[87px]">
                            <div className="text-gray-500 text-base font-medium">Name<span className="text-red-500">*</span></div>
                            <div>
                                <input className="w-[440px] h-9 rounded-md  text-gray-400 text-base font-medium p-2 outline-none border border-solid border-gray-300" type="text" name="itemName" onChange={(e) => {
                                    const value = e.target.value;
                                    e.target.value = value.charAt(0).toUpperCase() + value.slice(1);
                                    handleChange("itemName", e.target.value);
                                }} />
                                {errors.itemName && (
                                    <div className="text-[red] text-sm mt-2 error">{errors.itemName}</div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="text-gray-500 text-base font-medium flex">Distributor<span className="ml-1 block text-[red]">*</span></div>
                            <div className="w-[440px]">
                                <Select
                                    className="text-neutral-400 text-base font-medium w-full"
                                    placeholder="Select Distributor"
                                    isClearable={false}
                                    isSearchable={true}
                                    options={distributor}
                                    isMulti={false}
                                    name="providers"
                                    onChange={(e) => handleChange("providers", e?.label)}
                                    styles={customStyles}
                                />

                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="text-gray-500 text-base font-medium">Unit(s)</div>
                            <div className="w-[440px]">
                                <Select
                                    className="text-neutral-400 text-base font-medium w-full"
                                    placeholder="Select Unit Type"
                                    isClearable={false}
                                    isSearchable={true}
                                    options={unitOptions}
                                    isMulti={false}
                                    name="unit"
                                    defaultValue={unitOptions.find(option => option.value === 'Units')}
                                    onChange={(e) => handleChange("unit", e?.label)}
                                    styles={customStyles}
                                />

                            </div>
                        </div>
                        <div className="flex items-center gap-[55px]">
                            <div className="text-gray-500 text-base font-medium w-[5rem]">HSN Code</div>
                            <div>
                                <input className="w-[440px] h-9 rounded-[5px] text-gray-400 text-base font-medium p-2 outline-none border border-solid border-gray-300" type="text" name="hsnCode" onChange={(e) => handleChange("hsnCode", e.target.value)} />


                            </div>
                        </div>
                        <div className="flex items-center gap-[110px] w-full">
                            <div className="text-gray-500 text-base font-medium flex">Tax <span className="text-[red] ml-1 block">*</span></div>
                            <div className="w-4/5">
                                <Select
                                    className="rounded-[5px] text-gray-400 text-base font-medium outline-none w-full"
                                    placeholder="Select Tax"
                                    isClearable={false}
                                    isSearchable={true}
                                    options={taxType}
                                    isMulti={false}
                                    name="tax"
                                    onChange={(e) => handleChange("tax", e?.value)}
                                    styles={customStyles}

                                />
                                {errors.tax && (
                                    <div className="text-[red] text-sm mt-2 error">{errors.tax}</div>
                                )}

                            </div>
                        </div>
                        <div className="flex items-center gap-[70px] w-full">
                            <div className="text-gray-500 text-base font-medium">Category</div>
                            <div className="w-4/5">
                                <CreatableSelect
                                    className="text-neutral-400 text-base font-medium w-full"
                                    placeholder="Select Category"
                                    isClearable={false}
                                    isSearchable={true}
                                    options={categories}
                                    isMulti={false}
                                    styles={customStyles}
                                    name="category"
                                    onChange={(e) => handleChange("category", e?.label)}

                                />

                            </div>
                        </div>
                        <div className="flex-col">
                            <div className="text-gray-500 text-base font-medium">Description</div>
                            <textarea className="text-gray-400 text-base font-medium mt-[8px] px-2 py-2 outline-none border border-solid border-gray-300 rounded-md" placeholder="Provide details of the service" rows={1} cols={68} onChange={(e) => handleChange("description", e.target.value)}></textarea>

                        </div>
                        <div className="self-end items-start flex">
                            <button
                                onClick={handleContinue}
                                className={`px-4 py-2.5 rounded-[5px] justify-start items-center  flex outline-none border-none cursor-pointer 
                                    ${isSaveDisabled ? 'bg-gray-200' : 'bg-zinc-900'}`}
                                disabled={isSaveDisabled}
                            >
                                <div className={`text-base font-bold ${isSaveDisabled ? 'text-neutral-400' : 'text-white'}`}>Continue</div>
                                {!isSaveDisabled ? (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="block fill-current text-[#38F8E6]"
  >
    <path d="M12.9109 11.975L7.96094 7.02499L9.37509 5.61084L15.7392 11.975L9.37509 18.3391L7.96094 16.925L12.9109 11.975Z" />
  </svg>
) : (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="hidden" // Change to desired gray color
  >
    <path d="M12.9109 11.975L7.96094 7.02499L9.37509 5.61084L15.7392 11.975L9.37509 18.3391L7.96094 16.925L12.9109 11.975Z" />
  </svg>
)}

                            </button>
                        </div>
                    </div>
                </div>
            )}
            {lastStep && (
                <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
                    <div className="w-[640px] h-[425px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                        <div className="self-end items-start gap-6 flex cursor-pointer" onClick={onClose}>
                            <Image src={closeicon} alt="close"></Image>
                        </div>
                        <div className="flex-col justify-start items-start gap-2 flex">
                            <div className="text-gray-500 text-xl font-medium">New Product</div>
                            <div className="text-neutral-400 text-base font-medium">Add a new product to your inventory</div>
                        </div>
                        <div className="flex items-center gap-[34px]">
                            <div className="pr-[51px] justify-start items-center flex">
                                <div className="text-gray-500 text-base font-medium">Min Stock</div>
                            </div>
                            <div className="justify-start items-center gap-4 flex">
                                <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                <input 
  className="p-2 rounded-md border-[0.5px] border-[#A2A3A3] focus:outline-none w-[263px] h-11 text-neutral-400 text-base font-medium" 
  type="number" 
  name="minStock" 
  onChange={(e) => handleChange('minStock', e.target.value)} 
/>




                                </div>
                                <div className="text-right text-gray-500 text-base font-medium"> </div>
                            </div>
                            <div className="grow shrink basis-0 h-11 px-4 py-[13px] bg-white rounded-[5px] justify-start items-center flex">
                                <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                    <div className="text-neutral-400 text-base font-medium">{formData.unit || 'Units'}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-[28px]">
                            <div className="pr-[51px] justify-start items-center flex">
                                <div className="text-gray-500 text-base font-medium">Max Stock</div>
                            </div>
                            <div className="justify-start items-center gap-4 flex">
                                <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                <input 
  className="p-2 rounded-md border-[0.5px] border-[#A2A3A3] focus:outline-none w-[263px] h-11 text-neutral-400 text-base font-medium" 
  type="number" 
  name="maxStock" 
  onChange={(e) => handleChange('maxStock', e.target.value)} 
/>



                                </div>
                            </div>
                            <div className="grow shrink basis-0 h-11 px-4 py-[13px] bg-white rounded-[5px] justify-start items-center flex ml-[1.4rem]">
                                <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                    <div className="text-neutral-400 text-base font-medium">{formData.unit || 'Units'}</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[545px] flex justify-end mt-[5px]">
                            {/* <Button
                                onClick={handleSaveClick}
                                className="px-5 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex outline-none border-none"
                                disabled={loading}
                            >
                            
                                <div className="w-6 h-6">
                                    <Image src={Check} alt="Check" className="mr-4" />
                                </div>
                                <div className="text-white text-base font-bold">{loading ?<Loading2/> :"Save"}</div>
                            </Button> */}
                            <Button
  onClick={handleSaveClick}
  className="px-5 py-2.5 bg-zinc-900 rounded-[5px] flex items-center gap-2 outline-none border-none cursor-pointer"
  disabled={loading}
>
  <div className="w-6 h-6 flex items-center justify-center">
    <Image src={Check} alt="Check" className="mr-2" />
  </div>
  <div className="text-white text-base font-bold">{loading ? <Loading2 /> : "Save"}</div>
</Button>

                        </div>
                    </div>

                </div>

            )}
           

        </>
    );
}

export default Popup;