//https://jsonplaceholder.typicode.com/users

import axios from "axios";

const usersApi=axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})

export const getUsers=async ()=>{
    const response= await usersApi.get("/users");
    return response.data; 
}

//Cokca yaptigim hataya dikkat, eger burda paramtreye id yi obje icinde degilde dogrudan vereceksem o zaman,
// getUer i invoke ettgim yerde de id yi bu sekilde vermemiz gerekir, ya da eger id yi obje icinde veriyorsak
//  burda o zamn invoke  ederken de obje icinde id gondermeliyz
export const getUser=async ({id})=>{
    const response= await usersApi.get(`/users/${id}`,id);
    return response.data; 
}
export const addUser=async (user)=>{
    const response=await usersApi.post("/users",user);
    return response.data;
}


export const updateUser=async (user)=>{
    const response=await usersApi.patch(`/users/${user.id}`,user);
    return response.data;
}

export const deleteUser=async ({id})=>{
    const response= await usersApi.delete(`/todos/${id}`, id)
  //return id
  return response.data;
  //Ya da data donmuyor da olabilir
}

export default usersApi;