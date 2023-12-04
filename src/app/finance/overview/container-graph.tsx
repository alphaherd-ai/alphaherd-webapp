import type { NextPage } from "next";

const ContainerGraph: NextPage = () => {
  return (
    <div className="self-stretch flex-1 flex flex-col items-start justify-start text-right text-xs text-item-main-text font-selected-14">
      <div className="self-stretch flex-1 flex flex-row items-start justify-start">
        <div className="self-stretch w-[43px] flex flex-col items-center justify-end pt-2 px-2 pb-0 box-border">
          <div className="relative font-medium flex items-center w-8 h-px shrink-0">
            ₹50k
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-col items-start justify-start">
          <div className="self-stretch flex-1 relative border-b-[0.5px] border-solid border-divisionline-onwhite border-l-[0.5px]" />
        </div>
      </div>
      <div className="self-stretch flex-1 flex flex-row items-start justify-start">
        <div className="self-stretch w-[43px] flex flex-col items-center justify-end pt-2 px-2 pb-0 box-border">
          <div className="relative font-medium flex items-center w-8 h-px shrink-0">
            ₹40k
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-col items-start justify-start">
          <div className="self-stretch flex-1 relative border-b-[0.5px] border-solid border-divisionline-onwhite border-l-[0.5px]" />
        </div>
      </div>
      <div className="self-stretch flex-1 flex flex-row items-start justify-start">
        <div className="self-stretch w-[43px] flex flex-col items-center justify-end pt-2 px-2 pb-0 box-border">
          <div className="relative font-medium flex items-center w-8 h-px shrink-0">
            ₹30k
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-col items-start justify-start">
          <div className="self-stretch flex-1 relative border-b-[0.5px] border-solid border-divisionline-onwhite border-l-[0.5px]" />
        </div>
      </div>
      <div className="self-stretch flex-1 flex flex-row items-start justify-start">
        <div className="self-stretch w-[43px] flex flex-col items-center justify-end pt-2 px-2 pb-0 box-border">
          <div className="relative font-medium flex items-center w-8 h-px shrink-0">
            ₹20k
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-col items-start justify-start">
          <div className="self-stretch flex-1 relative border-b-[0.5px] border-solid border-divisionline-onwhite border-l-[0.5px]" />
        </div>
      </div>
      <div className="self-stretch flex-1 flex flex-row items-start justify-start">
        <div className="self-stretch w-[43px] flex flex-col items-center justify-end pt-2 px-2 pb-0 box-border">
          <div className="relative font-medium flex items-center w-8 h-px shrink-0">
            ₹10k
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-col items-start justify-start">
          <div className="self-stretch flex-1 relative border-b-[0.5px] border-solid border-divisionline-onwhite border-l-[0.5px]" />
        </div>
      </div>
      <div className="self-stretch flex-1 flex flex-row items-start justify-start">
        <div className="self-stretch w-[43px]" />
        <div className="self-stretch flex-1 flex flex-col items-start justify-start">
          <div className="self-stretch flex-1 relative rounded-t-none rounded-br-none rounded-bl-8xs border-b-[0.5px] border-solid border-divisionline-onwhite border-l-[0.5px]" />
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start text-center text-sm">
        <div className="self-stretch w-[43px]" />
        <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2">
          <b className="flex-1 relative">Medical</b>
        </div>
        <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2">
          <b className="flex-1 relative">Boarding</b>
        </div>
        <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2">
          <b className="flex-1 relative">Grooming</b>
        </div>
        <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2">
          <b className="flex-1 relative">Pharmacy</b>
        </div>
        <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2">
          <b className="flex-1 relative">Retail</b>
        </div>
        <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2">
          <b className="flex-1 relative">Training</b>
        </div>
        <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2">
          <b className="flex-1 relative">Others</b>
        </div>
      </div>
    </div>
  );
};

export default ContainerGraph;
