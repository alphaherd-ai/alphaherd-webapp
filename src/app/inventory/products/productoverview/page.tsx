import React from 'react'

import Navbar from '@/components/navbar/navbar';
import ProductDetails from '@/components/inventory/product/productoverview/productoverview';

const ProductOverview = () => {
  return (
    <>
    <Navbar/>
    <div className='w-full bg-gray-200 p-8 px-10'>
    <ProductDetails/>
    </div>
    </>
  )
}

export default  ProductOverview 
