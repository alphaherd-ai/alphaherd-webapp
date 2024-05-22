import Image from "next/image"
import React, { useState } from "react";

const FilterDropCard = () => {
  const [activeTab, setActiveTab] = useState("services");

  const handleTabChange = (tab:any) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-[396px] h-[341px] px-4 py-6 bg-white rounded-[10px] flex-col justify-start items-start gap-4 inline-flex  shadow-lg">
      <div className="justify-end items-start inline-flex">
        <div
          className={`px-2 py-1 ${
            activeTab === "services"
              ? "bg-zinc-900 border-zinc-900"
              : "bg-gray-100 border-neutral-400"
          } rounded-tl-[5px] rounded-bl-[5px] border justify-start items-center gap-1 flex`}
          onClick={() => handleTabChange("services")}
        >
          <div
            className={`text-sm font-bold  ${
              activeTab === "services" ? "text-white" : "text-neutral-400"
            }`}
          >
            Services
          </div>
          <div className="w-4 h-4 p-2 bg-teal-400 rounded-[17px] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-[10px] font-medium ">
              2
            </div>
          </div>
        </div>
        <div
          className={`px-2 py-1 ${
            activeTab === "providers"
              ? "bg-zinc-900 border-zinc-900"
              : "bg-gray-100 border-neutral-400"
          } rounded-tr-[5px] rounded-br-[5px] border justify-start items-center gap-1 flex`}
          onClick={() => handleTabChange("providers")}
        >
          <div
            className={`text-sm font-bold  ${
              activeTab === "providers" ? "text-white" : "text-neutral-400"
            }`}
          >
            Providers
          </div>
          <div className="w-4 h-4 p-2 bg-teal-400 rounded-[17px] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-[10px] font-medium ">
              1
            </div>
          </div>
        </div>
      </div>
      {activeTab === "services" ? (
        <div className="self-stretch justify-start items-center gap-1 inline-flex">
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
            <div className="self-stretch h-[35px] flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-3.5 inline-flex">
                <div className="grow shrink basis-0 text-neutral-400 text-sm font-medium ">
                  Search for service
                </div>
                <div className="w-4 h-4 relative">
                  <div className="w-4 h-4 left-0 top-0 absolute bg-gray-500" />
                </div>
              </div>
            </div>
            <div className="justify-start items-center gap-2 inline-flex">
              <input type="checkbox" className="w-4 h-4 relative" />
              <div className="text-gray-500 text-sm font-medium ">
                General Consultation
              </div>
            </div>
            <div className="justify-start items-center gap-2 inline-flex">
              <input type="checkbox" className="w-4 h-4 relative" />
              <div className="text-gray-500 text-sm font-medium ">
                Follow up
              </div>
            </div>
            <div className="justify-start items-center gap-2 inline-flex">
              <input type="checkbox" className="w-4 h-4 relative" />
              <div className="text-gray-500 text-sm font-medium ">
                Grooming
              </div>
            </div>
            <div className="justify-start items-center gap-2 inline-flex">
              <input type="checkbox" className="w-4 h-4 relative" />
              <div className="text-gray-500 text-sm font-medium ">
                Cystotomy
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="self-stretch justify-start items-center gap-1 inline-flex">
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
            <div className="justify-start items-center gap-2 inline-flex">
              <input type="checkbox" className="w-4 h-4 relative" />
              <div className="text-gray-500 text-sm font-medium ">
                Dr. Anjana Suresh
              </div>
            </div>
            <div className="justify-start items-center gap-2 inline-flex">
              <input type="checkbox" className="w-4 h-4 relative" />
              <div className="text-gray-500 text-sm font-medium ">
                Dr. Rahul Anand
              </div>
            </div>
            <div className="justify-start items-center gap-2 inline-flex">
              <input type="checkbox" className="w-4 h-4 relative" />
              <div className="text-gray-500 text-sm font-medium ">
                Anshul Acharya
              </div>
            </div>
            <div className="justify-start items-center gap-2 inline-flex">
              <input type="checkbox" className="w-4 h-4 relative" />
              <div className="text-gray-500 text-sm font-medium ">
                Abhimanyu Ghosle
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="self-stretch h-[39px] flex-col justify-start items-end gap-2.5 flex">
        <div className="px-4 py-2.5 bg-teal-400 rounded-[5px] justify-start items-center gap-2 inline-flex">
          <div className="text-white text-base font-bold ">
            Apply
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDropCard;
