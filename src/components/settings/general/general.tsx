"use client"
import Image from "next/image"
import Select from 'react-select';
import { Popover, PopoverTrigger, PopoverContent, Button, button } from "@nextui-org/react";
import orgicon from "../../../assets/icons/settings/orgicon.svg"
import settingicon from "../../../assets/icons/settings/settingicon.svg"
import previewicon from "../../../assets/icons/settings/previewicon.svg"
import lefticon from "../../../assets/icons/settings/left_icon.svg"
import downicon from "../../../assets/icons/settings/downicon.svg"
import smsicon from "../../../assets/icons/settings/smsicon.svg"
import whatshapicon from "../../../assets/icons/settings/whatshapicon.svg"
import mailicon from "../../../assets/icons/settings/mailicon.svg"
import tickicon from "../../../assets/icons/settings/tickicon.svg"
import crossicon from "../../../assets/icons/settings/crossicon.svg"
import addicon from "../../../assets/icons/settings/addicon.svg"
import cashicon from "../../../assets/icons/settings/cashicon.svg"
import cardicon from "../../../assets/icons/settings/cardicon.svg"
import netbankingicon from "../../../assets/icons/settings/netbankingicon.svg"
import upiicon from "../../../assets/icons/settings/upiicon.svg"
import editicon from "../../../assets/icons/settings/editicon.svg"
import deleteicon from "../../../assets/icons/settings/deleteicon.svg"
import React, { useState, useEffect } from 'react';
import AddSpeciesPopup from "../generalSettingPopup/addSpeciesPopup";
import AddPaymentPopup from "../generalSettingPopup/addPaymentPopup";
import Loading from "@/app/loading1";
import { useAppSelector } from "@/lib/hooks";
import useSWR from "swr";
import AddItemCategoryPopup from "../generalSettingPopup/addItemCategoryPopup";
import AddReasons from "../generalSettingPopup/addReason";
import AddTaxType from "../generalSettingPopup/addTaxTypePopup";
import AddServiceCategory from "../generalSettingPopup/addServiceCategory";
import AddItemUnit from "../generalSettingPopup/addUnitPopup";
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())


  
const GeneralSettings = () => {
    
    
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup1, setShowPopup1] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showPopup3, setShowPopup3] = useState(false);
    const [showPopup4, setShowPopup4] = useState(false);
    const [showPopup5, setShowPopup5] = useState(false);
    const [showPopup6, setShowPopup6] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }
    const togglePopup1 = () => {
        setShowPopup1(!showPopup1);
    }
    const togglePopup2 = () => {
        setShowPopup2(!showPopup2);
    }

    const togglePopup3 = () => {
        setShowPopup3(!showPopup3);
    }

    const togglePopup4 = () => {
        setShowPopup4(!showPopup4);
    }

    const togglePopup5 = () => {
        setShowPopup5(!showPopup5);
    }

    const togglePopup6 = () => {
        setShowPopup6(!showPopup6);
    }

    const reminder = [
        { value: 'Everyday', label: 'Everyday' },
        { value: 'Once a Week', label: 'Once a Week' },
        { value: 'Once a month.', label: 'Once a month' }
    ];

    const [samedayToggle, setSamedayToggle] = useState(true);
    const [threedayToggle, setThreedayToggle] = useState(false);
    const [oneWeekToggle, setOneWeekToggle] = useState(false);
    const [smsToggle, setSmsToggle] = useState(false);
    const [mailToggle, setMailToggle] = useState(false);
    const [whatsappToggle, setWhatsappToggle] = useState(false);
    const [taxIncToggle, setTaxIncToggle] = useState(true);
    const [taxExcToggle, settaxExcToggle] = useState(false);

    const taxIncToggleHandler = () => {
        if (!taxIncToggle) {
            setTaxIncToggle(!taxIncToggle);
            settaxExcToggle(!taxExcToggle);
        }
    };

    const taxExcToggleHandler = () => {
        if (!taxExcToggle) {
            setTaxIncToggle(!taxIncToggle);
            settaxExcToggle(!taxExcToggle);
        }
    };


    const sameDayToggleHandler = () => {
        if (!samedayToggle) {
            setSamedayToggle(!samedayToggle);
            if (threedayToggle) {
                setThreedayToggle(!threedayToggle);
            }
            if (oneWeekToggle) {
                setOneWeekToggle(!oneWeekToggle);
            }
        }
    };

    const threeDayToggleHandler = () => {
        if (!threedayToggle) {
            setThreedayToggle(!threedayToggle);
            if (samedayToggle) {
                setSamedayToggle(!samedayToggle);
            }
            if (oneWeekToggle) {
                setOneWeekToggle(!oneWeekToggle);
            }
        }
    };

    const weekToggleHandler = () => {
        if (!oneWeekToggle) {
            setOneWeekToggle(!oneWeekToggle);
            if (samedayToggle) {
                setSamedayToggle(!samedayToggle);
            }
            if (threedayToggle) {
                setThreedayToggle(!threedayToggle);
            }
        }
    };

    const smsToggleHandler = () => {
        setSmsToggle(!smsToggle);
    };

    const mailToggleHandler = () => {
        setMailToggle(!mailToggle);
    };

    const whatsappToggleHandler = () => {
        setWhatsappToggle(!whatsappToggle);
    };
    
    const handleSaveClick = () => {
        const selectedModes: string[] = [];
      
        if (smsToggle) {
          selectedModes.push('SMS');
        }
        if (mailToggle) {
          selectedModes.push('Email');
        }
        if (whatsappToggle) {
          selectedModes.push('WhatsApp');
        }
      
        if (selectedModes.length > 0) {
          localStorage.setItem('selectedCommunicationModes', JSON.stringify(selectedModes));
          alert(`${selectedModes.join(', ')} modes have been saved and will be used for invoices.`);
        } else {
          alert('Please select at least one mode of communication before saving.');
        }
    };
      
    
      
    const [paymentMethod, setPaymentMethod] = useState([]);
    const appState  = useAppSelector((state) => state.app)
    const {data, error, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/getAll?branchId=${appState.currentBranchId}`,fetcher,{revalidateOnFocus:true});
    useEffect(() => {
        if(!isLoading&&!error&&data){
            setPaymentMethod(data)
        }
    }, [data,error,isLoading]);

    //item categories
    const [itemCategories, setItemCategories] = useState([]);
    const {data: itemCategoryData, error: itemCategoryError, isLoading: isLoadingItemCategories} = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/itemCategory/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true } 
    );
    useEffect(() => {
        if (!isLoadingItemCategories && !itemCategoryError && itemCategoryData) {
            setItemCategories(itemCategoryData); 
        }
    }, [itemCategoryData, itemCategoryError, isLoadingItemCategories]);

    //item Units
    const [itemUnits, setItemUnits] = useState([]);
    const {data: itemUnitsData, error: itemUnitsError, isLoading: isLoadingItemUnits} = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/itemUnit/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true } 
    );
    useEffect(() => {
        if (!isLoadingItemUnits && !itemUnitsError && itemUnitsData) {
            setItemUnits(itemUnitsData); 
        }
    }, [itemUnitsData, itemUnitsError, isLoadingItemUnits]);

    //Reasons
    const [reasons, setReasons] = useState([]);
    const {data: reasonsData, error: reasonsError, isLoading: isLoadingreasons} = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/reason/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true } 
    );
    useEffect(() => {
        if (!isLoadingreasons && !reasonsError && reasonsData) {
            setReasons(reasonsData); 
        }
    }, [reasonsData, reasonsError, isLoadingreasons]);

    //tax type
    const [taxType, settaxType] = useState([]);
    const {data: taxTypeData, error: taxTypeError, isLoading: isLoadingtaxType} = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/serviceCategory/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true } 
    );
    useEffect(() => {
        if (!isLoadingtaxType && !taxTypeError && taxTypeData) {
            settaxType(taxTypeData); 
        }
    }, [taxTypeData, taxTypeError, isLoadingtaxType]);

    //serviceCategory
    const [serviceCategory, setserviceCategory] = useState([]);
    const {data: serviceCategoryData, error: serviceCategoryError, isLoading: isLoadingserviceCategory} = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/serviceCategory/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true } 
    );
    useEffect(() => {
        if (!isLoadingserviceCategory && !serviceCategoryError && serviceCategoryData) {
            setserviceCategory(serviceCategoryData); 
        }
    }, [serviceCategoryData, serviceCategoryError, isLoadingserviceCategory]);

    //species
    const [species, setspecies] = useState([]);
    const {data: speciesData, error: speciesError, isLoading: isLoadingspecies} = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/serviceCategory/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true } 
    );
    useEffect(() => {
        if (!isLoadingspecies && !speciesError && speciesData) {
            setspecies(speciesData); 
        }
    }, [speciesData, speciesError, isLoadingspecies]);



    return (
    <>
        <div className="w-full h-full mt-4">
            <div className="w-full flex-col justify-start items-start gap-[20px] flex">
                <div className="w-full p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 flex-col justify-center items-start gap-6 flex text-gray-500 text-xl font-medium ">
                    General Settings
                </div>
                <div className="w-full px-4 py-5 bg-gray-100 border border-neutral-400 flex-col justify-start items-start gap-4 flex">
                    <div className="w-full px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                        <div className="w-full flex justify-between items-start">
                            <div>
                                <div className="text-gray-500 text-base font-bold ">Client Communication Preferences</div>
                                <div className="text-neutral-400 text-base font-medium ">Edit settings related to client communication</div>
                            </div>
                            
                        </div>
                        
                        <div>
                            <div className="text-gray-500 text-base font-medium ">Automatically send invoices and receipts to customer via:</div>
                            <div className="flex gap-2">
                                {smsToggle && (<button onClick={smsToggleHandler}><div className="w-[73px] h-7 p-2 bg-teal-400 rounded-[5px] border border-white justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={smsicon} alt="sms" />
                                    <div className="text-white text-sm font-bold ">SMS</div>
                                </div></button>)}
                                {!smsToggle && (<button onClick={smsToggleHandler}><div className="w-[67px] h-7 p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={smsicon} alt="sms" />
                                    <div className="text-neutral-400 text-sm font-bold ">SMS</div>
                                </div></button>)}
                                {mailToggle && (<button onClick={mailToggleHandler}><div className="w-[73px] h-7 p-2 bg-teal-400 rounded-[5px] border border-white justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={mailicon} alt="sms" />
                                    <div className="text-white text-sm font-bold ">Mail</div>
                                </div></button>)}
                                {!mailToggle && (<button onClick={mailToggleHandler}><div className="w-[73px] h-7 p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={mailicon} alt="sms" />
                                    <div className="text-neutral-400 text-sm font-bold ">Mail</div>
                                </div></button>)}
                                {whatsappToggle && (<button onClick={whatsappToggleHandler}><div className="w-[111px] h-7 p-2 bg-teal-400 rounded-[5px] border border-white justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={whatshapicon} alt="sms" />
                                    <div className="text-white text-sm font-bold ">WhatsApp</div>
                                </div></button>)}
                                {!whatsappToggle && (<button onClick={whatsappToggleHandler}><div className="w-[111px] h-7 p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={whatshapicon} alt="sms" />
                                    <div className="text-neutral-400 text-sm font-bold ">WhatsApp</div>
                                </div></button>)}
                            </div>
                            <button onClick={handleSaveClick}><div className="w-[111px] h-7 p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                
                                <div className="text-neutral-400 text-sm font-bold ">Save</div>
                            </div></button>
                        </div>
                        
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-[43.5rem] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Payment methods</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your payment methods</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex" onClick={togglePopup1}>
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium ">Add Payment Method</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Payment method</div>
                                        
                                    </div>
                                    {isLoading && <Loading />}
                                    <div className="w-full  max-h-[15rem] overflow-y-auto">
                                    {paymentMethod.map((item:any) => (
                                        <div key={item.id} className='flex  items-center w-full  box-border py-4 bg-white  border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div  className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={cashicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">{item.name}</div>
                                        </div>
                                        
                                    </div>
                                    ))
                                    } 
                                    </div>      
                                        
            
                                </div>
                            </div>
                        </div>
                        <div className="w-[43.5rem] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Species & Breeds</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add your species & breed database</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium cursor-pointer" onClick={togglePopup}>Add Species</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Species</div>
                                        
                                    </div>
                                    
                                    <div className="w-full  max-h-[15rem] overflow-y-auto">
                                    {isLoadingspecies && <Loading />}
                                    {species.map((item:any) => (
                                        <div key={item.id} className='flex  items-center w-full  box-border py-4 bg-white  border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div  className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            <Image className="w-[22px] h-[22px] relative" src={cashicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium ">{item.name}</div>
                                        </div>
                                        
                                    </div>
                                    ))
                                    } 
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-[43.5rem] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Item Categories</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your item categories</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium " onClick={togglePopup2}>Add Category</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Item Category</div>
                                        
                                    </div>
                                    {isLoadingItemCategories && <Loading />}
                                    <div className="w-full  max-h-[15rem] overflow-y-auto">
                                    {itemCategories.map((item: any) =>(
                                        <div key={item.id} className='flex  items-center w-full  box-border py-4 bg-white  border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div  className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            
                                            <div className="text-gray-500 text-base font-medium ">{item.name}</div>
                                        </div>
                                        
                                    </div>
                                    ))
                                    } 
                                    </div>   
                                </div>
                            </div>
                        </div>
                        <div className="w-[43.5rem] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Item Units</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your inventory item units</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium " onClick={togglePopup3}>Add Unit</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Unit</div>
                                        
                                    </div>
                                    {isLoadingItemUnits && <Loading />}
                                    <div className="w-full  max-h-[15rem] overflow-y-auto">
                                    {itemUnits.map((item:any) => (
                                        <div key={item.id} className='flex  items-center w-full  box-border py-4 bg-white  border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div  className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            
                                            <div className="text-gray-500 text-base font-medium ">{item.name}</div>
                                        </div>
                                        
                                    </div>
                                    ))
                                    } 
                                    </div>   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-[43.5rem] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Service Categories</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your service categories</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium " onClick={togglePopup4}>Add Category</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Service Category</div>
                                        
                                    </div>
                                    {isLoadingserviceCategory && <Loading />}
                                    <div className="w-full  max-h-[15rem] overflow-y-auto">
                                    {serviceCategory.map((item:any) => (
                                        <div key={item.id} className='flex  items-center w-full  box-border py-4 bg-white  border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div  className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            
                                            <div className="text-gray-500 text-base font-medium ">{item.name}</div>
                                        </div>
                                        
                                    </div>
                                    ))
                                    } 
                                    </div>   
                                    
                                </div>
                            </div>
                        </div>
                        <div className="w-[43.5rem] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Tax Types</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your tax types</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium " onClick={togglePopup5}>Add Tax</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Tax Type</div>
                                        
                                    </div>
                                    {isLoading && <Loading />}
                                    <div className="w-full  max-h-[15rem] overflow-y-auto">
                                    {taxType.map((item:any) => (
                                        <div key={item.id} className='flex  items-center w-full  box-border py-4 bg-white  border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div  className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            
                                            <div className="text-gray-500 text-base font-medium ">{item.name} % GST </div>
                                        </div>
                                        
                                    </div>
                                    ))
                                    } 
                                    </div>   
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-[43.5rem] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Update Inventory - Stock out Reasons</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your stock out reasons</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium " onClick={togglePopup6}>Add Reason</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Stock Out Reasons</div>
                                        
                                    </div>
                                    {isLoadingreasons && <Loading />}
                                    <div className="w-full  max-h-[15rem] overflow-y-auto">
                                    {reasons.map((item:any) => (
                                        <div key={item.id} className='flex  items-center w-full  box-border py-4 bg-white  border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        <div  className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                            
                                            <div className="text-gray-500 text-base font-medium ">{item.name}</div>
                                        </div>
                                        
                                    </div>
                                    ))
                                    } 
                                    </div>   
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    {/*  */}
                </div>
            </div>
        </div >


        {showPopup && <AddSpeciesPopup onClose={togglePopup} />}
        {showPopup1 && <AddPaymentPopup onClose={togglePopup1} />}
        {showPopup2 && <AddItemCategoryPopup onClose={togglePopup2} />}
        {showPopup3 && <AddItemUnit onClose={togglePopup3} />}
        {showPopup4 && <AddServiceCategory onClose={togglePopup4} />}
        {showPopup5 && <AddTaxType onClose={togglePopup5} />}
        {showPopup6 && <AddReasons onClose={togglePopup6} />}
    </>
    )
}

export default GeneralSettings