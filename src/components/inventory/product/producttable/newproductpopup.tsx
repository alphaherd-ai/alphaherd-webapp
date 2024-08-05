"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { Tooltip, Button } from "@nextui-org/react";
import Link from 'next/link';
import arrow from "../../../../assets/icons/inventory/cash=Right, Color=Green.svg"
import closeicon from "../../../../assets/icons/inventory/closeIcon.svg";
import arrowicon from "../../../../assets/icons/inventory/arrow.svg";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useAppSelector } from "@/lib/hooks";
import useSWR from 'swr';
import axios from "axios";
import Distributors from "@/app/database/distributor/page";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { z } from 'zod';
import { ZodError } from 'zod'; 
import { setValidationErrorsForForm } from '@/utils/setValidationErrorForForm';

//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
type PopupProps = {
    onClose: () => void;
}

const productSchema = z.object({
    itemName: z.string().min(4,'Provide Item Name'),
    providers: z.string().min(2,'Select a Distributor'),
    unit: z.string().min(2,'Mention the units'),
    hsnCode: z.string().min(15,'Invalid HSN Code'),
    // tax: z.number().min(2,'Select a tax %'),
    category: z.string().min(1,'Select a category'),
    description: z.string().min(1,'Provide description'),
    minStock: z.string().min(1,'Enter Min. Stock'),
    maxStock: z.string().min(1,'Enter Max. Stock')
})

var stepFields = [
    ["itemName","providers","unit","hsnCode","tax","category","state","description"],
    ["minStock","maxStock"]
  ];


interface Distributors{
    id:string,
    distributorName:string
}


interface OptionType {
    value: string;
    label: string;
}

