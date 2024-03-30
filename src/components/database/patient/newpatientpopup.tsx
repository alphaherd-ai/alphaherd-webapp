"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { Tooltip, Button } from "@nextui-org/react";
import Link from 'next/link';
import closeicon from "../../../assets/icons/inventory/closeIcon.svg";
import arrowicon from "../../../assets/icons/inventory/arrow.svg";
import Select from 'react-select';
import calicon from "../../../assets/icons/finance/calendar_today.svg"
import DatePicker from "react-date-picker"

import Attachment from "../../../assets/icons/finance/attachment.svg"

type PopupProps = {
    onClose: () => void;
}


const Popup: React.FC<PopupProps> = ({ onClose }) => {
    const [formData, setFormData] = useState<any>({});




    const handleSaveClick = async () => {
        try {
            const selectedProviders = formData.providers.map((provider: any) => provider.value);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/inventory/product/create`, {
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
    const [startDate, setStartDate] = useState(new Date());

    const gstOptions = [
        { value: 'GST@18%.', label: 'GST@18%.' },
        { value: 'GST@9%.', label: 'GST@9%.' }
    ];
    const [selectedGender, setSelectedGender] = useState('female');

    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
    };
    return <>

        <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0 fixed inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] h-[805px]  px-8 py-4 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                <div className="self-end items-start gap-6 flex">
                    <button onClick={onClose}>
                        <Image src={closeicon} alt="close"></Image>
                    </button>
                </div>
                <div className="text-gray-500 text-xl font-medium font-['Satoshi']">Add Patient</div>
                <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Ready to welcome a new pet? Enter their details below.</div>
                <div className="flex items-center gap-[88px]">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">Patient Name*</div>
                    <div>
                        <input className="w-[440px] h-8" type="text" name="name" onChange={(e) => handleChange("name", e.target.value)} />
                    </div>
                </div>

                <div className="flex items-center gap-[88px]">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">Client Name</div>
                    <div>
                        <input className="w-[440px] h-8" type="text" name="hsnCode" onChange={(e) => handleChange("hsnCode", e.target.value)} />
                    </div>
                </div>
                <div className="flex items-center gap-[88px]">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">Species</div>
                    <div>
                        <input className="w-[440px] h-8" type="text" name="hsnCode" onChange={(e) => handleChange("hsnCode", e.target.value)} />
                    </div>
                </div>
                <div className="flex items-center gap-[70px] w-full">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi'] w-2/12">Breed</div>
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

                <div className="flex items-center gap-[70px] w-full">



                    <div className="flex w-full flex justify-between w-full pb-[16px] ">


                        <div className=" rounded-[10px] justify-between items-center gap-4 flex w-full ">
                            <div className="flex gap-[16px] items-center w-full">
                                <div className="text-gray-500 text-base font-bold font-['Satoshi'] w-2/12"> Date of Birth:</div>
                                <DatePicker
                                    className={"text-gray-500 text-base font-medium font-['Satoshi'] w-fullborder-0 w-full boxShadow-0"}
                                    value={startDate}
                                    onChange={(date) => {
                                        if (date instanceof Date) {
                                            setStartDate(date);
                                        } else if (Array.isArray(date) && date.length === 2 && date[0] instanceof Date) {
                                            // Assuming you want the start date of the range
                                            setStartDate(date[0]);
                                        }
                                    }}
                                    clearIcon={() => null}
                                    calendarIcon={() => (
                                        <Image src={calicon} alt="Calendar Icon" width={20} height={20} />
                                    )}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-[576px] h-11 justify-start items-center gap-6 inline-flex">
                    <div className="w-[120px] text-gray-500 text-base font-medium font-['Roboto']">Age</div>
                    <div className="justify-start items-center gap-4 flex">
                        <div className="w-16 h-11 border-0 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 inline-flex">
                            <input className="text-gray-500 text-base w-16 h-11 border-0 font-medium font-['Roboto']" />
                        </div>
                        <div className="text-gray-500 text-base font-medium font-['Roboto']">Years</div>
                    </div>
                    <div className="justify-start items-center gap-4 flex">
                        <div className="w-16 h-11 border-0 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 inline-flex">
                            <input className="text-gray-500 text-base w-16 h-11 border-0 font-medium font-['Roboto']" />

                        </div>
                        <div className="text-gray-500 text-base font-medium font-['Roboto']">Months</div>
                    </div>
                    <div className="justify-start items-center gap-4 flex">
                        <div className="w-20 h-11 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 inline-flex">
                            <input className="text-gray-500 text-base w-16 h-11 border-0 font-medium font-['Roboto']" />

                        </div>
                        <div className="text-gray-500 text-base font-medium font-['Roboto']">Days</div>
                    </div>
                </div>

                <div className="w-full sm:w-[464px] h-auto justify-start items-center gap-6 inline-flex">
                    <div className="w-[120px] text-gray-500 text-base font-medium font-['Roboto']">Gender</div>
                    <div className="flex flex-wrap sm:flex-nowrap justify-start items-center gap-4">
                        {['male', 'female', 'unspecified'].map((gender) => (
                            <div
                                key={gender}
                                className={`w-[88px] h-11 px-4 py-2 rounded-[5px] border ${selectedGender === gender
                                    ? 'bg-teal-400 text-white border-transparent'
                                    : 'bg-white text-neutral-400 border-neutral-400'
                                    } cursor-pointer flex justify-center items-center`}
                                onClick={() => handleGenderChange(gender)}
                            >
                                <div className="text-base font-medium font-['Roboto']">
                                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-[576px] h-6 px-[136px] justify-start items-center gap-2 inline-flex">
                    <div className="w-6 h-6 relative"></div>
                    <div className="grow shrink basis-0 self-stretch justify-start items-center gap-2 flex">
                        <div className="w-4 h-4 relative"> <input className="mt-1 accent-teal-500" type="checkbox" defaultChecked /></div>
                        <div className="w-[131px] text-teal-400 text-base font-medium font-['Roboto']">Mark as inpatient</div>
                    </div>
                </div>

                <div className=" justify-end items-start gap-6 flex w-full">

                    <div className="w-[213px] h-11 px-4 py-2.5 bg-teal-400 rounded-[5px] justify-start items-center gap-2 inline-flex">
                        <div className="w-6 h-6 relative"> <Image src={Attachment} alt='Attachment' className='w-6 h-6 ' /></div>
                        <div className="text-gray-100 text-base font-bold font-['Roboto']">Add another Patient</div>
                    </div>
                    <button className="px-4 py-2.5 bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex">
                        <div className="text-neutral-400 text-base font-bold font-['Satoshi']">Save</div>
                        <Image src={arrowicon} alt="arrow"></Image>
                    </button>

                </div>
            </div>
        </div >


    </>;
}

export default Popup;


