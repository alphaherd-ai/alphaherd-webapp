"use client"
import Image from "next/image"

import lefticon from "../../../../assets/icons/inventory/left_icon.svg"

import addicon from "../../../../assets/icons/inventory/bar_chart.svg"
import optionicon from "../../../../assets/icons/inventory/more_vert.svg"
import downloadicon from "../../../../assets/icons/inventory/1. Icons-24.svg"
import { FinanceCreationType } from '@prisma/client';
import EditClientPopup from "./editClientPopup"



import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation"

import { useAppSelector } from "@/lib/hooks"
import useSWR from "swr"
import axios from "axios"

import RecordTransactionPopup from "./multipleInvoiceTransactionPopup"

import ClearInvoices from "../clearInvoices"
import Loading2 from "@/app/loading2"
import formatDateAndTime from "@/utils/formateDateTime"
import { getStatusStyles } from '@/utils/getStatusStyles';
import LeftArrow from '../../../../assets/icons/finance/leftArrow.svg';
import RightArrow from '../../../../assets/icons/finance/rightArrow.svg';
import Loading from "@/app/loading"
import { Tooltip, Button } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import Menu from '../../../../assets/icons/finance/menu.svg'
import PatientPopup from '../../patient/newpatientpopup';
import ConfirmationPopup from "./confirmationPopup"
import { set } from "date-fns"
import Link from "next/link"
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());

