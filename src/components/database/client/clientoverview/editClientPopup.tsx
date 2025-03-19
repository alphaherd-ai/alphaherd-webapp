import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useAppSelector } from '@/lib/hooks';
import Loading2 from "@/app/loading2";
import closeicon from "../../../../assets/icons/inventory/closeIcon.svg";
import Check from "../../../../assets/icons/database/check.svg";
import Select from "react-select";
type PopupProps = {
    onClose: () => void;
    clientData?: any;
};


const EditClientPopup: React.FC<PopupProps> = ({ onClose, clientData }) => {
    const app = useAppSelector((state) => state.app);
    const [formData, setFormData] = useState<any | null>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [savingData, setSavingData] = useState(false);

    useEffect(() => {
        if (clientData) {
            console.log(clientData);
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

        try {
            //console.log(formData);
            setSavingData(true);
            const body = {
                clientName: formData.clientName,
                email: formData.email,
                contact: formData.contact,
                address: formData.address,
                city: formData.city,
                pinCode: formData.pinCode,

            }
            //console.log(body);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/${clientData?.id}?branchId=${app.currentBranchId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                //const updatedClient = await response.json();
                //console.log('Client data updated successfully:', updatedClient);
                onClose(); // Close the popup after a successful update
                window.dispatchEvent(new FocusEvent('focus'));
                // window.location.reload();
            } else {
                console.error('Failed to update client data', response.statusText);
            }
        } catch (error) {
            console.log(error);
            console.error('Error while updating client data:', error);
        } finally {
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

    const City = [
        { value: 'Bangalore', label: 'Bangalore' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Noida', label: 'Noida' },
        { value: 'Gurgaon', label: 'Gurgaon' },
        { value: 'Faridabad', label: 'Faridabad' },
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Chennai', label: 'Chennai' },

    ]

    return (
        <div
            className="w-full h-fit flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50"
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
                    { label: "Phone No.", field: "contact" },
                    { label: "Address", field: "address" },
                    { label: "City", field: "city" },
                    { label: "Pin Code", field: "pinCode" },
                ].map(({ label, field, type = "text" }) => (
                    <div className="flex items-center gap-4" key={field}>
                        <label className="text-gray-500 text-base font-medium w-[8rem]">{label}</label>
                        {field === "city" ?
                            <Select
                                className="text-textGrey2 w-[10rem] text-base font-medium "
                                placeholder=""
                                isClearable={true}
                                isSearchable={true}
                                options={City}
                                isMulti={false}
                                name="city"
                                onChange={(value) => handleChange(field, value?.label)}
                                styles={customStyles}
                                value={City.find((option) => option.label === formData[field])}
                            />
                            : <input
                                className="w-[448px] h-9 text-textGrey2 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border-[#35BEB1]"
                                type={type}
                                value={formData[field] || ''}
                                onChange={(e) => handleChange(field, e.target.value)}
                            />
                        }
                        {errors[field] && <div className="text-red-500 text-sm">{errors[field]}</div>}
                    </div>
                ))}

                {/* Save Button */}
                <div className="self-end items-start gap-6 flex">
                    <div
                        className={`h-11 px-4 py-2.5 rounded-[5px] flex items-center gap-2 ${!isSaveDisabled ? 'bg-zinc-900 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
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
                                <div className="text-gray-100 text-base font-bold">{savingData ? <Loading2 /> : "Save Changes"}</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditClientPopup;
