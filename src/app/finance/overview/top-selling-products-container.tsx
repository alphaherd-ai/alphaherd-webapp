import type { NextPage } from "next";
import StyleTertiaryStateDefault from "./style-tertiary-state-default";

const TopSellingProductsContainer: NextPage = () => {
  return (
    <div className="absolute top-[1163.5px] left-[731.5px] rounded-3xs bg-structure-general box-border w-[677px] h-[481px] flex flex-col items-start justify-start py-0 px-4 text-left text-sm text-item-main-text font-selected-14 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
      <div className="self-stretch bg-structure-general h-[72px] overflow-hidden shrink-0 flex flex-row items-center justify-start py-4 pr-0 pl-2 box-border gap-[16px] text-base">
        <div className="flex flex-row items-center justify-start">
          <div className="flex flex-row items-center justify-start">
            <div className="relative font-medium">Top Selling Products</div>
          </div>
        </div>
        <div className="flex-1 flex flex-row items-center justify-start">
          <img
            className="relative w-6 h-6 overflow-hidden shrink-0"
            alt=""
            src="/1-icons2415.svg"
          />
        </div>
        <StyleTertiaryStateDefault
          icons16="/icons1610.svg"
          filter="All Species"
          icons16Overflow="hidden"
          icons16FlexShrink="0"
        />
        <StyleTertiaryStateDefault
          icons16="/icons1611.svg"
          filter="All time"
          icons16Overflow="hidden"
          icons16FlexShrink="0"
        />
        <StyleTertiaryStateDefault
          icons16="/icons1612.svg"
          filter="Categories: All"
          icons16Overflow="hidden"
          icons16FlexShrink="0"
        />
      </div>
      <div className="self-stretch flex-1 flex flex-col items-start justify-center">
        <div className="self-stretch flex-1 flex flex-row items-center justify-start">
          <div className="self-stretch bg-structure-general box-border w-36 overflow-hidden shrink-0 flex flex-row items-center justify-start p-2 border-r-[0.5px] border-solid border-divisionline-onwhite">
            <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">
              Dog food-Royal Canine
            </b>
          </div>
          <div className="flex-1 h-9 flex flex-col items-start justify-center">
            <div className="self-stretch relative rounded-tl-none rounded-tr-8xs rounded-br-8xs rounded-bl-none bg-accent-blue h-7" />
          </div>
          <div className="bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2 text-item-grey-icon-text-stroke05">
            <b className="relative">₹8,36,284</b>
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-row items-center justify-start">
          <div className="self-stretch bg-structure-general box-border w-36 overflow-hidden shrink-0 flex flex-row items-center justify-start p-2 border-r-[0.5px] border-solid border-divisionline-onwhite">
            <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">
              Cat food-Royal Canine
            </b>
          </div>
          <div className="flex-1 h-9 flex flex-col items-start justify-center">
            <div className="self-stretch relative rounded-tl-none rounded-tr-8xs rounded-br-8xs rounded-bl-none bg-accent-yellow h-7" />
          </div>
          <div className="bg-structure-general w-[109px] overflow-hidden shrink-0 flex flex-row items-start justify-start p-2 box-border text-item-grey-icon-text-stroke05">
            <b className="flex-1 relative">₹7,22,248</b>
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-row items-center justify-start">
          <div className="self-stretch bg-structure-general box-border w-36 overflow-hidden shrink-0 flex flex-row items-center justify-start p-2 border-r-[0.5px] border-solid border-divisionline-onwhite">
            <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">
              Cat litter-Fresh Step
            </b>
          </div>
          <div className="flex-1 h-9 flex flex-col items-start justify-center">
            <div className="self-stretch relative rounded-tl-none rounded-tr-8xs rounded-br-8xs rounded-bl-none bg-accent-green h-7" />
          </div>
          <div className="bg-structure-general w-[198px] overflow-hidden shrink-0 flex flex-row items-start justify-start p-2 box-border text-item-grey-icon-text-stroke05">
            <b className="flex-1 relative">₹5,33,490</b>
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-row items-center justify-start">
          <div className="self-stretch bg-structure-general box-border w-36 overflow-hidden shrink-0 flex flex-row items-center justify-start p-2 border-r-[0.5px] border-solid border-divisionline-onwhite">
            <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">
              Shampoo - Himalaya
            </b>
          </div>
          <div className="h-9 flex flex-col items-start justify-center">
            <div className="relative rounded-tl-none rounded-tr-8xs rounded-br-8xs rounded-bl-none bg-accent-orange w-[268px] h-7" />
          </div>
          <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2 text-item-grey-icon-text-stroke05">
            <b className="flex-1 relative">₹3,89,248</b>
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-row items-center justify-start">
          <div className="self-stretch bg-structure-general box-border w-36 overflow-hidden shrink-0 flex flex-row items-center justify-start p-2 border-r-[0.5px] border-solid border-divisionline-onwhite">
            <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">{`Bayer tick & flea control`}</b>
          </div>
          <div className="flex-1 h-9 flex flex-col items-start justify-center">
            <div className="self-stretch relative rounded-tl-none rounded-tr-8xs rounded-br-8xs rounded-bl-none bg-accent-red h-7" />
          </div>
          <div className="bg-structure-general w-[280px] overflow-hidden shrink-0 flex flex-row items-start justify-start p-2 box-border text-item-grey-icon-text-stroke05">
            <b className="flex-1 relative">₹3,54,900</b>
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-row items-center justify-start">
          <div className="self-stretch bg-structure-general box-border w-36 overflow-hidden shrink-0 flex flex-row items-center justify-start p-2 border-r-[0.5px] border-solid border-divisionline-onwhite">
            <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">
              Skin supplements - Omega 3
            </b>
          </div>
          <div className="w-[217px] h-9 flex flex-col items-start justify-center">
            <div className="self-stretch relative rounded-tl-none rounded-tr-8xs rounded-br-8xs rounded-bl-none bg-item-grey-icon-text-stroke05 h-7" />
          </div>
          <div className="bg-structure-general w-[232px] overflow-hidden shrink-0 flex flex-row items-start justify-start p-2 box-border text-item-grey-icon-text-stroke05">
            <b className="flex-1 relative">₹2,99,248</b>
          </div>
        </div>
      </div>
      <div className="self-stretch h-14 flex flex-row items-center justify-center pt-0 px-0 pb-2 box-border text-center text-item-grey-icon-text-stroke05">
        <div className="flex flex-row items-center justify-start">
          <div className="relative font-medium">23 Jun, 2021 - Oct 9, 2023</div>
        </div>
      </div>
    </div>
  );
};

export default TopSellingProductsContainer;
