import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext()
  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />
  }

  const { question, incorrect_answers, correct_answer } = questions[index]
  console.log("question: ",question)
  console.log("incorrect_answers: ",incorrect_answers)
  console.log("correct_answer: ",correct_answer)
  // const answers = [...incorrect_answers, correct_answer]
  let answers = [...incorrect_answers]
  const tempIndex = Math.floor(Math.random() * 4)
  if (tempIndex === 3) {
    answers.push(correct_answer)
  } else {
    answers.push(answers[tempIndex])//answers dizisinin sonuna, random gelen index e denk gelen elemnti ekliyor ayni dizi icinden
    //Sonra da answsers[tempIndex] e karsilik gelen data nini yerine de correct answer i yerlestiriyor
    //Cok akillica hic aklima gelmemisti bu dolayisi ile bu sekilde de random da index kac gelirse answers dizisi icinde
    //o indexe dogru cevabi yerlestiriyor dolayisi ile de random olarak yerlestirmis oluyor aslinda
    answers[tempIndex] = correct_answer
  }
  
  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct}/{index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className='answer-btn'
                  onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              )
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  )
}

export default App
