import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../redux/todos/todosSlice";
import { nanoid } from "@reduxjs/toolkit";
const Form = () => {
  const [title, setTitle] = useState("");
  // const items = useSelector((state) => state.todos.items);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleSubmit = (event) => {
    if (!title) return;
    event.preventDefault();

    const newItem = {
      //   id:items.length===0 ? 1 : (items.length+1),
      id: nanoid(),
      title: title,
      completed: false,
    };

    //dispatch(addTodo({ id: nanoid(), title: title, completed: false }));
    //Prepare i todoSlice da olusturdugum icin..bu sekilde kullaniriz artik
    dispatch(addTodo({ title: title, }));//Biz burdan bunu slice a gonderiyoruz aslinda parametre olarak ve orayi calistiriyoruz....Bunu dispatch ettigim anda todosSlice da reducers icindeki prepare propertysinie bir invoke edilen function olarak dusuyor ve otomatik olarak ordakki fonksiyonu calistiriyor...prepare icinde payload return ediliiyor ve return edilen payload da todoSlice icindeki addTodo propertysi nin parametresindeki payload ve type i barindiran action icine dusuyor ve orda push islemi gerceklesiyor...
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Form;
