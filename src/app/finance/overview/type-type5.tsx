import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type TypeType5Type = {
  icons16?: string;
  refundDue?: string;

  /** Style props */
  typeType5BackgroundColor?: CSSProperties["backgroundColor"];
  refundDueColor?: CSSProperties["color"];
};

const TypeType5: NextPage<TypeType5Type> = ({
  icons16,
  refundDue,
  typeType5BackgroundColor,
  refundDueColor,
}) => {
  const typeType5Style: CSSProperties = useMemo(() => {
    return {
      backgroundColor: typeType5BackgroundColor,
    };
  }, [typeType5BackgroundColor]);

  const refundDueStyle: CSSProperties = useMemo(() => {
    return {
      color: refundDueColor,
    };
  }, [refundDueColor]);

  return (
    <div
      className="rounded-8xs bg-light-orange h-7 overflow-hidden flex flex-row items-center justify-center py-1.5 px-2 box-border gap-[8px] text-left text-sm text-accent-orange font-selected-14"
      style={typeType5Style}
    >
      <img
        className="relative w-4 h-4 overflow-hidden shrink-0"
        alt=""
        src={icons16}
      />
      <div className="relative font-medium" style={refundDueStyle}>
        {refundDue}
      </div>
    </div>
  );
};

export default TypeType5;
