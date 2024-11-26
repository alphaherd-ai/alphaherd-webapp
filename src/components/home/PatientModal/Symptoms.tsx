import React from "react";
import symptomsIcon from "../../../assets/icons/home/1. Icons-24 (9).png"
import Image from "next/image";

const Symptoms = () => {
  return (
    <div className="w-[688px] bg-white px-5 py-4 rounded-xl flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div className="w-4">
          <Image src={symptomsIcon} alt="img" />
        </div>
        <div>
          <span className="text-neutral-400 text-base font-medium">Symptoms</span>
        </div>
      </div>
      <div>
        <span className="text-neutral-500 text-base font-medium">Wheezing, anxiety, blueish discoloration of lips</span>
      </div>

    </div>
  );
};

export default Symptoms;
