import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import closeicon from "../../../assets/icons/inventory/closeIcon.svg";
import Image from 'next/image';
import calenderIcon from "../../../assets/icons/finance/calendar_today.svg";
import download from "../../../assets/icons/finance/downloadGreen.svg";
import { Button } from '@nextui-org/react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from "../../../assets/icons/finance/pfpimg.png";
import { useAppSelector } from '@/lib/hooks';

const DownloadPopup = ({ onClose, patients, clients }:any) => {

  const appState = useAppSelector((state) => state.app)
  const [data, setData] = useState(patients);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Custom');


  const handleOptionClick = (option:any) => {
    setSelectedOption(option);
  };

  const handleFilter = (start:any, end:any) => {
    const filteredData = patients.filter((item:any) => {
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

  const convertImageToBase64 = (imageSrc:any, callback:any) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', imageSrc);
    xhr.responseType = 'blob';
    xhr.send();
  };

  const downloadPDF = () => {
    convertImageToBase64(logo.src, (base64Image: any) => {
      const doc = new jsPDF('landscape');
      const tableColumn = ["Patients", "Client", "Species and Breed", "Age", "Sex"];
      const tableRows: any = [];

      data.forEach((item: any) => {
        const clientNames = clients[item.clientId];
        const patientsData = [
          item.patientName,
          clientNames,
          item.species + "&" + item.breed,
          item.age,
          item.gender,
        ];
        tableRows.push(patientsData);
      });

      const startX = 4;
      const startY = 4;
      const logoWidth = 20;
      const logoHeight = 20;
      const orgInfoX = startX + logoWidth + 6;
      let orgInfoY = startY + 6;

      doc.addImage(base64Image, 'PNG', startX, startY, logoWidth, logoHeight);
      doc.setFontSize(20);
      doc.text(appState.currentOrg.orgName, orgInfoX, orgInfoY);

      orgInfoY += 7;
      doc.setFontSize(12);
      const addressText = `${appState.currentOrg.address} ${appState.currentOrg.state}-${appState.currentOrg.pincode}`;
      const maxWidth = 85;
      const addressLines = doc.splitTextToSize(addressText, maxWidth);
      doc.text(addressLines, orgInfoX, orgInfoY);

      orgInfoY += addressLines.length * 5
      doc.setFontSize(13);  
      doc.text(`Gst No. :  ${appState.currentOrg.gstNo}`, 126, startY + 12);
      doc.text(`PAN No. :  5465465465465465`, 126, startY + 18);

      doc.text(`Email :  ${appState.currentOrg.orgEmail}`, 220, startY + 12);
      doc.text(`Phone No. :  ${appState.currentOrg.phoneNo}`, 220, startY + 18);
      doc.text(`Website :  XYZ.com`, 220, startY + 24);

      const lineY = orgInfoY + 4;
      doc.setLineWidth(0.2);
      doc.line(1, lineY, 320, lineY);

      doc.setFontSize(15);
      doc.text("Database Report", startX, lineY + 8);

      doc.setFontSize(11);
      doc.text(`Category : patients`, 60, lineY + 8);
      doc.text(`Period : ${startDate ? format(startDate, 'yyyy-MM-dd') : 'start'} - ${endDate ? format(endDate, 'yyyy-MM-dd') : 'end'}`, 60, lineY + 13);

      doc.text(`Total patients : ${data.length}`, 120, lineY + 8);

      doc.setLineWidth(0.5);
      doc.line(1, lineY + 18, 320, lineY + 18);

      autoTable(doc, {
        startY: lineY + 20,
        head: [tableColumn],
        body: tableRows,
      });

      const fileName = `patients_report_${startDate ? format(startDate, 'yyyy-MM-dd') : 'start'}_to_${endDate ? format(endDate, 'yyyy-MM-dd') : 'end'}.pdf`;
      doc.save(fileName);
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
      <div className="w-[640px] h-[550px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400/opacity-60 backdrop-blur-[60px] flex flex-col justify-between items-start overflow-auto">
      <div className='w-full flex flex-col gap-6'>
        <div className="self-end items-start gap-6 flex mt-[0.6rem] cursor-pointer" onClick={onClose}>
          <Image src={closeicon} alt="close" />
        </div>
        <div className="flex-col justify-start items-start gap-2 flex">
          <div className="text-gray-500 text-xl font-medium">Download Sales Report</div>
          <div className="text-neutral-400 text-base font-medium">Please specify the date range for the report</div>
        </div>
    <div className="flex flex-col items-start gap-6 mt-6">
        
            <div className="flex items-center gap-2">
                <div className={` h-7 p-2 rounded-[5px] border border-white justify-start items-center gap-2 flex cursor-pointer ${selectedOption === 'Custom' ? 'bg-textGreen' : 'bg-white'}`}
                    onClick={() => handleOptionClick('Custom')}>
                    <div className={`h-[19px] justify-start items-center flex ${selectedOption === 'Custom' ? 'text-white font-bold' : 'text-textGrey2 font-medium'}`}>
                        Custom
                    </div>
                </div>
                <div className={` h-7 p-2 rounded-[5px] border border-white justify-start items-center gap-2 flex cursor-pointer ${selectedOption === 'Day' ? 'bg-textGreen' : 'bg-white'}`}
                    onClick={() => handleOptionClick('Day')}>
                    <div className={`h-[19px] justify-start items-center flex ${selectedOption === 'Day' ? 'text-white font-bold' : 'text-textGrey2 font-medium'}`}>
                    Day
                    </div>
                </div>
                <div className={` h-7 p-2 rounded-[5px] border border-white justify-start items-center gap-2 flex cursor-pointer ${selectedOption === 'Week' ? 'bg-textGreen' : 'bg-white'}`}
                    onClick={() => handleOptionClick('Week')}>
                    <div className={`h-[19px] justify-start items-center flex ${selectedOption === 'Week' ? 'text-white font-bold' : 'text-textGrey2 font-medium'}`}>
                    Week
                    </div>
                </div>
                <div className={` h-7 p-2 rounded-[5px] border border-white justify-start items-center gap-2 flex cursor-pointer ${selectedOption === 'Month' ? 'bg-textGreen' : 'bg-white'}`}
                    onClick={() => handleOptionClick('Month')}>
                    <div className={`h-[19px] justify-start items-center flex ${selectedOption === 'Month' ? 'text-white font-bold' : 'text-textGrey2 font-medium'}`}>
                    Month
                    </div>
                </div>
                <div className={` h-7 p-2 rounded-[5px] border border-white justify-start items-center gap-2 flex cursor-pointer ${selectedOption === 'Year' ? 'bg-textGreen' : 'bg-white'}`}
                    onClick={() => handleOptionClick('Year')}>
                    <div className={`h-[19px] justify-start items-center flex ${selectedOption === 'Year' ? 'text-white font-bold' : 'text-textGrey2 font-medium'}`}>
                    Year
                    </div>
                </div>
            </div>
        
        
        {selectedOption === 'Custom' && (
            <>
            <div className='flex items-center justify-between  w-[576px]'>
                    <div className="text-gray-500 text-base font-medium w-[200px]">Select Date Range</div>
                    <div className="w-full h-11 px-4 py-2 bg-white rounded-[5px] border border-neutral-400 flex items-center gap-2">
                        <div className="customDatePickerWidth flex">
                        <DatePicker
                            showYearDropdown
                            showMonthDropdown
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
            
            </div>
        )}
        {selectedOption === 'Week' && (
            <div className="Week-content">
            
            </div>
        )}
        {selectedOption === 'Month' && (
            <div className="Month-content">
            
            </div>
        )}
        {selectedOption === 'Year' && (
            <div className="Year-content">
            
            </div>
        )}
    </div>
    </div>
        <div className='flex gap-4 justify-end w-full'>
            
        <Button className="cursor-pointer outline-none border-0 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex" onClick={downloadPDF}>
              
            <div className="w-6 h-6">
                <Image src={download} alt="download" />
              </div>            
            <div className="text-white text-base font-medium">Download as PDF</div>
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
        
        
            <div className="text-white text-base font-medium">Download as CSV</div>
        </Button>
        </CSVLink>
        </div>
      </div>
    </div>
  );
};

export default DownloadPopup;
