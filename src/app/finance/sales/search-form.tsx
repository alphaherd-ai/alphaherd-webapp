import type { NextPage } from "next";
import StylePrimaryStateDefault from "./style-primary-state-default";

const SearchForm: NextPage = () => {
  return (
    <div className="absolute top-[174.5px] left-[31.5px] rounded-t-3xs rounded-b-none bg-structure-general box-border w-[1377px] h-[85px] flex flex-col items-start justify-center p-6 text-left text-[15.46px] text-item-grey-icon-text-stroke05 font-heading-extralarge border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
      <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
        <div className="flex-1 flex flex-row items-center justify-start">
          <div className="rounded-8xs bg-structure-general box-border w-[381px] h-[45px] overflow-hidden shrink-0 flex flex-row items-center justify-start py-[13px] px-4 gap-[14px] border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
            <div className="flex-1 relative font-medium">
              Search client or vendor
            </div>
            <img
              className="relative w-[23.19px] h-[23.19px]"
              alt=""
              src="/search.svg"
            />
          </div>
        </div>
        <div className="flex flex-row items-start justify-start">
          <StylePrimaryStateDefault
            icons24="/1-icons245.svg"
            addAppointment="Invoice"
            showIcons24={false}
            stylePrimaryStateDefaultBorder="0.5px solid #a2a3a3"
            stylePrimaryStateDefaultBorderRadius="5px 0px 0px 5px"
            stylePrimaryStateDefaultBackgroundColor="#17181a"
            icons24Overflow="hidden"
            icons24FlexShrink="0"
            addAppointmentColor="#fff"
            addAppointmentFontWeight="unset"
          />
          <StylePrimaryStateDefault
            icons24="/1-icons246.svg"
            addAppointment="Estimate"
            showIcons24={false}
            stylePrimaryStateDefaultBorder="0.5px solid #a2a3a3"
            stylePrimaryStateDefaultBorderRadius="0px 5px 5px 0px"
            stylePrimaryStateDefaultBackgroundColor="#f4f5f7"
            icons24Overflow="hidden"
            icons24FlexShrink="0"
            addAppointmentColor="#a2a3a3"
            addAppointmentFontWeight="500"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
