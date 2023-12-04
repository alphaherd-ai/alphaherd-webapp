import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import MainHeader from "./main-header";
import DisplayPictureVeterinarianDoc from "./display-picture-veterinarian-doc";

type TabFinancesType = {
  icons24?: string;
  vector94?: string;
  icons241?: string;
  vector126?: string;
  icons242?: string;
  vector127?: string;
  icons243?: string;
  vector128?: string;
  icons244?: string;
  receptionist?: string;
  drShirshaBiswas?: string;
  drKimSchrier?: string;
  drJudePinto?: string;
  drAshwatiSuresh?: string;
  vector1261?: string;
  component1?: string;

  /** Style props */
  tabFinancesPosition?: CSSProperties["position"];
  tabFinancesTop?: CSSProperties["top"];
  tabFinancesLeft?: CSSProperties["left"];
};

const TabFinances: NextPage<TabFinancesType> = ({
  icons24,
  vector94,
  icons241,
  vector126,
  icons242,
  vector127,
  icons243,
  vector128,
  icons244,
  receptionist,
  drShirshaBiswas,
  drKimSchrier,
  drJudePinto,
  drAshwatiSuresh,
  vector1261,
  component1,
  tabFinancesPosition,
  tabFinancesTop,
  tabFinancesLeft,
}) => {
  const tabFinancesStyle: CSSProperties = useMemo(() => {
    return {
      position: tabFinancesPosition,
      top: tabFinancesTop,
      left: tabFinancesLeft,
    };
  }, [tabFinancesPosition, tabFinancesTop, tabFinancesLeft]);

  return (
    <div
      className="bg-primary-black shadow-[0px_4px_6px_rgba(0,_0,_0,_0.2)] w-[1440px] h-[72px]"
      style={tabFinancesStyle}
    >
      <MainHeader
        iconName="/1-icons2433.svg"
        iconNameText="/vector-941.svg"
        iconClassName="/1-icons2434.svg"
        iconImageName="/vector-1262.svg"
        iconFileName="/1-icons2435.svg"
        iconImageName2="/vector-1271.svg"
        iconText="/1-icons2436.svg"
        iconId="/vector-1281.svg"
      />
      <div className="absolute top-[0px] right-[18px] flex flex-row items-center justify-end gap-[18px]">
        <div className="flex flex-row items-center justify-end gap-[32px]">
          <div className="flex flex-row items-start justify-start gap-[24px]">
            <img className="relative w-6 h-6" alt="" src={icons244} />
            <DisplayPictureVeterinarianDoc
              receptionist="/receptionist1@2x.png"
              drShirshaBiswas="/dr-shirsha-biswas1@2x.png"
              drKimSchrier="/dr-kim-schrier1@2x.png"
              drJudePinto="/drjude-pinto1@2x.png"
              drAshwatiSuresh="/dr-ashwati-suresh1@2x.png"
              displayPictureVeterinariaPosition="relative"
            />
          </div>
          <img className="relative w-px h-[72px]" alt="" src={vector1261} />
        </div>
        <img className="relative w-9 h-9" alt="" src={component1} />
      </div>
    </div>
  );
};

export default TabFinances;
