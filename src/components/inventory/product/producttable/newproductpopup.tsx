"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { Tooltip, Button } from "@nextui-org/react";
import Link from 'next/link';
import closeicon from "../../../../assets/icons/inventory/closeIcon.svg";
import arrowicon from "../../../../assets/icons/inventory/arrow.svg";
import Select from 'react-select';
import { useAppSelector } from "@/lib/hooks";

type PopupProps = {
    onClose: () => void;
}


const Popup: React.FC<PopupProps> = ({ onClose }) => {
    const [lastStep, setLastStep] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const appState = useAppSelector((state) => state.app)
    const [selectedUnit, setSelectedUnit] = useState<string>("");
    
    const handleContinueClick = () => {
        setLastStep(true);
    }

    const handleSaveClick = async () => {
        try {
            setButtonDisabled(true);
            const selectedProviders = formData.providers.map((provider:any) => provider.value);
    
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/create?branchId=${appState.currentBranchId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemName: formData.name,
                    providers: selectedProviders,
                    defaultUnit: formData.defaultUnit,
                    hsnCode: formData.hsnCode,
                    tax: formData.tax ? formData.tax[0].value : undefined,
                    category: formData.category ? formData.category[0].value : undefined,
                    description: formData.description,
                    minStock: parseInt(formData.minStock),
                    maxStock: parseInt(formData.maxStock)
                }),
            });
            if (response.ok) {
                console.log('Data saved successfully');
                onClose();
            } else {
                console.error('Failed to save data:', response.statusText);
            }
        } catch (error) {
            console.error('Error while saving data:', error);
        } finally {
            setButtonDisabled(false);
        }
    };
    

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
        
    };

    const gstOptions = [
        { value: 'IGST@18%.', label: 'IGST@18%.' },
        { value: 'GST@18%.', label: 'GST@18%.' },
        { value: 'GST@12%.', label: 'GST@12%.' },
        { value: 'GST@10%.', label: 'GST@10%.' }
    ];

    const category = [
        {value: "Injections", label: "Injections"},
        {value: "Supplements", label: "Supplements"},
        {value: "Medicines", label: "Medicines"},
        {value: "Equipments", label: "Equipments"},
        {value: "Pet Food", label:"Pet Food"}
    ]

    const Units = [
        {value: "Boxes", label: "Boxes"},
        {value: "Pieces", label: "Pieces"},
        {value: "Units", label: "Units"},
        {value: "Vials", label: "Vials"},
        {value: "Strips", label:"Strips"}
    ]


    return <>

        {!lastStep && <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] h-[787px]  px-8 py-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                <div className="self-end items-start gap-6 flex mt-[0.6rem]" onClick={onClose}>
                        <Image src={closeicon} alt="close"></Image>
                </div>
                <div >
                    <div className="text-gray-500 text-xl/[23.44px] font-medium ">New Product</div>
                    <div className="text-neutral-400 text-base/[18.75px] font-medium ">Add a new product to your inventory</div>
                </div>
                <div className="flex items-center gap-[87px]">
                    <div className="text-gray-500 text-base/[18.12px] font-medium ">Name*</div>
                    <div>
                        <input className="w-[440px] h-[44px] rounded-[5px] text-gray-400 text-base/[18.12px] font-medium p-2  outline-none border border-solid border-gray-300" type="text" name="name" onChange={(e) => handleChange("name", e.target.value)} />
                    </div>
                </div>
                <div className="flex items-center gap-[70px] w-full">
                    <div className="text-gray-500 text-base/[18.12px] font-medium ">Distributers</div>
                    <div className="w-4/5">
                        <Select
                            className="w-[440px] h-[44px] rounded-[5px] text-#A2A3A3 text-base font-medium "
                            placeholder="Select Provider"
                            isClearable={false}
                            isSearchable={true}
                            options={gstOptions}
                            isMulti={true}
                            name="providers"
                            onChange={(value) => handleChange("providers", value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-[70px] w-full">
                    <div className="text-gray-500 text-base/[18.12px] font-medium ">Default Unit</div>
                    <div className="w-4/5">
                        <Select
                            className="w-[440px] h-[44px] rounded-[5px] text-neutral-400 text-base font-medium "
                            placeholder="Select Unit"
                            isClearable={false}
                            isSearchable={true}
                            options={Units}
                            isMulti={true}
                            name="defaultUnit"
                            onChange={(value) => handleChange("defaultUnit", value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-[55px]">
                    <div className="text-gray-500 text-base/[18.12px] font-medium w-[5rem]">HSN Code</div>
                    <div>
                        <input className="w-[440px] h-[44px] rounded-[5px] text-gray-400 text-base font-medium p-2 outline-none border border-solid border-gray-300" type="text" name="hsnCode" onChange={(e) => handleChange("hsnCode", e.target.value)} />
                    </div>
                </div>
                <div className="flex items-center gap-[110px] w-full">
                    <div className="text-gray-500 text-base/[18.12px] font-medium ">Tax</div>
                    <div className="w-4/5">
                        <Select
                            className="w-[440px] h-[44px] rounded-[5px] text-gray-400 text-base/[18.12px] font-medium  outline-none"
                            placeholder="Select Tax Rate"
                            isClearable={false}
                            isSearchable={true}
                            options={gstOptions}
                            isMulti={true}
                            name="tax"
                            onChange={(value) => handleChange("tax", value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-[70px] w-full">
                    <div className="text-gray-500 text-base/[18.12px] font-medium ">Category</div>
                    <div className="w-4/5">
                        <Select
                            className="text-[#A2A3A3] text-base/[18.12px] font-medium w-[440px] h-[44px] rounded-[5px]"
                            placeholder="Select Category"
                            isClearable={false}
                            isSearchable={true}
                            options={category}
                            isMulti={true}
                            name="category"
                            onChange={(value) => handleChange("category", value)}
                        />
                    </div>
                </div>
                <div className="flex-col">
                    <div className="text-gray-500 text-base/[18.12px] font-medium ">Description</div>
                    {/* <input className="w-[576px] h-[88px] mt-[8px]" placeholder="Provide details of the service" type="text" name="description" onChange={(e) => handleChange("description", e.target.value)} /> */}
                    <textarea className="text-gray-400 text-base/[18.12px] font-medium mt-[8px] px-2 py-2 outline-none border border-solid border-gray-300 rounded-md" placeholder="Provide details of the service" rows={5} cols={68} onChange={(e) => handleChange("description", e.target.value)}></textarea>
                </div>
                <div className="self-end items-start gap-6 flex">
                    <button onClick={handleContinueClick} className="px-4 py-2.5 bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex outline-none border-none">
                        <div className="text-neutral-400 text-base/[18.12px] font-bold ">Continue</div>
                        <Image src={arrowicon} alt="arrow"></Image>
                    </button>
                </div>
            </div>
        </div>
        }
        {lastStep &&
            <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0  inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
                <div className="w-[640px] h-[425px]  p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                    <div className="self-end items-start gap-6 flex " onClick={onClose}>
                            <Image src={closeicon} alt="close"></Image>
                    </div>
                    <div className="flex-col justify-start items-start gap-2 flex">
                        <div className="text-gray-500 text-xl font-medium ">New Product</div>
                        <div className="text-neutral-400 text-base font-medium ">Add a new product to your inventory</div>
                    </div>
                    <div className="flex items-center gap-[34px]">
                        <div className="pr-[51px] justify-start items-center flex">
                            <div className="text-gray-500 text-base font-medium ">Min Stock</div>
                        </div>
                        <div className="justify-start items-center gap-4 flex">
                            <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                
                                    <input className="p-2 rounded-md border-0 focus:border-0 focus:outline-none w-[263px] h-11 text-neutral-400 text-base font-medium" type="number" name="minStock" onChange={(e) => handleChange("minStock", e.target.value)} />
                            </div>
                            <div className="text-right text-gray-500 text-base font-medium "> </div>
                        </div>
                        <div className="grow shrink basis-0 h-11 px-4 py-[13px] bg-white rounded-[5px] justify-start items-center flex">
                            <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                            <div className="text-neutral-400 text-base font-medium ">Strips</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-[28px]">
                        <div className="pr-[51px] justify-start items-center flex">
                            <div className="text-gray-500 text-base font-medium ">Max Stock</div>
                        </div>
                        <div className="justify-start items-center gap-4 flex">
                            <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                
                                    <input className="p-2 rounded-md border-0 focus:border-0 focus:outline-none w-[263px] h-11 text-neutral-400 text-base font-medium" type="number" name="maxStock" onChange={(e) => handleChange("maxStock", e.target.value)} />
                                
                            </div>
                            
                        </div>
                        <div className="grow shrink basis-0 h-11 px-4 py-[13px] bg-white rounded-[5px] justify-start items-center flex ml-[1.4rem]">
                            <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                <div className="text-neutral-400 text-base font-medium ">Strips</div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="w-[545px] flex justify-end mt-[5px]">
                        <button onClick={handleSaveClick} disabled={buttonDisabled} className="px-5 py-2.5 bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex outline-none border-none">
                            <div className="text-neutral-400 text-base font-bold ">Save</div>
                        </button>
                    </div>
                </div>
            </div>
        }
    </>;
}

export default Popup;


