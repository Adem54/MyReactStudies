import React, { useContext } from "react";
import { TodoContextType,ITodo } from "../@types/todo";
import { TodoContext } from "../context/todoContext";
import Todo from "../components/Todo";

const Todos:React.FC = () => {
const {todos,updateTodo}=useContext(TodoContext) as TodoContextType;
    return (
   
    <>
    {todos.map((todo:ITodo)=>(
        <Todo key={todo.id} updateTodo={updateTodo} todo={todo} />
    ))}
    </>
    
  );
};

export default Todos;
