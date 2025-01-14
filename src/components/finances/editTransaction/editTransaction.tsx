"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

import RadioButton from "../../../assets/icons/finance/radio_button.svg"
import RadioButtonSelec from "../../../assets/icons/finance/radio_button (1).svg"
import DatePicker from 'react-datepicker';
import check from "../../../assets/icons/finance/check.svg"

import 'react-datepicker/dist/react-datepicker.css';
import calicon from "../../../assets/icons/finance/calendar_today.svg";
import closeicon from "../../../assets/icons/inventory/closeIcon.svg";
import Select from 'react-select';
import { Button } from '@nextui-org/react';
import { useAppSelector } from '@/lib/hooks';
import useSWR from 'swr';

import Loading2 from '@/app/loading2';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

type PopupProps = {
    onClose: any;
    editTransaction: any;
    transactionsData?: any;
    balanceDue?: any;
    type: string,
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
}

interface ProductBatch {
    id: number;
    quantity: number;
    costPrice: number;
    sellingPrice: number;
    totalCost: number;
    maxRetailPrice: number;
}

const EditRecordTransactionPopup: React.FC<PopupProps> = ({ editTransaction, onClose, transactionsData, type, balanceDue }) => {
    const url = useSearchParams();
    const id = url.get('id');


    const [isSaving, setSaving] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const appState = useAppSelector((state) => state.app)
    const [startDate, setStartDate] = useState(new Date());
    const [transactionType, setTransactionType] = useState<string | null>("Money In");
    const [selectedProducts, setSelectedProducts] = useState<ProductOption[]>([]);
    const [productOptions, setProductOptions] = useState([]);
    const [selectedServices, setSelectedServices] = useState<ServiceOption[]>([]);
    const [serviceOptions, setServiceOptions] = useState([]);

    const [selectedMode, setSelectedMode] = useState('');
    const [modeOptions, setModeOptions] = useState<any>([]);
    const [linkInvoice, setLinkInvoice] = useState<any>([]);



    const handleDateChange = (date: any) => {
        setStartDate(date);
        setFormData({ ...formData, date });
    };

    const handleToggleRadioButton = (type: string) => {
        setTransactionType(type);
    };

    const handleSaveClick = async () => {
        if (type === 'invoice') {
            try {

                setSaving(true);
                const response = await axios.put(
                    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/editTransaction/${editTransaction?.invoiceLink}?branchId=${appState.currentBranchId}`,
                    {
                        receiptNo: editTransaction?.receiptNo,
                        partyName: editTransaction?.partyName.replace(/\d+/g, "").trim() || "Unknown",
                        subject: formData.subject,
                        date: formData.date || new Date(),
                        amountPaid: parseInt(formData.amountPaid.toString(), 10),
                        mode: selectedMode,
                        moneyChange: transactionType === 'Money In' ? 'In' : 'Out',
                        products: selectedProducts,
                        services: selectedServices,
                    },
                    {

                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log(response);
                if (response.status === 201) {


                    //window.dispatchEvent(new FocusEvent('focus'))
                } else {
                    console.error('Failed to save data')
                }

                if (transactionsData) {
                    transactionsData.forEach((transaction: any) => {
                        if (transaction?.receiptNo === editTransaction.receiptNo) {
                            transaction.amountPaid = parseInt(formData.amountPaid, 10);
                            transaction.date = formData.date || new Date();
                            transaction.mode = selectedMode;
                            transaction.moneyChange = transactionType === 'Money In' ? 'In' : 'Out';
                        }
                    });
                }

                onClose();


            }
            catch (err) {
                console.log(err);
            }
            finally {
                setSaving(false);
            }
        }
        else if (type === 'exsistingInvoice') {
            try {

                const newTransaction = {
                    receiptNo: editTransaction?.receiptNo,
                    date: formData.date || new Date(),
                    amountPaid: parseInt(formData.amountPaid, 10),
                    mode: selectedMode,
                    moneyChange: transactionType === 'Money In' ? 'In' : 'Out',
                }

                setSaving(true);
                const [transactionResponse, recordResponse] = await Promise.all([
                    axios.put(
                        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/editTransaction/${editTransaction?.invoiceLink}?branchId=${appState.currentBranchId}`,
                        {
                            receiptNo: editTransaction?.receiptNo,
                            partyName: editTransaction?.partyName.replace(/\d+/g, "").trim() || "Unknown",
                            subject: formData.subject,
                            date: formData.date || new Date(),
                            amountPaid: parseInt(formData.amountPaid, 10),
                            mode: selectedMode,
                            moneyChange: transactionType === 'Money In' ? 'In' : 'Out',
                            products: selectedProducts,
                            services: selectedServices,
                        },
                        {

                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    ),
                    axios.put(
                        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/editRecordTransaction/${editTransaction?.invoiceLink}?branchId=${appState.currentBranchId}`,
                        {
                            recordTransaction: [newTransaction],
                        },
                        {

                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    )
                ])

                if (transactionResponse.status === 201 && recordResponse.status === 201) {
                    if (!(editTransaction?.invoiceLink.includes('SE'))) {
                        if (id) {
                            //console.log('Here')
                            const balanceStatus = balanceDue && (editTransaction?.invoiceLink.startsWith('S') || editTransaction?.invoiceLink.includes('PR')) ? (balanceDue + (editTransaction?.moneyChange === 'In' ? Number(editTransaction?.amountPaid) : -Number(editTransaction?.amountPaid)) + (transactionType === 'Money In' ? -1 * Number(formData.amountPaid) : Number(formData.amountPaid))) :  (balanceDue + (editTransaction?.moneyChange === 'In' ? -Number(editTransaction?.amountPaid) : Number(editTransaction?.amountPaid)) + (transactionType === 'Money In' ? Number(formData.amountPaid) : -Number(formData.amountPaid))) ;
                            //console.log(balanceDue,balanceStatus,editTransaction?.amountPaid, formData.amountPaid)
                            const baseURL=`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/${editTransaction?.invoiceLink.startsWith('S') ? 'sales' : 'purchases'}/status/${id}/?branchId=${appState.currentBranchId}`
                            const putResponse = await fetch(baseURL, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    status: (editTransaction?.invoiceLink.startsWith('S') || editTransaction?.invoiceLink.includes('PR')) ? balanceStatus && (balanceStatus >= 1 ? `You’re owed: ₹${parseFloat((balanceStatus).toFixed(2))}` : balanceStatus <= -1 ? `You owe: ₹${parseFloat((-1 * balanceStatus).toFixed(2))}` : 'Closed'): balanceStatus <= -1 ? `You’re owed: ₹${parseFloat((-1 * balanceStatus).toString()).toFixed(2)}` : balanceStatus >= 1 ? `You owe: ₹${parseFloat((balanceStatus).toString()).toFixed(2)}` : 'Closed',
                                })

                            })
                            if (putResponse.ok) {
                                onClose();
                                window.dispatchEvent(new FocusEvent('focus'))
                            } else {
                                console.error('Failed to save data')
                            }
                        }
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setSaving(false);
            }
        }



    }


    // console.log(formData)

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    }


    const { data: products, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/getAll/?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });
    const { data: service, error: serviceError, isLoading: serviceLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/service/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true })
    const { data: invoice, error: invoiceError, isLoading: invoiceLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });
    const { data: modes, error: modesError, isLoading: modesLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/paymentMethod/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });






    useEffect(() => {

        if (products && !error && !isLoading) {
            const options = products.map((product: any) => ({
                value: product?.id,
                label: product.product?.itemName,
                price: product?.sellingPrice,
            }));
            setProductOptions(options);
        }

        if (service && !serviceError && !serviceLoading) {
            const options1 = service.map((service: any) => ({
                value: service?.id,
                label: service?.name,
                price: service?.serviceCharge,
            }));
            setServiceOptions(options1);
        }



        if (modes && !modesError && !modesLoading) {
            const options3 = modes.map((mode: any) => ({
                value: mode?.id,
                label: mode?.name,
            }))
            setModeOptions(options3)
        }

        if (invoice && !invoiceError && !invoiceLoading) {
            const options2 = invoice.map((invoices: any) => ({
                value: invoices.salesId ? invoices.salesId : (invoices.purchasesId ? invoices.purchasesId : invoices.expensesId),
                label: invoices.sale?.invoiceNo ? invoices.sale?.invoiceNo : (invoices.purchases?.invoiceNo ? invoices.purchases?.invoiceNo : invoices.expenses?.invoiceNo),
            }))
            setLinkInvoice(options2)
        }


    }, [products, service, error, isLoading, serviceError, serviceLoading, modes, modesError, modesLoading, invoice, invoiceError, invoiceLoading]);

    // console.log(linkInvoice)



    const handleModeSelect = (selectedOptions: any) => {
        setSelectedMode(selectedOptions?.label);
    }


    const handleProductSelect = (selectedOptions: any) => {
        setSelectedProducts(selectedOptions);
    };

    const handleProductRemove = (productId: any) => {
        setSelectedProducts(selectedProducts?.filter(product => product.value !== productId));
    };

    const handleServiceSelect = (selectedOptions: any) => {
        setSelectedServices(selectedOptions);
    };

    const handleServiceRemove = (serviceId: any) => {
        setSelectedServices(selectedServices?.filter(service => service.value !== serviceId));
    };




    //   console.log("Hererererererer",JSON.stringify(selectedProducts[0]?.label),selectedProducts[0]?.label)

    useEffect(() => {
        const totalProductAmount = selectedProducts.reduce((sum, product) => sum + product.price, 0);
        const totalServiceAmount = selectedServices.reduce((sum, service) => sum + service.price, 0);
        const totalAmount = totalProductAmount + totalServiceAmount;
        setFormData((prevFormData: any) => ({ ...prevFormData, amountPaid: totalAmount }));
    }, [selectedProducts, selectedServices]);

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

    //console.log("setSelectedInvoiceLinkID", selectedInvoiceLinkID)

    const isDisabled = !(formData?.subject) || !(formData?.amountPaid) || !selectedMode
    //console.log(isDisabled && isDisabled);
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
                    <div><span className='text-gray-500 text-base font-medium '>Party Name</span></div>
                    <div>
                        <input className="w-[440px] h-9 rounded-[5px] text-textGrey2 text-base font-medium p-2  outline-none border border-solid border-borderGrey focus:border-teal-500 " type="text" name="partyName" disabled={true} placeholder={editTransaction?.partyName} />
                    </div>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Subject*</span></div>
                    <div><input className="w-[440px] h-9 rounded-[5px] text-textGrey2 text-base font-medium p-2  outline-none border border-solid border-borderGrey focus:border-teal-500 " type="text" name="subject" onChange={(e) => handleChange("subject", e.target.value)} /></div>
                </div>
                {/* <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Ref. No.</span></div>
                    <div>
                        <input className="w-[440px] h-9 rounded-[5px] text-textGrey2 text-base font-medium p-2  outline-none border border-solid border-borderGrey focus:border-teal-500 " type="text" name="refNo" disabled={true} placeholder={editTransaction?.invoiceLink} />
                    </div>
                </div> */}
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
                                onChange={(value) => handleServiceSelect(value)}
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
                                name="linkProduct"
                                onChange={(value) => handleProductSelect(value)}
                                styles={customStyles}
                            />
                        ) : (
                            <div className="text-neutral-400 text-base font-medium w-full"><Loading2 /></div>
                        )}
                    </div>            </div>

                <div className='w-full bg-white rounded-[5px] flex flex-col border border-solid border-borderGrey '>
                    <div className='w-full h-9 bg-[#F4F5F7] flex justify-evenly items-center text-textGrey2 rounded-tl-[5px] rounded-tr-[5px] border-0 border-b border-solid border-borderGrey'>
                        <div className='w-[10rem] text-textGrey2 font-medium text-base'>Name</div>
                        <div className='w-[8rem] text-textGrey2 font-medium text-base'>Selling Price</div>
                        <div className='w-[10rem] text-textGrey2 font-medium text-base'>Quantity</div>
                        <div className='w-[3rem] text-textGrey2 font-medium text-base'></div>
                    </div>
                    <div className='w-full h-[5rem] overflow-y-auto container'>
                        {selectedProducts.map((product) => (
                            <div
                                key={product.value}
                                className="w-full h-9 flex justify-evenly items-center text-textGrey2 border-0 border-b border-solid border-borderGrey"
                            >
                                <div className="w-[10rem] text-textGrey2 font-medium text-base">{product.label}</div>
                                <div className="w-[8rem] text-textGrey2 font-medium text-base">₹ {product.price}</div>
                                <div className="w-[10rem] text-textGrey2 font-medium text-base">1</div>
                                <div
                                    className="w-[3rem] text-textGrey2 font-medium text-base flex justify-center items-center cursor-pointer"
                                    onClick={() => handleProductRemove(product.value)}
                                >
                                    <Image className="w-4 h-4" src={closeicon} alt="Delete" />
                                </div>
                            </div>
                        ))}

                        {selectedServices.map((service) => (
                            <div
                                key={service.value}
                                className="w-full h-9 flex justify-evenly items-center text-textGrey2 border-0 border-b border-solid border-borderGrey"
                            >
                                <div className="w-[10rem] text-textGrey2 font-medium text-base">{service.label}</div>
                                <div className="w-[8rem] text-textGrey2 font-medium text-base">₹ {service.price}</div>
                                <div className="w-[10rem] text-textGrey2 font-medium text-base">1</div>
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
                        <div className='w-[8rem] text-textGrey2 font-bold text-base'>₹ {formData.amountPaid}</div>
                        <div className='w-[10rem] text-textGrey2 font-medium text-base'></div>
                        <div className='w-[3rem] text-textGrey2 font-medium text-base'></div>
                    </div>
                </div>

                <div className='w-full flex justify-between items-center'>
                    <div><span className='text-gray-500 text-base font-medium '>Receipt No.</span></div>
                    <div className='w-[440px] flex justify-between items-center'>
                        <div><div className="w-[10rem] h-9 rounded-[5px] bg-white text-textGrey2 text-base font-medium p-2  border border-solid border-borderGrey flex items-center">#{editTransaction?.receiptNo}</div></div>


                        <div><span className='text-gray-500 text-base font-medium '>Mode</span></div>
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
                    <div><span className='text-gray-500 text-base font-medium '>Amount Paid</span></div>
                    <div className='w-[440px] flex justify-between items-center'>
                        <div><input className="w-[10rem] h-9 rounded-[5px] text-textGrey2 text-base font-medium p-2  outline-none border border-solid border-borderGrey focus:border-teal-500 " type="number" name="amountPaid" value={formData.amountPaid} onChange={(e) => handleChange("amountPaid", e.target.value)} /></div>

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
                <div className='w-full flex justify-end'>
                    <Button className={`px-4 py-2.5 text-white text-base rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer ${isDisabled ? 'bg-gray-400' : 'bg-zinc-900'
                        }`} onClick={handleSaveClick} disabled={isDisabled || isSaving}>
                        <Image src={check} alt='check' />
                        <span className='text-white text-base font-medium pr-2'>{isSaving ? <Loading2></Loading2> : "Save Payment"}</span>
                    </Button>
                </div>

            </div>
        </div>
    )

}


export default EditRecordTransactionPopup;