"use client"

import lefticon from "../../../../../assets/icons/finance/left_icon.svg"
import Link from "next/link"
import Menu from '@/assets/icons/finance/Menu.svg';
import Attachment from "../../../../../assets/icons/finance/attachment.svg"
import Image from "next/image"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"

const ExsistingGrnNavbar = () => {

    return (
        <>
           
           <div className="flex g-4 items-center justify-between pb-[27px]  text-gray-500 text-[28px] font-bold">
                    <div className="flex justify-start items-center">
                    <div className="w-11 h-11 bg-gray-100 rounded-[5px] border border-neutral-400 flex justify-center items-center mr-4">
                        <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back"></Image>
                    </div>
                    <div className="text-gray-500 text-[28px] font-bold">
                    Goods Receive Note - GRN
                    </div>
                    </div>
                    <div className="flex justify-start items-center">
                    <div className=" h-11 px-6 py-2.5 rounded-[5px]  justify-center items-center flex border border-borderGrey border-dashed">
                        <div className="self-stretch justify-start items-center gap-2 flex">
                            <div className="w-6 h-6 flex justify-center items-center"> <Image src={Attachment} alt='Attachment' className='w-3 h-3 ' /></div>
                            <div className="justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold ">Attach files</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="ml-2">
                    <Popover placement="bottom" showArrow offset={10}>
          <PopoverTrigger>
              <Button 
                  variant="solid"
                  className="capitalize flex border-none  text-gray rounded-lg h-11">  
                  <div className='flex items-center '><Image src={Menu} alt='Menu' className='w-5  h-5' /></div></Button>
          </PopoverTrigger>
          <PopoverContent className="text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">
    
              <div className="flex flex-col ">
                 
                  
                  <Link className='no-underline flex item-center' href='/finance/overview'>
                  <div className='text-gray-500 text-sm p-3 font-medium flex '>
                  View GRN</div>
                  </Link>
                  <Link className='no-underline flex item-center' href='/finance/overview'>
                  <div className='text-gray-500 text-sm p-3 font-medium flex '>
                 View Purchase Order</div>
                  </Link>
                  <Link className='no-underline flex item-center' href='/finance/overview'>
                  <div className='text-gray-500 text-sm p-3 font-medium flex '>
                  Edit</div>
                  </Link>
                  <Link className='no-underline flex item-center' href='/finance/overview'>
                  <div className='text-gray-500 text-sm p-3 font-medium flex '>
                  Delete</div>
                  </Link>
                
              </div>
            

          </PopoverContent>
      </Popover>
                    </div>
                    </div>
                </div>
           
        </>

    )
}

export default ExsistingGrnNavbar;
