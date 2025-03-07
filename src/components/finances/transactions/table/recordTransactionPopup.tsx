"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import RadioButton from "../../../../assets/icons/finance/radio_button.svg"
import RadioButtonSelec from "../../../../assets/icons/finance/radio_button (1).svg"
import DatePicker from 'react-datepicker';
import check from "../../../../assets/icons/finance/check.svg"
import { addAmount } from '@/lib/features/transactionAmount/transactionAmountSlice';
import 'react-datepicker/dist/react-datepicker.css';
import calicon from "../../../../assets/icons/finance/calendar_today.svg";
import closeicon from "../../../../assets/icons/inventory/closeIcon.svg";
import Select from 'react-select';
import { Button } from '@nextui-org/react';
import { useAppSelector } from '@/lib/hooks';
import useSWR from 'swr';

import Loading2 from '@/app/loading2';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

type PopupProps = {
    onClose: () => void;
    initialInvoiceNo: any;
    distributor?: string;
    setIsTransactionMade?:any
}
interface ProductOption {
    value: string;
    label: string;
    price: number;
    productBatch: ProductBatch[],
}

interface ServiceOption {
    value: string;
    label: string;
    price: number;
    quantity: number;
}

interface ProductBatch {
    id: number;
    batchNumber: string;
    sellingPrice: number;
    quantity: number;
}

