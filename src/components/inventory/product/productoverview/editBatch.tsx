"use client";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import closeicon from "../../../../assets/icons/finance/closeIcon.svg";
import Check from "../../../../assets/icons/database/check.svg"
import Select from 'react-select';
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useAppSelector } from '@/lib/hooks';
import { toast, Bounce } from 'react-toastify';

import Loading2 from "@/app/loading2";

type PopupProps = {
    setisEditing: any;
    editBatch: any,
}

interface Distributors {
    id: string,
    distributorName: string
}



const EditBatchPopup: React.FC<PopupProps> = ({ setisEditing, editBatch}) => {
    console.log(editBatch);
    const [formData, setFormData] = useState<any>({});
    const [saving, isSaving] = useState(false);
    const appState = useAppSelector((state) => state.app);
    const [distributor, setDistributor] = useState<any>([]);
    
    useEffect(() => {
        console.log("Edit Batch",editBatch);
        const fetchDistributors = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/getAll?branchId=${appState.currentBranchId}`);
                const filteredDistributors = response.data.map((distributor: Distributors) => ({
                    value: distributor.id,
                    label: distributor.distributorName
                }));
               
                setDistributor(filteredDistributors);
            } catch (err : any) {
                toast.error(err.message, {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  transition: Bounce,
                });
            }
        }
        fetchDistributors();
        if(editBatch){
            setFormData({
                batchNumber: editBatch.batchNumber,
                expiry: editBatch.expiry,
                costPrice: editBatch.costPrice,
                maxRetailPrice: editBatch.maxRetailPrice,
                distributors: [editBatch.distributors[0]],
                quantity: editBatch.quantity,
                location: editBatch.location,
            });
        }
    }, []);

    const handleSave = async() => {
        const body=formData;
        console.log('Body:', body);
        try{
            isSaving(true);
            const res=await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/edit/${editBatch.id}?branchId=${appState.currentBranchId}`,body,
            {
                headers:{
                    'Content-Type':'application/json'
                }
            });
            if(res.status===201){
                setisEditing((prev: any) => !prev);
            }

        }
        catch(err : any){
            console.error('Error:', err);
            toast.error(err.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
        }
        finally{
            isSaving(false);
        }
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
        placeholder: (provided: any) => ({
            ...provided,
            color: '#A2A3A3',
        }),
    };
    console.log(formData);

    return <>

        <div className="w-full  h-full flex justify-center items-center  fixed top-0 left-0  inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] h-fit  px-8 py-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex" onClick={(e) => e.stopPropagation()}>
                <div className="self-end items-start gap-6 flex">
                    <button className="border-0 outline-none cursor-pointer" onClick={() => setisEditing((prev: any) => !prev)}>
                        <Image src={closeicon} alt="close"></Image>
                    </button>
                </div>
                <div className="text-gray-500 text-xl font-medium ">Edit Batch</div>
                <div className="text-textGrey1 text-base font-medium ">Fill the respective Field to edit</div>
                <div className="flex items-center">
                    {distributor.length > 0 && (<>
                    <div className="text-gray-500 text-base font-medium  w-[8rem]">Distributor</div>
                    <div className="w-[448px]">
                            <Select
                                className="text-gray-500 text-base font-medium border-0 boxShadow-0"
                                placeholder="Select"
                                isClearable={false}
                                isSearchable={true}
                                options={distributor}
                                isMulti={false}
                                name={`providers`}
                                defaultValue={distributor.find((d: any) => d.label === editBatch.distributors[0])}
                                onChange={(selectedOption: any) => setFormData((prev: any) => ({
                                    ...prev,
                                    distributors: [selectedOption ? selectedOption.label : '']
                                }))}
                                styles={customStyles}
                            />
                    </div>
                    </>
                        )}
                </div>

                <div className="flex items-center gap-[20px]">
                    <div className="text-gray-500 text-base font-medium ">Batch Number</div>
                    <div>
                        <input className="w-[448px] h-9  text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="string"
                            defaultValue={editBatch.batchNumber}
                            onChange={(e) => setFormData((prev: any) => ({
                                ...prev,
                                batchNumber: (e.target.value)
                            }))}
                        />

                    </div>

                </div>
                <div className="flex items-center gap-[20px] w-full">
                    <div className="text-gray-500 text-base font-medium  w-2/12">Expiry Date</div>
                    <div className="flex w-10/12">
                        <DatePicker
                            className="w-full rounded-[5px] text-gray-500 text-md border border-solid border-borderGrey outline-none  focus:border focus:border-textGreen px-1 py-2"
                            selected={editBatch.expiry ? new Date(editBatch.expiry) : null}
                            placeholderText="MM/DD/YYYY"
                            onChange={(date: any) => {
                                setFormData((prev: any) => ({
                                    ...prev,
                                    expiry: date.toISOString()
                                }))
                            }}
                            calendarClassName="react-datepicker-custom"
                        />
                    </div>
                </div>


                <div className="flex items-center gap-[20px] w-full">
                    <div className="text-gray-500 text-base font-medium  w-2/12">Cost Per Item</div>
                    <div className="flex w-10/12">

                        <div className="flex-1 ml-1">
                            <input className="w-full px-2 h-9 text-textGrey2 text-base font-medium   focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="number"
                                defaultValue={editBatch.costPrice}
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    costPrice: Number(e.target.value)
                                }))} />

                        </div>

                    </div>
                </div>

                <div className="flex items-center gap-[20px] w-full">
                    <div className="text-gray-500 text-base font-medium  w-2/12">MRP</div>
                    <div className="flex w-10/12">

                        <div className="flex-1 ml-1">
                            <input className="w-full px-2 h-9 text-textGrey2 text-base font-medium   focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="number"
                                defaultValue={editBatch.maxRetailPrice}
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    maxRetailPrice: Number(e.target.value)
                                }))} />

                        </div>

                    </div>
                </div>

                <div className="flex items-center gap-[20px] w-full">
                    <div className="text-gray-500  text-base font-medium  w-2/12">Quantity</div>
                    <div className="flex w-10/12">

                        <div className="flex-1 ml-1">
                            <input className="w-full px-2 h-9 text-textGrey2 text-base font-medium   focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="number"
                                defaultValue={editBatch.quantity}
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    quantity: Number(e.target.value)
                                }))} />

                        </div>

                    </div>
                </div>
                
                <div className="flex items-center gap-[20px] w-full">
                    <div className="text-gray-500  text-base font-medium  w-2/12">Location</div>
                    <div className="flex w-10/12">

                        <div className="flex-1 ml-1">
                            <input className="w-full px-2 h-9 text-textGrey2 text-base font-medium   focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]"
                                defaultValue={editBatch.location}
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    location:e.target.value
                                }))} />

                        </div>

                    </div>
                </div>
                

                <div className="self-end items-start gap-6 flex">





                    <div
                        className={`h-11 px-4 py-2.5  rounded-[5px]  justify-start items-center gap-2 flex bg-zinc-900
                            }`}
                        onClick={handleSave}
                    >

                        <div className="w-6 h-6 relative">
                            <div className="w-6 h-6 left-0 top-0 absolute">
                                <Image src={Check} alt="Check" />
                            </div>
                        </div>

                        <div className="text-gray-100 text-base font-bold">{saving ? <Loading2 /> : "Save"}</div>
                    </div>
                </div>
            </div>
        </div>


    </>;

}

export default EditBatchPopup;


