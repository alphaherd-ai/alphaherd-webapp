'use client'
import React from 'react';
import closeIcon from '../assets/icons/finance/closeIcon.svg';
import checkMark from '../assets/icons/finance/check.svg';
import Image from 'next/image';
interface StockConfirmationPopupProps {
    quantity: number;
    setAction: any;
    setShowConfirmation:any;
}
const StockConfirmationPopup: React.FC<StockConfirmationPopupProps> = ({ quantity, setAction,setShowConfirmation }) => {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className='rounded-md w-1/2 h-fit px-4 py-8 bg-white relative'>
            <Image 
                className='absolute right-4 top-4 cursor-pointer' 
                src={closeIcon} 
                alt="" 
                onClick={() => setShowConfirmation(false)} 
            />
            <p className='text-xl mt-10 text-[#6B7E7D]'>
                Batch Quantity is {quantity}
            </p>
            <p className='text-sm text-[#A2A3A3]'>
                The selected batch of this product is out of stock. Are you sure you want to use this batch?
            </p>
            <div className='flex justify-end gap-4 mt-4'>
                <button 
                    className='outline-none rounded-md cursor-pointer border-none w-fit h-[2rem] px-2 py-1 bg-[#35BEB1] text-white' 
                    onClick={() => { setAction('Cancel'); setShowConfirmation(false); }}
                >
                    Cancel
                </button>
                <button 
                    className='outline-none rounded-md cursor-pointer justify-between border-none w-fit flex items-center h-[2rem] px-4 py-1 bg-zinc-900 text-white' 
                    onClick={() => { setAction('Save'); setShowConfirmation(false); }}
                >
                    <Image src={checkMark} alt="" />Save
                </button>
            </div>
        </div>
    </div>
    )
}

export default StockConfirmationPopup;
