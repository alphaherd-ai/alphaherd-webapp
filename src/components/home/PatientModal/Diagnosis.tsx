import Image from "next/image"
import React from "react";
import add from "../../../assets/icons/home/add.png"

const Diagnosis = () => {
  return (
    <div className="self-stretch justify-start items-start gap-4 inline-flex">
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
        <div className="w-[688px] h-[60px] relative">
          <div className="w-[485.45px] h-[60px] px-6 py-4 left-0 top-0 absolute bg-white rounded-[10px] flex-col justify-center items-start gap-4 inline-flex">
            <div className="self-stretch justify-start items-center gap-4 inline-flex">
              <div className="justify-start items-center gap-2 flex">
                <div className="w-6 h-6 relative" />
                <div className="text-neutral-400 text-base font-medium font-['Satoshi']">
                  Diagnosis
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="h-7 px-2 py-1.5 bg-red-500 rounded-[5px] justify-center items-center gap-2 inline-flex">
                  <div className="text-white text-sm font-medium font-['Satoshi']">
                    Dyspnea
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[184.45px] h-[60px] px-6 py-4 left-[503.55px] top-0 absolute bg-white rounded-[10px] flex-col justify-center items-start gap-4 inline-flex">
            <div className="justify-start items-center gap-4 inline-flex">
              <div className="justify-start items-center gap-2 flex">
                <div className="w-4 h-4 justify-end items-center flex">
                  <div className="w-6 h-6 relative">
                    <div className="w-8 h-8 left-0 top-1 absolute">
                      <Image src={add} alt="" />
                    </div>
                  </div>
                </div>
                <div className="justify-start items-center gap-4 flex">
                  <div className="text-teal-400 text-sm font-medium font-['Satoshi']">
                    Add Diagnosis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-6 justify-start items-center gap-2 inline-flex">
          <div className="">
            <input
              className="w-4 h-4 bg-cyan-400"
              type="checkbox"
              name="chronic"
              id=""
            />
          </div>
          <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-4 flex">
            <div className="grow shrink basis-0 self-stretch justify-start items-center gap-4 flex">
              <div className="w-[184px] text-gray-500 text-base font-medium font-['Satoshi']">
                Mark as chronic
              </div>
              <div className="grow shrink basis-0 self-stretch" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
