"use client"
import Image from "next/image"

import downicon from "../../../../assets/icons/settings/downicon.svg"

import pfpimg from "../../../../assets/icons/settings/pfpimg.png"
import branchlogo from "../../../../assets/icons/settings/branchlogo.png"
import React, { useState, useEffect } from 'react';
import OrganisationNavbar from "../navbar/navbar";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";

const MyOrganisation = () => {

    return (

        <>
             <div className="w-full h-full">
      
            <div className="w-full h-full mt-[26px]">
              <OrganisationNavbar/>
              <div className="w-full h-full px-4 py-5 bg-gray-100 border border-neutral-400 flex-col justify-start items-start gap-4 flex">
                    <div className="w-full flex gap-4">
                        <div className="w-3/12 px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-4 flex">
                            <div className="flex flex-col gap-2">
                                <div className="text-neutral-400 text-base font-bold font-['Roboto']">Logo and watermark</div>
                                <div className="text-neutral-400 text-base font-medium font-['Roboto']">Upload an image of your clinic’s logo and watermark</div>
                            </div>
                            <div className="flex gap-4">
                                <Image src={pfpimg} alt="profile" />
                                <div className="w-[164px] h-[164px] p-2 rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 flex">
                                    <div className="text-neutral-400 text-base font-bold font-['Roboto']">+</div>
                                    <div className="text-neutral-400 text-base font-bold font-['Roboto']">WaterMark</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-9/12">
                            <div className="w-full h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold font-['Roboto']">Name:</div>
                                <input className="w-10/12 h-8 border-0 p-1" type="text" name="" id="" defaultValue={"Pet’s First Hospital HRBR Layout"} />
                            </div>
                            <div className="w-full h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold font-['Roboto']">Address:</div>
                                <input className="w-10/12 h-8 border-0 p-1" type="text" name="" id="" defaultValue={"47/38, 14th Cross, Addagalapura, Bangalore"} />
                            </div>
                            <div className="w-full h-14 rounded-[10px] justify-start items-center gap-2 flex">
                                <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold font-['Roboto']">State:</div>
                                    <input className="w-10/12 h-8 border-0 p-1" type="text" name="" id="" defaultValue={"Karnataka"} />
                                </div>
                                <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold font-['Roboto']">Pincode:</div>
                                    <input className="w-10/12 h-8 border-0 p-1" type="text" name="" id="" defaultValue={"560070"} />
                                </div>
                            </div>
                            <div className="w-full h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold font-['Roboto']">Email:</div>
                                <input className="w-10/12 h-8 border-0 p-1" type="text" name="" id="" defaultValue={"abc@gmail.com"} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="w-full h-14 rounded-[10px] justify-start items-center gap-2 flex">
                            <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold font-['Roboto']">Phone No.:</div>
                                <input className="w-10/12 h-8 border-0 p-1" type="text" name="" id="" defaultValue={"+91 "} />
                            </div>
                            <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold font-['Roboto']">Alternate Phone No.:</div>
                                <input className="w-10/12 h-8 border-0 p-1" type="text" name="" id="" defaultValue={"+91"} />
                            </div>
                        </div>
                        <div className="w-full h-14 rounded-[10px] justify-start items-center gap-2 flex">
                            <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold font-['Roboto']">GSTIN:</div>
                                <input className="w-10/12 h-8 border-0 p-1" type="text" name="" id="" defaultValue={"+91"} />
                            </div>
                            <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold font-['Roboto']">PAN Number:</div>
                                <input className="w-10/12 h-8 border-0 p-1" type="text" name="" id="" defaultValue={"+91"} />
                            </div>
                        </div>
                        <div className="w-full h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                            <div className="text-gray-500 text-base font-bold font-['Roboto']">Website:</div>
                            <input className="w-10/12 h-8 border-0 p-1" type="text" name="" id="" defaultValue={"petfirst.com"} />
                        </div>
                        <div className="w-full h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                            <div className="text-gray-500 text-base font-bold font-['Roboto']">Description:</div>
                            <input className="w-10/12 h-8 border-0 p-1" type="text" name="" id="" defaultValue={"24/7 Hospital"} />
                        </div>
                    </div>
                    <div className="w-full h-[228px] px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                        <div className="flex items-center justify-between w-full gap-2">
                            <div className="flex flex-col">
                                <div className="text-gray-500 text-base font-bold font-['Roboto']">Linked Organisations</div>
                                <div className="text-neutral-400 text-base font-medium font-['Roboto']">Link a new branch with your Organisation</div>
                            </div>
                            <div className='flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-lg '>

<Popover placement="bottom-end" showArrow offset={10}>
    <PopoverTrigger>
        <Button color="gray-400"
            variant="solid"
            className="capitalize flex border-none bg-black text-white rounded-lg "> Add Organisation
            <div className='flex pl-2'><Image src={downicon} alt='DownArrow' className='w-4 h-4 ' /></div></Button>
    </PopoverTrigger>
    <PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">

        <div className="flex flex-col ">

            <div className='flex flex-col'>


                <div className='text-base p-4 text-white flex '>
                    <div className='flex pr-2'></div>Update Inventory</div>

                <div className='text-base p-4  text-white flex '>
                    <div className='flex pr-2'></div>New Product</div>
            </div>
        </div>


    </PopoverContent>
</Popover>



</div>
                        </div>
                        <div className="w-full h-full">
                            <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                <div className='flex  w-full  items-center box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                                    <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Branch Name</div>
                                    <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'>Employees</div>
                                    <div className='flex text-gray-500 text-base font-medium px-6 w-3/12'>Phone No.</div>
                                    <div className='flex text-gray-500 text-base font-medium px-6 w-2/12'>Email</div>
                                </div>
                                <div className='flex  items-center w-full  box-border py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  '>
                                    <div className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                        <Image className="w-7 h-7 relative rounded-full border border-neutral-400" src={branchlogo} alt="logo"/>
                                        <div className="text-teal-400 text-base font-bold font-['Roboto']">Caravet, HSR Layout</div>
                                    </div>
                                    <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium'>5</div>
                                    <div className='w-3/12 px-6 flex items-center text-neutral-400 text-base font-medium'>+91 99999 99999</div>
                                    <div className='w-2/12 px-6 flex items-center text-neutral-400 text-base font-medium'>an@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
        </>
    )
}

export default MyOrganisation