"use client"
import { usePathname } from 'next/navigation';
import Image from "next/image"

import profilepic from "../../assets/icons/profile/profilepic.png"
import editicon from "../../assets/icons/profile/editicon.svg"
import lefticon from "../../assets/icons/profile/left_icon.svg"
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from 'next/navigation';
import { CldUploadButton } from 'next-cloudinary';
import axios from 'axios';
import { updateUser,UserState } from '@/lib/features/userSlice';
//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
const AdminProfile = () => {
    const userState= useAppSelector((state)=>state.user)
    const appState=useAppSelector((state)=>state.app)
    console.log("this is user from appstate",userState)
    const [resource, setResource] = useState<any>();
    const currentRoute = usePathname();
  const dispatch = useAppDispatch();
    const [editable, setEditable] = useState(false);
    const [value, setValue] = useState<string>(String(userState.name));
   const handleUpdatePic =async(imageInfo:any)=>{
    const response=await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/${userState.id}`, JSON.stringify(imageInfo.secure_url));
    console.log("hello this is response",response)
    if (response.data) {
        const updatedUserState = {
          ...userState,
          imageUrl: String(imageInfo.secure_url),
        };
      
        dispatch(updateUser(updatedUserState as UserState));
        console.log("admin profile updated", response.data);
      }
   }
    const handleEditClick = () => {
      setEditable(true);
    };
  
    const handleSaveClick = () => {
      setEditable(false);
    };
  
    const handleChange = (e:any) => {
      setValue(e.target.value);
    };
    const roles = userState.userRoles.filter((e:any) => e.orgBranchId==appState.currentBranchId);

    const address= userState.adminOrganizations.map((e:any)=>e.address);
    const orgId=userState.adminOrganizations.map((e:any)=>e.id);
    //@ts-ignore
    const [activeTab, setActiveTab] = useState(roles[0].role);
    const router=useRouter();
    const handleTabClick = (tab:string) => {
        setActiveTab(tab);
    };
    return (

        <>
            <div className="min-h-screen  bg-gray-200 rounded-[20px] ">
                <div className="flex h-11 items-center justify-between ">
                    <div className="flex justify-center items-center">
                        <div className="w-11 h-11 bg-gray-100 rounded-[5px] border border-neutral-400 flex justify-center items-center mr-16 cursor-pointer" onClick={()=>router.back()}>
                            <Image className="w-6 h-6  rounded-[5px]" src={lefticon} alt="Back" ></Image>
                        </div>
                        <div className="text-gray-500 text-[28px] font-bold ">
                            User Profile
                        </div>
                    </div>
                </div>
                <div className="w-full min-h-[80vh] flex-col justify-start items-start gap-px flex pt-4">
                    <div className="w-full h-[83px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 justify-start items-center gap-2 flex">
                        <div className="text-gray-500 text-xl font-bold ">
                           
                        
                                {value}
                                    
                     
                        </div>
                        {orgId[0]!=null?<div className="w-[57px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 inline-flex"><div className="text-teal-400 text-sm font-medium ">Admin</div></div>:""}
                        
                    </div>
                    <div className="w-full min-h-[30rem]  p-4 bg-gray-100 border border-neutral-400 justify-start items-start gap-6 flex">
                        <div className="w-[245px] h-[270px] relative bg-white rounded-[10px] border border-stone-300 flex justify-end">
                            {userState.imageUrl?
                            <Image className="relative rounded-[10px]  border border-neutral-400" src={String(userState.imageUrl)} alt="photo" width={245} height={270}/>:
                            <Image className="relative rounded-[10px]  border border-neutral-400" src={profilepic} alt="photo" width={245} height={270}/>
                            }
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
                            setResource(result?.info.secure_url); 
                            console.log(result) 
                            handleUpdatePic(result.info)
                            widget.close();
                        }}
                >  
                            <Image className="absolute bg-gray-100 cursor-pointer  " src={editicon} alt="edit" />
                            </CldUploadButton>
                        </div>
                        <div className="w-full flex-col justify-start items-start gap-4 flex">
                            <div className="w-full justify-start items-start gap-4 flex ">
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-between items-center gap-4 flex">
                                    <div className="flex gap-4 justify-between items-center">
                                        <div className="text-gray-500 text-base font-bold ">Name:</div>
                                        <div className="text-gray-500 text-base font-medium ">   <div>
                                {editable ? (
                                    <input
                                    className='rounded-lg px-3 py-2 h-full box-border text-base border border-solid border-gray-400 w-full text-gray-400'
                                        type="text"
                                        value={value}
                                        onChange={handleChange}
                                        autoFocus
                                        onBlur={handleSaveClick}
                                    />
                                ) : (
                                    <div>{value}</div>
                                )}
                               
                            </div>
                            </div>
                                    </div>
                                    <div >
                                    {!editable && <button className='outline-none border-0' onClick={handleEditClick}>  <Image src={editicon} alt="edit" /></button>}
                                      
                                    </div>
                                </div>
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Role:</div>
                                    <div className="text-gray-500 text-base font-medium ">
                                    <div className='flex  text-gray-500 items-center cursor-default'>


<div className={activeTab === 'Staff' 
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white rounded-tl-md rounded-bl-md"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500 rounded-tl-md rounded-bl-md"} onClick={() => handleTabClick('Staff')}>Staff</div>


<div className={activeTab === 'Manager' 
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"} onClick={() => handleTabClick('Manager')}>Manager</div>


<div className={activeTab === 'Veterinarian' 
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white  rounded-tr-md rounded-br-md"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500  rounded-tr-md rounded-br-md"} onClick={() => handleTabClick('Veterinarian')}>Veterinarian</div>

    </div>

                                    </div>
                                </div>
                            </div>
                            <div className="w-full justify-start items-start gap-4 flex ">
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Phone No.:</div>
                                    <input className="w-[25rem] h-full border-0 p-1" type="number" name="" id="" defaultValue={String(userState.phoneNo)} />
                                </div>
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Alternate Phone No.</div>
                                    <input className="w-[21rem] h-full border-0 p-1" type="number" name="" id="" defaultValue={String(userState.altPhoneNo) } />
                                </div>
                            </div>
                            <div className="w-full justify-start items-start gap-4 flex ">
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Email:</div>
                                    <input className="w-[60rem] h-8 border-0 p-1 ml-[2rem]" type="text" name="" id="" defaultValue={String(userState.email)} />
                                </div>
                            </div>
                            <div className="w-full justify-start items-start gap-4 flex ">
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Address:</div>
                                    <input className="w-[60rem] h-8 border-0 p-1 ml-[2rem]" type="text" name="" id="" defaultValue={String(address[0])} />
                                    {/* <div className="text-gray-500 text-base font-medium ">47/38, 14th Cross, Addagalapura, Bangalore </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[43px] px-4 py-2 bg-white rounded-bl-[10px] rounded-br-[10px] border border-neutral-400"></div>

                </div>
            </div>
        </>
    )
}

export default AdminProfile