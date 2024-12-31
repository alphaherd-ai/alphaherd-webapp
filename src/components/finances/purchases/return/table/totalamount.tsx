import React, { useContext, useEffect, useState } from 'react'

import Image from "next/image"

import calicon from "../../../../../assets/icons/finance/calendar_today.svg"

import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { DataContext } from './DataContext';

import Select from 'react-select';

import Popup from "./recordpurchase"
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';

const NewPurchaseReturnTotalAmount = () => {
  const { tableData, totalAmountData, setTotalAmountData } = useContext(DataContext);
  const { headerData } = useContext(DataContext);
  const { transactionsData, setTransactionsData } = useContext(DataContext);
  let totalAmount = 0;

  tableData.forEach((data) => {
    totalAmount +=
      (data.quantity * Number(data.unitPrice) +
        data.quantity * data.tax * Number(data.unitPrice) -
        (data.quantity * data.discount/100 * Number(data.unitPrice) || 0)) || 0;
  });
  //const { totalAmountData, setTotalAmountData } = useContext(DataContext);

  const [grandAmt, setGrandAmt] = useState(totalAmount);
  const gstOptions = [
    { value: 'percent', label: '% in Percent' },
    { value: 'amount', label: '₹ in Amount' }
  ];


  const [startDate, setDate] = useState(new Date());
  const [shipping, setShipping] = useState<string>('');
  const [adjustment, setAdjustment] = useState<string>('');


  const handleShippingChange = (event: any) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setShipping(value);
      updateGrandTotal();
    }
  };

  const handleAdjustmentChange = (event: any) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAdjustment(value);
      updateGrandTotal();
    }
  };

  useEffect(() => {
    if (totalAmountData.subTotal == 0) {
      setShipping('');
      setAdjustment('');
    }
  }, [totalAmountData])

  const [discountMethod, setDiscountMethod] = useState("amount");
  const handleSelectChange = (selectedOption: any) => {
    setDiscountMethod(selectedOption.value);
  };
  const [discountInput, setDiscountInput] = useState(0);
  const [selectedDiscountPer, setDiscountPer] = useState(0);
  const handleDiscountChange = (value: number) => {
    if (discountMethod === "amount") {
      //const discountedAmount = grandAmt - value;
      //const discountPercent = Number(value / totalAmount).toFixed(10);
      setDiscountInput(value)
      const discountPercent = Number(value / totalAmount).toFixed(4)
      setDiscountPer(Number(discountPercent))

      setTotalAmountData((prevData) => ({
        ...prevData,
        overallDiscount: Number(discountPercent),
      }));
    } else if (discountMethod === "percent") {

      setDiscountInput(value);
      const discountPercent = Number(value / 100).toFixed(4)
      setDiscountPer(Number(discountPercent));
      setDiscountInput(Number(discountPercent) * totalAmount)

      setTotalAmountData((prevData) => ({
        ...prevData,
        overallDiscount: value / 100,
      }));
    }
  };

  const updateGrandTotal = () => {
    const discountedAmount = (totalAmount - (discountMethod === 'amount' ? (discountInput || 0) : totalAmount * (selectedDiscountPer || 0))) || 0;
    const shippingValue = parseFloat(shipping) || 0;
    const adjustmentValue = parseFloat(adjustment) || 0;
    const newGrandTotal = discountedAmount + shippingValue + adjustmentValue;

    setGrandAmt(newGrandTotal);
    setTotalAmountData((prevData) => ({
      ...prevData,
      subTotal: totalAmount,
      totalCost: newGrandTotal,
      shipping: shippingValue,
      adjustment: adjustmentValue,

    }));
  };


  const handleDateChange = (date: any) => {
    setDate(date);
    setTotalAmountData((prevData) => ({
      ...prevData,
      lastDateOfReturn: date
    }))
  }


  const [showPopup, setShowPopup] = React.useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  }

  const [initialInvoiceNo, setInitialInvoiceNo] = useState('');
  const [count, setCount] = useState(0);
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
  }, [showPopup]);

  const balanceDue = 0;


  useEffect(() => {
    updateGrandTotal();
  }, [totalAmount, selectedDiscountPer, discountInput, discountMethod, shipping, adjustment]);
  //console.log("total amount data is :", totalAmountData);


  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: '100%',
      maxWidth: '100%',
      border: state.isFocused ? '1px solid #35BEB1' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '1px solid #35BEB1' : '#C4C4C4',
      },
      boxShadow: state.isFocused ? 'none' : 'none',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      width: '100%',
      maxWidth: '100%',
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      width: '100%',
      maxWidth: '100%',
      color: state.isSelected ? '#6B7E7D' : '#6B7E7D',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
      width: '100%',
      maxWidth: '100%',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#35BEB1' : 'white',
      color: state.isFocused ? 'white' : '#6B7E7D',
      '&:hover': {
        backgroundColor: '#35BEB1',
        color: 'white',
      },
    }),
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 })
  };


  return (
    <>


      <div className="flex w-full box-border bg-gray-100 pt-[20px] pb-[20px]">
        <div className="w-1/2 mr-4 flex flex-col gap-4">

          <div className="px-6 py-2 bg-white rounded-[5px] justify-between items-center gap-4 flex w-full border border-solid border-borderGrey">
            <div className="flex gap-[0.2rem] items-center w-full">
              <div className="text-gray-500 text-base font-bold  w-[20rem]">Last Date Of Item Returns:</div>

              <div className="customDatePickerWidth">
                <DatePicker
                  className="w-full"
                  selected={startDate}
                  onChange={handleDateChange}
                  calendarClassName="react-datepicker-custom"
                  customInput={
                    <div className='relative'>
                      <input
                        className="w-full h-9 text-textGrey1 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                        value={startDate.toLocaleDateString()}
                        readOnly
                      />
                      <Image
                        src={calicon}
                        alt="Calendar Icon"
                        className="absolute right-2 top-2 cursor-pointer"
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

        <div className="w-1/2 h-full  bg-white rounded-[10px]">
          <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
            <div className="text-gray-500 text-base font-bold  ">Subtotal</div>
            <div className="text-right text-gray-500 text-base font-bold ">{totalAmount.toFixed(2)}</div>
          </div>
          <div className="w-full flex px-4 py-2 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
            <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
            <div className="flex items-center">
              <div className="text-right text-borderText text-base  ">
                <input
                  placeholder='0'
                  className="text-right  text-base  w-[50%] border-none outline-none"
                  value={discountMethod === 'amount' ? discountInput : (selectedDiscountPer || 0) * 100}
                  onChange={(e) => handleDiscountChange(Number(e.target.value))}
                /></div>
              <div className=' flex text-gray-500 text-base font-medium pl-6'>
                <Select
                  className="text-neutral-400 text-base font-medium"
                  defaultValue={gstOptions[1]}
                  isClearable={false}
                  isSearchable={true}
                  options={gstOptions}
                  styles={customStyles}
                  onChange={handleSelectChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex px-4 py-2 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
            <div className="text-gray-500 text-base font-bold ">Shipping</div>
            <div className="flex items-center">
              <div className="text-right text-textGrey1 text-base  "><input
                className="text-right text-textGrey1 text-base   border-none outline-none"
                placeholder='0'
                value={shipping}
                onChange={handleShippingChange}
              /></div>

            </div>
          </div>
          <div className="w-full flex px-4 py-2 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
            <div className="text-gray-500 text-base font-bold ">Adjustment</div>
            <div className="flex items-center">
              <div className="text-right text-textGrey1 text-base  "><input
                className="text-right text-textGrey1 text-base   border-none outline-none"
                placeholder='0'
                value={adjustment}
                onChange={handleAdjustmentChange}
              /></div>

            </div>
          </div>

          <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
            <div className="text-textGreen text-base font-bold ">Grand total</div>
            <div className="text-right text-textGreen text-base font-bold "> {grandAmt.toFixed(2)}</div>
          </div>
        </div>
      </div>


      {showPopup && <Popup headerdata={headerData} onClose={togglePopup} transactionsData={transactionsData} setTransactionsData={setTransactionsData} initialInvoiceNo={initialInvoiceNo} totalAmount={totalAmountData} />}

    </>
  )
}

export default NewPurchaseReturnTotalAmount