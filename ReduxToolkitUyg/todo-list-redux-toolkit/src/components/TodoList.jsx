import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { toggle,removeTodo } from '../redux/todos/todosSlice';
const TodoList = () => {
    const items=useSelector(state=>state.todos.items);
const dispatch=useDispatch();
//ustunu cizmek icinde checked attributune completed veriyoruz...
 const handleRemove=(id)=>{
     if(confirm("Are you sure?")){
        dispatch(removeTodo(id));
     }

 }
  return (
    <div>
         <ul className='todo-list'>
        {/* <li className='completed'>
            <div className='view'>
                <input className="toggle" type="checkbox"/>
                <label>Learn JavaScript</label>
                <button className="destroy"></button>
            </div>
        </li> */}
        {items.map(todo=>(
            <li key={todo.id} className={todo.completed ? "completed" : ""} >
            <div className="view">
                <input className="toggle" type="checkbox"
                checked={items.completed}
                onChange={()=>{
                    console.log("CheckBox: ")
                    dispatch(toggle(todo.id))
                }} />
                <label>{todo.title}</label>
                <button className="destroy" onClick={()=>handleRemove(todo.id)}></button>
            </div>
        </li>
  ))}
        
       
    </ul>
    </div>
  )
}

export default TodoList