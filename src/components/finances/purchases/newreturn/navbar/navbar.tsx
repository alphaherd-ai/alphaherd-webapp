"use client"

import lefticon from "../../../../../assets/icons/finance/left_icon.svg"

import Image from "next/image"



import { useRouter } from "next/navigation"
import { DataContext } from "../table/DataContext";
import { useContext } from "react";


const NewPurchaseReturnNewNavbar = () => {
    const { headerData, tableData, totalAmountData,transactionsData,setTableData,setHeaderData,setTotalAmountData,setTransactionsData } = useContext(DataContext);
    const router = useRouter();

    return (
        <>

            <div className="flex g-4 items-center justify-between pb-[27px]  text-gray-500 text-[28px] font-bold">
                <div className="flex">

                    <div className="w-11 h-11 bg-gray-100 rounded-[5px] border border-solid border-neutral-400 flex justify-center items-center mr-4 cursor-pointer" onClick={() => router.back()}>
                        <Image className="w-6 h-6 relative rounded-[5px]  cursor-pointer" src={lefticon} alt="Back"></Image>
                    </div>
                    <div className="text-gray-500 text-[28px] flex items-center font-bold ">
                        New Purchase Return
                    </div>
                </div>
            </div>

        </>

    )
}

export default NewPurchaseReturnNewNavbar;
