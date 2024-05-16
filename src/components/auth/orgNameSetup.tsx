"use client"
import Image from "next/image"

import placeicon from "../../assets/icons/loginsignup/Placeholder logo.png"
import placelogo from "../../assets/icons/loginsignup/Group 2749.svg"


import React, { useState, useEffect } from 'react';

const OrgNameSetup = (props : any) => {
    return (
        <div className="flex justify-center items-center h-full">
        <div className="flex w-[32.55rem] h-full">
                        <Image src={placeicon} alt="placeholder" className="w-full h-full" />
                    </div>
                    <div className="flex flex-col justify-center items-start w-6/12 h-full">
                        <div className="flex items-center gap-[11.35px]">
                            <div className="w-[35.05px] h-[35.06px] relative">
                                <Image src={placelogo} alt="logo" />
                            </div>
                            <div className="text-center text-zinc-800 text-[32.73px] font-medium ">Alphaherd</div>
                        </div>
                        <div className="w-[356px] text-neutral-500 text-xl font-medium ">
                            Supercharge your veterinary practice and lead the pack!
                        </div>
                        <div className="text-gray-500 text-base font-medium  mt-16">
                            What is the name of your organisation?
                        </div>
                        <div className="w-[353px] h-11 ">
                            <input className="w-full h-full px-2 focus:outline-none border-1 border-solid border-[#A2A3A3]  rounded-[5px]  focus:border-1 focus:border-emerald-200" type="text" name="orgName" value={props.data.orgName} onChange={props.handleChange}/>
                        </div>
                    </div>
            {/* <div className="w-full h-full flex-1 flex justify-center items-center flex  rounded-[20px]">
                <div className="flex justify-center items-center w-[1016px] h-[620px] bg-white bg-opacity-50 rounded-[30px] border border-solid border-stone-300">
                    <div className="flex w-6/12 h-full">
                        <Image src={placeicon} alt="placeholder" className="w-full h-full" />
                    </div>
                    <div className="flex flex-col justify-center items-start w-6/12 h-full">
                        <div className="flex items-center gap-[11.35px]">
                            <div className="w-[34.05px] h-[34.06px] relative">
                                <Image src={placelogo} alt="logo" />
                            </div>
                            <div className="text-center text-zinc-800 text-[39.73px] font-medium ">Alphaherd</div>
                        </div>
                        <div className="w-[356px] text-neutral-500 text-xl font-medium ">
                            Supercharge your veterinary practice and lead the pack!
                        </div>
                        <div className="text-gray-500 text-base font-medium  mt-16">
                            What is the name of your organisation?
                        </div>
                        <div className="w-[353px] h-11 bg-white rounded-[5px] border border-neutral-400">
                            <input className="w-full h-full" type="text" />
                        </div>
                    </div>
                </div>
            </div> */}
        </div>


    )
}

export default OrgNameSetup;