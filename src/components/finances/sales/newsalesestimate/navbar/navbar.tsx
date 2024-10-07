"use client"

import lefticon from "../../../../../assets/icons/finance/left_icon.svg"
import closeIcon from '../../../../../assets/icons/finance/closeIcon.svg';
import minimiseIcon from '../../../../../assets/icons/finance/minimiseIcon.svg';
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { DataContext } from "../table/DataContext";
import { useContext } from "react";

const NewsaleEstimateNavbar = () => {
    const { headerData, tableData, totalAmountData,setTableData,setHeaderData,setTotalAmountData } = useContext(DataContext);
    const router=useRouter();
    const handleCancelTransaction=()=>{
        const resetHeaderData={
            customer:null,
            date:new Date(),
            dueDate:new Date(),
            notes:""  ,
            invoiceNo:headerData.invoiceNo 
        }
        const resetTotalAmountData={
            adjustment:0,
            shipping:0,
            subTotal:0,
            totalCost:0,
        }
        setHeaderData(resetHeaderData)
        setTotalAmountData(resetTotalAmountData);
        setTableData([{}]);
        
        
    }

    return (
        <>
           
                <div className="flex relative g-4 items-center justify-start pb-[27px]  text-gray-500 text-[28px] font-bold">
                    <div className="w-11 h-11 bg-gray-100 rounded-[5px] border border-neutral-400 flex justify-center items-center mr-4">
                    <Image className="w-6 h-6 relative rounded-[5px]  cursor-pointer" src={lefticon} alt="Back"  onClick={()=>router.back()}></Image>
                    </div>
                    <div className="text-gray-500 text-[28px] font-bold ">
                        New Sales Estimate
                    </div>
                    <div className="absolute right-16 w-11 h-11 bg-gray-100 rounded-[5px] border border-neutral-400 flex justify-center items-center mr-4">
                    <Image className="w-6 h-6 relative rounded-full  cursor-pointer" src={minimiseIcon} alt="Back"  onClick={()=>router.back()}></Image>

                    </div>
                    <div className="absolute right-0 w-11 h-11 bg-gray-100 rounded-[5px] border border-neutral-400 flex justify-center items-center mr-4">
                    <Image className="w-6 h-6 relative rounded-[5px]  cursor-pointer" src={closeIcon} alt="Back"  onClick={handleCancelTransaction}></Image>

                    </div>
                </div>
           
        </>

    )
}

export default NewsaleEstimateNavbar;
