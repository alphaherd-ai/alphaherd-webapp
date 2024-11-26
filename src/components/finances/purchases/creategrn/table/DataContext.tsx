// DataContext.tsx
import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface DataContextType {
  headerData: { [key: string]: any };
  setHeaderData: Dispatch<SetStateAction<{ [key: string]: any }>>;
  tableData: { [key: string]: any }[];
  setTableData: Dispatch<SetStateAction<{ [key: string]: any }[]>>;
  totalAmountData: { [key: string]: any };
  setTotalAmountData: Dispatch<SetStateAction<{ [key: string]: any }>>;
  transactionsData: { [key: string]: any }[];
  setTransactionsData: Dispatch<SetStateAction<{ [key: string]: any }[]>>;
}


const defaultValue: DataContextType = {
  headerData: {},
  setHeaderData: () => {},
  tableData: [],
  setTableData: () => {},
  totalAmountData: {},
  setTotalAmountData: () => {},
  transactionsData: [],
  setTransactionsData: () => {},
};

export const DataContext = createContext<DataContextType>(defaultValue);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [headerData, setHeaderData] = useState<{ [key: string]: any }>({});
  const [tableData, setTableData] = useState<{ [key: string]: any }[]>([]);
  const [totalAmountData, setTotalAmountData] = useState<{ [key: string]: any }>({});
  const [transactionsData, setTransactionsData] = useState<{ [key: string]: any }[]>([]);



  return (
    <DataContext.Provider value={{ headerData, setHeaderData, tableData, setTableData, totalAmountData, setTotalAmountData, transactionsData, setTransactionsData }}>
      {children}
    </DataContext.Provider>
  );
};
