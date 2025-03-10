import React, { useState,useEffect } from 'react';
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
import logo from "../../../../assets/icons/finance/pfpimg.png";
import { useAppSelector } from '@/lib/hooks';

const DownloadPopup = ({ onClose, transactions, type }: any) => {

  const appState = useAppSelector((state) => state.app)
  const [data, setData] = useState(transactions);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Custom');
  const [isDisabled, setIsDisabled] = useState(true);
    
      useEffect(() => {
        if (startDate && endDate) {
          setIsDisabled(false)
        }
        else {
          setIsDisabled(true)
        }
      }, [startDate, endDate])


  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  const handleFilter = (start: any, end: any) => {
    const filteredData = transactions.filter((item: any) => {
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
    convertImageToBase64(logo, (base64Image: any) => {
      if (!base64Image) {
        console.warn("Using default image due to image loading failure.");
        base64Image = defaultImage;
      }
      const doc = new jsPDF('landscape');
      const tableColumn = ["Date", "Party", "Receipt No.", "Subject", "Link Invoice", "Amount", "Mode", ""];
      const tableRows: any = [];

      const modeCounts: any = {};

      let totalAmount = 0;
      let totalAmountIn=0;
      let totalAmountOut=0;
      const noOfTransactions = data.length;

      data.forEach((item: any) => {
        if (item?.status !== 'Cancelled') {
          if (modeCounts[item.mode]) {
            modeCounts[item.mode]++;
          } else {
            modeCounts[item.mode] = 1;
          }
          if (item.moneyChange === 'In') {
            totalAmount += item.amountPaid
            totalAmountIn+=item.amountPaid;
          } else if (item.moneyChange === 'Out') {
            totalAmount -= item.amountPaid;
            totalAmountOut+=item.amountPaid;
          }
        }
      });

      data.forEach((item: any) => {
        if (item.status !== 'Cancelled') {
          if (item.moneyChange === 'In' || item.moneyChange === 'Out') {
            const transactionData = [
              format(new Date(item.date), 'dd-MM-yyyy'),
              item.partyName,
              item.receiptNo,
              item.subject,
              item.invoiceLink,
              item.amountPaid,
              item.mode,
              item.moneyChange,
            ];
            tableRows.push(transactionData);
          }
        }
      });

      doc.addImage(base64Image, 'PNG', 4, 4, 20, 20);
      doc.setFontSize(20);
      doc.text(appState.currentOrg.orgName, 30, 10);

      doc.setFontSize(12);
      const text = `${appState.currentOrg.address} ${appState.currentOrg.state}-${appState.currentOrg.pincode}`;
      const maxWidth = 85;
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, 30, 15);



      doc.setFontSize(13);
      doc.text(`Gst No. :  ${appState.currentOrg.gstNo}`, 126, 12);
      doc.setFontSize(13);
      doc.text(`PAN No. :  5465465465465465`, 126, 18);

      doc.setFontSize(13);
      doc.text(`Email :  ${appState.currentOrg.orgEmail}`, 220, 12);
      doc.setFontSize(13);
      doc.text(`Phone No. :  ${appState.currentOrg.phoneNo}`, 220, 18);
      doc.setFontSize(13);
      doc.text(`Website :  XYZ.com`, 220, 24);


      doc.setLineWidth(0.2);
      doc.line(1, 26, 320, 26);

      doc.setFontSize(15);
      doc.text("Transaction Report", 8, 34);

      doc.setFontSize(11);
      doc.text(`Category : ${type}`, 90, 33);
      doc.text(`Period : ${startDate ? format(startDate, 'dd-MM-yyyy') : 'start'} - ${endDate ? format(endDate, 'dd-MM-yyyy') : 'end'}`, 90, 37);

      doc.setFontSize(11);
      let yPosition = 33;
      Object.entries(modeCounts).forEach(([mode, count]) => {
        doc.text(`${mode}: ${count}`, 180, yPosition);
        yPosition += 5
      })

      doc.text(`Net: ${totalAmount}`, 230, 33);
      doc.text(`Total Number Of Transactions: ${noOfTransactions}`, 230, 38);
      doc.text(`Total Money In: ${totalAmountIn}`, 230, 43);
      doc.text(`Total Money Out: ${totalAmountOut}`, 230, 48);


      doc.setLineWidth(0.5);
      doc.line(1, 53, 320, 53);


      autoTable(doc, {
        startY: 55,
        head: [tableColumn],
        body: tableRows,
      });

      const fileName = `transactions_report_${startDate ? format(startDate, 'dd-MM-yyyy') : 'start'}_to_${endDate ? format(endDate, 'dd-MM-yyyy') : 'end'}.pdf`;
      doc.save(fileName);
    })
  }


  return (
    <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
      <div className="w-[640px] h-[550px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400/opacity-60 backdrop-blur-[60px] flex flex-col justify-between items-start overflow-auto">
        <div className='w-full flex flex-col gap-6'>
          <div className="self-end items-start gap-6 flex mt-[0.6rem] cursor-pointer" onClick={onClose}>
            <Image src={closeicon} alt="close" />
          </div>
          <div className="flex-col justify-start items-start gap-2 flex">
            <div className="text-gray-500 text-xl font-medium">Download Transactions Report</div>
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

          <Button className={` outline-none border-0 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={downloadPDF}>

            <div className="w-6 h-6">
              <Image src={download} alt="download" />
            </div>
            <div className="text-white text-base font-medium">Download as PDF</div>
          </Button>
          <CSVLink
            data={data.map((item: any) => ({
              ...item,
              products: Array.isArray(item?.products)
                ? item.products.map((product: any) => product.label).join(', ')
                : '',
              services: Array.isArray(item?.services)
                ? item.services.map((service: any) => service.label).join(', ')
                : ''
            }))}
            filename={`sales_report_${startDate ? format(startDate, 'dd-MM-yyyy') : 'start'}_to_${endDate ? format(endDate, 'dd-MM-yyyy') : 'end'}.csv`}
            className="no-underline flex items-center mr-4"
            headers={[
              { label: 'Date', key: 'date' },
              { label: 'Party Name', key: 'partyName' },
              { label: 'Receipt No.', key: 'receiptNo' },
              { label: 'Subject', key: 'subject' },
              { label: 'Invoice Link', key: 'invoiceLink' },
              { label: 'Amount Paid', key: 'amountPaid' },
              { label: 'Mode', key: 'mode' },
              { label: 'Money Change', key: 'moneyChange' },
              { label: 'Products', key: 'products' },
              { label: 'Services', key: 'services' },
            ]}

          >
            <Button className={` outline-none border-0 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>

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
