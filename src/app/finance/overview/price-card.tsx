import type { NextPage } from "next";
import CardContainer from "./card-container";

const PriceCard: NextPage = () => {
  return (
    <div className="absolute top-[180px] left-[calc(50%_-_688px)] w-[1376px] flex flex-col items-start justify-start text-left text-sm text-item-main-text font-selected-14">
      <div className="self-stretch rounded-3xs bg-structure-general overflow-hidden flex flex-col items-start justify-start pt-4 px-0 pb-0 gap-[16px] border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
        <div className="self-stretch flex flex-row items-center justify-start py-0 px-6 gap-[8px]">
          <div className="flex-1 flex flex-row items-center justify-start gap-[16px]">
            <div className="flex flex-row items-start justify-start gap-[8px]">
              <img
                className="relative w-6 h-6 overflow-hidden shrink-0"
                alt=""
                src="/1-icons245.svg"
              />
              <img
                className="relative w-6 h-6 overflow-hidden shrink-0"
                alt=""
                src="/1-icons246.svg"
              />
            </div>
            <div className="relative font-medium flex items-center w-[380px] h-[19px] shrink-0">
              July 17th - 23rd, 2023
            </div>
          </div>
          <div className="relative w-[351px] h-[18px] text-item-grey-icon-text-stroke05">
            <div className="absolute h-[2.78%] w-[100.14%] top-[204.17%] right-[-0.07%] bottom-[-106.94%] left-[-0.07%] box-border border-t-[0.5px] border-solid border-divisionline-onwhite" />
            <div className="absolute h-[105.56%] w-full top-[-5.56%] right-[0%] bottom-[0%] left-[0%] flex flex-row items-start justify-start gap-[24px]">
              <div className="flex flex-row items-start justify-start">
                <div className="relative font-medium">Day</div>
                <div className="relative text-inherit font-medium font-inherit hidden">
                  <ul className="m-0 pl-[19px]">7</ul>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start text-center text-primary-green">
                <b className="relative">Week</b>
                <b className="relative text-inherit hidden font-inherit text-left">
                  <ul className="m-0 pl-[19px]">4</ul>
                </b>
              </div>
              <div className="flex flex-row items-start justify-start">
                <div className="relative font-medium">Month</div>
                <div className="relative text-inherit font-medium font-inherit hidden">
                  <ul className="m-0 pl-[19px]">3</ul>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start">
                <div className="relative font-medium">Quarter</div>
                <div className="relative text-inherit font-medium font-inherit hidden">
                  <ul className="m-0 pl-[19px]">3</ul>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start">
                <div className="relative font-medium">Year</div>
                <div className="relative text-inherit font-medium font-inherit hidden">
                  <ul className="m-0 pl-[19px]">3</ul>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start">
                <div className="relative font-medium">All Time</div>
                <div className="relative text-inherit font-medium font-inherit hidden">
                  <ul className="m-0 pl-[19px]">3</ul>
                </div>
              </div>
            </div>
            <div className="absolute h-[22.22%] w-[14.49%] top-[183.33%] right-[73.26%] bottom-[-105.56%] left-[12.25%]">
              <div className="absolute h-full w-full top-[100%] right-[-100%] bottom-[-100%] left-[100%] rounded-3xl bg-primary-green [transform:_rotate(180deg)] [transform-origin:0_0]" />
            </div>
          </div>
        </div>
        <div className="w-[1376px] h-[136px] flex flex-col items-start justify-start relative gap-[8px] text-9xl">
          <div className="relative w-[1376px] h-[152px] z-[0]">
            <div className="absolute top-[151.5px] left-[-0.5px] rounded-t-3xs rounded-b-none bg-structure-general box-border w-[1377px] h-[153px] border-[0.5px] border-solid border-item-grey-icon-text-stroke05" />
          </div>
          <div className="my-0 mx-[!important] absolute top-[0px] left-[calc(50%_-_344px)] w-[688px] h-[136px] flex flex-row items-start justify-start gap-[344px] z-[1]">
            <div className="relative box-border w-[0.5px] h-[152.5px] z-[0] border-r-[0.5px] border-solid border-divisionline-onwhite" />
            <div className="relative box-border w-[0.5px] h-[152.5px] z-[1] border-r-[0.5px] border-solid border-divisionline-onwhite" />
            <div className="relative box-border w-[0.5px] h-[152.5px] z-[2] border-r-[0.5px] border-solid border-divisionline-onwhite" />
            <CardContainer
              priceText="₹32,499"
              financialData="Expenses"
              iconImageUrl="/icons16.svg"
              percentageText="12.4%"
            />
          </div>
          <CardContainer
            priceText="₹92,499"
            financialData="Revenue"
            iconImageUrl="/icons161.svg"
            percentageText="12.4%"
            propZIndex="2"
            propLeft="24px"
          />
          <CardContainer
            priceText="₹12,000"
            financialData="Total reserve"
            iconImageUrl="/icons162.svg"
            percentageText="12% since last week"
            propZIndex="3"
            propLeft="1056px"
          />
          <div className="my-0 mx-[!important] absolute top-[16px] left-[712px] flex flex-col items-start justify-start gap-[16px] z-[4]">
            <div className="flex flex-col items-start justify-start">
              <b className="relative">₹12,320</b>
              <div className="relative text-base font-medium">
                Total balances due
              </div>
            </div>
            <div className="rounded-8xs bg-light-red h-7 overflow-hidden shrink-0 flex flex-row items-end justify-start pt-1.5 pb-[5px] pr-2 pl-[11px] box-border gap-[4px] text-sm text-accent-red">
              <div className="relative font-medium">14 clients</div>
              <img className="relative w-4 h-4" alt="" src="/icons163.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
