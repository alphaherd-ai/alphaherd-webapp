"use client";
import React, { useState } from 'react'

import Sort from '../../../../assets/icons/finance/sort.svg';
import Filter from '../../../../assets/icons/finance/filter.svg';
import Chart from '../../../../assets/icons/finance/chart.svg';
import Download from '../../../../assets/icons/finance/download.svg';
import DownArrow from '../../../../assets/icons/finance/downArrow.svg';
import Invoice from '../../../../assets/icons/finance/invoice.svg';
import Return from '../../../../assets/icons/finance/return.svg';
import Estimate from "../../../../assets/icons/finance/list_alt.svg"
import Expense from "../../../../assets/icons/finance/request_quote.svg"
import Payments from "../../../../assets/icons/finance/Cash.svg"
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAppSelector } from '@/lib/hooks';
import Loading from '@/app/loading';
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import FilterDropdwonCard from './FilterDropdowmCard';
import DownloadPopup from './downloadTimeline';
import { useSearchParams } from 'next/navigation';
import formatDateAndTime from '@/utils/formateDateTime';
import { date } from 'zod';



const FinacesOverviewTableHeader = ({timeline}:any) => {
    const appState=useAppSelector((state)=>state.app);
    const {data, isLoading, error} = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/getAll?branchId=${appState.currentBranchId}`, fetcher,{revalidateOnFocus:true});

    const {data:products, isLoading:productsLoading, error:productsError} = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/getAll?branchId=${appState.currentBranchId}`, fetcher,{revalidateOnFocus:true});

    !productsLoading && console.log(products);

    let hsnSummaryArray: { hsnCode: string, itemName: string, quantity: number, defaultUnit: string, totalValue: number, tax: number, date: Date }[] = [];

    if (!productsLoading && products) {
        const hsnSummary: { [key: string]: { quantity: number, itemName: string, defaultUnit: string, totalValue: number, tax: number, date: Date } } = {};

        products?.forEach((prod: any) => {
            if (prod?.inventoryType === "Product" && prod?.invoiceType === "Sales_Invoice") {
                const hsnCode = prod.productBatch?.product?.hsnCode;
                const itemName = prod.productBatch?.product.itemName;
                const defaultUnit = prod.productBatch?.product.defaultUnit;
                const sellingPrice = prod?.productBatch?.sellingPrice;
                const quantity = prod?.productBatch?.quantity;
                const totalValue = sellingPrice * quantity;
                const tax = prod?.productBatch?.product?.tax;
                const date = (prod?.createdAt);

                if (hsnSummary[hsnCode]) {
                    hsnSummary[hsnCode].quantity += quantity;
                    hsnSummary[hsnCode].totalValue += totalValue;
                } else {
                    hsnSummary[hsnCode] = { quantity, itemName, defaultUnit, totalValue, tax, date };
                }
            }
        });

        hsnSummaryArray = Object.keys(hsnSummary).map(hsnCode => ({
            hsnCode,
            itemName: hsnSummary[hsnCode].itemName,
            quantity: hsnSummary[hsnCode].quantity,
            defaultUnit: hsnSummary[hsnCode].defaultUnit,
            totalValue: hsnSummary[hsnCode].totalValue,
            tax: hsnSummary[hsnCode].tax,
            date: hsnSummary[hsnCode].date
        }));

        console.log(hsnSummaryArray);
    }

    let hsnSummaryArray1: { hsnCode: string, itemName: string, quantity: number, defaultUnit: string, totalValue: number, tax: number, date: Date }[] = [];


    if (!productsLoading && products) {
        const hsnSummary1: { [key: string]: { quantity: number, itemName: string, defaultUnit: string, totalValue: number, tax: number, date: Date } } = {};

        products?.forEach((prod: any) => {
            if (prod?.inventoryType === "Product" && prod?.invoiceType === "Sales_Return") {
                const hsnCode = prod?.productBatch?.product.hsnCode;
                const itemName = prod?.productBatch?.product.itemName;
                const defaultUnit = prod?.productBatch?.product.defaultUnit;
                const sellingPrice = prod?.productBatch?.sellingPrice;
                const quantity = prod?.productBatch?.quantity;
                const totalValue = sellingPrice * quantity;
                const tax = prod?.productBatch?.product.tax;
                const date = (prod.createdAt);

                if (hsnSummary1[hsnCode]) {
                    hsnSummary1[hsnCode].quantity += quantity;
                    hsnSummary1[hsnCode].totalValue += totalValue;
                } else {
                    hsnSummary1[hsnCode] = { quantity, itemName, defaultUnit, totalValue, tax, date};
                }
            }
        });

        hsnSummaryArray1 = Object.keys(hsnSummary1).map(hsnCode => ({
            hsnCode,
            itemName: hsnSummary1[hsnCode].itemName,
            quantity: hsnSummary1[hsnCode].quantity,
            defaultUnit: hsnSummary1[hsnCode].defaultUnit,
            totalValue: hsnSummary1[hsnCode].totalValue,
            tax: hsnSummary1[hsnCode].tax,
            date: hsnSummary1[hsnCode].date
        }));

        console.log(hsnSummaryArray1);
    }

    let hsnSummaryArray2: { hsnCode: string, itemName: string, quantity: number, defaultUnit: string, totalValue: number, tax: number, date: Date }[] = [];

    if (!productsLoading && products) {
        const hsnSummary2: { [key: string]: { quantity: number, itemName: string, defaultUnit: string, totalValue: number, tax: number, date: Date } } = {};

        products?.forEach((prod: any) => {
            if (prod?.inventoryType === "Product" && prod?.invoiceType === "Purchase_Invoice") {
                const hsnCode = prod.productBatch?.product?.hsnCode;
                const itemName = prod.productBatch?.product?.itemName;
                const defaultUnit = prod.productBatch?.product?.defaultUnit;
                const sellingPrice = prod.productBatch?.sellingPrice;
                const quantity = prod.productBatch?.quantity;
                const totalValue = sellingPrice * quantity;
                const tax = prod.productBatch?.product?.tax;
                const date = (prod.createdAt);

                if (hsnSummary2[hsnCode]) {
                    hsnSummary2[hsnCode].quantity += quantity;
                    hsnSummary2[hsnCode].totalValue += totalValue;
                } else {
                    hsnSummary2[hsnCode] = { quantity, itemName, defaultUnit, totalValue, tax, date };
                }
            }
        });

        hsnSummaryArray2 = Object.keys(hsnSummary2).map(hsnCode => ({
            hsnCode,
            itemName: hsnSummary2[hsnCode].itemName,
            quantity: hsnSummary2[hsnCode].quantity,
            defaultUnit: hsnSummary2[hsnCode].defaultUnit,
            totalValue: hsnSummary2[hsnCode].totalValue,
            tax: hsnSummary2[hsnCode].tax,
            date: hsnSummary2[hsnCode].date
        }));

        console.log(hsnSummaryArray2);
    }


    let hsnSummaryArray3: { hsnCode: string, itemName: string, quantity: number, defaultUnit: string, totalValue: number, tax: number, date: Date }[] = [];

    if (!productsLoading && products) {
    const hsnSummary3: { [key: string]: { quantity: number, itemName: string, defaultUnit: string, totalValue: number, tax: number, date: Date } } = {};
    products?.forEach((prod: any) => {
        if (prod?.inventoryType === "Product" && prod?.invoiceType === "Purchase_Return") {
            const hsnCode = prod.productBatch?.product?.hsnCode;
            const itemName = prod.productBatch?.product?.itemName;
            const defaultUnit = prod.productBatch?.product?.defaultUnit;
            const sellingPrice = prod.productBatch?.sellingPrice;
            const quantity = prod.productBatch?.quantity;
            const totalValue = sellingPrice * quantity;
            const tax = prod.productBatch?.product?.tax;
            const date = (prod.createdAt);

            if (hsnSummary3[hsnCode]) {
                hsnSummary3[hsnCode].quantity += quantity;
                hsnSummary3[hsnCode].totalValue += totalValue;
            } else {
                hsnSummary3[hsnCode] = { quantity, itemName, defaultUnit, totalValue, tax, date };
            }
        }
    });

        hsnSummaryArray3 = Object.keys(hsnSummary3).map(hsnCode => ({
            hsnCode,
            itemName: hsnSummary3[hsnCode].itemName,
            quantity: hsnSummary3[hsnCode].quantity,
            defaultUnit: hsnSummary3[hsnCode].defaultUnit,
            totalValue: hsnSummary3[hsnCode].totalValue,
            tax: hsnSummary3[hsnCode].tax,
            date: hsnSummary3[hsnCode].date
        }));

        console.log(hsnSummaryArray3);
    }

    const [showPopup1, setShowPopup1] = React.useState(false);
    const togglePopup1 = () => {
        setShowPopup1(!showPopup1);
    }


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
    
      const logo = appState?.currentOrg?.orgImgUrl;

    const downloadPDF = () => {
        convertImageToBase64(logo, (base64Image:any) => {
        const doc = new jsPDF('landscape');
        const tableColumn = ["S.No.", "HSN/SAC", "Name", "UQC", "Total Qty()", "Total Value", "Total Taxable Amt", "CGST", "SGST", "Cess"];
        const tableRows:any = [];
    

    
        const currentYear1 = new Date().getFullYear();
        const startDate = new Date(currentYear1, 3, 1);
        const endDate = new Date(currentYear1 + 1, 3, 1);

        hsnSummaryArray.forEach((item, index) => {
          const itemDate = (item.date);
          if (new Date(itemDate) >= startDate && new Date(itemDate) < endDate) {
            const transactionData = [
              index + 1,
              item.hsnCode,
              item.itemName,
              (item.quantity) * -1,
              item.defaultUnit,
              (item.totalValue) * -1,
              ((item.tax ? item.tax : 0) * (item.totalValue) * -1) + (item.totalValue) * -1,
              ((item.tax ? item.tax : 0) * 100) / 2,
              ((item.tax ? item.tax : 0) * 100) / 2,
            ];
            tableRows.push(transactionData);
          }
        });

        const totalValueSum = hsnSummaryArray.reduce((sum, item) => sum + (((item.tax ? item.tax : 0)*(item.totalValue)*-1)+(item.totalValue)*-1), 0);
    
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
          doc.text("HSN Wise Summary", 8, 34);
    
          doc.setFontSize(11);
          doc.text(`Category : SALES`, 90, 33);
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth();
          const fiscalYear = currentMonth >= 3 ? `FY-${currentYear + 1}` : `FY-${currentYear}`;
          doc.text(`Period : ${fiscalYear}`, 90, 37);
    
          doc.setFontSize(11);
          let yPosition = 33;
          
          doc.text(`Total Amount: ${totalValueSum}`, 230, 33);
    
    
          doc.setLineWidth(0.5);
          doc.line(1, 53, 320, 53); 
    
    
        autoTable(doc, {
          startY: 55,
          head: [tableColumn],
          body: tableRows,
        });
    
        const fileName = `HSN_SALES.pdf`;
        doc.save(fileName);
      })
      }

      const downloadPDF1 = () => {
        convertImageToBase64(logo, (base64Image:any) => {
        const doc = new jsPDF('landscape');
        const tableColumn = ["S.No.", "HSN/SAC", "Name", "UQC", "Total Qty()", "Total Value", "Total Taxable Amt", "IGST", "CGST", "SGST", "Cess"];
        const tableRows:any = [];
    
        const currentYear1 = new Date().getFullYear();
        const startDate = new Date(currentYear1, 3, 1);
        const endDate = new Date(currentYear1 + 1, 3, 1);
    
        hsnSummaryArray1.forEach((item, index) => {
            const itemDate = (item.date);
            if (new Date(itemDate) >= startDate && new Date(itemDate) < endDate) {
              const transactionData = [
                index + 1,
                item.hsnCode,
                item.itemName,
                (item.quantity) * -1,
                item.defaultUnit,
                (item.totalValue) * -1,
                ((item.tax ? item.tax : 0) * (item.totalValue) * -1) + (item.totalValue) * -1,
                ((item.tax ? item.tax : 0) * 100) / 2,
                ((item.tax ? item.tax : 0) * 100) / 2,
              ];
              tableRows.push(transactionData);
            }
          });

        const totalValueSum = hsnSummaryArray1.reduce((sum, item) => sum + (((item.tax ? item.tax : 0)*(item.totalValue)*-1)+(item.totalValue)*-1), 0);

    
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
          doc.text("HSN Wise Summary", 8, 34);
    
          doc.setFontSize(11);
          doc.text(`Category : SALES_RETURN`, 90, 33);
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth();
          const fiscalYear = currentMonth >= 3 ? `FY-${currentYear + 1}` : `FY-${currentYear}`;
          doc.text(`Period : ${fiscalYear}`, 90, 37);
    
          doc.setFontSize(11);
          let yPosition = 33;
          
          doc.text(`Total Amount: ${totalValueSum}`, 230, 33);
    
    
          doc.setLineWidth(0.5);
          doc.line(1, 53, 320, 53); 
    
    
        autoTable(doc, {
          startY: 55,
          head: [tableColumn],
          body: tableRows,
        });
    
        const fileName = `HSN_SALES_RETURN.pdf`;
        doc.save(fileName);
      })
      }

      const downloadPDF2 = () => {
        convertImageToBase64(logo, (base64Image:any) => {
        const doc = new jsPDF('landscape');
        const tableColumn = ["S.No.", "HSN/SAC", "Name", "UQC", "Total Qty()", "Total Value", "Total Taxable Amt", "IGST", "CGST", "SGST", "Cess"];
        const tableRows:any = [];
    
        const currentYear1 = new Date().getFullYear();
        const startDate = new Date(currentYear1, 3, 1);
        const endDate = new Date(currentYear1 + 1, 3, 1);

        hsnSummaryArray2.forEach((item, index) => {
          const itemDate = (item.date);
          if (new Date(itemDate) >= startDate && new Date(itemDate) < endDate) {
            const transactionData = [
              index + 1,
              item.hsnCode,
              item.itemName,
              (item.quantity) * -1,
              item.defaultUnit,
              (item.totalValue) * -1,
              ((item.tax ? item.tax : 0) * (item.totalValue) * -1) + (item.totalValue) * -1,
              ((item.tax ? item.tax : 0) * 100) / 2,
              ((item.tax ? item.tax : 0) * 100) / 2,
            ];
            tableRows.push(transactionData);
          }
        });

        const totalValueSum = hsnSummaryArray2.reduce((sum, item) => sum + (((item.tax ? item.tax : 0)*(item.totalValue)*-1)+(item.totalValue)*-1), 0);
    
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
          doc.text("HSN Wise Summary", 8, 34);
    
          doc.setFontSize(11);
          doc.text(`Category : PURCHASE`, 90, 33);
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth();
          const fiscalYear = currentMonth >= 3 ? `FY-${currentYear + 1}` : `FY-${currentYear}`;
          doc.text(`Period : ${fiscalYear}`, 90, 37);
    
          doc.setFontSize(11);
          let yPosition = 33;
          
          doc.text(`Total Amount: ${totalValueSum}`, 230, 33);
    
    
          doc.setLineWidth(0.5);
          doc.line(1, 53, 320, 53); 
    
    
        autoTable(doc, {
          startY: 55,
          head: [tableColumn],
          body: tableRows,
        });
    
        const fileName = `HSN_PURCHASE.pdf`;
        doc.save(fileName);
      })
      }

      const downloadPDF3 = () => {
        convertImageToBase64(logo, (base64Image:any) => {
        const doc = new jsPDF('landscape');
        const tableColumn = ["S.No.", "HSN/SAC", "Name", "UQC", "Total Qty()", "Total Value", "Total Taxable Amt", "IGST", "CGST", "SGST", "Cess"];
        const tableRows:any = [];
    
    
        const currentYear1 = new Date().getFullYear();
        const startDate = new Date(currentYear1, 3, 1);
        const endDate = new Date(currentYear1 + 1, 3, 1);

        hsnSummaryArray3.forEach((item, index) => {
          const itemDate = (item.date);
          if (new Date(itemDate) >= startDate && new Date(itemDate) < endDate) {
            const transactionData = [
              index + 1,
              item.hsnCode,
              item.itemName,
              (item.quantity) * -1,
              item.defaultUnit,
              (item.totalValue) * -1,
              ((item.tax ? item.tax : 0) * (item.totalValue) * -1) + (item.totalValue) * -1,
              ((item.tax ? item.tax : 0) * 100) / 2,
              ((item.tax ? item.tax : 0) * 100) / 2,
            ];
            tableRows.push(transactionData);
          }
        });

        const totalValueSum = hsnSummaryArray3.reduce((sum, item) => sum + (((item.tax ? item.tax : 0)*(item.totalValue)*-1)+(item.totalValue)*-1), 0);
    
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
          doc.text("HSN Wise Summary", 8, 34);
    
          doc.setFontSize(11);
          doc.text(`Category : PURCHASE_RETURN`, 90, 33);
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth();
          const fiscalYear = currentMonth >= 3 ? `FY-${currentYear + 1}` : `FY-${currentYear}`;
          doc.text(`Period : ${fiscalYear}`, 90, 37);
    
          doc.setFontSize(11);
          let yPosition = 33;
          
          doc.text(`Total Amount: ${totalValueSum}`, 230, 33);
    
    
          doc.setLineWidth(0.5);
          doc.line(1, 53, 320, 53); 
    
    
        autoTable(doc, {
          startY: 55,
          head: [tableColumn],
          body: tableRows,
        });
    
        const fileName = `HSN_PURCHASE_RTEURN.pdf`;
        doc.save(fileName);
      })
      }

    const downloadPDFs = () => {
        downloadPDF();
        downloadPDF1(); 
        downloadPDF2();
        downloadPDF3();
    }

    return (

        <>
            <div className='flex w-full bg-white h-20  p-4 px-6  justify-between border-0 border-b border-solid border-borderGrey rounded-tl-lg rounded-tr-lg'>

                <div className='flex  text-gray-500  items-center'>
                    <div className=' text-base'>Finance Timeline</div>
                </div>
                <div className='flex items-center'>
                <div className='flex items-center  h-7  p-2 mr-4 border border-solid border-gray-300 border-0.5 rounded-lg cursor-pointer' onClick={downloadPDF}>

                <Button
                    variant="solid"
                    className="capitalize border-none bg-transparent rounded-lg cursor-pointer"
                    onClick={downloadPDFs}
                    >
                    <span className='text-textGrey2 text-sm font-medium'> HSN Wise Summary</span>
                </Button>
                </div>
                <div onClick={togglePopup1} className='cursor-pointer mr-4 flex items-center justify-center border w-7 h-7 border-solid border-gray-300 border-0.5 rounded-md p-1'>
                    <Image src={Download} alt='Download' className='w-4  h-4' />
                </div>
                    {/* <Link className='no-underline flex item-center mr-4' href='/finance/overview'>

                        <div  className='flex items-center justify-center w-7 h-7 border border-solid border-gray-300 border-0.5 rounded-md  p-1'><Image src={Chart} alt='Chart' className='w-4  h-4' /></div>
                    </Link> */}
                    <div className='flex items-center justify-center h-7   mr-4 border border-solid border-gray-300 border-0.5 rounded-lg p-2'>
                        <div className='flex '><Image src={Sort} alt='Sort' className='w-4 h-3' /></div>
                        <Popover>
                            <PopoverTrigger>
                                <Button
                                    variant="solid"
                                    className="capitalize border-none bg-transparent rounded-lg"
                                >
                                   <span className='text-textGrey2 text-sm font-medium'> Sort:Recent</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                 {/* <FilterDropdwonCard /> */}
                                Soon
                            </PopoverContent>
                        </Popover>
                        {/* <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    //   variant="bordered" 
                                    variant="solid"
                                    className="capitalize border-none  bg-transparent rounded-lg"
                                >
                                    {selectedSortValue}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Single selection example"
                                // color="gray-500"
                                className=" text-base  text-gray-500 bg-gray-200 rounded-lg"
                                variant="solid"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedSort}
                                // onSelectionChange={setselectedSort}
                            >
                                <DropdownItem
                                    className=" p-2 text-base" key="Category:text">Sort:Recently Used</DropdownItem>
                                <DropdownItem
                                    className=" p-2 text-base" key="Category:number">Sort:Recently Used</DropdownItem>
                                <DropdownItem
                                    className=" p-2 text-base" key="Category:date">Date</DropdownItem>
                            </DropdownMenu>
                        </Dropdown> */}
                    </div>
                    <div className='flex items-center  h-7  p-2 mr-4 border border-solid border-gray-300 border-0.5 rounded-lg '>
                        <div className='flex '><Image src={Filter} alt='Filter' className='w-4 h-4' /></div>

                        <Popover>
                            <PopoverTrigger>
                                <Button
                                    variant="solid"
                                    className="capitalize border-none bg-transparent rounded-lg"
                                >
                                   <span className='text-textGrey2 text-sm font-medium'> Filter By</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                 <FilterDropdwonCard />
                            </PopoverContent>
                        </Popover>
                    </div>

                      
                        <Popover placement="bottom-end" showArrow offset={10}>
                            <PopoverTrigger>
                                <Button 
                                    variant="solid"
                                    className="capitalize flex border-none bg-black text-white rounded-lg  py-2 cursor-pointer">  Create
                                    <div className='flex pl-2'><Image src={DownArrow} alt='DownArrow' className='w-4 h-4 ' /></div></Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">
                                <div className="flex flex-col">
                                    <div className='text-xl '>Sales</div>
                                    <div className='flex flex-col'>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>

                                    <div className='text-base p-4  pl-0 text-white flex '>
                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Invoice</div>
                                    </Link>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-base p-4 pl-0  text-white flex '>
                                    <div className='flex pr-2'><Image src={Return} alt='Return' className='w-5 h-5 ' /></div>Return</div>
                                    </Link>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-base p-4  pl-0 text-white flex '>
                                    <div className='flex pr-2'><Image src={Estimate} alt='Return' className='w-5 h-5 ' /></div>Estimate</div>
                                    </Link>
                                
                                    </div>
                                </div>
                                <div className="flex flex-col ">
                                    <div className='text-xl pl-4'>Return</div>
                                    <div className='flex flex-col'>
                                    
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-base p-4   text-white flex '>
                                    <div className='flex pr-2'><Image src={Invoice} alt='Invoice' className='w-5 h-5 ' /></div>Purchase Order</div>
                                    </Link>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-base p-4  text-white flex '>
                                    <div className='flex pr-2'><Image src={Return} alt='Return' className='w-5 h-5 ' /></div>Purchase Invoice (GRN)</div>
                                    </Link>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-base p-4  text-white flex '>
                                    <div className='flex pr-2'><Image src={Estimate} alt='Return' className='w-5 h-5 ' /></div>Purchase Return</div>
                                    </Link>
                                  
                                    </div>
                                </div>
                                <div className="flex flex-col h-full justify-between">
                                    <div className="flex flex-col" > 
                                    <div className='text-xl pl-4'>Expense</div>
                                    <div className='flex flex-col'>
                                  
                                    <Link className='no-underline flex item-center' href='/finance/overview'>
                                    <div className='text-base p-4   text-white flex '>
                                    <div className='flex pr-2'><Image src={Expense} alt='Invoice' className='w-5 h-5 ' /></div>Record Expense</div>
                                    </Link>
                                    </div>
                                    </div>
                                    <div className="flex flex-col"> 
                                    <div className='text-xl pl-4'>Transcations</div>
                                    <div className='flex flex-col'>
                                    <Link className='no-underline flex item-center' href='/finance/overview'>

                                    <div className='text-base p-4   text-white flex '>
                                    <div className='flex pr-2'><Image src={Payments} alt='Invoice' className='w-5 h-5 ' /></div>Record Payment</div>
                                    </Link></div>
                                   
                                    </div>
                                </div>

                            </PopoverContent>
                        </Popover>



                </div>
            </div >
          
            {showPopup1 && <DownloadPopup onClose={togglePopup1} timeline={timeline}  />}
        </>
    )
}

export default FinacesOverviewTableHeader;