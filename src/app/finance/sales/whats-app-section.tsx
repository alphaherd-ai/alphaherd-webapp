import type { NextPage } from "next";
import StyleTertiaryStateDefault from "./style-tertiary-state-default";

const WhatsAppSection: NextPage = () => {
  return (
    <div className="absolute bottom-[39.5px] left-[31.5px] rounded-t-none rounded-b-3xs bg-structure-general box-border w-[1377px] h-[61px] text-left text-sm text-item-grey-icon-text-stroke05 font-heading-extralarge border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
      <img
        className="absolute top-[-0.5px] left-[0px] w-[1360px] h-[0.5px]"
        alt=""
        src="/frame-2392.svg"
      />
      <div className="absolute top-[16px] left-[1097px] w-[263px] h-7">
        <div className="absolute top-[0px] left-[0px] rounded-8xs bg-structure-general box-border h-7 flex flex-row items-center justify-start p-2 gap-[8px] border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
          <img className="relative w-4 h-4" alt="" src="/sms.svg" />
          <div className="flex flex-row items-center justify-start">
            <div className="relative font-medium">SMS</div>
          </div>
        </div>
        <StyleTertiaryStateDefault
          icons16="/1-icons2429.svg"
          filter="Mail"
          styleTertiaryStateDefaultPosition="absolute"
          styleTertiaryStateDefaultTop="0px"
          styleTertiaryStateDefaultLeft="77px"
          icons16Overflow="hidden"
          icons16FlexShrink="0"
        />
        <div className="absolute top-[0px] left-[152px] rounded-8xs bg-structure-general box-border h-7 flex flex-row items-center justify-start p-2 gap-[8px] border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
          <img
            className="relative w-5 h-5 overflow-hidden shrink-0"
            alt=""
            src="/1-icons2430.svg"
          />
          <div className="flex flex-row items-center justify-start">
            <div className="relative font-medium">WhatsApp</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppSection;
