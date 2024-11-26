import Image from "next/image"
import React, { useState } from "react";
import FilterDropCard from "../FilterDropCard/FilterDropCard";
import forward from "../../../assets/icons/home/1. Icons-24 (11).png"
import backward from "../../../assets/icons/home/1. Icons-24 (12).png"
import icon from "../../../assets/icons/home/1. Icons-24 (1).png"
import tune from "../../../assets/icons/home/tune.png"
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

const TableHeader = () => {
  const [isFilterHovered, setIsFilterHovered] = useState(false);

  const handleFilterClick = () => {
    setIsFilterHovered((prev) => !prev); // Toggle the state
  };

  return (
    <div className="w-full  py-4 mt-[2rem] px-6 bg-white border-[1px] border-solid border-[#A2A3A3] justify-start items-center gap-4 inline-flex rounded-tr-2xl rounded-tl-2xl">
      <div className="justify-start items-start gap-2 flex">
        <div className="w-6 h-6 ">
          <Image src={forward} alt="" />
        </div>
        <div className="w-6 h-6 ">
        <Image src={backward} alt="" />
        </div>
      </div>
      <div className="text-gray-500 text-xl font-medium ">
        Today - 26th June, 2024
      </div>

      <div className="grow shrink basis-0 h-6" />
      <div className="justify-end items-start flex">
        <div className="px-2 py-1 bg-zinc-900 rounded-tl-[5px] rounded-bl-[5px] border border-zinc-900 justify-start items-center gap-1 flex">
          <div className="text-white text-sm font-semibold ">All</div>
        </div>
        <div className="px-2 py-1 bg-gray-100 border border-neutral-400 justify-start items-center gap-1 flex">
          <div className="text-neutral-400 text-sm font-semibold ">
            Out-Patients
          </div>
        </div>
        <div className="px-2 py-1 bg-gray-100 rounded-tr-[5px] rounded-br-[5px] border border-neutral-400 justify-start items-center gap-1 flex">
          <div className="text-neutral-400 text-sm font-semibold ">
            In-Patients
          </div>
        </div>
      </div>

      <div className="w-7 h-7 px-1.5 py-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
        <div className="w-4 h-4 relative">
          <Image className="w-6 h-4" src={icon} alt="" />
        </div>
      </div>
      <Popover placement="bottom-end" offset={5} showArrow>
        <PopoverTrigger>
      <div
        className="w-[72px] p-[3px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex"
        onClick={handleFilterClick}
      >
        <div className="w-4 h-4 justify-center items-center flex">
          <div className="w-4 h-4 relative">
            <div className="w-4 h-4 left-0 top-0 absolute">
              <Image src={tune} alt="" />
            </div>
          </div>
        </div>
        <div className="justify-start items-center flex z-0 hover:cursor-pointer">
          <div className="text-neutral-400 text-sm font-medium z-0 hover:cursor-pointer">
            Filter
          </div>
        </div>
      </div>
      </PopoverTrigger>
      <PopoverContent>
      <FilterDropCard />
      </PopoverContent>
      </Popover>
      {/* <div className="absolute top-[190px] right-10 z-10 shadow-lg rounded-md cursor-pointer mt-[2px]">
        {isFilterHovered && <FilterDropCard />}
      </div> */}
    </div>
  );
};

export default TableHeader;
