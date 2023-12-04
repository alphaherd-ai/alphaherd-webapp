import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type DisplayPicturePatientType = {
  unsplash7q0l3tswPAo?: string;
  unsplashyUHSvoZQp20?: string;
  unsplashyUHSvoZQp201?: string;
  unsplashsMRUnqh5A?: string;
  unsplashBn5cob0k9gE?: string;
  unsplashLmtUqlYRJO4?: string;
  unsplash3VwALdNbvFQ?: string;
  showUnsplashyUHSvoZQp20Icon?: boolean;
  unsplashyUHSvoZQp20Icon?: boolean;
  unsplashsMRUnqh5AIcon?: boolean;
  unsplashBn5cob0k9gEIcon?: boolean;
  unsplashLmtUqlYRJO4Icon?: boolean;

  /** Style props */
  displayPicturePatientPosition?: CSSProperties["position"];
  displayPicturePatientFlexShrink?: CSSProperties["flexShrink"];
  unsplashyUHSvoZQp20IconTop?: CSSProperties["top"];
};

const DisplayPicturePatient: NextPage<DisplayPicturePatientType> = ({
  unsplash7q0l3tswPAo,
  unsplashyUHSvoZQp20,
  unsplashyUHSvoZQp201,
  unsplashsMRUnqh5A,
  unsplashBn5cob0k9gE,
  unsplashLmtUqlYRJO4,
  unsplash3VwALdNbvFQ,
  showUnsplashyUHSvoZQp20Icon,
  unsplashyUHSvoZQp20Icon,
  unsplashsMRUnqh5AIcon,
  unsplashBn5cob0k9gEIcon,
  unsplashLmtUqlYRJO4Icon,
  displayPicturePatientPosition,
  displayPicturePatientFlexShrink,
  unsplashyUHSvoZQp20IconTop,
}) => {
  const displayPicturePatientStyle: CSSProperties = useMemo(() => {
    return {
      position: displayPicturePatientPosition,
      flexShrink: displayPicturePatientFlexShrink,
    };
  }, [displayPicturePatientPosition, displayPicturePatientFlexShrink]);

  const unsplashyUHSvoZQp20IconStyle: CSSProperties = useMemo(() => {
    return {
      top: unsplashyUHSvoZQp20IconTop,
    };
  }, [unsplashyUHSvoZQp20IconTop]);

  return (
    <div
      className="rounded-[1166.67px] box-border w-7 h-7 overflow-hidden border-[0.5px] border-solid border-item-grey-icon-text-stroke05"
      style={displayPicturePatientStyle}
    >
      <img
        className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
        alt=""
        src={unsplash7q0l3tswPAo}
      />
      {showUnsplashyUHSvoZQp20Icon && (
        <img
          className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover"
          alt=""
          src={unsplashyUHSvoZQp20}
        />
      )}
      {!unsplashyUHSvoZQp20Icon && (
        <img
          className="absolute top-[-4.67px] left-[-1.17px] w-[29.17px] h-[43.17px] object-cover hidden"
          alt=""
          src={unsplashyUHSvoZQp201}
          style={unsplashyUHSvoZQp20IconStyle}
        />
      )}
      {!unsplashsMRUnqh5AIcon && (
        <img
          className="absolute top-[0px] left-[0px] w-[29.17px] h-[43.17px] object-cover hidden"
          alt=""
          src={unsplashsMRUnqh5A}
        />
      )}
      {!unsplashBn5cob0k9gEIcon && (
        <img
          className="absolute top-[-1.17px] left-[0px] w-7 h-[40.83px] object-cover hidden"
          alt=""
          src={unsplashBn5cob0k9gE}
        />
      )}
      {!unsplashLmtUqlYRJO4Icon && (
        <img
          className="absolute top-[-2.33px] left-[0px] w-[29.17px] h-[43.17px] object-cover hidden"
          alt=""
          src={unsplashLmtUqlYRJO4}
        />
      )}
      <img
        className="absolute top-[-7px] left-[0px] w-[29.17px] h-[43.17px] object-cover hidden"
        alt=""
        src={unsplash3VwALdNbvFQ}
      />
    </div>
  );
};

export default DisplayPicturePatient;
