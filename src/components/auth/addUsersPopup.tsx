"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { Button } from "@nextui-org/react";

import closeicon from "../../assets/icons/inventory/closeIcon.svg";

import mailIcon from "@/assets/icons/settings/cash=Mail.svg"

import { useAppSelector } from "@/lib/hooks";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Popup = ({ onClose }: any) => {

    const appState = useAppSelector((state) => state.app);

    const [emailInput, setEmailInput] = useState<string>('');
    const [emailError, setEmailError] = useState('');
    const tabs = ["Staff", "Manager", "Veterinarian"];
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const handleInputChange = (event: any) => {
        const email = event.target.value;
        setEmailInput(event.target.value);
        if (!validateEmail(email)) {
            setIsEmailValid(false);
            setEmailError('Please enter a valid email address.');
        } else {
            setIsEmailValid(true);
            setEmailError('');
        }
    };
    const validateEmail = (email: any) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    const handleSendInvite = async () => {
        if (!isEmailValid) return;
        try {
            if (emailInput.trim() !== '') {
                setLoading(true);
                console.log('Currently invite sent with orgId:' + appState.currentBranchId)
                let resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/invite/create?branchId=${appState.currentBranchId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        "branchId": appState.currentBranchId,
                        "role": selectedTab,
                        "email": emailInput.trim()
                    })
                });
                let json = await resp.json();
                if (!resp.ok) {
                    throw new Error(json.message);
                }
                toast.success(json.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                setTimeout(() => { onClose(), setLoading(false); }, 0)
            }
        }
        catch (err: any) {
            toast.error(err.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            setTimeout(() => { setLoading(false) }, 0)

        }
    };

    return <>
        <ToastContainer />
        <div className="w-full h-full flex justify-center items-center  top-0 left-0 fixed inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400/opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 inline-flex">
                <div className="self-stretch justify-start items-start gap-6 inline-flex">
                    <div className="w-[528px] h-6 relative rounded-[5px]" />
                    <div className="w-6 h-6 relative bg-gray-200 rounded-[5px]" >
                        <Button onClick={onClose} className="outline-none border-0 hover:cursor-pointer">
                            <Image src={closeicon} alt="image" />
                        </Button>
                    </div>
                </div>
                <div className="flex-col justify-start items-start gap-2 flex">
                    <div className="text-gray-500 text-xl  ">Add User to your Organisation</div>
                    <div className="text-neutral-400 text-base  ">Enter email ID to send invite for current branch</div>
                </div>
                <div className="self-stretch h-[147px] flex-col justify-start items-start gap-4 flex">
                    <div className="w-[576px] h-[27px] justify-start items-center gap-2 inline-flex"><p className="text-gray-500">User Role:</p>
                        <div className="grow shrink basis-0 h-[27px] justify-start items-center flex hover:cursor-pointer">
                            {selectedTab == tabs[0] && (<div className="px-2 py-1 bg-zinc-900 rounded-tl-[5px] rounded-[5px] border border-zinc-900 justify-start items-center gap-1 flex">
                                <div className="text-white text-sm font-bold ">
                                    <div onClick={() => setSelectedTab(tabs[0])}>{tabs[0]}</div>
                                </div>
                            </div>)}
                            {selectedTab !== tabs[0] && (<div className="px-2 py-1 bg-gray-100 border border-neutral-400 justify-start items-center gap-1 flex">
                                <div className="text-neutral-400 text-sm font-bold ">
                                    <div onClick={() => setSelectedTab(tabs[0])}>{tabs[0]}</div>
                                </div>
                            </div>)}
                            {selectedTab == tabs[1] && (<div className="px-2 py-1 bg-zinc-900 rounded-[5px] rounded-bl-[5px] border border-zinc-900 justify-start items-center gap-1 flex">
                                <div className="text-white text-sm font-bold ">
                                    <div onClick={() => setSelectedTab(tabs[1])}>{tabs[1]}</div>
                                </div>
                            </div>)}
                            {selectedTab !== tabs[1] && (<div className="px-2 py-1 bg-gray-100 border border-neutral-400 justify-start items-center gap-1 flex">
                                <div className="text-neutral-400 text-sm font-bold ">
                                    <div onClick={() => setSelectedTab(tabs[1])}>{tabs[1]}</div>
                                </div>
                            </div>)}
                            {selectedTab == tabs[2] && (<div className="px-2 py-1 bg-zinc-900 rounded-[5px] rounded-bl-[5px] border border-zinc-900 justify-start items-center gap-1 flex">
                                <div className="text-white text-sm font-bold ">
                                    <div onClick={() => setSelectedTab(tabs[2])}>{tabs[2]}</div>
                                </div>
                            </div>)}
                            {selectedTab !== tabs[2] && (<div className="px-2 py-1 bg-gray-100 border border-neutral-400 justify-start items-center gap-1 flex">
                                <div className="text-neutral-400 text-sm font-bold ">
                                    <div onClick={() => setSelectedTab(tabs[2])}>{tabs[2]}</div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                        <div className="grow shrink basis-0 h-11 py-[13px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex">
                            <input type="email" name="" id="" className="text-neutral-400 text-base  h-11 px-4 py-[13px] w-[100%] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-4 flex" placeholder="Enter Email" value={emailInput}
                                onChange={handleInputChange} />
                        </div>
                        <div className={`w-[145px] self-stretch px-4 py-2.5 ${loading ? "bg-gray-400" : "bg-zinc-900"} rounded-[5px] justify-start items-center gap-2 flex ${loading ? "cursor-not-allowed" : "hover:cursor-pointer"}`} onClick={!loading && isEmailValid ? handleSendInvite : undefined}>
                            <Image src={mailIcon} alt="mail"></Image>
                            <div className="text-white text-base]">{loading ? "Sending..." : "Send Invite"}</div>
                        </div>
                    </div>
                    {emailError && <div className="text-red-500 text-sm mt-2">{emailError}</div>}
                </div>
            </div>
        </div>
    </>;
}

export default Popup;
