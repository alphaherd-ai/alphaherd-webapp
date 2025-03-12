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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// import logo from "../../../../assets/icons/finance/pfpimg.png";
import { useAppSelector } from '@/lib/hooks';
import formatDateAndTime from '@/utils/formateDateTime';

const DownloadPopup = ({ onClose, timeline }: any) => {



  const appState = useAppSelector((state) => state.app)
  const [data, setData] = useState(timeline);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Custom');
  

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  const handleFilter = (start: any, end: any) => {
    const filteredData = timeline.filter((item: any) => {
      const date = new Date(item?.sale?.date || item?.purchases?.date || item?.expenses?.date);
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

  const convertImageToBase64 = (imageSrc: string, callback: (base64: string | null) => void) => {
    if (!imageSrc) {
      console.error("Image source is empty");
      callback(null);
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status !== 200) {
        console.error("Failed to fetch image:", xhr.statusText);
        callback(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result as string);
      };
      reader.onerror = function (error) {
        console.error("Error reading image as base64:", error);
        callback(null);
      };
      reader.readAsDataURL(xhr.response);
    };

    xhr.onerror = function () {
      console.error("Error loading image from URL");
      callback(null);
    };

    xhr.open("GET", imageSrc);
    xhr.responseType = "blob";
    xhr.send();
  };






  const defaultBase64Image =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP88x8AAusB97vdMxkAAAAASUVORK5CYII=";

  const downloadPDF = () => {
    const logo = appState?.currentOrg?.orgImgUrl || defaultBase64Image;

    convertImageToBase64(logo, (base64Image) => {
      const doc = new jsPDF("landscape");

      // Table Headers
      const tableColumn = ["Date", "Type", "Party", "Ref. No.", "Total Cost",  "Due Date", "Status"];
      const tableRows: any[] = [];

      let totalAmount = 0;
      let totalQuantity = 0;
      const typeCounts: Record<string, number> = {};
      
      // Processing Data
      data.forEach((item: any) => {
        
        ["sale", "purchases", "expenses"].forEach((key) => {
          const finance = item?.[key]; // Get sale, purchase, or expense
          if (finance && finance?.status!=='Cancelled') {
            typeCounts[finance.type] = (typeCounts[finance.type] || 0) + 1;
            totalAmount += finance.totalCost || 0;
            totalQuantity += finance.totalQty || 0;
      
            tableRows.push([
              format(new Date(finance.date), "dd-MM-yyyy"),
              finance.type,
              finance.customer || finance.vendor || "N/A",
              finance.invoiceNo || finance.referenceNo || "N/A",
              finance.totalCost || 0,
              //finance.totalQty || 0,
              finance.dueDate ? formatDateAndTime(finance.dueDate).formattedDate : "N/A",
              finance.status || "N/A",
            ]);
          }
        });
      });
      

      // Add Logo
      if (base64Image) {
        doc.addImage(base64Image, "PNG", 4, 4, 20, 20);
      }

      // Organization Header
      doc.setFontSize(20).text(appState.currentOrg.orgName, 30, 10);
      doc.setFontSize(12);
      const orgAddress = `${appState.currentOrg.address} ${appState.currentOrg.state}-${appState.currentOrg.pincode}`;
      doc.text(doc.splitTextToSize(orgAddress, 85), 30, 15);

      // Contact Details
      const details = [
        { label: "GST No.", value: appState.currentOrg.gstNo, x: 126, y: 12 },
        { label: "PAN No.", value: "5465465465465465", x: 126, y: 18 },
        { label: "Email", value: appState.currentOrg.orgEmail, x: 220, y: 12 },
        { label: "Phone No.", value: appState.currentOrg.phoneNo, x: 220, y: 18 },
        { label: "Website", value: "XYZ.com", x: 220, y: 24 },
      ];
      details.forEach(({ label, value, x, y }) => doc.setFontSize(13).text(`${label} : ${value}`, x, y));

      // Line Separator
      doc.setLineWidth(0.2).line(1, 26, 320, 26);

      // Report Title
      doc.setFontSize(15).text("Timeline Report", 8, 34);
      doc.setFontSize(11);
      doc.text(`Category : Finance All Type`, 60, 33);
      doc.text(`Period : ${startDate ? format(startDate, "dd-MM-yyyy") : "start"} - ${endDate ? format(endDate, "dd-MM-yyyy") : "end"}`, 60, 37);

      // Type Counts
      let yPosition = 33;
      Object.entries(typeCounts).forEach(([type, count]) => {
        doc.text(`${type}: ${count}`, 140, yPosition);
        yPosition += 5;
      });

      // Totals
      doc.text(`Total Amount: ${totalAmount}`, 200, 33);
      //doc.text(`Total Quantity: ${totalQuantity}`, 200, 38);

      // Line Separator
      doc.setLineWidth(0.5).line(1, 53, 320, 53);

      // Generate Table
      autoTable(doc, { startY: 55, head: [tableColumn], body: tableRows });

      // Save PDF
      const fileName = `timeline_report_${startDate ? format(startDate, "dd-MM-yyyy") : "start"}_to_${endDate ? format(endDate, "dd-MM-yyyy") : "end"}.pdf`;
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
            <div className="text-gray-500 text-xl font-medium">Download Report</div>
            <div className="text-neutral-400 text-base font-medium">Please specify the date range for the report</div>
          </div>
          <div className="flex flex-col items-start gap-6 mt-6">
            <div className="flex items-center gap-2">
              {/* <div className={` h-7 p-2 rounded-[5px] border border-white justify-start items-center gap-2 flex cursor-pointer ${selectedOption === 'Custom' ? 'bg-textGreen' : 'bg-white'}`}
                onClick={() => handleOptionClick('Custom')}>
                <div className={`h-[19px] justify-start items-center flex ${selectedOption === 'Custom' ? 'text-white font-bold' : 'text-textGrey2 font-medium'}`}>
                  Custom
                </div>
              </div> */}
              {/* <div className={` h-7 p-2 rounded-[5px] border border-white justify-start items-center gap-2 flex cursor-pointer ${selectedOption === 'Today' ? 'bg-textGreen' : 'bg-white'}`}
                onClick={() => handleOptionClick('Today')}>
                <div className={`h-[19px] justify-start items-center flex ${selectedOption === 'Today' ? 'text-white font-bold' : 'text-textGrey2 font-medium'}`}>
                  Today
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
              </div> */}
            </div>
            {selectedOption === 'Custom' && (
              <>
                <div className='flex items-center justify-between  w-[576px]'>
                  <div className="text-gray-500 text-base font-medium w-[200px]">Select Date Range</div>
                  <div className="w-full h-11 px-4 py-2 bg-white rounded-[5px] border border-neutral-400 flex items-center gap-2">
                    <div className="customDatePickerWidth flex">
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        showMonthDropdown
                        selected={startDate}
                        onChange={onDateChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsStart
                        selectsRange
                        placeholderText="Start Date - End Date"
                        className="text-gray-500 text-base font-medium border-0 outline-none"
                      />
                      <Image src={calenderIcon} alt="calendar" />
                    </div>
                  </div>
                </div>
              </>
            )}
            {selectedOption === 'Today' && (
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
          {startDate && endDate ? (<Button className="cursor-pointer outline-none border-0 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex" onClick={downloadPDF}>
            <div className="w-6 h-6">
              <Image src={download} alt="download" />
            </div>
            <div className="text-white text-base font-medium">Download as PDF</div>
          </Button>) : (<Button className="cursor-not-allowed outline-none border-0 px-4 py-2.5 bg-[#EDEDED] rounded-[5px] justify-start items-center gap-2 flex" disabled>
            <div className="w-6 h-6">
              <Image src={download} alt="download" />
            </div>
            <div className="text-textGrey2 text-base font-medium">Download as PDF</div>
          </Button>)}
          {startDate && endDate ? (<CSVLink
            data={data}
            filename={`sales_report_${startDate ? format(startDate, 'dd-MM-yyyy') : 'start'}_to_${endDate ? format(endDate, 'dd-MM-yyyy') : 'end'}.csv`}
            className="no-underline flex items-center mr-4"
            headers={[
              { label: 'Date', key: 'sal  e.date' },
              { label: 'Type', key: 'sale.type' },
              { label: 'Customer', key: 'sale.customer' },
              { label: 'Ref. No.', key: 'sale.invoiceNo' },
              { label: 'Total Cost', key: 'sale.totalCost' },
              { label: 'Due Date', key: 'sale.dueDate' },
              { label: 'Status', key: 'sale.status' },
            ]}
          >
            <Button className="cursor-pointer outline-none border-0 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
              <div className="w-6 h-6">
                <Image src={download} alt="download" />
              </div>
              <div className="text-white text-base font-medium">Download as CSV</div>
            </Button>
          </CSVLink>) : (<Button className="cursor-not-allowed outline-none border-0 px-4 py-2.5 bg-[#EDEDED] rounded-[5px] justify-start items-center gap-2 flex" disabled>
            <div className="w-6 h-6">
              <Image src={download} alt="download" />
            </div>
            <div className="text-textGrey2 text-base font-medium">Download as CSV</div>
          </Button>)}
        </div>
      </div>
    </div>
  );
};

export default DownloadPopup;
