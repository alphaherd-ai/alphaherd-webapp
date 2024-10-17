import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import calicon from "../../../../assets/icons/finance/calendar_today.svg";
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
import Loading from '@/app/loading';
import { FinanceCreationType, Stock } from '@prisma/client';
import {useRouter} from 'next/navigation';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());
function useProductfetch (id: number | null) {
    const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/inventory/product/getAll?branchId=${id}`,fetcher,{revalidateOnFocus:true});
   return {
    fetchedProducts:data,
    isProductLoading:isLoading,
    productError:error
   }
}
const FilterDropdownProductsCard = () => {
  const router=useRouter();
  const appState = useAppSelector((state) => state.app);
  const [partyInfo, setPartyInfo] = useState<any[]>([]);
  const [selectedParties, setSelectedParties] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const {fetchedProducts,isProductLoading,productError}=useProductfetch(appState.currentBranchId);
  const [categories, setCategories] = useState<any[]>([
    { value: "Pet food", label: "Pet food" },
    { value: "Medicines", label: "Medicines" },
    { value: "Supplements", label: "Supplements" },
    { value: "Pet accessories", label: "Pet accessories" },
    { value: "Equipments", label: "Equipments" },
]);
  useEffect(() => {
     
      if (!isProductLoading && !productError && fetchedProducts) {
         
          const fetchedCategories = fetchedProducts.map((product: { category: string }) => product.category);
          const uniqueFetchedCategories = Array.from(new Set(fetchedCategories));   
          const allCategories = [...categories.map(cat => cat.value), ...uniqueFetchedCategories];
          const uniqueCategories = Array.from(new Set(allCategories)).map(category => ({ value: category, label: category }));
          setCategories(uniqueCategories);
      }
  }, [isLoading, error, fetchedProducts]);


  useEffect(() => {
    if (data && !isLoading && !error) {
      const { clients, distributors } = data;

      const clientOptions = clients.map((item: any) => ({
        label: `${item?.clientName}`,
        value: {
          clientName: item?.clientName,
          id: item?.id
        }
      }));

      const distributorOptions = distributors.map((item: any) => ({
        label: `${item?.distributorName}`,
        value: {
          distributorName: item?.distributorName,
          id: item?.id
        },
      }));

      const combinedOptions = [...clientOptions, ...distributorOptions];
      // console.log(combinedOptions);
      setPartyInfo(combinedOptions);
    }
  }, [data, error, isLoading]);

 

  const handlePartySelect = (party: any) => {
    setSelectedParties((prevSelectedParties) => {
      if (prevSelectedParties.includes(String(party))) {
        return prevSelectedParties.filter((partyName) => partyName !== String(party));
      } else {
        return [...prevSelectedParties,String(party)];
      }
    });
  };
  const handleCategorySelect = (category: any) => {
    // console.log("this is category",category)
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(String(category))) {
        return prevSelectedCategories.filter((categoryName) => categoryName !== String(category));
      } else {
        return [...prevSelectedCategories,String(category)];
      }
    });
  };

  


  const [activeTab, setActiveTab] = useState("party");

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const applyFilters = () => {
    const queryParams = new URLSearchParams();
    selectedParties.forEach((id) => queryParams.append('selectedParties', id));
    selectedCategories.forEach((category) => queryParams.append('selectedCategories', category));
   
    const queryString = queryParams.toString();
    router.push(`?${queryString}`);
    
  };

  return (
    <div className="w-[420px] h-[441px] px-4 py-6 bg-white rounded-[10px] flex-col justify-start items-start gap-4 inline-flex shadow-lg">
      <div className="items-start flex border border-solid border-borderGrey rounded-[5px] cursor-pointer">
        <div
          className={`px-2 py-1 ${
            activeTab === "party" ? "bg-zinc-900 border-zinc-900" : "bg-gray-100 border-neutral-400"
          } rounded-tl-[5px] rounded-bl-[5px] border-0 border-r border-solid border-borderGrey justify-start items-center gap-1 flex`}
          onClick={() => handleTabChange("party")}
        >
          <div className={`text-sm font-bold ${activeTab === "party" ? "text-white" : "text-neutral-400"}`}>
            Distributors
          </div>
          <div className="w-4 h-4 p-2 bg-teal-400 rounded-[17px] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-[10px] font-medium">2</div>
          </div>
        </div>
       
        
        <div
          className={`px-2 py-1 ${
            activeTab === "category" ? "bg-zinc-900 border-zinc-900" : "bg-gray-100 border-neutral-400"
          } rounded-tr-[5px] rounded-br-[5px] border justify-start items-center gap-1 flex`}
          onClick={() => handleTabChange("category")}
        >
          <div className={`text-sm font-bold ${activeTab === "category" ? "text-white" : "text-neutral-400"}`}>
            Categories
          </div>
          <div className="w-4 h-4 p-2 bg-teal-400 rounded-[17px] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-[10px] font-medium">1</div>
          </div>
        </div>
      </div>
      {activeTab === "party" && (
        <div className="w-full h-full flex flex-col gap-4">
          <div className="w-full">
            <input
              className="w-full p-2 border border-solid border-borderGrey outline-none rounded-[5px] text-sm text-textGrey2 font-medium"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            {partyInfo?.map((party: any) => (
              <div key={party.value.id} className="w-full flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={selectedParties.includes(party.label)}
                  onChange={() => handlePartySelect(party.label)}
                />
                <div className="text-textGrey2 font-medium text-base">{party.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
 
      {activeTab === "category" && <div className="w-full h-full">
     
          
          <div className="w-full flex flex-col gap-4">
          {categories?.map((category: any,index:number) => (
              <div key={index} className="w-full flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.label)}
                  onChange={() => handleCategorySelect(category.label)}
                />
                <div className="text-textGrey2 font-medium text-base">{category.label}</div>
              </div>
            ))}
            
          </div>
        </div>
 }
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input type="checkbox" name="" id="" />
          <div className="text-textGrey2 font-medium text-base">Select All</div>
        </div>
        <div className="px-3 py-3 bg-textGreen text-white rounded-[5px] justify-start items-center" onClick={applyFilters}>Apply</div>
      </div>
    </div>
  );
};

export default FilterDropdownProductsCard;
