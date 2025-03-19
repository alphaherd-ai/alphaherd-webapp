"use client"
import Image from "next/image"

import React, { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import OrganisationNavbar from "../navbar/navbar"
import fare from "../../../../assets/icons/settings/corporate_fare.svg"
import { isAdminOfOrg, isManagerOfBranch } from "@/utils/stateChecks";
import { UserState } from "@/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link"
import AddBranchPopup from "../addBranchPopup"
import useSWR from 'swr';
import { CldUploadButton } from "next-cloudinary"
import axios from "axios"
import { AppState, updateApp } from "@/lib/features/appSlice"
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
export const MyOrganisationSettings = () => {

    const appState = useAppSelector((state) => state.app);
    const dispatch = useAppDispatch();

    const [showPopup, setShowPopup] = React.useState(false);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    }
    const handleUpdatePic = async (imageInfo: any) => {
        
        const updatedOrg = {
          ...appState.currentOrg,
          orgImgUrl: String(imageInfo.secure_url),
        };
      
        
        const updatedBranch = {
          ...appState.currentBranch,
          org: {
            ...appState.currentBranch.org,
            orgImgUrl: String(imageInfo.secure_url),
          },
        };
        
        
        const updatedAppState = {
          ...appState,
          currentOrg: updatedOrg,
          currentBranch: updatedBranch,
        };
      
        const data = updatedAppState.currentOrg;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/admin/orgEdit?orgId=${appState.currentOrgId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"orgDetails":data,"orgId":appState.currentOrgId}),
          }
        );
      
        let json = await response.json();
        // console.log('hello this is response', response);
      
        if (response.ok) {
          dispatch(updateApp(updatedAppState as AppState));
        //   console.log('admin profile updated', json);
        }
      };
      
    
    const [orgBranches,setOrgBranches] = useState([]);
    const {data,error,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/admin/branch/all?orgId=${appState.currentOrgId}`,fetcher,{revalidateOnFocus:true});

    useEffect(() => {
      if(data&&!error&&!isLoading){
          setOrgBranches(data.branches)
      }
    //   const employeeno = orgBranches.map((branch:any) => length(branch.assignedUsers))
    //   console.log('here is no.',(employeeno))
    },[data,error,isLoading]);
    const user = useAppSelector((state) => state.user);
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
    
        window.location.reload();
      }
    console.log(appState)
    console.log(orgBranches)

    return (

        <>
            <div className="w-full h-full">

                <div className="w-full h-full mt-[26px]">
                    <OrganisationNavbar />
                    <div className="w-full h-full px-4 py-4 bg-gray-100 border border-neutral-400 flex-col justify-start items-start gap-4 flex">
                        <div className="w-full flex gap-4">
                            <div className="w-3/12 px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-2 flex ">
                                <div className="flex flex-col gap-2">
                                    <div className="text-neutral-400 text-base font-bold ">Logo and watermark</div>
                                    <div className="text-neutral-400 text-base font-medium ">Upload an image of your clinic’s logo and watermark</div>
                                </div>
                                <div className="flex gap-4">
                                    {appState.isCurrentOrgAdmin?(
                                         <CldUploadButton
                                         className="rounded-full border-none  hover:cursor-pointer"
                                         options={{
                                             sources: ['local', 'url'],
                                             multiple: false,
                                             maxFiles: 1
                                         }}
                                             uploadPreset={process.env.CUSTOMCONNSTR_NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                                             onSuccess={(result, { widget }) => {
                                                 //@ts-ignore
                                                 handleUpdatePic(result.info)
                                                 widget.close();
                                             }}
                                     >                {appState.currentOrg.orgImgUrl?<Image src={appState.currentOrg.orgImgUrl} alt="profile" width={130} height={150} className="h-[7rem] w-auto"/>:
                                     <div className="w-[164px] h-[164px] p-2 rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 flex">
                                     <div className="text-neutral-400 text-base font-bold ">+</div>
                                     <div className="text-neutral-400 text-base font-bold "> Logo</div>
                                 </div>
                                   }
                                                
                                                 </CldUploadButton>
                                    ):(appState.currentOrg.orgImgUrl?<Image src={appState.currentOrg.orgImgUrl} alt="profile" className="h-[130px]" />:(
                                        <div className="flex gap-4">
                                            <div className="w-[164px] h-[164px] p-2 rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 flex">
                                     <div className="text-neutral-400 text-base font-bold ">+</div>
                                     <div className="text-neutral-400 text-base font-bold "> Logo</div>
                                            </div>
                                            </div>
                                    ))
                                
                                }
                               
                                   
                                    
                                    {/* <div className="w-[164px] h-[164px] p-2 rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 flex">
                                        <div className="text-neutral-400 text-base font-bold ">+</div>
                                        <div className="text-neutral-400 text-base font-bold ">WaterMark</div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-9/12">
                                <div className="w-full h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Org. Name:</div>
                                    <div className="w-10/12 h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentOrg.orgName}</div>
                                </div>
                                <div className="w-full h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Address:</div>
                                    <div className="w-10/12 h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentBranch.address}</div>
                                </div>
                                <div className="w-full h-14 rounded-[10px] justify-start items-center gap-2 flex">
                                    <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center  gap-4 flex">
                                        <div className="text-gray-500 text-base font-bold ">State:</div>
                                        <div className="w-10/12 h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentBranch.state}</div>                                </div>
                                    <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center  gap-4 flex">
                                        <div className="text-gray-500 text-base font-bold ">Pincode:</div>
                                        <div className="w-10/12 h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentBranch.pinCode}</div>                                </div>
                                </div>
                                <div className="w-full h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center  gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Email:</div>
                                    <div className="w-10/12 h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentBranch.email}</div>                            </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="w-full h-14 rounded-[10px] justify-start items-center gap-2 flex">
                                <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center  gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Phone No.:</div>
                                    <div className="w-8/12 h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentBranch.phoneNo}</div>                            </div>
                                <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Alternate Phone No.:</div>
                                    <div className="w-6/12 h-8 border-0 p-1 text-gray-500 text-base"  >{appState.currentBranch.altphoneNo}</div>
                                </div>
                            </div>
                            <div className="w-full h-14 rounded-[10px] justify-start items-center gap-2 flex">
                                <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">GSTIN:</div>
                                    <div className="w-10/12 h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentBranch.gstNo}</div>                            </div>
                                <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">PAN Number:</div>
                                    <div className="w-8/12 h-8 border-0 p-1 text-gray-500 text-base" > {appState.currentBranch.panNo} </div>
                                </div>
                            </div>
                            <div className="w-full h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold ">Website:</div>
                                <div className="w-10/12 h-8 border-0 p-1 text-gray-500 text-base"  >{appState.currentBranch.website} </div>
                            </div>
                            <div className="w-full min-h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold ">Description:</div>
                                <div className="w-10/12 min-h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentBranch.description}</div>                        </div>
                        </div>
                        <div className="w-full px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="flex items-center justify-between w-full gap-2">
                                <div className="flex flex-col">
                                    <div className="text-gray-500 text-base font-bold ">Linked Branches</div>
                                    <div className="text-neutral-400 text-base font-medium ">Link a new branch with your Organisation</div>
                                </div>
                                    <Button
                                        variant="solid"
                                        className="capitalize flex border-none bg-black text-white rounded-lg hover:cursor-pointer font-bold " onClick={togglePopup}>
                                            <Image className="w-4 h-4 relative" src={fare} alt="sms" />
                                             Add Branch</Button>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border border-stone-300 justify-start items-start flex flex-col">
                                    <div className='flex  w-full  box-border bg-gray-100  justify-evenly items-center border-0 border-b border-solid border-borderGrey text-gray-500 rounded-t-lg  h-[60px]'>
                                        {/* <div className='flex text-gray-500 text-base font-medium px-6 w-5/12'>Branch Name</div> */}
                                        <div className=' flex text-textGrey2 text-base font-medium w-[15rem]'>Branch Name</div>
                                        <div className=' flex text-textGrey2 text-base font-medium w-[12rem] justify-center'>Employees</div>
                                        <div className=' flex text-textGrey2 text-base font-medium w-[10rem]'>Phone No.</div>
                                        <div className=' flex text-textGrey2 text-base font-medium w-[15rem]'>Email</div>
                                    </div>
                                    {/* <div className='flex items-center w-full box-border py-4 bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 overflow-x-scroll'>
                                        {
                                            orgBranches.map((branch : any,index:number) => {
                                                return <div key={index+1} className='w-5/12 px-6 flex gap-2 items-center text-neutral-400 text-base font-medium'>
                                                <div className="text-teal-400 text-base font-bold ">{branch.branchName}</div>
                                            </div>
                                            })
                                        }
                                    </div> */}
                                <div className='flex items-center w-full box-border bg-white border border-solid border-gray-300 text-gray-400 border-t-0 border-b-0 flex-col'>
                                    {
                                        orgBranches.map((branch: any, index: number) => (
                                            <div key={index+1} className='flex  w-full  box-border h-12 justify-evenly items-center bg-white border-0 border-b border-solid border-borderGrey hover:bg-gray-100 text-textGrey1 hover:text-textGrey2'
                                            onClick={() => handleOrgBranchSelect(branch)}
                                            >
                                                <div className='w-[15rem] text-base font-medium'>{branch.branchName}</div>
                                                <div className='w-[12rem] text-base font-medium text-center'>{branch.assignedUsersCount}</div>
                                                <div className='w-[10rem] text-base font-medium'>{branch.phoneNo}</div>
                                                <div className='w-[15rem] text-base font-medium'>{branch.email}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
           
            {showPopup && <AddBranchPopup onClose={togglePopup} />} 
           
        </>
    )
}