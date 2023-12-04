import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type TypeType6Type = {
  otherNeutral?: string;

  /** Style props */
  typeType6BackgroundColor?: CSSProperties["backgroundColor"];
  otherNeutralColor?: CSSProperties["color"];
};

const TypeType6: NextPage<TypeType6Type> = ({
  otherNeutral,
  typeType6BackgroundColor,
  otherNeutralColor,
}) => {
  const typeType6Style: CSSProperties = useMemo(() => {
    return {
      backgroundColor: typeType6BackgroundColor,
    };
  }, [typeType6BackgroundColor]);

  const otherNeutralStyle: CSSProperties = useMemo(() => {
    return {
      color: otherNeutralColor,
    };
  }, [otherNeutralColor]);

  return (
    <div
      className="rounded-8xs bg-structure-bg h-7 overflow-hidden flex flex-row items-center justify-center py-1.5 px-2 box-border text-left text-sm text-item-main-text font-selected-14"
      style={typeType6Style}
    >
      <div className="relative font-medium" style={otherNeutralStyle}>
        {otherNeutral}
      </div>
    </div>
  );
};

export default TypeType6;
