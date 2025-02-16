"use client"
import Image from "next/image"
import Link from "next/link"
import lefticon from "../../../../assets/icons/inventory/left_icon.svg"
import righticon from "../../../../assets/icons/finance/right_icon.svg"
import icn_icon from "../../../../assets/icons/finance/inc_icon.svg"
import optionicon from "../../../../assets/icons/inventory/more_vert.svg"
import downloadicon from "../../../../assets/icons/inventory/1. Icons-24.svg"
import { generateInvoiceNumber } from "@/utils/generateInvoiceNo"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import formatDateAndTime from "@/utils/formateDateTime";
import selecttab from "../../../../assets/icons/finance/SelectedTab.svg"
import closeIcon from '../../../../assets/icons/finance/closeIcon.svg'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation"
import Select from 'react-select'
import { useAppSelector } from "@/lib/hooks"
import useSWR from "swr"
import { getStatusStyles } from "@/utils/getStatusStyles"
import axios from "axios"
import LeftArrow from '../../../../assets/icons/finance/leftArrow.svg';
import RightArrow from '../../../../assets/icons/finance/rightArrow.svg';
import Loading from "@/app/loading"
import { useRouter } from "next/navigation"
import Loading2 from "@/app/loading2"
import Rupee from '../../../../assets/icons/finance/rupee.svg';
import RecordTransactionPopup from '../../../finances/transactions/table/recordTransactionPopup';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

const DistributorDetails = () => {
  const router = useRouter();
  const [distributor, setDistributor] = useState<any | null>(null);
  const [editDistributor, setEditDistributor] = useState<any | null>(null);
  const [transactionPopup, setTransactionPopup] = useState<boolean>(false);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [showDeletePopup, setShowDeletePopup] = useState(false); // For showing/hiding popup
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [invoiceList, setInvoiceList] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false); // For showing deletion progress
  const [isUpdating, setUpdating] = useState(false);
  const [distributorTimeLine, setDistributorTimeLine] = useState<any | null>(null);
  const [toBePaid, setToBePaid] = useState<number>(0);
  const url = useSearchParams();
  const id = url.get('id');
  const appState = useAppSelector((state) => state.app)
  const { fetchedDistributor, isLoading, error } = useDistributorfetch(id, appState.currentBranchId);
  const randomReceiptNo = generateInvoiceNumber(distributor?.id);
  function useDistributorfetch(id: string | null, branchId: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/${id}?branchId=${branchId}`, fetcher, { revalidateOnFocus: true });
    return {
      fetchedDistributor: data,
      isLoading,
      error
    }
  }


  const onClose = () => {
    setTransactionPopup(false);
  }




  const handleTabClick = (index: any) => {
    setClickedIndex(index);
  };

  useEffect(() => {
    if (!error && !isLoading && fetchedDistributor) {
      setDistributor(fetchedDistributor);
      setEditDistributor(fetchedDistributor);
    }
  }, [fetchedDistributor, error, isLoading]
  );

  useEffect(() => {
    if (id) {
      const getAllInvoices = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/invoicesById/${id}`);
        //console.log(res.data);
        setTotalLen(res.data?.length)
        setInvoiceList(res.data);
      }
      getAllInvoices();
    }
  }, [id])

  //setting up pagination
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [startInd, setStartInd] = useState(0);
  const [endInd, setEndInd] = useState(0);
  const [totalLen, setTotalLen] = useState(0);
  const TOTAL_VALUES_PER_PAGE = 50;
  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };
  const goOnNextPage = () => {
    //console.log(currentPageNumber,data.length/TOTAL_VALUES_PER_PAGE);
    if (currentPageNumber === Math.ceil((totalLen) / TOTAL_VALUES_PER_PAGE)) return;
    setCurrentPageNumber((prev) => prev + 1);
  };
  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setStartInd(start)
    setEndInd(end);
    setDistributorTimeLine(invoiceList?.slice(start, end));
  }, [currentPageNumber, invoiceList])

  if (endInd > totalLen) setEndInd(totalLen);


  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setUpdating(true);
      const body = {
        distributorName: editDistributor?.distributorName,
        email: editDistributor?.email,
        contact: editDistributor?.contact,
        address: editDistributor?.address,
        city: editDistributor?.city,
        pinCode: editDistributor?.pinCode,
        gstinNo: editDistributor?.gstin,
        panNo: editDistributor?.panNumber,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/${id}?branchId=${appState.currentBranchId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(body),

        }

      );
      //console.log("dirti is ", distributor);

      if (response.ok) {
        alert("Distributor updated successfully!");
        setShowEditPopup(false); // Close the popup
        //window.location.href = "/alphaherd/database/distributor";
      } else {
        console.error("Failed to update distributor");
        alert("Failed to update distributor!");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating!");
    }
    finally {
      setUpdating(false);
    }
  };


  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/${id}?branchId=${appState.currentBranchId}`, // Replace `id` with the actual distributor ID
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Distributor deleted successfully!");
        setShowDeletePopup(false);
        router.push('/database/distributor'); // Redirect to distributor list after deletion
      } else {
        console.error("Failed to delete distributor");
        alert("Failed to delete distributor!");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred!");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (invoiceList) {
      let sum = 0;
      invoiceList.map((invoice: any) => {
        if (invoice.status.includes('You’re owed')) {
          sum += parseFloat(invoice.status.split('₹')[1]);
          //console.log(toBePaid);
        }
      })
      setToBePaid(sum);
    }
  }, [invoiceList])

  const City = [
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Noida', label: 'Noida' },
    { value: 'Gurgaon', label: 'Gurgaon' },
    { value: 'Faridabad', label: 'Faridabad' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Chennai', label: 'Chennai' },

  ]

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
  };



  return <>
    <div className="w-full h-full relative rounded-[20px] pr-[16px] pl-[16px] z-1">
      <div className="flex items-center justify-between">
        <div className="flex gap-8">
          <div className="w-11 h-11  rounded-[5px] border border-borderGrey flex justify-center items-center ">
            <Link className='no-underline h-full  ml-4' href='/database/distributor'>
              <div className='flex items-center border border-solid border-borderGrey bg-white rounded-lg p-3  '>   <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back"></Image></div>
            </Link>
          </div>
          <div className="text-textGrey2 text-[28px] font-bold p-2">
            {distributor ? distributor?.distributorName : <Loading2 />}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Popover placement="left" showArrow offset={10}>
            <PopoverTrigger>
              <Button variant="solid" className="capitalize flex border-none text-gray rounded-lg">
                <div className="w-12 h-12 p-2 bg-white rounded-[5px] border border-solid border-borderGrey flex items-center justify-center">
                  <Image src={optionicon} alt="Options" />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className={`p-5 text-textGrey2 ${!(showDeletePopup || showEditPopup) ? "bg-white" : ""} text-sm font-medium rounded-lg border-2`}>

              <div className="flex space-x-4">
                {/* Delete Button */}
                {!(showDeletePopup || showEditPopup) ?
                  <div>
                    <div className='no-underline flex cursor-pointer item-center' onClick={() => setShowEditPopup(true)}>
                      <div className='text-gray-500 text-sm p-3 font-medium flex '>
                        Edit</div>
                    </div>
                    <div className='no-underline flex cursor-pointer item-center' onClick={() => setShowDeletePopup(true)}>
                      <div className='text-gray-500 text-sm p-3 font-medium flex '>
                        Delete</div>
                    </div>
                  </div>
                  : ""}

                {/* Delete Popup */}




              </div>
            </PopoverContent>
          </Popover>


          {showDeletePopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg p-6 w-[600px] h-[200px] shadow-lg flex flex-col justify-between">
                <h2 className="text-xl font-semibold text-gray-500">
                  Deleting Distributor
                </h2>
                <p className="text-sm text-gray-600">
                  Are you sure you want to permanently delete{" "}
                  <span className="font-medium text-gray-500">
                    {distributor?.distributorName || "[Name, e.g: Pranav Ramesh]"}
                  </span>
                  ?
                </p>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    className="px-4 py-2 outline-none border border-solid border-gray-500 rounded-md bg-teal-500 text-white text-sm hover:bg-teal-600"
                    onClick={() => setShowDeletePopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`px-4 py-2 border border-solid border-gray-500 rounded-md text-white text-sm ${isDeleting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800"
                      }`}
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? <Loading2></Loading2> : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Popup */}
          {showEditPopup && (
            <div
              className="fixed overflow-y-scroll inset-0  z-50 flex items-center justify-center bg-opacity-50"
            >
              <div
                className="absolute top-10 right-10 bg-white rounded-lg shadow-lg p-8 w-[600px] max-w-[90vw] flex flex-col"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowEditPopup(false)}
                  className="absolute top-3 right-3 outline-none border border-solid border-gray-500 rounded-md cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  <Image src={closeIcon} alt="" />
                </button>

                {/* Popup Heading */}
                <h2 className="text-2xl font-semibold text-gray-500 mb-6 text-center">
                  Edit Distributor
                </h2>

                {/* Form */}
                <form className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="text-gray-500 text-base font-medium w-[8rem]">Name</label>
                    <input
                      type="text"
                      className="w-full text-gray-500 border border-solid outline-none border-gray-300 rounded-lg px-4 py-2 mt-1"
                      value={editDistributor?.distributorName || ""}
                      onChange={(e) =>
                        setEditDistributor((prev: any) => ({
                          ...prev,
                          distributorName: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* Address Field */}
                  <div>
                    <label className="text-gray-500 text-base font-medium w-[8rem]">Address</label>
                    <input
                      type="text"
                      className="w-full text-gray-500 border border-solid outline-none border-gray-300 rounded-lg px-4 py-2 mt-1"
                      value={editDistributor?.address || ""}
                      onChange={(e) =>
                        setEditDistributor((prev: any) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="text-gray-500 text-base font-medium w-[8rem]">Email</label>
                    <input
                      type="email"
                      className="w-full text-gray-500 border border-solid outline-none border-gray-300 rounded-lg px-4 py-2 mt-1"
                      value={editDistributor?.email || ""}
                      onChange={(e) =>
                        setEditDistributor((prev: any) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <label className="text-gray-500 text-base font-medium w-[8rem]">Phone Number*</label>
                    <input
                      type="tel"
                      className="w-full text-gray-500 border border-solid outline-none border-gray-300 rounded-lg px-4 py-2 mt-1"
                      value={editDistributor?.contact || ""}
                      onChange={(e) =>
                        setEditDistributor((prev: any) => ({
                          ...prev,
                          contact: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* GSTIN Field */}
                  <div>
                    <label className="text-gray-500 text-base font-medium w-[8rem]">GSTIN</label>
                    <input
                      type="text"
                      className="w-full text-gray-500 border border-solid outline-none border-gray-300 rounded-lg px-4 py-2 mt-1"
                      value={editDistributor?.gstinNo || ""}
                      onChange={(e) =>
                        setEditDistributor((prev: any) => ({
                          ...prev,
                          gstinNo: e.target.value,
                        }))}

                    />
                  </div>

                  {/* PAN Number Field */}
                  <div>
                    <label className="text-gray-500 text-base font-medium w-[8rem]">PAN Number</label>
                    <input
                      type="text"
                      className="w-full text-gray-500 border border-solid outline-none border-gray-300 rounded-lg px-4 py-2 mt-1"
                      value={editDistributor?.panNo || ""}
                      onChange={(e) =>
                        setEditDistributor((prev: any) => ({
                          ...prev,
                          panNo: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* City and Pin Code Fields */}
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label className="text-gray-500 text-base font-medium w-[8rem]">City</label>
                      <Select
                        className="text-textGrey2 outline-none border border-solid border-gray-300 px-2 rounded-md w-[10rem] text-base font-medium "
                        placeholder=""
                        isClearable={true}
                        isSearchable={true}
                        options={City}
                        isMulti={false}
                        name="city"
                        value={City.find((option) => option.label === editDistributor?.city)}
                        onChange={(value: any) => setEditDistributor((prev: any) => ({ ...prev, city: value?.label }))}
                        styles={customStyles}
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-gray-500 text-base font-medium w-[8rem]">Pin Code</label>
                      <input
                        type="text"
                        className="w-full text-gray-500 border border-solid outline-none border-gray-300 rounded-lg px-4 py-2 mt-1"
                        value={editDistributor?.pinCode || ""}
                        onChange={(e) =>
                          setEditDistributor((prev: any) => ({
                            ...prev,
                            pinCode: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  {/* Save and Cancel Buttons */}
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      className="px-4 py-2 outline-none border border-solid border-gray-500 bg-gray-500 text-white rounded-lg hover:bg-gray-500"
                      onClick={() => setShowEditPopup(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 outline-none border border-solid border-teal-500 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                      onClick={handleEditSave}
                    >
                      {isUpdating ? <Loading2 /> : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}




        </div>
      </div>


      <div className="w-full mt-[24px] bg-white rounded-md border box-border border-borderGrey flex-col justify-start items-start flex">

        <div className="w-full justify-start items-start flex rounded-md">
          <div className="w-4/12 p-6 bg-white border-b rounded-tl-md rounded-bl-md border-t border-solid border-0 border-l  border-r border-stone-300 flex-col justify-center items-start gap-4 flex ">
            <div className="w-fit bg-[#E7F5EE] py-2 px-2 rounded-md">
              <div className="text-[#0F9D58] text-[28px] font-bold ">₹{toBePaid}</div>
              <div className="text-[#0F9D58] text-base font-medium ">To be Paid</div>
            </div>




          </div>

          <div className="w-4/12 p-6 bg-white border-t border-b border-r border-solid border-0 border-stone-300 flex-col justify-center items-start gap-4 flex">
            <div className="w-fit bg-[#EBEDFF] py-2 px-2 rounded-md">
              <div className="text-[#3C50FF] text-[28px] font-bold ">₹{distributor?.creditedToken}</div>
              <div className="text-[#3C50FF] text-base font-medium ">Debit Note</div>
            </div>

          </div>

          <div className="w-4/12 p-6 rounded-tr-md rounded-br-md  border-t border-solid border-0 border-r border-b border-stone-300 flex-col justify-center items-start gap-4 flex">
            <div className="w-fit bg-[#FFF0E9] py-2 px-2 rounded-md">
              <div className="text-[#FC6E20] text-[28px] font-bold ">25/12/2024</div>
              <div className="text-[#FC6E20] text-base font-medium ">Last Date for Item Returns</div>
            </div>

          </div>

        </div>
      </div>




      <div className="w-full flex gap-6">
        <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border  border-solid border-borderGrey flex-col justify-center items-start flex">
          <div className="w-full border-b border-solid border-0 border-borderGrey">
            <div className="w-full flex gap-2 items-center p-6 h-3/12">
              <div className="text-textGrey1 text-base font-medium ">Address: </div>
              <div className="text-textGrey2 text-base font-medium ">{distributor ? distributor?.address : <Loading2 />}</div>
            </div>
          </div>

          <div className="w-full flex border-b  border-solid border-0 border-stone-300">
            <div className="w-full border-r border-solid border-0 border-stone-300 flex gap-2 items-center p-6 h-3/12">
              <div className="text-textGrey2 text-base font-medium ">City:</div>
              <div className="text-gray-500 text-base font-medium ">{distributor ? distributor?.city : <Loading2 />}</div>
            </div>

            <div className="w-full flex gap-2 items-center p-6 h-3/12">
              <div className="text-textGrey2 text-base font-medium ">PinCode:</div>
              <div className="text-gray-500 text-base font-medium ">{distributor ? distributor?.pinCode : <Loading2 />}</div>
            </div>

          </div>


          <div className="w-full border-b border-solid border-0 border-borderGrey flex  gap-8">
            <div className="w-6/12 p-6 border-r border-solid border-0 border-borderGrey flex-col items-center justify-between">
              <div className="text-textGrey1 text-base font-medium ">GSTIN: </div>
              <div className="text-textGrey2 text-base font-medium ">{distributor ? distributor?.gstinNo : <Loading2 />}</div>
            </div>
            <div className="w-6/12 p-6 flex-col items-center justify-between">
              <div className="text-textGrey1 text-base font-medium ">PAN Number: </div>
              <div className="text-textGrey2 text-base font-medium ">{distributor ? distributor?.panNo : <Loading2 />}</div>
            </div>
          </div>
          <div className="w-full border-b border-solid border-0 border-borderGrey">
            <div className="w-full flex gap-2 items-center p-6 h-3/12">
              <div className="text-textGrey1 text-base font-medium ">Email: </div>
              <div className="text-textGrey2 text-base font-medium ">{distributor ? distributor?.email : <Loading2 />}</div>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full flex gap-2 items-center p-6 h-3/12">
              <div className="text-textGrey1 text-base font-medium ">Phone Number: </div>
              <div className="text-textGrey2 text-base font-medium ">{distributor ? distributor?.contact : <Loading2 />}</div>
            </div>
          </div>
        </div>
        <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border  border-solid border-borderGrey flex-col flex">
          <div className="w-full border-b border-solid border-0 border-borderGrey flex items-start justify-between">
            <div className="p-6 flex items-start justify-between w-full">
              <div className="text-textGrey2 text-xl font-medium ">
                Ledger
              </div>
             
            </div>
          </div>
          <div className="w-full">
            {/* Code for invoice details */}
          </div>
        </div>
      </div>
      <div className="rounded-md">
        <div className="w-full mt-[25px] rounded-md border-borderGrey border border-solid  border-neutral-40  ">
          <div className="w-full  border-neutral-40  ">
            <div>
              <div className="w-full  h-[72px] px-6 py-4 bg-white border-b  rounded-tl-md rounded-tr-md border-solid border-0 border-borderGrey justify-start items-center gap-4 flex">
                <div className="text-gray-500 text-xl font-medium ">
                  Timeline
                </div>
                <div className="h-12 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-center items-center gap-2 flex">
                  <div>
                    <Image src={Rupee} alt="add"></Image>
                  </div>
                  <div className="text-white text-sm font-medium cursor-pointer" onClick={() => setTransactionPopup(true)}>
                    Record Payment
                  </div>
                </div>
              </div>

            </div>
          </div>

          
          <div>
            <div className='flex justify-evenly  w-full  items-center border-solid box-border bg-gray-100  h-12 py-4 border-0 border-b border-borderGrey text-textGrey2'>

              <div className='flex text-textGrey2 text-base font-medium px-6 w-2/12'>Date</div>
              <div className='flex text-textGrey2 text-base font-medium px-6 w-2/12'>Type</div>
              <div className='flex text-textGrey2 text-base font-medium px-6 w-2/12'>Invoice No.</div>
              <div className='flex text-textGrey2 text-base font-medium px-6 w-2/12'>Total Cost</div>
              <div className='flex text-textGrey2 text-base font-medium px-6 w-2/12'>Total Qty.</div>
              <div className='flex text-textGrey2 text-base font-medium px-6 w-2/12'>Due Date</div>
              <div className='flex text-textGrey2 text-base font-medium px-6 w-2/12'>Status</div>

            </div>


            {!distributorTimeLine ? <Loading /> : distributorTimeLine?.map((item: any, index: number) => (
              <div key={item.id} className='flex   items-center w-full  box-border py-4   bg-white border-0 border-b border-solid border-borderGrey text-gray-400 border-t-0.5  '>
                <div className='flex text-gray-400 text-base font-medium px-6 w-2/12'>{formatDateAndTime(item.date).formattedDate}</div>
                <div className='flex text-gray-400 text-base font-medium px-6 w-2/12'>{item.type}</div>
                <div className='flex text-gray-400 text-base font-medium px-6 w-2/12'>{item.invoiceNo}</div>
                <div className='flex text-gray-400 text-base font-medium px-6 w-2/12'>{item.totalCost}</div>
                <div className='flex text-gray-400 text-base font-medium px-6 w-2/12'>{item.totalQty} items</div>
                <div className='flex text-gray-400 text-base font-medium px-6 w-2/12'>{formatDateAndTime(item.dueDate).formattedDate}</div>
                <div className='flex text-gray-400 text-base font-medium px-6 w-2/12'>
                  {
                    (() => {
                      const statusParts = item.status.split('|').map((part: string) => part.trim());
                      //console.log(statusParts);
                      if (!statusParts.length) {
                        return (
                          <span className="text-[#6B7E7D] bg-[#EDEDED] px-2 py-1.5 text-sm font-medium rounded-[5px]">
                            No Status
                          </span>
                        );
                      }
                      return statusParts.map((status: any, index: any) => {
                        const styles = getStatusStyles(status);
                        return (
                          <span key={index} className={`${styles?.textColor} ${styles?.bgColor} px-2 mr-2 py-1.5 text-sm font-medium rounded-[5px]`}>
                            {status}
                          </span>
                        )
                      })
                    })
                      ()}
                </div>

              </div>
            ))}

            <div className='flex w-full  justify-between  h-12 px-6 py-3 bg-white rounded-bl-lg rounded-br-lg'>


              <div className='flex h-full'>

                <div className='flex items-center   '>
                  <div className='flex  pl-2'><Image src={LeftArrow} alt='LeftArrow' className='w-6 h-6 ' onClick={goOnPrevPage} /></div>
                  <div className='flex  pl-2'><Image src={RightArrow} alt='RightArrow' className='w-6 h-6 ' onClick={goOnNextPage} /></div>
                  <div className='text-sm   text-gray-500'>{startInd + 1}-{endInd} of {totalLen}</div>
                </div>
              </div>
            </div >

          </div>
        </div>
      </div>
      {transactionPopup && <RecordTransactionPopup initialInvoiceNo={randomReceiptNo} onClose={onClose} distributor={distributor?.distributorName} />}
    </div>
  </>
}

export default DistributorDetails;


