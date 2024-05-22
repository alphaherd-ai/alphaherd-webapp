import React from "react";

const Services = () => {
  return (
    <div className="self-stretch h-56 bg-white rounded-[10px] flex-col justify-start items-start flex">
      <div className="self-stretch h-56 flex-col justify-start items-start flex">
        <div className="self-stretch px-6 py-4 bg-white justify-start items-center gap-4 inline-flex">
          <div className="grow shrink basis-0 h-6 justify-start items-center gap-6 flex">
            <div className="grow shrink basis-0 text-gray-500 text-base font-bold font-['Satoshi']">
              Services
            </div>
          </div>
        </div>
        <div className="self-stretch justify-start items-start inline-flex">
          <div className="pl-6 flex-col justify-start items-start inline-flex">
            <div className="self-stretch h-14 bg-white flex-col justify-center items-start flex">
              <div className="w-24 h-7 px-2 py-1.5 bg-rose-100 rounded-[5px] justify-start items-center gap-2 inline-flex">
                <div className="grow shrink basis-0 text-red-500 text-sm font-medium font-['Satoshi']">
                  STAT
                </div>
                <div className="w-6 h-6 relative" />
              </div>
            </div>
            <div className="w-[88px] h-14 bg-white flex-col justify-center items-start flex">
              <div className="w-24 h-7 px-2 py-1.5 bg-rose-100 rounded-[5px] justify-start items-center gap-2 inline-flex">
                <div className="grow shrink basis-0 text-red-500 text-sm font-medium font-['Satoshi']">
                  STAT
                </div>
                <div className="w-6 h-6 relative" />
              </div>
            </div>
            <div className="self-stretch h-14 bg-white flex-col justify-center items-start flex">
              <div className="w-24 h-7 px-2 py-1.5 bg-gray-100 rounded-[5px] justify-start items-center gap-2 inline-flex">
                <div className="grow shrink basis-0 text-gray-500 text-sm font-medium font-['Satoshi']">
                  PRN
                </div>
                <div className="w-6 h-6 relative" />
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 pr-1 flex-col justify-start items-start inline-flex">
            <div className="self-stretch h-14 p-4 bg-white justify-start items-center gap-4 inline-flex">
              <div className="grow shrink basis-0 text-gray-500 text-base font-medium font-['Satoshi']">
                Buprenorphine Injection
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-white justify-start items-center gap-4 inline-flex">
              <div className="grow shrink basis-0 text-gray-500 text-base font-medium font-['Satoshi']">
                Ultrasound
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-white justify-start items-center gap-4 inline-flex">
              <div className="grow shrink basis-0 text-gray-500 text-base font-medium font-['Satoshi']">
                Laparotomy
              </div>
            </div>
          </div>
          <div className="px-2 flex-col justify-start items-start inline-flex">
            <div className="w-[100px] h-14 p-4 bg-white flex-col justify-center items-start flex">
              <div className="self-stretch justify-start items-start gap-2 inline-flex">
                <div className="w-[42px] px-1 bg-gray-100 rounded-[5px] justify-start items-center gap-2 flex">
                  <div className="text-neutral-400 text-sm font-medium font-['Satoshi']">
                    ₹899
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100px] h-14 p-4 bg-white flex-col justify-center items-start flex">
              <div className="self-stretch text-neutral-400 text-sm font-medium font-['Satoshi']">
                ₹2,300
              </div>
            </div>
            <div className="w-[100px] h-14 p-4 bg-white flex-col justify-center items-start flex">
              <div className="self-stretch text-neutral-400 text-sm font-medium font-['Satoshi']">
                ₹4,532
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start inline-flex">
            <div className="self-stretch h-14 pl-4 pr-6 py-4 bg-white justify-start items-center gap-2 inline-flex">
              <div className="w-[148px] px-2 py-1.5 bg-white rounded-[5px] justify-center items-center gap-1 flex">
                <div className="text-teal-400 text-base font-medium font-['Satoshi']">
                  View products
                </div>
                <div className="w-6 h-6 relative">
                  <img src="/1. Icons-24 (10).png" alt="" />
                </div>{" "}
              </div>
              <div className="w-6 h-6 relative bg-gray-100 rounded-[5px]" />
            </div>
            <div className="self-stretch h-14 p-4 bg-white" />
            <div className="self-stretch h-14 p-4 bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
