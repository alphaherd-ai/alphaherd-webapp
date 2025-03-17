'use client';
import Image from "next/image";
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import closeicon from "../../../../assets/icons/inventory/closeIcon.svg";
import deleteicon from "../../../../assets/icons/loginsignup/delete.svg";
import add1icon from "../../../../assets/icons/inventory/add (1).svg";
import RadioButton from './RadioButton';
import subicon from "../../../../assets/icons/inventory/1. Icons-24 (6) (2).svg";
import checkicon from "../../../../assets/icons/inventory/check (1).svg";
import Select from 'react-select';
import Distributors from "@/app/database/distributor/page";
import formatDateAndTime from "@/utils/formateDateTime";
import { Stock } from "@prisma/client";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Notif_Source } from "@prisma/client";
import { useAppSelector } from "@/lib/hooks";
import useSWR from 'swr';
import z from 'zod';
import Loading2 from "@/app/loading2";
import StockConfirmationPopup from "@/utils/stockConfirmationpopup";
import { mutate } from 'swr';


//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
type PopupProps = {
    onClose: () => void;
    individualSelectedProduct?: Products
}
interface Distributors {
    id: string,
    distributorName: string
}
interface Products {
    id: string,
    itemName: string,
    productBatch: ProductBatch[],
    hsnCode: string,
    quantity: number,
    providers: string[]
}

interface Reason {
    id: string,
    name: string | string[],
}

interface LocationList {
    id: string,
    name: string | string[],
}

