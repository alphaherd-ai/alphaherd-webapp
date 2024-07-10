"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { Tooltip, Button } from "@nextui-org/react";
import Link from 'next/link';
import closeicon from "../../assets/icons/inventory/closeIcon.svg";
import link from "../../assets/icons/settings/link.svg";
import arrowicon from "../../../assets/icons/inventory/arrow.svg";
import Attachment from "../../../assets/icons/finance/attachment.svg";
import deleteicon from "../../assets/icons/loginsignup/delete.svg";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import useSWR from "swr";
import { isAdminOfOrg, isManagerOfBranch } from "@/utils/stateChecks";
import { updateApp } from "@/lib/features/appSlice";
import { UserState } from '@/lib/features/userSlice';

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());

const OrgPopup = ({ onClose }: any) => {
    const userState = useAppSelector((state) => state.user);
    const appState = useAppSelector((state) => state.app);
    const [org, setOrg] = useState<any[]>([]);
    const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/details/getAll?userId=${userState.id}`, fetcher, { revalidateOnFocus: true });
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data && !error && !isLoading) {
            // const userOrgs = data.map((branch: any) => ({
            //     id: branch.org.id,
            //     orgName: branch.org.orgName,
            //     branchName:branch.branchName,
            //     branchId:branch.id  
            // }));
            setOrg(data);
        }
    }, [data, error, isLoading]);

    const handleChangeOrg = (selectedItem:any) => {
    console.log(selectedItem)
    const isCurrentOrgAdmin = isAdminOfOrg((selectedItem as any).org.id,userState as UserState);
    const isCurrentBranchManager = isManagerOfBranch(selectedItem.id,userState as UserState);
    dispatch(updateApp({
      currentBranch : selectedItem,
      currentBranchId : selectedItem.id,
      currentOrg : selectedItem.org,
      currentOrgId : (selectedItem as any).id,
      isCurrentBranchManager : isCurrentBranchManager,
      isCurrentOrgAdmin : isCurrentOrgAdmin
    }));
        setSelectedOrg(selectedItem);
    };

    return <>
        <ToastContainer />
        <div className="w-full h-full flex justify-center items-center top-0 left-0 fixed inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400/opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 inline-flex">
                <div className="self-stretch justify-start items-start gap-6 inline-flex">
                    <div className="w-[528px] h-6 relative rounded-[5px]" />
                    <div className="w-6 h-6 relative bg-gray-200 rounded-[5px]">
                        <Button onClick={onClose} className="outline-none border-0 hover:cursor-pointer">
                            <Image src={closeicon} alt="image" />
                        </Button>
                    </div>
                </div>
                <div className="flex-col justify-start items-start gap-2 flex">
                    <div className="text-gray-500 text-xl">Select From Below Organizations</div>
                    <div className="flex flex-col gap-2">
                        {org.map((userOrg: any) => (
                            <label key={userOrg.id} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="organization"
                                    value={userOrg}
                                    checked={selectedOrg === userOrg}
                                    onChange={(selectedItem:any)=>handleChangeOrg(userOrg)}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span>{userOrg.org.orgName}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="self-stretch h-[147px] flex-col justify-start items-start gap-4 flex">
                    {/* Additional content can go here */}
                </div>
            </div>
        </div>
    </>;
}

export default OrgPopup;
