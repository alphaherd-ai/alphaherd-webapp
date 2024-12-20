"use client"
import Image from "next/image"
import closeicon from "../../../../../assets/icons/inventory/closeIcon.svg";
import check from "../../../../../assets/icons/navbar/check.svg"
import { useState } from "react";
import Loading2 from "@/app/loading2";
const AmountnotMatchedPopup = ({ onClose, handleSubmit, isSaving }: { onClose: () => void, handleSubmit: () => void, isSaving: boolean }) => {
    // const [isSaving, setSaving] = useState(false);
    return (
        <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] max-h-[450px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex overflow-y-auto">
                <div className="self-end items-start gap-6 flex cursor-pointer" onClick={onClose}>
                    <Image src={closeicon} alt="close"></Image>
                </div>
                <div className="midcontent flex flex-col items-start gap-2">
                    <div className="text-lg font-medium text-[#6B7E7D]">Total amount is not the same</div>
                    <div className="text-sm text-[#A2A3A3]">The total GRN value entered does not match the total value based on items added. Are you sure you want to continue?</div>
                </div>
                <div className="buttons flex flex-col items-end w-full justify-items-end ">
                    <div className="right flex gap-3">
                        <button 
                            className="bg-[#35BEB1] text-white rounded-md px-4 py-2 focus:outline-none border-none cursor-pointer"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button className="bg-[#17181A] text-white rounded-md px-3 py-2 focus:outline-none flex items-center gap-1 border-none cursor-pointer" onClick={handleSubmit}>
                            <Image src={check} alt="check"></Image>
                            <div>{isSaving ? <Loading2 /> : "Save"}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AmountnotMatchedPopup;