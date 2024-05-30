import Image from "next/image"
import React, { useState, useRef, useMemo } from "react";
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
import printButton from "../../../assets/icons/home/1. Icons-24 (9).svg"
import reciept from "../../../assets/icons/home/receipt_long.svg"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from "@nextui-org/react";


interface Column {
  name: string;
  patient: string;
  reason: string;
  time: string;
  service: string;
}



const TableList: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
  const [clickedRowIndex, setClickedRowIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));


  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const phoneNumber = "8618284339";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(phoneNumber).then(() => {
      console.log("Tex Copied")
    });
  };

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleClick = (index: number, option: string) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [index]: option,
    }));
    setClickedRowIndex(index);
    setIsModalOpen(true);
  };

  const handleClickForTabs = (index: number, option: string) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [index]: option,
    }));
    setClickedRowIndex(index);
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
      patient: "Patient1",
      reason: "Lorem ipsum dolor sit amet consectetur.",
      time: "9:30 - 5:30",
      service: "service",
    },
    {
      name: "star2",
      patient: "Patient2",
      reason: "Lorem ipsum dolor sit amet consectetur.",
      time: "9:30 - 5:30",
      service: "service",
    },
    {
      name: "star3",
      patient: "Patient3",
      reason: "Lorem ipsum dolor sit amet consectetur.",
      time: "9:30 - 5:30",
      service: "service",
    },
    
    
  ];

  return (
    <div className="flex bg-black bg-opacity-50">
      {/* Render Modal */}
      {isModalOpen  && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="fixed top-0 right-0 h-full min-w-[745px] bg-gray-100 z-50 overflow-y-scroll mt-[5px] rounded-xl shadow-md backdrop-filter backdrop-blur-[20px]">
          {/* Modal Content */}
          <div className="flex flex-col min-h-[720px]">
            <div className="w-[720px] min-h-[84px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 flex-col justify-center items-start gap-6 flex ">
              <div className="self-stretch justify-start items-center gap-4 flex">
                <div className="justify-start items-center flex">
                  <div className="w-6 h-6 relative">
                    
                  </div>
                </div>
                <div className="grow shrink basis-0 text-gray-500 text-xl font-bold ">
                  Consultation Details
                </div>
                <div className="h-9 px-6 py-4 rounded-[5px] border border-gray-500 flex-col justify-center items-start gap-4 inline-flex">
                  <div className="justify-start items-center gap-4 inline-flex border-1 border-gray-200 border-dashed px-2 py-1">
                    <div className="w-6 h-6 relative">
                      <Image src={Icons6} alt="" />
                    </div>
                    <div className="justify-start items-center gap-4 flex">
                      <div className="text-gray-500 text-base">
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
                  <div className="text-white text-sm ">
                    View Previous
                  </div>
                </div>
                <div className="grow shrink basis-0 text-center text-gray-500 text-base font-medium ">
                  26th June, 2024
                </div>
                <div className="px-2 py-1 bg-zinc-900 rounded-[5px] justify-start items-center gap-1 flex">
                  <div className="text-white text-sm ">
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
                  <div className="grow shrink basis-0 text-white text-base">
                    Spike_Ultrasound.pdf
                  </div>
                </div>
                <div className="w-[218.67px] h-9 px-4 py-2.5 bg-indigo-600 rounded-[5px] justify-start items-center gap-2 flex">
                  <div className="w-6 h-6 relative">
                    <Image src={Icons3} alt="" />
                  </div>
                  <div className="grow shrink basis-0 text-white text-base">
                    Spike_Ultrasound.pdf
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 px-6 py-4 bg-white rounded-[10px] flex-col justify-start items-start gap-4 inline-flex">
                  <div className="self-stretch justify-start items-start gap-6 inline-flex">
                    <div className="grow shrink basis-0">
                      <span className="text-neutral-400 text-base font-medium ">
                        Client Name:
                      </span>
                      <span className="text-gray-500 text-base font-medium ">
                        {" "}
                      </span>
                      <span className="text-gray-500 text-base font-bold ">
                        {columns[clickedRowIndex] &&
                          columns[clickedRowIndex].name}
                      </span>
                    </div>
                    <div className="grow shrink basis-0 h-6 justify-start items-start gap-2 flex">
                      <div>
                        <span className="text-neutral-400 text-base font-medium ">
                          Ph:
                        </span>
                        <span className="text-gray-500 text-base font-medium ">
                          {" "}
                        </span>
                        <span className="text-gray-500 text-base font-bold ">
                          {phoneNumber}
                        </span>
                      </div>
                      <div className="grow shrink basis-0 h-6 justify-start items-start gap-2 flex cursor-pointer" onClick={copyToClipboard}>
                        <div className="w-4 mt-[3px]">
                          <Image className="w-4 h-4" src={Icons16} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[100%] bg-white px-6 py-4 rounded-lg flex flex-col gap-4">
                <div className="w-[100%] flex justify-start gap-[12.5rem]">
                  <div>
                    <span className="text-neutral-400 text-base font-medium">Patient Name: </span>
                    <span className="text-gray-500 text-base font-bold">{columns[clickedRowIndex] &&
                          columns[clickedRowIndex].patient}</span>
                  </div>
                  <div>
                  <span className="text-neutral-400 text-base font-medium">Age: </span>
                  <span className="text-gray-500 text-base font-bold">1 yr 2m</span>
                  </div>
                </div>
                <div className="w-[100%] flex justify-start gap-[13rem]">
                  <div>
                    <span className="text-neutral-400 text-base font-medium">Species: </span>
                    <span className="text-gray-500 text-base font-bold">Monkey</span>
                  </div>
                  <div>
                  <span className="text-neutral-400 text-base font-medium">Gender: </span>
                  <span className="text-gray-500 text-base font-bold">Male</span>
                  </div>
                </div>
                <div className="w-[100%] flex justify-start gap-[12.5rem]">
                  <div>
                    <span className="text-neutral-400 text-base font-medium">Breed: </span>
                    <span className="text-gray-500 text-base font-bold">Capuchin</span>
                  </div>
                  
                </div>
              </div>
              <div className="w-[688px] bg-white px-5 py-4 rounded-xl flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div>
          <span className="text-neutral-400 text-base font-medium">Reason For Visit</span>
        </div>
      </div>
      <div>
        <span className="text-neutral-500 text-base font-medium">{columns[clickedRowIndex] &&
                        columns[clickedRowIndex].reason}</span>
      </div>

    </div>
                      
              <Symptoms />
              <Vitals />
              <Diagnosis />
              <div className="w-[688px] bg-white h-15 rounded-md flex justify-center items-center p-2 px-2 gap-2">
                <input className="border-0 outline-none h-[100%] text-neutral-400 text-base font-medium  w-[90%]" type="text" placeholder="Search for a service, product or treatment template" />
                <div className="w-4">
                  <Image src={search} alt="search" />
                </div>
              </div>
              <Services />
              <Products />
              <div className="w-[688px] bg-white h-11 rounded-md flex justify-center items-center p-2 px-2 gap-2">
                <input className="border-0 outline-none h-[100%] text-neutral-400 text-base font-medium  w-[90%]" type="text" placeholder="Search for medication" />
                <div className="w-4">
                  <Image src={search} alt="search" />
                </div>
              </div>
              <Medication />
              <Notes />
              <UnderNotesButtons />
              <div className="self-stretch h-[94px] px-6 py-4 bg-white rounded-[10px] flex-col justify-start items-start gap-4 flex">
                <div className="self-stretch justify-start items-center gap-4 inline-flex">
                  <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-4 flex">
                    <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                      <div className="grow shrink basis-0 text-gray-500 text-base font-bold ">
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
                    <div className="text-gray-500 text-base font-medium ">
                      Sep 18, 2023
                    </div>
                    <div className="grow shrink basis-0 text-right text-gray-500 text-base font-medium ">
                      9:00am - 1:00pm
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end gap-2">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex hover:cursor-pointer">
                  <div className="w-6 h-6">
                    <Image src={printButton} alt="printButton" />
                  </div>
                  <div className="text-white text-base" onClick={handleClose}>
                    Print Prescription
                  </div>
                </div>
                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex hover:cursor-pointer">
                  <div className="w-5 h-5 ">
                    <Image src={reciept} alt="reciept" />
                  </div>
                  <div className="text-white text-base ">
                    Create Invoice
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Render Table */}
      <div className="w-full">
        {columns.map((col, index) => {
          const selectedOption = selectedOptions[index] || "";

          return (
            <div
              key={index}
              className={`flex w-full h-16 px-4 bg-white border-[1px] border-solid border-r-[#A2A3A3] border-t-0 border-l-[#A2A3A3] border-b-[#A2A3A3]  justify-start items-center gap-4 cursor-pointer ${selectedOption === "Checked in" ? "bg-[#ebedff] text-[#3C50FF]" : "text-neutral-400" && selectedOption === "In Progress" ? "bg-[#e6f4ed] text-[#0F9D58]" : "text-neutral-400"}  `}
            >
              <div className="mr-[5px]">
                <div className="w-8 h-8 flex justify-center items-center gap-2">
              <Tooltip className="bg-black text-xs rounded-md text-white" showArrow={true} content="Mark as complete">
                  <div className="w-6 h-6 ">
                    <Image src={Icons2} alt="" />
                  </div>
                </Tooltip>
                </div>
              </div>
              <div key={index} className="w-[16.6%] " onClick={() => handleClick(index, selectedOption)}>
                <span className=" text-base ">
                  {col.name}
                </span>
              </div>
              <div className="w-[14.6%]">
                <span className=" text-base ">
                  {col.patient}
                </span>
              </div>
              <div className="w-[20.6%]">
              <Tooltip className="bg-black text-xs rounded-md text-white" showArrow={true} content={col.reason}>
                <span className=" text-base ">
                  {col.reason}
                </span>
                </Tooltip>
              </div>
              <div className="w-[14.6%]">
                <span className=" text-base ">
                  {col.time}
                </span>
              </div>
              <div className="w-[16.6%]">
                <span className=" text-base">
                  {col.service}
                </span>
              </div>
              <div className="w-[16.6%] hover:cursor-pointer ">
                <div className="py-2 border-stone-300 justify-start items-center gap-2 flex rounded-lg">
                  <div className="justify-end items-start flex border border-solid border-[#A2A3A3] rounded-md">
                    <div
                      className={`px-2 py-1 border border-neutral-400 justify-start items-center gap-1 flex ${
                        selectedOption === "Checked in"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-neutral-400"
                      } rounded-tl rounded-bl cursor-pointer`}
                      onClick={() => handleClickForTabs(index, "Checked in")}
                    >
                      <div className="text-sm font-bold ">
                        Checked in
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 border border-neutral-400 justify-start items-center gap-1 flex ${
                        selectedOption === "In Progress"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-neutral-400"
                      } rounded-tr-[5px] rounded-br-[5px] cursor-pointer`}
                      onClick={() => handleClickForTabs(index, "In Progress")}
                    >
                      <div className="text-sm font-bold ">
                        In Progress
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Dropdown key={index} placement="bottom-end">
              <DropdownTrigger>
              <Button className="w-6 h-6 flex justify-center items-center gap-2 ">
                <div className="w-6 h-6">
                  {/* <Image
                    className="w-6 h-6 left-0 top-0 rounded-full border border-neutral-400"
                    src={Icons}
                    alt=""
                  /> */}
                  {selectedValue}
                </div>
              </Button>
              </DropdownTrigger>
              <DropdownMenu 
              variant="shadow"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
              >
                <DropdownItem key="text">Text</DropdownItem>
                <DropdownItem key="number">Number</DropdownItem>
                <DropdownItem key="date">Date</DropdownItem>
                <DropdownItem key="single_date">Single Date</DropdownItem>
                <DropdownItem key="iteration">Iteration</DropdownItem>

              </DropdownMenu>
              </Dropdown>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableList;