interface ProductBatch {
    id: number;
    date: string;
    time: string;
    quantity: number;
    batchNumber: string;
    expiry: string;
    costPrice: number;
    sellingPrice: number;
    hsnCode: string;
    category: string;
    distributors: string[];
    productId: number;
    totalCost: number;
    maxRetailPrice: number;
}
function useProductfetch(id: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${id}`, fetcher);
    return {
        fetchedProducts: data,
        isLoading,
        error
    }
}
function useProductBatchfetch(id: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/getAll/?branchId=${id}`, fetcher);
    return {
        fetchedBathces: data,
        isBatchLoading: isLoading,
        batchError: error
    }
}
function useAdminFetch(id: number | null) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/getAll?branchId=${id}`, fetcher, { revalidateOnFocus: true });
    return {
        fetchedAdmin: data,
        isAdminLoading: isLoading,
        adminError: error
    }
}

const Popup2: React.FC<PopupProps> = ({ onClose, individualSelectedProduct }: any) => {
    const [selectedOption, setSelectedOption] = useState<string>(Stock.StockIN);
    const [selectedProductDetails, setSelectedProduct] = useState<Products>()
    const [isChecked, setChecked] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [updating, setUpdating] = useState<boolean>(false);
    const [batches, setBatches] = useState<any[]>([]);
    const [filteredBatches, setFilteredBatches] = useState<any[]>([]);
    const [inventory, setInventory] = useState<any[]>([]);
    const [formData, setFormData] = useState<any>({});
    const appState = useAppSelector((state) => state.app)
    const [distributor, setDistributor] = useState<any[]>([]);
    const [branchUsers, setBranchUsers] = useState<any[]>([]);
    const [formdatas, setFormdatas] = useState<FormData[]>();
    // console.log(appState.isCurrentOrgAdmin)
    const userState = useAppSelector((state) => state.user)
    const [value, setValue] = useState<string>(String(userState.name));
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmAction, setAction] = useState<string>('idle');
    const [selectedBatchQuantity, setSelectedBatchQuantity] = useState<number>(0);
    const [selectedBatch, setSelectedBatch] = useState<any>();
    const [currIndex, setCurrIndex] = useState<number>(0);
    const [errorValidation, setErrorValidation] = useState<boolean>(false);
    const FormData = z.object({
        quantity: z.number().min(1, "Quantity must be greater than 0"),
        costPrice: z.number().min(1, "Cost Price is required"),
        maxRetailPrice: z.number().min(1, "MRP is required"),
        batchNumber: z.union([z.string(), z.number()]).refine(
            (val) => val !== '' && val !== null && val !== undefined,
            "Batch number is required"
        )
    }).refine(
        (data) => {
            return !batches.some(batch => batch.label === String(data.batchNumber));
        },
        {
            message: "Batch number must be unique",
            path: ["batchNumber"], // This specifies which field the error is associated with
        }
    );
    useEffect(() => {
        if (confirmAction === 'idle' || confirmAction === 'Save') {
            return;
        }
        else {
            const nextBatches = batches.filter((batch) => batch.value.productId === selectedBatch.value.productId).sort((a, b) => a.value.id - b.value.id);

            const nextBatch = nextBatches.find(
                (batch, index) =>
                    batch.value.id > selectedBatch.value.id &&
                    (index === 0 || nextBatches[index - 1].value.id === selectedBatch.value.id)
            );

            const defaultBatch = (nextBatch || nextBatches[nextBatches.length - 1]);
            setSelectedBatch(defaultBatch);
            setSelectedBatchQuantity(defaultBatch?.value?.quantity || 0);
            setInventory((prevItems) =>
                prevItems.map((item, itemIndex) =>
                    itemIndex === currIndex ? {
                        ...item, id: defaultBatch?.value?.id,
                        quantity: defaultBatch?.value?.quantity,
                        batchNumber: defaultBatch?.value?.batchNumber,
                        expiry: defaultBatch?.value?.expiry,
                        sellingPrice: defaultBatch?.value?.sellingPrice,
                        costPrice: defaultBatch?.value?.costPrice,
                        //   itemName : defaultBatch?.value?.itemName,
                        distributors: defaultBatch?.value?.distributors,
                        totalCost: defaultBatch?.value?.totalCost,
                        maxQuantity: defaultBatch?.value?.quantity,
                        maxRetailPrice: defaultBatch?.value?.maxRetailPrice,
                        productId: defaultBatch?.value?.productId
                    } :
                        item,
                )
            );
            if (defaultBatch?.value?.quantity <= 0) {
                setShowConfirmation(true);
            }
            setAction('idle');

        }
    }, [confirmAction])


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
        placeholder: (provided: any) => ({
            ...provided,
            color: '#A2A3A3',
        }),
    };

    const { fetchedProducts, isLoading, error } = useProductfetch(appState.currentBranchId);
    const { fetchedBathces, isBatchLoading, batchError } = useProductBatchfetch(appState.currentBranchId);
    const { fetchedAdmin, isAdminLoading, adminError } = useAdminFetch(appState.currentBranchId);
    useEffect(() => {
        if (fetchedAdmin && !isAdminLoading && !adminError) {
            //    console.log(data)
            const usersWithRoles = fetchedAdmin.map((user: any) => {
                return {
                    ...user,
                    role: user.role
                };
            });
            //   console.log("users with role in ",usersWithRoles);
            setBranchUsers(usersWithRoles);
        }
    }, [fetchedAdmin, error, isLoading]);

    console.log("app state in updatre inventory is :", appState);


    useEffect(() => {
        if (individualSelectedProduct && products.length > 0) {
            console.log(individualSelectedProduct)
            const fillItemName = () => {
                // console.log(inventory);
                //   console.log(fetchedProducts, products)
                const object = {
                    label: individualSelectedProduct.itemName,
                    value: {
                        id: individualSelectedProduct.id
                    }
                };
                setInventory((prevInventory) => {
                    const updatedInventory = [{ itemName: individualSelectedProduct.itemName }];
                    handleProductSelect(object, updatedInventory.length - 1);
                    return updatedInventory;
                });

            }
            fillItemName()
        }
    }, [individualSelectedProduct, products])


    useEffect(() => {
        if (!isLoading && fetchedProducts && !error) {
            //console.log(fetchedProducts);
            const formattedProducts = fetchedProducts.map((product: Products) => ({
                value: {
                    id: product.id,
                    quantity: product.quantity,
                    itemName: product.itemName,
                    hsnCode: product.hsnCode,
                    provider: product?.providers[0]
                },
                label: product.itemName,
            }));
            //  console.log("formattedProducts  : ",formattedProducts)
            setProducts(formattedProducts);
        }
        if (!batchError && !isBatchLoading && fetchedBathces) {
            console.log("fetchededasdsads", fetchedBathces);
            const formattedProductBatches = fetchedBathces.map((product: ProductBatch) => ({
                value: {
                    id: product.id,
                    productId: product.productId,
                    quantity: product.quantity,
                    batchNumber: product.batchNumber,
                    expiry: product.expiry,
                    sellingPrice: product.sellingPrice,
                    costPrice: product.costPrice,
                    distributors: product.distributors[0],
                    totalCost: product.totalCost,
                    maxQuantity: product.quantity,
                    maxRetailPrice: product.maxRetailPrice
                },
                label: product.batchNumber
            }));
            //   console.log("formattedProductBatches   ",formattedProductBatches)
            setBatches(formattedProductBatches)
            console.log("batches are ", batches);
        }
    }, [fetchedProducts, fetchedBathces, batchError, error, isBatchLoading, isLoading])

    useEffect(() => {
        inventory.push({});
        setFilteredBatches((prevBatches: any[]) => {
            const updatedBatches = [...prevBatches];
            updatedBatches.push([]);
            return updatedBatches;
        }
        );
        setInventory(inventory);
    }, [])

    //Handlers
    const handleRadioChange = useCallback((value: string) => {
        setSelectedOption(value);
        const updatedInventory = inventory.map((item) => ({
            ...item,
            quantity: value === Stock.StockIN ? 0 : item.quantity,
            expiry: value === Stock.StockIN ? "" : item.expiry,
            batchNumber: value === Stock.StockIN ? "" : item.batchNumber,
            totalCost: value === Stock.StockIN ? 0 : item.totalCost,
            costPrice: value === Stock.StockIN ? 0 : item.costPrice,
            sellingPrice: value === Stock.StockIN ? 0 : item.sellingPrice
        }));
        setInventory(updatedInventory);
    }, [inventory]);

    const handleChange = (field: string, value: any) => {

        setFormData({ ...formData, [field]: value });
    };

    const handleDeleteRow = (index: number) => {
        const updatedInventory = inventory.filter((_, i) => i !== index);

        if (updatedInventory.length === 0 || updatedInventory[updatedInventory.length - 1]?.item) {
            updatedInventory.push({});
        }

        const updatedBatches = filteredBatches.filter((_, i) => i !== index);

        setFilteredBatches([...updatedBatches]);
        setInventory([...updatedInventory]);
    };

    console.log(inventory);




    const handleQuantityDecClick = useCallback((index: number) => {
        const updatedInventory = [...inventory];
        updatedInventory[index].quantity = Math.max(updatedInventory[index].quantity - 1, 0);
        handleInputChange(index, 'quantity', updatedInventory[index].quantity);
        setInventory(updatedInventory);
    }, [inventory]);

    const handleQuantityIncClick = useCallback((index: number) => {
        const updatedInventory = [...inventory];
        if (selectedOption === Stock.StockOUT) {
            if (updatedInventory[index].quantity < updatedInventory[index].maxQuantity) {
                updatedInventory[index].quantity += 1;
                handleInputChange(index, 'quantity', updatedInventory[index].quantity);
            }
        } else {
            updatedInventory[index].quantity += 1;
            handleInputChange(index, 'quantity', updatedInventory[index].quantity);
        }

        setInventory(updatedInventory);
    }, [inventory]);

    // const handleInputChange = useCallback((index: number, field: string, value: string | number) => {

    //     const updatedInventory = [...inventory];
    //     updatedInventory[index][field] = value;
    //     if (field === 'quantity' || field === 'costPrice') {
    //         updatedInventory[index].sellingPrice =
    //             (updatedInventory[index]?.quantity || 0) * (updatedInventory[index]?.costPrice || 0);
    //     }
    //     console.log("Inventory",inventory);
    //     setInventory(updatedInventory);
    //     const validationResult = FormData.safeParse(updatedInventory[index]);

    //     console.log("validation result",validationResult);

    //     if (!validationResult.success) {
    //         // const errorMessages = validationResult.error.errors.map((error) => error.message).join(', ');
    //         setErrorValidation(true);
    //     } else {
    //         setErrorValidation(false);
    //     }
    //     console.log("updatedInventory  ", updatedInventory);

    // }, [inventory]);
    function handleInputChange(index: number, field: string, value: string | number) {
        const updatedInventory = [...inventory];
        updatedInventory[index][field] = value;

        if (field === 'quantity' || field === 'costPrice') {
            updatedInventory[index].sellingPrice =
                (updatedInventory[index]?.quantity || 0) * (updatedInventory[index]?.costPrice || 0);
        }

        setInventory(updatedInventory);

        if (field === 'batchNumber') {
            const isDuplicateBatch = batches.some(batch => batch.label === String(value));
            console.log("Checking for duplicate batch:", isDuplicateBatch);
            if (isDuplicateBatch) {
                console.error("Duplicate batch number detected");
                setErrorValidation(true);
            }
        }


        const validationResult = FormData.safeParse(updatedInventory[index]);
        if (!validationResult.success) {
            setErrorValidation(true);
        } else {
            setErrorValidation(false);
        }

        console.log("updatedInventory  ", updatedInventory);
    }



    const handleCheckBoxChange = useCallback(() => {
        setChecked(!isChecked);
    }, [inventory]);

    const handleAddItemClick = useCallback(() => {
        setInventory([...inventory, {}]);
    }, [inventory]);

    const handleProductSelect = useCallback(async (selectedProduct: any, index: number) => {
        //console.log(selectedProduct)
        console.log("inventory", inventory);
        if (index === inventory.length - 1) {
            inventory.push({});
            setFilteredBatches((prevBatches: any[]) => {
                const updatedBatches = [...prevBatches];
                updatedBatches.push([]);
                return updatedBatches;
            }
            );
            setInventory(inventory);
        }
        if (selectedProduct.value) {
            try {
                const data = products.find((product) => product.value.id === selectedProduct.value.id);
                //console.log(data);
                setSelectedProduct(data);
                console.log("data of selected is  ", data);
                const updatedInventory = [...inventory];
                updatedInventory[index] = {
                    ...updatedInventory[index],
                    quantity: selectedOption === Stock.StockIN ? 0 : data.value.quantity,
                    productId: data.value.id,
                    hsnCode: data.value.hsnCode,
                    itemName: data.value.itemName,
                    providers: data.value.provider

                };
                console.log("updatedInventory:  ", updatedInventory);
                setInventory(updatedInventory);
                const productBatches = batches?.filter((batch) => batch.value.productId === selectedProduct.value.id).sort((a, b) => a.value.id - b.value.id);

                setFilteredBatches((prevBatches: any[]) => {
                    const updatedBatches = [...prevBatches];
                    updatedBatches[index] = productBatches;
                    return updatedBatches;
                });
                console.log("updated batches", filteredBatches);
                if (selectedOption === Stock.StockOUT) {
                    setCurrIndex(index);
                    const defaultBatch = productBatches?.[0];
                    setSelectedBatchQuantity(defaultBatch?.value?.quantity);
                    setSelectedBatch(defaultBatch);

                    setInventory((prevItems) =>
                        prevItems.map((item, itemIndex) =>
                            itemIndex === index ? {
                                ...item, id: defaultBatch?.value?.id,
                                quantity: 1,
                                batchNumber: defaultBatch?.value?.batchNumber,
                                expiry: defaultBatch?.value?.expiry,
                                sellingPrice: defaultBatch?.value?.sellingPrice,
                                costPrice: defaultBatch?.value?.costPrice,
                                //   itemName : defaultBatch?.value?.itemName,
                                distributors: defaultBatch?.value?.distributors,
                                totalCost: defaultBatch?.value?.totalCost,
                                maxQuantity: defaultBatch?.value?.quantity,
                                maxRetailPrice: defaultBatch?.value?.maxRetailPrice,
                                productId: defaultBatch?.value?.productId
                            } :
                                item,
                        )
                    );
                    setSelectedBatch(defaultBatch);
                    setSelectedBatchQuantity(defaultBatch?.value?.quantity);
                    if (defaultBatch?.value?.quantity <= 0) {
                        setShowConfirmation(true);
                    }

                }

            } catch (error) {
                console.error("Error fetching product details from API:", error);
            }
        }
    }, [inventory, products, selectedOption]);


    const handleBatchSelect = useCallback(async (selectedProduct: any, index: number) => {
        // console.log(selectedProduct);
        setCurrIndex(index);
        if (selectedProduct.value) {
            try {
                const data = filteredBatches.find((batch) => batch.value.id == selectedProduct.value.id);
                // console.log(data)
                setSelectedBatchQuantity(data.value.quantity);
                // setSelectedBatch(data);


                const updatedInventory = [...inventory];
                updatedInventory[index] = {
                    ...updatedInventory[index],
                    id: data?.value?.id,
                    itemName: data.value.itemName,
                    date: data?.value?.date,
                    time: data?.value?.time,
                    quantity: selectedOption === Stock.StockIN ? 0 : data?.value?.quantity,
                    maxQuantity: Math.max(data?.value?.quantity, data?.value?.maxQuantity),
                    batchNumber: selectedOption === Stock.StockIN ? "" : data?.value?.batchNumber,
                    expiry: selectedOption === Stock.StockIN ? "" : data?.value?.expiry,
                    costPrice: selectedOption === Stock.StockIN ? "" : data?.value?.costPrice,
                    sellingPrice: selectedOption === Stock.StockIN ? "" : data?.value?.sellingPrice,
                    totalCost: selectedOption === Stock.StockIN ? "" : data?.value?.totalCost,
                    hsnCode: selectedProductDetails?.hsnCode,
                    //    location: selectedOption === Stock.StockIN ? "" :selectedProductDetails?.location,
                    distributors: data?.value?.category,
                    providers: data?.value?.distributors,
                    maxRetailPrice: data?.value?.maxRetailPrice,
                    productId: data?.value?.productId,
                };

                setInventory(updatedInventory);
                if (data?.value?.quantity <= 0) {
                    setShowConfirmation(true);
                }
                if (selectedOption === Stock.StockOUT) {
                    setCurrIndex(index);
                }
                // if (selectedOption === Stock.StockOUT) {
                //     const updatedProducts = products.filter((product) => product.value !== selectedProduct.value);
                //     setProducts(updatedProducts);
                // }
            } catch (error) {
                console.error("Error fetching product details from API:", error);
            }
        }
    }, [inventory, products, selectedOption]);

    console.log("Appstate is :", appState)

    const [newlocation, setInput] = useState<string>('');

    const handleLocationInput = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setInput(selectedOption.label); // Save the label instead of value
            // console.log(`Location changed to: `, selectedOption.label);
        }
    };


    const handleUpdateInventory = useCallback(async () => {
        try {
            setUpdating(true);
            inventory.pop();

            for (const item of inventory) {
                // Skip validation if Stock Out is selected
                if (selectedOption === Stock.StockIN) {
                    FormData.parse(item);
                }
                console.log("item", item);
                const { id, date, quantity, batchNumber, providers, productId, maxRetailPrice, isApproved, itemName, hsnCode } = item;
                const invoiceType = "Manual";
                const location = newlocation;

                console.log("item name is ", item);
                let { expiry, costPrice, sellingPrice } = item;
                console.log(sellingPrice);
                expiry = expiry || null;
                costPrice = costPrice || null;
                sellingPrice = sellingPrice || null;
                if (expiry) {
                    let datetime = new Date(expiry);
                    let isoString = datetime.toISOString();
                    expiry = isoString.substring(0, 23) + "+00:00";
                }

                const stockStatus = selectedOption;
                const body = {
                    invoiceType,
                    stockStatus,
                    date,
                    quantity,
                    batchNumber,
                    expiry,
                    costPrice,
                    maxRetailPrice,
                    sellingPrice,
                    distributors: [providers],
                    location,
                    productId,
                    hsnCode,
                    isApproved: true
                };
                console.log("body is ", body);
                if (selectedOption === Stock.StockOUT) {
                    console.log("saving new batch :", body)
                    if (appState.isCurrentOrgAdmin) {
                        const responsePromise = axios.put(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/${id}?branchId=${appState.currentBranchId}`, body);
                        const notifData = {
                            totalItems: body.quantity,
                            source: Notif_Source.Inventory_Timeline_Removed,
                            url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/inventory/products/overview/${body.productId}`,
                            orgId: appState.currentOrgId,
                            data: {
                                body1: body,
                                productId: id,
                                message: `Stock levels successfully updated for ${body.quantity} items. Click here to see items removed from inventory.`
                            },
                        }
                        const notifPromise = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData)

                        setTimeout(() => {
                            onClose();
                        }, 2000)
                        const [response, notif] = await Promise.all([responsePromise, notifPromise]);
                    }
                    else {
                        const notifData = {
                            source: Notif_Source.Inventory_Update_Approval_Request,
                            orgId: appState.currentOrgId,
                            name: value,
                            totalItems: body.quantity,
                            itemName: itemName,
                            data: {
                                body1: body,
                                productId: id,
                            },
                        }
                        const notifPromise = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData)
                        setTimeout(() => {
                            onClose();
                        }, 2000)
                        const [notif] = await Promise.all([notifPromise]);
                    }
                }
                else if (selectedOption === Stock.StockIN) {
                    console.log(body);
                    console.log("saving new batch :", body)
                    {
                        const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/create?branchId=${appState.currentBranchId}`, body);
                        const notifData = {
                            totalItems: body.quantity,
                            source: Notif_Source.Inventory_Timeline_Added,
                            url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/inventory/products/overview?id=${productId}`,
                            orgId: appState.currentOrgId,
                            message: `Stock levels successfully updated for ${body.quantity} items. Click here to see the addition to your inventory.`
                        }
                        const notifPromise = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData)
                        setTimeout(() => {
                            onClose();
                        }, 2000)
                        const [response, notif] = await Promise.all([responsePromise, notifPromise]);
                    }
                }
            }

            // After successful update, revalidate the SWR cache
            mutate(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${appState.currentBranchId}`);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                const fields: string[] = Object.keys(fieldErrors);
                setErrorValidation(true);
            }
            console.error("Error updating inventory:", error);
        }
        finally {
            setUpdating(false);
        }
    }, [inventory]);

    //Distributors
    useEffect(() => {

        const fetchDistributors = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/getAll?branchId=${appState.currentBranchId}`);
                const distributors = response.data.map((distributor: Distributors) => ({
                    value: distributor.id,
                    label: distributor.distributorName
                }));
                // console.log(distributors);
                setDistributor(distributors);
            } catch (error) {
                // console.log("Error fetching distributors", error);
            }
        }
        fetchDistributors();
    }, []);

    const [reason, setReason] = useState<any[]>([]);
    useEffect(() => {
        const fetchReason = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/reason/getAll?branchId=${appState.currentBranchId}`);
                const reasonList: any[] = response.data.reduce((acc: any[], reasonEntry: Reason) => {
                    if (Array.isArray(reasonEntry.name)) {
                        reasonEntry.name.forEach((name: string) => {
                            acc.push({ value: reasonEntry.id, label: name });
                        });
                    } else {
                        acc.push({ value: reasonEntry.id, label: reasonEntry.name });
                    }
                    return acc;
                }, []);
                // console.log(reasonList);
                setReason(reasonList);
            } catch (error) {
                //     console.log("Error fetching species", error);
            }
        }
        fetchReason();
    }, [appState.currentBranchId]);

    const [location1, setLocation] = useState<any[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<any | null>(null);

    useEffect(() => {
        const fetchlocation = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/LocationCategory/getAll?branchId=${appState.currentBranchId}`);
                const locationList: any[] = response.data.reduce((acc: any[], locationEntry: LocationList) => {
                    if (Array.isArray(locationEntry.name)) {
                        locationEntry.name.forEach((name: string) => {
                            acc.push({ value: locationEntry.id, label: name });
                        });
                    } else {
                        acc.push({ value: locationEntry.id, label: locationEntry.name });
                    }
                    return acc;
                }, []);
                console.log("location list is ", locationList);
                setLocation(locationList);
                if (locationList.length > 0) {
                    setSelectedLocation(locationList[0]);
                }
            } catch (error) {
                console.log("Error fetching location", error);
            }
        }
        fetchlocation();
    }, [appState.currentBranchId]);

    return (
        <>
            <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-[#F4F5F7] bg-opacity-50 z-50">
                {showConfirmation && <StockConfirmationPopup quantity={selectedBatchQuantity} setAction={setAction} setShowConfirmation={setShowConfirmation} />}
                <div className="w-[98%] min-h-[481px] flex-col p-8 bg-[#F4F5F7] gap-6 rounded-[20px]">
                    {/* <div className="flex justify-end p-8 gap-4">
                        
                        <button className="border-0 outline-0 cursor-pointer" onClick={onClose}><Image src={closeicon} alt="minimize" /></button>
                    </div> */}
                    <div className="flex justify-end gap-4">
                        <div className="flex-grow"></div> {/* Added flex-grow to push the close icon to the right */}
                        <button className="w-[24px] h-[24px] border-0 outline-0 cursor-pointer" onClick={onClose}>
                            <Image src={closeicon} alt="close" />
                        </button>
                    </div>
                    <div className="text-gray-500 text-xl font-medium ">Update Inventory</div>
                    <div className="text-neutral-400 text-base font-medium ">Add or subtract quantity from inventory</div>
                    <div className="w-full h-[72px] px-6 py-4 bg-white border border-neutral-400 justify-between items-center gap-4 flex rounded-t-lg">
                        <div className="flex gap-4">
                            <RadioButton
                                label="Stock In"
                                value={Stock.StockIN}
                                checked={selectedOption === Stock.StockIN}
                                onChange={handleRadioChange}
                            />
                            <RadioButton
                                label="Stock Out"
                                value={Stock.StockOUT}
                                checked={selectedOption === Stock.StockOUT}
                                onChange={handleRadioChange}
                            />
                        </div>
                        {/* <div className="relative">
                            <button className="cursor-pointer h-11 px-4 py-2.5 bg-zinc-900 rounded-[5px] border-0 justify-start items-center gap-2 flex" onClick={handleAddItemClick}>
                                <Image src={addicon} alt="add" />
                                <div className="text-white text-base font-bold  bg-transparent border-0" >
                                    Add Item
                                </div>
                            </button>
                        </div> */}
                    </div>
                    <div className="pb-6 rounded-b-lg">
                        <div className='flex w-full justify-between items-center box-border bg-gray-100 h-12 border-b border-neutral-400 text-gray-500'>
                            <div className='flex text-gray-500 text-base font-medium px-2 w-[5rem]'>No.</div>
                            <div className='flex text-gray-500 text-base font-medium w-[15rem]'>Product</div>
                            <div className='flex text-gray-500 text-base font-medium w-[8rem]'>Quantity</div>
                            {selectedOption === Stock.StockOUT && (
                                <div className='flex text-gray-500 text-base font-medium w-[10rem]'>Reason</div>
                            )}
                            <div className='flex text-gray-500 text-base font-medium w-[8rem]'>Batch No.</div>
                            <div className='flex text-gray-500 text-base font-medium w-[10rem]'>Expiry</div>
                            <div className='flex text-gray-500 text-base font-medium w-[6rem]'>Barcode</div>
                            <div className='flex text-gray-500 text-base font-medium w-[8rem]'>Location</div>
                            <div className='flex text-gray-500 text-base font-medium w-[10rem]'>Distributor</div>
                            <div className='flex text-gray-500 text-base font-medium w-[8rem]'>Unit Price</div>
                            <div className='flex text-gray-500 text-base font-medium w-[8rem]'>MRP</div>
                            <div className='flex text-gray-500 text-base font-medium w-[8rem]'>Subtotal</div>

                        </div>
                          
                        {inventory.map((item, index) => (
                            <div key={`${index}-${item.itemName || 'empty'}`} className='flex justify-evenly items-center w-full  py-2  bg-white text-gray-400  '>
                                <div className='w-[5rem] px-2 flex items-center text-neutral-400 text-base font-medium'>{index + 1}</div>
                                <div className='w-[15rem] flex items-center text-neutral-400 text-base font-medium'>
                                    <Select
                                        className="text-gray-500 text-base font-medium w-[90%] "
                                        classNamePrefix="select"
                                        value={products.find((prod) => prod.value.id === item.productId)}
                                        isClearable={false}
                                        isSearchable={true}
                                        name="itemName"
                                        options={products}
                                        onChange={(selectedProduct: any) => handleProductSelect(selectedProduct, index)}
                                        styles={customStyles}
                                    />
                                </div>
                                <div className='w-[8rem] flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                    <button className="bg-white rounded-[5px] border-2 border-solid border-white" onClick={() => handleQuantityDecClick(index)}>
                                        <Image className="w-4 h-4" src={subicon} alt="-" />
                                    </button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleInputChange(index, 'quantity', parseInt(e.target.value, 10))}
                                        className="w-[40px] border border-solid border-white focus:border-textGreen outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded"

                                    />
                                    <button className="bg-white rounded-[5px] border-2 border-solid border-white" onClick={() => handleQuantityIncClick(index)}>
                                        <Image className="w-4 h-4" src={add1icon} alt="+" />
                                    </button>
                                </div>
                                {selectedOption === Stock.StockOUT && (
                                    <div className='w-[10rem] flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                        <Select
                                            className="text-gray-500 text-base font-medium  w-full border-0 boxShadow-0"
                                            placeholder="Reason"
                                            isClearable={false}
                                            isSearchable={true}
                                            options={reason}
                                            isMulti={true}
                                            name="Reasons"
                                            onChange={(value) => handleChange("reasons", value)}
                                            styles={customStyles}
                                        />
                                    </div>
                                )}

                                <div className='w-[8em] flex items-center text-neutral-400 text-base font-medium'>
                                    {selectedOption === Stock.StockIN ? (
                                        <input
                                            type="text"
                                            value={item.batchNumber}
                                            placeholder="00000000"
                                            onChange={(e) => handleInputChange(index, 'batchNumber', e.target.value)}
                                            className="w-[90%] focus:border-textGreen outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded placeholder:text-[#A2A3A3] border border-solid border-borderGrey"
                                            name={`batchNumber-${index}`}
                                        />
                                    ) :
                                        (
                                            <Select
                                                className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0"
                                                classNamePrefix="select"
                                                value={batches.find((prod) => prod.value.id === item.id)}
                                                isClearable={false}
                                                isSearchable={true}
                                                name={`batchNumber=${index}`}
                                                options={filteredBatches[index]}
                                                onChange={(selectedProduct: any) => handleBatchSelect(selectedProduct, index)}
                                                styles={customStyles}

                                            />
                                        )}

                                </div>
                                <div className='w-[10rem] flex items-center text-neutral-400 text-base font-medium'>
                                    {selectedOption === Stock.StockIN &&
                                        <DatePicker

                                            className="w-[90%] rounded-[5px] border border-solid border-borderGrey outline-none  focus:border focus:border-textGreen px-1 py-2"
                                            selected={item.expiry}
                                            placeholderText="MM/DD/YYYY"
                                            onChange={(date: any) => {
                                                handleInputChange(index, "expiry", date)
                                            }}
                                            calendarClassName="react-datepicker-custom"

                                        />
                                    }
                                    {item.expiry && selectedOption !== Stock.StockIN && (
                                        <div>{formatDateAndTime(item.expiry).formattedDate}</div>
                                    )}
                                </div>

                                <div className='w-[6rem] flex items-center text-neutral-400 text-base font-medium'>
                                    <input
                                        type="text"
                                        value={item.hsnCode}
                                        onChange={(e) => handleInputChange(index, 'hsnCode', e.target.value)}
                                        placeholder="000000"
                                        className="w-[90%] border border-solid border-white focus:border-textGreen outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded placeholder:text-textGrey1"
                                        name={`hsnCode-${index}`}
                                    />
                                </div>

                                <div className='w-[10rem] flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                    <Select
                                        className="text-gray-500 text-base font-medium w-full border-0 boxShadow-0"
                                        placeholder="Location"
                                        isClearable={false}
                                        isSearchable={true}
                                        options={location1} // Ensure this is an array of objects with { value, label }
                                        name="Location"
                                        value={selectedLocation}
                                        // onChange={(value) => handleInputChange(index, 'location', value)}
                                        onChange={handleLocationInput} // Pass the selected option object
                                        styles={customStyles}
                                    />

                                </div>

                                <div className='w-[10rem] flex items-center text-neutral-400 text-base font-medium '>
                                    <Select
                                        className="text-gray-500 text-base font-medium  w-[90%] border-0 boxShadow-0"
                                        placeholder="Select"
                                        isClearable={false}
                                        isSearchable={true}
                                        options={distributor}
                                        isMulti={false}
                                        value={
                                            distributor.find((option) => option.label === inventory[index]?.providers) || null
                                        }
                                        name={`providers-${index}`}
                                        onChange={(e) => handleInputChange(index, 'providers', e?.label)}
                                        styles={customStyles}
                                    />

                                </div>
                                <div className='w-[8rem] flex items-center text-neutral-400 text-base font-medium'>₹
                                    <input
                                        type="number"
                                        value={item.costPrice}
                                        placeholder="0"
                                        onChange={(e) => handleInputChange(index, 'costPrice', parseFloat(e.target.value))}
                                        className="w-full border border-solid border-white focus:border-textGreen outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded placeholder:text-textGrey1"
                                        name={`costPrice-${index}`}
                                    />
                                </div>
                                <div className='w-[8rem] rounded-[5px] flex items-center text-neutral-400 text-base font-medium'>₹
                                    <input
                                        type="number"
                                        value={item.maxRetailPrice}
                                        placeholder="0"
                                        onChange={(e) => handleInputChange(index, 'maxRetailPrice', parseFloat(e.target.value))}
                                        className="w-full border border-solid border-white focus:border-textGreen outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded placeholder:text-textGrey1"
                                        name={`maxRetailPrice-${index}`}
                                    />
                                </div>

                                <div className='w-[8rem] flex items-center text-neutral-400 text-base font-medium'>₹
                                    <input
                                        type="number"
                                        disabled={true}
                                        value={item.quantity * item.costPrice}
                                        placeholder="0"
                                        onChange={(e) => handleInputChange(index, 'sellingPrice', parseFloat(e.target.value))}
                                        className="w-full border border-solid border-white focus:border-textGreen outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded placeholder:text-textGrey1"
                                        name={`sellingPrice-${index}`}

                                    />
                                </div>
                                <div className="w-[2rem]">
                                    {index !== inventory.length - 1 ? <button onClick={() => handleDeleteRow(index)} className=" border-0 flex-col justify-start items-end gap-2.5 flex">
                                        <div className="h-6 px-2 py-1 bg-gray-100 rounded-[5px] justify-start items-center gap-1 flex">
                                            <Image className="w-4 h-4 relative" src={deleteicon} alt="delete" />
                                        </div>
                                    </button> : ""}

                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="flex items-center">
                            {errorValidation ? <div className="flex-grow text-red-600">*Please enter Quantity,Unit Price, Unique Batch and MRP to continue</div> : <div className="flex-grow"></div>}
                            <div className="bg-black px-4 py-2.5 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer" onClick={handleUpdateInventory}>
                                <Image src={checkicon} alt="add" />
                                <button className="text-white text-base font-bold bg-transparent border-0 cursor-pointer" disabled={updating}>
                                    {updating ? <Loading2 /> : "Update Inventory"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Popup2;
