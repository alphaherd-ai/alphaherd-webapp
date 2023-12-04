import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import DisplayPicturePatient from "./display-picture-patient";

type ClientVendorHeaderContainerType = {
  imageId?: string;
  imageIdText?: string;
  imageIdUrl?: string;
  imageIdUnsplash?: string;
  imageIdUnsplashText?: string;
  imageIdUnsplashUrl?: string;
  imageIdUnsplashTextUrl?: string;
  personImageUrl?: string;
  showUnsplashyUHSvoZQp20Icon?: boolean;
  unsplashyUHSvoZQp20Icon?: boolean;
  showUnsplashsMRUnqh5AIcon?: boolean;
  unsplashBn5cob0k9gEIcon?: boolean;
  unsplashLmtUqlYRJO4Icon?: boolean;

  /** Style props */
  propTop?: CSSProperties["top"];
  propFlex?: CSSProperties["flex"];
};

const ClientVendorHeaderContainer: NextPage<
  ClientVendorHeaderContainerType
> = ({
  imageId,
  imageIdText,
  imageIdUrl,
  imageIdUnsplash,
  imageIdUnsplashText,
  imageIdUnsplashUrl,
  imageIdUnsplashTextUrl,
  personImageUrl,
  showUnsplashyUHSvoZQp20Icon,
  unsplashyUHSvoZQp20Icon,
  showUnsplashsMRUnqh5AIcon,
  unsplashBn5cob0k9gEIcon,
  unsplashLmtUqlYRJO4Icon,
  propTop,
  propFlex,
}) => {
  const unsplashyUHSvoZQp20IconStyle: CSSProperties = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  const avinashPintoStyle: CSSProperties = useMemo(() => {
    return {
      flex: propFlex,
    };
  }, [propFlex]);

  return (
    <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start py-4 px-6 gap-[16px] text-left text-base text-item-grey-icon-text-stroke05 font-selected-14 border-b-[0.5px] border-solid border-divisionline-onwhite">
      <DisplayPicturePatient
        unsplash7q0l3tswPAo="/unsplash7q0l3tswpao@2x.png"
        unsplashyUHSvoZQp20="/unsplashyuhsvozqp20@2x.png"
        unsplashyUHSvoZQp201="/unsplashyuhsvozqp201@2x.png"
        unsplashsMRUnqh5A="/unsplashsmr--unqh5a@2x.png"
        unsplashBn5cob0k9gE="/unsplashbn5cob0k9ge@2x.png"
        unsplashLmtUqlYRJO4="/unsplashlmtuqlyrjo4@2x.png"
        unsplash3VwALdNbvFQ="/unsplash3vwaldnbvfq@2x.png"
        showUnsplashyUHSvoZQp20Icon
        unsplashyUHSvoZQp20Icon={false}
        unsplashsMRUnqh5AIcon
        unsplashBn5cob0k9gEIcon={false}
        unsplashLmtUqlYRJO4Icon={false}
        displayPicturePatientPosition="relative"
        displayPicturePatientFlexShrink="0"
        unsplashyUHSvoZQp20IconTop="-4.67px"
      />
      <div className="flex-1 relative font-medium" style={avinashPintoStyle}>
        {personImageUrl}
      </div>
    </div>
  );
};

export default ClientVendorHeaderContainer;
