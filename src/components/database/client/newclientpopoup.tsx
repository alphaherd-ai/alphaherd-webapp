"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { Tooltip, Button } from "@nextui-org/react";
import Link from 'next/link';
import closeicon from "../../../assets/icons/inventory/closeIcon.svg";
import arrowicon from "../../../assets/icons/inventory/arrow.svg";
import Paws from "../../../assets/icons/database/1. Icons-24 (12).svg"
import Check from "../../../assets/icons/database/check.svg"
import { z, ZodError,ZodType } from "zod"
import Select from 'react-select';
import PatientPopup from '../patient/newpatientpopup'
import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import { useAppSelector } from '@/lib/hooks';
import { Bounce, ToastContainer, toast } from 'react-toastify';

type PopupProps = {
    onClose: () => void;
}

// const clientSchema = z.object({
//   clientName: z.string().min(1,'Provide Client Name'),
//   email: z.string().email('Invalid email address').optional(),
//   contact: z.string().length(10,'Invalid Phone number format'),
//   address: z.string().min(1,'Provide Address').optional(),
//   city: z.string().min(1,"Select City to continue").optional(),
//   pinCode: z.string().length(5,'Pin code must be exactly 5 digits').optional(),
// });



const ClientPopup: React.FC<PopupProps> = ({ onClose }:any) => {
    const [formData, setFormData] = useState<any>({});
    const [showPopup, setShowPopup] = React.useState(false);
    const appState = useAppSelector((state) => state.app)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSaveDisabled, setIsSaveDisabled] = useState(true)
    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

  

    const handleSaveClick = async () => {
        // console.log("Save button");
        try {
            
        //   clientSchema.parse(formData);
        //   console.log("Form data is valid:", formData);
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/create?branchId=${appState.currentBranchId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clientName: formData.clientName,
              email: formData.email,
              contact: formData.contact,
              address: formData.address,
              city: formData.city ? formData.city[0].value : undefined,
              pinCode: formData.pinCode,
            }),
          });
          if (response.ok) {
                // console.log('Data saved successfully');
                onClose();
                window.dispatchEvent(new FocusEvent('focus'));
            } else {
                console.error('Failed to save data', response.statusText);
            }
        } 
        catch (error) {
            console.error('Error while saving data:', error);
        }
    };
      
    
    const handleChange = (field: string, value: any) => {
        setFormData((prevFormData: any) => {
            const updatedFormData = { ...prevFormData, [field]: value };
    
            // Validate fields to enable or disable the Save button
            const isFormValid =
                updatedFormData.clientName !== '' &&
                updatedFormData.contact &&
                updatedFormData.contact.length === 10;
    
            setIsSaveDisabled(!isFormValid);
    
            return updatedFormData;
        });

        // Optional: Handle errors for specific fields
        if (field === 'contact' && value.length > 10) {
            setErrors((prevErrors) => ({ ...prevErrors, contact: 'Phone number must be exactly 10 digits' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
        }
    };

    // console.log(formData)

    const countryCode = [
        { value: 'IN', label: '+91' },
        { value: 'US', label: '+1' },
    ];

    const City = [
            { value: 'Delhi', label: 'Delhi' },
            { value: 'Mumbai', label: 'Mumbai' },
            {value:'Chennai', label:'Chennai'},
            {value:'Bangalore', label:'Bangalore'},
            {value:'Gurgaon', label:'Gurgaon'}
    ]

    return <>
        
       <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0  inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] h-[575px]  px-8 py-4 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                <div className="self-end items-start gap-6 flex">
                    <button className="border-0 outline-none cursor-pointer" onClick={onClose}>
                        <Image src={closeicon} alt="close"></Image>
                    </button>
                </div>
                <div className="text-gray-500 text-xl font-medium ">New Client</div>
                <div className="text-textGrey1 text-base font-medium ">New client? Enter their details to get started.</div>
                <div className="flex items-center">
                    <div className="text-gray-500 text-base font-medium  w-[8rem]">Client Name<span className="text-[red]">*</span></div>
                    <div>
                        <input className="w-[447px] h-9 text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="clientName" onChange={(e) => handleChange("clientName", e.target.value)} required/>
                        {errors.clientName && (
                            <div className="text-[red] error">{errors.clientName}</div>
                        )}
                        </div>
                </div>
              
                <div className="flex items-center gap-[88px]">
                    <div className="text-gray-500 text-base font-medium ">Email</div>
                    <div>
                        <input className="w-[448px] h-9 text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="email" onChange={(e) => handleChange("email", e.target.value)} />
                        {/* {validationErrors.email && (
                            <div className="text-[red] error">{validationErrors.email}</div>
                        )} */}
                        </div>
                    
                </div>
                <div className="flex items-center gap-[33px] w-full">
                    <div className="text-gray-500 text-base font-medium  w-2/12">Phone No.<span className="text-[red]">*</span></div>
                    <div className="flex w-10/12">
                    <div className="flex-1 ml-1">
                        <input className="h-9 w-full text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="contact" onChange={(e) => handleChange("contact", e.target.value)} required/>
                        {errors.contact && (
                            <div className="text-[red] error">{errors.contact}</div>
                        )}
                    </div>
                    </div>
                </div>
                <div className="flex items-center gap-[33px] w-full">
                    <div className="text-gray-500 text-base font-medium  w-2/12">Address</div>
                    <div className="flex w-10/12">
                  
                    <div className="flex-1 ml-1">
                        <input className="w-full h-9 text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" placeholder="Enter address or Google Maps link" type="text" name="address" onChange={(e) => handleChange("address", e.target.value)} />
                        
                    </div>
                    {/* <div className=" ml-1  w-9 h-9 ">
                    <button  className="w-full h-full rounded-[5px] justify-center text-2xl items-center gap-2 flex border-borderText border border-solid bg-white outline-none">
                        <div className="text-textGrey2 text-lg">+</div>
                    </button>
                    </div> */}
                    </div>
                </div>
            <div className="flex  w-full gap-[65px] justify-between">

                
                <div className="flex items-center gap-[99px] ">
                    <div className="text-gray-500 text-base font-medium  w-2/12">City</div>
                    <div className="flex w-10/12 h-11">
             
                        <Select
                            className="text-textGrey2 w-[10rem] text-base font-medium "
                            placeholder=""
                            isClearable={true}
                            isSearchable={true}
                            options={City}
                            isMulti={false}
                            name="city"
                            onChange={(value) => handleChange("city", value?.label)}
                        />
         
              
                 
            
                    </div>
                </div>
                <div className="flex items-center ">
                    <div className="text-gray-500 text-base font-medium ">Pin Code</div>
                    <div className="flex  h-9">
           
                   
                        <input className=" w-[8rem] ml-[25px] h-9 text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="pinCode" onChange={(e) => handleChange("pinCode", e.target.value)} />
            
                   
                    </div>
                </div>
            </div>
            
                <div className="self-end items-start gap-6 flex">
                
                    {/* <button className="px-4 py-2.5 bg-greenButton border-none rounded-[5px] justify-start items-center gap-2 flex"onClick={togglePopup}>
                        <div className="text-white text-base font-bold ">Add Patient</div>
                    </button> */}
                    <div className=" h-11 px-4 py-2.5 bg-teal-400 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer" onClick={togglePopup}>
                        <div className="w-6 h-7"> <Image src={Paws} alt='Paws' className='w-6 h-6 ' /></div>
                        <div className="text-gray-100 text-base font-medium ">Add Patient</div>
                    </div>
                   
                    {/* <button className="px-4 py-2 bg-black rounded-[5px] justify-start items-center gap-2 flex" onClick={handleSaveClick}>
                        <div className="text-white border-none text-base font-bold ">Save</div>
                    </button>  */}
                    {/* {!isSaveDisabled ? (<div className="h-11 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer"  onClick={handleSaveClick} >
                        <div className="w-6 h-6 relative">
                            <div className="w-6 h-6 left-0 top-0 absolute" >
                                <Image src={Check} alt="Check" />
                            </div>
                        </div>
                        <div className="text-gray-100 text-base font-bold ">Save</div>
                        </div>) : (<button className="px-4 py-2.5 bg-gray-200 rounded-[5px]  justify-start items-center gap-2 flex border-0 outline-none cursor-not-allowed">
                        <div className="text-textGrey1 text-base font-bold ">Save</div>
                        <Image src={arrowicon} alt="arrow"></Image>
                    </button>)} */}
                    <div
                      className={`h-11 px-4 py-2.5 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer ${
                          isSaveDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-zinc-900'
                      }`}
                      onClick={isSaveDisabled ? undefined : handleSaveClick}
                  >
                      {!isSaveDisabled && (
                          <div className="w-6 h-6 relative">
                              <div className="w-6 h-6 left-0 top-0 absolute">
                                  <Image src={Check} alt="Check" />
                              </div>
                          </div>
                      )}
                      <div className="text-gray-100 text-base font-bold">Save</div>
                  </div>
                </div>
            </div>
        </div>
      
        {showPopup && <PatientPopup onClose={togglePopup} clientData={formData} />}
    </>;
    
}

export default ClientPopup;


