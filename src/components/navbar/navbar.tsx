"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import FinancesIcon from './icons/financesIcon';
import notification from '../../assets/icons/navbar/notification.svg';
import alphaherd from '../../assets/icons/navbar/alphaherdLogo.svg';
import setting from '../../assets/icons/settings/settingicon.svg';
import PatientlistIcon from './icons/patientlistIcon';
import InventoryIcon from './icons/inventoryIcon';
import HomeIcon from './icons/homeIcon';
import Settings from '../../assets/icons/finance/Settings.svg'
import ProfileIcon from "../../assets/icons/settings/pfpcion.jpeg";
import addIcon from '../../assets/icons/home/add2.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import NotificationList from '../home/NotificationCard/NotificationList';
//import NotificationPopUp from '../home/NotificationCard/NotificationPopUp';
import DropdownMenu from './dropDownMenu/dropDownMenu';
import DropdownIcon from './icons/dropdownIcon';
import { updateApp } from '@/lib/features/appSlice';
import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { isAdminOfOrg, isManagerOfBranch } from '@/utils/stateChecks';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import zIndex from '@mui/material/styles/zIndex';
import useSWR from "swr";
import { boolean } from 'zod';
import Invoice from '../../assets/icons/finance/invoice.svg';
import Expense from '../../assets/icons/finance/request_quote.svg';
import Payment from '../../assets/icons/finance/Cash.svg';
import Estimate from "../../assets/icons/finance/list_alt.svg"
import add_Icon from '../../assets/icons/finance/1. Icons-24.svg';
import Return from '../../assets/icons/finance/return.svg';


import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';






