"use client"
import React, { useState } from 'react'
import continuebutton from "../../../../assets/icons/loginsignup/1. Icons-24.svg"
import Image from "next/image"
import 'react-toastify/dist/ReactToastify.css';
import OrgNameSetup from '@/components/auth/admin/orgNameSetup';
import OrgDetailsSetup from '@/components/auth/admin/orgDetailsSetup';
import OrgAdminSetup from '@/components/auth/admin/orgAdminSetup';
import { useRouter, useSearchParams } from 'next/navigation';

import createAccountLogo from '@/assets/icons/loginsignup/CreateAccount.svg'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { z } from 'zod';
import { setValidationErrorsForForm } from '@/utils/setValidationErrorForForm';
import { useAppSelector } from '@/lib/hooks';
import capitalizeFirst from '@/utils/capitiliseFirst';
const formSchema = z.object({
  orgName: z.string()
    .min(4, 'Organization Name must be at least 4 characters')
    .transform((value) => capitalizeFirst(value)),
  gstNo: z.string().length(15, 'Invalid GST no. - must be 15 digits'),
  phoneNo: z.string().length(10, 'Invalid Phone No.'),
  address: z.string().min(1, "Enter Company Address to continue"),
  state: z.string().min(1, "Select State to continue").optional(),
  pincode: z.string()
  .regex(/^\d{6}$/, 'Invalid Pincode - must be exactly 6 digits'),
  description: z.string(),
  adminName: z.string(),
  adminEmail: z.string().email('Invalid Email Address'),
  adminPhoneNo: z.string().length(10, 'Invalid Phone No.'),
  adminAltPhoneNo: z.string().length(10, 'Invalid Phone No.'),
  adminPassword: z.string().min(4, 'Admin Password must be at least 4 characters'),
  reAdminPassword: z.string().min(4, 'Admin Password must be at least 4 characters')
}).superRefine((data, ctx) => {
  if (data.adminPhoneNo === data.adminAltPhoneNo) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['adminAltPhoneNo'],
      message: 'Alt. Phone No. must be different',
    });
  }
  
  if (data.adminPassword !== data.reAdminPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['reAdminPassword'],
      message: 'Re-entered password must match the original password',
    });
  }
});

