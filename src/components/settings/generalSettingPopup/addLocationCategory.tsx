import React, { useEffect, useState } from 'react';
import closeicon from "../../../assets/icons/inventory/closeIcon.svg";
import Image from "next/image";
import { useAppSelector } from '@/lib/hooks';

const AddLocation = ({ onClose }: any) => {
    const [input, setInput] = useState<string>('');
    const appState = useAppSelector((state) => state.app);
    const [existingCategory, setExistingCategory] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchExistingItems = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/LocationCategory/getAll?branchId=${appState.currentBranchId}`);
                const data = await response.json();
                const names = data.map((item: { name: string }) => item.name); 
               
               

                console.log('Existing locations fetched:', names); 
            } catch (error) {
                console.error('Error fetching existing items:', error);
            }
        };

        fetchExistingItems();
    }, [appState.currentBranchId]);

    const handleChangeInput = (value: string) => {
        setInput(value);
        setError(''); // Clear error when user types
        console.log(`Input changed: ${value}`);
    };

    const handleSave = async () => {
        const trimmedInput = input.trim();

        // Validate the input
        const defaultLocationCategories = 'Main Warehouse';
        const allExistingCategories = defaultLocationCategories;

        if (!trimmedInput) {
            setError('Location name cannot be empty.');
            return;
        }

        if (allExistingCategories.includes(trimmedInput)) {
            setError('This Location Category already exists.');
            console.log(`Duplicate Location Category detected: ${trimmedInput}`);
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/LocationCategory/create?branchId=${appState.currentBranchId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: trimmedInput,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Location saved:', result);
                window.location.reload();
                onClose(); // Close the modal on success
            } else {
                console.error('Failed to save location:', response.statusText);
            }
        } catch (error) {
            console.error('Error while saving location:', error);
        }
    };

    return (
        <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] max-h-[450px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex overflow-y-auto">
                <div className="self-end items-start gap-6 flex cursor-pointer" onClick={onClose}>
                    <Image src={closeicon} alt="close"></Image>
                </div>
                <div className="flex-col justify-start items-start gap-2 flex w-full">
                    <div className="text-gray-500 text-xl font-medium">Add Location</div>
                    <div className='w-full flex justify-between '>
                        <div className="text-neutral-400 text-base font-medium">Add and configure your Location category</div>
                    </div>
                </div>
                <div className="w-full flex items-center gap-[6rem] ">
                    <div className='w-full flex flex-col gap-3'>
                        <div className="w-full ">
                            <div className='flex items-center'>
                                <div className="text-gray-500 text-base font-medium w-[12rem]">Location Category</div>
                                <input
                                    className="ml-[5rem] w-[80%] border border-solid border-borderGrey outline-none h-11 rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    type="text"
                                    value={input}
                                    onChange={(e) => handleChangeInput(e.target.value)}
                                />
                            </div>
                            {error && (
                                <div className="text-red-500 text-sm mt-1 ml-[17rem]">
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end mt-[5px] cursor-pointer">
                    <button className="px-5 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex outline-none border-none cursor-pointer" onClick={handleSave}>
                        <div className="text-white text-base font-bold">Save</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddLocation;
