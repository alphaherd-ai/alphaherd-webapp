
"use client"

import lefticon from "../../../../../assets/icons/finance/left_icon.svg"
import Attachment from "../../../../../assets/icons/finance/attachment.svg"
import Link from "next/link"
import Image from "next/image"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import Menu from '@/assets/icons/finance/Menu.svg';
import { useRouter } from "next/navigation"

const ExistingsalesReturnNavbar = () => {
    const router=useRouter();

    return (
        <>
           
                <div className="flex g-4 items-center justify-between pb-[27px]  text-gray-500 text-[28px] font-bold">
                    <div className="flex">

                    <div className="w-11 h-11 bg-gray-100 rounded-[5px] border border-neutral-400 flex justify-center items-center mr-4">
                    <Image className="w-6 h-6 relative rounded-[5px]  cursor-pointer" src={lefticon} alt="Back"  onClick={()=>router.back()}></Image>

                    </div>
                    <div className="text-gray-500 text-[28px] flex items-center font-bold ">
                    Sales Returns 

                    </div>
                    </div>
                    <div className="mr-16 h-11 px-6 py-2.5 rounded-[5px]  justify-center items-center inline-flex border border-gray-300 border-solid">
                        <div className="self-stretch justify-start items-center gap-2 inline-flex ">
                            <div className="w-6 h-6 flex justify-center items-center"> <Image src={Attachment} alt='Attachment' className='w-3 h-3 ' /></div>
                            <div className="justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold ">Attach files</div>
                            </div>
                        </div>
              
                    </div>
                    <div className='absolute right-16 bg-white w-6 h-6 flex jsutify-center items-center'>
      
      <Popover placement="left" showArrow offset={10}>
          <PopoverTrigger>
              <Button 
            //   color="gray-400"
                  variant="solid"
                  className="capitalize flex border-none  text-gray rounded-lg ">  
                  <div className='flex items-center '><Image src={Menu} alt='Menu' className='w-5  h-5' /></div></Button>
          </PopoverTrigger>
          <PopoverContent className="p-5 text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">
    
              <div className="flex flex-col ">
                 
                  <div className='flex flex-col'>
                  
                  <Link className='no-underline flex item-center' href='/finance/overview'>
                  <div className='text-gray-500 text-sm p-3 font-medium flex '>
                  gtr</div>
                  </Link>
                  <Link className='no-underline flex item-center' href='/finance/overview'>
                  <div className='text-gray-500 text-sm p-3 font-medium flex '>
                 grtt</div>
                  </Link>
                  <Link className='no-underline flex item-center' href='/finance/overview'>
                  <div className='text-gray-500 text-sm p-3 font-medium flex '>
                  gtrt</div>
                  </Link>
                
                  </div>
              </div>
            

          </PopoverContent>
      </Popover>



  </div>
                </div>
           
        </>

    )
}

export default ExistingsalesReturnNavbar;
