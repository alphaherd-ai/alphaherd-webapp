"use client"
import Image from "next/image"

import continuebutton from "../../assets/icons/loginsignup/1. Icons-24.svg"
import closeicon from "../../assets/icons/inventory/closeIcon.svg";
import updatelogo from "../../assets/icons/loginsignup/update_logo.png";


import React, { useState, useEffect } from 'react';
type PopupProps = {
    onClose: () => void;
}

const Login2 = () => {

    return (
        <>
            <div className="w-full h-full flex-1 flex justify-center items-center flex  rounded-[20px]">
                <div className="flex justify-center items-center w-[1016px] h-[720px] bg-white bg-opacity-50 rounded-[30px] border border-solid border-stone-300">
                    <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0 fixed inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
                        <div className="w-[1024px] h-[690px]  p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
                            <div className="self-end items-start gap-6 flex ">
                                <button >
                                    <Image src={closeicon} alt="close"></Image>
                                </button>
                            </div>
                            <div className="flex-col justify-start items-start gap-2 flex">
                                <div className="text-gray-500 text-xl font-medium font-['Satoshi']">New Product</div>
                                <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Add a new product to your inventory</div>
                            </div>
                            <div className="flex items-center gap-[34px] w-full">
                                <div className="w-1/2 flex">
                                    <div className=" justify-start items-center flex pr-[10px]">
                                        <div className="text-gray-500 text-base font-medium font-['Satoshi']">Name</div>
                                    </div>
                                    <div className=" flex-1 h-11 px-4 py-[13px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex">
                                        <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                            <div className="text-neutral-400 text-base font-medium font-['Satoshi']">
                                                <input className="border-0 focus:border-0 h-8" type="number" name="minStock" />
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
                                                <input className="border-0 h-8" type="number" name="maxStock" />
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
                                                <input className="border-0 focus:border-0 select:border-0 h-8" type="number" name="minStock" />
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
                                                <input className="border-0 h-8" type="number" name="maxStock" />
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
                                                <input className="border-0 focus:border-0 h-8" type="number" name="minStock" />
                                            </div>
                                        </div>
                                        <div className="text-right text-gray-500 text-base font-medium font-['Satoshi']"> </div>
                                    </div>
                                </div>

                            </div>
                            <div className="flex items-center gap-[34px] w-full">
                                <div className="w-1/2 flex">
                                    <div className=" justify-start items-center flex pr-[10px]">
                                        <div className="text-gray-500 text-base font-medium font-['Satoshi']">Select State*</div>
                                    </div>
                                    <div className=" flex-1 h-11 px-4 py-[13px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex">
                                        <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                            <div className="text-neutral-400 text-base font-medium font-['Satoshi']">
                                                <input className="border-0 focus:border-0 h-8" type="number" name="minStock" />
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
                                                <input className="border-0 h-8" type="number" name="maxStock" />
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
                                                <textarea className="border-0 focus:border-0 h-[115px] w-full" type="text" />
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
                </div>
            </div>
        </>


    )
}

export default Login2;