const ClientDetails = () => {

    const router = useRouter();
    const [formData, setFormData] = useState<any>({
        amountPaid: "",
        moneyChange: "In"
    });
    const [client, setClient] = useState<any | null>(null);
    const [invoiceList, setInvoiceList] = useState<any | null>(null);
    const [clientTimeLine, setClientTimeLine] = useState<any | null>(null);
    const [patientPopup, setPatientPopup] = useState<boolean>(false);
    const url = useSearchParams();
    const appState = useAppSelector((state) => state.app)
    const id = url.get('id');
    const clientId = Number(id);
    console.log("ClientId is ", clientId);
    const [clickedIndex, setClickedIndex] = useState(0);
    const { fetchedClient, isLoading, error } = useClientfetch(id, appState.currentBranchId);
    const [open, setOpen] = useState(false);
    const [recordPaymentPopup, setRecordPaymentPopup] = useState<any>(false);
    const [toBePaid, setToBePaid] = useState(0);
    const [totalInComebynow, setTotalIncome] = useState(0);
    const [isEditPopupVisible, setEditPopupVisible] = useState(false);
    const [editPatient, setEditpatient] = useState<any>(null);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [patientList, setPatientList] = useState<any>([]);
    const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const onClose = () => {
        setPatientPopup((prev: boolean) => !prev);
    }


    function useClientfetch(id: string | null, branchId: number | null) {
        const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/${id}?branchId=${branchId}`, fetcher, { revalidateOnFocus: true });
        //setInvoiceList(data?.invoiceNo);
        return {
            fetchedClient: data,
            isLoading,
            error
        }
    }



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
        setClientTimeLine(invoiceList?.slice(start, end));
    }, [currentPageNumber, invoiceList])
    
    console.log("Client TimeLine", clientTimeLine);
    if (endInd > totalLen) setEndInd(totalLen);

    useEffect(() => {
        if (id) {
            const getAllInvoices = async () => {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/invoicesById/${id}`);
                console.log(res.data);
                setTotalLen(res.data?.length)
                setInvoiceList(res.data);
            }
            getAllInvoices();
        }
    }, [id])

    useEffect(() => {


        if (invoiceList?.length > 0) {
            let totalAmt = 0;
            let totalIncomeByNow = 0;
            invoiceList.forEach((invoice: any) => {
                if (invoice.status.includes("You owe")) {
                    const match = invoice.status.match(/[\d.]+/g); // Match both integers and floats
                    if (match) {
                        totalAmt += parseFloat(match[0]);
                    }
                }
                else if (invoice.status.includes("Closed")) {
                    totalIncomeByNow += invoice.totalCost;
                }
            });
            setFormData((prev: any) => ({ ...prev, amountPaid: totalAmt }));
            setToBePaid(totalAmt);
            setTotalIncome(totalIncomeByNow);
        }

        // console.log(toBePaid);
    }, [invoiceList]);



    //console.log(client);



    useEffect(() => {
        if (!error && !isLoading && fetchedClient) {
            //console.log(fetchedClient)
            setClient(fetchedClient);
            setPatientList(fetchedClient.patients);
        }
    }, [fetchedClient, error, isLoading]
    );


    const openEditPopup = () => {
        setEditPopupVisible(true);
    };

    const closeEditPopup = () => {
        setEditPopupVisible(false);
    };



    const handleTabClick = (index: any) => {
        setClickedIndex(index);
    };

    const handleDeleteClient = async () => {
        try {
            setIsDeleting(true);
            const branchId = appState.currentBranchId;
            //console.log("Branch ID being sent:", branchId);

            // Ensure the 'Branch-ID' header is a string, not null or a number
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/${clientId}?branchId=${appState.currentBranchId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Branch-ID': branchId !== null && branchId !== undefined ? String(branchId) : '', // Ensure it's a string
                },
            });


            if (response.ok) {
                alert("Client deleted successfully.");
                router.push('/database/clients'); // Redirect to the clients list or relevant page
            } else {
                // Only attempt to parse error message if response is not OK
                let errorMessage = "Failed to delete client. Please try again.";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch {
                    errorMessage = await response.text();
                }
                console.error("Delete error:", errorMessage);
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Request failed:", error);
            alert("Failed to delete client. Please check your network connection and try again.");
        }
        finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {

    }, [patientList]);





    return <>
        {open ? <ClearInvoices invoiceList={invoiceList} formData={formData} setOpen={setOpen} /> :

            <div className="w-full h-full  relative rounded-[20px] pr-[16px] pl-[16px] z-1">
                <div className={`fixed inset-0 w-full h-full  bg-opacity-50 backdrop-blur-sm z-40 ${recordPaymentPopup ? 'block' : 'hidden'}`} >
                    <RecordTransactionPopup setOpen={setOpen} formData={formData} setFormData={setFormData} clientName={client?.clientName} togglePopup={setRecordPaymentPopup} toBePaid={toBePaid}/>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-8">
                        <div className="w-11 h-11  rounded-[5px] border border-borderGrey flex justify-center items-center ">
                            <div className='no-underline h-full  ml-4' onClick={() => router.back()}>
                                <div className='flex items-center border border-solid border-borderGrey bg-white rounded-lg p-3  '>   <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back"></Image></div>
                            </div>
                        </div>
                        <div className="text-gray-500 text-[28px] font-bold p-2">
                            {client ? client?.clientName : <Loading2 />}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">

                        <div className=''>
                            <Popover placement="left" showArrow offset={10}>
                                <PopoverTrigger>
                                    <Button
                                        variant="solid"
                                        className="capitalize flex border-none  text-gray rounded-lg overflow-visible">
                                        <div className={`w-12 h-12 px-[11px] py-2.5  rounded-[5px] border border-solid bg-white border-stone-300 justify-center items-center gap-2 flex`}>   <Image src={optionicon} alt="option"></Image></div></Button>
                                </PopoverTrigger>
                                <PopoverContent className={`text-gray-500 ${!(isEditPopupVisible || showDeletePopup) ? "bg-white" : ""} text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 mt-2.5`}>

                                    {!(isEditPopupVisible || showDeletePopup) ?
                                        <div className="flex flex-col">
                                            <div className='flex flex-col'>
                                                <div className='no-underline flex cursor-pointer item-center' onClick={openEditPopup}>
                                                    <div className='text-gray-500 text-sm p-3 font-medium flex '>
                                                        Edit</div>
                                                </div>
                                                <div className='no-underline flex cursor-pointer item-center' onClick={() => setShowDeletePopup(true)}>
                                                    <div className='text-gray-500 text-sm p-3 font-medium flex '>
                                                        Delete</div>
                                                </div>
                                            </div>
                                        </div>
                                        : ""}
                                </PopoverContent>
                            </Popover>
                            {isEditPopupVisible && (
                                <EditClientPopup onClose={closeEditPopup} clientData={client} />
                            )}
                            {showDeletePopup && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                    <div className="bg-white rounded-lg p-6 w-[600px] h-[200px] shadow-lg flex flex-col justify-between">
                                        <h2 className="text-xl font-semibold text-gray-500">
                                            Deleting Client
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to permanently delete{" "}
                                            <span className="font-medium text-gray-500">
                                                {client?.clientName || "this service"}
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
                                                className={`px-4 py-2 border border-solid outline-none border-gray-500 rounded-md text-white text-sm ${isDeleting
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-black hover:bg-gray-800"
                                                    }`}
                                                onClick={handleDeleteClient}
                                                disabled={isDeleting}
                                            >
                                                {isDeleting ? <Loading2 /> : "Delete"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                <div className="w-full mt-[24px] bg-white rounded-[10px] border border-solid border-borderGrey flex-col justify-start items-start flex">

                    <div className="w-full justify-start items-start flex rounded-[10px]">
                        <div className="w-4/12 p-6 bg-white border-t border-solid border-0  border-r border-stone-300 flex-col justify-center items-start rounded-b-xl gap-4 flex ">
                            <div className="w-fit bg-[#E7F5EE] py-2 px-2 rounded-md">
                                <div className="text-[#0F9D58] text-[28px] font-bold ">₹{(toBePaid).toFixed(2)}</div>
                                <div className="text-[#0F9D58] text-base font-medium ">To be Paid</div>
                            </div>

                        </div>
                        <div className="w-4/12 p-6  border-t border-solid border-0 border-r border-stone-300 flex-col justify-center items-start gap-4 flex">
                            <div className="w-fit bg-[#FFF0E9] py-2 px-2 rounded-md">
                                <div className="text-[#FC6E20] text-[28px] font-bold ">₹{((client?.creditedToken) || 0).toFixed(2)}</div>
                                <div className="text-[#FC6E20] text-base font-medium ">Credit Note</div>
                            </div>

                        </div>
                        <div className="w-4/12 p-6 bg-white border-t border-solid border-0 border-stone-300 flex-col justify-center items-start gap-4 flex rounded-b-xl">
                            <div className="w-fit bg-[#EBEDFF] py-2 px-2 rounded-md">
                                <div className="text-[#3C50FF] text-[28px] font-bold ">₹{(totalInComebynow).toFixed(2)}</div>
                                <div className="text-[#3C50FF] text-base font-medium ">Total Income From Client</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-6">
                    <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border  border-solid border-borderGrey flex-col justify-center items-start flex">
                        <div className="w-full border-b border-solid border-0 border-stone-300">
                            <div className="w-full flex gap-2 items-center p-6 h-3/12">
                                <div className="text-textGrey2 text-base font-medium ">Address:</div>
                                <div className="text-gray-500 text-base font-medium ">{client ? client?.address : <Loading2 />}</div>
                            </div>
                        </div>

                        <div className="w-full flex border-b  border-solid border-0 border-stone-300">
                            <div className="w-full border-r border-solid border-0 border-stone-300 flex gap-2 items-center p-6 h-3/12">
                                <div className="text-textGrey2 text-base font-medium ">City:</div>
                                <div className="text-gray-500 text-base font-medium ">{client ? client?.city : <Loading2 />}</div>
                            </div>

                            <div className="w-full flex gap-2 items-center p-6 h-3/12">
                                <div className="text-textGrey2 text-base font-medium ">PinCode:</div>
                                <div className="text-gray-500 text-base font-medium ">{client ? client?.pinCode : <Loading2 />}</div>
                            </div>

                        </div>



                        <div className="w-full border-b border-solid border-0 border-stone-300">
                            <div className="w-full flex gap-2 items-center p-6 h-3/12">
                                <div className="text-textGrey2 text-base font-medium ">Email:</div>
                                <div className="text-gray-500 text-base font-medium ">{client ? client?.email : <Loading2 />}</div>
                            </div>
                        </div>
                        <div className="w-full border-solid border-0 border-stone-300">
                            <div className="w-full flex gap-2 items-center p-6 h-3/12">
                                <div className="text-textGrey2 text-base font-medium ">Phone Number:</div>
                                <div className="text-gray-500 text-base font-medium ">{client ? client?.contact : <Loading2 />}</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border  border-solid border-borderGrey flex flex-col ">
                        <div className="w-full border-b border-solid border-0 border-stone-300 flex items-start justify-between">
                            <div className="p-6 flex items-start justify-between w-full">
                                <div className="text-gray-500 text-xl font-medium ">
                                    Ledger
                                </div>
                                <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid  border-borderGrey justify-start items-center gap-2 flex">
                                    <Image src={downloadicon} alt="download" className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full">

                        </div>
                    </div>
                </div>
                <div className="rounded-md">
                    <div className="w-full mt-[25px] rounded-md border-borderGrey border border-solid">
                        <div className="w-full h-[72px] px-6 py-4 bg-white rounded-tl-md rounded-tr-md  border-b border-solid border-0 border-borderGrey justify-start items-center gap-4 flex">
                            <div className="text-gray-500 flex items-center gap-4 text-xl font-medium ">
                                <p>Patients</p>
                                <div className="h-12 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-center items-center gap-2 flex" onClick={() => setPatientPopup((prev: boolean) => !prev)}>
                                    <div>
                                        <Image src={addicon} alt="add"></Image>
                                    </div>
                                    <div className="text-white text-sm font-medium cursor-pointer">
                                        Add Patients
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-evenly  w-full  items-center box-border border-solid bg-gray-100  h-12 border-0  border-b border-borderGrey text-gray-500'>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'>Name</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'>Species</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'>Breed</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'>Age</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-1/6'>Sex</div>
                                <div className="w-1/6"></div>
                            </div>

                            {!patientList ? <Loading /> : patientList?.filter((patient: any) => !patient.isDeleted).map((patient: any) => (

                                <div key={patient.id} className='flex items-center justify-evenly w-full border-0 border-b box-border py-4 bg-white  border-solid border-gray-300 text-gray-400 border-t-0.5'>
                                    <div className='w-1/6 px-6 flex items-center text-textGrey1 text-base font-medium'>{patient?.patientName} </div>
                                    <div className='w-1/6 px-6 flex items-center text-textGrey1 text-base font-medium'>{patient?.species}</div>
                                    <div className='w-1/6 px-6 flex items-center text-textGrey1 text-base font-medium'>{patient?.breed}</div>
                                    <div className='w-1/6 px-6 flex items-center text-textGrey1 text-base font-medium'>{patient?.age}</div>
                                    <div className='w-1/6 px-6 flex items-center text-textGrey1 text-base font-medium'>{patient?.gender}</div>
                                    <div className="w-1/6">
                                        <Popover placement="bottom" showArrow offset={10}>
                                            <PopoverTrigger>
                                                <Button variant="solid" className="capitalize flex border-none text-gray rounded-lg">
                                                    <div className='flex items-center'>
                                                        <Image src={Menu} alt='Menu' className='w-5 h-5' />
                                                    </div>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 mt-2.5">
                                                <div className="flex flex-col">
                                                    <div className='flex flex-col'>
                                                        <div className='text-gray-500 cursor-pointer text-sm p-3 font-medium flex hover:cursor-pointer' onClick={() => { setPatientPopup((prev: any) => !prev); setEditpatient(patient) }}>
                                                            Edit
                                                        </div>
                                                        <div className='text-gray-500 cursor-pointer text-sm p-3 font-medium flex hover:cursor-pointer' onClick={() => { setEditpatient(patient); setShowConfirmation((prev: any) => !prev) }}>
                                                            Delete
                                                        </div>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="rounded-md">
                    <div className="w-full mt-[25px] rounded-md border-borderGrey border border-solid  border-neutral-40  ">
                        <div>
                            <div className="w-full  h-[72px] px-6 py-4 bg-white border-b border-solid border-0 rounded-tl-md rounded-tr-md border-borderGrey justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-xl font-medium">
                                    Timeline
                                </div>
                                <div className="h-12 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-center items-center gap-2 flex" onClick={() => setRecordPaymentPopup((prev: boolean) => !prev)}>
                                    <div>
                                        <Image src={addicon} alt="add"></Image>
                                    </div>
                                    <div className="text-white text-sm font-medium cursor-pointer">
                                        Record Payment : Clear Multiple Invoices
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div>
                            <div className='flex w-full  items-center border-solid box-border bg-gray-100  h-12 py-4 border-0 border-b border-borderGrey text-gray-500'>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'>Date</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'>Type</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'>Invoice No. </div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'>Total Qty.</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'>Due Date</div>
                                <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'>Status</div>

                            </div>

                            {!clientTimeLine ? <Loading /> : clientTimeLine?.map((item: any, index: number) => (
                                <div key={item.id} className='flex   items-center w-full  box-border py-4   bg-white border-0 border-b border-solid border-borderGrey text-gray-400 border-t-0.5  '>
                                    <div className='flex text-gray-400 text-base font-medium px-6 w-2/12'>{formatDateAndTime(item.date).formattedDate}</div>
                                    <Link href={{
                                                pathname: item.type === FinanceCreationType.Sales_Estimate ? '/finance/sales/existingsalesestimate' :
                                                  item.type === FinanceCreationType.Sales_Invoice ? '/finance/sales/existingsales' :
                                                    item.type === FinanceCreationType.Sales_Return ? '/finance/sales/existingsalesreturn' :
                                                      item.type === FinanceCreationType.Purchase_Order ? '/finance/purchases/exsistingpurchaseorder' :
                                                        item.type === FinanceCreationType.Purchase_Invoice ? '/finance/purchases/exsistinggrn' :
                                                          item.type === FinanceCreationType.Purchase_Return ? '/finance/purchases/exsistingpurchasereturn' :
                                                            item.type === FinanceCreationType.Expense_NonRecurring ? '/finance/expenses/exsistingnonrecurring' :
                                                              item.type === FinanceCreationType.Expense_Recurring ? '/finance/expenses/exsistingrecurring' : "",
                                                query: { id: item.id}
                                              }} className='flex text-gray-400 text-base font-medium px-6 w-2/12'>{item.type}</Link>
                                    <div className='flex text-gray-400 text-base font-medium px-6 w-2/12'>{item.invoiceNo}</div>
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
                {patientPopup && <PatientPopup onClose={onClose} clientData={client} editPatient={editPatient} setEditpatient={setEditpatient} />}
                {showConfirmation && <ConfirmationPopup patient={editPatient} setShowConfirmation={setShowConfirmation} patientList={patientList} setEditpatient={setEditpatient} setPatientList={setPatientList} />}
            </div>
        }
    </>
}

export default ClientDetails;







