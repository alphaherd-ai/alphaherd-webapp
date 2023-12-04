import type { NextPage } from "next";
import TabFinances from "../components/tab-finances";
import SearchForm from "../components/search-form";
import SectionCardFormFilter1 from "../components/section-card-form-filter1";
import InvoiceForm1 from "../components/invoice-form1";
import SectionCard from "../components/section-card";
import PaymentRecordForm from "../components/payment-record-form";
import StylePrimaryStateDefault from "../components/style-primary-state-default";
import WhatsAppSection from "../components/whats-app-section";

const AddSaleItemHover: NextPage = () => {
  return (
    <div className="relative rounded-[20px] bg-structure-page-bg w-full h-[1073px] overflow-hidden text-left text-base text-item-main-text font-heading-extralarge">
      <TabFinances
        icons24="/1-icons24.svg"
        vector94="/vector-94.svg"
        icons241="/1-icons241.svg"
        vector126="/vector-126.svg"
        icons242="/1-icons242.svg"
        vector127="/vector-127.svg"
        icons243="/1-icons243.svg"
        vector128="/vector-128.svg"
        icons244="/1-icons244.svg"
        receptionist="/receptionist@2x.png"
        drShirshaBiswas="/dr-shirsha-biswas@2x.png"
        drKimSchrier="/dr-kim-schrier@2x.png"
        drJudePinto="/drjude-pinto@2x.png"
        drAshwatiSuresh="/dr-ashwati-suresh@2x.png"
        vector1261="/vector-1261.svg"
        component1="/component-1.svg"
        tabFinancesPosition="absolute"
        tabFinancesTop="0px"
        tabFinancesLeft="0px"
      />
      <SearchForm />
      <div className="absolute top-[258.5px] left-[31.5px] bg-structure-bg box-border w-[1377px] h-[715px] overflow-hidden flex flex-col items-start justify-start py-5 px-4 gap-[16px] border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
        <SectionCardFormFilter1 />
        <InvoiceForm1 />
        <SectionCard />
        <PaymentRecordForm />
        <div className="w-[1344px] flex flex-row items-center justify-end gap-[16px]">
          <div className="flex-1 flex flex-row items-center justify-start gap-[16px]">
            <div className="relative rounded-8xs box-border w-[171px] h-11 border-[0.5px] border-dashed border-item-main-text">
              <div className="absolute top-[10px] left-[24px] flex flex-row items-center justify-start gap-[16px]">
                <img
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/1-icons2426.svg"
                />
                <div className="flex flex-row items-center justify-start">
                  <b className="relative">Attach files</b>
                </div>
              </div>
            </div>
            <div />
          </div>
          <div />
          <StylePrimaryStateDefault
            icons24="/1-icons2427.svg"
            addAppointment="Save"
            showIcons24
            stylePrimaryStateDefaultBorder="unset"
            stylePrimaryStateDefaultBorderRadius="5px"
            stylePrimaryStateDefaultBackgroundColor="#17181a"
            icons24Overflow="hidden"
            icons24FlexShrink="0"
            addAppointmentColor="#fff"
            addAppointmentFontWeight="unset"
          />
          <StylePrimaryStateDefault
            icons24="/1-icons2428.svg"
            addAppointment="Print"
            showIcons24
            stylePrimaryStateDefaultBorder="unset"
            stylePrimaryStateDefaultBorderRadius="5px"
            stylePrimaryStateDefaultBackgroundColor="#17181a"
            icons24Overflow="hidden"
            icons24FlexShrink="0"
            addAppointmentColor="#fff"
            addAppointmentFontWeight="unset"
          />
        </div>
      </div>
      <WhatsAppSection />
      <div className="absolute top-[101px] left-[32px] w-[751px] flex flex-row items-center justify-start gap-[16px] text-9xl">
        <div className="relative w-11 h-11">
          <div className="absolute top-[0px] left-[0px] rounded-8xs bg-structure-bg box-border w-11 h-11 border-[0.5px] border-solid border-item-grey-icon-text-stroke05" />
          <img
            className="absolute top-[10px] left-[10px] rounded-8xs w-6 h-6 overflow-hidden"
            alt=""
            src="/1-icons2431.svg"
          />
        </div>
        <b className="relative flex items-center w-[619px] h-[38px] shrink-0">
          New sale
        </b>
      </div>
      <div className="absolute top-[107px] left-[1362px] rounded-8xs bg-structure-general flex flex-row items-center justify-start py-2.5 px-[11px] gap-[8px] text-item-grey-icon-text-stroke05 border-[0.5px] border-solid border-divisionline-onwhite">
        <img className="relative w-6 h-6" alt="" src="/download.svg" />
        <b className="relative hidden">Preferences</b>
      </div>
    </div>
  );
};

export default AddSaleItemHover;
