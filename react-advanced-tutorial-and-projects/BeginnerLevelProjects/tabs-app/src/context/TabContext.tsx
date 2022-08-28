import {createContext,useContext,useState,ReactNode} from "react";

export interface DeveloperType {
    id:string;
    order:number;
    title:string;
    dates:string;
    duties:string[];
    company:string;
}

export interface TabContextType {
   developers:DeveloperType[];
   setDevelopers:React.Dispatch<React.SetStateAction<DeveloperType[]>>;
   activeDeveloper:DeveloperType;
   setActiveDeveloper:React.Dispatch<React.SetStateAction<DeveloperType>>;
   
}


export const TabContext=createContext({} as TabContextType);




type TabContextProviderProps={
    children:ReactNode,
}


export const TabContextProvider:React.FC<TabContextProviderProps>=({children})=>{
                 const [developers,setDevelopers]=useState<DeveloperType[]>([] as DeveloperType[]);
                 const [activeDeveloper,setActiveDeveloper]=useState<DeveloperType>({} as DeveloperType);
           
                 const values={
                developers,
                setDevelopers,
                activeDeveloper,
                setActiveDeveloper,
                

             } as TabContextType;                 

        return <TabContext.Provider  value={values}>{children}</TabContext.Provider>
}


export const useTabContext=()=>useContext(TabContext);


