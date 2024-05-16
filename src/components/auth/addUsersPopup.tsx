"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { Tooltip, Button } from "@nextui-org/react";
import Link from 'next/link';
import closeicon from "../../assets/icons/inventory/closeIcon.svg";
import link from "../../assets/icons/settings/link.svg"
import arrowicon from "../../../assets/icons/inventory/arrow.svg";
import Select from 'react-select';
import Attachment from "../../../assets/icons/finance/attachment.svg"

import deleteicon from "../../assets/icons/loginsignup/delete.svg"

type PopupProps = {
    onClose: () => void;
}

type Role = "Staff" | "Manager" | "Veterinarian";

interface EmailWithRole {
    email: string;
    role: Role;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
    // const [formData, setFormData] = useState<any>({});

    const [staffaccess, setStaffaccess] = useState(true);
    const [manageraccess, setManageraccess] = useState(false);
    const [veterinarianaccess, setVeterinarianaccess] = useState(false);
    const staffonclickHandler = () => {
        if (!staffaccess) {
            setStaffaccess(true);
            setManageraccess(false);
            setVeterinarianaccess(false);
            handleRoleChange("Staff");
        }
    };

    const manageronclickHandler = () => {
        if (!manageraccess) {
            setStaffaccess(false);
            setManageraccess(true);
            setVeterinarianaccess(false);
            handleRoleChange("Manager");
        }
    };

    const veterinarianonclickHandler = () => {
        if (!veterinarianaccess) {
            setStaffaccess(false);
            setManageraccess(false);
            setVeterinarianaccess(true);
            handleRoleChange("Veterinarian");
        }
    };

    const gstOptions = [
        { value: 'Pets First Kalyan Nagar Branch', label: 'Pets First Kalyan Nagar Branch' },
        { value: 'Hello First Kalyan Nagar Branch', label: 'Hello First Kalyan Nagar Branch' },
        { value: 'What First Kalyan Nagar Branch', label: 'What First Kalyan Nagar Branch' },
    ];
    

    const [emails, setEmails] = useState<EmailWithRole[]>([]);
    const [emailInput, setEmailInput] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<Role>("Staff");

    

    const handleInputChange = (event:any) => {
        setEmailInput(event.target.value);
    };

    const handleSendInvite = () => {
        if (emailInput.trim() !== '') {
            setEmails([...emails, { email: emailInput.trim(), role: selectedRole }]);
            setEmailInput('');
        }
    };

    const handleRoleChange = (role: Role) => {
        setSelectedRole(role);
    };

    return <>

