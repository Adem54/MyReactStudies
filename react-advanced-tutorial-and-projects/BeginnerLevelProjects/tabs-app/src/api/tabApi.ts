
import axios from "axios";
import { DeveloperType } from "../context/TabContext";

/* https://course-api.com/react-tabs-project */

const tabApi=axios.create({
    baseURL:"https://course-api.com"
})

export const getDevelopers=async()=>{
    const res=await tabApi.get<DeveloperType[]>("/react-tabs-project");
    return res.data;
}


export default tabApi;