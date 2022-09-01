import axios from "axios";
import { User } from "../components/user.model";

 const usersApi=axios.create({
    baseURL:"https://api.github.com/users/john-smilga"
});

export const getAllUsers=async()=>{
    const response=await usersApi.get<User[]>("/followers");
    return response.data;
}


export const getUsers=async(perPage:number)=>{
    const result=await usersApi.get<User[]>(`/followers?per_page=${perPage}`);
    return result.data;
}



export default usersApi;
