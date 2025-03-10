"use client"

import lefticon from "../../../../../assets/icons/finance/left_icon.svg"

import closeIcon from '../../../../../assets/icons/finance/closeIcon.svg';
import minimiseIcon from '../../../../../assets/icons/finance/minimiseIcon.svg';
import Image from "next/image"
import { useRouter } from "next/navigation"
import { DataContext } from "../table/DataContext";
import { useContext } from "react";

const NewPurchaseOrderNavbar = () => {
    const { headerData, tableData, totalAmountData,setTableData,setHeaderData,setTotalAmountData } = useContext(DataContext);

const router= useRouter()
    return (
        <>
           
                <div className="relative flex g-4 items-center justify-start pb-[27px]  text-gray-500 text-[28px] font-bold">
                    <div className="w-11 h-11 bg-gray-100 rounded-[5px]  border border-solid border-neutral-400 flex justify-center items-center mr-4 cursor-pointer" onClick={()=>router.back()}>
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
