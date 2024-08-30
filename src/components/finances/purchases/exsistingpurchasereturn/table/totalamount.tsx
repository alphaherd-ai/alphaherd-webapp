import React, { useEffect, useState } from 'react'
import Rupee from "../../../../../assets/icons/finance/rupee.svg"
import Image from "next/image"
import { Button } from "@nextui-org/react";
import calicon from "../../../../../assets/icons/finance/calendar_today.svg"
import Cash from "../../../../../assets/icons/finance/Cash.svg"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import formatDateAndTime from '@/utils/formateDateTime';
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import Popup from "../table/recordexsistingpurchasereturpopup"
import Loading2 from '@/app/loading2';

const ExsistingPurcaseReturnTotalAmount = ({otherData, isLoading}:any) => {

    const [startDate, setStartDate] = useState(new Date());


    
    const [showPopup, setShowPopup] = React.useState(false);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    }



    
    const handleDateChange = (date:any) => {
        setStartDate(date);
        // setHeaderData((prevData) => ({ ...prevData, date }));
    };

    console.log("otherData", otherData)

    const totalPaidAmount = otherData?.recordTransaction?.reduce((acc: any, transaction: any) => {
        if (transaction?.moneyChange === 'In' || transaction?.isAdvancePayment) {
          return acc + transaction?.amountPaid;
        }
        return acc;
      }, 0);

    const totalAmountPay = otherData?.recordTransaction?.reduce((acc: any, transaction: any) => {
        if (transaction?.moneyChange === 'Out') {
          return acc + transaction?.amountPaid;
        }
        return acc;
      }, 0);

    // const totalPaidAmount = otherData?.recordTransaction?.reduce((a: any, b: any) => a + b.amountPaid, 0);


    const balanceDue = otherData?.totalCost - totalPaidAmount + totalAmountPay


    console.log(totalPaidAmount)

    const [count, setCount] = useState(0);
    const [initialInvoiceNo, setInitialInvoiceNo] = useState('');
  
    useEffect(() => {
      if (showPopup) {
        setCount((prevCount) => prevCount + 1);
      }
    }, [showPopup]);
  
    useEffect(() => {
      if (showPopup) {
        const newInvoiceNo = generateInvoiceNumber(count);
        setInitialInvoiceNo(newInvoiceNo);
      }
    }, [count, showPopup]);



  const gstOptions = [
    { value: 'GST@18%.', label: 'GST@18%.' },
    { value: 'GST@9%.', label: 'GST@9%.' }
];

  return (
    <>


<div className="flex w-full box-border bg-gray-100 pt-[20px] pb-[20px]">
            <div className="w-1/2 mr-4 flex flex-col gap-4">

            <div className="px-6 py-2 bg-white rounded-[5px] justify-between items-center gap-4 flex w-full border border-solid border-borderGrey">
                    <div className="flex gap-[0.2rem] items-center w-full">
                        <div className="text-gray-500 text-base font-bold  w-[20rem]">Last Date Of Item Returns:</div>
                        
                        <div className="customDatePickerWidth">
                        {formatDateAndTime(otherData?.returnLastDate).formattedDate}
                                    </div>
                    </div>
            </div>

            <div className='w-full mr-4 flex flex-col border border-solid border-borderGrey rounded-[5px]'>
            <div className="w-full  px-6 py-4 bg-white rounded-tl-md rounded-tr-md justify-between items-center gap-6 flex border-0 border-b border-solid border-borderGrey">
                        <div className="text-gray-500 text-xl font-medium ">Payments</div>
                       
                                    <Button 
                                        onClick={togglePopup}
                                        variant="solid"
                                        className="capitalize flex h-9 py-2.5 border-none text-base bg-black text-white rounded-lg cursor-pointer">
                                        <div className='flex'><Image src={Rupee} alt='Rupee' className='w-6 h-6 ' /></div>
                                        Record Payment
                                    </Button>
                                
                    </div> 
                    <div className="w-full  bg-white  justify-between items-center  flex">
                        <div className='w-full h-[9.6rem] flex flex-col overflow-auto container'>
                        {isLoading && <Loading2 />}
                        {otherData && otherData.recordTransaction && otherData.recordTransaction.map((transaction: any, index: any) => (
                            transaction.isAdvancePayment &&
                            (<div key={index} className='w-full px-6 flex border-0 border-b border-solid border-borderGrey'>
                            <div  className="text-textGrey2  text-base font-bold  w-1/3 py-4">Advance Paid</div>
                            <div className="text-textGrey1 text-base font-medium  w-1/3 py-4 flex  items-center">  
                                <div className='flex pr-2'>
                                    <Image src={Cash} alt='Cash' className='w-4 h-4 ' />
                                </div>
                                {transaction.mode}
                            </div>
                            <div className="text-textGrey1 text-base font-medium  w-1/3 py-4 ">₹ {(transaction.amountPaid)?.toFixed(2)}</div>
                            </div>)
                        ))}
                        {otherData && otherData.recordTransaction && otherData.recordTransaction.map((transaction: any, index: any) => (
                            !transaction.isAdvancePayment &&
                            (<div key={index} className='w-full px-6 flex border-0 border-b border-solid border-borderGrey'>
                            <div  className="text-textGrey1 text-base font-medium  w-1/3 py-4">{formatDateAndTime(transaction.date).formattedDate}</div>
                            <div className="text-textGrey1 text-base font-medium  w-1/3 py-4 flex  items-center">  
                                <div className='flex pr-2'>
                                    <Image src={Cash} alt='Cash' className='w-4 h-4 ' />
                                </div>
                                {transaction.mode}
                            </div>
                            <div className="text-textGrey1 text-base font-medium  w-1/3 py-4 ">₹ {(transaction.amountPaid)?.toFixed(2)}
                                {transaction.moneyChange === 'Out' && <span className="px-2 py-1 rounded-md bg-[#FFEAEA] text-[#FF3030] text-sm font-medium ml-[5px]">Out</span>}
                                {transaction.moneyChange === 'In' && <span className="px-2 py-1 rounded-md bg-[#E7F5EE] text-[#0F9D58] text-sm font-medium ml-[5px]">In</span>}
                            </div>
                            </div>)
                        ))}
                        </div>

                    </div>
                    <div className="w-full  px-6 bg-white rounded-bl-md rounded-br-md justify-between items-center flex shadow-top ">
                    <div className="text-gray-500 text-base font-bold  w-1/3 py-4">Balance Due</div>
                        <div className="text-gray-500 text-lg font-medium  w-1/3 py-4 flex  items-center"></div>
                        <div className="text-gray-500 text-base font-bold  w-1/3 py-4 ">₹ {balanceDue < 0 ? -1*(balanceDue)?.toFixed(2) : (balanceDue)?.toFixed(2) }
                        {balanceDue < 0 ? <span className="text-[#FC6E20] text-sm font-medium  px-2 py-1.5 bg-[#FFF0E9] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                            You owe
                        </span> : balanceDue === 0 ? "" : <span className="text-[#0F9D58] text-sm font-medium  px-2 py-1.5 bg-[#E7F5EE] rounded-[5px] justify-center items-center gap-2 ml-[5px]">
                            You’re owed
                        </span>}
                        </div>
                       
                    </div>
</div>

            </div>
            
            <div className="w-1/2 h-full  bg-white rounded-[10px]">
                <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                <div className="text-gray-500 text-base font-bold ">Subtotal</div>
                                    <div className="text-right text-gray-500 text-base font-bold ">₹{(otherData?.totalCost+otherData?.shipping+otherData?.adjustment+otherData?.overallDiscount*100)?.toFixed(2) || 0}</div>
                                </div>
                                <div className="w-full flex px-4 py-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                                    <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
                                    <div className="flex items-center">
                                        <div className="text-right text-textGrey1 text-base  ">{(otherData?.overallDiscount*100).toFixed(2) || 0}%</div>
                                     
                                    </div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5   ">
                                    <div className="text-gray-500 text-base font-bold ">Shipping</div>
                                    <div className="text-right text-textGrey1 text-base ">₹{otherData?.shipping || 0}</div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5  ">
                                    <div className="text-gray-500 text-base font-bold ">Adjustment</div>
                                    <div className="text-right text-textGrey1 text-base ">₹{otherData?.adjustment || 0}</div>
                                </div>
                                <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                                    <div className="text-textGreen text-base font-bold">Grand total</div>
                                    <div className="text-right text-textGreen text-base font-bold ">₹{(otherData?.totalCost)?.toFixed(2) || 0}</div>
                                </div>
                            </div>
            </div>


            {showPopup && <Popup headerdata={otherData} onClose={togglePopup} initialInvoiceNo={initialInvoiceNo} balanceDue={balanceDue} />}

        </>
  )
}

export default ExsistingPurcaseReturnTotalAmount