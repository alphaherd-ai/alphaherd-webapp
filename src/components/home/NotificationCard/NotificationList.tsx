import React from "react";

const NotificationList = () => {
  return (
    <div>
      <div className="w-[443px] h-[116px] px-5 py-4 bg-neutral-700 border border-neutral-700 rounded-[10px] justify-start items-start gap-4 inline-flex relative z-100">
        <div className="p-[4.50px] bg-amber-400 rounded-[5px] justify-center items-center gap-[11.25px] flex">
          <div className="w-[27px] h-[27px] ">
            <div className="w-[27px] h-[27px] left-0 top-0  bg-white rounded-full" />
          </div>
        </div>
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch justify-end items-start inline-flex">
            <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
              <div className="self-stretch text-emerald-50 text-base font-bold ">
                Invoice Due in 3 Days
              </div>
              <div className="text-neutral-400 text-xs font-medium ">
                3 min ago
              </div>
            </div>
            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />
          </div>
          <div className="self-stretch">
            <span className="text-stone-300 text-sm font-medium ">
              You owe{" "}
            </span>
            <span className="text-emerald-50 text-sm font-bold ">
              ₹22,406
            </span>
            <span className="text-stone-300 text-sm font-medium ">
              {" "}
              to{" "}
            </span>
            <span className="text-emerald-50 text-sm font-bold ">
              WeCare
            </span>
            <span className="text-stone-300 text-sm font-medium ">
              {" "}
              distributor. This invoice expires on{" "}
            </span>
            <span className="text-emerald-50 text-sm font-bold ">
              15/12/2023.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
