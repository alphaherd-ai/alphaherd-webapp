import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type DirectionUpEffectPositiveType = {
  icons16?: string;
  prop?: string;

  /** Style props */
  directionUpEffectPositiveFlexShrink?: CSSProperties["flexShrink"];
};

const DirectionUpEffectPositive: NextPage<DirectionUpEffectPositiveType> = ({
  icons16,
  prop,
  directionUpEffectPositiveFlexShrink,
}) => {
  const directionUpEffectPositiveStyle: CSSProperties = useMemo(() => {
    return {
      flexShrink: directionUpEffectPositiveFlexShrink,
    };
  }, [directionUpEffectPositiveFlexShrink]);

  return (
    <div
      className="rounded-8xs bg-light-green h-7 overflow-hidden flex flex-row items-center justify-center py-1.5 px-2 box-border gap-[8px] text-left text-sm text-accent-green font-selected-14"
      style={directionUpEffectPositiveStyle}
    >
      <img
        className="relative w-4 h-4 overflow-hidden shrink-0"
        alt=""
        src={icons16}
      />
      <div className="relative font-medium">{prop}</div>
    </div>
  );
};

export default DirectionUpEffectPositive;
