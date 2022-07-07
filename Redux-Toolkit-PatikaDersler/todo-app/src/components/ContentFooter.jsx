import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { todosByStatus,todosByStatus2,clearCompleted,clearAllTodoAsync } from "../redux/todos/todosSlice";
import { selectTodos } from "../redux/todos/todosSlice";
const ContentFooter = () => {
  const myTodos=useSelector(selectTodos);

  const { items, todosStatus, todosStatus2 } = useSelector(
    (state) => state.todos
  );
  //Tamamlanmayan todo larin sayisini bulma
  const activeTodosCount = items.filter((todo) => !todo.completed).length;
  const dispatch = useDispatch();
  const showTodosByStatus = (status) => {
    dispatch(todosByStatus2(status));
  };

  const handleClearCompleted= async()=>{
  //  dispatch(clearCompleted());
   await dispatch(clearAllTodoAsync());
  }

let statusObj=todosStatus2?.find(todo=>todo.status);
// let {status,name}=statusObj;
// console.log("name: ",name)

useEffect(()=>{
  if(!localStorage.getItem("status"))localStorage.setItem("status","All");
  console.log("localStorage: ",localStorage.getItem("status"));  
localStorage.setItem("status",statusObj.name);
},[statusObj?.name])


  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeTodosCount} </strong>
        item{activeTodosCount>1 ? 's':''} left
      </span>

      <ul className="filters">
        {todosStatus2.map(({name,status}, index) => (
          <li key={index}>
            <a
              href="#/"
              className={status ? "selected" : ""}
              onClick={() => showTodosByStatus(name)}
            >
              {name}
            </a>
          </li>
        ))}
        {/* <li>
            <a href="#/" className={todosStatus==="All"?"selected":""} 
            onClick={()=>showTodosByStatus("All")}
            >All</a>
        </li>
        <li>
            <a href="#/"
            className={todosStatus==="Active"?"selected":""} 
               onClick={()=>showTodosByStatus("Active")}
            >Active</a>
        </li>
        <li>
            <a href="#/"
             className={todosStatus==="Completed"?"selected":""} 
               onClick={()=>showTodosByStatus("Completed")}
            >Completed</a>
        </li> */}
      </ul>
      <button className="clear-completed"
      onClick={handleClearCompleted}
      >Clear completed</button>
    </footer>
  );
};

export default ContentFooter;
