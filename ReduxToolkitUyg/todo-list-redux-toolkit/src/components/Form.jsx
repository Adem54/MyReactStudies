import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addTodo } from '../redux/todos/todosSlice';
import { nanoid } from '@reduxjs/toolkit';
const Form = () => {
  const [title,setTitle]=useState("");
  const items=useSelector((state)=>state.todos.items);
 

  const dispatch=useDispatch();

const handleChange=(event)=>{
setTitle(event.target.value);

}
  const handleSubmit=(event)=>{
    event.preventDefault();
    
    const newItem={
   //   id:items.length===0 ? 1 : (items.length+1),
   id:nanoid(),
      title:title,
      completed:false,
    }
    
    dispatch(addTodo(newItem));
    setTitle("");

  }

  
  return (
    <div>
        <form onSubmit={handleSubmit}>
			<input value={title} className='new-todo' placeholder="What needs to be done?" autoFocus 
      onChange={handleChange}
      />
		</form>
    </div>
  )
}

export default Form