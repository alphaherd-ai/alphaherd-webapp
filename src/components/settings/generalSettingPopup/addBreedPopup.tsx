import React, { useState } from 'react';
import closeicon from "../../../assets/icons/inventory/closeIcon.svg";
import Image from "next/image";
import { useAppSelector } from '@/lib/hooks';
import delicon from "../../../assets/icons/settings/deleteicon.svg"

const AddBreed = ({ onClose }: any) => {
    const appState = useAppSelector((state) => state.app);

    const [formData, setFormData] = useState<any>("");


    const handleChange = (field: string, value: any) => {
    setFormData((prevFormData: any) => ({
        ...prevFormData,
        [field]: value,
    }));
    }
    
    const handleDeleteInput = (index: number) => {
        const newInputs = [...formData];
        newInputs.splice(index, 1);
        setFormData(newInputs);
    };
    console.log("form data is :" , formData);

    const handleSave = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/breed/create?branchId=${appState.currentBranchId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name:formData.breeds,
                }),
            });
            if (response.ok) {
                console.log('Data saved successfully',response);
                onClose();
                window.dispatchEvent(new FocusEvent('focus'));
            } else {
                console.error('Failed to save data:', response.statusText);
            }
        } catch (error) {
            console.error('Error while saving data:', error);
        }
    }

    return (
        <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] max-h-[450px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex overflow-y-auto">
                <div className="self-end items-start gap-6 flex cursor-pointer" onClick={onClose}>
                    <Image src={closeicon} alt="close"></Image>
                </div>
                <div className="flex-col justify-start items-start gap-2 flex w-full">
                    <div className="text-gray-500 text-xl font-medium">Add Breeds</div>
                    <div className='w-full flex justify-between '>
                        <div className="text-neutral-400 text-base font-medium">Add and configure your breeds</div>
                    </div>
                </div>
                <div className="w-full flex items-center gap-[6rem] ">
                    <div className='w-full flex flex-col  gap-3'>

                            <div  className="w-full flex  items-center">
                                <div className="text-gray-500 text-base font-medium w-[12rem]">Species</div>
                                <input
                                    className="ml-[5rem] w-[80%] border border-solid border-borderGrey outline-none h-11 rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    type="text"
                                    name="species"
                                    onChange={(e) => handleChange("species", e.target.value)}
                                />
                               
                            </div>
                    </div>
                </div>
                <div className="w-full flex items-center gap-[6rem] ">
                    <div className='w-full flex flex-col  gap-3'>

                            <div  className="w-full flex  items-center">
                                <div className="text-gray-500 text-base font-medium w-[12rem]">Breeds</div>
                                <input
                                    className="ml-[5rem] w-[80%] border border-solid border-borderGrey outline-none h-11 rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    type="text"
                                    name="breeds"
                                    onChange={(e) => handleChange("breeds", e.target.value)}
                                />
                                {/* <div className="ml-2 h-11 px-[0.6rem] rounded-[5px] justify-start items-center flex bg-black cursor-pointer" onClick={() => handleDeleteInput(index)}>
                                    <Image src={delicon} alt="delete"></Image>
                                </div> */}
                               
                            </div>
                    </div>
                </div>
                <div className="w-full flex justify-between mt-[5px] cursor-pointer">
                    <button className="px-5 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex outline-none border-none cursor-pointer" onClick={handleSave}>
                        <div className="text-white text-base font-bold ">Save</div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddBreed;