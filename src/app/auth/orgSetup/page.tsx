"use client"
import React, { useState } from 'react'
import continuebutton from "../../../assets/icons/loginsignup/1. Icons-24.svg"
import Image from "next/image"
import 'react-toastify/dist/ReactToastify.css';
import OrgNameSetup from '@/components/auth/orgNameSetup';
import OrgDetailsSetup from '@/components/auth/orgDetailsSetup';
import OrgAdminSetup from '@/components/auth/orgAdminSetup';
import { useRouter } from 'next/navigation';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { object, string } from 'zod';
import bgg from "../../../assets/icons/loginsignup/First.png"



const schemas = [
  object({
    orgName: string(),
  }),
  object({
    orgEmail: string().email(),
    gstNo: string(),
    phoneNo: string(),
    address: string(),
    state: string(),
    pincode: string(),
    description: string(),
  }),
  object({
    adminName: string(),
    adminEmail: string().email(),
    adminPhoneNo: string(),
    adminAltPhoneNo: string(),
    adminPassword: string(),
    reAdminPassword: string(),
  }),
];
interface FormData {
  orgName: string;
  orgEmail: string;
  gstNo: string;
  phoneNo: string;
  adminName: string;
  adminEmail: string;
  adminPhoneNo: string;
  adminAltPhoneNo: string;
  address: string;
  state: string;
  pincode: string;
  description: string;
  adminPassword: string;
  reAdminPassword: string;
}

const OrgSetup = () => {
  const router = useRouter();
  const [data, setData] = useState<FormData>({
    orgName: '',
    orgEmail: '',
    gstNo: '',
    phoneNo: "",
    adminName: '',
    adminEmail: '',
    adminPhoneNo: "",
    adminAltPhoneNo: "",
    address: '',
    state: '',
    pincode: '',
    description: '',
    adminPassword: '',
    reAdminPassword: '',
  });
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event:any) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const validateFormData = (): boolean => {
    try {
      const validationResult = schemas[activeTab].parse(data);
      console.log("Validation Passed:", validationResult);
      return true;
    } catch (error) {
      console.error("Validation Error:", error);
      return false;
    }
  };

  const handleContinue = () => {
    if (validateFormData() && activeTab !== formElements.length - 1) {
      setActiveTab((prev) => prev + 1);
      
    } else {
      toast.error('Please fill all fields correctly before continuing', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    }
  };


  const formSubmit = async () => {

    console.log("form button")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/orgRegister`,
        {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            "orgDetails": {
              "orgEmail": data.orgEmail,
              "orgName": data.orgName,
              "gstNo": data.gstNo,
              "address": data.address,
              "state": data.state,
              "pincode": data.pincode,
              "description": data.description,
              "phoneNo": data.phoneNo
            },
            "adminUserDetails": {
              "name": data.adminName,
              "email": data.adminEmail,
              "password": data.adminPassword,
              "phoneNo": data.adminPhoneNo
            }
          })
        }
      )
      console.log(res);
      let json = await res.json();
      if (res.ok) {
        toast.success(json.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        router.push(`/auth/login`)
      }
      else{
        throw new Error(json.message);
      }
    }
    catch (err: any) {
      toast.error(err.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    finally{
      setActiveTab(0)
    }
  }

  const formElements = [
    <OrgNameSetup key="orgName" data={data} handleChange={handleChange} />,
    <OrgDetailsSetup key="orgDetails" data={data} handleChange={handleChange} />,
    <OrgAdminSetup key="orgAdmin" data={data} handleChange={handleChange} />
  ];
  
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col ">

        <div className="w-full bg-gray-200 p-4 px-10 justify-center items-center flex">
            <div className="w-[1016px] bg-white bg-opacity-50 rounded-[30px] border border-solid border-stone-300">
              {
                formElements[activeTab]
              }

                <div className="flex justify-end px-[5rem] mr-[-2rem] pb-[2rem]">
                  {/* <button
                    className=" bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex border-0" disabled={activeTab === 0 ? true : false}
                    onClick={() => setActiveTab(prev => prev - 1)}>
                    <div className="h-[42px] px-4  bg-stone-900 rounded-[5px] justify-start items-center gap-2 flex ">
                      <div className="text-white text-sm font-bold font-['Satoshi']">
                        Prev
                      </div>
                      <div className="w-6 h-6 relative">
                        <Image src={continuebutton} alt="button" />
                      </div>
                    </div>
                  </button> */}
                  {
                    activeTab !== formElements.length - 1 ? <button className=" bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex border-0"
                      disabled={activeTab === formElements.length - 1 ? true : false}
                      onClick={handleContinue} >
                      <div className="h-[42px] px-4  bg-stone-900 rounded-[5px] justify-start items-center gap-2 flex ">
                        <div className="text-white text-sm font-bold font-['Satoshi']">
                          Continue
                        </div>
                        <div className="w-6 h-6 relative">
                          <Image src={continuebutton} alt="button" />
                        </div>
                      </div>
                    </button> : null
                  }
                  {
                    activeTab === formElements.length - 1 ? <button className=" bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex border-0"
                      onClick={() => formSubmit()}>
                      <div className="h-[42px] px-4  bg-stone-900 rounded-[5px] justify-start items-center gap-2 flex ">
                        <div className="text-white text-sm font-bold font-['Satoshi']">
                          Submit Details
                        </div>
                      </div>
                    </button> : null
                  }
                </div>
              </div>
            </div>
          </div>

    </>
  )
}

export default OrgSetup
