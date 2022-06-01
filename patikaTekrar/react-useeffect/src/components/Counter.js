import React, { useEffect, useState } from 'react'

const Counter = () => {
    const[number,setNumber]=useState(0);
    useEffect(()=>{
        console.log(`rendering`);
        // return () => console.log('mount edilidi...');
        const interval=setInterval(()=>{
          setNumber((prviousNumb)=>prviousNumb+1);
        },1000)
        //Return islemi yapildigi anda unmount edilme aninin yakalamis oluyoruz
        return () => clearInterval(interval);//Burayi kullanmaz isek setInterval gibi methodlar , biz bu icinde bulundugmuz componenti kaldirasak bile chorme da calismaya devam edecektir iste bundan kurtulmak icin componentunmount anini yakalamis 
      },[])

      useEffect(()=>{
        console.log(`Numberstate guncellendi`);
       
      },[number])
      
  return (
      <>
    <div>Counter</div>
    <h2>{number}</h2>
    <button onClick={()=>setNumber(previousstate=>previousstate+1)}>IncreaseNumber</button>
    </>
  )
}

export default Counter