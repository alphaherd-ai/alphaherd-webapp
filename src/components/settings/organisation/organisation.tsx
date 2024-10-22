import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { MyOrganisationSettings } from "./myorganisation/myorganisation";
import UsersAndRolesSettings from "./usersandrole/usersandrole";
import { useAppSelector } from "@/lib/hooks";

export default function OrganisationSettings() {

    const userState = useAppSelector((state) => state.user);

    // console.log(userState);

    const tabs = ["My Organisation", "User and Roles"];

    const [selectedTab, setSelectedTab] = useState(0);

    const tabComponents = [<MyOrganisationSettings key={1}/>, <UsersAndRolesSettings key={2} />]


    return <>
        <div className="w-full p-6 bg-white rounded-tl-[10px] rounded-tr-[10px] border border-neutral-400 justify-between items-center gap-6 flex">
            <div className="flex">
                {
                    tabs.map((tab, index) => <div key={index+1} className={selectedTab === index
                        ? "px-2 py-1 bg-zinc-900 rounded-tl-[5px] rounded-bl-[5px] border border-white justify-start items-center gap-1 flex text-white text-sm font-bold font-['Roboto']"
                        : " px-2 py-1 bg-gray-100 rounded-tl-[5px] rounded-bl-[5px] border border-neutral-400 justify-start items-center gap-1 flex text-neutral-400 text-sm font-bold font-['Roboto']"}
                        onClick={() => setSelectedTab(index)}>
                        {tab}
                    </div>)
                }
            </div>
            <Button variant="solid" className="capitalize flex border-none bg-black text-white rounded-lg ">Add User</Button>
        </div >

        {
            tabComponents[selectedTab]
        }
    </>
}