import Image from 'next/image'
import closeicon from "../../../../../assets/icons/inventory/closeIcon.svg";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calicon from "../../../../../assets/icons/finance/calendar_today.svg";
import check from "../../../../../assets/icons/finance/check.svg"
import React, {useState}  from 'react'
import { Button } from '@nextui-org/react';
import Select from 'react-select';

type PopupProps = {
    onClose: () => void;
}

const ConvertToRecurringPopup: React.FC<PopupProps> = ({ onClose }) => {

    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (date:any) => {
        setStartDate(date);
    };

    const Repeat = [
        {value: "Every Day", label: "Every Day"},
        {value: "Every Week", label: "Every Week"},
        {value: "Every Month", label: "Every Month"},
        {value: "Every Year", label: "Every Year"},
    ]
   

  return (
    <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
        <div className="w-[640px] py-4  px-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
        
            
            <div className="self-end items-start gap-6 flex mt-[0.6rem] cursor-pointer" onClick={onClose}>
                <Image src={closeicon} alt="close"></Image>
            </div>

            <div className='w-full flex flex-col gap-2'>
                <span className='text-textGrey2 text-xl font-medium'>Convert To Recurring Expense</span>

                <span className='text-textGrey1 text-base font-medium'>
                You will be notified every time the recurring expense is added
                </span>
            </div>

            <div className='w-full flex flex-col gap-6'>
                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Title</span></div>
                    <div><input className="w-[440px] h-9 rounded-md text-gray-400 text-base font-medium p-2  outline-none border border-solid border-gray-300 focus:border-teal-500 " type="text" name="name"/></div>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Repeat</span></div>
                    <div className='w-[440px]'>
                    <Select
                            className="text-neutral-400 text-base font-medium w-full"
                            placeholder="Select Category"
                            isClearable={false}
                            isSearchable={true}
                            options={Repeat}
                            isMulti={false}
                            name="repeat"
                        />
                    </div>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Start Date</span></div>
                    <div className='w-[440px] flex justify-between items-center'>
                        <div className='relative'>
                        <DatePicker
                                        className="w-[10rem]"
                                        selected={startDate}
                                        onChange={handleDateChange}
                                        calendarClassName="react-datepicker-custom"
                                        customInput={
                                            <div className='relative'>
                                                <input
                                                    className="w-[10rem] h-9 text-textGrey1 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                                    value={startDate.toLocaleDateString()}
                                                    readOnly
                                                />
                                                <Image
                                                    src={calicon}
                                                    alt="Calendar Icon"
                                                    className="absolute right-0 top-2 cursor-pointer"
                                                    width={50}
                                                    height={20}
                                                />
                                            </div>
                                        }
                                    />
                        </div>
                        <div><span className='text-gray-500 text-base font-medium '>Start Date</span></div>
                        <div className='relative'>
                        <DatePicker
                                        className="w-[10rem]"
                                        selected={startDate}
                                        onChange={handleDateChange}
                                        calendarClassName="react-datepicker-custom"
                                        customInput={
                                            <div className='relative'>
                                                <input
                                                    className="w-[10rem] h-9 text-textGrey1 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                                    value={startDate.toLocaleDateString()}
                                                    readOnly
                                                />
                                                <Image
                                                    src={calicon}
                                                    alt="Calendar Icon"
                                                    className="absolute right-0 top-2 cursor-pointer"
                                                    width={50}
                                                    height={20}
                                                />
                                            </div>
                                        }
                                    />
                        </div>
                    </div>

                </div>
                
            </div>

            <div className='w-full flex justify-end'>
                    <Button className="px-2 py-2.5 bg-navBar rounded-[5px] justify-start items-center gap-2 flex outline-none border-none cursor-pointer">
                        <Image src={check} alt='check' /> 
                        <span className='text-white text-base font-medium pr-2'>Save</span>
                    </Button>
                </div>
            
                
            
            
        </div>

    </div>        
  )
}

export default ConvertToRecurringPopup