import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../store/feature/theme/ThemeSlice';

const ThemeComponent = () => {
    const [color,setColor]=useState("");
    const theme=useSelector(state=>state.themeReducer.theme);
console.log("color: ", color);
console.log("theme: ", theme);

const dispatch=useDispatch();
    const handleChange=(e)=>{
        setColor(
      e.target.value
        )
    }

    
  return (
    <div>
        <h1>ThemeComponent</h1>

        <input 
        type="text"
        value={color}
        onChange={handleChange}
        /> 
        <button onClick={()=>dispatch(setTheme(color))}>Set Color</button>
        </div>
  )
}

export default ThemeComponent