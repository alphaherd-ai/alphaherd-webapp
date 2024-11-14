import React, { useState } from "react";

const Vitals = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`w-[688px] px-6 py-4 bg-white rounded-[10px] flex-col justify-start items-start gap-4 flex ${
        expanded ? "min-h-[434px]" : "h-[175px]"
      }`}
    >
      <div
        className="self-stretch justify-start items-center gap-4 inline-flex cursor-pointer"
      >
        <div className="grow shrink basis-0 self-stretch justify-start items-center gap-4 flex">
          <div className="text-neutral-400 text-base ">
            Vitals
          </div>
          <div className="grow shrink basis-0 self-stretch" />
        </div>
      </div>
      <div className="flex w-[688px]">
        <div className="w-[15%]">
          <div className="h-7 text-gray-500 text-base">Weight:</div>
        </div>
        <div className="w-[75%]">
        <div className="h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 inline-flex">
    <div className="text-indigo-600 text-sm ">4.8</div>
      </div>
        </div>
        <div className="w-[2%]">
        <div className="w-9 h-7 text-neutral-400 text-base">kg</div>
        </div>
      </div>
      <div className="flex w-[688px]">
        <div className="w-[15%]">
          <div className="h-7 text-gray-500 text-base">Temperature:</div>
        </div>
        <div className="w-[75%]">
        <div className="h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 inline-flex">
    <div className="text-indigo-600 text-sm ">36</div>
      </div>
        </div>
        <div className="w-[2%]">
        <div className="w-9 h-7 text-neutral-400 text-base">°C</div>
        </div>
      </div>
      <div className={`${expanded ? "flex" : "hidden"}`}>
        <div className="flex flex-col gap-4">
      <div className="flex w-[688px]">
        <div className="w-[15%]">
          <div className="h-7 text-gray-500 text-base">Weight:</div>
        </div>
        <div className="w-[75%]">
        <div className="h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 inline-flex">
    <div className="text-indigo-600 text-sm ">4.8</div>
      </div>
        </div>
        <div className="w-[2%]">
        <div className="w-9 h-7 text-neutral-400 text-base">kg</div>
        </div>
      </div>
      <div className="flex w-[688px]">
        <div className="w-[15%]">
          <div className="h-7 text-gray-500 text-base">Temperature:</div>
        </div>
        <div className="w-[75%]">
        <div className="h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 inline-flex">
    <div className="text-indigo-600 text-sm ">36</div>
      </div>
        </div>
        <div className="w-[2%]">
        <div className="w-9 h-7 text-neutral-400 text-base">°C</div>
        </div>
      </div>
      <div className="flex w-[688px]">
        <div className="w-[15%]">
          <div className="h-7 text-gray-500 text-base">Temperature:</div>
        </div>
        <div className="w-[75%]">
        <div className="h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 inline-flex">
    <div className="text-indigo-600 text-sm ">36</div>
      </div>
        </div>
        <div className="w-[2%]">
        <div className="w-9 h-7 text-neutral-400 text-base">°C</div>
        </div>
      </div>
      <div className="flex w-[688px]">
        <div className="w-[15%]">
          <div className="h-7 text-gray-500 text-base">Temperature:</div>
        </div>
        <div className="w-[75%]">
        <div className="h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 inline-flex">
    <div className="text-indigo-600 text-sm ">36</div>
      </div>
        </div>
        <div className="w-[2%]">
        <div className="w-9 h-7 text-neutral-400 text-base">°C</div>
        </div>
      </div>
      <div className="flex w-[688px]">
        <div className="w-[15%]">
          <div className="h-7 text-gray-500 text-base">Temperature:</div>
        </div>
        <div className="w-[75%]">
        <div className="h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 inline-flex">
    <div className="text-indigo-600 text-sm ">36</div>
      </div>
        </div>
        <div className="w-[2%]">
        <div className="w-9 h-7 text-neutral-400 text-base">°C</div>
        </div>
      </div>
      </div>
      </div>
      <div className="flex justify-end w-[670px] hover:cursor-pointer">
        <div
          className="grow shrink basis-0 text-right text-teal-400 text-base font-medium "
          onClick={toggleExpanded}
        >
          {expanded ? "See Less" : "See All"}
        </div>
        <div className="w-6 h-6 relative">
          <img src="/1. Icons-24 (10).png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Vitals;
