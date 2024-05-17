import React from "react";

const Notes = () => {
  return (
    <div className="self-stretch h-[92px] px-6 py-4 bg-white rounded-[10px] flex-col justify-start items-start gap-4 flex">
      <div className="self-stretch justify-start items-center gap-4 inline-flex">
        <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-4 flex">
          <div className="grow shrink basis-0 text-neutral-400 text-base font-medium font-['Satoshi']">
            Notes
          </div>
        </div>
      </div>
      <div className="self-stretch justify-start items-center gap-4 inline-flex">
        <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-4 flex">
          <div className="text-gray-500 text-base font-medium font-['Satoshi']">
            <textarea cols={80} rows={2}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
