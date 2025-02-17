"use client"
import Image from "next/image"
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import placeicon from "../../../assets/icons/loginsignup/Placeholder logo.png"

import eyeicon from "../../../assets/icons/loginsignup/1. Icons-24 (4).svg"
import eyeicon1 from "../../../assets/icons/loginsignup/1. Icons-24 (5).svg"
import { z } from "zod";
import Loading from "@/app/loading1";
const formSchema = z.object({
    password: z.string().min(4, 'Must be at least 4 characters'),
    confirmPassword: z.string().min(4, 'Must be at least 4 characters')
  }).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      });
    }
  });
const ChangePass = () => {
  const [loading, setLoading] = useState(false); 

  let router = useRouter();
//   var initialData= {
//     password: "",
//     confirmPassword: ""
//   }
//   let [data, setData] = useState(initialData);
  const queryParams = new URLSearchParams(window.location.search);
    useEffect(() => {
        if (!queryParams.get('token')) {
            router.push("/auth/login");
        }
    }, [queryParams]);
    let token = queryParams.get('token');
  let [data, setData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [validationErrors, setValidationErrors] = useState(data);
const handleChange = (event: any) => {
    const { name, value } = event.target;
    setData({
        ...data,
        [name]: value
    });

    // Validate the form data on change
    try {
        formSchema.parse({
            ...data,
            [name]: value
        });
        setValidationErrors((prevErrors) => {
            let newErrors = prevErrors;
            newErrors[name as keyof typeof prevErrors] = '';
            return newErrors;
        });
    } catch (err: any) {
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
        else {
            setValidationErrors((prevErrors) => {
            let newErrors = prevErrors;
            newErrors[name as keyof typeof prevErrors] = '';
            return newErrors;
            });
        }
        }
    }
    };

    const formSubmit = async () => {

        // console.log("form button")
        if (loading) return; // Prevent duplicate submissions
        
        setLoading(true); // Set loading state to true
        try {
            formSchema.parse(data);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/resetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token : token, newPassword: data.password }),
            });

            if (!res.ok) {
            const json = await res.json();
            throw new Error(json.message);
            }

            toast.success("OTP sent successfully!", {
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
        
            setTimeout(() => {
                router.push("/auth/login");
            }, 1000);
        } catch (err: any) {
            if(err instanceof z.ZodError){
                let fieldErrors = err.flatten().fieldErrors;
                let fields: string[] = Object.keys(fieldErrors);
                setValidationErrors((prevErrors) => {
                    let newErrors = { ...prevErrors };
                    fields.forEach(field => {
                        newErrors[field as keyof typeof prevErrors] = fieldErrors[field]!.length > 0 ? fieldErrors[field]![0] : '';
                    });
                    return newErrors;
                });
            }
            else{
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
                if (err.message === "Invalid token") {
                    setTimeout(() => {
                        router.push("/auth/login");
                    }, 1000);
                    return;
                }
            }
        } finally {
            setLoading(false);
        }
    };

  const handleKeyDown=(e:any)=>{
    if(e.key === 'Enter'){
      formSubmit();
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword2, setShowPassword2] = useState(false);
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  return (
    <>
      <ToastContainer />
      <div className="w-full h-full flex justify-center items-center  rounded-[20px]">
        <div className="flex items-center w-[1016px] h-full relative  bg-opacity-50 rounded-[30px] border border-stone-300 ">
          <Image src={placeicon} alt="img" className="w-full h-full" />
          <div className="h-full pr-[84px] pl-[63px] bg-opacity-50 rounded-[30px] items-start flex flex-col">
          <div className="w-[328px] mt-[146px] text-neutral-500 text-[28px] font-semibold ">
            Reset Password
            </div>
            <div className="desc mt-3 ml-[1px] w-[328px] text-gray-500 text-base font-medium ">Enter a strong password</div>
            
            <div className="flex flex-col items-start mt-[44px]">
              <div className="w-[120px] text-gray-500 text-base font-medium ">Password</div>
              <div className="relative">
                <input
                  className="w-[353px] h-11 text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-[#35BEB1]"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                {showPassword ? (<Image
                  src={eyeicon1}
                  alt="Toggle Password Visibility"
                  className="absolute top-[50%] right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />) : (
                  <Image
                    src={eyeicon}
                    alt="Toggle Password Visibility"
                    className="absolute top-[50%] right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility} />)}
              </div>
              {validationErrors.password && (
                    <div className="text-[red] error">{validationErrors.password}</div>
                )}
            </div>
            <div className="flex flex-col items-start mt-[24px]">
              <div className="text-gray-500 text-base font-medium ">Confirm Password*</div>
              <div className="relative">
                <input
                  className="w-[353px] h-11 text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-[#35BEB1]"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                {showPassword2 ? (<Image
                  src={eyeicon1}
                  alt="Toggle Password Visibility"
                  className="absolute top-[50%] right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility2}
                />) : (
                  <Image
                    src={eyeicon}
                    alt="Toggle Password Visibility"
                    className="absolute top-[50%] right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility2} />)}
              </div>
                {validationErrors.confirmPassword && (
                    <div className="text-[red] error">{validationErrors.confirmPassword}</div>
                )}
            </div>
            {/* <div className="flex items-center mt-[16px] gap-2"> */}
            {/* <input
                type="checkbox"
                className="appearance-none w-5 h-5 bg-white  checked:bg-teal-500 checked:border-teal-500 checked:after:content-['✔'] checked:after:text-white checked:after:block checked:after:text-center"
                checked={staysignedin}
                onClick={handlestay} />
            
              <div className="text-gray-500 text-base font-medium">Stay signed in</div> */}
            {/* </div> */}

            <button className="h-[42px] px-4 py-2 bg-[#35BEB1] hover:bg-teal-500 transition-all rounded-[5px] justify-start items-center gap-2 flex text-white text-sm font-bold  mt-[24px] border-0 outline-none hover:cursor-pointer hover:shadow-md" onClick={formSubmit} disabled={loading}>
              {loading?" Processing... ":'Reset Password'}
            </button>
          </div>
        </div>
      </div>
    </>


  )
}

export default ChangePass;