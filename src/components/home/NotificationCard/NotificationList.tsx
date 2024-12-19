'use client';
import formatDateAndTime from "@/utils/formateDateTime";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useAppSelector } from "@/lib/hooks";
import Loading from "@/app/loading";
import { Notif_Source } from "@prisma/client";

//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json());

//@ts-ignore
const NotificationList =  ({ notifs, isLoading }) => {
  const appState = useAppSelector((state) => state.app);

  if(isLoading) {
    return (
      <div className="flex justify-center items-center ml-40 pr-40 p-20">
        <Loading/>
      </div>
    );
  }

  const readNotifs = axios.put(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/updateAll?orgId=${appState.currentOrgId}`);
  console.log("read notifs url is :",readNotifs);

  const handleAction = (notifId: number, action: string,notifData:any) => {
    const acceptRequest= axios.put(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/productBatch/${notifData.productId}?branchId=${appState.currentBranchId}`, {isApproved:true});
    // console.log(`Notification ID: ${notifId}, Action: ${action}`);

  };

  return (
    <>
      {notifs?.map((notif: any, index: number) => (
        <div key={notif.id}>
          {notif.source == Notif_Source.Inventory_Update_Approval_Request ? (
            <div className="w-[443px] h-[116px] px-5 py-4 bg-neutral-700 border border-neutral-700 rounded-[10px] justify-start items-start gap-4 inline-flex relative z-100">
              <div className="p-[4.50px] bg-amber-400 rounded-[5px] justify-center items-center gap-[11.25px] flex">
                <div className="w-[27px] h-[27px] ">
                  <div className="w-[27px] h-[27px] left-0 top-0 bg-white rounded-full" />
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch justify-end items-start inline-flex">
                  <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
                    <div className="self-stretch text-emerald-50 text-base font-bold ">
                      {notif.message}
                    </div>
                    <div className="text-neutral-400 text-xs font-medium ">
                      {formatDateAndTime(notif.createdAt).formattedTime}
                    </div>
                  </div>
                  <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleAction(notif.id, "accept",notif.data)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(notif.id, "deny",notif.data)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                  >
                    Deny
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href={notif.url || ""} passHref>
              <div className="w-[443px] h-[116px] px-5 py-4 bg-neutral-700 border border-neutral-700 rounded-[10px] justify-start items-start gap-4 inline-flex relative z-100">
                <div className="p-[4.50px] bg-amber-400 rounded-[5px] justify-center items-center gap-[11.25px] flex">
                  <div className="w-[27px] h-[27px] ">
                    <div className="w-[27px] h-[27px] left-0 top-0 bg-white rounded-full" />
                  </div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-end items-start inline-flex">
                    <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
                      <div className="self-stretch text-emerald-50 text-base font-bold ">
                        {notif.message}
                      </div>
                      <div className="text-neutral-400 text-xs font-medium ">
                        {formatDateAndTime(notif.createdAt).formattedTime}
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
