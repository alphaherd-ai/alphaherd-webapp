
"use client"

import lefticon from "../../../../../assets/icons/finance/left_icon.svg"
import Attachment from "../../../../../assets/icons/finance/attachment.svg"
import Menu from '@/assets/icons/finance/Menu.svg';
import Link from "next/link"
import Image from "next/image"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation"

const NewsalesReturnNavbar = () => {
    const router=useRouter();

    return (
        <>
           
                <div className="flex g-4 items-center justify-between pb-[27px]  text-gray-500 text-[28px] font-bold">
                    <div className="flex">

                    <div className="w-11 h-11 bg-gray-100 rounded-[5px] border border-neutral-400 flex justify-center items-center mr-4">
                    <Image className="w-6 h-6 relative rounded-[5px]  cursor-pointer" src={lefticon} alt="Back"  onClick={()=>router.back()}></Image>
                    </div>
                    <div className="text-gray-500 text-[28px] flex items-center font-bold ">
                    New Sales Return

                    </div>
                    </div>
                    <div className=" h-11 px-6 py-2.5 rounded-[5px]  justify-center items-center flex border border-borderGrey border-dashed">
                        <div className="self-stretch justify-start items-center gap-2 flex">
                            <div className="w-6 h-6 flex justify-center items-center"> <Image src={Attachment} alt='Attachment' className='w-3 h-3 ' /></div>
                            <div className="justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold ">Attach files</div>
                            </div>
                        </div>
                    </div>
                </div>
           
        </>

    )
}

export default NewsalesReturnNavbar;
