import type { NextPage } from "next";

type FormContainer2Type = {
  dataPercentage?: string;
  iconImageUrl?: string;
  button?: boolean;
  button1?: boolean;
};

const FormContainer2: NextPage<FormContainer2Type> = ({
  dataPercentage,
  iconImageUrl,
  button,
  button1,
}) => {
  return (
    <div className="self-stretch bg-structure-general box-border h-16 flex flex-row items-center justify-start p-4 gap-[8px] text-left text-base text-item-main-text font-heading-extralarge border-b-[0.5px] border-solid border-divisionline-onwhite">
      {!button && (
        <div className="rounded-8xs bg-structure-bg h-6 hidden flex-row items-center justify-start p-1 box-border">
          <img className="relative w-4 h-4" alt="" src={dataPercentage} />
        </div>
      )}
      {!button1 && (
        <div className="rounded-8xs bg-structure-bg h-6 hidden flex-row items-center justify-start p-1 box-border gap-[8px]">
          <img
            className="relative w-4 h-4 overflow-hidden shrink-0"
            alt=""
            src={iconImageUrl}
          />
          <b className="relative hidden">Cancel</b>
        </div>
      )}
      <div className="rounded-8xs bg-light-orange h-7 overflow-hidden hidden flex-row items-center justify-center py-1.5 px-2 box-border text-sm text-accent-orange">
        <div className="relative font-medium">Due: ₹399</div>
      </div>
    </div>
  );
};

export default FormContainer2;
