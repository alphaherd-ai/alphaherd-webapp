import React from "react";

const NotificationPopUp = () => {
  return (
    <div className="absolute bottom-4 z-100 right-[8rem]">
      <div className="w-[443px] h-[288px] px-5 py-4 bg-neutral-700 rounded-[10px] border border-neutral-700 justify-start items-start gap-4 inline-flex">
        <div className="p-[4.50px] bg-green-600 rounded-[5px] justify-center items-center gap-[11.25px] flex">
          <div className="w-[27px] h-[27px] relative">
            <div className="w-[27px] h-[27px] left-0 top-0 absolute bg-zinc-300" />
          </div>
        </div>
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch justify-end items-start inline-flex">
            <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
              <div className="self-stretch text-emerald-50 text-base font-bold font-['Roboto']">
                Approve New User
              </div>
              {/* <div className="text-neutral-400 text-xs font-medium font-['Roboto']">
                3 min ago
              </div> */}
            </div>
            <div className="w-6 h-6 relative bg-neutral-700 rounded-[5px]" />
          </div>
          <div className="self-stretch">
            <span className="text-stone-300 text-sm font-medium font-['Roboto']">
              A new user is requesting access to create a new Alphaherd account
              under your organisation.
              <br />
              <br />
              Name:
            </span>
            <span className="text-stone-300 text-sm font-bold font-['Roboto']">
              {" "}
            </span>
            <span className="text-emerald-50 text-sm font-bold font-['Roboto']">
              Rani Kumari
              <br />
            </span>
            <span className="text-stone-300 text-sm font-medium font-['Roboto']">
              Phone No.:
            </span>
            <span className="text-stone-300 text-sm font-bold font-['Roboto']">
              {" "}
            </span>
            <span className="text-emerald-50 text-sm font-bold font-['Roboto']">
              99999 99999
              <br />
            </span>
            <span className="text-stone-300 text-sm font-medium font-['Roboto']">
              Email:
            </span>
            <span className="text-stone-300 text-sm font-normal font-['Roboto']">
              {" "}
            </span>
            <span className="text-emerald-50 text-sm font-bold font-['Roboto']">
              ranikumari@gmail.com
              <br />
            </span>
            <span className="text-stone-300 text-sm font-medium font-['Roboto']">
              Role:
            </span>
            <span className="text-stone-300 text-sm font-bold font-['Roboto']">
              {" "}
            </span>
            <span className="text-emerald-50 text-sm font-bold font-['Roboto']">
              Staff
            </span>
          </div>
          <div className="pt-1  flex  justify-end items-end gap-2">
            <div className="px-4 py-2 bg-teal-400 rounded-[5px] justify-start items-center gap-2 flex">
              <div className="text-white text-sm font-bold font-['Roboto']">
                Approve
              </div>
            </div>
            <div className="px-4 py-2 bg-gray-500 rounded-[5px] justify-start items-center gap-2 flex">
              <div className="text-white text-sm font-bold font-['Roboto']">
                Reject
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopUp;
