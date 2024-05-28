"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { Tooltip, Button } from "@nextui-org/react";
import Link from 'next/link';
import closeicon from "../../../assets/icons/inventory/closeIcon.svg";
import arrowicon from "../../../assets/icons/inventory/arrow.svg";
import Select from 'react-select';
import calicon from "../../../assets/icons/finance/calendar_today.svg"
import Paws from "../../../assets/icons/database/1. Icons-24 (12).svg"
import Check from "../../../assets/icons/database/check.svg"
import { response } from "express";
import { Clients } from "@/client";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppSelector } from "@/lib/hooks";

type PopupProps = {
    onClose: () => void;
    client_name: string | null; 
}

const PatientPopup: React.FC<PopupProps> = ({ onClose, client_name }) => {
    const [formData, setFormData] = useState<any>({});
    const [clients, setClients] = useState<{ value: string; label: string }[]>([]);
    const [startDate, setStartDate] = useState(new Date());
    const [selectedGender, setSelectedGender] = useState('female');
    const appState = useAppSelector((state) => state.user);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/getAll?branchId=${appState.currentBranchId}`)
            .then((response) => response.json())
            .then((data) => {
                const formattedClients = data.map((client: Clients) => ({
                    value: client.id,
                    label: client.clientName
                }))
                setClients(formattedClients)
            })
            .catch((error) =>
                console.error("Error fetching client from API: ", error)
            );
    }, []); 

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/patients/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientName: formData.patientName,
                    clientId: formData.clientName.value,
                    species: formData.species,
                    breed: formData.breed ? formData.breed[0].value : undefined,
                    dateOfBirth: formData.dateOfBirth,
                    age: calculateAge(formData.years, formData.months, formData.days),
                    gender: selectedGender,
                    inPatient: formData.inPatient
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
    };

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
        if (field === "patientName" && value.trim() !== "") {
            setIsSaveDisabled(false);
        } else if (field === "patientName" && value.trim() === "") {
            setIsSaveDisabled(true);
        }
    };

    const calculateAge = (years: number, months: number, days: number): string => {
        const currentDate = new Date();
        const birthDate = new Date(currentDate.getFullYear() - years, currentDate.getMonth() - months, currentDate.getDate() - days);
        const ageDate = new Date(currentDate.getTime() - birthDate.getTime());
        const ageYears = Math.abs(ageDate.getUTCFullYear() - 1970);
        const ageMonths = ageDate.getUTCMonth();
        const ageDays = ageDate.getUTCDate() - 1; 
        return `${ageYears} years, ${ageMonths} months, ${ageDays} days`;
    };

    const gstOptions = [
        { value: 'GST@18%.', label: 'GST@18%.' },
        { value: 'GST@9%.', label: 'GST@9%.' }
    ];

    const handleGenderChange = (gender: any) => {
        setSelectedGender(gender);
    };  

    return <>
        <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px]  px-8 py-4 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                <div className="self-end flex">
                    <button onClick={onClose} className="border-0 outline-none cursor-pointer">
                        <Image src={closeicon} alt="close" />
                    </button>
                </div>
                <div className="text-gray-500 text-xl font-medium ">Add Patient</div>
                <div className="text-neutral-400 text-base font-medium ">Ready to welcome a new pet? Enter their details below.</div>
                <div className="flex items-center gap-[48px] ">
                    <div className="w-[8rem] text-gray-500 text-base font-medium ">Patient Name*</div>
                    <div>
                        <input className="w-[25rem] h-9 text-textGrey1 text-base font-medium px-2 rounded outline-none border border-solid border-borderText" type="text" name="patientName" onChange={(e) => handleChange("patientName", e.target.value)} />
                    </div>
                </div>

                <div className="flex items-center gap-[48px]">
                    <div className="  w-[8rem] text-gray-500 text-base font-medium ">Client Name</div>
                    <div>
                        <Select
                            className="text-textGrey1 text-base font-medium  w-[25rem] border-0 boxShadow-0 "
                            classNamePrefix="select"
                            value={clients.find((client) => client.value === client_name)}
                            isClearable={false}
                            isSearchable={true}
                            name="clientName"
                            options={clients}
                            onChange={(selectedClient: any) => handleChange("clientName", selectedClient)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-[120px]">
                    <div className="text-gray-500 text-base font-medium ">Species</div>
                    <div>
                        <input className="w-[25rem] h-9 text-textGrey1 text-base font-medium px-2 rounded outline-none border border-solid border-borderText" type="text" name="species" onChange={(e) => handleChange("species", e.target.value)} />
                    </div>
                </div>
                <div className="flex items-center gap-[95px] w-full">
                    <div className="text-gray-500 text-base font-medium  w-2/12">Breed</div>
                    <div className="flex w-10/12 h-11">

                        <Select
                            className="text-neutral-400 text-base font-medium w-[25rem]"
                            placeholder=""
                            isClearable={false}
                            isSearchable={true}
                            options={gstOptions}
                            isMulti={true}
                            name="breed"
                            onChange={(value) => handleChange("breed", value)}
                        />




                    </div>
                </div>

                
                    
                        
                            <div className="flex gap-[65px] items-center w-full">
                                <div className="text-gray-500 text-base font-medium w-[10rem]">Date of Birth:</div>
                                <div className="w-full relative">
                                    <DatePicker
                                        className="w-[25rem]"
                                        selected={startDate}
                                        onChange={(date:any) => setStartDate(date as Date)}
                                        calendarClassName="react-datepicker-custom"
                                        customInput={
                                            <div className="relative">
                                                <input
                                                    className="w-[25rem] h-9 text-textGrey1 text-base font-medium px-2 rounded border border-solid border-borderText focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                                    value={startDate.toLocaleDateString()}
                                                    readOnly
                                                />
                                                <Image
                                                    src={calicon}
                                                    alt="Calendar Icon"
                                                    className="absolute right-2 top-2 cursor-pointer"
                                                    width={50}
                                                    height={20}
                                                />
                                            </div>
                                        }
                                    />
                                </div>
                            </div>
                <div className="flex items-center gap-[140px] w-full">
                    <div className="text-gray-500 text-base font-medium ">Age*</div>
                    <div className="flex gap-[4rem]">
                        <div className="flex justify-start items-center gap-4">
                            <div className="w-8 h-9 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 inline-flex">
                                <input
                                    className="w-full h-full text-textGrey1 text-base font-medium px-2 rounded outline-none border border-solid border-borderText"
                                    type="text"
                                    min="0"
                                    name="years"
                                    onChange={(e) => handleChange("years", parseInt(e.target.value))}
                                />
                            </div>
                            <div className="text-gray-500 text-base font-medium ">Years</div>
                        </div>
                        <div className="flex justify-start items-center gap-4">
                            <div className="w-8 h-9 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 inline-flex">
                                <input
                                    className="w-full h-full text-textGrey1 text-base font-medium px-2 rounded outline-none border border-solid border-borderText"
                                    type="text"
                                    min="0"
                                    name="months"
                                    onChange={(e) => handleChange("months", parseInt(e.target.value))}
                                />
                            </div>
                            <div className="text-gray-500 text-base font-medium ">Months</div>
                        </div>
                        <div className="flex justify-start items-center gap-4">
                            <div className="w-8 h-9 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 inline-flex">
                                <input
                                    className="w-full h-full text-textGrey1 text-base font-medium px-2 rounded outline-none border border-solid border-borderText"
                                    type="text"
                                    min="0"
                                    name="days"
                                    onChange={(e) => handleChange("days", parseInt(e.target.value))}
                                />
                            </div>
                            <div className="text-gray-500 text-base font-medium ">Days</div>
                        </div>
                        </div>
                    </div>

                <div className="h-auto justify-start items-center gap-[3.4rem] flex ">
                    <div className="w-[120px] text-gray-500 text-base font-medium">Gender</div>
                    <div className="flex flex-wrap sm:flex-nowrap justify-start items-center gap-4">
                        {['male', 'female', 'unspecified'].map((gender) => (
                            <div
                                key={gender}
                                className={` h-11 px-4 py-2 rounded-[5px] border-solid border border-textGrey1 ${selectedGender === gender
                                    ? 'bg-teal-400 text-white border-transparent'
                                    : 'bg-white text-neutral-400 border-textGrey1'
                                    } cursor-pointer flex justify-center items-center`}
                                onClick={() => handleGenderChange(gender)}
                            >
                                <div className="text-base font-medium ">
                                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className=" ml-[2rem] w-[576px] h-6 px-[136px] justify-start items-center gap-4 flex">
                    <div className="grow shrink basis-0 self-stretch justify-start items-center gap-2 flex">
                         <input className="mt-1 accent-teal-500 text-4xl" type="checkbox" defaultChecked />
                        <div className=" text-teal-400 text-base font-medium ">Mark as inpatient</div>
                    </div>
                </div>

                <div className=" justify-end items-start gap-6 flex w-full">

                    <div className=" h-11 px-4 py-2.5 bg-teal-400 rounded-[5px] justify-start items-center gap-2 flex">
                        <div className="w-6 h-7"> <Image src={Paws} alt='Paws' className='w-6 h-6 ' /></div>
                        <div className="text-gray-100 text-base font-medium ">Add another Patient</div>
                    </div>
                    {!isSaveDisabled ? (<div className="h-11 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer"  onClick={handleSaveClick} >
    <div className="w-6 h-6 relative">
        <div className="w-6 h-6 left-0 top-0 absolute" >
            <Image src={Check} alt="Check" />
        </div>
    </div>
    <div className="text-gray-100 text-base font-bold ">Save</div>
</div>) : (<button className="px-4 py-2.5 bg-gray-200 rounded-[5px]  justify-start items-center gap-2 flex border-0 outline-none cursor-not-allowed">
                        <div className="text-neutral-400 text-base font-bold ">Save</div>
                        <Image src={arrowicon} alt="arrow"></Image>
                    </button>)}
                </div>
            </div>
        </div >


    </>;
}

export default PatientPopup;


