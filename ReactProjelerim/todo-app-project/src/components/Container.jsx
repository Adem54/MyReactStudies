import React from 'react';
import AddTodo from './AddTodo';
import SearchTodo from './SearchTodo';
import TodoList from './TodoList';
import { Segment } from "semantic-ui-react";


const Container = () => {
  return <div className='App'>
         <Segment.Group style={{ width: "80%", margin: "0 auto" }}>
        <Segment
          style={{ backgroundColor: "rgba(0,0,0,.03)", display: "flex", fontSize:"1.2rem" }}
        >
          TodoList
        </Segment>
       <AddTodo />
        <SearchTodo />
        <TodoList />
     
        </Segment.Group>
  </div>;
};

export default Container;
