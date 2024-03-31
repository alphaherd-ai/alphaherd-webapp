"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { Tooltip, Button } from "@nextui-org/react";
import Link from 'next/link';
import closeicon from "../../../assets/icons/inventory/closeIcon.svg";
import arrowicon from "../../../assets/icons/inventory/arrow.svg";
import Select from 'react-select';
import Attachment from "../../../assets/icons/finance/attachment.svg"

type PopupProps = {
    onClose: () => void;
}


const Popup: React.FC<PopupProps> = ({ onClose }) => {
    const [formData, setFormData] = useState<any>({});

    


    const handleSaveClick = async () => {
        try {
            const selectedProviders = formData.providers.map((provider:any) => provider.value);
    
            const response = await fetch(`${process.env.NEXT_API_BASE_PATH}/api/inventory/product/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemName: formData.name,
                    providers: selectedProviders,
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
            
        }
    };
    

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const gstOptions = [
        { value: 'GST@18%.', label: 'GST@18%.' },
        { value: 'GST@9%.', label: 'GST@9%.' }
    ];

    return <>

       <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0 fixed inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] h-[705px]  px-8 py-4 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                <div className="self-end items-start gap-6 flex">
                    <button onClick={onClose}>
                        <Image src={closeicon} alt="close"></Image>
                    </button>
                </div>
                <div className="text-gray-500 text-xl font-medium font-['Satoshi']">Add Distributor</div>
                <div className="text-neutral-400 text-base font-medium font-['Satoshi']">New distributor? Enter their details to get started.</div>
                <div className="flex items-center gap-[88px]">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">Name*</div>
                    <div>
                        <input className="w-[440px] h-8" type="text" name="name" onChange={(e) => handleChange("name", e.target.value)} />
                    </div>
                </div>
              
                <div className="flex items-center gap-[88px]">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">Email</div>
                    <div>
                        <input className="w-[440px] h-8" type="text" name="hsnCode" onChange={(e) => handleChange("hsnCode", e.target.value)} />
                    </div>
                </div>
                <div className="flex items-center gap-[70px] w-full">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi'] w-2/12">Mobile No</div>
                    <div className="flex w-10/12">
                    <div className="w-1/8 h-11">
                        <Select
                            className="text-neutral-400 text-base font-medium "
                            placeholder="+91"
                            isClearable={false}
                            isSearchable={true}
                            options={gstOptions}
                            isMulti={true}
                            name="providers"
                            onChange={(value) => handleChange("providers", value)}
                        />
                    </div>
                    <div className="flex-1 ml-1">
                        <input className="h-9 w-full" type="text" name="hsnCode" onChange={(e) => handleChange("hsnCode", e.target.value)} />
                    </div>
                    <div className=" ml-1  w-9 h-9 ">
                    <button  className="w-full h-full rounded-[5px] justify-center text-2xl items-center gap-2 flex">
                        <div className="text-neutral-400 text-base font-bold font-['Satoshi']">+</div>
                    </button>
                    </div>
                    </div>
                </div>
                <div className="flex items-center gap-[88px]">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">GSTIN </div>
      
                        <input className="w-[440px] h-8" type="text" name="hsnCode" onChange={(e) => handleChange("hsnCode", e.target.value)} />
                  
                    <div className="w-[97px] h-6 px-2 py-1.5 bg-teal-400 rounded-[5px] justify-center items-center gap-2 inline-flex absolute right-12">
<div className="text-white text-sm font-medium font-['Roboto']">Fetch Details</div>
</div>  
                </div>
                <div className="flex items-center gap-[88px]">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">PAN Number</div>
                    <div>
                        <input className="w-[440px] h-8" type="text" name="hsnCode" onChange={(e) => handleChange("hsnCode", e.target.value)} />
                    </div>
                </div>
                <div className="flex items-center gap-[70px] w-full">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi'] w-2/12">Address</div>
                    <div className="flex w-10/12">
                  
                    <div className="flex-1 ml-1">
                        <input className="h-9 w-full" type="text" name="hsnCode" onChange={(e) => handleChange("hsnCode", e.target.value)} />
                    </div>
                    <div className=" ml-1  w-9 h-9 ">
                    <button  className="w-full h-full rounded-[5px] justify-center text-2xl items-center gap-2 flex">
                        <div className="text-neutral-400 text-base font-bold font-['Satoshi']">+</div>
                    </button>
                    </div>
                    </div>
                </div>
                <div className="flex w-full">

                
                <div className="flex items-center  w-1/2">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi'] w-2/12">City</div>
                    <div className="flex w-10/12 h-11">
             
                        <Select
                            className="text-neutral-400 text-base font-medium w-full"
                            placeholder=""
                            isClearable={false}
                            isSearchable={true}
                            options={gstOptions}
                            isMulti={true}
                            name="providers"
                            onChange={(value) => handleChange("providers", value)}
                        />
         
              
                 
            
                    </div>
                </div>
                <div className="flex items-center ml-3 w-1/2">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi'] w-3/12">Pin Code</div>
                    <div className="flex w-9/12 h-11">
           
                   
                        <input className="h-9 w-full" type="text" name="hsnCode" onChange={(e) => handleChange("hsnCode", e.target.value)} />
            
                   
                    </div>
                </div>
                </div>
             
                <div className=" justify-between items-start gap-6 flex w-full">
                <div className=" h-11 px-6 py-2.5 rounded-[5px]  justify-center items-center inline-flex border border-gray-300 border-solid ">
                        <div className="self-stretch justify-start items-center gap-2 inline-flex">
                            <div className="w-6 h-6 flex justify-center items-center"> <Image src={Attachment} alt='Attachment' className='w-3 h-3 ' /></div>
                            <div className="justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold font-['Satoshi']">Attach files</div>
                            </div>
                        </div>
                    </div>
                    <button className="px-4 py-2.5 bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex">
                        <div className="text-neutral-400 text-base font-bold font-['Satoshi']">Save</div>
                        <Image src={arrowicon} alt="arrow"></Image>
                    </button>
                  
                </div>
            </div>
        </div>
      
     
    </>;
}

export default Popup;


