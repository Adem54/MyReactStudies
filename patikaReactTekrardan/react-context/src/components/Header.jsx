import React  from 'react'
import {useTheme} from '../context/ThemeContext'
const Header = () => {
const {theme,setTheme}=useTheme;
  return (
    <>
      <button onClick={()=>setTheme(prevTheme=>prevTheme=="dark" ? "light" : "dark")}>Change Theme!</button>
      <br/>
      <br/>
    <div>Header-  {(theme)}</div>
    </>
  )
}
export default Header;