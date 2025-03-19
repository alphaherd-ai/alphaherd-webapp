'use client';
import formatDateAndTime from "@/utils/formateDateTime";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import Loading from "@/app/loading";
import { Notif_Source } from "@prisma/client";

//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json());

//@ts-ignore
const NotificationList =  ({ notifs, isLoading }) => {
  console.log("notif",notifs);
  const appState = useAppSelector((state) => state.app);
  const isAdmin =  appState.isCurrentOrgAdmin;
  if(isLoading) {
    return (
      <div className="flex justify-center items-center ml-40 pr-40 p-20">
        <Loading/>
      </div>
    );
  }

  const readNotifs = axios.put(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/updateAll?orgId=${appState.currentOrgId}`);
  console.log("read notifs url is :",readNotifs);

  const handleAction = async (notifId: number, action: string, notifData: any) => {
    try {
      if (notifData && action === 'accept') {
        notifData.isApproved = true;
        console.log("notif data inside list ",notifData);
          if(notifData.source == Notif_Source.Inventory_Update_Approval_Request){
              const stockStatus = notifData.data.body1.stockStatus;
              const productId = notifData.data.body1.productId;
              notifData.data.body1.isApproved = true;
              console.log(`Extracted Product ID: ${productId}`);
        
              if (stockStatus === 'StockOUT' && productId) {
                console.log("stock out");
                await axios.put(
                  `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/${productId}?branchId=${appState.currentBranchId}`,
                  notifData.data.body1
                );
                console.log("Approved");
              } 
          }
          else if(notifData.source == Notif_Source.Payment_Edit_Approval_Request)
          {
            const editTrans = notifData.data.body;
            console.log("edit transcation is : ",editTrans);
            try {
              console.log("Saving updated transaction: ", editTrans);
    
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/${editTrans?.id}?branchId=${appState.currentBranchId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(editTrans),
              });
    
              if (!response.ok) {
                throw new Error('Failed to save transaction');
              }
    
              const result = await response.json();
              console.log('Transaction successfully updated:', result);
    
              alert('Transaction saved successfully');
               // Close popup on success
            } catch (error) {
              console.error('Failed to save transaction: ', error);
              alert('Failed to save transaction');
            }
          }
          else if(notifData.source ==Notif_Source.Sales_Approval_Request){
            try {
              const salesId=notifData?.data.salesId;
              if(!salesId){
                throw new Error("Sales ID is missing in the notification data.");
              }
              console.log("salesId here",salesId);
              const res = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/status/${salesId}?branchId=${appState.currentBranchId}`, {
                status: "Cancelled"
              }, {
                headers: {
                    'Content-Type': 'application/json',
                }
              }
              )

              if (res.status === 200 || res.status === 201) {
                console.log("Sales transaction successfully cancelled.");
              } else {
                throw new Error(`Unexpected response status: ${res.status}`);
              }
            } catch (error) {
              console.error('Failed to save transaction: ', error);
              alert('Failed to save transaction');
            }
          }   
          else if(notifData.source===Notif_Source.Purchases_Approval_Request){
              try {
                const purchaseId=notifData?.data.purchaseId;
                if(!purchaseId){
                  throw new Error("Sales ID is missing in the notification data.");
                }
                console.log("purchaseId here",purchaseId);

                const res = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/purchases/status/${purchaseId}?branchId=${appState.currentBranchId}`, {
                  status: "Cancelled"
                }, {
                  headers: {
                      'Content-Type': 'application/json',
                  }
                }
                )

                if (res.status === 200 || res.status === 201) {
                  console.log("Purchase transaction successfully cancelled.");
                } else {
                  throw new Error(`Unexpected response status: ${res.status}`);
                }
              } catch (error) {
                console.error('Failed to save transaction: ', error);
                alert('Failed to save transaction');
              }
          }
          else if(notifData.source==Notif_Source.Expenses_Approval_Request){
            try {
                  const expenseId= notifData?.data.expenseId;
                  if(!expenseId){
                    throw new Error("Sales ID is missing in the notification data.");
                  }

                  console.log("expenseId here",expenseId);

                  const res = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/finance/expenses/status/${expenseId}?branchId=${appState.currentBranchId}`, {
                    status: "Cancelled"
                  }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                  }
                  )

                  if (res.status === 200 || res.status === 201) {
                    console.log("Purchase transaction successfully cancelled.");
                  } else {
                    throw new Error(`Unexpected response status: ${res.status}`);
                  }
            } catch (error) {
              console.error('Failed to save transaction: ', error);
              alert('Failed to save transaction');
            }
          }   
          else if(notifData.source==Notif_Source.Payment_Delete_Approval_Request){
            const transactionId = notifData.data.transactionId;
            const invoiceLink = notifData.data.invoiceLink;
            try {

              const response = await axios.put(
                  `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/${transactionId}?branchId=${appState.currentBranchId}`,
                  {

                      moneyChange: "Cancelled",
                  },
                  {

                      headers: {
                          'Content-Type': 'application/json',
                      },
                  }
              );

              if (response.status !== 201) {
                  throw new Error(`Unexpected response status: ${response.status}`);
              }

          

              const editRecordTransaction = {
                  receiptNo:notifData.data.receiptNo,
                  moneyChange: "Cancelled",
              };

              try {

                  const putResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/transactions/editRecordTransaction/${invoiceLink}/?branchId=${appState.currentBranchId}`, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                          recordTransaction: [editRecordTransaction]
                      })
                  });


                  if (putResponse.status !== 201) {
                      throw new Error(`Unexpected response status: ${putResponse.status}`);
                      
                  }
              }

              catch (error) {
                  console.log(error)

              }



          }
          catch (err) {
              console.log(err);
          }

          }

          
      } else {
        console.log("Approval Denied");
      }
    //  console.log(`Notification ID is: ${notifId}`);
  
    
      // await axios.delete(
      //   `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/delete`,
      //   {
      //     data: { id: notifId }, 
      //   }
      // );
      // console.log("Notification Deleted");
    } catch (error) {
      console.error("Error handling notification action:", error);
      console.error("An error occurred while processing the notification.");
    }
  };
  


  
  

  return (
    <>
      {notifs?.map((notif: any, index: number) => (
        <div key={notif.id}>
          {(notif.source==Notif_Source.Payment_Delete_Approval_Request || notif.source==Notif_Source.Expenses_Approval_Request || notif.source==Notif_Source.Purchases_Approval_Request || notif.source == Notif_Source.Inventory_Update_Approval_Request || notif.source == Notif_Source.Payment_Edit_Approval_Request || notif.source == Notif_Source.Payment_Delete_Approval_Request || notif.source ==Notif_Source.Sales_Approval_Request) && isAdmin  ?  (

            
            <div className=" px-5 py-4 bg-neutral-700 border border-neutral-700 rounded-[10px] justify-start items-start gap-4 inline-flex relative z-100">
              <div className="p-[4.50px] bg-amber-400 rounded-[5px] justify-center items-center gap-[11.25px] flex">
                <div className="w-[27px] h-[27px] ">
                  <div className="w-[27px] h-[27px] left-0 top-0 bg-white rounded-full" />
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch justify-end items-start inline-flex">
                  <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
                    <div className="self-stretch text-emerald-50 text-base font-bold ">
                      {notif.message || notif.data.message}
                    </div>
                    <div className="self-stretch text-neutral-400 text-xs font-medium flex justify-between items-center">
                        <span>{formatDateAndTime(notif.createdAt).formattedTime}</span>
                        <span>{formatDateAndTime(notif.createdAt).formattedDate}</span>
                      </div>
                  </div>
                  <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />
                </div>
                <div className="flex gap-5 mt-2">
                  <button
                    onClick={() => handleAction(notif.id, "accept",notif)}
                    className="px-4 py-2 bg-teal-500 text-white rounded-md cursor-pointer  border-none"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(notif.id, "deny",notif)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md cursor-pointer  border-none"
                  >
                    Deny
                  </button>
                </div>
                
              </div>
            </div>
          ) : (
            <Link href={notif.url || ""} passHref>
              <div className=" px-5 py-4 bg-neutral-700 border border-neutral-700 rounded-[10px] justify-start items-start gap-4 inline-flex relative z-100">
                <div className="p-[4.50px] bg-amber-400 rounded-[5px] justify-center items-center gap-[11.25px] flex">
                  <div className="w-[27px] h-[27px] ">
                    <div className="w-[27px] h-[27px] left-0 top-0 bg-white rounded-full" />
                  </div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-end items-start inline-flex">
                    <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
                      <div className="self-stretch text-emerald-50 text-base font-bold ">
                        {notif.message || notif.data?.message}
                      </div>
                      <div className="self-stretch text-neutral-400 text-xs font-medium flex justify-between items-center">
                        <span>{formatDateAndTime(notif.createdAt).formattedTime}</span>
                        <span>{formatDateAndTime(notif.createdAt).formattedDate}</span>
                      </div>
                    </div>
                    <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      )).reverse()}
    </>
  );
};

export default NotificationList;
