import type { NextPage } from "next";

type PriceColumn1Type = {
  itemPrice?: string;
};

const PriceColumn1: NextPage<PriceColumn1Type> = ({ itemPrice }) => {
  return (
    <div className="w-[136px] flex flex-col items-start justify-start text-left text-base text-item-main-text font-heading-extralarge">
      <div className="self-stretch bg-structure-bg box-border h-12 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
        <div className="relative font-medium">{itemPrice}</div>
      </div>
      <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
        <div className="flex-1 relative font-medium">₹300</div>
      </div>
      <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
        <div className="flex-1 relative font-medium">₹300</div>
      </div>
      <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
        <div className="flex-1 relative font-medium">₹300</div>
      </div>
    </div>
  );
};

export default PriceColumn1;
