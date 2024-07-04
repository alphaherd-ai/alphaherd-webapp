import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import closeicon from "../../../../assets/icons/inventory/closeIcon.svg";
import Image from 'next/image';
import calenderIcon from "../../../../assets/icons/finance/calendar_today.svg";
import download from "../../../../assets/icons/finance/downloadGreen.svg";
import { Button } from '@nextui-org/react';

const DownloadPopup = ({ onClose, transactions }:any) => {
  const [data, setData] = useState(transactions);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Custom');

  const handleOptionClick = (option:any) => {
    setSelectedOption(option);
  };

  const handleFilter = (start:any, end:any) => {
    const filteredData = transactions.filter((item:any) => {
      const date = new Date(item.date);
      return date >= start && date <= end;
    });
    setData(filteredData);
  };

  const onDateChange = (dates: [any, any]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      handleFilter(start, end);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
      <div className="w-[640px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400/opacity-60 backdrop-blur-[60px] flex flex-col justify-start items-start gap-6 overflow-auto">
        <div className="self-end items-start gap-6 flex mt-[0.6rem] cursor-pointer" onClick={onClose}>
          <Image src={closeicon} alt="close" />
        </div>
        <div className="flex-col justify-start items-start gap-2 flex">
          <div className="text-gray-500 text-xl font-medium">Download Sales Report</div>
          <div className="text-neutral-400 text-base font-medium">Please specify the date range for the report</div>
        </div>
    <div className="flex flex-col items-start gap-6">
        
            <div className="flex items-center gap-2">
                <div className={` h-7 p-2 rounded-[5px] border border-white justify-start items-center gap-2 flex cursor-pointer ${selectedOption === 'Custom' ? 'bg-teal-400' : 'bg-white'}`}
                    onClick={() => handleOptionClick('Custom')}>
                    <div className={`h-[19px] justify-start items-center flex ${selectedOption === 'Custom' ? 'text-white font-bold' : 'text-neutral-400 font-medium'}`}>Custom</div>
                </div>
                <div className={` h-7 p-2 rounded-[5px] border border-white justify-start items-center gap-2 flex cursor-pointer ${selectedOption === 'Day' ? 'bg-teal-400' : 'bg-white'}`}
                    onClick={() => handleOptionClick('Day')}>
                    <div className={`h-[19px] justify-start items-center flex ${selectedOption === 'Day' ? 'text-white font-bold' : 'text-neutral-400 font-medium'}`}>
                    Day
                    </div>
                </div>
            {/* Repeat similar setup for other options */}
            </div>
        
        {/* Render different content based on selectedOption */}
        {selectedOption === 'Custom' && (
            <>
            <div className='flex items-center justify-between  w-[576px]'>
                    <div className="text-gray-500 text-base font-medium w-[200px]">Select Date Range</div>
                    <div className="w-full h-11 px-4 py-2 bg-white rounded-[5px] border border-neutral-400 flex items-center gap-2">
                        <div className="customDatePickerWidth flex" style={{ position: 'relative', zIndex: '9999' }}>
                        <DatePicker
                            selected={startDate}
                            onChange={onDateChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsStart
                            selectsRange
                            placeholderText="Start Date"
                            className="text-gray-500 text-base font-medium border-0 outline-none"
                            
                        />
                        <Image src={calenderIcon} alt="calendar" />
                    </div>
                    </div>
            </div>
            </>
        )}
        {selectedOption === 'Day' && (
            <div className="day-content">
            {/* Content specific to 'Day' option */}
            </div>
        )}
        {/* Add similar blocks for other options like Week, Month, etc. */}
    </div>
        <div className='flex gap-4 justify-end w-full'>
            
        <Button className="cursor-pointer outline-none border-0 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
              
            <div className="w-6 h-6">
                <Image src={download} alt="download" />
              </div>            
            <div className="text-white text-base font-bold">Download as PDF</div>
        </Button>
        <CSVLink
            data={data}
            filename={`sales_report_${startDate ? format(startDate, 'yyyy-MM-dd') : 'start'}_to_${endDate ? format(endDate, 'yyyy-MM-dd') : 'end'}.csv`}
            className="no-underline flex items-center mr-4"
        >
        <Button className="cursor-pointer outline-none border-0 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
        
            <div className="w-6 h-6">
            <Image src={download} alt="download" />
            </div>
        
        
            <div className="text-white text-base font-bold">Download as CSV</div>
        </Button>
        </CSVLink>
        </div>
      </div>
    </div>
  );
};

export default DownloadPopup;
