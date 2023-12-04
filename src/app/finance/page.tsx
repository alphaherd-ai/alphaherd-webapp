import type { NextPage } from "next";
import Image from 'next/image';


const EstimateInTable: NextPage = () => {
  return (
    <div className="relative rounded-[20px] bg-structure-page-bg w-full h-[1676px] overflow-hidden text-left text-base text-item-grey-icon-text-stroke05 font-selected-14">
      <div className="absolute top-[0px] left-[0px] bg-primary-black shadow-[0px_4px_6px_rgba(0,_0,_0,_0.2)] w-[1440px] h-[72px]">
        <div className="absolute top-[0px] left-[40px] flex flex-row items-center justify-start gap-[40px]">
          <div className="flex flex-row items-center justify-start gap-[8px]">
            <Image className="relative w-6 h-6" alt="" src="/1-icons24.svg" />
            <div className="relative font-medium">Home</div>
          </div>
          <Image className="relative w-px h-[72px]" alt="" src="/vector-94.svg" />
          <div className="flex flex-row items-center justify-start gap-[8px] text-structure-general">
            <Image className="relative w-6 h-6" alt="" src="/1-icons241.svg" />
            <b className="relative">Finances</b>
          </div>
          <Image
            className="relative w-px h-[72px]"
            alt=""
            src="/vector-126.svg"
          />
          <div className="flex flex-row items-center justify-start gap-[8px]">
            <Image className="relative w-6 h-6" alt="" src="/1-icons242.svg" />
            <div className="relative font-medium">Inventory</div>
          </div>
          <Image
            className="relative w-px h-[72px]"
            alt=""
            src="/vector-127.svg"
          />
          <div className="flex flex-row items-center justify-start gap-[8px]">
            <Image className="relative w-6 h-6" alt="" src="/1-icons243.svg" />
            <div className="relative font-medium">{`Clients & Patients`}</div>
          </div>
          <Image
            className="relative w-px h-[72px]"
            alt=""
            src="/vector-128.svg"
          />
        </div>
        <div className="absolute top-[0px] right-[18px] flex flex-row items-center justify-end gap-[18px]">
          <div className="flex flex-row items-center justify-end gap-[32px]">
            <div className="flex flex-row items-start justify-start gap-[24px]">
              <Image className="relative w-6 h-6" alt="" src="/1-icons244.svg" />
              <div className="relative w-6 h-6">
                <Image
                  className="absolute top-[0px] left-[0px] rounded-981xl w-6 h-6 object-cover"
                  alt=""
                  src="/receptionist@2x.png"
                />
                <Image
                  className="absolute top-[0px] left-[0px] rounded-981xl w-6 h-6 object-cover"
                  alt=""
                  src="/dr-shirsha-biswas@2x.png"
                />
                <Image
                  className="absolute top-[0px] left-[0px] rounded-981xl w-6 h-6 object-cover"
                  alt=""
                  src="/dr-kim-schrier@2x.png"
                />
                <Image
                  className="absolute top-[0px] left-[0px] rounded-[50%] w-6 h-6 object-cover"
                  alt=""
                  src="/drjude-pinto@2x.png"
                />
                <Image
                  className="absolute top-[0px] left-[0px] rounded-981xl w-6 h-6 object-cover"
                  alt=""
                  src="/dr-ashwati-suresh@2x.png"
                />
              </div>
            </div>
            <Image
              className="relative w-px h-[72px]"
              alt=""
              src="/vector-1261.svg"
            />
          </div>
          <Image className="relative w-9 h-9" alt="" src="/component-1.svg" />
        </div>
      </div>
      <section
        className="absolute top-[180px] left-[calc(50%_-_688px)] w-[1376px] flex flex-col items-start justify-start"
        id="summary"
      >
        <section className="self-stretch rounded-3xs bg-structure-general overflow-hidden flex flex-col items-start justify-start pt-4 px-0 pb-0 gap-[16px] text-left text-sm text-item-main-text font-selected-14 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
          <div className="self-stretch flex flex-row items-center justify-start py-0 px-6 gap-[8px]">
            <div className="flex-1 flex flex-row items-center justify-start gap-[16px]">
              <div className="flex flex-row items-start justify-start gap-[8px]">
                <Image
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/1-icons245.svg"
                />
                <Image
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/1-icons246.svg"
                />
              </div>
              <div className="relative font-medium flex items-center w-[380px] h-[19px] shrink-0">
                July 17th - 23rd, 2023
              </div>
            </div>
            <div className="relative w-[351px] h-[18px] text-item-grey-icon-text-stroke05">
              <div className="absolute h-[2.78%] w-[100.14%] top-[204.17%] right-[-0.07%] bottom-[-106.94%] left-[-0.07%] box-border border-t-[0.5px] border-solid border-divisionline-onwhite" />
              <div className="absolute h-[105.56%] w-full top-[-5.56%] right-[0%] bottom-[0%] left-[0%] flex flex-row items-start justify-start gap-[24px]">
                <div className="flex flex-row items-start justify-start">
                  <div className="relative font-medium">Day</div>
                </div>
                <div className="flex flex-row items-start justify-start text-center text-primary-green">
                  <b className="relative">Week</b>
                </div>
                <div className="flex flex-row items-start justify-start">
                  <div className="relative font-medium">Month</div>
                </div>
                <div className="flex flex-row items-start justify-start">
                  <div className="relative font-medium">Quarter</div>
                </div>
                <div className="flex flex-row items-start justify-start">
                  <div className="relative font-medium">Year</div>
                </div>
                <div className="flex flex-row items-start justify-start">
                  <div className="relative font-medium">All Time</div>
                </div>
              </div>
              <div className="absolute h-[22.22%] w-[14.49%] top-[183.33%] right-[73.26%] bottom-[-105.56%] left-[12.25%]">
                <div className="absolute h-full w-full top-[100%] right-[-100%] bottom-[-100%] left-[100%] rounded-3xl bg-primary-green [transform:_rotate(180deg)] [transform-origin:0_0]" />
              </div>
            </div>
          </div>
          <div className="w-[1376px] h-[136px] flex flex-col items-start justify-start relative gap-[8px] text-9xl">
            <div className="relative w-[1376px] h-[152px] z-[0]">
              <div className="absolute top-[151.5px] left-[-0.5px] rounded-t-3xs rounded-b-none bg-structure-general box-border w-[1377px] h-[153px] border-[0.5px] border-solid border-item-grey-icon-text-stroke05" />
            </div>
            <div className="my-0 mx-[!important] absolute top-[0px] left-[calc(50%_-_344px)] w-[688px] h-[136px] flex flex-row items-start justify-start gap-[344px] z-[1]">
              <div className="relative box-border w-[0.5px] h-[152.5px] z-[0] border-r-[0.5px] border-solid border-divisionline-onwhite" />
              <div className="relative box-border w-[0.5px] h-[152.5px] z-[1] border-r-[0.5px] border-solid border-divisionline-onwhite" />
              <div className="relative box-border w-[0.5px] h-[152.5px] z-[2] border-r-[0.5px] border-solid border-divisionline-onwhite" />
              <div className="my-0 mx-[!important] absolute top-[16px] left-[24px] flex flex-col items-start justify-start gap-[16px] z-[3]">
                <div className="flex flex-col items-start justify-start">
                  <b className="relative">₹32,499</b>
                  <div className="relative text-base font-medium">Expenses</div>
                </div>
                <div className="rounded-8xs bg-light-green h-7 overflow-hidden shrink-0 flex flex-row items-center justify-center py-1.5 px-2 box-border gap-[8px] text-sm text-accent-green">
                  <Image
                    className="relative w-4 h-4 overflow-hidden shrink-0"
                    alt=""
                    src="/icons16.svg"
                  />
                  <div className="relative font-medium">12.4%</div>
                </div>
              </div>
            </div>
            <div className="my-0 mx-[!important] absolute top-[16px] left-[24px] flex flex-col items-start justify-start gap-[16px] z-[2]">
              <div className="flex flex-col items-start justify-start">
                <b className="relative">₹92,499</b>
                <div className="relative text-base font-medium">Revenue</div>
              </div>
              <div className="rounded-8xs bg-light-green h-7 overflow-hidden shrink-0 flex flex-row items-center justify-center py-1.5 px-2 box-border gap-[8px] text-sm text-accent-green">
                <Image
                  className="relative w-4 h-4 overflow-hidden shrink-0"
                  alt=""
                  src="/icons161.svg"
                />
                <div className="relative font-medium">12.4%</div>
              </div>
            </div>
            <div className="my-0 mx-[!important] absolute top-[16px] left-[1056px] flex flex-col items-start justify-start gap-[16px] z-[3]">
              <div className="flex flex-col items-start justify-start">
                <b className="relative">₹12,000</b>
                <div className="relative text-base font-medium">
                  Total reserve
                </div>
              </div>
              <div className="rounded-8xs bg-light-green h-7 overflow-hidden shrink-0 flex flex-row items-center justify-center py-1.5 px-2 box-border gap-[8px] text-sm text-accent-green">
                <Image
                  className="relative w-4 h-4 overflow-hidden shrink-0"
                  alt=""
                  src="/icons162.svg"
                />
                <div className="relative font-medium">12% since last week</div>
              </div>
            </div>
            <div className="my-0 mx-[!important] absolute top-[16px] left-[712px] flex flex-col items-start justify-start gap-[16px] z-[4]">
              <div className="flex flex-col items-start justify-start">
                <b className="relative">₹12,320</b>
                <div className="relative text-base font-medium">
                  Total balances due
                </div>
              </div>
              <div className="rounded-8xs bg-light-red h-7 overflow-hidden shrink-0 flex flex-row items-end justify-start pt-1.5 pb-[5px] pr-2 pl-[11px] box-border gap-[4px] text-sm text-accent-red">
                <div className="relative font-medium">14 clients</div>
                <Image className="relative w-4 h-4" alt="" src="/icons163.svg" />
              </div>
            </div>
          </div>
        </section>
      </section>
      <div className="absolute top-[104px] right-[31px] flex flex-row items-center justify-end gap-[16px] text-structure-general">
        <div className="rounded-8xs bg-structure-general box-border w-[345px] h-[45px] overflow-hidden shrink-0 flex flex-row items-center justify-start py-[13px] px-4 gap-[14px] text-[15.46px] text-item-grey-icon-text-stroke05 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
          <div className="flex-1 relative font-medium">
            Search for a product
          </div>
          <Image
            className="relative w-[23.19px] h-[23.19px]"
            alt=""
            src="/search.svg"
          />
        </div>
        <div className="rounded-8xs bg-primary-black flex flex-row items-center justify-start py-2.5 px-4 gap-[8px]">
          <Image className="relative w-6 h-6" alt="" src="/1-icons247.svg" />
          <b className="relative">Sale</b>
        </div>
        <div className="rounded-8xs bg-primary-black flex flex-row items-center justify-start py-2.5 px-4 gap-[8px]">
          <Image className="relative w-6 h-6" alt="" src="/1-icons248.svg" />
          <b className="relative"> Expense</b>
        </div>
        <div className="rounded-8xs bg-structure-general flex flex-row items-center justify-start py-2.5 px-[11px] border-[0.5px] border-solid border-divisionline-onwhite">
          <Image className="relative w-6 h-6" alt="" src="/settings.svg" />
        </div>
      </div>
      <table
        className="absolute bottom-[543.5px] left-[calc(50%_-_688.5px)] rounded-3xs bg-structure-general box-border w-[1377px] overflow-hidden border-[0.5px] border-solid border-item-grey-icon-text-stroke05"
        id="consultation-table"
      >
        <tbody>
          <tr>
            <td className="relative pr-[72px] pb-0" colSpan={2}>
              <div className="bg-structure-general box-border w-full h-[72px] flex flex-row items-center justify-start py-4 px-6 gap-[16px] border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                <div className="flex-1 flex flex-row items-center justify-start gap-[16px]">
                  <div className="relative text-xl font-medium font-selected-14 text-item-main-text text-left">
                    Transactions
                  </div>
                  <div className="flex-1 flex flex-row items-center justify-start">
                    <Image
                      className="relative w-6 h-6 overflow-hidden shrink-0"
                      alt=""
                      src="/1-icons249.svg"
                    />
                  </div>
                </div>
                <div className="rounded-8xs bg-structure-general box-border h-7 flex flex-row items-center justify-start p-2 gap-[8px] border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                  <Image
                    className="relative w-4 h-4 overflow-hidden shrink-0"
                    alt=""
                    src="/icons164.svg"
                  />
                  <div className="flex flex-row items-center justify-start">
                    <div className="relative text-sm font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Sort: Time
                    </div>
                  </div>
                </div>
                <div className="rounded-8xs bg-structure-general box-border h-7 flex flex-row items-center justify-start p-2 gap-[8px] border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                  <Image
                    className="relative w-4 h-4"
                    alt=""
                    src="/icons165.svg"
                  />
                  <div className="flex flex-row items-center justify-start">
                    <div className="relative text-sm font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Filter by
                    </div>
                  </div>
                </div>
                <div className="rounded-8xs bg-primary-black flex flex-row items-center justify-start py-2.5 px-4 gap-[8px]">
                  <Image
                    className="relative w-6 h-6 overflow-hidden shrink-0"
                    alt=""
                    src="/1-icons2410.svg"
                  />
                  <b className="relative text-base font-selected-14 text-structure-general text-left">
                    Reconcile
                  </b>
                </div>
              </div>
            </td>
            <td className="relative pb-0" colSpan={2}>
              <div className="flex flex-row items-start justify-start w-full h-full">
                <div className="flex-1 flex flex-col items-start justify-start">
                  <div className="self-stretch bg-structure-bg box-border h-12 flex flex-row items-center justify-start p-4 gap-[8px] border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                    <div className="relative text-base font-medium font-selected-14 text-item-main-text text-left">
                      Time
                    </div>
                    <div className="flex-1 flex flex-row items-center justify-start">
                      <Image
                        className="relative w-4 h-4 overflow-hidden shrink-0"
                        alt=""
                        src="/icons166.svg"
                      />
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      9:12am, 22 Jun, 2023
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      9:03am, 22 Jun, 2023
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      8:56am, 22 Jun, 2023
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      8:43am, 22 Jun, 2023
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      8:37am, 22 Jun, 2023
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      9:53pm, 21 Jun, 2023
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      9:51pm, 21 Jun, 2023
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      9:41pm, 21 Jun, 2023
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      9:03am, 22 Jun, 2023
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start">
                  <div className="self-stretch bg-structure-bg box-border h-12 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                    <div className="relative text-base font-medium font-selected-14 text-item-main-text text-left">
                      Product/Service
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general flex flex-col items-start justify-center py-[21px] px-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="self-stretch relative text-base [text-decoration:underline] font-medium font-selected-14 text-primary-green text-left">
                      Spay
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general flex flex-col items-start justify-center py-[21px] px-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="self-stretch relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      3ml syringes (x100)
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general flex flex-col items-start justify-center py-[21px] px-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="self-stretch relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Clavamox (x200)
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general flex flex-col items-start justify-center py-[21px] px-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="self-stretch relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      DHPP Vaccination
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general flex flex-col items-start justify-center py-[21px] px-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="self-stretch relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Small animal grooming
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general flex flex-col items-start justify-center py-[21px] px-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Metaclopramide (x1 bottle)
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general flex flex-col items-start justify-center py-[21px] px-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="self-stretch relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                      Monster Yak cheese chews
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general flex flex-col items-start justify-center py-[21px] px-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="self-stretch relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      General Consultation
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general flex flex-col items-start justify-center py-[21px] px-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="self-stretch relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Office Rent
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start">
                  <div className="self-stretch bg-structure-bg box-border h-12 flex flex-row items-center justify-start py-4 px-6 gap-[8px] border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                    <div className="relative text-base font-medium font-selected-14 text-item-main-text text-left">
                      Client/Vendor
                    </div>
                    <div className="flex-1 flex flex-row items-center justify-start">
                      <Image
                        className="relative w-4 h-4 overflow-hidden shrink-0"
                        alt=""
                        src="/icons167.svg"
                      />
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start py-4 px-6 gap-[16px] border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="relative rounded-[1166.67px] box-border w-7 h-7 overflow-hidden shrink-0 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                      <Image
                        className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
                        alt=""
                        src="/unsplash7q0l3tswpao@2x.png"
                      />
                      <Image
                        className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
                        alt=""
                        src="/unsplashyuhsvozqp20@2x.png"
                      />
                      <Image
                        className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
                        alt=""
                        src="/unsplashsmr--unqh5a@2x.png"
                      />
                    </div>
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Avinash Pinto
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start py-4 px-6 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      WeCare
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start py-4 px-6 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                      Jainsons India
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start py-4 px-6 gap-[16px] border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="relative rounded-[1166.67px] box-border w-7 h-7 overflow-hidden shrink-0 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                      <Image
                        className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
                        alt=""
                        src="/unsplash7q0l3tswpao1@2x.png"
                      />
                      <Image
                        className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
                        alt=""
                        src="/unsplashyuhsvozqp201@2x.png"
                      />
                      <Image
                        className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
                        alt=""
                        src="/unsplashlmtuqlyrjo4@2x.png"
                      />
                    </div>
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Rhea Pais
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start py-4 px-6 gap-[16px] border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="relative rounded-[1166.67px] box-border w-7 h-7 overflow-hidden shrink-0 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                      <Image
                        className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
                        alt=""
                        src="/unsplash7q0l3tswpao2@2x.png"
                      />
                      <Image
                        className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
                        alt=""
                        src="/unsplashyuhsvozqp202@2x.png"
                      />
                      <Image
                        className="absolute top-[0px] left-[0px] w-7 h-[40.83px] object-cover"
                        alt=""
                        src="/unsplashbn5cob0k9ge@2x.png"
                      />
                    </div>
                    <div className="relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Samuel L. Jackson
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start py-4 px-6 gap-[16px] border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="relative rounded-[1166.67px] box-border w-7 h-7 overflow-hidden shrink-0 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                      <Image
                        className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
                        alt=""
                        src="/unsplash7q0l3tswpao3@2x.png"
                      />
                      <Image
                        className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
                        alt=""
                        src="/unsplashyuhsvozqp203@2x.png"
                      />
                    </div>
                    <div className="relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Alexander Trakov...
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start py-4 px-6 gap-[16px] border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="relative rounded-[1166.67px] box-border w-7 h-7 overflow-hidden shrink-0 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                      <Image
                        className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
                        alt=""
                        src="/unsplash7q0l3tswpao4@2x.png"
                      />
                      <Image
                        className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
                        alt=""
                        src="/unsplashyuhsvozqp204@2x.png"
                      />
                    </div>
                    <div className="relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Alexander Trakov...
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start py-4 px-6 gap-[16px] border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="relative rounded-[1166.67px] box-border w-7 h-7 overflow-hidden shrink-0 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                      <Image
                        className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
                        alt=""
                        src="/unsplash7q0l3tswpao5@2x.png"
                      />
                      <Image
                        className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
                        alt=""
                        src="/unsplashyuhsvozqp205@2x.png"
                      />
                    </div>
                    <div className="relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Alexander Trakov...
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start py-4 px-6 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Rajan Raghavendra
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start">
                  <div className="self-stretch bg-structure-bg box-border h-12 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                    <div className="relative text-base font-medium font-selected-14 text-item-main-text text-left">
                      Invoice/Purchase Order
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Rani_Surgery1
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      3mlSyringe100WC
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Clavamox_Jainsons24
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Pink_Vax3
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Squak_Grooming1
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Sushi_Consultation23
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Sushi_Consultation23
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Sushi_Consultation23
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      Rent_Jun23
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start">
                  <div className="self-stretch bg-structure-bg box-border h-12 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                    <div className="relative text-base font-medium font-selected-14 text-item-main-text text-left">
                      Total
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      ₹399
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      ₹400
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      ₹10,299
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      ₹1,399
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      ₹1,699
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      ₹899
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      ₹1,255
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      ₹500
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex-1 relative text-base font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                      ₹40,000
                    </div>
                  </div>
                </div>
                <div className="w-[280px] flex flex-col items-start justify-start">
                  <div className="self-stretch bg-structure-bg box-border h-12 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
                    <div className="relative text-base font-medium font-selected-14 text-item-main-text text-left">
                      Payment
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="rounded-8xs bg-light-orange h-7 overflow-hidden flex flex-row items-center justify-center py-1.5 px-2 box-border">
                      <div className="relative text-sm font-medium font-selected-14 text-accent-orange text-left">
                        Due: ₹399
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 gap-[8px] border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="rounded-8xs bg-light-red h-7 overflow-hidden flex flex-row items-center justify-center py-1.5 px-2 box-border">
                      <div className="relative text-sm font-medium font-selected-14 text-accent-red text-left">{`-₹500 `}</div>
                    </div>
                    <div className="rounded-8xs bg-structure-bg h-7 overflow-hidden flex flex-row items-center justify-center py-1.5 px-2 box-border gap-[8px]">
                      <Image
                        className="relative w-4 h-4 overflow-hidden shrink-0"
                        alt=""
                        src="/icons168.svg"
                      />
                      <div className="relative text-sm font-medium font-selected-14 text-item-main-text text-left">
                        ₹100
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 gap-[8px] border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="rounded-8xs bg-light-red h-7 overflow-hidden flex flex-row items-center justify-center py-1.5 px-2 box-border">
                      <div className="relative text-sm font-medium font-selected-14 text-accent-red text-left">{`-₹5,000 `}</div>
                    </div>
                    <div className="rounded-8xs bg-light-orange h-7 overflow-hidden flex flex-row items-center justify-center py-1.5 px-2 box-border">
                      <div className="relative text-sm font-medium font-selected-14 text-accent-orange text-left">
                        Due: ₹5,299
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex flex-row items-center justify-start">
                      <div className="rounded-8xs bg-light-green h-7 overflow-hidden flex flex-row items-center justify-center py-1.5 px-2 box-border">
                        <div className="relative text-sm font-medium font-selected-14 text-accent-green text-left">
                          +₹1,399
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="rounded-8xs bg-light-orange h-7 overflow-hidden flex flex-row items-center justify-center py-1.5 px-2 box-border">
                      <div className="relative text-sm font-medium font-selected-14 text-accent-orange text-left">
                        Due: ₹1,699
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex flex-row items-center justify-start">
                      <div className="flex flex-row items-center justify-start">
                        <div className="flex flex-row items-center justify-start">
                          <div className="rounded-8xs bg-light-green h-7 overflow-hidden flex flex-row items-center justify-center py-1.5 px-2 box-border">
                            <div className="relative text-sm font-medium font-selected-14 text-accent-green text-left">
                              +₹899
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 gap-[8px] border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex flex-row items-center justify-start">
                      <div className="rounded-8xs bg-light-blue h-7 overflow-hidden flex flex-row items-center justify-center py-1.5 px-2 box-border">
                        <div className="relative text-sm font-medium font-selected-14 text-accent-blue text-left">
                          Estimate
                        </div>
                      </div>
                    </div>
                    <div className="rounded-8xs bg-structure-bg h-7 overflow-hidden flex flex-row items-center justify-center py-1.5 px-2 box-border gap-[8px]">
                      <Image
                        className="relative w-4 h-4 overflow-hidden shrink-0"
                        alt=""
                        src="/1-icons2411.svg"
                      />
                      <div className="relative text-sm font-medium font-selected-14 text-item-main-text text-left">
                        02/11/2023
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex flex-row items-center justify-start">
                      <div className="rounded-8xs bg-light-green h-7 overflow-hidden flex flex-row items-center justify-center py-1.5 px-2 box-border">
                        <div className="relative text-sm font-medium font-selected-14 text-accent-green text-left">
                          +₹500
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
                    <div className="flex flex-row items-center justify-start">
                      <div className="rounded-8xs bg-light-red h-7 overflow-hidden flex flex-row items-center justify-center py-1.5 px-2 box-border">
                        <div className="relative text-sm font-medium font-selected-14 text-accent-red text-left">{`-₹40,000 `}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="bg-structure-general">
            <td className="relative pr-[72px]">
              <div className="flex flex-row items-center justify-start gap-[8px] w-full h-full">
                <Image
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/1-icons2412.svg"
                />
                <Image
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/1-icons2413.svg"
                />
              </div>
            </td>
            <td className="relative">
              <div className="relative text-sm font-medium font-selected-14 text-item-grey-icon-text-stroke05 text-left">
                1 - 50 of 2,137
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <b className="absolute top-[107px] left-[32px] text-9xl text-item-main-text">
        Finances Overview
      </b>
      <div
        className="absolute top-[1164px] left-[32px] w-[676px] h-[480px] text-xs text-item-main-text"
        id="graph-categories"
      >
        <div className="absolute top-[-0.5px] left-[-0.5px] rounded-3xs bg-structure-general box-border w-[677px] h-[481px] flex flex-col items-start justify-start py-0 px-4 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
          <div className="self-stretch bg-structure-general box-border h-[72px] overflow-hidden shrink-0 flex flex-row items-center justify-start py-4 pr-0 pl-2 gap-[16px] text-base border-b-[0.5px] border-solid border-divisionline-onwhite">
            <div className="flex flex-row items-center justify-start">
              <div className="flex flex-row items-center justify-start gap-[8px]">
                <div className="relative font-medium">
                  Current inventory value:
                </div>
                <div className="relative text-xl font-medium">₹4,36,284</div>
              </div>
            </div>
            <div className="flex-1 flex flex-row items-center justify-start">
              <Image
                className="relative w-6 h-6 overflow-hidden shrink-0"
                alt=""
                src="/1-icons2414.svg"
              />
            </div>
            <div className="rounded-8xs bg-structure-general box-border h-7 flex flex-row items-center justify-start p-2 gap-[8px] text-sm text-item-grey-icon-text-stroke05 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
              <Image
                className="relative w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/icons169.svg"
              />
              <div className="flex flex-row items-center justify-start">
                <div className="relative font-medium">Categories: All</div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex-1 flex flex-col items-start justify-start text-right">
            <div className="self-stretch flex-1 flex flex-row items-start justify-start">
              <div className="self-stretch w-[43px] flex flex-col items-center justify-end pt-2 px-2 pb-0 box-border">
                <div className="relative font-medium flex items-center w-8 h-px shrink-0">
                  ₹50k
                </div>
              </div>
              <div className="self-stretch flex-1 flex flex-col items-start justify-start">
                <div className="self-stretch flex-1 relative border-b-[0.5px] border-solid border-divisionline-onwhite border-l-[0.5px]" />
              </div>
            </div>
            <div className="self-stretch flex-1 flex flex-row items-start justify-start">
              <div className="self-stretch w-[43px] flex flex-col items-center justify-end pt-2 px-2 pb-0 box-border">
                <div className="relative font-medium flex items-center w-8 h-px shrink-0">
                  ₹40k
                </div>
              </div>
              <div className="self-stretch flex-1 flex flex-col items-start justify-start">
                <div className="self-stretch flex-1 relative border-b-[0.5px] border-solid border-divisionline-onwhite border-l-[0.5px]" />
              </div>
            </div>
            <div className="self-stretch flex-1 flex flex-row items-start justify-start">
              <div className="self-stretch w-[43px] flex flex-col items-center justify-end pt-2 px-2 pb-0 box-border">
                <div className="relative font-medium flex items-center w-8 h-px shrink-0">
                  ₹30k
                </div>
              </div>
              <div className="self-stretch flex-1 flex flex-col items-start justify-start">
                <div className="self-stretch flex-1 relative border-b-[0.5px] border-solid border-divisionline-onwhite border-l-[0.5px]" />
              </div>
            </div>
            <div className="self-stretch flex-1 flex flex-row items-start justify-start">
              <div className="self-stretch w-[43px] flex flex-col items-center justify-end pt-2 px-2 pb-0 box-border">
                <div className="relative font-medium flex items-center w-8 h-px shrink-0">
                  ₹20k
                </div>
              </div>
              <div className="self-stretch flex-1 flex flex-col items-start justify-start">
                <div className="self-stretch flex-1 relative border-b-[0.5px] border-solid border-divisionline-onwhite border-l-[0.5px]" />
              </div>
            </div>
            <div className="self-stretch flex-1 flex flex-row items-start justify-start">
              <div className="self-stretch w-[43px] flex flex-col items-center justify-end pt-2 px-2 pb-0 box-border">
                <div className="relative font-medium flex items-center w-8 h-px shrink-0">
                  ₹10k
                </div>
              </div>
              <div className="self-stretch flex-1 flex flex-col items-start justify-start">
                <div className="self-stretch flex-1 relative border-b-[0.5px] border-solid border-divisionline-onwhite border-l-[0.5px]" />
              </div>
            </div>
            <div className="self-stretch flex-1 flex flex-row items-start justify-start">
              <div className="self-stretch w-[43px]" />
              <div className="self-stretch flex-1 flex flex-col items-start justify-start">
                <div className="self-stretch flex-1 relative rounded-t-none rounded-br-none rounded-bl-8xs border-b-[0.5px] border-solid border-divisionline-onwhite border-l-[0.5px]" />
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start text-center text-sm">
              <div className="self-stretch w-[43px]" />
              <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2">
                <b className="flex-1 relative">Medical</b>
              </div>
              <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2">
                <b className="flex-1 relative">Boarding</b>
              </div>
              <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2">
                <b className="flex-1 relative">Grooming</b>
              </div>
              <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2">
                <b className="flex-1 relative">Pharmacy</b>
              </div>
              <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2">
                <b className="flex-1 relative">Retail</b>
              </div>
              <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2">
                <b className="flex-1 relative">Training</b>
              </div>
              <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2">
                <b className="flex-1 relative">Others</b>
              </div>
            </div>
          </div>
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
      <div
        className="absolute top-[1163.5px] left-[731.5px] rounded-3xs bg-structure-general box-border w-[677px] h-[481px] flex flex-col items-start justify-start py-0 px-4 text-sm border-[0.5px] border-solid border-item-grey-icon-text-stroke05"
        id="graphs-selling"
      >
        <div className="self-stretch bg-structure-general h-[72px] overflow-hidden shrink-0 flex flex-row items-center justify-start py-4 pr-0 pl-2 box-border gap-[16px] w-auto border-[0px] border-solid border-divisionline-onwhite hover:bg-structure-general hover:flex hover:self-stretch hover:w-auto hover:h-[72px] hover:flex-row hover:gap-[16px] hover:items-center hover:justify-start hover:py-4 hover:pr-0 hover:pl-2 hover:box-border hover:border-[0px] hover:border-solid hover:border-divisionline-onwhite">
          <div className="flex flex-row items-center justify-start text-base text-item-main-text">
            <div className="flex flex-row items-center justify-start">
              <div className="relative font-medium">Top Selling Products</div>
            </div>
          </div>
          <div className="flex-1 flex flex-row items-center justify-start">
            <Image
              className="relative w-6 h-6 overflow-hidden shrink-0"
              alt=""
              src="/1-icons2415.svg"
            />
          </div>
          <div className="rounded-8xs bg-structure-general box-border h-7 flex flex-row items-center justify-start p-2 gap-[8px] border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
            <Image
              className="relative w-4 h-4 overflow-hidden shrink-0"
              alt=""
              src="/icons1610.svg"
            />
            <div className="flex flex-row items-center justify-start">
              <div className="relative font-medium">All Species</div>
            </div>
          </div>
          <div className="rounded-8xs bg-structure-general box-border h-7 flex flex-row items-center justify-start p-2 gap-[8px] border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
            <Image
              className="relative w-4 h-4 overflow-hidden shrink-0"
              alt=""
              src="/icons1611.svg"
            />
            <div className="flex flex-row items-center justify-start">
              <div className="relative font-medium">All time</div>
            </div>
          </div>
          <div className="rounded-8xs bg-structure-general box-border h-7 flex flex-row items-center justify-start p-2 gap-[8px] border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
            <Image
              className="relative w-4 h-4 overflow-hidden shrink-0"
              alt=""
              src="/icons1612.svg"
            />
            <div className="flex flex-row items-center justify-start">
              <div className="relative font-medium">Categories: All</div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-col items-start justify-center w-auto gap-[0px] text-item-main-text hover:flex hover:self-stretch hover:w-auto hover:flex-1 hover:flex-col hover:gap-[0px] hover:items-start hover:justify-center">
          <div className="self-stretch flex-1 flex flex-row items-center justify-start">
            <div className="self-stretch bg-structure-general box-border w-36 overflow-hidden shrink-0 flex flex-row items-center justify-start p-2 border-r-[0.5px] border-solid border-divisionline-onwhite">
              <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">
                Dog food-Royal Canine
              </b>
            </div>
            <div className="flex-1 h-9 flex flex-col items-start justify-center">
              <div className="self-stretch relative rounded-tl-none rounded-tr-8xs rounded-br-8xs rounded-bl-none bg-accent-blue h-7" />
            </div>
            <div className="bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2 text-item-grey-icon-text-stroke05">
              <b className="relative">₹8,36,284</b>
            </div>
          </div>
          <div className="self-stretch flex-1 flex flex-row items-center justify-start">
            <div className="self-stretch bg-structure-general box-border w-36 overflow-hidden shrink-0 flex flex-row items-center justify-start p-2 border-r-[0.5px] border-solid border-divisionline-onwhite">
              <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">
                Cat food-Royal Canine
              </b>
            </div>
            <div className="flex-1 h-9 flex flex-col items-start justify-center">
              <div className="self-stretch relative rounded-tl-none rounded-tr-8xs rounded-br-8xs rounded-bl-none bg-accent-yellow h-7" />
            </div>
            <div className="bg-structure-general w-[109px] overflow-hidden shrink-0 flex flex-row items-start justify-start p-2 box-border text-item-grey-icon-text-stroke05">
              <b className="flex-1 relative">₹7,22,248</b>
            </div>
          </div>
          <div className="self-stretch flex-1 flex flex-row items-center justify-start">
            <div className="self-stretch bg-structure-general box-border w-36 overflow-hidden shrink-0 flex flex-row items-center justify-start p-2 border-r-[0.5px] border-solid border-divisionline-onwhite">
              <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">
                Cat litter-Fresh Step
              </b>
            </div>
            <div className="flex-1 h-9 flex flex-col items-start justify-center">
              <div className="self-stretch relative rounded-tl-none rounded-tr-8xs rounded-br-8xs rounded-bl-none bg-accent-green h-7" />
            </div>
            <div className="bg-structure-general w-[198px] overflow-hidden shrink-0 flex flex-row items-start justify-start p-2 box-border text-item-grey-icon-text-stroke05">
              <b className="flex-1 relative">₹5,33,490</b>
            </div>
          </div>
          <div className="self-stretch flex-1 flex flex-row items-center justify-start">
            <div className="self-stretch bg-structure-general box-border w-36 overflow-hidden shrink-0 flex flex-row items-center justify-start p-2 border-r-[0.5px] border-solid border-divisionline-onwhite">
              <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">
                Shampoo - Himalaya
              </b>
            </div>
            <div className="h-9 flex flex-col items-start justify-center">
              <div className="relative rounded-tl-none rounded-tr-8xs rounded-br-8xs rounded-bl-none bg-accent-orange w-[268px] h-7" />
            </div>
            <div className="flex-1 bg-structure-general overflow-hidden flex flex-row items-start justify-start p-2 text-item-grey-icon-text-stroke05">
              <b className="flex-1 relative">₹3,89,248</b>
            </div>
          </div>
          <div className="self-stretch flex-1 flex flex-row items-center justify-start">
            <div className="self-stretch bg-structure-general box-border w-36 overflow-hidden shrink-0 flex flex-row items-center justify-start p-2 border-r-[0.5px] border-solid border-divisionline-onwhite">
              <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">{`Bayer tick & flea control`}</b>
            </div>
            <div className="flex-1 h-9 flex flex-col items-start justify-center">
              <div className="self-stretch relative rounded-tl-none rounded-tr-8xs rounded-br-8xs rounded-bl-none bg-accent-red h-7" />
            </div>
            <div className="bg-structure-general w-[280px] overflow-hidden shrink-0 flex flex-row items-start justify-start p-2 box-border text-item-grey-icon-text-stroke05">
              <b className="flex-1 relative">₹3,54,900</b>
            </div>
          </div>
          <div className="self-stretch flex-1 flex flex-row items-center justify-start">
            <div className="self-stretch bg-structure-general box-border w-36 overflow-hidden shrink-0 flex flex-row items-center justify-start p-2 border-r-[0.5px] border-solid border-divisionline-onwhite">
              <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">
                Skin supplements - Omega 3
              </b>
            </div>
            <div className="w-[217px] h-9 flex flex-col items-start justify-center">
              <div className="self-stretch relative rounded-tl-none rounded-tr-8xs rounded-br-8xs rounded-bl-none bg-item-grey-icon-text-stroke05 h-7" />
            </div>
            <div className="bg-structure-general w-[232px] overflow-hidden shrink-0 flex flex-row items-start justify-start p-2 box-border text-item-grey-icon-text-stroke05">
              <b className="flex-1 relative">₹2,99,248</b>
            </div>
          </div>
        </div>
        <div className="self-stretch h-14 flex flex-row items-center justify-center pt-0 px-0 pb-2 box-border w-auto gap-[0px] text-center hover:flex hover:self-stretch hover:w-auto hover:h-14 hover:flex-row hover:gap-[0px] hover:items-center hover:justify-center hover:pt-0 hover:px-0 hover:pb-2 hover:box-border">
          <div className="flex flex-row items-center justify-start">
            <div className="relative font-medium">
              23 Jun, 2021 - Oct 9, 2023
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateInTable;
