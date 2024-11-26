"use client"

import lefticon from "../../../../../assets/icons/finance/left_icon.svg"
import closeIcon from '../../../../../assets/icons/finance/closeIcon.svg';
import minimiseIcon from '../../../../../assets/icons/finance/minimiseIcon.svg';
import Link from "next/link"
import Image from "next/image"
import Attachment from "../../../../../assets/icons/finance/attachment.svg"
import { useRouter } from "next/navigation"
import { DataContext } from "../table/DataContext";
import { useContext } from "react";

const CreateGrnNavbar = () => {
    const { headerData, tableData, totalAmountData,transactionsData,setTableData,setHeaderData,setTotalAmountData,setTransactionsData } = useContext(DataContext);
    const router = useRouter();

    const handleCancelTransaction=()=>{
        console.log(headerData)
        
        const resetHeaderData={
            distributor:null,
            date:new Date(),
            dueDate:new Date(),
            notes:""  
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

                    <div className="w-11 h-11 bg-gray-100 rounded-[5px] border border-neutral-400 flex justify-center items-center mr-4 cursor-pointer" onClick={() => router.back()}>
                        <Image className="w-6 h-6 relative rounded-[5px]  cursor-pointer" src={lefticon} alt="Back" onClick={() => router.back()}></Image>
                    </div>
                    <div className="text-gray-500 text-[28px] flex items-center font-bold ">
                        New Purchase Invoices (GRN)

                    </div>
                </div>
                <div className="flex">
                    
                    {/* <div className="mr-4 self-stretch justify-start items-center gap-2 flex  h-11 px-6 py-2.5 rounded-[5px] border border-borderGrey border-dashed">
                        <div className="w-6 h-6 flex justify-center items-center"> <Image src={Attachment} alt='Attachment' className='w-3 h-3 ' /></div>
                        <div className="justify-start items-center gap-4 flex">
                            <div className="text-gray-500 text-base font-bold ">Attach files</div>
                        </div>
                    </div> */}

                    <div className="flex">
                        <div className=" w-11 h-11 bg-gray-100 rounded-[5px] border border-neutral-400 flex justify-center items-center mr-4">
                            <Image className="w-6 h-6 relative rounded-full  cursor-pointer" src={minimiseIcon} alt="Back" onClick={() => router.back()}></Image>

                        </div>
                        <div className=" w-11 h-11 bg-gray-100 rounded-[5px] border border-neutral-400 flex justify-center items-center mr-4">
                            <Image className="w-6 h-6 relative rounded-[5px]  cursor-pointer" src={closeIcon} alt="Back" onClick={handleCancelTransaction}></Image>

                        </div>
                    </div>
                    
                </div>
            </div>

        </>

    )
}

export default CreateGrnNavbar;
