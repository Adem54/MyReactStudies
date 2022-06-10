import React from 'react'
import {useTheme} from "../context/ThemeContext";
const Button = () => {
    console.log("data: ",useTheme);
  const {theme,setTheme}=useTheme;
  return (
      <>
      <button onClick={()=>setTheme(prevTheme=>prevTheme=="dark" ? "light" : "dark")}>Change Theme!</button>
      <br/>
      <br/>
    <div>Button-  {(theme)}</div>
    <br></br>
      </>
  )
}
export default Button;