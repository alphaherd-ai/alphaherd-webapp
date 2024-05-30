import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import updatelogo from "../../../assets/icons/loginsignup/update_logo.png";
import React, { useState } from 'react';
import upload from "../../../assets/icons/loginsignup/upload.svg"
import { Textarea } from "@nextui-org/react";


const OrgDetailsSetup = (props: any) => {


    return (
        <div className="w-[1016px] h-[759px] p-10 bg-gray-100 rounded-[30px] border border-stone-300 backdrop-blur-[190.90px] justify-center items-center inline-flex">
            <div className="grow shrink basis-0 self-stretch flex-col justify-start items-end gap-10 inline-flex">
                <div className="flex-col justify-start items-start gap-6 flex">
                    <div className="w-[940px] justify-start items-start gap-6 inline-flex">
                    </div>
                    <div className="flex-col justify-start items-start gap-2 flex">
                        <div className="text-gray-500 text-xl font-medium ">My Organisation</div>
                        <div className="text-neutral-400 text-base font-medium ">Enter your organisation details</div>
                    </div>
                </div>
                <div className="self-stretch h-[432px] flex-col justify-start items-start gap-6 flex">
                    <div className="self-stretch justify-start items-start gap-10 inline-flex">
                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium ">Name*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-start gap-2 inline-flex">
                                <input type="text" className="text-neutral-400 text-base font-medium  h-full w-full px-2 border border-solid border-[#A2A3A3]  rounded-[5px]" id="orgName" name="orgName" disabled={true} value={props.data.orgName} />
                            </div>
                        </div>
                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium ">Branch Name</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-start gap-2 inline-flex">
                                <input type="text" className="h-full w-full text-neutral-400 text-base font-medium  px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-[#35BEB1]" id="branch" name="branch" value={props.data.branch} onChange={props.handleChange} />
                                {props.validationErrors.branch && (
                                    <div className="error">{props.validationErrors.branch}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch justify-start items-start gap-10 inline-flex">
                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium">GSTIN Number*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
                                <input
                                    type="number"
                                    className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-[#35BEB1]"
                                    id="gstNo"
                                    name="gstNo"
                                    onChange={props.handleChange}
                                    value={props.data.gstNo}
                                />
                                {props.validationErrors.gstNo && (
                                    <div className="error">{props.validationErrors.gstNo}</div>
                                )}
                            </div>
                        </div>


                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium">Phone Number*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
                                <input
                                    type="number"
                                    className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-[#35BEB1]"
                                    id="phoneNo"
                                    name="phoneNo"
                                    onChange={props.handleChange}
                                    value={props.data.phoneNo}
                                />
                                {props.validationErrors.phoneNo && (
                                    <div className="error">{props.validationErrors.phoneNo}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch justify-start items-start gap-10 inline-flex">
                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium">Company Email*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
                                <input
                                    type="email"
                                    className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-[#35BEB1]"
                                    id="orgEmail"
                                    name="orgEmail"
                                    onChange={props.handleChange}
                                    value={props.data.orgEmail}
                                />
                                {props.validationErrors.orgEmail && (
                                    <div className="error">{props.validationErrors.orgEmail}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch justify-start items-start gap-10 inline-flex">
                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium">Business Address*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
                                <input
                                    type="text"
                                    className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-[#35BEB1]"
                                    id="address"
                                    name="address"
                                    onChange={props.handleChange}
                                    value={props.data.address}
                                />
                                {props.validationErrors.address && (
                                    <div className="error">{props.validationErrors.address}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch justify-start items-start gap-10 inline-flex">
                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium">Select State*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
                                <input
                                    type="text"
                                    className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-[#35BEB1]"
                                    id="state"
                                    name="state"
                                    onChange={props.handleChange}
                                    value={props.data.state}
                                />
                                {props.validationErrors.state && (
                                    <div className="error">{props.validationErrors.state}</div>
                                )}
                            </div>
                        </div>
                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium">Pincode*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
                                <input
                                    type="number"
                                    className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-[#35BEB1]"
                                    id="pincode"
                                    name="pincode"
                                    onChange={props.handleChange}
                                    value={props.data.pincode}
                                />
                                {props.validationErrors.pincode && (
                                    <div className="error">{props.validationErrors.pincode}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch h-[92px] justify-start items-start gap-10 inline-flex">
                        <div className="grow shrink basis-0 h-[92px] self-stretch justify-start items-start gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium ">Description</div>
                            <textarea className="px-2 py-2 w-full h-full ml-6 text-neutral-400 text-base focus:outline-none border border-solid border-[#A2A3A3]  rounded-[5px]  focus:border focus:border-[#35BEB1]" id="description" name="description" value={props.data.description} onChange={props.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="self-stretch justify-start items-center gap-10 inline-flex">
                    <div className="grow shrink basis-0 h-11 justify-start items-start gap-2.5 flex">
                        <div className="px-6 py-2.5 rounded-[5px] border border-gray-500 justify-center items-center gap-4 flex border-dashed">
                            <div className="">
                                <div className="" ><Image src={updatelogo} alt="upload" /></div>
                            </div>
                            <div className="">
                                <div className="text-gray-500 text-base font-bold ">Upload Logo</div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default OrgDetailsSetup;
