import { createContext,useContext,useState,ReactNode } from "react";
import { people } from "../Types";





interface ReminderContextType{
    data:people,
    clearAll:()=>void,
    setData:React.Dispatch<React.SetStateAction<people>>,
}


const ReminderContext=createContext({} as ReminderContextType);

export const useReminderContext=()=>useContext(ReminderContext);

export const ReminderContextProvider=({children}:{children:ReactNode})=>{
    const [data,setData]=useState<people>([]);

    const clearAll=()=>{
        setData([]);
    }
const value={data,setData,clearAll};
    return <ReminderContext.Provider value={value}>{children}</ReminderContext.Provider>

}