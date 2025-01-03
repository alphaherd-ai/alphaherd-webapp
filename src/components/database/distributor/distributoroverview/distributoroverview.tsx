"use client"
import Image from "next/image"
import Link from "next/link"
import lefticon from "../../../../assets/icons/inventory/left_icon.svg"
import righticon from "../../../../assets/icons/finance/right_icon.svg"
import icn_icon from "../../../../assets/icons/finance/inc_icon.svg"
import optionicon from "../../../../assets/icons/inventory/more_vert.svg"
import downloadicon from "../../../../assets/icons/inventory/1. Icons-24.svg"

import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import formatDateAndTime from "@/utils/formateDateTime";
import selecttab from "../../../../assets/icons/finance/SelectedTab.svg"

import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation"

import { useAppSelector } from "@/lib/hooks"
import useSWR from "swr"
import { getStatusStyles } from "@/utils/getStatusStyles"
import axios from "axios"
import LeftArrow from '../../../../assets/icons/finance/leftArrow.svg';
import RightArrow from '../../../../assets/icons/finance/rightArrow.svg';
import Loading from "@/app/loading"
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

const DistributorDetails = () => {
  const [distributor, setDistributor] = useState<any | null>(null);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [showDeletePopup, setShowDeletePopup] = useState(false); // For showing/hiding popup
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [invoiceList, setInvoiceList] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false); // For showing deletion progress
  const [distributorTimeLine, setDistributorTimeLine] = useState<any | null>(null);
  const url = useSearchParams();
  const id = url.get('id');
  const appState = useAppSelector((state) => state.app)
  const { fetchedDistributor, isLoading, error } = useDistributorfetch(id, appState.currentBranchId);

  function useDistributorfetch(id: string | null, branchId: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/${id}?branchId=${branchId}`, fetcher, { revalidateOnFocus: true });
    return {
      fetchedDistributor: data,
      isLoading,
      error
    }
  }


  const tabs = [
    { label: 'Day', clicked: clickedIndex === 0 },
    { label: 'Week', clicked: clickedIndex === 1 },
    { label: 'Month', clicked: clickedIndex === 2 },
    { label: 'Quarter', clicked: clickedIndex === 3 },
    { label: 'Year', clicked: clickedIndex === 4 },
    { label: 'All Time', clicked: clickedIndex === 5 }
  ];

  const handleTabClick = (index: any) => {
    setClickedIndex(index);
  };

  useEffect(() => {
    if (!error && !isLoading && fetchedDistributor) {
      setDistributor(fetchedDistributor);
    }
  }, [fetchedDistributor, error, isLoading]
  );

  useEffect(() => {
    if (id) {
      const getAllInvoices = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/invoicesById/${id}`);
        console.log(res.data);
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/${id}?branchId=${appState.currentBranchId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(distributor),

        }

      );
      console.log("dirti is ", distributor);

      if (response.ok) {
        alert("Distributor updated successfully!");
        setShowEditPopup(false); // Close the popup
        window.location.href = "/alphaherd/database/distributor";
      } else {
        console.error("Failed to update distributor");
        alert("Failed to update distributor!");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating!");
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
        window.location.href = "/alphaherd/database/distributor"; // Redirect to distributor list after deletion
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
            {distributor?.distributorName}
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
            <PopoverContent className="p-5 text-textGrey2 bg-white text-sm font-medium rounded-lg border-2">
              <div className="flex space-x-4">
                {/* Delete Button */}
                <button
                  className="text-left p-3 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 transition duration-300 ease-in-out"
                  onClick={() => setShowDeletePopup(true)} // Opens the delete popup
                >
                  Delete
                </button>
                {/* Edit Button */}
                <button
                  className="text-left p-3 text-sm font-medium bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-teal-600 hover:to-green-500 transition duration-300 ease-in-out"
                  onClick={() => setShowEditPopup(true)} // Opens the edit popup
                >
                  Edit
                </button>

                {/* Delete Popup */}
                {showDeletePopup && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-[600px] h-[200px] shadow-lg flex flex-col justify-between">
                      <h2 className="text-xl font-semibold text-gray-800">
                        Deleting <span className="text-gray-600"> Distributor</span>
                      </h2>
                      <p className="text-sm text-gray-600">
                        Are you sure you want to permanently delete{" "}
                        <span className="font-medium text-gray-800">
                          {distributor?.distributorName || "[Name, e.g: Pranav Ramesh]"}
                        </span>
                        ?
                      </p>
                      <div className="flex justify-end gap-4 mt-4">
                        <button
                          className="px-4 py-2 rounded-md bg-teal-500 text-white text-sm hover:bg-teal-600"
                          onClick={() => setShowDeletePopup(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className={`px-4 py-2 rounded-md text-white text-sm ${isDeleting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-black hover:bg-gray-800"
                            }`}
                          onClick={handleDelete}
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Edit Popup */}
                {showEditPopup && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                  >
                    <div
                      className="absolute top-10 right-10 bg-white rounded-lg shadow-lg p-8 w-[600px] max-w-[90vw] flex flex-col"
                    >
                      {/* Close Button */}
                      <button
                        onClick={() => setShowEditPopup(false)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                      >
                        &#x2715;
                      </button>

                      {/* Popup Heading */}
                      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Edit Distributor
                      </h2>

                      {/* Form */}
                      <form className="space-y-4">
                        {/* Name Field */}
                        <div>
                          <label className="block text-gray-700 font-medium">Name*</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                            value={distributor?.distributorName || ""}
                            onChange={(e) =>
                              setDistributor({
                                ...distributor,
                                distributorName: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* Address Field */}
                        <div>
                          <label className="block text-gray-700 font-medium">Address</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                            value={distributor?.address || ""}
                            onChange={(e) =>
                              setDistributor({
                                ...distributor,
                                address: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* Email Field */}
                        <div>
                          <label className="block text-gray-700 font-medium">Email*</label>
                          <input
                            type="email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                            value={distributor?.email || ""}
                            onChange={(e) =>
                              setDistributor({
                                ...distributor,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* Phone Number Field */}
                        <div>
                          <label className="block text-gray-700 font-medium">Phone Number*</label>
                          <input
                            type="tel"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                            value={distributor?.contact || ""}
                            onChange={(e) =>
                              setDistributor({
                                ...distributor,
                                contact: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* GSTIN Field */}
                        <div>
                          <label className="block text-gray-700 font-medium">GSTIN</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                            value={distributor?.gstin || ""}
                            onChange={(e) =>
                              setDistributor({
                                ...distributor,
                                gstin: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* PAN Number Field */}
                        <div>
                          <label className="block text-gray-700 font-medium">PAN Number</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                            value={distributor?.panNumber || ""}
                            onChange={(e) =>
                              setDistributor({
                                ...distributor,
                                panNumber: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* City and Pin Code Fields */}
                        <div className="flex space-x-4">
                          <div className="w-1/2">
                            <label className="block text-gray-700 font-medium">City</label>
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                              value={distributor?.city || ""}
                              onChange={(e) =>
                                setDistributor({
                                  ...distributor,
                                  city: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="w-1/2">
                            <label className="block text-gray-700 font-medium">Pin Code</label>
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                              value={distributor?.pinCode || ""}
                              onChange={(e) =>
                                setDistributor({
                                  ...distributor,
                                  pinCode: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        {/* Save and Cancel Buttons */}
                        <div className="flex justify-end space-x-4 mt-6">
                          <button
                            type="button"
                            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                            onClick={() => setShowEditPopup(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                            onClick={handleEditSave}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}



              </div>
            </PopoverContent>
          </Popover>




        </div>
      </div>

      <div className="w-full mt-[24px] bg-white rounded-[10px] border border-solid border-borderGrey flex-col justify-start items-start flex">
        <div className="flex w-full px-[24px] rounded-[10px] py-[16px] h-14 bg-white justify-between items-center">
          <div className="h-6 justify-start items-center gap-4 inline-flex">
            <div className="flex">
              <Image className="w-6 h-6 " src={lefticon} alt="left_icon" />
              <Image className="w-6 h-6 " src={righticon} alt="right_icon" />
            </div>
            <div className="text-textGrey2 text-sm font-medium ">
              July 17th - 23rd, 2023
            </div>
          </div>
          <div className="flex h-[19px] justify-start items-start gap-6">
            {tabs.map((tab, index) => (
              <button className="border-none bg-transparent" onClick={() => handleTabClick(index)} key={index}>
                <div className={`${tab.clicked ? "text-center text-teal-400 font-bold" : "text-textGrey1"} text-textGrey1 text-sm font-medium `}>
                  {tab.label}
                </div>
                {tab.clicked && <Image src={selecttab} alt="icon" />}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full justify-start items-start flex rounded-[10px]">
          <div className="w-4/12 p-6 bg-white border-t border-solid border-0  border-r border-borderGrey flex-col justify-center items-start rounded-b-xl gap-4 flex ">
            <div className="text-textGrey2 text-[28px] font-bold ">₹1,200</div>
            <div className="text-textGrey2 text-base font-medium ">Total Balance Due</div>
            <div className="w-[80px] h-7 px-2 py-1.5 bg-orange-50 rounded-[5px] justify-center items-center inline-flex ">
              <div className="text-orange-500 text-sm font-medium ">You owe</div>
              <div className="text-orange-500 text-sm font-medium "></div>
            </div>
          </div>
          <div className="w-4/12 p-6 bg-white border-t border-solid border-0 border-r border-borderGrey flex-col justify-center items-start gap-4 flex">
            <div className="text-textGrey2 text-[28px] font-bold ">₹32,499</div>
            <div className="text-textGrey2 text-base font-medium ">Money In</div>
            <div className="w-[150px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex ">
              <Image className="w-4 h-4 " src={icn_icon} alt="inc"></Image>
              <div className="text-green-600 text-sm font-medium ">12.4%</div>
              <div className="text-green-600 text-sm font-medium ">this week</div>
            </div>
          </div>
          <div className="w-4/12 p-6 bg-white border-t border-solid border-0 border-borderGrey flex-col justify-center items-start gap-4 flex rounded-b-xl">
            <div className="text-textGrey2 text-[28px] font-bold ">₹12,320</div>
            <div className="text-textGrey2 text-base font-medium ">Money Out</div>
            <div className="w-[150px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex ">
              <Image className="w-4 h-4 " src={icn_icon} alt="inc"></Image>
              <div className="text-green-600 text-sm font-medium ">12.4%</div>
              <div className="text-green-600 text-sm font-medium ">this week</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-6">
        <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border  border-solid border-borderGrey flex-col justify-center items-start flex">
          <div className="w-full border-b border-solid border-0 border-borderGrey">
            <div className="w-full flex gap-2 items-center p-6 h-3/12">
              <div className="text-textGrey1 text-base font-medium ">Address: </div>
              <div className="text-textGrey2 text-base font-medium ">{distributor?.address}</div>
            </div>
          </div>
          <div className="w-full border-b border-solid border-0 border-borderGrey flex  gap-8">
            <div className="w-6/12 p-6 border-r border-solid border-0 border-borderGrey flex-col items-center justify-between">
              <div className="text-textGrey1 text-base font-medium ">GSTIN: </div>
              <div className="text-textGrey2 text-base font-medium ">{distributor?.gstinNo}</div>
            </div>
            <div className="w-6/12 p-6 flex-col items-center justify-between">
              <div className="text-textGrey1 text-base font-medium ">PAN Number: </div>
              <div className="text-textGrey2 text-base font-medium ">{distributor?.panNo}</div>
            </div>
          </div>
          <div className="w-full border-b border-solid border-0 border-borderGrey">
            <div className="w-full flex gap-2 items-center p-6 h-3/12">
              <div className="text-textGrey1 text-base font-medium ">Email: </div>
              <div className="text-textGrey2 text-base font-medium ">{distributor?.email}</div>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full flex gap-2 items-center p-6 h-3/12">
              <div className="text-textGrey1 text-base font-medium ">Phone Number: </div>
              <div className="text-textGrey2 text-base font-medium ">{distributor?.contact}</div>
            </div>
          </div>
        </div>
        <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border  border-solid border-borderGrey flex-col flex">
          <div className="w-full border-b border-solid border-0 border-borderGrey flex items-start justify-between">
            <div className="p-6 flex items-start justify-between w-full">
              <div className="text-textGrey2 text-xl font-medium ">
                Ledger
              </div>
              <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid  border-borderGrey justify-start items-center gap-2 flex">
                <Image src={downloadicon} alt="download" className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="w-full">
            {/* Code for invoice details */}
          </div>
        </div>
      </div>
      <div className="rounded-md">
        <div className="w-full mt-[25px] rounded-[10px] border-borderGrey border border-solid  border-neutral-40  ">
          <div className="flex p-6 bg-white items-start justify-between w-full border-0 border-b border-solid border-borderGrey rounded-md">
            <div className="text-textGrey2 text-xl font-medium ">
              Timeline
            </div>
          </div>
          <div>
            <div className='flex justify-evenly  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-borderGrey text-textGrey2'>

              <div className='flex text-textGrey2 text-base font-medium px-6 w-2/12'>Date</div>
              <div className='flex text-textGrey2 text-base font-medium px-6 w-2/12'>Type</div>
              <div className='flex text-textGrey2 text-base font-medium px-6 w-2/12'>Invoice No.</div>
              <div className='flex text-textGrey2 text-base font-medium px-6 w-2/12'>Total Cost</div>
              <div className='flex text-textGrey2 text-base font-medium px-6 w-2/12'>Total Qty.</div>
              <div className='flex text-textGrey2 text-base font-medium px-6 w-2/12'>Due Date</div>
              <div className='flex text-textGrey2 text-base font-medium px-6 w-2/12'>Status</div>

            </div>


            {!distributorTimeLine ? <Loading/> :  distributorTimeLine?.map((item: any, index: number) => (
              <div key={item.id} className='flex   items-center w-full  box-border py-4   bg-white border border-solid border-borderGrey text-gray-400 border-t-0.5  '>
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
    </div>
  </>
}

export default DistributorDetails;


