"use client";
import OrgNameSetup from "@/components/auth/admin/orgNameSetup";
import OrgDetailsSetup from "@/components/auth/admin/orgDetailsSetup";
import Image from "next/image";
import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import continuebutton from "../../../../assets/icons/loginsignup/1. Icons-24.svg" 
import { useAppDispatch } from "@/lib/hooks";
import {z} from 'zod';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { setValidationErrorsForForm } from "@/utils/setValidationErrorForForm";
import { useAppSelector } from "@/lib/hooks";
import Loading from "@/app/loading2"
import { updateCurrentOrg, updateCurrentBranch } from "@/lib/features/appSlice";
const formSchema = z.object({
  orgName: z.string().min(4, 'Org. Name must be at least 4 characters'),
  orgEmail: z.string().email('Invalid Email Address'),
  gstNo: z.string().length(15, 'Invalid GST no. - must be 15 digits'),
  phoneNo: z.string().length(10, 'Invalid Phone No.'),
  altphoneNo: z.string(),
  orgImgUrl: z.string(),
  address: z.string().min(1, "Enter Company Address to continue"),
  website: z.string(),
  branchName: z.string().min(4, 'Branch Name must be at least 4 characters'),
  panNo: z.string().length(10, 'PAN ID must have 10 characters'),
  state: z.string().min(1, "Select State to continue"),
  pincode: z.string().regex(/^\d{6}$/, 'Invalid Pincode - must be exactly 6 numeric digits'),
  description: z.string()
});

const OrgEdit = () => {
    const dispatch = useAppDispatch();
    const appState = useAppSelector((state) => state.app);

    const router = useRouter();

    // Initialize validation errors to match the data structure
    const initialErrors = {
        orgName: '',
        orgEmail: '',
        orgImgUrl: '',
        gstNo: '',
        phoneNo: '',
        altphoneNo: '',
        website: '',
        branchName: '',
        panNo: '',
        address: '',
        state: '',
        pincode: '',
        description: ''
    };
    
    var stepFields = [
      ["orgName"],
      ["orgName","orgEmail","orgImgUrl","gstNo","phoneNo","altPhoneNo","website","panNo","branchName","address","state","pincode","description"]
    ];

    
    // console.log(appState);
    const [data, setData] = useState(() => {
      return {
        orgName: appState.currentOrg.orgName || '',
        orgEmail: appState.currentOrg.orgEmail || '',
        gstNo: appState.currentBranch.gstNo || '',
        phoneNo: appState.currentBranch.phoneNo || '',
        altphoneNo: appState.currentBranch.altphoneNo || '',
        orgImgUrl: appState.currentOrg.orgImgUrl || '',
        address: appState.currentBranch.address || '',
        website: appState.currentBranch.website || '',
        branchName: appState.currentBranch.branchName || '',
        panNo: appState.currentBranch.panNo || '',
        state: appState.currentBranch.state || '',
        pincode: appState.currentOrg.pinCode || '',
        description: appState.currentBranch.description || ''
      };
    });
    const [validationErrors, setValidationErrors] = useState(initialErrors);

    // console.log(validationErrors);

    const [savingData, setSavingData] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const handlePicChange=(imageUrl:any,source:string)=>{
      let name=source,value=imageUrl.secure_url;
      try {
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        formSchema.parse({...data, [name]: value});
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [name]: ''
        }));
      }
      catch(err : any){
        if (err instanceof z.ZodError) {
          const fieldErrors = err.flatten().fieldErrors;
          const fields: string[] = Object.keys(fieldErrors);
          if(fields.includes(name)){
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              [name]: fieldErrors[name]![0]
            }));
          }
          else {
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              [name]: ''
            }));
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
          value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
      }
      else {
        name = e.target.name;
        value = e.target.value.toString();
      }
      
      try {
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        formSchema.parse({...data, [name]: value});
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [name]: ''
        }));
      }
      catch (err: any) {
        if (err instanceof z.ZodError) {
          const fieldErrors = err.flatten().fieldErrors;
          const fields: string[] = Object.keys(fieldErrors);
          if(fields.includes(name)){
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              [name]: fieldErrors[name]![0]
            }));
          }
          else {
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              [name]: ''
            }));
          }
        }
      }
    };
  
  
    

    function handleContinue(){
      try{
        // console.log("CLICKED");
        formSchema.parse(data);
        setActiveTab(prev => prev + 1);
      }
      catch(err : any){
        if (err instanceof z.ZodError) {
          // console.log(err.flatten());
          if(!setValidationErrorsForForm(err,setValidationErrors,activeTab,stepFields)){
            setActiveTab(prev => prev + 1);
          }
        }
      }
    }

   

    const formSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        // console.log("form button")
    
        try {
          setSavingData(true);
          formSchema.parse(data);
            const updatedOrg = {
            ...appState.currentOrg,
            orgEmail: data.orgEmail,
            orgName: data.orgName,
            orgImgUrl: data.orgImgUrl,
            gstNo: data.gstNo,
            address: data.address,
            state: data.state,
            pinCode: data.pincode,
            description: data.description,
            phoneNo: data.phoneNo
            };

            const updatedBranch = {
            ...appState.currentBranch,
            email: data.orgEmail,
            gstNo: data.gstNo,
            phoneNo: data.phoneNo,
            address: data.address,
            altphoneNo: data.altphoneNo,
            website: data.website,
            panNo: data.panNo,
            state: data.state,
            pinCode: parseInt(data.pincode),
            description: data.description,
            branchName: data.branchName
            };

          //   // Update the state using a state management library or context
          dispatch(updateCurrentOrg(updatedOrg));
          dispatch(updateCurrentBranch(updatedBranch));
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/admin/orgEdit?orgId=${appState.currentOrgId}`,
            {
              method: 'PATCH',
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
                "branchDetails": {
                  email: data.orgEmail,
                  gstNo: data.gstNo,
                  phoneNo: data.phoneNo,
                  address: data.address,
                  altphoneNo: data.altphoneNo,
                  website: data.website,
                  panNo: data.panNo,
                  state: data.state,
                  pinCode: parseInt(data.pincode),
                  description: data.description,
                  branchName: data.branchName,
                },
                "orgId": appState.currentOrgId,
                "branchId": appState.currentBranchId
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
            router.push(`/settings/organisation/myorg`)
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
            console.log("inside zod error");
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
        }finally {

          setSavingData(false);
      }
    }
    const formElements = [
      <OrgNameSetup key="orgName" data={data} handleChange={handleChange} validationErrors={validationErrors} />,
      <OrgDetailsSetup key="orgDetails" data={data} handleChange={handleChange}  validationErrors={validationErrors} handlePicChange={handlePicChange} />,
    ];


    return <>
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
                    <div className="flex justify-between px-[5rem] pb-[2rem]">
                      <div></div>
                        {
                            activeTab !== formElements.length - 1 ? <button className=" bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex border-0"
                                disabled={activeTab === formElements.length - 1 ? true : false}
                                onClick={() => handleContinue()} >
                                <div className="h-[42px] px-4  bg-stone-900 rounded-[5px] justify-start items-center gap-2 flex ">
                                    <div className="text-white text-sm font-bold cursor-pointer">
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
                                    <div className="text-white text-sm font-bold ">
                                    {savingData ? <Loading/> : "Submit Details"}
                                    </div>
                                </div>
                            </button> : null
                        }
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default OrgEdit;