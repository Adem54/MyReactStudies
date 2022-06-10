import React, {useState,useEffect} from 'react'
import axios from "axios";
const Todos = () => {
    const [todos,setTodos]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    useEffect(()=>{
        axios("https://jsonplaceholder.typicode.com/todos").
        then((res)=>{
            setTodos(res.data);
            setIsLoading(false);
        }).catch((e)=>console.log(3));
    },[]);
  return (
    <div>
    <div>{isLoading && "Loading..."}</div>
    <ul>
      {todos.map(({ id, title }, index) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  </div>
  )
}

export default Todos