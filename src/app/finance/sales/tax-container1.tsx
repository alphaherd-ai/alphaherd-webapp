import type { NextPage } from "next";

type TaxContainer1Type = {
  iconName?: string;
};

const TaxContainer1: NextPage<TaxContainer1Type> = ({ iconName }) => {
  return (
    <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 gap-[8px] text-left text-base text-item-grey-icon-text-stroke05 font-heading-extralarge border-b-[0.5px] border-solid border-divisionline-onwhite">
      <div className="w-[63px] flex flex-row items-center justify-start">
        <div className="flex-1 flex flex-row items-center justify-start">
          <div className="rounded-8xs bg-structure-general h-6 flex flex-row items-center justify-start py-0 px-1 box-border gap-[4px]">
            <div className="relative font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              None
            </div>
            <img
              className="relative w-4 h-4 overflow-hidden shrink-0"
              alt=""
              src={iconName}
            />
          </div>
        </div>
      </div>
      <div className="rounded-8xs bg-light-orange h-7 overflow-hidden hidden flex-row items-center justify-center py-1.5 px-2 box-border text-sm text-accent-orange">
        <div className="relative font-medium">Due: ₹399</div>
      </div>
    </div>
  );
};

export default TaxContainer1;
