import React, { useEffect, useState } from 'react';
import closeicon from "../../../assets/icons/inventory/closeIcon.svg";
import Image from "next/image";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import addicon from "../../../assets/icons/settings/addicon.svg";
import delicon from "../../../assets/icons/settings/deleteicon.svg";
import checkicon from "../../../assets/icons/finance/check.svg"
import { z } from 'zod';
import { ZodError } from 'zod';
import { setValidationErrorsForForm } from '@/utils/setValidationErrorForForm';
import axios from 'axios';
import { useAppSelector } from '@/lib/hooks';
import Loading2 from "@/app/loading2"

const AddPaymentPopup = ({ onClose }: any) => {
    const appState = useAppSelector((state) => state.app);

    const [formData, setFormData] = useState<any>("");
    const [existingPaymentMethods, setExistingPaymentMethods] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null); 
    const [isSaving, setSaving] = useState(false);
    useEffect(() => {
        const fetchExistingPaymentMethods = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/paymentMethod/getAll?branchId=${appState.currentBranchId}`);
                const data = await response.json();
                const paymentMethodNames = data.map((item: { name: string }) => item.name.toLowerCase()); 
                setExistingPaymentMethods(paymentMethodNames);
                console.log('Existing Payment Methods fetched:', paymentMethodNames); 
            } catch (error) {
                console.error('Error fetching existing payment methods:', error);
            }
        };
        
        fetchExistingPaymentMethods();
    }, [appState.currentBranchId]);

const handleChange = (field: string, value: any) => {
    setFormData((prevFormData: any) => ({
        ...prevFormData,
        [field]: value,
    }));
    }

    const handleSave = async () => {
        const trimmedInput = formData.paymentMethod?.trim(); // Access and trim the 'paymentMethod'
        if (!trimmedInput) {
            setError('Payment Method cannot be empty.');
            console.log("Empty Field");
            return;
        }
        else if (existingPaymentMethods.includes(trimmedInput.toLowerCase())) {
            setError(`${trimmedInput} already exists.`);
            console.log(`Duplicate Payment Method detected: ${trimmedInput}`);
            return;
        } else {
            setError(null);
        }
        try {
            setSaving(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/paymentMethod/create?branchId=${appState.currentBranchId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: trimmedInput, // Use trimmed input
                    }),
                }
            );
    
            if (response.ok) {
                console.log('Payment method saved successfully');
                onClose();
                window.dispatchEvent(new FocusEvent('focus'));
            } else {
                console.error('Failed to save payment method:', response.statusText);
            }
        } catch (error) {
            console.error('Error while saving payment method:', error);
        }
        finally{
            setSaving(false)
         }
    };
    

    return (
        <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] max-h-[450px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex overflow-y-auto">
                <div className="self-end items-start gap-6 flex cursor-pointer" onClick={onClose}>
                    <Image src={closeicon} alt="close"></Image>
                </div>
                <div className="flex-col justify-start items-start gap-2 flex w-full">
                    <div className="text-gray-500 text-xl font-medium">Add Payment Method</div>
                    <div className='w-full flex justify-between '>
                        <div className="text-neutral-400 text-base font-medium">Add and configure your payment methods</div>
                    </div>
                </div>
                <div className="w-full flex items-center gap-[6rem] ">
                    <div className='w-full flex flex-col  gap-3'>

                            <div  className="w-full ">
                            <div className="flex  items-center">
                                <div className="text-gray-500 text-base font-medium w-[12rem]">Payment Method</div>
                                <input
                                    className="ml-[5rem] w-[80%] border border-solid border-borderGrey outline-none h-11 rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    type="text"
                                    name="paymentMethod"
                                    onChange={(e) => handleChange("paymentMethod", e.target.value)}
                                />
                            </div>
                               {error && (
                                    <div className="ml-[17rem] text-red-500 text-sm mt-1">
                                        {error}
                                    </div>
                                )}
                            </div>
                    </div>
                </div>
                <div className="w-full flex justify-between mt-[5px] ">
                    <button className="px-5 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex outline-none border-none cursor-pointer" onClick={handleSave} disabled={isSaving}>
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

export default AddPaymentPopup;