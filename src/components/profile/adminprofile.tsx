"use client"
import { usePathname } from 'next/navigation';
import Image from "next/image"
import editicon from "../../assets/icons/profile/editicon.svg"
import lefticon from "../../assets/icons/profile/left_icon.svg"
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from 'next/navigation';
import { CldUploadButton } from 'next-cloudinary';
import axios from 'axios';
import { updateUser, UserState } from '@/lib/features/userSlice';
import { Button } from '@nextui-org/react';
import addicon from '../../assets/icons/home/add2icon.svg'
import logoutIcon from "../../assets/icons/profile/logout.svg"
import pencil from "../../assets/icons/profile/pencil.svg"
interface UserRole {
  id: number;
  orgBranchId: number;
  role: string;
  userId: string; // Assuming userId is a string based on your setup
}

interface AdminOrganization {
  id: number;
  address: string;
}

const AdminProfile = () => {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    console.log("logout called");
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

  const userState = useAppSelector((state) => state.user);
  const appState = useAppSelector((state) => state.app);
  const [resource, setResource] = useState<any>();
  const currentRoute = usePathname();
  const router = useRouter();
  const [phone, setPhone] = useState<string>(String(userState.phoneNo));
  const [altPhone, setAltPhone] = useState<string>(
    userState.altPhoneNo || userState.adminOrganizations.map((e: any) => e.altPhoneNo)[0] || ""
  );
  const [email, setEmail] = useState<string>(String(userState.email));
  const [address, setAddress] = useState<string>(String(userState.adminOrganizations.map((e: any) => e.address)[0]));
  const dispatch = useAppDispatch();
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState<string>(String(userState.name));

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/${userState.id}`);
        if (response.data && response.data.user) {
          dispatch(updateUser(response.data.user as UserState));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userState.id, dispatch]);

  const handleUpdatePic = async (imageInfo: any) => {
    try {
      setLoading(true);
      
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/${userState.id}`, {
        name: userState.name,
        phoneNo: userState.phoneNo,
        altPhoneNo: userState.altPhoneNo,
        email: userState.email,
        imageUrl: imageInfo.secure_url
      });
      
      if (response.data) {
        const updatedUserState = {
          ...userState,
          imageUrl: String(imageInfo.secure_url),
        };
        dispatch(updateUser(updatedUserState as UserState));
      }
    } catch (error: any) {
      console.error('Error updating profile picture:', error);
      
      if (error.response && error.response.status === 500) {
        alert("Server error occurred while updating profile picture. Please try again later.");
      } else {
        alert("Failed to update profile picture. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    // Store original values in case we need to revert
    const originalValues = {
      name: userState.name,
      phoneNo: userState.phoneNo,
      altPhoneNo: userState.altPhoneNo,
      email: userState.email
    };
    
    try {
      setLoading(true);
      
      // Validate data before sending
      if (!value.trim()) {
        alert("Name is required");
        setLoading(false);
        return;
      }
      
      if (!phone.trim()) {
        alert("Phone number is required");
        setLoading(false);
        return;
      }
      
      if (!email.trim()) {
        alert("Email is required");
        setLoading(false);
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        setLoading(false);
        return;
      }
      
      // Log the request payload for debugging
      const payload = {
        name: value,
        phoneNo: phone, // Already a string from the input
        altPhoneNo: altPhone, // Already a string from the input
        email,
      };
      console.log("Sending update request with payload:", payload);
      
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/${userState.id}`, 
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log("API Response:", response);
      
      if (response.status === 200 && response.data) {
        // Use the response data to update the state
        if (response.data.user) {
          dispatch(updateUser(response.data.user as UserState));
        } else {
          // Fallback if user object is not in the response
          const updatedUserState = {
            ...userState,
            name: value,
            phoneNo: phone,
            altPhoneNo: altPhone,
            email,
          };
          dispatch(updateUser(updatedUserState as UserState));
        }
        
        // Only turn off editing mode if update was successful
        setEditable(false);
      }
    } catch (error: any) {
      // Enhanced error handling
      console.error('Error updating profile:', error);
      
      // Revert the form values to original state
      setValue(String(originalValues.name || ""));
      setPhone(String(originalValues.phoneNo || ""));
      setAltPhone(String(originalValues.altPhoneNo || ""));
      setEmail(String(originalValues.email || ""));
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        
        // Handle different status codes
        switch (error.response.status) {
          case 400:
            alert(`Validation error: ${error.response.data?.message || 'Please check your input'}`);
            break;
          case 404:
            alert("User not found. Please refresh the page and try again.");
            break;
          case 409:
            alert("Email already exists. Please use a different email address.");
            break;
          case 500:
            alert("Server error occurred. Our team has been notified. Please try again later.");
            break;
          default:
            alert(`Update failed: ${error.response.data?.message || 'Unknown error'}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        alert("No response from server. Please check your connection and try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        alert(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setEditable(!editable);
  };

  const handleSaveClick = async () => {
    await handleUpdateProfile(); 
    // We don't need to set editable to false here anymore
    // It's handled in the handleUpdateProfile function after successful update
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const roles = userState.userRoles.filter((e: any) => e.orgBranchId == appState.currentBranchId);
  const userRoles: UserRole[] = userState.userRoles || [];
  const orgId = userState.adminOrganizations.map((e: any) => e.id);

  const [activeRole, setActiveRole] = useState<string>('');

  useEffect(() => {
    const currentBranchRole = userRoles.find(
      (role) => role.orgBranchId === appState.currentBranchId
    );
    console.log('currentBranchRole:', currentBranchRole);
    setActiveRole(currentBranchRole?.role || '');
  }, [userRoles, appState.currentBranchId]);

  const handleRoleChange = async (newRole: string) => {
    setActiveRole(newRole);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/updateRole`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userState.email,
          branchId: appState.currentBranchId,
          newRole,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(updateUser(data.user));
        console.log('Role updated successfully:', data.message);
      } else {
        console.error('Failed to update role:', data.message);
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <>
      <div className="rounded-[20px]">
        <div className="flex h-11 items-center justify-between">
          <div className="flex justify-center items-center gap-2">
            <div
              className="w-11 h-11 bg-gray-100 rounded-[5px] flex justify-center items-center cursor-pointer box-border border border-solid border-gray-300"
              style={{ border: "1px solid gray-300" }}
              onClick={() => router.back()}
            >
              <Image className="w-6 h-6 rounded-[5px]" src={lefticon} alt="Back" />
            </div>
            <div className="text-gray-500 text-[28px] font-bold">
              User Profile
            </div>
            <div>
            </div>
          </div>
        </div>

        <div className="w-full min-h-[80vh] flex-col justify-start items-start gap-px flex pt-4">
          <div className="w-full h-[83px] p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 justify-between items-center gap-2 flex">
            <div className='flex items-center gap-2'>
              <div className="text-gray-500 text-xl font-bold">
                {value}
              </div>
              {orgId[0] != null ? <div className="w-[57px] h-7 px-2 py-1.5 bg-emerald-50 rounded-[5px] justify-center items-center gap-2 inline-flex"><div className="text-teal-400 text-sm font-medium">Admin</div></div> : ""}
            </div>
            <div className="flex gap-2 items-center">
              <Button className="cursor-pointer outline-none border-0 px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex" onClick={handleLogout}>
                <div className="w-6 h-6">
                  <Image src={logoutIcon} alt="download" />
                </div>
                <div className="text-white text-base font-medium">Logout</div>
              </Button>
              {!editable ? (
                <button 
                  className="text-sm px-4 py-2 cursor-pointer rounded-lg bg-white" 
                  style={{ border: '1px solid #a8a29e' }} 
                  onClick={handleEditClick}
                >
                  <Image src={pencil} alt="edit" />
                </button>
              ) : (
                <button 
                  className="text-base bg-zinc-900 text-white px-4 py-2 rounded-md border-0 cursor-pointer font-medium" 
                  onClick={handleSaveClick}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              )}
            </div>
          </div>

          <div className="w-full p-4 bg-gray-100 justify-start items-start gap-6 flex">
            <div className="w-[275px] h-[275px] relative bg-white rounded-[10px] border border-stone-300 flex justify-end">
              {userState.imageUrl ? (
                <>
                  <Image className="relative rounded-[10px] border border-neutral-400" src={String(userState.imageUrl)} alt="photo" width={275} height={275} />
                  <CldUploadButton
                    className="absolute top-4 right-8 rounded-full border-none"
                    options={{
                      sources: ['local', 'url'],
                      multiple: false,
                      maxFiles: 1
                    }}
                    uploadPreset={process.env.CUSTOMCONNSTR_NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onSuccess={(result, { widget }) => {
                      // @ts-ignore
                      setResource(result?.info?.secure_url);
                      handleUpdatePic(result.info);
                      widget.close();
                    }}
                  >
                    <Image className="absolute cursor-pointer" src={editicon} alt="edit" />
                  </CldUploadButton>
                </>
              ) : (
                <CldUploadButton
                className="addimg rounded-[10px] border-0 h-[275px] w-[275px] flex flex-col items-center justify-center cursor-pointer bg-white"
                options={{
                  sources: ['local', 'url'],
                  multiple: false,
                  maxFiles: 1
                }}
                uploadPreset={process.env.CUSTOMCONNSTR_NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result, { widget }) => {
                  // @ts-ignore
                  setResource(result?.info?.secure_url);
                  handleUpdatePic(result.info);
                  widget.close();
                }}
              >
                {/* <div className="addimg rounded-[10px] border border-neutral-400 h-[275px] w-[275px] flex flex-col items-center justify-center cursor-pointer"> */}
                <Image width={40} src={addicon} alt="edit" />
                  <div className="text-gray-500 text-base font-medium">Add Profile Image</div>

                {/* </div> */}
              </CldUploadButton>
                // <Image className="relative rounded-[10px] border border-neutral-400" src={profilepic} alt="photo" width={275} height={275} />
              )}
            </div>
            <div className="w-full flex-col justify-start items-start gap-4 flex">
              <div className="w-full justify-start items-start gap-4 flex">
                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-between items-center gap-4 flex">
                  <div className="flex gap-4 justify-between items-center">
                    <div className="text-gray-500 text-base font-bold">Name:</div>
                    <div className="text-gray-500 text-base font-medium">
                      <input 
                        className="w-[25rem] h-full border-0 p-1 bg-white text-gray-500 text-base font-medium" 
                        type="text" 
                        value={value}
                        onChange={(e) => setValue(e.target.value)} 
                        disabled={!editable} 
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                  <div className="text-gray-500 text-base font-bold">Role:</div>
                  <div className="text-gray-500 text-base font-medium">
                    {(!editable || orgId[0] == null) && activeRole}
                  {editable && orgId[0] != null && (
                    <div className="flex">
                      <div
                      className={
                        activeRole === 'Staff'
                        ? "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white rounded-tl-md rounded-bl-md cursor-pointer"
                        : "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500 rounded-tl-md rounded-bl-md cursor-pointer"
                      }
                      onClick={() => handleRoleChange('Staff')}
                      >
                      Staff
                      </div>
                      <div
                      className={
                        activeRole === 'Manager'
                        ? "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white cursor-pointer"
                        : "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500 cursor-pointer"
                      }
                      onClick={() => handleRoleChange('Manager')}
                      >
                      Manager
                      </div>
                      <div
                      className={
                        activeRole === 'Veterinarian'
                        ? "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-black text-white rounded-tr-md rounded-br-md cursor-pointer"
                        : "flex items-center border border-solid border-gray-300 border-0.5 p-1 px-2 text-sm bg-gray-200 text-gray-500 rounded-tr-md rounded-br-md cursor-pointer"
                      }
                      onClick={() => handleRoleChange('Veterinarian')}
                      >
                      Veterinarian
                      </div>
                    </div>
                  )}
                  </div>
                </div>
              </div>
              <div className="w-full justify-start items-start gap-4 flex">
                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                  <div className="text-gray-500 text-base font-bold">Phone No.:</div>
                  <input 
                    className="w-[18rem] h-full border-0 p-1 bg-white text-gray-500 text-base font-medium" 
                    type="number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} 
                    disabled={!editable} 
                  />
                </div>
                <div className="w-full px-6 py-4 bg-white rounded-[11px] justify-start items-center gap-4 flex">
                  <div className="text-gray-500 text-base font-bold">Alternate Phone No.</div>
                  <input 
                    className="w-[18rem] h-full border-0 p-1 bg-white text-gray-500 text-base font-medium" 
                    type="number" 
                    value={altPhone}
                    onChange={(e) => setAltPhone(e.target.value)} 
                    disabled={!editable} 
                  />
                </div>
              </div>
              <div className="w-full justify-start items-start gap-4 flex">
                <div className="w-full px-6 py-4 bg-white rounded-[10px] justify-start items-center gap-4 flex">
                  <div className="text-gray-500 text-base font-bold">Email:</div>
                  <input 
                    className="w-[25rem] h-full border-0 p-1 bg-white text-gray-500 text-base font-medium" 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    disabled={!editable} 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[43px] px-4 py-2 bg-white rounded-bl-[10px] rounded-br-[10px] box-border border border-solid border-gray-300"></div>
        </div>
      </div>
    </>
  );
}

export default AdminProfile;