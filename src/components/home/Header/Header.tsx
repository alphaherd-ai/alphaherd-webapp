import React, { useState } from "react";
import CreateButtonCard from "../CreateButtonCard/CreateButtonCard";
import AppointmentModal from "../Modal/AppointmentModal";
import Image from "next/image";
// import SnackBar from "../SnackBars/SnackBar";
// import DeletePopUp from "../DeletePopUp/DeletePopUp";
// import NotificationPopUp from "../NotificationCard/NotificationPopUp";
import cashStethoscope from "../../../assets/icons/home/cash=Stethoscope, Color=Green.png"
import chevron from "../../../assets/icons/home/chevron_left.png"
import { Popover, PopoverTrigger, PopoverContent, Input, Button } from "@nextui-org/react";

const Header = () => {
  const [isAppOpen, setIsAppOpen] = useState(false);



  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsAppOpen(!isAppOpen);
  };

  return (
    <div className="flex items-center justify-between mt-[1rem]  ">
      {/* <SnackBar name="Error in recording transaction Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit optio nesciunt velit assumenda nisi repellat, repudiandae aut iure maiores quaerat. Porro quaerat ducimus, incidunt dolorum ea qui corporis repellat quis." /> */}
      {/* <DeletePopUp /> */}
      {/* <NotificationPopUp></NotificationPopUp> */}
      <div className="flex gap-4 relative">
        <div
          className="flex items-center justify-center z-0 "
        >

          <Popover placement="bottom-start" showArrow offset={10}>
          
          <PopoverTrigger>
            <Button variant="solid" 
            className="capitalize border-none py-[0.4rem]  bg-[#17181A]  rounded-lg flex items-center justify-center hover:cursor-pointer">
            <span className="text-white text-sm ">
              Create
            </span>
            <div className=" mt-[2px]">
            <Image src={chevron} alt="" />
            </div>
          </Button>
          </PopoverTrigger>
          <PopoverContent>
            <CreateButtonCard />
          </PopoverContent>
          </Popover>
          </div>
          {/* <div className="flex items-center justify-center">
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
          )} */}
        {/* Add onClick event to toggle modal */}
        <div
          className="flex items-center justify-center rounded-md  bg-[#17181A]  text-white relative z-0 cursor-pointer gap-2 px-4"
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
      <div className="mr-[1rem]">
        <span className="text-gray-500 text-[28px] font-bold">Schedule</span>
      </div>
      {/* Conditionally render the modal */}
      {isAppOpen && <AppointmentModal />}
    </div>
  );
};

export default Header;
