"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';

import closeicon from "../../../assets/icons/inventory/closeIcon.svg";

import Select from 'react-select';

import Check from "../../../assets/icons/database/check.svg"
import { useAppSelector } from "@/lib/hooks";

import Loading2 from "@/app/loading2";
import axios from "axios";
type PopupProps = {
    onClose: () => void;
}


const DistributorPopup: React.FC<PopupProps> = ({ onClose }: any) => {
    const [formData, setFormData] = useState<any>({});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [savingData, setSavingData] = useState(false);
    const appState = useAppSelector((state) => state.app)
    const [exsistingDistributors, setExsistingDistributors] = useState<any[]>([]);
    const [showDuplicateDistributorError, setShowDuplicateDistributorError] = useState('');
    useEffect(()=>{
        const getAllDistributors=async()=>{
            const res=await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/getAll?branchId=${appState.currentBranchId}`);
            if(res.data){
                console.log(res.data);
                setExsistingDistributors(res.data);
            }
        }
        getAllDistributors();
    },[])

    const handleSaveClick = async () => {
        try {
            setIsSaveDisabled(true);
            setSavingData(true);

            //checking if same distributor exists or not by checking its distributorName contact and email
            const isDistributorExists = exsistingDistributors.some((distributor:any) =>
                distributor.distributorName.trim().toLowerCase() === formData.distributorName.trim().toLowerCase() &&
                distributor.contact.trim() === formData.contact.trim() &&
                distributor.email.trim().toLowerCase() === formData.email.trim().toLowerCase() &&
                distributor.gstinNo.trim() === formData.gstinNo.trim() &&
                distributor.panNo.trim() === formData.panNo.trim()
              );
              
           
            if(isDistributorExists){
                setShowDuplicateDistributorError('Distributor with same name, contact ,email, GSTIN and PAN already exists');
                return;
            }

            // formSchema.parse(formData);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/create?branchId=${appState.currentBranchId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    distributorName: formData.distributorName,
                    email: formData.email,
                    contact: formData.contact,
                    gstinNo: formData.gstinNo,
                    panNo: formData.panNo,
                    address: formData.address,
                    city: formData.city ? formData.city.value : undefined,
                    pinCode: formData.pinCode,
                }),
            });
            if (response.ok) {
                // console.log('Data saved successfully');
                onClose();
                setShowDuplicateDistributorError('');
                window.dispatchEvent(new FocusEvent('focus'));
            } else {
                console.error('Failed to save data:', response.statusText);
            }
        } catch (error) {
            console.error('Error while saving data:', error);
        } finally {
            setIsSaveDisabled(false);
            setSavingData(false);
        }
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

    const handleChange = (field: string, value: any) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const onlyDigitsPattern = /^\d+$/;
        setFormData((prevFormData: any) => {
            const updatedFormData = { ...prevFormData, [field]: value };


            const isFormValid =
                updatedFormData.distributorName !== '' &&
                updatedFormData.contact &&
                updatedFormData.contact.length === 10;

            setIsSaveDisabled(!isFormValid);
            if (field === 'email' && value.length > 0 && !emailPattern.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'Invalid email',
                }));
            }

            else if (field === 'contact') {
                if (value.length > 0 && !onlyDigitsPattern.test(value)) {

                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        contact: 'Invalid format',
                    }));
                } else if (value.length > 10) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        contact: 'Phone number must be of 10 digits',
                    }));
                } else if (value.length > 0 && value.length < 10) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        contact: 'Phone number must be of 10 digits',
                    }));
                } else {
                    setErrors((prevErrors) => ({ ...prevErrors, contact: '' }));
                }
            }
            // Validate GSTIN
            else if (field === 'gstinNo') {
                const gstinPattern = /^[0-9A-Z]{15}$/;
                if (value.length > 0 && !gstinPattern.test(value)) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        gstinNo: 'GSTIN should be 15 alphanumeric characters',
                    }));
                } else {
                    setErrors((prevErrors) => ({ ...prevErrors, gstinNo: '' }));
                }
            }
            // Handle PAN validation
            else if (field === 'panNo' && value.length > 0 && value.length !== 10) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    panNo: 'PAN must be 10 characters',
                }));
            }
            // Clear errors if valid
            else {
                setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
            }

            return updatedFormData;
        });

        // Optional: Handle errors for specific fields
        if (field === 'contact' && value.length > 10) {
            setErrors((prevErrors) => ({ ...prevErrors, contact: 'Phone number must be exactly 10 digits' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
        }
    };

    // const handleChange = (field: string, value: any) => {
    //     setFormData({ ...formData, [field]: value });

    //     try {
    //       formSchema.parse({ ...formData, [field]: value });
    //       setErrors({});
    //       setIsSaveDisabled(false);
    //     } catch (err) {
    //       if (err instanceof z.ZodError) {
    //         const fieldErrors: { [key: string]: string } = {};
    //         err.errors.forEach((error) => {
    //           fieldErrors[error.path[0] as string] = error.message;
    //         });
    //         setErrors(fieldErrors);
    //         setIsSaveDisabled(true);
    //       }
    //     }
    //   };


    const gstOptions = [
        {}
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

    return <>

        <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0  inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] h-[705px]  px-8 py-4 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                <div className="self-end items-start gap-6 flex">
                    <button className="border-0 outline-none cursor-pointer" onClick={onClose}>
                        <Image src={closeicon} alt="close"></Image>
                    </button>
                </div>
                <div className="text-gray-500 text-xl font-medium ">Add Distributor</div>
                <div className="text-neutral-400 text-base font-medium ">New distributor? Enter their details to get started.</div>
                <span className="text-red-500">{showDuplicateDistributorError!=='' ? showDuplicateDistributorError : ""}</span>
                <div className="flex items-center gap-[88px]">
                    <div className="text-gray-500 text-base font-medium">
                        Name<span className="text-red-500">*</span>
                    </div>
                    <div>
                        <input
                            className="w-[447px] h-9 text-neutral-400 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]"
                            type="text"
                            name="distributorName"
                            onChange={(e) => {
                                const value = e.target.value;
                                e.target.value = value.charAt(0).toUpperCase() + value.slice(1);
                                handleChange("distributorName", e.target.value);
                            }}
                        />
                        {errors.distributorName && (
                            <div className="text-red-500 text-sm">{errors.distributorName}</div>
                        )}
                    </div>
                </div>


                <div className="flex items-center gap-[96px]">
                    <div className="text-gray-500 text-base font-medium ">Email</div>
                    <div>
                        <input className="w-[447px] h-9 text-neutral-400 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="email" onChange={(e) => handleChange("email", e.target.value)} />

                        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                    </div>
                </div>
                <div className="flex items-center gap-[40px]">
                    <div className="text-gray-500 text-base font-medium w-[6rem]">Phone No.<span className="text-red-500">*</span></div>
                    <div>
                        <input className="w-[447px] h-9 text-neutral-400 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="contact" onChange={(e) => handleChange("contact", e.target.value)} />
                        {errors.contact && <div className="text-red-500 text-sm">{errors.contact}</div>}
                    </div>
                </div>
                <div className="flex items-center gap-[40px]">
                    <div className="text-gray-500 text-base font-medium w-[6rem]">GSTIN</div>
                    <div>
                        <input
                            className="w-[447px] h-9 text-neutral-400 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]"
                            type="text"
                            name="gstinNo"
                            style={{ textTransform: 'uppercase' }}
                            onChange={(e) => {
                                const value = e.target.value.toUpperCase();
                                handleChange("gstinNo", value);
                            }}
                        />
                        {errors.gstinNo && (
                            <div className="text-red-500 text-sm mt-1">{errors.gstinNo}</div>
                        )}
                    </div>
                </div>


                <div className="flex items-center gap-1">
                    <div className="text-gray-500 text-base font-medium w-[8.2rem]">PAN Number</div>
                    <div>
                        <input
                            className="w-[447px] h-9 text-neutral-400 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]"
                            type="text"
                            name="panNo"
                            style={{ textTransform: 'uppercase' }}
                            onChange={(e) => {
                                const value = e.target.value.toUpperCase();
                                handleChange("panNo", value);
                            }}
                        />
                        {errors.panNo && (
                            <div className="text-red-500 text-sm mt-1">{errors.panNo}</div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-[45px] w-[581px]">
                    <div className="text-gray-500 text-base font-medium  w-2/12">Address</div>
                    <div className="flex w-10/12">

                        <div className="flex-1">
                            <input className="w-[447px] h-9 text-neutral-400 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="address" onChange={(e) => handleChange("address", e.target.value)} />
                        </div>
                        {/* <div className=" ml-1  w-9 h-9 ">
                    <button  className="w-full h-full rounded-[5px] justify-center text-2xl items-center gap-2 flex border-borderGrey border border-solid bg-white outline-none">
                        <div className="text-neutral-400 text-lg">+</div>
                    </button>
                    </div> */}
                    </div>
                </div>
                <div className="flex gap-[14px] justify-between  w-[584px]">


                    <div className="flex items-center gap-[104px] w-[22rem]">
                        <div className="text-gray-500 text-base font-medium  w-2/12 ">City</div>
                        <div className="flex w-10/12">

                            <Select
                                className="text-neutral-400 w-[10rem] text-base font-medium focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]"
                                placeholder=""
                                isClearable={false}
                                isSearchable={true}
                                options={City}
                                isMulti={false}
                                name="city"
                                onChange={(value) => handleChange("city", value)}
                                styles={customStyles}
                            />




                        </div>
                    </div>
                    <div className="flex items-center w-[22rem] justify-end">
                        <div className="text-gray-500 text-base font-medium w-[5rem]">Pin Code</div>
                        <div className="flex h-9">
                            <input
                                className="w-[7.5rem] ml-[25px] h-9 text-neutral-400 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]"
                                type="text"
                                name="pinCode"
                                maxLength={6} // Prevents more than 6 characters
                                onChange={(e) => {
                                    const pinCode = e.target.value;
                                    // Check if the pinCode is exactly 6 digits
                                    if (/^\d{6}$/.test(pinCode)) {
                                        handleChange("pinCode", pinCode);
                                    } else if (pinCode.length === 6) {
                                        alert("Please enter a valid 6-digit pin code"); // Alert for non-digit inputs
                                    }
                                }}
                            />
                        </div>
                    </div>

                </div>

                <div className=" justify-end gap-6 flex w-full">
                    {/* <div className=" h-11 px-6 py-2.5 rounded-[5px]  justify-center items-center inline-flex border border-borderGrey border-dashed ">
                        <div className="self-stretch justify-start items-center gap-2 inline-flex">
                            <div className="w-6 h-6 flex justify-center items-center"> <Image src={Attachment} alt='Attachment' className='w-6 h-6 ' /></div>
                            <div className="justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold ">Upload Catalouge</div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="h-11 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer"  onClick={handleSaveClick} >
                        <div className="w-6 h-6 relative">
                            <div className="w-6 h-6 left-0 top-0 absolute" >
                                <Image src={Check} alt="Check" />
                            </div>
                        </div>
                        <div onClick={handleSaveClick} className="text-gray-100 text-base font-bold ">Save</div>
                    </div> */}

                    <div
                        className={`h-11 px-4 py-2.5 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer ${isSaveDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-zinc-900'
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
        </div>


    </>;
}

export default DistributorPopup;


