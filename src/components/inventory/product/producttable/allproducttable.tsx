'use client'
import React,{useState} from 'react'

import InventoryProductTableHeader from './header'
import ProductAllItem from './allitem'





const InventoryProductAllTable = () => {
  const [sortOrder, setSortOrder] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('');

  const handleSortChange = (key: string, sortOrder: string) => {
    console.log(key, sortOrder);
    setSortKey(key);
    setSortOrder(sortOrder);
  }
  return (
    <div className='flex flex-col w-full box-border border border-solid border-borderGrey rounded-lg mt-6 mb-6'>
            <InventoryProductTableHeader onSortChange={handleSortChange}/>
            <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-textGrey2'>
            <div className=' flex text-gray-500 text-base font-medium px-6 w-1/4 '>Name</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/4 '>Quantity</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/4 '>Distributors</div>
                {/* <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6 '>Cost Price</div> */}
                {/* <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6 '>Selling Price</div> */}
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/4 '>Categories</div>
            </div>
            <ProductAllItem sortOrder={sortOrder} sortKey={sortKey}/>
       {/* <InventoryProductTableBottombar productsPerPage={10} totalProducts={0} paginate={function (pageNumber: number): void {
        throw new Error('Function not implemented.')
      } }/> */}
        </div>
   
  )
}

export default InventoryProductAllTable