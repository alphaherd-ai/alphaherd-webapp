import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useAppSelector } from '@/lib/hooks';
import Loading2 from "@/app/loading2";
import closeicon from "../../../../assets/icons/inventory/closeIcon.svg";
import Check from "../../../../assets/icons/database/check.svg";

type PopupProps = {
    onClose: () => void;
    clientData?: ClientData;
};

type ClientData = {
    clientName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    pinCode?: string;
    [key: string]: any; // Add dynamic fields if necessary
};

const EditClientPopup: React.FC<PopupProps> = ({ onClose, clientData }) => {
    const [formData, setFormData] = useState<ClientData>(clientData || {});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [savingData, setSavingData] = useState(false);

    useEffect(() => {
        if (clientData) {
            setFormData(clientData);
            setIsSaveDisabled(Object.values(clientData).every((value) => !value));
        }
    }, [clientData]);

    const validateField = (field: string, value: any) => {
        let errorMessage = '';
        if (field === 'phone' && (value.length !== 10 || !/^[0-9]+$/.test(value))) {
            errorMessage = 'Invalid phone number';
        }
        setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    };

    const handleChange = (field: string, value: any) => {
        const updatedFormData = { ...formData, [field]: value };
        setFormData(updatedFormData);

        validateField(field, value);

        // Update the save button state
        setIsSaveDisabled(Object.values(updatedFormData).every((v) => !v));
    };

    const handleSaveClick = async () => {
        setSavingData(true);
        try {
            const response = await fetch(`/api/database/clients/${clientData?.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedClient = await response.json();
                console.log('Client data updated successfully:', updatedClient);
                onClose(); // Close the popup after a successful update
            } else {
                console.error('Failed to update client data', response.statusText);
            }
        } catch (error) {
            console.error('Error while updating client data:', error);
        } finally {
            setSavingData(false);
        }
    };

    return (
        <div
            className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50"
            onClick={onClose}
        >
            <div
                className="w-[640px] h-[750px] px-8 py-4 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="self-end items-start gap-6 flex">
                    <button className="border-0 outline-none cursor-pointer" onClick={onClose}>
                        <Image src={closeicon} alt="close" />
                    </button>
                </div>
                <div className="text-gray-500 text-xl font-medium">Edit Client</div>
                <div className="text-textGrey1 text-base font-medium">Update the client details below.</div>

                {/* Inputs */}
                {[
                    { label: "Client Name", field: "clientName" },
                    { label: "Email", field: "email", type: "email" },
                    { label: "Phone No.", field: "phone" },
                    { label: "Address", field: "address" },
                    { label: "City", field: "city" },
                    { label: "Pin Code", field: "pinCode" },
                ].map(({ label, field, type = "text" }) => (
                    <div className="flex items-center gap-4" key={field}>
                        <label className="text-gray-500 text-base font-medium w-[8rem]">{label}</label>
                        <input
                            className="w-[448px] h-9 text-textGrey2 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border-[#35BEB1]"
                            type={type}
                            value={formData[field] || ''}
                            onChange={(e) => handleChange(field, e.target.value)}
                        />
                        {errors[field] && <div className="text-red-500 text-sm">{errors[field]}</div>}
                    </div>
                ))}

                {/* Save Button */}
                <div className="self-end items-start gap-6 flex">
                    <div
                        className={`h-11 px-4 py-2.5 rounded-[5px] flex items-center gap-2 ${
                            !isSaveDisabled ? 'bg-teal-400 cursor-pointer ring-2 ring-teal-500' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        onClick={!isSaveDisabled ? handleSaveClick : undefined}
                    >
                        {savingData ? (
                            <Loading2 />
                        ) : (
                            <>
                                <div className="w-6 h-6 relative">
                                    <Image src={Check} alt="Check" className="w-6 h-6" />
                                </div>
                                <div className="text-gray-100 text-base font-bold">Save Changes</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditClientPopup;
