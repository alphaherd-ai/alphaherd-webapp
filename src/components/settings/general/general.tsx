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

const GeneralSettings = () => {

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
                <div className="w-full p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 flex-col justify-center items-start gap-6 flex text-gray-500 text-xl font-medium font-['Roboto']">
                    General Settings
                </div>
                <div className="w-full px-4 py-5 bg-gray-100 border border-neutral-400 flex-col justify-start items-start gap-4 flex">
                    <div className="w-full px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                        <div className="w-full flex justify-between items-start">
                            <div>
                                <div className="text-gray-500 text-base font-bold font-['Roboto']">Invoice Preferences</div>
                                <div className="text-neutral-400 text-base font-medium font-['Roboto']">Edit settings related to invoices</div>
                            </div>
                            <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                <Image className="w-6 h-6 relative rounded-[5px]" src={previewicon} alt="preview" />
                                <div className="text-white text-base font-bold font-['Roboto']">Preview Invoice</div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-6 w-full">
                            <div className="flex gap-4 items-start">
                                <input className="mt-1 accent-teal-500" type="checkbox" defaultChecked />
                                <div>
                                    <div className="text-gray-500 text-base font-bold font-['Roboto']">Show tax splitup</div>
                                    <div className="text-neutral-400 text-base font-medium font-['Roboto'] flex">
                                        <div>Split-up of taxes value will be shown on printed invoice</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <input className="mt-1 accent-teal-500" type="checkbox" defaultChecked />
                                <div>
                                    <div className="text-gray-500 text-base font-bold font-['Roboto']">Show Balance Due</div>
                                    <div className="text-neutral-400 text-base font-medium font-['Roboto']">
                                        <div>Balance due amount will be shown on printed invoice </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <input className="mt-1 accent-teal-500" type="checkbox" defaultChecked />
                                <div>
                                    <div className="text-gray-500 text-base font-bold font-['Roboto']">Show Payment Due date</div>
                                    <div className="text-neutral-400 text-base font-medium font-['Roboto'] flex">
                                        <div>Payment due date will be shown on all invoice documents</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <input className="mt-1 accent-teal-500" type="checkbox" defaultChecked />
                                <div>
                                    <div className="text-gray-500 text-base font-bold font-['Roboto'] flex gap-2">
                                        <div>Show last date of return</div>
                                        <div className="text-neutral-400 text-base font-bold font-['Roboto']">Default date of return:</div>
                                        <div className="flex">
                                            <div className="text-teal-500 text-base font-medium font-['Roboto']">7 days after sale</div>
                                            <Image src={downicon} alt="dwn" />
                                        </div>
                                    </div>
                                    <div className="text-neutral-400 text-base font-medium font-['Roboto'] flex">
                                        <div>Last date of return will be shown on all invoice documents</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <input className="mt-1 accent-teal-500" type="checkbox" defaultChecked />
                                <div>
                                    <div className="text-gray-500 text-base font-bold font-['Roboto']">Notes</div>
                                    <div className="text-neutral-400 text-base font-medium font-['Roboto'] flex">
                                        <div>Notes section will be shown on all invoice documents</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <input className="mt-1 accent-teal-500" type="checkbox" defaultChecked />
                                <div>
                                    <div className="text-gray-500 text-base font-bold font-['Roboto']">Auto generate invoice numbers</div>
                                    <div className="text-neutral-400 text-base font-medium font-['Roboto'] flex">
                                        <div>Invoice numbers for all invoices will be auto generated</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <input className="mt-1 accent-teal-500" type="checkbox" defaultChecked />
                                <div>
                                    <div className="text-gray-500 text-base font-bold font-['Roboto']">Footer:</div>
                                    <div className="text-neutral-400 text-base font-medium font-['Roboto'] flex">
                                        <input className="w-[1296px] h-[54px] p-4 rounded-[5px] border border-neutral-400 flex-col justify-start items-start gap-2 inline-flex" type="text" defaultValue={"This is a computer generated statement and requires no signature"} />
                                  
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Automatically send invoices and receipts to customer via:</div>
                            <div className="flex gap-2">
                                {smsToggle && (<button onClick={smsToggleHandler}><div className="w-[73px] h-7 p-2 bg-teal-400 rounded-[5px] border border-white justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={smsicon} alt="sms" />
                                    <div className="text-white text-sm font-bold font-['Roboto']">SMS</div>
                                </div></button>)}
                                {!smsToggle && (<button onClick={smsToggleHandler}><div className="w-[67px] h-7 p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={smsicon} alt="sms" />
                                    <div className="text-neutral-400 text-sm font-bold font-['Roboto']">SMS</div>
                                </div></button>)}
                                {mailToggle && (<button onClick={mailToggleHandler}><div className="w-[73px] h-7 p-2 bg-teal-400 rounded-[5px] border border-white justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={mailicon} alt="sms" />
                                    <div className="text-white text-sm font-bold font-['Roboto']">Mail</div>
                                </div></button>)}
                                {!mailToggle && (<button onClick={mailToggleHandler}><div className="w-[73px] h-7 p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={mailicon} alt="sms" />
                                    <div className="text-neutral-400 text-sm font-bold font-['Roboto']">Mail</div>
                                </div></button>)}
                                {whatsappToggle && (<button onClick={whatsappToggleHandler}><div className="w-[111px] h-7 p-2 bg-teal-400 rounded-[5px] border border-white justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={whatshapicon} alt="sms" />
                                    <div className="text-white text-sm font-bold font-['Roboto']">WhatsApp</div>
                                </div></button>)}
                                {!whatsappToggle && (<button onClick={whatsappToggleHandler}><div className="w-[111px] h-7 p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={whatshapicon} alt="sms" />
                                    <div className="text-neutral-400 text-sm font-bold font-['Roboto']">WhatsApp</div>
                                </div></button>)}
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-500 text-base font-medium font-['Satoshi']">Select your default taxation format:</div>
                            <div className="flex gap-2">
                                {taxIncToggle && (<button onClick={taxIncToggleHandler}><div className="h-7 p-2 bg-teal-400 rounded-[5px] border border-white justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={tickicon} alt="sms" />
                                    <div className="text-white text-sm font-bold font-['Roboto']">Tax Inclusive</div>
                                </div></button>)}
                                {!taxIncToggle && (<button onClick={taxIncToggleHandler}><div className="h-7 p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={tickicon} alt="sms" />
                                    <div className="text-neutral-400 text-sm font-bold font-['Roboto']">Tax Inclusive</div>
                                </div></button>)}
                                {taxExcToggle && (<button onClick={taxExcToggleHandler}><div className="h-7 p-2 bg-teal-400 rounded-[5px] border border-white justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={crossicon} alt="sms" />
                                    <div className="text-white text-sm font-bold font-['Roboto']">Tax exclusive</div>
                                </div></button>)}
                                {!taxExcToggle && (<button onClick={taxExcToggleHandler}><div className="h-7 p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={crossicon} alt="sms" />
                                    <div className="text-neutral-400 text-sm font-bold font-['Roboto']">Tax exclusive</div>
                                </div></button>)}
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                        <div className="w-full flex justify-between items-start">
                            <div>
                                <div className="text-gray-500 text-base font-bold font-['Roboto']">Payment methods</div>
                                <div className="text-neutral-400 text-base font-medium font-['Roboto']">Add and configure your payment methods</div>
                            </div>
                            <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                <div className="text-white text-base font-bold font-['Roboto']">Add Payment Method</div>
                            </div>
                        </div>
                        <div className="w-full h-full">
                            <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                    <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Payment method</div>
                                    <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Active</div>
                                    <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'></div>
                                </div>
                                <div className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                    <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                        <Image className="w-[22px] h-[22px] relative" src={cashicon} alt="cash" />
                                        <div className="text-gray-500 text-base font-medium font-['Roboto']">Cash</div>
                                    </div>
                                    <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                        <input type="checkbox" className="accent-teal-500" defaultChecked />
                                    </div>
                                    <div className='w-2/12 px-6 flex gap-4 items-center justify-end text-neutral-400 text-base font-medium'>
                                        <Image className="w-6 h-6 p-1 bg-gray-100 rounded-[5px] justify-start items-center gap-2 flex" src={editicon} alt="edit" />
                                        <Image className="w-6 h-6 p-1 bg-gray-100 rounded-[5px] justify-start items-center gap-2 flex" src={deleteicon} alt="delete" />
                                    </div>
                                </div>
                                <div className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                    <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                        <Image className="w-[22px] h-[22px] relative" src={cardicon} alt="cash" />
                                        <div className="text-gray-500 text-base font-medium font-['Roboto']">Card</div>
                                    </div>
                                    <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                        <input type="checkbox" className="accent-teal-500" defaultChecked />
                                    </div>
                                    <div className='w-2/12 px-6 flex gap-4 items-center justify-end text-neutral-400 text-base font-medium'>
                                        <Image className="w-6 h-6 p-1 bg-gray-100 rounded-[5px] justify-start items-center gap-2 flex" src={editicon} alt="edit" />
                                        <Image className="w-6 h-6 p-1 bg-gray-100 rounded-[5px] justify-start items-center gap-2 flex" src={deleteicon} alt="delete" />
                                    </div>
                                </div>
                                <div className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                    <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                        <Image className="w-[22px] h-[22px] relative" src={netbankingicon} alt="cash" />
                                        <div className="text-gray-500 text-base font-medium font-['Roboto']">Net Banking</div>
                                    </div>
                                    <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                        <input type="checkbox" className="accent-teal-500" defaultChecked />
                                    </div>
                                    <div className='w-2/12 px-6 flex gap-4 items-center justify-end text-neutral-400 text-base font-medium'>
                                        <Image className="w-6 h-6 p-1 bg-gray-100 rounded-[5px] justify-start items-center gap-2 flex" src={editicon} alt="edit" />
                                        <Image className="w-6 h-6 p-1 bg-gray-100 rounded-[5px] justify-start items-center gap-2 flex" src={deleteicon} alt="delete" />
                                    </div>
                                </div>
                                <div className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                    <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                        <Image className="w-[22px] h-[22px] relative" src={upiicon} alt="cash" />
                                        <div className="text-gray-500 text-base font-medium font-['Roboto']">UPI</div>
                                    </div>
                                    <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                        <input type="checkbox" className="accent-teal-500" defaultChecked />
                                    </div>
                                    <div className='w-2/12 px-6 flex gap-4 items-center justify-end text-neutral-400 text-base font-medium'>
                                        <Image className="w-6 h-6 p-1 bg-gray-100 rounded-[5px] justify-start items-center gap-2 flex" src={editicon} alt="edit" />
                                        <Image className="w-6 h-6 p-1 bg-gray-100 rounded-[5px] justify-start items-center gap-2 flex" src={deleteicon} alt="delete" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                        <div className="w-full flex justify-between items-start">
                            <div>
                                <div className="text-gray-500 text-base font-bold font-['Roboto']">Notifications</div>
                                <div className="text-neutral-400 text-base font-medium font-['Roboto']">Choose what notifications you want to receive</div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-6 w-full">
                            <div className="flex gap-4 items-start">
                                <input className="mt-1 accent-teal-500" type="checkbox" defaultChecked />
                                <div>
                                    <div className="text-gray-500 text-base font-bold font-['Roboto']">Low stock items alert</div>
                                    <div className="text-neutral-400 text-base font-medium font-['Roboto'] flex">
                                        <Select
                                            className="text-neutral-400 text-base font-medium w-[138px] h-6"
                                            placeholder="Select"
                                            isClearable={false}
                                            isSearchable={true}
                                            options={reminder}
                                        />
                                        {/* <Image src={downicon} alt="dwn" /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <input className="mt-1 accent-teal-500" type="checkbox" defaultChecked />
                                <div>
                                    <div className="text-gray-500 text-base font-bold font-['Roboto']">Expiring items alert</div>
                                    <div className="text-neutral-400 text-base font-medium font-['Roboto']">
                                        <Select
                                            className="text-neutral-400 text-base font-medium w-[138px] h-6"
                                            placeholder="Select"
                                            isClearable={false}
                                            isSearchable={true}
                                            options={reminder}
                                        />
                                        {/* <Image src={downicon} alt="dwn" /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <input className="mt-1 accent-teal-500" type="checkbox" defaultChecked />
                                <div>
                                    <div className="text-gray-500 text-base font-bold font-['Roboto']">Expired items alert</div>
                                    <div className="text-neutral-400 text-base font-medium font-['Roboto'] flex">
                                        <Select
                                            className="text-neutral-400 text-base font-medium w-[138px] h-6"
                                            placeholder="Select"
                                            isClearable={false}
                                            isSearchable={true}
                                            options={reminder}
                                        />
                                        {/* <Image src={downicon} alt="dwn" /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <input className="mt-1 accent-teal-500" type="checkbox" defaultChecked />
                                <div>
                                    <div className="text-gray-500 text-base font-bold font-['Roboto']">Excess items alert</div>
                                    <div className="text-neutral-400 text-base font-medium font-['Roboto'] flex">
                                        <Select
                                            className="text-neutral-400 text-base font-medium w-[138px] h-6"
                                            placeholder="Select"
                                            isClearable={false}
                                            isSearchable={true}
                                            options={reminder}
                                        />
                                        {/* <Image src={downicon} alt="dwn" /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <input className="mt-1 accent-teal-500" type="checkbox" defaultChecked />
                                <div>
                                    <div className="text-gray-500 text-base font-bold font-['Roboto']">Invoice due alert</div>
                                    <div className="text-neutral-400 text-base font-medium font-['Roboto'] flex">
                                        <div className="flex gap-2">
                                            {samedayToggle && (<button onClick={sameDayToggleHandler}><div className="h-7 p-2 bg-teal-400 rounded-[5px] border border-white justify-start items-center gap-2 flex">
                                                <div className="text-white text-sm font-bold font-['Roboto']">Same day</div>
                                            </div></button>)}
                                            {!samedayToggle && (<button onClick={sameDayToggleHandler}><div className="h-7 p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                                <div className="text-neutral-400 text-sm font-bold font-['Roboto']">Same day</div>
                                            </div></button>)}
                                            {threedayToggle && (<button onClick={threeDayToggleHandler}><div className="h-7 p-2 bg-teal-400 rounded-[5px] border border-white justify-start items-center gap-2 flex">
                                                <div className="text-white text-sm font-bold font-['Roboto']">3 days to go</div>
                                            </div></button>)}
                                            {!threedayToggle && (<button onClick={threeDayToggleHandler}><div className="h-7 p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                                <div className="text-neutral-400 text-sm font-bold font-['Roboto']">3 days to go</div>
                                            </div></button>)}
                                            {oneWeekToggle && (<button onClick={weekToggleHandler}><div className="h-7 p-2 bg-teal-400 rounded-[5px] border border-white justify-start items-center gap-2 flex">
                                                <div className="text-white text-sm font-bold font-['Roboto']">1 week to go</div>
                                            </div></button>)}
                                            {!oneWeekToggle && (<button onClick={weekToggleHandler}><div className="h-7 p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                                <div className="text-neutral-400 text-sm font-bold font-['Roboto']">1 week to go</div>
                                            </div></button>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
    )
}

export default GeneralSettings