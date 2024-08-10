import { createContext, Dispatch, SetStateAction, useState } from "react";

interface DataContextType {
    allData: { [key: string]: any }[];
    setAllData: Dispatch<SetStateAction<{ [key: string]: any }[]>>;
}

const defaultValue: DataContextType = {
    allData: [],
    setAllData: () => {},
};

export const DataContext = createContext<DataContextType>(defaultValue)

export const DataProvider = ({ children }: { children: React.ReactNode }) => {

    const [allData, setAllData] = useState<{ [key: string]: any }[]>([]);
    return (
        <DataContext.Provider value={{ allData, setAllData }}>
            {children}
        </DataContext.Provider>
    )
}