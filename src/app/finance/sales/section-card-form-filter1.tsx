import type { NextPage } from "next";

const SectionCardFormFilter1: NextPage = () => {
  return (
    <div className="w-[1344px] flex flex-row items-start justify-start gap-[16px] text-left text-base text-item-main-text font-heading-extralarge">
      <div className="flex-1 flex flex-col items-start justify-start">
        <div className="self-stretch rounded-3xs bg-structure-general flex flex-col items-start justify-center py-4 px-6">
          <div className="self-stretch h-6 flex flex-row items-center justify-start gap-[16px]">
            <div className="flex flex-row items-center justify-start">
              <b className="relative">Name*:</b>
            </div>
            <div className="flex-1 h-6 flex flex-row items-center justify-start">
              <div className="relative font-medium">Quentin Tarantino</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start justify-start">
        <div className="self-stretch rounded-3xs bg-structure-general h-14 flex flex-col items-start justify-center py-4 px-6 box-border">
          <div className="self-stretch flex flex-row items-center justify-start gap-[16px]">
            <b className="relative">Billing Date:</b>
            <div className="self-stretch flex-1 flex flex-row items-center justify-start gap-[16px]">
              <div className="flex-1 relative font-medium">31/10/2023</div>
              <img
                className="relative w-5 h-5"
                alt=""
                src="/calendar-today.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCardFormFilter1;
