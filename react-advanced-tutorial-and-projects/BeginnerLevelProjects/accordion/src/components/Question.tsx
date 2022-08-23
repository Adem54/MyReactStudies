import React, { useState, useRef } from "react";
import { QuestionType } from "./question.mode";

const Question = (props: QuestionType) => {
  const { title, question, info } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [setHeight, setHeightState] = useState("0px");

  const content=useRef<any>(null)
  return (
    <article className="question-box">
      <div className="question">
        <p className="title">{title} </p>
        {/* {isOpen && <p className="info  accordion__content">{info}</p>} */}
     <p     style={{ maxHeight: `${setHeight}` }}  ref={content}  className="accordion__content">{info}</p>

      </div>

      <p
        className="icon-parent"
        onClick={() => {
          setIsOpen(!isOpen);
          console.log("isOpen: ", isOpen);
          setHeightState(
            isOpen  ? "0px" : `${content.current.scrollHeight}px`
          );
        }}
      >
        <i className={`fa-solid fa-${!isOpen ? "plus" : "minus"}`}></i>
      </p>
    </article>
  );
};

export default Question;
