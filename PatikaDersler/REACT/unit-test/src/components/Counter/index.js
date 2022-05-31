import React, { useState } from 'react';

const Counter = () => {
    const [count,setCount]=useState(0);

    const decrease=(e)=>{
        setCount(count-1);
    }
  return <div>
      <button onClick={(e)=>setCount(count+1)}>Increase</button>
      <button onClick={decrease}>Decrease</button>
      <br/>
      <h2>{count}</h2>
  </div>;
};

export default Counter;
//Counter imiz icin bir test kodu yazacagiz
//test dosyasi olusturacagiz once test dosyasi olustururken bir isim verdikten sonra test.js seklinde olusturmaliyiz
//Counter.test.js isminde bir test dosyasi olusturuyoruz