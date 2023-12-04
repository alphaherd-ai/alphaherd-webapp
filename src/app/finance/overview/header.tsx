import type { NextPage } from "next";

type HeaderType = {
  iconName?: string;
  iconLabel?: string;
  iconClassName?: string;
  iconImageName?: string;
  iconFileName?: string;
  iconIdentifier?: string;
  iconNameVariant?: string;
  iconIdentifierText?: string;
};

const Header: NextPage<HeaderType> = ({
  iconName,
  iconLabel,
  iconClassName,
  iconImageName,
  iconFileName,
  iconIdentifier,
  iconNameVariant,
  iconIdentifierText,
}) => {
  return (
    <div className="absolute top-[0px] left-[40px] flex flex-row items-center justify-start gap-[40px] text-left text-base text-item-grey-icon-text-stroke05 font-selected-14">
      <div className="flex flex-row items-center justify-start gap-[8px]">
        <img className="relative w-6 h-6" alt="" src={iconName} />
        <div className="relative font-medium">Home</div>
      </div>
      <img className="relative w-px h-[72px]" alt="" src={iconLabel} />
      <div className="flex flex-row items-center justify-start gap-[8px] text-structure-general">
        <img className="relative w-6 h-6" alt="" src={iconClassName} />
        <b className="relative">Finances</b>
      </div>
      <img className="relative w-px h-[72px]" alt="" src={iconImageName} />
      <div className="flex flex-row items-center justify-start gap-[8px]">
        <img className="relative w-6 h-6" alt="" src={iconFileName} />
        <div className="relative font-medium">Inventory</div>
      </div>
      <img className="relative w-px h-[72px]" alt="" src={iconIdentifier} />
      <div className="flex flex-row items-center justify-start gap-[8px]">
        <img className="relative w-6 h-6" alt="" src={iconNameVariant} />
        <div className="relative font-medium">{`Clients & Patients`}</div>
      </div>
      <img className="relative w-px h-[72px]" alt="" src={iconIdentifierText} />
    </div>
  );
};

export default Header;
