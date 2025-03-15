"use client"
import Image from "next/image"
import lefticon from "../../../../assets/icons/inventory/left_icon.svg"
import optionicon from "../../../../assets/icons/inventory/more_vert.svg"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import formatDateAndTime from "@/utils/formateDateTime";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation"
import CreatableSelect from 'react-select/creatable';
import { useAppSelector } from "@/lib/hooks"
import useSWR from "swr"
import Loading2 from "@/app/loading2"
import Select from 'react-select';
import axios from "axios"
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

interface ServiceCategory {
    id: string,
    name: string | string[],
}


interface TaxType {
    id: number;
    name: number[];
}





const ServiceDetails = () => {


    const router = useRouter();

    const [service, setService] = useState<any | null>(null);
    const [editService, setEditService] = useState<any | null>(null);
    const [inventoryTimeline, setInventoryTimeline] = useState<any | null>(null);
    const url = useSearchParams();
    const id = url.get('id');
    const appState = useAppSelector((state) => state.app)
    const { fetchedService, isLoading, error } = useServicefetch(id, appState.currentBranchId);
    const [value, setValue] = useState(30);
    const [productOptions, setProductOptions] = useState<any | null>(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [totalSales, setTotalSales] = useState<number | null>(null);
    const [avgCost, setAvgCost] = useState<number | null>(null);
    const [margin, setMargin] = useState<number | null>(null);
    const [isSameLinkProductUnderEdit, setIsSameLinkProductUnderEdit] = useState(false);
    const { fetchedServiceTimeLine, serviceLoading, serviceError } = useServiceTimeLine(id, appState.currentBranchId)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    useEffect(() => {
        if (!error && !isLoading && fetchedService) {
            console.log(fetchedService);
            setTotalSales(
                fetchedService?.items?.reduce((acc: any, e: any) => e.salesId ?  acc + Number(e.sellingPrice) * Number(e.quantity) : 0, 0) || 0
            );

            console.log(fetchedService);
            const totalSales = fetchedService?.items?.reduce(
                (acc: any, e: any) => e.salesId ?  acc + Number(e.sellingPrice) * Number(e.quantity) : 0,
                0
            ) || 0;

            const totalQuantity = fetchedService?.items?.reduce(
                (acc: any, e: any) => e.salesId ?  acc + Number(e.quantity) : 0,
                0
            ) || 1;

            setAvgCost(totalSales / totalQuantity);

            const calculateMargin = (fetchedService: any) => (
                ((fetchedService?.items?.reduce((acc: any, e: any) => e.salesId ?  acc + Number(e.sellingPrice) * Number(e.quantity):0, 0) || 0) -
                    (fetchedService?.items?.reduce((acc: any, e: any) => e.salesId ?  acc + Number(e.costPrice) * Number(e.quantity):0, 0) || 0)) /
                (fetchedService?.items?.reduce((acc: any, e: any) => e.salesId ?  acc + Number(e.sellingPrice) * Number(e.quantity):0, 0) || 1) * 100
            ).toFixed(2);

            setMargin(Number(calculateMargin(fetchedService)));


            console.log(fetchedService);
            setService(fetchedService);
            setEditService(fetchedService);
        }
        if (!serviceError && !serviceLoading && fetchedServiceTimeLine) {
            console.log(fetchedServiceTimeLine[0]?.inventoryTimeline);
            setInventoryTimeline(fetchedServiceTimeLine[0]?.inventoryTimeline)
        }

    }, [fetchedService, error, isLoading, fetchedServiceTimeLine, serviceError, serviceLoading]
    );

    useEffect(() => {

        const fetchProductsAndProviders = async () => {
            if (service) {
                // console.log("inside fetch");
                const productsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/branch/products?branchId=${appState.currentBranchId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                let productsJson = await productsResponse?.json();
                const filteredProducts = (productsJson.products.filter((product: any) => !(product?.isDeleted)).map((product: any) => { return { label: product.itemName, value: product.id } }));
                console.log(service);
                const getAlreadyLinkedProductIds: any[] = [];
                service.linkProducts.map((product: any) => {
                    getAlreadyLinkedProductIds.push(product.value);
                });
                const unLinkedProducts = filteredProducts.filter((product: any) => !getAlreadyLinkedProductIds.includes(product.value));
                setProductOptions(unLinkedProducts);
            }
        }
        fetchProductsAndProviders();
    }, [service])



    const [categories, setCategories] = useState<any[]>([]);
    useEffect(() => {
        const fetchServiceCategory = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/serviceCategory/getAll?branchId=${appState.currentBranchId}`);
                const serviceCategoryList: any[] = response.data.reduce((acc: any[], serviceCategoryEntry: ServiceCategory) => {
                    if (Array.isArray(serviceCategoryEntry.name)) {
                        serviceCategoryEntry.name.forEach((name: string) => {
                            acc.push({ value: serviceCategoryEntry.id, label: name });
                        });
                    } else {
                        acc.push({ value: serviceCategoryEntry.id, label: serviceCategoryEntry.name });
                    }
                    return acc;
                }, []);
                console.log(response, serviceCategoryList);
                setCategories(serviceCategoryList);
            } catch (error) {
                console.log("Error fetching species", error);
            }
        }
        fetchServiceCategory();
    }, [appState.currentBranchId]);

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
                console.log("Product Details", productDetails);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            }
            setLoading(false);
        };

        if (productIds?.length > 0) {
            fetchProductDetails();
        }
    }, [service?.linkProducts, appState.currentBranchId]);

    const [taxType, settaxType] = useState<any[]>([]);
    useEffect(() => {
        const fetchTax = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/taxType/getAll?branchId=${appState.currentBranchId}`);
                const taxTypeList: any[] = response.data.reduce((acc: any[], taxTypeEntry: TaxType) => {
                    if (Array.isArray(taxTypeEntry.name)) {
                        taxTypeEntry.name.forEach((taxValue: number) => {
                            acc.push({
                                value: taxValue,
                                label: `${taxValue}% GST`
                            });
                        });
                    }
                    return acc;
                }, []);
                console.log(taxTypeList);
                settaxType(taxTypeList);
            } catch (error) {
                console.log("Error fetching species", error);
            }
        }
        fetchTax();
    }, [appState.currentBranchId]);


    const handleEditSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsUpdating(true);
    
            // Use only the edited linkProducts if available; otherwise, keep the existing ones
            const linkProducts = Array.isArray(editService?.linkProducts)
                ? editService.linkProducts
                : JSON.parse(service?.linkProducts || "[]");
    
            const data = {
                ...(editService?.name && { name: editService?.name }),
                ...(editService?.sacCode && { sacCode: editService?.sacCode }),
                ...(editService?.description && { description: editService?.description }),
                ...(editService?.serviceCharge && { serviceCharge: editService?.serviceCharge }),
                ...(editService?.tax && { tax: Number(editService?.tax) }),
                ...(editService?.category && { category: editService?.category }),
                ...(linkProducts.length > 0 && { linkProducts }), // Only include if not empty
            };
    
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/${id}?branchId=${appState.currentBranchId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
    
            if (response.ok) {
                alert("Service updated successfully!");
                setShowEditPopup(false);
                //router.push('/inventory/services/timeline');
            } else {
                const errorResponse = await response.json();
                alert("Failed to update service!");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while updating!");
        } finally {
            setIsUpdating(false);
        }
    };
    


    const handleDelete = async () => {

        //console.log("service name is : ", service);
        try {
            setIsDeleting(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/${id}?branchId=${appState.currentBranchId}`,
                {
                    method: "DELETE",
                }
            );
            //console.log("response:",response);
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
    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            width: '100%',
            maxWidth: '100%',
            border: state.isFocused ? '1px solid #35BEB1' : '#C4C4C4',
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

    const [LinkProducterror, setLinkProductError] = useState<string | null>(null);




    console.log("service", service)
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
                        <PopoverContent className="p-5 bg-white text-sm font-medium rounded-lg border-2">
                            <div className="flex space-x-4">
                                {/* Delete Button */}
                                {!(showDeletePopup || showEditPopup) ?
                                    <>
                                        <button
                                            className="flex outline-none items-center gap-2 p-2 text-sm font-medium bg-teal-500 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out border-none"
                                            onClick={() => setShowDeletePopup(true)} // Opens the delete popup
                                        >

                                            Delete
                                        </button>


                                        <button
                                            className="flex items-center gap-2 p-2 text-sm font-medium bg-teal-500 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out border-none"
                                            onClick={() => setShowEditPopup(true)} // Opens the edit popup
                                        >
                                            Edit
                                        </button>
                                    </>
                                    : ""}

                                {/* Delete Popup */}
                                {showDeletePopup && (
                                    <div className=" flex items-center justify-center  bg-opacity-50 z-50">
                                        <div className="bg-white rounded-lg p-6 w-[600px] h-[200px] shadow-lg flex flex-col justify-between">
                                            <h2 className="text-xl font-semibold text-gray-500">
                                                Deleting Service
                                            </h2>
                                            <p className="text-sm text-gray-600">
                                                Are you sure you want to permanently delete{" "}
                                                <span className="font-medium text-gray-600">
                                                    {service?.name || "this service"}
                                                </span>
                                                ?
                                            </p>
                                            <div className="flex justify-end gap-4 mt-4">
                                                <button
                                                    className="px-4 py-2 outline-none border border-solid border-neutral-500 rounded-md bg-teal-500 text-white text-sm hover:bg-teal-600"
                                                    onClick={() => setShowDeletePopup(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className={`px-4 py-2 border border-solid border-neutral-500 outline-none rounded-md text-white text-sm ${isDeleting
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-black hover:bg-gray-800"
                                                        }`}
                                                    onClick={handleDelete}
                                                    disabled={isDeleting}
                                                >
                                                    {isDeleting ? <Loading2 /> : "Delete"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Edit Service Popup */}
                                {showEditPopup && (
                                    <div
                                        className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50"
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
                                                        className="w-full outline-none border border-solid text-gray-500 border-gray-300 rounded-lg px-4 py-2 mt-1"
                                                        value={editService?.name || ""}
                                                        //placeholder={service?.name}
                                                        onChange={(e) =>
                                                            setEditService((prev: any) => ({
                                                                ...prev,
                                                                name: e.target.value,
                                                            }))
                                                        }
                                                    />
                                                </div>

                                                {/* SAC Code Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">SAC Code*</label>
                                                    <input
                                                        type="text"
                                                        className="w-full outline-none border border-solid text-gray-500 border-gray-300 rounded-lg px-4 py-2 mt-1"
                                                        value={editService?.sacCode || ""}
                                                        //placeholder={service?.sacCode}
                                                        onChange={(e) =>
                                                            setEditService((prev: any) => ({
                                                                ...prev,
                                                                sacCode: e.target.value,
                                                            }))
                                                        }
                                                    />
                                                </div>

                                                {/* Description Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Description</label>
                                                    <textarea
                                                        className="w-full outline-none border border-solid text-gray-500 border-gray-300 rounded-lg px-4 py-2 mt-1"
                                                        value={editService?.description || ""}
                                                        //placeholder={service?.description}
                                                        onChange={(e) =>
                                                            setEditService((prev: any) => ({
                                                                ...prev,
                                                                description: e.target.value,
                                                            }))
                                                        }
                                                    />
                                                </div>

                                                {/* Selling Price Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Selling Price</label>
                                                    <input
                                                        type="number"
                                                        className="w-full outline-none border border-solid text-gray-500 border-gray-300 rounded-lg px-4 py-2 mt-1"
                                                        value={editService?.serviceCharge || ""}
                                                        //placeholder={service?.sellingPrice}
                                                        onChange={(e) =>
                                                            setEditService((prev: any) => ({
                                                                ...prev,
                                                                serviceCharge: e.target.value,
                                                            }))
                                                        }
                                                    />
                                                </div>




                                                {/* Tax Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Tax (%)</label>
                                                    <Select
                                                        className="rounded-[5px] text-gray-400 border border-solid border-borderGrey mt-2 text-base font-medium outline-none w-full"
                                                        placeholder="Select Tax"
                                                        isClearable={false}
                                                        isSearchable={true}
                                                        options={taxType}
                                                        isMulti={false}
                                                        name="tax"
                                                        onChange={(e: any) => setEditService((prev: any) => ({ ...prev, tax: e?.value }))}
                                                        styles={customStyles}
                                                        value={taxType.find((option) => option.value === (editService?.tax || service?.tax))}
                                                    />
                                                </div>



                                                {/* Category Field */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Category</label>
                                                    <CreatableSelect
                                                        className="text-neutral-400 text-base font-medium w-full border border-solid border-borderGrey rounded-[5px]"
                                                        placeholder="Select Category"
                                                        isClearable={false}
                                                        isSearchable={true}
                                                        options={categories}
                                                        isMulti={false}
                                                        name="category"
                                                        onChange={(e: any) => setEditService((prev: any) => ({ ...prev, category: e?.label }))}
                                                        styles={customStyles}
                                                        value={categories.find((option) => option.label === (editService?.category || service?.category))}
                                                    />
                                                </div>


                                                <div>
                                                    <label className="block text-gray-700 font-medium">Link Products</label>
                                                    {productOptions ? (
                                                        <Select
                                                            className="text-neutral-400 text-base font-medium w-full border border-solid border-borderGrey rounded-[5px]"
                                                            placeholder="Select Product"
                                                            isClearable={true}
                                                            isSearchable={true}
                                                            options={productOptions}
                                                            isMulti={true}
                                                            name="linkProduct"
                                                            onChange={(value) => setEditService((prev: any) => ({ ...prev, linkProducts: value }))}
                                                            styles={customStyles}

                                                        />
                                                    ) : (
                                                        <div className="text-neutral-400 text-base font-medium w-full"><Loading2 /></div>
                                                    )}
                                                </div>

                                                {/* Save and Cancel Buttons */}
                                                <div className="flex justify-end space-x-4 mt-6">
                                                    <button
                                                        type="button"
                                                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none border-none"
                                                        onClick={() => setShowEditPopup(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none border-none"
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
                        <div className="text-textGrey2 text-base font-medium ">Selling Price</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-r border-borderGrey flex-col justify-center items-start gap-4 flex">
                        <div className="text-textGrey2 text-[28px] font-bold ">₹{(totalSales || 0).toFixed(2)}</div>
                        <div className="text-textGrey2 text-base font-medium ">Total Sales</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-r border-borderGrey flex-col justify-center items-start gap-4 flex">
                        <div className="text-textGrey2 text-[28px] font-bold ">₹{(avgCost || 0).toFixed(2)}</div>
                        <div className="text-textGrey2 text-base font-medium ">Avg. Cost of products used</div>
                    </div>
                    <div className="w-3/12 p-6 bg-white border-t border-solid border-0 border-borderGrey flex-col justify-center items-start gap-4 flex rounded-b-xl">
                        <div className="text-textGrey2 text-[28px] font-bold ">{(margin || 0).toFixed(2)}%</div>
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
                        {/* <div className="w-6/12 p-6 flex items-center justify-between">
                            
                            <div className="w-[66px] h-7 px-2 py-1.5 bg-orange-50 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-orange-500 text-sm font-medium ">{isLoading ? <Loading2 /> : service?.sellingPrice}</div>
                            </div>
                        </div> */}
                    </div>
                    <div className="w-full border-b border-solid border-0 border-borderGrey">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-textGrey2 text-base font-medium ">Tax Rate:</div>
                            <div className="px-2 py-1.5 bg-gray-100 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-textGrey2 text-base font-medium ">{isLoading ? <Loading2 /> : service?.tax} %</div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="w-full">
                        <div className="w-full flex gap-2 items-center p-6 h-3/12">
                            <div className="text-textGrey2 text-base font-medium ">Providers:</div>
                            <div className="px-2 py-1.5 bg-gray-100 rounded-[5px] justify-center items-center gap-2 flex">
                                <div className="text-textGrey2 text-base font-medium ">{isLoading ? <Loading2 /> : service?.providers?.join(", ")}</div>
                            </div>

                        </div>
                    </div> */}
                </div>
                <div className="w-6/12 bg-white mt-[25px] rounded-[10px] border border-solid border-borderGrey flex  flex-col">
                    <div className="w-full flex p-6 items-start justify-between border-0 border-b  border-solid border-borderGrey">
                        <div className="text-textGrey2 text-xl font-medium ">
                            Service History
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
                            <div className='flex text-textGrey2 text-base font-medium  w-[10rem]'>Batch Quantity</div>
                            <div className='flex text-textGrey2 text-base font-medium  w-[10rem]'>Batch Number</div>
                            <div className='flex text-textGrey2 text-base font-medium  w-[10rem]'>Expiry Date</div>
                            <div className='flex text-textGrey2 text-base font-medium  w-[10rem]'>Cost Price</div>
                            <div className='flex text-textGrey2 text-base font-medium  w-[10rem]'>Selling Price</div>
                        </div>
                        {loading && <Loading2 />}
                        {productDetails?.map((item: any) => (
                            item?.productBatches?.map((batch: any) => (
                                <div key={batch?.id} className='flex items-center justify-evenly w-full box-border py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5'>
                                    <div className='w-[10rem]  flex text-textGrey2 text-base font-medium'>{item?.itemName}</div>
                                    <div className='w-[10rem]  flex text-textGrey2 text-base font-medium'>{batch?.quantity}</div>
                                    <div className='w-[10rem]  flex text-textGrey2 text-base font-medium'>{batch?.batchNumber}</div>
                                    <div className='w-[10rem]  flex text-textGrey2 text-base font-medium'>{formatDateAndTime(batch?.expiry).formattedDate}</div>
                                    <div className='w-[10rem]  flex text-textGrey2 text-base font-medium'>₹{batch?.costPrice}</div>
                                    <div className='w-[10rem]  flex text-textGrey2 text-base font-medium'>₹{batch?.sellingPrice}</div>
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


