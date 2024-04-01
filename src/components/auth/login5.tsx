"use client"
import Image from "next/image"
import React, { useState } from 'react';

import crossicon from "../../assets/icons/loginsignup/1. Icons-24 (5).svg"
import linkicon from "../../assets/icons/loginsignup/link.svg"
import deleteicon from "../../assets/icons/loginsignup/delete.svg"


const Login5 = () => {
    const [staffaccess, setStaffaccess] = useState(true);
    const [manageraccess, setManageraccess] = useState(false);
    const [veterinarianaccess, setVeterinarianaccess] = useState(false);
    const staffonclickHandler = () => {
        if (!staffaccess) {
            setStaffaccess(true);
            setManageraccess(false);
            setVeterinarianaccess(false);
        }
    }
    const manageronclickHandler = () => {
        if (!manageraccess) {
            setStaffaccess(false);
            setManageraccess(true);
            setVeterinarianaccess(false);
        }
    }
    const veterinarianonclickHandler = () => {
        if (!veterinarianaccess) {
            setStaffaccess(false);
            setManageraccess(false);
            setVeterinarianaccess(true);
        }
    }
    return (
        <>
        <div className="w-full h-full flex justify-center items-center flex bg-white rounded-[20px]">
        <div className="w-[640px] h-[663px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch justify-start items-start gap-6 flex">
                    <div className="w-[528px] h-6 relative rounded-[5px]"></div>
                    <Image className="w-6 h-6 relative bg-gray-200 rounded-[5px]" src={crossicon} alt="cross" />
                </div>
                <div className="flex-col justify-start items-start gap-2 flex">
                    <div className="text-gray-500 text-xl font-medium font-['Satoshi']">Add Users to your Organisation</div>
                    <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Enter their email ID to send invite</div>
                </div>
                <div className="self-stretch h-[87px] flex-col justify-start items-start gap-4 flex">
                    <div className="w-[576px] h-[27px] justify-start items-center gap-2 flex">
                        <div className="grow shrink basis-0 h-[27px] justify-start items-center flex">
                            {staffaccess && (<div className="px-2 py-1 bg-zinc-900 rounded-tl-[5px] rounded-bl-[5px] border border-zinc-900 justify-start items-center gap-1 flex">
                                <div className="text-white text-sm font-bold font-['Satoshi']">
                                    <button onClick={staffonclickHandler}>Staff</button>
                                </div>
                            </div>)}
                            {!staffaccess && (<div className="px-2 py-1 bg-gray-100 border border-neutral-400 justify-start items-center gap-1 flex">
                                <div className="text-neutral-400 text-sm font-bold font-['Satoshi']">
                                    <button onClick={staffonclickHandler}>Staff</button>
                                </div>
                            </div>)}
                            {manageraccess && (<div className="px-2 py-1 bg-zinc-900 rounded-tl-[5px] rounded-bl-[5px] border border-zinc-900 justify-start items-center gap-1 flex">
                                <div className="text-white text-sm font-bold font-['Satoshi']">
                                    <button onClick={manageronclickHandler}>Manager</button>
                                </div>
                            </div>)}
                            {!manageraccess && (<div className="px-2 py-1 bg-gray-100 border border-neutral-400 justify-start items-center gap-1 flex">
                                <div className="text-neutral-400 text-sm font-bold font-['Satoshi']">
                                    <button onClick={manageronclickHandler}>Manager</button>
                                </div>
                            </div>)}
                            {veterinarianaccess && (<div className="px-2 py-1 bg-zinc-900 rounded-tl-[5px] rounded-bl-[5px] border border-zinc-900 justify-start items-center gap-1 flex">
                                <div className="text-white text-sm font-bold font-['Satoshi']">
                                    <button onClick={veterinarianonclickHandler}>Veterinarian</button>
                                </div>
                            </div>)}
                            {!veterinarianaccess && (<div className="px-2 py-1 bg-gray-100 border border-neutral-400 justify-start items-center gap-1 flex">
                                <div className="text-neutral-400 text-sm font-bold font-['Satoshi']">
                                    <button onClick={veterinarianonclickHandler}>Veterinarian</button>
                                </div>
                            </div>)}
                        </div>
                        <div className="grow shrink basis-0 self-stretch justify-end items-center gap-2.5 flex">
                            <div className="w-6 h-6 relative">
                                <Image className="w-6 h-6 left-0 top-0 absolute " src={linkicon} alt="link" />
                            </div>
                            <div className="text-right text-teal-400 text-base font-bold font-['Satoshi']">Copy invite link</div>
                        </div>
                    </div>
                    <div className="self-stretch justify-start items-center gap-2 flex">
                        <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex">
                            <input type="text" className="h-full w-full text-neutral-400 text-base font-medium font-['Satoshi']" placeholder=" Enter emails, separated by commas" />
                        </div>
                        <div className="w-[132px] self-stretch px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                            <div className="text-white text-base font-bold font-['Satoshi']">Send Invite(s)</div>
                        </div>
                    </div>
                </div>
                <div className="self-stretch rounded-[5px] border border-stone-300 justify-start items-start w-full flex flex-col">
                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                        <div className='flex text-gray-500 text-base font-medium px-6 w-6/12'>Email</div>
                        <div className='flex text-gray-500 text-base font-medium px-6 w-6/12'>Role</div>
                        <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'></div>
                    </div>
                    <div className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                        <div className='w-6/12 px-6 flex items-center text-neutral-400 text-base font-medium'>Raniumari@gmail.com</div>
                        <div className='w-6/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-2'>
                            <div className="w-[73px] h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 flex text-indigo-600 text-sm font-medium font-['Satoshi']">Manager</div>
                            <div className="w-[57px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 text-green-600 text-sm font-medium font-['Satoshi']">Admin</div>
                        </div>
                        <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium'></div>
                    </div>
                    <div className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                        <div className='w-6/12 px-6 flex items-center text-neutral-400 text-base font-medium'>Ashwatiaresh@gmail.com</div>
                        <div className='w-6/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-2'>
                            <div className="w-[73px] h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 flex text-indigo-600 text-sm font-medium font-['Satoshi']">Staff</div>
                            <div className="w-[57px] h-7 px-2 py-1.5 bg-gray-200 rounded-[5px] justify-center items-center gap-2 text-neutral-400 text-sm font-medium font-['Satoshi']">Admin</div>
                        </div>
                        <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium'></div>
                    </div>
                    <div className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                        <div className='w-6/12 px-6 flex items-center text-neutral-400 text-base font-medium'>Bkumar@gmail.com</div>
                        <div className='w-6/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-2'>
                            <div className="w-[73px] h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 flex text-indigo-600 text-sm font-medium font-['Satoshi']">Veterinarian</div>
                        
                        </div>
                        <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium'>
                            <div className="w-8 h-6 px-2 py-1 bg-gray-100 rounded-[5px] justify-start items-center gap-1 flex"> 
                                <Image className="w-4 h-4 relative" src={deleteicon} alt="delete" />
                            </div>
                        </div>
                    </div>
                    <div className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                        <div className='w-6/12 px-6 flex items-center text-neutral-400 text-base font-medium'>Rajushekar@hotmail.com</div>
                        <div className='w-6/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-2'>
                            <div className="w-[73px] h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 flex text-indigo-600 text-sm font-medium font-['Satoshi']">Staff</div>
                            <div className="w-[57px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 text-green-600 text-sm font-medium font-['Satoshi']">Staff</div>
                        </div>
                        <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium'></div>
                    </div>
                </div>
                <div className="self-stretch justify-end items-center gap-2.5 flex">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                        <div className="text-white text-base font-bold font-['Satoshi']">Finish</div>
                    </div>
                </div>
            </div>
        </div >
        </>


    )
}

export default Login5;