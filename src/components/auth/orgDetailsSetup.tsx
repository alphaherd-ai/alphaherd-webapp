"use client"
import Image from "next/image"

import continuebutton from "../../assets/icons/loginsignup/1. Icons-24.svg"
import closeicon from "../../assets/icons/inventory/closeIcon.svg";
import updatelogo from "../../assets/icons/loginsignup/update_logo.png";


import React, { useState, useEffect } from 'react';
type PopupProps = {
    onClose: () => void;
}

const OrgDetailsSetup = (props: any) => {
    return (
        <>
            <div className="w-[1024px] h-[85%] p-8 rounded-[20px] flex-col justify-start items-start gap-6 flex">
                <div className="flex-col justify-start items-start gap-2 flex">
                    <div className="text-gray-500 text-xl font-medium font-['Satoshi']">My Organisation</div>
                    <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Enter you organisation details</div>
                </div>
                <div className="flex items-center gap-[34px] w-full">
                    <div className="w-1/2 flex">
                        <div className=" justify-start items-center flex pr-[10px]">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Name</div>
                        </div>
                        <div className=" flex-1 h-11 px-4 py-[13px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex">
                            <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                <div className="text-neutral-400 text-base font-medium font-['Satoshi']">
                                    <input className="border-0 focus:border-0 h-8" type="text" name="orgName" disabled={true} value={props.data.orgName}/>
                                </div>
                            </div>
                            <div className="text-right text-gray-500 text-base font-medium font-['Satoshi']"> </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex">
                        <div className="pr-[10px] justify-start items-center flex">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">GSTIN No</div>
                        </div>
                        <div className="flex-1 h-11 px-4 py-[13px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex">
                            <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                <div className="text-neutral-400 text-base font-medium font-['Satoshi'] w-full">
                                    <input className="border-0 h-8" type="number" name="gstNo" value={props.data.gstNo} onChange={props.handleChange}/>
                                </div>
                            </div>
                            <div className="text-right text-gray-500 text-base font-medium font-['Satoshi']"> </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-[34px] w-full">
                    <div className="w-1/2 flex">
                        <div className=" justify-start items-center flex pr-[10px]">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Phone No.</div>
                        </div>
                        <div className=" py-[13px] px-2 border-solid h-full border-0 border-r border-neutral-400 bg-white  border border-neutral-400">+91</div>
                        <div className=" flex-1 h-11 px-4 py-[13px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex">
                            <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">

                                <div className="py-[13px] text-neutral-400 text-base font-medium font-['Satoshi']">
                                    <input className="border-0 focus:border-0 select:border-0 h-8" type="number" minLength={10} maxLength={10}  name="phoneNo" value={props.data.phoneNo} onChange={props.handleChange}/>
                                </div>
                            </div>
                            <div className="text-right text-gray-500 text-base font-medium font-['Satoshi']"> </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex">
                        <div className="pr-[10px] justify-start items-center flex">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Company Email</div>
                        </div>
                        <div className="flex-1 h-11 px-4 py-[13px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex">
                            <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                <div className="text-neutral-400 text-base font-medium font-['Satoshi'] w-full">
                                    <input className="border-0 h-8" type="text" name="orgEmail" value={props.data.orgEmail} onChange={props.handleChange}/>
                                </div>
                            </div>
                            <div className="text-right text-gray-500 text-base font-medium font-['Satoshi']"> </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-[34px] w-full">
                    <div className="w-full flex">
                        <div className=" justify-start items-center flex pr-[10px]">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Business Address</div>
                        </div>
                        <div className=" flex-1 h-11 px-4 py-[13px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex">
                            <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                <div className="text-neutral-400 text-base font-medium font-['Satoshi']">
                                    <input className="border-0 focus:border-0 h-8" type="text" name="address" value={props.data.address} onChange={props.handleChange} />
                                </div>
                            </div>
                            <div className="text-right text-gray-500 text-base font-medium font-['Satoshi']"> </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-[34px] w-full">
                    <div className="w-1/2 flex">
                        <div className=" justify-start items-center flex pr-[10px]">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">State*</div>
                        </div>
                        <div className=" flex-1 h-11 px-4 py-[13px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex">
                            <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                <div className="text-neutral-400 text-base font-medium font-['Satoshi']">
                                    <input className="border-0 focus:border-0 h-8" type="text" name="state" value={props.data.state} onChange={props.handleChange}/>
                                </div>
                            </div>
                            <div className="text-right text-gray-500 text-base font-medium font-['Satoshi']"> </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex">
                        <div className="pr-[10px] justify-start items-center flex">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Pincode</div>
                        </div>
                        <div className="flex-1 h-11 px-4 py-[13px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex">
                            <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                <div className="text-neutral-400 text-base font-medium font-['Satoshi'] w-full">
                                    <input className="border-0 h-8" type="text" name="pincode" value={props.data.pincode} onChange={props.handleChange}/>
                                </div>
                            </div>
                            <div className="text-right text-gray-500 text-base font-medium font-['Satoshi']"> </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-[34px] w-full">
                    <div className="w-full flex">
                        <div className=" justify-start items-center flex pr-[10px]">
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Descprition</div>
                        </div>
                        <div className=" flex-1  px-4 py-[13px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex">
                            <div className="grow shrink basis-0  justify-start items-center gap-2 flex">
                                <div className="text-neutral-400 text-base font-medium font-['Satoshi'] w-full">
                                    <input className="border-0 focus:border-0 h-[50px] w-full" type="text" name="description" value={props.data.description} onChange={props.handleChange}/>
                                </div>
                            </div>
                            <div className="text-right text-gray-500 text-base font-medium font-['Satoshi']"> </div>
                        </div>
                    </div>
                </div>


                <div className="w-full gap-6 flex justify-between items-center">
                    <div className="w-[184px] h-11 px-6 py-2.5 rounded-[5px] border border-dotted border-gray-500 justify-start items-center gap-4 inline-flex">
                        <div className="w-6 h-6 relative">
                            <div className="w-6 h-6 left-0 top-0 absolute bg-zinc-300">
                                <Image src={updatelogo} alt="button" />
                            </div>
                        </div>
                        <div className="justify-start items-center gap-4 flex">
                            <div className="text-gray-500 text-base font-bold font-['Satoshi']">Upload Logo</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrgDetailsSetup;