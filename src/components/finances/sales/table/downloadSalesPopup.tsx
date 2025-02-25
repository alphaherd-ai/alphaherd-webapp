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

import { useAppSelector } from '@/lib/hooks';
import formatDateAndTime from '@/utils/formateDateTime';

const DownloadPopup = ({ onClose, sales, type }: any) => {

  const appState = useAppSelector((state) => state.app)
  const [data, setData] = useState(sales);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Custom');



  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  const handleFilter = (start: any, end: any) => {
    const filteredData = sales.filter((item: any) => {
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

  const defaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/YPsxEAAAAAASUVORK5CYII=";


  const downloadPDF = () => {
    const logo = appState?.currentOrg?.orgImgUrl;

    convertImageToBase64(logo, (base64Image: string | null) => {
      if (!base64Image) {
        console.warn("Using default image due to image loading failure.");
        base64Image = defaultImage;
      }

      try {
        const doc = new jsPDF("landscape");

        // Table Headers
        const tableColumn = ["Date", "Type", "Client", "Serial No.", "Total Cost", "Total Qty", "Due Date", "Status"];
        const tableRows: any[] = [];

        const typeCounts: Record<string, number> = {};

        let totalAmount = 0;
        let totalQuantity = 0;

        data.forEach((item: any) => {
          if (item.status !== 'Cancelled') {
            typeCounts[item.type] = (typeCounts[item.type] || 0) + 1;
            totalAmount += item.totalCost || 0;
            totalQuantity += item.totalQty || 0;
          }
        });

        data.forEach((item: any) => {
          if (item?.status !== 'Cancelled') {
            const salesData = [
              format(new Date(item.date), "dd-MM-yyyy"),
              item.type,
              item.customer,
              item.invoiceNo,
              item.totalCost,
              item.totalQty,
              formatDateAndTime(item?.dueDate).formattedDate,
              item.status,
            ];
            tableRows.push(salesData);
          }
        });

        // Adding Organization Logo
        if (base64Image) {
          doc.addImage(base64Image, "PNG", 4, 4, 20, 20);
        }

        // Organization Details
        doc.setFontSize(20);
        doc.text(appState.currentOrg.orgName, 30, 10);

        doc.setFontSize(12);
        const text = `${appState.currentOrg.address} ${appState.currentOrg.state}-${appState.currentOrg.pincode}`;
        const maxWidth = 85;
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, 30, 15);

        // GST, PAN, Contact Details
        doc.setFontSize(13);
        doc.text(`Gst No. :  ${appState.currentOrg.gstNo}`, 126, 12);
        doc.text(`PAN No. :  5465465465465465`, 126, 18);
        doc.text(`Email :  ${appState.currentOrg.orgEmail}`, 220, 12);
        doc.text(`Phone No. :  ${appState.currentOrg.phoneNo}`, 220, 18);
        doc.text(`Website :  XYZ.com`, 220, 24);

        // Draw Separator Line
        doc.setLineWidth(0.2);
        doc.line(1, 26, 320, 26);

        // Report Title
        doc.setFontSize(15);
        doc.text("Sales Report", 8, 34);

        // Filters & Summary
        doc.setFontSize(11);
        doc.text(`Category : ${type}`, 60, 33);
        doc.text(
          `Period : ${startDate ? format(startDate, "dd-MM-yyyy") : "start"} - ${endDate ? format(endDate, "dd-MM-yyyy") : "end"
          }`,
          60,
          37
        );

        // Type Counts
        let yPosition = 33;
        Object.entries(typeCounts).forEach(([type, count]) => {
          doc.text(`${type}: ${count}`, 140, yPosition);
          yPosition += 5;
        });

        // Total Summary
        doc.text(`Total Amount: ${totalAmount}`, 200, 33);
        doc.text(`Total Quantity: ${totalQuantity}`, 200, 38);

        // Draw another separator line
        doc.setLineWidth(0.5);
        doc.line(1, 53, 320, 53);

        // Generate Table
        autoTable(doc, {
          startY: 55,
          head: [tableColumn],
          body: tableRows,
        });

        // Generate File Name
        const fileName = `sales_report_${startDate ? format(startDate, "dd-MM-yyyy") : "start"}_to_${endDate ? format(endDate, "dd-MM-yyyy") : "end"}.pdf`;
        doc.save(fileName);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
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

            </div>


            {selectedOption === 'Custom' && (
              <>
                <div className='flex items-center justify-between  w-[576px]'>
                  <div className="text-gray-500 text-base font-medium w-[200px]">Select Date Range</div>
                  <div className="w-full h-11 px-4 py-2 bg-white rounded-[5px] border border-neutral-400 flex items-center gap-2">
                    <div className="customDatePickerWidth flex">
                      <DatePicker
                        dateFormat={"dd/MM/yyyy"}
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
            filename={`sales_report_${startDate ? format(startDate, 'dd-MM-yyyy') : 'start'}_to_${endDate ? format(endDate, 'dd-MM-yyyy') : 'end'}.csv`}
            className="no-underline flex items-center mr-4"
            headers={[
              { label: 'Date', key: 'date' },
              { label: 'Type', key: 'type' },
              { label: 'Customer', key: 'customer' },
              { label: 'Ref. No.', key: 'invoiceNo' },
              { label: 'Total Cost', key: 'totalCost' },
              { label: 'Due Date', key: 'dueDate' },
              { label: 'Status', key: 'status' },
            ]}
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
