"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import FinancesIcon from './icons/financesIcon';
import notification from '../../assets/icons/navbar/notification.svg';
import alphaherd from '../../assets/icons/navbar/alphaherdLogo.svg';
import PatientlistIcon from './icons/patientlistIcon';
import InventoryIcon from './icons/inventoryIcon';
import HomeIcon from './icons/homeIcon';
import ProfileIcon from "../../assets/icons/settings/pfpcion.jpeg";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import NotificationList from '../home/NotificationCard/NotificationList';
import DropdownMenu from './dropDownMenu/dropDownMenu';
import DropdownIcon from './icons/dropdownIcon';
import { updateApp } from '@/lib/features/appSlice';
import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCookie } from 'cookies-next';

const Navbar = () => {
  const router = useRouter() as any;
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const dispatch=useDispatch();
  const { currentOrg, currentBranch } = useSelector((state: RootState) => state.app);
  useEffect(() => {
    const storedOrg = JSON.parse(localStorage.getItem('selectedOrg')!);
    const storedBranch = JSON.parse(localStorage.getItem('selectedBranch')!);
    
    if (storedOrg) setSelectedOrg(storedOrg);
    if (storedBranch) setSelectedBranch(storedBranch);
    
    if (!currentOrg || !currentBranch) {
      const fetchInitialData = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/organization/getAll`);
          const data = await response.json();
          if (data.length > 0) {
            const firstOrg = data[0];
            setSelectedOrg(firstOrg);
            if (firstOrg.branches && firstOrg.branches.length > 0) {
              const firstBranch = firstOrg.branches[0];
              setSelectedBranch(firstBranch);
              localStorage.setItem('selectedOrg', JSON.stringify(firstOrg));
              localStorage.setItem('selectedBranch', JSON.stringify(firstBranch));
              dispatch(updateApp({
                currentOrg: firstOrg, currentBranch: firstBranch,
                currentOrgId: null,
                currentBranchId: null,
                isCurrentOrgAdmin: undefined,
                isCurrentBranchManager: undefined,
                currentUrl: null
              }));
            }
          }
        } catch (error) {
          console.error("Error fetching initial data:", error);
        }
      };

      fetchInitialData();
    }
  }, [currentOrg, currentBranch, dispatch]);

  const handleClick = () => {
    setIsCardOpen(!isCardOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = useCallback((org: any, branch: any) => {
    if (org) setSelectedOrg(org);
    if (branch) setSelectedBranch(branch);
    dispatch(updateApp({
      currentOrg: org,
      currentBranch: branch,
      currentOrgId: null,
      currentBranchId: null,
      isCurrentOrgAdmin: undefined,
      isCurrentBranchManager: undefined,
      currentUrl: null
    }));
    setCookie('currentOrg', org, { path: '/' });
    setCookie('currentBranch', branch, { path: '/' });
    if (branch && org) {
      // Store the selection in local storage
      localStorage.setItem('selectedOrg', JSON.stringify(org));
      localStorage.setItem('selectedBranch', JSON.stringify(branch));
    }
  }, [dispatch, setSelectedOrg, setSelectedBranch]);
  

  const user = useAppSelector((state) => state.user);
  const currentRoute = usePathname();
  if (user.name === "" || currentRoute.startsWith("/auth")) return null;



  return (
    <div className='h-16 shadow-md w-full box-border flex items-center justify-between text-textGrey1 bg-navBar z-100'>
      <div className='flex flex-row'>
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
      <div className='relative flex flex-row h-full'>
        <div className="h-full flex items-center pr-8 border-0 border-r-2 border-solid border-gray-800">
          <div className='relative'>
            <button
              className='py-2 px-4 bg-navBar border-none text-white rounded cursor-pointer transition-all flex items-center'
              onClick={toggleDropdown}
            >
              {selectedOrg ? selectedOrg.orgName : "Organization"}
              {selectedBranch ? `, ${selectedBranch.branchName}` : ""}
              <DropdownIcon fill="#fff" className="ml-2" />
            </button>
            {isDropdownOpen && (
              <DropdownMenu 
                apiUrl={`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/organization/getAll`} 
                onSelect={handleSelect} 
              />
            )}
          </div>
          <Link className='no-underline flex pl-6' href='#'>
            <div className='flex items-center justify-center' onClick={handleClick}>
              <Image src={notification} alt='notification' />
            </div>
          </Link>
          <Link className='no-underline flex pl-6' href='/profile'>
            <div className='text-sm flex items-center justify-center rounded-full overflow-hidden border border-solid border-gray-300'>
              <Image className='w-7 h-7 relative rounded-full border border-neutral-400' src={ProfileIcon} alt='patient' />
            </div>
          </Link>
        </div>
        <Link className='no-underline p-4 flex items-center justify-center h-full' href='/settings'>
          <div className='text-sm flex items-center justify-center rounded-full'>
            <Image src={alphaherd} alt='alphaherd' className='w-7 h-7' />
          </div>
        </Link>
        {isCardOpen && (
          <div className="absolute top-[4rem] flex flex-col right-[5rem] w-[443px] max-h-[50rem] pt-6 pb-5 bg-zinc-800 shadow justify-center items-start gap-[5px] rounded-[20px] z-[100]">
            <div className="text-gray-100 text-xl font-medium font-['Roboto'] px-6">
              Notifications
            </div>
            <NotificationList />
            <NotificationList />
            <NotificationList />
            <NotificationList />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
