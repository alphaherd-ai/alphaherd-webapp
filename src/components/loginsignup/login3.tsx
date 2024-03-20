"use client"
import Image from "next/image"

import upload from "../../assets/icons/loginsignup/upload.svg";

import continuebutton from "../../assets/icons/loginsignup/1. Icons-24.svg"


import React, { useState, useEffect } from 'react';

const Login3 = () => {
    return (
        <>
        <div className="w-full h-full flex-1 flex justify-center items-center flex  rounded-[20px]">
        <div className="w-[1016px] h-[90%] pl-[36px] pt-[40px] pb-[56px] pr-[40px] relative bg-gray-100 rounded-[30px] border border-stone-300 backdrop-blur-[190.90px]">
                <div className="w-8 h-8 relative bg-gray-100 rounded-[5px]">
                    <Image src={continuebutton} alt="button" />
                </div>
                <div className="text-gray-500 text-xl font-medium font-['Satoshi'] mt-[24px]">
                    Admin Account Setup
                </div>
                <div className="w-[634px] text-neutral-400 text-base font-medium font-['Satoshi'] mt-[8px]">
                    These details will be used to set up the admin account. As the admin, you will have access to all the pages of Alphaherd along with the ability to control the access that other users in your organization have.
                </div>
                <div className="w-[936px] h-28 justify-between items-center gap-6 flex mt-[40px]">
                    <div className="w-28 h-28 bg-gray-200 rounded-full border border-neutral-400 flex justify-center items-center">
                        <Image className="w-8 h-8 relative flex-col justify-between items-center flex" src={upload} alt="upload" />
                    </div>
                    <div className="flex flex-col items-center justify-between gap-[18px]">
                        <div className="flex items-center justify-between gap-12">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Name*</div>
                            <input className="w-[645px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text"></input>
                        </div>
                        <div className="flex items-center justify-between gap-12">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Email*</div>
                            <input className="w-[645px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text"></input>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-[24px] mb-[24px]">
                    <div className="flex items-center justify-between gap-[18px]">
                        <div className="w-[137px] text-gray-500 text-base font-medium font-['Satoshi']">Phone No.</div>
                        <input className="w-[304px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text"></input>
                    </div>
                    <div className="flex items-center justify-between gap-[2px]">
                        <div className="w-[137px] text-gray-500 text-base font-medium font-['Satoshi']">Alt. Phone No.</div>
                        <input className="w-[304px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text"></input>
                    </div>
                </div>
                <div className="w-[634px] mt-[50px] text-neutral-400 text-base font-medium font-['Satoshi']">
                    Secure your admin privileges with a strong password
                </div>
                <div className="flex items-center justify-between mt-[8px]">
                    <div className="flex items-center justify-between gap-[18px]">
                        <div className="w-[137px] text-gray-500 text-base font-medium font-['Satoshi']">Create password*</div>
                        <input className="w-[304px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text"></input>
                    </div>
                    <div className="flex items-center justify-between gap-[18px]">
                        <div className="text-gray-500 text-base font-medium font-['Satoshi']">Re-enter password*</div>
                        <input className="w-[304px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text"></input>
                    </div>
                </div>
                <div className="flex w-full justify-end mt-4">
                <button className=" bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex border-0">
                                    <div className="w-[124px] h-[42px] px-4  bg-stone-900 rounded-[5px] justify-start items-center gap-2 flex ">
                                        <div className="text-white text-sm font-bold font-['Satoshi']">
                                            Continue
                                        </div>
                                        <div className="w-6 h-6 relative">
                                            <Image src={continuebutton} alt="button" />
                                        </div>
                                    </div>
                                </button>
                </div>
         
            </div>
        </div>
    </>
 

    )
}

export default Login3;