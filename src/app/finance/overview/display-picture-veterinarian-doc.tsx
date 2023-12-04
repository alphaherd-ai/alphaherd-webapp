import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type DisplayPictureVeterinarianDocType = {
  receptionist?: string;
  drShirshaBiswas?: string;
  drKimSchrier?: string;
  drJudePinto?: string;
  drAshwatiSuresh?: string;

  /** Style props */
  displayPictureVeterinariaPosition?: CSSProperties["position"];
};

const DisplayPictureVeterinarianDoc: NextPage<
  DisplayPictureVeterinarianDocType
> = ({
  receptionist,
  drShirshaBiswas,
  drKimSchrier,
  drJudePinto,
  drAshwatiSuresh,
  displayPictureVeterinariaPosition,
}) => {
  const displayPictureVeterinarianDocStyle: CSSProperties = useMemo(() => {
    return {
      position: displayPictureVeterinariaPosition,
    };
  }, [displayPictureVeterinariaPosition]);

  return (
    <div className="w-6 h-6" style={displayPictureVeterinarianDocStyle}>
      <img
        className="absolute top-[0px] left-[0px] rounded-981xl w-6 h-6 object-cover"
        alt=""
        src={receptionist}
      />
      <img
        className="absolute top-[0px] left-[0px] rounded-981xl w-6 h-6 object-cover"
        alt=""
        src={drShirshaBiswas}
      />
      <img
        className="absolute top-[0px] left-[0px] rounded-981xl w-6 h-6 object-cover"
        alt=""
        src={drKimSchrier}
      />
      <img
        className="absolute top-[0px] left-[0px] rounded-[50%] w-6 h-6 object-cover"
        alt=""
        src={drJudePinto}
      />
      <img
        className="absolute top-[0px] left-[0px] rounded-981xl w-6 h-6 object-cover"
        alt=""
        src={drAshwatiSuresh}
      />
    </div>
  );
};

export default DisplayPictureVeterinarianDoc;

