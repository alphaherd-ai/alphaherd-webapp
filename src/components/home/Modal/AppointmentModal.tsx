import Image from "next/image"
import closeModa from "../../../assets/icons/home/1. Icons-24 (2).png"
import search from "../../../assets/icons/home/search.png"
import Icons from "../../../assets/icons/home/1. Icons-24 (12).png"
import React, { useEffect,useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
interface ServiceOption {
  label: string;
  value: string; // Use a string for the dropdown value
}

const AppointmentModal = () => {
  const [isOpen, setIsOpen] = useState(true); 
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [formData, setFormData] = useState<any>({});
  const [selectedService, setSelectedService] = useState<ServiceOption['value']>(
    'General Consultations' // Initial selected value
  );

  const serviceOptions: ServiceOption[] = [
    { label: 'General Consultations', value: 'general-consultations' },
    { label: 'Grooming Service', value: 'grooming-service' },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(event.target.value);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('09:30');

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="relative">
            <div className="w-[640px] h-[730px] py-[1.5rem] px-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 flex-col justify-start items-start gap-6 backdrop-filter backdrop-blur-[20px]">
              <div className="self-stretch justify-start items-start gap-6 inline-flex">
                <div className="w-[528px] h-6 relative rounded-[5px]" />
                <div
                  className="w-6 h-6 relative rounded-[5px]"
                  onClick={closeModal}
                >
                  <Image src={closeModa} alt=""/>
                </div>
              </div>
              <div className="self-stretch h-[755px] flex-col justify-start items-start gap-4 flex">
                <div className="flex-col justify-start items-start gap-2 flex">
                  <div className="text-gray-500 text-xl font-medium ">
                    Add Appointment
                  </div>
                  <div className="text-neutral-400 text-base font-medium ">
                    Let’s get started
                  </div>
                </div>
                <div className="self-stretch h-[526px] flex-col justify-start items-start gap-6 flex">
                  <div className="self-stretch justify-start items-start gap-6 inline-flex">
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-6 inline-flex">
                      <div className="self-stretch justify-start items-center gap-6 inline-flex">
                        <div className="w-[120px] text-gray-500 text-base font-medium ">
                          Client Name*
                        </div>
                        <div className="grow shrink basis-0 h-11 px-4 bg-white rounded-[5px] border border-teal-400 flex-col justify-center items-start gap-2 inline-flex">
                          <div className="text-gray-500 text-base font-medium ">
                            Ace Ventura
                          </div>
                          {/* <div className="w-4 h-4 relative" /> */}
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-center gap-6 inline-flex">
                        <div className="w-[120px] text-gray-500 text-base font-medium ">
                          Patient Name
                        </div>
                        <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400" />
                      </div>
                      <div className="self-stretch justify-start items-center gap-6 inline-flex">
                        <div className="w-[120px] text-gray-500 text-base font-medium ">
                          Date
                        </div>
                        <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] flex-col justify-center items-start gap-2 inline-flex">
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            className="text-gray-500 text-base font-medium  ml-[10px]" 
                          />
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-center gap-6 inline-flex">
                        <div className="w-[120px] text-gray-500 text-base font-medium ">
                          Time
                        </div>
                        <div className="flex-col justify-start items-center gap-2 inline-flex">
                          <div className="text-gray-500 text-base font-medium ">
                            9:00am
                          </div>
                          <div className="w-[87px] bg-white rounded-[5px] border border-neutral-400" />
                        </div>
                        <div className="text-right text-gray-500 text-base font-medium ">
                          to
                        </div>
                        <div className="flex-col justify-start items-center gap-2 inline-flex">
                          <div className="text-gray-500 text-base font-medium ">
                            9:30am
                          </div>
                          <div className="w-[87px] bg-white rounded-[5px] border border-neutral-400" />
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-center gap-6 inline-flex">
                        <div className="w-[120px] text-gray-500 text-base font-medium ">
                          Service
                        </div>
                        <div className="grow shrink basis-0 h-11 px-4 py-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center flex">
                        <select
                          className="grow shrink basis-0 text-neutral-400 text-base font-medium  w-full"
                          value={selectedService}
                          onChange={handleChange}
                        >
                          {serviceOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch justify-start items-center gap-6 inline-flex">
                    <div className="h-[21px] justify-start items-center gap-6 flex">
                      <div className="grow shrink basis-0 h-[21px] justify-start items-center gap-4 flex">
                        <div className="pr-[59px] justify-start items-center flex">
                          <div className="text-gray-500 text-base font-medium ">
                            Provider
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[432px] h-11 px-4 py-[13px] bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-3.5 flex">
                      <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="h-7 px-2 py-1.5 bg-gray-100 rounded-[5px] justify-center items-center gap-2 inline-flex">
                          <div className="text-gray-500 text-sm font-medium ">
                            Dr. Anjana Suresh
                          </div>
                        </div>
                      </div>
                      <div className="w-[23.19px] h-[23.19px] relative">
                        <div className="w-[23.19px] h-[23.19px] left-0 top-0 absolute">
                        <Image src={search} alt=""/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-[118px] flex-col justify-start items-start gap-2 flex">
                    <div className="w-[576px] justify-start items-center gap-4 inline-flex">
                      <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                        <div className="text-gray-500 text-base font-medium ">
                          Reason for Visit
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch h-[88px] p-2 bg-white rounded-[5px] border border-neutral-400 flex-col justify-start items-start gap-2 flex">
                      <div className="text-neutral-400 text-base font-medium ">
                        Eg: Difficulty in breathing...
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch justify-start items-center gap-2 inline-flex">
                  <div className="grow shrink basis-0 text-teal-400 text-base font-bold ">
                    {" "}
                  </div>
                  <div className="px-4 py-2.5 bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex">
                    <div className="text-neutral-400 text-base font-bold ">
                      Continue
                    </div>
                    <div className="w-6 h-6 relative">
                      <Image src={Icons} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentModal;