//@ts-ignore
const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
const Navbar = () => {

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const [invoiceCount, setInvoiceCount] = useState(0);
  const [estimateCount, setEstimateCount] = useState(0);
  const [returnCount, setReturnCount] = useState(0);

  const handleCountsChange = (counts: any) => {
    setInvoiceCount(counts.invoiceCount);
    setEstimateCount(counts.estimateCount);
    setReturnCount(counts.returnCount);
  };

  const DrawerList = (
    <Box className='min-h-fit h-full [::-webkit-scrollbar-track]:bg-black' sx={{ width: 250 ,bgcolor: "black"  }} onClick={toggleDrawer(false)}>
      <div className="subheadbox px-2 pt-6 pb-2">
        <div className="subhead text-sm font-light text-white pl-4">Sales</div>
        <List>
          <ListItem>
            <Link className='no-underline flex item-center' href={{pathname:'/finance/sales/newsalesestimate'}}>
                <div className='text-base font-normal  text-white flex '>
                  <div className='flex pr-2'>
                    <Image src={Estimate} alt='Return' className='w-5 h-5 ' />
                  </div>
                  Estimate
                </div>
            </Link>
          </ListItem>
          <ListItem>
            <Link className='no-underline flex item-center' href={{pathname:'/finance/sales/newsales'}}>
                <div className='text-base  text-white flex '>
                  <div className='flex pr-2'>
                    <Image src={Invoice} alt='Return' className='w-5 h-5 ' />
                  </div>
                  Invoice
                </div>
            </Link>
          </ListItem>
          <ListItem>
            <Link className='no-underline flex item-center' href={{pathname:'/finance/sales/newsalesreturn'}}>
                <div className='text-base  text-white flex '>
                  <div className='flex pr-2'>
                    <Image src={Return} alt='Return' className='w-5 h-5 ' />
                  </div>
                  Return
                </div>
            </Link>
          </ListItem>
        </List>
      </div>
      <hr className='border-solid border-[#393939] mx-[25px] border-[0.5px]' />
      <div className="subheadbox px-2 pt-6 pb-2">
        <div className="subhead text-sm font-light text-white pl-4">Database</div>
        <List>
          <ListItem>
            <Link className='no-underline flex item-center' href={{pathname:'/database/clients'}}>
                <div className='text-base font-normal  text-white flex '>
                  <div className='flex pr-2'>
                    <Image src={Estimate} alt='Return' className='w-5 h-5 ' />
                  </div>
                  Client
                </div>
            </Link>
          </ListItem>
          <ListItem>
            <Link className='no-underline flex item-center' href={{pathname:'/database/patient'}}>
                <div className='text-base  text-white flex '>
                  <div className='flex pr-2'>
                    <Image src={Invoice} alt='Return' className='w-5 h-5 ' />
                  </div>
                  Patient
                </div>
            </Link>
          </ListItem>
          <ListItem>
            <Link className='no-underline flex item-center' href={{pathname:'/database/distributor'}}>
                <div className='text-base  text-white flex '>
                  <div className='flex pr-2'>
                    <Image src={Estimate} alt='Return' className='w-5 h-5 ' />
                  </div>
                  Distributors
                </div>
            </Link>
          </ListItem>
        </List>
      </div>
      <hr className='border-[0.5px] border-solid border-[#393939] mx-[25px] important'/>
      <div className="subheadbox px-2 pt-6 pb-2">
        <div className="subhead text-sm font-light text-white pl-4">Purchases</div>
        <List>
          <ListItem>
            <Link className='no-underline flex item-center' href={{pathname:'/finance/purchases/order'}}>
                <div className='text-base font-normal  text-white flex '>
                  <div className='flex pr-2'>
                    <Image src={Estimate} alt='Return' className='w-5 h-5 ' />
                  </div>
                  Purchase Order
                </div>
            </Link>
          </ListItem>
          <ListItem>
            <Link className='no-underline flex item-center' href={{pathname:'/finance/purchases/creategrn'}}>
                <div className='text-base  text-white flex '>
                  <div className='flex pr-2'>
                    <Image src={Invoice} alt='Return' className='w-5 h-5 ' />
                  </div>
                  Purchase Invoice
                </div>
            </Link>
          </ListItem>
          <ListItem>
            <Link className='no-underline flex item-center' href={{pathname:'/finance/purchases/newreturn'}}>
                <div className='text-base  text-white flex '>
                  <div className='flex pr-2'>
                    <Image src={Return} alt='Return' className='w-5 h-5 ' />
                  </div>
                  Purchase Return
                </div>
            </Link>
          </ListItem>
        </List>
      </div>
      <hr className='border-[0.5px] border-solid border-[#393939] mx-[25px] important'/>
      <div className="subheadbox px-2 pt-6 pb-2">
        <div className="subhead text-sm font-light text-white pl-4">Expenses</div>
        <List>
          <ListItem>
            <Link className='no-underline flex item-center' href={{pathname:'/finance/expenses/newexpenses'}}>
                <div className='text-base font-normal  text-white flex '>
                  <div className='flex pr-2'>
                    <Image src={Expense} alt='Return' className='w-5 h-5 ' />
                  </div>
                  Record Expense
                </div>
            </Link>
          </ListItem>
        </List>
      </div>
      <hr className='border-[0.5px] border-solid border-[#393939] mx-[25px] important'/>
      <div className="subheadbox px-2 pt-6 pb-2">
        <div className="subhead text-sm font-light text-white pl-4">Payments</div>
        <List>
          <ListItem>
            <Link className='no-underline flex item-center' href={{pathname:'/finance/sales/newsales'}}>
                <div className='text-base font-normal  text-white flex '>
                  <div className='flex pr-2'>
                    <Image src={Payment} alt='Return' className='w-5 h-5 ' />
                  </div>
                  Record Payment
                </div>
            </Link>
          </ListItem>
        </List>
      </div>
    </Box>
  );
  const router = useRouter() as any;
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch=useDispatch();
  const user = useAppSelector((state) => state.user);
  const appState = useAppSelector((state) => state.app);

  const handleClick = () => {
    setIsCardOpen(!isCardOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const currentRoute = usePathname();
  const [newNotificationIndicator, setNewNotificationIndicator] = useState<boolean>(false);
  const [notifs, setNotifs] = useState<any[]>([]);
  const [newnotifs, setnewNotifs] = useState<any[]>([]);
  const [showNotificationPopup, setShowNotificationPopup] = useState<boolean>(false);
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/getAll?orgId=${appState.currentOrgId}`, fetcher, { refreshInterval: 60000 })
  
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/autoupdatenotifs`, {
  //         method: 'GET',
  //       });
        
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log('Notifications sent:', data.message);
  //       } else {
  //         console.error('Failed to send notifications');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   fetchNotifications();
  // });
  







 console.log("data :",data);
 useEffect(() => {
  if (!isLoading && !error && data) {
    setNotifs(data.allNotifs);
    const hasNewNotifications = data.newNotifs?.length > 0;
    const showNewNotifications = data.newNotifs?.length > 0;
    setShowNotificationPopup(showNewNotifications);
    setNewNotificationIndicator(hasNewNotifications);

    if(hasNewNotifications)
    {
      const newNotif = data.newNotifs[data.newNotifs.length-1];
      setnewNotifs(newNotif);
    }
  }
}, [data,error,isLoading]);

console.log("new notifs is : ",newnotifs);




if (user.name === "" || currentRoute.startsWith("/auth"))return null;
  return (
    <div className='h-16 shadow-md min-w-screen box-border flex items-center justify-between text-textGrey1 bg-navBar z-100'>
      <div className='flex flex-row items-center'>
        <div className=' px-4 py-2 border-0 border-r border-solid border-[#393939] '>
          <button onClick={toggleDrawer(true)} className='rounded-full bg-[#38F8E6] flex items-center justify-center h-[3rem] w-[3rem] border-0'>
            <Image src={addIcon} alt='addIcon' className='w-5 text-black important' />
          </button>
          <Drawer  open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>
        <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800' href={`/`}>
          <div className={currentRoute === "/" ? " text-white text-base font-medium leading-6 flex items-center justify-center" : " text-gray-400 text-base font-medium leading-6 flex items-center justify-center"}>
            <HomeIcon fill={currentRoute === "/" ? "#38F8E6" : "#A2A3A3"} />
            <div className="ml-1">Home</div>
          </div>
        </Link>
        <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800' href={`/finance/overview`}>
          <div className={currentRoute.startsWith("/finance") ? " text-white text-base font-medium leading-6 flex items-center justify-center" : " text-gray-400 text-base font-medium leading-6 flex items-center justify-center"}>
            <FinancesIcon fill={currentRoute.startsWith("/finance") ? "#38F8E6" : "#A2A3A3"} />
            <div className="ml-1">Finances</div>
          </div>
        </Link>
        <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800' href={`/inventory/products/all`}>
          <div className={currentRoute.startsWith("/inventory") ? " text-white text-base font-medium leading-6 flex items-center justify-center" : " text-gray-400 text-base font-medium leading-6 flex items-center justify-center"}>
            <InventoryIcon fill={currentRoute.startsWith("/inventory") ? "#38F8E6" : "#A2A3A3"} />
            <div className="ml-1">Inventory</div>
          </div>
        </Link>
        <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800' href={`/database/clients`}>
          <div className={currentRoute.startsWith("/database") ? " text-white text-base font-medium leading-6 flex items-center justify-center" : " text-gray-400 text-base font-medium leading-6 flex items-center justify-center"}>
            <PatientlistIcon fill={currentRoute.startsWith("/database") ? "#38F8E6" : "#A2A3A3"} />
            <div className="ml-1">Database</div>
          </div>
        </Link>
      </div>
      <div className='flex flex-row h-full'>
        <div className="h-full flex items-center pr-8 border-0 border-r-2 border-solid border-gray-800">
            <Popover placement="bottom-end" showArrow offset={0}>
              <PopoverTrigger>
            <div
              className='py-2 px-4 bg- border-none text-white rounded cursor-pointer transition-all flex items-center'
              onClick={toggleDropdown}
            >
              {appState.currentOrg.orgName}/{appState.currentBranch.branchName}
              <DropdownIcon fill="#fff"/>
            </div>
            </PopoverTrigger>
            <PopoverContent>
            <DropdownMenu currBranch={appState.currentBranch.branchName} />

            </PopoverContent>
            </Popover>
            {/* {isDropdownOpen && (
            )} */}
          <Link className='no-underline flex pl-6' href='#'>
          <div className="flex items-center justify-center" onClick={handleClick}>
            <div className="relative rounded-full ">  {/* Container styles */}
            {newNotificationIndicator && (  
        <svg width="20" height="20" viewBox="0 0 10 8" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <circle cx="7" cy="1" r="2" fill="red" />
        </svg>
      )}
      <Image src={notification} alt="notification" className="w-full h-full object-cover" />
            </div>
          </div>

          </Link>
          <Link className='no-underline flex pl-6' href='/profile'>
            <div className='text-sm flex items-center justify-center rounded-full overflow-hidden border border-solid border-gray-300'>
              {user.imageUrl?<Image className='w-7 h-7 relative rounded-full border border-neutral-400 object-cover' src={String(user?.imageUrl)} width={80} height={80} alt='profilePic' />:
              <Image className='w-7 h-7 relative rounded-full border border-neutral-400' src={ProfileIcon} width={80} height={80} alt='profilePic' />
              }
              
            </div>
          </Link>
        </div>
        <Link className='no-underline p-4 flex items-center justify-center h-full' href='/settings/organisation/myorg'>
          <div className='text-sm flex items-center justify-center rounded-full'>
            <Image src={setting} alt='alphaherd' className='w-7 h-7' />
          </div>
        </Link>
        {isCardOpen && (
          <div className="absolute top-[4rem] flex flex-col right-[5rem] w-[443px] max-h-[35rem] pt-6 pb-5 bg-zinc-800 shadow justify-center items-start gap-[5px] rounded-[20px] z-[100]">
            <div className="text-gray-100 text-xl font-medium mb-2 px-6">
              Notifications
            </div>
            <div className="notification-list-container overflow-auto h-[calc(50rem - 8.5rem)]"> {/* Adjust height as needed */}
              <NotificationList notifs={notifs} isLoading={isLoading} />
            </div>
          </div>
        )}
        {/* {newNotificationIndicator && (<NotificationPopUp newnotifs={newnotifs} />)} */}
        

      </div>
    </div>
  );
};
// // return (
// //   <>
// //     {/* Notification Icon */}
// //     <Link className="no-underline flex pl-6" href="#">
// //       <div className="flex items-center justify-center" onClick={handleClick}>
// //         <div className="relative rounded-full">
// //           {/* Container styles */}
// //           {newNotificationIndicator && (
// //             <svg
// //               width="20"
// //               height="20"
// //               viewBox="0 0 10 8"
// //               className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
// //             >
// //               <circle cx="7" cy="1" r="2" fill="red" />
// //             </svg>
// //           )}
// //           <Image
// //             src={notification}
// //             alt="notification"
// //             className="w-full h-full object-cover"
// //           />
// //         </div>
// //       </div>
// //     </Link>

// //     {/* Notification Pop-up */}
// //     {showNotificationPopup && (
// //       <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md border p-4 rounded-lg z-50 w-[90%] max-w-md">
// //         <h4 className="font-bold text-lg mb-2">New Notification</h4>
// //         <ul>
// //           {data?.newNotifs?.map((notif: any, index: number) => (
// //             <li key={index} className="text-gray-700">
// //               {notif.message}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     )}
// //   </>
// // );
// // };
export default Navbar;
// // // "use client";
// // // import React, { useState, useEffect, useCallback, useRef } from "react";
// // // import { useRouter } from "next/navigation";
// // // import notification from "../../assets/icons/navbar/notification.svg";
// // // import Image from "next/image";
// // // import Link from "next/link";
// // // import { usePathname } from "next/navigation";
// // // import { useAppSelector } from "@/lib/hooks";
// // // import useSWR from "swr";
// // // import { useDispatch } from "react-redux";

// // // //@ts-ignore
// // // const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

// // // const Navbar = () => {
// // //   const router = useRouter() as any;
// // //   const [isCardOpen, setIsCardOpen] = useState(false);
// // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// // //   const [showNotificationPopup, setShowNotificationPopup] = useState(false);
// // //   const [newNotifs, setNewNotifs] = useState<any[]>([]); // Store the most recent new notifications
// // //   const dispatch = useDispatch();
// // //   const user = useAppSelector((state) => state.user);
// // //   const appState = useAppSelector((state) => state.app);

// // //   const handleClick = () => {
// // //     setIsCardOpen(!isCardOpen);
// // //   };

// // //   //closing of notification when clicked anywhere at the screen
// // //   const notifyRef = useRef<HTMLDivElement>(null);

// // //   const handleCloseNotification = (e: MouseEvent) => {
// // //     if (
// // //       isCardOpen &&
// // //       notifyRef.current &&
// // //       !notifyRef.current.contains(e.target as Node)
// // //     ) {
// // //       setIsCardOpen(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     document.addEventListener("mousedown", handleCloseNotification);
// // //     return () => {
// // //       document.removeEventListener("mousedown", handleCloseNotification);
// // //     };
// // //   }, [isCardOpen]);

// // //   const toggleDropdown = () => {
// // //     setIsDropdownOpen(!isDropdownOpen);
// // //   };

// // //   const currentRoute = usePathname();
// // //   const [newNotificationIndicator, setNewNotificationIndicator] = useState<boolean>(false);
// // //   const [notifs, setNotifs] = useState<any[]>([]);
  
// // //   const { data, error, isLoading } = useSWR(
// // //     `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/getAll?orgId=${appState.currentOrgId}`,
// // //     fetcher,
// // //     { refreshInterval: 60000 }
// // //   );
// // //   console.log("data :",data);
// // //   useEffect(() => {
// // //     if (!isLoading && !error && data) {
// // //       setNotifs(data.allNotifs);
      
// // //       // Clear earlier notifications before adding new ones
// // //       if (data.newNotifs?.length > 0) {
// // //         setNewNotifs([]); // Clear earlier stored new notifications
// // //         setNewNotifs(data.newNotifs); // Add only the most recent new notifications
// // //         setNewNotificationIndicator(true); // Show the red dot
// // //         setShowNotificationPopup(true); // Show the popup

// // //         // Clear the new notifications after 5 seconds
// // //         setTimeout(() => {
// // //           setShowNotificationPopup(false); // Hide the popup
// // //           setNewNotifs([]); // Clear the new notifications array
// // //           setNewNotificationIndicator(false); // Reset the red dot indicator
// // //         }, 5000);
// // //       }
// // //     }
// // //   }, [data, error, isLoading]);

// // //   if (user.name === "" || currentRoute.startsWith("/auth")) return null;

// // //   return (
// // //     <>
// // //       {/* Notification Icon */}
// // //       <Link className="no-underline flex pl-6" href="#">
// // //         <div className="flex items-center justify-center" onClick={handleClick}>
// // //           <div className="relative rounded-full">
// // //             {/* Container styles */}
// // //             {newNotificationIndicator && (
// // //               <svg
// // //                 width="20"
// // //                 height="20"
// // //                 viewBox="0 0 10 8"
// // //                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
// // //               >
// // //                 <circle cx="7" cy="1" r="2" fill="red" />
// // //               </svg>
// // //             )}
// // //             <Image
// // //               src={notification}
// // //               alt="notification"
// // //               className="w-full h-full object-cover"
// // //             />
// // //           </div>
// // //         </div>
// // //       </Link>

// // //       {/* Notification Pop-up */}
// // //       {showNotificationPopup && (
// // //         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md border p-4 rounded-lg z-50 w-[90%] max-w-md">
// // //           <h4 className="font-bold text-lg mb-2">New Notification</h4>
// // //           <ul>
// // //             {newNotifs.map((notif: any, index: number) => (
// // //               <li key={index} className="text-gray-700">
// // //                 {notif.message}
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // };

// // // export default Navbar;
// "use client";
// import React, { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import FinancesIcon from './icons/financesIcon';
// import notification from '../../assets/icons/navbar/notification.svg';
// import alphaherd from '../../assets/icons/navbar/alphaherdLogo.svg';
// import setting from '../../assets/icons/settings/settingicon.svg';
// import PatientlistIcon from './icons/patientlistIcon';
// import InventoryIcon from './icons/inventoryIcon';
// import HomeIcon from './icons/homeIcon';
// import Settings from '../../assets/icons/finance/Settings.svg'
// import ProfileIcon from "../../assets/icons/settings/pfpcion.jpeg";
// import addIcon from '../../assets/icons/settings/addicon.svg';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useAppSelector } from '@/lib/hooks';
// import NotificationList from '../home/NotificationCard/NotificationList';
// import DropdownMenu from './dropDownMenu/dropDownMenu';
// import DropdownIcon from './icons/dropdownIcon';
// import { updateApp } from '@/lib/features/appSlice';
// import { RootState } from '@/lib/store';
// import { useDispatch, useSelector } from 'react-redux';
// import { isAdminOfOrg, isManagerOfBranch } from '@/utils/stateChecks';
// import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
// import zIndex from '@mui/material/styles/zIndex';
// import useSWR from "swr";
// import { boolean } from 'zod';
// import Invoice from '../../assets/icons/finance/invoice.svg';

// import Estimate from "../../assets/icons/finance/list_alt.svg"

// import Return from '../../assets/icons/finance/return.svg';


// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';






// //@ts-ignore
// const fetcher = (...args:any[]) => fetch(...args).then(res => res.json())
// const Navbar = () => {

//   const [open, setOpen] = React.useState(false);

//   const toggleDrawer = (newOpen: boolean) => () => {
//     setOpen(newOpen);
//   };

//   const [invoiceCount, setInvoiceCount] = useState(0);
//   const [estimateCount, setEstimateCount] = useState(0);
//   const [returnCount, setReturnCount] = useState(0);

//   const handleCountsChange = (counts: any) => {
//     setInvoiceCount(counts.invoiceCount);
//     setEstimateCount(counts.estimateCount);
//     setReturnCount(counts.returnCount);
//   };

//   const DrawerList = (
//     <Box sx={{ width: 250 ,bgcolor: "black"}} onClick={toggleDrawer(false)}>
//       <List>

//       <ListItem>
//         <Link className='no-underline flex item-center' href={{pathname:'/finance/sales/newsales'}}>
//             <div className='text-base p-4  text-white flex '>
//             <div className='flex pr-2'><Image src={Invoice} alt='Return' className='w-5 h-5 ' /></div>Sales Invoice</div>
//         </Link>
//       </ListItem>
//       <ListItem>
//         <Link className='no-underline flex item-center' href={{pathname:'/finance/sales/newsales'}}>
//             <div className='text-base p-4  text-white flex '>
//             <div className='flex pr-2'><Image src={Invoice} alt='Return' className='w-5 h-5 ' /></div>Sales Estimate</div>
//         </Link>
//       </ListItem>
//       <ListItem>
//         <Link className='no-underline flex item-center' href={{pathname:'/finance/sales/newsales'}}>
//             <div className='text-base p-4  text-white flex '>
//             <div className='flex pr-2'><Image src={Invoice} alt='Return' className='w-5 h-5 ' /></div>Sales Return</div>
//         </Link>
//       </ListItem>
//       </List>
//       <Divider />
//       <List>

// <ListItem>
//   <Link className='no-underline flex item-center' href={{pathname:'/finance/sales/newsales'}}>
//       <div className='text-base p-4  text-white flex '>
//       <div className='flex pr-2'><Image src={Invoice} alt='Return' className='w-5 h-5 ' /></div>Purchase Order</div>
//   </Link>
// </ListItem>
// <ListItem>
//   <Link className='no-underline flex item-center' href={{pathname:'/finance/sales/newsales'}}>
//       <div className='text-base p-4  text-white flex '>
//       <div className='flex pr-2'><Image src={Invoice} alt='Return' className='w-5 h-5 ' /></div>Purchase Invoice</div>
//   </Link>
// </ListItem>
// <ListItem>
//   <Link className='no-underline flex item-center' href={{pathname:'/finance/sales/newsales'}}>
//       <div className='text-base p-4  text-white flex '>
//       <div className='flex pr-2'><Image src={Invoice} alt='Return' className='w-5 h-5 ' /></div>Purchase Retrun</div>
//   </Link>
// </ListItem>
// </List>
// <Divider />
// <List>

// <ListItem>
//   <Link className='no-underline flex item-center' href={{pathname:'/finance/sales/newsales'}}>
//       <div className='text-base p-4  text-white flex '>
//       <div className='flex pr-2'><Image src={Invoice} alt='Return' className='w-5 h-5 ' /></div>Sales Invoice</div>
//   </Link>
// </ListItem>
// <ListItem>
//   <Link className='no-underline flex item-center' href={{pathname:'/finance/sales/newsales'}}>
//       <div className='text-base p-4  text-white flex '>
//       <div className='flex pr-2'><Image src={Invoice} alt='Return' className='w-5 h-5 ' /></div>Sales Invoice</div>
//   </Link>
// </ListItem>
// <ListItem>
//   <Link className='no-underline flex item-center' href={{pathname:'/finance/sales/newsales'}}>
//       <div className='text-base p-4  text-white flex '>
//       <div className='flex pr-2'><Image src={Invoice} alt='Return' className='w-5 h-5 ' /></div>Sales Invoice</div>
//   </Link>
// </ListItem>
// </List>
// <Divider />
// <List>
// </List>
    
//     </Box>
//   );

//   const router = useRouter() as any;
//   const [isCardOpen, setIsCardOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dispatch=useDispatch();
//   const user = useAppSelector((state) => state.user);
//   const appState = useAppSelector((state) => state.app);

//   const handleClick = () => {
//     setIsCardOpen(!isCardOpen);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };
//   const currentRoute = usePathname();
//   const [newNotificationIndicator, setNewNotificationIndicator] = useState<boolean>(false);
//   const [notifs,setNotifs]=useState<any[]>([]);
//   const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/getAll?orgId=${appState.currentOrgId}`,fetcher,{refreshInterval:60000})
//   useEffect(() => {
//    if (!isLoading && !error && data) {
//      setNotifs(data.allNotifs);
//      const hasNewNotifications = data.newNotifs?.length > 0;
//      setNewNotificationIndicator(hasNewNotifications);
//    }
//  }, [data,error,isLoading]); 
//  if (user.name === "" || currentRoute.startsWith("/auth"))return null;

//   return (
//     <div className='h-16 shadow-md min-w-screen box-border flex items-center justify-between text-textGrey1 bg-navBar z-100'>
        
//       <div className='flex flex-row'>
//       <div className='no-underline py-5 px-5 border-0 border-r-2 border-solid border-gray-800' >
//             <Button onClick={toggleDrawer(true)} className='bg-greenButton w-[2rem] rounded-full'>
//               <Image src={addIcon} alt='addIcon' className='w-3 h-3' />
//             </Button>
//             <Drawer open={open} onClose={toggleDrawer(false)}>
//               {DrawerList}
//             </Drawer>
//         </div>
//         <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800' href={`/`}>
//           <div className={currentRoute === "/" ? " text-white text-base font-medium leading-6 flex items-center justify-center" : " text-gray-400 text-base font-medium leading-6 flex items-center justify-center"}>
//             <HomeIcon fill={currentRoute === "/" ? "#38F8E6" : "#A2A3A3"} />
//             <div className="ml-1">Home</div>
//           </div>
//         </Link>
//         <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800' href={`/finance/overview`}>
//           <div className={currentRoute.startsWith("/finance") ? " text-white text-base font-medium leading-6 flex items-center justify-center" : " text-gray-400 text-base font-medium leading-6 flex items-center justify-center"}>
//             <FinancesIcon fill={currentRoute.startsWith("/finance") ? "#38F8E6" : "#A2A3A3"} />
//             <div className="ml-1">Finances</div>
//           </div>
//         </Link>
//         <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800' href={`/inventory/products/all`}>
//           <div className={currentRoute.startsWith("/inventory") ? " text-white text-base font-medium leading-6 flex items-center justify-center" : " text-gray-400 text-base font-medium leading-6 flex items-center justify-center"}>
//             <InventoryIcon fill={currentRoute.startsWith("/inventory") ? "#38F8E6" : "#A2A3A3"} />
//             <div className="ml-1">Inventory</div>
//           </div>
//         </Link>
//         <Link className='no-underline py-5 px-10 border-0 border-r-2 border-solid border-gray-800' href={`/database/clients`}>
//           <div className={currentRoute.startsWith("/database") ? " text-white text-base font-medium leading-6 flex items-center justify-center" : " text-gray-400 text-base font-medium leading-6 flex items-center justify-center"}>
//             <PatientlistIcon fill={currentRoute.startsWith("/database") ? "#38F8E6" : "#A2A3A3"} />
//             <div className="ml-1">Database</div>
//           </div>
//         </Link>
//       </div>
//       <div className='flex flex-row h-full'>
//         <div className="h-full flex items-center pr-8 border-0 border-r-2 border-solid border-gray-800">
//             <Popover placement="bottom-end" showArrow offset={0}>
//               <PopoverTrigger>
//             <div
//               className='py-2 px-4 bg- border-none text-white rounded cursor-pointer transition-all flex items-center'
//               onClick={toggleDropdown}
//             >
//               {appState.currentOrg.orgName}/{appState.currentBranch.branchName}
//               <DropdownIcon fill="#fff"/>
//             </div>
//             </PopoverTrigger>
//             <PopoverContent>
//             <DropdownMenu currBranch={appState.currentBranch.branchName} />

//             </PopoverContent>
//             </Popover>
//             {/* {isDropdownOpen && (
//             )} */}
//           <Link className='no-underline flex pl-6' href='#'>
//           <div className="flex items-center justify-center" onClick={handleClick}>
//             <div className="relative rounded-full ">  {/* Container styles */}
//             {newNotificationIndicator && (  
//         <svg width="20" height="20" viewBox="0 0 10 8" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//           <circle cx="7" cy="1" r="2" fill="red" />
//         </svg>
//       )}
//       <Image src={notification} alt="notification" className="w-full h-full object-cover" />
//             </div>
//           </div>

//           </Link>
//           <Link className='no-underline flex pl-6' href='/profile'>
//             <div className='text-sm flex items-center justify-center rounded-full overflow-hidden border border-solid border-gray-300'>
//               {user.imageUrl?<Image className='w-7 h-7 relative rounded-full border border-neutral-400 object-cover' src={String(user?.imageUrl)} width={80} height={80} alt='profilePic' />:
//               <Image className='w-7 h-7 relative rounded-full border border-neutral-400' src={ProfileIcon} width={80} height={80} alt='profilePic' />
//               }
              
//             </div>
//           </Link>
//         </div>
//         <Link className='no-underline p-4 flex items-center justify-center h-full' href='/settings/organisation/myorg'>
//           <div className='text-sm flex items-center justify-center rounded-full'>
//             <Image src={setting} alt='alphaherd' className='w-7 h-7' />
//           </div>
//         </Link>
//         {isCardOpen && (
//   <div className="absolute top-[4rem] flex flex-col right-[5rem] w-[443px] max-h-[35rem] pt-6 pb-5 bg-zinc-800 shadow justify-center items-start gap-[5px] rounded-[20px] z-[100]">
//     <div className="text-gray-100 text-xl font-medium mb-2 px-6">
//       Notifications
//     </div>
//     <div className="notification-list-container overflow-auto h-[calc(50rem - 8.5rem)]"> {/* Adjust height as needed */}
//       <NotificationList  notifs={notifs} isLoading={isLoading}  />
//     </div>
//   </div>
// )}


//       </div>
//     </div>
//   );
// };

// export default Navbar;