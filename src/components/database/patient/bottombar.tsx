import React,{useState} from 'react'
import RightArrow from '../../../assets/icons/finance/rightArrow.svg';

import LeftArrow from '../../../assets/icons/finance/leftArrow.svg';

import Image from 'next/image';



interface BottombarProps {
  productsPerPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => void;
}


const DatabasePatientBottombar:React.FC<BottombarProps> = ({productsPerPage,totalProducts,paginate}) => {

  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(prevPage => prevPage + 1);
      paginate(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
      paginate(currentPage - 1);
    }
  };

  return (

    
    <>
    <div className='flex w-full  justify-between  h-12 px-6 py-3 bg-white rounded-bl-lg rounded-br-lg'>
      <div className='flex h-full'>
        <div className='flex items-center'>
          <div className='flex'>
            <Image src={LeftArrow} alt='LeftArrow' className='w-6 h-6' onClick={() => handlePrevPage()} />
          </div>
          <div className='flex'>
            <Image src={RightArrow} alt='RightArrow' className='w-6 h-6' onClick={() => handleNextPage()} />
          </div>


        </div><div className='text-sm text-gray-500'>
          {`${totalProducts > 0 ? productsPerPage * (currentPage - 1) + 1 : 0}-${totalProducts > 0 ? Math.min(productsPerPage * currentPage, totalProducts) : 0} of ${totalProducts || 0}`}
        </div>
      </div>
    </div>

    </>
   
  )
}

export default DatabasePatientBottombar;