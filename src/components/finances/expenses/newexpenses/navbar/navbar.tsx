
"use client"

import lefticon from "../../../../../assets/icons/finance/left_icon.svg"
import closeIcon from '../../../../../assets/icons/finance/closeIcon.svg';
import minimiseIcon from '../../../../../assets/icons/finance/minimiseIcon.svg';

import Image from "next/image"

import { useRouter } from "next/navigation";
import { DataContext } from "../table/DataContext";
import { useContext } from "react";


const NewExpensesNavbar = () => {
    const { headerData, tableData, totalAmountData,transactionsData,setTableData,setHeaderData,setTotalAmountData,setTransactionsData } = useContext(DataContext);
   const router=useRouter();
   const handleCancelTransaction=()=>{
    console.log(headerData)
    
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
    setTableData([]);
    
    
}
    return (
        <>
         <div className="flex g-4 items-center justify-between pb-[27px]  text-gray-500 text-[28px] font-bold">
                    <div className="flex">

                    <div className="w-11 h-11 bg-gray-100 rounded-[5px] border border-solid border-neutral-400 flex justify-center items-center mr-4 cursor-pointer" onClick={()=>router.back()}>
                        <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back"></Image>
                    </div>
                    <div className="text-gray-500 text-[28px] flex items-center font-bold ">
                    New Expense
                    </div>
                    </div>
                    
                </div>
           
        </>

    )
}

export default NewExpensesNavbar;
