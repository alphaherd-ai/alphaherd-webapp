"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { Tooltip, Button } from "@nextui-org/react";
import Link from 'next/link';
import closeicon from "../../../../assets/icons/inventory/closeIcon.svg";
import arrowicon from "../../../../assets/icons/inventory/arrow.svg";
import Select from 'react-select';

type PopupProps = {
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
    const [lastStep, setLastStep] = useState(false);
    const [formData, setFormData] = useState<any>({});

    const handleContinueClick = () => {
        setLastStep(true);
    }

    const handleSaveClick = async () => {
        try {
            const response = await fetch('/api/inventory/product/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemName: formData.name,
                    defaultUnit: formData.providers ? formData.providers[0].value : undefined,
                    hsnCode: formData.hsnCode,
                    tax: formData.tax ? formData.tax[0].value : undefined,
                    category:formData.category ? formData.category[0].value:undefined,
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
        }
    }

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const gstOptions = [
        { value: 'GST@18%.', label: 'GST@18%.' },
        { value: 'GST@9%.', label: 'GST@9%.' }
    ];

    return <>

        {!lastStep && <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0 fixed inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] h-[715px]  px-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                <div className="self-end items-start gap-6 flex">
                    <button onClick={onClose}>
                        <Image src={closeicon} alt="close"></Image>
                    </button>
                </div>
                <div className="text-gray-500 text-xl font-medium font-['Satoshi']">New Product</div>
                <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Add a new product to your inventory</div>
                <div className="flex items-center gap-[88px]">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">Name*</div>
                    <div>
                        <input className="w-[440px] h-8" type="text" name="name" onChange={(e) => handleChange("name", e.target.value)} />
                    </div>
                </div>
                <div className="flex items-center gap-[70px] w-full">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">Providers</div>
                    <div className="w-4/5">
                        <Select
                            className="text-neutral-400 text-base font-medium w-full"
                            placeholder="Select Category"
                            isClearable={false}
                            isSearchable={true}
                            options={gstOptions}
                            isMulti={true}
                            name="providers"
                            onChange={(value) => handleChange("providers", value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-[63px]">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">HSN Code</div>
                    <div>
                        <input className="w-[440px] h-8" type="text" name="hsnCode" onChange={(e) => handleChange("hsnCode", e.target.value)} />
                    </div>
                </div>
                <div className="flex items-center gap-[70px] w-full">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">Tax</div>
                    <div className="w-4/5">
                        <Select
                            className="text-neutral-400 text-base font-medium w-full"
                            placeholder="Select Category"
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
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">Category</div>
                    <div className="w-4/5">
                        <Select
                            className="text-neutral-400 text-base font-medium w-full"
                            placeholder="Select Category"
                            isClearable={false}
                            isSearchable={true}
                            options={gstOptions}
                            isMulti={true}
                            name="category"
                            onChange={(value) => handleChange("category", value)}
                        />
                    </div>
                </div>
                <div className="flex-col">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">Description</div>
                    <input className="w-[576px] h-[88px] mt-[8px]" placeholder="Provide details of the service" type="text" name="description" onChange={(e) => handleChange("description", e.target.value)} />
                </div>
                <div className="self-end items-start gap-6 flex">
                    <button onClick={handleContinueClick} className="px-4 py-2.5 bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex">
                        <div className="text-neutral-400 text-base font-bold font-['Satoshi']">Continue</div>
                        <Image src={arrowicon} alt="arrow"></Image>
                    </button>
                </div>
            </div>
        </div>
        }
        {lastStep &&
            <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0 fixed inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
                <div className="w-[640px] h-[425px]  p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                    <div className="self-end items-start gap-6 flex ">
                        <button onClick={onClose}>
                            <Image src={closeicon} alt="close"></Image>
                        </button>
                    </div>
                    <div className="flex-col justify-start items-start gap-2 flex">
                        <div className="text-gray-500 text-xl font-medium font-['Satoshi']">New Product</div>
                        <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Add a new product to your inventory</div>
                    </div>
                    <div className="flex items-center gap-[34px]">
                        <div className="pr-[51px] justify-start items-center flex">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Min Stock</div>
                        </div>
                        <div className="w-[263px] h-11 px-4 py-[13px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex">
                            <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                <div className="text-neutral-400 text-base font-medium font-['Satoshi']">
                                    <input className="border-0 focus:border-0 h-8" type="number" name="minStock" onChange={(e) => handleChange("minStock", e.target.value)} />
                                </div>
                            </div>
                            <div className="text-right text-gray-500 text-base font-medium font-['Satoshi']"> </div>
                        </div>
                        <div className="grow shrink basis-0 h-11 px-4 py-[13px] bg-white rounded-[5px] justify-start items-center flex">
                            <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Strips</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-[34px]">
                        <div className="pr-[51px] justify-start items-center flex">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Max Stock</div>
                        </div>
                        <div className="w-[263px] h-11 px-4 py-[13px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex">
                            <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                <div className="text-neutral-400 text-base font-medium font-['Satoshi'] w-full">
                                    <input className="border-0 h-8" type="number" name="maxStock" onChange={(e) => handleChange("maxStock", e.target.value)} />
                                </div>
                            </div>
                            <div className="text-right text-gray-500 text-base font-medium font-['Satoshi']"> </div>
                        </div>
                        <div className="grow shrink basis-0 h-11 px-4 py-[13px] bg-white rounded-[5px] justify-start items-center flex">
                            <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Strips</div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="self-end items-start gap-6 flex">
                        <button onClick={handleSaveClick} className="px-4 py-2.5 bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex">
                            <div className="text-neutral-400 text-base font-bold font-['Satoshi']">Save</div>
                        </button>
                    </div>
                </div>
            </div>
        }
    </>;
}

export default Popup;
