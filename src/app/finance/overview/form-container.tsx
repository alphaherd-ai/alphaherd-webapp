import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import TypeType6 from "./type-type6";

type FormContainerType = {
  priceIncrease?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propColor?: CSSProperties["color"];
};

const FormContainer: NextPage<FormContainerType> = ({
  priceIncrease,
  propBackgroundColor,
  propColor,
}) => {
  const typeType6Style: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  const otherNeutralStyle: CSSProperties = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  return (
    <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
      <div className="flex flex-row items-center justify-start">
        <TypeType6
          otherNeutral="+₹1,399"
          typeType6BackgroundColor="#e7f5ee"
          otherNeutralColor="#0f9d58"
        />
      </div>
    </div>
  );
};

export default FormContainer;
