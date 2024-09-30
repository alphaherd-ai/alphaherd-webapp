import React, { useState } from 'react'
import RightArrow from '../../../../assets/icons/finance/rightArrow.svg';

import LeftArrow from '../../../../assets/icons/finance/leftArrow.svg';

import Image from 'next/image';
import Link from 'next/link';



const FinancesTransactionsTableBottombar = ({ goOnPrevPage, goOnNextPage, startInd, endInd, totalLen }: { goOnPrevPage: () => void, goOnNextPage: () => void, startInd: number, endInd: number, totalLen: number }) => {

    if (endInd > totalLen) endInd = totalLen;
    return (
        <>
            <div className='flex w-full  justify-between  h-12 px-6 py-3 bg-white rounded-bl-lg rounded-br-lg'>


                <div className='flex h-full'>

                    <div className='flex items-center   '>
                        <div className='flex  pl-2'><Image src={LeftArrow} alt='LeftArrow' className='w-6 h-6 ' onClick={goOnPrevPage} /></div>
                        <div className='flex  pl-2'><Image src={RightArrow} alt='RightArrow' className='w-6 h-6 ' onClick={goOnNextPage} /></div>
                        <div className='text-sm   text-gray-500'>{startInd + 1}-{endInd} of {totalLen}</div>
                    </div>
                </div>
            </div >

        </>

    )
}

export default FinancesTransactionsTableBottombar;