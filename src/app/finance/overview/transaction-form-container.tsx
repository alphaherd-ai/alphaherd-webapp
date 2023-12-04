import type { NextPage } from "next";
import StyleTertiaryStateDefault from "./style-tertiary-state-default";
import StylePrimaryStateDefault from "./style-primary-state-default";

const TransactionFormContainer: NextPage = () => {
  return (
    <div className="bg-structure-general box-border w-[1377px] h-[72px] flex flex-row items-center justify-start py-4 px-6 gap-[16px] text-left text-xl text-item-main-text font-selected-14 border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
      <div className="flex-1 flex flex-row items-center justify-start gap-[16px]">
        <div className="relative font-medium">Transactions</div>
        <div className="flex-1 flex flex-row items-center justify-start">
          <img
            className="relative w-6 h-6 overflow-hidden shrink-0"
            alt=""
            src="/1-icons249.svg"
          />
        </div>
      </div>
      <div className="rounded-8xs bg-structure-general box-border h-7 hidden flex-row items-center justify-start p-2 gap-[8px] text-sm text-item-grey-icon-text-stroke05 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
        <img
          className="relative w-4 h-4 overflow-hidden shrink-0"
          alt=""
          src="/icons16sort.svg"
        />
        <div className="flex flex-row items-center justify-start">
          <div className="relative font-medium">Sort</div>
        </div>
      </div>
      <StyleTertiaryStateDefault
        icons16="/icons164.svg"
        filter="Sort: Time"
        icons16Overflow="hidden"
        icons16FlexShrink="0"
      />
      <StyleTertiaryStateDefault
        icons16="/icons165.svg"
        filter="Filter by"
        icons16Overflow="unset"
        icons16FlexShrink="unset"
      />
      <StylePrimaryStateDefault
        icons24="/1-icons2410.svg"
        addAppointment="Reconcile"
        icons24Overflow="hidden"
        icons24FlexShrink="0"
      />
    </div>
  );
};

export default TransactionFormContainer;
