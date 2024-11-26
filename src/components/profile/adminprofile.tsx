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
import useSWR from 'swr';
import { updateUser,UserState } from '@/lib/features/userSlice';
import { Button } from '@nextui-org/react';
import logoutIcon from "../../assets/icons/profile/logout.svg"

//@ts-ignore
/*

  
    // State for active role
    const [activeRole, setActiveRole] = useState<string>(userRoles[0]?.role || '');
  
    const handleEditClick = () => setEditable(true);
    const handleSaveClick = () => setEditable(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  
    const orgId = adminOrganizations.map((org) => org.id);
  
    console.log("User Email:", userState.email);  // Log email
    console.log("Branch ID:", appState.currentBranchId);  // Log branch ID
  

    const handleRoleChange = async (newRole: string) => {
      setActiveRole(newRole);
      console.log("new role is :" , newRole);
       console.log('Updating role for:', {
            email: userState.email,
            branchId: appState.currentBranchId,
            newRole,
          });
  
         
      try {
        console.log("api called" );
        console.log(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/updateRole`)
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/updateRole`, {
            
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            
            email: userState.email,
            branchId: appState.currentBranchId,
            newRole,
          }),
        });
        console.log('Updating role for:', {
            email: userState.email,
            branchId: appState.currentBranchId,
            newRole,
          });
  
        const data = await res.json();
        if (res.ok) {
          console.log('Role updated successfully:', data.message);
        } else {
          console.error('Failed to update role:', data.message);
        }
      } catch (error) {
        console.error('Error updating role:', error);
      }
    };
*/
import router from 'next/router';
//@ts-ignore
interface UserRole {
    role: string;
  }
  
  interface AdminOrganization {
    id: number;
    address: string;
  }
