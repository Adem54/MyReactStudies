import React,{createContext, useState} from 'react'
import { ITodo, TodoContextType } from '../@types/todo'

export const TodoContext=createContext<TodoContextType | null>(null);

const initialdata=[{
    id: 1,
    title: 'post 1',
    description: 'this is a description',
    status: false,
  },
  {
    id: 2,
    title: 'post 2',
    description: 'this is a description',
    status: true,
  },]

  type ContextProps = {
    children: React.ReactNode; // 👈️ added type for children
  };
 const TodoProvider:React.FC<ContextProps>=({children})=>{
const [todos,setTodos]=useState<ITodo[]>(initialdata);

const saveTodo=(todo:ITodo)=>{
    const newTodo:ITodo={
        id:Math.random(),
        title:todo.title,
        description:todo.description,
        status:false
    }
    setTodos([...todos,newTodo]);
}

const updateTodo=(id:number)=>{
    todos.filter((todo:ITodo)=>{
        if(todo.id===id){
            todo.status=true;
            setTodos([...todos])
        }
    }
)}

const values={todos,saveTodo,updateTodo};

return (<TodoContext.Provider value={values}>{children}</TodoContext.Provider>)

}

export default TodoProvider;
/*
React Context allows you to share and manage state across your components without passing down props. 
The context will provide the data to just the components that need to consume it.

*/