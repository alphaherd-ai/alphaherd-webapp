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
import smsicong from "../../../assets/icons/settings/sms_gray.svg"
import whatshapicon from "../../../assets/icons/settings/whatshapicon.svg"
import whatshapiconw from "../../../assets/icons/settings/whatsapp_white.svg"
import mailicon from "../../../assets/icons/settings/mailicon.svg"
import mailiconw from "../../../assets/icons/settings/mess_white.svg"
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
import AddExpenseCategory from "../generalSettingPopup/addExpenseCategogy";
import AddLocation from "../generalSettingPopup/addLocationCategory";
import AddItemUnit from "../generalSettingPopup/addUnitPopup";
import AddBreed from "../generalSettingPopup/addBreedPopup";
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
const defaultCategories = ['Pet food','Medicine','Supplements','Pet Accessories','Equipment'];
const defaultUnits = ['Boxes','Pieces','Vials','Units','Strips'];
const defaultTaxTypes = [0,5,12,18,28];
const defaultServiceCategory = ['General Consultation','Follow Up', 'Surgery','Vaccination','Grooming','Boarding','Rescue'];
const defaultExpenseCategory = ['Rent',' Payroll', 'Utilities', 'Transport', 'Medical Equipment', 'Repair and Maintenance', 'Other'];
const defaultPaymentMethod = ['Cash','UPI','Netbanking'];
const defaultLocationCategory = 'Main Warehouse';
const defaultReason = ['Damaged','Expired','Wrong Item','Quality Issues'];
const defaultSpeciesandBreed = [
    { name: 'Dog', breed: ['Labrador Retriever','German Shepherd','Golden Retriever','Beagle','Pug','Indian Mastiff','Husky','Dashshund','Shi Tzu'] },
    { name: 'Cat', breed: ['Domestic Short Hair','Bombay','Himalayan','Persian','Bengal', 'Siamese'] },
     
];

