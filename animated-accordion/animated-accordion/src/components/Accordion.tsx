import React, { useState, useRef,ReactElement } from "react";
import Chevron from "./Chevron";

import "./Accordion.css";

function Accordion(props:any) {
  const [setActive, setActiveState] = useState("");
  console.log("setActive: ",setActive);
  const [setHeight, setHeightState] = useState("0px");
  console.log("setHeight: ",setHeight);
  const [setRotate, setRotateState] = useState("accordion__icon");
  

  const content = useRef<ReactElement | any>(null);
  console.log("content: ",content.current);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`//
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <p className="accordion__title">{props.title}</p>
        <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion__content"
      >
        <div
          className="accordion__text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

export default Accordion;
