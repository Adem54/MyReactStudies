import React, { useState } from 'react'

export const Comp = () => {
  return (
      <>
    <Child>
        {(count,handleCount)=>(
            <>
                <h1>{count}</h1>
                <button onClick={handleCount}>Click</button>
            </>
        )}
    </Child>
    </>
  )
}

const Child=(props)=>{
    console.log("props: ",props.children);
    const [count, setCount]=useState(0);
    const handleCount=()=>{
        setCount(prev=>prev+1);
    }
    return <>{props.children(count,handleCount)}</>
}

