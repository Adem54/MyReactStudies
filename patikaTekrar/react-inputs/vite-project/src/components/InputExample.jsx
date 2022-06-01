import React, { useState } from 'react'

const InputExample = () => {
    const [input,setInput]=useState({name:"",lastName:"",age:0});
    const handleChange=(e)=>{
           setInput(
            {
            ...input,       
            [e.target.name]:e.target.value
        })
    }
    const{name,lastName,age}=input;
  return (
      <>
      <div className="App">
    <h1>{name} - {lastName}-{age}</h1>
    <label>Name:  </label>
    <br/>
    <input 
    name="name"
    value={name}
    onChange={handleChange}
    />
     <input 
    name="lastName"
    value={lastName}
    onChange={handleChange}
    />
     <input 
    name="age"
    value={age}
    onChange={handleChange}
    />
    </div>
      </>
  )
}

export default InputExample