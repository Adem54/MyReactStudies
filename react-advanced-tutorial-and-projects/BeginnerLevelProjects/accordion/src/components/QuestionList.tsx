import React from 'react'
import Question from './Question'
import { QuestionType } from './question.mode'

const QuestionList:React.FC<QuestionListProps> = ({questions,isLoading}) => {

 
  return (
    <main className="main">
    <article className="main-title">
      <p>Questions And Answers About Login</p>
    </article>
    <section className="container">

    {questions.map(question=>{
  return  <Question key={question.id} {...question} />
 })}
    </section>
    </main>
  )
}

interface QuestionListProps {
  questions:QuestionType[];
  isLoading:boolean;
}

export default QuestionList