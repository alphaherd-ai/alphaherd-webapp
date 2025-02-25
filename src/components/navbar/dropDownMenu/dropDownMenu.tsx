"use client";
import { updateApp } from "@/lib/features/appSlice";
import { UserState } from "@/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { isAdminOfOrg, isManagerOfBranch } from "@/utils/stateChecks";
import React, { useEffect, useState,useMemo } from "react";
import useSWR from "swr";
import check from "@/assets/icons/navbar/check.svg";
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

const DropdownMenu = ({ currBranch }: { currBranch: string }) => {

  const appState = useAppSelector((state) => state.app);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // const { data, error, isLoading } = useSWR(
  //   `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/navbar/dropdown?orgId=${appState.currentOrgId}`,
  //   fetcher,
  //   { revalidateOnFocus: true }
  // );

  const { data, error, isLoading } = useSWR(
    () => appState.currentOrgId ? 
      `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/navbar/dropdown?orgId=${appState.currentOrgId}` 
      : null,
    fetcher,
    { revalidateOnFocus: false }  // Disable re-fetching on focus for better performance
  );

  // useEffect(() => {
  //   if (data && !error && !isLoading) {
      
  //     const orgs = data.find((org: any) => org.id === appState.currentOrgId);
  //     if (orgs) {
  //       setOrgAndBranchMapping(orgs.allowedBranches);
  //     }
  //   }
  // }, [data, error, isLoading, appState.currentOrgId]);

  const orgAndBranchMapping = useMemo(() => {
    if (!data || error || isLoading) return [];
    const org = data.find((org: any) => org.id === appState.currentOrgId);
    return org ? org.allowedBranches : [];
  }, [data, error, isLoading, appState.currentOrgId]);

  console.log(orgAndBranchMapping);
  function handleOrgBranchSelect(orgBranch : any){

    // console.log(orgBranch);

    const currentOrgId = appState.currentOrgId || 0; 

    const isCurrentOrgAdmin = isAdminOfOrg(currentOrgId, user as UserState);

    const isCurrentBranchManager = isManagerOfBranch(orgBranch.id, user as UserState);

    dispatch(
      updateApp({
        currentBranch: orgBranch,
        currentBranchId: orgBranch.id,
        currentOrg: appState.currentOrg, // Keep current organization since we only have one
        currentOrgId: appState.currentOrgId,
        isCurrentBranchManager: isCurrentBranchManager,
        isCurrentOrgAdmin: isCurrentOrgAdmin,
      })
    );

    // window.location.reload();
  }

  return (
    <>
      <div className="w-fit min-w-60 px-6 py-2 h-fit bg-zinc-900 rounded-xl shadow-lg">
        {/* <p className="text-[#545556] text-sm">Select Branch</p> */}
        <hr className="text-[#545556] mt-2 mb-2" />
        {orgAndBranchMapping.map((orgBranch: any) => {
          return (
            <div
              key={orgBranch.id}
              className="w-full flex items-center justify-between bg-zinc-900 rounded-lg shadow-lg px-2 py-2 text-white cursor-pointer"
              onClick={() => handleOrgBranchSelect(orgBranch)}
            >
              {orgBranch.branchName}
              {currBranch === orgBranch.branchName ? (
                <img src={check.src} className="justify-end" alt="Selected" />
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DropdownMenu;
