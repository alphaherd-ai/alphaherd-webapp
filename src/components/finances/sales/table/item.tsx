"use client";
import React, { useEffect, useState } from 'react'
import {Tooltip,Button} from "@nextui-org/react";
import Menu from '@/assets/icons/finance/Menu.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import { productSchema } from '@/schemas/inventory/productValidation';
import { FinanceSalesType } from '@prisma/client';
import formatDateAndTime from '@/utils/formateDateTime';
interface Sales {
  id:number;
  date:string;
  type:FinanceSalesType;
  customer:string;
  invoiceNo:number;
  totalCost:number;
  totalQty:number;
  dueDate:string;
  status:string;
}
const FinancesSalesTableItem = () => {
  const [sales,setSales]=useState<Sales[]>([]);
  
  useEffect(()=>{
    fetchSales();
  },[]);

  const fetchSales =()=>{
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/getAll`)
    .then(response=>response.json())
    .then(data=>setSales(data))
    .catch(error=>console.error("Error fetching data:",error));
  };


  return (
     <div>
      {sales.map(sale=>(
        

    <div key={sale.id} className='flex  w-full  box-border h-16 py-4 bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5  hover:bg-gray-200 hover:text-gray-500 transition'>
    <div className='w-1/12 flex items-center  px-6  text-neutral-400 text-base font-medium'>{formatDateAndTime(sale.date).formattedDate}</div>
    <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{formatDateAndTime(sale.date).formattedTime}</div>
    <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{sale.type}</div>
    <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{sale.customer}</div>
    <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{sale.invoiceNo}</div>
    <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>$ {sale.totalCost}</div>
    <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{sale.totalQty}</div>
    <div className='w-1/12 flex  items-center  px-6 text-neutral-400 text-base font-medium'>{formatDateAndTime(sale.dueDate).formattedDate}</div>
    <div className='w-2/12 flex  items-center  px-6 text-neutral-400 text-base font-medium text-green-500'><span className='bg-green-100 px-1'> <Tooltip content="message" className='bg-black text-white p-1 px-3 text-xs rounded-lg'>

 <Button className='bg-transparent border-none'>{sale.status}</Button>
</Tooltip></span>

 </div>
 <div className='absolute right-16 '>
      
      <Popover placement="left" showArrow offset={10}>
          <PopoverTrigger>
              <Button color="gray-400"
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
))}

   
</div> )
}

export default FinancesSalesTableItem