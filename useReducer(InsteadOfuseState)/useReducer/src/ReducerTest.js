import React, { useReducer, useState } from "react";

const ACTIONS = {
  ADD: "ADD",
  REMOVE: "REMOVE",
};

const initialState = {
  users: [
    { id: 1, name: "Adem" },
    { id: 2, name: "Zehra" },
    { id: 3, name: "Zeynep" },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return {...state,users:[...state.users,action.payload]}
    case ACTIONS.REMOVE:
        
      return {...state,users:state.users.filter(user=>user.id!==action.payload) }

    default:
        throw new Error();
  }
};

const ReducerTest = () => {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

const handleSubmit=(e)=>{
    e.preventDefault();
    const id=state.users.length+1;
    dispatch({type:ACTIONS.ADD,payload:{id,name}})
    setName("");
}

const handleRemove=(id)=>{
dispatch({type:ACTIONS.REMOVE,payload:id})
}

  return (
    <div>
        <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      </form>

      <hr />
      <ul>
        {state.users?.map((user,index) => (
        <div key={index}>
          <li style={{display:"inline-block",margin:"1rem"}}> {user.name}</li>
          <button onClick={()=>handleRemove(user.id)}>Delete</button>
        </div>
        ))}
      </ul>
    </div>
  );
};

export default ReducerTest;
