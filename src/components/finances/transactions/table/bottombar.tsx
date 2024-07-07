import React, { useState } from 'react'
import RightArrow from '../../../../assets/icons/finance/rightArrow.svg';

import LeftArrow from '../../../../assets/icons/finance/leftArrow.svg';

import Image from 'next/image';
import Link from 'next/link';



const FinancesTransactionsTableBottombar = ({data}:any) => {

  const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleClickNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleClickPrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

  return (
    <>
    <div className='flex w-full justify-between h-12 px-6 py-3 bg-white rounded-bl-[5px] rounded-br-[5px] '>
    <div className='flex h-full'>
        <div className='flex items-center'>
            <div className='flex pl-2'>
                <Link href="#" onClick={handleClickPrev}>
                    <Image src={LeftArrow} alt='LeftArrow' className='w-6 h-6' />
                </Link>
            </div>
            <div className='flex pl-2'>
                <Link href="#" onClick={handleClickNext}>
                    <Image src={RightArrow} alt='RightArrow' className='w-6 h-6' />
                </Link>
            </div>
            <div className='text-sm text-gray-500'>{currentPage} of {totalPages}</div>
        </div>
    </div>
    </div>

    </>
   
  )
}

export default FinancesTransactionsTableBottombar;