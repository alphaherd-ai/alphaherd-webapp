import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type StylePrimaryStateDefaultType = {
  icons24?: string;
  addAppointment?: string;

  /** Style props */
  icons24Overflow?: CSSProperties["overflow"];
  icons24FlexShrink?: CSSProperties["flexShrink"];
};

const StylePrimaryStateDefault: NextPage<StylePrimaryStateDefaultType> = ({
  icons24,
  addAppointment,
  icons24Overflow,
  icons24FlexShrink,
}) => {
  const icons24Style: CSSProperties = useMemo(() => {
    return {
      overflow: icons24Overflow,
      flexShrink: icons24FlexShrink,
    };
  }, [icons24Overflow, icons24FlexShrink]);

  return (
    <div className="rounded-8xs bg-primary-black flex flex-row items-center justify-start py-2.5 px-4 gap-[8px] text-left text-base text-structure-general font-selected-14">
      <img
        className="relative w-6 h-6 overflow-hidden shrink-0"
        alt=""
        src={icons24}
        style={icons24Style}
      />
      <b className="relative">{addAppointment}</b>
    </div>
  );
};

export default StylePrimaryStateDefault;
