"use client"
import Image from "next/image"
import orangebox from "../../../../assets/icons/finance/orangebox.png"
import greybox from "../../../../assets/icons/finance/greybox.png"
import bluebox from "../../../../assets/icons/finance/bluebox.png"
import greenbox from "../../../../assets/icons/finance/greenbox.png"
import yellowbox from "../../../../assets/icons/finance/yellowbox.png"
import lefticon from "../../../../assets/icons/finance/left_icon.svg"
import righticon from "../../../../assets/icons/finance/right_icon.svg"
import selecttab from "../../../../assets/icons/finance/SelectedTab.svg"
import icn_icon from "../../../../assets/icons/finance/inc_icon.svg"
import downloadicon from "../../../../assets/icons/finance/download.svg"
import NotificIcon from "../../../../assets/icons/finance/NotificIcon.svg"
import { useState } from "react"
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from 'chart.js';
import { useToast } from "@/components/Toast/ToastService"
import { AlertCircle } from "react-feather"
Chart.register(ArcElement);


const FinancesOverviewSheet = () => {
    const [clickedIndex, setClickedIndex] = useState(0);

    const handleClick = (index:any) => {
        setClickedIndex(index);
    };

    const tabs = [
        { label: 'Today', clicked: clickedIndex === 0 },
        { label: 'Week', clicked: clickedIndex === 1 },
        { label: 'Month', clicked: clickedIndex === 2 },
        { label: 'Quarter', clicked: clickedIndex === 3 },
        { label: 'Year', clicked: clickedIndex === 4 },
        { label: 'All Time', clicked: clickedIndex === 5 }
    ];

    const handleTabClick = (index:any) => {
        setClickedIndex(index);
    };

    const chartData = {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
            {
                data: [30, 50, 20], 
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const toast: any = useToast();
    
    const handleClickNotifi  = () => {
        toast.open(
            <div className="w-[443px] h-[172px] px-5 py-4 bg-[#343535] rounded-[10px] border border-[#3b3b3b] z-[10] animate-slide-in">
                <div className="w-full flex  flex-col gap-3">
                    <div className="w-full flex gap-2 items-center">
                        <div className="bg-[#3c50ff] px-1 pt-1 rounded-[5px]">
                            <Image src={NotificIcon} alt="as" className="bg-transparent" />
                        </div>
                        <div>
                            <span className="text-white text-base font-medium">Approval Requested: Update Inventory</span>
                        </div>
                    </div>
                    <div className="w-full flex gap-12 items-center">
                        <div>
                            {/* <Image src={NotificIcon} alt="as" className="bg-transparent" /> */}
                        </div>
                        <div>
                            <span className="text-white text-sm font-medium">Quentin Tarantino wants to stock out certain items. Check stock out</span>
                        </div>
                    </div>
                    <div className="w-full flex gap-12 items-center">
                        <div>
                            {/* <Image src={NotificIcon} alt="as" className="bg-transparent" /> */}
                        </div>
                        <div className="flex gap-4">
                            <div className="h-[35px] px-4 py-2 bg-[#35beb1] rounded-[5px] justify-start items-center gap-2 flex cursor-pointer">
                                <div className="text-white text-sm font-medium">Approve</div>
                            </div>
                            <div className="h-[35px] px-4 py-2 bg-[#6b7e7d] rounded-[5px] justify-start items-center gap-2 flex cursor-pointer">
                                <div className="text-white text-sm font-medium">Deny</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="flex flex-col mt-6">
                <div className="flex flex-col">
                    <div className="flex w-full h-14 p-4 bg-white border border-solid border-neutral-300 justify-between items-center">
                        <div className="h-6 justify-start items-center gap-4 inline-flex">
                            <div className="flex">
                                <Image className="w-6 h-6 " src={lefticon} alt="left_icon" />
                                <Image className="w-6 h-6 " src={righticon} alt="right_icon" />
                            </div>
                            <div className="text-gray-500 text-sm font-medium ">
                                July 17th - 23rd, 2023
                            </div>
                        </div>
                        <div className="flex h-[19px] justify-start items-start gap-6">
                            {tabs.map((tab, index) => (
                                <button className="border-none bg-transparent" onClick={() => handleTabClick(index)} key={index}>
                                    <div className={`${tab.clicked ? "text-center text-teal-400 font-bold" : "text-neutral-400"} text-neutral-400 text-sm font-medium `}>
                                        {tab.label}
                                    </div>
                                    {tab.clicked && <Image src={selecttab} alt="icon" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full h-[304px] justify-start items-start flex">
                    <div className="flex flex-col">
                        <div className="flex">
                            <div className="w-[438.50px] h-[152px] p-6 bg-white  border border-solid border-stone-300 flex-col justify-center items-start gap-4 flex">
                                <div className="text-gray-500 text-[28px] font-bold ">₹ 92,499</div>
                                <div className="text-gray-500 text-base font-medium bg-black text-white" onClick={handleClickNotifi}>TOGGLE NOTIFICATION</div>
                                <div className="w-[150px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex ">
                                    <Image className="w-4 h-4 " src={icn_icon} alt="inc"></Image>
                                    <div className="text-green-600 text-sm font-medium ">12.4%</div>
                                    <div className="text-green-600 text-sm font-medium ">this week</div>
                                </div>
                            </div>
                            <div className="w-[438.50px] h-[152px] p-6 bg-white border border-solid border-stone-300 flex-col justify-center items-start gap-4 flex">
                                <div className="text-gray-500 text-[28px] font-bold ">₹ 32,499</div>
                                <div className="text-gray-500 text-base font-medium ">Expenses</div>
                                <div className="w-[150px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex ">
                                    <Image className="w-4 h-4 " src={icn_icon} alt="inc"></Image>
                                    <div className="text-green-600 text-sm font-medium ">12.4%</div>
                                    <div className="text-green-600 text-sm font-medium ">this week</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[438.50px] h-[152px] p-6 bg-white border border-solid border-stone-300 flex-col justify-center items-start gap-4 flex">
                                <div className="text-gray-500 text-[28px] font-bold ">700</div>
                                <div className="text-gray-500 text-base font-medium ">Sales Invoices</div>
                                <div className="w-[150px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex ">
                                    <Image className="w-4 h-4 " src={icn_icon} alt="inc"></Image>
                                    <div className="text-green-600 text-sm font-medium ">12.4%</div>
                                    <div className="text-green-600 text-sm font-medium ">this week</div>
                                </div>
                            </div>
                            <div className="w-[438.50px] h-[152px] p-6 bg-white border border-solid border-stone-300 flex-col justify-center items-start gap-4 flex">
                                <div className="text-gray-500 text-[28px] font-bold ">₹ 12,499</div>
                                <div className="text-gray-500 text-base font-medium ">Total balances due</div>
                                <div className="w-[80px] h-7 px-2 py-1.5 bg-orange-50 rounded-[5px] justify-center items-center inline-flex ">
                                   
                                    <div className="text-orange-500 text-sm font-medium ">You owe</div>
                                    <div className="text-orange-500 text-sm font-medium "></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full h-[304px] justify-between pt-6 pb-6 pl-7 pr-11  bg-white border border-solid border-stone-300 ">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <div>
                                    ₹32,499
                                </div>
                                <div>
                                    Money In
                                </div>
                            </div>
                            <div className="flex-col">
                                <div className="flex items-center">
                                    <Image className="w-3 h-3" src={orangebox} alt="orangebox"></Image>
                                    <div className="ml-2">Cash</div>
                                </div>
                                <div className="flex items-center">
                                    <Image className="w-3 h-3" src={bluebox} alt="bluebox"></Image>
                                    <div className="ml-2">Card</div>
                                </div>
                                <div className="flex items-center">
                                    <Image className="w-3 h-3" src={greenbox} alt="greenbox"></Image>
                                    <div className="ml-2">UPI</div>
                                </div>
                                <div className="flex items-center">
                                    <Image className="w-3 h-3" src={yellowbox} alt="yellowbox"></Image>
                                    <div className="ml-2">Net Banking</div>
                                </div>
                                <div className="flex items-center">
                                    <Image className="w-3 h-3" src={greybox} alt="greybox"></Image>
                                    <div className="ml-2">Others</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="pr-0">
                                <Doughnut data={chartData} />
                            </div>
                            <div className="w-7 h-7 px-1.5 py-2 justify-self-end bg-white rounded-[5px] border border-solid border-neutral-400 justify-start items-center gap-2 flex">
                                <Image className="w-4 h-4 " src={downloadicon} alt="download"></Image>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FinancesOverviewSheet;

             
