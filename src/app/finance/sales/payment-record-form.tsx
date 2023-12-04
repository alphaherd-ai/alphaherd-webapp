import type { NextPage } from "next";

const PaymentRecordForm: NextPage = () => {
  return (
    <div className="self-stretch rounded-3xs bg-structure-general h-[142px] overflow-hidden shrink-0 flex flex-col items-start justify-start text-left text-base text-item-main-text font-heading-extralarge">
      <div className="self-stretch flex flex-col items-start justify-start">
        <div className="self-stretch bg-structure-general flex flex-row items-center justify-start py-4 px-6 gap-[16px]">
          <div className="flex-1 h-6 flex flex-row items-center justify-start">
            <b className="flex-1 relative">Record payment</b>
          </div>
          <div className="rounded-8xs bg-structure-general h-7 hidden flex-row items-center justify-start p-2 box-border gap-[8px] text-sm text-item-grey-icon-text-stroke05">
            <img
              className="relative w-4 h-4 overflow-hidden shrink-0"
              alt=""
              src="/icons16sort1.svg"
            />
            <div className="flex flex-row items-center justify-start">
              <div className="relative font-medium">Sort</div>
            </div>
          </div>
        </div>
        <div className="w-[1344px] flex flex-row items-start justify-start text-item-grey-icon-text-stroke05">
          <div className="w-[657px] flex flex-col items-start justify-start py-0 px-[26px] box-border">
            <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
              <div className="flex-1 rounded-8xs flex flex-col items-start justify-start p-4 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                <div className="self-stretch flex flex-row items-center justify-start">
                  <div className="flex-1 flex flex-row items-center justify-start">
                    <div className="flex-1 flex flex-row items-center justify-start gap-[8px]">
                      <div className="flex-1 relative font-medium">
                        Choose mode of payment
                      </div>
                      <img
                        className="relative w-6 h-6"
                        alt=""
                        src="/chevron-left.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 rounded-8xs flex flex-col items-start justify-start p-4 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                <div className="self-stretch flex flex-row items-center justify-start">
                  <div className="flex-1 flex flex-row items-center justify-start">
                    <div className="flex-1 flex flex-row items-center justify-start">
                      <div className="flex-1 relative font-medium">
                        Amount paid
                      </div>
                    </div>
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

export default PaymentRecordForm;
