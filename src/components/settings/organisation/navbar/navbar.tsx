"use client"
import Image from "next/image"
import Link from "next/link"
import addUserIcon from "../../../../assets/icons/settings/1. Icons-24 (3).svg"
import downicon from "../../../../assets/icons/settings/downicon.svg"
import opticon from "../../../../assets/icons/settings/opticon.svg"
import React, { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { usePathname } from 'next/navigation';
import Popup from "@/components/auth/addUsersPopup"
import OrgPopup from "@/components/auth/changeOrgPopup"
import { useAppSelector } from "@/lib/hooks"
import editicon from "@/assets/icons/finance/1. Icons-25.svg";

const OrganisationNavbar = () => {
    const [isChangeORganisationShow, setIsChangeOrganisationShow] = useState(false);
    const currentRoute = usePathname();
    const appState=useAppSelector((state)=>state.app);
    const [showPopup, setShowPopup] = React.useState(false);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    }
    const [showOrgPopup, setShowOrgPopup] = React.useState(false);
    const toggleOrgPopup = () => {
        setShowOrgPopup(!showOrgPopup);
    }

    return (

        <>

            <div className="w-full p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border-0 border-b border-solid border-borderGrey justify-between items-center gap-6 flex">
                <div className="flex">
                    <Link className='no-underline ' href='/settings/organisation/myorg'>
                        <div className={currentRoute.startsWith("/settings/organisation/myorg")
                            ? "px-2 py-1 bg-zinc-900 rounded-tl-[5px] rounded-bl-[5px] border border-white justify-start items-center gap-1 flex text-white text-sm font-bold "
                            : " px-2 py-1 bg-gray-100 rounded-tl-[5px] rounded-bl-[5px] border border-neutral-400 justify-start items-center gap-1 flex text-neutral-400 text-sm font-bold "} >
                            My Organisation
                        </div>
                    </Link>
                    <Link className='no-underline ' href='/settings/organisation/usersandrole'>
                        <div className={currentRoute.startsWith("/settings/organisation/usersandrole")
                            ? "px-2 py-1 bg-zinc-900 rounded-tr-[5px] rounded-br-[5px] border border-white justify-start items-center gap-1 flex text-white text-sm font-bold "
                            : " px-2 py-1 bg-gray-100 rounded-tr-[5px] rounded-br-[5px] border border-neutral-400 justify-start items-center gap-1 flex text-neutral-400 text-sm font-bold "}>
                            Users and Roles
                        </div>
                    </Link>

                </div>
                {/* <div className='flex items-center h-9 px-4 py-2.5 bg-black justify-between rounded-lg '> */}

                {/* <Popover placement="bottom-end" showArrow offset={10}> */}
                {/* <PopoverTrigger> */}
                {currentRoute.startsWith("/settings/organisation/myorg")?
                
                  (  <div className="flex items-center gap-10">

                     <div>
                            <Button
                  variant="solid"
                  className="capitalize border-none bg-black py-2.5 text-white rounded-lg flex gap-2 justify-center items-center hover:cursor-pointer" onClick={toggleOrgPopup}>
                  <div className='flex'><Image src={addUserIcon} alt='addUserIcon' className='w-6 h-6 ' /></div>
                  {isChangeORganisationShow && <span>Change Organization</span>}
                  </Button>
                            </div>
                    {appState.isCurrentOrgAdmin ?
                        <div className="border border-solid border-borderGrey rounded-[10px] p-1">
                            <Link href={`/auth/admin/orgEdit`}>
                                <Image src={editicon}  alt={""}>
                                </Image></Link> 
                        </div>
                    : null}

              
                  </div>
                  ):
                 ( currentRoute.startsWith("/settings/organisation/usersandrole"))?
                 ( <Button
                  variant="solid"
                  className="capitalize border-none bg-black py-2.5 text-white rounded-lg flex gap-2 justify-center items-center hover:cursor-pointer" onClick={togglePopup}>
                  <div className='flex'><Image src={addUserIcon} alt='addUserIcon' className='w-6 h-6 ' /></div>
                  <span>Add User</span>
                  </Button>):""
                
                    
                }
                
               
                {/* </PopoverTrigger> */}
                {/* <PopoverContent className="p-5 bg-black text-white flex flex-row items-start rounded-lg border-2 ,t-3 mt-2.5">

                            <div className="flex flex-col ">

                                <div className='flex flex-col'>


                                    <div className='text-base p-4 text-white flex '>
                                        <div className='flex pr-2'></div>Update Inventory</div>

                                    <div className='text-base p-4  text-white flex '>
                                        <div className='flex pr-2'></div>New Product</div>
                                </div>
                            </div>


                        </PopoverContent> */}
                {/* </Popover> */}

                {showPopup && <Popup onClose={togglePopup} />}
                {showOrgPopup && <OrgPopup onClose={toggleOrgPopup} setIsChangeOrganisationShow={setIsChangeOrganisationShow} />}


            </div>
            {/* </div > */}



        </>
    )
}

export default OrganisationNavbar 
