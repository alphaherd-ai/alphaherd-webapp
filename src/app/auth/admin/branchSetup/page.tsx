"use client";
// import OrgNameSetup from "@/components/auth/admin/orgNameSetup";
import OrgDetailsSetup from "@/components/auth/orgBranchSetup";
import Image from "next/image";
import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import continuebutton from "../../../../assets/icons/loginsignup/1. Icons-24.svg"
import { updateApp } from "@/lib/features/appSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { UserState } from "@/lib/features/userSlice";
import { isAdminOfOrg, isManagerOfBranch } from "@/utils/stateChecks";
import {z} from 'zod';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { setValidationErrorsForForm } from "@/utils/setValidationErrorForForm";
import { useSearchParams } from 'next/navigation';
const formSchema = z.object({
  orgName: z.string().min(4, 'Org Name must be at least 4 characters'),
  orgEmail: z.string().email('Invalid Email Address'),
  gstNo: z.string().length(15, 'Invalid GST No.'),
  phoneNo: z.string().length(10, 'Invalid Phone No.'),
  altphoneNo: z.string().optional().refine(val => !val || val.length === 10, 'Invalid Phone No.'),
  website: z.string().optional(),
  panNo: z.string().length(10, 'PAN ID must have 10 characters'),
  address: z.string().min(1, 'Address is required'),
  state: z.string().min(1, 'Select a state'),
  pincode: z.string().regex(/^\d{6}$/, 'Invalid Pincode - must be exactly 6 numeric digits'),
  description: z.string().optional(),
});

const BranchEdit = () => {
    const user = useAppSelector((state) => state.user);
    const appState = useAppSelector((state) => state.app);
    const userState = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    // console.log("appstate is :",appState)
    const searchParams = useSearchParams();
    const router = useRouter();
    // console.log(appState.currentBranch);
    const branchName = searchParams.get('branchName');
    // console.log("branch name is :",branchName);

    // Use branch name in data (if available)
    

    var initialErrors = {
        orgName: '',
        orgEmail: '',
        gstNo: '',
        phoneNo: "",
        altphoneNo:"",
        website:'',
        panNo:'',
        address: '',
        state: '',
        pincode: '',
        description: '',
      }
    
      var stepFields = [
        ["orgEmail","gstNo","phoneNo","altPhoneNo","website","panNo","branchName","address","state","pinCode","description"]
      ];

    const [validationErrors, setValidationErrors] = useState(initialErrors);
    const [data, setData] = useState({
        orgName: appState.currentOrg.orgName || '',
        orgEmail: appState.currentOrg.orgEmail || '',
        gstNo: appState.currentOrg.gstNo || '',
        phoneNo: appState.currentOrg.phoneNo || '',
        altphoneNo: appState.currentOrg.altphoneNo || '',
        website: appState.currentOrg.website || '',
        panNo: appState.currentOrg.panNo || '',
        address: appState.currentOrg.address || '',
        state: appState.currentOrg.state || '',
        pincode: appState.currentOrg.pincode || '',
        description: appState.currentOrg.description || '',
        branchName: branchName || '', // Pre-fill branch name if available
    });
    // console.log("data is :", data);

    //const [data, setData] = useState(formSchema.parse(appState.currentOrg));

    // console.log(validationErrors);

    const [activeTab, setActiveTab] = useState(0);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>|any) => {
      let name: string,value: any;
      if(e?.label){
         name="state"
         value=e.value
      }
      else {
        name = e.target.name;
        value=e.target.value;
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
          console.log("here");
          let newErrors = prevErrors;
          newErrors[name as keyof typeof prevErrors] = '';
          return newErrors;
        });
      }
      catch(err : any){
        if (err instanceof z.ZodError) {
          let fieldErrors = err.flatten().fieldErrors;
          let fields: string[] = Object.keys(fieldErrors);
          if(fields.includes(name)){
            setValidationErrors((prevErrors) => {
              let newErrors = prevErrors;
              newErrors[name as keyof typeof prevErrors] = fieldErrors[name]!.length > 0 ? fieldErrors[name]![0] : '';
              return newErrors;
            });
          }
          else{
            setValidationErrors((prevErrors) => {
              let newErrors = prevErrors;
              newErrors[name as keyof typeof prevErrors] = '';
              return newErrors;
            });
          }
        }
      }
    };
    function handleOrgBranchSelect(orgBranch : any){
        
            console.log(orgBranch);
        
            const currentOrgId = appState.currentOrgId || 0; 
        
            const isCurrentOrgAdmin = isAdminOfOrg(currentOrgId, user as UserState);
        
            const isCurrentBranchManager = isManagerOfBranch(orgBranch.id, user as UserState);
        
            const updatedOrgBranch = { ...orgBranch };
            dispatch(
              updateApp({
                currentBranch: updatedOrgBranch,
                currentBranchId: updatedOrgBranch.id,
                currentOrg: appState.currentOrg, // Keep current organization since we only have one
                currentOrgId: appState.currentOrgId,
                isCurrentBranchManager: isCurrentBranchManager,
                isCurrentOrgAdmin: isCurrentOrgAdmin,
              })
            );
        
            window.location.reload();
          }
    const formSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        // console.log('your data', data);
        formSchema.parse(data);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/admin/addBranch?orgId=${appState.currentOrgId}`, {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({"branchDetails":{
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
            orgId: appState.currentOrgId,
            branchName: data.branchName,
          },"userId":userState.id}),
        });

        const json = await res.json();
        if (res.ok) {
          toast.success(json.message, {
            position: "bottom-right",
            autoClose: 5000,
            theme: "colored",
            transition: Bounce,
          });
          // Select the branch 
          console.log(json.orgBranch)
          // handleOrgBranchSelect(json.orgBranch);
          router.push(`/settings/organisation/myorg`);
        } else {
          throw new Error(json.message);
        }
      } catch (err: any) {
        console.log("here is the error", err);
        console.log(err instanceof z.ZodError)
        if (err instanceof z.ZodError) {
          setValidationErrorsForForm(err, setValidationErrors, activeTab, stepFields);
        } else {
          // console.error('Error:', err);
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
    };

    const formElements = [
      
      <OrgDetailsSetup key="orgDetails" data={data} handleChange={handleChange}  validationErrors={validationErrors} />
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
                        <button className=" bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex border-0 cursor-pointer " onClick={formSubmit} >
                            <div className="h-[42px] px-4  bg-stone-900 rounded-[5px] justify-start items-center gap-2 flex ">
                                <div className="text-white text-sm font-bold ">
                                    Submit Details
                                </div>
                            </div>
                            </button>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default BranchEdit;