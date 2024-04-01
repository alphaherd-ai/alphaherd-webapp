"use client"
import Image from "next/image"

import upload from "../../assets/icons/loginsignup/upload.svg";

import continuebutton from "../../assets/icons/loginsignup/1. Icons-24.svg"


import React, { useState, useEffect } from 'react';

const OrgAdminSetup = (props : any) => {
    return (
        <>
           <div className="w-[1016px] h-[85%] pl-[36px] pt-[40px] pb-[56px] pr-[40px]">
                    <div className="text-gray-500 text-xl font-medium font-['Satoshi']">
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
                                <input className="w-[645px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text" name="adminName" value={props.data.adminName} onChange={props.handleChange}></input>
                            </div>
                            <div className="flex items-center justify-between gap-12">
                                <div className="text-gray-500 text-base font-medium font-['Satoshi']">Email*</div>
                                <input className="w-[645px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text"  name="adminEmail" value={props.data.adminEmail} onChange={props.handleChange}></input>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-[24px] mb-[24px]">
                        <div className="flex items-center justify-between gap-[18px]">
                            <div className="w-[137px] text-gray-500 text-base font-medium font-['Satoshi']">Phone No.</div>
                            <input className="w-[304px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text" minLength={10} maxLength={10}  name="adminPhoneNo" value={props.data.adminPhoneNo} onChange={props.handleChange}></input>
                        </div>
                        <div className="flex items-center justify-between gap-[2px]">
                            <div className="w-[137px] text-gray-500 text-base font-medium font-['Satoshi']">Alt. Phone No.</div>
                            <input className="w-[304px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text" minLength={10} maxLength={10} name="adminAltPhoneNo" value={props.data.adminAltPhoneNo} onChange={props.handleChange}></input>
                        </div>
                    </div>
                    <div className="w-[634px] mt-[50px] text-neutral-400 text-base font-medium font-['Satoshi']">
                        Secure your admin privileges with a strong password
                    </div>
                    <div className="flex items-center justify-between mt-[8px]">
                        <div className="flex items-center justify-between gap-[18px]">
                            <div className="w-[137px] text-gray-500 text-base font-medium font-['Satoshi']">Create password*</div>
                            <input className="w-[304px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text" minLength={8} name="adminPassword" value={props.data.adminPassword} onChange={props.handleChange}></input>
                        </div>
                        <div className="flex items-center justify-between gap-[18px]">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Re-enter password*</div>
                            <input className="w-[304px] h-11 bg-white rounded-[5px] border border-neutral-400" minLength={8} type="text" name="reAdminPassword" value={props.data.reAdminPassword} onChange={props.handleChange}></input>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default OrgAdminSetup;