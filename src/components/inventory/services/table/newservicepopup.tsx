"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import closeicon from "../../../../assets/icons/inventory/closeIcon.svg";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useAppSelector } from '@/lib/hooks';
import Arrow from "../../../../assets/icons/inventory/arrow.svg"
import Loading2 from "@/app/loading2";
import capitalizeFirst from "@/utils/capitiliseFirst";
import axios from 'axios';
import useSWR from "swr";
const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())
type PopupProps = {
    onClose: () => void;
}

interface TaxType {
    id: number;
    name: number[];
}

interface ServiceCategory{
    id: string,
    name: string | string[],
}

const Popup: React.FC<PopupProps> = ({ onClose }: any) => {
    const [lastStep, setLastStep] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const appState = useAppSelector((state) => state.app)
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [Providers, setProviders] = useState([]);
    const [LinkProducts, setLinkProducts] = useState([]);
    const [nameError, setNameError] = useState('');
    const [serviceCostError, setServiceCostError] = useState('');
    const [taxError, setTaxError] = useState('');
    const [loading,setLoading]=useState(false);
    const [selectedProducts, setSelectedProducts] = useState<any>([]);
    const [productOptions, setProductOptions] = useState([]);
    const { data:serviceData, error:serviceError, isLoading:serviceLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true })
    const [taxType, settaxType] = useState<any[]>([]);
    const [serviceList,setServiceList]=useState<any[]>([]);
    useEffect(() => {
        const fetchTax = async()=>{
            try{
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
            }catch(error){
                console.log("Error fetching species",error);
            }
        }
        fetchTax();
    }, [appState.currentBranchId]);

    useEffect(()=>{
        if(serviceData && !serviceError && !serviceLoading){
            console.log(serviceData);
            setServiceList(serviceData);
        }
    },[serviceData,serviceError,serviceLoading])

    const [categories, setCategories] = useState<any[]>([]);
    useEffect(() => {
        const fetchServiceCategory = async()=>{
            try{
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
                console.log(response,serviceCategoryList);
                setCategories(serviceCategoryList);
            }catch(error){
                console.log("Error fetching species",error);
            }
        }
        fetchServiceCategory();
    }, [appState.currentBranchId]);

    useEffect(() => {
        fetchProductsAndProviders();
    }, []);


    const handleContinueClick = () => {
        if (formData.name) {
            setLastStep(true);
        }
    }

    const fetchProductsAndProviders = async () => {
        // console.log("inside fetch");
        const productsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/branch/products?branchId=${appState.currentBranchId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let productsJson = await productsResponse?.json();
        // console.log(productsJson);
        const staffResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/branch/staff?branchId=${appState.currentBranchId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let staffJson = await staffResponse.json();
        // console.log(staffJson);
        // console.log(productsJson.products);
        setProductOptions(productsJson.products.map((product: any) => { return { label: product.itemName, value: product.id } }));
        setProviders(staffJson.staff.map((user: any) => { return { label: user.name, value: user.id } }));
    }

    const handleProductSelect = (selectedOptions: any) => {
        setSelectedProducts(selectedOptions);
    };

    const handleProductRemove = (productId: any) => {
        setSelectedProducts(selectedProducts?.filter((product: any) => product.value !== productId));
    };

    const handleSaveClick = async () => {
        // console.log("Save Button");
        if (!formData.name || !formData.tax) {
            if (!formData.name) {
                setNameError('Service name is required');
            }
            // if (!formData.serviceCost) {
            //     setServiceCostError('Service cost is required');
            // }
            if (!formData.tax) {
                setTaxError('Tax is required');
            }
            return; // Stop the function from proceeding if validation fails
        }
        try {
            setLoading(true);
            // setButtonDisabled(true);
            // console.log("Form data is valid:", formData);
            // const selectedProviders = formData.providers.map((provider:any) => provider.label);
            // const selectedProducts = formData.linkProducts.map((linkProducts:any) => linkProducts.label);
            const selectedProviders = Array.isArray(Providers)
                ? Providers.map((provider: any) => provider.label)
                : [];
            // const selectedProducts1 = Array.isArray(formData.selectedProducts) 
            //     ? formData.selectedProducts.map((product: any) => product.label) 
            //     : [];

            //console.log(formData);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/create?branchId=${appState.currentBranchId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    providers: selectedProviders,
                    sellingPrice: parseInt(formData.sellingPrice),
                    sacCode: formData.sacCode,
                    linkProducts: (selectedProducts),
                    serviceCost: parseInt(formData.serviceCost),
                    serviceCharge: parseInt(formData.serviceCharge),
                    tax: formData.tax ? formData.tax.value : undefined,
                    category: formData.category ? formData.category[0].label : undefined,
                    description: formData.description,
                }),
            });

            if (response.ok) {
                console.log('Data saved successfully');
                onClose();
                window.dispatchEvent(new FocusEvent('focus'));
            } else {
                console.error('Failed to save data:', response.statusText);
            }
        } catch (error) {
            console.error('Error while saving data:', error);
        }
        finally{
            setLoading(false);
        }
    };
    const handleChange = (field: string, value: any) => {
        setFormData((prevState: any) => {
            const updatedFormData = { ...prevState, [field]: value };

            // Validation
            if (field === 'name') {
                const isServiceExists = serviceList?.some((service: any) => service.name === value);
                console.log(isServiceExists);
                setNameError(isServiceExists ? 'The service name  you are trying to add already exists' : value ? '' : 'Service name is required');
                
            }

            if (field === 'serviceCost') {
                setServiceCostError(value ? '' : 'Service cost is required');
            }

            if (field === 'tax') {
                setTaxError(value ? '' : 'Tax is required');
            }

            // Check if all required fields are filled
            const allFieldsFilled = updatedFormData.name && updatedFormData.serviceCost && updatedFormData.tax;
            setButtonDisabled(!allFieldsFilled);

            return updatedFormData;
        });
    };


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



    return <>
        {!lastStep &&
            <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
                <div className=" min-h-[500px] px-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex ">
                    <div className="self-end items-start gap-6 flex py-2">
                        <button onClick={onClose} className="border-0 outline-none cursor-pointer">
                            <Image src={closeicon} alt="close"></Image>
                        </button>
                    </div>
                    <div className="text-gray-500 text-xl font-medium ">New Service</div>
                    <div className="text-neutral-400 text-base font-medium ">Introduce a new Service</div>
                    <div className="flex items-center gap-[88px]">
                        <div className="text-gray-500 text-base font-medium ">Name<span className="text-red-500">*</span></div>
                        <div>
                            <input className="w-[440px] h-9  text-neutral-400 text-base font-medium  px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="name" onChange={(e) => {
                                const value = e.target.value;
                                e.target.value = value.charAt(0).toUpperCase() + value.slice(1);
                                handleChange("name", e.target.value);
                            }} />
                            {nameError && (
                                <div className="text-red-500 text-sm mt-1">{nameError}</div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-[61px]">
                        <div className="text-gray-500 text-base font-medium ">SAC Code</div>
                        <div>
                            <input className="w-[440px] h-9 text-neutral-400 text-base font-medium  px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="sacCode" onChange={(e) => handleChange("sacCode", e.target.value)} />
                        </div>
                    </div>
                    <div className="flex-col">
                        <div className="text-gray-500 text-base font-medium ">Description</div>
                        <textarea className="px-2 py-2 w-[576px] h-[88px] mt-[8px]  text-neutral-400 text-base font-medium focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-[#35BEB1]" id="description" name="description" placeholder="Provide details of the service" onChange={(e) => handleChange("description", e.target.value)} />

                        {/* <input className="w-[576px] h-[88px] mt-[8px]" placeholder="Provide details of the service" type="text" name="description" onChange={(e) => handleChange("description", e.target.value)} /> */}
                    </div>
                    <div className="self-end items-start gap-4 flex mb-4">
                        {/* <button onClick={handleContinueClick} className="px-4 py-2.5 bg-bg-zinc-900 rounded-[5px] justify-start items-center gap-1 flex border-0 outline-none cursor-pointer">
                            <div className="text-white text-base font-bold ">Continue</div>
                            <div className="w-6 h-6">
                                <Image src={Arrow} alt="Arrow" />
                            </div>
                        </button> */}
                        <button
                            onClick={handleContinueClick}
                            disabled={!formData.name}
                            className={`px-4 py-2.5 rounded-[5px] justify-start items-center gap-1 flex border-0 outline-none cursor-pointer ${formData.name ? "bg-zinc-900" : "bg-gray-500"
                                }`}
                        >
                            <div className={`text-base font-bold ${formData.name ? "text-white" : "text-neutral-200 cursor-not-allowed"}`}>
                                Continue
                            </div>
                            {formData.name && (
                                <div className="w-6 h-6">
                                    <Image src={Arrow} alt="Arrow" />
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        }
        {lastStep &&
            <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
                <div className="w-[640px] h-[543px]  p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex overflow-auto container">

                    <button className="self-end items-center gap-6 flex border-0 rounded outline-none cursor-pointer hover:shadow transition" onClick={onClose}>
                        <Image src={closeicon} alt="close"></Image>
                    </button>

                    <div className="text-gray-500 text-xl font-medium ">New Service</div>
                    <div className="text-neutral-400 text-base font-medium ">Configure your service</div>
                    <div className="flex justify-between items-center  w-full">
                        <div className="flex gap-[52px] items-center">
                            <div className="text-gray-500 text-base font-medium ">Selling Price <span className="text-red-500">*</span></div>

                            <input className="w-[157px] h-9 text-neutral-400 text-base font-medium  px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-[#35BEB1]" type="number" name="serviceCharge" onChange={(e) => handleChange("serviceCharge", e.target.value)} />
                            {serviceCostError && (
                                <div className="text-red-500 text-sm mt-1">{serviceCostError}</div>
                            )}
                        </div>
                        <div className="flex items-center gap-[16px]">
                            <div className="text-gray-500 text-base font-medium ">Tax<span className="text-red-500">*</span></div>

                            <Select
                                className="w-[157px] text-neutral-400 text-base font-medium border border-solid border-borderGrey rounded-[5px]"
                                // defaultValue={gstOptions[0]}
                                isClearable={false}
                                isSearchable={true}
                                options={taxType}
                                isMulti={false}
                                name="tax"
                                onChange={(value) => handleChange("tax", value)}
                                styles={customStyles}
                            />
                            {taxError && (
                                <div className="text-red-500 text-sm mt-1">{taxError}</div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-[79px] w-full ">
                        <div className="text-gray-500 text-base font-medium ">Category</div>
                        <div className="w-full">
                            {/* <Select
                                className="w-[157px] text-neutral-400 text-base font-medium focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-[#35BEB1]"
                                placeholder="Select Cate.."
                                isClearable={false}
                                isSearchable={true}
                                options={gstOptions}
                                name="category"
                            onChange={(value) => handleChange("category", value)}
                            /> */}
                            <Select
                                className="text-neutral-400 text-base font-medium w-full border border-solid border-borderGrey rounded-[5px]"
                                placeholder="Select Category"
                                isClearable={false}
                                isSearchable={true}
                                options={categories}
                                isMulti={true}
                                name="category"
                                onChange={(value) => handleChange("category", value)}
                                styles={customStyles}
                            />
                        </div>
                    </div>
                    {/* <div className="flex items-center gap-[75px] w-full">
                        <div className="text-gray-500 text-base font-medium ">Providers</div>
                        <div className="w-4/5">
                            <Select
                                className=" text-neutral-400 text-base font-medium border border-solid border-borderGrey rounded-[5px] w-full"
                                placeholder="Select clinic staff"
                                isClearable={false}
                                isSearchable={true}
                                options={Providers}
                                isMulti={true}
                                name="providers"
                                onChange={(value) => handleChange("providers", value)}
                                styles={customStyles}
                            />
                        </div>
                    </div> */}
                    <div className="flex items-center gap-[22px] w-full ">
                        <div className="text-gray-500 text-base font-medium w-[8rem]">Link Product(s)</div>
                        <div className="w-4/5">
                            {/* <Select
                                className="text-neutral-400 text-base font-medium border border-solid border-borderGrey rounded-[5px] w-full"
                                isClearable={false}
                                isSearchable={true}
                                options={LinkProducts}
                                isMulti={true}
                                name="linkProducts"
                                onChange={(value) => handleChange("linkProducts", value)}
                                styles={customStyles}
                            /> */}
                            {productOptions ? (
                                <Select
                                    className="text-neutral-400 text-base font-medium w-full border border-solid border-borderGrey rounded-[5px]"
                                    placeholder="Select Product"
                                    isClearable={true}
                                    isSearchable={true}
                                    options={productOptions}
                                    isMulti={true}
                                    name="linkProduct"
                                    onChange={(value) => handleProductSelect(value)}
                                    styles={customStyles}
                                />
                            ) : (
                                <div className="text-neutral-400 text-base font-medium w-full"><Loading2 /></div>
                            )}
                        </div>
                    </div>
                    <div className='w-full bg-white rounded-[5px] flex flex-col border border-solid border-borderGrey '>
                        <div className='w-full h-9 bg-[#F4F5F7] flex justify-evenly items-center text-textGrey2 rounded-tl-[5px] rounded-tr-[5px] border-0 border-b border-solid border-borderGrey'>
                            <div className='w-[10rem] text-textGrey2 font-medium text-base'>Name</div>
                            {/* <div className='w-[8rem] text-textGrey2 font-medium text-base'>Selling Price</div> */}
                            <div className='w-[10rem] text-textGrey2 font-medium text-base'>Quantity</div>
                            {/* <div className='w-[3rem] text-textGrey2 font-medium text-base'></div> */}
                        </div>
                        <div className='w-full h-[5rem] overflow-y-auto container'>
                            {selectedProducts.map((product: any) => (
                                <div
                                    key={product.value}
                                    className="w-full h-9 flex justify-evenly items-center text-textGrey2 border-0 border-b border-solid border-borderGrey"
                                >
                                    <div className="w-[10rem] text-textGrey2 font-medium text-base">{product.label}</div>
                                    {/* <div className="w-[8rem] text-textGrey2 font-medium text-base">₹ {product.price}</div> */}
                                    <div className="w-[10rem] text-textGrey2 font-medium text-base">1</div>
                                    {/* <div
                        className="w-[3rem] text-textGrey2 font-medium text-base flex justify-center items-center cursor-pointer"
                        onClick={() => handleProductRemove(product.value)}
                        >
                        <Image className="w-4 h-4" src={closeicon} alt="Delete" />
                        </div> */}
                                </div>
                            ))}


                        </div>

                    </div>
                    <div className="self-end items-start gap-6 flex">
                    <button
                            onClick={handleSaveClick}
                            disabled={!formData.serviceCharge || !formData.tax || loading}
                            className={`px-4 py-2.5 rounded-[5px] justify-start items-center gap-1 flex border-0 outline-none cursor-pointer ${formData.name ? "bg-zinc-900" : "bg-gray-500"
                                }`}
                        >
                            <div className={`text-base font-bold ${(formData.serviceCharge && formData.tax) ? "text-white" : "text-neutral-200 cursor-not-allowed"}`}>
                                {loading ? <Loading2 /> : "Save"}
                            </div>
                            {(formData.serviceCharge && formData.tax) && (
                                <div className="w-6 h-6">
                                    <Image src={Arrow} alt="Arrow" />
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        }
    </>
}

export default Popup;
