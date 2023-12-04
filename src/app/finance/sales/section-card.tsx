import type { NextPage } from "next";
import StylePrimaryStateDefault from "./style-primary-state-default";
import ContainerHeader1 from "./container-header1";
import PriceColumn1 from "./price-column1";
import TaxContainer1 from "./tax-container1";
import FormContainer2 from "./form-container2";

const SectionCard: NextPage = () => {
  return (
    <div className="flex flex-row items-end justify-end gap-[16px] text-left text-xl text-item-main-text font-heading-extralarge">
      <div className="flex flex-row items-end justify-start">
        <div className="rounded-3xs bg-structure-general overflow-hidden flex flex-col items-start justify-start border-[0.5px] border-solid border-divisionline-onwhite">
          <div className="bg-structure-general box-border w-[1011px] h-[72px] flex flex-row items-center justify-start py-4 px-6 gap-[16px] border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
            <div className="flex-1 flex flex-row items-center justify-start gap-[16px]">
              <div className="relative font-medium">Items</div>
              <div className="flex-1" />
            </div>
            <div className="rounded-8xs bg-structure-general box-border h-7 hidden flex-row items-center justify-start p-2 gap-[8px] text-sm text-item-grey-icon-text-stroke05 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
              <img
                className="relative w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/icons16sort.svg"
              />
              <div className="flex flex-row items-center justify-start">
                <div className="relative font-medium">Sort</div>
              </div>
            </div>
            <StylePrimaryStateDefault
              icons24="/1-icons248.svg"
              addAppointment="Add Item"
              showIcons24
              stylePrimaryStateDefaultBorder="unset"
              stylePrimaryStateDefaultBorderRadius="5px"
              stylePrimaryStateDefaultBackgroundColor="#17181a"
              icons24Overflow="unset"
              icons24FlexShrink="unset"
              addAppointmentColor="#fff"
              addAppointmentFontWeight="unset"
            />
          </div>
          <div className="w-[1011px] flex flex-row items-start justify-start text-base">
            <div className="w-[65px] flex flex-col items-start justify-start">
              <div className="self-stretch bg-structure-bg box-border h-12 flex flex-row items-center justify-start p-4 gap-[8px] border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                <div className="relative font-medium">No.</div>
                <div className="flex-1 flex flex-row items-center justify-start">
                  <img
                    className="relative w-4 h-4 overflow-hidden shrink-0"
                    alt=""
                    src="/icons16.svg"
                  />
                </div>
              </div>
              <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-center p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                <div className="flex-1 relative font-medium">1</div>
              </div>
              <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-center p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                <div className="flex-1 relative font-medium">1</div>
              </div>
              <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-center p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                <div className="flex-1 relative font-medium">1</div>
              </div>
            </div>
            <div className="w-[214px] flex flex-col items-start justify-start">
              <div className="self-stretch bg-structure-bg box-border h-12 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                <div className="relative font-medium">Product/Service</div>
              </div>
              <div className="self-stretch bg-structure-general flex flex-col items-start justify-center py-[21px] px-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                <div className="self-stretch relative font-medium">
                  Metaclopramide
                </div>
              </div>
              <div className="self-stretch bg-structure-general flex flex-col items-start justify-center py-[21px] px-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                <div className="self-stretch relative font-medium">
                  Metaclopramide
                </div>
              </div>
              <div className="self-stretch bg-structure-general flex flex-col items-start justify-center py-[21px] px-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                <div className="self-stretch relative font-medium">
                  Metaclopramide
                </div>
              </div>
            </div>
            <div className="w-[230px] flex flex-col items-start justify-start">
              <div className="self-stretch bg-structure-bg box-border h-12 flex flex-row items-center justify-start py-4 px-6 gap-[8px] border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                <div className="relative font-medium">Quantity</div>
                <div className="flex-1 flex flex-row items-center justify-start">
                  <img
                    className="relative w-4 h-4 overflow-hidden shrink-0"
                    alt=""
                    src="/icons161.svg"
                  />
                </div>
              </div>
              <ContainerHeader1
                iconText="/1-icons249.svg"
                iconImageName="/1-icons2410.svg"
                iconLabel="/1-icons2411.svg"
              />
              <ContainerHeader1
                iconText="/1-icons2412.svg"
                iconImageName="/1-icons2413.svg"
                iconLabel="/1-icons2414.svg"
              />
              <ContainerHeader1
                iconText="/1-icons2415.svg"
                iconImageName="/1-icons2416.svg"
                iconLabel="/1-icons2417.svg"
              />
            </div>
            <PriceColumn1 itemPrice="Unit price" />
            <PriceColumn1 itemPrice="Amount" />
            <div className="w-[125px] flex flex-col items-start justify-start">
              <div className="self-stretch bg-structure-bg box-border h-12 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                <div className="relative font-medium">Tax</div>
              </div>
              <TaxContainer1 iconName="/1-icons2418.svg" />
              <TaxContainer1 iconName="/1-icons2419.svg" />
              <TaxContainer1 iconName="/1-icons2420.svg" />
            </div>
            <div className="w-[105px] flex flex-col items-start justify-start">
              <div className="self-stretch bg-structure-bg box-border h-12 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                <div className="relative font-medium hidden">Tax</div>
              </div>
              <FormContainer2
                dataPercentage="/percent.svg"
                iconImageUrl="/1-icons2421.svg"
                button={false}
                button1={false}
              />
              <FormContainer2
                dataPercentage="/sell.svg"
                iconImageUrl="/1-icons2422.svg"
                button
                button1
              />
              <FormContainer2
                dataPercentage="/percent1.svg"
                iconImageUrl="/1-icons2423.svg"
                button={false}
                button1={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-3xs bg-structure-general box-border w-[312px] h-[182px] overflow-hidden shrink-0 flex flex-col items-start justify-end text-base border-[0.5px] border-solid border-divisionline-onwhite">
        <div className="rounded-3xs bg-structure-general box-border w-[312px] h-[376px] overflow-hidden shrink-0 flex flex-col items-start justify-end border-[0.5px] border-solid border-divisionline-onwhite">
          <div className="rounded-3xs bg-structure-general w-[312px] h-[376px] overflow-hidden shrink-0 flex flex-col items-start justify-end">
            <div className="box-border w-[312px] h-[46px] overflow-hidden shrink-0 flex flex-row items-center justify-start p-4 gap-[10px] border-b-[0.5px] border-solid border-divisionline-onwhite">
              <b className="relative">Sub total</b>
              <div className="flex-1 relative font-medium text-right">₹900</div>
            </div>
            <div className="box-border w-[312px] h-[46px] flex flex-row items-center justify-start p-4 gap-[10px] border-b-[0.5px] border-solid border-divisionline-onwhite">
              <div className="flex flex-row items-center justify-start">
                <div className="rounded-8xs bg-structure-general h-6 flex flex-row items-center justify-start gap-[4px]">
                  <b className="relative overflow-hidden text-ellipsis whitespace-nowrap">
                    GST
                  </b>
                  <img
                    className="relative w-4 h-4 overflow-hidden shrink-0"
                    alt=""
                    src="/1-icons2424.svg"
                  />
                </div>
              </div>
              <div className="relative font-medium text-item-grey-icon-text-stroke05">
                18% on ₹900
              </div>
              <div className="flex-1 relative font-medium text-right">₹162</div>
            </div>
            <div className="box-border w-[312px] h-[46px] flex flex-row items-center justify-start p-4 gap-[10px] border-b-[0.5px] border-solid border-divisionline-onwhite">
              <div className="flex flex-row items-center justify-start">
                <div className="rounded-8xs bg-structure-general h-6 flex flex-row items-center justify-start gap-[4px]">
                  <b className="relative overflow-hidden text-ellipsis whitespace-nowrap">
                    Discounts
                  </b>
                  <img
                    className="relative w-4 h-4 overflow-hidden shrink-0"
                    alt=""
                    src="/1-icons2425.svg"
                  />
                </div>
              </div>
              <div className="flex-1 relative font-medium text-item-grey-icon-text-stroke05 text-right">
                None
              </div>
            </div>
            <div className="box-border w-[312px] h-[46px] overflow-hidden shrink-0 flex flex-row items-center justify-start p-4 gap-[10px] text-primary-green border-b-[0.5px] border-solid border-divisionline-onwhite">
              <b className="relative">Grand total</b>
              <b className="flex-1 relative text-right">₹1162</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
