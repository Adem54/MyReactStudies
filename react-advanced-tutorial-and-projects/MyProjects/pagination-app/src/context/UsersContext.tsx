import {createContext,useContext,useState} from "react";
import { User } from "../components/user.model";

interface ContextPropsType {
children:React.ReactNode;
}

interface UsersContextType {
users:User[];
setUsers:React.Dispatch<React.SetStateAction<User[]>>;
}


const UsersContext=createContext<UsersContextType>({} as UsersContextType);

export const useContextUser=()=>useContext(UsersContext);


export const UserContextProvider=(props:ContextPropsType)=>{
    const [users,setUsers]=useState<User[]>([] as User[]);

       const values:UsersContextType={
        users,
        setUsers,
       }                     
    return <UsersContext.Provider  value={values}>{props.children}</UsersContext.Provider>
}