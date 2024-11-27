"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { Tooltip, Button } from "@nextui-org/react";
import Link from 'next/link';
import closeicon from "../../../assets/icons/inventory/closeIcon.svg";
import arrowicon from "../../../assets/icons/inventory/arrow.svg";
import Select, { MultiValue } from 'react-select';
import CretableSelect from "react-select/creatable"
import calicon from "../../../assets/icons/finance/calendar_today.svg"
import Paws from "../../../assets/icons/database/1. Icons-24 (12).svg"
import Check from "../../../assets/icons/database/check.svg"
import { response } from "express";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading2 from "@/app/loading2";
import Creatable from "react-select/creatable";
type PopupProps = {
    onClose: () => void;
    clientData: any;
}
interface Species {
    id: string,
    name: string | string[],
}

interface Breed {
    speciesId: any;
    id: string,
    name: string | string[],
}

const PatientPopup: React.FC<PopupProps> = ({ onClose, clientData }) => {
    const [formData, setFormData] = useState<any>({});
    const [clients, setClients] = useState<{ value: string; label: string }[]>([]);
    //const [startDate, setStartDate] = useState(new Date());
    const [selectedGender, setSelectedGender] = useState('unspecified');
    const appState = useAppSelector((state) => state.app)
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [errors, setErrors] = useState<{ patientName?: string; clientName?: string }>({});
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [age, setAge] = useState<{ years: number; months: number; days: number }>({ years: 0, months: 0, days: 0 });
    const [breeds, setBreeds] = useState<any[]>([]);
    const [savingData, setSavingData] = useState(false);
    const [isImPatient, setIsImpatient] = useState(false);
    const [filteredBreeds, setFilteredBreeds] = useState<any[]>([]);
    const [selectedSpecies, setSelectedSpecies] = useState<any>(null);
    let isAnotherPatient = false;
    let selectedClient: { value: string; label: string; } | null | undefined = null;

    const resetForm = () => {
        setFormData((prevData: { clientName: any; }) => ({
            clientName: prevData.clientName,
            patientName: '',
            species: null,
            breed: null,
            dateOfBirth: null,
        }));
        setSelectedGender('unspecified');
        setStartDate(null);
        setAge({ years: 0, months: 0, days: 0 });
        setSelectedSpecies(null);
        setFilteredBreeds([]);
        setErrors({});
        setIsSaveDisabled(true);
        setIsImpatient(false);
    };


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
    const calculateAge = (dob: Date) => {
        const today = new Date();
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();
        if (days < 0) {
            months -= 1;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years -= 1;
            months += 12;
        }
        return { years, months, days };
    };

    const calculateDateOfBirth = (value: number, field: string) => {
        const today = new Date();
        let years = age.years;
        let months = age.months;
        let days = age.days;
        if (field === "years") years = value;
        if (field === "months") months = value;
        if (field === "days") days = value;

        const newDate = new Date(today.getFullYear() - years, today.getMonth() - months, today.getDate() - days);
        return newDate;
    };
    const handleDateChange = (date: Date) => {
        setStartDate(date);
        const calculatedAge = calculateAge(date);
        setAge(calculatedAge);
        handleChange("years", calculatedAge.years);
        handleChange("months", calculatedAge.months);
        handleChange("days", calculatedAge.days);
    };

    const handleAgeChange = (field: string, value: number) => {
        setAge((prevAge) => ({ ...prevAge, [field]: value }));

        const newDateOfBirth = calculateDateOfBirth(value, field);
        setStartDate(newDateOfBirth);
        handleChange("dateOfBirth", newDateOfBirth);
    };

    const formatAgeString = (age: { years: number; months: number; days: number }) => {
        const { years, months, days } = age;
        let ageString = '';
        if (years > 0) ageString += `${years} years`;
        if (months > 0) {
            if (ageString.length > 0) ageString += ', ';
            ageString += `${months} months`;
        }
        if (days > 0) {
            if (ageString.length > 0) ageString += ', ';
            ageString += `${days} days`;
        }

        return ageString;
    };


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/getAll?branchId=${appState.currentBranchId}`)
            .then((response) => response.json())
            .then((data) => {
                const formattedClients = data.map((client: any) => ({
                    value: client.id,
                    label: client.clientName
                }))
                setClients(formattedClients)
            })
            .catch((error) =>
                console.error("Error fetching client from API: ", error)
            );
        if (clientData) {
            setFormData((prevData: { clientName: any; }) => ({
                clientName: selectedClient,
                patientName: '',
                species: null,
                breed: null,
                dateOfBirth: null,
            }));
        }
    }, []);

    const handleAnotherpatient = () => {

        isAnotherPatient = true;
        handleSaveClick();
    }

    useEffect(() => {
        if (clients.length > 0) {
            selectedClient = (clients.find(client => client.label === clientData?.clientName));
            handleChange("clientName", selectedClient);
        }
    }, [clients])


    const handleSaveClick = async () => {
        console.log("clicked");
        try {
            setSavingData(true);
            setIsSaveDisabled(true);
            let selectedBreed=null;
            console.log(formData.breed);
            if(formData.breed !==undefined && formData.breed!==null) {selectedBreed = Array.isArray(formData.breed.label) && formData.breed.label.length > 0
                ? formData.breed.label[0]
                : formData.breed.label;}
           
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/patients/create?branchId=${appState.currentBranchId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientName: formData.patientName,
                    clientId: formData.clientName.value,
                    species: formData.species ? formData.species.label : undefined,
                    breed: selectedBreed ? selectedBreed: undefined,
                    dateOfBirth: formData.dateOfBirth,
                    age: formatAgeString(age),
                    gender: selectedGender,
                    isInpatient: isImPatient,
                    clientData: clientData ? clientData : null
                }),
            });
            if (response.ok) {
                // console.log('Data saved successfully');
                if (!isAnotherPatient) onClose();
                else {
                    resetForm();
                    isAnotherPatient = false;
                }
                window.dispatchEvent(new FocusEvent('focus'));
            } else {
                console.error('Failed to save data:', response.statusText);
            }
        } catch (error) {
            
            console.error('Error while saving data:', error);
        }
        finally{
            setSavingData(false);
            setIsSaveDisabled(false);
        }
    };
    // console.log(formData);
    const handleChange = (field: string, value: any) => {
        setFormData((prevFormData: any) => {
            const updatedFormData = { ...prevFormData, [field]: value };
            const isPatientNameValid = updatedFormData.patientName !== '';
            const isClientNameValid = updatedFormData.clientName !== undefined;
            const newErrors: { patientName?: string; clientName?: string } = {};
            if (!isPatientNameValid) newErrors.patientName = 'Patient name is required';
            if (!isClientNameValid) newErrors.clientName = 'Client name is required';
            setErrors(newErrors);
            setIsSaveDisabled(!isPatientNameValid || !isClientNameValid);
            return updatedFormData;

        });
    };


    const [species, setSpecies] = useState<any[]>([]);
    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/species/getAll?branchId=${appState.currentBranchId}`
                );

                const speciesList: any[] = response.data.map((speciesEntry: Species) => ({
                    value: speciesEntry.id,
                    label: speciesEntry.name
                }));
                console.log(speciesList);
                setSpecies(speciesList);
            } catch (error) {
                console.log('Error fetching species', error);
            }
        };

        fetchSpecies();
    }, [appState.currentBranchId]);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/breed/getAll?branchId=${appState.currentBranchId}`
                );

                const breedList: any[] = response.data.map((breedEntry: Breed) => ({
                    value: breedEntry.id,
                    label: breedEntry.name,
                    speciesId: breedEntry.speciesId,
                }));

                setBreeds(breedList);
            } catch (error) {
                console.error("Error fetching breeds", error);
            }
        };

        fetchBreeds();
    }, [appState.currentBranchId]);

  console.log("breedsss", breeds)

  // Filter breeds based on selected species
  useEffect(() => {
    if (selectedSpecies) {
      const filtered = breeds.filter((breed) => breed.speciesId === selectedSpecies.value);
      setFilteredBreeds(filtered);
    } else {
      setFilteredBreeds([]); // Reset if no species is selected
    }
  }, [selectedSpecies, breeds]);

  console.log("filtered breeds", filteredBreeds);

    const handleGenderChange = (gender: any) => {
        setSelectedGender(gender);
    };
    return <>
        <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50" >
            <div className="w-[640px]  px-8 py-4 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex" >
                <div className="self-end flex">
                    <button onClick={onClose} className="border-0 outline-none cursor-pointer">
                        <Image src={closeicon} alt="close" />
                    </button>
                </div>
                <div className="text-gray-500 text-xl font-medium ">Add Patient</div>
                <div className="text-textGrey2 text-base font-medium ">Ready to welcome a new pet? Enter their details below.</div>
                <div className="flex items-center gap-[48px] ">
                    <div className="w-[8rem] text-gray-500 text-base font-medium ">Patient Name<span className="text-[red]">*</span></div>
                    <div>
                        <input className="w-[25rem] h-9  text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]"
                            type="text" name="patientName" value={formData.patientName || ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                e.target.value = value.charAt(0).toUpperCase() + value.slice(1);
                                handleChange("patientName", e.target.value);
                            }}
                        />
                        {errors.patientName && (
                            <div className="text-[red] error">{errors.patientName}</div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-[48px]">
                    <div className="  w-[8rem] text-gray-500 text-base font-medium ">Client Name</div>
                    <div>

                            <Select
                                className="text-textGrey2 text-base font-medium  w-[25rem] border-0 boxShadow-0 "
                                classNamePrefix="select"
                                isClearable={false}
                                isSearchable={true}
                                name="clientName"
                                options={clients}
                                onChange={(selectedClient: any) => handleChange("clientName", selectedClient)}
                                styles={customStyles}
                                value={clients.find((client) => client.label === clientData?.clientName)}
                            />
                        

                    </div>
                </div>
                <div className="flex items-center gap-[120px]">
                    <div className="text-gray-500 text-base font-medium ">Species</div>
                    <div>
                        {/* <input className="w-[25rem] h-9 text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" 
                        type="text" name="species" onChange={(e) => handleChange("species", e.target.value)} /> */}
                        <div>
                            <Creatable
                                className="text-textGrey2 text-base font-medium w-[25rem] "
                                placeholder=""
                                isClearable={false}
                                isSearchable={true}
                                options={species}
                                isMulti={false}
                                name="species"
                                onChange={(selectedSpecies: any) => {
                                    setSelectedSpecies(selectedSpecies);
                                    handleChange("species", selectedSpecies);
                                }}
                                styles={customStyles}
                                value={formData.species}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-[95px] w-full">
                    <div className="text-gray-500 text-base font-medium  w-2/12">Breed</div>
                    <div className="flex w-10/12 h-11">
                        <Creatable
                            className="text-textGrey2 text-base font-medium w-[25rem] "
                            placeholder=""
                            isClearable={false}
                            isSearchable={true}
                            options={filteredBreeds}
                            isMulti={false}
                            name="breed"
                            onChange={(selectedBreed: any) => handleChange("breed", selectedBreed)}
                            styles={customStyles}
                            value={formData.breed}
                        />
                    </div>
                </div>
                <div className="flex gap-[65px] items-center w-full">
                    <div className="text-gray-500 text-base font-medium w-[10rem]">Date of Birth:</div>
                    <div className="w-full relative">
                        <DatePicker
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            className="w-[25rem]"
                            selected={startDate}
                            // onChange={(date:any) => setStartDate(date as Date)}
                            onChange={handleDateChange}
                            calendarClassName="react-datepicker-custom"
                            customInput={
                                <div className="relative">
                                    <input
                                        className="w-[25rem] h-9 text-textGrey2 text-base font-medium px-2 rounded border border-solid border-borderGrey focus:border focus:border-textGreen outline-none"
                                        value={startDate ? startDate.toLocaleDateString() : ''}
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
                    <div className="text-gray-500 text-base font-medium ">Age<span className="text-[red]">*</span></div>
                    <div className="flex gap-4">
                        <div className="flex justify-start items-center gap-1">
                            <div className="w-12 h-9 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 inline-flex">
                                <input
                                    className="w-full h-full text-textGrey2 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]"
                                    type="number"
                                    //min="0"
                                    name="years"
                                    value={age.years === 0 ? '' : age.years} // Show empty string when 0
                                    onChange={(e) => handleAgeChange('years', parseInt(e.target.value.replace(/^0+/, '')))} // Remove leading 0s
                                />
                            </div>
                            <div className="text-gray-500 text-base font-medium ">Years</div>
                        </div>
                        <div className="flex justify-start items-center gap-1">
                            <div className="w-12 h-9 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 inline-flex">
                                <input
                                    className="w-full h-full text-textGrey2 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]"
                                    type="number"
                                    //min="0"
                                    name="months"
                                    value={age.months === 0 ? '' : age.months}
                                    onChange={(e) => handleAgeChange('months', parseInt(e.target.value.replace(/^0+/, '')))} // Remove leading 0s
                                />
                            </div>
                            <div className="text-gray-500 text-base font-medium ">Months</div>
                        </div>
                        <div className="flex justify-start items-center gap-1">
                            <div className="w-12 h-9 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 inline-flex">
                                <input
                                    className="w-full h-full text-textGrey2 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]"
                                    type="number"
                                    min="0"
                                    name="days"
                                    value={age.days === 0 ? '' : age.days}
                                    onChange={(e) => handleAgeChange('days', parseInt(e.target.value.replace(/^0+/, '')))} // Remove leading 0s
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
                                className={` h-11 px-4 py-2 rounded-[5px] border-solid border border-borderGrey ${selectedGender === gender
                                    ? 'bg-teal-400 text-white border-transparent'
                                    : 'bg-white text-textGrey2 border-borderGrey'
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
                        <input className="mt-1 accent-teal-500 text-4xl" type="checkbox" />
                        <div className=" text-teal-400 text-base font-medium ">Mark as inpatient</div>
                    </div>
                </div>
                <div className=" justify-end items-start gap-6 flex w-full">
                    <div className=" h-11 px-4 py-2.5 bg-teal-400 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer" onClick={isSaveDisabled ? undefined : handleAnotherpatient}>
                        <div className="w-6 h-7"> <Image src={Paws} alt='Paws' className='w-6 h-6 ' /></div>
                        <div className="text-gray-100 text-base font-medium ">Add another Patient</div>
                    </div>
                    <div
                        className={`h-11 px-4 py-2.5 rounded-[5px] justify-start items-center gap-2 flex  ${isSaveDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-zinc-900 cursor-pointer'
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
                        <div className="text-gray-100 text-base font-bold">{savingData ? <Loading2></Loading2> : "Save"}</div>
                    </div>
                </div>
            </div>
        </div >
    </>
}
export default PatientPopup;