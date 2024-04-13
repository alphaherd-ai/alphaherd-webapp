"use client"
import React, { useState } from 'react'
import continuebutton from "../../../assets/icons/loginsignup/1. Icons-24.svg"
import Image from "next/image"
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrgNameSetup from '@/components/auth/orgNameSetup';
import OrgDetailsSetup from '@/components/auth/orgDetailsSetup';
import OrgAdminSetup from '@/components/auth/orgAdminSetup';
import { useRouter } from 'next/navigation';



const OrgSetup = () => {

  let router = useRouter();

  const [data, setData] = useState({
    orgName: "",
    orgEmail: "",
    gstNo: "",
    phoneNo: 0,
    adminName: "",
    adminEmail: "",
    adminPhoneNo: 0,
    adminAltPhoneNo: 0,
    address: "",
    state: "",
    pincode: "",
    description: "",
    adminPassword: "",
    reAdminPassword: ""
  });

  const handleChange = (event: any) => {

    console.log(data, event.target.value);

    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
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

  const [activeTab, setActiveTab] = useState(0)

  const formElements = [
    <OrgNameSetup key="orgName" data={data} handleChange={handleChange} />,
    <OrgDetailsSetup key="orgDetails" data={data} handleChange={handleChange} />,
    <OrgAdminSetup key="orgAdmin" data={data} handleChange={handleChange} />
  ];
  
  return (
    <>
      <ToastContainer />
      <div className='flex h-screen flex-col'>

        <div className='w-full h-full flex-1 bg-gray-200 p-4 px-10'>
          <div className="w-full h-full flex-1 flex justify-center items-center flex  rounded-[20px]">
            <div className="w-[1016px] h-[620px] bg-white bg-opacity-50 rounded-[30px] border border-solid border-stone-300">
              {
                formElements[activeTab]
              }
              <div className="w-full h-8 pl-8 pr-8 pt-4">
                <div className="flex justify-between mt-4">
                  <button
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
                  </button>
                  {
                    activeTab !== formElements.length - 1 ? <button className=" bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex border-0"
                      disabled={activeTab === formElements.length - 1 ? true : false}
                      onClick={() => setActiveTab(prev => prev + 1)}>
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
        </div>
      </div>
    </>
  )
}

export default OrgSetup
