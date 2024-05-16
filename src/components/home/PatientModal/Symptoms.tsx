import React from "react";

const Symptoms = () => {
  return (
    <div className="self-stretch h-[94px] px-6 py-4 bg-white rounded-[10px] flex-col justify-start items-start gap-4 flex">
      <div className="self-stretch justify-start items-center gap-4 inline-flex">
        <div className="w-6 h-6 relative"><img src="/1. Icons-24 (9).png" alt="" /></div>
        <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-4 flex">
          <div className="grow shrink basis-0 text-neutral-400 text-base font-medium font-['Satoshi']">
            Symptoms
          </div>
        </div>
      </div>
      <div className="self-stretch justify-start items-center gap-4 inline-flex">
        <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-4 flex">
          <div className="text-gray-500 text-base font-medium font-['Satoshi']">
            Wheezing, anxiety, blueish discoloration of lips
          </div>
        </div>
      </div>
    </div>
  );
};

export default Symptoms;
