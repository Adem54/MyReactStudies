import React from 'react'
import { ITodo } from '../@types/todo'

type Props={
    todo:ITodo;
    // updateTodo(id:number):void;
    updateTodo:(id:number)=>void;//Bu ikisi ayni seydir aslinda...
}

//Normalde, componentlerde biz type olarak React.FC ile aliriz ama eger, props almis isek onun tipini de Rect.FC<Props> seklinde yazariz...
const Todo:React.FC<Props> = ({todo,updateTodo}) => {
    const checkTodo:string=todo.status ? `line-through` : '';
  return (
   <div className="Card">
      <div className="Card--text">
        <h1 className={checkTodo}>{todo.title}</h1>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      <button onClick={() => updateTodo(todo.id)} className={todo.status ? `hide-button` : 'Card--button'}>
        Complete
      </button>
    </div>
  )
}

export default Todo