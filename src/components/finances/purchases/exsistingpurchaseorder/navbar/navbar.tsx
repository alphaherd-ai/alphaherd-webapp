"use client"

import lefticon from "../../../../../assets/icons/finance/left_icon.svg"
import Link from "next/link"
import Menu from '@/assets/icons/finance/Menu.svg';
import addicon1 from "../../../../../assets/icons/finance/add.svg"
import Image from "next/image"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { useRouter } from "next/navigation";

const ExsistingPurchaseOrderNavbar = () => {
const router= useRouter();
    return (
        <>
           
                <div className="flex g-4 items-center justify-between pb-[27px]  text-gray-500 text-[28px] font-bold">
                    <div className="flex justify-start items-center">
                    <div className="w-11 h-11 bg-gray-100 rounded-[5px] border border-neutral-400 flex justify-center items-center mr-4 cursor-pointer" onClick={()=>router.back()}>
                        <Image className="w-6 h-6 relative rounded-[5px]" src={lefticon} alt="Back"></Image>
                    </div>
                    <div className="text-gray-500 text-[28px] font-bold">
                    Purchase Order
                    </div>
                    </div>
                    <div className="flex justify-start items-center">
                    <Button className='text-textGrey2 text-base font-bold bg-gray-100 h-11 rounded-[5px] border border-solid border-borderGrey flex justify-center items-center cursor-pointer'>
                    <div className='flex pr-2'><Image src={addicon1} alt='addicon1' className='w-6 h-6 ' /></div>
                            Repeat Order
                    </Button>
                    
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

export default ExsistingPurchaseOrderNavbar;
