import React, { useState } from "react";
import dropIcon from "../../../assets/icons/home/chevron_left.png"
import Image from "next/image";

const Products = () => {

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`w-[688px] bg-white px-6 py-4 flex flex-col gap-4 ${expanded ? "": "" }`}>
      <div className="w-full">
        <span className="text-gray-500 text-base font-bold">
        Products
        </span>
      </div>

      <div className="w-full flex items-center gap-2">
        
        <div className="w-[62%]">
          <span className="text-gray-500 text-base font-medium">Syringe</span>
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
          <span className="text-teal-400 text-base font-medium">View Products</span>
          <div className="w-6 h-6">
            <Image src={dropIcon} alt="dropIcon" />
          </div>
        </div>
        </div>
      </div>

        <div className={`${expanded ? "flex" : "hidden"}`}>

        <div className="w-full flex items-center gap-2">
        
        <div className="w-[56%]">
          <span className="text-gray-500 text-base font-medium">Syringe</span>
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

export default Products;
