import React from "react";

const Products = () => {
  return (
    <div className="self-stretch h-28 bg-white rounded-[10px] flex-col justify-start items-start flex">
      <div className="self-stretch h-28 flex-col justify-start items-start flex">
        <div className="self-stretch px-6 py-4 bg-white justify-start items-center gap-4 inline-flex">
          <div className="grow shrink basis-0 h-6 justify-start items-center gap-6 flex">
            <div className="grow shrink basis-0 text-gray-500 text-base font-bold font-['Satoshi']">
              Products
            </div>
          </div>
        </div>
        <div className="self-stretch justify-start items-start inline-flex">
          <div className="w-[356px] h-14 p-2 flex-col justify-center items-start inline-flex">
            <div className="self-stretch h-6 p-4 bg-white justify-start items-center gap-4 inline-flex">
              <div className="grow shrink basis-0 text-gray-500 text-base font-medium font-['Satoshi']">
                Syringe
              </div>
            </div>
          </div>
          <div className="px-2 flex-col justify-start items-start inline-flex">
            <div className="w-[100px] h-14 p-4 bg-white flex-col justify-center items-start flex">
              <div className="h-6 px-1 bg-white rounded-[5px] justify-start items-center gap-2 inline-flex">
                <div className="text-neutral-400 text-sm font-medium font-['Satoshi']">
                  ₹899
                </div>
              </div>
            </div>
          </div>
          <div className="pl-2 pr-1 flex-col justify-start items-start inline-flex">
            <div className="self-stretch h-14 p-4 bg-white justify-start items-center gap-4 inline-flex">
              <div className="bg-gray-100 rounded-[5px] justify-start items-start gap-2 flex">
                <div className="w-6 h-6 relative bg-white rounded-[5px] border-2 border-gray-100">
                  <div className="w-6 h-6 left-0 top-0 absolute bg-zinc-300" />
                </div>
                <div className="h-6 px-1 bg-gray-100 rounded-[5px] flex-col justify-start items-start gap-2 inline-flex">
                  <div className="w-7 text-center text-neutral-400 text-base font-medium font-['Satoshi']">
                    1
                  </div>
                </div>
                <div className="w-6 h-6 bg-white rounded-[5px] border-2 border-gray-100 justify-center items-center flex">
                  <div className="w-6 h-6 relative">
                    <div className="w-6 h-6 left-0 top-0 absolute bg-cyan-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
