import React from "react";
import Image from "next/image"
import listImg from "../../../assets/icons/home/list_alt.png"
import receipt from "../../../assets/icons/home/receipt_long.png"

const CreateButtonCard = () => {
  return (
    <div className="w-[381px] h-[491px] px-4 pt-6 pb-7 bg-zinc-900 rounded-[10px] shadow justify-end items-start gap-5 inline-flex">
      <div className="flex-col justify-start items-start gap-4 inline-flex">
        <div className="self-stretch justify-start items-start gap-2 inline-flex">
          <div className="text-gray-100 text-sm font-medium ">
            Database
          </div>
        </div>
        <div className="self-stretch h-[22px] flex-col justify-start items-start gap-4 flex">
          <div className="justify-start items-start gap-2 inline-flex">
            <div className="w-5 h-5 relative">
              <div className="w-5 h-5 left-0 top-0 absolute">
                <Image src={listImg} alt="" />
              </div>
            </div>
            <div className="text-white text-base font-medium ">
              Client
            </div>
          </div>
        </div>
        <div className="self-stretch h-[22px] flex-col justify-start items-start gap-4 flex">
          <div className="justify-start items-start gap-2 inline-flex">
            <div className="w-5 h-5 relative">
              <div className="w-5 h-5 left-0 top-0 absolute">
              <Image src={receipt} alt="" />
              </div>
            </div>
            <div className="text-white text-base font-medium ">
              Patient
            </div>
          </div>
        </div>
        <div className="self-stretch h-[22px] flex-col justify-start items-start gap-4 flex">
          <div className="justify-start items-start gap-2 inline-flex">
            <div className="w-5 h-5 relative">
              <div className="w-5 h-5 left-0 top-0 absolute">
              <Image src={receipt} alt="" />
              </div>
            </div>
            <div className="text-white text-base font-medium ">
              Distributors
            </div>
          </div>
        </div>
        <div className="self-stretch h-[61px] justify-start items-end gap-2 inline-flex">
          <div className="text-gray-100 text-sm font-medium ">
            Sales
          </div>
        </div>
        <div className="self-stretch h-[22px] flex-col justify-start items-start gap-4 flex">
          <div className="justify-start items-start gap-2 inline-flex">
            <div className="w-5 h-5 relative">
              <div className="w-5 h-5 left-0 top-0 absolute">
              <Image src={receipt} alt="" />
              </div>
            </div>
            <div className="text-white text-base font-medium ">
              Estimate
            </div>
          </div>
        </div>
        <div className="self-stretch h-[22px] flex-col justify-start items-start gap-4 flex">
          <div className="justify-start items-start gap-2 inline-flex">
            <div className="w-5 h-5 relative">
              <div className="w-5 h-5 left-0 top-0 absolute">
              <Image src={receipt} alt="" />
              </div>{" "}
            </div>
            <div className="text-white text-base font-medium ">
              Invoice
            </div>
          </div>
        </div>
        <div className="self-stretch h-[22px] flex-col justify-start items-start gap-4 flex">
          <div className="justify-start items-start gap-2 inline-flex">
            <div className="w-5 h-5 relative">
              <div className="w-5 h-5 left-0 top-0 absolute">
              <Image src={receipt} alt="" />
              </div>{" "}
            </div>
            <div className="text-white text-base font-medium ">
              Return
            </div>
          </div>
        </div>
        <div className="h-[99px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch h-[61px] justify-start items-end gap-2 inline-flex">
            <div className="text-gray-100 text-sm font-medium ">
              Expenses
            </div>
          </div>
          <div className="self-stretch h-[22px] flex-col justify-start items-start gap-4 flex">
            <div className="justify-start items-start gap-2 inline-flex">
              <div className="w-5 h-5 relative">
                <div className="w-5 h-5 left-0 top-0 absolute">
                <Image src={receipt} alt="" />
                </div>{" "}
              </div>
              <div className="text-white text-base font-medium ">
                Record Expense
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col justify-start items-start gap-4 inline-flex">
        <div className="self-stretch h-[210px] justify-start items-end gap-2 inline-flex">
          <div className="text-gray-100 text-sm font-medium ">
            Purchases
          </div>
        </div>
        <div className="self-stretch h-[22px] flex-col justify-start items-start gap-4 flex">
          <div className="justify-start items-start gap-2 inline-flex">
            <div className="w-5 h-5 relative">
              <div className="w-5 h-5 left-0 top-0 absolute">
              <Image src={receipt} alt="" />
              </div>
            </div>
            <div className="text-white text-base font-medium ">
              Purchase Order
            </div>
          </div>
        </div>
        <div className="self-stretch h-[22px] flex-col justify-start items-start gap-4 flex">
          <div className="justify-start items-start gap-2 inline-flex">
            <div className="w-5 h-5 relative">
              <div className="w-5 h-5 left-0 top-0 absolute">
              <Image src={receipt} alt="" />
              </div>{" "}
            </div>
            <div className="text-white text-base font-medium ">
              Purchase Invoice
            </div>
          </div>
        </div>
        <div className="self-stretch h-[22px] flex-col justify-start items-start gap-4 flex">
          <div className="justify-start items-start gap-2 inline-flex">
            <div className="w-5 h-5 relative">
              <div className="w-5 h-5 left-0 top-0 absolute">
              <Image src={receipt} alt="" />
              </div>{" "}
            </div>
            <div className="text-white text-base font-medium ">
              Purchase Return
            </div>
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-5 flex">
          <div className="flex-col justify-start items-start gap-4 flex">
            <div className="self-stretch h-[61px] justify-start items-end gap-2 inline-flex">
              <div className="text-gray-100 text-sm font-medium ">
                Transactions
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-4 flex">
              <div className="self-stretch justify-start items-start gap-2 inline-flex">
                <div className="w-5 h-5 relative">
                  <div className="w-5 h-5 left-0 top-0 absolute">
                  <Image src={receipt} alt="" />
                  </div>{" "}
                </div>
                <div className="text-white text-base font-medium ">
                  Record Transaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateButtonCard;
