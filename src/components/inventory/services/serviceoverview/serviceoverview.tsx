"use client"
import Image from "next/image"
import Link from "next/link"
import lefticon from "../../../../assets/icons/inventory/left_icon.svg"
import aiicon from "../../../../assets/icons/inventory/Group 2749.svg"
import infoicon from "../../../../assets/icons/inventory/Icons16.svg"
import addicon from "../../../../assets/icons/inventory/bar_chart.svg"
import optionicon from "../../../../assets/icons/inventory/more_vert.svg"
import downloadicon from "../../../../assets/icons/inventory/1. Icons-24.svg"
import baricon from "../../../../assets/icons/inventory/bar_chart.svg"
import expandicon from "../../../../assets/icons/inventory/expand_content.svg"
import tuneicon from "../../../../assets/icons/inventory/bar_chart.svg"
import downarrow from "../../../../assets/icons/inventory/Icons16.svg"
import optionarrow from "../../../../assets/icons/inventory/more_vert.svg"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import formatDateAndTime from "@/utils/formateDateTime";
import Slider from '@mui/material/Slider';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation"
import { response } from "express"
import { useAppSelector } from "@/lib/hooks"
import useSWR from "swr"
import Loading2 from "@/app/loading2"
import { set } from "date-fns"
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

function useServicefetch(id: string | null, branchId: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/${id}?branchId=${branchId}`, fetcher, { revalidateOnFocus: true });
    return {
        fetchedService: data,
        isLoading,
        error
    }
}

function useServiceTimeLine(id: string | null, branchId: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/timeline/service/${id}?branchId=${branchId}`, fetcher, { revalidateOnFocus: true });
    return {
        fetchedServiceTimeLine: data,
        serviceLoading: isLoading,
        serviceError: error
    }
}

// async function fetchProductDetails(productNames: string[]) {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/products`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ productNames }),
//     });

//     if (response.ok) {
//         return response.json();
//     } else {
//         console.error('Failed to fetch product details:', response.statusText);
//         return [];
//     }
// }

// async function fetchProductDetails(id: any,branchId:any) {
//     try {
//         const queryParams = new URLSearchParams();


//         id.forEach((val:any) => {
//             queryParams.append('id', val);
//         });

//         console.log("queryParams", queryParams);

//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/${id}?branchId=${branchId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (response.ok) {
//             const data = await response.json();
//             console.log("data", data);
//             return data;
//         } else {
//             console.error('Failed to fetch product details:', response.statusText);
//             return [];
//         }
//     } catch (error) {
//         console.error('Error fetching product details:', error);
//         return [];
//     }
// }




