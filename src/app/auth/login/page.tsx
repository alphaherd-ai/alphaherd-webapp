'use client'
import OrgAdminLogin from "@/components/auth/orgAdminLogin";
import { redirect } from "next/navigation";

const Login = () => {

    return <div className='flex h-screen flex-col'>

        <div className='w-full h-full flex-1 bg-gray-200 p-4 px-10'>
            <div className="w-full h-full flex-1 flex justify-center items-center flex  rounded-[20px]">
                <div className="w-[1016px] h-[620px] bg-white bg-opacity-50 rounded-[30px] border border-solid border-stone-300">
                    <OrgAdminLogin />
                </div>
            </div>
        </div>
    </div>
}

export default Login;