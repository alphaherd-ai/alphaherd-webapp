import Image from "next/image";
import React, { useState } from "react";
import add from "../../../assets/icons/home/add.png";
import stetho from "../../../assets/icons/home/1. Icons-24 (7).svg";
import { Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

const Diagnosis = () => {
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<string[]>(["Dyspnea"]);

  const handleSelectDiagnosis = (diagnosis: string): void => {
    if (!selectedDiagnoses.includes(diagnosis)) {
      setSelectedDiagnoses((prevDiagnoses) => [...prevDiagnoses, diagnosis]);
    }
  };

  const content = (
    <PopoverContent>
      <div className="flex flex-col gap-4 bg-white w-[20rem] p-4 shadow-lg rounded-md">
        {["Fever", "Fecal incontinence", "Feeding disorder of infancy", "Febrile seizure"].map((diagnosis) => (
          <div key={diagnosis} onClick={() => handleSelectDiagnosis(diagnosis)} className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-all">
            <span className="text-gray-500 text-base font-medium">{diagnosis}</span>
          </div>
        ))}
      </div>
    </PopoverContent>
  );

  return (
    <>
      <div className="w-[688px] flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2 w-[485.45px] px-6 py-4 bg-white rounded-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6">
                <Image src={stetho} alt="stetho" />
              </div>
              <div className="text-neutral-400 text-base font-medium">Diagnosis</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedDiagnoses.map((diagnosis) => (
                <div key={diagnosis} className="h-7 px-2 py-1.5 bg-red-500 rounded-[5px] flex items-center">
                  <div className="text-white text-sm font-medium">{diagnosis}</div>
                </div>
              ))}
            </div>
          </div>
          <Popover placement="bottom-end" offset={10} showArrow>
            <PopoverTrigger>
              <Button className="w-[184.45px] h-[60px] px-6 py-4 bg-white rounded-[10px] flex items-center justify-center gap-2 hover:cursor-pointer outline-none border-0">
                <Image className="w-8 h-8 mt-[5px]" src={add} alt="add"></Image>
                <div className="text-teal-400 text-sm font-medium">Add Diagnosis</div>
              </Button>
            </PopoverTrigger>
            {content}
          </Popover>
        </div>
        <div className="flex items-center gap-2 h-6">
          <input className="w-4 h-4 bg-cyan-400" type="checkbox" name="chronic" />
          <div className="flex-grow flex items-center gap-4">
            <div className="text-gray-500 text-base font-medium">Mark as chronic</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Diagnosis;
