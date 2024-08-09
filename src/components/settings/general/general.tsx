"use client"
import Image from "next/image"
import Select from 'react-select';
import { Popover, PopoverTrigger, PopoverContent, Button, button } from "@nextui-org/react";
import orgicon from "../../../assets/icons/settings/orgicon.svg"
import settingicon from "../../../assets/icons/settings/settingicon.svg"
import previewicon from "../../../assets/icons/settings/previewicon.svg"
import lefticon from "../../../assets/icons/settings/left_icon.svg"
import downicon from "../../../assets/icons/settings/downicon.svg"
import smsicon from "../../../assets/icons/settings/smsicon.svg"
import whatshapicon from "../../../assets/icons/settings/whatshapicon.svg"
import mailicon from "../../../assets/icons/settings/mailicon.svg"
import tickicon from "../../../assets/icons/settings/tickicon.svg"
import crossicon from "../../../assets/icons/settings/crossicon.svg"
import addicon from "../../../assets/icons/settings/addicon.svg"
import cashicon from "../../../assets/icons/settings/cashicon.svg"
import cardicon from "../../../assets/icons/settings/cardicon.svg"
import netbankingicon from "../../../assets/icons/settings/netbankingicon.svg"
import upiicon from "../../../assets/icons/settings/upiicon.svg"
import editicon from "../../../assets/icons/settings/editicon.svg"
import deleteicon from "../../../assets/icons/settings/deleteicon.svg"
import React, { useState, useEffect } from 'react';
import AddSpeciesPopup from "../generalSettingPopup/addSpeciesPopup";

