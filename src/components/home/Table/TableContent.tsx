import React from "react";
import TableList from "./TableList";

const TableContent = () => {
  return (
    <>
      <div className="w-[1480px] h-[55px] px-6 bg-neutral-200 border-b border-neutral-400 justify-start items-center gap-4 inline-flex ">
        <div className="w-[14.6%] ml-[2.5rem] ">
          <span>Client</span>
        </div>
        <div className="w-[12.6%] ">
          <span>Patient</span>
        </div>
        <div className="w-[18.6%] ">
          <span className="px-2">Reason for Visit</span>
        </div>
        <div className="w-[13%] ">
          <span>Time</span>
        </div>
        <div className="w-[14.8%] ">
          <span>Service</span>
        </div>
        <div className="w-[14.6%] ">
          <span>Status</span>
        </div>
      </div>
      <TableList />
    </>
  );
};

export default TableContent;


// {columns[clickedRowIndex] &&
// columns[clickedRowIndex].name}