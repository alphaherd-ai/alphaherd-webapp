
import React, { useState } from "react";
import dropIcon from "../../../assets/icons/home/chevron_left.png"
import Image from "next/image";
const Services = () => {

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleSelectChange = (event:any) => {
    setSelectedOption(event.target.value);
  };
  const handleSelectChange1 = (event:any) => {
    setSelectedOption1(event.target.value);
  };

  const getBackgroundColor = () => {
    switch (selectedOption) {
      case '#FFEAEA':
        return '#FFEAEA';
      case '#FFF0E9':
        return '#FFF0E9';
      case '#FFF9E8':
        return '#FFF9E8';
      default:
        return '#F4F5F7';
    }
  };

  const getTextColor = () => {
    
    switch (selectedOption) {
      case '#FF3030':
        return '#FF3030';
      case '#FC6E20':
        return '#FC6E20';
      case '#FC6E20':
        return '#FC6E20';
      default:
        return '#6B7E7D';
    }
  }

  const getBackgroundColor1 = () => {
    switch (selectedOption1) {
      case '#FFEAEA':
        return '#FFEAEA';
      case '#FFF0E9':
        return '#FFF0E9';
      case '#FFF9E8':
        return '#FFF9E8';
      default:
        return '#F4F5F7';
    }
  };

  return (
    <div className={`w-[688px] bg-white px-6 py-4 flex flex-col gap-4 ${expanded ? "": "" }`}>
      <div className="w-full">
        <span className="text-gray-500 text-base font-bold">
          Services
        </span>
      </div>

      <div className="w-full flex items-center gap-2">
        <div>
          <select 
        className="outline-none border-0 px-2 py-2 rounded-lg"
        value={selectedOption} 
        onChange={handleSelectChange} 
        style={{ backgroundColor: getBackgroundColor(), color: getTextColor() }}
      >
        <option className="text-[#6B7E7D]" value="#F4F5F7">PRN</option>
        <option className="text-[#FF3030]" value="#FFEAEA">STAT</option>
        <option className="text-[#FC6E20]" value="#FFF0E9">ASAP</option>
        <option className="text-[#FFBF1A]" value="#FFF9E8">Routine</option>
          </select>
        </div>
        <div className="w-[50%]">
          <span className="text-gray-500 text-base font-medium">Buprenorphine Injection</span>
        </div>
        <div className="w-[20%]">
          <div className="w-[42px] h-6 px-1 bg-gray-100 rounded-[5px] justify-start items-center gap-2 inline-flex">
            <span className="text-neutral-400 text-sm font-medium">
              ₹899
            </span>
          </div>
        </div>
        <div onClick={toggleExpanded}>
        <div className="w-[148px] h-6 px-2 py-1.5 bg-white rounded-[5px] justify-center items-center gap-1 flex hover:cursor-pointer">
          <span className="text-teal-400 text-base font-medium">View Services</span>
          <div className="w-6 h-6">
            <Image src={dropIcon} alt="dropIcon" />
          </div>
        </div>
        </div>
      </div>

        <div className={`${expanded ? "flex" : "hidden"}`}>

        <div className="w-full flex items-center gap-2">
        <div>
          <select 
        className="outline-none border-0 px-2 py-2 rounded-lg"
        value={selectedOption1} 
        onChange={handleSelectChange1} 
        style={{ backgroundColor: getBackgroundColor1() }}
      >
        <option className="text-[#6B7E7D]" value="#F4F5F7">PRN</option>
        <option className="text-[#FF3030]" value="#FFEAEA">STAT</option>
        <option className="text-[#FC6E20]" value="#FFF0E9">ASAP</option>
        <option className="text-[#FFBF1A]" value="#FFF9E8">Routine</option>
          </select>
        </div>
        <div className="w-[43%]">
          <span className="text-gray-500 text-base font-medium">Buprenorphine Injection</span>
        </div>
        <div className="w-[20%]">
          <div className="w-[42px] h-6 px-1 bg-gray-100 rounded-[5px] justify-start items-center gap-2 inline-flex">
            <span className="text-neutral-400 text-sm font-medium">
              ₹899
            </span>
          </div>
        </div>
          </div>
      
        </div>


      

    </div>
  );
};

export default Services;

