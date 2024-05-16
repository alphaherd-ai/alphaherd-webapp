"use client"
import Image from "next/image"
import Link from "next/link"
import Select from 'react-select';

import pfpcion from "../../../../assets/icons/settings/pfpcion.jpeg"
import adminicon from "../../../../assets/icons/settings/adminicon.svg"
import removeusericon from "../../../../assets/icons/settings/removeusericon.svg"
import addicon from "../../../../assets/icons/settings/addicon.svg"
import downicon from "../../../../assets/icons/settings/downicon.svg"
import opticon from "../../../../assets/icons/settings/opticon.svg"
import React, { useState, useEffect } from 'react';
import OrganisationNavbar from "../navbar/navbar";

export default function UsersAndRolesSettings() {

 
 
    const permission = [
        { value: 'Allow with admin permission', label: 'Allow with admin permission' },
        { value: 'Allow', label: 'Allow' },
        { value: 'Never Allow', label: 'Never Allow' }
    ];

    const [togglemanager, setToggleManager] = useState(true);
    const [togglev, setToggleV] = useState(false);
    const [togglestaff, setToggleStaff] = useState(false);


 

    const toggleManagerHandler = () => {
        if (!togglemanager) {
            setToggleManager(!togglemanager);
            if (togglev) {
                setToggleV(!togglev);
            }
            if (togglestaff) {
                setToggleStaff(!togglestaff);
            }
        }
    };

    const toggleVHandler = () => {
        if (!togglev) {
            setToggleV(!togglev);
            if (togglemanager) {
                setToggleManager(!togglemanager);
            }
            if (togglestaff) {
                setToggleStaff(!togglestaff);
            }
        }
    };

    const toggleStaffHandler = () => {
        if (!togglestaff) {
            setToggleStaff(!togglestaff);
            if (togglemanager) {
                setToggleManager(!togglemanager);
            }
            if (togglev) {
                setToggleV(!togglev);
            }
        }
    };
  
    return (

        <>
             <div className="w-full h-full">
      
            <div className="w-full h-full mt-[26px]">
              <OrganisationNavbar/>
                <div className="w-full px-4 py-5 bg-gray-100 border border-neutral-400 flex-col justify-start items-start gap-4 flex">
                    <div className="w-full h-full">
                        <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                            <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-3/12'>Name</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-3/12'>Role</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'>Phone No.</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-4/12'>Email</div>
                            </div>
                            <div className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                <div className='w-3/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                    <Image className="w-7 h-7 relative rounded-full border border-neutral-400" src={pfpcion} alt="profile" />
                                    <div className="">Rani Kumari</div>
                                </div>
                                <div className='w-3/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-2'>
                                    <div className="text-indigo-600 text-sm font-medium font-['Satoshi'] px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 flex">Manager</div>
                                    <div className="text-teal-400 text-sm font-medium font-['Satoshi'] px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex">Admin</div>
                                </div>
                                <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium'>+91 99999 99999</div>
                                <div className='w-4/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-3'>
                                    <div>an@gmail.com</div>
                                    <div className="flex gap-2">
                                        <div className="px-2 py-1 bg-gray-100 rounded-[5px] justify-start items-center gap-1 flex">
                                            <Image className="w-4 h-4 relative" src={adminicon} alt="admin" />
                                            <div className="text-neutral-400 text-sm font-medium font-['Roboto']">Make Admin</div>
                                        </div>
                                        <div className="px-2 py-1 bg-gray-100 rounded-[5px] justify-start items-center gap-1 flex">
                                            <Image className="w-4 h-4 relative" src={removeusericon} alt="admin" />
                                            <div className="text-neutral-400 text-sm font-medium font-['Roboto']">Remove User</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                <div className='w-3/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                    <Image className="w-7 h-7 relative rounded-full border border-neutral-400" src={pfpcion} alt="profile" />
                                    <div className="">Rani Kumari</div>
                                </div>
                                <div className='w-3/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-2'>
                                    <div className="text-indigo-600 text-sm font-medium font-['Satoshi'] px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 flex">Manager</div>
                                    <div className="text-teal-400 text-sm font-medium font-['Satoshi'] px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex">Admin</div>
                                </div>
                                <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium'>+91 99999 99999</div>
                                <div className='w-4/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-3'>
                                    <div>an@gmail.com</div>
                                    <div className="flex gap-2">
                                        <div className="px-2 py-1 bg-gray-100 rounded-[5px] justify-start items-center gap-1 flex">
                                            <Image className="w-4 h-4 relative" src={adminicon} alt="admin" />
                                            <div className="text-neutral-400 text-sm font-medium font-['Roboto']">Make Admin</div>
                                        </div>
                                        <div className="px-2 py-1 bg-gray-100 rounded-[5px] justify-start items-center gap-1 flex">
                                            <Image className="w-4 h-4 relative" src={removeusericon} alt="admin" />
                                            <div className="text-neutral-400 text-sm font-medium font-['Roboto']">Remove User</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                <div className='w-3/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                    <Image className="w-7 h-7 relative rounded-full border border-neutral-400" src={pfpcion} alt="profile" />
                                    <div className="">Rani Kumari</div>
                                </div>
                                <div className='w-3/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-2'>
                                    <div className="text-indigo-600 text-sm font-medium font-['Satoshi'] px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 flex">Manager</div>
                                    <div className="text-teal-400 text-sm font-medium font-['Satoshi'] px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex">Admin</div>
                                </div>
                                <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium'>+91 99999 99999</div>
                                <div className='w-4/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-3'>
                                    <div>an@gmail.com</div>
                                    <div className="flex gap-2">
                                        <div className="px-2 py-1 bg-gray-100 rounded-[5px] justify-start items-center gap-1 flex">
                                            <Image className="w-4 h-4 relative" src={adminicon} alt="admin" />
                                            <div className="text-neutral-400 text-sm font-medium font-['Roboto']">Make Admin</div>
                                        </div>
                                        <div className="px-2 py-1 bg-gray-100 rounded-[5px] justify-start items-center gap-1 flex">
                                            <Image className="w-4 h-4 relative" src={removeusericon} alt="admin" />
                                            <div className="text-neutral-400 text-sm font-medium font-['Roboto']">Remove User</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                        <div className="w-full">
                            <div className="text-gray-500 text-base font-bold font-['Roboto']">Roles and Permissions</div>
                            <div className="text-neutral-400 text-sm font-medium font-['Roboto']">Note: These permissions do not apply to the admin account. Admins have access to all features of Alphaherd.</div>
                            <div className="flex mt-3">
                                {togglemanager && (<button onClick={toggleManagerHandler}><div className="px-2 py-1 bg-zinc-900 rounded-tl-[5px] rounded-bl-[5px] border border-zinc-900 justify-start items-center gap-2 flex ">
                                    <div className="text-white text-sm font-bold font-['Roboto']">Manager</div>
                                    <Image className="w-3.5 h-3.5 relative" src={opticon} alt="option" />
                                </div></button>)}
                                {!togglemanager && (<button onClick={toggleManagerHandler}><div className="px-2 py-1 bg-gray-100 border border-neutral-400 justify-start items-center gap-1 flex text-neutral-400 text-sm font-bold font-['Roboto']">
                                    Manager
                                </div></button>)}
                                {togglev && (<button onClick={toggleVHandler}><div className="px-2 py-1 bg-zinc-900 rounded-tl-[5px] rounded-bl-[5px] border border-zinc-900 justify-start items-center gap-2 flex text-white text-sm font-bold font-['Roboto']">
                                    Veterinarian
                                </div></button>)}
                                {!togglev && (<button onClick={toggleVHandler}><div className="px-2 py-1 bg-gray-100 border border-neutral-400 justify-start items-center gap-1 flex text-neutral-400 text-sm font-bold font-['Roboto']">
                                    Veterinarian
                                </div></button>)}
                                {togglestaff && (<button onClick={toggleStaffHandler}><div className="px-2 py-1 bg-zinc-900 rounded-tl-[5px] rounded-bl-[5px] border border-zinc-900 justify-start items-center gap-2 flex text-white text-sm font-bold font-['Roboto']">
                                    Staff
                                </div></button>)}
                                {!togglestaff && (<button onClick={toggleStaffHandler}><div className="px-2 py-1 bg-gray-100 border border-neutral-400 justify-start items-center gap-1 flex text-neutral-400 text-sm font-bold font-['Roboto']">
                                    Staff
                                </div></button>)}
                                <div className="ml-2 px-[5px] py-1 bg-gray-100 rounded-[5px] border border-neutral-400 justify-start items-center gap-1 flex">
                                    <Image className="w-[17px] h-[17px] relative" src={addicon} alt="add" />
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-6 w-full">
                                <div className="flex gap-4 items-start">
                                    <input className="mt-1" type="checkbox" />
                                    <div>
                                        <div className="text-gray-500 text-base font-bold font-['Roboto']">Allow user to add and view branches</div>
                                        <div className="text-teal-400 text-base font-medium font-['Roboto'] flex">
                                            <div>
                                                <Select
                                                    className="text-neutral-400 text-base font-medium w-[138px] h-6"
                                                    placeholder="Select"
                                                    isClearable={false}
                                                    isSearchable={true}
                                                    options={permission}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <input className="mt-1" type="checkbox" />
                                    <div>
                                        <div className="text-gray-500 text-base font-bold font-['Roboto']">Allow user to add new users</div>
                                        <div className="text-neutral-400 text-base font-medium font-['Roboto']">
                                            <div>
                                                <Select
                                                    className="text-neutral-400 text-base font-medium w-[138px] h-6"
                                                    placeholder="Select"
                                                    isClearable={false}
                                                    isSearchable={true}
                                                    options={permission}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <input className="mt-1" type="checkbox" />
                                    <div>
                                        <div className="text-gray-500 text-base font-bold font-['Roboto']">Allow user to edit permissions</div>
                                        <div className="text-teal-400 text-base font-medium font-['Roboto'] flex">
                                            <div>
                                                <Select
                                                    className="text-neutral-400 text-base font-medium w-[138px] h-6"
                                                    placeholder="Select"
                                                    isClearable={false}
                                                    isSearchable={true}
                                                    options={permission}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <input className="mt-1" type="checkbox" />
                                    <div>
                                        <div className="text-gray-500 text-base font-bold font-['Roboto']">Allow user to edit organization</div>
                                        <div className="text-teal-400 text-base font-medium font-['Roboto'] flex">
                                            <div>
                                                <Select
                                                    className="text-neutral-400 text-base font-medium w-[138px] h-6"
                                                    placeholder="Select"
                                                    isClearable={false}
                                                    isSearchable={true}
                                                    options={permission}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <input className="mt-1" type="checkbox" />
                                    <div>
                                        <div className="text-gray-500 text-base font-bold font-['Roboto']">Allow user to create roles</div>
                                        <div className="text-teal-400 text-base font-medium font-['Roboto'] flex">
                                            <div>
                                                <Select
                                                    className="text-neutral-400 text-base font-medium w-[138px] h-6"
                                                    placeholder="Select"
                                                    isClearable={false}
                                                    isSearchable={true}
                                                    options={permission}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <input className="mt-1" type="checkbox" />
                                    <div>
                                        <div className="text-gray-500 text-base font-bold font-['Roboto']">Allow user to view metrics and analytics </div>
                                        <div className="text-teal-400 text-base font-medium font-['Roboto'] flex">
                                            <div>
                                                <Select
                                                    className="text-neutral-400 text-base font-medium w-[138px] h-6"
                                                    placeholder="Select"
                                                    isClearable={false}
                                                    isSearchable={true}
                                                    options={permission}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <input className="mt-1" type="checkbox" />
                                    <div>
                                        <div className="text-gray-500 text-base font-bold font-['Roboto']">Allow user to download reports</div>
                                        <div className="text-teal-400 text-base font-medium font-['Roboto'] flex">
                                            <div>
                                                <Select
                                                    className="text-neutral-400 text-base font-medium w-[138px] h-6"
                                                    placeholder="Select"
                                                    isClearable={false}
                                                    isSearchable={true}
                                                    options={permission}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <input className="mt-1" type="checkbox" />
                                    <div>
                                        <div className="text-gray-500 text-base font-bold font-['Roboto']">Allow user to update inventory </div>
                                        <div className="text-teal-400 text-base font-medium font-['Roboto'] flex">
                                            <div>
                                                <Select
                                                    className="text-neutral-400 text-base font-medium w-[138px] h-6"
                                                    placeholder="Select"
                                                    isClearable={false}
                                                    isSearchable={true}
                                                    options={permission}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
        </>
    )
}