import {useDispatch, useSelector} from "react-redux";

import { useState } from "react";
import { decreaseCount, increaseByAmount, increaseCount } from "../redux/counter/counterSlice";

const Counter = () => {
    const dispatch=useDispatch();
    const {value}=useSelector(state=>state.counterReducer);
    console.log("count:",value);
    const [amount,setAmount]=useState(0);
    console.log("amount_:",typeof amount);
  
    const increase=()=>{
      dispatch(increaseCount())
    }
    const decrease=()=>{
      dispatch(decreaseCount());
    }
    const incrementByAmount=()=>{
      dispatch(increaseByAmount(parseInt(amount)));
    }
  return (
    <div className="App">
    <h1>{value}</h1>
    <hr/>
    <button onClick={increase}>Increase</button>
    <br/>
    <br/>
    <button onClick={decrease}>Decrease</button>
    <br/>
    <br/>
    <button onClick={incrementByAmount}>IncreaseByAmount</button>
    <br/>
    <br/>
    <label >Amount:  </label>
    <input name="amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
    <br/>
    <br/>
    <button onClick={()=>setAmount(0)}>Clear Input</button>
  </div>
  )
}

export default Counter