interface LocationCategory {
    id: string; // or `number` if `id` is a number in your database
    name: string;
}
interface PaymentMethod {
    id: string; 
    name: string;
}
interface ItemCategory {
    id: string; 
    name: string;
}
interface Reason {
    id: string; 
    name: string;
}
interface ServiceCategory {
    id: string; 
    name: string;
}
interface ExpenseCategory {
    id: string; 
    name: string;
}
interface ItemUnit {
    id: string; 
    name: string;
}
interface TaxType {
    id: string; 
    name: string;
}


  
const GeneralSettings = () => {
    
    
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup1, setShowPopup1] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showPopup3, setShowPopup3] = useState(false);
    const [showPopup4, setShowPopup4] = useState(false);
    const [showPopup5, setShowPopup5] = useState(false);
    const [showPopup6, setShowPopup6] = useState(false);
    const [showPopup7, setShowPopup7] = useState(false);
    const [showPopup8, setShowPopup8] = useState(false);
    const [showPopup9, setShowPopup9] = useState(false);

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

    const togglePopup7 = () =>{
        setShowPopup7(!showPopup7);
    }
    const togglePopup8 = () =>{
        setShowPopup8(!showPopup8);
    }
    const togglePopup9 = () =>{
        setShowPopup9(!showPopup9);
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
      
    
      
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod[]>([]);
    const appState  = useAppSelector((state) => state.app)
    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/paymentMethod/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true }
    );

    useEffect(() => {
        const initializePaymentMethods = async () => {
            if (data) {
                const existingPaymentMethods = data.map((method: any) => method.name);
                const missingPaymentMethods = defaultPaymentMethod.filter(
                    (method) => !existingPaymentMethods.includes(method)
                );

                if (missingPaymentMethods.length > 0) {
                    ////console.log('Adding missing payment methods:', missingPaymentMethods);
                    
                    try {
                        for (const method of missingPaymentMethods) {
                            await fetch(
                                `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/paymentMethod/create?branchId=${appState.currentBranchId}`,
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ name: method }),
                                }
                            );
                        }
                        const response = await fetch(
                            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/paymentMethod/getAll?branchId=${appState.currentBranchId}`
                        );
                        const updatedData = await response.json();
                        setPaymentMethod(updatedData);
                    } catch (error) {
                        console.error('Error while adding default payment methods:', error);
                    }
                } else {
                    ////console.log('All default payment methods already exist');
                    setPaymentMethod(data); 
                }
            }
        };

        if (data && !isLoading && !error) {
            initializePaymentMethods();
        } else if (error) {
            console.error('Error fetching payment methods:', error);
        }
    }, [data, isLoading, error]);
    
    //item categories
    const [itemCategories, setItemCategories] = useState<ItemCategory[]>([]);
    const {data: itemCategoryData, error: itemCategoryError, isLoading: isLoadingItemCategories} = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/itemCategory/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true } 
    );
    useEffect(() => {
        const addDefaultCategories = async () => {
            if (itemCategoryData) {
                const existingCategoryNames = itemCategoryData.flatMap((item: any) =>
                    Array.isArray(item.name) ? item.name : [item.name]
                );
                const missingCategories = defaultCategories.filter(
                    (category) => !existingCategoryNames.includes(category)
                );

                if (missingCategories.length > 0) {
                    ////console.log('Adding missing categories:', missingCategories);
                    try {
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/itemCategory/create?branchId=${appState.currentBranchId}`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ name: missingCategories }),
                            }
                        );

                        window.location.reload();
                    } catch (error) {
                        console.error('Error while adding default categories:', error);
                    }
                } else {
                    ////console.log('All default categories already exist');
                }
            }
        };

        if (itemCategoryData && !isLoadingItemCategories && !itemCategoryError) {
            addDefaultCategories();
            setItemCategories(itemCategoryData);
        }
    }, [itemCategoryData, isLoadingItemCategories, itemCategoryError]);

    //item Units
    const [itemUnits, setItemUnits] = useState<ItemUnit[]>([]);
    const {data: itemUnitsData, error: itemUnitsError, isLoading: isLoadingItemUnits} = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/itemUnit/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true } 
    );
    useEffect(() => {
        const addDefaultUnits = async () => {
            if (itemUnitsData) {
                const existingUnitNames = itemUnitsData.flatMap((item: any) =>
                    Array.isArray(item.name) ? item.name : [item.name]
                );
                const missingUnit = defaultUnits.filter(
                    (category) => !existingUnitNames.includes(category)
                );

                if (missingUnit.length > 0) {
                    ////console.log('Adding missing categories:', missingUnit);
                    try {
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/itemUnit/create?branchId=${appState.currentBranchId}`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ name: missingUnit }),
                            }
                        );

                        window.location.reload();
                    } catch (error) {
                        console.error('Error while adding default categories:', error);
                    }
                } else {
                    ////console.log('All default categories already exist');
                }
            }
        };
        if (!isLoadingItemUnits && !itemUnitsError && itemUnitsData) {
            addDefaultUnits();
            setItemUnits(itemUnitsData); 
        }
    }, [itemUnitsData, itemUnitsError, isLoadingItemUnits]);
    ////console.log("item categories is :",itemUnits);
    // const [species, setspecies] = useState([]);
    // const {data: speciesData, error: speciesError, isLoading: isLoadingspecies} = useSWR(
    //     `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/species/getAll?branchId=${appState.currentBranchId}`,
    //     fetcher,
    //     { revalidateOnFocus: true } 
    // );
    // useEffect(() => {
    //     if (!isLoadingspecies && !speciesError && speciesData) {
    //         ////console.log("species data is :",species);
    //         setspecies(speciesData); 
    //     }
    // }, [speciesData, speciesError, isLoadingspecies]);
    //Reasons
    const [reasons, setReasons] = useState<Reason[]>([]);
    const {data: reasonsData, error: reasonsError, isLoading: isLoadingreasons} = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/reason/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true } 
    );
    useEffect(() => {
        const addDefaultReason = async () => {
            if (reasonsData) {
                const existingReasons = reasonsData.flatMap((item: any) =>
                    Array.isArray(item.name) ? item.name : [item.name]
                );
                const missingReasons = defaultReason.filter(
                    (category) => !existingReasons.includes(category)
                );

                if (missingReasons.length > 0) {
                    ////console.log('Adding missing reasons:', missingReasons);
                    try {
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/reason/create?branchId=${appState.currentBranchId}`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ name: missingReasons }),
                            }
                        );
                        window.location.reload();
                    } catch (error) {
                        console.error('Error while adding default categories:', error);
                    }
                } else {
                    ////console.log('All default categories already exist');
                }
            }
        };
        if (!isLoadingreasons && !reasonsError && reasonsData) {
            addDefaultReason();
            setReasons(reasonsData); 
        }
    }, [reasonsData, reasonsError, isLoadingreasons]);

    //tax type
    const [taxType, settaxType] = useState<TaxType[]>([]);
    const {data: taxTypeData, error: taxTypeError, isLoading: isLoadingtaxType} = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/taxType/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true } 
    );
    useEffect(() => {
        const addDefaultTaxTypes = async () => {
            if (taxTypeData) {
                const existingTaxTypes = taxTypeData.flatMap((tax: any) =>
                    Array.isArray(tax.name) ? tax.name : [tax.name]
                );

                const missingTaxTypes = defaultTaxTypes.filter(
                    (tax) => !existingTaxTypes.includes(tax)
                );

                if (missingTaxTypes.length > 0) {
                    ////console.log('Adding missing tax types:', missingTaxTypes);
                    try {
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/taxType/create?branchId=${appState.currentBranchId}`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ name: missingTaxTypes }),
                            }
                        );

                        window.location.reload(); 
                    } catch (error) {
                        console.error('Error while adding default tax types:', error);
                    }
                } else {
                    ////console.log('All default tax types already exist');
                }
            }
        };

        if (taxTypeData && !isLoadingtaxType && !taxTypeError) {
            addDefaultTaxTypes();
            settaxType(taxTypeData); 
          } else if (taxTypeError) {
            console.error('Error fetching tax types:', taxTypeError);
          }
    }, [taxTypeData, taxTypeError, isLoadingtaxType]);

    //serviceCategory
    const [serviceCategory, setserviceCategory] = useState<ServiceCategory[]>([]);
    const {data: serviceCategoryData, error: serviceCategoryError, isLoading: isLoadingserviceCategory} = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/serviceCategory/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true } 
    );
    useEffect(() => {
        const addDefaultServiceCategory = async () => {
            if (serviceCategoryData) {
                const existingServiceCategory = serviceCategoryData.flatMap((item: any) =>
                    Array.isArray(item.name) ? item.name : [item.name]
                );

                const missingServiceCategory = defaultServiceCategory.filter(
                    (category) => !existingServiceCategory.includes(category)
                );

                if (missingServiceCategory.length > 0) {
                    ////console.log('Adding missing reasons:', missingServiceCategory);
                    try {
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/serviceCategory/create?branchId=${appState.currentBranchId}`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ name: missingServiceCategory }),
                            }
                        );
                        window.location.reload();
                    } catch (error) {
                        console.error('Error while adding default categories:', error);
                    }
                } else {
                    ////console.log('All default categories already exist');
                }
            }
        };
        if (!isLoadingserviceCategory && !serviceCategoryError && serviceCategoryData) {
            addDefaultServiceCategory();
            setserviceCategory(serviceCategoryData); 
        }
    }, [serviceCategoryData, serviceCategoryError, isLoadingserviceCategory]);

    //ExpenseCategory
    const [expenseCategory, setexpenseCategory] = useState<ExpenseCategory[]>([]);
    const {data: expenseCategoryData, error: expenseCategoryError, isLoading: isLoadingexpenseCategory} = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/expenseCategory/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true } 
    );
    useEffect(() => {
        const addDefaultExpenseCategory = async () => {
            if (expenseCategoryData) {
                const existingExpenseCategory = expenseCategoryData.flatMap((item: any) =>
                    Array.isArray(item.name) ? item.name : [item.name]
                );

                const missingExpenseCategory = defaultExpenseCategory.filter(
                    (category) => !existingExpenseCategory.includes(category)
                );

                if (missingExpenseCategory.length > 0) {
                    ////console.log('Adding missing reasons:', missingExpenseCategory);
                    try {
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/expenseCategory/create?branchId=${appState.currentBranchId}`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ name: missingExpenseCategory }),
                            }
                        );
                       // window.location.reload();
                    } catch (error) {
                        console.error('Error while adding default categories:', error);
                    }
                } else {
                    ////console.log('All default categories already exist');
                }
            }
        };
        if (!isLoadingexpenseCategory && !expenseCategoryError && expenseCategoryData) {
            addDefaultExpenseCategory();
            setexpenseCategory(expenseCategoryData); 
        }
    }, [expenseCategoryData, expenseCategoryError, isLoadingexpenseCategory]);


    //Species and Breed 
    const [species, setSpecies] = useState<any[]>([]);
    const [expandedSpecies, setExpandedSpecies] = useState<number | null>(null);

    // Fetch species data
    const { data: speciesData, error: speciesError, isLoading: isLoadingSpecies } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/species/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true }
    );
    //console.log("species data is :" ,speciesData);

    // Fetch breed data
    const { data: breedData, error: breedError, isLoading: isLoadingBreed } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/breed/getAll?branchId=${appState.currentBranchId}`,
        fetcher,
        { revalidateOnFocus: true }
    );
   //console.log("breed data is :" ,breedData);

    useEffect(() => {
        const initializeSpeciesAndBreeds = async () => {
            if (!isLoadingSpecies && !speciesError && speciesData && !isLoadingBreed && !breedError && breedData) {
                const speciesWithBreeds = [];
    
                for (const defaultSpecies of defaultSpeciesandBreed) {
                    const existingSpecies = speciesData.find((specie: any) => specie.name === defaultSpecies.name);
    
                    if (existingSpecies) {
                        for (const breed of defaultSpecies.breed) {
                            const breedExists = breedData.some(
                                (b: any) => Array.isArray(b.name) &&
                                b.name.includes(breed) &&
                                b.speciesId === existingSpecies.id
                            );
    
                            if (!breedExists) {
                                await fetch(
                                    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/breed/create?branchId=${appState.currentBranchId}`,
                                    {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            name: [breed], // Wrap breed name in array
                                            speciesId: existingSpecies.id,
                                            databaseSectionId: existingSpecies.databaseSectionId,
                                        }),
                                    }
                                );
                            }
                        }
    
                        const speciesBreeds = breedData
                            .filter((b: any) => b.speciesId === existingSpecies.id)
                            .map((b: any) => ({
                                name: Array.isArray(b.name) ? b.name[0] : b.name,
                              })); // Convert breed to object with name property
    
                        speciesWithBreeds.push({ ...existingSpecies, breed: speciesBreeds });
                    } else {
                        const speciesResponse = await fetch(
                            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/species/create?branchId=${appState.currentBranchId}`,
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ name: defaultSpecies.name }),
                            }
                        );
                        const newSpecies = await speciesResponse.json();
    
                        const newBreeds = [];
                        for (const breed of defaultSpecies.breed) {
                            await fetch(
                                `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/breed/create?branchId=${appState.currentBranchId}`,
                                {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        name: [breed], // Wrap in array for Prisma's String[]
                                        speciesId: newSpecies.id,
                                        databaseSectionId: newSpecies.databaseSectionId,
                                    }),
                                }
                            );
                            newBreeds.push({ name: breed });
                        }
    
                        speciesWithBreeds.push({ ...newSpecies, breed: newBreeds });
                    }
                }
                setSpecies(speciesWithBreeds);
            }
        };
    
        initializeSpeciesAndBreeds();
    }, [speciesData, breedData, speciesError, breedError, isLoadingSpecies, isLoadingBreed]);


//    Location Category

const [locationCategory, setlocationCategory] = useState<LocationCategory[]>([]);
const {data: locationCategoryData, error: locationCategoryError, isLoading: isLoadinglocationCategory} = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/LocationCategory/getAll?branchId=${appState.currentBranchId}`,
    fetcher,
    { revalidateOnFocus: true } 
);
//////console.log("location category data is :",locationCategoryData);
useEffect(() => {
    const addDefaultLocationCategory = async () => {
        if (locationCategoryData && locationCategoryData.length===0) {
            const existingLocationCategory = locationCategoryData.flatMap((item: any) =>
                Array.isArray(item.name) ? item.name : [item.name]
            );

            const missingLocationCategory = defaultLocationCategory;

            if (missingLocationCategory.length > 0) {
                ////console.log('Adding missing reasons:', missingLocationCategory);
                try {
                    await fetch(
                        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/LocationCategory/create?branchId=${appState.currentBranchId}`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ name: missingLocationCategory }),
                        }
                    );
                    window.location.reload();
                } catch (error) {
                    console.error('Error while adding default categories:', error);
                }
            } else {
                ////console.log('All default categories already exist');
            }
        }
    };
    if (!isLoadinglocationCategory && !locationCategoryError && locationCategoryData) {
        addDefaultLocationCategory();
        setlocationCategory(locationCategoryData); 
    }
}, [locationCategoryData, locationCategoryError, isLoadinglocationCategory]);
const deleteLocation = async (id: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/LocationCategory/delete?id=${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            // Update the state after deletion
            setlocationCategory(prevCategories =>
                prevCategories.filter(category => category.id !== id)
            );
        } else {
            console.error('Failed to delete category');
        }
    } catch (error) {
        console.error('Error while deleting category:', error);
    }
};

