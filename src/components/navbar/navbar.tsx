"use client";
import React, { useState, useEffect,useRef } from 'react';
import { useRouter } from 'next/navigation';
import FinancesIcon from './icons/financesIcon';
import notification from '../../assets/icons/navbar/notification.svg';

import setting from '../../assets/icons/settings/settingicon.svg';
import PatientlistIcon from './icons/patientlistIcon';
import InventoryIcon from './icons/inventoryIcon';
import HomeIcon from './icons/homeIcon';
import profileicon from "../../assets/icons/navbar/default.svg";
import addIcon from '../../assets/icons/home/add2.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import ClientPopup from '../database/client/newclientpopoup'
import Popup from '../database/patient/newpatientpopup';
import DistributorPopup from '../database/distributor/newdistributorpopup';
import Distrib from '../../assets/icons/finance/storefront.svg';
import NotificationList from '../home/NotificationCard/NotificationList';
import DropdownMenu from './dropDownMenu/dropDownMenu';
import DropdownIcon from './icons/dropdownIcon';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import useSWR from "swr";
import Invoice from '../../assets/icons/finance/invoice.svg';
import Expense from '../../assets/icons/finance/request_quote.svg';
import Payment from '../../assets/icons/finance/Cash.svg';
import Estimate from "../../assets/icons/finance/list_alt.svg"
import ClientIcon from "../database/navbar/icons/clientIcon"
import PatientIcon from "../database/navbar/icons/patientIcon"
import Return from '../../assets/icons/finance/return.svg';
import { generateInvoiceNumber } from '@/utils/generateInvoiceNo';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ExpensePopup from '../finances/transactions/table/recordTransactionPopup';
import notificationSoundFile from "@/assets/icons/navbar/sounds/notification.mp3";


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
  const [showPopup1, setShowPopup1] = React.useState(false);
  const [showPopup2, setShowPopup2] = React.useState(false);
  const [showPopup3, setShowPopup3] = React.useState(false);
  const [showPopup4, setShowPopup4] = React.useState(false);
  
  const togglePopup1 = () => {
      setShowPopup1(!showPopup1);
  }
  const togglePopup2 = () => {
      setShowPopup2(!showPopup2);
  }
  const togglePopup3 = () => {
      setShowPopup3(!showPopup3);
  }
  const togglePopup4 = () => {
      setShowPopup4(!showPopup4);
  }
  const [count, setCount] = useState(0);
      const [initialInvoiceNo, setInitialInvoiceNo] = useState('');
    
      useEffect(() => {
        if (showPopup4) {
          setCount((prevCount) => prevCount + 1);
        }
      }, [showPopup4]);
    
      useEffect(() => {
        if (showPopup4) {
          const newInvoiceNo = generateInvoiceNumber(count);
          setInitialInvoiceNo(newInvoiceNo);
        }
      }, [count, showPopup4]);
  const DrawerList = (
    <Box className='min-h-fit h-full' sx={{ width: 250 ,bgcolor: "black"  }} onClick={toggleDrawer(false)}>
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
            <div className='no-underline flex item-center cursor-pointer' onClick={togglePopup1}>
              <div className='text-base font-normal text-white flex'>
                <div className='flex pr-2'>
                  <ClientIcon fill="#38F8E6"/>
                </div>
                Client
              </div>
            </div>
          </ListItem>
          <ListItem>
            <div className='no-underline flex item-center cursor-pointer' onClick={togglePopup2}>
                <div className='text-base  text-white flex '>
                  <div className='flex pr-2'>
                    <PatientIcon fill="#38F8E6"/>
                  </div>
                  Patient
                </div>
            </div>
          </ListItem>
          <ListItem>
            <div className='no-underline flex item-center cursor-pointer' onClick={togglePopup3}>
                <div className='text-base  text-white flex '>
                  <div className='flex pr-2'>
                    <Image src={Distrib} alt='Return' className='w-5 h-5 ' />
                  </div>
                  Distributors
                </div>
            </div>
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
            <div className='no-underline flex item-center cursor-pointer' onClick={togglePopup4}>
                <div className='text-base font-normal  text-white flex '>
                  <div className='flex pr-2'>
                    <Image src={Payment} alt='Return' className='w-5 h-5 ' />
                  </div>
                  Record Payment
                </div>
            </div>
          </ListItem>
        </List>
      </div>
    </Box>
  );
  const router = useRouter() as any;
  const [isCardOpen, setIsCardOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch=useDispatch();
  const user = useAppSelector((state) => state.user);
  const appState = useAppSelector((state) => state.app);
  const notificationSound = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    if(!isCardOpen)
   { setIsCardOpen((prev) => !prev);}
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setIsCardOpen(false);
    }
  };
  

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const currentRoute = usePathname();
  const [newNotificationIndicator, setNewNotificationIndicator] = useState<boolean>(false);
  const [notifs, setNotifs] = useState<any[]>([]);
  const [newnotifs, setnewNotifs] = useState<any[]>([]);
  const [showNotificationPopup, setShowNotificationPopup] = useState<boolean>(false);
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/getAll?orgId=${appState.currentOrgId}`, fetcher, { refreshInterval: 60000 })


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
      notificationSound.current?.play();
      const newNotif = data.newNotifs[data.newNotifs.length-1];
      setnewNotifs(newNotif);
    }
  }
}, [data,error,isLoading]);

console.log("new notifs is : ",newnotifs);

console.log("Sound source:", notificationSound.current?.src);
  useEffect(() => {
    // Preload audio after user interaction
    const enableSound = () => {
      if (notificationSound.current) {
        notificationSound.current.load();
      }
      window.removeEventListener("click", enableSound);
    };
    window.addEventListener("click", enableSound);
    return () => window.removeEventListener("click", enableSound);
  }, []);

if (user.name === "" || currentRoute.startsWith("/auth"))return null;
  return (
    <div className='h-16 shadow-md min-w-screen box-border flex items-center justify-between text-textGrey1 bg-navBar z-100'>
       <audio ref={notificationSound} src={notificationSoundFile} />
      <div className='flex flex-row items-center'>
        <div className=' px-4 py-2 border-0 border-r border-solid border-[#393939] '>
          <button onClick={toggleDrawer(true)} className='rounded-full bg-[#38F8E6] flex items-center justify-center h-[3rem] w-[3rem] border-0'>
            <Image src={addIcon} alt='addIcon' className='w-5 text-black important' />
          </button>
          <Drawer  open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>
      {showPopup1 && <ClientPopup onClose={togglePopup1} />}
      {showPopup2 && <Popup onClose={togglePopup2} clientData={undefined}/>}
      {showPopup3 && <DistributorPopup onClose={togglePopup3} />}
      {showPopup4 && <ExpensePopup onClose={togglePopup4} initialInvoiceNo={initialInvoiceNo} />}
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
              <Image className='w-7 h-7 relative rounded-full border border-neutral-400' src={profileicon} width={80} height={80} alt='profilePic' />
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
          <div  ref={notificationRef} className="absolute top-[4rem] flex flex-col right-[5rem] w-[443px] max-h-[35rem] pt-6 pb-5 bg-zinc-800 shadow justify-center items-start gap-[5px] rounded-[20px] z-[100]">
            <div className="text-gray-100 text-xl font-medium mb-2 px-6">
              Notifications
            </div>
            <div className="notification-list-container overflow-auto h-[calc(50rem - 8.5rem)] no-scrollbar"> {/* Adjust height as needed */}
              <NotificationList notifs={notifs} isLoading={isLoading} />
            </div>
          </div>
        )}
        {/* {newNotificationIndicator && (<NotificationPopUp newnotifs={newnotifs} />)} */}
        

      </div>
    </div>
  );
};
export default Navbar;