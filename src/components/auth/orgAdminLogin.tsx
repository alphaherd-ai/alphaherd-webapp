"use client"
import Image from "next/image"
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/hooks';
// import hosimage from "../../assets/icons/loginsignup/hos.png";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react"
import { updateUser, UserState } from "@/lib/features/userSlice";
import placeicon from "../../assets/icons/loginsignup/Placeholder logo.png"



const OrgAdminLogin = () => {
  const dispatch = useAppDispatch();

  // let updatedUser: UserState = {
  //   id:           "",
  //   name:          "",
  //   email:        "",
  //   phoneNo:       "",
  //   altPhoneNo:     null,
  //   hashedPassword: "",
  //   organizationIds:   []
  // };

  // dispatch(updateUser(updatedUser))

    let router = useRouter()

    let [data,setData] = useState({
        email: "",
        password: ""
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

          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': "application/json"
              },
              body: JSON.stringify(data)
            }
          )
          console.log(res);
          let json = await res.json();
          console.log(json)
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
            console.log(data)
            // signIn("credentials",{
            //     email: data.email,
            //     password: data.password,
            //     redirect: false
            //   })
            console.log(json.user)
            dispatch(updateUser(json.user as UserState))
            router.push(`/`)
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
      }

    return (
        <>
        <ToastContainer />
        <div className="w-full h-full flex justify-center items-center flex bg-white rounded-[20px]">
            <div className="flex items-center w-[1016px] h-full relative bg-white bg-opacity-50 rounded-[30px] border border-stone-300 backdrop-blur-[190.90px]">
               
                    <Image src={placeicon} alt="img" className="w-full h-full" />
                
                <div className="h-full pr-[84px] pl-[63px] bg-white bg-opacity-50 rounded-[30px] items-start flex flex-col">
                    <div className="w-[328px] mt-[146px] text-neutral-500 text-[28px] font-bold font-['Satoshi']">
                    Sign in to continue
                    </div>
                    {/* <div className="w-[361px] text-neutral-400 text-base font-medium font-['Satoshi']">
                        
                    </div> */}
                    <div className="flex flex-col items-start mt-[52px]">
                        <div className="w-[120px] text-gray-500 text-base font-medium font-['Satoshi']">Email*</div>
                        <input className="w-[353px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text" name="email" onChange={handleChange}></input>
                    </div>
                    <div className="flex flex-col items-start mt-[16px]">
                        <div className="w-[120px] text-gray-500 text-base font-medium font-['Satoshi']">Password*</div>
                        <input className="w-[353px] h-11 bg-white rounded-[5px] border border-neutral-400" type="password" name="password" onChange={handleChange}></input>
                    </div>
                    <div className="flex items-center mt-[16px] gap-2">
                        <input type="checkbox"/>
                        <div className="text-gray-500 text-base font-medium font-['Satoshi']">Stay signed in</div>
                    </div>
                    <div className="w-[69px] h-[42px] px-4 py-2 bg-teal-400 rounded-[5px] justify-start items-center gap-2 flex text-white text-sm font-bold font-['Satoshi'] mt-[24px]" onClick={formSubmit}>
                        Login
                    </div>
                </div>
            </div>
        </div >
        </>


    )
}

export default OrgAdminLogin;