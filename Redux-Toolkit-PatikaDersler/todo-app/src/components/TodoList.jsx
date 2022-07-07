import React, {useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import {toggleTodo,removeTodo} from "../redux/todos/todosSlice";
import { selectTodos,selectfilteredItems,getTodosAsync,selectLoading,selectError,toggleTodoAsync,removeTodoAsync } from "../redux/todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";


const TodoList = () => {
  const filterTodoItems=useSelector(selectfilteredItems);
  const { items,todosStatus,todosStatus2 } = useSelector((state) => state.todos);
  const myTodos=useSelector(selectTodos);
  const isLoading=useSelector(selectLoading);
  const error=useSelector(selectError);

  const dispatch=useDispatch();
  const handleToggle= async (id,completed)=>
  {
      //  dispatch(toggleTodo(todoId))
       await dispatch(toggleTodoAsync({id,data:{completed}}));
  }
  
  const handleRemove= async (id)=>{
        var proceed=confirm("Are you sure to delete todo?");
      //  if(proceed)dispatch(removeTodo(id));   
        if(proceed) await dispatch(removeTodoAsync({id}));    
  }

  const filteredItems=()=>{
   if(todosStatus==="All")return items;
   if(todosStatus==="Active") return items.filter(todo=>!todo.completed)
    if(todosStatus==="Completed") return items.filter(todo=>todo.completed)
  }

  const filteredItems2=()=>{
        return todosStatus2.find(todosS=>todosS.status).filter(myTodos);
  }

  useEffect(()=>{
    
    dispatch(getTodosAsync());
  },[]);//dependency array e dispatch de yazilabilir

  if(isLoading)return <Loading/>
  if(error)return <Error message={error}/>
  return (
     <ul className="todo-list">
      {filterTodoItems.map(({id,title,completed},index) => {
      return  <li key={index} className={completed ? "completed": ""}>
          <div className="view">
            <input className="toggle" 
            checked={completed}
            type="checkbox"
            onChange={(e)=>handleToggle(id,!completed)}
            />
           <label>{title}</label> 
            <button className="destroy" onClick={()=>handleRemove(id)}></button>
          </div>
        </li>
}
      
      )}
    </ul>
  );
};

export default TodoList;
/*
1-input u type checkbox olarak kullandigmizda tiklayarak check etme islemlerini onChange eventi ile yapiyoruz
2-input un attributundeki checked islemini dinamik yapabilmek icin su sekilde bir yol izleriz...
 checked={completed ? true : false}
3-todosSlice icine toggle islemi yaparken, guncellem islemini 2 farkli sekilde yapabiliriz
1-map methodu ile 
 state.items=state.items.map(todo=>todo.id===action.payload ? {...todo,completed:!todo.completed} : todo);
2-find methodu ile id si gondeirlen obje bulunur sonra da o objenin direk property si degistirilir 
  const todo=state.items.find(todo=>todo.id===action.payload);
- todo.completed=!todo.completed;  
 */