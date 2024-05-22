import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

// Define the shape of your context value
interface DataContextType {
  headerData: { [key: string]: any };
  setHeaderData: Dispatch<SetStateAction<{ [key: string]: any }>>;
  tableData: any[];
  setTableData: Dispatch<SetStateAction<any[]>>;
  totalAmountData: { [key: string]: any };
  setTotalAmountData: Dispatch<SetStateAction<{ [key: string]: any }>>;
}

// Define the default value of the context
const defaultValue: DataContextType = {
  headerData: {},
  setHeaderData: () => {},
  tableData: [],
  setTableData: () => {},
  totalAmountData: {},
  setTotalAmountData: () => {},
};

export const DataContext = createContext<DataContextType>(defaultValue);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [headerData, setHeaderData] = useState<{ [key: string]: any }>({});
  const [tableData, setTableData] = useState<any[]>([]);
  const [totalAmountData, setTotalAmountData] = useState<{ [key: string]: any }>({});

  return (
    <DataContext.Provider value={{ headerData, setHeaderData, tableData, setTableData, totalAmountData, setTotalAmountData }}>
      {children}
    </DataContext.Provider>
  );
};
