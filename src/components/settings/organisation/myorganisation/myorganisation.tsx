"use client"
import Image from "next/image"

import downicon from "../../../../assets/icons/settings/downicon.svg"
import branch from "../../../../assets/icons/settings/corporate_fare.svg"
import pfpimg from "../../../../assets/icons/settings/pfpimg.png"
import branchlogo from "../../../../assets/icons/settings/branchlogo.png"
import React, { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import OrganisationNavbar from "../navbar/navbar"

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
            body: JSON.stringify(data),
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
    },[data,error,isLoading]);

    console.log(appState)
    console.log(orgBranches)

    return (

        <>
            <div className="w-full h-full">

                <div className="w-full h-full mt-[26px] border border-solid border-borderGrey rounded-[10px]">
                    <OrganisationNavbar />
                    <div className="w-full h-full px-4 py-5 bg-gray-100 rounded-b-[10px] flex-col justify-start items-start gap-2 flex">
                        <div className="w-full flex gap-4">
                            <div className="w-5/12 px-6 pt-4 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-4 flex">
                                <div className="flex flex-col gap-2">
                                    <div className="text-neutral-400 text-base font-bold ">Logo and watermark</div>
                                    <div className="text-neutral-400 text-base font-medium ">Upload an image of your clinic’s logo and watermark</div>
                                </div>
                                <div className="flex justify-between w-full">
                                    {appState.isCurrentOrgAdmin?(
                                         <CldUploadButton
                                         className="rounded-full  h-0 border-none"
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
                                     >                {appState.currentOrg.orgImgUrl?<Image src={appState.currentOrg.orgImgUrl} alt="profile" width={150} height={150} className="rounded-[10px] object-cover" />:
                                     <div className="w-[150px] h-[150px]  rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 flex">
                                     <div className="text-neutral-400 text-base font-bold ">+</div>
                                     <div className="text-neutral-400 text-base font-bold "> Logo</div>
                                 </div>
                                   }
                                                
                                                 </CldUploadButton>
                                    ):(appState.currentOrg.orgImgUrl?<Image src={appState.currentOrg.orgImgUrl} alt="profile" width={150} height={150} />:(
                                        <div className="flex gap-4">
                                            <div className="w-[150px] h-[150px] rounded-[5px] border border-neutral-400 flex-col justify-center items-center gap-2 flex">
                                     <div className="text-neutral-400 text-base font-bold ">+</div>
                                     <div className="text-neutral-400 text-base font-bold "> Logo</div>
                                            </div>
                                            </div>
                                    ))
                                
                                }
                               
                                   
                                    
                                    <div className="w-[150px] h-[150px] p-2 rounded-[5px] border border-dashed border-borderGrey flex-col justify-center items-center gap-2 flex">
                                        <div className="text-neutral-400 text-base font-bold ">+</div>
                                        <div className="text-neutral-400 text-base font-bold ">WaterMark</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-9/12">
                            <div className="w-full h-14 rounded-[10px] justify-start items-center gap-2 flex">
                                <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Name:</div>
                                    <div className="w-10/12 h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentOrg.orgName}</div>
                                </div>
                                <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center  gap-4 flex">
                                        <div className="text-gray-500 text-base font-bold ">Branch:</div>
                                        <div className="w-10/12 h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentBranch.branchName}</div>                                
                                    </div>
                            </div>
                                <div className="w-full h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Address:</div>
                                    <div className="w-10/12 h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentOrg.address}</div>
                                </div>
                                <div className="w-full h-14 rounded-[10px] justify-start items-center gap-2 flex">
                                    <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center  gap-4 flex">
                                        <div className="text-gray-500 text-base font-bold ">State:</div>
                                        <div className="w-10/12 h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentOrg.state}</div>                                
                                    </div>
                                    <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center  gap-4 flex">
                                        <div className="text-gray-500 text-base font-bold ">Pincode:</div>
                                        <div className="w-10/12 h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentOrg.pincode}</div>                                
                                    </div>
                                </div>
                                <div className="w-full h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center  gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Email:</div>
                                    <div className="w-10/12 h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentOrg.orgEmail}</div>                            </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="w-full h-14 rounded-[10px] justify-start items-center gap-2 flex">
                                <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center  gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Phone No.:</div>
                                    <div className="w-8/12 h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentOrg.phoneNo}</div>                            </div>
                                <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Alternate Phone No.:</div>
                                    <input className="w-6/12 h-8 border-0 p-1 text-gray-500 text-base" type="text" name="" id="" defaultValue={"+91"} />
                                </div>
                            </div>
                            <div className="w-full h-14 rounded-[10px] justify-start items-center gap-2 flex">
                                <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">GSTIN:</div>
                                    <div className="w-10/12 h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentOrg.gstNo}</div>                            </div>
                                <div className="w-6/12 h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">PAN Number:</div>
                                    <input className="w-8/12 h-8 border-0 p-1 text-gray-500 text-base" type="text" name="" id="" defaultValue={"+91"} />
                                </div>
                            </div>
                            <div className="w-full h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold ">Website:</div>
                                <input className="w-10/12 h-8 border-0 p-1 text-gray-500 text-base" type="text" name="" id="" defaultValue={"petfirst.com"} />
                            </div>
                            <div className="w-full min-h-14 px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                <div className="text-gray-500 text-base font-bold ">Description:</div>
                                <div className="w-10/12 min-h-8 border-0 p-1 text-gray-500 text-base"> {appState.currentOrg.description}</div>                        </div>
                        </div>
                        <div className="w-full px-6 pt-4 pb-6 bg-white rounded-[10px] border border-stone-300 flex-col justify-start items-start gap-6 flex">
                            <div className="flex items-center justify-between w-full gap-2">
                                <div className="flex flex-col">
                                    <div className="text-gray-500 text-base font-bold ">Linked Branches</div>
                                    <div className="text-neutral-400 text-base font-medium ">Link a new branch with your Organisation</div>
                                </div>
                                <div className='flex items-center h-9 px-2 bg-black justify-evenly rounded-lg cursor-pointer'  onClick={togglePopup}>
                                    <Image  src={branch} alt="logo" w-4 h-4 />
                                    <Button
                                        variant="solid"
                                        className="capitalize flex border-none bg-black text-white rounded-lg "> 
                                        Add Branch
                                    </Button>

                                </div>
                            </div>
                            <div className="w-full h-full">
                                <div className="w-full h-full rounded-[10px] border-0 border-t border-l border-r border-solid border-borderGrey justify-start items-start flex flex-col">
                                    <div className='flex  w-full  box-border bg-gray-100  h-12 justify-around items-center border-0 border-b border-solid border-borderGrey text-textGrey2 rounded-t-[10px]'>
                                    <div className=' flex text-gray-500 text-base font-medium   w-[15rem]'>Branch Name</div>
                                    <div className=' flex text-gray-500 text-base font-medium   w-[8rem]'>Employees</div>
                                    <div className=' flex text-gray-500 text-base font-medium   w-[10rem]'>Phone No.</div>
                                    <div className=' flex text-gray-500 text-base font-medium   w-[10rem]'>Email</div>
                                    </div>
                                        {
                                            orgBranches.map((branch : any,index:number) => {
                                                return <div key={index+1} className='flex  w-full  box-border h-16 justify-around items-center bg-white   border-0 border-b border-solid border-borderGrey  hover:bg-gray-200 text-textGrey1  hover:text-textGrey2  transition'>
                                                <div className=' flex text-textGrey2 text-base font-medium   w-[15rem]'>{branch.branchName}</div>
                                                <div className=' flex text-textGrey2 text-base font-medium   w-[8rem]'>{branch.branchName}</div>
                                                <div className=' flex text-textGrey2 text-base font-medium   w-[10rem]'>{appState.currentOrg.phoneNo}</div>
                                                <div className=' flex text-textGrey2 text-base font-medium   w-[10rem]'>{appState.currentOrg.orgEmail}</div>
                                            </div>
                                            })
                                        }
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