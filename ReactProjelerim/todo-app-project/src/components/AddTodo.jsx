
import { Segment } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { useTodoList } from "../context/TodoListContext";

const AddTodo = () => {
  const { todoList, setTodoList,todoInput,setTodoInput } = useTodoList();
 

  const handleTodo = (e) => {
    setTodoInput(e.target.value);
  };

  const addTodo=(todo,e)=>{
    const newTodo={
      id:todoList.length===0 ? 1 : (todoList.length+1),
      text:todoInput,
      completed:false
    }
    setTodoList(
      [ ...todoList,newTodo]
    )
    setTodoInput("");
  }

  return (
    <Segment style={{ display: "flex", justifyContent: "space-between" }}>
      <Input
        style={{ width: "50%" }}
        placeholder="Add new todo..."
        onChange={handleTodo}
        value={todoInput}
      />
      <Button floated="left" color="green" style={{ padding: ".8rem 3rem" }}
      onClick={e=>addTodo(todoInput)}
      
      >
        Add
      </Button>
    </Segment>
  );
};

export default AddTodo;
