"use client"

import SelectDropdown from 'react-native-select-dropdown'
import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"
import drafticon from "../../../../../assets/icons/finance/draft.svg"
import checkicon from "../../../../../assets/icons/finance/check.svg"
import React, { useState, useEffect } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"

import Link from "next/link"
import Image from "next/image"


const ExistingsalesBottomBar = ({existingSalesData}) => {
  

    console.log("This is existing",existingSalesData)
    const sendSMS = async () => {
        try {   
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/sms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: "+917637834918",
                   
                }),
            });
            console.log('SMS sent successfully:', response);
        } catch (error) {
            console.error('Error while sending message', error);
        } 
    };

    const sendWhatsapp = async () => {
        try {   
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/whatsapp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: "+917637834918",
                   
                }),
            });
            console.log('Whatsapp Message sent successfully:', response);
        } catch (error) {
            console.error('Error while sending message', error);
        } 
    };
    
    const sendEmail = ()=>{
        try {   
            const response = fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/share/email`, {
                method: 'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body: JSON.stringify({
                    email:'hembramshristi07@gmail.com'
                })
            });
            console.log('Email sent successfully:', response);
        } catch (error) {
            console.error('Error while saving data:', error);
        } 
    }


    return (
        <>


<div className="flex justify-between items-center w-full  box-border  bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 py-4 rounded-b-lg">
                            <div className="flex justify-between items-center gap-4 pl-4">
                                <button onClick={() => sendSMS()} className="p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={shareicon} alt="share"></Image>
                                    <div>Share in sms</div>
                                </button>
                                <button onClick={() => sendWhatsapp()} className="p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={shareicon} alt="share"></Image>
                                    <div>Share in WA</div>
                                </button>
                                <button onClick={sendEmail} className="p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={shareicon} alt="share"></Image>
                                    <div>Share in Email</div>
                                </button>
                            </div>
                            <div className="flex justify-between items-center gap-4 pr-4">
                            <Link href={{pathname:'newsalesreturn',query:{id:existingSalesData?.id}}} style={{textDecoration:'none',color:'white'}}>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                    <Image src={checkicon} alt="check"></Image>
                                    <div>Convert to Sales Return</div>
                                </div>
                                </Link>
                            </div>
                        </div>
    
          
        </>

    )
}

export default ExistingsalesBottomBar;
