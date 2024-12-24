"use client"
import Image from "next/image"
import { CldUploadButton, CldUploadWidget } from 'next-cloudinary';
import upload from "../../../assets/icons/loginsignup/upload.svg";
import backBtn from '@/assets/icons/loginsignup/backBtn.svg';
import continuebutton from "../../assets/icons/loginsignup/1. Icons-24.svg"
import eyeicon from "../../../assets/icons/loginsignup/1. Icons-24 (4).svg"
import eyeicon1 from "../../../assets/icons/loginsignup/1. Icons-24 (5).svg"
import React, { useState, useEffect, useRef } from 'react';
export const UserAccountSetup = (props: any) => {
    console.log(props.data)

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
                <div className="text-gray-500 text-xl font-medium ">
                    Account Setup
                </div>
                <div className="w-[634px] text-textGrey2 text-base font-medium  mt-[8px]">
                    These details will be used to set up your account.
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
                                props.handlePicChange(result.info, "imageUrl")
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
                                <input className="w-[645px] h-11 bg-white text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="name" value={props.data.name} onChange={props.handleChange} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-12">
                            <div className="text-gray-500 text-base font-medium ">Email*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
                                <input className="w-[645px] h-11 bg-white text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="email" value={props.data.email} readOnly />
                                {props.validationErrors.email && (
                                    <div className="text-[red] error">{props.validationErrors.email}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-[24px] mb-[24px]">
                    <div className="flex items-center justify-between gap-[18px]">
                        <div className="w-[137px] text-gray-500 text-base font-medium ">Phone No.</div>
                        <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">

                            <input className="w-[304px] h-11 bg-white  text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" minLength={10} maxLength={10} name="phoneNo" value={props.data.phoneNo} onChange={props.handleChange} />
                            {props.validationErrors.phoneNo && (
                                <div className="text-[red] error">{props.validationErrors.phoneNo}</div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-[2px]">
                        <div className="w-[137px] text-gray-500 text-base font-medium ">Alt. Phone No.</div>
                        <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">

                            <input className="w-[304px] h-11 bg-white  text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" minLength={10} maxLength={10} name="altPhoneNo" value={props.data.altPhoneNo} onChange={props.handleChange} />
                            {props.validationErrors.altPhoneNo && (
                                <div className="text-[red] error">{props.validationErrors.altPhoneNo}</div>
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
                                <input className="w-[304px] h-11 bg-white text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" type={showPassword ? "text" : "password"} minLength={4} name="password" value={props.data.password} onChange={props.handleChange} />
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
                            {props.validationErrors.password && (
                                <div className="text-[red] error w-[304px]">{props.validationErrors.password}</div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-[18px]">
                        <div className="text-gray-500 text-base font-medium ">Re-enter password*</div>
                        <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">

                            <div className="relative">
                                <input className="w-[304px] h-11 bg-white text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-borderGrey rounded-[5px] focus:border focus:border-[#35BEB1]" minLength={8} type={showPassword1 ? "text" : "password"} name="rePassword" value={props.data.rePassword} onChange={props.handleChange} />
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
                            {props.validationErrors.rePassword && (
                                <div className="text-[red] error w-[304px]">{props.validationErrors.rePassword}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}