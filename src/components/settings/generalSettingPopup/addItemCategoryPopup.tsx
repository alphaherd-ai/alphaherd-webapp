import React, { useState,useEffect } from 'react'
import closeicon from "../../../assets/icons/inventory/closeIcon.svg";
import Image from "next/image";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import addicon from "../../../assets/icons/settings/addicon.svg"
import delicon from "../../../assets/icons/settings/deleteicon.svg"
import { z } from 'zod';
import { ZodError } from 'zod'; 
import { setValidationErrorsForForm } from '@/utils/setValidationErrorForForm';
import { useAppSelector } from '@/lib/hooks';
import checkicon from "../../../assets/icons/finance/check.svg"
import Loading2 from "@/app/loading2"


const AddItemCategoryPopup = ({onClose}:any) => {
    const [inputs, setInputs] = useState<string[]>(['']);
    const appState = useAppSelector((state) => state.app);
    const [existingItems, setExistingItems] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    
    const [isSaving, setSaving] = useState(false);
    // Fetch existing item categories and add defaults if missing
    

    useEffect(() => {
        const fetchExistingItems = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/itemCategory/getAll?branchId=${appState.currentBranchId}`);
                const data = await response.json();
                console.log(data);
                const names = data.flatMap((item: { name: any[] }) => item.name.map(n => n.toLowerCase()));
                setExistingItems(names);
                
                console.log('Existing items fetched:', names);
            } catch (error) {
                console.error('Error fetching existing items:', error);
            }
        };

        fetchExistingItems();
    }, [appState.currentBranchId]);

    

    const handleAddInput = () => {
        setInputs([...inputs, '']);
    };

    const handleDeleteInput = (index: number) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
    };

    const handleChangeInput = (index: number, value: string) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
        const newErrors = [...errors];
        newErrors[index] = '';
        setErrors(newErrors);
        console.log(`Input changed at index ${index}: ${value}`);
    };

    const handleSaveClick = async () => {
        const newErrors = [...errors];
        let hasError = false;

        
        //console.log('All existing items (including defaults):', allExistingItems);

        inputs.forEach((input, index) => {
            
            const trimmedInput = input.trim();
            //console.log(trimmedInput.toLowerCase(),existingItems.includes(trimmedInput.toLowerCase()))
           
        if (!trimmedInput) {
            newErrors[index] = 'Item Category cannot be empty.'
            hasError = true;
            
        }
            
          else if (existingItems.includes(trimmedInput.toLowerCase())) {
                newErrors[index] = 'This item already exists';
                hasError = true;
                console.log(`Duplicate item detected: ${trimmedInput}`);
            } else {
                newErrors[index] = ''; 
            }
        });

        setErrors(newErrors);

        if (hasError) {
            console.log('Error found, not saving.');
            return;
        }
        try {
            setSaving(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/itemCategory/create?branchId=${appState.currentBranchId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name:inputs,
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
        finally{
            setSaving(false)
         }
        console.log(inputs);
    }
    return (
        <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] max-h-[450px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex overflow-y-auto">
                <div className="self-end items-start gap-6 flex cursor-pointer" onClick={onClose}>
                    <Image src={closeicon} alt="close"></Image>
                </div>
                <div className="flex-col justify-start items-start gap-2 flex w-full">
                    <div className="text-gray-500 text-xl font-medium">Add Item Category</div>
                    <div className='w-full flex justify-between '>
                        <div className="text-neutral-400 text-base font-medium">Add and configure item category</div>
                    </div>
                </div>
                <div className="w-full flex items-center gap-[6rem] ">
                    <div className='w-full flex flex-col gap-3'>
                    {inputs.map((input, index) => (
                        <div key={index} className="w-full">
                            <div className="flex items-center">
                                <div className="text-gray-500 text-base font-medium w-[12rem]">Item Category</div>
                                <input
                                    className="ml-[5rem] w-[80%] border border-solid border-borderGrey outline-none h-11 rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    type="text"
                                    value={input}
                                    onChange={(e) => handleChangeInput(index, e.target.value)}
                                />
                                <div className="ml-2 h-11 px-[0.6rem] rounded-[5px] justify-start items-center flex bg-black cursor-pointer" onClick={() => handleDeleteInput(index)}>
                                    <Image src={delicon} alt="delete" />
                                </div>
                            </div>
                            {errors[index] && (
                                <div className="text-red-500 text-sm mt-1 ml-[17rem]">
                                    {errors[index]}
                                </div>
                            )}
                        </div>
                    ))}
                    </div>
                </div>

                <div className="w-full flex justify-between mt-[5px]">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer" onClick={handleAddInput}>
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-bold ">Add Another</div>
                                </div>

                        <button className="px-5 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex outline-none border-none cursor-pointer" onClick={handleSaveClick} disabled={isSaving}>
                        <Image src={checkicon} alt="check"></Image>
                    <div className="text-white text-base font-bold "> 
                        <div>{isSaving ? <Loading2 /> : "Save"}</div>
                    </div>
                        </button>
                </div>
            </div>
        </div>
    );
}


export default AddItemCategoryPopup