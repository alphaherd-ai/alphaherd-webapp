import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import DirectionUpEffectPositive from "./direction-up-effect-positive";

type CardContainerType = {
  priceText?: string;
  financialData?: string;
  iconImageUrl?: string;
  percentageText?: string;

  /** Style props */
  propZIndex?: CSSProperties["zIndex"];
  propLeft?: CSSProperties["left"];
};

const CardContainer: NextPage<CardContainerType> = ({
  priceText,
  financialData,
  iconImageUrl,
  percentageText,
  propZIndex,
  propLeft,
}) => {
  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      zIndex: propZIndex,
      left: propLeft,
    };
  }, [propZIndex, propLeft]);

  return (
    <div
      className="my-0 mx-[!important] absolute top-[16px] left-[24px] flex flex-col items-start justify-start gap-[16px] z-[3] text-left text-9xl text-item-main-text font-selected-14"
      style={frameDivStyle}
    >
      <div className="flex flex-col items-start justify-start">
        <b className="relative">{priceText}</b>
        <div className="relative text-base font-medium">{financialData}</div>
      </div>
      <DirectionUpEffectPositive
        icons16="/icons16.svg"
        prop="12.4%"
        directionUpEffectPositiveFlexShrink="0"
      />
    </div>
  );
};

export default CardContainer;