//const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
const AdminProfile = () => {

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        router.push(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/auth/login`);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred while logging out", error);
    } finally {
      setLoading(false);
    }
  };

    const userState= useAppSelector((state)=>state.user)
    const appState=useAppSelector((state)=>state.app)
    // console.log("this is user from appstate",userState)
    const [resource, setResource] = useState<any>();
    const currentRoute = usePathname();

    //const [editable, setEditable] = useState(false);
  //const [value, setValue] = useState<string>(String(userState.name));
  const [phone, setPhone] = useState<string>(String(userState.phoneNo));
  const [altPhone, setAltPhone] = useState<string>(String(userState.altPhoneNo));
  const [email, setEmail] = useState<string>(String(userState.email));
  const [address, setAddress] = useState<string>(String(userState.adminOrganizations.map((e: any) => e.address)[0]));
  //const [activeRole, setActiveRole] = useState<string>(userState.userRoles[0]?.role || '');

  const dispatch = useAppDispatch();
    const [editable, setEditable] = useState(false);
    const [value, setValue] = useState<string>(String(userState.name));
   const handleUpdatePic =async(imageInfo:any)=>{
    const response=await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/${userState.id}`, JSON.stringify(imageInfo.secure_url));
    // console.log("hello this is response",response)
    if (response.data) {
        const updatedUserState = {
          ...userState,
          imageUrl: String(imageInfo.secure_url),
        };
      
        dispatch(updateUser(updatedUserState as UserState));
        // console.log("admin profile updated", response.data);
      }
   }
   const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/${userState.id}`, {
        name: value,
        phoneNo: phone,
        altPhoneNo: altPhone,
        email,
        address,
      });

      if (response.data) {
        const updatedUserState = {
          ...userState,
          name: value,
          phoneNo: phone,
          altPhoneNo: altPhone,
          email,
          address,
        };

        dispatch(updateUser(updatedUserState as UserState));
        console.log("Profile updated successfully", response.data);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
    const handleEditClick = () => {
      setEditable(!editable);
    };
  
    const handleSaveClick = async () => {
      setEditable(false); // Turn off editing mode
      await handleUpdateProfile(); // Save updated profile
    };
  
    const handleChange = (e:any) => {
      setValue(e.target.value);
    };
    const roles = userState.userRoles.filter((e:any) => e.orgBranchId==appState.currentBranchId);
    const userRoles: UserRole[] = userState.userRoles || [];
   // const address= userState.adminOrganizations.map((e:any)=>e.address);
    const orgId=userState.adminOrganizations.map((e:any)=>e.id);

    console.log("address",address);
    //@ts-ignore
    console.log("User Email:", userState.email);  // Log email
    console.log("Branch ID:", appState.currentBranchId);  // Log branch ID
    const [activeRole, setActiveRole] = useState<string>(userRoles[0]?.role || '');
   

    console.log("User Email:", userState.email);  // Log email
    console.log("Branch ID:", appState.currentBranchId);  // Log branch ID
    const router=useRouter();
    const handleRoleChange = async (newRole: string) => {
        setActiveRole(newRole);
        console.log("new role is :" , newRole);
         console.log('Updating role for:', {
              email: userState.email,
              branchId: appState.currentBranchId,
              newRole,
            });
    
           
        try {
          console.log("api called" );
          console.log(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/updateRole`)
          
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/updateRole`, {
              
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              
              email: userState.email,
              branchId: appState.currentBranchId,
              newRole,
            }),
          });
          console.log('Updating role for:', {
              email: userState.email,
              branchId: appState.currentBranchId,
              newRole,
            });
    
          const data = await res.json();
          if (res.ok) {
            console.log('Role updated successfully:', data.message);
          } else {
            console.error('Failed to update role:', data.message);
          }
        } catch (error) {
          console.error('Error updating role:', error);
        }
      };
    console.log("userState",userState)

    return (

        <>
            <div className="min-h-screen   rounded-[20px] "
             >
                <div className="flex h-11 items-center justify-between ">
                    <div className="flex justify-center items-center gap-2">
                    <div 
                  className="w-11 h-11 bg-gray-100 rounded-[5px] flex justify-center items-center cursor-pointer box-border   border border-solid border-gray-300" 
                  style={{ border: "1px solid gray-300" }} 
                  onClick={() => router.back()}
                >
  <Image className="w-6 h-6 rounded-[5px]" src={lefticon} alt="Back" />
</div>

                        <div className="text-gray-500 text-[28px] font-bold ">
                            User Profile
                        </div>
                        <div>
            {!editable ? (
              <button className="text-sm bg-teal-500 text-white px-4 py-2 rounded-md border-x-y-neutral-800 " onClick={handleEditClick} >
                Edit Profile
              </button>
            ) : (
              <button className="text-sm bg-teal-500 text-white px-4 py-2 rounded-md border-neutral-400" onClick={handleSaveClick}>
                Save
              </button>
            )}
          </div>
                    </div>
                </div>
                
                <div className="w-full min-h-[80vh] flex-col justify-start items-start gap-px flex pt-4"  >
                    <div className="w-full h-[83px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 justify-start items-center gap-2 flex"  
                    style={{ borderTop: "1px solid gray", borderLeft: "1px solid gray", borderRight: "1px solid gray" }}
                    >
                        <div className="text-gray-500 text-xl font-bold ">
                           
                        
                                {value}
                                    
                     
                        </div>
                        {orgId[0]!=null?<div className="w-[57px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 inline-flex"><div className="text-teal-400 text-sm font-medium ">Admin</div></div>:""}
                        </div>
                    {/* 
                    <div className="w-full min-h-[30rem] p-4 bg-gray-100 border border-neutral-400 flex">
                      <div className="w-[245px] h-[270px] relative bg-white rounded-[10px] border border-stone-300">
                          {userState.imageUrl ? (
                              <Image className="absolute rounded-[10px] w-full h-full" src={String(userState.imageUrl)} alt="Profile Image" />
                          ) : (
                              <Image className="absolute rounded-[10px] w-full h-full" src={profilepic} alt="Profile Image" />
                          )}
  
                          <CldUploadButton
                              className="absolute bottom-4 right-4 rounded-full border-none bg-white p-1"
                              options={{
                                  sources: ['local', 'url'],
                                  multiple: false,
                                  maxFiles: 1
                              }}
                              uploadPreset={process.env.CUSTOMCONNSTR_NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                              onSuccess={(result, { widget }) => {
                                  //setResource(result?.info.secure_url);
                                  handleUpdatePic(result.info);
                                  widget.close();
                              }}
                          >
                              <Image className="w-6 h-6 cursor-pointer" src={editicon} alt="Edit" />
                          </CldUploadButton>
                      </div> */}
                    <div className="w-full min-h-[30rem]  p-4 bg-gray-100 border border-neutral-400 justify-start items-start gap-6 flex"  
                    style={{  borderLeft: "1px solid gray", borderRight: "1px solid gray" }}
                    >
                        <div className="w-[245px] h-[270px] relative bg-white rounded-[10px] border border-stone-300 flex justify-end">
                            {userState.imageUrl? (
                            <Image className="relative rounded-[10px]  border border-neutral-400" src={String(userState.imageUrl)} alt="photo" width={245} height={270}/>
                            ) : (
                            <Image className="relative rounded-[10px]  border border-neutral-400" src={profilepic} alt="photo" width={245} height={270}/>
                            )}
                    <CldUploadButton
                    className="absolute top-4 right-8 rounded-full border-none"
                    options={{
                        sources: ['local', 'url'],
                        multiple: false,
                        maxFiles: 1
                    }}
                        uploadPreset={process.env.CUSTOMCONNSTR_NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                        onSuccess={(result, { widget }) => {
                            //@ts-ignore
                            setResource(result?.info.secure_url); 
                            // console.log(result) 
                            handleUpdatePic(result.info)
                            widget.close();
                        }}
                >  
                            <Image className="absolute  cursor-pointer  " src={editicon} alt="edit" />
                            </CldUploadButton>
                        </div>
                        <div className="w-full flex-col justify-start items-start gap-4 flex" >
                            <div className="w-full justify-start items-start gap-4 flex " >
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-between items-center gap-4 flex">
                                    <div className="flex gap-4 justify-between items-center">
                                        <div className="text-gray-500 text-base font-bold ">Name:</div>
                                        <div className="text-gray-500 text-base font-medium ">   <div>
                                     
                <input className="w-[25rem] h-full border-0 p-1 bg-white text-gray-500 text-base font-medium " type="text" name="" id="" defaultValue={String(userState.name)} onChange={(e) => setValue(e.target.value)} disabled={!editable} />
                               
                            </div>
                            </div>
                                    </div>
                                    
                                </div>
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Role:</div>
                                    <div className="text-gray-500 text-base font-medium ">
                                    <div className='flex  text-gray-500 items-center cursor-default'>


<div className={activeRole === 'Staff' 
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white rounded-tl-md rounded-bl-md"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500 rounded-tl-md rounded-bl-md"} onClick={() => handleRoleChange('Staff')}>Staff</div>


<div className={activeRole === 'Manager' 
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500"} onClick={() => handleRoleChange('Manager')}>Manager</div>


<div className={activeRole === 'Veterinarian' 
    ? " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white  rounded-tr-md rounded-br-md"
    : " flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500  rounded-tr-md rounded-br-md"} onClick={() => handleRoleChange('Veterinarian')}>Veterinarian</div>

    </div>

                                    </div>
                                </div>
                            </div>
                            <div className="w-full justify-start items-start gap-4 flex ">
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Phone No.:</div>
                                   
                                    <input className="w-[25rem] h-full border-0 p-1 bg-white text-gray-500 text-base font-medium " type="number" name="" id="" defaultValue={String(userState.phoneNo)} onChange={(e) => setPhone(e.target.value)} disabled={!editable} />
                                </div>
                                <div className="w-full px-6 py-4 bg-white rounded-[11px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Alternate Phone No.</div>
                                    <input className="w-[25rem] h-full border-0 p-1 bg-white text-gray-500 text-base font-medium " type="number" name="" id="" defaultValue={String(userState.altPhoneNo)} onChange={(e) => setPhone(e.target.value)} disabled={!editable} />
                                 
                                </div>
                            </div>
                            <div className="w-full justify-start items-start gap-4 flex ">
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Email:</div>
                                    <input className="w-[25rem] h-full border-0 p-1 bg-white text-gray-500 text-base font-medium " type="text" name="" id="" defaultValue={String(userState.email)} onChange={(e) => setEmail(e.target.value)} disabled={!editable} />

                                </div>
                            </div>
                            <div className="w-full justify-start items-start gap-4 flex ">
                                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold ">Address:</div>
                                    <input className="w-[60rem] h-full border-0 p-1 ml-[2rem] bg-white text-gray-500 text-base font-medium " type="text" name="" id="" defaultValue={String(userState.address)} onChange={(e) => setAddress(e.target.value)} disabled={!editable} />
                                  
                                    {/* <div className="text-gray-500 text-base font-medium ">47/38, 14th Cross, Addagalapura, Bangalore </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[43px] px-4 py-2 bg-white rounded-bl-[10px] rounded-br-[10px]  box-border   border border-solid border-gray-300" 
                    style={{ borderBottom: "1px solid gray", borderLeft: "1px solid gray", borderRight: "1px solid gray" }}></div>

                </div>
                <div className="w-full h-[43px] px-4 py-2 bg-white rounded-bl-[10px] rounded-br-[10px] flex justify-end items-center box-border   border border-solid border-gray-300">
                      <button className="text-sm bg-red-500 text-white px-4 py-2 rounded-md" >
                          Log Out
                      </button>
                  </div>
            </div>
            
        </>
    )
}

export default AdminProfile