"use client";
import Image from "next/image";

import lefticon from "../../../../assets/icons/finance/left_icon.svg";
import righticon from "../../../../assets/icons/finance/right_icon.svg";
import selecttab from "../../../../assets/icons/finance/SelectedTab.svg";
import DownArrow from '../../../../assets/icons/finance/downArrow.svg';

import { useState } from "react";
import TransactionsBlanceSheetItem from "./item";

const FinancesTransactionSheet = () => {
    const [clickedIndex, setClickedIndex] = useState(0);

    const handleClick = (index:any) => {
        setClickedIndex(index);
    };

    return (
        <>
            <div className="flex flex-col mt-6">
                <div className="flex flex-col">
                    <div className="flex w-full h-14 p-4 bg-white border border-solid border-neutral-300 justify-between items-center">
                        <div className="h-6 justify-start items-center gap-4 inline-flex">
                            <div className="flex">
                                <Image className="w-6 h-6 relative" src={lefticon} alt="left_icon" />
                                <Image className="w-6 h-6 relative" src={righticon} alt="right_icon" />
                            </div>
                            <div className="text-gray-500 text-sm font-medium ">
                                July 17th - 23rd, 2023
                            </div>
                        </div>
                        <div className="flex h-[19px] justify-start items-start gap-6 inline-flex">
                            {['Day', 'Week', 'Month', 'Quarter', 'Year', 'All Time'].map((label, index) => (
                                <button className="border-none bg-transparent" onClick={() => handleClick(index)} key={index}>
                                    <div className={`${index === clickedIndex ? "text-center text-teal-400 font-bold" : "text-neutral-400"} text-neutral-400 text-sm font-medium `}>
                                        {label}
                                    </div>
                                    {index === clickedIndex && <Image src={selecttab} alt="icon" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-16 flex border border-neutral-400 bg-white border-l ">
                    <div className="items-center justify-center flex text-gray-500 text-xl font-bold w-1/4 border-0 border-r border-solid py-4 border-neutral-300"><span className="mr-2"><Image src={DownArrow} alt='DownArrow' className='w-6 h-6 ' /></span> Card</div>
                    <div className="items-center justify-center flex text-gray-500 text-xl font-bold w-1/4 border-0 border-r border-solid py-4 border-neutral-300"><span className="mr-2"><Image src={DownArrow} alt='DownArrow' className='w-6 h-6 ' /></span> Card</div>
                    <div className="items-center justify-center flex text-gray-500 text-xl font-bold w-1/4 border-0 border-r border-solid py-4 border-neutral-300"><span className="mr-2"><Image src={DownArrow} alt='DownArrow' className='w-6 h-6 ' /></span> Card</div>
                    <div className="items-center justify-center flex text-gray-500 text-xl font-bold w-1/4 border-0 border-r border-solid py-4 border-neutral-300"><span className="mr-2"><Image src={DownArrow} alt='DownArrow' className='w-6 h-6 ' /></span> Card</div>
                </div>
                <div className=" flex bg-gray-100 border-l border-r border-neutral-300  ">
                    <div className="items-center justify-center flex text-gray-500 text-xl font-bold w-1/4 border-0 border-r border-solid p-2 flex flex-col border-neutral-300"><TransactionsBlanceSheetItem/> <TransactionsBlanceSheetItem/> <TransactionsBlanceSheetItem/> </div>
                    <div className="items-center justify-center flex text-gray-500 text-xl font-bold w-1/4 border-0 border-r border-solid p-2 flex flex-col border-neutral-300"> <TransactionsBlanceSheetItem/> <TransactionsBlanceSheetItem/> <TransactionsBlanceSheetItem/> </div>
                    <div className="items-center justify-center flex text-gray-500 text-xl font-bold w-1/4 border-0 border-r border-solid p-2 flex flex-col border-neutral-300"><TransactionsBlanceSheetItem/> <TransactionsBlanceSheetItem/> <TransactionsBlanceSheetItem/> </div>
                    <div className="items-center justify-center flex text-gray-500 text-xl font-bold w-1/4 border-0 border-r border-solid p-2 flex flex-col border-neutral-300"> <TransactionsBlanceSheetItem/> <TransactionsBlanceSheetItem/> <TransactionsBlanceSheetItem/> </div>
                </div>
            </div>
        </>
    );
};

export default FinancesTransactionSheet;
