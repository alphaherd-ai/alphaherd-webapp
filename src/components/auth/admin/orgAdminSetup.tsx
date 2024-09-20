"use client"
import Image from "next/image"
import { CldUploadButton, CldUploadWidget } from 'next-cloudinary';
import upload from "../../../assets/icons/loginsignup/upload.svg";
import backBtn from '@/assets/icons/loginsignup/backBtn.svg';
import continuebutton from "../../assets/icons/loginsignup/1. Icons-24.svg"
import eyeicon from "../../../assets/icons/loginsignup/1. Icons-24 (4).svg"

import eyeicon1 from "../../../assets/icons/loginsignup/1. Icons-24 (5).svg"



import React, { useState, useEffect, useRef } from 'react';

const OrgAdminSetup = (props: any, { handleFileUpload }: any) => {

    const [resource, setResource] = useState<any>();

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };







    return (
        <>
            <div className="w-[1016px] h-fit pl-[42px] pt-[40px] pb-[30px] pr-[40px] relative">
                {
                    props.activeTab != 0 && props.activeTab != 1 ? <button
                        className=" bg-inherit rounded-[5px] absolute left-0 top-1 justify-start items-center gap-2 flex border-0 scale-125" disabled={props.activeTab === 0 || props.activeTab === 1 ? true : false}
                        onClick={() => props.setActiveTab((prev: number) => prev - 1)}>
                        <div className="h-[42px] px-4  rounded-[5px] justify-start items-center gap-2 flex ">
                            <div className="w-6 h-6.5 relative">
                                <Image src={backBtn} alt="button" />
                            </div>



                        </div>
                    </button> : <div></div>
                }
                <div className="text-gray-500 text-xl font-medium ">
                    Admin Account Setup
                </div>
                <div className="w-[634px] text-textGrey2 text-base font-medium  mt-[8px]">
                    These details will be used to set up the admin account. As the admin, you will have access to all the pages of Alphaherd along with the ability to control the access that other users in your organization have.
                </div>
                <div className="w-[936px] h-28 justify-between items-center gap-6 flex mt-[40px]">

                    <div className="w-28 h-28 bg-gray-200 rounded-full border border-neutral-400 flex justify-center items-center cursor-pointer">
                        <CldUploadButton
                            className="rounded-full w-28 h-28 border-none"
                            options={{
                                sources: ['local', 'url'],
                                multiple: false,
                                maxFiles: 1
                            }}
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                            onSuccess={(result, { widget }) => {
                                //@ts-ignore
                                setResource(result?.info.secure_url);
                                console.log(result) // { public_id, secure_url, etc }
                                props.handlePicChange(result.info, "adminPicUrl")
                                widget.close();
                            }}
                        >
                            {!resource ?
                                <Image className=" w-8 h-8" src={upload} width={100} height={100} alt="upload" />
                                :
                                <Image className="w-28 h-28 rounded-full" src={resource} alt="Uploaded image" width={100} height={100} />
                            }

                        </CldUploadButton>


                    </div>



                    <div className="flex flex-col items-center justify-between gap-[18px]">
                        <div className="flex items-center justify-between gap-12">
                            <div className="text-gray-500 text-base font-medium ">Name*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
                                <input className="w-[645px] h-11 bg-white text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="adminName" value={props.data.adminName} onChange={props.handleChange} />
                                {props.validationErrors.adminName && (
                                    <div className="text-[red] error">{props.validationErrors.adminName}</div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-12">
                            <div className="text-gray-500 text-base font-medium ">Email*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">

                                <input className="w-[645px] h-11 bg-white text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="adminEmail" value={props.data.adminEmail} onChange={props.handleChange} placeholder="example@gmail.com" />
                                {props.validationErrors.adminEmail && (
                                    <div className="text-[red] error">{props.validationErrors.adminEmail}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-[24px] mb-[24px]">
                    <div className="flex items-center justify-between gap-[18px]">
                        <div className="w-[137px] text-gray-500 text-base font-medium ">Phone No.</div>
                        <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">

                            <input className="w-[304px] h-11 bg-white  text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" minLength={10} maxLength={10} name="adminPhoneNo" value={props.data.adminPhoneNo} onChange={props.handleChange} />
                            {props.validationErrors.adminPhoneNo && (
                                <div className="text-[red] error">{props.validationErrors.adminPhoneNo}</div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-[2px]">
                        <div className="w-[137px] text-gray-500 text-base font-medium ">Alt. Phone No.</div>
                        <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">

                            <input className="w-[304px] h-11 bg-white  text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" minLength={10} maxLength={10} name="adminAltPhoneNo" value={props.data.adminAltPhoneNo} onChange={props.handleChange} />
                            {props.validationErrors.adminAltPhoneNo && (
                                <div className="text-[red] error">{props.validationErrors.adminAltPhoneNo}</div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-[634px] mt-[70px] text-textGrey2 text-base font-medium mb-[20px]">
                    Secure your admin privileges with a strong password
                </div>
                <div className="flex items-center justify-between mt-[8px]">
                    <div className="flex items-center justify-between gap-[18px]">
                        <div className="w-[137px] text-gray-500 text-base font-medium ">Create password*</div>
                        <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">

                            <div className="relative">
                                <input className="w-[304px] h-11 bg-white text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type={showPassword ? "text" : "password"} minLength={8} name="adminPassword" value={props.data.adminPassword} onChange={props.handleChange} />
                                {showPassword ? (<Image
                                    src={eyeicon1}
                                    alt="Toggle Password Visibility"
                                    className="absolute top-[50%] right-3 transform -translate-y-1/2 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                />) : (
                                    <Image
                                        src={eyeicon}
                                        alt="Toggle Password Visibility"
                                        className="absolute top-[50%] right-3 transform -translate-y-1/2 cursor-pointer"
                                        onClick={togglePasswordVisibility} />)}
                            </div>
                            {props.validationErrors.adminPassword && (
                                <div className="text-[red] error w-[304px]">{props.validationErrors.adminPassword}</div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-[18px]">
                        <div className="text-gray-500 text-base font-medium ">Re-enter password*</div>
                        <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">

                            <div className="relative">
                                <input className="w-[304px] h-11 bg-white text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" minLength={8} type={showPassword1 ? "text" : "password"} name="reAdminPassword" value={props.data.reAdminPassword} onChange={props.handleChange} />
                                {showPassword1 ? (<Image
                                    src={eyeicon1}
                                    alt="Toggle Password Visibility"
                                    className="absolute top-[50%] right-3 transform -translate-y-1/2 cursor-pointer"
                                    onClick={togglePasswordVisibility1}
                                />) : (
                                    <Image
                                        src={eyeicon}
                                        alt="Toggle Password Visibility"
                                        className="absolute top-[50%] right-3 transform -translate-y-1/2 cursor-pointer"
                                        onClick={togglePasswordVisibility1} />)}
                            </div>
                            {props.validationErrors.reAdminPassword && (
                                <div className="text-[red] error w-[304px]">{props.validationErrors.reAdminPassword}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrgAdminSetup;