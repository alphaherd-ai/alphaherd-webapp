"use client";
import Image from "next/image";
import React, { useState } from 'react';
import closeicon from "../../../../assets/icons/inventory/closeIcon.svg";
import Select from 'react-select';

type PopupProps = {
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
    const [lastStep, setLastStep] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [buttonDisabled, setButtonDisabled] = useState(false);



    const handleContinueClick = () => {
        setLastStep(true);
    }


    const handleSaveClick = async () => {
        try {
            setButtonDisabled(true);
            const selectedProviders = formData.providers.map((provider:any) => provider.value);
            const selectedProducts = formData.linkProducts.map((linkProducts:any) => linkProducts.value);
            const response = await fetch(`${process.env.NEXT_API_BASE_PATH}/api/inventory/service/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    providers: selectedProviders,
                    sellingPrice: parseInt(formData.sellingPrice),
                    quantity: parseInt(formData.quantity),
                    sacCode: formData.sacCode,
                    linkProducts:selectedProducts,
                    serviceCost: parseInt(formData.serviceCost),
                    serviceCharge: parseInt(formData.serviceCharge),
                    tax: formData.tax ? formData.tax.value : undefined,
                    category: formData.category ? formData.category.value : undefined,
                    description: formData.description,
                  
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
        {!lastStep &&
            <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0 fixed inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
                <div className="w-[700px] h-[500px] px-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                    <div className="self-end items-start gap-6 flex">
                        <button onClick={onClose}>
                            <Image src={closeicon} alt="close"></Image>
                        </button>
                    </div>
                    <div className="text-gray-500 text-xl font-medium font-['Satoshi']">New Service</div>
                    <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Introduce a new Service</div>
                    <div className="flex items-center gap-[88px]">
                        <div className="text-gray-500 text-base font-medium font-['Satoshi']">Name*</div>
                        <div>
                            <input className="w-[440px] h-11" type="text" name="name" onChange={(e) => handleChange("name", e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex items-center gap-[63px]">
                        <div className="text-gray-500 text-base font-medium font-['Satoshi']">SAC Code</div>
                        <div>
                            <input className="w-[440px] h-11" type="text" name="sacCode" onChange={(e) => handleChange("sacCode", e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex-col">
                        <div className="text-gray-500 text-base font-medium font-['Satoshi']">Description</div>
                        <input className="w-[576px] h-[88px] mt-[8px]" placeholder="Provide details of the service" type="text" name="description" onChange={(e) => handleChange("description", e.target.value)} />
                    </div>
                    <div className="self-end items-start gap-6 flex">
                        <button onClick={handleContinueClick} className="px-4 py-2.5 bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex">
                            <div className="text-neutral-400 text-base font-bold font-['Satoshi']">Continue</div>
                        </button>
                    </div>
                </div>
            </div>
        }
        {lastStep &&
            <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0 fixed inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
                <div className="w-[640px] h-[543px]  p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                    <div className="self-end items-start gap-6 flex">
                        <button onClick={onClose}>
                            <Image src={closeicon} alt="close"></Image>
                        </button>
                    </div>
                    <div className="text-gray-500 text-xl font-medium font-['Satoshi']">New Service</div>
                    <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Configure your service</div>
                    <div className="flex items-center gap-[34px]">
                        <div className="flex gap-[35px] items-center">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Service Charge</div>
                            <div className="w-[157px] h-11">
                                <input className="w-[157px] h-11" type="number" name="serviceCharge" onChange={(e) => handleChange("serviceCharge", e.target.value)}/>
                            </div>
                        </div>
                        <div className="flex items-center gap-[16px]">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Tax</div>
                            <div>
                                <Select
                                    className="text-neutral-400 text-base font-medium"
                                    defaultValue={gstOptions[0]}
                                    isClearable={false}
                                    isSearchable={true}
                                    options={gstOptions}
                                    name="tax"
                            onChange={(value) => handleChange("tax", value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-[70px]">
                        <div className="text-gray-500 text-base font-medium font-['Satoshi']">Category</div>
                        <div>
                            <Select
                                className="text-neutral-400 text-base font-medium"
                                placeholder="Select Category"
                                isClearable={false}
                                isSearchable={true}
                                options={gstOptions}
                                name="category"
                            onChange={(value) => handleChange("category", value)}
                            />
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
                    <div className="flex items-center gap-[32px]">
                        <div className="text-gray-500 text-base font-medium font-['Satoshi']">Link Product(s)</div>
                        <div>
                            <Select
                                className="text-neutral-400 text-base font-medium"
                                isClearable={false}
                                isSearchable={true}
                                options={gstOptions}
                                isMulti={true}
                                name="linkProducts"
                            onChange={(value) => handleChange("linkProducts", value)}
                            />
                        </div>
                    </div>
                    <div className="self-end items-start gap-6 flex">
                        <button onClick={handleSaveClick} disabled={buttonDisabled} className="px-4 py-2.5 bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex">
                            <div className="text-neutral-400 text-base font-bold font-['Satoshi']">Save</div>
                        </button>
                    </div>
                </div>
            </div>
        }
    </>
}

export default Popup;