function useProductfetch (id: number | null) {
    const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${id}`,fetcher,{revalidateOnFocus:true});
   return {
    fetchedProducts:data,
    isLoading,
    error
   }
}
const Popup: React.FC<PopupProps> = ({ onClose }:any) => {
    const [lastStep, setLastStep] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState<any>(null); 
    const [distributor, setDistributor] = useState<any[]>([]);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true)
    const [activeTab, setActiveTab] = useState(0);

    const [categories, setCategories] = useState<any[]>([
        { value: "Pet food", label: "Pet food" },
        { value: "Medicines", label: "Medicines" },
        { value: "Supplements", label: "Supplements" },
        { value: "Pet accessories", label: "Pet accessories" },
        { value: "Equipments", label: "Equipments" },
    ]);

    
    const initialData ={
        itemName: '',
        providers: '',
        unit: '',
        hsnCode: '',
        tax: '',
        category: '',
        description: '',
        minStock: '',
        maxStock: ''
    }


   
    const [data, setData] = useState(initialData);
    const [validationErrors, setValidationErrors] = useState(data);
    console.log(validationErrors);

    const appState = useAppSelector((state) => state.app);
    const {fetchedProducts,isLoading,error}=useProductfetch(appState.currentBranchId);
    
    useEffect(() => {
        // Handle successful product fetch (all conditions met)
        if (!isLoading && !error && fetchedProducts) {
            // Extract unique categories from fetchedProducts
            const fetchedCategories = fetchedProducts.map((product: { category: string }) => product.category);
            const uniqueFetchedCategories = Array.from(new Set(fetchedCategories));
    
            // Combine with existing categories and remove duplicates
            const allCategories = [...categories.map(cat => cat.value), ...uniqueFetchedCategories];
            const uniqueCategories = Array.from(new Set(allCategories)).map(category => ({ value: category, label: category }));
    
            // Update the state with unique categories
            setCategories(uniqueCategories);
        }
    }, [isLoading, error, fetchedProducts]);

    useEffect(() => {

        const fetchDistributors = async()=>{
            try{
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/getAll?branchId=${appState.currentBranchId}`);
                const distributors = response.data.map((distributor:Distributors)=>({
                    value: distributor.id,
                    label: distributor.distributorName
                }));
                console.log(distributors);
                setDistributor(distributors);
            }catch(error){
                console.log("Error fetching distributors",error);
            }
        }
          fetchDistributors();
        }, []);

        function handleContinue(){
            try{
              productSchema.parse(data);
              setLastStep(true);
              setActiveTab(prev => prev + 1);
            }
            catch(err : any){
              if (err instanceof z.ZodError) {
                console.log(err.flatten());
                if(!setValidationErrorsForForm(err,setValidationErrors,activeTab,stepFields)){
                 setLastStep(true);
                 setActiveTab(prev => prev + 1);
                }
              }
            }
          }
  

    // Assuming you're using Zod for validation

    const handleSaveClick = async () => {
        console.log("Submit button");
        try {
            
            setButtonDisabled(true);
            productSchema.parse(formData);

            let selectedProviders = [formData.providers];
    
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/create?branchId=${appState.currentBranchId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemName: formData.itemName,
                providers: selectedProviders,
                unit: formData.unit ? formData.unit : undefined,
                hsnCode: formData.hsnCode,
                tax: formData.tax ? formData.tax : undefined,
                category: formData.category ? formData.category : undefined,
                description: formData.description,
                minStock: parseInt(formData.minStock),
                maxStock: parseInt(formData.maxStock),
            }),
            });
    
            if (response.ok) {
                console.log('Data saved successfully');
                onClose();
                window.dispatchEvent(new FocusEvent('focus'));
            } else {
                console.error('Failed to save data:', response.statusText);
            }
        } catch (error) {
            console.error('Error while saving data:', error);
        }
        };


    // const handleChange = (field: string, value: any) => {
    //     setFormData({ ...formData, [field]: value });

    // };
    const handleChange = (field: string, value: any) => {
        console.log("this is providers",value,field)
        try{
            console.log(field,value)
            setData((prevData) => ({
              ...prevData,
              [field]: value,
            }));
            console.log("inside handle change 1");
            productSchema.parse({...data,[field]: value});
            console.log("inside handle change 2");
            setValidationErrors((prevErrors) => {
              console.log("here");
              let newErrors = prevErrors;
              newErrors[field as keyof typeof prevErrors] = '';
              return newErrors;
            });
          }
          catch(err : any){
            if (err instanceof z.ZodError) {
              console.log(err.flatten());
              let fieldErrors = err.flatten().fieldErrors;
              console.log(fieldErrors);
              let fields: string[] = Object.keys(fieldErrors);
              console.log(field);
              console.log(fields);
              if(fields.includes(field)){
                setValidationErrors((prevErrors) => {
                  let newErrors = prevErrors;
                  newErrors[field as keyof typeof prevErrors] = fieldErrors[field]!.length > 0 ? fieldErrors[field]![0] : '';
                  return newErrors;
                });
              }
              else{
                setValidationErrors((prevErrors) => {
                  console.log("here");
                  let newErrors = prevErrors;
                  newErrors[field as keyof typeof prevErrors] = '';
                  return newErrors;
                });
              }
            }
          }
        };
      

    const gstOptions = [
        { value: 0, label: 'GST@0%' },
        { value: 0.05, label: 'GST@5%' },
        { value: 0.12, label: 'GST@12%' },
        { value: 0.18, label: 'GST@18%' },
        { value: 0.28, label: 'GST@28%' },
    ];

    const unitOptions : OptionType[] =[
        { value: 'Boxes', label: 'Boxes' },
        { value: 'Pieces', label: 'Pieces' },
        { value: 'Units', label: 'Units' },
        { value: 'Vials', label: 'Vials' },
        { value: 'Strips', label: 'Strips' },
    ];

    return (
        <>
            {!lastStep && (
                <div className="w-full h-full overflow-auto flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
                    <div className="w-[640px] h-[715px] px-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                        <div className="self-end items-start gap-6 flex mt-[0.6rem] cursor-pointer" onClick={onClose}>
                            <Image src={closeicon} alt="close"></Image>
                        </div>
                        <div className="text-gray-500 text-xl font-medium">New Product</div>
                        <div className="text-neutral-400 text-base font-medium">Add a new product to your inventory</div>
                        <div className="flex items-center gap-[87px]">
                            <div className="text-gray-500 text-base font-medium">Name*</div>
                            <div>
                                <input className="w-[440px] h-9 rounded-md text-gray-400 text-base font-medium p-2 outline-none border border-solid border-gray-300" type="text" name="name" onChange={(e) => handleChange("itemName", e.target.value)} />
                                {validationErrors.itemName && (
                                    <div className="text-[red] error">{validationErrors.itemName}</div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="text-gray-500 text-base font-medium">Distributor</div>
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
                                />
                                {validationErrors.providers && (
                                    <div className="text-[red] error">{validationErrors.providers}</div>
                                )}
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
                                    name="units"
                                    onChange={(e) => handleChange("unit",e?.label)}
                                />
                                {validationErrors.unit && (
                                    <div className="text-[red] error">{validationErrors.unit}</div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-[55px]">
                            <div className="text-gray-500 text-base font-medium w-[5rem]">HSN Code</div>
                            <div>
                                <input className="w-[440px] h-9 rounded-[5px] text-gray-400 text-base font-medium p-2 outline-none border border-solid border-gray-300" type="text" name="hsnCode" onChange={(e) => handleChange("hsnCode", e.target.value)} />
                                {validationErrors.hsnCode && (
                                    <div className="text-[red] error">{validationErrors.hsnCode}</div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-[110px] w-full">
                            <div className="text-gray-500 text-base font-medium">Tax</div>
                            <div className="w-4/5">
                                <Select
                                    className="rounded-[5px] text-gray-400 text-base font-medium outline-none w-full"
                                    placeholder="Select Tax"
                                    isClearable={false}
                                    isSearchable={true}
                                    options={gstOptions}
                                    isMulti={false}
                                    name="tax"
                                    onChange={(e) => handleChange("tax", e?.value)}
                                />
                                {validationErrors.tax && (
                                    <div className="text-[red] error">{validationErrors.tax}</div>
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
                                    name="category"
                                    onChange={(e) => handleChange("category", e?.label)}
                                />
                                {validationErrors.category && (
                                    <div className="text-[red] error">{validationErrors.category}</div>
                                )}
                            </div>
                        </div>
                        <div className="flex-col">
                            <div className="text-gray-500 text-base font-medium">Description</div>
                            <textarea className="text-gray-400 text-base font-medium mt-[8px] px-2 py-2 outline-none border border-solid border-gray-300 rounded-md" placeholder="Provide details of the service" rows={5} cols={68} onChange={(e) => handleChange("description", e.target.value)}></textarea>
                            {validationErrors.description && (
                                    <div className="text-[red] error">{validationErrors.description}</div>
                                )}
                        </div>
                        <div className="self-end items-start gap-6 flex">
                            <button onClick={handleContinue} className="px-4 py-2.5 bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex outline-none border-none cursor-pointer">
                                <div className="text-neutral-400 text-base font-bold">Continue</div>
                                <Image src={arrowicon} alt="arrow"></Image>
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
                                    <input className="p-2 rounded-md border-0 focus:border-0 focus:outline-none w-[263px] h-11 text-neutral-400 text-base font-medium" type="number" name="minStock" onChange={(e) => handleChange("minStock", e.target.value)} />
                                    {validationErrors.minStock && (
                                    <div className="text-[red] error">{validationErrors.maxStock}</div>
                                )}
                                </div>
                                <div className="text-right text-gray-500 text-base font-medium"> </div>
                            </div>
                            <div className="grow shrink basis-0 h-11 px-4 py-[13px] bg-white rounded-[5px] justify-start items-center flex">
                                {formData.unit && (
                                    <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                        <div className="text-neutral-400 text-base font-medium">{formData.unit}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-[28px]">
                            <div className="pr-[51px] justify-start items-center flex">
                                <div className="text-gray-500 text-base font-medium">Max Stock</div>
                            </div>
                            <div className="justify-start items-center gap-4 flex">
                                <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                    <input className="p-2 rounded-md border-0 focus:border-0 focus:outline-none w-[263px] h-11 text-neutral-400 text-base font-medium" type="number" name="maxStock" onChange={(e) => handleChange("maxStock", e.target.value)} />
                                    {validationErrors.maxStock && (
                                    <div className="text-[red] error">{validationErrors.maxStock}</div>
                                )}
                                </div>
                            </div>
                            <div className="grow shrink basis-0 h-11 px-4 py-[13px] bg-white rounded-[5px] justify-start items-center flex ml-[1.4rem]">
                                <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                    <div className="text-neutral-400 text-base font-medium">Strips</div>
                                </div>
                            </div>
                        </div>
                    <div className="w-[545px] flex justify-end mt-[5px] cursor-pointer">
                        <button onClick={handleSaveClick} disabled={buttonDisabled} className="px-5 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex outline-none border-none">
                            <div className="text-white text-base font-bold ">Save</div>
                        </button>
                    </div>
                    </div>
                   
                </div>
            )}
        </>
    );
}

export default Popup;