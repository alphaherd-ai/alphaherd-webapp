import type { NextPage } from "next";

type MainHeaderType = {
  iconName?: string;
  iconNameText?: string;
  iconClassName?: string;
  iconImageName?: string;
  iconFileName?: string;
  iconImageName2?: string;
  iconText?: string;
  iconId?: string;
};

const MainHeader: NextPage<MainHeaderType> = ({
  iconName,
  iconNameText,
  iconClassName,
  iconImageName,
  iconFileName,
  iconImageName2,
  iconText,
  iconId,
}) => {
  return (
    <div className="absolute top-[0px] left-[40px] flex flex-row items-center justify-start gap-[40px] text-left text-base text-item-grey-icon-text-stroke05 font-heading-extralarge">
      <div className="flex flex-row items-center justify-start gap-[8px]">
        <img className="relative w-6 h-6" alt="" src={iconName} />
        <div className="relative font-medium">Home</div>
      </div>
      <img className="relative w-px h-[72px]" alt="" src={iconNameText} />
      <div className="flex flex-row items-center justify-start gap-[8px] text-structure-general">
        <img className="relative w-6 h-6" alt="" src={iconClassName} />
        <b className="relative">Finances</b>
      </div>
      <img className="relative w-px h-[72px]" alt="" src={iconImageName} />
      <div className="flex flex-row items-center justify-start gap-[8px]">
        <img className="relative w-6 h-6" alt="" src={iconFileName} />
        <div className="relative font-medium">Inventory</div>
      </div>
      <img className="relative w-px h-[72px]" alt="" src={iconImageName2} />
      <div className="flex flex-row items-center justify-start gap-[8px]">
        <img className="relative w-6 h-6" alt="" src={iconText} />
        <div className="relative font-medium">{`Clients & Patients`}</div>
      </div>
      <img className="relative w-px h-[72px]" alt="" src={iconId} />
    </div>
  );
};

export default MainHeader;
