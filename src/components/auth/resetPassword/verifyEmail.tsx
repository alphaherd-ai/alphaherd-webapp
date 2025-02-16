"use client"
import Image from "next/image"
import { useAppDispatch} from '@/lib/hooks';
// import hosimage from "../../assets/icons/loginsignup/hos.png";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import tickicon from "../../../assets/icons/settings/tick.svg";
import { updateUser, UserState } from "@/lib/features/userSlice";
import placeicon from "../../../assets/icons/loginsignup/Placeholder logo.png"

import eyeicon from "../../../assets/icons/loginsignup/1. Icons-24 (4).svg"
import eyeicon1 from "../../../assets/icons/loginsignup/1. Icons-24 (5).svg"
import { AppState, updateApp } from "@/lib/features/appSlice";
import { fetchBranchDetailsById, isAdminOfOrg, isManagerOfBranch } from "@/utils/stateChecks";

const VerifyEmail = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false); 
  const [staysignedin,setStaysignedin] = useState(false);
  let router = useRouter();

  const queryParams = new URLSearchParams(window.location.search);


  let [data, setData] = useState({
    email: "",
  });

  const handleChange = (event: any) => {

    // console.log(data, event.target.value);

    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const formSubmit = async () => {

    // console.log("form button")
    if (loading) return; // Prevent duplicate submissions

    setLoading(true); // Set loading state to true
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/user/resetPassword/sendOTP`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: data.email }),
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

      router.push("verifyOTP?email=" + data.email);
    } catch (err: any) {
        
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
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleKeyDown=(e:any)=>{
    if(e.key === 'Enter'){
      formSubmit();
    }
  }
  useEffect(() => {
      console.log('Stay Signed In:', staysignedin);
  }, [staysignedin]);
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
            <div className="desc mt-3 ml-[1px] w-[328px] text-gray-500 text-base font-medium ">Enter your email address, we'll send you an OTP to make sure it's you.</div>
            <div className="flex flex-col items-start mt-[52px]">
              <div className="w-[120px] text-gray-500 text-base font-medium ">Email*</div>
              <input className="w-[353px] h-11 text-textGrey2 text-base font-medium  px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-[#35BEB1]" type="text" name="email" onChange={handleChange} onKeyDown={handleKeyDown}></input>
            </div>

            <button 
              className="w-auto h-[42px] px-4 py-2 bg-[#35BEB1] hover:bg-teal-500 transition-all rounded-[5px] justify-start items-center gap-2 flex text-white text-sm font-semibold mt-[18px] border-0 outline-none hover:cursor-pointer hover:shadow-md" 
              onClick={formSubmit} 
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        </div>
      </div>
    </>


  )
}

export default VerifyEmail;