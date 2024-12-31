import React, { useState } from "react";
import check from "../../../../../assets/icons/finance/check.svg";

import Image from "next/image";

interface PopupEmailInputProps {
  isOpen: boolean;
  email: string;
  setEmail: (value: string) => void;
//  onSave: () => void;
  onClose: () => void;
  onSave: (email: string) => void;
  
}

const PopupEmailInput: React.FC<PopupEmailInputProps> = ({
    isOpen,
    email,
    setEmail,
    onSave,
    onClose,
  }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
    const handleChange = (value: string) => {
      setEmail(value); // Update parent state
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors({ email: "This is an invalid email" });
      } else {
        setErrors({ email: "" });
      }
    };
  
    if (!isOpen) return null;
  
    const handleSave = () => {
      if (!errors.email && email) {
        onSave(email); // Pass the email back to parent
      }
    };
  
    const isSaveDisabled = !email || !!errors.email;

  return (
    <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
      <div className="w-[640px] max-h-[450px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex overflow-y-auto">
        <div className="flex-col justify-start items-start gap-2 flex w-full">
          <div className="text-gray-500 text-xl font-medium">Client email is missing</div>
          <div className="w-full flex justify-between">
            <div className="text-neutral-400 text-base font-medium">
              {"We couldn't complete your request because the client's email address is not available. Please add the email to continue!"}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center gap-[6rem] ">
          <div className="w-full flex flex-col gap-3">
            <div className="w-full">
              <div className="flex items-center">
                <div className="text-gray-500 text-base font-medium w-[12rem]">Email</div>
                <input
                  type="email"
                  placeholder="Enter client email"
                  className="ml-[5rem] w-[80%] border border-solid border-borderGrey outline-none h-11 rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                  onChange={(e) => handleChange(e.target.value)}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between mt-[5px]">
          <button
            className="px-5 py-2.5 bg-teal-500 rounded-[5px] justify-start items-center gap-2 flex outline-none border-none cursor-pointer"
            onClick={onClose}
          >
            <div className="text-white text-base font-bold">Cancel</div>
          </button>

          <button
            className={`px-5 py-2.5 rounded-[5px] justify-start items-center gap-2 flex outline-none border-none cursor-pointer ${
              isSaveDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-zinc-900"
            }`}
            onClick={handleSave}
            disabled={isSaveDisabled}
          >
            <Image src={check} alt="check" />
            <div className="text-white text-base font-bold">Save</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupEmailInput;
