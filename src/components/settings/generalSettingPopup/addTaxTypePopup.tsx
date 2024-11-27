import React, { useEffect, useState } from 'react'
import closeicon from "../../../assets/icons/inventory/closeIcon.svg";
import Image from "next/image";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import addicon from "../../../assets/icons/settings/addicon.svg"
import delicon from "../../../assets/icons/settings/deleteicon.svg"
import { z } from 'zod';
import { ZodError } from 'zod'; 
import { setValidationErrorsForForm } from '@/utils/setValidationErrorForForm';
import { useAppSelector } from '@/lib/hooks';



const AddTaxType = ({onClose}:any) => {
    const [inputs, setInputs] = useState<string[]>(['']);
    const appState = useAppSelector((state) => state.app)
    const [existingTaxTypes, setExistingTaxTypes] = useState<number[]>([]); 
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        const fetchExistingTaxTypes = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/taxType/getAll?branchId=${appState.currentBranchId}`);
                const data = await response.json();
                const taxTypeValues = data.map((taxType: { name: number[] }) => taxType.name[0]); // Extract the first value of the 'name' array
                setExistingTaxTypes(taxTypeValues);
    
                console.log('Existing tax types fetched:', taxTypeValues); 
            } catch (error) {
                console.error('Error fetching existing tax types:', error);
            }
        };
        fetchExistingTaxTypes();
    }, [appState.currentBranchId]); 
    
    const handleAddInput = () => {
        setInputs([...inputs, '']);
    };

    const handleDeleteInput = (index: number) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
    };

    const handleChangeInput = (index: number, value: any) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
        const newErrors = [...errors];
        newErrors[index] = '';
        setErrors(newErrors);
        console.log(`Input changed at index ${index}: ${value}`);
    };

    const handleSave = async () => {
        const newErrors = [...errors];
    let hasError = false;
    inputs.forEach((input, index) => {
        const inputValue = parseInt(input.trim(), 10); 
        if (existingTaxTypes.includes(inputValue)) {
            newErrors[index] = 'This Tax Type already exists'; 
            hasError = true;
            console.log(`Duplicate Tax Type detected: ${input}`);
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
            const intInputs = inputs.map((input) => parseInt(input.trim(), 10));
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/taxType/create?branchId=${appState.currentBranchId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name:intInputs,
                }),
            });
            if (response.ok) {
                console.log('Tax Data saved successfully');
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
                    <div className="text-gray-500 text-xl font-medium">Add Tax Type</div>
                    <div className='w-full flex justify-between '>
                        <div className="text-neutral-400 text-base font-medium">Add and configure your Tax Types</div>
                    </div>
                </div>
                <div className="w-full flex items-center gap-[6rem] ">
                    
                    <div className='w-full flex flex-col  gap-3'>
                        {inputs.map((input, index) => (
                             <div key={index} className="w-full">
                             <div className="flex items-center">
                                <div className="text-gray-500 text-base font-medium w-[12rem]">Tax Type</div>
                                <input
                                    className="ml-[5rem] w-[80%] border border-solid border-borderGrey outline-none h-11 rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    type="number"
                                    value={input}
                                    onChange={(e) => handleChangeInput(index, e.target.value)}
                                />
                                {/* <div className="ml-2 h-11 px-[0.6rem] rounded-[5px] justify-start items-center flex bg-black cursor-pointer" onClick={handleAddInput}>
                                    <Image src={addicon} alt="add"></Image>
                                </div> */}
                                <div className="ml-2 h-11 px-[0.6rem] rounded-[5px] justify-start items-center flex bg-black cursor-pointer" onClick={() => handleDeleteInput(index)}>
                                    <Image src={delicon} alt="delete"></Image>
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
                <div className="w-full flex justify-between mt-[5px] cursor-pointer">
                <div className="text-white text-base font-normal bg-black p-2 rounded-md py-2.5" onClick={handleAddInput}>Add another</div>

                    <button className="px-5 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex outline-none border-none cursor-pointer" onClick={handleSave}>
                        <div className="text-white text-base font-bold ">Save</div>
                    </button>
                </div>
            </div>
        </div>
    );
}


export default AddTaxType