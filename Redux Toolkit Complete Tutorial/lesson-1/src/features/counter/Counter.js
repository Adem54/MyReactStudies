import React, { useState } from "react";
import { selectCount,increment,decrement,incrementByAmount,reset } from "./counterSlice";
import { useSelector,useDispatch } from "react-redux";
const Counter = () => {
    const [number,setNumber]=useState(0);
    const addValue=Number(number) || 0;
  const count = useSelector(selectCount);
  const dispatch=useDispatch();
  console.log(`count: ${count}`);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement=()=>{
    dispatch(decrement());
  }

  const handleIncreaseBy=()=>{
    dispatch(incrementByAmount({number:addValue}));
   
  }

  const handleReset=()=>{
    setNumber(0);
    dispatch(reset());
  }
  return (
    <section>
         <p>{JSON.stringify(count)}</p>
      <div>
       
        <button style={{cursor:"pointer"}} onClick={handleIncrement}>+</button>
        <button style={{cursor:"pointer"}} onClick={handleDecrement}>-</button>
        <button style={{cursor:"pointer"}} onClick={handleReset}>Reset</button>

      </div>
      <div>
        
      </div>
      <div>
        <label>Number: </label>
        <input value={number} onChange={(e)=>setNumber(e.target.value) }/>
        <button style={{cursor:"pointer"}} onClick={handleIncreaseBy}>IncreaseBy</button>
      </div>
    </section>
  );
};

export default Counter;
