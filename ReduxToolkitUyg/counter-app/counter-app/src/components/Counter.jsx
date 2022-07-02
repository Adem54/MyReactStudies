import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { increment,decrement,incrementByAmount } from '../redux/counter/counterSlice';
//counterSlice icinde aliyoruz...

const Counter = () => {
  const [value,setValue]=useState("");//Bunu redux ta yapmamiza gerek yok ....
  console.log("value: ",typeof value);
  const dispatch=useDispatch();
  //state direk store umuz icindeki objenn tamamidir ve storage in tamamini aliyor
  const countValue=useSelector((state)=>state.counter.value);//counterSlice icinde initalValue icindeki value nin degeri gelir buraya...
  console.log("countValue: ",countValue);
  return (
    <div>
        <h1>{countValue}</h1>
        <button onClick={()=>dispatch(increment())}>Increament</button>
        <button onClick={()=>dispatch(decrement())}>Decreament</button>
        <br/><br/>
      <label>Bir deger girin:</label>  <input type="number" name="number" value={value} onChange={(e)=>setValue(e.target.value)}  />
      <button onClick={(e)=>{
        dispatch(incrementByAmount(parseInt(value)));
        //incrementByAmount parametresi icine ne gonderirsek biz, payload property si o degeri alacaktir...
        setValue("");
      }} >Increment By Amount</button>
       
    </div>
  )
}

export default Counter