import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { loginAction } from '../store/feature/login/LoginSlice';
const LoginComponent = () => {
    const  dispatch=useDispatch();
    //dispatch araciligi ile loginSlice icinden gelen loginAction fonksiyonun paramtresine burdan gonderecgeigimnz objeyi baglamais olacagiz....

  return (
 <div>
       <h1>LoginComponent</h1>
    <button onClick={()=>dispatch(loginAction({name:"Adem", surname:"Erbas"}))}>Login</button>
    <button>Logout</button>
 </div>
  )
}

export default LoginComponent