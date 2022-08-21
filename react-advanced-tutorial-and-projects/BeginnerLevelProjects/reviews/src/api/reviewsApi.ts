import axios from "axios";
import { ReviewType } from "../components/review.mode";


const reviewsApi=axios.create({
    baseURL:"http://localhost:3500"
})

export const getReviews=async ()=>{
    const res=await reviewsApi.get<ReviewType[]>("/reviews");
    return res.data;
}


export default reviewsApi;