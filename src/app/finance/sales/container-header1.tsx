import type { NextPage } from "next";

type ContainerHeader1Type = {
  iconText?: string;
  iconImageName?: string;
  iconLabel?: string;
};

const ContainerHeader1: NextPage<ContainerHeader1Type> = ({
  iconText,
  iconImageName,
  iconLabel,
}) => {
  return (
    <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start py-4 px-6 gap-[16px] text-center text-base text-item-grey-icon-text-stroke05 font-heading-extralarge border-b-[0.5px] border-solid border-divisionline-onwhite">
      <div className="rounded-8xs bg-structure-bg flex flex-row items-start justify-start gap-[8px]">
        <img className="relative rounded-8xs w-6 h-6" alt="" src={iconText} />
        <div className="rounded-8xs bg-structure-bg h-6 flex flex-col items-start justify-start py-0 px-1 box-border">
          <div className="relative font-medium inline-block overflow-hidden text-ellipsis whitespace-nowrap w-7">
            1
          </div>
        </div>
        <img
          className="relative rounded-8xs w-6 h-6"
          alt=""
          src={iconImageName}
        />
      </div>
      <div className="w-[63px] flex flex-row items-center justify-start text-left">
        <div className="flex-1 flex flex-row items-center justify-start">
          <div className="rounded-8xs bg-structure-general h-6 flex flex-row items-center justify-start py-0 px-1 box-border gap-[4px]">
            <div className="relative font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              Units
            </div>
            <img
              className="relative w-4 h-4 overflow-hidden shrink-0"
              alt=""
              src={iconLabel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerHeader1;
