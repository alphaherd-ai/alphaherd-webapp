import React from 'react'
import Download from '../../../assets/icons/inventory/Download.svg';
import Graph from '../../../assets/icons/inventory/Graph.svg';
import Category from '../../../assets/icons/inventory/Category.svg';

import Sort from '../../../assets/icons/inventory/Sort.svg';
import Newservice from '../../../assets/icons/inventory/Newservice.svg';
import Image from 'next/image';



const Watchlist = () => {
    return (
        <div className='flex flex-col w-full px-10 box-border pb-96 bg-gray-300'>
            <div className='flex w-full p-5 justify-between border border-solid border-gray-300 border-t-0.5 rounded-tl-lg rounded-tr-lg bg-white'>

                <div className='flex text-2xl text-gray-500'>
                    <div>Watchlist</div>
                    <div className='flex items-center pl-2'><Image src={Download} alt='Download' className='w-5 h-5' /></div>
                </div>

            </div >
            <div className='flex  w-full  box-border  border border-solid border-gray-300 border-t-0.5 text-gray-500 bg-white '>
                <div className='w-2/6  flex flex-col py-2 px-3 items-center  text-2xl justify-center border border-solid border-gray-300 border-0.5'><div className='text-3xl mb-1'>Date</div><div>type fdgfj jgvd</div> </div>
                <div className='w-2/6  flex flex-col py-2 px-3 items-center  text-2xl justify-center border border-solid border-gray-300 border-0.5'><div className='text-3xl mb-1'>Itme</div><div>type fdgfj jgvd</div>  </div>
                <div className='w-2/6  flex flex-col py-2 px-3 items-center  text-2xl justify-center border border-solid border-gray-300 border-0.5'><div className='text-3xl mb-1'>Time</div><div>type fdgfj jgvd</div> </div>
            </div>
            <div className='flex  w-full  box-border bg-gray-200 border border-solid border-gray-300 border-t-0.5 text-gray-500'>
                <div className='w-2/6  flex flex-col p-3 items-center rounded-large text-2xl border border-solid border-gray-300 border-r-0.5'> 
                    <div className='p-2 m-2 flex justify-between bg-white rounded-lg w-full'><div>type</div>
                    <div>  fdgfj jgvd</div></div>
                    <div className='p-2 m-2 flex justify-between bg-white rounded-lg w-full'><div>type</div>
                    <div>  fdgfj jgvd</div></div>
                    <div className='p-2 m-2 flex justify-between bg-white rounded-lg w-full'><div>type</div>
                    <div>  fdgfj jgvd</div></div> 
                    <div className='p-2 m-2 flex justify-between bg-white rounded-lg w-full'><div>type</div>
                    <div>  fdgfj jgvd</div></div>
                    </div>
                <div className='w-2/6  flex flex-col p-3 items-center rounded-large text-2xl  border border-solid border-gray-300 border-r-0.5'> 
                    <div className='p-2 m-2 flex justify-between bg-white rounded-lg w-full'><div>type</div>
                    <div>  fdgfj jgvd</div></div>
                    <div className='p-2 m-2 flex justify-between bg-white rounded-lg w-full'><div>type</div>
                    <div>  fdgfj jgvd</div></div>
                    <div className='p-2 m-2 flex justify-between bg-white rounded-lg w-full'><div>type</div>
                    <div>  fdgfj jgvd</div></div> </div>
                <div className='w-2/6  flex flex-col p-3 items-center rounded-large text-2xl  border border-solid border-gray-300 border-r-0.5'> 
                    <div className='p-2 m-2 flex justify-between bg-white rounded-lg w-full'><div>type</div>
                    <div>  fdgfj jgvd</div></div>
                    <div className='p-2 m-2 flex justify-between bg-white rounded-lg w-full'><div>type</div>
                    <div>  fdgfj jgvd</div></div>
                     </div>
            </div>
        </div>

    )
}

export default Watchlist