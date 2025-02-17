'use client'
import ChangePass from "@/components/auth/resetPassword/changePass";


const VerifyMail = () => {

    
    return <div className='flex h-screen flex-col'>

        <div style={{
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }} className='w-full h-full flex-1 bg-backgroundImg  p-4 px-10'>
            <div className="w-full h-full flex-1 flex justify-center items-center  rounded-[20px]">
                <div className="w-[1016px] h-[620px] bg-white bg-opacity-50 rounded-[30px] border border-solid border-stone-300">
                    <ChangePass />
                </div>
            </div>
        </div>
    </div>
}

export default VerifyMail;