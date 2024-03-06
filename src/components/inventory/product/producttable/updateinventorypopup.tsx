"use client"
import Image from "next/image"
import React, { useEffect, useState } from 'react'
import closeicon from "../../../../assets/icons/inventory/closeIcon.svg"
import arrowicon from "../../../../assets/icons/inventory/arrow.svg"
import minicon from "../../../../assets/icons/inventory/mini.svg"
import addicon from "../../../../assets/icons/inventory/add.svg"
import add1icon from "../../../../assets/icons/inventory/add (1).svg"
import RadioButton from './RadioButton';
import subicon from "../../../../assets/icons/inventory/1. Icons-24 (6) (2).svg"
import checkicon from "../../../../assets/icons/inventory/check (1).svg"
import Select from 'react-select';
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
    const [selectedOption, setSelectedOption] = useState<string>('option1');
    const [items, setItems] = useState(5);
    const [isChecked, setChecked] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [products, setProducts] = useState<{ value: string; label: string }[]>(
        []
      );

    const handleRadioChange = (value: string) => {
        setSelectedOption(value);
    };
    const locationOptions = [
        { value: 'shell1', label: 'Shell 3' },
        { value: 'shell2', label: 'Shell 2' },
        { value: 'shell3', label: 'Shell 1' }
    ]
  
    const handleQuantityDecClick = () => {
        setItems(items - 1);
    };
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const handleQuantityIncClick = () => {
        setItems(items + 1);
    };

    const handleCheckBoxChange = () => {
        setChecked(!isChecked);
    };
    const handleAddItemClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleProductSelect = (selectedProduct: any) => {
        console.log('Selected product:', selectedProduct);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        fetch("/api/inventory/product/getAll")
          .then((response) => response.json())
          .then((data) => {
            const formattedProducts = data.map((product: AllProducts) => ({
              value: product.id,
              label: product.itemName,
            }));
            setProducts(formattedProducts);
          })
          .catch((error) =>
            console.error("Error fetching data from API:", error)
          );
      }, []);

    return <>
    <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 fixed inset-0 backdrop-blur-sm bg-gray-100 bg-opacity-50 z-50">
    <div className="w-[1392px] h-[481px] flex-col p-8 bg-gray-200 gap-6">
            <div className="flex justify-end p-8 gap-4">
                <button><Image src={minicon} alt="minimize"></Image></button>
                <button onClick={onClose}><Image src={closeicon} alt="minimize"></Image></button>
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
                                <Image src={addicon} alt="add"></Image>
                                <button className="text-white text-base font-bold font-['Satoshi'] bg-transparent border-0" onClick={handleAddItemClick}>
                                    Add Item
                                </button>
                            </div>
                            {isDropdownOpen && (
                                <div className="absolute top-[calc(-40px - 240px)] left-0 z-50 w-[150px] bg-white border border-gray-300 rounded-md shadow-md">
                                    <Select
                                        className="text-gray-500 text-base font-medium font-['Satoshi'] w-full border-0 boxShadow-0"
                                        classNamePrefix="select"
                                        defaultValue={products[0]}
                                        isClearable={false}
                                        isSearchable={true}
                                        name="productName"
                                        options={products}
                                        onChange={handleProductSelect}
                                    />
                                </div>
                            )}
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
                <div className='flex justify-evenly items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>1</div>
                    <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium'>Metaclopramide</div>
                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium gap-[12px]'>
                        <button className="bg-white rounded-[5px] border-2 border-gray-100" onClick={handleQuantityDecClick}>
                            <Image src={subicon} alt="-"></Image>
                        </button>
                        <div>{items}</div>
                        <button className="bg-white rounded-[5px] border-2 border-gray-100" onClick={handleQuantityIncClick}>
                            <Image src={add1icon} alt="+"></Image>
                        </button>
                    </div>
                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>
                    <input type="text" defaultValue="asdfdaf3243" className="w-full border-none outline-none bg-transparent text-neutral-400 text-base font-medium" name="code"/>
                    </div>

                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>
                    <input type="text" defaultValue="asdfdaf3243" className="w-full border-none outline-none bg-transparent text-neutral-400 text-base font-medium" name="expiry"/>
                    </div>
                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>
                        <input type="text" defaultValue="asdfdaf3243" className="w-full border-none outline-none bg-transparent text-neutral-400 text-base font-medium" name="code"/>
                        </div>
                    <div className="w-1/8 px-6 flex items-center text-neutral-400 text-base font-medium px-2 py-1.5 bg-orange-50 rounded-[5px] justify-center gap-2 flex text-orange-500 text-sm font-medium font-['Satoshi']">
                    <Select
                            className="text-gray-500 text-base font-medium font-['Satoshi'] w-full border-0 boxShadow-0"
                            classNamePrefix="select"
                            defaultValue={locationOptions[0]}
                            isClearable={isClearable}
                            isSearchable={isSearchable}
                            name="batchNumber"
                            options={locationOptions}
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    border: state.isFocused ? 'none' : 'none',
                                }),

                            }}
                        />
                    </div>
                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>
                    <input type="text" defaultValue="asdfdaf3243" className="w-full border-none outline-none bg-transparent text-neutral-400 text-base font-medium" name="distributor"/>
                    </div>
                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>₹
                    <input type="text" defaultValue="400" className="w-full border-none outline-none bg-transparent text-neutral-400 text-base font-medium" name="totalCost"/>
                    </div>
                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>₹
                    <input type="text" defaultValue="400" className="w-full border-none outline-none bg-transparent text-neutral-400 text-base font-medium" name="cost"/>
                    </div>
                    <div className='w-1/12 px-6 flex items-center text-neutral-400 text-base font-medium'>₹
                    <input type="text" defaultValue="400" className="w-full border-none outline-none bg-transparent text-neutral-400 text-base font-medium" name="sellingPrice"/>
                    </div>
                </div>
            </div>
            <div>
                <div>

                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="pr-[4px]">
                            <input value="test" type="checkbox" onChange={handleCheckBoxChange} />
                        </div>
                        <div className="text-teal-400 text-base font-medium font-['Satoshi']">
                            Update total cost as Expense
                        </div>
                    </div>
                    <div className="bg-black px-4 py-2.5 rounded-[5px] justify-start items-center gap-2 flex">
                        <Image src={checkicon} alt="add"></Image>
                        <button className="text-white text-base font-bold font-['Satoshi'] bg-transparent border-0">Update Inventory</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}
export default Popup2;