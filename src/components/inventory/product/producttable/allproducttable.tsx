import React from 'react'
import ProductAllItem from './allitem'
import InventoryProductTableBottombar from './bottombar'
import InventoryProductTableHeader from './header'

const InventoryProductAllTable = () => {
  return (
    <div className='flex flex-col w-full box-border border border-solid border-borderGrey rounded-lg mt-6 mb-6'>
            <InventoryProductTableHeader/>
            <div className='flex  w-full  box-border bg-gray-100  h-12 justify-evenly items-center border-0 border-b border-solid border-borderGrey text-textGrey2'>
            <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Date</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Time</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12 '>Item Name</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Quantity</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '></div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Batch No.</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12 '>Distributor</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/12 '>Source</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/12'>Serial No</div>
            </div>

<ProductAllItem/>
{/* <InventoryProductTableBottombar productsPerPage={0} totalProducts={0} paginate={function (pageNumber: number): void {
        throw new Error('Function not implemented.')
      } }/> */}
     
        </div>
  )
}

export default InventoryProductAllTable