const GeneralSettings = () => {

    
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup1, setShowPopup1] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }
    const togglePopup1 = () => {
        setShowPopup1(!showPopup1);
    }
    const togglePopup2 = () => {
        setShowPopup2(!showPopup2);
    }


    const reminder = [
        { value: 'Everyday', label: 'Everyday' },
        { value: 'Once a Week', label: 'Once a Week' },
        { value: 'Once a month.', label: 'Once a month' }
    ];

    const [samedayToggle, setSamedayToggle] = useState(true);
    const [threedayToggle, setThreedayToggle] = useState(false);
    const [oneWeekToggle, setOneWeekToggle] = useState(false);
    const [smsToggle, setSmsToggle] = useState(true);
    const [mailToggle, setMailToggle] = useState(false);
    const [whatsappToggle, setWhatsappToggle] = useState(false);
    const [taxIncToggle, setTaxIncToggle] = useState(true);
    const [taxExcToggle, settaxExcToggle] = useState(false);

    const taxIncToggleHandler = () => {
        if (!taxIncToggle) {
            setTaxIncToggle(!taxIncToggle);
            settaxExcToggle(!taxExcToggle);
        }
    };

    const taxExcToggleHandler = () => {
        if (!taxExcToggle) {
            setTaxIncToggle(!taxIncToggle);
            settaxExcToggle(!taxExcToggle);
        }
    };


    const sameDayToggleHandler = () => {
        if (!samedayToggle) {
            setSamedayToggle(!samedayToggle);
            if (threedayToggle) {
                setThreedayToggle(!threedayToggle);
            }
            if (oneWeekToggle) {
                setOneWeekToggle(!oneWeekToggle);
            }
        }
    };

    const threeDayToggleHandler = () => {
        if (!threedayToggle) {
            setThreedayToggle(!threedayToggle);
            if (samedayToggle) {
                setSamedayToggle(!samedayToggle);
            }
            if (oneWeekToggle) {
                setOneWeekToggle(!oneWeekToggle);
            }
        }
    };

    const weekToggleHandler = () => {
        if (!oneWeekToggle) {
            setOneWeekToggle(!oneWeekToggle);
            if (samedayToggle) {
                setSamedayToggle(!samedayToggle);
            }
            if (threedayToggle) {
                setThreedayToggle(!threedayToggle);
            }
        }
    };

    const smsToggleHandler = () => {
        setSmsToggle(!smsToggle);
    };

    const mailToggleHandler = () => {
        setMailToggle(!mailToggle);
    };

    const whatsappToggleHandler = () => {
        setWhatsappToggle(!whatsappToggle);
    };

    return (
    <>
        <div className="w-full h-full mt-4">
            <div className="w-full flex-col justify-start items-start gap-[20px] flex">
                <div className="w-full p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 flex-col justify-center items-start gap-6 flex text-gray-500 text-xl font-medium ">
                    General Settings
                </div>
                <div className="w-full px-4 py-5 bg-gray-100 border border-neutral-400 flex-col justify-start items-start gap-4 flex">
                    <div className="w-full px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                        <div className="w-full flex justify-between items-start">
                            <div>
                                <div className="text-gray-500 text-base font-bold ">Client Communication Preferences</div>
                                <div className="text-neutral-400 text-base font-medium ">Edit settings related to client communication</div>
                            </div>
                            
                        </div>
                        
                        <div>
                            <div className="text-gray-500 text-base font-medium ">Automatically send invoices and receipts to customer via:</div>
                            <div className="flex gap-2">
                                {smsToggle && (<button onClick={smsToggleHandler}><div className="w-[73px] h-7 p-2 bg-teal-400 rounded-[5px] border border-white justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={smsicon} alt="sms" />
                                    <div className="text-white text-sm font-bold ">SMS</div>
                                </div></button>)}
                                {!smsToggle && (<button onClick={smsToggleHandler}><div className="w-[67px] h-7 p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={smsicon} alt="sms" />
                                    <div className="text-neutral-400 text-sm font-bold ">SMS</div>
                                </div></button>)}
                                {mailToggle && (<button onClick={mailToggleHandler}><div className="w-[73px] h-7 p-2 bg-teal-400 rounded-[5px] border border-white justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={mailicon} alt="sms" />
                                    <div className="text-white text-sm font-bold ">Mail</div>
                                </div></button>)}
                                {!mailToggle && (<button onClick={mailToggleHandler}><div className="w-[73px] h-7 p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={mailicon} alt="sms" />
                                    <div className="text-neutral-400 text-sm font-bold ">Mail</div>
                                </div></button>)}
                                {whatsappToggle && (<button onClick={whatsappToggleHandler}><div className="w-[111px] h-7 p-2 bg-teal-400 rounded-[5px] border border-white justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={whatshapicon} alt="sms" />
                                    <div className="text-white text-sm font-bold ">WhatsApp</div>
                                </div></button>)}
                                {!whatsappToggle && (<button onClick={whatsappToggleHandler}><div className="w-[111px] h-7 p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={whatshapicon} alt="sms" />
                                    <div className="text-neutral-400 text-sm font-bold ">WhatsApp</div>
                                </div></button>)}
                            </div>
                        </div>
                        
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-[43.5rem] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Payment methods</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your payment methods</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium ">Add Payment Method</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Payment method</div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white  border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={cashicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">Cash</div>
                                        </div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white  border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={cardicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">Card</div>
                                        </div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white  border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={netbankingicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">Net Banking</div>
                                        </div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white  border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={upiicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">UPI</div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[43.5rem] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Species</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your payment methods</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium cursor-pointer" onClick={togglePopup}>Add Species Method</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Payment method</div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white  border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={cashicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">Cash</div>
                                        </div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white   border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={cardicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">Card</div>
                                        </div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white   border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={netbankingicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">Net Banking</div>
                                        </div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white   border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={upiicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">UPI</div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-[43.5rem] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Breeds</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your payment methods</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium ">Add Payment Method</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Payment method</div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white   border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={cashicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">Cash</div>
                                        </div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white   border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={cardicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">Card</div>
                                        </div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white   border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={netbankingicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">Net Banking</div>
                                        </div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white   border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={upiicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">UPI</div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[43.5rem] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Species</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your payment methods</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium ">Add Payment Method</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Payment method</div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white   border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={cashicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">Cash</div>
                                        </div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white   border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={cardicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">Card</div>
                                        </div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white   border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={netbankingicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">Net Banking</div>
                                        </div>
                                        
                                    </div>
                                    <div className='flex  items-center w-full  box-border py-4 bg-white   border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={upiicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">UPI</div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                </div>
            </div>
        </div >


        {showPopup && <AddSpeciesPopup onClose={togglePopup} />}
    </>
    )
}

export default GeneralSettings