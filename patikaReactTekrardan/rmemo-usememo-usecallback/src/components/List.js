import React, { useEffect, useState } from 'react'

const List = () => {
    const[users,setUsers]=useState([]);

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res=>res.json())
        .then(res=>{
            setUsers([
                ...users,
                ...res
            ])
        });

    })
  return (
    <div>
        <ul>
            {users.map((user,index)=>( 
                <li key={index}>{user.name}</li>
            ))}
        </ul>

    </div>
  )
}

export default List