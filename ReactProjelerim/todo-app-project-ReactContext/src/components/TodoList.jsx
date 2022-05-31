import React from "react";
import { Segment } from "semantic-ui-react";
import { useTodoList } from "../context/TodoListContext";
import { Icon } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';


const TodoList = () => {


    const {todoList,setTodoList,todoInput,setTodoInput,searchTodo,setSearchTodo}=useTodoList();
    console.log("todos: ",todoList);
    
    const test=todoList.filter(todo=>todo.id!==1);

    const removeTodo=(id,event)=>{
      setTodoList(
      todoList.filter(todo=>todo.id!==id)
      )
    }


    const filterTodoList=()=>{
    let newTodoList=  todoList.filter(todo=>todo.text.toLowerCase().includes(searchTodo.toLowerCase()));
    return newTodoList;
    }

    console.log("filterTodoList: ",filterTodoList())

    
  return (
    <div>
      <Segment
        style={{
          margin: "0",
          borderBottom: "0px",
          borderLeft: "0px",
          borderRight: "0px",
        }}
      >
        {filterTodoList().map((todo,index)=>(
 <Segment   key={index} style={{ margin: "0", display:"flex", justifyContent:"space-around", alignItems:"center", textAlign: "left" }}>
 <span style={{flexGrow:" 3"}}>{todo.text}</span>   
 <Input>
 <Icon style={{fontSize:"2rem",cursor:"pointer",color:"red"}} name='remove'
 onClick={e=>removeTodo(todo.id)}
 />
</Input>





</Segment>
        ))}
        
      </Segment>
    </div>
  );
};

export default TodoList;
