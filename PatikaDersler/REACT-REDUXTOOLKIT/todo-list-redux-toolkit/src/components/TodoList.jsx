import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { toggle,removeTodo,selectTodos,selectFilteredTodos } from '../redux/todos/todosSlice';

let filtered=[];
const TodoList = () => {
   // const items=useSelector(state=>state.todos.items);
    // const items=useSelector(selectTodos);
const dispatch=useDispatch();
//Artik buraya gerek kalmiyor selectorler ile direk filtrelem islmini todosSlice da yapip da ordan buraya import ederek kullandigmiz icin
// const activeFilter=useSelector((state)=>state.todos.activeFilter);
//ustunu cizmek icinde checked attributune completed veriyoruz...
 const handleRemove=(id)=>{
     if(confirm("Are you sure?")){
        dispatch(removeTodo(id));
     }
 }

//Filtreleme yapiyouruz..all ise hepsini,active ise completed false,completed ise completed true lar geliyor....listeyi biz buna gore bir degiskene atiyourz ve artik bu filtered listeyi listeliyourz
// filtered=items;
//  if(activeFilter!=="all"){
//      filtered=items.filter((todo)=>activeFilter==='active' ? !todo.completed: todo.completed);  
//  }

//Burda hatamiz var biz listeyi filterd ile degistirmeyecegiz sadece filtreleyecegiz bizim hatamiz biz items da degisiklik yapiyoruz galiba completed da onu bir inceleyelim cunku sadece checkbox a tiklayinca completed true olmali ve ustu cizilmeli......bunu tekrar incele....
 
const filteredTodos=useSelector(selectFilteredTodos);

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
        {filteredTodos.map(todo=>(
            <li key={todo.id} className={todo.completed ? "completed" : ""} >
            <div className="view">
                <input 
                className="toggle"
                 type="checkbox"
                checked={todo.completed}
                onChange={()=>dispatch(toggle({id:todo.id}))} 
                />
                <label>{todo.title}</label>
                <button className="destroy" onClick={()=>handleRemove(todo.id)}></button>
            </div>
        </li>
  ))}

    </ul>
    </div>
  )
}

export default TodoList;