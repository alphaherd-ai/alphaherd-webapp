import React, { useState } from "react";
import CreateButtonCard from "../CreateButtonCard/CreateButtonCard";
import AppointmentModal from "../Modal/AppointmentModal";
import Image from "next/image";
// import SnackBar from "../SnackBars/SnackBar";
// import DeletePopUp from "../DeletePopUp/DeletePopUp";
// import NotificationPopUp from "../NotificationCard/NotificationPopUp";
import cashStethoscope from "../../../assets/icons/home/cash=Stethoscope, Color=Green.png"
import chevron from "../../../assets/icons/home/chevron_left.png"

const Header = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAppOpen, setIsAppOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsCreateOpen(true);
  };

  const handleMouseLeave = () => {
    setIsCreateOpen(false);
  };

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsAppOpen(!isAppOpen);
  };

  return (
    <div className="flex items-center justify-between mt-[1rem] mx-[4rem] ">
      {/* <SnackBar name="Error in recording transaction Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit optio nesciunt velit assumenda nisi repellat, repudiandae aut iure maiores quaerat. Porro quaerat ducimus, incidunt dolorum ea qui corporis repellat quis." /> */}
      {/* <DeletePopUp /> */}
      {/* <NotificationPopUp></NotificationPopUp> */}
      <div className="flex gap-4 relative">
        <div
          className="flex items-center justify-center rounded-md py-[0.4rem]  bg-[#17181A] w-[8rem] text-white relative z-0 hover:cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center justify-center">
            <span className="text-white text-sm  font-light ">
              Create
            </span>
            <div className="ml-[3px] mt-[2px]">
            <Image src={chevron} alt="" />
            </div>
          </div>
          {isCreateOpen && (
            <div className="absolute top-full left-0 z-10 shadow-lg rounded-md cursor-pointer mt-[2px]">
              <CreateButtonCard />
            </div>
          )}
        </div>
        {/* Add onClick event to toggle modal */}
        <div
          className="flex items-center justify-center rounded-md  bg-[#17181A] w-[10rem] text-white relative z-0 cursor-pointer"
          onClick={toggleModal}
        >
          <div className="ml-[3px] mt-[2px]">
            <Image src={cashStethoscope} alt="" />
          </div>
          <span className="text-white text-sm  font-light">
            Add Appointment
          </span>
        </div>
      </div>
      <div>
        <span className="text-gray-500 text-[28px] font-bold">Schedule</span>
      </div>
      {/* Conditionally render the modal */}
      {isAppOpen && <AppointmentModal />}
    </div>
  );
};

export default Header;
