
import styled from "styled-components";

//props gecilebiliyor bu sekilde, ve boylece, hem farkli tasarim hem de condition durumlarina gore de
//design degistirilebilmis oluyor
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;


import React from 'react'

const MyButton = () => {
  return (
    <div>
       <Button>Normal</Button>
    <Button primary>Primary</Button>
    
    </div>
  )
}

export default MyButton
