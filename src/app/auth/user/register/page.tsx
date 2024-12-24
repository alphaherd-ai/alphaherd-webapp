"use client"
import { UserAccountSetup } from "@/components/auth/user/userLogin";
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import OrgNameSetup from '@/components/auth/admin/orgNameSetup';
import OrgDetailsSetup from '@/components/auth/admin/orgDetailsSetup';
import OrgAdminSetup from '@/components/auth/admin/orgAdminSetup';
import { useRouter } from 'next/navigation';

import createAccountLogo from '@/assets/icons/loginsignup/CreateAccount.svg'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { z } from 'zod';
import { setValidationErrorsForForm } from '@/utils/setValidationErrorForForm';

const formSchema = z.object({
    phoneNo: z.string().length(10, 'Invalid Phone No.'),
    name: z.string(),
    email: z.string().email('Invalid Email Address'),
    altPhoneNo: z.string().length(10, 'Invalid Phone No.'),
    imageUrl: z.string(),
    password: z.string().min(4, 'Password must be at least 4 characters'),
    rePassword: z.string().min(4, 'Password must be at least 4 characters')
}).superRefine((data, ctx) => {
    if (data.phoneNo === data.altPhoneNo) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['altPhoneNo'],
            message: 'Alt. Phone No. must be different',
        });
    }
});

export default function UserAccountSetupPage() {

    let router = useRouter();

    const queryParams = new URLSearchParams(window.location.search);

    let userInviteString = queryParams.get('userInviteString');

    const [data, setData] = useState({
        name: "",
        email: "",
        phoneNo: "",
        altPhoneNo: "",
        password: "",
        imageUrl: "",
        rePassword: ""
    });

    var stepFields = [
        ["name"], ["email"], ["phoneNo"], ["altPhoneNo"], ["password"], ["rePassword"]
    ];
    const [validationErrors, setValidationErrors] = useState(data);

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
        else {
            name = e.target.name;
            value = e.target.value;
        }
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

    const formSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        console.log("form button")

        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/register${userInviteString ? "?userInviteString=" + userInviteString : ""}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        imageUrl: data.imageUrl,
                        phoneNo: data.phoneNo,
                        altPhoneNo: data.altPhoneNo,
                        password: data.password
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
                router.push(`/auth/login`);
            }
            else {
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
    }


    return <>
        <div 
          style={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className='w-full min-h-screen bg-backgroundImg p-4 px-10 justify-center items-center flex'>

            <div className='w-full min-h-screen p-4 px-10 justify-center items-center flex'>
                <div className="w-[1016px] bg-white bg-opacity-50 rounded-[30px] border border-solid border-stone-300">
                    <UserAccountSetup data={data} handleChange={handleChange} validationErrors={validationErrors} handlePicChange={handlePicChange}/>
                    <div className="w-[936px] mx-auto flex justify-end mb-[2rem]">
                        <button className=" bg-gray-200 rounded-[5px] gap-2 flex border-0 cursor-pointer hover:shadow-lg"
                            onClick={(e) => formSubmit(e)}>
                            <div className="h-[42px] px-4  bg-stone-900 rounded-[5px] justify-start items-center gap-2 flex ">
                                <div className="text-white text-sm font-bold">
                                    Submit Details
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}