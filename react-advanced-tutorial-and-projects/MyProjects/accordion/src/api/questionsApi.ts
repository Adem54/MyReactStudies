import axios from "axios";
import { QuestionType } from "../components/question.mode";

const questionsApi=axios.create({
    baseURL:"http://localhost:3500"
})


export const getQuestions=async()=>{
    const res=await questionsApi.get<QuestionType[]>("/questions");
    return res.data;
}



export default questionsApi;