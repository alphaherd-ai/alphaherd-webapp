import Image from 'next/image'
import closeicon from "../../../../../assets/icons/inventory/closeIcon.svg";
import RadioButton from "../../../../../assets/icons/finance/radio_button.svg"
import RadioButtonSelec from "../../../../../assets/icons/finance/radio_button (1).svg"
import React, {useState}  from 'react'
import { Button } from '@nextui-org/react';

type PopupProps = {
    onClose: () => void;
}

const newPartyPopup: React.FC<PopupProps> = ({ onClose }) => {

    const [isSelected, setIsSelected] = useState(false)
    const [isSelected1, setIsSelected1] = useState(false)

    const handletoggleRadioButton = () => {
        setIsSelected(!isSelected)
        setIsSelected1(false)
    }
    const handletoggleRadioButton1 = () => {
        setIsSelected1(!isSelected1)
        setIsSelected(false)
    }

  return (
    <div className="w-full h-full flex justify-center items-center  fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
        <div className="w-[640px] py-4  px-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex">
        
            
            <div className="self-end items-start gap-6 flex mt-[0.6rem] cursor-pointer" onClick={onClose}>
                <Image src={closeicon} alt="close"></Image>
            </div>

            <div className='w-full flex flex-col'>
                <span className='text-textGrey2 text-xl font-medium'>Add Party</span>

                <span className='text-textGrey1 text-base font-medium'>
                Add a new party to your database
                </span>
            </div>

            <div className='w-full flex gap-36'>
                <div className='flex gap-1'>
                    <div onClick={handletoggleRadioButton}>
                        {isSelected === false ? (
                            <Image src={RadioButton} alt='RadioButton' />
                        ) : (
                            <Image src={RadioButtonSelec} alt='RadioButtonSelec' />
                        )}
                    </div>
                    <div>
                        <span className='text-base text-textGrey2 font-medium'>
                            Distributor
                        </span>
                    </div>
                </div>
                <div className='flex gap-1'>
                    <div onClick={handletoggleRadioButton1}>
                    {isSelected1 === false ? (
                            <Image src={RadioButton} alt='RadioButton' />
                        ) : (
                            <Image src={RadioButtonSelec} alt='RadioButtonSelec' />
                        )}
                    </div>
                    <div>
                        <span className='text-base text-textGrey2 font-medium'>
                            Client
                        </span>
                    </div>
                </div>
                
            </div>

            <div className='w-full flex justify-end'>
                    <Button className="px-5 py-2.5 bg-navBar rounded-[5px] justify-start items-center gap-2 flex outline-none border-none cursor-pointer">
                        <span className='text-white text-base font-medium'>Continue</span>
                    </Button>
                </div>
            
                
            
            
        </div>

    </div>        
  )
}

export default newPartyPopup