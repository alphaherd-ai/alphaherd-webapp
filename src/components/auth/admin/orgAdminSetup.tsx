"use client"
import Image from "next/image"

import upload from "../../../assets/icons/loginsignup/upload.svg";

import continuebutton from "../../assets/icons/loginsignup/1. Icons-24.svg"


import React, { useState, useEffect } from 'react';

const OrgAdminSetup = (props: any) => {
    return (
        <>
            <div className="w-[1016px] h-[85.5vh] pl-[36px] pt-[40px] pb-[56px] pr-[40px]">
                <div className="text-gray-500 text-xl font-medium ">
                    Admin Account Setup
                </div>
                <div className="w-[634px] text-neutral-400 text-base font-medium  mt-[8px]">
                    These details will be used to set up the admin account. As the admin, you will have access to all the pages of Alphaherd along with the ability to control the access that other users in your organization have.
                </div>
                <div className="w-[936px] h-28 justify-between items-center gap-6 flex mt-[40px]">
                    <div className="w-28 h-28 bg-gray-200 rounded-full border border-neutral-400 flex justify-center items-center">
                        <Image className="w-8 h-8 relative flex-col justify-between items-center flex" src={upload} alt="upload" />
                    </div>
                    <div className="flex flex-col items-center justify-between gap-[18px]">
                        <div className="flex items-center justify-between gap-12">
                            <div className="text-gray-500 text-base font-medium ">Name*</div>
                            <input className="w-[645px] h-11 bg-white  px-2 focus:outline-none border-1 border-solid border-[#A2A3A3]  rounded-[5px]  focus:border-1 focus:border-emerald-200" type="text" name="adminName" value={props.data.adminName} onChange={props.handleChange} />
                            {props.validationErrors.adminName && (
                                <div className="error">{props.validationErrors.adminName}</div>
                            )}
                        </div>
                        <div className="flex items-center justify-between gap-12">
                            <div className="text-gray-500 text-base font-medium ">Email*</div>
                            <input className="w-[645px] h-11 bg-white px-2 focus:outline-none border-1 border-solid border-[#A2A3A3]  rounded-[5px]  focus:border-1 focus:border-emerald-200" type="text" name="adminEmail" value={props.data.adminEmail} onChange={props.handleChange} />
                            {props.validationErrors.adminEmail && (
                                <div className="error">{props.validationErrors.adminEmail}</div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-[24px] mb-[24px]">
                    <div className="flex items-center justify-between gap-[18px]">
                        <div className="w-[137px] text-gray-500 text-base font-medium ">Phone No.</div>
                        <input className="w-[304px] h-11 bg-white  px-2 focus:outline-none border-1 border-solid border-[#A2A3A3]  rounded-[5px]  focus:border-1 focus:border-emerald-200" type="text" minLength={10} maxLength={10} name="adminPhoneNo" value={props.data.adminPhoneNo} onChange={props.handleChange} />
                        {props.validationErrors.adminPhoneNo && (
                            <div className="error">{props.validationErrors.adminPhoneNo}</div>
                        )}
                    </div>
                    <div className="flex items-center justify-between gap-[2px]">
                        <div className="w-[137px] text-gray-500 text-base font-medium ">Alt. Phone No.</div>
                        <input className="w-[304px] h-11 bg-white  px-2 focus:outline-none border-1 border-solid border-[#A2A3A3]  rounded-[5px]  focus:border-1 focus:border-emerald-200" type="text" minLength={10} maxLength={10} name="adminAltPhoneNo" value={props.data.adminAltPhoneNo} onChange={props.handleChange} />
                        {props.validationErrors.adminAltPhoneNo && (
                            <div className="error">{props.validationErrors.adminAltPhoneNo}</div>
                        )}
                    </div>
                </div>
                <div className="w-[634px] mt-[50px] text-neutral-400 text-base font-medium ">
                    Secure your admin privileges with a strong password
                </div>
                <div className="flex items-center justify-between mt-[8px]">
                    <div className="flex items-center justify-between gap-[18px]">
                        <div className="w-[137px] text-gray-500 text-base font-medium ">Create password*</div>
                        <input className="w-[304px] h-11 bg-white focus:outline-none border-1 border-solid border-[#A2A3A3]  rounded-[5px]  focus:border-1 focus:border-emerald-200 px-2" type="password" minLength={8} name="adminPassword" value={props.data.adminPassword} onChange={props.handleChange} />
                        {props.validationErrors.adminPassword && (
                            <div className="error">{props.validationErrors.adminPassword}</div>
                        )}
                    </div>
                    <div className="flex items-center justify-between gap-[18px]">
                        <div className="text-gray-500 text-base font-medium ">Re-enter password*</div>
                        <input className="w-[304px] h-11 bg-white focus:outline-none border-1 border-solid border-[#A2A3A3]  rounded-[5px]  focus:border-1 focus:border-emerald-200 px-2" minLength={8} type="password" name="reAdminPassword" value={props.data.reAdminPassword} onChange={props.handleChange} />
                        {props.validationErrors.reAdminPassword && (
                            <div className="error">{props.validationErrors.reAdminPassword}</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrgAdminSetup;