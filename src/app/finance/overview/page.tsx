import type { NextPage } from "next";
import TabFinances from "../components/tab-finances";
import PriceCard from "../components/price-card";
import SearchBar from "../components/search-bar";
import StylePrimaryStateDefault from "../components/style-primary-state-default";
import TransactionFormContainer from "../components/transaction-form-container";
import TimeFilterForm from "../components/time-filter-form";
import InventoryValueContainer from "../components/inventory-value-container";
import ContainerGraph from "../components/container-graph";
import TopSellingProductsContainer from "../components/top-selling-products-container";

const EstimateInTable: NextPage = () => {
  return (
    <div className="relative rounded-[20px] bg-structure-page-bg w-full h-[1676px] overflow-hidden text-left text-base text-item-grey-icon-text-stroke05 font-selected-14">
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
      <PriceCard />
      <div className="absolute top-[104px] right-[31px] flex flex-row items-center justify-end gap-[16px]">
        <SearchBar
          searchForClientViaClientD="Search for a product"
          search="/search.svg"
          searchBarFlexShrink="0"
        />
        <StylePrimaryStateDefault
          icons24="/1-icons247.svg"
          addAppointment="Sale"
          icons24Overflow="unset"
          icons24FlexShrink="unset"
        />
        <StylePrimaryStateDefault
          icons24="/1-icons248.svg"
          addAppointment=" Expense"
          icons24Overflow="unset"
          icons24FlexShrink="unset"
        />
        <div className="rounded-8xs bg-structure-general flex flex-row items-center justify-start py-2.5 px-[11px] gap-[8px] border-[0.5px] border-solid border-divisionline-onwhite">
          <img className="relative w-6 h-6" alt="" src="/settings.svg" />
          <b className="relative hidden">Preferences</b>
        </div>
      </div>
      <div className="absolute bottom-[543.5px] left-[calc(50%_-_688.5px)] rounded-3xs bg-structure-general box-border w-[1377px] overflow-hidden flex flex-col items-start justify-start text-sm border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
        <div className="self-stretch flex flex-col items-start justify-start">
          <TransactionFormContainer />
          <TimeFilterForm />
        </div>
        <div className="bg-structure-general w-[1377px] h-12 flex flex-row items-center justify-start py-4 px-6 box-border gap-[16px]">
          <div className="flex flex-row items-center justify-start gap-[8px]">
            <img
              className="relative w-6 h-6 overflow-hidden shrink-0"
              alt=""
              src="/1-icons2412.svg"
            />
            <img
              className="relative w-6 h-6 overflow-hidden shrink-0"
              alt=""
              src="/1-icons2413.svg"
            />
          </div>
          <div className="flex-1 relative font-medium">1 - 50 of 2,137</div>
        </div>
      </div>
      <b className="absolute top-[107px] left-[32px] text-9xl text-item-main-text">
        Finances Overview
      </b>
      <div className="absolute top-[1164px] left-[32px] w-[676px] h-[480px] text-xs text-item-main-text">
        <div className="absolute top-[-0.5px] left-[-0.5px] rounded-3xs bg-structure-general box-border w-[677px] h-[481px] flex flex-col items-start justify-start py-0 px-4 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
          <InventoryValueContainer />
          <ContainerGraph />
          <div className="self-stretch flex flex-row items-start justify-center">
            <div className="flex-1 bg-structure-general h-12 overflow-hidden flex flex-row items-center justify-start pt-0 px-2 pb-4 box-border">
              <div className="flex flex-row items-center justify-start gap-[8px]">
                <div className="relative w-4 h-4">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-sm bg-accent-green" />
                </div>
                <div className="relative font-medium">Sold</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[1236px] left-[48px] w-[645px] h-[325px]">
        <div className="absolute top-[0px] left-[0px] w-[645px] h-[325px] overflow-hidden flex flex-row items-end justify-start">
          <div className="self-stretch w-[43px]" />
          <div className="self-stretch flex-1 flex flex-row items-end justify-start py-0 px-2 gap-[16px]">
            <div className="flex-1 flex flex-col items-center justify-end">
              <div className="relative rounded-t-8xs rounded-b-none bg-accent-green w-9 h-[238px]" />
            </div>
            <div className="flex-1 h-[317px] flex flex-col items-center justify-end">
              <div className="relative rounded-t-8xs rounded-b-none bg-accent-green w-9 h-[78px]" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-end">
              <div className="relative rounded-t-8xs rounded-b-none bg-accent-green w-9 h-[125px]" />
            </div>
            <div className="flex-1 h-[156px] flex flex-col items-center justify-end">
              <div className="relative rounded-t-8xs rounded-b-none bg-accent-green w-9 h-[156px]" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-end">
              <div className="relative rounded-t-8xs rounded-b-none bg-accent-green w-9 h-[175px]" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-end">
              <div className="relative rounded-t-8xs rounded-b-none bg-accent-green w-9 h-[41px]" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-end">
              <div className="relative rounded-t-8xs rounded-b-none bg-accent-green w-9 h-[129px]" />
            </div>
          </div>
        </div>
      </div>
      <TopSellingProductsContainer />
    </div>
  );
};

export default EstimateInTable;
