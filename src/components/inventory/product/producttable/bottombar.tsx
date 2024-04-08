import React from 'react';
import RightArrow from '../../../../assets/icons/finance/rightArrow.svg';
import LeftArrow from '../../../../assets/icons/finance/leftArrow.svg';
import Image from 'next/image';

interface BottombarProps {
  productsPerPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => void;
}

const InventoryProductTableBottombar: React.FC<BottombarProps> = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex w-full justify-between border border-solid border-gray-300 border-t-0.5 h-12 px-6 py-3 bg-white rounded-bl-lg rounded-br-lg bg-white'>
      <div className='flex h-full'>
        <div className='flex items-center'>
          <div className='flex pl-2'>
            {pageNumbers.length > 1 &&
              <button onClick={() => paginate(1)}>
                <Image src={LeftArrow} alt='LeftArrow' className='w-6 h-6' />
              </button>
            }
          </div>
          <div className='flex pl-2'>
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-2 py-1 ml-1 font-medium leading-tight text-gray-700 border border-solid border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent`}
              >
                {number}
              </button>
            ))}
          </div>
            <div className='text-sm text-gray-500'>
              {`Showing ${Math.min(productsPerPage * (pageNumbers.indexOf(pageNumbers.length) + 1), totalProducts)} of ${totalProducts}`}
            </div>
          <div className='flex pl-2'>
            {pageNumbers.length > 1 &&
              <button onClick={() => paginate(pageNumbers.length)}>
                <Image src={RightArrow} alt='RightArrow' className='w-6 h-6' />
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryProductTableBottombar;
