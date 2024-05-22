import React, { useState } from "react";

const Vitals = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`w-[688px] px-6 py-4 bg-white rounded-[10px] flex-col justify-start items-start gap-4 flex ${
        expanded ? "h-[434px]" : "h-[175px]"
      }`}
    >
      <div
        className="self-stretch justify-start items-center gap-4 inline-flex cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="grow shrink basis-0 self-stretch justify-start items-center gap-4 flex">
          <div className="text-neutral-400 text-base font-bold font-['Satoshi']">
            Vitals
          </div>
          <div className="grow shrink basis-0 self-stretch" />
        </div>
      </div>
      <div className="w-[100px] h-7 text-gray-500 text-base font-bold font-['Satoshi']">
        Weight:
      </div>
      <div className="w-[100px] h-7 text-gray-500 text-base font-bold font-['Satoshi']">
        Temperature:
      </div>
      <div className={`${expanded ? "flex" : "hidden"}`}>
        <div className="flex-col justify-start items-start gap-6 inline-flex">
          <div className="flex-col justify-start items-start gap-4 inline-flex"></div>
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
            <div className="h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 inline-flex">
              <div className="text-indigo-600 text-sm font-medium font-['Roboto']">
                4.8
              </div>
            </div>
            <div className="h-7 px-2 py-1.5 bg-violet-100 rounded-[5px] justify-center items-center gap-2 inline-flex">
              <div className="text-indigo-600 text-sm font-medium font-['Roboto']">
                36
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-4 inline-flex">
            <div className="w-9 h-7 text-neutral-400 text-base font-medium font-['Satoshi']">
              kg
            </div>
            <div className="w-9 h-7 text-neutral-400 text-base font-medium font-['Satoshi']">
              °C
            </div>
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-6 inline-flex">
          <div className="flex-col justify-start items-start gap-4 inline-flex">
            <div className="w-[168px] h-7 text-gray-500 text-base font-bold font-['Satoshi']">
              Heart Rate:
            </div>
            <div className="w-[168px] h-7 text-gray-500 text-base font-bold font-['Satoshi']">
              Pulse:
            </div>
            <div className="w-[168px] h-7 text-gray-500 text-base font-bold font-['Satoshi']">
              Respiratory Rate:
            </div>
            <div className="w-[168px] h-7 text-gray-500 text-base font-bold font-['Satoshi']">
              Capillary Refill Time:
            </div>
            <div className="w-[168px] h-7 text-gray-500 text-base font-bold font-['Satoshi']">
              Body Condition Score:
            </div>
          </div>
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex"></div>
        </div>
      </div>
      <div className="self-stretch justify-start items-start gap-2 inline-flex">
        <div
          className="grow shrink basis-0 text-right text-teal-400 text-base font-medium font-['Satoshi']"
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
