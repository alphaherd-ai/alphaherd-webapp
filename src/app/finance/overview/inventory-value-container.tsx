import type { NextPage } from "next";
import StyleTertiaryStateDefault from "./style-tertiary-state-default";

const InventoryValueContainer: NextPage = () => {
  return (
    <div className="self-stretch bg-structure-general box-border h-[72px] overflow-hidden shrink-0 flex flex-row items-center justify-start py-4 pr-0 pl-2 gap-[16px] text-left text-base text-item-main-text font-selected-14 border-b-[0.5px] border-solid border-divisionline-onwhite">
      <div className="flex flex-row items-center justify-start">
        <div className="flex flex-row items-center justify-start gap-[8px]">
          <div className="relative font-medium">Current inventory value:</div>
          <div className="relative text-xl font-medium">₹4,36,284</div>
        </div>
      </div>
      <div className="flex-1 flex flex-row items-center justify-start">
        <img
          className="relative w-6 h-6 overflow-hidden shrink-0"
          alt=""
          src="/1-icons2414.svg"
        />
      </div>
      <StyleTertiaryStateDefault
        icons16="/icons169.svg"
        filter="Categories: All"
        icons16Overflow="hidden"
        icons16FlexShrink="0"
      />
    </div>
  );
};

export default InventoryValueContainer;
