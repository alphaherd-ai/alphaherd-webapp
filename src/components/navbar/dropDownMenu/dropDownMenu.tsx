"use client";
import { updateApp } from '@/lib/features/appSlice';
import { UserState } from '@/lib/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { isAdminOfOrg, isManagerOfBranch } from '@/utils/stateChecks';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import check from '@/assets/icons/navbar/check.svg'
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
const DropdownMenu = ({currBranch}:{currBranch:string}) => {

  const [selectedOrg,setSelectedOrg] = useState(null);

  const [orgAndBranchMapping, setOrgAndBranchMapping] = useState([]);

  const [secondLevelItems, setSecondLevelItems] = useState([]);

  const appState = useAppSelector((state) => state.app);

  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/navbar/dropdown?orgId=${appState.currentOrgId}`,fetcher,{revalidateOnFocus:true})
  useEffect(() => {
    if(data&&!error&&!isLoading){
      
      const orgs=data.filter((org:any)=>org.id===appState.currentOrgId);

     setOrgAndBranchMapping(orgs);
    
    }
   }, [data,error,isLoading]);

  function handleOrgBranchSelect(orgBranch : any){

    console.log(orgBranch);

    const isCurrentOrgAdmin = isAdminOfOrg((selectedOrg as any).id,user as UserState);
    const isCurrentBranchManager = isManagerOfBranch(orgBranch.id,user as UserState);

    dispatch(updateApp({
      currentBranch : orgBranch,
      currentBranchId : orgBranch.id,
      currentOrg : selectedOrg,
      currentOrgId : (selectedOrg as any).id,
      isCurrentBranchManager : isCurrentBranchManager,
      isCurrentOrgAdmin : isCurrentOrgAdmin
    }));

    window.location.reload();

  }
  

  return (
    <>
      <div className="w-fit min-w-60 px-6 py-2 h-fit bg-zinc-900 rounded-xl shadow-lg">
        
        <p className='text-[#545556] text-sm'>Select Branch</p>
        <hr className='text-[#545556] mt-2 mb-2'></hr>
        {
          orgAndBranchMapping.map((mapping: any, index) => {
            return (
              <div key={index} onClick={() => {
                setSecondLevelItems(mapping.allowedBranches);
                let org = mapping;
                delete org.allowedBranches;
                setSelectedOrg(org);
              }} className="mt-2 py-1 w-full  text-white font-bold text-sm hover:bg-[#262626ad]  hover:cursor-pointer focus:outline-none">
                {mapping.orgName}
              </div>
            )
          })
        }
        {
          secondLevelItems?.map((orgBranch: any, index) => {
            return (
              <div key={index} className="w-full flex items-center justify-between bg-zinc-900 rounded-lg shadow-lg px-2 py-2 text-white cursor-pointer" onClick={() => handleOrgBranchSelect(orgBranch)}>
                {orgBranch.branchName}
                {currBranch===orgBranch.branchName ? <img src={check.src} className='justify-end'></img>:""}
              </div>
            )
            
          })
        }

      </div>
      </>

  );
};


export default DropdownMenu;


