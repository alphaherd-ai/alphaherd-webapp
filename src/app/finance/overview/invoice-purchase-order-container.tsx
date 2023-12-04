import type { NextPage } from "next";

type InvoicePurchaseOrderContainerType = {
  itemDescription?: string;
  productImageUrl?: string;
  productPrice?: string;
  productName?: string;
  itemSubtitle?: string;
  serviceImageUrl?: string;
  consultationName?: string;
  sushiConsultationPrice?: string;
  itemTitle?: string;
  rentalDetails?: string;
};

const InvoicePurchaseOrderContainer: NextPage<
  InvoicePurchaseOrderContainerType
> = ({
  itemDescription,
  productImageUrl,
  productPrice,
  productName,
  itemSubtitle,
  serviceImageUrl,
  consultationName,
  sushiConsultationPrice,
  itemTitle,
  rentalDetails,
}) => {
  return (
    <div className="flex-1 flex flex-col items-start justify-start text-left text-base text-item-grey-icon-text-stroke05 font-selected-14">
      <div className="self-stretch bg-structure-bg box-border h-12 flex flex-row items-center justify-start p-4 text-item-main-text border-b-[0.5px] border-solid border-item-grey-icon-text-stroke05">
        <div className="relative font-medium">{itemDescription}</div>
      </div>
      <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
        <div className="flex-1 relative font-medium">{productImageUrl}</div>
      </div>
      <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
        <div className="flex-1 relative font-medium">{productPrice}</div>
      </div>
      <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
        <div className="flex-1 relative font-medium">{productName}</div>
      </div>
      <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
        <div className="flex-1 relative font-medium">{itemSubtitle}</div>
      </div>
      <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
        <div className="flex-1 relative font-medium">{serviceImageUrl}</div>
      </div>
      <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
        <div className="flex-1 relative font-medium">{consultationName}</div>
      </div>
      <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
        <div className="flex-1 relative font-medium">
          {sushiConsultationPrice}
        </div>
      </div>
      <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
        <div className="flex-1 relative font-medium">{itemTitle}</div>
      </div>
      <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 border-b-[0.5px] border-solid border-divisionline-onwhite">
        <div className="flex-1 relative font-medium">{rentalDetails}</div>
      </div>
    </div>
  );
};

export default InvoicePurchaseOrderContainer;
