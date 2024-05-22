import React from "react";

const UnderNotesButtons = () => {
  return (
    <div className="self-stretch justify-end items-start gap-4 inline-flex">
      <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
        <div className="w-6 h-6 relative" />
        <div className="text-white text-base font-bold font-['Satoshi']">
          Save plan as template
        </div>
      </div>
      <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
        <div className="w-6 h-6 justify-center items-center flex">
          <div className="w-6 h-6 relative">
            <div className="w-6 h-6 left-0 top-0 absolute bg-cyan-400" />
          </div>
        </div>
        <div className="text-white text-base font-bold font-['Satoshi']">
          Add Follow-up Consultation
        </div>
      </div>
    </div>
  );
};

export default UnderNotesButtons;
