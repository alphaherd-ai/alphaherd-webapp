import savePlanImg from "../../../assets/icons/home/1. Icons-24 (8).svg"
import Image from "next/image";
import React from "react";
import add from "../../../assets/icons/home/add.svg"

const UnderNotesButtons = () => {
  return (
    <div className="w-full flex justify-end gap-4">
      <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex hover:cursor-pointer">
        <div className="w-6 h-6">
          <Image src={savePlanImg} alt="savePlanImg" />
        </div>
        <span className="text-white text-base">
          Save plan as template
        </span>
      </div>
      <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex hover:cursor-pointer">
        <div className="w-6 h-6 justify-center items-center flex">
          <div className="w-6 h-6 relative">
            <Image src={add} alt="add" />
          </div>
        </div>
        <div className="text-white text-base">
          Add Follow-up Consultation
        </div>
      </div>
      </div>
  );
};

export default UnderNotesButtons;
