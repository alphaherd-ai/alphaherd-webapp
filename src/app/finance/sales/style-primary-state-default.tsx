import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type StylePrimaryStateDefaultType = {
  icons24?: string;
  addAppointment?: string;
  showIcons24?: boolean;

  /** Style props */
  stylePrimaryStateDefaultBorder?: CSSProperties["border"];
  stylePrimaryStateDefaultBorderRadius?: CSSProperties["borderRadius"];
  stylePrimaryStateDefaultBackgroundColor?: CSSProperties["backgroundColor"];
  icons24Overflow?: CSSProperties["overflow"];
  icons24FlexShrink?: CSSProperties["flexShrink"];
  addAppointmentColor?: CSSProperties["color"];
  addAppointmentFontWeight?: CSSProperties["fontWeight"];
};

const StylePrimaryStateDefault: NextPage<StylePrimaryStateDefaultType> = ({
  icons24,
  addAppointment,
  showIcons24,
  stylePrimaryStateDefaultBorder,
  stylePrimaryStateDefaultBorderRadius,
  stylePrimaryStateDefaultBackgroundColor,
  icons24Overflow,
  icons24FlexShrink,
  addAppointmentColor,
  addAppointmentFontWeight,
}) => {
  const stylePrimaryStateDefaultStyle: CSSProperties = useMemo(() => {
    return {
      border: stylePrimaryStateDefaultBorder,
      borderRadius: stylePrimaryStateDefaultBorderRadius,
      backgroundColor: stylePrimaryStateDefaultBackgroundColor,
    };
  }, [
    stylePrimaryStateDefaultBorder,
    stylePrimaryStateDefaultBorderRadius,
    stylePrimaryStateDefaultBackgroundColor,
  ]);

  const icons24Style: CSSProperties = useMemo(() => {
    return {
      overflow: icons24Overflow,
      flexShrink: icons24FlexShrink,
    };
  }, [icons24Overflow, icons24FlexShrink]);

  const addAppointmentStyle: CSSProperties = useMemo(() => {
    return {
      color: addAppointmentColor,
      fontWeight: addAppointmentFontWeight,
    };
  }, [addAppointmentColor, addAppointmentFontWeight]);

  return (
    <div
      className="rounded-8xs bg-primary-black flex flex-row items-center justify-start py-2.5 px-4 gap-[8px] text-left text-base text-structure-general font-heading-extralarge"
      style={stylePrimaryStateDefaultStyle}
    >
      {showIcons24 && (
        <img
          className="relative w-6 h-6 overflow-hidden shrink-0"
          alt=""
          src={icons24}
          style={icons24Style}
        />
      )}
      <b className="relative" style={addAppointmentStyle}>
        {addAppointment}
      </b>
    </div>
  );
};

export default StylePrimaryStateDefault;