const RecordTransactionPopup: React.FC<PopupProps> = ({ onClose, initialInvoiceNo, distributor,setIsTransactionMade }: any) => {

    const dispatch = useDispatch();

    const [isSaving, setSaving] = useState(false);

    const [formData, setFormData] = useState<any>({});
    const appState = useAppSelector((state) => state.app)

    const Mode = [
        { value: "Cash", label: "Cash" },
        { value: "UPI", label: "UPI" },
        { value: "Card", label: "Card" },
        { value: "Net Banking", label: "Net Banking" },
    ]



    const Party = [
        { value: "WeCare", label: "WeCare" },
        { value: "Pawzeeble", label: "Pawzeeble" },
        { value: "Betaturd", label: "Betaturd" },
        { value: "Smegmalord", label: "Smegmalord" },
    ]



    const [startDate, setStartDate] = useState(new Date());
    const [transactionType, setTransactionType] = useState<string | null>("Money In");
    const [selectedProducts, setSelectedProducts] = useState<ProductOption[]>([]);
    const [productOptions, setProductOptions] = useState([]);
    const [selectedServices, setSelectedServices] = useState<ServiceOption[]>([]);
    const [serviceOptions, setServiceOptions] = useState([]);
    const [selectedInvoiceLink, setSelectedInvoiceLink] = useState<string | string[]>([]);
    const [selectedInvoiceLinkID, setSelectedInvoiceLinkID] = useState([]);
    const [selectedMode, setSelectedMode] = useState('');
    const [linkInvoice, setLinkInvoice] = useState<any>([]);
    const [modeOptions, setModeOptions] = useState<any>([]);
    const [clientsOptions, setClientsOptions] = useState<any>([]);
    const [selectedClient, setSelectedClient] = useState<any>([]);
    const [distributorOptions, setDistributorOptions] = useState<any>([]);
    const [selectedDistributor, setSelectedDistributor] = useState<any>([]);
    const [batchOptions, setBatchOptions] = useState<Record<number, { value: number; label: string; sellingPrice: number; productId: number }[]>>({});
    const [selectedBatch, setSelectedBatch] = useState<any[]>([]);
    const handleDateChange = (date: any) => {
        setStartDate(date);
        setFormData({ ...formData, date });
    };

    const handleToggleRadioButton = (type: string) => {
        setTransactionType(type);
    };

    const handleSaveClick = async () => {
        setSaving(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/create?branchId=${appState.currentBranchId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    partyName: distributor ? distributor : selectedClient || selectedDistributor || "Direct",
                    subject: formData.subject,
                    invoiceLink: (selectedInvoiceLink) || "Direct",
                    receiptNo: initialInvoiceNo,
                    date: formData.date || new Date(),
                    amountPaid: parseInt(formData.amountPaid, 10),
                    mode: (selectedMode),
                    moneyChange: transactionType === 'Money In' ? 'In' : 'Out',
                    products: (selectedProducts),
                    services: (selectedServices),
                })
            });
            if (response.ok) {
                // console.log('Data saved Sucessfully')
                if(setIsTransactionMade) setIsTransactionMade((prev:any)=>prev+1);
                onClose();
                window.dispatchEvent(new FocusEvent('focus'))
            } else {
                console.error('Failed to save data')
            }
        } catch (error) {
            console.error('Error while saving data:', error)
        } finally {

        }

        const newTransaction = {
            amountPaid: parseInt(formData.amountPaid, 10),
            date: formData.date || new Date(),
            mode: (selectedMode),
            moneyChange: transactionType === 'Money In' ? 'In' : 'Out',
            receiptNo: initialInvoiceNo,
        };

        dispatch(addAmount({ amountPaid: parseInt(formData.amountPaid, 10), mode: (selectedMode), invoiceLink: selectedInvoiceLink || "Direct", moneyChange: transactionType === 'Money In' ? 'In' : 'Out', date: formData.date || new Date(), receiptNo: initialInvoiceNo }))

        try {
            //console.log(selectedInvoiceLink[0]);
            if (selectedInvoiceLink[0].startsWith("P")) {
                const putResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/${selectedInvoiceLinkID}/?branchId=${appState.currentBranchId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        recordTransaction: [newTransaction]
                    })
                });
            } else {
                const putResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/${selectedInvoiceLinkID}/?branchId=${appState.currentBranchId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        recordTransaction: [newTransaction]
                    })
                });
            }
        } catch (error) {
           
        } finally {
            setSaving(false);
        }
    };

    // console.log(formData)

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    }


    const { data: products, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/getAll/?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });
    const { data: service, error: serviceError, isLoading: serviceLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true })
    const { data: invoice, error: invoiceError, isLoading: invoiceLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });
    const { data: modes, error: modesError, isLoading: modesLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/paymentMethod/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });
    const { data: clients, error: clientsError, isLoading: clientsLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/clients/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });
    const { data: distributors, error: distributorsError, isLoading: distributorsLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/distributors/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });

    // invoice && console.log(invoice)
    // service && console.log(service)
    // products && console.log("pprprprprp",products)
    clients && console.log("clients", clients)
    distributors && console.log("distributors", distributors)


    useEffect(() => {

        if (products && !error && !isLoading) {
            const formattedProducts = products.reduce((acc: any[], item: any) => {
                const productId = item.product.id;

                const batchInfo = {
                    id: item.id,
                    batchNumber: item.batchNumber,
                    sellingPrice: item?.sellingPrice,
                    quantity: 1,
                };

                const checkIfProductExsists = acc.find((product: any) => product.value === productId);

                if (checkIfProductExsists) {
                    checkIfProductExsists.productBatch.push(batchInfo);
                } else {
                    acc.push({
                        value: item.product.id,
                        label: item.product.itemName,
                        productBatch: [batchInfo],
                    });
                }

                return acc;
            }, []);
            console.log(formattedProducts);
            setProductOptions(formattedProducts);
        }

        if (service && !serviceError && !serviceLoading) {
            const options1 = service.map((service: any) => ({
                value: service?.id,
                label: service?.name,
                price: service?.serviceCharge,
                quantity: 1
            }));
            setServiceOptions(options1);
        }

        if (invoice && !invoiceError && !invoiceLoading) {
            const options2 = invoice.map((invoices: any) => ({
                value: invoices.salesId ? invoices.salesId : (invoices.purchasesId ? invoices.purchasesId : invoices.expensesId),
                label: invoices.sale?.invoiceNo ? invoices.sale?.invoiceNo : (invoices.purchases?.invoiceNo ? invoices.purchases?.invoiceNo : invoices.expenses?.invoiceNo),
            }))
            setLinkInvoice(options2)
        }

        if (modes && !modesError && !modesLoading) {
            const options3 = modes.map((mode: any) => ({
                value: mode?.id,
                label: mode?.name,
            }))
            setModeOptions(options3)
        }

        if (clients && !clientsError && !clientsLoading) {
            const options = clients.map((client: any) => ({
                value: client?.id,
                label: client?.clientName,
            }));
            setClientsOptions(options);
        }

        if (distributors && !distributorsError && !distributorsLoading) {
            const options = distributors.map((distributor: any) => ({
                value: distributor?.id,
                label: distributor?.distributorName,
            }));
            setDistributorOptions(options);
        }

    }, [products, service, error, isLoading, serviceError, serviceLoading, invoice, invoiceError, invoiceLoading, modes, modesError, modesLoading, clients, clientsError, clientsLoading, distributors, distributorsError, distributorsLoading]);

    // console.log(linkInvoice)

    const handleLinkInvoice = (selectedOptions: any) => {
        setSelectedInvoiceLinkID(selectedOptions?.value);
        setSelectedInvoiceLink(selectedOptions?.label);
    }

    const handleModeSelect = (selectedOptions: any) => {
        setSelectedMode(selectedOptions?.label);
    }


    const handleProductSelect = (selectedOptions: any) => {
        setSelectedProducts(selectedOptions);
        const updatedBatchOptions = { ...batchOptions };
        selectedOptions.forEach((product: any) => {
            const options = product.productBatch.map((batch: any) => ({
                value: batch.id,
                label: batch.batchNumber,
                sellingPrice: batch.sellingPrice,
                productId: product.value,
                quantity: batch.quantity
            }));
            //console.log(options);
            updatedBatchOptions[product.value] = options;
        });
        setBatchOptions(updatedBatchOptions);

    };

    const handleProductRemove = (productId: any) => {
        const updatedProducts = selectedProducts.filter((product) => product.value !== productId);
        setSelectedProducts(updatedProducts);
        const updatedBatchOptions = { ...batchOptions };
        delete updatedBatchOptions[productId];
        setBatchOptions(updatedBatchOptions);
        const updatedBatchFormData = selectedBatch.filter((batch: any) => batch.productId !== productId);
        //console.log(updatedBatchFormData);
        setSelectedBatch(updatedBatchFormData);

    };

    const handleServiceSelect = (selectedOptions: any) => {
        setSelectedServices(selectedOptions);

    };

    const handleServiceRemove = (serviceId: any) => {
        setSelectedServices(selectedServices?.filter(service => service.value !== serviceId));

    };


    const handleBatchSelect = (selectedOptions: any, index: number) => {
        const updatedList = [...selectedBatch];
        updatedList[index] = selectedOptions;
        setSelectedBatch(updatedList);
        //setBatchFormData(updatedList);

    }

    const handleQuantityChange = (quantity: number, index: number) => {
        const updatedList = [...selectedBatch];
        updatedList[index].quantity = Number(quantity);
        //console.log(updatedList);
        setSelectedBatch(updatedList);

    }

    const handleServiceQuantityChange = (quantity: number, index: number) => {
        const updatedList = [...selectedServices];
        updatedList[index].quantity = Number(quantity);
        console.log(updatedList);
        setSelectedServices(updatedList);

    }

    const handleClientSelect = (selectedOptions: any) => {
        setSelectedClient(selectedOptions?.label);
    };

    const handleDistributorSelect = (selectedOptions: any) => {
        setSelectedDistributor(selectedOptions?.label);
    };


    //   console.log("Hererererererer",JSON.stringify(selectedProducts[0]?.label),selectedProducts[0]?.label)

    const updatetotal = () => {
        const totalProductAmount = selectedBatch.reduce((sum: number, batch: any) => sum + batch.sellingPrice * (batch.quantity || 1), 0);
        const totalServiceAmount = selectedServices.reduce((sum, service) => sum + service.price * (service.quantity || 1), 0);
        const amountPaidOtherThanLinked = formData.amountPaidOtherThanLinked || 0;
        const totalAmount = (Number(totalProductAmount) + Number(totalServiceAmount) + Number(amountPaidOtherThanLinked)).toString();
        setFormData((prevFormData: any) => ({ ...prevFormData, ProductamountPaid: totalProductAmount, ServiceamountPaid: totalServiceAmount, amountPaid: totalAmount }));
    }

    useEffect(() => {
        updatetotal();
    }, [selectedProducts, selectedServices, selectedBatch, formData.amountPaidOtherThanLinked]);

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

    console.log("setSelectedInvoiceLinkID", selectedInvoiceLinkID)
    const isDisabled = !(selectedClient || selectedDistributor) || !(formData?.subject) || !(formData?.amountPaid) || !selectedMode

    return (
        <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] h-[700px] py-2 pb-8  px-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex overflow-auto container">
                <div className="self-end items-start gap-6 flex mt-[0.6rem] cursor-pointer" onClick={onClose}>
                    <Image src={closeicon} alt="close"></Image>
                </div>
                <div className='w-full flex flex-col gap-1'>

                    <div className="text-gray-500 text-xl font-medium ">Record Payment</div>
                    <div className="text-neutral-400 text-base font-medium ">Note down the details of the transaction</div>
                </div>
                <div className='w-full flex gap-36'>
                    <div className='flex gap-1'>
                        <div onClick={() => handleToggleRadioButton('Money In')}>
                            {transactionType !== 'Money In' ? (
                                <Image src={RadioButton} alt='RadioButton' />
                            ) : (
                                <Image src={RadioButtonSelec} alt='RadioButtonSelec' />
                            )}
                        </div>
                        <div>
                            <span className='text-base text-textGrey2 font-medium'>
                                Money In
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <div onClick={() => handleToggleRadioButton('Money Out')}>
                            {transactionType !== 'Money Out' ? (
                                <Image src={RadioButton} alt='RadioButton' />
                            ) : (
                                <Image src={RadioButtonSelec} alt='RadioButtonSelec' />
                            )}
                        </div>
                        <div>
                            <span className='text-base text-textGrey2 font-medium'>
                                Money Out
                            </span>
                        </div>
                    </div>

                </div>
                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>{distributor ? "Distributor" : "Client/Distributor"}<span className='text-red-600'>*</span></span></div>
                    <div className='w-[440px]'>

                        {distributor ? <div>
                            <input className="w-[440px] h-9 rounded-[5px] text-textGrey2 text-base font-medium p-2  outline-none border border-solid border-borderGrey focus:border-teal-500 " type="text" name="partyName" disabled={true} placeholder={distributor} />
                        </div> : (!clientsLoading && !distributorsLoading) ? (
                            <Select
                                className="text-neutral-400 text-base font-medium w-full border border-solid border-borderGrey rounded-[5px]"
                                placeholder="Select Category"
                                isClearable={false}
                                options={clientsOptions.concat(distributorOptions)}
                                isMulti={false}
                                name="partyName"
                                onChange={(value) => handleClientSelect(value)}
                                styles={customStyles}
                            />
                        ) : (
                            <Loading2 />
                        )

                        }
                    </div>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Subject <span className='text-red-600'>*</span></span></div>
                    <div><input className="w-[440px] h-9 rounded-[5px] text-textGrey2 text-base font-medium p-2  outline-none border border-solid border-borderGrey focus:border-teal-500 " type="text" name="subject" onChange={(e) => handleChange("subject", e.target.value)} /></div>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Ref No.<span className='text-red-600'>*</span></span></div>
                    <div className='w-[440px]'>
                        {linkInvoice ? (
                            <Select
                                className="text-neutral-400 text-base font-medium w-full border border-solid border-borderGrey rounded-[5px]"
                                placeholder="Select Category"
                                isClearable={true}
                                isSearchable={true}
                                options={linkInvoice}
                                isMulti={false}
                                name="invoiceLink"
                                onChange={(value) => handleLinkInvoice(value)}
                                styles={customStyles}
                            />
                        ) : (
                            <div className="text-neutral-400 text-base font-medium w-full"><Loading2 /></div>
                        )}
                    </div>
                </div>



                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Link Product(s)</span></div>
                    <div className="w-[440px]">
                        {products ? (
                            <Select
                                className="text-neutral-400 text-base font-medium w-full border border-solid border-borderGrey rounded-[5px]"
                                placeholder="Select Product"
                                isClearable={true}
                                isSearchable={true}
                                options={productOptions}
                                isMulti={true}
                                value={selectedProducts}
                                name="linkProduct"
                                onChange={(selectedOptions: any) => {
                                    const removedProduct = selectedProducts.find(
                                        (product) => !selectedOptions.some((option: any) => option.value === product.value)
                                    );

                                    if (removedProduct) {

                                        handleProductRemove(removedProduct.value);
                                    } else {

                                        handleProductSelect(selectedOptions as any[]);
                                    }
                                }}
                                styles={customStyles}
                            />
                        ) : (
                            <div className="text-neutral-400 text-base font-medium w-full"><Loading2 /></div>
                        )}
                    </div>
                </div>

                <div className='w-full bg-white rounded-[5px] flex flex-col border border-solid border-borderGrey '>
                    <div className='w-full h-9 bg-[#F4F5F7] flex justify-evenly items-center text-textGrey2 rounded-tl-[5px] rounded-tr-[5px] border-0 border-b border-solid border-borderGrey'>
                        <div className='w-3/12  text-textGrey2 font-medium text-base'>Name</div>
                        <div className='w-3/12 text-textGrey2 font-medium text-base'>Batch No</div>
                        <div className='w-3/12 text-textGrey2 font-medium text-base'>Selling Price</div>
                        <div className='w-3/12  text-textGrey2 font-medium text-base'>Quantity</div>

                    </div>
                    <div className='w-full  h-[10rem] overflow-y-auto container'>
                        {selectedProducts.map((product, index) => (
                            <div
                                key={product.value}
                                className="w-full h-9  flex justify-evenly items-center text-textGrey2 border-0 border-b border-solid border-borderGrey"
                            >
                                <div className="w-3/12 text-textGrey2 font-medium text-base">{product.label}</div>
                                <div className="w-3/12 text-textGrey2 font-medium text-base">
                                    <Select
                                        className="text-neutral-400 text-base font-medium w-full h-fit border border-solid border-borderGrey rounded-[5px]"
                                        placeholder="Select Batch"
                                        isClearable={false}
                                        isSearchable={true}
                                        options={batchOptions[Number(product.value)]}
                                        isMulti={false}
                                        name="batch"
                                        onChange={(value) => handleBatchSelect(value, index)}
                                        styles={customStyles}
                                    />
                                </div>

                                <div className="w-3/12 text-textGrey2 text-center font-medium text-base">₹{selectedBatch[index]?.sellingPrice || ''}</div>
                                <div className="w-3/12  text-textGrey2 font-medium text-base" >
                                    <input className='text-center text-md font-medium block w-1/2 px-1 py-2 mx-auto text-gray-500 outline-none  border border-solid rounded-md border-neutral-500' type='number' value={selectedBatch[index]?.quantity || ''} onChange={(e: any) => handleQuantityChange(e.target.value, index)}></input>
                                </div>
                                <div
                                    className="w-[3rem] text-textGrey2 font-medium text-base flex justify-center items-center cursor-pointer"
                                    onClick={() => handleProductRemove(product.value)}
                                >
                                    <Image className="w-4 h-4" src={closeicon} alt="Delete" />
                                </div>
                            </div>
                        ))}


                    </div>






                    <div className='w-full h-9 bg-[#F4F5F7] flex justify-evenly items-center text-textGrey2 rounded-bl-[5px] rounded-br-[5px]'>
                        <div className='w-[10rem] text-textGrey2 font-bold text-base'>Total</div>
                        <div className='w-[8rem] text-textGrey2 font-bold text-base'>₹ {formData.ProductamountPaid}</div>
                        <div className='w-[10rem] text-textGrey2 font-medium text-base'></div>
                        <div className='w-[3rem] text-textGrey2 font-medium text-base'></div>
                    </div>
                </div>


                <div className='w-full flex justify-between items-center mt-4'>
                    <div>
                        <span className='text-gray-500 text-base font-medium '>Link Service(s)</span>
                    </div>
                    <div className="w-[440px]">
                        {service ? (
                            <Select
                                className="text-neutral-400 text-base font-medium w-full border border-solid border-borderGrey rounded-[5px]"
                                placeholder="Select Service"
                                isClearable={false}
                                isSearchable={true}
                                options={serviceOptions}
                                isMulti={true}
                                name="linkService"
                                onChange={(selectedOptions: any) => {
                                    const removedService = selectedServices.find(
                                        (service) => !selectedOptions.some((option: any) => option.value === service.value)
                                    );

                                    if (removedService) {

                                        handleServiceRemove(removedService.value);
                                    } else {

                                        handleServiceSelect(selectedOptions as any[]);
                                    }
                                }}
                                value={selectedServices}
                                styles={customStyles}
                            />
                        ) : (
                            <div className="text-neutral-400 text-base font-medium w-full"><Loading2 /></div>
                        )}
                    </div>
                </div>


                <div className='w-full  bg-white rounded-[5px] flex flex-col border border-solid border-borderGrey '>
                    <div className='w-full h-9 bg-[#F4F5F7] flex justify-evenly items-center text-textGrey2 rounded-tl-[5px] rounded-tr-[5px] border-0 border-b border-solid border-borderGrey'>
                        <div className='w-3/12  text-textGrey2 font-medium text-base'>Name</div>
                        <div className='w-3/12 text-textGrey2 font-medium text-base'>Selling Price</div>
                        <div className='w-3/12  text-textGrey2 font-medium text-base'>Quantity</div>

                    </div>

                    <div className='w-full h-[10rem]  overflow-y-auto container'>

                        {selectedServices.map((service, index) => (
                            <div
                                key={service.value}
                                className="w-full h-9 flex justify-evenly items-center text-textGrey2 border-0 border-b border-solid border-borderGrey"
                            >
                                <div className="w-3/12 text-textGrey2 font-medium text-base">{service.label}</div>
                                <div className="w-3/12 text-textGrey2 text-center font-medium text-base">₹ {service.price}</div>
                                <div className="w-3/12  text-textGrey2 font-medium text-base" >
                                    <input className='text-center text-md font-medium block w-1/2 px-1 py-2 mx-auto text-gray-500 outline-none  border border-solid rounded-md border-neutral-500' type='number' value={selectedServices[index]?.quantity || ''} onChange={(e: any) => handleServiceQuantityChange(e.target.value, index)}></input>
                                </div>
                                <div
                                    className="w-[3rem] text-textGrey2 font-medium text-base flex justify-center items-center cursor-pointer"
                                    onClick={() => handleServiceRemove(service.value)}
                                >
                                    <Image className="w-4 h-4" src={closeicon} alt="Delete" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='w-full h-9 bg-[#F4F5F7] flex justify-evenly items-center text-textGrey2 rounded-bl-[5px] rounded-br-[5px]'>
                        <div className='w-[10rem] text-textGrey2 font-bold text-base'>Total</div>
                        <div className='w-[8rem] text-textGrey2 font-bold text-base'>₹ {formData.ServiceamountPaid}</div>
                        <div className='w-[10rem] text-textGrey2 font-medium text-base'></div>
                        <div className='w-[3rem] text-textGrey2 font-medium text-base'></div>
                    </div>
                </div>







                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Receipt No.</span></div>
                    <div className='w-[440px] flex justify-between items-center'>
                        <div><div className="w-[10rem] h-9 rounded-[5px] bg-white text-textGrey2 text-base font-medium p-2  border border-solid border-borderGrey flex items-center">#{initialInvoiceNo}</div></div>


                        <div><span className='text-gray-500 text-base font-medium '>Mode <span className='text-red-600'>*</span></span></div>
                        <div className='w-[10rem]'>
                            {/* <Select
                            className="text-neutral-400 text-base font-medium w-full"
                            placeholder="Mode"
                            isClearable={false}
                            isSearchable={true}
                            options={Mode}
                            isMulti={false}
                            name="mode"
                            onChange={(value) => handleChange("mode", value)}
                            styles={customStyles}
                        /> */}
                            {!modesLoading && modeOptions ? (
                                <Select
                                    className="text-neutral-400 text-base font-medium w-full border border-solid border-borderGrey rounded-[5px]"
                                    placeholder=""
                                    isClearable={true}
                                    isSearchable={true}
                                    options={modeOptions}
                                    isMulti={false}
                                    name="mode"
                                    onChange={(value) => handleModeSelect(value)}
                                    styles={customStyles}
                                />
                            ) : (
                                <Loading2 />
                            )}
                        </div>
                    </div>

                </div>
                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Other<span className='text-red-600'>*</span></span></div>
                    <div className='w-[440px] flex justify-between items-center'>
                        <div>
                            <input
                                className="w-[10rem] h-9 rounded-[5px] text-textGrey2 text-base font-medium p-2 outline-none border border-solid border-borderGrey focus:border-teal-500"
                                type="number"
                                name="amountPaidOtherThanLinked"
                                value={formData.amountPaidOtherThanLinked}
                                onChange={(e) => handleChange("amountPaidOtherThanLinked", e.target.value)}
                            />
                        </div>

                        <div><span className='text-gray-500 text-base font-medium '>Date</span></div>
                        <div className='relative'>
                            <DatePicker
                                className="w-[10rem]"
                                selected={startDate || new Date()}
                                onChange={handleDateChange}
                                calendarClassName="react-datepicker-custom"
                                customInput={
                                    <div className='relative'>
                                        <input
                                            className="w-[10rem] h-9 text-textGrey1 text-base font-medium px-2 rounded border-0   focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                            value={startDate.toLocaleDateString() || new Date().toLocaleDateString()}
                                            readOnly
                                        />
                                        <Image
                                            src={calicon}
                                            alt="Calendar Icon"
                                            className="absolute right-0 top-2 cursor-pointer"
                                            width={50}
                                            height={20}
                                        />
                                    </div>
                                }
                            />
                        </div>
                    </div>

                </div>

                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Total <span className='text-red-600'>*</span></span></div>
                    <div className='w-[440px] flex justify-between items-center'>
                        <div>
                            <input
                                className="w-[10rem] h-9 rounded-[5px] text-textGrey2 text-base font-medium p-2 outline-none border border-solid border-borderGrey focus:border-teal-500"
                                type="number"
                                disabled={true}
                                name="amountPaid"
                                value={formData.amountPaid}
                                onChange={(e) => handleChange("amountPaid", e.target.value)}
                            />
                        </div>
                    </div>



                </div>


                <div className='w-full flex justify-end'>
                    <Button className={`px-4 py-2.5 text-white text-base rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer ${isDisabled ? 'bg-gray-400' : 'bg-zinc-900'
                        }`} onClick={handleSaveClick} disabled={isDisabled || isSaving}>
                        <Image src={check} alt='check' />
                        <span className='text-white text-base font-medium pr-2'>{isSaving ? <Loading2/> : "Save Payment"}</span>
                    </Button>
                </div>

            </div>
        </div>
    )

}

export default RecordTransactionPopup