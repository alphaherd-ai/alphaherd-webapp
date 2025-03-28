import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import calicon from "../../../../assets/icons/finance/calendar_today.svg";
import useSWR from 'swr';
import { useAppSelector } from '@/lib/hooks';

import { FinanceCreationType } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { SalesStatus } from '@/utils/statusType';
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());

const FilterDropdownCard = () => {
  const router = useRouter();
  const appState = useAppSelector((state) => state.app);
  const [partyInfo, setPartyInfo] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);
  const [selectedParties, setSelectedParties] = useState<any[]>([]);
  const [selectedInvoiceTypes, setSelectedInvoiceTypes] = useState<string[]>([]);
  const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/database/getAll?branchId=${appState.currentBranchId}`, fetcher, { revalidateOnFocus: true });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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

  const handleDateChange = (type: 'start' | 'end', date: Date | null) => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handlePartySelect = (party: any) => {
    setSelectedParties((prevSelectedParties) => {
      if (prevSelectedParties.includes(String(party))) {
        return prevSelectedParties.filter((partyName) => partyName !== String(party));
      } else {
        return [...prevSelectedParties, String(party)];
      }
    });
  };

  const handleInvoiceTypeSelect = (type: string) => {
    setSelectedInvoiceTypes((prevSelectedInvoiceTypes) => {
      if (prevSelectedInvoiceTypes.includes(type)) {
        return prevSelectedInvoiceTypes.filter((invoiceType) => invoiceType !== type);
      } else {
        return [...prevSelectedInvoiceTypes, type];
      }
    });
  };

  const [activeTab, setActiveTab] = useState("dateRange");

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const handleStatusChange = (status: any) => {
    setSelectedStatus((prevSelectedStatus) => {
      if (prevSelectedStatus.includes(String(status))) {
        return prevSelectedStatus.filter((statusName) => statusName !== String(status));
      } else {
        return [...prevSelectedStatus, String(status)];
      }
    });
  }

  const applyFilters = () => {
    const queryParams = new URLSearchParams();
    selectedParties.forEach((id) => queryParams.append('selectedParties', id));
    selectedStatus.forEach((status) => queryParams.append('selectedStatus', status));
    if (startDate) queryParams.set('startDate', startDate.toISOString());
    if (endDate) queryParams.set('endDate', endDate.toISOString());
    selectedInvoiceTypes.forEach((type) => queryParams.append('selectedInvoiceTypes', type));
    const queryString = queryParams.toString();
    router.push(`?${queryString}`);

  };

  return (
    <div className="w-[420px] h-[541px] min-h-fit px-4 py-4 bg-white rounded-[10px] flex-col justify-start items-start gap-2 inline-flex shadow-lg">
      <div className="items-start flex border border-solid border-borderGrey rounded-[5px] cursor-pointer">

        <div
          className={`px-2 py-1 ${activeTab === "dateRange" ? "bg-zinc-900 border-zinc-900" : "bg-gray-100 border-neutral-400"
            }  border-0 border-r border-solid border-borderGrey justify-start items-center gap-1 flex`}
          onClick={() => handleTabChange("dateRange")}
        >
          <div className={`text-sm font-bold ${activeTab === "dateRange" ? "text-white" : "text-neutral-400"}`}>
            Date Range
          </div>

        </div>
        <div
          className={`px-2 py-1 ${activeTab === "invoiceType" ? "bg-zinc-900 border-zinc-900" : "bg-gray-100 border-neutral-400"
            }  border-0 border-r border-solid border-borderGrey justify-start items-center gap-1 flex`}
          onClick={() => handleTabChange("invoiceType")}
        >
          <div className={`text-sm font-bold ${activeTab === "invoiceType" ? "text-white" : "text-neutral-400"}`}>
            Invoice Type
          </div>

        </div>
        <div
          className={`px-2 py-1 ${activeTab === "status" ? "bg-zinc-900 border-zinc-900" : "bg-gray-100 border-neutral-400"
            } rounded-tr-[5px] rounded-br-[5px] border justify-start items-center gap-1 flex`}
          onClick={() => handleTabChange("status")}
        >
          <div className={`text-sm font-bold ${activeTab === "status" ? "text-white" : "text-neutral-400"}`}>
            Status
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
      {activeTab === "dateRange" && (
        <div className="w-full h-full flex flex-col gap-6">
          <div className="w-full flex flex-col gap-2">
            <div className="w-full text-textGrey2 text-base font-medium">Start Date:</div>
            <div className="customDatePickerWidth">
              <DatePicker
                className="w-full"
                selected={startDate}
                onChange={(date) => handleDateChange('start', date)}
                calendarClassName="react-datepicker-custom"
                customInput={
                  <div className="relative">
                    <input
                      className="w-full h-9 text-textGrey1 text-base font-medium px-2 rounded border border-solid border-borderGrey focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                      value={startDate ? startDate.toLocaleDateString() : ''}
                      readOnly
                    />
                    <Image
                      src={calicon}
                      alt="Calendar Icon"
                      className="absolute right-2 top-2 cursor-pointer"
                      width={50}
                      height={20}
                    />
                  </div>
                }
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full text-textGrey2 text-base font-medium">End Date:</div>
            <div className="customDatePickerWidth">
              <DatePicker
                className="w-full"
                selected={endDate}
                onChange={(date) => handleDateChange('end', date)}
                calendarClassName="react-datepicker-custom"
                customInput={
                  <div className="relative">
                    <input
                      className="w-full h-9 text-textGrey1 text-base font-medium px-2 rounded border border-solid border-borderGrey focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                      value={endDate ? endDate.toLocaleDateString() : ''}
                      readOnly
                    />
                    <Image
                      src={calicon}
                      alt="Calendar Icon"
                      className="absolute right-2 top-2 cursor-pointer"
                      width={50}
                      height={20}
                    />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      )}
      {activeTab === "invoiceType" && (
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
            <div className="w-full flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectedInvoiceTypes.includes(FinanceCreationType.Sales_Invoice)}
                onChange={() => handleInvoiceTypeSelect(FinanceCreationType.Sales_Invoice)}
              />
              <div className="text-textGrey2 font-medium text-base">Sales Invoice</div>
            </div>
            <div className="w-full flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectedInvoiceTypes.includes(FinanceCreationType.Sales_Return)}
                onChange={() => handleInvoiceTypeSelect(FinanceCreationType.Sales_Return)}
              />
              <div className="text-textGrey2 font-medium text-base">Sales Return</div>
            </div>
            <div className="w-full flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectedInvoiceTypes.includes(FinanceCreationType.Purchase_Order)}
                onChange={() => handleInvoiceTypeSelect(FinanceCreationType.Purchase_Order)}
              />
              <div className="text-textGrey2 font-medium text-base">Purchase Order</div>
            </div>
            <div className="w-full flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectedInvoiceTypes.includes(FinanceCreationType.Purchase_Invoice)}
                onChange={() => handleInvoiceTypeSelect(FinanceCreationType.Purchase_Invoice)}
              />
              <div className="text-textGrey2 font-medium text-base">Purchase Invoice</div>
            </div>
            <div className="w-full flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectedInvoiceTypes.includes(FinanceCreationType.Purchase_Return)}
                onChange={() => handleInvoiceTypeSelect(FinanceCreationType.Purchase_Return)}
              />
              <div className="text-textGrey2 font-medium text-base">Purchase Return</div>
            </div>
            <div className="w-full flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectedInvoiceTypes.includes(FinanceCreationType.Expense_NonRecurring)}
                onChange={() => handleInvoiceTypeSelect(FinanceCreationType.Expense_NonRecurring)}
              />
              <div className="text-textGrey2 font-medium text-base">Non Recurring Expense</div>
            </div>
            <div className="w-full flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectedInvoiceTypes.includes(FinanceCreationType.Expense_Recurring)}
                onChange={() => handleInvoiceTypeSelect(FinanceCreationType.Expense_Recurring)}
              />
              <div className="text-textGrey2 font-medium text-base">Recurring Expense</div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "status" && <div className="w-full h-full">
        <div className="w-full flex flex-col gap-4">
          {SalesStatus?.map((item: any) => (
            <div key={item.id} className="w-full flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectedStatus.includes(item.status)}
                onChange={() => handleStatusChange(item.status)}
              />
              <div className="text-textGrey2 font-medium text-base">{item.status}</div>
            </div>
          ))}
        </div>
      </div>}
      <div className="w-full h-fit flex justify-between items-center">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2"></div>
          <div className="px-3 py-3 bg-textGreen text-white rounded-[5px] justify-start items-center cursor-pointer" onClick={applyFilters}>Apply</div>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdownCard;