const ServiceDetails = () => {


    const router = useRouter();

    const [service, setService] = useState<any | null>(null);
    const [inventoryTimeline, setInventoryTimeline] = useState<any | null>(null);
    const url = useSearchParams();
    const id = url.get('id');
    const appState = useAppSelector((state) => state.app)
    const { fetchedService, isLoading, error } = useServicefetch(id, appState.currentBranchId);
    const [value, setValue] = useState(30);

    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { fetchedServiceTimeLine, serviceLoading, serviceError } = useServiceTimeLine(id, appState.currentBranchId)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    useEffect(() => {
        if (!error && !isLoading && fetchedService) {
            setService(fetchedService);
        }
        if (!serviceError && !serviceLoading && fetchedServiceTimeLine) {
            console.log(fetchedServiceTimeLine[0]?.inventoryTimeline);
            setInventoryTimeline(fetchedServiceTimeLine[0]?.inventoryTimeline)
        }

    }, [fetchedService, error, isLoading, fetchedServiceTimeLine, serviceError, serviceLoading]
    );

    // console.log("service", service);

    const [productDetails, setProductDetails] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const productIds = service?.linkProducts?.map((product: any) => (
            // console.log("product",product),
            product.value
        ));

        const fetchProductDetails = async () => {
            setLoading(true);
            try {
                const promises = productIds.map((id: any) =>
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/${id}?branchId=${appState.currentBranchId}`)
                        .then(res => res.json())
                );
                const results = await Promise.all(promises);
                setProductDetails(results);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            }
            setLoading(false);
        };

        if (productIds?.length > 0) {
            fetchProductDetails();
        }
    }, [service?.linkProducts, appState.currentBranchId]);

    const handleEditSave = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("the service is: ", service);
        try {
            console.log("Payload being sent: ", JSON.stringify(service));
            console.log("API Endpoint: ", `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/${id}?branchId=${appState.currentBranchId}`);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/${id}?branchId=${appState.currentBranchId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(service),
                }
            );

            console.log("The response created is : ", response);

            if (response.ok) {
                alert("Service updated successfully!");
                setShowEditPopup(false);
                router.push('/inventory/services/timeline'); // Adjust the path as needed
            } else {
                const errorResponse = await response.json();
                console.error("Error response body: ", errorResponse);
                alert("Failed to update service!");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while updating!");
        }
    };


    const handleDelete = async () => {
        setIsDeleting(true);
        console.log("service name is : ", service);
        try {

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/${id}?branchId=${appState.currentBranchId}`,
                {
                    method: "DELETE",
                }
            );
             console.log("response:",response);
            if (response.ok) {
                alert("Service deleted successfully!");
                setShowDeletePopup(false);
                router.push('/inventory/services/timeline'); // Adjust the path as needed
            } else {
                alert("Failed to delete service!");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred!");
        } finally {
            setIsDeleting(false);
        }
    };

    // console.log("productDetails", productDetails);


    return <>
        <div className="w-full h-full relative  rounded-[20px] pr-[16px] pl-[16px] z-1">
            <div className="w-full flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <div className="w-11 h-11  rounded-[5px] border border-neutral-400 flex justify-center items-center">
                        <div className='no-underline h-full cursor-pointer' onClick={() => router.back()}>
                            <div className='flex items-center border border-solid border-gray-300 bg-white rounded-lg p-3  '>
                                <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back"></Image>
                            </div>
                        </div>

                    </div>
                    <div className="text-textGrey2 text-[28px] font-bold p-2">
                        {isLoading ? <Loading2 /> : service?.name}
                    </div>
                </div>
                <div className="flex items-center gap-4">


                    <Popover placement="bottom" showArrow offset={10}>
                        <PopoverTrigger>
                            <Button
                                variant="solid"
                                className="capitalize flex w-12 h-12 py-2.5  rounded-[5px] text-textGrey2 border border-solid border-borderGrey">
                                {/* <div className='w-12 h-12 py-2.5  rounded-[5px] border border-solid border-borderGrey justify-center items-center gap-2 flex'>    */}
                                <Image src={optionicon} alt="option"></Image>
                                {/* </div> */}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-5 text-textGrey2 bg-white text-sm font-medium rounded-lg border-2">
                            <div className="flex space-x-4">
                                {/* Delete Button */}
                                <button
                                    className="flex items-center gap-2 p-2 text-sm font-medium bg-teal-500 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out border-none"
                                    onClick={() => setShowDeletePopup(true)} // Opens the delete popup
                                >

                                    Delete
                                </button>

                                {/* Edit Button */}
                                <button
                                    className="flex items-center gap-2 p-2 text-sm font-medium bg-teal-500 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out border-none"
                                    onClick={() => setShowEditPopup(true)} // Opens the edit popup
                                >
                                    Edit
                                </button>

                                {/* Delete Popup */}
                                {showDeletePopup && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                        <div className="bg-white rounded-lg p-6 w-[600px] h-[200px] shadow-lg flex flex-col justify-between">
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                Deleting <span className="text-gray-600"> Service</span>
                                            </h2>
                                            <p className="text-sm text-gray-600">
                                                Are you sure you want to permanently delete{" "}
                                                <span className="font-medium text-gray-800">
                                                    {service?.name || "this service"}
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

                                {/* Edit Service Popup */}
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
                                                Edit Service
                                            </h2>

                                            {/* Form */}
                                            <form className="space-y-4">
                                                {/* Name Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Name*</label>
                                                    <input
                                                        type="text"
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                                                        value={service?.name || ""}
                                                        onChange={(e) =>
                                                            setService({
                                                                ...service,
                                                                name: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>

                                                {/* SAC Code Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">SAC Code*</label>
                                                    <input
                                                        type="text"
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                                                        value={service?.sacCode || ""}
                                                        onChange={(e) =>
                                                            setService({
                                                                ...service,
                                                                sacCode: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>

                                                {/* Description Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Description</label>
                                                    <textarea
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                                                        value={service?.description || ""}
                                                        onChange={(e) =>
                                                            setService({
                                                                ...service,
                                                                description: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>

                                                {/* Selling Price Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Selling Price</label>
                                                    <input
                                                        type="number"
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                                                        value={service?.sellingPrice || ""}
                                                        onChange={(e) =>
                                                            setService({
                                                                ...service,
                                                                sellingPrice: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>

                                                {/* Service Charge Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Service Charge</label>
                                                    <input
                                                        type="number"
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                                                        value={service?.serviceCharge || ""}
                                                        onChange={(e) =>
                                                            setService({
                                                                ...service,
                                                                serviceCharge: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>

                                                {/* Tax Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Tax (%)</label>
                                                    <input
                                                        type="number"
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                                                        value={service?.tax || ""}
                                                        onChange={(e) =>
                                                            setService({
                                                                ...service,
                                                                tax: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>

                                                {/* Providers Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Providers</label>
                                                    <textarea
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                                                        placeholder="Comma-separated values, e.g., Provider1, Provider2"
                                                        value={service?.providers?.join(", ") || ""}
                                                        onChange={(e) =>
                                                            setService({
                                                                ...service,
                                                                providers: e.target.value.split(",").map((p) => p.trim()),
                                                            })
                                                        }
                                                    />
                                                </div>

                                                {/* Category Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Category</label>
                                                    <select
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                                                        value={service?.category || ""}
                                                        onChange={(e) =>
                                                            setService({
                                                                ...service,
                                                                category: e.target.value,
                                                            })
                                                        }
                                                    >
                                                        <option value="">Select a category</option>
                                                        <option value="Category 1">Category 1</option>
                                                        <option value="Category 2">Category 2</option>
                                                        <option value="Category 3">Category 3</option>
                                                    </select>
                                                </div>

                                                {/* Save and Cancel Buttons */}
                                                <div className="flex justify-end space-x-4 mt-6">
                                                    <button
                                                        type="button"
                                                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none"
                                                        onClick={() => setShowEditPopup(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none"
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


            <div className="w-full mt-[25px] pt-8 bg-white rounded-[10px] border border-solid border-borderGrey flex-col justify-start items-start gap-8 flex">
                <div className="w-full px-6 justify-start items-center gap-8 flex">
                    <div className="w-40 text-textGrey2 text-[20px] font-bold ">
                        Description
                    </div>
                </div>
                <div className="w-full px-6 justify-start items-center gap-8 flex">
                    <div className="w-full rounded-[10px] flex items-center text-textGrey2">
                        {isLoading ? <Loading2 /> : service?.description}
                    </div>
                </div>
                <div className="w-full justify-start items-start flex rounded-[10px]">
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0  border-r border-borderGrey flex-col justify-center items-start rounded-b-xl gap-4 flex ">
                        <div className="text-textGrey2 text-[28px] font-bold ">₹{isLoading ? <Loading2 /> : service?.serviceCharge}</div>
                        <div className="text-textGrey2 text-base font-medium ">Service Charge</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-r border-borderGrey flex-col justify-center items-start gap-4 flex">
                        <div className="text-textGrey2 text-[28px] font-bold ">₹32,499</div>
                        <div className="text-textGrey2 text-base font-medium ">Total Sales</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-r border-borderGrey flex-col justify-center items-start gap-4 flex">
                        <div className="text-textGrey2 text-[28px] font-bold ">₹499</div>
                        <div className="text-textGrey2 text-base font-medium ">Avg. Cost of products used</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-borderGrey flex-col justify-center items-start gap-4 flex rounded-b-xl">
                        <div className="text-textGrey2 text-[28px] font-bold ">19%</div>
                        <div className="text-textGrey2 text-base font-medium ">Average Profit Margin</div>
                    </div>
                </div>
            </div>
            <div className="w-full flex gap-6">
                <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border  border-solid border-borderGrey flex-col justify-center items-start flex">
                    <div className="w-full border-b border-solid border-0 border-borderGrey">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-textGrey2 text-base font-medium ">SAC Code: </div>
                            <div className="text-textGrey2 text-base font-medium ">{isLoading ? <Loading2 /> : service?.sacCode}</div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-borderGrey flex  gap-8">
                        <div className="w-6/12 p-6 border-r border-solid border-0 flex border-borderGrey items-center justify-between">
                            <div className="text-textGrey2 text-base font-medium ">Categories</div>
                            <div className=" h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-green-600 text-sm font-medium ">{isLoading ? <Loading2 /> : service?.category}</div>
                            </div>
                        </div>
                        <div className="w-6/12 p-6 flex items-center justify-between">
                            <div className="text-textGrey2 text-base font-medium ">Dispensing Fee</div>
                            <div className="w-[66px] h-7 px-2 py-1.5 bg-orange-50 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-orange-500 text-sm font-medium ">{isLoading ? <Loading2 /> : service?.sellingPrice}</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-b border-solid border-0 border-borderGrey">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-textGrey2 text-base font-medium ">Tax Rate:</div>
                            <div className="px-2 py-1.5 bg-gray-100 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-textGrey2 text-base font-medium ">{isLoading ? <Loading2 /> : service?.tax} %</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-textGrey2 text-base font-medium ">Providers:</div>
                            <div className="px-2 py-1.5 bg-gray-100 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-textGrey2 text-base font-medium ">{isLoading ? <Loading2 /> : service?.providers}</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border border-solid border-borderGrey flex  flex-col">
                    <div className="w-full flex p-6 items-start justify-between border-0 border-b  border-solid border-borderGrey">
                        <div className="text-textGrey2 text-xl font-medium ">
                            Service History
                        </div>
                        <div className="flex gap-2">
                            <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid  border-borderGrey justify-start items-center gap-2 flex">
                                <Image src={downloadicon} alt="download" className="w-5 h-5" />
                            </div>
                            <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid border-borderGrey justify-start items-center gap-2 flex">
                                <Image src={baricon} alt="baricon" className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">

                    </div>
                    <div className="w-full max-h-[400px] overflow-y-auto">

                        {inventoryTimeline?.map((item: {
                            invoiceNo: any; id: React.Key | null | undefined; createdAt: string; quantityChange: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; stockChange: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; batchNumber: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; party: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; invoiceType: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined

                        }) => (
                            <div key={item.id} className="w-full border-b border-solid border-0 border-borderGrey flex items-start justify-between">
                                <div className="w-full flex p-2">
                                    <div className="w-full flex items-center">
                                        <div className="text-borderGrey text-base font-medium w-1/12 mr-10">
                                            {formatDateAndTime(item.createdAt).formattedDate}
                                        </div>
                                        <div className=" text-borderGrey text-base font-medium w-[5rem]">
                                            {formatDateAndTime(item.createdAt).formattedTime}
                                        </div>

                                        <div className="text-borderGrey text-base font-medium w-3/12">
                                            {item.party}
                                        </div>
                                        <div className="text-teal-400 text-sm font-medium  w-2/12">
                                            {item.invoiceNo ? item.invoiceNo : "Manual"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <div className="rounded-md">
                <div className="w-full mt-[25px] rounded-[10px] border-borderGrey border border-solid  ">
                    <div className="w-full flex p-6 bg-white items-start justify-between border-0 border-b border-solid border-borderGrey rounded-md">
                        <div className="text-textGrey2 text-xl font-medium ">
                            Product List
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-evenly  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-borderGrey text-textGrey2'>
                            <div className='flex text-textGrey2 text-base font-medium  w-[10rem]'>Product</div>
                            <div className='flex text-textGrey2 text-base font-medium  w-[10rem]'>Item Quantity</div>
                            <div className='flex text-textGrey2 text-base font-medium  w-[10rem]'>Batch Number</div>
                            <div className='flex text-textGrey2 text-base font-medium  w-[10rem]'>Expiry Date</div>
                            <div className='flex text-textGrey2 text-base font-medium  w-[10rem]'>Cost Price</div>
                            <div className='flex text-textGrey2 text-base font-medium  w-[10rem]'>Selling Price</div>
                            <div className='flex text-textGrey2 text-base font-medium  w-[10rem]'>Stock Level</div>
                        </div>
                        {loading && <Loading2 />}
                        {productDetails?.map((item: any) => (
                            item?.productBatches?.map((batch: any) => (
                                <div key={batch?.id} className='flex items-center justify-evenly w-full box-border py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5'>
                                    <div className='w-[10rem]  flex text-textGrey2 text-base font-medium'>{item?.itemName}</div>
                                    <div className='w-[10rem]  flex text-textGrey2 text-base font-medium'>{item?.totalQuantity}</div>
                                    <div className='w-[10rem]  flex text-textGrey2 text-base font-medium'>{batch?.batchNumber}</div>
                                    <div className='w-[10rem]  flex text-textGrey2 text-base font-medium'>{formatDateAndTime(batch?.expiry).formattedDate}</div>
                                    <div className='w-[10rem]  flex text-textGrey2 text-base font-medium'>₹{batch?.costPrice}</div>
                                    <div className='w-[10rem]  flex text-textGrey2 text-base font-medium'>₹{batch?.sellingPrice}</div>
                                    <div className='w-[10rem]  flex text-textGrey2 text-base font-medium'>{item?.stockLevel}</div>
                                </div>
                            ))
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ServiceDetails;


