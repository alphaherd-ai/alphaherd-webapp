import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import updatelogo from "../../../assets/icons/loginsignup/update_logo.png";
import React, { useState } from 'react';
import upload from "../../../assets/icons/loginsignup/upload.svg"
import { Textarea } from "@nextui-org/react";


const OrgDetailsSetup = (props: any) => {

    
    const [focused, setFocused] = useState(false);
    const [focused1, setFocused1] = useState(false);
    const [focused2, setFocused2] = useState(false);
    const [focused3, setFocused3] = useState(false);
    const [focused4, setFocused4] = useState(false);
    const [focused5, setFocused5] = useState(false);
 
    
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
                            <input type="text" className="text-neutral-400 text-base font-medium  h-full w-full px-2 border-1 border-solid border-[#A2A3A3]  rounded-[5px]" id="orgName" name="orgName" disabled={true} value={props.data.orgName}/>
                        </div>
                    </div>
                    <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                        <div className="w-[136px] text-gray-500 text-base font-medium ">Branch Name</div>
                        <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-start gap-2 inline-flex">
                        <input type="text" className="text-neutral-400 text-base font-medium  h-full w-full px-2 border-1 border-solid border-[#A2A3A3]  rounded-[5px]" id="branch" name="branch"  value={props.data.branch} onChange={props.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="self-stretch justify-start items-start gap-10 inline-flex">
                <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
    <div className="w-[136px] text-gray-500 text-base font-medium">GSTIN Number*</div>
    <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
        <input 
            type="number" 
            className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border-1 border-solid border-[#A2A3A3] rounded-[5px] focus:border-1 focus:border-emerald-200" 
            id="gstNo" 
            name="gstNo" 
            onChange={props.handleChange} 
            onFocus={() => setFocused(true)} 
            value={props.data.gstNo}
        />
        {focused && props.data.gstNo.length <= 1 && (
            <div className="text-red-500 text-sm">GST No. is required.</div>
        )}
    </div>
</div>


<div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
    <div className="w-[136px] text-gray-500 text-base font-medium">Phone Number*</div>
    <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
        <input 
            type="number" 
            className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border-1 border-solid border-[#A2A3A3] rounded-[5px] focus:border-1 focus:border-emerald-200" 
            id="phoneNo" 
            name="phoneNo" 
            onChange={props.handleChange} 
            onFocus={() => setFocused1(true)} 
            value={props.data.phoneNo}
        />
        {focused1 && props.data.phoneNo.length <= 1 && (
            <div className="text-red-500 text-sm">Phone Number is required.</div>
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
            className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border-1 border-solid border-[#A2A3A3] rounded-[5px] focus:border-1 focus:border-emerald-200" 
            id="orgEmail" 
            name="orgEmail" 
            onChange={props.handleChange} 
            onFocus={() => setFocused2(true)} 
            value={props.data.orgEmail}
        />
        {focused2 && props.data.orgEmail.length <= 1 && (
            <div className="text-red-500 text-sm">Email is required.</div>
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
            className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border-1 border-solid border-[#A2A3A3] rounded-[5px] focus:border-1 focus:border-emerald-200" 
            id="address" 
            name="address" 
            onChange={props.handleChange} 
            onFocus={() => setFocused3(true)} 
            value={props.data.address}
        />
        {focused3 && props.data.address.length <= 1 && (
            <div className="text-red-500 text-sm">Address is required.</div>
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
            className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border-1 border-solid border-[#A2A3A3] rounded-[5px] focus:border-1 focus:border-emerald-200" 
            id="state" 
            name="state" 
            onChange={props.handleChange} 
            onFocus={() => setFocused4(true)} 
            value={props.data.state}
        />
        {focused4 && props.data.state.length <= 1 && (
            <div className="text-red-500 text-sm">State is required.</div>
        )}
    </div>
</div>
<div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
    <div className="w-[136px] text-gray-500 text-base font-medium">Pincode*</div>
    <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
        <input 
            type="number" 
            className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border-1 border-solid border-[#A2A3A3] rounded-[5px] focus:border-1 focus:border-emerald-200" 
            id="pincode" 
            name="pincode" 
            onChange={props.handleChange} 
            onFocus={() => setFocused5(true)} 
            value={props.data.pincode}
        />
        {focused5 && props.data.pincode.length <= 1 && (
            <div className="text-red-500 text-sm">Pincode is required.</div>
        )}
    </div>
</div>
                </div>
                <div className="self-stretch h-[92px] justify-start items-start gap-10 inline-flex">
                    <div className="grow shrink basis-0 h-[92px] self-stretch justify-start items-start gap-4 flex">
                        <div className="w-[136px] text-gray-500 text-base font-medium ">Description</div>
                            <textarea className="px-2 py-2 w-full h-full ml-6 text-neutral-400 text-base focus:outline-none border-2 border-solid border-[#A2A3A3]  rounded-[5px]  focus:border-1 focus:border-emerald-200" id="description" name="description" value={props.data.description} onChange={props.handleChange}/>
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
