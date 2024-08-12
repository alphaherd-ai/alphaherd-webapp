"use client"

import lefticon from "../../../../../assets/icons/finance/left_icon.svg"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

const NewPurchaseOrderNavbar = () => {
const router= useRouter()
    return (
        <>
           
                <div className="flex g-4 items-center justify-start pb-[27px]  text-gray-500 text-[28px] font-bold">
                    <div className="w-11 h-11 bg-gray-100 rounded-[5px] border border-neutral-400 flex justify-center items-center mr-4 cursor-pointer" onClick={()=>router.back()}>
                        <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back"></Image>
                    </div>
                    <div className="text-gray-500 text-[28px] font-bold">
                    New Purchase Order
                    </div>
                </div>
           
        </>

    )
}

export default NewPurchaseOrderNavbar;
