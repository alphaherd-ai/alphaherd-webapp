"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';

import closeicon from "../../../assets/icons/inventory/closeIcon.svg";

import Select from 'react-select';

import calicon from "../../../assets/icons/finance/calendar_today.svg"
import Paws from "../../../assets/icons/database/1. Icons-24 (12).svg"
import Check from "../../../assets/icons/database/check.svg"

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppSelector } from "@/lib/hooks";

import axios from "axios";
import Creatable from "react-select/creatable";
import Loading2 from "@/app/loading2";
type PopupProps = {
    onClose: () => void;
    clientData: any;
    editPatient?: any
    setEditpatient?: any

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

const PatientPopup: React.FC<PopupProps> = ({ onClose, clientData, editPatient, setEditpatient }) => {
    console.log(editPatient);
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
    const [filteredBreeds, setFilteredBreeds] = useState<any[]>([]);
    const [selectedSpecies, setSelectedSpecies] = useState<any>(null);
    const [isImPatient, setIsImpatient] = useState(false);
    const [prevPatients, setPrevPatients] = useState<any[]>([]);
    const [isSamePatientName, setIsSamePatientName] = useState(false);
    let isAnotherPatient = false;
    let selectedClient: { value: string; label: string; } | null | undefined = null;


    useEffect(() => {
        if (editPatient) {
            setSelectedGender(editPatient.gender || 'unspecified');
            setStartDate(editPatient.dateOfBirth ? new Date(editPatient.dateOfBirth) : null);
            setAge(editPatient.age ? calculateAge(new Date(editPatient.dateOfBirth)) : { years: 0, months: 0, days: 0 });
        }
    }, [editPatient])






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
        let years = isNaN(age.years) ? 0 : age.years;
        let months = isNaN(age.months) ? 0 : age.months;
        let days = isNaN(age.days) ? 0 : age.days;

        if (field === "years") years = isNaN(value) ? 0 : value;
        if (field === "months") months = isNaN(value) ? 0 : value;
        if (field === "days") days = isNaN(value) ? 0 : value;

        return new Date(today.getFullYear() - years, today.getMonth() - months, today.getDate() - days);
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
        const safeValue = isNaN(value) ? 0 : value;
        setAge((prevAge) => ({ ...prevAge, [field]: safeValue }));

        const newDateOfBirth = calculateDateOfBirth(safeValue, field);
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

                const formattedPatients = data.map((client: any) => ({
                    label: client.clientName,
                    patients: client.patients
                }))
                console.log(formattedPatients);
                setPrevPatients(formattedPatients);
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


        if (editPatient) {

            try {
                setSavingData(true);
                setIsSaveDisabled(true);
                let selectedBreed = null;

                if (formData.breed !== undefined && formData.breed !== null) {
                    selectedBreed = Array.isArray(formData.breed.label) && formData.breed.label.length > 0
                        ? formData.breed.label[0]
                        : formData.breed.label;
                }


                const body = {
                    ...(formData.patientName && { patientName: formData.patientName }),
                    ...(formData.species && { species: formData.species.label }),
                    ...(selectedBreed && { breed: selectedBreed }),
                    ...(formData.dateOfBirth && { dateOfBirth: formData.dateOfBirth }),
                    ...(!(age.days === 0 && age.months === 0 && age.years === 0) && { age: formatAgeString(age) }),
                    ...(selectedGender !== 'unspecified' && { gender: selectedGender }),
                    ...(formData.inPatient !== undefined && { inPatient: formData.inPatient }),
                };




                const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/patients/${editPatient.id}?branchId=${appState.currentBranchId}`, body);


                if (response.status === 201) {
                    setEditpatient(null);
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
            } finally {
                setSavingData(false);
                setIsSaveDisabled(false);
            }

        }

        else {

            if (!formData.patientName) {
                alert("Please enter the name of the patient before saving details");
                return;
            } else if (!age) {
                alert("Please enter the age of the patient before saving details");
                return;
            }

            if (!startDate) {
                alert("Date of Birth is required");
                return;
            }

            try {
                setSavingData(true);
                setIsSaveDisabled(true);
                let selectedBreed = null;

                if (formData.breed !== undefined && formData.breed !== null) {
                    selectedBreed = Array.isArray(formData.breed.label) && formData.breed.label.length > 0
                        ? formData.breed.label[0]
                        : formData.breed.label;
                }

                //console.log(selectedBreed);


                //console.log('selected breed', selectedBreed);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/patients/create?branchId=${appState.currentBranchId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        patientName: formData.patientName,
                        clientId: clientData === undefined ? formData.clientName.value : clientData.id,
                        species: formData.species ? formData.species.label : "unknown",
                        breed: selectedBreed ? selectedBreed : "unknown",
                        dateOfBirth: formData.dateOfBirth,
                        age: formatAgeString(age),
                        gender: selectedGender,
                        inPatient: formData.inPatient,
                        clientData: clientData ? clientData : null
                    }),
                });

                if (response.ok) {
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
            } finally {
                setSavingData(false);
                setIsSaveDisabled(false);
            }
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
            //console.log(prevPatients);

            const foundClient = prevPatients.find((e: any) => e.label === updatedFormData.clientName?.label);
            const patientListIfExists = foundClient ? foundClient.patients : undefined;
            //console.log(patientListIfExists,foundClient);
            if (patientListIfExists) {
                setIsSamePatientName(patientListIfExists.some((patient: any) => patient.patientName?.toLowerCase() === updatedFormData.patientName?.toLowerCase()));
            }

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
                //console.log(speciesList);
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
                //console.log(response.data);
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

    useEffect(() => {
        if (editPatient && species.length > 0) {
            const findSpecies = species.find((specie: any) => specie.label === editPatient?.species);
            setSelectedSpecies(findSpecies);
            setFormData((prevData: any) => ({
                ...prevData,
                species: findSpecies
            }))

        }
    }, [editPatient, species])

    useEffect(()=>{
        if(editPatient && filteredBreeds.length > 0){
            console.log(filteredBreeds);
            const findBreed = filteredBreeds.find((breed: any) => breed.label[0] === editPatient?.breed);
            setFormData((prevData: any) => ({
                ...prevData,
                breed: findBreed
            }))
        }

    },[editPatient,filteredBreeds])

    
    useEffect(() => {
        if (selectedSpecies && breeds.length > 0) {
            const filtered = breeds.filter((breed) => breed.speciesId === selectedSpecies.value);
            setFilteredBreeds(filtered);
            console.log(selectedSpecies,filtered);
        } else {
            setFilteredBreeds([]); 
        }
    }, [selectedSpecies, breeds]);


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
                <div className="text-gray-500 text-xl font-medium ">{(editPatient && !isAnotherPatient) ? "Edit Patient" : "Add Patient"}</div>
                <div className="text-textGrey2 text-base font-medium ">{(editPatient && !isAnotherPatient) ? "Fill the inputs you want to edit" : "Ready to welcome a new pet? Enter their details below."}</div>
                <div className="flex items-center gap-[48px] ">
                    <div className="w-[8rem] text-gray-500 text-base font-medium ">Patient Name<span className="text-[red]">*</span></div>
                    <div>
                        <input className="w-[25rem] h-9  text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]"
                            type="text" name="patientName"
                            onChange={(e) => {
                                const value = e.target.value;
                                e.target.value = value.charAt(0).toUpperCase() + value.slice(1);
                                handleChange("patientName", e.target.value);
                            }}
                            value={formData?.patientName}
                            placeholder={editPatient?.patientName}
                        />

                        {!editPatient && errors.patientName && (
                            <div className="text-[red] error">{errors.patientName}</div>
                        )}
                        {isSamePatientName && (
                            <div className="text-[red] error">Patient Name already exists</div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-[48px]">
                    <div className="  w-[8rem] text-gray-500 text-base font-medium ">Client Name</div>
                    <div>

                        {clientData === undefined ? (
                            <Select
                                className="text-textGrey2 text-base font-medium  w-[25rem]  boxShadow-0 border border-solid border-borderGrey rounded-[5px] focus:outline-none focus:border focus:border-[#35BEB1]"
                                classNamePrefix="select"
                                isClearable={false}
                                isSearchable={true}
                                name="clientName"
                                value={clients.find((client) => client.label === clientData?.clientName)}
                                options={clients}
                                onChange={(selectedClient: any) => handleChange("clientName", selectedClient)}
                                styles={customStyles}
                            />
                        ) : (
                            <span className="text-textGrey2 text-base font-medium  w-[25rem] border-0 boxShadow-0">{clientData.clientName}</span>
                        )}

                    </div>
                </div>
                <div className="flex items-center gap-[120px]">
                    <div className="text-gray-500 text-base font-medium ">Species</div>
                    <div>
                        {/* <input className="w-[25rem] h-9 text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" 
                        type="text" name="species" onChange={(e) => handleChange("species", e.target.value)} /> */}
                        <div>
                            <Creatable

                                className="text-textGrey2 text-base font-medium w-[25rem] border border-solid border-borderGrey rounded-[5px] focus:outline-none focus:border focus:border-[#35BEB1]"
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
                                value={formData?.species}

                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-[95px] w-full">
                    <div className="text-gray-500 text-base font-medium  w-2/12">Breed</div>
                    <div className="flex w-10/12">
                        <Creatable
                            className="text-textGrey2 text-base font-medium w-[25rem] border border-solid border-borderGrey rounded-[5px] focus:outline-none focus:border focus:border-[#35BEB1]"
                            placeholder=""
                            isClearable={false}
                            isSearchable={true}
                            options={filteredBreeds}
                            isMulti={false}
                            name="breed"
                            onChange={(selectedBreed: any) => handleChange("breed", selectedBreed)}
                            styles={customStyles}
                            value={formData?.breed}
                        />
                    </div>
                </div>

                {/* Date of Birth Field with Required Indicator */}
                <div className="flex gap-[65px] items-center w-full">
                    <div className="text-gray-500 text-base font-medium w-[10rem]">
                        Date of Birth<span className="text-[red]">*</span>
                    </div>
                    <div className="w-full relative">
                        <DatePicker
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            className="w-[25rem]"
                            selected={startDate}
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

                {/* Age Input Fields without Required Indicator */}
                <div className="flex items-center gap-[140px] w-full">
                    <div className="text-gray-500 text-base font-medium">Age</div>
                    <div className="flex gap-4">

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
                            <div className="text-gray-500 text-base font-medium">Days</div>
                        </div>

                        <div className="flex justify-start items-center gap-1">
                            <div className="w-12 h-9 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 inline-flex">
                                <input
                                    className="w-full h-full text-textGrey2 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]"
                                    type="number"
                                    name="months"
                                    value={age.months === 0 ? '' : age.months}
                                    onChange={(e) => handleAgeChange('months', parseInt(e.target.value.replace(/^0+/, '')))} // Remove leading 0s
                                />
                            </div>
                            <div className="text-gray-500 text-base font-medium">Months</div>
                        </div>
                        <div className="flex justify-start items-center gap-1">
                            <div className="w-12 h-9 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 inline-flex">
                                <input
                                    className="w-full h-full text-textGrey2 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]"
                                    type="number"
                                    name="years"
                                    value={age.years === 0 ? '' : age.years} // Show empty string when 0
                                    onChange={(e) => handleAgeChange('years', parseInt(e.target.value.replace(/^0+/, '')))} // Remove leading 0s
                                />
                            </div>
                            <div className="text-gray-500 text-base font-medium">Years</div>
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
                <div className="ml-[2rem] w-[576px] h-6 px-[136px] justify-start items-center gap-4 flex">
                    <div className="grow shrink basis-0 self-stretch justify-start items-center gap-2 flex">
                        <input
                            type="checkbox"
                            className="appearance-none w-5 h-5 bg-white border border-solid border-borderGrey  checked:bg-teal-500 checked:border-teal-500 checked:after:content-['✔'] checked:after:text-white checked:after:block checked:after:text-center"
                            style={{
                                WebkitAppearance: 'none',
                                MozAppearance: 'none',
                                position: 'relative',
                            }}
                            id="inpatient-checkbox"
                        />
                        <label htmlFor="inpatient-checkbox" className="text-teal-400 text-base font-medium">
                            Mark as inpatient
                        </label>

                        <style jsx>{`
      input[type='checkbox']:checked::after {
        content: '✓';
        color: white;
        font-size: 0.8rem;
        font-weight: bold;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `}</style>
                    </div>
                </div>

                <div className=" justify-end items-start gap-6 flex w-full">
                    <div className={`h-11 px-4 py-2.5 rounded-[5px] justify-start items-center gap-2 flex  ${!editPatient && isSaveDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-500 cursor-pointer'
                        }`}
                        onClick={!editPatient && isSaveDisabled ? undefined : handleAnotherpatient}>
                        <div className="w-6 h-7"> <Image src={Paws} alt='Paws' className='w-6 h-6 ' /></div>
                        <div className="text-gray-100 text-base font-medium ">{savingData ? <Loading2 /> : "Add another Patient"}</div>
                    </div>
                    <div
                        className={`h-11 px-4 py-2.5 rounded-[5px] justify-start items-center gap-2 flex  ${!editPatient && isSaveDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-zinc-900 cursor-pointer'
                            }`}
                        onClick={!editPatient && isSaveDisabled ? undefined : handleSaveClick}
                    >
                        {!editPatient && !isSaveDisabled && (
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
