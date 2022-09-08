//https://course-api.com/react-tours-project

import axios from "axios";
import { Tour } from "../context/TourContext";

const tourApi=axios.create({
    baseURL:"https://course-api.com/react-tours-project",
 
})

export const getTours=async()=>{
    const response=await tourApi.get<Tour[]>("");
    return response.data;
}

export const deleteTour=async (id:number)=>{
    await tourApi.delete("");
    return id;
}

export default tourApi;