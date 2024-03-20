"use client"
import Image from "next/image"


import hosimage from "../../assets/icons/loginsignup/hos.png";


const Login4 = () => {

    return (
        <>
        <div className="w-full h-full flex justify-center items-center flex bg-white rounded-[20px]">
            <div className="flex items-center w-[1016px] h-full relative bg-white bg-opacity-50 rounded-[30px] border border-stone-300 backdrop-blur-[190.90px]">
                <div className="bg-amber-400 h-[90%]">
                    <Image src={hosimage} alt="img" className="h-[90%]" />
                </div>
                <div className="h-full pr-[84px] pl-[63px] bg-white bg-opacity-50 rounded-[30px] items-start flex flex-col">
                    <div className="w-[328px] mt-[146px] text-neutral-500 text-[28px] font-bold font-['Satoshi']">
                        Welcome to the herd, Rani!
                    </div>
                    <div className="w-[361px] text-neutral-400 text-base font-medium font-['Satoshi']">
                        Sign in to continue
                    </div>
                    <div className="flex flex-col items-start mt-[52px]">
                        <div className="w-[120px] text-gray-500 text-base font-medium font-['Satoshi']">Email*</div>
                        <input className="w-[353px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text"></input>
                    </div>
                    <div className="flex flex-col items-start mt-[16px]">
                        <div className="w-[120px] text-gray-500 text-base font-medium font-['Satoshi']">Password*</div>
                        <input className="w-[353px] h-11 bg-white rounded-[5px] border border-neutral-400" type="text"></input>
                    </div>
                    <div className="flex items-center mt-[16px] gap-2">
                        <input type="checkbox"/>
                        <div className="text-gray-500 text-base font-medium font-['Satoshi']">Stay signed in</div>
                    </div>
                    <div className="w-[69px] h-[42px] px-4 py-2 bg-teal-400 rounded-[5px] justify-start items-center gap-2 flex text-white text-sm font-bold font-['Satoshi'] mt-[24px]">
                        Login
                    </div>
                </div>
            </div>
        </div >
        </>


    )
}

export default Login4;