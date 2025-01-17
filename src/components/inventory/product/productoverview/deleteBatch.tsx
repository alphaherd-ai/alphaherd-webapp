'use client'
import React, { useState, useEffect } from 'react';
import closeIcon from '../../../../assets/icons/finance/closeIcon.svg';
import checkMark from '../../../../assets/icons/finance/check.svg';
import Image from 'next/image';
import axios from 'axios';
import { useAppSelector } from '@/lib/hooks';
import { useSearchParams } from 'next/navigation';
import Loading2 from '@/app/loading2';

interface CancellationPopupProps {
    setisDeleting:any;
    deleteBatch:any;
}



const ConfirmationPopup: React.FC<CancellationPopupProps> = ({setisDeleting,deleteBatch}) => {
    //console.log(deleteBatch);
    const appState = useAppSelector((state) => state.app);

    const url = useSearchParams();
    
    const [loading, setLoading] = useState(false);




    const handleCancel = async () => {
        setLoading(true);
        try{
            const res=await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/edit/${deleteBatch.id}?branchId=${appState.currentBranchId}`, {
                data: { productId: deleteBatch.productId, quantity: deleteBatch.quantity },
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if(res.status===201){
                //console.log('Patient Deleted');
                setisDeleting((prev:any)=>!prev);
            }
        }
        catch(err){
            console.log(err);
        }
        
        
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='rounded-md w-1/2 h-fit px-4 py-10 bg-white relative'>
                <Image
                    className='absolute right-4 top-4 cursor-pointer'
                    src={closeIcon}
                    alt=""
                    onClick={() => setisDeleting((prev:any)=>!prev)}
                />
                <p className='text-xl  text-[#6B7E7D]'>
                    Are you sure you want to delete this batch
                </p>

                <div className='flex justify-end gap-4 mt-8'>

                    <button
                        className='outline-none rounded-md cursor-pointer justify-between border-none w-fit flex items-center h-[2rem] px-4 py-1 bg-zinc-900 text-white'
                        onClick={() => { handleCancel() }}
                    >
                        {loading ? <Loading2 /> :
                            <>
                                <Image src={checkMark} alt="" />
                                Delete Batch
                            </>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPopup;
