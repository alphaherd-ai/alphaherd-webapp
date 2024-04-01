'use client';
import Image from "next/image";
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import closeicon from "../../../../assets/icons/inventory/closeIcon.svg";
import arrowicon from "../../../../assets/icons/inventory/arrow.svg";
import minicon from "../../../../assets/icons/inventory/mini.svg";
import addicon from "../../../../assets/icons/inventory/add.svg";
import deleteicon from "../../../../assets/icons/loginsignup/delete.svg";
import add1icon from "../../../../assets/icons/inventory/add (1).svg";
import RadioButton from './RadioButton';
import subicon from "../../../../assets/icons/inventory/1. Icons-24 (6) (2).svg";
import checkicon from "../../../../assets/icons/inventory/check (1).svg";
import Select from 'react-select';
import formatDateAndTime from "@/utils/formateDateTime";

type PopupProps = {
    onClose: () => void;
}

interface AllProducts {
    id: string;
    date: string;
    time: string;
    quantity: number;
    batchNumber:string;
    expiry:string;
    costPrice:number;
    sellingPrice :number;
    itemName:string;
    hsnCode:string;
    category :string;
    providers:string[];
}

const Popup2: React.FC<PopupProps> = ({ onClose }) => {
    const [selectedOption, setSelectedOption] = useState<string>('Stock In');
    const [isChecked, setChecked] = useState(false);
    const [products, setProducts] = useState<{ value: string; label: string }[]>([]);
    const [inventory, setInventory] = useState<any[]>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/inventory/product/getBySorting`);
            const formattedProducts = response.data.map((product: AllProducts) => ({
                value: product.id,
                label: product.itemName,
            }));
            setProducts(formattedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };


    //Handlers
    const handleRadioChange = useCallback((value: string) => {
        setSelectedOption(value);
        const updatedInventory = inventory.map((item) => ({
            ...item,
            quantity: value === 'Stock In' ? 0 : item.quantity,
            expiry: value === 'Stock In' ? "" : item.expiry
        }));
        setInventory(updatedInventory);
    }, [inventory]);

    const handleDeleteRow = useCallback((index: number) => {
        const updatedInventory = [...inventory];
        updatedInventory.splice(index, 1);
        setInventory(updatedInventory);
    }, [inventory]);
    
    const handleQuantityDecClick = useCallback((index: number) => {
        const updatedInventory = [...inventory];
        updatedInventory[index].quantity = Math.max(updatedInventory[index].quantity - 1, 0);
        setInventory(updatedInventory);
    },[inventory]);

    const handleQuantityIncClick = useCallback((index: number) => {
        const updatedInventory = [...inventory];
        if(selectedOption==='Stock Out'){
            if(updatedInventory[index].quantity<updatedInventory[index].maxQuantity){
                updatedInventory[index].quantity += 1;
            }  
        }else{
            updatedInventory[index].quantity += 1;
        }
        
        setInventory(updatedInventory);
    },[inventory]);
      
    const handleInputChange = useCallback((index: number, field: string, value: string | number) => {
        const updatedInventory = [...inventory];
        updatedInventory[index][field] = value;
        setInventory(updatedInventory);
    }, [inventory]);


    const handleCheckBoxChange = useCallback(() => {
        setChecked(!isChecked);
    },[inventory]);

    const handleAddItemClick = useCallback(() => {
        setInventory([...inventory, {}]);
    }, [inventory]);

    const handleProductSelect = useCallback(async (selectedProduct: any, index: number) => {
        if (selectedProduct.value) {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/inventory/product/${selectedProduct.value}`);
                const data = response.data;
                const updatedInventory = [...inventory];
                updatedInventory[index] = {
                    ...updatedInventory[index],
                    id: data.id,
                    date: data.date,
                    time: data.time,
                    quantity: selectedOption === 'Stock In' ? 0 : data.quantity,
                    maxQuantity: data.quantity,
                    batchNumber: selectedOption === 'Stock In' ? "" : data.batchNumber,
                    expiry: selectedOption === 'Stock In' ? "" : data.expiry,
                    costPrice: selectedOption === 'Stock In' ? "" : data.costPrice,
                    sellingPrice: selectedOption === 'Stock In' ? "" : data.sellingPrice,
                    itemName: data.itemName,
                    hsnCode: data.hsnCode,
                    category: data.category,
                    providers: data.providers,
                };
                setInventory(updatedInventory);
                if (selectedOption === 'Stock Out') {
                    const updatedProducts = products.filter((product) => product.value !== selectedProduct.value);
                    setProducts(updatedProducts);
                }
            } catch (error) {
                console.error("Error fetching product details from API:", error);
            }
        }
    }, [inventory, products, selectedOption]);

    const handleUpdateInventory = useCallback(async () => {
        try {
            for (const item of inventory) {
                const { id, date, time, quantity, batchNumber, itemName, hsnCode, category, providers } = item;
                const invoiceType="Manual";
                let {expiry,costPrice,sellingPrice}=item;
               
                expiry = expiry || null;
                costPrice = costPrice ||null;
                sellingPrice = sellingPrice || null;
                if(expiry){
                let datetime = new Date(expiry);
                let isoString = datetime.toISOString(); 
                expiry = isoString.substring(0, 23) + "+00:00";
                }
                 

                const stockStatus=selectedOption;
                const body = {
                    invoiceType,
                    stockStatus,
                    date,
                    quantity,
                    batchNumber,
                    expiry,
                    costPrice,
                    sellingPrice,
                    itemName,
                    hsnCode,
                    category,
                    providers,
                };
                const response = await axios.put(`${process.env.NEXT_API_BASE_PATH}/api/inventory/product/${id}`, body);
                console.log('Updated inventory item:', response.data);
            }
            alert('Inventory updated successfully');
        } catch (error) {
            console.error("Error updating inventory:", error);
            alert('Error updating inventory. Please try again.');
        }
    },[inventory]);
    

    return (
        <>
            <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 fixed inset-0 backdrop-blur-sm bg-gray-100 bg-opacity-50 z-50">
                <div className="w-[1392px] min-h-[481px] flex-col p-8 bg-gray-200 gap-6">
                    <div className="flex justify-end p-8 gap-4">
                        <button><Image src={minicon} alt="minimize" /></button>
                        <button onClick={onClose}><Image src={closeicon} alt="minimize" /></button>
                    </div>
                    <div className="text-gray-500 text-xl font-medium font-['Satoshi']">Update Inventory</div>
                    <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Add or subtract quantity from inventory</div>
                    <div className="w-full h-[72px] px-6 py-4 bg-white border border-neutral-400 justify-between items-center gap-4 flex">
                        <div className="flex gap-4">
                            <RadioButton
                                label="Stock In"
                                value="Stock In"
                                checked={selectedOption === 'Stock In'}
                                onChange={handleRadioChange}
                            />
                            <RadioButton
                                label="Stock Out"
                                value="Stock Out"
                                checked={selectedOption === 'Stock Out'}
                                onChange={handleRadioChange}
                            />
                        </div>
                        <div className="relative">
                            <div className="w-[132px] h-11 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                <Image src={addicon} alt="add" />
                                <button className="text-white text-base font-bold font-['Satoshi'] bg-transparent border-0" onClick={handleAddItemClick}>
                                    Add Item
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="pb-6">
                        <div className='flex  w-full justify-evenly items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                            <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>No.</div>
                            <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>Product</div>
                            <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>Quantity</div>
                            <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>Batch No.</div>
                            <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>Expiry</div>
                            <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>Code</div>
                            <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>Location</div>
                            <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>Distributor</div>
                            <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>Total Cost</div>
                            <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>MRP</div>
                            <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12'>Selling Price</div>
                        </div>
                        {inventory.map((item, index) => (
                            <div key={index} className='flex justify-evenly items-center w-full  box-border py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                <div className='w-1/36 px-6 flex items-center text-neutral-400 text-base font-medium'>{index + 1}</div>
                                <div className='w-1/5 px-6 flex items-center text-neutral-400 text-base font-medium'>
                                    <Select
                                        className="text-gray-500 text-base font-medium font-['Satoshi'] w-full border-0 boxShadow-0"
                                        classNamePrefix="select"
                                        value={products.find((prod) => prod.value === item.id)}
                                        isClearable={false}
                                        isSearchable={true}
                                        name="itemName"
                                        options={products}
                                        onChange={(selectedProduct: any) => handleProductSelect(selectedProduct, index)}
                                    />
                                </div>
                                <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                                    <button className="bg-white rounded-[5px] border-2 border-gray-100" onClick={() => handleQuantityDecClick(index)}>
                                        <Image src={subicon} alt="-" />
                                    </button>
                                    <div>{item.quantity}</div>
                                    <button className="bg-white rounded-[5px] border-2 border-gray-100" onClick={() => handleQuantityIncClick(index)}>
                                        <Image src={add1icon} alt="+" />
                                    </button>
                                </div>
                                <div className='w-1/12 px-1 flex items-center text-neutral-400 text-base font-medium ml-10'>
            <input
                type="text"
                value={item.batchNumber}
                onChange={(e) => handleInputChange(index,'batchNumber', e.target.value)}
                className="w-full border border-gray-300 focus:border-gray-500 outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded"
                name={`batchNumber-${index}`}
            />
        </div>
        <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>
    <input
        type="datetime-local"
        value={item.expiry}
        onChange={(e) => handleInputChange(index,'expiry', e.target.value)}
        className="w-full border-none outline-none bg-transparent text-neutral-400 text-base font-medium"
        name={`expiry-${index}`}
    />
    {item.expiry && selectedOption !== 'Stock In' && (
        <div>{formatDateAndTime(item.expiry).formattedDate}</div>
    )}
</div>

        <div className='w-1/12 px-1 flex items-center text-neutral-400 text-base font-medium'>
            <input
                type="text"
                value={item.hsnCode}
                onChange={(e) => handleInputChange(index, 'hsnCode' ,e.target.value)}
                className="w-full border border-gray-300 focus:border-gray-500 outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded "
            name={`hsnCode-${index}`}
            />
        </div>
        <div className='w-1/12 px-4 flex items-center text-neutral-400 text-base font-medium'>
            <input
                type="text"
                value={item.category}
                onChange={(e) => handleInputChange(index,'category' ,e.target.value)}
                className="w-full border border-gray-300 focus:border-gray-500 outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded"
            name={`category-${index}`}
            />
        </div>
        <div className='w-1/12 px-1 flex items-center text-neutral-400 text-base font-medium '>
        <input
            type="text"
            value={item.providers}
            onChange={(e) => handleInputChange(index,'providers', e.target.value)}
            className="w-full border border-gray-300 focus:border-gray-500 outline-none bg-transparent text-neutral-400 text-base font-medium px-1 py-1 rounded"
            name={`providers-${index}`}
        />
        </div>
        <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>₹
            <input
                type="number"
                value={item.costPrice}
                onChange={(e) => handleInputChange(index, 'costPrice',parseFloat(e.target.value))}
                className="w-full border-none outline-none bg-transparent text-neutral-400 text-base font-medium"
                name={`costPrice-${index}`}
            />
        </div>
        <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>₹
            <input
                type="number"
                value={item.costPrice}
                onChange={(e) =>  handleInputChange(index, 'costPrice',parseFloat(e.target.value))}
                className="w-full border-none outline-none bg-transparent text-neutral-400 text-base font-medium"
                name={`costPrice-${index}`}
            />
        </div>

        <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>₹
            <input
                type="number"
                value={item.sellingPrice}
                onChange={(e) =>  handleInputChange(index, 'sellingPrice',parseFloat(e.target.value))}
                className="w-full border-none outline-none bg-transparent text-neutral-400 text-base font-medium"
                name={`sellingPrice-${index}`}
            />
        </div>
        <button onClick={() => handleDeleteRow(index)} className=" border-0 flex-col justify-start items-end gap-2.5 flex">
                                <div className="h-6 px-2 py-1 bg-gray-100 rounded-[5px] justify-start items-center gap-1 flex">
                                    <Image className="w-4 h-4 relative" src={deleteicon} alt="delete" />
                                </div>
                            </button>
    </div>
))}
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="pr-[4px]">
                                    <input type="checkbox" onChange={handleCheckBoxChange} />
                                </div>
                                <div className="text-teal-400 text-base font-medium font-['Satoshi']">
                                    Update total cost as Expense
                                </div>
                            </div>
                            <div className="bg-black px-4 py-2.5 rounded-[5px] justify-start items-center gap-2 flex">
                                <Image src={checkicon} alt="add" />
                                <button className="text-white text-base font-bold font-['Satoshi'] bg-transparent border-0" onClick={handleUpdateInventory}>
                                    Update Inventory
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