const deletePayment = async (id: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/paymentMethod/delete?id=${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            // Update the state after deletion
            setPaymentMethod(prevCategories =>
                prevCategories.filter(category => category.id !== id)
            );
        } else {
            console.error('Failed to delete category');
        }
    } catch (error) {
        console.error('Error while deleting category:', error);
    }
};

const deleteItemCategory = async (id: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/itemCategory/delete?id=${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            // Update the state after deletion
            setItemCategories(prevCategories =>
                prevCategories.filter(category => category.id !== id)
            );
        } else {
            console.error('Failed to delete category');
        }
    } catch (error) {
        console.error('Error while deleting category:', error);
    }
};
const deleteServiceCategory = async (id: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/serviceCategory/delete?id=${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            setserviceCategory(prevCategories =>
                prevCategories.filter(category => category.id !== id)
            );
        } else {
            console.error('Failed to delete category');
        }
    } catch (error) {
        console.error('Error while deleting category:', error);
    }
};
const deleteReason = async (id: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/reason/delete?id=${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            setReasons(prevCategories =>
                prevCategories.filter(category => category.id !== id)
            );
        } else {
            console.error('Failed to delete category');
        }
    } catch (error) {
        console.error('Error while deleting category:', error);
    }
};
const deleteExpenseCategory = async (id: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/expenseCategory/delete?id=${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            setexpenseCategory(prevCategories =>
                prevCategories.filter(category => category.id !== id)
            );
        } else {
            console.error('Failed to delete category');
        }
    } catch (error) {
        console.error('Error while deleting category:', error);
    }
};
const deleteItemUnit = async (id: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/itemUnit/delete?id=${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            setItemUnits(prevCategories =>
                prevCategories.filter(category => category.id !== id)
            );
        } else {
            console.error('Failed to delete category');
        }
    } catch (error) {
        console.error('Error while deleting category:', error);
    }
};
const deleteTaxType= async (id: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/taxType/delete?id=${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            settaxType(prevCategories =>
                prevCategories.filter(category => category.id !== id)
            );
        } else {
            console.error('Failed to delete category');
        }
    } catch (error) {
        console.error('Error while deleting category:', error);
    }
};



