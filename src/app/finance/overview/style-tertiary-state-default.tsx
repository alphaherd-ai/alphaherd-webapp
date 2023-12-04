import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type StyleTertiaryStateDefaultType = {
  icons16?: string;
  filter?: string;

  /** Style props */
  icons16Overflow?: CSSProperties["overflow"];
  icons16FlexShrink?: CSSProperties["flexShrink"];
};

const StyleTertiaryStateDefault: NextPage<StyleTertiaryStateDefaultType> = ({
  icons16,
  filter,
  icons16Overflow,
  icons16FlexShrink,
}) => {
  const icons16Style: CSSProperties = useMemo(() => {
    return {
      overflow: icons16Overflow,
      flexShrink: icons16FlexShrink,
    };
  }, [icons16Overflow, icons16FlexShrink]);

  return (
    <div className="rounded-8xs bg-structure-general box-border h-7 flex flex-row items-center justify-start p-2 gap-[8px] text-left text-sm text-item-grey-icon-text-stroke05 font-selected-14 border-[0.5px] border-solid border-item-grey-icon-text-stroke05">
      <img
        className="relative w-4 h-4"
        alt=""
        src={icons16}
        style={icons16Style}
      />
      <div className="flex flex-row items-center justify-start">
        <div className="relative font-medium">{filter}</div>
      </div>
    </div>
  );
};

export default StyleTertiaryStateDefault;
