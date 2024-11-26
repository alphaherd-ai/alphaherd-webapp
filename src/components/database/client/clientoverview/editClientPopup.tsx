import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useAppSelector } from '@/lib/hooks';
import Loading2 from "@/app/loading2";
import closeicon from "../../../../assets/icons/inventory/closeIcon.svg";
import Check from "../../../../assets/icons/database/check.svg";

type PopupProps = {
    onClose: () => void;
    clientData?: any;
};

const EditClientPopup: React.FC<PopupProps> = ({ onClose, clientData }) => {
    const [formData, setFormData] = useState<any>(clientData || {});  // Initialize with clientData
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);  // Initially disabled save button
    const [savingData, setSavingData] = useState(false);

    // Update formData if clientData changes
    useEffect(() => {
        if (clientData) setFormData(clientData);
    }, [clientData]);

    const validateField = (field: string, value: any) => {
        let errorMessage = '';
        if (field === 'phone' && (value.length !== 10 || !/^[0-9]+$/.test(value))) {
            errorMessage = 'Invalid phone number';
        }
        setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    };

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        validateField(field, value);

        // Enable the save button if any field is filled (i.e., not empty)
        setIsSaveDisabled(Object.values(formData).every(value => value === ''));  // Disable only if all fields are empty
    };

    const handleSaveClick = async () => {
        setSavingData(true);
        try {
            const response = await fetch(`/api/database/clients/${clientData?.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),  // Send updated data
            });

            if (response.ok) {
                const updatedClient = await response.json();
                console.log('Client data updated successfully:', updatedClient);
                onClose();  // Close the popup after successful update
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
        <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50" onClick={onClose}>
            <div className="w-[640px] h-[750px] px-8 py-4 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex" onClick={(e) => e.stopPropagation()}>
                <div className="self-end items-start gap-6 flex">
                    <button className="border-0 outline-none cursor-pointer" onClick={onClose}>
                        <Image src={closeicon} alt="close" />
                    </button>
                </div>
                <div className="text-gray-500 text-xl font-medium">Edit Client</div>
                <div className="text-textGrey1 text-base font-medium">Update the client details below.</div>

                {/* Client Name Input */}
                <div className="flex items-center gap-4">
                    <label className="text-gray-500 text-base font-medium w-[8rem]">Client Name</label>
                    <input
                        className="w-[448px] h-9 text-textGrey2 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border-[#35BEB1]"
                        type="text"
                        value={formData.clientName || ''}
                        onChange={(e) => handleChange("clientName", e.target.value)}
                    />
                    {errors.clientName && <div className="text-red-500 text-sm">{errors.clientName}</div>}
                </div>

                {/* Email Input */}
                <div className="flex items-center gap-4">
                    <label className="text-gray-500 text-base font-medium w-[8rem]">Email</label>
                    <input
                        className="w-[448px] h-9 text-textGrey2 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border-[#35BEB1]"
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                    {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                </div>

                {/* Phone No. Input */}
                <div className="flex items-center gap-4">
                    <label className="text-gray-500 text-base font-medium w-[8rem]">Phone No.</label>
                    <input
                        className="w-[448px] h-9 text-textGrey2 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border-[#35BEB1]"
                        type="text"
                        value={formData.phone || ''}
                        onChange={(e) => handleChange("phone", e.target.value)}
                    />
                    {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                </div>

                {/* Address Input */}
                <div className="flex items-center gap-4">
                    <label className="text-gray-500 text-base font-medium w-[8rem]">Address</label>
                    <input
                        className="w-[448px] h-9 text-textGrey2 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border-[#35BEB1]"
                        type="text"
                        value={formData.address || ''}
                        onChange={(e) => handleChange("address", e.target.value)}
                    />
                    {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                </div>

                {/* City Input */}
                <div className="flex items-center gap-4">
                    <label className="text-gray-500 text-base font-medium w-[8rem]">City</label>
                    <input
                        className="w-[448px] h-9 text-textGrey2 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border-[#35BEB1]"
                        type="text"
                        value={formData.city || ''}
                        onChange={(e) => handleChange("city", e.target.value)}
                    />
                    {errors.city && <div className="text-red-500 text-sm">{errors.city}</div>}
                </div>

                {/* Pin Code Input */}
                <div className="flex items-center gap-4">
                    <label className="text-gray-500 text-base font-medium w-[8rem]">Pin Code</label>
                    <input
                        className="w-[448px] h-9 text-textGrey2 text-base font-medium px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border-[#35BEB1]"
                        type="text"
                        value={formData.pinCode || ''}
                        onChange={(e) => handleChange("pinCode", e.target.value)}
                    />
                    {errors.pinCode && <div className="text-red-500 text-sm">{errors.pinCode}</div>}
                </div>

                {/* Save Button */}
                <div className="self-end items-start gap-6 flex">
                    <div
                        className={`h-11 px-4 py-2.5 rounded-[5px] flex items-center gap-2 ${!isSaveDisabled ? 'bg-teal-400 cursor-pointer ring-2 ring-teal-500' : 'bg-gray-400 cursor-not-allowed'}`}
                        onClick={!isSaveDisabled ? handleSaveClick : undefined}
                    >
                        {savingData ? <Loading2 /> : (
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







// import React,{useState} from 'react';

// interface Client {
//     clientName: string;
//     // Add other fields here as per your client object structure
// }

// interface EditClientPopupProps {
//     onClose: () => void;
//     client: Client;
//     onSave: (updatedClient: Client) => void;
// }


// const EditClientPopup: React.FC<EditClientPopupProps> = ({ onClose, client, onSave }) => {
//     // Initialize state with client's name
//     const [clientName, setClientName] = useState(client?.clientName || '');

//     // Function to handle form submission
//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         console.log("the cccclient name is : ",clientName);
//         // Check if onSave function is provided
//         if (onSave) {
//             console.log("the cclient name is : ",clientName);
//             onSave({ ...client, clientName }); // Send updated client object to onSave
//         }
//         onClose(); // Close the popup after saving
//     };

//     return (
//         <div className="popup-overlay">
//             <div className="popup-content">
//                 <h2>Edit Client</h2>
//                 <form onSubmit={handleSubmit}>
//                     <label>
//                         Client Name:
//                         <input 
//                             type="text" 
//                             value={clientName} 
//                             onChange={(e) => setClientName(e.target.value)} // Update state on change
                            
//                         />
//                         {/* console.log("the cclient name is : ",clientName); */}
//                     </label>
                    
//                     {/* Add other fields as needed */}
//                     <button type="button" onClick={onClose}>Close</button>
//                     <button type="submit">Save</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EditClientPopup;

