'use client';
import React, { useEffect, useState } from 'react'
import { Tooltip, Button } from "@nextui-org/react";
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import Menu from '@/assets/icons/finance/Menu.svg';
import Cash from "../../../../assets/icons/finance/Cash.svg";
import UPI from "../../../../assets/icons/finance/image 559.svg";
import { useAppSelector } from '@/lib/hooks';
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

const FinancesTransactionsTableItem = ({ transactions, isLoading }: any) => {
  const appState = useAppSelector((state) => state.app);

  const [isEditPopupVisible, setEditPopupVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [editTransaction, setEditTransaction] = useState<any>({});

  // Handle edit button click and show popup
  const handleEditClick = (transaction: any) => {
    setEditTransaction({
      ...transaction, 
      id: transaction.id, // Pass ID for backend use
    });
    setEditPopupVisible(true);
  };

  const handleCancel = () => {
    setEditTransaction({});
    setEditPopupVisible(false);
  };

  // Handle the save action with backend integration
  const handleSave = async () => {
    try {
      console.log("Saving updated transaction: ", editTransaction);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/${editTransaction?.id}?branchId=${appState.currentBranchId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editTransaction),
      });

      if (!response.ok) {
        throw new Error('Failed to save transaction');
      }

      const result = await response.json();
      console.log('Transaction successfully updated:', result);

      alert('Transaction saved successfully');
      setEditPopupVisible(false); // Close popup on success
    } catch (error) {
      console.error('Failed to save transaction: ', error);
      alert('Failed to save transaction');
    }
  };

  if (isLoading) return (<div>Loading...</div>);

  return (
    <>
      {transactions?.map((transaction: any, index: number) => (
        <div key={index} className='flex w-full h-16 items-center justify-evenly bg-white text-gray-400 border-b border-solid border-borderGrey hover:bg-[#F4F5F7] hover:text-gray-500 transition'>
          <div className='w-[6rem] flex items-center text-base font-medium'>
            {transaction.date ? format(parseISO(transaction.date), 'dd/MM/yyyy') : ""}
          </div>
          <div className='w-[6rem] flex items-center text-base font-medium'>
            {transaction.date ? format(parseISO(transaction.date), 'hh:mm a') : ""}
          </div>
          <div className='w-[12rem] flex items-center text-base font-medium'>{transaction.partyName}</div>
          <div className='w-[9rem] flex items-center text-base font-medium'>{transaction.receiptNo}</div>
          <div className='w-[10rem] flex items-center text-base font-medium'>{transaction.subject}</div>
          <div className='w-[9rem] flex items-center text-base font-medium'>{transaction.invoiceLink}</div>
          <div className='w-1/12 flex items-center text-base font-medium'>₹ {transaction.amountPaid}</div>
          <div className={`w-[6rem] flex items-center text-sm font-medium`}>
            <span className={`${transaction.moneyChange === "Out" ? "text-[#FF3030] bg-[#FFEAEA]" : "text-[#0F9D58] bg-[#E7F5EE] px-2"} px-1 py-1 rounded-[5px]`}>
              {transaction.moneyChange}
            </span>
          </div>
          <div className='w-[12rem] flex items-center text-base font-medium px-2'>
            <div>
              <Image className='w-4 h-4 mt-1 mr-2' src={transaction.mode === "Cash" ? Cash : transaction.mode === "UPI" ? UPI : ""} alt='' />
            </div>
            <Tooltip content={transaction.mode} className='bg-black text-white p-1 px-3 text-xs rounded-lg'>
              <div>{transaction.mode}</div>
            </Tooltip>
          </div>
          <div className='absolute right-16'>
            {appState.isCurrentOrgAdmin ? (
              <Popover placement="bottom" showArrow offset={10}>
                <PopoverTrigger>
                  <Button variant="solid" className="capitalize flex border-none text-gray rounded-lg">
                    <div className='flex items-center'>
                      <Image src={Menu} alt='Menu' className='w-5 h-5' />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="text-gray-500 bg-white text-sm p-2 font-medium flex flex-row items-start rounded-lg border-2 mt-2.5">
                  <div className="flex flex-col">
                    <div className='flex flex-col'>
                      <div className='text-gray-500 text-sm p-3 font-medium flex hover:cursor-pointer' onClick={() => handleEditClick(transaction)}>
                        Edit
                      </div>
                      <div className='text-gray-500 text-sm p-3 font-medium flex hover:cursor-pointer'>
                        Cancel
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : null}
          </div>
        </div>
      ))}

      {/* Edit Popup */}
      {isEditPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="absolute top-10 right-10 bg-white rounded-lg shadow-lg p-8 w-[600px] max-w-[90vw] flex flex-col">
            {/* Close Button */}
            <button
              onClick={handleCancel}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &#x2715;
            </button>

            {/* Popup Heading */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Transaction</h2>

            {/* Form */}
            <form className="space-y-4">
              {/* Party Name Field */}
              <div>
                <label className="block text-gray-700 font-medium">Party Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                  value={editTransaction?.partyName || ""}
                  onChange={(e) =>
                    setEditTransaction({
                      ...editTransaction,
                      partyName: e.target.value,
                    })
                  }
                />
              </div>

              {/* Receipt Number Field */}
              <div>
                <label className="block text-gray-700 font-medium">Receipt Number</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                  value={editTransaction?.receiptNo || ""}
                  onChange={(e) =>
                    setEditTransaction({
                      ...editTransaction,
                      receiptNo: e.target.value,
                    })
                  }
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-gray-700 font-medium">Subject</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                  value={editTransaction?.subject || ""}
                  onChange={(e) =>
                    setEditTransaction({
                      ...editTransaction,
                      subject: e.target.value,
                    })
                  }
                />
              </div>

              {/* Amount Field */}
              <div>
                <label className="block text-gray-700 font-medium">Amount Paid</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                  value={editTransaction?.amountPaid || ""}
                  onChange={(e) =>
                    setEditTransaction({
                      ...editTransaction,
                      amountPaid: e.target.value,
                    })
                  }
                />
              </div>

              {/* Date Field */}
              <div>
                <label className="block text-gray-700 font-medium">Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                  value={editTransaction?.date || ""}
                  onChange={(e) =>
                    setEditTransaction({
                      ...editTransaction,
                      date: e.target.value,
                    })
                  }
                />
              </div>

               {/* Mode of Payment Field */}
               <div>
                <label className="block text-gray-700 font-medium">Mode of Payment</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                  value={editTransaction?.mode || ""}
                  onChange={(e) =>
                    setEditTransaction({
                      ...editTransaction,
                      mode: e.target.value,
                    })
                  }
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                </select>
              </div>

              {/* Save and Cancel Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none border-none"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none border-none"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FinancesTransactionsTableItem;
