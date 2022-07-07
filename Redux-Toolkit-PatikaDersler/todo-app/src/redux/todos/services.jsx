
import {createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//Burdaki name action fonksiyhonlari parametresindeki action
    //objesi icinde type olarak su sekilde geliyor todosSlice/addTodo- name/funcitonname gibi
export const getTodosAsync=createAsyncThunk('todos/getTodosAsync',async ()=>{
    //`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`
    console.log();
    const response=await fetch("http://localhost:7000/todos");
    return await response.json();
})
//pending-fulfilled-rejected diye kavramlar geliyor-loading-success-error

export const addTodoAsync=createAsyncThunk("todos/addTodoAsync", async (data)=>{
    const response=await axios.post("http://localhost:7000/todos",data);
    return response.data;
})

//Burda ister id ve gonderilecek data yi ayri ayri gondeririz istersek de bir obje icinde
//gonderebiliriz ama tek bir obje icinde gonderedebiliriz
export const toggleTodoAsync=createAsyncThunk("todos/toggleTodoAsync", async ({id,data})=>{
  
    const response=await axios.patch("http://localhost:7000/todos/"+id,data);
    return response.data;
})

export const removeTodoAsync=createAsyncThunk("todos/removeTodoAsync",async ({id})=>{
    const response=await axios.delete("http://localhost:7000/todos/"+id);
    return id;
})

export const clearAllTodoAsync=createAsyncThunk("clearAllTodoAsync", async()=>{
    const response=await axios.delete("http://localhost:7000/todos/");
    return response.data;
})
