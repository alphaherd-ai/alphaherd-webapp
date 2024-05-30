import React from "react";
import TableList from "./TableList";

const TableContent = () => {
  return (<>
      <div className="w-full py-4 border-[1px] border-solid border-r-[#A2A3A3] border-t-0 border-l-[#A2A3A3] border-b-[#A2A3A3] px-6 bg-[#F4F5F7] justify-start items-center gap-4 inline-flex ">
        <div className="w-[15%] ml-[2.7rem] ">
          <span className="text-gray-500 text-base">Client</span>
        </div>
        <div className="w-[12.5%] ">
          <span className="text-gray-500 text-base">Patient</span>
        </div>
        <div className="w-[18.6%] ">
          <span className="px-2 text-gray-500 text-base">Reason for Visit</span>
        </div>
        <div className="w-[13.1%] ">
          <span className="text-gray-500 text-base">Time</span>
        </div>
        <div className="w-[15%] ">
          <span className="text-gray-500 text-base">Service</span>
        </div>
        <div className="w-[14.6%] ">
          <span className="text-gray-500 text-base">Status</span>
        </div>
      </div></>
  );
};

export default TableContent;


// {columns[clickedRowIndex] &&
// columns[clickedRowIndex].name}