import React from 'react'
import Rupee from "../../../../../assets/icons/finance/rupee.svg"
import Image from "next/image"
import { Button } from "@nextui-org/react";

const ExsistingRecurringTotalAmount = ({ otherData }: any) => {



    const gstOptions = [
        { value: 'GST@18%.', label: 'GST@18%.' },
        { value: 'GST@9%.', label: 'GST@9%.' }
    ];

    return (
        <>


            <div className="flex w-full box-border bg-gray-100 pt-[20px] pb-[20px]">

                <div className="w-1/2 bg-white rounded-md ">
                    <div className="w-full flex p-4 border border-solid  border-borderGrey justify-between items-center gap-2.5  rounded-t-md  ">
                        <div className="text-gray-500 text-base font-bold ">Subtotal</div>
                        <div className="text-right text-gray-500 text-base font-bold ">₹ {(otherData.subTotal)?.toFixed(2)}</div>
                    </div>
                    <div className="w-full flex px-4 py-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5 ">
                        <div className="text-gray-500 text-base font-bold ">Overall Discount</div>
                        <div className="flex items-center">
                            <div className="text-right text-textGrey1 text-base  ">{otherData.overallDiscount * 100}%</div>

                        </div>
                    </div>
                    <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5   ">
                        <div className="text-gray-500 text-base font-bold ">Shipping</div>
                        <div className="text-right text-textGrey1 text-base ">₹ {otherData.shipping}</div>
                    </div>
                    <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 justify-between items-center gap-2.5  ">
                        <div className="text-gray-500 text-base font-bold ">Adjustment</div>
                        <div className="text-right text-textGrey1 text-base ">₹{otherData.adjustment}</div>
                    </div>
                    <div className="w-full flex p-4 border border-solid  border-borderGrey border-t-0 rounded-b-md justify-between items-center gap-2.5    ">
                        <div className="text-textGreen text-base font-bold">Grand total</div>
                        <div className="text-right text-textGreen text-base font-bold ">{(otherData.totalCost)?.toFixed(2)}</div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ExsistingRecurringTotalAmount