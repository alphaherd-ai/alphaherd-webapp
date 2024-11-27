import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from "react";
import calicon from "../../../../assets/icons/finance/calendar_today.svg";
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';
import Loading from '@/app/loading';
import { FinanceCreationType } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { SalesStatus } from '@/utils/statusType';

//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());

interface ServiceCategory {
    id: string,
    name: string | string[],
}


function useServiceFetch(id: number | null) {
    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/serviceCategory/getAll?branchId=${id}`,
        fetcher, { revalidateOnFocus: true }
    );
    return { data, isLoading, error }
}

const FilterDropDownCard = () => {
    const router = useRouter();
    const appState = useAppSelector((state) => state.app);
    const [selectedCategory, setSelectedCategory] = useState<any[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<any[]>();
    const { data, error, isLoading } = useServiceFetch(appState.currentBranchId);


    const handleCategorySelect = (category: string) => {
        if (selectedCategory.includes(category)) {
            setSelectedCategory(selectedCategory.filter((item) => item !== category))
        } else {
            setSelectedCategory([...selectedCategory, category])
        }
    }

    useEffect(() => {
        if (data && !error && !isLoading) {
            const serviceCategoryList: any[] = data.reduce((acc: any[], serviceCategoryEntry: ServiceCategory) => {
                if (Array.isArray(serviceCategoryEntry.name)) {
                    serviceCategoryEntry.name.forEach((name: string) => {
                        acc.push({ value: serviceCategoryEntry.id, label: name });
                    });
                } else {
                    acc.push({ value: serviceCategoryEntry.id, label: serviceCategoryEntry.name });
                }
                return acc;
            }, []);
            console.log(serviceCategoryList);

            const options = serviceCategoryList.map((item: any) => ({
                label: item.label,
                value: item.label
            }))

            setCategoryOptions(options);
        }
    }, [data, error, isLoading])

    
    const applyFilters=()=>{
        const queryParams=new URLSearchParams();
        selectedCategory.forEach((category)=>{
            queryParams.append('selectedCategory',category);
        })
        const queryString=queryParams.toString();
        router.push(`?${queryString}`);
    }
    return (

        <div className="w-[420px] h-[465px] px-4 py-4 bg-white rounded-[10px] flex-col justify-start items-start gap-4 inline-flex shadow-lg">
            <div className="w-full pt-8  flex flex-col gap-4">
                <div className={`px-2 py-1 w-fit bg-zinc-900 border-zinc-900
             rounded-tr-[5px] text-sm text-bold text-white rounded-[5px] border justify-start items-center gap-1 flex`}>
                    Categories
                </div>
                {categoryOptions?.map((party: any) => (
                    <div key={party.value} className="w-full flex gap-2 items-center">
                        <input
                            type="checkbox"
                            checked={selectedCategory?.includes(party.label)}
                            onChange={() => handleCategorySelect(party.label)}
                        />
                        <div className="text-textGrey2 font-medium text-base">{party.label}</div>
                    </div>
                ))}
            </div>
            <div className="w-full flex justify-between items-center">

                <div className="flex items-center gap-2">
                    <input type="checkbox" name="aditya" id="" />
                    <div className="text-textGrey2 font-medium text-base">Select All</div>
                </div>
                <div className="px-3 py-3 bg-textGreen cursor-pointer text-white rounded-[5px] justify-start items-center" onClick={applyFilters}>Apply</div>
            </div>
        </div>


    )
}

export default FilterDropDownCard;