       <div className="w-full h-full flex justify-center items-center  top-0 left-0 fixed inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
       <div className="w-[640px] h-[703px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400/opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 inline-flex">
    <div className="self-stretch justify-start items-start gap-6 inline-flex">
        <div className="w-[528px] h-6 relative rounded-[5px]" />
        <div className="w-6 h-6 relative bg-gray-200 rounded-[5px]" >
            <Button onClick={onClose} className="outline-none border-0 hover:cursor-pointer">
                <Image src={closeicon} alt="image" />
            </Button>
        </div>
    </div>
    <div className="flex-col justify-start items-start gap-2 flex">
        <div className="text-gray-500 text-xl  ">Add Users to your Organisation</div>
        <div className="text-neutral-400 text-base  ">Enter their email ID to send invite</div>
    </div>
    <div className="self-stretch h-[147px] flex-col justify-start items-start gap-4 flex">
        <div className="w-[576px] h-[27px] justify-start items-center gap-2 inline-flex">
            <div className="grow shrink basis-0 h-[27px] justify-start items-center flex hover:cursor-pointer">
            {staffaccess && (<div className="px-2 py-1 bg-zinc-900 rounded-tl-[5px] rounded-[5px] border border-zinc-900 justify-start items-center gap-1 flex">
                                <div className="text-white text-sm font-bold font-['Satoshi']">
                                    <div onClick={staffonclickHandler}>Staff</div>
                                </div>
                            </div>)}
                            {!staffaccess && (<div className="px-2 py-1 bg-gray-100 border border-neutral-400 justify-start items-center gap-1 flex">
                                <div className="text-neutral-400 text-sm font-bold font-['Satoshi']">
                                    <div onClick={staffonclickHandler}>Staff</div>
                                </div>
                            </div>)}
                            {manageraccess && (<div className="px-2 py-1 bg-zinc-900 rounded-[5px] rounded-bl-[5px] border border-zinc-900 justify-start items-center gap-1 flex">
                                <div className="text-white text-sm font-bold font-['Satoshi']">
                                    <div onClick={manageronclickHandler}>Manager</div>
                                </div>
                            </div>)}
                            {!manageraccess && (<div className="px-2 py-1 bg-gray-100 border border-neutral-400 justify-start items-center gap-1 flex">
                                <div className="text-neutral-400 text-sm font-bold font-['Satoshi']">
                                    <div onClick={manageronclickHandler}>Manager</div>
                                </div>
                            </div>)}
                            {veterinarianaccess && (<div className="px-2 py-1 bg-zinc-900 rounded-[5px] rounded-bl-[5px] border border-zinc-900 justify-start items-center gap-1 flex">
                                <div className="text-white text-sm font-bold font-['Satoshi']">
                                    <div onClick={veterinarianonclickHandler}>Veterinarian</div>
                                </div>
                            </div>)}
                            {!veterinarianaccess && (<div className="px-2 py-1 bg-gray-100 border border-neutral-400 justify-start items-center gap-1 flex">
                                <div className="text-neutral-400 text-sm font-bold font-['Satoshi']">
                                    <div onClick={veterinarianonclickHandler}>Veterinarian</div>
                                </div>
                            </div>)}
            </div>
            <div className="grow shrink basis-0 self-stretch justify-end items-center gap-2.5 flex">
                <div className="w-6 h-6 relative">
                    <div className="w-6 h-6 left-0 top-0 absolute">
                        <Image src={link} alt="link" />
                    </div>
                </div>
                <div className="text-teal-400 text-base  ">Copy invite link</div>
            </div>
        </div>
        <div className="w-[600px] h-11 justify-start items-center flex">
            <div className="pr-5 justify-start items-center flex">
                <div className="text-gray-500 text-base  ">Select Branch</div>
            </div>
            <div className="w-[28.6rem]">

                <Select
                            className="text-gray-500 text-base h-[100%]"
                            placeholder="Pets First Kalyan Nagar Branch"
                            isClearable={false}
                            isSearchable={true}
                            options={gstOptions}
                            isMulti={true}
                        />

            </div>
        </div>
        <div className="self-stretch justify-start items-center gap-2 inline-flex">
            <div className="grow shrink basis-0 h-11 py-[13px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex">
                <input type="text" name="" id="" className="text-neutral-400 text-base  h-11 px-4 py-[13px] w-[100%] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex" placeholder="Enter Email" value={emailInput}
                        onChange={handleInputChange}/>
            </div>
            <div className="w-[132px] self-stretch px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex" onClick={handleSendInvite}>
                <div className="text-white text-base hover:cursor-pointer">Send Invite(s)</div>
            </div>
        </div>
    </div>
    <div className="overflow-auto max-h-[300px] w-[36rem]">
    <div className="self-stretch rounded-[5px] border border-stone-300 justify-start items-start flex">
        <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
            <div className="flex justify-start gap-[38%] w-[100%]">
            <div className="self-stretch h-12 p-4 bg-gray-100 border-b border-neutral-400 justify-start items-center gap-2 inline-flex">
                <div className="text-gray-500 text-base">Email</div>
            </div>
            <div className="self-stretch h-12 p-4 bg-gray-100 border-b border-neutral-400 justify-start items-center gap-2 inline-flex">
                <div className="text-gray-500 text-base  ">Role</div>
            </div>
            </div>
            
            {emails.map((emailObj, index) => (
                                <div key={index} className="self-stretch h-16 p-4 bg-white border-b border-stone-300 justify-start items-center gap-[20%] inline-flex">
                                    <div className="w-[178px] text-gray-500 text-base border-b-4 border-stone-800">{emailObj.email}</div>
                                    <div className="min-w-[61px] h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 inline-flex">
                                        <div className="text-indigo-600 text-xs">{emailObj.role}</div>
                                    </div>
                                </div>
                            ))}
        </div>
        
    </div>
    </div>
    <div className="self-stretch justify-end items-center gap-2.5 inline-flex">
        <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex hover:cursor-pointer" onClick={onClose}>
            <div className="text-white text-base  ">Finish</div>
        </div>
    </div>
</div>
        </div>
      
     
    </>;
}

export default Popup;


