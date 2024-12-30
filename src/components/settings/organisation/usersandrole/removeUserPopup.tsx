import React, { useState } from 'react';
import closeicon from "../../../../assets/icons/inventory/closeIcon.svg";
import Image from "next/image";
import DeleteIcon from './deleteicon';
import { useAppSelector } from '@/lib/hooks';
import Loading2 from "@/app/loading2";
import check from "../../../../assets/icons/navbar/check.svg";
const RemoveUserPopup = ({ onClose, user, mutate,action,onSubmit }: any) => {
    const appState = useAppSelector((state) => state.app);
    const [isRemoving, setIsRemoving] = useState<boolean>(false);

    const handleRemove = async () => {
        setIsRemoving(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/delete?branchId=${appState.currentBranchId}&userId=${user.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to remove user');
            }
            mutate();
            onClose();
            // Handle successful removal
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            setIsRemoving(false);
        }
    };
    const handleAdmin = async () => {
        setIsRemoving(true);
        try {
            await onSubmit(user.email);
            mutate();
            onClose();
            // Handle successful removal
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            setIsRemoving(false);
        }
    }
    return (
        <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] max-h-[450px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex overflow-y-auto">
                <div className="self-end items-start gap-6 flex cursor-pointer" onClick={onClose}>
                    <Image src={closeicon} alt="close"></Image>
                </div>
                <div className="midcontent flex flex-col items-start gap-2">
                    {action === "removeUser" && (
                        <div className="text-lg font-medium text-[#6B7E7D]">Remove {user.name} from your team?</div>
                    )}
                    {action === "makeAdmin" && (
                        <div className="text-lg font-medium text-[#6B7E7D]">Make {user.name} an admin?</div>
                    )}
                    {action === "removeAdmin" && (
                        <div className="text-lg font-medium text-[#6B7E7D]">Remove Admin privileges from {user.name}?</div>
                    )}
                {action === "removeUser" && (
                    <div className="text-sm text-[#A2A3A3]">
                        You&apos;re about to remove this user from the organisation. Once removed, they will no longer have access to the system. Are you sure you want to continue?
                    </div>
                )}
                {action === "makeAdmin" && (
                    <div className="text-sm text-[#A2A3A3]">
                        You&apos;re about to provide this user with admin privileges. They will have administrative access to the system. Are you sure you want to continue?
                    </div>
                )}
                {action === "removeAdmin" && (
                    <div className="text-sm text-[#A2A3A3]">
                        You&apos;re about to revoke this user&apos;s admin privileges. They will no longer have access to administrative features. Are you sure you want to continue?
                    </div>
                )}
                </div>
                <div className="buttons flex flex-col items-end w-full justify-items-end ">
                    <div className="right flex gap-3">
                        <button 
                            className="bg-[#35BEB1] text-white rounded-md px-4 py-2 focus:outline-none border-none cursor-pointer"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        {action === "removeUser" && (
                            <button className="bg-[#17181A] text-white rounded-md px-3 py-2 focus:outline-none flex items-center gap-1 border-none cursor-pointer" onClick={handleRemove}>
                                <DeleteIcon fill="red" />
                                <div>{isRemoving ? <Loading2 /> : "Remove"}</div>
                            </button>
                        )}
                        {action === "makeAdmin" && (
                            <button className="bg-[#17181A] text-white rounded-md px-3 py-2 focus:outline-none flex items-center gap-1 border-none cursor-pointer" onClick={handleAdmin}>
                                <Image src={check} alt="check"></Image>
                                <div>{isRemoving ? <Loading2 /> : "Make Admin"}</div>
                            </button>
                        )}
                        {action === "removeAdmin" && (
                            <button className="bg-[#17181A] text-white rounded-md px-3 py-2 focus:outline-none flex items-center gap-1 border-none cursor-pointer" onClick={handleAdmin}>
                                <DeleteIcon fill="red" />
                                <div>{isRemoving ? <Loading2 /> : "Remove Admin"}</div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RemoveUserPopup;