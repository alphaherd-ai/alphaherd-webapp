
"use client"

import lefticon from "../../../../../assets/icons/finance/left_icon.svg"
import Attachment from "../../../../../assets/icons/finance/attachment.svg"
import Image from "next/image"
import { useRouter } from "next/navigation"

const ExsistingRecurringNavbar = () => {
    const router=useRouter();
    return (
        
        <>
         <div className="flex g-4 items-center justify-between pb-[27px]  text-gray-500 text-[28px] font-bold">
                    <div className="flex">

                    <div className="w-11 h-11 bg-gray-100 rounded-[5px] border border-solid border-neutral-400 flex justify-center items-center mr-4">
                        <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back" onClick={()=>router.back()}></Image>
                    </div>
                    <div className="text-gray-500 text-[28px] flex items-center font-bold ">
                    Recurring Expense
                    </div>
                    </div>
                </div>
           
        </>

    )
}

export default ExsistingRecurringNavbar;
