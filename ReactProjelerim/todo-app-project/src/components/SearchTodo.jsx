import React from "react";
import { Segment } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { useTodoList } from "../context/TodoListContext";

const SearchTodo = () => {
  const {searchTodo,setSearchTodo}=useTodoList();

  const handleSearch=(e)=>{
    setSearchTodo(e.target.value);
  }


  return (
    <div>
      <Segment
        style={{
          display: "flex",
          borderBottom: "0px",
          borderLeft: "0px",
          borderRight: "0px",
           
          margin: "0 auto",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Header as="h3">Todos</Header>
        <Input
          style={{ width: "50%", marginTop: "1rem" }}
          icon="search"
          placeholder="Searh todo..."
          onChange={handleSearch}
        />
      </Segment>
    </div>
  );
};

export default SearchTodo;
