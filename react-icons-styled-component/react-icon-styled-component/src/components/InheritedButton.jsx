import styled from "styled-components"


//INHERITANCE-OVERRIDING IN UYGULAMAMLI HALINI GORUYORUZ BURDA....BESTPRACTISE...
// The Button from the last section without the interpolations
const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  background:teal;

`;

// A new component based on Button, but with some override styles
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
  background:cyan;
`;



import React from 'react'

const InheritedButton = () => {
  return (
    <div>
      <Button>Normal Button</Button>
    <TomatoButton>Tomato Button</TomatoButton>
    </div>
  )
}

export default InheritedButton
