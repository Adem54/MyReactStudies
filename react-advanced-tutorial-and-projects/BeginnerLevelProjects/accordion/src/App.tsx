import "./App.css";
import { getQuestions } from "./api/questionsApi";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { QuestionType } from "./components/question.mode";
import QuestionList from "./components/QuestionList";

function App() {
  const { data, isLoading, isSuccess } = useQuery("questions", getQuestions);
  const [questions, setQuestions] = useState<QuestionType[]>(
    [] as QuestionType[]
  );

  useEffect(()=>{
    console.log("isSuccess: ",isSuccess);
    if(isSuccess){
      setQuestions([...data]);
    }
  },[isSuccess])

  const values={
    questions,isLoading
  }
  return (
    <div className="App">
      <QuestionList  {...values} />
    </div>
  );
}

export default App;
