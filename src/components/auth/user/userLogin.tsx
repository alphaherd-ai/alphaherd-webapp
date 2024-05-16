"use client"
import Image from "next/image"

import upload from "../../../assets/icons/loginsignup/upload.svg";

import continuebutton from "../../assets/icons/loginsignup/1. Icons-24.svg"


import React, { useState, useEffect } from 'react';

export const UserAccountSetup = (props : any) => {
    return (
        <>
           <div className="w-[1016px] h-[86vh] pl-[36px] pt-[40px] pb-[56px] pr-[40px]">
                    <div className="text-gray-500 text-xl font-medium font-['Satoshi']">
                        User Account Setup
                    </div>
                    <div className="w-[936px] h-28 justify-between items-center gap-6 flex mt-[40px]">
                        <div className="w-28 h-28 bg-gray-200 rounded-full border border-neutral-400 flex justify-center items-center">
                            <Image className="w-8 h-8 relative flex-col justify-between items-center flex" src={upload} alt="upload" />
                        </div>
                        <div className="flex flex-col items-center justify-between gap-[18px]">
                            <div className="flex items-center justify-between gap-12">
                                <div className="text-gray-500 text-base font-medium font-['Satoshi']">Name*</div>
                                <input className="w-[645px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text" name="name" value={props.data.name} onChange={props.handleChange}></input>
                            </div>
                            <div className="flex items-center justify-between gap-12">
                                <div className="text-gray-500 text-base font-medium font-['Satoshi']">Email*</div>
                                <input className="w-[645px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text"  name="email" value={props.data.email} onChange={props.handleChange}></input>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-[24px] mb-[24px]">
                        <div className="flex items-center justify-between gap-[18px]">
                            <div className="w-[137px] text-gray-500 text-base font-medium font-['Satoshi']">Phone No.</div>
                            <input className="w-[304px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text" minLength={10} maxLength={10}  name="phoneNo" value={props.data.phoneNo} onChange={props.handleChange}></input>
                        </div>
                        <div className="flex items-center justify-between gap-[2px]">
                            <div className="w-[137px] text-gray-500 text-base font-medium font-['Satoshi']">Alt. Phone No.</div>
                            <input className="w-[304px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text" minLength={10} maxLength={10} name="altPhoneNo" value={props.data.altPhoneNo} onChange={props.handleChange}></input>
                        </div>
                    </div>
                    <div className="w-[634px] mt-[50px] text-neutral-400 text-base font-medium font-['Satoshi']">
                        Secure your admin privileges with a strong password
                    </div>
                    <div className="flex items-center justify-between mt-[8px]">
                        <div className="flex items-center justify-between gap-[18px]">
                            <div className="w-[137px] text-gray-500 text-base font-medium font-['Satoshi']">Create password*</div>
                            <input className="w-[304px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text" minLength={8} name="password" value={props.data.password} onChange={props.handleChange}></input>
                        </div>
                        <div className="flex items-center justify-between gap-[18px]">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Re-enter password*</div>
                            <input className="w-[304px] h-11 bg-white rounded-[5px] border border-neutral-400" minLength={8} type="text" name="rePassword" value={props.data.rePassword} onChange={props.handleChange}></input>
                        </div>
                    </div>
                </div>
        </>
    )
}