const OrgSetup = () => {

  let router = useRouter();

  var initialData = {
    orgName: '',
    orgEmail: '',
    orgImgUrl: '',
    gstNo: '',
    phoneNo: "",
    branchName: "",
    adminName: '',
    adminEmail: '',
    adminPhoneNo: "",
    adminAltPhoneNo: "",
    adminPicUrl: "",
    address: '',
    state: '',
    pincode: '',
    description: '',
    adminPassword: '',
    reAdminPassword: '',
  }

  var stepFields = [
    ["orgName"],
    ["orgEmail", "orgImgUrl", "gstNo", "phoneNo", "branchName", "address", "state", "pincode", "description"],
    ["adminName", "adminEmail", "adminPhoneNo", "adminAltPhoneNo", "adminPassword", "reAdminPassword", "adminPicUrl"]
  ];

  const [data, setData] = useState(initialData);

  const [validationErrors, setValidationErrors] = useState(data);

  // console.log(validationErrors);

  const [activeTab, setActiveTab] = useState(0);
  

  const handlePicChange = (imageUrl: any, source: string) => {
    let name = source, value = imageUrl.secure_url;
    console.log(name, value)
    try {
      console.log(name, value)
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      console.log("inside handle change 1");
      formSchema.parse({ ...data, [name]: value });
      console.log("inside handle change 2");
      setValidationErrors((prevErrors) => {
        console.log("here");
        let newErrors = prevErrors;
        newErrors[name as keyof typeof prevErrors] = '';
        return newErrors;
      });
    }
    catch (err: any) {
      if (err instanceof z.ZodError) {
        console.log(err.flatten());
        let fieldErrors = err.flatten().fieldErrors;
        console.log(fieldErrors);
        let fields: string[] = Object.keys(fieldErrors);
        console.log(name);
        console.log(fields);
        if (fields.includes(name)) {
          setValidationErrors((prevErrors) => {
            let newErrors = prevErrors;
            newErrors[name as keyof typeof prevErrors] = fieldErrors[name]!.length > 0 ? fieldErrors[name]![0] : '';
            return newErrors;
          });
        }
        else {
          setValidationErrors((prevErrors) => {
            console.log("here");
            let newErrors = prevErrors;
            newErrors[name as keyof typeof prevErrors] = '';
            return newErrors;
          });
        }
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    let name: string, value: any;
    if (e?.label) {
      name = "state"
      value = e.value
    }
    else if (e?.target.name === 'orgName') {
      name = "orgName",
        value =e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    }
    else {
      name = e.target.name;
      value = e.target.value;
    }
    
    try{
      // console.log(name,value)
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      // console.log("inside handle change 1");
      formSchema.parse({...data,[name]: value});
      // console.log("inside handle change 2");
      setValidationErrors((prevErrors) => {
        // console.log("here");
        let newErrors = prevErrors;
        newErrors[name as keyof typeof prevErrors] = '';
        return newErrors;
      });
    }
    catch (err: any) {
      if (err instanceof z.ZodError) {
        // console.log(err.flatten());
        let fieldErrors = err.flatten().fieldErrors;
        // console.log(fieldErrors);
        let fields: string[] = Object.keys(fieldErrors);
        // console.log(name);
        // console.log(fields);
        if(fields.includes(name)){
          setValidationErrors((prevErrors) => {
            let newErrors = prevErrors;
            newErrors[name as keyof typeof prevErrors] = fieldErrors[name]!.length > 0 ? fieldErrors[name]![0] : '';
            return newErrors;
          });
        }
        else {
          setValidationErrors((prevErrors) => {
            // console.log("here");
            let newErrors = prevErrors;
            newErrors[name as keyof typeof prevErrors] = '';
            return newErrors;
          });
        }
      }
    }
  };

  const formSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    // console.log("form button")

    try {

      formSchema.parse(data);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/admin/orgRegister`,
        {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            "orgDetails": {
              "orgEmail": data.orgEmail,
              "orgName": data.orgName,
              "orgImgUrl": data.orgImgUrl,
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
              "phoneNo": data.adminPhoneNo,
              "imageUrl": data.adminPicUrl
            },
            "branchName": data.branchName
          })
        }
      )
      // console.log(res);
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
      else {
        throw new Error(json.message);
      }
    }
    catch (err : any) {
      // console.log(err.message);
      // console.log(typeof(err))
      if (err instanceof z.ZodError) {
        // console.log(err.flatten());
        setValidationErrorsForForm(err,setValidationErrors,activeTab,stepFields);
      } else {
        console.error('Error:', err);
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
    }
  }

  function handleContinue() {
    try {
      formSchema.parse(data);
      setActiveTab(prev => prev + 1);
    }
    catch (err: any) {
      if (err instanceof z.ZodError) {
        // console.log(err.flatten());
        if(!setValidationErrorsForForm(err,setValidationErrors,activeTab,stepFields)){
          setActiveTab(prev => prev + 1);
        }
      }
    }
  }

  const formElements = [
    <OrgNameSetup key="orgName" data={data} handleChange={handleChange} validationErrors={validationErrors} />,
    <OrgDetailsSetup key="orgDetails" data={data} handleChange={handleChange} validationErrors={validationErrors} handlePicChange={handlePicChange} />,
    <OrgAdminSetup activeTab={activeTab} setActiveTab={setActiveTab} key="orgAdmin" data={data} handleChange={handleChange} validationErrors={validationErrors} handlePicChange={handlePicChange} />
  ];

  return (
    <>
      <ToastContainer />
      <div className='flex flex-col'>

        <div
          style={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className='w-full min-h-screen bg-backgroundImg p-4 px-10 justify-center items-center flex'>
          <div className="w-[1016px] bg-white bg-opacity-50 rounded-[30px] border border-solid border-stone-300">
            {
              formElements[activeTab]
            }
            <div className="w-[1016px] flex justify-end px-10 pb-[2rem]">
             
              {
                activeTab !== formElements.length - 1 ? <button className=" bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex border-0"
                  disabled={activeTab === formElements.length - 1 ? true : false}
                  onClick={() => handleContinue()} >
                  <div className="h-[42px] px-4  bg-stone-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer">
                    <div className="text-white text-sm font-bold ">
                      Continue
                    </div>
                    <div className="w-6 h-6 relative">
                      <Image src={continuebutton} alt="button" />
                    </div>
                  </div>
                </button> : null
              }
              {
                activeTab === formElements.length - 1 ? <button className=" bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex border-0 cursor-pointer" onClick={formSubmit}>
                  <div className="h-[42px] px-4  bg-stone-900 rounded-[5px] justify-start items-center gap-2 flex ">
                    <Image src={createAccountLogo?.src} alt=""></Image>
                    <div className="text-white text-sm font-bold cursor-pointer ">
                      Create Account
                    </div>
                  </div>
                </button > : null
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrgSetup
