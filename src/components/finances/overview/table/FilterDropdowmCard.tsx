import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from "next/image"
import React, { useState } from "react";
import calicon from "../../../../assets/icons/finance/calendar_today.svg";
const FilterDropdwonCard = () => {
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (date:any) => {
        setStartDate(date);
        console.log(date);
    };

  const [activeTab, setActiveTab] = useState("party");

  const handleTabChange = (tab:any) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-[420px] h-[441px] px-4 py-6 bg-white rounded-[10px] flex-col justify-start items-start gap-4 inline-flex  shadow-lg">
      <div className="items-start flex border border-solid border-borderGrey rounded-[5px] cursor-pointer">
        <div
          className={`px-2 py-1 ${
            activeTab === "party"
              ? "bg-zinc-900 border-zinc-900"
              : "bg-gray-100 border-neutral-400"
          } rounded-tl-[5px] rounded-bl-[5px] border-0 border-r border-solid border-borderGrey justify-start items-center gap-1 flex`}
          onClick={() => handleTabChange("party")}
        >
          <div
            className={`text-sm font-bold  ${
              activeTab === "party" ? "text-white" : "text-neutral-400"
            }`}
          >
            Party
          </div>
          <div className="w-4 h-4 p-2 bg-teal-400 rounded-[17px] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-[10px] font-medium ">
              2
            </div>
          </div>
        </div>
        <div
          className={`px-2 py-1 ${
            activeTab === "dateRange"
              ? "bg-zinc-900 border-zinc-900"
              : "bg-gray-100 border-neutral-400"
          }  border-0 border-r border-solid border-borderGrey justify-start items-center gap-1 flex`}
          onClick={() => handleTabChange("dateRange")}
        >
          <div
            className={`text-sm font-bold  ${
              activeTab === "dateRange" ? "text-white" : "text-neutral-400"
            }`}
          >
            Date Range
          </div>
          <div className="w-4 h-4 p-2 bg-teal-400 rounded-[17px] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-[10px] font-medium ">
              2
            </div>
          </div>
        </div>
        <div
          className={`px-2 py-1 ${
            activeTab === "invoiceType"
              ? "bg-zinc-900 border-zinc-900"
              : "bg-gray-100 border-neutral-400"
          }  border-0 border-r border-solid border-borderGrey justify-start items-center gap-1 flex`}
          onClick={() => handleTabChange("invoiceType")}
        >
          <div
            className={`text-sm font-bold  ${
              activeTab === "invoiceType" ? "text-white" : "text-neutral-400"
            }`}
          >
            Invoice Type
          </div>
          <div className="w-4 h-4 p-2 bg-teal-400 rounded-[17px] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-[10px] font-medium ">
              2
            </div>
          </div>
        </div>
        
        <div
          className={`px-2 py-1 ${
            activeTab === "status"
              ? "bg-zinc-900 border-zinc-900"
              : "bg-gray-100 border-neutral-400" 
          } rounded-tr-[5px] rounded-br-[5px] border justify-start items-center gap-1 flex`}
          onClick={() => handleTabChange("status")}
        >
          <div
            className={`text-sm font-bold  ${
              activeTab === "status" ? "text-white" : "text-neutral-400"
            }`}
          >
            Status
          </div>
          <div className="w-4 h-4 p-2 bg-teal-400 rounded-[17px] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-[10px] font-medium ">
              1
            </div>
          </div>
        </div>
      </div>
      {activeTab === "party" && (
       <div className="w-full h-full flex flex-col gap-4">

        <div className="w-full">
            <input className="w-full p-2 border border-solid border-borderGrey outline-none rounded-[5px] text-sm text-textGrey2 font-medium" type="text" name="" id="" />
        </div>
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-2 items-center">
                <input type="checkbox" name="" id="" />
                <div className="text-textGrey2 font-medium text-base">Ramesh</div>
            </div>
            <div className="w-full flex gap-2 items-center">
                <input type="checkbox" name="" id="" />
                <div className="text-textGrey2 font-medium text-base">Ramesh</div>
            </div>
            <div className="w-full flex gap-2 items-center">
                <input type="checkbox" name="" id="" />
                <div className="text-textGrey2 font-medium text-base">Ramesh</div>
            </div>
            <div className="w-full flex gap-2 items-center">
                <input type="checkbox" name="" id="" />
                <div className="text-textGrey2 font-medium text-base">Ramesh</div>
            </div>
            <div className="w-full flex gap-2 items-center">
                <input type="checkbox" name="" id="" />
                <div className="text-textGrey2 font-medium text-base">Ramesh</div>
            </div>
        </div>

        
       </div>
      )}
      {activeTab == "dateRange" && (
            <div className="w-full h-full flex flex-col gap-6 ">
            <div className='w-full flex flex-col gap-2'>
                <div className='w-full text-textGrey2 text-base font-medium'>Start Date:</div>
            <div className="customDatePickerWidth">
            <DatePicker
                            className="w-full"
                            selected={startDate}
                            onChange={handleDateChange}
                            calendarClassName="react-datepicker-custom"
                            customInput={
                                <div className='relative '>
                                    <input
                                        className="w-full h-9 text-textGrey1 text-base font-medium px-2 rounded border border-solid border-borderGrey   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                        value={startDate.toLocaleDateString()}
                                        readOnly
                                    />
                                    <Image
                                        src={calicon}
                                        alt="Calendar Icon"
                                        className="absolute right-2 top-2 cursor-pointer"
                                        width={50}
                                        height={20}
                                    />
                                </div>
                            }
                        />
            </div>
            </div>
            <div className='w-full flex flex-col gap-2'>
                <div className='w-full text-textGrey2 text-base font-medium'>End Date:</div>
            <div className="customDatePickerWidth">
            <DatePicker
                            className="w-full"
                            selected={startDate}
                            onChange={handleDateChange}
                            calendarClassName="react-datepicker-custom"
                            customInput={
                                <div className='relative '>
                                    <input
                                        className="w-full h-9 text-textGrey1 text-base font-medium px-2 rounded border border-solid border-borderGrey   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                        value={startDate.toLocaleDateString()}
                                        readOnly
                                    />
                                    <Image
                                        src={calicon}
                                        alt="Calendar Icon"
                                        className="absolute right-2 top-2 cursor-pointer"
                                        width={50}
                                        height={20}
                                    />
                                </div>
                            }
                        />
            </div>
            </div>
            </div>
        )}

    {activeTab === "invoiceType" && (
       <div className="w-full h-full flex flex-col gap-4">

        <div className="w-full">
            <input className="w-full p-2 border border-solid border-borderGrey outline-none rounded-[5px] text-sm text-textGrey2 font-medium" type="text" name="" id="" />
        </div>
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-2 items-center">
                <input type="checkbox" name="" id="" />
                <div className="text-textGrey2 font-medium text-base">Sales Invoice</div>
            </div>
            <div className="w-full flex gap-2 items-center">
                <input type="checkbox" name="" id="" />
                <div className="text-textGrey2 font-medium text-base">Sales Return</div>
            </div>
            <div className="w-full flex gap-2 items-center">
                <input type="checkbox" name="" id="" />
                <div className="text-textGrey2 font-medium text-base">Purchase Invoices (GRN)</div>
            </div>
            <div className="w-full flex gap-2 items-center">
                <input type="checkbox" name="" id="" />
                <div className="text-textGrey2 font-medium text-base">Purchase Return</div>
            </div>
            
        </div>

        
       </div>
      )}
      {activeTab === "status" && (
        <div className='w-full h-full'></div>
      )}
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
            <input type="checkbox" name="" id="" />
            <div className="text-textGrey2 font-medium text-base">Select All</div>
        </div>
          <div className="px-3 py-3 bg-textGreen text-white rounded-[5px] justify-start items-center">
            Apply
          </div>
      </div>
    </div>
  );
};

export default FilterDropdwonCard;
