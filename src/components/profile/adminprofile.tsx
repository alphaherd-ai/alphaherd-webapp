"use client"
import { usePathname } from 'next/navigation';
import Image from "next/image"

import profilepic from "../../assets/icons/profile/profilepic.png"
import editicon from "../../assets/icons/profile/editicon.svg"

import lefticon from "../../assets/icons/profile/left_icon.svg"

import React, { useState, useEffect } from 'react';

const AdminProfile = () => {
    const currentRoute = usePathname();
    const [editable, setEditable] = useState(false);
    const [value, setValue] = useState('Geet');
  
    const handleEditClick = () => {
      setEditable(true);
    };
  
    const handleSaveClick = () => {
      setEditable(false);
    };
  
    const handleChange = (e) => {
      setValue(e.target.value);
    };
    const [activeTab, setActiveTab] = useState("Staff");

    const handleTabClick = (tab:string) => {
        setActiveTab(tab);
    };
    return (

        <>
            <div className="w-full h-full relative bg-gray-200 rounded-[20px]  z-1">
                <div className="flex h-11 items-center justify-between ">
                    <div className="flex">
                        <div className="w-11 h-11 bg-gray-100 rounded-[5px] border border-neutral-400 flex justify-center items-center mr-16">
                            <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back"></Image>
                        </div>
                        <div className="text-gray-500 text-[28px] font-bold font-['Satoshi']">
                            User Profile
                        </div>
                    </div>
                </div>
                <div className="w-full  min-h-[80vh] flex-col justify-start items-start gap-px flex pt-4">
                    <div className="w-full h-[83px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 justify-start items-center gap-2 flex">
                        <div className="text-gray-500 text-xl font-bold font-['Satoshi']">
                           
                        
                                {value}
                                    
                     
                        </div>
                        <div className="w-[57px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 inline-flex">
<div className="text-teal-400 text-sm font-medium font-['Satoshi']">Admin</div>
</div>
                    </div>
                    <div className="w-full  p-4 bg-gray-100 border border-neutral-400 justify-start items-start gap-6 flex">
                        <div className="w-[245px] h-[270px] relative bg-white rounded-[10px] border border-stone-300 flex justify-end">
                            <Image className="relative rounded-[10px]  border border-neutral-400" src={profilepic} alt="photo" />
                            <Image className="absolute bg-gray-100 rounded-[5px] m-2" src={editicon} alt="edit" />
                        </div>
                        <div className="w-full flex-col justify-start items-start gap-4 flex">
                            <div className="w-full justify-start items-start gap-4 flex ">
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-between items-center gap-4 flex">
                                    <div className="flex gap-4 justify-between items-center">
                                        <div className="text-gray-500 text-base font-bold font-['Satoshi']">Name:</div>
                                        <div className="text-gray-500 text-base font-medium font-['Satoshi']">   <div>
                                {editable ? (
                                    <input
                                    className='rounded-lg px-3 py-2 h-full box-border text-base border border-solid border-gray-400 w-full text-gray-400'
                                        type="text"
                                        value={value}
                                        onChange={handleChange}
                                        autoFocus
                                        onBlur={handleSaveClick}
                                    />
                                ) : (
                                    <div>{value}</div>
                                )}
                               
                            </div>
                            </div>
                                    </div>
                                    <div >
                                    {!editable && <button onClick={handleEditClick}>  <Image src={editicon} alt="edit" /></button>}
                                      
                                    </div>
                                </div>
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold font-['Satoshi']">Role:</div>
                                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">
                                    <div className='flex  text-gray-500 items-center cursor-default'>


<div className={activeTab === 'Staff' 
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white rounded-tl-md rounded-bl-md"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500 rounded-tl-md rounded-bl-md"} onClick={() => handleTabClick('Staff')}>Staff</div>


<div className={activeTab === 'Manager' 
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"} onClick={() => handleTabClick('Manager')}>Manager</div>


<div className={activeTab === 'Veterinarian' 
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white  rounded-tr-md rounded-br-md"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500  rounded-tr-md rounded-br-md"} onClick={() => handleTabClick('Veterinarian')}>Veterinarian</div>

    </div>

                                    </div>
                                </div>
                            </div>
                            <div className="w-full justify-start items-start gap-4 flex ">
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold font-['Satoshi']">Phone No.:</div>
                                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">+91 </div>
                                </div>
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold font-['Satoshi']">Alternate Phone No.</div>
                                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">+91</div>
                                </div>
                            </div>
                            <div className="w-full justify-start items-start gap-4 flex ">
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold font-['Satoshi']">Email:</div>
                                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">a.narayan@gmail.com </div>
                                </div>
                            </div>
                            <div className="w-full justify-start items-start gap-4 flex ">
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold font-['Satoshi']">Address:</div>
                                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">47/38, 14th Cross, Addagalapura, Bangalore </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[43px] px-4 py-2 bg-white rounded-bl-[10px] rounded-br-[10px] border border-neutral-400"></div>

                </div>
            </div>
        </>
    )
}

export default AdminProfile