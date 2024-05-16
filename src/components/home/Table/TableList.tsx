import Image from "next/image"
import React, { useState } from "react";
import Symptoms from "../PatientModal/Symptoms";
import Vitals from "../PatientModal/Vitals";
import Diagnosis from "../PatientModal/Diagnosis";
import Services from "../PatientModal/Services";
import Products from "../PatientModal/Products";
import Medication from "../PatientModal/Medication";
import Notes from "../PatientModal/Notes";
import UnderNotesButtons from "../PatientModal/UnderNotesButtons";
import Icons from "../../../assets/icons/home/1. Icons-24 (13).png"
import Icons2 from "../../../assets/icons/home/1. Icons-24 (3).png"
import search from "../../../assets/icons/home/search.png"
import Icons16 from "../../../assets/icons/home/Icons16.png"
import Icons3 from "../../../assets/icons/home/1. Icons-24 (8).png"
import Icons4 from "../../../assets/icons/home/1. Icons-24 (7).png"
import Icons5 from "../../../assets/icons/home/1. Icons-24 (6).png"
import Icons6 from "../../../assets/icons/home/1. Icons-24 (5).png"


interface Column {
  name: string;
  patient: string;
  reason: string;
  time: string;
  service: string;
}

const TableList: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
  const [clickedRowIndex, setClickedRowIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClick = (index: number, option: string) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [index]: option,
    }));
    setClickedRowIndex(index);
    setIsModalOpen(true);
  };

  const columns = [
    {
      name: "Hello",
      patient: "Jow",
      reason: "Lorem ipsum dolor sit amet consectetur.",
      time: "9:30 - 5:30",
      service: "service",
    },
    {
      name: "star",
      patient: "Patient",
      reason: "Lorem ipsum dolor sit amet consectetur.",
      time: "9:30 - 5:30",
      service: "service",
    },
    {
      name: "star1",
      patient: "Patient",
      reason: "Lorem ipsum dolor sit amet consectetur.",
      time: "9:30 - 5:30",
      service: "service",
    },
    {
      name: "star2",
      patient: "Patient",
      reason: "Lorem ipsum dolor sit amet consectetur.",
      time: "9:30 - 5:30",
      service: "service",
    },
    {
      name: "star3",
      patient: "Patient",
      reason: "Lorem ipsum dolor sit amet consectetur.",
      time: "9:30 - 5:30",
      service: "service",
    },
  ];

  return (
    <div className="flex">
      {/* Render Modal */}
      {isModalOpen && (
        <div className="fixed top-0 right-0 h-full w-[740px] bg-gray-200 z-50 overflow-y-scroll mt-[5px] rounded-xl">
          {/* Modal Content */}
          <div className="flex flex-col h-full">
            <div className="w-[720px] h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 flex-col justify-center items-start gap-6 inline-flex">
              <div className="self-stretch justify-start items-center gap-4 inline-flex">
                <div className="justify-start items-center flex">
                  <div className="w-6 h-6 relative">
                    {/* <Image
                      className="w-6 h-6 left-0 top-0 absolute rounded-full border border-neutral-400"
                      src="https://via.placeholder.com/24x24"
                      alt=""
                    />
                    <Image
                      className="w-6 h-6 left-0 top-0 absolute rounded-full border border-neutral-400"
                      src="https://via.placeholder.com/24x24"
                      alt=""
                    />
                    <Image
                      className="w-6 h-6 left-0 top-0 absolute rounded-full border border-neutral-400"
                      src="https://via.placeholder.com/24x24"
                      alt=""
                    />
                    <Image
                      className="w-6 h-6 left-0 top-0 absolute rounded-full border border-neutral-400"
                      src="https://via.placeholder.com/24x24"
                      alt=""
                    />
                    <Image
                      className="w-6 h-6 left-0 top-0 absolute rounded-full border border-neutral-400"
                      src="https://via.placeholder.com/24x24"
                      alt=""
                    /> */}
                  </div>
                </div>
                <div className="grow shrink basis-0 text-gray-500 text-xl font-bold font-['Satoshi']">
                  Consultation Details
                </div>
                <div className="h-9 px-6 py-4 rounded-[5px] border border-gray-500 flex-col justify-center items-start gap-4 inline-flex">
                  <div className="justify-start items-center gap-4 inline-flex">
                    <div className="w-6 h-6 relative">
                      <Image src={Icons6} alt="" />
                    </div>
                    <div className="justify-start items-center gap-4 flex">
                      <div className="text-gray-500 text-base font-bold font-['Satoshi']">
                        Attach Image/Report
                      </div>
                    </div>
                  </div>
                </div>
                <div className="justify-start items-start gap-4 flex">
                  <div className="w-6 h-6 relative" />
                  <div className="w-6 h-6 relative" />
                </div>
              </div>
            </div>
            <div className="w-[720px] h-[2021px] px-4 py-5 bg-gray-100 rounded-bl-[10px] rounded-br-[10px] border border-neutral-400 flex-col justify-start items-start gap-4 inline-flex">
              <div className="self-stretch justify-start items-center gap-2 inline-flex">
                <div className="px-2 py-1 bg-zinc-900 rounded-[5px] justify-start items-center gap-1 flex">
                  <div className="w-5 h-5 relative">
                    <Image src={Icons5} alt="" />
                  </div>
                  <div className="text-white text-sm font-bold font-['Roboto']">
                    View Previous
                  </div>
                </div>
                <div className="grow shrink basis-0 text-center text-gray-500 text-base font-medium font-['Satoshi']">
                  26th June, 2024
                </div>
                <div className="px-2 py-1 bg-zinc-900 rounded-[5px] justify-start items-center gap-1 flex">
                  <div className="text-white text-sm font-bold font-['Roboto']">
                    View Next
                  </div>
                  <div className="w-5 h-5 relative">
                    <Image src={Icons4} alt="" />
                  </div>
                </div>
              </div>
              <div className="w-[688px] justify-start items-start gap-4 flex flex-wrap">
                <div className="w-[218.67px] h-9 px-4 py-2.5 bg-indigo-600 rounded-[5px] justify-start items-center gap-2 flex">
                  <div className="w-6 h-6 relative">
                    <Image src={Icons3} alt="" />
                  </div>
                  <div className="grow shrink basis-0 text-white text-base font-bold font-['Satoshi']">
                    Spike_Ultrasound.pdf
                  </div>
                </div>
                <div className="w-[218.67px] h-9 px-4 py-2.5 bg-indigo-600 rounded-[5px] justify-start items-center gap-2 flex">
                  <div className="w-6 h-6 relative">
                    <Image src={Icons3} alt="" />
                  </div>
                  <div className="grow shrink basis-0 text-white text-base font-bold font-['Satoshi']">
                    Spike_Ultrasound.pdf
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 px-6 py-4 bg-white rounded-[10px] flex-col justify-start items-start gap-4 inline-flex">
                  <div className="self-stretch justify-start items-start gap-6 inline-flex">
                    <div className="grow shrink basis-0">
                      <span className="text-neutral-400 text-base font-medium font-['Satoshi']">
                        Client Name:
                      </span>
                      <span className="text-gray-500 text-base font-medium font-['Satoshi']">
                        {" "}
                      </span>
                      <span className="text-gray-500 text-base font-bold font-['Satoshi']">
                        {columns[clickedRowIndex] &&
                          columns[clickedRowIndex].name}
                      </span>
                    </div>
                    <div className="grow shrink basis-0 h-6 justify-start items-start gap-2 flex">
                      <div>
                        <span className="text-neutral-400 text-base font-medium font-['Satoshi']">
                          Ph:
                        </span>
                        <span className="text-gray-500 text-base font-medium font-['Satoshi']">
                          {" "}
                        </span>
                        <span className="text-gray-500 text-base font-bold font-['Satoshi']">
                          8618284339
                        </span>
                      </div>
                      <div className="grow shrink basis-0 h-6 justify-start items-start gap-2 flex">
                        <div className="w-6 h-6 relative">
                          <Image src={Icons16} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 px-6 py-4 bg-white rounded-[10px] flex-col justify-start items-start gap-4 inline-flex">
                  <div className="self-stretch justify-start items-start gap-6 inline-flex">
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
                      <div>
                        <span className="text-neutral-400 text-base font-medium font-['Satoshi']">
                          Patient Name:
                        </span>
                        <span className="text-gray-500 text-base font-medium font-['Satoshi']">
                          {" "}
                        </span>
                        <span className="text-gray-500 text-base font-bold font-['Satoshi']">
                          {columns[clickedRowIndex] &&
                            columns[clickedRowIndex].patient}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 text-base font-medium font-['Satoshi']">
                          Species:
                        </span>
                        <span className="text-gray-500 text-base font-medium font-['Satoshi']">
                          {" "}
                        </span>
                        <span className="text-gray-500 text-base font-bold font-['Satoshi']">
                          Monkey
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 text-base font-medium font-['Satoshi']">
                          Breed:
                        </span>
                        <span className="text-gray-500 text-base font-medium font-['Satoshi']">
                          {" "}
                        </span>
                        <span className="text-gray-500 text-base font-bold font-['Satoshi']">
                          Capuchin
                        </span>
                      </div>
                    </div>
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
                      <div>
                        <span className="text-neutral-400 text-base font-medium font-['Satoshi']">
                          Age:
                        </span>
                        <span className="text-gray-500 text-base font-medium font-['Satoshi']">
                          {" "}
                        </span>
                        <span className="text-gray-500 text-base font-bold font-['Satoshi']">
                          1 yr 2m
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 text-base font-medium font-['Satoshi']">
                          Gender:
                        </span>
                        <span className="text-gray-500 text-base font-medium font-['Satoshi']">
                          {" "}
                        </span>
                        <span className="text-gray-500 text-base font-bold font-['Satoshi']">
                          Male
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-[92px] px-6 py-4 bg-white rounded-[10px] flex-col justify-start items-start gap-4 flex">
                <div className="self-stretch justify-start items-center gap-4 inline-flex">
                  <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-4 flex">
                    <div className="grow shrink basis-0 text-neutral-400 text-base font-medium font-['Satoshi']">
                      Reason for Visit
                    </div>
                  </div>
                </div>
                <div className="self-stretch justify-start items-center gap-4 inline-flex">
                  <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-4 flex">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">
                      {columns[clickedRowIndex] &&
                        columns[clickedRowIndex].reason}
                    </div>
                  </div>
                </div>
              </div>
              <Symptoms />
              <Vitals />
              <Diagnosis />
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 h-11 px-4 py-[13px] bg-white rounded-[5px] justify-start items-center gap-3.5 flex">
                  <div className="grow shrink basis-0 text-neutral-400 text-base font-medium font-['Satoshi']">
                    Search for a service, product or treatment template
                  </div>
                  <div className="w-[23.19px] h-[23.19px] relative">
                    <div className="w-[23.19px] h-[23.19px] left-0 top-0 absolute ">
                      <Image src={search} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <Services />
              <Products />
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 h-11 px-4 py-[13px] bg-white rounded-[5px] justify-start items-center gap-3.5 flex">
                  <div className="grow shrink basis-0 text-neutral-400 text-base font-medium font-['Satoshi']">
                    Search for medication
                  </div>
                  <div className="w-[23.19px] h-[23.19px] relative">
                    <div className="w-[23.19px] h-[23.19px] left-0 top-0 absolute ">
                    <Image src={search} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <Medication />
              <Notes />
              <UnderNotesButtons />
              <div className="self-stretch h-[94px] px-6 py-4 bg-white rounded-[10px] flex-col justify-start items-start gap-4 flex">
                <div className="self-stretch justify-start items-center gap-4 inline-flex">
                  <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-4 flex">
                    <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                      <div className="grow shrink basis-0 text-gray-500 text-base font-bold font-['Satoshi']">
                        Dyspnea - Follow-up
                      </div>
                    </div>
                  </div>
                  <div className="justify-start items-center gap-2 flex">
                    <div className="w-6 h-6 relative bg-gray-100 rounded-[5px]" />
                    <div className="w-6 h-6 relative bg-gray-100 rounded-[5px]" />
                  </div>
                </div>
                <div className="self-stretch justify-start items-center gap-4 inline-flex">
                  <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-4 flex">
                    <div className="text-gray-500 text-base font-medium font-['Satoshi']">
                      Sep 18, 2023
                    </div>
                    <div className="grow shrink basis-0 text-right text-gray-500 text-base font-medium font-['Satoshi']">
                      9:00am - 1:00pm
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-end items-start gap-4 inline-flex">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                  <div className="w-6 h-6 relative" />
                  <div className="text-white text-base font-bold font-['Satoshi']">
                    Print Prescription
                  </div>
                </div>
                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                  <div className="w-5 h-5 relative">
                    <div className="w-5 h-5 left-0 top-0 absolute bg-zinc-300" />
                  </div>
                  <div className="text-white text-base font-bold font-['Satoshi']">
                    Create Invoice
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render Table */}
      <div>
        {columns.map((col, index) => {
          const selectedOption = selectedOptions[index] || "In Progress";

          return (
            <div
              key={index}
              className="flex w-[1480px] h-[55px] px-6 bg-white border-b border-neutral-400 justify-start items-center gap-4 cursor-pointer"
              onClick={() => handleClick(index, "Checked in")}
            >
              <div
                className=""
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="w-8 h-8 flex justify-center items-center gap-2">
                  <div className="w-6 h-6 ">
                    <Image src={Icons2} alt="" />
                  </div>
                </div>
                {isHovered && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-md dialogue-box">
                    Mark as complete
                  </div>
                )}
              </div>
              <div className="w-[16.6%] ">
                <span className="text-neutral-400 font-base font-['Satoshi']">
                  {col.name}
                </span>
              </div>
              <div className="w-[14.6%]">
                <span className="text-neutral-400 font-base font-['Satoshi']">
                  {col.patient}
                </span>
              </div>
              <div className="w-[20.6%]">
                <span className="text-neutral-400 font-base font-['Satoshi']">
                  {col.reason}
                </span>
              </div>
              <div className="w-[14.6%]">
                <span className="text-neutral-400 font-base font-['Satoshi']">
                  {col.time}
                </span>
              </div>
              <div className="w-[16.6%]">
                <span className="text-neutral-400 font-base">
                  {col.service}
                </span>
              </div>
              <div className="w-[16.6%] hover:cursor-pointer">
                <div className="py-2 border-stone-300 justify-start items-center gap-2 flex">
                  <div className="justify-end items-start flex">
                    <div
                      className={`px-2 py-1 border border-neutral-400 justify-start items-center gap-1 flex ${
                        selectedOption === "Checked in"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-neutral-400"
                      } rounded-tl rounded-bl cursor-pointer`}
                      onClick={() => handleClick(index, "Checked in")}
                    >
                      <div className="text-sm font-bold font-['Satoshi']">
                        Checked in
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 border border-neutral-400 justify-start items-center gap-1 flex ${
                        selectedOption === "In Progress"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-neutral-400"
                      } rounded-tr-[5px] rounded-br-[5px] cursor-pointer`}
                      onClick={() => handleClick(index, "In Progress")}
                    >
                      <div className="text-sm font-bold font-['Satoshi']">
                        In Progress
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-6 h-6 flex justify-center items-center gap-2 ">
                <div className="w-6 h-6">
                  <Image
                    className="w-6 h-6 left-0 top-0 rounded-full border border-neutral-400"
                    src={Icons}
                    alt=""
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableList;
