"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { Tooltip, Button } from "@nextui-org/react";
import Link from 'next/link';
import closeicon from "../../../assets/icons/inventory/closeIcon.svg";
import arrowicon from "../../../assets/icons/inventory/arrow.svg";
import Select from 'react-select';
import PatientPopup from '../patient/newpatientpopup'
import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
type PopupProps = {
    onClose: () => void;
}

const ClientPopup: React.FC<PopupProps> = ({ onClose }) => {
    const [formData, setFormData] = useState<any>({});
    const [showPopup, setShowPopup] = React.useState(false);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    }
    
    const handleSaveClick = async () => {
        try {   
            const response = await fetch(`${process.env.NEXT_API_BASE_PATH}/api/database/clients/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientName: formData.name,
                    email: formData.email,
                    contact: formData.contact,
                    address: formData.address,
                    city: formData.city?formData.city[0].value:undefined,
                    pinCode: formData.pinCode,
                   
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
            <div className="w-[640px] h-[575px]  px-8 py-4 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                <div className="self-end items-start gap-6 flex">
                    <button onClick={onClose}>
                        <Image src={closeicon} alt="close"></Image>
                    </button>
                </div>
                <div className="text-gray-500 text-xl font-medium font-['Satoshi']">New Client</div>
                <div className="text-neutral-400 text-base font-medium font-['Satoshi']">New client? Enter their details to get started.</div>
                <div className="flex items-center gap-[88px]">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">Client Name*</div>
                    <div>
                        <input className="w-[440px] h-8" type="text" name="name" onChange={(e) => handleChange("name", e.target.value)} />
                    </div>
                </div>
              
                <div className="flex items-center gap-[88px]">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">Email</div>
                    <div>
                        <input className="w-[440px] h-8" type="text" name="email" onChange={(e) => handleChange("email", e.target.value)} />
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
                            name="contact-initials"
                            onChange={(value) => handleChange("contact-initials", value)}
                        />
                    </div>
                    <div className="flex-1 ml-1">
                        <input className="h-9 w-full" type="text" name="contact" onChange={(e) => handleChange("contact", e.target.value)} />
                    </div>
                    <div className=" ml-1  w-9 h-9 ">
                    <button  className="w-full h-full rounded-[5px] justify-center text-2xl items-center gap-2 flex">
                        <div className="text-neutral-400 text-base font-bold font-['Satoshi']">+</div>
                    </button>
                    </div>
                    </div>
                </div>
                <div className="flex items-center gap-[70px] w-full">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi'] w-2/12">Address</div>
                    <div className="flex w-10/12">
                  
                    <div className="flex-1 ml-1">
                        <input className="h-9 w-full" type="text" name="address" onChange={(e) => handleChange("address", e.target.value)} />
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
                            name="city"
                            onChange={(value) => handleChange("city", value)}
                        />
         
              
                 
            
                    </div>
                </div>
                <div className="flex items-center ml-3 w-1/2">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi'] w-3/12">Pin Code</div>
                    <div className="flex w-9/12 h-11">
           
                   
                        <input className="h-9 w-full" type="text" name="pinCode" onChange={(e) => handleChange("pinCode", e.target.value)} />
            
                   
                    </div>
                </div>
                </div>
            
                <div className="self-end items-start gap-6 flex">
                <Popover placement="bottom-end" showArrow offset={10}>
            <PopoverTrigger>
                    <button className="px-4 py-2.5 bg-greenButton border-none rounded-[5px] justify-start items-center gap-2 flex"onClick={togglePopup}>
                        <div className="text-white text-base font-bold font-['Satoshi']">Add Patient</div>
                    </button>
                    </PopoverTrigger>
            <PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">
      
         

            </PopoverContent>
        </Popover>
                    <button className="px-4 py-2 bg-black rounded-[5px] justify-start items-center gap-2 flex" onClick={handleSaveClick}>
                        <div className="text-white border-none text-base font-bold font-['Satoshi']">Save</div>
                    </button>   
                </div>
            </div>
        </div>
      
        {showPopup && <PatientPopup onClose={togglePopup} client_name={formData.name} />}
    </>;
}

export default ClientPopup;


