"use client";
import OrgNameSetup from "@/components/auth/admin/orgNameSetup";
import OrgDetailsSetup from "@/components/auth/orgBranchSetup";
import Image from "next/image";
import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import continuebutton from "../../../../assets/icons/loginsignup/1. Icons-24.svg"
import {z} from 'zod';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { setValidationErrorsForForm } from "@/utils/setValidationErrorForForm";
import { useAppSelector } from "@/lib/hooks";
import { useSearchParams } from 'next/navigation';
const formSchema = z.object({
    orgName: z.string().min(4, 'Org Name must be at least 4 characters'),
    orgEmail: z.string().email('Invalid Email Address'),
    gstNo: z.string().length(15, 'Invalid GST No.'),
    phoneNo: z.string().length(10, 'Invalid Phone No.'),
    address: z.string(),
    state: z.string(),
    pincode: z.string(),
    description: z.string(),
   
  });

const OrgEdit = () => {

    const appState = useAppSelector((state) => state.app);
    console.log("appstate is :",appState)
    const searchParams = useSearchParams();
    const router = useRouter();

    const branchName = searchParams.get("branchName");

    // Use branch name in data (if available)
    

    var initialErrors = {
        orgName: '',
        orgEmail: '',
        orgImgUrl:'',
        gstNo: '',
        phoneNo: "",
        address: '',
        state: '',
        pincode: '',
        description: '',
       
      }
    
      var stepFields = [
        ["orgName"],
        ["orgEmail","orgImgUrl","gstNo","phoneNo","branchName","address","state","pincode","description"]
      ];

    const [validationErrors, setValidationErrors] = useState(initialErrors);
    const [data, setData] = useState({
        ...formSchema.parse(appState.currentOrg),
        branchName: branchName || '', // Pre-fill branch name if available
    });
    console.log("data is :", data);

    //const [data, setData] = useState(formSchema.parse(appState.currentOrg));

    console.log(validationErrors);

    const [activeTab, setActiveTab] = useState(0);
    const handlePicChange=(imageUrl:any,source:string)=>{
      let name=source,value=imageUrl.secure_url;
      console.log(name,value)
      try{
        console.log(name,value)
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        console.log("inside handle change 1");
        formSchema.parse({...data,[name]: value});
        console.log("inside handle change 2");
        setValidationErrors((prevErrors) => {
          console.log("here");
          let newErrors = prevErrors;
          newErrors[name as keyof typeof prevErrors] = '';
          return newErrors;
        });
      }
      catch(err : any){
        if (err instanceof z.ZodError) {
          console.log(err.flatten());
          let fieldErrors = err.flatten().fieldErrors;
          console.log(fieldErrors);
          let fields: string[] = Object.keys(fieldErrors);
          console.log(name);
          console.log(fields);
          if(fields.includes(name)){
            setValidationErrors((prevErrors) => {
              let newErrors = prevErrors;
              newErrors[name as keyof typeof prevErrors] = fieldErrors[name]!.length > 0 ? fieldErrors[name]![0] : '';
              return newErrors;
            });
          }
          else{
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
        console.log(name,value)
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        console.log("inside handle change 1");
        formSchema.parse({...data,[name]: value});
        console.log("inside handle change 2");
        setValidationErrors((prevErrors) => {
          console.log("here");
          let newErrors = prevErrors;
          newErrors[name as keyof typeof prevErrors] = '';
          return newErrors;
        });
      }
      catch(err : any){
        if (err instanceof z.ZodError) {
          console.log(err.flatten());
          let fieldErrors = err.flatten().fieldErrors;
          console.log(fieldErrors);
          let fields: string[] = Object.keys(fieldErrors);
          console.log(name);
          console.log(fields);
          if(fields.includes(name)){
            setValidationErrors((prevErrors) => {
              let newErrors = prevErrors;
              newErrors[name as keyof typeof prevErrors] = fieldErrors[name]!.length > 0 ? fieldErrors[name]![0] : '';
              return newErrors;
            });
          }
          else{
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

    function handleContinue(){
      try{
        console.log("CLICKED");
        formSchema.parse(data);
        setActiveTab(prev => prev + 1);
      }
      catch(err : any){
        if (err instanceof z.ZodError) {
          console.log(err.flatten());
          if(!setValidationErrorsForForm(err,setValidationErrors,activeTab,stepFields)){
            setActiveTab(prev => prev + 1);
          }
        }
      }
    }

    const formElements = [
      
      <OrgDetailsSetup key="orgDetails" data={data} handleChange={handleChange}  validationErrors={validationErrors} handlePicChange={handlePicChange} />,
    ];

    const formSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          formSchema.parse(data);

          // Update Organization
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/admin/orgEdit?orgId=${appState.currentOrgId}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': "application/json"
              },
              body: JSON.stringify({
                  orgName: data.orgName,
                  orgEmail: data.orgEmail,
                  gstNo: data.gstNo,
                  phoneNo: data.phoneNo,
                  address: data.address,
                  state: data.state,
                  pincode: data.pincode,
                  description: data.description,
              })
          });

          let json = await res.json();
          if (res.ok) {
              // Update OrgBranch with branchName if it exists
              if (data.branchName) {
                  const branchRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/admin/orgEdit`, {
                      method: 'PATCH',
                      headers: {
                          'Content-Type': "application/json"
                      },
                      body: JSON.stringify({
                          orgId: appState.currentOrgId,
                          branchName: data.branchName,
                      })
                  });
                  const branchJson = await branchRes.json();
                  if (!branchRes.ok) throw new Error(branchJson.message);
              }

              toast.success(json.message, {
                  position: "bottom-right",
                  autoClose: 5000,
                  theme: "colored",
                  transition: Bounce,
              });
              router.push(`/settings/organisation/myorg`);
          } else {
              throw new Error(json.message);
          }
      } catch (err: any) {
          if (err instanceof z.ZodError) {
              setValidationErrorsForForm(err, setValidationErrors, activeTab, stepFields);
          } else {
              toast.error(err.message, {
                  position: "bottom-right",
                  autoClose: 5000,
                  theme: "colored",
                  transition: Bounce,
              });
          }
      }
  };


    return <>
        <ToastContainer />
        <div className='flex flex-col'>
            <div className='w-full bg-gray-200 p-4 px-10 justify-center items-center flex'>
                <div className="w-[1016px] bg-white bg-opacity-50 rounded-[30px] border border-solid border-stone-300">
                    {
                        formElements[activeTab]
                    }
                    <div className="flex justify-between px-[5rem] pb-[2rem]">
                        {
                          activeTab!==0 ? <button
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
                      </button> : <div></div>
                        }
                        {
                            activeTab !== formElements.length - 1 ? <button className=" bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex border-0"
                                disabled={activeTab === formElements.length - 1 ? true : false}
                                onClick={() => handleContinue()} >
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
                            activeTab === formElements.length - 1 ? <button className=" bg-gray-200 rounded-[5px] justify-start items-center gap-2 flex border-0" onClick={formSubmit}>
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
    </>;
}

export default OrgEdit;