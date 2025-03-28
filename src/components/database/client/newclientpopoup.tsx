"use client";
import Image from "next/image";
import React, {  useEffect, useState } from 'react';

import closeicon from "../../../assets/icons/inventory/closeIcon.svg";

import Paws from "../../../assets/icons/database/1. Icons-24 (12).svg"
import Check from "../../../assets/icons/database/check.svg"

import Select from 'react-select';
import PatientPopup from '../patient/newpatientpopup'

import { useAppSelector } from '@/lib/hooks';

import Loading2 from "@/app/loading2";
type PopupProps = {
    onClose: () => void;
    setIsNewClientClicked?:any;
    setNewClient?:any;
}





const ClientPopup: React.FC<PopupProps> = ({ onClose,setIsNewClientClicked,setNewClient }: any) => {
    //console.log(setIsNewClientClicked);
    const [formData, setFormData] = useState<any>({});
    const [showPopup, setShowPopup] = useState(false);
    const [closepop,setClosePop]=useState(false);
    const appState = useAppSelector((state) => state.app)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [savingData, setSavingData] = useState(false);
    const [isClientSaved, setClientStatus] = useState<any>(false);
    const [clientData,setNewClientData]=useState<any>({})
    const [prevClient, setPrevClient] = useState<any>({})
    let addAnotherPatient = false;
    const togglePopup = () => {
        setShowPopup(!showPopup);
        console.log("Clicked on togglepopup",showPopup);
    }

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

    
    useEffect(() => {
        const fetchdata=async()=>{
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/getAll?branchId=${appState.currentBranchId}`)
            .then((response) => response.json())
            .then((data) => {

                const formattedClients = data.map((client: any) => ({
                    value: client.id,
                    email: client.email,
                    contact: client.contact,
                    label: client.clientName
                }))
                setPrevClient(formattedClients)
            })
            .catch((error) =>
                console.error("Error fetching client from API: ", error)
            );
            console.log("Client data",prevClient);
        }
        fetchdata();
        // if (clientData) {
        //     setFormData((prevData: { clientName: any; }) => ({
        //         clientName: selectedClient,
        //         patientName: '',
        //         species: null,
        //         breed: null,
        //         dateOfBirth: null,
        //     }));
        // }
    }, []);
    const handleSaveClick = async () => {
        
        if (Object.values(errors).some(error => error !== '')) {
            console.error('Form contains errors:', errors);
            return;
        }
        try {
            setIsSaveDisabled(true);
            setSavingData(true);
            //check for errors

            //   clientSchema.parse(formData);
            console.log("Form data is valid:", formData);
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
                const clientData = await response.json();
                //console.log(clientData);
                if(clientData){
                    setNewClientData(clientData);
                    if (setIsNewClientClicked) {
                        setIsNewClientClicked((prev: any) => !prev);
                    }
                    if (setNewClient) {
                        setNewClient(clientData);
                    }
                }

                console.log('Data saved successfully');
                if (!addAnotherPatient) {
                    // onClose();
                    addAnotherPatient = false;
                }
                else {
                    console.log("Here")
                    // togglePopup();
                    addAnotherPatient = false;
                }
                console.log("Here it is closing", showPopup);
                setClosePop(true);
                
            } else {
                console.error('Failed to save data', response.statusText);
            }
            setClientStatus(true);
        }
        catch (error) {
            console.error('Error while saving data:', error);
        }
        finally {
            
            setSavingData(false);
        }
    };
    useEffect(() => {
        if (closepop && !showPopup) {
            onClose();
            window.dispatchEvent(new FocusEvent('focus'));
        }
    }, [closepop])
    const handleChange = async (field: string, value: any) => {
        setFormData((prevFormData: any) => {
            const updatedFormData = { ...prevFormData, [field]: value };

            
            const isFormValid =
                updatedFormData.clientName !== '' &&
                updatedFormData.contact &&
                updatedFormData.contact.length === 10 &&
                /^[0-9]+$/.test(updatedFormData.contact);

            setIsSaveDisabled(!isFormValid);

            return updatedFormData;
        });
        
        
        if (field === 'contact') {
            const client =await prevClient.find((client: any) => client.contact === value);
            if (value.length > 10 || value.length < 10) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    contact: 'Invalid phone number',
                }));
            } else if (!/^[0-9]+$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    contact: 'Phone number must contain only digits',
                }));
            }else if (prevClient && prevClient.length > 0 && client) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    contact: 'Contact number already exists',
                }));
            }else if (value.length === 10) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    contact: '',
                }));
            }
        } else if (field === 'email') {
            const client =await prevClient?.find((client: any) => client.email === value);
            console.log("Regex",!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(value));
            if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'This is an invalid email',
                }));
            }
            else if (prevClient && prevClient.length > 0&&client) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'Email already exists',
                }));
            }else{
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: '',
                }));
            }
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
        }
    };

   

    const countryCode = [
        { value: 'IN', label: '+91' },
        { value: 'US', label: '+1' },
    ];

    const City = [
        { value: 'Bangalore', label: 'Bangalore' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Noida', label: 'Noida' },
        { value: 'Gurgaon', label: 'Gurgaon' },
        { value: 'Faridabad', label: 'Faridabad' },
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Chennai', label: 'Chennai' },

    ]

    const handleNewPatientPopUp = async () => {
        if (Object.values(errors).some(error => error !== '')) {
            console.error('Form contains errors:', errors);
            return;
        }
        addAnotherPatient = true
        if (!isClientSaved) await handleSaveClick();
        // else {
            console.log("Client saved");
            // onClose();
            togglePopup();
        // }
    }



    return <>

        <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0  inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50" onClick={onClose}>
            <div className="w-[640px] h-[575px]  px-8 py-4 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex" onClick={(e) => e.stopPropagation()}>
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
                        <input className="w-[447px] h-9 text-textGrey2 text-base  font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="clientName"
                            onChange={(e) => {
                                const value = e.target.value;
                                e.target.value = value.charAt(0).toUpperCase() + value.slice(1);
                                handleChange("clientName", e.target.value);
                            }} required />
                        {errors.clientName && (
                            <div className="text-[red] error">{errors.clientName}</div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-[88px]">
                    <div className="text-gray-500 text-base font-medium ">Email</div>
                    <div>
                        <input className="w-[448px] h-9 text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="email" onChange={(e) => handleChange("email", e.target.value)} />
                        {errors.email && (
                            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                        )}
                    </div>

                </div>
                <div className="flex items-center gap-[33px] w-full">
                    <div className="text-gray-500 text-base font-medium  w-2/12">Phone No.<span className="text-[red]">*</span></div>
                    <div className="flex w-10/12">
                        <div className="flex-1 ml-1">
                            <input className="h-9 w-full text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="contact" onChange={(e) => handleChange("contact", e.target.value)} required />
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
                            <input className="w-full h-9 text-textGrey2 text-base font-medium   focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1] px-2" placeholder="Enter address or Google Maps link" type="text" name="address" onChange={(e) => handleChange("address", e.target.value)} />

                        </div>
                      
                    </div>
                </div>
                <div className="flex  w-full gap-[65px] justify-between">


                    <div className="flex items-center gap-[99px] ">
                        <div className="text-gray-500 text-base font-medium  w-2/12">City</div>
                        <div className="flex w-10/12 border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]">
                            <Select
                                className="text-textGrey2 w-[10rem] text-base font-medium "
                                placeholder=""
                                isClearable={true}
                                isSearchable={true}
                                options={City}
                                isMulti={false}
                                name="city"
                                onChange={(value) => handleChange("city", value?.label)}
                                styles={customStyles}
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
                    <div
                        className={`h-11 px-4 py-2.5 rounded-[5px] flex items-center gap-2 
              ${isSaveDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-400 cursor-pointer'}`}
                        onClick={!isSaveDisabled && !isClientSaved ? handleNewPatientPopUp : undefined}
                    >
                        <div className="w-6 h-7">
                            <Image src={Paws} alt="Paws" className="w-6 h-6" />
                        </div>
                        <div className="text-gray-100 text-base font-medium">
                            Add Patient
                        </div>
                    </div>

                    
                    <div
                        className={`h-11 px-4 py-2.5 rounded-[5px]  justify-start items-center gap-2 flex  ${isSaveDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-zinc-900 cursor-pointer'
                            }`}
                        onClick={isSaveDisabled || isClientSaved ? undefined : handleSaveClick}
                    >
                        {!isSaveDisabled && (
                            <div className="w-6 h-6 relative">
                                <div className="w-6 h-6 left-0 top-0 absolute">
                                    <Image src={Check} alt="Check" />
                                </div>
                            </div>
                        )}
                        <div className="text-gray-100 text-base font-bold">{savingData ? <Loading2 /> : "Save"}</div>
                    </div>
                </div>
            </div>
        </div>

        {showPopup && <PatientPopup onClose={onClose} clientData={clientData} />}
    </>;

}

export default ClientPopup;


