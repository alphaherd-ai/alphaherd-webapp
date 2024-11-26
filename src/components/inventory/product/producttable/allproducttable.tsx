import React from 'react'
import ProductAllItem from './allitem'
import InventoryProductTableBottombar from './bottombar'
import InventoryProductTableHeader from './header'

const InventoryProductAllTable = () => {
  return (
    <div className='flex flex-col w-full box-border border border-solid border-borderGrey rounded-lg mt-6 mb-6'>
            <InventoryProductTableHeader/>
            <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-textGrey2'>
                <div className=' flex text-gray-500 text-base font-medium  w-[6rem] '>Date</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[6rem] '>Time</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[12rem] '>Item Name</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[5rem] '>Quantity</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[3rem] '></div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Batch No.</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[12rem] '>Distributor</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] '>Invoice Type</div>
                <div className=' flex text-gray-500 text-base font-medium  w-[8rem] pl-2'>Ref. No.</div>
            </div>

<ProductAllItem/>
{/* <InventoryProductTableBottombar productsPerPage={0} totalProducts={0} paginate={function (pageNumber: number): void {
        throw new Error('Function not implemented.')
      } }/> */}
     
        </div>
  )
}

export default InventoryProductAllTable