////console.log("location data is :", locationCategory);

    // Toggle species expansion to show/hide breeds
    const handleExpandSpecies = (speciesId: number) => {
        ////console.log("specie id si : " , speciesId);
        setExpandedSpecies(expandedSpecies === speciesId ? null : speciesId);
    };
    // ////console.log('item categories: ', itemCategories);
    // ////console.log('Tax Type',taxType);
   ////console.log('Species: ', species);
    // ////console.log('Breed',expandedSpecies);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [hoveredIndex1, setHoveredIndex1] = useState<number | null>(null);
    const [hoveredIndex2, setHoveredIndex2] = useState<number | null>(null);
    const [hoveredIndex3, setHoveredIndex3] = useState<number | null>(null);
    const [hoveredIndex4, setHoveredIndex4] = useState<number | null>(null);
    const [hoveredIndex5, setHoveredIndex5] = useState<number | null>(null);
    const [hoveredIndex6, setHoveredIndex6] = useState<number | null>(null);
    const [hoveredIndex7, setHoveredIndex7] = useState<number | null>(null);


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
                                {smsToggle && (<button onClick={smsToggleHandler} className="bg-[#35BEB1] rounded-[5px] border-0 outline-none" ><div className="w-[73px] h-7 p-2  justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={smsicon} alt="sms" />
                                    <div className="text-white text-sm font-bold ">SMS</div>
                                </div></button>)}
                                {!smsToggle && (<button onClick={smsToggleHandler} className="bg-white rounded-[5px] border-[#A2A3A3] " 
                                style={{ border: '0.5px solid rgba(209, 213, 219, 220)' }}
                                 ><div className="w-[73px] h-7 p-2 justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={smsicong} alt="sms" />
                                    <div className="text-neutral-400 text-sm font-bold ">SMS</div>
                                </div></button>)}
                                {mailToggle && (<button onClick={mailToggleHandler} className="bg-[#35BEB1] rounded-[5px] border-0 outline-none" ><div className="w-[73px] h-7 p-2 justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={mailiconw} alt="sms" />
                                    <div className="text-white text-sm font-bold ">Mail</div>
                                </div></button>)}
                                {!mailToggle && (<button onClick={mailToggleHandler}
                                 className="bg-white rounded-[5px] border-[#A2A3A3] " 
                                 style={{ border: '0.5px solid rgba(209, 213, 219, 220)' }} ><div className="w-[73px] h-7 p-2   justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={mailicon} alt="sms" />
                                    <div className="text-neutral-400 text-sm font-bold ">Mail</div>
                                </div></button>)}
                                {whatsappToggle && (<button onClick={whatsappToggleHandler} className="bg-[#35BEB1] rounded-[5px] border-0 outline-none" ><div className="w-[111px] h-7 p-2  justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={whatshapiconw} alt="sms" />
                                    <div className="text-white text-sm font-bold ">WhatsApp</div>
                                </div></button>)}
                                {!whatsappToggle && (<button onClick={whatsappToggleHandler} 
                                className="bg-white rounded-[5px] border-[#A2A3A3] " 
                                style={{ border: '0.5px solid rgba(209, 213, 219, 220)' }}><div className="w-[111px] h-7 p-2  justify-start items-center gap-2 flex">
                                    <Image className="w-4 h-4 relative" src={whatshapicon} alt="sms" />
                                    <div className="text-neutral-400 text-sm font-bold ">WhatsApp</div>
                                </div></button>)}
                            </div>
                        </div>
                        
                    </div>
                    <div className="w-full flex justify-between ">
                        <div className="w-[49%] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Payment methods</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your payment methods</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer" onClick={togglePopup1}>
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
                                    {paymentMethod.map((item: any, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center w-full box-border py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 relative"
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            <div className="w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium">
                                                <Image className="w-[22px] h-[22px] relative" src={cashicon} alt="cash" />
                                                <div className="text-gray-500 text-base font-medium">{item.name}</div>
                                            </div>
                                            {hoveredIndex === index && (
                                                <div
                                                    className="absolute right-4 h-full flex items-center cursor-pointer"
                                                    onClick={() => deletePayment(item.id)}
                                                >
                                                    <Image className="w-6 h-6" src={deleteicon} alt="delete" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
 
                                    </div>      
                                        
                                </div>
                            </div>
                        </div>
                        <div className="w-[49%] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Species & Breeds</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add your species & breed database</div>
                                </div>
                                <div className="flex gap-3">
                                    
                                    <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer">
                                        <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                        <div className="text-white text-base font-medium " onClick={togglePopup}>Add Species</div>
                                    </div>
                                    <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer">
                                        <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                        <div className="text-white text-base font-medium " onClick={togglePopup7}>Add Breed</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Species</div>
                                        
                                    </div>
                                    
                                   
                                    {/* {isLoadingspecies && <Loading />}
                                    {species.map((item: any,index:any) =>(
                                        <div key={index} className='w-full'>
                                            {Array.isArray(item.name) && item.name.map((nameItem: string, nameIndex: number) => (
                                                <div key={nameIndex} className='flex items-center w-full box-border py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5'>
                                                    <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                                    <div className="text-gray-500 text-base font-medium">{nameItem}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        // <div key={item.id} className='flex  items-center w-full  box-border py-4 bg-white  border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                        // <div  className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                        //     <Image className="w-[22px] h-[22px] relative" src={cashicon} alt="cash" />
                                        //     <div className="text-gray-500 text-base font-medium ">{item.name}</div>
                                        // </div>
                                        
                                    
                                    ))
                                    }  */}
                                    {isLoadingSpecies && <Loading />}
                                         <div className="w-full  max-h-[15rem] overflow-y-auto">
                                        {speciesData?.map((item: any, index: number) => (
                                            <div key={index} className="w-full">
                                                {/* Display species name */}
                                                <div
                                                    className="flex flex-col w-full box-border bg-white border border-solid border-gray-300 text-gray-400"
                                                >
                                                    <div
                                                        className="flex items-center justify-between w-full py-4 px-6 text-neutral-400 text-base font-medium cursor-pointer"
                                                        onClick={() => handleExpandSpecies(item.id)}
                                                    >
                                                        <div className="text-gray-500">{item.name}</div> {/* Species name is a string */}
                                                        <div>{expandedSpecies === item.id ? "▲" : "▼"}</div>
                                                    </div>

                                                    {expandedSpecies === item.id && (
                                                        <div className="pl-10 pr-6 py-2">
                                                            {item.breed && Array.isArray(item.breed) && item.breed.length > 0 ? (
                                                                item.breed.map((breedItem: any, breedIndex: number) => (
                                                                    <div key={breedIndex} className="text-gray-500  margin-bottom: 0 padding-bottom: 0 text-sm font-medium ">
                                                                        {Array.isArray(breedItem.name) ? (
                                                                                    breedItem.name.map((subName: string, subIndex: number) => (
                                                                                    <div key={subIndex}>{subName}</div>
                                                                                    ))
                                                                                ) : (
                                                                                breedItem.name
                                                                                )}
                                                                            </div>
                                                                ))
                                                            ) : (
                                                                <div className="text-gray-400 text-sm italic">No breeds available</div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-[49%] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Item Categories</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your item categories</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer"  onClick={togglePopup2}>
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium ">Add Category</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Item Category</div>
                                        
                                    </div>
                                    {isLoadingItemCategories && <Loading />}
                                    <div className="w-full  max-h-[15rem] overflow-y-auto">
                                    {itemCategories.map((item: any, index: number) => (
                                        <div key={index} className="w-full">
                                            {Array.isArray(item.name) && item.name.map((nameItem: string, nameIndex: number) => (
                                                <div
                                                    key={nameIndex}
                                                    className="flex items-center w-full box-border py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 relative"
                                                    onMouseEnter={() => setHoveredIndex1(nameIndex)}
                                                    onMouseLeave={() => setHoveredIndex1(null)}
                                                >
                                                    <div className="w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium">
                                                        <div className="text-gray-500 text-base font-medium">{nameItem}</div>
                                                    </div>
                                                    {hoveredIndex1 === nameIndex && (
                                                        <div
                                                            className="absolute right-4 h-full flex items-center cursor-pointer"
                                                            onClick={() => deleteItemCategory(item.id)}
                                                        >
                                                            <Image className="w-6 h-6" src={deleteicon} alt="delete" />
                                                        </div>
                                                    )}
                                                </div>
                                                ))}
                                            </div>
                                        ))}

                                    </div>   
                                </div>
                            </div>
                        </div>
                        <div className="w-[49%] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Item Units</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your inventory item units</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer"  onClick={togglePopup3}>
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium ">Add Unit</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Unit</div>
                                        
                                    </div>
                                    {isLoadingItemUnits && <Loading />}
                                    <div className="w-full  max-h-[15rem] overflow-y-auto">
                                    {itemUnits.map((item: any,index: any) =>(
                                        <div key={index} className='w-full'>
                                            {Array.isArray(item.name) && item.name.map((nameItem: string, nameIndex: number) => (
                                                <div
                                                key={nameIndex}
                                                className="flex items-center w-full box-border py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 relative"
                                                onMouseEnter={() => setHoveredIndex2(nameIndex)}
                                                onMouseLeave={() => setHoveredIndex2(null)}
                                            >
                                                <div className="w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium">
                                                    <div className="text-gray-500 text-base font-medium">{nameItem}</div>
                                                </div>
                                                {hoveredIndex2 === nameIndex && (
                                                    <div
                                                        className="absolute right-4 h-full flex items-center cursor-pointer"
                                                        onClick={() => deleteItemUnit(item.id)}
                                                    >
                                                        <Image className="w-6 h-6" src={deleteicon} alt="delete" />
                                                    </div>
                                                )}
                                            </div>
                                            
                                            ))}
                                        </div>
                                    ))
                                    } 
                                    </div>   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-[49%] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Service Categories</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your service categories</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer" onClick={togglePopup4}>
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium " >Add Category</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Service Category</div>
                                        
                                    </div>
                                    {isLoadingserviceCategory && <Loading />}
                                    <div className="w-full  max-h-[15rem] overflow-y-auto">
                                    {serviceCategory.map((item: any,index: any) =>(
                                        <div key={index} className='w-full'>
                                            {Array.isArray(item.name) && item.name.map((nameItem: string, nameIndex: number) => (
                                                <div
                                                key={nameIndex}
                                                className="flex items-center w-full box-border py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 relative"
                                                onMouseEnter={() => setHoveredIndex3(nameIndex)}
                                                onMouseLeave={() => setHoveredIndex3(null)}
                                            >
                                                <div className="w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium">
                                                    <div className="text-gray-500 text-base font-medium">{nameItem}</div>
                                                </div>
                                                {hoveredIndex3 === nameIndex && (
                                                    <div
                                                        className="absolute right-4 h-full flex items-center cursor-pointer"
                                                        onClick={() => deleteServiceCategory(item.id)}
                                                    >
                                                        <Image className="w-6 h-6" src={deleteicon} alt="delete" />
                                                    </div>
                                                )}
                                            </div>
                                            
                                            ))}
                                        </div>
                                    ))
                                    } 
                                    </div>   
                                    
                                </div>
                            </div>
                        </div>
                        <div className="w-[49%] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Tax Types</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your tax types</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer" onClick={togglePopup5}>
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium " >Add Tax</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Tax Type</div>
                                        
                                    </div>
                                    {isLoading && <Loading />}
                                    <div className="w-full  max-h-[15rem] overflow-y-auto">
                                    {taxType.map((item: any, index: any) => (
                                        <div key={index} className='w-full'>
                                            {Array.isArray(item.name) && item.name.length > 0 ? (
                                            item.name.map((taxValue: number, taxIndex: number) => (
                                                <div
                                                    key={taxIndex}
                                                    className="flex items-center w-full box-border py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 relative"
                                                    onMouseEnter={() => setHoveredIndex4(taxIndex)}
                                                    onMouseLeave={() => setHoveredIndex4(null)}
                                                >
                                                    <div className="w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium">
                                                        <div className="text-gray-500 text-base font-medium">{`${taxValue}% GST`}</div>
                                                    </div>
                                                    {hoveredIndex4 === taxIndex && (
                                                        <div
                                                            className="absolute right-4 h-full flex items-center cursor-pointer"
                                                            onClick={() => deleteTaxType(item.id)}
                                                        >
                                                            <Image className="w-6 h-6" src={deleteicon} alt="delete" />
                                                        </div>
                                                    )}
                                                </div>
                                                
                                            ))
                                            ) : (
                                            <div className='flex items-center w-full box-border py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5'>
                                                <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                                <div className="text-gray-500 text-base font-medium">
                                                    No tax types available 
                                                </div>
                                                </div>
                                            </div>
                                            )}
                                        </div>
                                    ))}
                                    </div>   
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-[49%] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Update Inventory - Stock out Reasons</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your stock out reasons</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer"  onClick={togglePopup6}>
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium ">Add Reason</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Stock Out Reasons</div>
                                        
                                    </div>
                                    {isLoadingreasons && <Loading />}
                                    <div className="w-full  max-h-[15rem] overflow-y-auto">
                                    {reasons.map((item: any,index: any) =>(
                                        <div key={index} className='w-full'>
                                            {Array.isArray(item.name) && item.name.map((nameItem: string, nameIndex: number) => (
                                                <div
                                                key={nameIndex}
                                                className="flex items-center w-full box-border py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 relative"
                                                onMouseEnter={() => setHoveredIndex5(nameIndex)}
                                                onMouseLeave={() => setHoveredIndex5(null)}
                                            >
                                                <div className="w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium">
                                                    <div className="text-gray-500 text-base font-medium">{nameItem}</div>
                                                </div>
                                                {hoveredIndex5 === nameIndex && (
                                                    <div
                                                        className="absolute right-4 h-full flex items-center cursor-pointer"
                                                        onClick={() => deleteReason(item.id)}
                                                    >
                                                        <Image className="w-6 h-6" src={deleteicon} alt="delete" />
                                                    </div>
                                                )}
                                            </div>
                                            
                                            ))}
                                        </div>
                                    ))
                                    } 
                                    </div>   
                                    
                                </div>
                            </div>
                        </div>
                        <div className="w-[49%] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Location Categories</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your location categories</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer" onClick={togglePopup8}>
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium " >Add Category</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Location Category</div>
                                        
                                    </div>
                                    {isLoadinglocationCategory && <Loading />}
                                    <div className="w-full  max-h-[15rem] overflow-y-auto">
                                    {locationCategory.map((item: any, index: any) => (
                                        <div
                                        key={index}
                                        className="flex items-center w-full box-border py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 relative"
                                        onMouseEnter={() => setHoveredIndex6(index)}
                                        onMouseLeave={() => setHoveredIndex6(null)}
                                    >
                                        <div className="w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium">
                                            <Image className="w-[22px] h-[22px] relative" src={cashicon} alt="cash" />
                                            <div className="text-gray-500 text-base font-medium">{item.name}</div>
                                        </div>
                                        {hoveredIndex6 === index && (
                                            <div
                                                className="absolute right-4 h-full flex items-center cursor-pointer"
                                                onClick={() => deleteLocation(item.id)}
                                            >
                                                <Image className="w-6 h-6" src={deleteicon} alt="delete" />
                                            </div>
                                        )}
                                    </div>
                    ))}
                                    </div>  
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                      <div className="w-full flex justify-between">
                      <div className="w-[49%] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="w-full flex justify-between items-start">
                                <div>
                                    <div className="text-gray-500 text-base font-bold ">Expense Categories</div>
                                    <div className="text-neutral-400 text-base font-medium ">Add and configure your Expense categories</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer" onClick={togglePopup9}>
                                    <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                                    <div className="text-white text-base font-medium " >Add Category</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                        <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Expense Category</div>
                                        
                                    </div>
                                    {isLoadingexpenseCategory && <Loading />}
                                    <div className="w-full  max-h-[15rem] overflow-y-auto">
                                    {expenseCategory.map((item: any,index: any) =>(
                                        <div key={index} className='w-full'>
                                            {Array.isArray(item.name) && item.name.map((nameItem: string, nameIndex: number) => (
                                                <div
                                                key={nameIndex}
                                                className="flex items-center w-full box-border py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 relative"
                                                onMouseEnter={() => setHoveredIndex7(nameIndex)}
                                                onMouseLeave={() => setHoveredIndex7(null)}
                                            >
                                                <div className="w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium">
                                                    <div className="text-gray-500 text-base font-medium">{nameItem}</div>
                                                </div>
                                                {hoveredIndex7 === nameIndex && (
                                                    <div
                                                        className="absolute right-4 h-full flex items-center cursor-pointer"
                                                        onClick={() => deleteExpenseCategory(item.id)}
                                                    >
                                                        <Image className="w-6 h-6" src={deleteicon} alt="delete" />
                                                    </div>
                                                )}
                                            </div>
                                            
                                            ))}
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
        {showPopup7 && <AddBreed onClose={togglePopup7}/>}
        {showPopup8 && <AddLocation onClose={togglePopup8}/>}
        {showPopup9 && <AddExpenseCategory onClose={togglePopup9}/>}
    </>
    )
}

export default GeneralSettings